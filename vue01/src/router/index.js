import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Action from '@/components/action'
import Today from '@/components/today'
import Login from '@/views/login.vue'
Vue.use(Router)
export default new Router({

  
  //mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/action',
      name: 'action',
      component: Action
    },
    {
      path: '/today',
      name: 'today',
      component: Today
    },
    {
      path: '/index',
      name: 'HelloWorld',
      component: HelloWorld
    }

  ]
})
