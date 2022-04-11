import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Yamabiko from '../pages/Yamabiko.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/yamabiko',
    name: 'Yamabiko',
    component: Yamabiko,
  },
]

export function createRouter() {
  return _createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
  })
}
