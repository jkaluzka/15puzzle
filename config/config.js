const devServerConfig = require('./devServer');
const pluginsConfig = require('./plugins');
const moduleConfig = require('./module');

module.exports = {
  devServer: devServerConfig,
  plugins: pluginsConfig,
  module: moduleConfig
};
