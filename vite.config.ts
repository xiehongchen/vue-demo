/*
 * @Author: xiehongchen 1754581057@qq.com
 * @Date: 2024-03-05 10:21:52
 * @LastEditors: xiehongchen 1754581057@qq.com
 * @LastEditTime: 2024-03-05 10:36:17
 * @FilePath: /vue-demo/vite.config.ts
 * @Description: 
 * 认真学习每一天
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {

  return {
    plugins: [
      vue(),
      viteMockServe({
        mockPath: './src/mock/', // 目录位置
        logger: true, //  是否在控制台显示请求日志
        supportTs: true, // 是否读取ts文件模块
        localEnabled: command === 'serve', // 设置是否启用本地mock文件
        prodEnabled: command !== 'serve' && true, // 设置打包是否启用mock功能
        // 这样可以控制关闭mock的时候不让mock打包到最终代码内
        injectCode: `
          import { setupProdMockServer } from '../src/mock/index';
          setupProdMockServer();
        `
      })
    ],
    // 别名
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhostt:8080', // 后台服务器地址
          changeOrigin: true, // 是否允许不同源
          secure: false, // 支持https
          rewrite: (path) => path.replace(/^\/api/, '/api')
        }
      }
    },
  }
})
