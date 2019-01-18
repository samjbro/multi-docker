const path = require('path')
const rootPath = require('app-root-path').path
const { VueLoaderPlugin } = require('vue-loader')
const HTMLPlugin = require('html-webpack-plugin')

const resolve = file => path.resolve(rootPath, file)

module.exports = {
  entry: resolve('src/index.js'),
  output: {
    filename: '[name].bundle.js',
    path: resolve('dist'),
    publicPath: "http://localhost:8080/"
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': resolve('src'),
      '#': resolve('assets/scss')
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
    new VueLoaderPlugin(),
    new HTMLPlugin({
      filename: 'index.html',
      template: 'build/index.template.html',
      inject: true
    }),
  ]
}