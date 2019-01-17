const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client',
    path.resolve(__dirname, './src/index.js')
  ],
  output: {
    publicPath: "http://localhost:8080/"
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      '#': path.resolve(__dirname, './assets/scss')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.scss$/,
        loaders: ['vue-style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new HTMLPlugin({
      filename: 'index.html',
      template: 'index.template.html',
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin()
  ]
}