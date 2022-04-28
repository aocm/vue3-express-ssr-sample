import App from './App.vue'
import { createSSRApp } from 'vue'
import { createRouter } from './router'

// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.

export function createApp() {
  const app = createSSRApp(App)
  const router = createRouter()
  router.beforeEach((to, from) => {
    const isServer = import.meta.env.SSR
    if(!isServer) {window.document.title = to.meta.title || 'Apps'}
  })
  app.use(router)
  return { app, router }
}
