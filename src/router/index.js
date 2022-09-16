import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Circles from '../views/Circles.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/circles',
    name: 'custom',
    component: Circles
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
