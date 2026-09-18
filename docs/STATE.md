# Sundarbans House - State
> IITM BS Sundarbans House frontend and related product work · Last checkpoint: 2026-09-18

## In progress / next
- Study Corner docs/state: the resource browser stepper (Branch → Level → Subject → Resources), the StudyNook band, and the shorter Study hero are all live on `#/study`; the old anonymous Doubts Board was REMOVED this session (component + `public/data/doubts.json` deleted). Owner should do a visual pass at http://localhost:5173/#/study and flag text/copy/asset tweaks.
- Scratch mirror: `emtyT/studycorner.html` is kept in synch with the real page (fonts, navbar, hero, stepper, nook, tools, contribute, footer) and the owner edits it as a sandbox; sample data lives at the top of its `<script>`.
- Optional: run `npm run test:smoke` — blocked until `npx playwright install chromium` runs (owner aborted the install earlier; ask before retrying). Repo-wide `format:check` still fails on pre-existing files — skip it.

## Status
- Repository frontend is a Vue 3 SPA with HTML5 history routing and lazy-loaded routes.
- Study Corner was rebuilt into a guided four-step stepper backed by new data modules `src/data/study/curriculum.js` (4 branches × 3 levels, DS/ES/AE/MG) and `src/data/study/resources.js` (Drive links, curated folders, request-form URL), with `ResourceResults.vue` rendering All/Lectures/Notes/PYQs filters, curated folders pinned on top, notes-by-author and PYQs-by-year. The old DS-only `src/data/scData_generated.js` remains as source, untouched.
- The Study hero is `PageHero` with the `compact` flag plus scoped StudyView overrides; `StudyView` no longer owns a shared search query.
- `StudyNook.vue` (gold line-illustration band) sits between the browser and the tools. Doubts Board was removed on owner request; page tone rhythm is Hero · Browser A · Nook A · Tools A · Contribute B.
- The Study Corner stack (real Cinzel/Chillax fonts, black/gold tokens, navbar, footer with "Affiliated to Indian Institute Of Technology, Madras") is mirrored in the standalone scratch page `emtyT/studycorner.html` (single-file, hand-editable).
- 12 team portraits (3:4) are synced to Cloudinary under `sundarbans/teams/`; delivery URLs live in `media/manifest.json`.
- Live chatbot audit report: `docs/reports/sundarbans-rag-chatbot-audit-2026-09-03.md`; retrieval wins but critical taxonomy/grounding failures.

## Architecture map
- App bootstrap and global navigation -> `src/main.js`, `src/App.vue`
- Routes -> `src/router/index.js`
- Public views -> `src/views/*`
- Community taxonomy and event records -> `src/views/CommunityView.vue`, `src/views/TechnicalView.vue`, `src/views/CulturalView.vue`, `src/views/ESportsView.vue`
- Teams and community heads -> `src/views/TeamsView.vue`
- Cloudinary image history -> `media/manifest.json` · workflow -> `media/README.md`, `scripts/media-sync.mjs`
- Study Corner -> `src/views/StudyView.vue` + `src/components/study/ResourceBrowser.vue`, `ResourceResults.vue`, `StudyNook.vue`, `StudentTools.vue`, `ContributeCards.vue` · data -> `src/data/study/curriculum.js`, `src/data/study/resources.js` (source of truth `src/data/scData_generated.js`)
- Meetup data/template -> `src/views/meetups/*`, `src/components/RegionMeetups.vue`
- Audit artifacts -> `docs/reports/*`

## Stack & run
- Stack: Vue 3, vue-router 4, Vite 6, static hosting
- Run: `npm run dev` · Build: `npm run build`
- Gates: `npm run format:check` (known pre-existing failures — skip), `npm run lint`, `npm run build`, `npm run test:smoke` (needs Playwright Chromium)

## Key decisions
- Study Corner is product-owner-first and DS-heavy: only DS subjects carry resources; ES/AE/MG show the "No resources yet" request state instead of dead-ending.
- Resource flow is a guided stepper (Branch → Level → Subject → Resources) with search folded into the subject step; level picker uses cards matching the branch cards; step headings carry `scroll-margin` and step-change scrolls minimally (`block: nearest`).
- The anonymous Doubts Board was removed rather than repurposed; its placeholder Q&A data (`public/data/doubts.json`) went with it.
- The Study page keeps "Student Tools" and "Contribute" one-forms chapters; the nook band (black, decorative) fills the space that once hosted the board.
- Keep the first chatbot deliverable as an evidence report; defer implementation until the RAG backend and source of truth are known.
- Treat the three public community names as Technical, Cultural, and E-Sports, based on `src/views/CommunityView.vue`.
- Council redesign: split photo/text cards, plain text labels (never pill/"peeled"), icon-only brand-logo social links, UHC + LHC only, border-only hover with photo-only zoom.
- Local scratch assets stay out of git; Cloudinary + `media/manifest.json` are the image source of truth. `emtyT/` is untracked scratch.

## Gotchas
- `npm run test:smoke` needs Playwright Chromium; not installed (owner aborted `npx playwright install chromium` — ask before retrying).
- Repo-wide `npm run format:check` fails on pre-existing unformatted files; do not attempt a repo-wide format.
- Duplicate id `rbChangeSubject` exists only inside two mutually exclusive render branches of `ResourceBrowser.vue` JS strings (one in the DOM at a time) — benign.
- The live chatbot loaded a React entry point at `/src/main.jsx`, while this repository's frontend uses Vue. The audit compares live behavior with public repository content; it does not prove the backend implementation.
- Do not commit Cloudinary keys, OAuth secrets, app secrets, or a member roster.
- Local git credential helper was broken at last commit point (points at removed `mise gh`); use `mise use gh` or fix `~/.config/git/config` when pushing again.