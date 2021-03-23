import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login.vue'
import changePwd from '@/components/changePwd.vue'
import baseInfo from '@/components/component/baseInfo.vue'
import accessManage from '@/components/component/accessManage.vue'
import dishConfig from '@/components/component/dishConfig.vue'
import activityConfig from '@/components/component/activityConfig.vue'
import anserManage from '@/components/component/anserManage.vue'
import buttonConfig from "@/components/component/buttonConfig.vue"
import queueRecord from "@/components/component/queueRecord.vue"
import dishesCategory from "@/components/component/dishesCategory.vue"
// import leftSider from '@/components/leftSider'
// import topNav from '@/components/topNav'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },{
      path: '/changePwd',
      name: 'changePwd',
      component: changePwd
    },
    {
      path: '/baseInfo',
      name: 'baseInfo',
      component: baseInfo
    },
    {
      path: '/accessManage',
      name: 'accessManage',
      component: accessManage
    },
    {
      path: '/dishConfig',
      name: 'dishConfig',
      component: dishConfig
    },
    {
      path: '/activityConfig',
      name: 'activityConfig',
      component: activityConfig
    },
    {
      path: '/anserManage',
      name: 'anserManage',
      component: anserManage
    },
    {
      path: '/buttonConfig',
      name: 'buttonConfig',
      component: buttonConfig
    },
    {
      path: '/queueRecord',
      name: 'queueRecord',
      component: queueRecord
    },{
      path: '/dishesCategory',
      name: 'dishesCategory',
      component: dishesCategory
    },
  ]
})

//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
