<template>
  <section class="hero card hero-minimal">
    <div class="badge">🔥 2026 全网最缺德测试</div>

    <div class="hero-title-group">
      <p class="hero-old"><s>MBTI</s>已经过时了</p>
      <p class="hero-welcome">欢迎来到</p>
      <h1 class="hero-brand">SBTI</h1>
    </div>

    <p class="hero-desc">拒绝刻板标签，直击灵魂深处的阴暗面。<br/>你敢面对真实的自己吗？</p>

    <button class="btn-start" @click="handleStart">接受灵魂拷问</button>

    <div class="intro-footer">
      <span class="footer-warn">⚠️ 本测试极具攻击性，玻璃心请火速撤离</span>
      <span class="footer-note">（仅供娱乐，切勿当真）</span>
    </div>

    <div class="weapp-promo">
      <div class="weapp-divider"><span>推荐使用小程序</span></div>
      <img src="/sbti.jpg" alt="SBTI 微信小程序" class="weapp-qr" />
      <div class="weapp-text">
        <span class="weapp-line">微信扫码 · 解锁专属隐藏人格</span>
        <span class="weapp-line">一键分享 · 和好友对比结果</span>
      </div>
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
  min-height: calc(100dvh - 48px);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  padding: 20px 20px 24px;
}

.hero-minimal::after {
  display: none;
}

/* 徽章 */
.badge {
  padding: 5px 14px;
  border-radius: 999px;
  background: var(--soft);
  border: 1px solid var(--line);
  font-size: 12px;
  font-weight: 600;
  color: var(--accent-strong);
}

/* 标题组 */
.hero-title-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-old {
  font-size: clamp(14px, 2.5vw, 18px);
  color: var(--muted);
  letter-spacing: 0.04em;
}

.hero-old s {
  text-decoration: line-through;
  text-decoration-thickness: 2px;
  text-decoration-color: var(--accent);
}

.hero-welcome {
  font-size: clamp(16px, 3vw, 20px);
  color: var(--text);
  font-weight: 500;
  margin-top: 2px;
}

.hero-brand {
  margin-top: 2px;
  font-size: clamp(52px, 11vw, 82px);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--accent-strong);
  text-shadow: 0 4px 24px rgba(77, 106, 83, 0.12);
}

/* 描述 */
.hero-desc {
  font-size: 14px;
  line-height: 1.6;
  color: var(--muted);
}

/* 按钮 */
.btn-start {
  padding: 13px 34px;
  border-radius: 999px;
  background: var(--accent-strong);
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.04em;
  box-shadow: 0 8px 28px rgba(77, 106, 83, 0.22);
  border: none;
  cursor: pointer;
  transition: transform 0.16s ease, box-shadow 0.16s ease;
}

.btn-start:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 36px rgba(77, 106, 83, 0.3);
}

/* 警告 */
.intro-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.footer-warn {
  font-size: 13px;
  font-weight: 600;
  color: var(--accent-strong);
}

.footer-note {
  font-size: 12px;
  color: var(--muted);
}

/* 小程序引流 */
.weapp-promo {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 300px;
}

.weapp-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  margin-bottom: 14px;
}

.weapp-divider::before,
.weapp-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--line);
}

.weapp-divider span {
  color: var(--accent-strong);
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.weapp-qr {
  width: 152px;
  height: 152px;
  border-radius: 16px;
  border: 1.5px solid var(--line);
  background: #fff;
  object-fit: contain;
}

.weapp-text {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.weapp-line {
  font-size: 13px;
  color: var(--accent-strong);
  font-weight: 600;
  letter-spacing: 0.02em;
}

.weapp-line:last-child {
  font-size: 12px;
  color: var(--muted);
  font-weight: 400;
}

@media (max-width: 600px) {
  .hero-minimal {
    min-height: calc(100dvh - 28px);
    padding: 14px 16px 18px;
  }

  .hero-brand {
    font-size: clamp(44px, 13vw, 66px);
  }

  .hero-desc {
    font-size: 13px;
  }

  .btn-start {
    padding: 12px 30px;
    font-size: 15px;
  }

  .footer-warn {
    font-size: 12px;
  }

  .weapp-qr {
    width: 136px;
    height: 136px;
  }
}
</style>
