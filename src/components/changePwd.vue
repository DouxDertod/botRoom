<template>
  <div class="login-back">
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-container"
    >
      <h3 class="title">修改密码</h3>
      <el-row style="text-align: left" >
        <el-col style="margin-bottom: 5px">旧密码：</el-col>
        <el-form-item prop="oldPassword" >
          <el-input
            type="password"
            v-model="ruleForm.oldPassword"
            autocomplete="off"
            placeholder="旧密码"
          ></el-input>
        </el-form-item>
        <el-col style="margin-bottom: 5px">新密码：</el-col>
        <el-form-item prop="password" >
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            placeholder="新密码"
          ></el-input>
        </el-form-item>
        <el-col style="margin-bottom: 5px">确认新密码：</el-col>
        <el-form-item prop="rePassword" >
          <el-input
            type="password"
            v-model="ruleForm.rePassword"
            autocomplete="off"
            placeholder="确认新密码"
          ></el-input>
        </el-form-item>
        <el-col style="margin-bottom: 5px">验证码：</el-col>
        <el-col :span="11">
          <el-form-item prop="captcha" >
            <el-input
              type="text"
              v-model="ruleForm.captcha"
              autocomplete="off"
              placeholder="验证码"
              @keyup.enter.native="validateCaptcha()"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item>
            <img  :src="captchaUrl" @click="refreshCaptcha" width="90%" clearable>
          </el-form-item>
        </el-col>
        <!-- <el-checkbox v-model="checked" @change="setUserInfo()" class="remember"
          >记住密码</el-checkbox
        > -->
        <el-col>
          <el-form-item style="width: 100%;">
            <el-button
              type="primary"
              style="width: 100%"
              @click.native.prevent="resetPassword"
              :loading="logining"
              >确定</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
const Base64 = require("js-base64").Base64;
import { getCaptcha,changePassword } from "../assets/js/api/api";
export default {
  data() {
    return {
      logining: false,
      ruleForm: {
        oldPassword:"",
        password: "",
        rePassword: "",
        captcha: ""
      },
      captchaUrl:"",
      captchaId:"",
    };
  },
  methods: {
    //提交登录
    handleSubmit() {
      let parme = {
        captcha: this.ruleForm.captcha,
        username: this.ruleForm.account,
      };
    },
    resetPassword(){
      if(this.ruleForm.rePassword!=this.ruleForm.password){
        this.$message({ type: "info", message: "所输入的密码和确认密码不匹配。请重新输入密码。" });
        return;
      }
      const param= {
        uid : this.captchaId,
        captcha : this.ruleForm.captcha,
        oldPassword : this.ruleForm.oldPassword,
        password : this.ruleForm.password,
        username : localStorage.getItem("merchantId"),
      };
      changePassword(param).then((res) => {
        if (res.data.retcode === 0) {
          this.$message({type:"success",message:"修改成功"});
          var that = this;
          setTimeout(function () {
            that.$router.push("/");
          },2000);
        }
      });
    },
    refreshCaptcha(){
      this.captchaId=localStorage.getItem("merchantId")+(new Date()).getMilliseconds();
      const param= {
        id : this.captchaId,
      };
      getCaptcha(param).then((res) => {
        if (res.data.retcode === 0) {
            this.captchaUrl=res.data.payload
        }
      });
    }
  },
  mounted() {
    this.refreshCaptcha();
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
