<template>
  <div class="shell">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
.shell {
  max-width: 980px;
  margin: 0 auto;
  padding: 24px 16px 56px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 600px) {
  .shell {
    padding: 14px 12px 42px;
  }
}
</style>
