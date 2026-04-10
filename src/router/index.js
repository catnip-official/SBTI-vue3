import { createRouter, createWebHistory } from 'vue-router'
import IntroView from '../views/IntroView.vue'
import TestView from '../views/TestView.vue'
import ResultView from '../views/ResultView.vue'

const routes = [
  { path: '/', name: 'intro', component: IntroView },
  { path: '/test', name: 'test', component: TestView },
  { path: '/result', name: 'result', component: ResultView }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }
})

export default router
