import type { AxiosInstance } from 'axios'
import axios from 'axios'
import { TYRequestConfig, TYRequestInterceptors } from '@/service/request/type'
import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

const DEFAULT_LOADING = true

class TYRequest {
  instance: AxiosInstance
  interceptors?: TYRequestInterceptors
  showLoading: boolean
  loading?: LoadingInstance

  constructor(config: TYRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    // 使用拦截器
    // 1.从config里面取出的拦截器是对应实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 2.添加全局的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('全局的请求成功拦截器')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err) => {
        console.log('全局的请求失败拦截器')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // 要写在return前面，不然就不执行了
        this.loading?.close()
        console.log('全局的响应成功拦截器')
        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败~, 错误信息')
        } else {
          return data
        }
      },
      (err) => {
        this.loading?.close()
        console.log('全局的响应失败拦截器')
        // 例子: 判断不同的HttpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log('404的错误~')
        }

        return err
      }
    )
  }

  request<T>(config: TYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 对单个请求的拦截器的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      // 判断showLoading是否为false 不传和true都要展示
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 请求结束后将showLoading改为默认值
          this.showLoading = DEFAULT_LOADING
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          resolve(res)
        })
        .catch((err) => {
          // 请求结束后将showLoading改为默认值
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T>(config: TYRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }

  post<T>(config: TYRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }

  delete<T>(config: TYRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }

  patch<T>(config: TYRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default TYRequest
