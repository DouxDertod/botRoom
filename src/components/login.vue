<template>
  <div class="login-back">
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-container"
    >
      <h3 class="title">系统登录</h3>
      <el-form-item prop="account">
        <el-input
          type="text"
          v-model="ruleForm.account"
          autocomplete="off"
          placeholder="账号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="ruleForm.userPassWord"
          autocomplete="off"
          placeholder="密码"
          @keyup.enter.native="handleSubmit()"
        ></el-input>
      </el-form-item>
      <!-- <el-checkbox v-model="checked" @change="setUserInfo()" class="remember"
        >记住密码</el-checkbox
      > -->
      <el-form-item style="width: 100%; margin-top: 50px">
        <el-button
          type="primary"
          style="width: 100%"
          @click.native.prevent="handleSubmit"
          :loading="logining"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const Base64 = require("js-base64").Base64;
import { getLogin, exitLogin, getMerchant } from "../assets/js/api/api";
export default {
  data() {
    return {
      logining: false,
      ruleForm: {
        account: "",
        userPassWord: "",
      },
      checked: false,
    };
  },
  methods: {
    //提交登录
    handleSubmit() {
      let parme = {
        password: this.ruleForm.userPassWord,
        username: this.ruleForm.account,
      };
      getLogin(parme).then((res) => {
        if (res.retcode === 0) {
          let token = res.payload;
          localStorage.setItem("token", token);
          if (token) {
            getMerchant().then((res) => {
              if (res.data.retcode === 0) {
                let data = JSON.parse(res.data.payload);
                localStorage.setItem("botData", JSON.stringify(data));
                localStorage.setItem("merchantId", data.merchantId);
                this.$router.push("/baseInfo");
              }
            });
          }
        }
      });
    },
    //是否记住密码
    setUserInfo() {
      // if (this.checked) {
      //   //这里默认是7天时间存储
      //   setCookie("account", this.ruleForm.account, 7);
      //   // base64加密密码
      //   let passWord = Base64.encode(this.ruleForm.userPassWord);
      //   setCookie("password", passWord, 7);
      //   setCookie("remember", this.checked, 7);
      // } else {
      //   setCookie("account", "");
      //   setCookie("password", "");
      // }
    },
  },
  mounted() {
    // 在页面加载时从cookie获取登录信息
    // let account = getCookie("account");
    // let password = Base64.decode(getCookie("password"));
    
    // // 如果存在赋值给表单，并且将记住密码勾选
    // if (account) {
    //   this.ruleForm.account = account;
    //   this.ruleForm.userPassWord = password;
    //   this.checked = true;
    // }
  },
};
</script>

<style lang="less" scoped>
.login-back {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: #f6f6f6;
  // background: url("../assets/img/login-bg1.jpg") no-repeat center center;
  background-size: 100% 100%;
}
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);
  .title {
    margin: 0 auto 40px;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0 0 35px;
  }
}
</style>
