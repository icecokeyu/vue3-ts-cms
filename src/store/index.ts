import { createStore, Store, useStore as useVuexStore } from 'vuex'
import type { IRootState, IStoreType } from './type'
import { getPageDataList } from '@/service/main/system/system'
import { requestAllMenus } from '@/service/login/login'

import login from './login/login'
import system from './main/system/system'
import dashboard from './main/dashboard/dashboard'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'lty',
      age: 18,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  getters: {},
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // 1.请求部门、角色、完整菜单的数据
      const departmentResult = await getPageDataList('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageDataList('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data
      const menuResult = await requestAllMenus('/menu/list')
      const { list: menuList } = menuResult.data

      // 2.保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})

export function refreshSaveLocal() {
  store.dispatch('login/getLocalSaveAction')
  // store.dispatch('getInitialDataAction')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
