<template>
  <section class="ql-section">
    <div class="container">
      <div class="ql-grid">
        <a
          v-for="link in links"
          :key="link.title"
          class="ql-card"
          :href="link.href"
          v-bind="link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}"
          @click.prevent="link.action ? link.action() : null"
        >
          <span class="ql-icon-wrap">
            <component :is="link.icon" :size="18" :stroke-width="1.5" aria-hidden="true" />
          </span>
          <div class="ql-text">
            <h3 class="ql-title">{{ link.title }}</h3>
            <p class="ql-desc">{{ link.description }}</p>
          </div>
          <ArrowRight class="ql-arrow" :size="16" :stroke-width="2" aria-hidden="true" />
        </a>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="showHandbookModal" class="hb-overlay" @click="showHandbookModal = false">
        <div class="hb-modal" @click.stop>
          <h3 class="hb-title">Select your branch</h3>
          <div class="hb-options">
            <a
              v-for="branch in branches"
              :key="branch.label"
              class="hb-option"
              :href="branch.href"
              target="_blank"
              rel="noopener noreferrer"
              @click="showHandbookModal = false"
            >
              <span class="hb-branch">{{ branch.label }}</span>
              <span class="hb-name">{{ branch.name }}</span>
            </a>
          </div>
          <button class="hb-close" @click="showHandbookModal = false">Close</button>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import {
  BookOpen,
  BarChart3,
  Brain,
  LineChart,
  Code2,
  MessageSquare,
  Calendar,
  FileText,
  ArrowRight,
} from 'lucide-vue-next';

const showHandbookModal = ref(false);

const branches = [
  { label: 'DS', name: 'Data Science', href: 'https://study.iitm.ac.in/ds' },
  { label: 'ES', name: 'Electronic Systems', href: 'https://study.iitm.ac.in/es' },
  { label: 'AE', name: 'Aeronautics & Space', href: 'https://study.iitm.ac.in/ae' },
  { label: 'MG', name: 'Management & DS', href: 'https://study.iitm.ac.in/mg' },
];

const openHandbook = () => {
  showHandbookModal.value = true;
};

const links = [
  {
    icon: BookOpen,
    title: 'Get Resources',
    description: 'Lecture videos, notes and past papers for all subjects',
    href: '#resource-browser',
    external: false,
  },
  {
    icon: BarChart3,
    title: 'Score Checker',
    description: 'Check your exam scores updated by IITM BS',
    href: null,
    external: false,
  },
  {
    icon: Brain,
    title: 'Practice for Exam',
    description: 'Quizzes and problems to prepare for exams',
    href: 'https://quizpractice.space/',
    external: true,
  },
  {
    icon: LineChart,
    title: 'Looker Studio',
    description: 'Visual dashboards and analytics for IITM BS data',
    href: 'https://datastudio.google.com/reporting/d02dac13-665b-49cc-8d51-0451268a6a3e/page/p_zohf4g5z2d?s=i1h4iWCG8o4',
    external: true,
  },
  {
    icon: Code2,
    title: 'OPPE Portal',
    description: 'Online Programming & Problem-solving Evaluation',
    href: 'https://study.iitm.ac.in/ds/exam.html',
    external: true,
  },
  {
    icon: MessageSquare,
    title: 'Discourse Forum',
    description: 'Community discussions and peer help',
    href: 'https://discourse.onlinedegree.iitm.ac.in/',
    external: true,
  },
  {
    icon: Calendar,
    title: 'Course Planner',
    description: 'Plan your semester courses and track progress',
    href: 'https://course-planner-140256174016.asia-south1.run.app/login',
    external: true,
  },
  {
    icon: FileText,
    title: 'Student Handbook',
    description: 'Official handbook for your branch',
    action: openHandbook,
  },
];
</script>

<style scoped>
.ql-section {
  padding: 1.25rem 0 0;
}

.ql-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.625rem;
}

.ql-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.625rem;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.03);
  text-decoration: none;
  min-width: 0;
  overflow: hidden;
  cursor: pointer;
  transition:
    border-color 0.2s,
    background 0.2s;
}

.ql-card:hover {
  border-color: rgba(212, 175, 55, 0.3);
  background: rgba(255, 255, 255, 0.05);
}

.ql-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 0.4rem;
  background: rgba(212, 175, 55, 0.1);
  color: var(--accent);
}

.ql-text {
  flex: 1;
  min-width: 0;
}

.ql-title {
  font-weight: 600;
  font-size: 0.88rem;
  color: #fff;
  margin-bottom: 0.15rem;
}

.ql-desc {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ql-arrow {
  flex-shrink: 0;
  color: rgba(255, 255, 255, 0.4);
  opacity: 0;
  transition:
    opacity 0.2s,
    color 0.2s;
}

.ql-card:hover .ql-arrow {
  opacity: 1;
  color: var(--accent);
}

@media (max-width: 900px) {
  .ql-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 520px) {
  .ql-grid {
    grid-template-columns: 1fr;
  }

  .ql-desc {
    white-space: normal;
  }
}

/* Modal */
.hb-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
}

.hb-modal {
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 1.5rem;
  width: 90%;
  max-width: 22rem;
}

.hb-title {
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 1rem;
}

.hb-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.hb-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  text-decoration: none;
  transition:
    border-color 0.2s,
    background 0.2s;
}

.hb-option:hover {
  border-color: var(--accent);
  background: rgba(212, 175, 55, 0.08);
}

.hb-branch {
  font-weight: 700;
  font-size: 0.82rem;
  color: var(--accent);
  min-width: 2rem;
}

.hb-name {
  font-size: 0.85rem;
  color: #fff;
}

.hb-close {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  background: transparent;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.82rem;
  cursor: pointer;
  transition:
    border-color 0.2s,
    color 0.2s;
}

.hb-close:hover {
  border-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}
</style>
