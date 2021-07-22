import { createRouter, createWebHashHistory } from 'vue-router'
import Leaflet from '../components/Leaflet.vue'

const routes = [
  {
    path: '/',
    name: 'Leaflet',
    component: Leaflet
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
