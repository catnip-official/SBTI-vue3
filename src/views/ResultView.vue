<template>
  <div v-if="store.result.value" class="result-wrap card">
    <div class="result-layout">
      <!-- 顶部：海报 + 类型 -->
      <div class="result-top">
        <div class="poster-box" :class="{ 'no-image': !typeImage }">
          <img
            v-if="typeImage"
            :src="typeImage"
            :alt="`${finalType.code}（${finalType.cn}）`"
            class="poster-image"
          />
          <div class="poster-caption">{{ finalType.intro }}</div>
        </div>

        <div class="type-box">
          <div class="type-kicker">{{ store.result.value.modeKicker }}</div>
          <div class="type-name">{{ finalType.code }}（{{ finalType.cn }}）</div>
          <div class="match">{{ store.result.value.badge }}</div>
          <div class="type-subname">{{ store.result.value.sub }}</div>
        </div>
      </div>

      <!-- 人格解读 -->
      <div class="analysis-box">
        <h3>该人格的简单解读</h3>
        <p>{{ finalType.desc }}</p>
      </div>

      <!-- 十五维度评分 -->
      <div class="dim-box">
        <h3>十五维度评分</h3>
        <div class="dim-list">
          <div v-for="dim in dimensions" :key="dim.key" class="dim-item">
            <div class="dim-item-top">
              <div class="dim-item-name">{{ dim.name }}</div>
              <div class="dim-item-score">{{ dim.level }} / {{ dim.score }}分</div>
            </div>
            <p>{{ dim.explanation }}</p>
          </div>
        </div>
      </div>

      <!-- 友情提示 -->
      <div class="note-box">
        <h3>友情提示</h3>
        <p>{{ funNote }}</p>
      </div>

      <!-- 声明 -->
      <details class="author-box">
        <summary>声明</summary>
        <div class="author-content">
          <p>本测试仅供娱乐，无法很好的平衡娱乐和专业性，因此对于一些人格的阐释较为模糊或完全不准（如屌丝可能并非真的屌丝），如有冒犯非常抱歉！</p>
          <p>好玩为主，请勿用于盈利。</p>
        </div>
      </details>
    </div>

    <!-- 小程序引导 -->
    <div class="weapp-banner">
      <img src="/sbti.jpg" alt="SBTI 微信小程序" class="weapp-banner-qr" />
      <div class="weapp-banner-text">
        <span class="weapp-banner-title">用小程序体验更佳</span>
        <span class="weapp-banner-desc">微信扫码，随时重测、分享结果给好友</span>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="result-actions">
      <div class="btn-row">
        <button class="btn-secondary" @click="handleRestart">重新测试</button>
        <button class="btn-primary" @click="goHome">回到首页</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { createTestStore } from '../store'

const router = useRouter()
const store = createTestStore()

if (!store.result.value) {
  router.replace('/')
}

const finalType = computed(() => store.result.value?.finalType || {})

const typeImage = computed(() =>
  store.getTypeImage(finalType.value.code)
)

const dimensions = computed(() => store.getDimensions())

const funNote = computed(() =>
  store.result.value?.special
    ? '本测试仅供娱乐。隐藏人格和傻乐兜底都属于作者故意埋的损招，请勿把它当成医学、心理学、相学、命理学或灵异学依据。'
    : '本测试仅供娱乐，别拿它当诊断、面试、相亲、分手、招魂、算命或人生判决书。你可以笑，但别太当真。'
)

function handleRestart() {
  store.startTest(false)
  router.push('/test')
}

function goHome() {
  router.push('/')
}
</script>

<style scoped>
.result-wrap {
  margin-top: 22px;
  padding: 22px;
}

.result-layout {
  display: grid;
  gap: 18px;
}

.result-top {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 18px;
  align-items: stretch;
}

/* 海报 */
.poster-box {
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: 280px;
  overflow: hidden;
  position: relative;
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 18px;
  background:
    radial-gradient(circle at top right, rgba(127, 165, 134, 0.16), rgba(127, 165, 134, 0) 40%),
    linear-gradient(180deg, #ffffff, #f7fbf8);
}

.poster-box::after {
  content: '';
  position: absolute;
  right: -46px;
  bottom: -46px;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: linear-gradient(180deg, rgba(127, 165, 134, 0.12), rgba(127, 165, 134, 0.01));
  pointer-events: none;
}

.poster-image {
  width: 100%;
  min-height: 220px;
  max-height: 460px;
  object-fit: contain;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.75);
  position: relative;
  z-index: 1;
}

.poster-box.no-image .poster-image {
  display: none;
}

.poster-caption {
  margin-top: 14px;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.8;
  position: relative;
  z-index: 1;
}

/* 类型 */
.type-box {
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 18px;
  background: linear-gradient(180deg, #ffffff, #fbfdfb);
}

.type-kicker {
  font-size: 12px;
  color: var(--accent-strong);
  margin-bottom: 8px;
  letter-spacing: 0.06em;
}

.type-name {
  font-size: clamp(30px, 5vw, 48px);
  line-height: 1.08;
  letter-spacing: -0.03em;
  font-weight: 700;
}

.type-subname {
  margin-top: 10px;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.8;
}

.match {
  margin-top: 18px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  padding: 10px 14px;
  background: var(--soft);
  border: 1px solid var(--line);
  color: var(--accent-strong);
  font-weight: 700;
  font-size: 14px;
  line-height: 1.4;
}

/* 解读 */
.analysis-box,
.dim-box,
.note-box {
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 18px;
  background: linear-gradient(180deg, #ffffff, #fbfdfb);
}

.analysis-box h3,
.dim-box h3,
.note-box h3 {
  font-size: 16px;
  margin: 0 0 12px;
}

.analysis-box p {
  margin: 0;
  color: #304034;
  font-size: 15px;
  line-height: 1.9;
  white-space: pre-wrap;
}

/* 维度 */
.dim-list {
  display: grid;
  gap: 12px;
}

.dim-item {
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 14px;
  background: #fff;
}

.dim-item-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.dim-item-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
}

.dim-item-score {
  color: var(--accent-strong);
  font-weight: 800;
  font-size: 14px;
  white-space: nowrap;
}

.dim-item p {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.8;
}

/* 提示 */
.note-box p {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.8;
}

/* 作者 */
.author-box {
  border: 1px solid var(--line);
  border-radius: 18px;
  background: linear-gradient(180deg, #ffffff, #fbfdfb);
  overflow: hidden;
}

.author-box summary {
  list-style: none;
  cursor: pointer;
  padding: 18px;
  font-size: 16px;
  font-weight: 700;
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.author-box summary::-webkit-details-marker {
  display: none;
}

.author-box summary::after {
  content: '展开';
  font-size: 12px;
  font-weight: 700;
  color: var(--accent-strong);
  border: 1px solid var(--line);
  background: var(--soft);
  padding: 6px 10px;
  border-radius: 999px;
  flex-shrink: 0;
}

.author-box[open] summary::after {
  content: '收起';
}

.author-content {
  border-top: 1px solid var(--line);
  padding: 0 18px 18px;
}

.author-content p {
  margin: 14px 0 0;
  color: #304034;
  font-size: 14px;
  line-height: 1.9;
}

/* 操作 */
.result-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 22px;
}

.btn-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

/* 小程序引导 */
.weapp-banner {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 22px;
  padding: 18px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: linear-gradient(135deg, var(--soft) 0%, #ffffff 100%);
}

.weapp-banner-qr {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  border: 1.5px solid var(--line);
  background: #fff;
  object-fit: contain;
  flex-shrink: 0;
}

.weapp-banner-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.weapp-banner-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--accent-strong);
}

.weapp-banner-desc {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.6;
}

@media (max-width: 860px) {
  .result-top {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .result-wrap {
    padding: 16px;
  }

  .weapp-banner-qr {
    width: 68px;
    height: 68px;
  }
}
</style>
