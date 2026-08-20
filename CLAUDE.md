# Portfolio — working notes

Single-page portfolio for Anıl Karabulut. React 19 + Vite 6 + TypeScript, styled
with Tailwind CSS v4. No router, no backend: everything renders from `src/App.tsx`.

## Commands

| Task | Command |
| --- | --- |
| Dev server | `npm run dev` (port 3000) |
| Type check | `npm run lint` (`tsc --noEmit`) |
| Production build | `npm run build` |

Both `npm run lint` and `npm run build` run in CI (`.github/workflows/ci.yml`)
and must pass before a change reaches `main`.

## Layout

- `src/App.tsx` — all content data and all components. Content lives in the
  top-of-file constants (`COPY`, `PRODUCTS`, `SKILL_GROUPS`, `EXPERIENCES`,
  `ARCHIVE_PROJECTS`); components follow below.
- `src/three/` — the only code outside `App.tsx`: the WebGL page-curl demo
  (`PageCurl.tsx`) and the canvas-drawn document textures (`pageTexture.ts`).
  It is `lazy()`-imported and only mounted once the product panel scrolls into
  view, so `three` stays out of the initial chunk.
- `src/index.css` — the whole design system: theme tokens, type voices and the
  editorial primitives (`.shell`, `.band`, `.entry`, `.panel`, `.tag`, `.btn`…).
- `index.html` — meta tags plus the inline script that resolves the theme
  before first paint.
- `public/` — CVs, screenshots, portrait, OG image.

## Content rules

- **Every user-visible string is bilingual.** Text goes in `COPY.tr` and
  `COPY.en`, or in a `LocalizedString` field on the data constants. Never
  hardcode copy inside a component.
- **Claims must be checkable.** Product `facts` describe what the build itself
  proves — features, standards, deployment. Usage numbers (users, documents
  processed, revenue) belong here only when they are real and current.
- **State product status honestly.** `status: 'live'` means a stranger can open
  `liveUrl` right now. Anything else is `'building'`, with screenshots in
  `shots` standing in for a link.

## Design system

Two themes, `kagit` (paper, default) and `gece` (warm ink), switched via
`data-theme` on `<html>` and persisted to `localStorage` under `ak_theme`.

- Use the semantic Tailwind colors (`bg-canvas`, `text-ink`, `border-rule`,
  `text-accent`…), never raw hex. They are mapped from CSS variables in the
  `@theme` block so both themes stay in sync.
- Inside `.panel` (the dark blocks) use the `var(--c-on-panel*)` variables
  instead — those do not flip with the theme.
- Hairline rules and 2px corners carry hierarchy. No drop shadows, no rounded
  cards, no backdrop blur, no gradient glows.
- Type: Fraunces for display (`.display`, `.headline`, `.subhead`), Public Sans
  for body, IBM Plex Mono for metadata.
- Keep contrast at WCAG AA or better, and keep the
  `prefers-reduced-motion` block in `src/index.css` working.

## 3D

The product panel's demo is a WebGL sheet of paper peeling off the sheet below
it — the source page and the translated page carry identical layout, which is
the claim TranslateYourPDF makes.

- **It is an enhancement, never a requirement.** No WebGL context, or
  `prefers-reduced-motion`, falls back to the flat before/after spread, and the
  peel is also driven by a real `<button>` so it works without a pointer.
- Light is matte and normalised against a flat sheet: an unrolled page prints
  exactly as authored, only the curl picks up shade. No specular highlight, no
  environment map, no shadow plane — same reason the CSS has no drop shadows.
- The page art is drawn to a 2D canvas at runtime (`pageTexture.ts`) rather than
  shipped as an image, so it stays bilingual and both faces stay identical.
- Every page is drawn twice: once as printed, once with each mark filled by its
  place in reading order. The shader compares that order map against a typing
  clock, so the translation writes itself onto the uncovered sheet — heading,
  measure, figure, folio. Add a mark to `drawPage` and give it a slot in
  `ORDER`, or it will simply be there from the first frame.
- Keep the scene inside the page's own footprint. A 180° flip swings out of
  frame at panel aspect ratios; the roll does not.

## Motion

`motion/react` with `MotionConfig reducedMotion="user"`. Reuse the existing
`rise` / `stagger` variants and the `reveal` spread rather than writing new
transition values per component.
