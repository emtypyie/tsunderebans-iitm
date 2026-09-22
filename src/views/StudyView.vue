<template>
  <div>
    <!--
      Study Corner, in priority order.

      The resource browser comes first and immediately: a guided stepper that
      walks Branch → Level → Subject → Resources, with search folded into the
      subject step. Everything below it is secondary — a shelf of external
      tools and two forms — and the two page tones alternate one per chapter
      so the reader can feel where one ends and the next begins.

      Tone rhythm: Hero · Browser A · Nook A · Tools A · Contribute B.
    -->
    <PageHero
      class="study-hero"
      compact
      bg-image="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1920&q=80&auto=format&fit=crop"
      breadcrumb-title="Study Corner"
      title="Study"
      accent-title="Corner"
      subtitle="Comprehensive academic resources for Foundation, Diploma and BS level students —
        lecture material, contributor notes and past papers, all in one place."
    />

    <ResourceBrowser />

    <StudyNook />

    <StudentTools />

    <ContributeCards />
  </div>
</template>

<script setup>
import { useScrollReveal } from '../composables/useAnimations.js';
import PageHero from '../components/PageHero.vue';
import ResourceBrowser from '../components/study/ResourceBrowser.vue';
import StudyNook from '../components/study/StudyNook.vue';
import StudentTools from '../components/study/StudentTools.vue';
import ContributeCards from '../components/study/ContributeCards.vue';

useScrollReveal();
</script>

<style scoped>
/* The stepper below is the real content — hero is a signpost, not a billboard.
   Trim hard so "Choose your branch" is reachable in one glance. */
.study-hero.page-hero--compact {
  padding: 3.5rem 0 1.25rem;
}

.study-hero.page-hero--compact h1 {
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  margin-bottom: 0.35rem;
}

.study-hero.page-hero--compact p {
  font-size: 0.82rem;
  line-height: 1.6;
  margin-bottom: 0;
  max-width: 38rem;
}

.study-hero.page-hero--compact .breadcrumb-nav {
  margin-bottom: 0.6rem;
}

@media (max-width: 768px) {
  .study-hero.page-hero--compact {
    padding: 3rem 0 1rem;
  }
}
</style>
