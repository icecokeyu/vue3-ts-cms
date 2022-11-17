import { BASE_URL, TIME_OUT } from './request/config'
import TYRequest from './request/index'
import LocalCache from '@/utils/localCache'

export const tyRequest = new TYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = LocalCache.getCache('token')
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
        // config.headers.Authorization = `Bear ${token}`
      }
      // console.log('实例对象：请求成功的拦截器')
      return config
    },
    requestInterceptorCatch: (err) => {
      // console.log('实例对象：请求失败的拦截器')
      return err
    },
    responseInterceptor: (res) => {
      // console.log('实例对象：响应成功的拦截器')
      return res
    },
    responseInterceptorCatch: (err) => {
      // console.log('实例对象：响应失败的拦截器')
      return err
    }
  }
})
