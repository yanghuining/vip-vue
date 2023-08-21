// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'



import axios from 'axios'
Vue.prototype.axios = axios


import qs from 'qs';
Vue.prototype.qs = qs;

Vue.config.productionTip = false
Vue.use(elementUI)
axios.interceptors.request.use(
  config => {
      console.log(config);
      if (localStorage.getItem('token')) {
          config.headers.token = localStorage.getItem('token');//把localStorage的token放在Authorization里
      }
      return config;
  },
  function(err) {
      console.log("失败信息" + err);
  }
);

axios.defaults.withCredentials = true // 允许携带cookie
axios.defaults.crossDomain = true // 跨域访问需要打开这个开关
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded' // 设置post请求的默认Content-Type

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


