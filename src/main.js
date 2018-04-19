// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
//引入ElementUI
import './assets/theme/theme-crm/index.css'
import ElementUI from 'element-ui';
//引入api配置文件
import api from './api/api'
// import Mock from './mock'
// Mock.bootstrap();

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.prototype.$api = api;

router.beforeEach((to, from, next) => {
  //登录规则
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
