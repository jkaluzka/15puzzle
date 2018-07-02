const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../src/index.html'),
    hash: false,
    filename: 'index.html',
    inject: 'body',
    minify: {
      collapseWhitespace: true
    }
  }),
];
