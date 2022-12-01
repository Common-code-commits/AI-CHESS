import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [
    {
        path: '/',
        component: () => import('@/components/Login')
    },
    {
        path: '/game',
        component: () => import('@/components/Game')
    },
    {
        path: '/about',
        component: () => import('@/components/About')
    }
]

const createRouter = () => new Router({
    mode: 'hash', // require service support
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
