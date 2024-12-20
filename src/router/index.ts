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
      path: '/notfound',
      name: 'notfound',
        // @ts-ignore’
      component: (): Promise<any> => import('@/components/NotFoundView.vue'),
    },
  ],
})

export default router
