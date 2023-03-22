// 定义路由
export default [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: () => import("@/views/Home.vue")
    },
    {
        path: '/about',
        component: () => import("@/views/About.vue")
    },
    {
        path: '/api',
        component: () => import("@/views/api.vue")
    }
]
