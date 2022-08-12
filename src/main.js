import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
// import './mock/index'
import './plugins/element.js'
import './assets/css/globel.css'
import './assets/iconFont/iconfont.css'

Vue.config.productionTip = false
// axios.defaults.baseURL = 'https://gyzqhz.upoem1.com/yjbx/'
axios.defaults.baseURL = 'http://localhost:8000/api/v1/'
// axios.defaults.baseURL = 'https://60.173.222.42:51900/api/trade/'
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
