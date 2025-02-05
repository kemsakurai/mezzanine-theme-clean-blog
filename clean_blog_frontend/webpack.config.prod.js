const { merge } = require('webpack-merge');
const BaseConfig = require('./webpack.config.js');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const FontminPlugin = require('fontmin-webpack');

module.exports = merge(BaseConfig, {
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: 'all',
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['advanced',
            {
              autoprefixer: {
                add: true,
                browsers: ['last 2 versions', 'ie >= 11', 'Android >= 4'],
              },
              discardComments: {removeAll: true},
              cssDeclarationSorter: {order: 'smacss'},
            },
          ],
        },
        canPrint: true,
      }),
    ],
  },
});
