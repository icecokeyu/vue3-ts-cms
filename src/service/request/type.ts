import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface TYRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  // responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}

export interface TYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: TYRequestInterceptors<T>
  showLoading?: boolean
}
