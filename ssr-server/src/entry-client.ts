import {createApp} from './main'
const {app, router } = createApp()

app.use(router)
router.isReady().then(() => {
  app.mount('#app')
})
