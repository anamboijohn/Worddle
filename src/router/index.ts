import { createRouter, createWebHistory } from 'vue-router'
import WordleBoard from '@/components/WordleBoard.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WordleBoard
    }
  ]
})

export default router
