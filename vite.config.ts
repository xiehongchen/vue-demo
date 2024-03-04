import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {

  return {
    plugins: [
      vue(),
      viteMockServe({
        // default
        mockPath: 'mock',
        enable: true,
      }),
    ],
    // 别名
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  }
})
