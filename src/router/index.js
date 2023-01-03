// 配置路由的地方
import Vue from 'vue';
import routes from './routes';
import VueRouter from 'vue-router';
// 使用插件
Vue.use(VueRouter);
// 引入仓库
import store from '../store';

// 先把VueRouter原型对象的push先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写push|replace
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        // 使用call方法改变this指向
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        // 使用call方法改变this指向
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

// 配置路由
let router = new VueRouter({
    //配置路由
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})

// 全局守卫：前置（在路由跳转之前）
router.beforeEach(async (to, from, next) => {

    let token = localStorage.getItem('TOKEN');
    // 如果有token，说明已经登录过了
    if (token) {
        // 不能再跳到登录,注册页
        if (to.path == '/login' || to.path == '/register') {
            next('/home');
        } else {
            // 去的是其他页面，用户信息有就跳转
            if(store.state.loginRegister.userInfo.name) {
                next();
            }else {     // 没有的话先获取再跳转
                try {
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    // token过期了，清除token并跳到登录页
                    await store.dispatch('userLogout');
                    next('/login');
                }
            }
        }
    } else {
        // 没有token，未登录
        let toPath = to.path;
        //未登录：不能去交易相关、不能去支付相关【pay paysuccess】、不能去个人中心
        //未登录去上面这些路由-----------登录
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1) {
            // 跳转到登录页时向登录页传参，实现登录后重定向到目标页
            next('/login?redirect=' + toPath);
        } else {
            // 去的不是上面这些路由(home|search|shopCart)--放行
            next();
        }
    }
});

export default router;