import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/components/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/components/HelloWorld.vue'),
    },
  ],
})

export default router
