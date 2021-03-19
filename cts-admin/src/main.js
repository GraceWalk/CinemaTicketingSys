import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
import Store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import Api from '@/api'

const app = createApp(App)
app.config.globalProperties.$api = Api
app.use(Router).use(Store).use(ElementPlus).mount('#app')
