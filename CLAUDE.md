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
  the ebru primitives (`.masthead`, `.tray`, `.btn`, `.switch`, `.strip`,
  `.drop`, `.steps`/`.step`, `.rows`/`.row`, `.plate`, `.term`…). Primitives
  live in `@layer components` and element defaults in `@layer base`, so
  Tailwind utilities always win.
- `src/ebru/marbling.ts` — the mathematical marbling engine (drops, stylus
  strokes, tines, the bloom) that paints the hero's bath and every marbled
  strip. No React, no images: every pattern is computed.
- `src/three/` — the WebGL page-curl demo (`PageCurl.tsx`, its own lazy chunk)
  and `pageArt.ts`, the three-free canvas drawing of the demo sheet that the
  flat fallback spread also prints.
- `index.html` — meta tags, font preloads, and the inline script that resolves
  the theme before first paint.
- `public/` — CVs, screenshots, portrait, OG image, and the self-hosted font in
  `fonts/` (Bricolage Grotesque, OFL).
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

The page is ebru, Turkish paper marbling (full record in `DESIGN.md`). Two
themes, `gunduz` (the sheet pulled into daylight, default) and `gece` (the bath
at night), switched via `data-theme` on `<html>` and persisted to
`localStorage` under `ak_theme`; any other stored value opens on `gunduz`.

- Use the semantic Tailwind colors (`bg-canvas`, `text-ink`, `text-muted`,
  `border-rule`, `text-alarm`, `bg-stock`, `text-on-stock`…), never raw hex.
  They are mapped from CSS variables in the `@theme` block so both themes stay
  in sync. Inside the indigo bath (`.on-stock`: the hero, the demo panel, the
  contact) use the `*-stock` / `on-stock*` colors.
- The marbling canvas reads its colours from `--bath-stones` and
  `--bath-pigments`. Stones are tone-on-tone indigo and are the only thing
  allowed under copy (mark copy blocks in the hero `data-calm`); the earth
  pigments (white, ochre, turquoise, rose, lahor blue, deep) live only inside
  marbling. Ochre is the one pigment that leaves the bath (selection, the
  paper button's press, the resting process step).
- Alarm red means state and nothing else: live, available, active. Never
  decoration, never a pigment.
- Status is a drop (`.drop-live` filled red, `.drop-building` ink ring,
  `.drop-archived` dotted ring). Drops and pills are the shape language;
  no drop shadows, no gradients, no glass or blur.
- Every marbled pattern names its unit from the numbered motif set
  (`MOTIF_NUMBER`: 01 Gelgit, 02 Taraklı, 03 Battal) through `Provenance`.
- Type: one family, Bricolage Grotesque, across optical sizes and widths
  (condensed for `.label`). No eyebrow labels above headings.
- Keep contrast at WCAG AA or better, and keep the
  `prefers-reduced-motion` block in `src/index.css` working.

## Motion

`motion/react` with `MotionConfig reducedMotion="user"`. Motion is pigment
spreading (fast out, then still: `spreadEase`), never soft drifts. The hero's
pour is the one authored moment: stones drop, the nest lands on the portrait,
the stylus pulls and curls the petals; afterwards the visitor can comb the
bath (drag) or drop pigment (tap). Elsewhere: the `pull` reveal on marbled
strips and the process row's one walk. Sections do not get their own entrance
animations. Under reduced motion the bath is poured instantly and is static.
