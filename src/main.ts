import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import router from './router'
import pinia from './store'
import '@/styles/index.scss'
import vSilderin from '@/directives/vSilderin';
const app = createApp(App)

app.use(Antd)
app.use(pinia)
app.use(router)

app.directive('silderIn', vSilderin)

app.mount('#app')
