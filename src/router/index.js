import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import leaflet from '../components/Leaflet.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/leaflet',
    name: 'custom',
    component: leaflet
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
