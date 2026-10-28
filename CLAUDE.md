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
- `src/index.css` — the whole design system: theme tokens, the two type voices
  and the case-file primitives (`.rail`, `.tab`, `.btn`, `.frame`, `.photostat`,
  `.stamp`, `.rows`/`.row`, `.term`…). Primitives live in `@layer components`
  and element defaults in `@layer base`, so Tailwind utilities always win.
- `src/three/` — the WebGL page-curl demo (`PageCurl.tsx`, its own lazy chunk)
  and `pageArt.ts`, the three-free canvas drawing of the demo sheet that the
  hero's exhibit frame also prints.
- `index.html` — meta tags, font preloads, and the inline script that resolves
  the theme before first paint.
- `public/` — CVs, screenshots (plus light JPEG copies in `exhibits/` for the
  hero), portrait, OG image, and the self-hosted fonts in `fonts/` (OFL).
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

The page is a sixties case file (full record in `DESIGN.md`). Two themes,
`gunduz` (the manila folder, default) and `gece` (the title sequence projected
on black), switched via `data-theme` on `<html>` and persisted to
`localStorage` under `ak_theme`; any other stored value opens on `gunduz`.

- Use the semantic Tailwind colors (`bg-canvas`, `text-ink`, `text-muted`,
  `border-rule`, `text-alarm`, `bg-stock`, `text-on-stock`…), never raw hex.
  They are mapped from CSS variables in the `@theme` block so both themes stay
  in sync. Inside black stock (`.on-stock`: the rail, the demo projection, the
  contact sheet) use the `*-stock` / `on-stock*` colors.
- Alarm red means state and nothing else: live, available, active, the
  reticle. Never decoration.
- Heavy form rules (2–4px), dashed row rules, black stock and scale carry
  hierarchy. Square corners; no drop shadows, no rounded cards, no blur, no
  gradients.
- Type: Courier Prime is the typewriter (records, display, buttons); Libre
  Franklin is the preprinted form (`.label` field names, exhibit tags). No
  eyebrow labels above headings.
- Product status is a stamp: red `Yayında` / `Live`, ink `Geliştiriliyor` /
  `In development`.
- Keep contrast at WCAG AA or better, and keep the
  `prefers-reduced-motion` block in `src/index.css` working.

## Motion

`motion/react` with `MotionConfig reducedMotion="user"`. Motion is cuts and
typed reveals, never soft drifts. Reuse the shared `rise` (cut-in), `stagger`,
`land` (stamp) variants, the `reveal` spread and the `track` transition rather
than writing new transition values per component. The hero title sequence is
the one authored moment; sections do not get their own entrance animations.
