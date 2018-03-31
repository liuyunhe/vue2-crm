import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '../pages/Login.vue'
import Home from '../pages/Home.vue'
import NotFound from '../pages/404.vue'
import Table from '../pages/Table.vue'

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
      name: 'Home',
      component: Home,
      children:[
        {
          path: '/table',
          name: 'Table',
          component: Table,
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
