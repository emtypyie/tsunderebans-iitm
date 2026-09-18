<template>
  <!-- Tone A. The whole point of this section is that it is the first thing
       under the hero — and now that it is a guided stepper, the visitor is
       never facing nineteen subjects at once. Branch → Level → Subject →
       Resources, one step at a time; search is folded into the subject step
       instead of sitting above everything. -->
  <section class="section tone-a rs" id="resource-browser">
    <div class="container">
      <nav class="rb-stepper" aria-label="Browse resources">
        <ol class="rb-steps">
          <li v-for="s in steps" :key="s.n">
            <button
              v-if="s.n <= step"
              type="button"
              class="rb-step"
              :class="{ 'rb-step--active': s.n === step, 'rb-step--done': s.n < step }"
              :aria-current="s.n === step ? 'step' : undefined"
              @click="goToStep(s.n)"
            >
              <span class="rb-step-num">{{ s.n }}</span>
              <span class="rb-step-body">
                <span class="rb-step-label">{{ s.label }}</span>
                <span v-if="s.n < step && stepSummary[s.n]" class="rb-step-value">{{
                  stepSummary[s.n]
                }}</span>
              </span>
            </button>
            <span v-else class="rb-step rb-step--locked" aria-hidden="true">
              <span class="rb-step-num">{{ s.n }}</span>
              <span class="rb-step-body">
                <span class="rb-step-label">{{ s.label }}</span>
              </span>
            </span>
          </li>
        </ol>
        <button v-if="branch" type="button" class="btn btn--text rb-reset" @click="resetAll">
          Start over
        </button>
      </nav>

      <div class="rb-stage">
        <!-- ── 1. BRANCH ─────────────────────────────────────────── -->
        <div v-if="step === 1">
          <h2 class="rb-step-title" id="rb-head-1">Choose your branch</h2>
          <p class="rb-step-sub">
            Each programme has its own subjects, so start with the branch you are enrolled in.
          </p>
          <div class="rb-branch-grid" role="group" aria-labelledby="rb-head-1">
            <button
              v-for="b in BRANCHES"
              :key="b.key"
              type="button"
              class="rb-branch"
              :class="{ 'rb-branch--selected': branch === b.key }"
              :aria-pressed="branch === b.key"
              @click="chooseBranch(b.key)"
            >
              <component
                :is="branchIcons[b.key]"
                class="rb-branch-icon"
                :size="20"
                :stroke-width="1.7"
                aria-hidden="true"
              />
              <span class="rb-branch-code">{{ b.short }}</span>
              <span class="rb-branch-name">{{ b.name }}</span>
              <span class="rb-branch-count">{{ branchSubjectCount(b.key) }} subjects</span>
            </button>
          </div>
        </div>

<!-- ── 2. LEVEL ──────────────────────────────────────────── -->
        <div v-else-if="step === 2">
          <h2 class="rb-step-title" id="rb-head-2">Choose your level</h2>
          <p class="rb-step-sub">
            {{ currentBranch.name }} runs three levels — pick where you are.
          </p>
          <div class="rb-level-grid" role="group" aria-labelledby="rb-head-2">
            <button
              v-for="l in LEVELS"
              :key="l.key"
              type="button"
              class="rb-level"
              :class="{ 'rb-level--selected': level === l.key }"
              :aria-pressed="level === l.key"
              @click="chooseLevel(l.key)"
            >
              <component
                :is="levelIcons[l.key]"
                class="rb-level-icon"
                :size="20"
                :stroke-width="1.7"
                aria-hidden="true"
              />
              <span class="rb-level-name">{{ l.title }}</span>
              <span class="rb-level-count">{{ levelStat(l.key) }}</span>
            </button>
          </div>
        </div>

        <!-- ── 3. SUBJECT ────────────────────────────────────────── -->
        <div v-else-if="step === 3">
          <h2 class="rb-step-title" id="rb-head-3">Choose a subject</h2>
          <p class="rb-step-sub">
            {{ currentLevel.title }} · {{ currentBranch.name }} — search or pick below.
          </p>

          <div class="rb-subject-search">
            <div class="rb-search-field">
              <Search class="rb-search-icon" :size="17" :stroke-width="1.9" aria-hidden="true" />
              <input
                id="rb-subject-search"
                v-model="search"
                type="search"
                class="form-input rb-search-input"
                placeholder="Search subjects or notes…"
                autocomplete="off"
              />
              <button
                v-if="search"
                type="button"
                class="rb-search-clear"
                aria-label="Clear search"
                @click="search = ''"
              >
                <X :size="15" :stroke-width="2" />
              </button>
            </div>
            <p class="rb-search-hint">
              Search also matches notes and past papers inside a subject.
            </p>
          </div>

          <div
            v-if="visibleCore.length"
            class="rb-subject-grid"
            role="group"
            aria-labelledby="rb-head-3"
          >
            <button
              v-for="subject in visibleCore"
              :key="subjectKey(subject)"
              type="button"
              class="rb-subject"
              :aria-pressed="isSelected(subject)"
              @click="selectSubject(subject)"
            >
              <span class="rb-subject-code">{{ subject.code }}</span>
              <span class="rb-subject-name">{{ subject.name }}</span>
            </button>
          </div>

          <div v-for="group in visibleElectiveGroups" :key="group.label" class="rb-elective">
            <h3 class="rb-elective-label">
              {{ group.label }}
              <span v-if="group.subjects.length" class="rb-group-count">{{
                group.subjects.length
              }}</span>
            </h3>
            <div
              v-if="group.subjects.length"
              class="rb-subject-grid"
              role="group"
              :aria-label="`${group.label} subjects`"
            >
              <button
                v-for="sub in group.subjects"
                :key="subjectKey(sub)"
                type="button"
                class="rb-subject"
                :class="{ 'rb-subject--elective': !sub.code }"
                :aria-pressed="isSelected(sub)"
                @click="selectSubject(sub)"
              >
                <span v-if="sub.code" class="rb-subject-code">{{ sub.code }}</span>
                <span class="rb-subject-name">{{ sub.name }}</span>
              </button>
            </div>
            <p v-else class="rb-note rb-note--rest">{{ group.note }}</p>
          </div>

          <p v-if="query && !totalVisibleSubjects" class="rb-note">
            No subject matches “{{ search }}”.
            <button type="button" class="btn btn--text" @click="search = ''">Clear search</button>
          </p>
        </div>

        <!-- ── 4. RESOURCES ──────────────────────────────────────── -->
        <div v-else-if="step === 4">
          <h2 class="rb-step-title" id="rb-head-4">Resources</h2>
          <template v-if="subject">
            <ResourceResults
              :subject="subject"
              :search="search"
              :resource-type="resourceType"
              :expanded-groups="expandedGroups"
              :preview-count="PREVIEW_COUNT"
              @update:resource-type="setResourceType"
              @toggle-group="toggleGroup"
              @clear-subject="step = 3"
            />
          </template>
          <p v-else class="rb-empty rb-empty--start">
            <BookOpen :size="26" :stroke-width="1.6" aria-hidden="true" />
            <span>Choose a subject above to see its notes, lectures and past papers.</span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue';
import {
  Search,
  X,
  BookOpen,
  Sprout,
  Ruler,
  GraduationCap,
  Database,
  CircuitBoard,
  Rocket,
  Briefcase,
} from 'lucide-vue-next';

import {
  BRANCHES,
  LEVELS,
  branchSubjectCount,
  subjectKey,
  subjectsFor,
} from '../../data/study/curriculum.js';
import { resourcesFor } from '../../data/study/resources.js';
import ResourceResults from './ResourceResults.vue';

const steps = [
  { n: 1, label: 'Branch' },
  { n: 2, label: 'Level' },
  { n: 3, label: 'Subject' },
  { n: 4, label: 'Resources' },
];

const branchIcons = { ds: Database, es: CircuitBoard, ae: Rocket, mg: Briefcase };
const levelIcons = { foundation: Sprout, diploma: Ruler, degree: GraduationCap };

const RESOURCE_TYPES = ['lectures', 'notes', 'pyq'];

/** A group shows this many rows before it offers to open. */
const PREVIEW_COUNT = 6;

// ── Selection state, one value per step ──────────────────────────────
const step = ref(1);
const branch = ref(null);
const level = ref(null);
const subject = ref(null);
const resourceType = ref('all');
const expandedGroups = ref({});
const search = ref('');

const currentBranch = computed(() => BRANCHES.find((b) => b.key === branch.value) || null);
const currentLevel = computed(() => LEVELS.find((l) => l.key === level.value) || null);

const query = computed(() => search.value.trim().toLowerCase());
const hasQuery = computed(() => query.value.length > 0);

const stepSummary = computed(() => ({
  1: currentBranch.value ? `${currentBranch.value.short} · ${currentBranch.value.name}` : '',
  2: currentLevel.value ? currentLevel.value.title : '',
  3: subject.value ? subject.value.name : '',
}));

// ── Subject list for the chosen branch + level ───────────────────────
const currentLevelCore = computed(() =>
  (subjectsFor(branch.value, level.value).core || []).map((s) => ({
    ...s,
    levelKey: level.value,
    branchKey: branch.value,
  }))
);

const currentLevelElectives = computed(
  () => subjectsFor(branch.value, level.value).electives || []
);

function matchesQuery(subject, q) {
  if (
    String(subject.name || '')
      .toLowerCase()
      .includes(q)
  )
    return true;
  if (
    String(subject.code || '')
      .toLowerCase()
      .includes(q)
  )
    return true;
  // Keep the old cross-section search: a subject whose notes / papers mention
  // the query is a match too (Data Science has the resources to answer this).
  return RESOURCE_TYPES.some((type) =>
    resourcesFor(subject.code)[type].some((item) =>
      String(item.title || '')
        .toLowerCase()
        .includes(q)
    )
  );
}

const visibleCore = computed(() =>
  currentLevelCore.value.filter((s) => matchesQuery(s, query.value))
);

const visibleElectiveGroups = computed(() => {
  const groups = currentLevelElectives.value;
  if (!hasQuery.value) return groups;
  return groups
    .map((g) => ({
      ...g,
      subjects: (g.subjects || []).filter((s) => matchesQuery(s, query.value)),
    }))
    .filter((g) => g.subjects.length);
});

const totalVisibleSubjects = computed(
  () =>
    visibleCore.value.length +
    visibleElectiveGroups.value.reduce((sum, g) => sum + g.subjects.length, 0)
);

const isSelected = (s) => Boolean(subject.value && subjectKey(s) === subjectKey(subject.value));

// What a level actually holds for the chosen branch — e.g. "8 core subjects"
// at Foundation, "5 core · 36 electives" at Degree. Counts come straight from
// the curriculum so the cards never drift from the catalogue.
function levelStat(levelKey) {
  const { core, electives = [] } = subjectsFor(branch.value, levelKey);
  const coreN = core.length;
  const electiveN = electives.reduce((n, group) => n + (group.subjects ? group.subjects.length : 0), 0);
  const parts = [`${coreN} core subject${coreN === 1 ? '' : 's'}`];
  if (electiveN) parts.push(`${electiveN} elective${electiveN === 1 ? '' : 's'}`);
  return parts.join(' · ');
}

// ── Actions ──────────────────────────────────────────────────────────
function chooseBranch(key) {
  if (branch.value === key) {
    step.value = 2; // "confirm" path when returning from a later step
    return;
  }
  branch.value = key;
  level.value = null;
  subject.value = null;
  resourceType.value = 'all';
  expandedGroups.value = {};
  search.value = '';
  step.value = 2;
}

function chooseLevel(key) {
  if (level.value === key) {
    step.value = 3;
    return;
  }
  level.value = key;
  subject.value = null;
  resourceType.value = 'all';
  expandedGroups.value = {};
  search.value = '';
  step.value = 3;
}

function selectSubject(s) {
  if (subject.value && subjectKey(s) === subjectKey(subject.value)) {
    step.value = 4;
    return;
  }
  subject.value = { ...s, levelKey: level.value, branchKey: branch.value };
  resourceType.value = 'all';
  expandedGroups.value = {};
  step.value = 4;
}

function setResourceType(type) {
  resourceType.value = type;
  expandedGroups.value = {};
}

function toggleGroup(label) {
  expandedGroups.value = { ...expandedGroups.value, [label]: !expandedGroups.value[label] };
}

function resetAll() {
  branch.value = null;
  level.value = null;
  subject.value = null;
  resourceType.value = 'all';
  expandedGroups.value = {};
  search.value = '';
  step.value = 1;
}

// Moving between steps focuses the new step heading so a screen-reader hears
// where the section moved. We scroll only the minimum needed — the trigger is
// usually a click that already happened in view, so a full jump to `start`
// would yank the page around. If the heading is already visible we stay put.
const reducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

const NAV_HEADROOM = 88; // fixed nav height + a breath of air

function focusStep(headingId) {
  const el = document.getElementById(headingId);
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const viewportH = window.innerHeight || document.documentElement.clientHeight;
  const visible =
    rect.top >= NAV_HEADROOM - 1 && rect.bottom <= viewportH - NAV_HEADROOM;
  if (!visible) {
    el.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'nearest' });
  }
  el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
}

watch(step, (value) =>
  nextTick(() => {
    const headingId = value === 1 ? 'rb-head-1' : `rb-head-${value}`;
    focusStep(headingId);
  })
);
</script>

<style scoped>
/* ── Section ────────────────────────────────────────────────────── */
/* The browser is the first section under the hero, so its top padding is
   kept tight (the global .section rule is trimmed here). */
.section.tone-a {
  padding: 3.5rem 0 3rem;
}

.rb-stage {
  min-height: 320px;
}

/* ── Stepper ────────────────────────────────────────────────────── */
.rb-stepper {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.rb-steps {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0;
  margin: 0;
}

.rb-step {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  padding: 0.45rem 0.9rem 0.45rem 0.5rem;
  border: 1px solid var(--border-card);
  border-radius: 99px;
  background: var(--color-card);
  color: var(--color-cream-muted);
  cursor: pointer;
  transition:
    border-color var(--duration-selector) var(--ease-editorial),
    color var(--duration-selector) var(--ease-editorial),
    transform var(--duration-selector) var(--ease-editorial);
}

.rb-step:hover {
  border-color: var(--border-card-hover);
  color: var(--color-cream);
  transform: translateY(-1px);
}

.rb-step:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 2px;
}

.rb-step--locked {
  opacity: 0.45;
  cursor: default;
  transform: none;
}

.rb-step--active {
  border-color: var(--color-gold);
  background: rgba(213, 166, 58, 0.1);
  color: var(--color-gold-light);
  font-weight: 600;
}

.rb-step--active::before {
  content: '';
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-gold);
  flex: none;
}

.rb-step--done {
  cursor: pointer;
}

.rb-step-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  flex: none;
  border-radius: 50%;
  border: 1px solid var(--border-card);
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--text3);
}

.rb-step--active .rb-step-num {
  border-color: var(--color-gold);
  color: var(--color-gold-light);
}

.rb-step-body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.25;
}

.rb-step-value {
  font-size: 0.66rem;
  font-weight: 600;
  color: var(--accent);
  max-width: 16rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.rb-reset {
  flex: none;
  padding-top: 0.35rem;
}

/* ── Step headings ──────────────────────────────────────────────── */
.rb-step-title {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  margin-bottom: 0.35rem;
  outline: none;
  scroll-margin-top: 5.5rem;
  scroll-margin-bottom: 2rem;
}

.rb-step-sub {
  font-size: 0.86rem;
  color: var(--text2);
  margin-bottom: 1.5rem;
  max-width: 46rem;
}

/* ── Branch grid ────────────────────────────────────────────────── */
.rb-branch-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.85rem;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
}

.rb-branch {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  text-align: left;
  padding: 1.15rem 1.2rem;
  background: var(--color-card);
  border: 1px solid var(--border-card);
  border-radius: var(--rad);
  color: var(--text2);
  font-family: var(--font-body);
  cursor: pointer;
  transition:
    background-color var(--duration-selector) var(--ease-editorial),
    border-color var(--duration-selector) var(--ease-editorial),
    color var(--duration-selector) var(--ease-editorial),
    transform var(--duration-selector) var(--ease-editorial);
}

.rb-branch:hover {
  border-color: var(--border-card-hover);
  color: var(--text);
  transform: translateY(-1px);
}

.rb-branch:active {
  transform: translateY(0) scale(0.99);
}

.rb-branch:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 3px;
}

.rb-branch--selected {
  border-color: var(--color-gold);
  background: rgba(213, 166, 58, 0.08);
}

.rb-branch-icon {
  color: var(--accent);
  margin-bottom: 0.35rem;
}

.rb-branch-code {
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text3);
}

.rb-branch--selected .rb-branch-code {
  color: var(--accent);
}

.rb-branch-name {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.35;
}

.rb-branch-count {
  margin-top: 0.2rem;
  font-size: 0.72rem;
  color: var(--text3);
}

/* ── Level grid ───────────────────────────────────────────────── */
.rb-level-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.85rem;
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
}

/* The three levels are a sibling of the four branches in the stepper, so
   they deserve the same card language — icon, name, count, gold rule on
   selection. */
.rb-level {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  text-align: left;
  padding: 1.15rem 1.2rem;
  background: var(--color-card);
  border: 1px solid var(--border-card);
  border-radius: var(--rad);
  color: var(--text2);
  font-family: var(--font-body);
  cursor: pointer;
  transition:
    background-color var(--duration-selector) var(--ease-editorial),
    border-color var(--duration-selector) var(--ease-editorial),
    color var(--duration-selector) var(--ease-editorial),
    transform var(--duration-selector) var(--ease-editorial);
}

.rb-level:hover {
  border-color: var(--border-card-hover);
  color: var(--text);
  transform: translateY(-1px);
}

.rb-level:active {
  transform: translateY(0) scale(0.99);
}

.rb-level:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 3px;
}

.rb-level--selected {
  border-color: var(--color-gold);
  background: rgba(213, 166, 58, 0.08);
}

.rb-level-icon {
  color: var(--accent);
  margin-bottom: 0.35rem;
}

.rb-level-name {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.35;
}

.rb-level-count {
  margin-top: 0.2rem;
  font-size: 0.72rem;
  color: var(--text3);
}

.rb-level--selected .rb-level-count {
  color: var(--accent);
}

/* ── Subject search (folded in here) ────────────────────────────── */
.rb-subject-search {
  max-width: 480px;
  margin-bottom: 1.75rem;
}

.rb-search-field {
  position: relative;
}

.rb-search-input {
  height: 3rem;
  padding-left: 2.8rem;
  padding-right: 2.6rem;
  font-size: 0.95rem;
}

.rb-search-input::-webkit-search-cancel-button {
  display: none;
}

.rb-search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--accent);
  pointer-events: none;
}

.rb-search-clear {
  position: absolute;
  right: 0.65rem;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  padding: 0.35rem;
  border: 0;
  border-radius: 50%;
  background: none;
  color: var(--text2);
  cursor: pointer;
  transition: color var(--duration-micro) var(--ease-editorial);
}

.rb-search-clear:hover {
  color: var(--text);
}

.rb-search-hint {
  margin-top: 0.55rem;
  font-size: 0.76rem;
  color: var(--text3);
}

/* ── Subject grid ───────────────────────────────────────────────── */
.rb-subject-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 0.75rem;
}

.rb-elective {
  margin-top: 2rem;
}

.rb-elective-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text3);
  padding-bottom: 0.6rem;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-subtle);
}

.rb-group-count {
  font-variant-numeric: tabular-nums;
  opacity: 0.7;
}

/* Not a card: a dense, scannable row. Border and a 1px lift on hover, gold
   rule and gold code on selection — the same selector language as .sel. */
.rb-subject {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  text-align: left;
  padding: 0.85rem 1rem 0.85rem 1.1rem;
  background: var(--color-card);
  border: 1px solid var(--border-card);
  border-radius: var(--rad);
  color: var(--text2);
  font-family: var(--font-body);
  cursor: pointer;
  transition:
    background-color var(--duration-selector) var(--ease-editorial),
    border-color var(--duration-selector) var(--ease-editorial),
    color var(--duration-selector) var(--ease-editorial),
    transform var(--duration-selector) var(--ease-editorial);
}

.rb-subject::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.85rem;
  bottom: 0.85rem;
  width: 2px;
  border-radius: 0 2px 2px 0;
  background: transparent;
  transition: background-color var(--duration-selector) var(--ease-editorial);
}

.rb-subject:hover {
  border-color: var(--border-card-hover);
  color: var(--text);
  transform: translateY(-1px);
}

.rb-subject:active {
  transform: translateY(0) scale(0.99);
}

.rb-subject:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 3px;
}

.rb-subject[aria-pressed='true'] {
  border-color: var(--color-gold);
  background: rgba(213, 166, 58, 0.08);
  color: var(--text);
}

.rb-subject[aria-pressed='true']::before {
  background: var(--color-gold);
}

.rb-subject-code {
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text3);
}

.rb-subject[aria-pressed='true'] .rb-subject-code {
  color: var(--accent);
}

.rb-subject-name {
  font-size: 0.88rem;
  font-weight: 500;
  line-height: 1.4;
}

.rb-subject--elective .rb-subject-name {
  color: var(--text2);
}

.rb-note {
  font-size: 0.88rem;
  color: var(--text2);
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.rb-note--rest {
  color: var(--text3);
  max-width: 44rem;
  line-height: 1.7;
}

/* ── Empty state (results placeholder) ──────────────────────────── */
.rb-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  min-height: 320px;
  color: var(--text3);
  text-align: center;
  font-size: 0.92rem;
  line-height: 1.7;
}

.rb-empty span {
  max-width: 34rem;
}

.rb-empty--start {
  min-height: 200px;
}

/* ── Responsive ─────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .rb-stepper {
    flex-direction: column;
    margin-bottom: 2rem;
  }

  .rb-step-value {
    max-width: 9rem;
  }

  .rb-subject-grid {
    grid-template-columns: 1fr;
  }

  .rb-branch-grid {
    grid-template-columns: 1fr;
  }

  .rb-level-grid {
    grid-template-columns: 1fr;
  }

  .rb-stage {
    min-height: 240px;
  }
}
</style>
