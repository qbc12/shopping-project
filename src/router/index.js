import VueRouter from 'vue-router'
import Search from '../pages/Search/index.vue'
import Login from '../pages/Login/index.vue'
import Register from '../pages/Register/index.vue'
import Detail from '../pages/Detail/index.vue'
import AddCartSuccess from '../pages/AddCartSuccess/index.vue'
import ShopCart from '../pages/ShopCart/index.vue'
import Trade from '../pages/Trade/index.vue'
import Pay from '../pages/Pay/index.vue'
import PaySuccess from '../pages/PaySuccess/index.vue'
import Center from '../pages/Center/index.vue'
import MyOrder from '../pages/Center/MyOrder'
import GroupOrder from '../pages/Center/GroupOrder'
import Vue from 'vue'
import store from '@/store'

Vue.use(VueRouter)

let originPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location, resolve = () => { }, reject = () => { }) {
    originPush.call(this, location, resolve, reject)
}

let originReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (location, resolve = () => { }, reject = () => { }) {
    originReplace.call(this, location, resolve, reject)
}


let router = new VueRouter({
    routes: [
        {
            path: '/center',
            component: Center,
            children: [
                {
                    path: 'myorder',
                    component: MyOrder,
                },
                {
                    path: 'grouporder',
                    component: GroupOrder,
                },
                {
                    path: '/center',
                    redirect: '/center/myorder'
                }
            ],
            meta: {
                show: true,
            }
        },
        {
            path: '/paysuccess',
            component: PaySuccess,
            meta: {
                show: true,
            }
        },
        {
            path: '/pay',
            component: Pay,
            beforeEnter: (to, from, next) => {
                if (from.path == '/trade') {
                    next()
                } else {
                    next(false)
                }
            },
            meta: {
                show: true,
            }
        },
        {
            path: '/trade',
            component: Trade,
            beforeEnter: (to, from, next) => {
                if (from.path == '/shopcart') {
                    next()
                } else {
                    next(false)
                }
            },
            meta: {
                show: true,
            }
        },
        {
            path: '/addcartsuccess',
            component: AddCartSuccess,
            meta: {
                show: true,
            }
        },
        {
            path: '/shopcart',
            component: ShopCart,
            meta: {
                show: true,
            }
        },
        {
            path: '/detail/:skuid',
            component: Detail,
            meta: {
                show: true,
            }
        },
        {
            path: '/home',
            component: () => import('../pages/Home'),
            meta: {
                show: true,
            }
        },
        {
            name: 'search',
            path: '/search/:keyword?',
            component: Search,
            props: ($route) => {
                return {
                    keyword: $route.params.keyword,
                    k: $route.query.k,
                }
            },
            meta: {
                show: true,
            }
        },
        {
            path: '/login',
            component: Login,
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '*',
            redirect: '/home'
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return { y: 0 }
    }
})

router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    if (token) {
        if (to.path == '/login' || to.path == '/register') {
            next(false)
        } else {
            if (name) {
                next()
            } else {
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    await store.dispatch('userLogout')
                    alert(error.message)
                    next('/login')
                }
            }
        }
    } else {
        if (to.path.indexOf('/trade') != -1 || to.path.indexOf('/pay') != -1 || to.path.indexOf('/center') != -1) {
            next(`/login?redirect=${to.path}`)
        } else {
            next()
        }
    }
})

export default router