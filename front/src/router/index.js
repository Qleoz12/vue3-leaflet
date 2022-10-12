import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Circles from '../views/Circles.vue'
import Buses from '../views/Buses.vue'
import Parkings from '../views/Parkings.vue'

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
  {
    path: '/sistem',
    name: 'custom2',
    component: Buses
  },
  {
    path: '/parkings',
    name: 'custom2',
    component: Parkings
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
