<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
// 引入
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'

export default {
    name: "app",
    comments: {
        Header,
        Footer
    },
    components: { Header, Footer },
    mounted() {
      //通过Vuex发请求,获取数据,存储在仓库当中,写在app组件的mounted下请求只发送一次
      this.$store.dispatch("categoryList");
    }
}
</script>

<style scope>

</style>
