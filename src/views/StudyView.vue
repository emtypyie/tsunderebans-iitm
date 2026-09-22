<template>
  <div>
    <!--
      Study Corner, in priority order.

      The resource browser comes first and immediately: a guided stepper that
      walks Branch → Level → Subject → Resources, with search folded into the
      subject step. Everything below it is secondary — a shelf of external
      tools and two forms — and the two page tones alternate one per chapter
      so the reader can feel where one ends and the next begins.

      Tone rhythm: Browser A · Nook A · Tools A · Contribute B.
    -->
    <h1 class="study-heading">Study<span class="tg">Corner</span></h1>

    <StudyQuickLinks />

    <ResourceBrowser />

    <StudyNook />

    <StudentTools />

    <ContributeCards />
  </div>
</template>

<script setup>
import { useScrollReveal } from '../composables/useAnimations.js';
import StudyQuickLinks from '../components/study/StudyQuickLinks.vue';
import ResourceBrowser from '../components/study/ResourceBrowser.vue';
import StudyNook from '../components/study/StudyNook.vue';
import StudentTools from '../components/study/StudentTools.vue';
import ContributeCards from '../components/study/ContributeCards.vue';

useScrollReveal();
</script>

<style scoped>
.study-heading {
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  font-weight: 700;
  color: #fff;
  padding: 2.5rem 1.5rem 0;
  max-width: 72rem;
  margin: 0 auto;
}

.study-heading .tg {
  color: var(--accent);
}
</style>
