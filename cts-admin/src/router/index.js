import { createRouter, createWebHashHistory } from 'vue-router'
import { ElNotification } from 'element-plus'

const Login = () => import('@/pages/Login.vue')
const Layout = () => import('@/layouts/Layout.vue')
const MovieList = () => import('@/pages/MovieList.vue')
const MovieDetail = () => import('@/pages/MovieDetail.vue')

const routes = [
  { path: '/', redirect: '/movies' },
  { path: '/login', name: 'login', component: Login },
  {
    path: '/',
    component: Layout,
    children : [
      { path: 'movies', name: 'movieList', component: MovieList },
      { path: 'movies/detail', name: 'movieDetail', component: MovieDetail }
    ] 
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.name !== 'login' && !token) {
    next({ name: 'login' })
    ElNotification({
      title: '用户当前未登录, 已自动跳转到登录页面',
      type: 'error'
    })
  } else {
    next()
  }
})

export default router