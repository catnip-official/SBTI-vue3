<template>
  <section class="hero card hero-minimal">
    <h1>MBTI已经过时，SBTI来了。</h1>
    <div class="hero-actions hero-actions-single">
      <button class="btn-primary" @click="handleStart">开始测试</button>
    </div>
    <div class="intro-footer">
      <span>仅供娱乐，请勿当真</span>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { createTestStore } from '../store'

const router = useRouter()
const store = createTestStore()

function handleStart() {
  store.startTest(false)
  router.push('/test')
}
</script>

<style scoped>
.hero-minimal {
  min-height: 48vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 42px 20px;
}

.hero-minimal::after {
  display: none;
}

.hero-minimal h1 {
  max-width: none;
  margin: 0;
  font-size: clamp(28px, 5vw, 52px);
  line-height: 1.08;
  letter-spacing: -0.03em;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 22px;
}

.hero-actions-single {
  justify-content: center;
  margin-top: 28px;
}

.intro-footer {
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: var(--muted);
  font-size: 14px;
}

.intro-footer a {
  color: var(--accent-strong);
  text-decoration: none;
}

.intro-footer a:hover {
  text-decoration: underline;
}
</style>
