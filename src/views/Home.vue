<template>
  <div class="home">
    <el-container>
      <el-aside width="auto">
        <div class="logo"></div>
        <el-row>
          <el-col :span="24">
            <el-menu
              :router="true"
              :collapse="isCollapse"
              default-active="2"
              class="el-menu-admin"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>用户管理</span>
                </template>
                <el-menu-item index="user">
                  <i class="el-icon-menu"></i>
                  <span slot="title">用户列表</span>
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header>
          <el-button class="el-icon-sort" type="primary" @click="toggle"></el-button>
          <div class="system-title">电商后台管理系统</div>
          <div>
             <span class="welcome">
              <!-- 从vuex中介手中取值 -->
              您好, {{ this.$store.state.username }}
            </span>
            <el-button type="text" @click="loginOut">退出</el-button>
          </div>
         
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {getUserList} from '@/api'

export default {
  data() {
    return {
      isCollapse: false
    }
  },
  methods: {
    // 折叠菜单切换
    toggle() {
      this.isCollapse = !this.isCollapse
    },
    // 退出
    loginOut() {
      // 清除localStorage
      localStorage.removeItem('myToken')
      // 清除用户名
      localStorage.removeItem('username')
      // 返回首页
      this.$router.push({name: '/login'})
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted() {
    let params = {
      params: {
        query: 1,
        pagenum: 1,
        pagesize: 5
      }
    }
    getUserList(params).then(res => {
      console.log(res)
    })
  }
}
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  background-color: #E5E5E5;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu {
    border-right: none;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height:60px;
    background: url(../assets/cat.jpg) repeat-x;
    background-size: 67px 60px;
    background-color: white;
  }
  .toggle-btn {
    padding: 0 10px;
    margin-left: -20px;
    font-size: 36px;
    line-height: 60px;
    color: white;
    cursor: pointer;
    &:hover {
      background-color: #00635a;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>
