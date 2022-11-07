import { createApp } from 'vue'
import 'normalize.css'

import App from './App.vue'

import router from './router'
import store from './store'
import { tyRequest } from '@/service'
// 全局导入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'assets/css/index.less'

const app = createApp(App)

// tyRequest
//   .request({
//     url: '/home/multidata',
//     method: 'GET',
//     // showLoading: false,
//     interceptors: {
//       requestInterceptor: (config) => {
//         console.log('单个请求：请求成功的拦截器')
//         return config
//       },
//       requestInterceptorCatch: (err) => {
//         console.log('单个请求：请求失败的拦截器')
//         return err
//       },
//       responseInterceptor: (res) => {
//         console.log('单个请求：响应成功的拦截器')
//         return res
//       },
//       responseInterceptorCatch: (err) => {
//         console.log('单个请求：响应失败的拦截器')
//         return err
//       }
//     }
//   })
//   .then((res) => {
//     console.log(res)
//   })
interface dataType {
  data: any
  returnCode: string
  success: boolean
}

tyRequest
  .request<dataType>({
    url: '/home/multidata',
    method: 'GET',
    showLoading: false
  })
  .then((res) => {
    console.log(res.data)
    console.log(res.returnCode)
    console.log(res.success)
  })

app.use(router)
app.use(store)
app.use(ElementPlus)

app.mount('#app')
