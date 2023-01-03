// 当前这个模块：API进行统一管理
import requests from "./request";
import mockRequests from "./mockAjax";

//三级联动接口
// /api/product/getBaseCategoryList  GET  无参
// 发请求：axios发请求返回promise对象
export const reqCategoryList = ()=>requests({url:'/product/getBaseCategoryList',method:'get'});

// 获取banner（Home首页轮播图接口）
export const reqGetBannerList = () => mockRequests.get('/banner');

// 获取floor
export const reqGetFloorList = () => mockRequests.get('/floor');

// 获取搜索模块的数据 地址：/api/list 请求方法：post
export const reqGetSearchInfo = (params) => requests({url:"/list",method:"post",data:params});

// 获取产品详情信息的接口 
export const reqGoodsInfo = (skuId) => requests({url:`/item/${skuId}`,method:"get"});

// 将产品添加到购物车当中 （获取更新某一个产品的数量）
export const reqAddOrUpdateShopCar = (skuId,skuNum) => requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:"post"});

// 获取购物车列表数据接口
export const reqCartList = () => requests({url:"/cart/cartList",method:"get"});

// 删除购物车产品的接口
export const reqDeleteCartById = (skuId) => requests({url:`/cart/deleteCart/${skuId}`,method:"delete"});

// 更新购物车商品勾选状态的接口
export const reqUpdateCheckedById = (skuId,isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:"get"});

// 获取验证码的接口
export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`,method:"get"});

// 用户注册的接口(data是一个对象)
export const reqUserRegister = (data) => requests({url:'/user/passport/register',data,method:"post"});

// 用户登录的接口
export const reqUserLogin = (data) => requests({url:'/user/passport/login',data,method:"post"});

// 用户登录后获取用户的信息 （携带token向服务器请求数据）
export const reqUserInfo = () => requests({url:'/user/passport/auth/getUserInfo',method:"get"});

// 用户退出登录的接口
export const reqLogout = () => requests({url:'/user/passport/logout',method:"get"});

// 获取用户地址信息
export const reqAddressInfo = () => requests({url:'/user/userAddress/auth/findUserAddressList',method:"get"});

// 获取商品清单
export const reqOrderInfo = () => requests({url:'/order/auth/trade',method:"get"});

// 提交订单接口
export const reqSubmitOrder = (tradeNo,data) => requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:"post"});

// 提交支付信息
export const reqPayInfo = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`,method:"get"});

// 获取支付订单状态
export const reqPayStatus = (orderId) => requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:"get"});

// 
export const reqMyOrderList = (page,limit) => requests({url:`/order/auth/${page}/${limit}`,method:"get"});