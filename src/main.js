import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'

Vue.use(ElementUI)
Vue.config.productionTip = false

// 注册全局守卫,作用是在路由跳转前，对路由进行判断，防止未登录的用户的跳转到其他页面
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('myToken')
  // 如果有token，证明登录过
  if(token) {
    // 自己向下执行
    next()
  } else {
    // 如果没有token，并且访问的不是login页面，强制跳转到login页
    if (to.path !== '/login') {
      next({path: '/login'})
    } else {
      // 是login页, 就不干扰用户操作
      next()
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
