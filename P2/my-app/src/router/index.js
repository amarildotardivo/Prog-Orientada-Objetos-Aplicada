import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import BusaoCrud from '../components/BusaoCrud'
import Opcao from '../components/Opcao'


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
    
  },
  {
    path: '/opcao',
    component: Opcao
    
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
