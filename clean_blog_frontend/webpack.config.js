const Webpack = require("webpack");
const BundleTracker = require("webpack-bundle-tracker");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest')
const path = require("path");
const cleanBlogRoot = path.normalize(__dirname + "/../clean_blog");

module.exports = {
  context: __dirname + '/src',
  entry : {
      // ページごとに異なるエントリポイントを設ける
      bundle   : ["./js/index.js"],
      messageSender   : ["./js/messageSender.js"]
  },
  output: {
    path: cleanBlogRoot + "/static/webpack_bundles",
    filename: "[name]-[hash].js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          use: ['css-loader?minimize']
        })
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: ["url-loader?limit=10000&mimetype=application/font-woff","file-loader"] },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: ["file-loader"] }
    ]
  },
  plugins: [
    new Webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
    }),
    new CleanWebpackPlugin(["static/webpack_bundles"],{ root: cleanBlogRoot, verbose: true }),
    new Webpack.optimize.UglifyJsPlugin(),
    new BundleTracker({filename: "../clean_blog/static/webpack-stats.json"}),
    new WorkboxPlugin({
        globDirectory : cleanBlogRoot + "/static",
        globPatterns: ['**/*.{js,css,ttf,svg,eot,woff2}'],
        globIgnores: ['**/*.min.{js,css}',"**/workboc-sw*.{js}"],
         modifyUrlPrefix: {
          'webpack_bundles': 'static/webpack_bundles',
          'js': 'static/js',
        },
        swSrc:  __dirname + '/src/js/serviceWorker.js',
        swDest: cleanBlogRoot + "/templates/serviceWorker.js"
    }),
    new ExtractTextPlugin({
      filename: '[name]-[hash].css',
    }),
    new WebpackPwaManifest({
        filename: "manifest.json",
        name: 'www.monotalk.xyz',
        short_name: 'monotalk',
        description: '日々の書き込み',
        background_color: '#ffffff',
        start_url: "https://www.monotalk.xyz/?utm_source=homescreen",
        display: "standalone",
        theme_color: "#808080",
        icons: [
                {
                  src: path.resolve('src/icon/icon.png'),
                  sizes: [96, 128, 144, 192, 256, 384, 512] // multiple sizes
                }
        ]
    })
  ]
}
