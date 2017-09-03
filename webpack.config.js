const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const PORT = 9999;

module.exports = {
  devtool: 'source-map',
  // entry: path.resolve(__dirname, './react/components/HOC/index.js'),
  // entry: path.resolve(__dirname, './echarts/twoGrid.js'),
  // entry: path.resolve(__dirname, './ReactInternal/Feact.js'),
  // entry: path.resolve(__dirname, './echarts/dynamicData.js'),
  entry: path.resolve(__dirname, './basicSyntaxSample/Understanding-ES6/Destructuring.js'),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './build')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: () => [require('autoprefixer')]
          }}]
      },
      {
        test: /\.scss/,
        use: ['style-loader','css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: () => [require('autoprefixer')]
          }}, 'sass-loader']
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
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: true,
    //   warnings: false,
    //   mangle: true
    // })
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
