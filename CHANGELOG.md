# Changelog

All notable changes to this project are documented in this file. Work that has
not been released yet lives under **Unreleased** and moves into a dated
release section when it ships.

## [Unreleased]

### Added

- Study Corner: a searchable course catalogue covering all 4 branches
  (Data Science, Electronic Systems, Aeronautics & Space Technology,
  Management & Data Science) across all 3 levels (Foundation, Diploma,
  Degree).
- Study Corner: subject resources — lecture videos, notes, and past papers for
  every Data Science subject, plus curated Drive-folder links.
- Study Corner: a guided step-by-step browser (Branch → Level → Subject →
  Resources). Search now lives inside the subject step, a progress bar shows
  where you are, and if a subject has no resources yet, you are invited to
  submit them instead of hitting a dead end.
- Study Corner: a results screen with All / Lectures / Notes / PYQs filters —
  curated Drive folders stay pinned on top, notes are grouped by contributor,
  and past papers are grouped by year.
- Study Corner: a decorative artwork strip (gold line illustrations: arched
  window, moon, reading lamp, open book, tea) between the browser and the
  rest of the page.
- Study Corner: a shorter page header so the browser is reachable without
  scrolling.

### Changed

- Study Corner: level choice upgraded from plain text chips to full-width
  cards matching the branch cards; the branch grid is now centred.
- Footer: the bottom row reads clearly on black — a sharper copyright line
  ("© 2026 Sundarbans House. / Maintained by WebOps Team, Sundarbans House.")
  and brighter text.
- Footer: the large "Sundarbans" wordmark now uses the script (Samarkan) style
  and is lifted slightly off the background so it stays visible while reading
  as part of the decoration.
- URLs are now clean — pages open at `/study` instead of `/#/study`. Deep
  links now depend on the host sending every unknown path back to
  `index.html`; the deploy config for that ships with this change.
- Study Corner: an experimental light restyle was tried and reverted the same
  session — the page keeps the site-wide black-and-gold theme.
- Study Corner: moving between steps scrolls the page gently (only when
  needed) instead of jumping.
- Footer redesigned: the brand block now shows the `tsundere.svg` mark with
  "Sundarbans House" beside it (no IITM subline), the giant "Sundarbans"
  wordmark moved to the front of the footer as a link home with per-letter
  gold glow on hover, and the "Stay Connected" newsletter / email form was
  removed — the footer now runs Brand → links/Connect → colophon.

### Removed

- Study Corner: the anonymous Doubts Board is gone. The page now flows
  Browse → Nook → Tools → Contribute.

## [Unreleased — test scaffold]

- `emtyT/studycorner.html` — a standalone, single-file, hand-editable mirror of
  the Study Corner page (real fonts/Brand CSS, navbar, hero, stepper, nook,
  tools, contribute cards, footer) with sample data at the top of its
  `<script>`. Intended as a scratch page for UI iteration, not shipped.