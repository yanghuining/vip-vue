import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Action from '@/components/action'
import Today from '@/components/today'
import Login from '@/views/login.vue'
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
    }

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