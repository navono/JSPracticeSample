const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const PORT = 9999;

module.exports = {
  entry: path.resolve(__dirname, './react/index.js'),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './build')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Wellcom webpack',
      template: path.resolve(__dirname, './index.html')
    }),
    // 启用 HMR
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({
      url: `http:\\localhost:${PORT}`
    })
  ],
  devServer: {
    historyApiFallback: true,
    // 告诉 dev-server 在使用HMR
    hot: true,
    contentBase: path.resolve(__dirname, './build'),
    publicPath: '/',
    port: PORT
  }
}
