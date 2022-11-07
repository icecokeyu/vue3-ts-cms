import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const login = () => import('@/views/login/Login.vue')
const Home = () => import('@/views/main/Home.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/home',
    component: Home
  }
]

const router = createRouter({
  routes: routes,
  history: createWebHistory()
})

export default router
