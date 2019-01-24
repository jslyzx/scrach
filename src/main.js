// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Mui from "vue-awesome-mui";
import "vue-awesome-mui/mui/dist/css/mui.css"

import App from './App'
import router from './router'

import store from './vuex/store'
import * as filters from './util/filter'

Object.keys(filters).forEach(k => Vue.filter(k, filters[k])) //注册过滤器

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Mui)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  ...App
})
