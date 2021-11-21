import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import BusaoCrud from '../components/BusaoCrud'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/horarios',
    component: BusaoCrud
    
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
