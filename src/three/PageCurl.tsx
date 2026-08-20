import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from 'react';
import {Canvas, useFrame, useThree} from '@react-three/fiber';
import {
  DoubleSide,
  Mesh,
  PerspectiveCamera,
  ShaderMaterial,
  Vector2,
  Vector3,
  type CanvasTexture,
} from 'three';

import {createPageTexture, paperTone, type PageContent} from './pageTexture';

/**
 * A sheet of paper peeling off the sheet below it.
 *
 * The two sheets carry the same document in two languages, drawn with the same
 * measure, the same figure, the same folio — so the peel *shows* what the
 * product claims: the layout survives, only the language changes. The curl is a
 * vertex-shader roll around a moving cylinder, which keeps the whole motion
 * inside the page's own footprint (a 180° page flip would swing off frame).
 */

const PAGE_W = 1.5;
const PAGE_H = 2.0;

/** The peel travels toward the spine and slightly downward: top-right lifts first. */
const DIR = new Vector2(-1, -0.3).normalize();
const AXIS_MAX = Math.abs(DIR.x) * (PAGE_W / 2) + Math.abs(DIR.y) * (PAGE_H / 2);
const AXIS_MIN = -AXIS_MAX;
/**
 * How far the fold travels, as a multiple of the sheet's own diagonal reach.
 * Past 1.0 the sheet is rolled clear of the page and carries on off frame, so
 * the peel finishes instead of stopping half-done over the translation.
 */
const PEEL_SPAN = 1.12;

const RADIUS_MIN = 0.16;
const RADIUS_MAX = 0.34;
/** The fold starts a hair off the corner, so a resting sheet is genuinely flat. */
const FOLD_LEAD = 0.02;
/** How long a full page takes to be written out, in seconds. */
const TYPE_SECONDS = 2.8;

const sheetVertex = /* glsl */ `
  uniform vec2 uDir;
  uniform float uFold;
  uniform float uRadius;
  uniform float uTime;

  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    vUv = uv;

    vec3 p = vec3(position.xy, 0.0);
    vec3 n = vec3(0.0, 0.0, 1.0);

    float axis = dot(position.xy, uDir);
    float d = uFold - axis;

    // Paper is never perfectly flat — a slow, shallow swell keeps it alive.
    float swell = sin(position.x * 1.7 + uTime * 0.5) * cos(position.y * 1.1 - uTime * 0.35) * 0.008;

    if (d > 0.0) {
      // Rolled: wrap the sheet around a cylinder sitting on the fold line.
      float theta = d / uRadius;
      vec2 fold = position.xy + uDir * d;
      vec2 rolled = fold - uDir * (uRadius * sin(theta));
      p = vec3(rolled, uRadius * (1.0 - cos(theta)));

      vec3 tangent = vec3(-uDir * cos(theta), sin(theta));
      vec3 axisDir = vec3(-uDir.y, uDir.x, 0.0);
      n = -normalize(cross(tangent, axisDir));
    } else {
      // Still flat, but lifting as the fold approaches: paper under tension.
      p.z = swell + max(0.0, 1.0 + d / (uRadius * 2.6)) * uRadius * 0.16;
    }

    vNormal = n;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const sheetFragment = /* glsl */ `
  uniform sampler2D uMap;
  uniform vec3 uPaper;
  uniform float uDim;

  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    vec3 light = normalize(vec3(-0.32, 0.48, 0.82));
    vec3 n = normalize(vNormal);
    vec3 texel;

    if (gl_FrontFacing) {
      texel = texture2D(uMap, vUv).rgb;
    } else {
      // The back of a sheet: paper, with the printed side barely showing through.
      n = -n;
      vec3 through = texture2D(uMap, vec2(1.0 - vUv.x, vUv.y)).rgb;
      texel = mix(uPaper, through, 0.09);
    }

    float lit = 0.5 + 0.5 * dot(n, light);
    float level = 0.5 + 0.5 * dot(vec3(0.0, 0.0, 1.0), light);

    // Normalised against a flat sheet, so an unrolled page prints exactly as
    // authored and only the curl picks up light. Matte: paper has no highlight.
    float shade = mix(1.0, lit / level, 0.9);
    gl_FragColor = vec4(texel * clamp(shade, 0.42, 1.12) * uDim, 1.0);
  }
`;

const underVertex = /* glsl */ `
  uniform vec2 uDir;
  varying vec2 vUv;
  varying float vAxis;

  void main() {
    vUv = uv;
    vAxis = dot(position.xy, uDir);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const underFragment = /* glsl */ `
  uniform sampler2D uMap;
  uniform sampler2D uOrder;
  uniform vec3 uPaper;
  uniform vec3 uAccent;
  uniform float uType;
  uniform float uFold;
  uniform float uDim;

  varying vec2 vUv;
  varying float vAxis;

  void main() {
    vec3 printed = texture2D(uMap, vUv).rgb;

    // Each mark carries its place in reading order; uType is how far the
    // translation has been written. Paper reads as order 0, so it is always
    // there and the type arrives onto it.
    float order = texture2D(uOrder, vUv).r;
    float written = step(order, uType);
    vec3 col = mix(uPaper, printed, written);

    // The mark being set right now still carries the colour of the tool.
    float head = smoothstep(0.022, 0.0, abs(order - uType)) * step(0.004, order);
    col = mix(col, uAccent, head * written * 0.45 * smoothstep(1.0, 0.9, uType));

    // The roll hanging above throws a soft band onto the page it uncovers.
    float d = uFold - vAxis;
    float shadow = step(0.0, d) * (1.0 - smoothstep(0.0, 0.42, d)) * 0.34;

    gl_FragColor = vec4(col * (1.0 - shadow) * uDim, 1.0);
  }
`;

type Control = {
  progress: number;
  target: number;
  typed: number;
  dragging: boolean;
  moved: number;
  startX: number;
  startProgress: number;
  width: number;
};

function Sheets({
  control,
  front,
  back,
  dim,
}: {
  control: RefObject<Control>;
  front: PageContent;
  back: PageContent;
  dim: number;
}) {
  const camera = useThree((state) => state.camera) as PerspectiveCamera;
  const size = useThree((state) => state.size);
  const curlRef = useRef<Mesh>(null);

  // Fraunces and IBM Plex Mono are webfonts: the first paint of the page
  // texture can land before they resolve, so redraw once they are ready.
  const [fontTick, setFontTick] = useState(0);
  useEffect(() => {
    let alive = true;
    document.fonts?.ready.then(() => {
      if (alive) setFontTick((tick) => tick + 1);
    });
    return () => {
      alive = false;
    };
  }, []);

  const textures = useMemo(() => {
    void fontTick;
    return {
      front: createPageTexture(front),
      back: createPageTexture(back),
      order: createPageTexture(back, 'order'),
    };
  }, [front, back, fontTick]);

  useEffect(() => {
    const created = Object.values(textures);
    return () => {
      for (const texture of created) texture.dispose();
    };
  }, [textures]);

  const materials = useMemo(() => {
    const curl = new ShaderMaterial({
      vertexShader: sheetVertex,
      fragmentShader: sheetFragment,
      side: DoubleSide,
      uniforms: {
        uMap: {value: null as CanvasTexture | null},
        uDir: {value: DIR.clone()},
        uFold: {value: AXIS_MIN - FOLD_LEAD},
        uRadius: {value: RADIUS_MIN},
        uTime: {value: 0},
        uPaper: {value: new Vector3(0.87, 0.83, 0.75)},
        uDim: {value: dim},
      },
    });

    const under = new ShaderMaterial({
      vertexShader: underVertex,
      fragmentShader: underFragment,
      uniforms: {
        uMap: {value: null as CanvasTexture | null},
        uOrder: {value: null as CanvasTexture | null},
        uDir: {value: DIR.clone()},
        uFold: {value: AXIS_MIN},
        uType: {value: 0},
        uPaper: {value: new Vector3(...paperTone('target'))},
        uAccent: {value: new Vector3(0.604, 0.29, 0.161)},
        uDim: {value: dim},
      },
    });

    return {curl, under};
  }, [dim]);

  useEffect(() => {
    const {curl, under} = materials;
    return () => {
      curl.dispose();
      under.dispose();
    };
  }, [materials]);

  useLayoutEffect(() => {
    materials.curl.uniforms.uMap.value = textures.front;
    materials.under.uniforms.uMap.value = textures.back;
    materials.under.uniforms.uOrder.value = textures.order;
    materials.curl.uniforms.uDim.value = dim;
    materials.under.uniforms.uDim.value = dim;
  }, [materials, textures, dim]);

  // A sheet at rest should fill the frame; only the peel needs the extra room
  // its tail reaches into, so the camera earns that room as the page lifts.
  const framing = useRef({rest: 4, peeled: 5});
  useLayoutEffect(() => {
    const reach = Math.tan((camera.fov * Math.PI) / 360);
    const aspect = size.width / Math.max(size.height, 1);
    const fit = (halfW: number, halfH: number) => Math.max(halfH / reach, halfW / (reach * aspect));

    // The rolled sheet is allowed to leave the frame at the end of the peel —
    // chasing its tail with the camera is what made the page look small.
    framing.current = {
      rest: fit(PAGE_W / 2 + 0.08, PAGE_H / 2 + 0.07),
      peeled: fit(PAGE_W / 2 + 0.25, PAGE_H / 2 + 0.2),
    };
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera, size]);

  useFrame((state, delta) => {
    const c = control.current;
    if (!c) return;

    if (!c.dragging) {
      // Critically-damped enough to feel like paper, not like a spring toy.
      c.progress += (c.target - c.progress) * Math.min(1, delta * 5.5);
    }

    const progress = Math.max(0, Math.min(1, c.progress));
    const radius = RADIUS_MIN + (RADIUS_MAX - RADIUS_MIN) * progress;
    const fold =
      AXIS_MIN - FOLD_LEAD + progress * (PEEL_SPAN * (AXIS_MAX - AXIS_MIN) + FOLD_LEAD);

    // Once the sheet is genuinely lifting, the translation starts being written
    // onto the paper underneath; closing the sheet takes the page back to blank.
    const typing = progress > 0.2 ? delta / TYPE_SECONDS : -delta / 0.45;
    c.typed = Math.max(0, Math.min(1, c.typed + typing));

    materials.curl.uniforms.uFold.value = fold;
    materials.curl.uniforms.uRadius.value = radius;
    materials.curl.uniforms.uTime.value = state.clock.elapsedTime;
    materials.under.uniforms.uFold.value = fold;
    materials.under.uniforms.uType.value = c.typed;

    const {rest, peeled} = framing.current;
    const ease = progress * progress * (3 - 2 * progress);
    camera.position.z = rest + (peeled - rest) * ease;

    if (curlRef.current) {
      // The sheet drifts a hair as it peels — a page never lifts dead straight.
      curlRef.current.rotation.z = progress * 0.012;
    }
  });

  return (
    <group rotation={[-0.1, 0.17, 0]}>
      {/* the rest of the stack, just enough edge to read as a document */}
      <mesh position={[0.012, -0.014, -0.05]} rotation={[0, 0, -0.008]}>
        <planeGeometry args={[PAGE_W, PAGE_H]} />
        <meshBasicMaterial color="#d8cdb7" />
      </mesh>
      <mesh position={[-0.01, 0.008, -0.03]} rotation={[0, 0, 0.006]}>
        <planeGeometry args={[PAGE_W, PAGE_H]} />
        <meshBasicMaterial color="#e6dcc8" />
      </mesh>

      {/* the translated page, revealed by the peel */}
      <mesh position={[0, 0, -0.012]} material={materials.under}>
        <planeGeometry args={[PAGE_W, PAGE_H]} />
      </mesh>

      {/* the source page, peeling away */}
      <mesh ref={curlRef} material={materials.curl}>
        <planeGeometry args={[PAGE_W, PAGE_H, 110, 84]} />
      </mesh>
    </group>
  );
}

export type PageCurlProps = {
  peeled: boolean;
  onPeeledChange: (peeled: boolean) => void;
  front: PageContent;
  back: PageContent;
  dim: number;
};

export default function PageCurl({peeled, onPeeledChange, front, back, dim}: PageCurlProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const control = useRef<Control>({
    progress: 0,
    target: 0,
    typed: 0,
    dragging: false,
    moved: 0,
    startX: 0,
    startProgress: 0,
    width: 1,
  });

  useEffect(() => {
    control.current.target = peeled ? 1 : 0;
  }, [peeled]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const c = control.current;
    c.dragging = true;
    c.moved = 0;
    c.startX = event.clientX;
    c.startProgress = c.progress;
    c.width = hostRef.current?.clientWidth ?? 1;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const c = control.current;
    if (!c.dragging) return;
    const dx = event.clientX - c.startX;
    c.moved = Math.max(c.moved, Math.abs(dx));
    // Dragging toward the spine peels the sheet back.
    c.progress = Math.max(0, Math.min(1, c.startProgress - (dx / c.width) * 1.6));
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const c = control.current;
    if (!c.dragging) return;
    c.dragging = false;
    event.currentTarget.releasePointerCapture?.(event.pointerId);

    // A tap is a toggle; a drag settles to whichever state it is closest to.
    const next = c.moved < 6 ? !peeled : c.progress > 0.5;
    c.target = next ? 1 : 0;
    if (next !== peeled) onPeeledChange(next);
  };

  return (
    <div
      ref={hostRef}
      className="h-full w-full cursor-grab touch-pan-y select-none active:cursor-grabbing"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <Canvas
        flat
        linear
        dpr={[1, 1.75]}
        camera={{fov: 32, position: [0, 0, 4]}}
        gl={{antialias: true, alpha: true, powerPreference: 'low-power'}}
      >
        <Sheets control={control} front={front} back={back} dim={dim} />
      </Canvas>
    </div>
  );
}
