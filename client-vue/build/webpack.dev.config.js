const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const webpack = require('webpack')

module.exports = merge(base, {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client',
    base.entry
  ],
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new webpack.HotModuleReplacementPlugin()
    // new BundleAnalyzerPlugin({})
  ]
})