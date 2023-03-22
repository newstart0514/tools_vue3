import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 统一接口api文件夹里面全部请求函数
import * as API from '@/api'
import router from "@/router";

const app = createApp(App)
app.config.globalProperties.$API = API
app.use(router)
app.mount('#app')
