const express = require('express')

const app = express()

const webpackConfig = require('./build/webpack.dev.config.js')

const compiler = require('webpack')(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath
})
app.use(require('webpack-hot-middleware')(compiler))
app.use(require('connect-history-api-fallback')())
app.use(devMiddleware)

app.listen(3000, err => {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening on port 3000')
})