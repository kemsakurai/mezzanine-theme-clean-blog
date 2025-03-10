process.traceDeprecation = true;
const Webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {InjectManifest} = require('workbox-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const cleanBlogRoot = path.normalize(__dirname + '/../clean_blog');
const config = require('./site-config');
const miniSVGDataURI = require('mini-svg-data-uri');

module.exports = {
  mode: 'development',
  context: __dirname + '/src',
  entry: {
    pjax: ['./js/pjax.js'],
    bundle: ['./js/index.js'],
    vendor: ['jquery','@hotwired/turbo'],
  },
  output: {
    path: path.join(cleanBlogRoot, 'static', 'webpack_bundles'),
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
          presets: [
            ['@babel/preset-env', { targets: "defaults" }] 
          ]
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader',
        ],
      },
      {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,  type: 'asset/resource' },
      {test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, type: 'asset/resource' },
      {test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
      type: 'asset/inline',
      use: 'svgo-loader',
      generator: {
        dataUrl(content) {
            content = content.toString();
            return miniSVGDataURI(content);
          }
      }  
    }]
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: {
  //         test(mod/* , chunk */) {
  //           if (mod.context?.includes('node_modules')) {
  //             console.log()
  //             if (['@hotwired/turbo'].some((str) => mod.context?.includes(str))) {
  //               return false;
  //             }
  //             return true;
  //           }
  //           return false;
  //         },
  //         name: 'vendor',
  //         chunks: 'initial',
  //         enforce: true,
  //       },
  //     },
  //   },
  // },
  plugins: [
    new Webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new CleanWebpackPlugin({verbose: true}),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css',
    }),
    new BundleTracker({
      path: path.join(cleanBlogRoot, 'static'),
      filename: 'webpack-stats.json'
    }),
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
