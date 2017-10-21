<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="nav">
      <div class="nav-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="nav-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="nav-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller" :ratings="ratings" :goods="goods"></router-view>
  </div>
</template>

<script>
import header from './components/header/head'
export default {
  components: {
    'v-header': header
  },
  data () {
    return {
      seller: {},
      goods: {},
      ratings: {}
    }
  },
  created () {
    this.$http.get('/api/seller').then(function (res) {
      this.seller = res.body.data
    }, function (res) {
      console.log('获取信息失败')
    })
    this.$http.get('/api/goods').then(function (res) {
      this.goods = res.body.data
    }, function (res) {
      console.log('获取信息失败')
    })
    this.$http.get('/api/ratings').then(function (res) {
      this.ratings = res.body.data
    }, function (res) {
      console.log('获取信息失败')
    })
  }
}
</script>






<style>
*{
  text-decoration: none;
}
.nav{ 
  display: flex;
  height: 40px;
  line-height: 40px;
  width: 100%;
  position: relative;
}
.nav::after{
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  content: '';
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
.nav .nav-item{ 
  flex:1;
  text-align: center;
}
.nav-item a{
  display: block;     
  font-size: 14px;
  color: rgb(77,85,93)
}
.nav-item a.active{
  color: rgb(240,20,20);
}
</style>
