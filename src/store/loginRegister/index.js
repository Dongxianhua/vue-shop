import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo ,reqLogout } from "@/api";
//登陆注册模块的小仓库
const state = {
    code: '',
    token: localStorage.getItem('TOKEN'),
    userInfo: ''
};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state, token) {
        state.token = token;
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    // 清除本地数据
    CLEAR(state) {
        // 清除仓库和本地存储里的数据
        state.code = '';
        state.userInfo = {};
        localStorage.removeItem('TOKEN');
    }
};
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        // 获取验证码的这个接口：把验证码返回，但是正常情况，后台把验证码发到用户手机上【省钱】
        let result = await reqGetCode(phone);
        if (result.code == 200) {
            commit('GETCODE', result.data);
            return "OK";
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    // 用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user);
        if (result.code == 200) {
            console.log(result);
            return "OK";
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    // 用户登录
    async userLogin({ commit }, user) {
        let result = await reqUserLogin(user);
        if (result.code == 200) {
            commit('USERLOGIN', result.data.token);
            // 持久化存储token
            localStorage.setItem('TOKEN',result.data.token);
            return "OK";
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    // 获取用户信息（token）
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        if (result.code == 200) {
            commit('GETUSERINFO', result.data);
            return "OK";
        }else {
            return Promise.reject(new Error('faile'));
        }
    },
    // 用户退出的登录
    async userLogout({commit}) {
        let result = await reqLogout();
        if(result.code == 200) {
            commit('CLEAR');
            return "OK";
        }else {
            return Promise.reject(new Error('faile'));
        }
    }
};
// getters的作用：简化仓库中的数据
const getters = {

};
export default {
    state,
    mutations,
    actions,
    getters
}