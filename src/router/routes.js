// 当打包构建应用时，JavaScript包会变得非常大，影响页面加载。
// 如果我们能把不同路由对应的组件分害成不同的代码块，
// 然后当路由被访问的时候才加载对应组件，这样就更加高效了。(路由懒加载)

// 路由配置信息
export default [
    {
        path: "/center",
        component: () => import('@/pages/Center'),
        meta: {show:true},
        // 二级路由组件
        children:[
            {
                path:"myorder",
                component: () => import('@/pages/Center/myOrder'),
            },
            {
                path:"grouporder",
                component: () => import('@/pages/Center/groupOrder'),
            },
            {
                path:"/center",
                redirect:"/center/myorder"
            }
        ]
    },
    {
        path: "/paysuccess",
        component: () => import('@/pages/PaySuccess'),
        meta: {show:true},
    },
    {
        path: "/pay",
        component: () => import('@/pages/Pay'),
        meta: {show:true},
        // 路由独享守卫,想去支付页只能从下单页过来
        beforeEnter: (to, from, next) => {
            if(from.path=="/trade") {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        path: "/trade",
        component: () => import('@/pages/Trade'),
        meta: {show:true},
        // 路由独享守卫,想去下单页只能从购物车过来
        beforeEnter: (to, from, next) => {
            if(from.path=="/shopcart") {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        path: "/shopcart",
        component: () => import('@/pages/ShopCart'),
        meta: {show:true}
    },
    {
        path: "/addcartsuccess",
        name: "addcartsuccess",
        component: () => import('@/pages/AddCartSuccess'),
        meta: {show:true}
    },
    {
        path: "/detail/:skuId",
        component: () => import('@/pages/Detail'),
        meta: {show:true}
    },
    {
        path: "/home",
        component: () => import('@/pages/Home'),
        meta: {show:true}
    },
    {   
        name: "search",
        path: "/search/:keyword?",
        component: () => import('@/pages/Search'),
        meta: {show:true}
    },
    {
        path: "/login",
        component: () => import('@/pages/Login'),
        meta: {show:false}
    },
    {
        path: "/register",
        component: () => import('@/pages/Register'),
        meta: {show:false}
    },
    // 重定向，访问/定位到首页
    {
        path:'*',
        redirect:"/home"
    }
]