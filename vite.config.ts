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
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'
// import viteImagemin from 'vite-plugin-imagemin'
import Markdown from 'vite-plugin-md'
import fs from 'node:fs'

// 限制图片大小，保证开发环境和生产环境的图片地址一致
const myPlugin = (limit = 4096) => { 
  return {
    name: 'my-plugin',
    async transform(id: any) {
      if (process.env.NODE_ENV !== 'development') {
        return 
      }
      if (!id.endsWith('.png') && !id.endsWith('.jpg')) {
        return
      }
      const stat = await fs.promises.stat(id)
      if (stat.size > limit) { 
        return
      }
      const buffer = await fs.promises.readFile(id)
      const base64 = buffer.toString('base64')
      const dataurl = `data:image/${id.endsWith('.png') ? 'png' : 'jpg'};base64,${base64}`
      return {
        code: `export default ${JSON.stringify(dataurl)}`,
        map: null
      }
    }
  }
}
const outputPath = process.env.NODE_ENV === 'production' ? '/vue-demo' : ''
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {

  return {
    base: outputPath,
    plugins: [
      vue({
        include: [/\.vue$/, /\.md$/]
      }),
      myPlugin(),
      visualizer({
        open: true
      }),
      Markdown(),
      // 图片压缩
      // viteImagemin({
      //   gifsicle: {
      //     optimizationLevel: 7,
      //     interlaced: false
      //   },
      //   optipng: {
      //     optimizationLevel: 7
      //   },
      //   mozjpeg: {
      //     quality: 20
      //   },
      //   pngquant: {
      //     quality: [0.8, 0.9],
      //     speed: 4
      //   },
      //   svgo: {
      //     plugins: [
      //       {
      //         name: 'removeViewBox'
      //       },
      //       {
      //         name: 'removeEmptyAttrs',
      //         active: false
      //       }
      //     ]
      //   }
      // }),
      AutoImport({
        imports: ['vue', 'vue-router'],
        dts: 'src/auto-imports.d.ts',
        eslintrc: { enabled: true },
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        // 按需引入
        dts: true,
        dirs: ["src/components"],
        resolvers:[
          ElementPlusResolver()
        ]
      }),
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
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
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
    build: {
      // 生成环境是否生成 sourceMap 文件
      sourcemap: true,
      // 打包后的文件目录
      outDir: 'dist',
      // 是否开启压缩 
      minify: 'terser',
      // 是否开启代码分割
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          }
        }
      },
      terserOptions: {
        compress: {  
          drop_console: true, // 删除所有 console
          drop_debugger: true,// 删除 debugger
        }  
      }
    }
  }
})
