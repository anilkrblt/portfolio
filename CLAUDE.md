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
- `src/index.css` — the whole design system: theme tokens, the type scale and
  the primitives (`.desk`, `.sheet`, `.watermark`, `.letter`, `.clipped`,
  `.masthead`, `.btn`, `.switch`, `.enclosure`, `.status`, `.steps`/`.step`,
  `.rows`/`.row`, `.plate`, `.term`…). Primitives live in `@layer components` and
  element defaults in `@layer base`, so Tailwind utilities always win.
- `src/three/` — the WebGL page-curl demo (`PageCurl.tsx`, its own lazy chunk)
  and `pageArt.ts`, the three-free canvas drawing of the demo sheet that the
  flat fallback spread also prints.
- `index.html` — meta tags, font preloads, and the inline script that resolves
  the theme before first paint.
- `public/` — CVs, screenshots, portrait, OG image, and the self-hosted font in
  `fonts/` (Spectral and Hanken Grotesk, OFL). `monogram.png` and `clip-*.png` are
  computed rasters, not photographs.
- `DESIGN.md` — the recorded design system; `PRODUCT.md` — product truth.

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

The page is a formal letter of introduction on heavy stock (full record in
`DESIGN.md`). Two themes, `gunduz` (dove-grey sheets on a vişne çürüğü desk,
default) and `gece` (aubergine stock), switched via `data-theme` on `<html>` and
persisted to `localStorage` under `ak_theme`; any other stored value opens on
`gunduz`.

- Use the semantic Tailwind colors (`bg-canvas`, `text-ink`, `text-muted`,
  `border-rule`, `text-alarm`, `bg-stock`, `text-on-stock`…), never raw hex.
  They are mapped from CSS variables in the `@theme` block so both themes stay
  in sync. `canvas` is the sheet, `stock` is the desk; on the desk (`.on-stock`:
  the masthead, section heads, the demo panel, the contact) use the `*-stock` /
  `on-stock*` colors.
- Readable content sits on a `Sheet`. Section titles sit on the desk through
  `SectionHead`, with their enclosure number at the right edge.
- The enclosure index in the letter and the section marks share one numbering:
  Ek 1 is the CV, then the products, then `SECTION_ENCLOSURES`.
- Alarm means state and nothing else: live, available, active. Never decoration.
- Status is a square mark: `.status-live` filled, `.status-building` outline.
- Type: Spectral is the letter's voice (body, headings); Hanken Grotesk, via the
  `.form` class, is the office form (labels, tables, controls). Spectral ships
  300, 400, 500 and italic 400 only, so bold text must be `.form`. No eyebrow
  labels above headings.
- Square corners; one soft shadow on sheets and the print; no gradients, no icons
  as decoration. No script font imitating a signature: the name is typed.
- Keep contrast at WCAG AA or better, and keep the
  `prefers-reduced-motion` block in `src/index.css` working.

## Motion

`motion/react` with `MotionConfig reducedMotion="user"`, `layEase` throughout.
Motion is a sheet settling on a desk, never a fade: `lay` moves a sheet into
place once and it is readable throughout. The monogram presses in on load, the
photograph straightens on hover, and the pointer holds a sheet to the light to
show its watermark. Nothing else moves.
