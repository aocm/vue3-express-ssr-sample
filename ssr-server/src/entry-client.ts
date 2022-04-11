import { createSSRApp } from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import store from './store'

const app = createSSRApp(App)
const router = createRouter()

app.use(store)
app.use(router)

router.isReady().then(() => {
  app.mount('#app')
})
