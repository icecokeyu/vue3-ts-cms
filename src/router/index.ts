import { createRouter, createWebHashHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'

const login = () => import('views/Login.vue')
const Home = () => import('views/Home.vue')

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
  history: createWebHashHistory()
})

export default router
