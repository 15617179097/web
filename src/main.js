import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import echarts from 'echarts'

import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'

import './assets/css/base.css'
import './assets/iconfont.css'

axios.defaults.baseURL = 'http://127.0.0.1:8001/'
axios.defaults.withCredentials = true
axios.interceptors.request.use(config => {
  if (window.sessionStorage.getItem('token'))
    config.headers.Authorization = window.sessionStorage.getItem('token')
  return config;
})
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

//判断是否token过期
axios.interceptors.response.use(res =>{
  console.log(window.sessionStorage.getItem('token'));
  
  if(res.data.code===401){ 
    window.sessionStorage.removeItem("token")
    Vue.prototype.$message({
      type: "error",
      message: "身份已过期，请重新登录"
    });
    router.replace('/login')
    return ;
  }
  console.log(res.data.code);
  return res;
  
 })
Vue.prototype.$http = axios
Vue.prototype.$qs = qs

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
