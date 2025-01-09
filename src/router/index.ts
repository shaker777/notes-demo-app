import { createRouter, createWebHashHistory } from 'vue-router'
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
                path: 'note/:id/:title(\\d+)',
                name: 'note_detail',
                component: NoteView
            },
            {
                path: '/',
                name: 'filtered',
                component: MainView
            },
            {
                path: '/',
                name: 'not_found',
                // @ts-ignore’
                component: (): Promise<any> => import('@/components/NotFoundView.vue')
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'any',
        component: MainView
        // @ts-ignore’
        // component: (): Promise<any> => import('@/components/NotFoundView.vue'),
    },
  ],
    linkActiveClass: '',
    linkExactActiveClass: '',
})

export default router
