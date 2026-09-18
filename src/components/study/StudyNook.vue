<template>
  <!-- Decorative band between the resource stepper and the doubts board. The
       two sections are both near-black, so instead of a hard tone swap this
       nook carries a small line-illustration that bridges the colours: an
       arched window with a moon, a reading lamp, an open book, a shelf of
       books and a mug of tea — hand-drawn gold strokes on the dark field. -->
  <section class="nook">
    <svg
      class="nook-art"
      viewBox="0 0 720 250"
      role="presentation"
      focusable="false"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="nookGlow" cx="50%" cy="46%" r="55%">
          <stop offset="0%" stop-color="#d5a63a" stop-opacity="0.10" />
          <stop offset="100%" stop-color="#d5a63a" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- Warm pool behind the whole scene -->
      <rect x="0" y="0" width="720" height="250" fill="url(#nookGlow)" />

      <!-- Arched window with a crescent moon and a couple of stars -->
      <g class="nook-line" stroke="#d5a63a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
        <path d="M 132 96 V 172 H 268 V 96 A 68 68 0 0 1 132 96 Z" fill="rgba(10, 32, 25, 0.55)" />
        <path d="M 200 96 V 172" stroke-width="1.4" opacity="0.4" />
        <path d="M 132 134 H 268" stroke-width="1.4" opacity="0.4" />
        <path
          d="M 176 40 L 177.6 44.4 L 182 46 L 177.6 47.6 L 176 52 L 174.4 47.6 L 170 46 L 174.4 44.4 Z"
          fill="#e9c873"
          stroke="none"
        />
        <circle cx="156" cy="58" r="1.6" fill="#d5a63a" stroke="none" />
        <circle cx="248" cy="44" r="1.6" fill="#d5a63a" stroke="none" />
      </g>

      <!-- Crescent moon (two circles, evenodd carves the bite) -->
      <path
        d="M 232 62 A 16 16 0 1 0 200 62 A 16 16 0 1 0 232 62 Z M 234.5 66 A 12.5 12.5 0 1 0 209.5 66 A 12.5 12.5 0 1 0 234.5 66 Z"
        fill="#d5a63a"
        fill-rule="evenodd"
      />

      <!-- Desk -->
      <ellipse cx="360" cy="197" rx="272" ry="4" fill="rgba(0, 0, 0, 0.35)" />
      <g class="nook-line" stroke="#d5a63a" stroke-width="2" stroke-linecap="round" fill="none">
        <path d="M 84 196 H 636" />
        <path d="M 210 196 V 232" stroke-width="1.5" opacity="0.5" />
        <path d="M 510 196 V 232" stroke-width="1.5" opacity="0.5" />
      </g>

      <!-- Reading lamp leaning over the book -->
      <g class="nook-line" stroke="#d5a63a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
        <ellipse cx="140" cy="190" rx="22" ry="6" />
        <path d="M 140 190 V 138" />
        <path d="M 140 142 C 120 140 112 128 114 114" />
        <path
          d="M 100 104 Q 114 92 128 104 L 128 108 Q 114 100 100 108 Z"
          fill="rgba(213, 166, 58, 0.12)"
        />
        <circle cx="114" cy="103" r="2.5" fill="#e9c873" stroke="none" />
        <!-- lamp light reaching the desk -->
        <g opacity="0.55" stroke-width="1.6">
          <path d="M 108 122 L 104 140" class="nook-glow" />
          <path d="M 118 126 L 116 144" class="nook-glow" />
          <path d="M 128 122 L 128 140" class="nook-glow" />
        </g>
      </g>

      <!-- Open book, centre stage -->
      <g class="nook-line" stroke="#d5a63a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
        <path d="M 356 188 C 346 176 326 173 312 180 L 318 132 C 330 128 348 131 356 142 Z" fill="rgba(122, 158, 126, 0.08)" />
        <path d="M 356 188 C 366 176 386 173 400 180 L 394 132 C 382 128 364 131 356 142 Z" fill="rgba(122, 158, 126, 0.08)" />
        <path d="M 356 142 V 188" />
        <g opacity="0.6" stroke-width="1.5" stroke="#e9c873">
          <path d="M 328 156 H 342" />
          <path d="M 328 164 H 340" />
          <path d="M 328 172 H 338" />
          <path d="M 370 156 H 384" />
          <path d="M 370 164 H 382" />
        </g>
        <path d="M 388 134 C 392 140 390 146 386 150" stroke="#e9c873" stroke-width="1.6" />
      </g>

      <!-- A small stack of books -->
      <g class="nook-line" stroke="#d5a63a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
        <rect x="424" y="172" width="64" height="16" rx="2" />
        <path d="M 430 176 H 482" stroke-width="1.4" opacity="0.5" />
        <rect x="430" y="154" width="60" height="18" rx="2" fill="rgba(122, 158, 126, 0.14)" />
        <path d="M 437 160 H 486" stroke-width="1.4" opacity="0.5" />
        <rect x="434" y="138" width="58" height="16" rx="2" />
        <path d="M 441 144 H 488" stroke-width="1.4" opacity="0.5" />
      </g>

      <!-- Mug of tea with steam -->
      <g class="nook-line" stroke="#d5a63a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
        <path d="M 544 152 H 584 L 578 188 H 550 L 544 152 Z" fill="rgba(122, 158, 126, 0.1)" />
        <path d="M 584 160 C 602 160 602 182 580 182" />
        <g opacity="0.7" stroke-width="1.6" stroke="#e9c873">
          <path d="M 568 144 C 564 138 570 132 566 126" fill="none" />
          <path d="M 576 146 C 572 140 578 134 574 128" fill="none" />
        </g>
      </g>

      <!-- Dust motes drifting in the lamp glow -->
      <g fill="#e9c873" opacity="0.7">
        <circle cx="300" cy="118" r="1.3" />
        <circle cx="420" cy="96" r="1.3" />
        <circle cx="336" cy="86" r="1" />
        <circle cx="522" cy="126" r="1.3" />
        <circle cx="258" cy="150" r="1" />
      </g>
    </svg>

    <p class="nook-caption">Every course has its corner.</p>
  </section>
</template>

<script setup></script>

<style scoped>
.nook {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.1rem;
  padding: 0.25rem 0 4.5rem;
  background: var(--color-bg-black);
}

.nook-art {
  width: min(680px, 100%);
  height: auto;
  display: block;
}

.nook-caption {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 0.9rem;
  letter-spacing: 0.02em;
  color: var(--text3);
  margin: 0;
}

.nook-glow {
  animation: nook-pulse 4s ease-in-out infinite;
}

@keyframes nook-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.45;
  }
}

@media (prefers-reduced-motion: reduce) {
  .nook-glow {
    animation: none;
  }
}

@media (max-width: 768px) {
  .nook {
    padding-bottom: 3rem;
  }
}
</style>