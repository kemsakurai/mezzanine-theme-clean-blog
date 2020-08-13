const Webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {InjectManifest} = require('workbox-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const cleanBlogRoot = path.normalize(__dirname + '/../clean_blog');
const config = require('./site-config');

module.exports = {
  mode: 'development',
  context: __dirname + '/src',
  entry: {
    pjax: ['./js/pjax.js'],
    contact: ['./js/contact.js'],
    bundle: ['./js/index.js'],
  },
  output: {
    path: cleanBlogRoot + '/static/webpack_bundles',
    filename: '[name]-[hash].js',
    crossOriginLoading: 'anonymous',
    publicPath: '/static/webpack_bundles/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff'},
      {test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader'},
      {test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {loader: 'file-loader'},
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                {removeXMLNS: true},
                {removeOffCanvasPaths: true},
                {removeDimensions: true},
                {reusePaths: true},
              ],
            },
          },
        ]},
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test(mod/* , chunk */) {
            if (mod.context.includes('node_modules')) {
              if (['turbolinks'].some((str) => mod.context.includes(str))) {
                return false;
              }
              return true;
            }
            return false;
          },
          name: 'vendor',
          chunks: 'initial',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new Webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new CleanWebpackPlugin({verbose: true}),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css',
    }),
    new BundleTracker({filename: '../clean_blog/static/webpack-stats.json'}),
    new InjectManifest({
      swSrc: __dirname + '/src/js/serviceWorker.js',
      swDest: cleanBlogRoot + '/templates/serviceWorker.js',
    }),
    new WebpackPwaManifest({
      filename: 'manifest.json',
      name: config.pwaManifest.name,
      short_name: config.pwaManifest.shortName,
      description: config.pwaManifest.description,
      background_color: config.pwaManifest.backgroundColor,
      start_url: config.pwaManifest.startUrl,
      display: config.pwaManifest.display,
      theme_color: config.pwaManifest.themeColor,
      icons: [
        {
          src: path.resolve('src/icon/icon.png'),
          sizes: [96, 128, 144, 192, 256, 384, 512], // multiple sizes
        },
      ],
      gcm_sender_id: '482941778795',
      gcm_sender_id_comment: 'Do not change the GCM Sender ID',
      related_applications: config.pwaManifest.relatedApplications,
      prefer_related_applications: config.pwaManifest.preferRelatedApplications,
    }),
  ],
};
