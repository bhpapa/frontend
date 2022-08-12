import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Ppage from '../components/ppage/Ppage.vue'
import Article from '../components/article/Article.vue'
import Setting from '../components/setting/Setting.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { 
    path: '/home', 
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/ppage', component: Ppage },
      { path: '/article', component: Article },
      { path: '/setting', component: Setting }
    ] 
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const ActivePTJYUser = window.localStorage.getItem('ActivePTJYUser')
  if (!ActivePTJYUser) return next('/login')
  next()
})

export default router
