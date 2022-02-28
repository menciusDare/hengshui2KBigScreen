// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as Echarts from 'echarts'
import VueECharts from 'vue-echarts' // 在 webpack 环境下指向 components/ECharts.vue
import axios from 'axios'
import DateFormat from './unit/DateFormat'
import app_config from '../static/ApplicationConfig'
import AppData from '../static/ApplicationData'
import $ from 'jquery'
import store from './store/index.js'
import iconLIst from './common/imgList'
import EmptyData from './components/EmptyData.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.prototype.app_config = app_config

Vue.prototype.ICONLIST = iconLIst
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component('empty-data', EmptyData)
Vue.component('v-chart', VueECharts)
Vue.prototype.$echarts = Echarts
/* eslint-disable no-new */

// 引入公共信息文件
Vue.prototype.AppConfig = app_config
Vue.prototype.$axios = axios
Vue.prototype.AppData = AppData
DateFormat.init()

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
