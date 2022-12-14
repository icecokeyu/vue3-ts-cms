import { IRootState } from '../../type'
import { ISystemState } from './type'
import { Module } from 'vuex'
import {
  createPageData,
  deletePageData,
  getPageDataList,
  updatePageData
} from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
      departmentList: [],
      departmentCount: 0
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
          case 'goods':
            return state.goodsList
          case 'menu':
            return state.menuList
          case 'department':
            return state.departmentList
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
          case 'goods':
            return state.goodsCount
          case 'menu':
            return state.menuCount
          case 'department':
            return state.departmentCount
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
    },
    changeGoodsList(state, list) {
      state.goodsList = list
    },
    changeGoodsCount(state, totalCount) {
      state.goodsCount = totalCount
    },
    changeMenuList(state, list) {
      state.menuList = list
    },
    changeMenuCount(state, totalCount) {
      state.menuCount = totalCount
    },
    changeDepartmentList(state, list) {
      state.departmentList = list
    },
    changeDepartmentCount(state, totalCount) {
      state.departmentCount = totalCount
    }
  },
  actions: {
    async getPageDataAction({ commit }, payload) {
      let pageName: any = payload.pageName
      const pageUrl = `/${pageName}/list`
      const userResult = await getPageDataList(pageUrl, payload.queryInfo)
      const { list, totalCount } = userResult.data

      // 1.拼接转换成大写或者使用switch判断如果为user、role执行不同的代码
      pageName = pageName.replace(pageName[0], pageName[0].toUpperCase())
      // commit('changeUsersList', list)
      commit(`change${pageName}List`, list)
      commit(`change${pageName}Count`, totalCount)
    },
    async deletePageDataAction({ dispatch }, payload) {
      // 1.发送删除数据的网络请求
      const { pageName, id } = payload
      const url = `/${pageName}/${id}`
      await deletePageData(url)
      // 2.重新dispatch getPageDataAction更新数据
      dispatch('getPageDataAction', {
        pageName,
        queryInfo: {
          size: 10,
          offset: 0
        }
      })
    },
    async createPageDataAction({ dispatch }, payload) {
      const { pageName } = payload
      const url = `/${pageName}`
      await createPageData(url, payload.createInfo)

      dispatch('getPageDataAction', {
        pageName,
        queryInfo: {
          size: 10,
          offset: 0
        }
      })
    },
    async updatePageDataAction({ dispatch }, payload) {
      const { pageName, id, updateInfo } = payload
      const url = `/${pageName}/${id}`
      await updatePageData(url, updateInfo)

      dispatch('getPageDataAction', {
        pageName,
        queryInfo: {
          size: 10,
          offset: 0
        }
      })
    }
  }
}

export default systemModule
