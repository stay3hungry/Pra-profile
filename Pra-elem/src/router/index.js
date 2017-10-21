import Vue from 'vue'
import Router from 'vue-router'
import goods from '../components/goods/goods.vue'
import ratings from '../components/ratings/ratings'
import seller from '../components/seller/seller'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/goods', component: goods},
    {path: '/seller', component: seller},
    {path: '/ratings', component: ratings},
    {path: '', redirect: '/goods'} // 默认页面重定向
  ],
  linkActiveClass: 'active'
})

