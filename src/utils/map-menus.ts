import { RouteRecordRaw } from 'vue-router'
import { breadType } from '@/base-ui/breadcrumb'

let firstMenu: any = null

export function mapMenus(menus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // 1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  // require.context 是webpack加载文件的函数，返回一个对象
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  // 2.根据菜单获取需要添加的routes
  // userMenus:
  // type === 1 -> children -> type === 1
  // type === 2 -> url -> route
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (!firstMenu) {
          firstMenu = menu
        }
        if (route) routes.push(route)
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(menus)
  return routes
}

export function pathMapMenu(menu: any[], path: string): any {
  for (const item of menu) {
    if (item.type === 1) {
      const findMenu = pathMapMenu(item.children ?? [], path)
      if (findMenu) {
        return findMenu
      }
    } else if (item.type === 2 && item.url === path) {
      return item
    }
  }
}

export function pathMapBreadcrumb(menu: any[], path: string): breadType[] {
  const breadConfig: breadType[] = []
  for (const item of menu) {
    if (item.type === 1) {
      const findMenu = pathMapMenu(item.children ?? [], path)
      if (findMenu) {
        breadConfig.push({ path: item.url, title: item.name })
        breadConfig.push({ path: findMenu.url, title: findMenu.name })
        // return findMenu
      }
    } else if (item.type === 2 && item.url === path) {
      return item
    }
  }
  return breadConfig
}

export { firstMenu }
