// 对于axios进行二次封装
import axios from "axios";
// @ts-ignore
import nprogress from 'nprogress'

// 样式文件
import 'nprogress/nprogress.css'

const requests = axios.create({
    timeout: 5000
})

// 请求拦截器
requests.interceptors.request.use((config)=>{
    // 进度条开启
    nprogress.start()
    return config
})

// 响应拦截器
requests.interceptors.response.use((res)=> {
    // 进度条结束
    nprogress.done()
    return res
},(error) => {
    return Promise.reject(new Error('falie'))
})

export default requests
