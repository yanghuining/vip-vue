import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Action from '@/components/action'
import Today from '@/components/today'
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
import OrderInfoManage from '@/views/OrderinfoManage.vue'
import Inventorylast from '@/views/inventorylast.vue'
import Gamebalance from '@/views/gamebalance.vue'
import Xdftest from '@/views/xdftest.vue'

Vue.use(Router)
const router =new Router({

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
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children:[
        
        {
          path: '/orderinfomange',
          name: '库存信息',
          component: OrderInfoManage,
        },
        {
          path: '/inventorylast',
          name: '库存变动记录',
          component: Inventorylast,
        },
        {
          path: '/gamebalance',
          name: '成本支出',
          component: Gamebalance,
        },
        {
          path: '/xdftest',
          name: '数据构造',
          component: Xdftest,
        },
        
      ]}
          
  ]
});

//路由变换前
router.beforeEach((to, from, next) => {
  console.log("yi");
  let token = localStorage.getItem('token');
 
  console.log(token);
  if (token) {
    next();
    
  } else {
    if (to.path === '/') {
      next();
    } else {
      next({path:'/'});
    }
  }
});

  export default router;