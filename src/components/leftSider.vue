<template>
  <div class="left">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      @select="handleOpen"
      :collapse="isCollapse"
    >
      <el-menu-item index="1">
        <template slot="title">
          <span slot="title">基础信息</span>
        </template>
      </el-menu-item>
      <el-menu-item index="2">
        <span slot="title">取号管理</span>
      </el-menu-item>
      <el-menu-item index="8">
        <span slot="title">菜单分类</span>
      </el-menu-item>
      <el-menu-item index="3">
        <span slot="title">菜品配置</span>
      </el-menu-item>
      <el-menu-item index="4">
        <span slot="title">活动配置</span>
      </el-menu-item>
      <el-menu-item index="5">
        <span slot="title">问答管理</span>
      </el-menu-item>
      <el-menu-item index="6">
        <span slot="title">按钮配置</span>
      </el-menu-item>
      <el-menu-item index="7">
        <span slot="title">排队记录</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  // name: 'leftSider',
  data() {
    return {
      isCollapse: false,
      activeIndex: "1",
    };
  },
  methods: {
    //初始化页面修改高度
    changeHight() {
      let Hig = window.innerHeight || document.body.clientHeight;
      document.getElementsByClassName("el-menu-vertical-demo")[0].style.height =
        Hig - 60 + "px";
    },
    //选中侧边栏跳转
    handleOpen(key, keyPath) {
      //将鼠标选中的标记缓存本地
      window.localStorage.setItem("activeIndex", key);
      switch (key) {
        case "1":
          this.$router.push({ path: "/baseInfo" });
          break;
        case "2":
          this.$router.push({ path: "/accessManage" });
          break;
        case "3":
          this.$router.push({ path: "/dishConfig" });
          break;
        case "4":
          this.$router.push({ path: "/activityConfig" });
          break;
        case "5":
          this.$router.push({ path: "/anserManage" });
          break;
        case "6":
          this.$router.push({ path: "/buttonConfig" });
          break;
        case "7":
          this.$router.push({ path: "/queueRecord" });
          break;
        case "8":
          this.$router.push({ path: "/dishesCategory" });
          break;
      }
    },
  },
  mounted() {
    //进入页面调整可视高度
    this.changeHight();
    //判断之前选中位置
    let getActiveIndex = window.localStorage.getItem("activeIndex");
    getActiveIndex === ""
      ? (this.activeIndex = "1")
      : (this.activeIndex = getActiveIndex);
  },
};
</script>

<style scoped>
</style>
