import { IRootState } from '../../type'
import { ISystemState } from './type'
import { Module } from 'vuex'
import { getPageDataList } from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        // return (state as any)[`${pageName}List`]
        switch (pageName) {
          case 'users':
            return state.usersList
          case 'role':
            return state.roleList
        }
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'users':
            return state.usersCount
          case 'role':
            return state.roleCount
        }
      }
    }
  },
  mutations: {
    changeUsersList(state, list) {
      state.usersList = list
    },
    changeUsersCount(state, totalCount) {
      state.usersCount = totalCount
    },
    changeRoleList(state, list) {
      state.roleList = list
    },
    changeRoleCount(state, totalCount) {
      state.roleCount = totalCount
    }
  },
  actions: {
    async getPageDataAction({ commit }, payload) {
      let pageName: any = payload.pageName
      const pageUrl = `/${pageName}/list`
      const userResult = await getPageDataList(pageUrl, payload.pageInfo)
      const { list, totalCount } = userResult.data

      // 1.拼接转换成大写或者使用switch判断如果为user、role执行不同的代码
      pageName = pageName.replace(pageName[0], pageName[0].toUpperCase())
      commit('changeUsersList', list)
      commit(`change${pageName}List`, list)
      commit(`change${pageName}Count`, totalCount)
    }
  }
}

export default systemModule
