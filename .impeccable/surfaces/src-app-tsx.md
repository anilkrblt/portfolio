---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: ["src/index.css","index.html"]
---

# Portfolio home (single page)

## Scope and mode

The whole single-page portfolio (`src/App.tsx`, `src/index.css`, `index.html`).
Visitor mode: **Persuade**. A recruiter decides whether to shortlist and acts by
downloading the CV or making contact.

## Audience, job, action, proof, constraints

- Audience: recruiters and HR screeners, ~30-second scan, many tabs open.
- Job: confirm identity, role and availability; see proof of shipping; leave with the CV
  or an email address.
- Primary action: CV download in the visitor's language (working file link), with email
  one step away. Secondary: open the live product.
- Proof: TranslateYourPDF live; EAA Monitor and Randevai real builds with screenshots;
  the CI-backed development loop table.
- Constraints: bilingual TR/EN everywhere; light/dark theme switch; WebGL page-curl demo
  with flat fallback; portrait; project archive; honest status; WCAG AA; reduced motion.

## Chosen direction and memorable moment

Spy-dossier title sequence, chosen by the user on 2026-10-28. The memorable moment: the
surveillance frames cut in, the reticle sweeps and settles on the portrait, the name types
itself, and a red AVAILABLE stamp lands last.

## Direction contract

THESIS: The portfolio is the candidate's case file, revealed the way a sixties title
sequence reveals an agent: frames cut in, a typed name, a red stamp landing last. Every
claim is an exhibit with its evidence attached and its status stamped. It refuses the
dark developer-portfolio card grid and the warm-paper editorial broadsheet it replaces.

OWN-WORLD: Saturated manila-folder ground (never pale cream), black matte stock for the
file rail, exhibit frames and contact; alarm red reserved for state only (live,
available, reticle). Exhibits are coarse halftone rendered in canvas. Courier Prime
typed records and display caps; Libre Franklin as the preprinted form labels. Black
buttons with corner brackets, ruled form tables, numbered file tabs, rubber stamps
(red = live/active, black = in development, gray = archived). Night theme: the title
sequence projected on black, manila type.

STORY: The recruiter sees name, face, role and availability at once, finds the live
product with its evidence, sees two real builds stamped in development, checks the
procedure that backs the claims, and leaves with the CV or an email address.

FIRST VIEWPORT: Desktop: sticky left file rail (black brand block, TR/EN and day/night
switches, CV button, six numbered tabs with scrollspy, dossier-status facts). Main
column: ANIL KARABULUT in huge typed caps with a block cursor (no meta line above it:
kickers are banned); the one sentence; CV download as the black bracketed primary, live
product beside it, GitHub as a typed link; to the right a 3×3 surveillance array,
portrait spanning 2×2 under the reticle, red AVAILABLE stamp struck across its corner,
five exhibit frames each holding one whole object (the demo chart, four product
headlines printed as dot matrix). Mobile: black top bar with CV, typed name, sentence,
the array, then copy and actions.
SIGNATURE: the reticle sweeps the array and locks on the portrait as the stamp lands;
afterwards hovering or focusing any exhibit moves the reticle there and declassifies
it (halftone to true image) while its caption types in.
MOTION: cuts and typed reveals, never soft drifts; stamps land hard once; everything
static under reduced motion.

FORM: Spy-dossier title sequence (catalog challenger
pop-culture-shelf-spy-dossier-title-sequence), chosen over the assigned grounded
direction (#4 of 7, Transfer) and the pick (#1, Kimlik Sayfası). seed:d7df285847f62f98

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved decisions

- None open. Resolved 2026-10-28: `public/og.png` replaced with a dossier card;
  CLAUDE.md design-system section rewritten to this world; DESIGN.md and
  `.impeccable/design.json` recorded from the build after the finish review shipped.
