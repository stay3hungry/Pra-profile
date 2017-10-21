// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Router from 'vue-router'
import VueResource from 'vue-resource' // 引用v-resource
/* eslint-disable no-new */
Vue.use(Router)
Vue.use(VueResource)

new Vue({
  el: '#app',
  template: '<App/>',
  router: router,
  components: { App }
})
