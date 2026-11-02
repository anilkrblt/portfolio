---
name: Anıl Karabulut — Ebru
description: The portfolio as an ebru pulled from a çivit indigo bath, printed onto cool sized paper once.
colors:
  sized-paper: "#eef0ed"
  paper-raised: "#e2e6e3"
  indigo-ink: "#141c45"
  ink-body: "#232a4d"
  ink-muted: "#4c5374"
  ink-faint: "#5f6585"
  rule-soft: "rgba(20, 28, 69, 0.2)"
  asi-red: "#a8361d"
  civit-bath: "#1d2a66"
  bath-raised: "#24337a"
  on-bath: "#f1f2ec"
  on-bath-muted: "#b9c0dc"
  bath-rule: "rgba(241, 242, 236, 0.24)"
  bath-alarm: "#ff8c6b"
  ochre: "#d9a23a"
  stone-1: "#22317a"
  stone-2: "#19245b"
  stone-3: "#273883"
  stone-4: "#1f2d6e"
  pigment-turquoise: "#4fa39b"
  pigment-rose: "#d98f87"
  pigment-lahor: "#9fb3dc"
  pigment-deep: "#101741"
  night-paper: "#0b1024"
  night-raised: "#111836"
  night-ink: "#eef0ea"
  night-body: "#d4d8e6"
  night-muted: "#a2a9c4"
  night-faint: "#8b92ae"
  night-rule: "rgba(238, 240, 234, 0.7)"
  night-rule-soft: "rgba(238, 240, 234, 0.16)"
  night-alarm: "#ff8a6a"
  night-bath: "#141d4a"
  night-bath-raised: "#1b265a"
  night-on-bath-muted: "#b3bbd8"
  night-bath-alarm: "#ff9677"
  night-ochre: "#c99032"
  night-ink-press: "#c8cde0"
typography:
  display:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 7.2vw, 6rem)"
    fontWeight: 780
    lineHeight: 0.92
    letterSpacing: "-0.018em"
    fontVariation: "'wdth' 90"
  headline:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 4.4vw, 3.5rem)"
    fontWeight: 740
    lineHeight: 1.02
    letterSpacing: "-0.016em"
    fontVariation: "'wdth' 92"
  sheet-title:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 3.4vw, 2.75rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.018em"
    fontVariation: "'wdth' 92"
  sentence:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.35rem, 2.2vw, 1.85rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.3rem, 2vw, 1.65rem)"
    fontWeight: 700
    lineHeight: 1.18
    letterSpacing: "-0.012em"
  lede:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.06rem, 1.25vw, 1.16rem)"
    fontWeight: 400
    lineHeight: 1.62
  body:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9rem"
    lineHeight: 1.55
  label:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 650
    lineHeight: 1.4
    letterSpacing: "0.09em"
    fontVariation: "'wdth' 78"
  button:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 650
    letterSpacing: "-0.005em"
rounded:
  plate: "0.5rem"
  projection: "0.75rem"
  drop: "999px"
spacing:
  shell-phone: "1.25rem"
  shell-tablet: "2.25rem"
  shell-desk: "3rem"
  band-phone: "5rem"
  band-desk: "7rem"
  section-head: "3rem"
  container: "78rem"
components:
  button-ink:
    backgroundColor: "{colors.indigo-ink}"
    textColor: "{colors.sized-paper}"
    typography: "{typography.button}"
    rounded: "{rounded.drop}"
    padding: "0.8rem 1.6rem"
    height: "3.25rem"
  button-ink-hover:
    backgroundColor: "{colors.bath-raised}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.indigo-ink}"
    rounded: "{rounded.drop}"
    padding: "0.8rem 1.6rem"
  button-ghost-hover:
    backgroundColor: "{colors.paper-raised}"
  button-paper:
    backgroundColor: "{colors.on-bath}"
    textColor: "{colors.civit-bath}"
    rounded: "{rounded.drop}"
    padding: "0.8rem 1.6rem"
  button-paper-hover:
    backgroundColor: "{colors.ochre}"
  switch-option-active:
    backgroundColor: "{colors.indigo-ink}"
    textColor: "{colors.sized-paper}"
    rounded: "{rounded.drop}"
    height: "2.1rem"
  plate:
    backgroundColor: "{colors.paper-raised}"
    rounded: "{rounded.plate}"
  projection:
    backgroundColor: "{colors.civit-bath}"
    textColor: "{colors.on-bath}"
    rounded: "{rounded.projection}"
    padding: "1.75rem"
  step-mark:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.indigo-ink}"
    rounded: "{rounded.drop}"
    size: "2.25rem"
---

# Design System: Anıl Karabulut — Ebru

## Overview

**Creative North Star: "The Ebru Tray"**

The page is Turkish paper marbling: an idea dropped into a çivit indigo bath as pigment, combed into pattern, and pulled onto sized paper once, the same one-way trip a product makes from idea to live. Indigo carries the bath regions (the hero, the demo, the contact); cool sized paper with indigo ink carries the reading; earth pigments live only inside the marbling; and aşı red means state. Every marbled surface is computed in a canvas from a seeded polygon simulation, never an image, so the same bath is poured on every visit and every pattern can name where it came from.

Density is calm and editorial: wide bands of paper between the indigo regions, one family set large for names and small and condensed for field names, records ruled with hairlines. The drop is the one recurring shape. Status is a drop, the current nav item is a drop, the portrait sits in the innermost drop of a bülbül yuvası nest, and buttons are pulled pills whose hover is a drop spreading from the centre.

The world explicitly replaces the dark developer card grid, the warm cream editorial page, and the earlier manila case file. Nothing of the case file (Courier, manila, black stock, stamps, heavy form rules) carries over.

**Key Characteristics:**
- A committed çivit indigo bath for hero, demo and contact; cool paper (not cream) everywhere else.
- Marbling is computed live from CSS-declared stones and pigments, and the stones under copy stay tone-on-tone.
- One family, Bricolage Grotesque, carrying every role through weight, width and optical size.
- Drops and pills: round marks, softly rounded sheets, no hard boxes and no shadows.
- Aşı red is reserved for state. Ochre is the one pigment allowed out of the bath.
- Motion spreads fast and settles: the pour, the pull, the walk, each played once.

## Colors

The palette is a cool indigo-and-paper pair, with a small set of earth pigments that stay inside the bath and one red that only reports state.

### Primary
- **Çivit Bath** (civit-bath): the committed indigo surface of the hero tray, the demo projection, the contact footer and every marbled strip's ground. Text on it is On-Bath paper (11.8:1) or On-Bath Muted (7.4:1).
- **Indigo Ink** (indigo-ink): headings, the filled pill button, the active switch option, the nav drop, heavy rules on paper and the focus outline. Body copy uses the slightly lighter Ink Body (12.1:1 on paper).

### Secondary
- **Ochre** (ochre): the one pigment that leaves the bath. Outside the marbling it appears in exactly three places: text selection (Indigo Ink on ochre), the paper button's hover spread, and the ring around the process step the walk rests on. Never a fill for content, never a status.

### Tertiary
- **Aşı Red** (asi-red on paper, bath-alarm on indigo): live, available, active. It colours the live and available status drops, the current-role drop and the text caret. Never a pigment, never decoration. 5.7:1 on paper, 5.85:1 on the bath and 4.66:1 even on the lightest stone.

### Neutral
- **Sized Paper** (sized-paper): the reading ground. Cool grey-green, deliberately not cream.
- **Raised Paper** (paper-raised): the recessed process band, plate backgrounds, step marks, and the ghost button's hover spread.
- **Ink Muted / Ink Faint** (ink-muted, ink-faint): secondary text and field labels (6.5:1), then dates, separators and the faintest metadata (4.97:1 on paper, 4.5:1 on raised paper).
- **Soft Rule** (rule-soft): hairline row dividers, the masthead edge, plate edges, the process stem.
- **Bath Raised / Bath Rule** (bath-raised, bath-rule): the ink button's hover spread and the ghost hover on the bath; hairlines inside indigo regions.

### Marbling (canvas only)
- **Stones** (stone-1 to stone-4): four tone-on-tone indigos declared in `--bath-stones`. These are the only marks allowed under copy.
- **Pigments**: paper white (on-bath), ochre, turquoise, rose, lahor blue and deep indigo (pigment-deep), declared in `--bath-pigments`. They make up the nest rings, the open-bath drops and the sheet strips. Rose is a pigment and must never stand in for red.

### Gece (night)
Gece is the bath at night: Night Paper becomes the ground, Night Ink and Night Body sit on it (13.3:1 body), muted 8.1:1, faint 6.1:1, alarm 8.2:1. The bath darkens to Night Bath with its own stones and pigments, and Night Ink Press (a pale indigo) replaces bath-raised as the ink button's spread, because the ink button turns pale in this theme. All night pairs measure 6:1 or better.

### Named Rules
**The State-Only Red Rule.** Aşı red marks live, available and active, and nothing else. If removing the red would leave the meaning intact, the red should not be there.

**The Ochre Leaves Once Rule.** Ochre is the only pigment allowed outside the marbling, and only for selection, the paper button's press, and the resting process step. Turquoise, rose and lahor never appear in UI chrome.

**The Calm Stones Rule.** The marbling canvas reads stones and pigments from CSS. Any region marked `data-calm` (headline, copy, actions, facts) gets tone-on-tone stones only, and bright pigment never lands under text.

## Typography

**Display Font:** Bricolage Grotesque (self-hosted variable, weight 200–800, width 75–100%, optical sizing auto), falling back to ui-sans-serif, system-ui
**Body Font:** the same family
**Label Font:** the same family, condensed

**Character:** One grotesque with a bit of ink trap and wobble. It sets heavy and slightly narrow for the name, turns plain at reading sizes, and condenses into small uppercase for field names, so one voice carries every role.

### Hierarchy
- **Display** (780, 90% width, clamp 3–6rem, 0.92 leading): the name in the hero only, in paper ink on the bath.
- **Headline** (740, 92% width, clamp 2.1–3.5rem, 1.02): section titles, set left in the section head.
- **Sheet Title** (800, 92% width, clamp 1.9–2.75rem, 1.0): product names at the head of each product sheet.
- **Sentence** (600, clamp 1.35–1.85rem, 1.2): the one-line positioning sentence (max 22ch) and the contact availability line.
- **Title** (700, clamp 1.3–1.65rem, 1.18): sub-section titles inside a band.
- **Lede** (400, clamp 1.06–1.16rem, 1.62): hero summary and product descriptions, 54–60ch.
- **Body** (400, 1.0625rem, 1.6): running text, at most around 64ch.
- **Small / Micro** (0.9rem / 0.78rem): secondary notes, status drops, switch options.
- **Label** (650, 78% width, 0.78rem, 0.09em tracking, uppercase): field names in definition lists, list headings inside sheets, provenance lines, the comb hint. Always a field name or a provenance, never a decorative line above a heading.

### Named Rules
**The One Family Rule.** Every role is Bricolage Grotesque. Hierarchy comes from weight, width and size, never from a second face.

**The Field Name Rule.** Condensed uppercase labels name a field (Location, Facts, Stack) or a pattern's provenance. They never sit above a headline as a kicker.

## Layout

There is one centred shell (max 78rem) with side padding of 1.25rem, 2.25rem from 768px and 3rem from 1280px. Sections are bands with 5rem vertical padding, 7rem from 768px, alternating paper and raised paper, with indigo bath regions at the top (hero) and bottom (contact).

- **Section head:** stacked on a phone. From 768px it splits into title left and a 25rem right column holding the motif seal and the lead, aligned to the bottom, with 3rem below.
- **Hero:** stacked as name, portrait, rest on a phone, so the face arrives before the fold. From 1024px it becomes a two-column grid (1.08fr / 0.92fr) at viewport height minus the 4rem masthead, with the portrait spanning all rows on the right. The portrait slot reserves 0.56 × the drop's diameter above and below on small screens, so nest rings never land under copy.
- **Product sheet:** a full-width marbled strip and its provenance, then a ruled title row, then a two-column record (copy left, evidence right) from 1024px.
- **Process row:** a vertical stem on a phone, four columns on a horizontal stem from 900px.
- **Breakpoints:** 768px, 900px (steps), 1024px (hero, sheets), 1280px (nav and shell). The full nav shows from the xl breakpoint, with a ghost menu pill below it.

## Elevation & Depth

The system is flat. There are no box shadows anywhere. Depth comes from material instead: indigo bath regions against paper, raised paper bands, hairline rules, and the marbling itself, which lies on the bath like pigment on size. The sticky masthead is near-opaque paper (94%) with a soft bottom hairline. The one rendered shade is inside the demo: the page curl's shader darkens the fold as part of the simulation. That shading belongs to the simulated paper, and it is not a shadow for UI.

### Named Rules
**The Pigment-Not-Shadow Rule.** Separation comes from a change of material (bath, paper, raised paper) or a rule, never from a cast shadow or a gradient.

## Shapes

The form language is drops and pulled sheets. Fully round (999px) for every mark and control: buttons, switches, status drops, step marks, the nav drop, the portrait and the motif seals. Gently rounded (0.5rem) for things laid on the page, like screenshot plates and marbled strips. Slightly softer (0.75rem) for the demo projection, a small tray of its own. The contact strip runs edge to edge with square ends because it is the sheet's edge, not an object on it. Lines are hairlines (1px soft rule) or a 1.5px ink rule on top of a ruled list; dotted only for the archived status ring.

## Components

### Buttons
Pulled pills: confident, filled, and alive under the pointer.
- **Shape:** fully round (999px), at least 3.25rem tall (2.5rem in the masthead and demo), 1.5px border in the fill colour.
- **Ink (primary on paper):** Indigo Ink fill, paper text, 650 weight.
- **Hover / Focus:** a circle of the spread colour grows from the centre (clip-path circle 0% to 75%, 520ms, spread ease). Ink spreads Bath Raised, ghost spreads Raised Paper, paper spreads Ochre. Focus also shows the 2px ink outline at 3px offset.
- **Ghost:** transparent with an ink border. On the bath the border and text turn On-Bath and the spread is Bath Raised.
- **Paper (primary on the bath):** paper punched out of the indigo, with Çivit Bath text. It is the hero's CV action.

### Switches
- **Style:** two drops on a short stem. A round 1px soft-rule capsule holding round options (2.1rem tall, micro size, 650 weight).
- **State:** the pressed option fills Indigo Ink with paper text. Unpressed options are muted and darken to ink on hover. Used for TR/EN and Gündüz/Gece.

### Navigation
- **Style:** a sticky paper masthead (4rem) with the drop wordmark, six links at 0.94rem/560 in muted ink, the switches, and an ink CV pill.
- **Active:** the current section turns ink, and a 0.4rem ink drop scales in beneath it (420ms spread ease). No underline.

### Status Drops
Status is a drop: a 0.72em circle with a 2px ring, followed by the word in small 650.
- **Live / available / current:** aşı red, filled (bath-alarm on indigo).
- **In development:** an ink ring, unfilled.
- **Archived:** a muted dotted ring.

### Plates and Rows
- **Plate:** screenshots laid on the page. Raised paper behind, a 1px soft-rule edge, 0.5rem corners. On hover the edge turns ink and the image scales 1.015 (700ms).
- **Rows:** ruled lists with a 1.5px ink top rule and 1px soft-rule dividers. Bullets are drops: filled ink for facts, an ink ring for highlights. Tech terms run inline, separated by faint middots.

### Marbled Strip and Motif Seal (signature)
Every product sheet, section seal and the contact edge carries a marbled pattern computed in a canvas. Each one is poured from a seed with one of three numbered motifs over the same pigments: **01 Gelgit** (back-and-forth combing plus a wave), **02 Taraklı** (fine comb), **03 Battal** (large uncombed stones). Each pattern has a **provenance** label beside it ("No. 02 · Taraklı — computed, seed 22"). The **motif seal** is a round 6–7rem pour of one unit set beside its provenance in the section head's right column. Strips arrive by the pull: a clip reveal from top to bottom over 0.95s, once.

### Hero Bath (signature)
The hero is a full-viewport tray of Çivit Bath with the marbling canvas behind the grid. On arrival it pours itself: stones scatter over about 0.5s (tone-on-tone near copy, about 16% bright pigment in the open), then 11 nest drops land 80ms apart on the portrait, each pushing the last outward into a ring (white, ochre, deep, white, turquoise, lahor, rose, deep, white, ochre, bath). The last drop becomes the portrait's frame, and the face scales in from 0.18 (0.75s). A five-petal pull (650ms) then a curl (750ms) bloom the rings. Afterwards the visitor can comb the bath with a drag and drop new pigment with a tap. Copy, controls and the portrait keep their own gestures. A condensed label in the corner hints at the comb.

### Process Walk
Four round step marks hang on a 1.5px stem. When the row enters view, a "now" drop walks it once (250ms, then 520ms per step). Reached marks fill with ink, and the resting step keeps an ochre ring that scales in.

### Demo Projection
A small tray of Çivit Bath (0.75rem corners) holding the page-curl demo sheet, with labels and a ghost pill in its chrome. The sheet is drawn in canvas in a paper and indigo-ink palette with a deeper ochre accent. It peels once, 900ms after it comes into view.

### Motion
The shared ease is the spread ease, cubic-bezier(0.16, 1, 0.3, 1): fast out, then still, like pigment spreading on the size. Motion is the pour, the pull and the walk, each played once. Nothing drifts or loops. Under reduced motion, the bath is poured statically in one frame with the portrait in place, the comb is disabled and its hint hidden, the process row shows all steps reached, and CSS transitions collapse to 0.01ms.

## Do's and Don'ts

### Do:
- **Do** put the name, the demo and the contact on the Çivit Bath, and everything read at length on Sized Paper.
- **Do** declare marbling colours in `--bath-stones` and `--bath-pigments` per theme, and mark every text region over the bath `data-calm`.
- **Do** compute every marbled surface from a seed with a numbered motif (01 Gelgit, 02 Taraklı, 03 Battal) and print its provenance beside it.
- **Do** mark status with a drop: filled aşı red for live or available, an ink ring for in development, a dotted muted ring for archived.
- **Do** use the centre-out spread (520ms, spread ease) for pill hovers, and the spread ease for every authored transition.
- **Do** keep text pairs at WCAG AA or better in both themes, including bath-alarm over the lightest stone.

### Don't:
- **Don't** use aşı red as a pigment, an accent or decoration, and don't use rose where red is meant.
- **Don't** let turquoise, rose or lahor into UI chrome. Ochre is the only pigment that leaves the bath, and only for selection, the paper button's press and the resting step.
- **Don't** use a raster image for marbling. Patterns are computed.
- **Don't** introduce a second typeface, a cream or warm paper ground, or a dark card grid.
- **Don't** add box shadows, CSS gradients or hard rectangular cards to UI. Depth is material and rules. The page curl's simulated fold shading is the only exception.
- **Don't** put a condensed label above a headline as a kicker or eyebrow.
- **Don't** add looping or drifting motion, or per-section entrance animations beyond the strip pull and the process walk.
