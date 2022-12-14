import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import LocalCache from '@/utils/localCache'
import { firstMenu } from '@/utils/map-menus'

const Login = () => import('@/views/login/login.vue')
const Main = () => import('@/views/main/main.vue')
const NotFound = () => import('@/views/not-found/not-found.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/main',
    name: 'main',
    component: Main
  },
  {
    path: '/:pathMatch(.*)',
    name: 'not-found',
    component: NotFound
  }
]

const router = createRouter({
  routes: routes,
  history: createWebHashHistory()
})

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = LocalCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
  if (to.path === '/main') {
    return firstMenu.url
  }
})

export default router
