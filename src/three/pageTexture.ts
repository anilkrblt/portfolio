import {CanvasTexture, LinearFilter} from 'three';

/**
 * The two sheets in the curl demo are drawn here rather than loaded as images:
 * the document has to be bilingual and has to keep *identical* geometry across
 * both faces — that identical layout is the product claim the scene is making.
 * Only the language of the label and the title changes between them.
 *
 * Every page is drawn twice. `art` is the page as printed. `order` is the same
 * page with each mark filled by its position in reading order instead of its
 * colour, so the shader can reveal the translation the way it is written:
 * heading first, then the measure, then the figure, then the folio.
 */
export type PageContent = {
  label: string;
  title: string;
  /** The one paragraph set as real type: the translation has to be readable. */
  lede: string;
  caption: string;
  units: readonly string[];
  footnote: string;
  page: string;
  variant: 'source' | 'target';
};

export type PageMode = 'art' | 'order';

/** Layout space. The canvas is rendered at SCALE times this, for legible type. */
const W = 660;
const H = 880;
const SCALE = 1.2;

const PALETTE = {
  source: {paper: '#e9e0cf', edge: '#c3b394', ink: '#2a2419', muted: '#847860', rule: '#c9b998'},
  target: {paper: '#fbf8f2', edge: '#d9c6ad', ink: '#221d16', muted: '#6f6553', rule: '#d2c4a8'},
} as const;

const ACCENT = '#9a4a29';
const AMBER = '#b9762c';
const CLAY = '#c98a5f';

/** Past the lede, body copy is typeset as rules: the demo is about layout. */
const PARAGRAPH_A = [1, 0.94, 0.62];
const PARAGRAPH_B = [0.97, 0.91, 0.64];
const CHART = [
  {height: 0.52, color: CLAY},
  {height: 0.86, color: ACCENT},
  {height: 0.63, color: AMBER},
  {height: 0.41, color: CLAY},
];

/** Reading order, as fractions of one full pass over the page. */
const ORDER = {
  label: [0.02, 0.05],
  title: [0.06, 0.2],
  tick: [0.21, 0.22],
  lede: [0.24, 0.5],
  bodyA: [0.52, 0.62],
  chart: [0.64, 0.74],
  units: [0.75, 0.78],
  caption: [0.79, 0.83],
  bodyB: [0.85, 0.93],
  footer: [0.94, 0.99],
} as const;

function grey(value: number) {
  const channel = Math.round(Math.max(0, Math.min(1, value)) * 255);
  return `rgb(${channel},${channel},${channel})`;
}

function span([from, to]: readonly [number, number], index: number, count: number) {
  const step = (to - from) / count;
  return [from + step * index, from + step * (index + 1)] as const;
}

function setTracking(ctx: CanvasRenderingContext2D, value: string) {
  // letterSpacing is recent enough that it needs guarding, and the page still
  // reads correctly without it.
  try {
    (ctx as CanvasRenderingContext2D & {letterSpacing: string}).letterSpacing = value;
  } catch {
    /* older engine — fall back to default tracking */
  }
}

type Painter = {
  /** Ink laid down left to right, the way a line of type is set. */
  across: (art: string, x: number, width: number, order: readonly [number, number]) => string | CanvasGradient;
  /** Ink laid down bottom to top, so a chart bar grows instead of sliding in. */
  upward: (art: string, y: number, height: number, order: readonly [number, number]) => string | CanvasGradient;
};

function painterFor(ctx: CanvasRenderingContext2D, mode: PageMode): Painter {
  if (mode === 'art') {
    return {across: (art) => art, upward: (art) => art};
  }
  const ramp = (gradient: CanvasGradient, [from, to]: readonly [number, number]) => {
    gradient.addColorStop(0, grey(from));
    gradient.addColorStop(1, grey(to));
    return gradient;
  };
  return {
    across: (_art, x, width, order) => ramp(ctx.createLinearGradient(x, 0, x + Math.max(width, 1), 0), order),
    upward: (_art, y, height, order) => ramp(ctx.createLinearGradient(0, y + height, 0, y), order),
  };
}

function drawWrapped(
  ctx: CanvasRenderingContext2D,
  paint: Painter,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  art: string,
  order: readonly [number, number],
) {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (ctx.measureText(candidate).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);

  lines.forEach((text, index) => {
    ctx.fillStyle = paint.across(art, x, ctx.measureText(text).width, span(order, index, lines.length));
    ctx.fillText(text, x, y + lineHeight * index);
  });
}

export function drawPage(content: PageContent, mode: PageMode = 'art'): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = W * SCALE;
  canvas.height = H * SCALE;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;
  ctx.scale(SCALE, SCALE);

  const tone = PALETTE[content.variant];
  const paint = painterFor(ctx, mode);
  const m = 56;
  const inner = W - m * 2;

  // In the order pass the page itself — paper, frame, rules — is already there
  // at zero: the sheet exists, the translation is what gets written onto it.
  ctx.fillStyle = mode === 'art' ? tone.paper : '#000000';
  ctx.fillRect(0, 0, W, H);

  if (mode === 'art') {
    ctx.strokeStyle = tone.edge;
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, W - 2, H - 2);
  }

  // ---- running head -------------------------------------------------------
  ctx.textBaseline = 'alphabetic';
  ctx.font = '600 15px "IBM Plex Mono", ui-monospace, monospace';
  setTracking(ctx, '2.4px');
  const label = content.label.toUpperCase();
  ctx.fillStyle = paint.across(tone.muted, m, ctx.measureText(label).width, ORDER.label);
  ctx.fillText(label, m, 72);
  setTracking(ctx, '0px');

  ctx.fillStyle = paint.across(ACCENT, W - m - 11, 11, [ORDER.label[1], ORDER.label[1]]);
  ctx.fillRect(W - m - 11, 61, 11, 11);

  if (mode === 'art') {
    ctx.fillStyle = tone.rule;
    ctx.fillRect(m, 92, inner, 1);
  }

  // ---- title --------------------------------------------------------------
  ctx.font = '400 44px Fraunces, "Iowan Old Style", Georgia, serif';
  drawWrapped(ctx, paint, content.title, m, 178, inner, 50, tone.ink, ORDER.title);

  ctx.fillStyle = paint.across(ACCENT, m, 58, ORDER.tick);
  ctx.fillRect(m, 214, 58, 3);

  // ---- lede: the paragraph that is actually read ---------------------------
  ctx.font = '400 21px "Public Sans", ui-sans-serif, system-ui, sans-serif';
  drawWrapped(ctx, paint, content.lede, m, 258, inner, 30, tone.ink, ORDER.lede);

  // ---- body ---------------------------------------------------------------
  let y = 340;
  PARAGRAPH_A.forEach((width, index) => {
    ctx.fillStyle = paint.across(tone.rule, m, inner * width, span(ORDER.bodyA, index, PARAGRAPH_A.length));
    ctx.fillRect(m, y, inner * width, 8);
    y += 20;
  });

  // ---- figure -------------------------------------------------------------
  const chartTop = 424;
  const chartHeight = 168;
  const chartWidth = inner * 0.74;
  const gap = 26;
  const barWidth = (chartWidth - gap * (CHART.length - 1)) / CHART.length;

  if (mode === 'art') {
    ctx.fillStyle = tone.rule;
    ctx.fillRect(m, chartTop + chartHeight, chartWidth, 2);
    ctx.fillRect(m, chartTop, 2, chartHeight);
  }

  CHART.forEach((bar, index) => {
    const height = chartHeight * bar.height;
    const top = chartTop + chartHeight - height;
    ctx.fillStyle = paint.upward(bar.color, top, height, span(ORDER.chart, index, CHART.length));
    ctx.fillRect(m + index * (barWidth + gap), top, barWidth, height);
  });

  // Even the axis reads in the reader's language.
  ctx.font = '500 14px "IBM Plex Mono", ui-monospace, monospace';
  content.units.forEach((unit, index) => {
    const width = ctx.measureText(unit).width;
    const x = m + index * (barWidth + gap) + (barWidth - width) / 2;
    ctx.fillStyle = paint.across(tone.muted, x, width, span(ORDER.units, index, content.units.length));
    ctx.fillText(unit, x, chartTop + chartHeight + 24);
  });

  ctx.font = '500 13px "IBM Plex Mono", ui-monospace, monospace';
  setTracking(ctx, '1.6px');
  ctx.fillStyle = paint.across(tone.muted, m, ctx.measureText(content.caption).width, ORDER.caption);
  ctx.fillText(content.caption, m, chartTop + chartHeight + 58);
  setTracking(ctx, '0px');

  // ---- closing paragraph --------------------------------------------------
  y = chartTop + chartHeight + 92;
  PARAGRAPH_B.forEach((width, index) => {
    ctx.fillStyle = paint.across(tone.rule, m, inner * width, span(ORDER.bodyB, index, PARAGRAPH_B.length));
    ctx.fillRect(m, y, inner * width, 8);
    y += 20;
  });

  // ---- folio --------------------------------------------------------------
  if (mode === 'art') {
    ctx.fillStyle = tone.rule;
    ctx.fillRect(m, H - 88, inner, 1);
  }

  ctx.font = '500 14px "IBM Plex Mono", ui-monospace, monospace';
  setTracking(ctx, '1.4px');
  const footWidth = ctx.measureText(content.footnote).width;
  ctx.fillStyle = paint.across(tone.muted, m, footWidth, span(ORDER.footer, 0, 2));
  ctx.fillText(content.footnote, m, H - 58);

  const pageWidth = ctx.measureText(content.page).width;
  ctx.fillStyle = paint.across(tone.muted, W - m - pageWidth, pageWidth, span(ORDER.footer, 1, 2));
  ctx.fillText(content.page, W - m - pageWidth, H - 58);
  setTracking(ctx, '0px');

  return canvas;
}

export function createPageTexture(content: PageContent, mode: PageMode = 'art'): CanvasTexture {
  const texture = new CanvasTexture(drawPage(content, mode));
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.generateMipmaps = false;
  texture.anisotropy = 4;
  return texture;
}

/** The paper the translation is written onto, as a linear-space rgb triple. */
export function paperTone(variant: PageContent['variant']): [number, number, number] {
  const hex = PALETTE[variant].paper;
  return [
    parseInt(hex.slice(1, 3), 16) / 255,
    parseInt(hex.slice(3, 5), 16) / 255,
    parseInt(hex.slice(5, 7), 16) / 255,
  ];
}
