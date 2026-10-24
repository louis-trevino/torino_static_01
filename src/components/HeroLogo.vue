<script setup>
import { ref, computed, onMounted } from 'vue'
import { logoNodes } from '../content'

// Geometry of the Torino mark, centred on (0,0). Node i sits at -90° + 60°·i (clockwise from the top).
const R_NODE = 175
const R_CORE = 103
const R_SPOKE_END = 98

const point = (r, i) => {
  const a = ((-90 + 60 * i) * Math.PI) / 180
  return [+(r * Math.cos(a)).toFixed(2), +(r * Math.sin(a)).toFixed(2)]
}
const polygon = (r) => [0, 1, 2, 3, 4, 5].map((i) => point(r, i).join(',')).join(' ')

const nodes = logoNodes.map((node, i) => {
  const [x, y] = point(R_NODE, i)
  const [sx, sy] = point(R_SPOKE_END, i)
  return { ...node, x, y, sx, sy, accent: i % 2 === 1 }
})

// Hover previews a node; click/tap/keyboard focus selects it (needed on touch screens).
const hovered = ref(null)
const selected = ref(null)
const active = computed(() => hovered.value ?? selected.value)
const current = computed(() => (active.value === null ? null : nodes[active.value]))

const canHover = ref(true)
onMounted(() => (canHover.value = window.matchMedia('(hover: hover)').matches))
</script>

<template>
  <div class="hero-logo">
    <div class="logo-float" :class="{ paused: active !== null }">
      <svg
        viewBox="-200 -200 400 400"
        class="logo-svg"
        role="group"
        aria-label="Torino Consulting Agentic AI capabilities"
        :class="{ 'has-active': active !== null }"
      >
        <defs>
          <linearGradient id="hl-core" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#2563EB" />
            <stop offset=".52" stop-color="#147FD7" />
            <stop offset="1" stop-color="#00B4DB" />
          </linearGradient>
          <filter id="hl-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <polygon class="outline" :points="polygon(R_NODE)" />
        <line
          v-for="(n, i) in nodes"
          :key="`s${i}`"
          class="spoke"
          :class="{ active: active === i }"
          :x1="n.x"
          :y1="n.y"
          :x2="n.sx"
          :y2="n.sy"
        />
        <polygon class="core" :points="polygon(R_CORE)" fill="url(#hl-core)" />

        <g
          v-for="(n, i) in nodes"
          :key="`n${i}`"
          class="node"
          :class="{ active: active === i, accent: n.accent }"
          :transform="`translate(${n.x} ${n.y})`"
          tabindex="0"
          role="button"
          :aria-label="`${n.title}: ${n.text}`"
          :aria-pressed="selected === i"
          @pointerenter="hovered = i"
          @pointerleave="hovered = null"
          @click="selected = i"
          @focus="selected = i"
          @blur="selected = null"
          @keydown.enter.prevent="selected = i"
          @keydown.space.prevent="selected = i"
        >
          <circle class="pulse" r="23" :style="{ animationDelay: `${i * 0.45}s` }" />
          <circle class="dot" r="23" />
          <circle class="hit" r="44" />
        </g>
      </svg>
    </div>

    <div class="node-card" aria-live="polite">
      <Transition name="fade" mode="out-in">
        <div v-if="current" :key="current.title">
          <span class="node-index">0{{ active + 1 }} / 06</span>
          <h2 class="h5 fw-bold mb-1 mt-1">{{ current.title }}</h2>
          <p class="mb-0">{{ current.text }}</p>
        </div>
        <div v-else key="hint" class="hint">
          <span class="node-index">Agentic AI Solutions</span>
          <p class="mb-0 mt-1">
            <i class="bi bi-hand-index me-1" aria-hidden="true"></i>
            {{ canHover ? 'Hover over' : 'Tap' }} a node to explore what our AI agents can do for you.
          </p>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.hero-logo {
  width: 100%;
  max-width: 340px;
  margin: 0 auto;
}

.logo-float {
  max-width: 270px;
  margin: 0 auto;
}

.logo-svg {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.logo-float {
  animation: float 6s ease-in-out infinite;
}

.logo-float.paused {
  animation-play-state: paused;
}

@media (max-width: 767.98px) {
  .logo-float {
    max-width: 240px;
  }
}

@keyframes float {
  50% {
    transform: translateY(-10px);
  }
}

/* Static parts of the mark (light variant for the navy hero) */
.outline {
  fill: none;
  stroke: #e6f0ff;
  stroke-width: 9;
  stroke-linejoin: round;
}

.spoke {
  stroke: #5aa9f5;
  stroke-width: 6;
  transition:
    stroke 0.25s ease,
    stroke-width 0.25s ease;
}

.spoke.active {
  stroke: #fff;
  stroke-width: 9;
}

.core {
  filter: drop-shadow(0 16px 32px rgba(0, 180, 219, 0.3));
}

/* Nodes */
.node {
  cursor: pointer;
  outline: none;
  --node-color: #e6f0ff;
}

.node.accent {
  --node-color: #00b4db;
}

.dot,
.pulse {
  transform-box: fill-box;
  transform-origin: center;
}

.dot {
  fill: var(--node-color);
  transition:
    transform 0.25s ease,
    fill 0.25s ease,
    opacity 0.25s ease;
}

.pulse {
  fill: none;
  stroke: var(--node-color);
  stroke-width: 4;
  animation: pulse 2.7s ease-out infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.85;
  }
  70%,
  100% {
    transform: scale(2.3);
    opacity: 0;
  }
}

.hit {
  fill: transparent;
}

/* Dim the other nodes while one is highlighted */
.has-active .node:not(.active) .dot {
  opacity: 0.55;
}

.node.active .dot {
  fill: #fff;
  transform: scale(1.35);
  filter: url(#hl-glow);
}

.node.active .pulse {
  stroke: #fff;
  animation-duration: 1.4s;
}

.node:focus-visible .dot {
  stroke: #ffd166;
  stroke-width: 5;
}

/* Message card */
.node-card {
  min-height: 7.5rem;
  margin-top: 1rem;
  padding: 0.85rem 1.1rem;
  border-radius: var(--bs-border-radius-lg);
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-left: 4px solid var(--torino-cyan);
  backdrop-filter: blur(6px);
  color: rgba(255, 255, 255, 0.85);
}

.node-card h2 {
  color: #fff;
}

.node-index {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--torino-cyan);
}

.hint p {
  color: rgba(255, 255, 255, 0.7);
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(4px);
}

@media (prefers-reduced-motion: reduce) {
  .logo-float,
  .pulse {
    animation: none;
  }

  .pulse {
    opacity: 0;
  }
}
</style>
