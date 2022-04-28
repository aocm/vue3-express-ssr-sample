import { logger } from './src/log/logger'
import { createDevServer, createProdServer } from './server'

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD
const isProd = process.env.NODE_ENV === 'production'

if (!isTest && !isProd) {
  createDevServer().then(({ app }) =>
    app.listen(3000, () => {
      logger.info('start dev http://localhost:3000')
    })
  )
} else if (isProd){
  const { app } = createProdServer()
  app.listen(3000, () => {
    logger.info('start prod http://localhost:3000')
  })
}