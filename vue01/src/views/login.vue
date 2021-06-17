<template>
  <div>
      <h3>登录</h3>
      用户名:<input type="text" v-model="loginForm.loginName" placeholder="请输入用户名"/>
      <br><br>
      密码： <input type="password" v-model="loginForm.password" placeholder="请输入密码"/>
      <br><br>
      <button>登录</button>
  </div>
</template>

<script>

  export default {
    name: 'Login',
    data () {
      return {
        loginForm: {
          loginName: '',
          password: ''
        },
        responseResult: []
      }
    },
    methods: {
    }
  }
</script>
