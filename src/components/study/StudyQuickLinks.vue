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
        >
          <span class="ql-icon-wrap">
            <component :is="link.icon" :size="22" :stroke-width="1.5" aria-hidden="true" />
          </span>
          <div class="ql-text">
            <h3 class="ql-title">{{ link.title }}</h3>
            <p class="ql-desc">{{ link.description }}</p>
          </div>
          <ArrowRight class="ql-arrow" :size="16" :stroke-width="2" aria-hidden="true" />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { BookOpen, BarChart3, Brain, LineChart, Code2, MessageSquare, ArrowRight } from 'lucide-vue-next';

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
    href: 'https://discourse.oncampus.in/',
    external: true,
  },
];
</script>

<style scoped>
.ql-section {
  padding: 1.25rem 1.5rem 0;
  max-width: 72rem;
  margin: 0 auto;
}

.ql-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.ql-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.03);
  text-decoration: none;
  transition: border-color 0.2s, background 0.2s;
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
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
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
  transition: opacity 0.2s, color 0.2s;
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
</style>
