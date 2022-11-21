import { createStore, Store, useStore as useVuexStore } from 'vuex'
import type { IRootState, IStoreType } from './type'

import login from './login/login'
import system from './main/system/system'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'lty',
      age: 18
    }
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    login,
    system
  }
})

export function refreshSaveLocal() {
  store.dispatch('login/getLocalSaveAction')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
