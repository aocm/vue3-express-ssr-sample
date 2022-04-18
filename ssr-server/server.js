import fs from 'fs'
import path from 'path'
import express from 'express'
import session from 'express-session'
import yamanikoRouter from './src/api/controller/yamabikoController'
import { logger } from './src/log/logger'

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD

export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production'
) {
  const resolve = (p) => path.resolve(__dirname, p)
  const indexProd = isProd
    ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
    : ''
  const manifest = isProd
    ? // @ts-ignore
    require('./dist/client/ssr-manifest.json')
    : {}
  const app = express()
  const sess = {
    secret: 'secretkey',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: true,
  }
  // app.set('trust proxy', 1)
  // sess.cookie.secure = true
  app.use(session(sess))
  app.get('/session/test', (req, res) => {
    if (req.session.views) {
      req.session.views++
    } else {
      req.session.views = 1
    }
    res.send('views : ' + req.session.views)
  })
  app.use(express.json())
  //. 全てのapiリクエストに対して前処理
  app.use('/api/*', function(req, res, next){
    logger.debug(req.originalUrl)
    next() //. 個別処理へ
  })
  app.use('/api/yamabiko', yamanikoRouter)

  app.use('/test', async (req, res) => {
    logger.info(req.body)
    res.json({test: 'test'})
  })

  if (isTest) return { app }// Jest実行時はviteをテストしない

  // -----ここから下はVue+Vite-----
  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite
  if (!isProd) {
    vite = await require('vite').createServer({
      root,
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: 'ssr',
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100
        }
      }
    })
    // use vite's connect instance as middleware
    app.use(vite.middlewares)
  } else {
    app.use(require('compression')())
    app.use(
      require('serve-static')(resolve('dist/client'), {
        index: false
      })
    )
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      // 1. index.html を読み込む
      // 2. Vite を使用して HTML への変換を適用します。これにより Vite の HMR クライアントが定義され
      //    Vite プラグインからの HTML 変換も適用します。 e.g. global preambles
      // 3. サーバサイドのエントリポイントを読み込みます。 vite.ssrLoadModule は自動的に
      //    ESM を Node.js で使用できるコードに変換します! ここではバンドルは必要ありません
      //    さらに HMR と同様に効率的な無効化を提供します。
      // https://github.com/vitejs/vite/blob/main/packages/playground/ssr-vue/server.js
      let template, render
      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve('index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.ts')).render
      } else {
        template = indexProd
        render = require('./dist/server/entry-server.js').render
      }

      // 4. アプリケーションで HTML をレンダリングします。これは entry-server.js からエクスポートされた `render` を使用しています。
      //    関数は適切なフレームワーク SSR API を呼び出します。
      //    e.g. ReactDOMServer.renderToString()
      const [appHtml, preloadLinks] = await render(url, manifest, req.session)
      // 5. アプリケーションでレンダリングされた HTML をテンプレートに挿入します。
      const html = template
        .replace('<!--preload-links-->', preloadLinks)
        .replace('<!--app-html-->', appHtml)
      // 6. レンダリングされた HTML をクライアントに送ります。
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      // エラーが検出された場合は、Vite に stracktrace を修正させて、次のようにマップします。
      vite.ssrFixStacktrace(e)
      next(e)
    }
  })

  return { app, vite }
}

logger.info('isTest : ', isTest)
if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(3000, () => {
      logger.info('start http://localhost:3000')
    })
  )
}