module.exports = {
  outputDir: './build',
  configureWebpack: {
    resolve: {
      alias: {
        views: '@/views',
        components: '@/components',
        assets: '@/assets',
        network: '@/network'
      }
    }
  }
}
