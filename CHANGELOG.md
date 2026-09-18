# Changelog

All notable changes to this project are documented in this file.
Releases are cut when the working tree is merged to `main` via PR. Entries
for unreleased work live under **Unreleased** and move into a dated release
section at cut time.

Adopted fresh — work shipped before this file existed is not retrofitted here.

## [Unreleased]

### Added

- Study Corner: new data catalogue `src/data/study/curriculum.js` — 4 branches
  (Data Science, Electronic Systems, Aeronautics & Space Technology, Management
  & Data Science) × 3 levels (Foundation, Diploma, Degree) with core and
  elective listings, plus helpers (`subjectsFor`, `branchSubjectCount`,
  `subjectKey`).
- Study Corner: `src/data/study/resources.js` — per-subject lecture / notes /
  past-paper links for Data Science, curated Drive-folder links, and the
  resource-request form URL.
- Study Corner: resource browsing is now a guided stepper
  (`ResourceBrowser.vue`) — Branch → Level → Subject → Resources — with search
  folded into the subject step, a per-step progress bar, and an empty state
  that asks for missing resources instead of dead-ending.
- Study Corner: `ResourceResults.vue` — step-4 results view with All /
  Lectures / Notes / PYQs filters, curated Drive folders pinned on top, notes
  grouped by contributor and PYQs by year, preview-then-show-all lists.
- Study Corner: `StudyNook.vue` — decorative gold line-illustration band
  (arched window, moon, reading lamp, open book, book stack, tea) bridging the
  stepper and the doubts board.
- Study Corner: Study hero shortened (compact padding + type overrides in
  `StudyView.vue`) so the stepper is reachable in one glance.

### Changed

- Study Corner: level picker upgraded from text chips to cards matching the
  branch cards; branch grid centred with a 4-up layout; subject rows keep the
  dense gold-rule selector language.
- Study Corner: `StudyView.vue` no longer owns a shared search query — the
  browser manages its own.
- Footer colophon: copyright line now reads "© 2026 Sundarbans House. /
  Maintained by WebOps Team, Sundarbans House.", and `--text3` → `--text2` for
  `.fcopy`/`.fbl a` so the bottom row reads on black (was near-invisible
  dark tan).
- Footer: the large "Sundarbans" wordmark now renders in the script face
  Samarkan (loaded as a webfont, Cinzel fallback) and is lifted from
  `#080807` to `#1b1611` so it still reads as architecture behind the
  colophon but is clearly visible on the black ground.
- Study Corner: an experimental light "chapter" restyle (one `.study-page`
  token override) was tried and **reverted** the same session — the page keeps
  the site-wide black-and-gold dark theme.
- Stepper step-change scroll now moves minimally (only when the heading leaves
  the viewport, `block: nearest`) instead of jumping the page; headings carry
  `scroll-margin` for the sticky nav.

### Removed

- Study Corner: the anonymous Doubts Board (`DoubtsBoard.vue`) and its seed
  data (`public/data/doubts.json`) are gone; the page now flows Browser →
  Nook → Tools → Contribute.

## [Unreleased — test scaffold]

- `emtyT/studycorner.html` — a standalone, single-file, hand-editable mirror of
  the Study Corner page (real fonts/Brand CSS, navbar, hero, stepper, nook,
  tools, contribute cards, footer) with sample data at the top of its
  `<script>`. Intended as a scratch page for UI iteration, not shipped.