---
name: Anıl Karabulut — Antet
description: A formal letter of introduction on heavy stock, laid on a vişne çürüğü desk with its enclosures attached.
colors:
  visne-desk: "#4a1f28"
  visne-raised: "#5a2732"
  dove-sheet: "#e9e8e4"
  dove-raised: "#dfddd7"
  letter-ink: "#241c1e"
  ink-body: "#2f2829"
  ink-muted: "#5c5352"
  ink-faint: "#6a6160"
  rule-soft: "rgba(36, 28, 30, 0.18)"
  state-visne: "#7a1f2e"
  on-desk: "#efe9e3"
  on-desk-muted: "#cdbfb9"
  desk-rule: "rgba(239, 233, 227, 0.22)"
  desk-state: "#f2c6b6"
  watermark: "rgba(36, 28, 30, 0.13)"
  print-border: "#f6f5f1"
  aubergine-desk: "#1e1226"
  aubergine-raised: "#2a1a33"
  aubergine-sheet: "#2c1c35"
  aubergine-sheet-raised: "#362343"
  night-ink: "#efe8e2"
  night-body: "#dcd3cd"
  night-muted: "#b3a6a1"
  night-faint: "#a09490"
  night-rule: "rgba(239, 232, 226, 0.6)"
  night-rule-soft: "rgba(239, 232, 226, 0.16)"
  night-state: "#eba99b"
  night-watermark: "rgba(239, 232, 226, 0.09)"
typography:
  display:
    fontFamily: 'Spectral, Georgia, "Times New Roman", serif'
    fontSize: "clamp(3rem, 7.4vw, 6rem)"
    fontWeight: 300
    lineHeight: 1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: 'Spectral, Georgia, "Times New Roman", serif'
    fontSize: "clamp(2.1rem, 4.2vw, 3.25rem)"
    fontWeight: 300
    lineHeight: 1.08
    letterSpacing: "-0.012em"
  sheet-title:
    fontFamily: 'Spectral, Georgia, "Times New Roman", serif'
    fontSize: "clamp(1.9rem, 3.3vw, 2.6rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  subhead:
    fontFamily: 'Spectral, Georgia, "Times New Roman", serif'
    fontSize: "clamp(1.3rem, 2vw, 1.55rem)"
    fontWeight: 500
    lineHeight: 1.25
  sentence:
    fontFamily: 'Spectral, Georgia, "Times New Roman", serif'
    fontSize: "clamp(1.4rem, 2.3vw, 1.85rem)"
    fontWeight: 400
    lineHeight: 1.3
  lede:
    fontFamily: 'Spectral, Georgia, "Times New Roman", serif'
    fontSize: "clamp(1.15rem, 1.4vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: 'Spectral, Georgia, "Times New Roman", serif'
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.62
  signature-name:
    fontFamily: 'Spectral, Georgia, "Times New Roman", serif'
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.35
  step-numeral:
    fontFamily: 'Spectral, Georgia, "Times New Roman", serif'
    fontSize: "2rem"
    fontWeight: 300
    lineHeight: 1
  button:
    fontFamily: '"Hanken Grotesk", ui-sans-serif, system-ui, sans-serif'
    fontSize: "1rem"
    fontWeight: 600
  form-small:
    fontFamily: '"Hanken Grotesk", ui-sans-serif, system-ui, sans-serif'
    fontSize: "0.94rem"
    fontWeight: 500
    lineHeight: 1.55
  micro:
    fontFamily: '"Hanken Grotesk", ui-sans-serif, system-ui, sans-serif'
    fontSize: "0.8rem"
    fontWeight: 600
    lineHeight: 1.45
  label:
    fontFamily: '"Hanken Grotesk", ui-sans-serif, system-ui, sans-serif'
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.1em"
rounded:
  square: "0px"
spacing:
  gutter-phone: "0.75rem"
  gutter-desk: "2rem"
  sheet-phone: "1.35rem"
  sheet-tablet: "3.5rem"
  sheet-desk: "5rem"
  sheet-stack-phone: "1.25rem"
  sheet-stack-desk: "2rem"
  section-phone: "4.5rem"
  section-desk: "6.5rem"
  desk-width: "76rem"
components:
  button-solid:
    backgroundColor: "{colors.visne-desk}"
    textColor: "{colors.on-desk}"
    typography: "{typography.button}"
    rounded: "{rounded.square}"
    padding: "0.8rem 1.6rem"
    height: "3.25rem"
  button-solid-hover:
    backgroundColor: "{colors.visne-raised}"
  button-solid-gece:
    backgroundColor: "{colors.night-ink}"
    textColor: "{colors.aubergine-desk}"
    rounded: "{rounded.square}"
  button-solid-gece-hover:
    backgroundColor: "{colors.on-desk-muted}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.letter-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.square}"
    padding: "0.8rem 1.6rem"
    height: "3.25rem"
  button-ghost-hover:
    backgroundColor: "{colors.dove-raised}"
  button-paper:
    backgroundColor: "{colors.on-desk}"
    textColor: "{colors.visne-desk}"
    typography: "{typography.button}"
    rounded: "{rounded.square}"
    height: "2.5rem"
  button-paper-hover:
    backgroundColor: "{colors.on-desk-muted}"
  switch-option-active:
    backgroundColor: "{colors.on-desk}"
    textColor: "{colors.visne-desk}"
    typography: "{typography.micro}"
    rounded: "{rounded.square}"
    height: "2.1rem"
  masthead:
    backgroundColor: "{colors.visne-desk}"
    textColor: "{colors.on-desk}"
    height: "4rem"
  sheet:
    backgroundColor: "{colors.dove-sheet}"
    textColor: "{colors.ink-body}"
    typography: "{typography.body}"
    rounded: "{rounded.square}"
    padding: "4rem 5rem 4.5rem"
  sheet-gece:
    backgroundColor: "{colors.aubergine-sheet}"
    textColor: "{colors.night-body}"
    rounded: "{rounded.square}"
  print:
    backgroundColor: "{colors.print-border}"
    rounded: "{rounded.square}"
    padding: "0.5rem"
    width: "15.5rem"
  enclosure-line:
    textColor: "{colors.letter-ink}"
    typography: "{typography.form-small}"
    padding: "0.5rem 0"
  enclosure-line-hover:
    backgroundColor: "{colors.dove-raised}"
  status-live:
    textColor: "{colors.state-visne}"
    typography: "{typography.form-small}"
    rounded: "{rounded.square}"
  status-live-on-desk:
    textColor: "{colors.desk-state}"
    typography: "{typography.form-small}"
    rounded: "{rounded.square}"
  status-building:
    textColor: "{colors.letter-ink}"
    typography: "{typography.form-small}"
    rounded: "{rounded.square}"
  plate:
    backgroundColor: "{colors.dove-raised}"
    rounded: "{rounded.square}"
  demo-panel:
    backgroundColor: "{colors.visne-desk}"
    textColor: "{colors.on-desk}"
    rounded: "{rounded.square}"
    padding: "1.75rem"
---

# Design System: Anıl Karabulut — Antet

## Overview

**Creative North Star: "The Letter on the Desk"**

The page is a good letter arriving on a manager's desk: heavy stock, a short signed introduction, and its enclosures attached. Everything readable sits on a sheet of paper, and everything between the sheets is the desk. Trust comes from restraint and finish, so the system spends its effort on what a careful stationer would: the weight of the paper, a mark pressed into it without ink, a clip that really holds the photograph, a numbered list of what is enclosed.

Density is that of correspondence. The first sheet carries the name, the face, the role, the availability, the closing and the index of enclosures. The sheets behind it are records: rows, hairlines, dates, status. Two voices share the work: a serif that writes the letter and a grotesque that fills in the form around it.

The world has two lights. Gündüz lays dove-grey sheets on vişne çürüğü cotton; Gece turns the whole desk to aubergine with pale ink. The signature belongs to the mouse: moving the pointer over a sheet holds it to the light and the watermark shows.

**Key Characteristics:**
- A desk and sheets: the page ground is coloured stock, and readable content lies on paper above it.
- Spectral for the letter's voice, Hanken Grotesk for the office form around it.
- Square corners and hairline rules on every surface and control.
- One soft shadow per paper object, faint fibre in the sheet, nothing glossy.
- Finish carried by physical marks: the blind monogram, the split paperclip, the hidden watermark, the typed signature.
- One numbering across the page: the enclosure index and the section marks count the same Ek 1 to Ek 8.
- Motion is a sheet settling once. The page is readable at every frame.

## Colors

A deep red-brown stock under cool dove-grey paper, with one deepened vişne held back for state; Gece recasts the same roles in aubergine and pale ink.

### Primary
- **Vişne Çürüğü Desk** (#4a1f28): The cotton stock. Page ground, masthead, section heads, the contact close, the demo panel, the solid button on paper. It is also the browser theme colour and the favicon ground.
- **Raised Vişne** (#5a2732): The desk one step up. The solid button's hover press and the contact rows' hover.

### Secondary
- **State Vişne** (#7a1f2e): The stock's own colour deepened for use on paper. Marks what holds now: live, available, active.
- **Desk State** (#f2c6b6): The same meaning where the ground is the desk, as in the contact close.

### Neutral
- **Dove Sheet** (#e9e8e4): The paper. A near-neutral dove grey, never cream.
- **Dove Raised** (#dfddd7): Paper one step down. Enclosure line hover, ghost button press, plate ground.
- **Letter Ink** (#241c1e): Names, headings, strong rules, the focus ring on paper. A warm near-black taken towards the stock, never pure black.
- **Ink Body** (#2f2829): Running text on the sheet.
- **Ink Muted** (#5c5352): Secondary paragraphs, dates, Ek numbers, field labels, captions.
- **Ink Faint** (#6a6160): Only the separating comma between terms in a list, on the sheet.
- **Soft Rule** (rgba(36, 28, 30, 0.18)): Row hairlines, link underlines at rest, plate edges.
- **On Desk** (#efe9e3): Text on the desk and the paper button. A warm pale that reads as paper against the stock.
- **On Desk Muted** (#cdbfb9): Secondary text on the desk, inactive nav, ghost borders on the desk, the scrollbar thumb.
- **Desk Rule** (rgba(239, 233, 227, 0.22)): Hairlines on the desk.
- **Watermark** (rgba(36, 28, 30, 0.13)): The mark in the paper, seen only under the pointer.
- **Print Border** (#f6f5f1): The white border of the photographic print, a step brighter than the sheet so the print reads as a separate object.

### Gece (night)
The same roles recast, switched by `data-theme` on the root element. **Aubergine Desk** (#1e1226) and **Raised Aubergine** (#2a1a33) are the stock; **Aubergine Sheet** (#2c1c35) and **Aubergine Sheet Raised** (#362343) are the paper. **Night Ink** (#efe8e2), **Night Body** (#dcd3cd), **Night Muted** (#b3a6a1) and **Night Faint** (#a09490) carry the text, and Night Ink also serves as the text on the desk and the print border. On Desk Muted holds its value on the desk. **Night Rule** (rgba(239, 232, 226, 0.6)) and **Night Rule Soft** (rgba(239, 232, 226, 0.16)) draw the hairlines, and Night Rule Soft also draws the desk's. **Night State** (#eba99b) marks state on both sheet and desk, and **Night Watermark** (rgba(239, 232, 226, 0.09)) is the mark in the paper. The solid button inverts to Night Ink with Aubergine Desk text. The demo panel takes the desk, so it is vişne by day and aubergine by night.

### Contrast
All text pairs in use clear WCAG AA in both themes. The lowest pair the build ships is Ink Faint on Dove Sheet (4.91:1), carried by the term comma; Gece's equivalent is 5.39:1. The lowest full-text pair is Ink Muted on Dove Raised (5.49:1), the Ek number under an enclosure line's hover; Gece's is 6.01:1. Faint on raised computes to 4.83:1 in Gece and 4.43:1 in Gündüz, which is below AA, and the build places faint on raised in neither theme.

### Named Rules
**The State Only Rule.** The state colours mark live, available and active, and nothing else. State Vişne on paper, Desk State on the desk, Night State in Gece. If removing the colour leaves the meaning intact, it should not be there.

**The Dove Not Cream Rule.** The sheet ground is dove grey in every Gündüz surface. Cream is refused; the warm pale of On Desk belongs to text and controls on the stock, not to the paper.

**The Faint Stays On The Sheet Rule.** Ink Faint is for the sheet ground only. On Dove Raised it falls below AA.

## Typography

**Display Font:** Spectral (with Georgia, Times New Roman, serif)
**Body Font:** Spectral (with Georgia, Times New Roman, serif)
**Label/Mono Font:** Hanken Grotesk (with ui-sans-serif, system-ui, sans-serif)

**Character:** Spectral is the letter's voice: a screen-drawn book serif whose light weight holds the name at scale with composure. Hanken Grotesk is the office form around it, plain and exact, used wherever the page fills in a field rather than speaks. Both are self-hosted under the OFL; Spectral ships as static 300, 400, 500 and italic 400, and Hanken Grotesk as a variable 400 to 700.

### Hierarchy
- **Display** (Spectral 300, clamp(3rem, 7.4vw, 6rem), 1, -0.02em): The name on the first sheet, once.
- **Headline** (Spectral 300, clamp(2.1rem, 4.2vw, 3.25rem), 1.08, -0.012em): Section titles on the desk, and the contact close. Balanced wrapping.
- **Sheet Title** (Spectral 400, clamp(1.9rem, 3.3vw, 2.6rem), 1.1, -0.01em): Product names heading their sheets.
- **Subhead** (Spectral 500, clamp(1.3rem, 2vw, 1.55rem), 1.25): Job titles, archive titles, the headings inside the method sheet.
- **Sentence** (Spectral 400 italic, clamp(1.4rem, 2.3vw, 1.85rem), 1.3): The one-line statement under the name, the product's line at 1.25rem, the closing sentence on the desk.
- **Lede** (Spectral 400, clamp(1.15rem, 1.4vw, 1.25rem), 1.6): The opening paragraph on a sheet, 58 to 60ch.
- **Body** (Spectral 400, 1.125rem, 1.62): Running text, up to 66ch, lining numerals throughout.
- **Signature** (Spectral 400 italic at body size for the regards, then the name upright at 1.5rem, 1.35): The typed close.
- **Step Numeral** (Spectral 300, 2rem, 1): The numbers of the method row.
- **Button** (Hanken Grotesk 600, 1rem): Controls.
- **Form Small** (Hanken Grotesk 400 to 600, 0.94rem, 1.55): Enclosure lines, nav, status, dates, stack lists, captions. Weight 600 when the value is the point.
- **Micro** (Hanken Grotesk 600, 0.8rem, 1.45): Switch options and status inside the enclosure index.
- **Label** (Hanken Grotesk 600, 0.75rem, 0.1em, uppercase): Field names on the form, and the name of a list.

### Named Rules
**The Two Voices Rule.** The letter speaks in Spectral; the form is filled in with Hanken Grotesk. If a string is a sentence, it is Spectral. If it is a field, a value, a date or a control, it is Hanken Grotesk.

**The No Spectral Bold Rule.** Spectral stops at 500. Anything that needs to be heavier is set in Hanken Grotesk, so the browser never synthesises a weight.

**The Field Name Rule.** A label names the list or field directly beneath it. It is never a lead-in above a larger heading.

## Layout

One centred desk of 76rem carries everything, with a gutter of 0.75rem on phones that opens to 2rem from 768px. Sheets fill the desk's width; the product sheets stack with 1.25rem between them, 2rem from 768px. Sheet padding grows in three steps: 2rem 1.35rem 2.5rem on phones, 3.5rem 3.5rem 4rem from 768px, 4rem 5rem 4.5rem from 1100px.

The first sheet is one named grid. From 900px it runs a free column against a 17.5rem column with a 4rem gap: letterhead, name and body on the left, the portrait and then the enclosure index on the right. Below that it collapses to a single column in the order letterhead, name, portrait, body, index, so a phone reader meets the name and the face first.

Sections open on the desk with a section head, 4.5rem above the title on phones and 6.5rem from 768px, the title at the left and the Ek mark on the same baseline at the right edge. Records inside sheets are row grids with a fixed first column for the date or name; they stack below 768px. Product sheets split into record and evidence at 1024px. The method runs as one row of four from 900px.

The masthead is a sticky 4rem strip of the desk. The switches join it at 1024px and the full nav at 1280px; below those they live in a menu that opens under the strip.

## Elevation & Depth

Depth is physical and shallow: paper lying on a desk and a print lying on paper. There are exactly three levels, desk, sheet and print, and each paper object casts one soft shadow, drawn as a tight contact edge with a wider fall below it. Nothing lifts on hover. Within a sheet, depth is tonal: Dove Raised under an enclosure line or a plate, never a shadow. The fibre is a faint SVG noise over each sheet (0.05 in Gündüz, 0.07 in Gece) that keeps the paper from reading as a flat fill.

### Shadow Vocabulary
- **Sheet, Gündüz** (`box-shadow: 0 1px 1px rgba(30, 8, 14, 0.3), 0 18px 36px -14px rgba(30, 8, 14, 0.55)`): Every sheet on the vişne desk.
- **Sheet, Gece** (`box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5), 0 18px 36px -14px rgba(0, 0, 0, 0.8)`): Every sheet on the aubergine desk.
- **Print** (`box-shadow: 0 1px 2px rgba(30, 8, 14, 0.3), 0 8px 18px -8px rgba(30, 8, 14, 0.45)`): The photographic print on the sheet.
- **Clip** (`filter: drop-shadow(0.5px 1.2px 0.7px rgba(30, 8, 14, 0.5))`): The paperclip's wire on the print.

### Named Rules
**The Paper Only Rule.** Shadows belong to objects that are physically paper or wire: the sheet, the print, the clip. Buttons, rows, panels and plates cast none.

**The Marks In The Paper Rule.** Fibre, watermark and monogram are in the sheet, not on it. They stay beneath the text and never compete with it.

## Shapes

Every surface and control is square: sheets, buttons, switches, plates, the demo panel, the status marks. Hairlines of 1px do the structural work, a strong rule opening a list and soft rules between its rows. The only circles in the system are the pressed seal itself, the ring of the monogram, the watermark and the favicon, and the only curves are the wire of the clip. Rotation is reserved for the print, which rests at 1.6deg because it was clipped on by hand.

## Components

### Buttons
Square, solid and quiet; a press spreads in from the left edge rather than a colour flipping.
- **Shape:** Square corners (0px), 1px border in the fill colour, 3.25rem tall, 0.8rem 1.6rem padding; 2.25rem to 2.5rem tall in the masthead, the demo panel and the contact row.
- **Solid:** Vişne desk with On Desk text on paper. The primary action, led by the CV. In Gece it inverts to pale ink.
- **Ghost:** Transparent with a strong rule border; on the desk the border takes On Desk Muted and the press takes Raised Vişne.
- **Paper:** The masthead CV. On Desk fill with desk-coloured text, so the action stays lit on the stock.
- **Hover / Focus:** A deeper fill scales in from the left over 460ms on the lay ease, for hover and keyboard focus alike. Focus also takes a 2px outline at 3px offset, Letter Ink on paper and On Desk on the desk.

### Switches
- **Style:** Two options in a 1px Desk Rule frame, 2.1rem tall, Micro type. They hold language (TR, EN) and theme (Gündüz, Gece) in the masthead.
- **State:** The pressed option fills On Desk with desk-coloured text. Others sit in On Desk Muted and brighten on hover.

### Navigation
- **Masthead:** The name in Spectral at 1.25rem, six links in Form Small at weight 500, the switches, the paper CV button.
- **States:** On Desk Muted at rest, On Desk on hover. The current section draws a 1px rule from the left over 380ms.
- **Mobile:** A ghost menu button opens the links and switches under the strip; Escape closes it. The CV stays in the strip at every width.

### Sheet
- **Corner Style:** Square (0px).
- **Background:** Dove Sheet with fibre, Aubergine Sheet in Gece.
- **Shadow Strategy:** The Sheet shadow, see Elevation & Depth.
- **Internal Padding:** The three-step scale in Layout.
- **Behaviour:** Each sheet holds its own watermark and settles once as it enters.

### Watermark (signature)
A double ring around AK in Spectral light, sized to 82% of the sheet up to 46rem, inked in the Watermark colour. It is invisible until a mouse moves over the sheet, then a 17rem circle of it follows the pointer and fades in over 500ms; it fades out when the pointer leaves. It answers to mouse pointers only, because a touch has no way to hold a sheet up. The circular mask is the system's only gradient, and it paints no colour of its own.

### Blind Monogram
The AK seal at 4rem, opening the letterhead beside place and date. It is a baked raster of light and shade held in alpha, with no ink of its own, so it takes the colour of whichever paper it is pressed into. Gece stock takes a pressed mark more quietly: 0.5 opacity. It presses in on load, scale 1.08 to 1 over 0.7s after 0.25s.

### Clipped Print
The portrait on a print border with 0.5rem of white, 4:5, up to 15.5rem wide, resting at 1.6deg. The paperclip is split into two baked rasters: the back half runs under the print and the front half lies over it, so the photograph is really held. On hover the print straightens over 520ms.

### Signature Block
The regards in italic with the name typed upright below it, Spectral throughout. It closes the letter's body on the first sheet, above the actions, and closes the page on the desk above the footer line. The name is typed, never set in a script font.

### Enclosure Index
The list that closes the first sheet, named by a label and opened by a strong rule. Each line is a three-column row: the Ek number in Ink Muted, the name, and the line's closing action or state. Ek 1 is the CV, with a download icon. Ek 2 to 4 are the products, closing on their status. Ek 5 to 8 are the sections, closing on a down arrow. Every line is a link; hover lays Dove Raised under it.

### Section Head
A two-column grid on the desk: the headline at the left, the Ek mark at the right edge on the same baseline in Form Small at weight 600 and On Desk Muted, an optional lead spanning below at 34rem. The Ek mark always repeats the index's number, so the two can be read against each other.

### Status Marks
A square of 0.6em beside the word, in Form Small at weight 600. **Live** fills the square in the state colour, and the text takes it too. **Building** is a 1.5px outline square in Letter Ink. Availability and the current job use the live mark. Inside the enclosure index the mark drops to Micro.

### Rows and Plates
Records are lists of rows: a strong rule above, soft rules between, generous block padding. Plates hold product screenshots in a 1px Soft Rule frame on Dove Raised; the frame turns to Letter Ink on hover and focus. Terms in a stack list are separated by a real comma in Ink Faint. Links carry a 1px underline at 0.22em offset in Soft Rule, which takes full colour on hover.

### Method Row
Four numbered steps under a strong rule, each a light Spectral numeral, a Hanken Grotesk title and a Spectral note. The numbers are CSS counters, so the order lives in the list.

### Demo Panel
The WebGL page curl of the sample report, on a desk-coloured panel set into the product sheet: vişne by day, aubergine by night. Labels sit top and bottom on Desk Rule hairlines, with a ghost button that peels and restores the page. Its sheets are drawn from the dove palette; Gece dims them to 0.86. Without WebGL, or under reduced motion, the same sheets print as a flat before and after spread.

### Motion
`MotionConfig reducedMotion="user"` governs everything, with the lay ease (cubic-bezier(0.22, 1, 0.36, 1)) throughout. Sheets settle once as they enter: from 24px low and -0.3deg over 0.9s, with no opacity change, so a sheet is never hidden. The monogram presses in, the print straightens, the watermark follows. Sections have no other entrances. Under reduced motion every settle and transition resolves instantly; the watermark still answers the pointer, since it follows rather than plays.

## Do's and Don'ts

### Do:
- **Do** put readable content on a sheet, and keep section titles and the close on the desk.
- **Do** use the semantic tokens, so both themes stay in step.
- **Do** keep one numbering: a new enclosure takes its number in the index and on its section head together.
- **Do** set sentences in Spectral and fields, values, dates and controls in Hanken Grotesk.
- **Do** close a status with its word as well as its mark, so state never rests on colour alone.
- **Do** keep every sheet visible from its first frame; the settle moves it, never reveals it.
- **Do** keep the CV the solid action, reachable from the masthead at every width.
- **Do** keep text at WCAG AA in both themes, and check any new pair in Gündüz and Gece.

### Don't:
- **Don't** let the sheet ground drift to cream or ivory.
- **Don't** use a state colour for decoration, emphasis, links or hover.
- **Don't** put a label above a heading as a lead-in; a label names a list or a field.
- **Don't** set Spectral heavier than 500.
- **Don't** add corner radius to a surface or control.
- **Don't** paint with gradients, glass or blur; depth is paper, shadow and tone.
- **Don't** give a shadow to anything that is not paper or wire.
- **Don't** imitate a signature with a script font; the name is typed.
- **Don't** give the monogram an ink colour, or redraw it as a flat logo.
- **Don't** tilt a sheet at rest; only the print rests at an angle.
- **Don't** add entrance animations to sections or fade content in.
- **Don't** place Ink Faint on Dove Raised.
