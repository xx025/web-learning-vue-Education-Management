import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/iconfont/iconfont.css'
// 导入axios库
import axios from 'axios'

axios.defaults.baseURL='http://localhost:8090/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 绑定axios库到vue中去
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
