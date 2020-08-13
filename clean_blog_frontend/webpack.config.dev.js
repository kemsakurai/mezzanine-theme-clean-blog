const Merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const BaseConfig = require('./webpack.config.js');

module.exports = Merge(BaseConfig, {
  'devtool': 'inline-source-map',
  'plugins': [
    new BundleAnalyzerPlugin(),
  ],
});
