import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import router from './router'
import pinia from './store'
import '@/styles/index.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import highlight from './directives/highlight';
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(Antd)
app.use(pinia)
app.use(router)
// app.directive('highlight', highlight)
app.mount('#app')
