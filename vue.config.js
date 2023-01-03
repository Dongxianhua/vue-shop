const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // productionSourceMap: false,    // 打包时是否生成map映射文件？
  transpileDependencies: true,
  lintOnSave: false,
  // 代理跨域
  devServer:{
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
      }
    }
  }
})
