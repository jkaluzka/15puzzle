const path = require('path');
const webpack = require('webpack');
require('dotenv').config();

const config = require('./config/config');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './app.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  devServer: config.devServer,
  module: config.module,
  plugins: config.plugins
};
