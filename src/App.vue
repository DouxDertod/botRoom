<template>
  <div id="app">
    <el-container>
      <el-header v-show="headerShow"><topNav /></el-header>
      <el-container>
        <el-aside v-show="headerShow" width="200px" class="left"
          ><leftSider
        /></el-aside>
        <el-main
          class="fixHig"
          :style="{ background: headerShow ? '#fff' : '#f3f3f3' }"
          ><router-view
        /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import topNav from "./components/topNav";
import leftSider from "./components/leftSider";
export default {
  components: { topNav, leftSider },
  name: "App",
  data() {
    return {
      path: "",
      headerShow: true,
    };
  },
  methods: {
    fixHeight() {
      let Hig = window.innerHeight || document.body.clientHeight;
      document.getElementsByClassName("fixHig")[0].style.height =
        Hig - 65 + "px";
    },
  },
  mounted() {
    this.fixHeight();
  },
  watch: {
    "$route.path": {
      immediate: true,
      handler(to, from) {
        if (to === "/") {
          this.headerShow = false;
        } else {
          this.headerShow = true;
        }
      },
    },
  },
};
</script>

<style>
html{
    overflow-y: hidden;
}
#app {

  width: 1440px;
  margin: 0 auto;
  overflow-x: hidden;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  background: #f3f3f3;
  margin: 0px;
}
.el-header {
  background: #fff;
  /* border-bottom: 1px solid   #f3f3f3; */
  margin-bottom: 3px;
}
.el-main {
  overflow: hidden;
  overflow-y: auto;
  width: 100%;
  background: #fff;
  margin: 5px 8px;
}
</style>
