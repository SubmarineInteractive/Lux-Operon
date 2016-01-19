import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from './webpack.config.babel.js'

const isDeveloping = process.env.NODE_ENV !== 'production'
const port = isDeveloping ? 3000 : process.env.PORT
const ip = 'localhost'

const app = express()
const compiler = webpack( config )

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
}))

app.use(webpackHotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}))

app.get( '*', (req, res) => res.sendFile( path.join( __dirname, 'index.html' ) ) )

app.listen( port, ip, error => {
  if (error) throw error

  console.info(`=> 🚧 Listening on port ${port}. Open up http://${ip}:${port}/ in your browser.`)
})