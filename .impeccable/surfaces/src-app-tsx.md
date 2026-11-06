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

- Audience: recruiters and HR screeners (~30-second scan, many tabs open), plus company
  employees and executives who should come away trusting him.
- Job: confirm identity, role and availability; see proof of shipping; leave with the CV
  or an email address.
- Primary action: CV download in the visitor's language (working file link), with email
  one step away. Secondary: open the live product.
- Proof: TranslateYourPDF live; EAA Monitor and Randevai real builds with screenshots;
  the CI-backed development loop table.
- Constraints (confirmed again 2026-11-02): bilingual TR/EN; day/night theme switch;
  WebGL page-curl demo with flat fallback; portrait; project archive; honest status;
  WCAG AA; reduced motion. Motion level: balanced (one strong opening, measured elsewhere).

## Chosen direction and memorable moment

Antet (a formal letter of introduction on heavy stock), chosen by the user on
2026-11-05 from the second hand. Asked for: classy, original, liked by HR,
employees and company executives; not eccentric; reliable and mature; must not
feel like a corporate template. Keeps the theme switch, WebGL demo, portrait,
archive. The memorable moment: moving the pointer over the sheet holds it to the
light and the watermark shows.

## Direction contract

THESIS: The portfolio is a good letter arriving on a manager's desk: heavy stock,
a short signed introduction, and its enclosures attached. Trust comes from
restraint and finish. It refuses the corporate template and the dev-portfolio grid.

OWN-WORLD: Vişne çürüğü cotton stock is the desk and carries the masthead, the
section titles and the close; dove-grey sheets (never cream) lie on it with a soft
paper shadow. Blind emboss for the monogram, a hidden watermark in the paper.
Spectral sets the letter's voice, Hanken Grotesk the office form (labels, tables,
controls). Square corners, hairline rules. Vişne deepens to state on paper. Gece:
pale ink on dark aubergine stock.

STORY: The reader meets name, face, role and availability as a letter, takes the
CV as Enclosure 1, turns through the enclosures (products with the touchable demo,
method, skills and experience, archive), and ends at the signature block.

FIRST VIEWPORT: Slim vişne masthead (name, six links, TR/EN, Gündüz/Gece, CV). One
sheet: blind AK monogram, place and today's date, the name at display scale in
Spectral light, the sentence in italic, the letter body, status, closing; portrait
held top right by a paperclip; CV as the solid primary, live product beside it;
the enclosure list closes the sheet. Mobile: name, portrait, then the rest.
SIGNATURE: holding the sheet to the light: the pointer reveals the watermark.
MOTION: sheets are laid on the desk once (small settle, always visible); the
monogram presses in; the clipped portrait straightens on hover; static under
reduced motion.

FORM: Antet, #5 of 7 on the re-roll list (assigned), raised by declined challengers:
one strict grid (brick instructions), the action never hidden (cereal aisle), method
as one unbroken row (drum machine), evidence touchable (algorave). seed:c531d16f098c7c3b

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved decisions

- None open. Signature is the typed name in Spectral; a real signature raster replaces it
  if the owner supplies one. A better portrait would also raise the page; owner's call.
