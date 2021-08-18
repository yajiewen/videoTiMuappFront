import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const del= () => import('../views/del')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/delpage',
    name: 'del',
    component: del
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
