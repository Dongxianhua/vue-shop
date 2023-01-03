import Vue from 'vue'
import App from './App.vue'
// 定义全局组件
import TypeNav from '@/components/TypeNav';
import Pagination from '@/components/Pagination';
import Carousel from '@/components/Carousel';
// 按需引入elementUI
import { MessageBox } from 'element-ui';
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.component(Pagination.name,Pagination);
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carousel.name,Carousel);

// 引入插件
import VueLazyload from 'vue-lazyload';
// 注册插件
Vue.use(VueLazyload,{
  // 懒加载默认图片
  loading:require('@/assets/images/aniya.png')
});

// 引入自定义插件(自定义转大写指令)
// import myPlugins from '@/plugins/myPlugins';
// Vue.use(myPlugins,{
//   name:'upper'
// })


// 引入路由
import router from '@/router';
// 引入仓库
import store from '@/store';
// 引入swiper样式
import "swiper/css/swiper.css";

// 引入统一接口api文件夹下的全部请求函数
import * as API from '@/api';

Vue.config.productionTip = false

// 引入mockServe.js-------mock数据
import '@/mock/mockServe';

new Vue({
  render: h => h(App),
  // 全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  // 注册路由，kv一致
  router,
  // 注册仓库
  store
}).$mount('#app')

