<template>
  <!-- Tone A. The whole point of this section is that it is the first thing
       under the hero — and now that it is a guided stepper, the visitor is
       never facing nineteen subjects at once. Branch → Level → Subject →
       Resources, one step at a time; search is folded into the subject step
       instead of sitting above everything. -->
  <section class="section tone-a rs" id="resource-browser">
    <div class="container">
      <div class="rb-global-search">
        <label class="rb-global-label" for="rb-global-search">Search resources</label>
        <div class="rb-search-field">
          <Search class="rb-search-icon" :size="17" :stroke-width="1.9" aria-hidden="true" />
          <input
            id="rb-global-search"
            v-model="globalSearch"
            type="search"
            class="form-input rb-search-input"
            placeholder="Search subjects, notes, PYQs…"
            autocomplete="off"
          />
          <button
            v-if="globalSearch"
            type="button"
            class="rb-search-clear"
            aria-label="Clear search"
            @click="globalSearch = ''"
          >
            <X :size="15" :stroke-width="2" />
          </button>
        </div>
        <p class="rb-search-hint">
          Searches every subject, note and past paper across all three levels.
        </p>
      </div>

      <nav class="rb-stepper" aria-label="Browse resources">
        <div class="rb-steps-wrap">
          <div class="rb-progress" aria-hidden="true">
            <span class="rb-progress-fill" :style="{ width: progressPct + '%' }"></span>
          </div>
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
        </div>
        <button v-if="branch" type="button" class="btn btn--text rb-reset" @click="resetAll">
          Start over
        </button>
      </nav>

      <div class="rb-stage">
        <!-- Global search results: replaces the stepper while a query is active,
             so the browse flow and the search-across-everything flow never mix. -->
        <div v-if="hasGlobalQuery" key="global" class="rb-step-pane rb-global">
          <h2 class="rb-step-title" id="rb-head-global" tabindex="-1">
            Results for “{{ globalSearch }}”
          </h2>
          <p class="rb-step-sub">
            Matching subjects, notes, lectures and past papers — across every branch and level.
          </p>

          <template v-if="globalGroups.length">
            <section v-for="(g, gi) in globalGroups" :key="g.subject.key" class="rb-global-group">
              <h3 class="rb-global-label">
                <span>
                  {{ g.label }}
                  <span class="rb-group-count">{{ g.items.length }}</span>
                </span>
                <button type="button" class="btn btn--text" @click="openGlobalSubject(g.subject)">
                  Open in browser
                </button>
              </h3>
              <ul class="rb-global-list">
                <li v-for="(item, ii) in g.items" :key="item.key">
                  <a
                    class="rb-global-item rb-card-enter"
                    :style="{ animationDelay: gi * 60 + ii * 45 + 'ms' }"
                    :href="item.link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span class="rb-global-item-main">
                      <span class="rb-global-item-title">{{ item.title }}</span>
                      <span class="rb-global-item-meta">
                        <span class="rb-global-item-type">{{ item.typeLabel }}</span>
                        <span v-if="item.badge" class="rb-global-item-badge">{{ item.badge }}</span>
                      </span>
                    </span>
                    <span class="rb-global-item-cta">
                      {{ item.cta }}
                      <ArrowRight :size="14" :stroke-width="2" aria-hidden="true" />
                    </span>
                  </a>
                </li>
              </ul>
            </section>
          </template>

          <p v-else class="rb-empty">
            <FileSearch :size="26" :stroke-width="1.6" aria-hidden="true" />
            <span>No subjects or resources match “{{ globalSearch }}”.</span>
            <button type="button" class="btn btn--outline btn--sm" @click="globalSearch = ''">
              Clear search
            </button>
          </p>
        </div>

        <Transition v-else name="rb-step" mode="out-in">
          <!-- ── 1. BRANCH ─────────────────────────────────────────── -->
          <div v-if="step === 1" key="1" class="rb-step-pane">
            <h2 class="rb-step-title" id="rb-head-1">Choose your branch</h2>
            <p class="rb-step-sub">
              Each programme has its own subjects, so start with the branch you are enrolled in.
            </p>
            <div class="rb-branch-grid" role="group" aria-labelledby="rb-head-1">
              <button
                v-for="(b, bi) in BRANCHES"
                :key="b.key"
                type="button"
                class="rb-branch rb-card-enter"
                :class="{ 'rb-branch--selected': branch === b.key }"
                :style="{ animationDelay: bi * 45 + 'ms' }"
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
          <div v-else-if="step === 2" key="2" class="rb-step-pane">
            <h2 class="rb-step-title" id="rb-head-2">Choose your level</h2>
            <p class="rb-step-sub">
              {{ currentBranch.name }} runs three levels — pick where you are.
            </p>
            <div class="rb-level-grid" role="group" aria-labelledby="rb-head-2">
              <button
                v-for="(l, li) in LEVELS"
                :key="l.key"
                type="button"
                class="rb-level rb-card-enter"
                :class="{ 'rb-level--selected': level === l.key }"
                :style="{ animationDelay: li * 45 + 'ms' }"
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
          <div v-else-if="step === 3" key="3" class="rb-step-pane">
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
                v-for="(subject, si) in visibleCore"
                :key="subjectKey(subject)"
                type="button"
                class="rb-subject rb-card-enter"
                :style="{ animationDelay: si * 45 + 'ms' }"
                :aria-pressed="isSelected(subject)"
                @click="selectSubject(subject)"
              >
                <span class="rb-subject-code">{{ subject.code }}</span>
                <span class="rb-subject-name">{{ subject.name }}</span>
                <ChevronRight
                  class="rb-subject-go"
                  :size="15"
                  :stroke-width="2"
                  aria-hidden="true"
                />
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
                  v-for="(sub, si) in group.subjects"
                  :key="subjectKey(sub)"
                  type="button"
                  class="rb-subject rb-card-enter"
                  :style="{ animationDelay: si * 45 + 'ms' }"
                  :class="{ 'rb-subject--elective': !sub.code }"
                  :aria-pressed="isSelected(sub)"
                  @click="selectSubject(sub)"
                >
                  <span v-if="sub.code" class="rb-subject-code">{{ sub.code }}</span>
                  <span class="rb-subject-name">{{ sub.name }}</span>
                  <ChevronRight
                    class="rb-subject-go"
                    :size="15"
                    :stroke-width="2"
                    aria-hidden="true"
                  />
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
          <div v-else-if="step === 4" key="4" class="rb-step-pane">
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
        </Transition>
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
  ChevronRight,
  FileSearch,
  ArrowRight,
} from 'lucide-vue-next';

import {
  BRANCHES,
  LEVELS,
  allSubjectsFor,
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
const globalSearch = ref('');

const currentBranch = computed(() => BRANCHES.find((b) => b.key === branch.value) || null);
const currentLevel = computed(() => LEVELS.find((l) => l.key === level.value) || null);

const query = computed(() => search.value.trim().toLowerCase());
const hasQuery = computed(() => query.value.length > 0);

// ── Global resource search ──────────────────────────────────────────
// Independent of the stepper: typing searches the *whole catalogue* — every
// branch × level — matching subject names/codes and the titles of every note,
// lecture and past paper. A live query swaps the stage for the results below.
const hasGlobalQuery = computed(() => globalSearch.value.trim().length > 0);

const GLOBAL_TYPE_META = {
  lectures: { label: 'Lectures', cta: 'Watch' },
  notes: { label: 'Notes', cta: 'View notes' },
  pyq: { label: 'PYQs', cta: 'Open paper' },
};

// Every selectable subject in the catalogue, deduped by key, tagged with the
// branch and level it belongs to so a result can step straight into it.
const globalCatalog = computed(() => {
  const seen = new Map();
  BRANCHES.forEach((branchKey) => {
    LEVELS.forEach((levelKey) => {
      allSubjectsFor(branchKey, levelKey.key).forEach((subject) => {
        const key = subjectKey(subject);
        if (!seen.has(key)) {
          seen.set(key, { ...subject, key, branchKey, levelKey: levelKey.key });
        }
      });
    });
  });
  return Array.from(seen.values());
});

function decorateGlobalItem(item, type, index, subjectKey) {
  const meta = GLOBAL_TYPE_META[type];
  return {
    key: `${subjectKey}-${type}-${index}-${item.link}`,
    title: item.title,
    link: item.link,
    badge: item.badge,
    typeLabel: meta.label,
    cta: meta.cta,
  };
}

const globalGroups = computed(() => {
  const q = globalSearch.value.trim().toLowerCase();
  if (!q) return [];
  const groups = [];
  globalCatalog.value.forEach((subject) => {
    const nameMatch = String(subject.name || '')
      .toLowerCase()
      .includes(q);
    const codeMatch = String(subject.code || '')
      .toLowerCase()
      .includes(q);
    const matchedBySubject = nameMatch || codeMatch;
    const items = [];
    RESOURCE_TYPES.forEach((type) => {
      resourcesFor(subject.code)[type].forEach((item, i) => {
        const titleMatch = String(item.title || '')
          .toLowerCase()
          .includes(q);
        if (matchedBySubject || titleMatch) {
          items.push(decorateGlobalItem(item, type, i, subject.key));
        }
      });
    });
    if (items.length) {
      groups.push({
        subject,
        label: subject.code ? `${subject.code} · ${subject.name}` : subject.name,
        match: matchedBySubject ? 'subject' : 'items',
        items,
      });
    }
  });
  // Direct subject hits first (their whole resource set is shown), then
  // subjects reached purely through matching item titles.
  return groups.sort((a, b) => (a.match === b.match ? 0 : a.match === 'subject' ? -1 : 1));
});

const stepSummary = computed(() => ({
  1: currentBranch.value ? `${currentBranch.value.short} · ${currentBranch.value.name}` : '',
  2: currentLevel.value ? currentLevel.value.title : '',
  3: subject.value ? subject.value.name : '',
}));

// How far through the stepper we are — drives the gold progress line that sits
// behind the pills (0% on step 1, 100% when the resources are shown).
const progressPct = computed(() => ((step.value - 1) / (steps.length - 1)) * 100);

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
  const electiveN = electives.reduce(
    (n, group) => n + (group.subjects ? group.subjects.length : 0),
    0
  );
  const parts = [`${coreN} core subject${coreN === 1 ? '' : 's'}`];
  if (electiveN) parts.push(`${electiveN} elective${electiveN === 1 ? '' : 's'}`);
  return parts.join(' · ');
}

// ── Actions ──────────────────────────────────────────────────────────
function chooseBranch(key) {
  globalSearch.value = '';
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
  globalSearch.value = '';
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
  globalSearch.value = '';
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
  globalSearch.value = '';
  step.value = 1;
}

// A global result can hand the visitor straight into the stepper for that
// subject (branch + level + subject set, resources shown).
function openGlobalSubject(s) {
  branch.value = s.branchKey;
  level.value = s.levelKey;
  subject.value = { ...s, levelKey: s.levelKey, branchKey: s.branchKey };
  resourceType.value = 'all';
  expandedGroups.value = {};
  globalSearch.value = '';
  step.value = 4;
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
  const visible = rect.top >= NAV_HEADROOM - 1 && rect.bottom <= viewportH - NAV_HEADROOM;
  if (!visible) {
    el.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'nearest' });
  }
  el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
}

watch(step, (value) => nextTick(() => focusWhenReady(value, 0)));

// The step panes swap through an out-in transition, so the new heading is not
// in the DOM the moment `step` changes. Retry across a couple of animation
// frames until the next pane has actually mounted, then focus it.
function focusWhenReady(value, attempt) {
  const headingId = value === 1 ? 'rb-head-1' : `rb-head-${value}`;
  const el = document.getElementById(headingId);
  if (el) {
    focusStep(headingId);
  } else if (attempt < 20) {
    requestAnimationFrame(() => focusWhenReady(value, attempt + 1));
  }
}
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

.rb-steps-wrap {
  position: relative;
  flex: 1;
  min-width: 0;
}

/* The progress track rides the vertical centre of the step pills and fills
   gold as the visitor advances. Pills are opaque so the line passes cleanly
   underneath instead of bleeding through. */
.rb-progress {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 2px;
  background: var(--border-subtle);
  border-radius: 99px;
  overflow: hidden;
  z-index: 0;
}

.rb-progress-fill {
  display: block;
  height: 100%;
  width: 0;
  background: linear-gradient(90deg, var(--color-gold), var(--accent));
  border-radius: 99px;
  transition: width 0.55s var(--ease-editorial);
}

.rb-steps {
  position: relative;
  z-index: 1;
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
  /* Opaque fill (card colour) with a gold wash painted on top via an inset
     shadow — the pill stays solid so the progress line passes underneath. */
  background: var(--color-card);
  box-shadow: inset 0 0 0 100px rgba(213, 166, 58, 0.09);
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

/* ── Step transitions & entrance choreography ──────────────────── */
/* Step panes slide/fade as the visitor advances; `out-in` keeps the two from
   ever overlapping and the min-height on .rb-stage holds the layout steady. */
.rb-step-enter-active {
  transition:
    opacity 0.32s var(--ease-editorial),
    transform 0.32s var(--ease-editorial);
}

.rb-step-leave-active {
  transition:
    opacity 0.18s var(--ease-editorial),
    transform 0.18s var(--ease-editorial);
}

.rb-step-enter-from {
  opacity: 0;
  transform: translateY(14px);
}

.rb-step-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Cards inside a fresh step rise in one after another. `both` keeps each card
   in its hidden state until its delay starts, so the stagger reads as a wave
   instead of a single pop. */
@keyframes rb-rise {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.rb-card-enter {
  animation: rb-rise 0.5s var(--ease-editorial) both;
}

/* Hover: a warm gold glow and lift, and the card's icon wakes up. */
.rb-branch:hover,
.rb-level:hover {
  border-color: rgba(213, 166, 58, 0.55);
  box-shadow: 0 16px 34px -18px rgba(213, 166, 58, 0.4);
  transform: translateY(-2px);
}

.rb-branch-icon,
.rb-level-icon {
  transition: transform var(--duration-selector) var(--ease-editorial);
}

.rb-branch:hover .rb-branch-icon,
.rb-level:hover .rb-level-icon {
  transform: scale(1.15) rotate(-6deg);
}

/* Selection pops the card once, then it settles — reads as "locked in" right
   before the browser advances a step. Placed after .rb-card-enter so a card
   that gets selected later breaks out of the (finished) rise and plays this. */
@keyframes rb-pop {
  0% {
    transform: scale(0.98);
  }
  40% {
    transform: scale(1.03);
  }
  100% {
    transform: scale(1);
  }
}

.rb-branch--selected,
.rb-level--selected,
.rb-subject[aria-pressed='true'] {
  animation: rb-pop 0.4s var(--ease-editorial);
}

/* A chevron slides in on subject rows to signal "this opens the resources". */
.rb-subject {
  padding-right: 2.2rem;
}

.rb-subject-go {
  position: absolute;
  right: 0.85rem;
  top: 50%;
  transform: translateY(-50%) translateX(-5px);
  opacity: 0;
  color: var(--accent);
  transition:
    opacity var(--duration-selector) var(--ease-editorial),
    transform var(--duration-selector) var(--ease-editorial);
}

.rb-subject:hover .rb-subject-go,
.rb-subject[aria-pressed='true'] .rb-subject-go {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
}

/* ── Reduced motion ─────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .rb-step-enter-active,
  .rb-step-leave-active,
  .rb-progress-fill,
  .rb-subject-go {
    transition: none;
  }

  .rb-card-enter,
  .rb-branch--selected,
  .rb-level--selected,
  .rb-subject[aria-pressed='true'] {
    animation: none;
  }

  .rb-branch:hover,
  .rb-level:hover {
    transform: none;
    box-shadow: none;
  }

  .rb-branch:hover .rb-branch-icon,
  .rb-level:hover .rb-level-icon {
    transform: none;
  }
}

/* ── Responsive ─────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .rb-stepper {
    flex-direction: column;
    margin-bottom: 2rem;
  }

  /* The pills stack vertically on small screens, so a horizontal track has no
     single clean centre line anymore — drop it. */
  .rb-progress {
    display: none;
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
