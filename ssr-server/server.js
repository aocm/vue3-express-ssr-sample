const fs = require('fs')
const path = require('path')
const express = require('express')
const yamanikoRouter = require('./src/api/controller/yamabikoController')

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD

async function createServer(
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
  app.use(express.json())

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
  
  app.use('/api/yamabiko', yamanikoRouter)

  app.use('/test', async (req, res, next) => {
    console.log(req.body)
    res.json({test: "test"})
  })
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
      const appHtml = await render(url,manifest)

      // 5. アプリケーションでレンダリングされた HTML をテンプレートに挿入します。
      const html = template.replace(`<!--ssr-outlet-->`, appHtml)

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

if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(3000, () => {
      console.log('start http://localhost:3000')
    })
  )
}