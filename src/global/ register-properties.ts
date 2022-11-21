import { App } from 'vue'
import { formatUtcString } from '@/utils/format-time'

export function registerGlobalProperties(app: App) {
  app.config.globalProperties.$filters = {
    foo() {
      console.log('foo')
    },
    formatTime(value: string) {
      return formatUtcString(value)
    }
  }
}
