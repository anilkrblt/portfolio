# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters and HR screeners (Turkish and international) filling remote or
hybrid engineering roles. They arrive from a job application, a CV PDF, LinkedIn or
GitHub, usually with many candidate tabs open, and decide in roughly thirty seconds
whether to shortlist. Their job on this page: confirm who the candidate is and what
role he fits, see proof he can do the work, then get the CV or a contact channel.

Technical managers and potential clients also visit, but were not confirmed as the
primary audience; depth for them sits below the fold.

## Product Purpose

The personal portfolio of Anıl Karabulut, full-stack software engineer based in
Edirne, Türkiye, open to remote and hybrid work. Success: a recruiter knows his name,
face, role and availability from the first viewport, believes he ships real products,
and reaches the CV download or contact details without hunting.

## Positioning

He takes a product from idea to a live production URL alone, end to end: interface,
backend, automation and deployment. TranslateYourPDF is the live proof
(translateyourpdf.com); EAA Monitor and Randevai are real builds in development. The
AI-assisted autonomous development loop (verifiable criteria, golden tests, automated
gates, human approval) is the method behind the shipping and supports the claim rather
than leading it.

## Operating Context

- Visitors come from applications, LinkedIn, GitHub and the CV itself; the page must
  hand back a CV in the visitor's language (TR and EN PDFs in `public/`).
- Turkish is the default language; English is a full equal, switchable in place.
- A visitor may be non-technical: role, availability, experience and contact must be
  legible without parsing tech stacks.

## Capabilities and Constraints

- Single page, React 19 + Vite 6 + TypeScript + Tailwind CSS v4, `motion/react`, no
  router, no backend. CI runs `tsc --noEmit` and the production build on every push
  and PR; both must pass.
- Every user-visible string is bilingual (`COPY.tr` / `COPY.en` or `LocalizedString`).
- Confirmed to keep through the 2026-10 redesign: a light/dark theme switch (persisted,
  resolved before first paint), the WebGL page-curl demo of TranslateYourPDF (lazy
  chunk, with a flat fallback for no-WebGL and reduced motion), the portrait photo, and
  the project archive.
- Product status is binary and honest: `live` only when a stranger can open the URL
  now; otherwise `building`, with screenshots standing in for a link.

## Brand Commitments

- Name is written "Anıl Karabulut", with the Turkish dotless ı.
- Voice: plain, specific, checkable. No hype, no inflated metrics.
- Claims are limited to what the builds prove: features, standards, deployment.

## Evidence on Hand

- Portrait: `public/profile.jpg` (1056×1408, casual selfie against a white wall).
- Product screenshots: `public/eaa1.png`, `public/eaa2.png`, `public/randevai1.png`,
  `public/randevai2.png`.
- CVs: `public/ANIL_KARABULUT_CV.pdf` (TR), `public/ANIL_KARABULUT_CV_ENG.pdf` (EN).
- Live product: https://translateyourpdf.com. Archive projects link to public GitHub
  repositories.
- Counts in use: 10 products and projects, 1 live in production, 3 built with the
  autonomous loop.
- Absent, and not to be fabricated: testimonials, client logos, usage or revenue
  numbers, press.

## Product Principles

1. Recruiter-first legibility: identity, role, availability and the CV are reachable
   from the first viewport.
2. Shipping is the proof: show live and real products, not adjectives.
3. Every claim is checkable, and status is stated honestly.
4. Bilingual parity: Turkish and English are equal citizens of every element.

## Accessibility & Inclusion

WCAG 2.1 AA contrast in both themes; `prefers-reduced-motion` honoured (the WebGL demo
falls back to a static spread); keyboard and skip-link access preserved.
