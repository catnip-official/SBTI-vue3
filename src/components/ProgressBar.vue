<template>
  <div class="topbar">
    <div class="progress">
      <span :style="{ width: percent + '%' }"></span>
    </div>
    <div class="progress-text">{{ done }} / {{ total }}</div>
  </div>
</template>

<script setup>
defineProps({
  percent: { type: Number, required: true },
  done: { type: Number, required: true },
  total: { type: Number, required: true }
})
</script>

<style scoped>
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 18px;
  flex-wrap: wrap;
}

.progress {
  flex: 1;
  min-width: 240px;
  height: 10px;
  background: #edf3ee;
  border-radius: 999px;
  overflow: hidden;
  position: relative;
}

.progress > span {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, #97b59c, #5b7a62);
  border-radius: inherit;
  transition: width .22s ease;
}

.progress-text {
  color: var(--muted);
  font-size: 13px;
  white-space: nowrap;
}
</style>
