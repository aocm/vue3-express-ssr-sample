import fs from 'fs'
import path from 'path'
import compression from 'compression'
import serveStatic from 'serve-static'
import { createExpressApp } from './src/express-base'

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD
const resolve = (p) => path.resolve(__dirname, p)

export async function createDevServer(root = process.cwd()) {
  const app = createExpressApp()
  if (isTest) return { app }// Jest実行時はvite/ssr処理をテストしない

  // 以下DEV用SSR処理
  const manifest ={}
  const vite = await require('vite').createServer({
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
  app.use(vite.middlewares)

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl
    try {
      const template = await vite.transformIndexHtml(url, fs.readFileSync(resolve('index.html'), 'utf-8'))
      const render = (await vite.ssrLoadModule('/src/entry-server.ts')).render
      const [appHtml, preloadLinks] = await render(url, manifest, req.session)
      const html = template
        .replace('<!--preload-links-->', preloadLinks)
        .replace('<!--app-html-->', appHtml)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      // エラーが検出された場合は、Vite に stracktrace を修正させて、次のようにマップします。
      vite.ssrFixStacktrace(e)
      next(e)
    }
  })
  return { app, vite }
}

export function createProdServer() {
  const app = createExpressApp()
  // 以下PROD用SSR処理
  const indexProd = fs.readFileSync(resolve('./client/index.html'), 'utf-8')
  const manifest = require('./client/ssr-manifest.json')
  app.use(compression())
  app.use(
    serveStatic(resolve('./client'), {
      index: false
    })
  )
  app.use('*', async (req, res, next) => {
    const url = req.originalUrl
    try {
      const template = indexProd
      const render = require('./server/entry-server.js').render
      const [appHtml, preloadLinks] = await render(url, manifest, req.session)
      const html = template
        .replace('<!--preload-links-->', preloadLinks)
        .replace('<!--app-html-->', appHtml)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      next(e)
    }
  })

  return { app }
}
