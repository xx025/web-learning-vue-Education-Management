<template>
  <el-container>
    <el-header>
      <h2>教育后台管理系统</h2>
      <div>
        <!-- 头像 -->
        <el-avatar
          size="small"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        <!-- 下拉菜单 -->
        <el-dropdown @command="handleCommand" szie="medium" trigger="click">
          <span class="el-dropdown-link">
            {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="editUser">修改信息</el-dropdown-item>
            <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu router background-color="#4c5258" text-color="#fff" 
          active-text-color="#57a08b">
          <el-submenu :index="data.id+''" v-for="data in treeData" :key="data.id">
            <template slot="title">
              <i class="el-icon-user whiter_i"></i>
              <span>{{ data.name }}</span>
            </template>
            <el-menu-item :index="child.path" v-for="child in data.children" :key="child.id">
              <template slot="title">
                <i class="el-icon-location whiter_i"></i>
                <span>{{ child.name }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>

      </el-aside>
      <el-main>
        <!-- <router-link to="/login">xxxxxxxx</router-link> -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Qs from 'qs'

export default {
  data() {
    return {
      username: "",
      treeData: []
    };
  },
  created() {
    // 组件创建时候的回调，经常用作初始化数据
    let userInfo = window.sessionStorage.getItem("userInfo");
    // 获取用户名
    this.username = JSON.parse(userInfo).username;
    // 获取侧边导航栏数据
    this.getTreeData();
  },
  methods: {
    getTreeData(){
      // url
      let url = "resource/getResources";
      // token
      let userInfo = window.sessionStorage.getItem("userInfo");
      let token = JSON.parse(userInfo).token;
      let param = { token: token };
      // 发送请求
      let v = this;
      this.$axios.post(url, Qs.stringify(param)).then(function(r){
          if (r.data.code == 200) {
            v.treeData = r.data.result;
          }
      });

    },
    handleCommand(command) {
      switch (command) {
        case "editUser":
          console.log("明天做");
          break;
        case "loginOut":
          // 1.清空登录状态
          window.sessionStorage.removeItem("userInfo");
          // 2.跳转登录页面
          this.$router.push("/login");
          break;
        default:
          break;
      }
    
    
    },
  },
};
</script>

<style scoped>
.el-container {
  height: 100%;
}

.el-header {
  background-color: #57a08b;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-header h2 {
  font-size: 20px;
  color: #fff;
}

.el-header div {
  display: flex;
  /* 纵轴方向居中 */
  align-items: center;
}

.el-dropdown {
  font-size: 18px;
  color: #fff;
  margin-left: 10px;
}

.el-dropdown:hover {
  cursor: pointer;
}

.el-aside {
  background-color: #4c5258;
  height: 100%;
}

.el-main {
  background-color: #f0f0f0;
  height: 100%;
}

.whiter_i {
  color: #fff;
}

.el-menu {
  border-right: none;
}
</style>