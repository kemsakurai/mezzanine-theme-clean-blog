const { merge }  = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const BaseConfig = require('./webpack.config.js');

module.exports = merge(BaseConfig, {
  'devtool': 'inline-source-map',
  'plugins': [
    new BundleAnalyzerPlugin(),
  ],
});
