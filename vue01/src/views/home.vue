<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="16" class="headerlogo">
          <div class="grid-content bg-purple">
            
          </div>
        </el-col>
        <el-col :span="8" class="rightsection">
          <div class="grid-content bg-purple-light">
            <span class="el-dropdown-link userinfo-inner">欢迎您，管理员</span>
            <span class="userinfo-inner" @click="signout">退出</span>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside">
        <!-- 侧边栏导航  -->
        <!-- unique-opened只展开一个 -->
        <!-- router开启路由模式 -->
        <el-menu :unique-opened="true" :router="true" class="menu"
         
          active-text-color="#409EFF"
          >
          
           <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>库存系统</span>
            </template>
            <!-- index 表示跳转路径 后面需要改成路径-->
            <el-menu-item index="/orderinfomange">库存</el-menu-item>
            <el-menu-item index="/inventorylast">库存记录</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>小程序管理系统</span>
            </template>
            <el-menu-item index="/gamebalance">成本支出</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>新东方数据构造</span>
            </template>
            <el-menu-item index="/xdftest">老带新</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据字典</span>
            </template>
            <el-menu-item index="/orderinfomange">岗位类型</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main class="main" style="padding: 0 10px!important;background-color:#f0f2f5">
        <!-- <manage-sys-home :style="style"></manage-sys-home> -->
        <!--首页信息 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import ManageSysHome from "./childComponent/ManageSysHome";
export default {
  name: "Home",
  components: {
    // ManageSysHome,
  },
  data() {
    return {
      style: {
        display: "block",
      },
      menuData: [
        {
          name: "企业信息管理",
          order: "1",
          path:'componyinfomanage',
          children: [
            {
              path: "componyinfomanage",
              name: "企业信息",
            },
          ],
        },
        {
          path: "postinfomange",
          name: "岗位信息管理",
          order: "2",
          children: [
            {
              path: "postinfomange",
              name: "岗位信息",
            },
          ],
        },
        {
          path: "orderinfomange",
          name: "订单信息管理",
          order: "3",
          children: [
            {
              path: "orderinfomange",
              name: "订单信息",
            },
          ],
        },
        {
          path: "datamangeinfo",
          name: "数据字典",
          order: "4",
          children: [
            {
              path: "datamangeinfo",
              name: "岗位类型",
            },
          ],
        },
      ],
    };
  },
  methods: {
    //退出
    signout() {
      this.$confirm("退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$router.push({ path: "/" });
      });
    },
    clickMenuItem() {
      console.log("....");
      this.style.display = "none";
    },
    //回到首页
    clickTitle() {
      this.style.display = "block";
    },
  },
};
</script>
<style scoped>
.container {
  
  font-size: 15px;
}
.header {
  background-color:#061723;
  color: #fff;
  height: 50px;
}
.aside {
    background-color: #fff;
     
  /*background-color: #0664a3!important;
  color: #fff;
  
  /* height: 100%; */
}
.menu {
  background-color: none;
  color: #fff;
  
}
.main {
  /* height: 100%; */
  color: #0664a3;
 
}
.headerlogo {
  line-height: 100px;
  margin-top: 1px;
}
.rightsection {
  line-height: 60px;
  text-align: center;
}
</style>
