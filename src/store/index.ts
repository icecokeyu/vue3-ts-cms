import { createStore, Store, useStore as useVuexStore } from 'vuex'
import type { IRootState, IStoreType } from './type'

import login from './login/login'

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
    login
  }
})

export function refreshSaveLocal() {
  store.dispatch('login/getLocalSaveAction')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
