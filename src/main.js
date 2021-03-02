// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/publice.css'
import axios from 'axios'
import Filters from "./assets/js/utils/filter"


Vue.prototype.$http = axios;
Vue.use(ElementUI)
Vue.config.productionTip = false

Object.keys(Filters).forEach(key => Vue.filter(key, Filters[key])) // 自定义过滤器

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
