import { createApp } from 'vue'
import App from './App.vue'
import Router from '@/router'
import api from '@/api'
import Vant from 'vant'
import 'vant/lib/index.css'

const app = createApp(App)
app.config.globalProperties.$api = api
app.use(Router).use(Vant).mount('#app')
