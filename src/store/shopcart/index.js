import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";
//购物车模块的小仓库
const state = {
    cartList: [],
};
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;
    }
};
const actions = {
    // 获取购物车数据
    async getCartList({ commit }) {
        let result = await reqCartList();
        if (result.code == 200) {
            commit("GETCARTLIST", result.data)
        }
    },
    // 删除一个购物车商品
    async deleteCartListById({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
            return "OK";
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    // 修改购物车商品是否勾选
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked);
        if (result.code == 200) {
            return "OK";
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    // 删除全部勾选的商品
    deleteAllCheckedCart({ dispatch, getters }) {
        //context:小仓库，commit【提交mutations修改state】getters【计算属性】dispatch【派发action】state【当前仓库数据】
        //获取购物车中全部的产品（是一个数组）
        let promiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartListById', item.skuId) : '';
            // 将每一次返回的Promise添加到数组当中
            promiseAll.push(promise);
        });
        return Promise.all(promiseAll);
    },
    // 全部勾选或者不勾选
    updateAllCartChecked({ dispatch, state }, isChecked) {
        let promiseAll = [];
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked });
            promiseAll.push(promise);
        });
        return Promise.all(promiseAll);
    }
};
// getters的作用：简化仓库中的数据
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}