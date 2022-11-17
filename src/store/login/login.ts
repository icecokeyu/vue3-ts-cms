import { Module } from 'vuex'
import { IRootState } from '../type'
import { ILoginState } from './type'
import {
  requestUserInfo,
  requestUserMenus,
  userLogin
} from '@/service/login/login'
import LocalCache from '@/utils/localCache'
import router from '@/router'
import { mapMenus } from '@/utils/map-menus'

interface IAccount {
  name: string
  password: string
}

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  getters: {},
  mutations: {
    saveToken(state, token) {
      state.token = token
    },
    saveUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    saveMenu(state, menus) {
      state.userMenus = menus

      // 这里拿到不同用户对应的菜单，可以处理都拿到对应的路由，再动态添加路由
      const routes = mapMenus(menus)
      console.log(routes)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    }
  },
  actions: {
    async getLoginAction({ commit }, account: IAccount) {
      // 执行登录逻辑
      // 1.发起登录请求，拿到id，token并保存, token要保存在localStorage中
      const loginResult = await userLogin(account)
      const { id, token } = loginResult.data
      LocalCache.saveCache('token', token)
      commit('saveToken', token)
      // 2.拿到userInfo并保存
      const userInfoResult = await requestUserInfo(id)
      const userInfo = userInfoResult.data
      LocalCache.saveCache('userInfo', userInfo)
      commit('saveUserInfo', userInfo)

      // 3.拿到userMenus并保存
      const userMenusResult = await requestUserMenus(userInfo.role.id)
      console.log(userMenusResult)
      const userMenus = userMenusResult.data
      LocalCache.saveCache('userMenus', userMenus)
      commit('saveMenu', userMenus)

      // 2.跳转到主页
      router.push('/main')
    },
    getLocalSaveAction({ commit }) {
      const token = LocalCache.getCache('token')
      if (token) commit('saveToken', token)

      const userInfo = LocalCache.getCache('userInfo')
      if (userInfo) commit('saveUserInfo', userInfo)

      const userMenus = LocalCache.getCache('userMenus')
      if (userMenus) commit('saveMenu', userMenus)
    }
  }
}

export default loginModule
