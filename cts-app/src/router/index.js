import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    // { path: '', redirect: '/home' },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/pages/home/home.vue')
    },
    {
      path: '/home/detail',
      name: 'movieDetail',
      component: () => import('@/pages/home/movieDetail.vue')
    }
  ]
})

export default router