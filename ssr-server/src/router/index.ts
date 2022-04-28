import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router'
import Home from '../pages/HomePage.vue'
import About from '../pages/AboutPage.vue'
import Yamabiko from '../pages/YamabikoPage.vue'
import YamabikoResponse from '../components/YamabikoResponse.vue'
import YamabikoHistory from '../components/YamabikoHistory.vue'
import { metas } from '../metas/index.js'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {...metas['/']}
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {...metas['/about']}
  },
  {
    path: '/yamabiko',
    name: 'Yamabiko',
    component: Yamabiko,
    meta: {...metas['/yamabiko']}
  },
  {
    path: '/history',
    name: 'history',
    component: YamabikoHistory,
    meta: {...metas['/history']}
  },
  {
    path: '/yamabiko-res',
    name: 'YamabikoResponse',
    component: YamabikoResponse,
    meta: {...metas['/yamabiko-res']}
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
