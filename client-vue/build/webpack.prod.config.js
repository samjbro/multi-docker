const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const webpack = require('webpack')
const CompressionPlugin = require('compress-webpack-plugin')

module.exports = merge(base, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new CompressionPlugin()
  ]
})