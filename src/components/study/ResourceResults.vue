<template>
  <!-- Step 4 of the browser: the chosen subject, its type chips, and its
       grouped resources. Extracted from the browser so the stepper file stays
       about navigation and this stays about results. -->
  <div v-if="subject">
    <div class="rb-block-head">
      <div>
        <h2 class="rb-block-title">{{ subject.name }}</h2>
        <p v-if="subject.description" class="rb-subject-desc">{{ subject.description }}</p>
      </div>
      <button type="button" class="btn btn--text" @click="$emit('clear-subject')">
        Change subject
      </button>
    </div>

    <template v-if="hasAnyResources">
      <div class="rb-chips rb-types" role="group" aria-label="Resource type">
        <button
          v-for="type in typeMeta"
          :key="type.key"
          type="button"
          class="sel"
          :aria-pressed="resourceType === type.key"
          @click="$emit('update:resourceType', type.key)"
        >
          <component :is="type.icon" :size="15" :stroke-width="1.9" aria-hidden="true" />
          {{ type.label }}
          <span class="rb-chip-count">{{ typeCounts[type.key] }}</span>
        </button>
      </div>

      <div class="rb-results">
        <template v-if="resultGroups.length">
          <section
            v-for="group in resultGroups"
            :key="group.label"
            class="rb-group"
            :class="{ 'rb-group--featured': group.featured }"
          >
            <h3 v-if="group.label" class="rb-group-label">
              <component
                :is="group.icon"
                v-if="group.icon"
                :size="14"
                :stroke-width="1.9"
                aria-hidden="true"
              />
              {{ group.label }}
              <span class="rb-group-count">{{ group.items.length }}</span>
            </h3>
            <ul class="rb-list">
              <li v-for="item in shownItems(group)" :key="item.key">
                <a class="rb-item" :href="item.link" target="_blank" rel="noopener noreferrer">
                  <span class="rb-item-main">
                    <span class="rb-item-title">{{ item.title }}</span>
                    <span class="rb-item-meta">
                      <span class="rb-item-type">{{ item.typeLabel }}</span>
                      <span v-if="item.badge" class="rb-item-badge">{{ item.badge }}</span>
                    </span>
                  </span>
                  <span class="rb-item-cta">
                    {{ item.cta }}
                    <ArrowRight :size="14" :stroke-width="2" aria-hidden="true" />
                  </span>
                </a>
              </li>
            </ul>
            <button
              v-if="group.items.length > previewCount"
              type="button"
              class="btn btn--text rb-more"
              @click="$emit('toggle-group', group.label)"
            >
              {{ expandedGroups[group.label] ? 'Show fewer' : `Show all ${group.items.length}` }}
              <ChevronDown
                class="rb-more-chevron"
                :class="{ 'rb-more-chevron--up': expandedGroups[group.label] }"
                :size="14"
                :stroke-width="2"
                aria-hidden="true"
              />
            </button>
          </section>
        </template>

        <p v-else class="rb-empty">
          <FileSearch :size="26" :stroke-width="1.6" aria-hidden="true" />
          <span>
            No {{ resourceType === 'all' ? 'resources' : activeTypeLabel.toLowerCase() }} here
            yet<template v-if="search"> for “{{ search }}”</template>.
          </span>
          <button
            v-if="resourceType !== 'all'"
            type="button"
            class="btn btn--outline btn--sm"
            @click="$emit('update:resourceType', 'all')"
          >
            Show everything for this subject
          </button>
        </p>
      </div>
    </template>

    <!-- A subject that exists in the catalogue but has no indexed links yet —
         every non-Data-Science subject today. Ask, rather than dead-end. -->
    <div v-else class="rr-none">
      <FileSearch :size="26" :stroke-width="1.6" aria-hidden="true" />
      <p class="rr-none-title">No resources yet for {{ subject.name }}</p>
      <p class="rr-none-sub">
        We have not collected notes or past papers for this subject yet. Request it and we will
        prioritise it for the community.
      </p>
      <a
        class="btn btn--primary"
        :href="REQUEST_RESOURCE_URL"
        target="_blank"
        rel="noopener noreferrer"
      >
        Request a Resource
        <ArrowRight :size="16" :stroke-width="2" aria-hidden="true" />
      </a>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import {
  PlayCircle,
  NotebookPen,
  FileText,
  Layers,
  FolderOpen,
  Calendar,
  User,
  FileSearch,
  ArrowRight,
  ChevronDown,
} from 'lucide-vue-next';

import {
  driveLinks,
  hasResources,
  REQUEST_RESOURCE_URL,
  resourcesFor,
} from '../../data/study/resources.js';

const props = defineProps({
  subject: {
    type: Object,
    default: null,
  },
  search: {
    type: String,
    default: '',
  },
  resourceType: {
    type: String,
    default: 'all',
  },
  expandedGroups: {
    type: Object,
    default: () => ({}),
  },
  previewCount: {
    type: Number,
    default: 6,
  },
});

const emit = defineEmits(['update:resourceType', 'toggle-group', 'clear-subject']);

const typeMeta = [
  { key: 'all', icon: Layers, label: 'All', cta: 'Open' },
  { key: 'lectures', icon: PlayCircle, label: 'Lectures', cta: 'Watch' },
  { key: 'notes', icon: NotebookPen, label: 'Notes', cta: 'View notes' },
  { key: 'pyq', icon: FileText, label: 'PYQs', cta: 'Open paper' },
];

const RESOURCE_TYPES = ['lectures', 'notes', 'pyq'];

const query = computed(() => props.search.trim().toLowerCase());

const hasAnyResources = computed(() => hasResources(props.subject?.code));

// ── Title parsing ──────────────────────────────────────────────────
function parseAuthor(title) {
  const match = String(title).match(/\(by\s+(.+?)\)\s*$/i);
  return match ? match[1].trim() : 'Unknown';
}

function cleanTitle(title) {
  let cleaned = String(title || '')
    .replace(/\s*\(by\s+.+?\)\s*$/i, '')
    .trim();
  cleaned = cleaned.replace(/^[\s\-–:]+/, '');
  return cleaned || String(title || 'Untitled');
}

function parsePYQYear(title) {
  const monthYear = String(title).match(
    /(January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{4})/i
  );
  if (monthYear) return monthYear[2];
  const yearOnly = String(title).match(/\b(20\d{2})\b/);
  return yearOnly ? yearOnly[1] : 'Other';
}

// ── Resources ──────────────────────────────────────────────────────
function matchingItems(type) {
  const source = resourcesFor(props.subject?.code)[type];
  const q = query.value;
  if (!q) return source;
  return source.filter((item) =>
    String(item.title || '')
      .toLowerCase()
      .includes(q)
  );
}

const typeCounts = computed(() => {
  const counts = { all: 0 };
  RESOURCE_TYPES.forEach((type) => {
    counts[type] = matchingItems(type).length;
    counts.all += counts[type];
  });
  return counts;
});

const activeTypeLabel = computed(
  () => typeMeta.find((t) => t.key === props.resourceType)?.label || 'Resources'
);

function decorate(item, type, index) {
  const meta = typeMeta.find((t) => t.key === type);
  return {
    key: `${type}-${index}-${item.link}`,
    title: cleanTitle(item.title),
    link: item.link,
    badge: item.badge,
    typeLabel: meta.label,
    cta: meta.cta,
  };
}

/**
 * One flat, grouped list — notes by contributor, PYQs by year, curated Drive
 * folders first, flagged. Same behaviour as before the stepper existed.
 */
const resultGroups = computed(() => {
  if (!props.subject) return [];
  const type = props.resourceType;
  const groups = [];

  if (type === 'all') {
    RESOURCE_TYPES.forEach((t) => {
      const items = matchingItems(t);
      if (!items.length) return;
      const meta = typeMeta.find((m) => m.key === t);
      groups.push({
        label: meta.label,
        icon: meta.icon,
        items: items.map((item, i) => decorate(item, t, i)),
      });
    });
    return withDriveFolders(groups);
  }

  const items = matchingItems(type);

  if (type === 'notes') {
    const byAuthor = new Map();
    items.forEach((item, i) => {
      const author = parseAuthor(item.title);
      if (!byAuthor.has(author)) byAuthor.set(author, []);
      byAuthor.get(author).push(decorate(item, type, i));
    });
    Array.from(byAuthor.entries())
      .sort(([a], [b]) => (a === 'Unknown' ? 1 : b === 'Unknown' ? -1 : a.localeCompare(b)))
      .forEach(([author, list]) => groups.push({ label: author, icon: User, items: list }));
    return withDriveFolders(groups);
  }

  if (type === 'pyq') {
    const byYear = new Map();
    items.forEach((item, i) => {
      const year = parsePYQYear(item.title);
      if (!byYear.has(year)) byYear.set(year, []);
      byYear.get(year).push(decorate(item, type, i));
    });
    Array.from(byYear.entries())
      .sort(([a], [b]) => (a === 'Other' ? 1 : b === 'Other' ? -1 : Number(b) - Number(a)))
      .forEach(([year, list]) => groups.push({ label: year, icon: Calendar, items: list }));
    return withDriveFolders(groups);
  }

  if (items.length) {
    groups.push({ label: '', items: items.map((item, i) => decorate(item, type, i)) });
  }
  return groups;
});

/** Prepends the curated Drive folder for the current subject, where one exists. */
function withDriveFolders(groups) {
  const subject = props.subject;
  if (!subject) return groups;
  const type = props.resourceType;
  const items = [];

  if (type === 'all' || type === 'notes') {
    let link = driveLinks.notes[subject.code];
    if (!link && subject.name?.toLowerCase().includes('analytics')) {
      link = driveLinks.notes.BSMS2002;
    }
    if (link) {
      items.push({
        key: `drive-notes-${subject.code}`,
        title: `Subject-wise notes — ${subject.name}`,
        link,
        typeLabel: 'Drive folder',
        cta: 'Open folder',
      });
    }
  }

  if (type === 'all' || type === 'pyq') {
    const code = String(subject.code);
    const isFoundation =
      subject.levelKey === 'foundation' || (code.startsWith('BS') && code.includes('10'));
    const isDiploma =
      subject.levelKey === 'diploma' || (code.startsWith('BS') && code.includes('20'));
    if (isFoundation) {
      items.push({
        key: `drive-pyq-${code}`,
        title: 'Foundation end-term PYQs',
        link: driveLinks.foundationPyq,
        typeLabel: 'Drive folder',
        cta: 'Open folder',
      });
    } else if (isDiploma) {
      items.push({
        key: `drive-pyq-${code}`,
        title: 'Diploma end-term PYQs',
        link: driveLinks.diplomaPyq,
        typeLabel: 'Drive folder',
        cta: 'Open folder',
      });
    }
  }

  if (!items.length) return groups;
  return [{ label: 'Curated folders', icon: FolderOpen, featured: true, items }, ...groups];
}

// ── Actions ────────────────────────────────────────────────────────
function shownItems(group) {
  if (props.expandedGroups[group.label]) return group.items;
  return group.items.slice(0, props.previewCount);
}
</script>

<style scoped>
/* This file renders the results half of the browser, so the rows, groups,
   type chips and empty states live here (with the browser keeping the
   stepper and subject picker). The vocabulary is unchanged from the original
   browser: .sel comes from the global selector tier, the gold rule and the
   hairline rows are the same selectors as before. */

/* ── Subject header ─────────────────────────────────────────────── */
.rb-block-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.1rem;
}

.rb-block-title {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  margin-bottom: 1rem;
}

.rb-block-head .rb-block-title {
  margin-bottom: 0;
}

.rb-subject-desc {
  margin-top: 0.35rem;
  font-size: 0.85rem;
  color: var(--text2);
  max-width: 46rem;
}

/* ── Type chips ─────────────────────────────────────────────────── */
.rb-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.rb-types {
  margin-bottom: 1.75rem;
}

.rb-chip-count {
  font-size: 0.7rem;
  color: var(--text3);
  font-variant-numeric: tabular-nums;
}

.sel[aria-pressed='true'] .rb-chip-count {
  color: var(--accent);
}

/* ── Results ────────────────────────────────────────────────────── */
.rb-results {
  min-height: 320px;
}

.rb-group + .rb-group {
  margin-top: 1.75rem;
}

.rb-group-label {
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

.rb-group--featured .rb-group-label {
  color: var(--accent);
}

.rb-group-count {
  font-variant-numeric: tabular-nums;
  opacity: 0.7;
}

.rb-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.rb-more {
  margin-top: 0.6rem;
}

/* This control's trailing glyph means "expand", not "go", so it rotates
   instead of taking the global trailing-arrow slide. The .btn.rb-more prefix
   is what outranks `.btn:hover svg:last-child`. */
.btn.rb-more .rb-more-chevron {
  transition: transform var(--duration-link) var(--ease-editorial);
}

.btn.rb-more:hover .rb-more-chevron {
  transform: none;
}

.btn.rb-more .rb-more-chevron--up,
.btn.rb-more:hover .rb-more-chevron--up {
  transform: rotate(180deg);
}

/* A row, not a card — one hairline between entries and nothing nested. */
.rb-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  padding: 0.85rem 0.75rem;
  border-bottom: 1px solid var(--border-subtle);
  border-radius: var(--rad);
  color: var(--text);
  text-decoration: none;
  transition:
    background-color var(--duration-card) var(--ease-editorial),
    color var(--duration-card) var(--ease-editorial);
}

.rb-item:hover {
  background: var(--color-card);
  color: #fff;
}

.rb-item:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 2px;
}

.rb-item-main {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  min-width: 0;
}

.rb-item-title {
  font-size: 0.9rem;
  line-height: 1.45;
}

.rb-item-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.rb-item-type,
.rb-item-badge {
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.rb-item-type {
  color: var(--text3);
}

.rb-item-badge {
  color: var(--accent);
  border: 1px solid var(--border-subtle);
  border-radius: 99px;
  padding: 0.1rem 0.5rem;
}

.rb-item-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  flex: none;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: var(--accent);
}

.rb-item-cta svg {
  transition: transform var(--duration-link) var(--ease-editorial);
}

.rb-item:hover .rb-item-cta svg {
  transform: translateX(4px);
}

/* ── Empty states ───────────────────────────────────────────────── */
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

/* ── "No resources yet" — subject exists, links do not ──────────── */
.rr-none {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
  min-height: 300px;
  color: var(--text3);
  text-align: center;
  border: 1px dashed var(--border-card);
  border-radius: var(--rad2);
  padding: 2rem 1.5rem;
}

.rr-none-title {
  color: var(--text);
  font-size: 1.05rem;
  font-weight: 600;
}

.rr-none-sub {
  max-width: 34rem;
  font-size: 0.9rem;
  line-height: 1.7;
}

.rr-none .btn--primary {
  margin-top: 0.6rem;
}

/* ── Responsive ─────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .rb-item {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.6rem;
    padding: 0.9rem 0.5rem;
  }

  .rb-item-cta {
    font-size: 0.75rem;
  }

  .rb-results,
  .rb-empty {
    min-height: 240px;
  }
}
</style>
