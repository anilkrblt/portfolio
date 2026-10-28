---
name: Anıl Karabulut — Dosya
description: The candidate's case file, revealed like a sixties title sequence on a manila folder.
colors:
  manila: "#e4cd95"
  manila-raised: "#d5bb84"
  manila-photo-paper: "#e9d6a6"
  ink: "#141311"
  ink-body: "#1f1d19"
  ink-muted: "#4f4739"
  ink-faint: "#5b574d"
  rule-soft: "rgba(20, 19, 17, 0.3)"
  alarm: "#9e1f18"
  archive-gray: "#58554c"
  stock: "#141311"
  stock-raised: "#22201b"
  on-stock: "#e4cd95"
  on-stock-muted: "#b3a683"
  stock-rule: "#3a362e"
  stock-alarm: "#ef5f55"
  stock-pressed: "#000000"
  manila-pressed: "#f1dcab"
  night-canvas: "#121110"
  night-raised: "#1c1a17"
  night-body: "#d9c79e"
  night-muted: "#aca083"
  night-faint: "#8f8670"
  night-rule: "rgba(228, 205, 149, 0.62)"
  night-rule-soft: "rgba(228, 205, 149, 0.22)"
  night-alarm: "#f0564b"
  night-stock-raised: "#26231e"
  night-stock-alarm: "#f2665b"
  night-archive-gray: "#8f8670"
typography:
  display:
    fontFamily: "Courier Prime, Courier New, ui-monospace, monospace"
    fontSize: "clamp(2.7rem, 15vw, 5rem)"
    fontWeight: 700
    lineHeight: 0.94
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Courier Prime, Courier New, ui-monospace, monospace"
    fontSize: "clamp(1.85rem, 3.5vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.01em"
  sentence:
    fontFamily: "Courier Prime, Courier New, ui-monospace, monospace"
    fontSize: "clamp(1.45rem, 2.5vw, 2.05rem)"
    fontWeight: 700
    lineHeight: 1.18
  title:
    fontFamily: "Courier Prime, Courier New, ui-monospace, monospace"
    fontSize: "clamp(1.25rem, 2vw, 1.6rem)"
    fontWeight: 700
    lineHeight: 1.2
  lede:
    fontFamily: "Courier Prime, Courier New, ui-monospace, monospace"
    fontSize: "clamp(1.02rem, 1.3vw, 1.12rem)"
    fontWeight: 400
    lineHeight: 1.65
  body:
    fontFamily: "Courier Prime, Courier New, ui-monospace, monospace"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    fontFeature: "tnum"
  record-title:
    fontFamily: "Courier Prime, Courier New, ui-monospace, monospace"
    fontSize: "clamp(1.7rem, 3vw, 2.4rem)"
    fontWeight: 700
    lineHeight: 1
  control:
    fontFamily: "Courier Prime, Courier New, ui-monospace, monospace"
    fontSize: "0.95rem"
    fontWeight: 700
    letterSpacing: "0.06em"
  small:
    fontFamily: "Courier Prime, Courier New, ui-monospace, monospace"
    fontSize: "0.875rem"
    lineHeight: 1.6
  micro:
    fontFamily: "Courier Prime, Courier New, ui-monospace, monospace"
    fontSize: "0.75rem"
    lineHeight: 1.45
  label:
    fontFamily: "Libre Franklin, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.12em"
rounded:
  none: "0px"
spacing:
  gutter-sm: "1.25rem"
  gutter-md: "2rem"
  gutter-lg: "3rem"
  band-sm: "4.5rem"
  band-md: "6.5rem"
  section-head: "2.75rem"
  rail: "17rem"
  shell-max: "76rem"
components:
  button-primary:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.on-stock}"
    typography: "{typography.control}"
    rounded: "{rounded.none}"
    padding: "0.75rem 1.5rem"
    height: "3.25rem"
  button-primary-hover:
    backgroundColor: "{colors.stock-pressed}"
    textColor: "{colors.on-stock}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.none}"
    padding: "0.75rem 1.5rem"
    height: "3.25rem"
  button-secondary-hover:
    backgroundColor: "{colors.manila-raised}"
    textColor: "{colors.ink}"
  button-file:
    backgroundColor: "{colors.on-stock}"
    textColor: "{colors.stock}"
    typography: "{typography.control}"
    rounded: "{rounded.none}"
    height: "3.25rem"
  button-file-hover:
    backgroundColor: "{colors.manila-pressed}"
    textColor: "{colors.stock}"
  tab:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.on-stock}"
    rounded: "{rounded.none}"
    height: "2.375rem"
  tab-active:
    backgroundColor: "{colors.on-stock}"
    textColor: "{colors.stock}"
  switch-option:
    backgroundColor: "transparent"
    textColor: "{colors.on-stock-muted}"
    height: "2.25rem"
    width: "2.5rem"
  switch-option-pressed:
    backgroundColor: "{colors.on-stock}"
    textColor: "{colors.stock}"
  stamp-live:
    textColor: "{colors.alarm}"
    rounded: "{rounded.none}"
    padding: "0.35rem 0.8rem 0.4rem"
  stamp-ink:
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.35rem 0.8rem 0.4rem"
  stamp-gray:
    textColor: "{colors.archive-gray}"
    rounded: "{rounded.none}"
    padding: "0.35rem 0.8rem 0.4rem"
  frame-tag:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.manila}"
    typography: "{typography.label}"
    padding: "0.2rem 0.45rem"
---

# Design System: Anıl Karabulut — Dosya

## Overview

**Creative North Star: "The Case File Title Sequence"**

The portfolio is a candidate's case file, revealed the way a sixties title sequence reveals an agent: frames cut in, a name types itself, a red stamp lands last. Everything sits on a saturated manila folder, is typed on a typewriter, and is filed under a black matte stock rail. Claims are exhibits: each carries a tag, a frame, and a status stamp. The density is a dossier's, ruled forms and typed rows rather than cards and gradients.

Two themes share one world. **Gündüz** (default) is the folder on the desk: manila ground, black ink, black stock. **Gece** is the same title sequence projected on black: near-black ground, manila type, the halftone flipped to a positive of light dots. Theme is set by `data-theme` on `<html>` (`gunduz` | `gece`), resolved before first paint from `localStorage` key `ak_theme`.

The world rejects the dark developer-portfolio card grid and the warm-paper editorial broadsheet it replaced (pale cream, Fraunces, hairline-and-2px-corners). Neither is current; do not reintroduce either.

**Key Characteristics:**
- Saturated manila ground, never pale cream; black matte stock for the rail, exhibit frames and contact sheet.
- Two voices: Courier Prime types every record; Libre Franklin is only the preprinted form label.
- Square everything: zero radius, 2px rules, 4px opening rules, dashed soft row dividers.
- Alarm red reserved for state.
- Exhibits are coarse canvas halftone that declassify to the true image on hover or focus.
- Motion is cuts, typing and one hard stamp landing; never soft drifts.

## Colors

A two-ink print job on manila stock: black, one alarm red, and the folder itself.

### Primary
- **Alarm Red** (alarm): the only accent. It marks state and nothing else: the live product, availability, the active role, the reticle, the caret, text selection, focus rings, and the pointer's attention on links and photostats. 5.1:1 on manila.
- **Stock Alarm** (stock-alarm): the same red lifted for black stock, where the dark red falls under 3:1. Used for text, check marks, hover and focus rings inside the rail and contact sheet (5.7:1 on stock). Night uses night-alarm on the canvas (5.5:1) and night-stock-alarm on night stock.

### Neutral
- **Folder Manila** (manila): the page ground in Gündüz and the type colour on all stock and in Gece.
- **Pressed Manila** (manila-raised): recessed bands such as the procedure section and the secondary button's hover.
- **Photo Paper** (manila-photo-paper): the paper a halftone exhibit is printed on, behind every frame and photostat.
- **Typewriter Ink** (ink): headings, rules, frame borders, the ink stamp; 11.9:1 on manila.
- **Body Ink** (ink-body): running text.
- **Faded Ink** (ink-muted): secondary text and form labels; 5.9:1 on manila.
- **Carbon Faint** (ink-faint): punctuation only (the comma between index terms); 4.6:1 on manila, the lightest ink that still passes AA, one step below Faded Ink.
- **Soft Rule** (rule-soft): dashed row dividers and link underlines at rest.
- **Archive Gray** (archive-gray): the archived stamp only; 4.8:1 on manila. It is a theme variable (`--c-archive-gray`); Gece uses night-archive-gray (5.2:1 on night canvas).
- **Pressed Black** (stock-pressed): the day primary button's hover, stock pressed to pure black. Theme variable `--c-stock-pressed`.
- **Pressed Manila Highlight** (manila-pressed): the hover fill of manila buttons, the rail CV button in both themes and the Gece primary. Theme variable `--c-manila-pressed`.
- **Matte Stock** (stock, stock-raised, stock-rule, on-stock, on-stock-muted): the black regions. These do not flip with the theme in meaning: on-stock is always manila type on black.
- **Night Canvas** (night-canvas, night-raised, night-body, night-muted 7.3:1, night-faint, night-rule, night-rule-soft): the Gece ground and its inks; manila on night-canvas is 12.1:1.

### Named Rules
**The Red Means State Rule.** Alarm red appears only where something is live, available, active, targeted or under the pointer. Never use it for decoration, section colour, or emphasis of ordinary copy.

**The Stock Red Rule.** Inside black stock, red is always stock-alarm, never alarm; focus rings switch automatically under `.on-stock`.

**The Manila Slip Rule.** Alarm red text sits only on the manila canvas, or as stock-alarm on black stock. Never put it directly on the raised band (manila-raised): a stamp that lands there, or straddles a rule, carries its own canvas-coloured slip behind it.

**The Semantic Token Rule.** Components use the semantic Tailwind colours (`bg-canvas`, `text-ink`, `border-rule`, `bg-stock`, `text-on-stock`, `text-alarm`, `text-stock-alarm`…) mapped from `--c-*` variables, never raw hex, so both themes stay in sync. Every colour, pressed states included, is defined in both theme blocks; component rules carry no hex of their own.

## Typography

**Display Font:** Courier Prime (with Courier New, ui-monospace)
**Body Font:** Courier Prime (with Courier New, ui-monospace)
**Label Font:** Libre Franklin (with ui-sans-serif, system-ui)

**Character:** The record is typed onto a preprinted form. Courier Prime carries every voice from the hero name to body copy, with tabular numerals throughout; Libre Franklin appears only as small spaced capitals naming fields, as if printed on the form before the typist arrived. Both are self-hosted from `public/fonts/` with Latin and Latin Extended subsets so Turkish renders in the true face.

### Hierarchy
- **Display** (700, uppercase, 0.94): clamp(2.7rem, 15vw, 5rem) on phones, 7.8vw from 768px, clamp(2.7rem, 5.7vw, 5rem) from 1024px; it never exceeds 5rem: the typed name in the hero only, followed by a block cursor. Sized so the longest word always fits its column.
- **Headline** (700, uppercase, clamp(1.85rem, 3.5vw, 2.75rem), 1.05, balanced): section titles beneath the 4px opening rule.
- **Sentence** (700, mixed case, clamp(1.45rem, 2.5vw, 2.05rem), 1.18): the one-sentence statement under the name and in the contact sheet.
- **Record Title** (700, clamp(1.7rem, 3vw, 2.4rem), 1): a product exhibit's name, on the line with its tag and stamp.
- **Title** (700, clamp(1.25rem, 2vw, 1.6rem), 1.2): subsection heads and the school name in the contact sheet. Archive entry titles sit one step down at 1.1rem.
- **Lede** (400, clamp(1.02rem, 1.3vw, 1.12rem), 1.65): opening paragraphs, held to 58–60ch.
- **Body** (400, 1rem, 1.65, tabular numerals): running text; long descriptions held to about 66ch.
- **Control** (700, uppercase, 0.95rem, 0.06em): button caps. The same 0.95rem step also sets some secondary body text in records.
- **Small** (0.875rem, 1.6): secondary text, captions, facts, rail values, file tabs and product stamps.
- **Micro** (0.75rem, 1.45): the smallest typed step, used for language and theme switches, compact buttons and stamps in the procedure table.
- **Label** (Libre Franklin 600, uppercase, 0.6875rem, 0.12em): preprinted field names (status, location, facts, stack). Exhibit tags and frame tags use the same voice in bold, canvas on ink.

### Named Rules
**The Closed Ramp Rule.** Sizes come from the steps above (micro, label, small, control, body, lede and the display scales). Never add a one-off rem value between them.

**The Two Voices Rule.** Typed (Courier Prime) for anything the candidate says; form (Libre Franklin) only for small uppercase field names and tags. No third family.

**The No Kicker Rule.** Nothing is stacked above a heading. An exhibit's tag and status stamp sit on the same line as its title; categories and years go below it.

## Layout

A file rail beside the record. From 1024px the page is a two-column grid: a sticky 17rem black stock rail (full viewport height, its own thin scroll, 1px stock-rule right edge) and the record column. Below 1024px the rail becomes a black top bar with the monogram, CV and menu. On desk screens under 860px tall the rail drops its least urgent fact row rather than scroll.

The record column is a shell capped at 76rem, with inline padding of 1.25rem, 2rem from 768px and 3rem from 1024px. Sections are bands with 4.5rem block padding, 6.5rem from 768px. Each opens with a section head: a 4px ink rule, 1.25rem gap, the headline, and an optional lead set right-aligned in a 24rem column from 768px, then 2.75rem before content.

The hero is three blocks. On a phone they stack name, frames, rest, so the face lands above the fold. From 768px the frames take the right column (1.08fr / 1fr, 3rem column gap) and the name and copy centre vertically against them. The surveillance array is a 3×3 square grid of halftone frames with the portrait spanning 2×2.

Record lists are ruled tables: a 2px rule above, 1px dashed soft rules between rows, a 2px rule closing, with fixed-width label columns (e.g. 11rem, 17rem, 18rem) on desktop.

## Elevation & Depth

Flat. There are no box shadows anywhere in the system. Depth is material, not light: black matte stock sits beside or within the manila folder, exhibits are mounted in 2px bordered frames, and stamps are struck across rules with their own scrap of canvas behind them. A fixed, non-interactive paper-fibre overlay (long thin turbulence streaks, opacity 0.09 multiplied in Gündüz, 0.05 screened in Gece) gives the folder its tooth.

### Named Rules
**The Matte Stock Rule.** Hierarchy comes from stock versus folder and from rule weight (4px opens, 2px frames, 1px dashed divides), never from shadows, blur, glows or gradients.

## Shapes

Square-cut. Radius is zero on every element. Corners are marked, not rounded: primary and file buttons carry four inset corner brackets (0.7rem by 2px, 5px from each corner) drawn as background gradients in the bracket colour. Stamps are a 3px border with a 1px outline 2px outside it, rotated between -3° and -8°, their ink eroded by a fractal-noise mask so it does not take everywhere. Tabs and the theme and language switches are boxes split by 2px rules.

## Components

### Buttons
Typed caps on black stock, bracketed at the corners.
- **Shape:** square (0px), 2px border, minimum height 3.25rem, padding 0.75rem 1.5rem, 0.6rem gap to an inline 16px icon.
- **Primary:** stock background, manila type, manila corner brackets. Hover fills stock-pressed (pure black) and the brackets turn stock-alarm. In Gece the primary inverts: manila background, near-black type and brackets; hover fills manila-pressed and the brackets turn alarm.
- **Secondary:** transparent with a 2px ink border and ink type; hover fills with manila-raised. On stock it takes manila border and type, hovering to stock-raised.
- **File (rail CV button):** manila punched out of the black rail, with stock-coloured brackets. Hover fills manila-pressed and the brackets turn stock-alarm.
- **Focus:** 2px alarm outline, 3px offset (stock-alarm inside stock).

### Navigation
- **File tabs:** six numbered tabs in the rail. Each is a 2px stock-rule box split into a 2.25rem number cell and the uppercase tab name. Hover lifts the border to manila. The current tab (scrollspy, `aria-current`) fills manila with stock type, and its number cell inverts to black.
- **Switches:** language (TR/EN) and theme (Gündüz/Gece) are 2px manila-bordered boxes of typed micro caps; the pressed option fills manila.

### Stamps
The status of every claim is a rubber stamp, never a pill or badge. **Red** (stamp-live) is live, available or active (Yayında/Live, Müsait/Available, the current role). **Ink** (stamp-ink) is in development (Geliştiriliyor/In development). **Gray** (stamp-gray) is archived (Arşivlendi/Archived). Stamps land once with a hard overshoot (scale 1.7 to 1, 0.22s) and then stay still. A stamp struck across a rule or into the raised procedure band prints on a canvas-coloured slip (the Manila Slip Rule), so its ink always reads against manila.

### Exhibit Frames
- **Frame:** a 2px ink-ruled print on photo paper, clipped square. Photographs inside are grayscale. A halftone canvas sits over the image and fades out (420ms, cubic-bezier(0.22, 1, 0.36, 1)) when the exhibit is declassified.
- **Frame tag:** a solid ink block at the top left with the label voice in bold, canvas on ink ("EK 02·A"), naming the exhibit.
- **Photostat:** a screenshot clipped into a record, grayscale and multiplied into the paper until hovered or focused, when the border turns alarm and the true image returns.

### Halftone
Exhibits are rendered in canvas from theme colours (`--c-dot` on `--c-dot-paper`). **Tone** mode is a 45° screen with dots sized by darkness, for photographs and figures. **Type** mode is a two-level square dot matrix, for typed headlines. In Gece the dots are manila on black, so the image reads as a positive.

### Surveillance Array (signature)
The hero's title sequence. Frames cut in on a stagger, a red reticle sweeps the array and locks onto the portrait, the name types itself behind a blinking block cursor, and the AVAILABLE stamp lands last on the portrait's corner, sized to the array, clamp(1.1rem, 6.2cqi, 2.05rem), on a scrap of photo paper. Afterwards, hovering or focusing an exhibit moves the reticle there (0.34s tween), declassifies it, and types its caption into the ruled caption line below.

### Demo Sheet
The page-curl demo's resting state and its flat fallback (no WebGL) print the same canvas page the WebGL sheet uses, drawn by `drawPage`, as an image with bilingual alt text. Do not rebuild it as an HTML miniature with microscopic type.

### Lists and Records
- **Ruled rows:** typed rows between a 2px rule and dashed soft dividers; label columns on the left at fixed widths.
- **Index terms:** inline typed lists separated by faint commas that stay at the end of their line when wrapping.
- **Typed links:** 1px soft underline at 0.22em offset; hover turns the text and underline alarm.
- **Tick box:** a drawn 1.35rem square with a 2px rule for checklist steps.

### Motion
Motion uses `motion/react` under `MotionConfig reducedMotion="user"` and four shared variants: **rise** is a 0.18s linear opacity cut, never a slide; **stagger** spaces children 0.08s after 0.1s; **land** is the stamp strike; **track** moves the reticle. Section content enters through the shared `reveal` spread (once, -60px margin). Under `prefers-reduced-motion` the cursor stops blinking and every animation and transition collapses to an instant end state.

## Do's and Don'ts

### Do:
- **Do** keep the ground saturated manila (#e4cd95) in Gündüz and near-black (#121110) in Gece, with theme-color meta values to match.
- **Do** type every record in Courier Prime and reserve Libre Franklin for uppercase field labels and exhibit tags.
- **Do** mark status with a rotated stamp: red for live, available or active; ink for in development; gray for archived.
- **Do** put black matte stock behind the rail, exhibit frames and the contact sheet, and use stock-alarm for any red inside it.
- **Do** open every section with the 4px ink rule and its typed headline, and set lists as ruled rows.
- **Do** render exhibits as canvas halftone from the theme's dot colours and declassify them on both hover and focus.
- **Do** write every user-visible string in both TR and EN.
- **Do** keep text at WCAG AA against its actual background, including the manila-raised bands and black stock.

### Don't:
- **Don't** use alarm red for anything that is not state: no red headings, red section fills or decorative red rules.
- **Don't** set alarm red text directly on the raised manila band; give it a canvas slip.
- **Don't** add font sizes outside the ramp; reach for small (0.875rem) or micro (0.75rem) instead of a one-off value.
- **Don't** place eyebrow or kicker labels above headings; tags and stamps share the title's line.
- **Don't** round corners, add box shadows, backdrop blur, gradient glows or card grids.
- **Don't** use a pale cream ground or reintroduce the replaced Fraunces/Public Sans/IBM Plex Mono editorial world.
- **Don't** animate with soft drifts or slides; use cuts, typing and one stamp landing, and keep everything static under reduced motion.
- **Don't** lighten ink-faint (#5b574d) any further: it sits at 4.6:1 on manila, and even a comma is text under AA.
- **Don't** use raw hex in components; use the semantic colour tokens.
