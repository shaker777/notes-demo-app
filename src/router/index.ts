import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/components/MainView.vue'
import NoteView from "@/components/NoteView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView,
        children: [
            {
                path: 'note/:title(\\d+)',
                name: 'note_detail',
                component: NoteView
            },
            {
                path: '/',
                name: 'filtered',
                component: MainView
            }
        ]
    },
    {
      path: '/notfound',
      name: 'notfound',
        // @ts-ignore’
      component: (): Promise<any> => import('@/components/NotFoundView.vue'),
    },
  ],
    linkActiveClass: '',
    linkExactActiveClass: '',
})

export default router
