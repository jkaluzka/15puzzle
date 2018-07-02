const path = require('path');

module.exports = {
  contentBase: path.resolve(__dirname, '../src'),
  host: process.env.DEV_SERVER_HOST || 'localhost',
  port: process.env.DEV_SERVER_PORT || 8080,
  lazy: true,
};
