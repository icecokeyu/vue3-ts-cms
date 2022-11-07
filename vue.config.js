const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  // 1.vue cli 提供的属性
  outputDir: './build',
  publicPath: './',
  // 2.webpack的配置
  configureWebpack: {
    resolve: {
      alias: {
        views: '@/views',
        components: '@/components',
        assets: '@/assets',
        network: '@/network'
      }
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
}
