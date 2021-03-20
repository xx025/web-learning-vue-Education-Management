<template>
  <div class="login_container">
    <!-- 定义的是html骨架部分 -->
    <div class="login_box">
      <h1>教育系统登录界面</h1>
      <el-form ref="formRef" :rules="formRules" :model="formData" size="small">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="formData.username"
            prefix-icon="iconfont icon-yonghu"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="formData.password"
            show-password
            prefix-icon="iconfont icon-mima"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <!-- 记住密码 -->
        <el-form-item>
          <el-checkbox
            v-model="formData.rememberMe"
            label="记住密码"
          ></el-checkbox>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button @click="submit" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Qs from 'qs'

export default {
  data() {
    return {
      formData: {
        username: "admin",
        password: "123456",
        rememberMe: true,
      },
      formRules: {
        username: [
          { required: true, message: "请输入用户名", tagger: "blur" },
          {
            min: 3,
            max: 15,
            message: "请输入 3 到 15 位的用户名",
            tagger: "blur",
          },
        ],
        password: [{ required: true, message: "请输入密码", tagger: "blur" }],
      },
    };
  },
  methods: {
    submit() {
      // ref:将表单绑定到vue对象中的
      let v = this;
      this.$refs.formRef.validate(function (result) {
        // 当表单验证通过，进行登录
        /* 
          修改axios的默认content-type，默认的content-type:application/json
          1.修改axios的默认的content-type,修改成为：application/www-x-form-urlencorded
          2.使用qs库，处理参数
        */
        if (result) {
          // axios
          let url = "login";
          v.$axios.post(url, Qs.stringify(v.formData)).then(function(response){
            //  解析返回值并提示登录结果
            let data = response.data;
            let type = "error";
            if (data.code == 200) {
              type = "success";
            }
            v.$message({
              showClose: true,
              message: data.message,
              type: type
            });
            // 保存用户状态和页面跳转
            if (data.code == 200) {
              // window.localStorage 存储本地数据
              // window.sessionStorage 存储会话数据,一旦页面关闭，则数据清空
              /*
                在使用sessionStorage存储对象等数据的时候，可以先将对象转换成
                字符串，方法：JSON.stringify()，然后再进行存储。取用时，先
                转换成对象,方法：JSON.parse(),再进行使用
              */
              window.sessionStorage.setItem("userInfo", JSON.stringify(data.result));
              // 页面跳转
              v.$router.push("/home");
            }
          });
        } 

      });
    },
  },
};
</script>

<style scoped>
/* 
        界面样式
        scoped:样式只在本组件起作用
    */
.login_container {
  height: 100%;
  background-color: #f5f5f5;
}

.login_box {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -145px;
  margin-left: -150px;
  width: 260px;
  height: 290px;
  background-color: #fff;
  border-radius: 5px;
}

.login_box h1 {
  text-align: center;
  font-size: 18px;
  margin-bottom: 25px;
}

.el-form {
  margin-left: 20px;
  margin-right: 20px;
}

.el-button {
  width: 100%;
}
</style>


