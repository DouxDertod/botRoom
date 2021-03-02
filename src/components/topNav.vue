<template>
  <div class="top">
    <el-row>
      <el-col :span="2">
        <img style="margin: 10px" src="../assets/img/logo.png" alt="" />
      </el-col>
      <el-col :span="10" class="toright">
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo toright"
          mode="horizontal"
          @select="handleSelect"
          text-color="#000000"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title"
              ><img src="../assets/img/right.png" alt="" /><span
                >admin</span
              ></template
            >
            <el-menu-item index="2-1" @click.native="loginOut()"
              >退出登录</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { exitLogin } from "../assets/js/api/api";
export default {
  //   name: 'topNav',
  data() {
    return {
      activeIndex2: "1",
    };
  },
  methods: {
    handleSelect() {},
    loginOut() {
      exitLogin().then((res) => {
        if (res.data.retcode === 0) {
          localStorage.removeItem("activeIndex");
          localStorage.removeItem("token");
          localStorage.removeItem("botData");
          localStorage.removeItem("merchantId");
          localStorage.removeItem("merchantId");
          this.$router.push("/");
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
