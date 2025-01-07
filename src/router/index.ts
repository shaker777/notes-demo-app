import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import MainView from '@/components/MainView.vue'
import NoteView from "@/components/NoteView.vue";

const router = createRouter({
  history: createWebHashHistory('/notes-demo-app'),
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
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        // @ts-ignore’
      component: (): Promise<any> => import('@/components/NotFoundView.vue'),
    },
  ],
    linkActiveClass: '',
    linkExactActiveClass: '',
})

export default router
