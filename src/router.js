import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import Welcome from './views/welcome/Welcome.vue'
import User from '@/views/user/User'

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
      redirect: {path: 'welcome'},
      children: [
        {
          path: 'welcome',
          name: 'Welcome',
          component: Welcome
        },
        {
          path: 'user',
          name: 'User',
          component: User
        }
      ]
    }
  ]
})
