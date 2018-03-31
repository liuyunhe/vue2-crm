import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '../pages/Login.vue'
import Home from '../pages/Home.vue'
import NotFound from '../pages/404.vue'
import LandingPageSetting from '../pages/tfgl/LandingPageSetting.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: '投放管理',
      component: Home,
      children:[
        {
          path: '/LandingPageSetting',
          name: '落地页设置',
          component: LandingPageSetting,
        }
      ]
    },
    {
      path:'/404',
      name:'404',
      component:NotFound
    },
    {
      path: '*',
      hidden: true,
      redirect: { path: '/404' }
    }
  ]
})
