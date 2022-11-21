import { createApp } from 'vue'
import 'normalize.css'
import { globalRegister } from '@/global'

import App from './App.vue'

import router from './router'
import store from './store'
// import { tyRequest } from '@/service'
// 全局导入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'assets/css/index.less'

import { refreshSaveLocal } from '@/store'
// 导入element plus的所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(globalRegister)
app.use(store)
refreshSaveLocal()
app.use(router)
app.use(ElementPlus)

app.mount('#app')
