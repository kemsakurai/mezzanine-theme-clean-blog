const Webpack = require("webpack");
const BundleTracker = require("webpack-bundle-tracker");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const {InjectManifest} = require('workbox-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest')
const { GuessPlugin } = require('guess-webpack');
const path = require("path");
const cleanBlogRoot = path.normalize(__dirname + "/../clean_blog");
module.exports = {
    mode : "development",
    context: __dirname + '/src',
    entry: {
        pjax: ["./js/pjax.js"],
        contact: ["./js/contact.js"],
        bundle: ["./js/index.js"]
    },
    output: {
        path: cleanBlogRoot + "/static/webpack_bundles",
        filename: "[name]-[hash].js",
        crossOriginLoading: 'anonymous',
        publicPath: "/static/webpack_bundles/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },
    optimization: {
      splitChunks: {
        chunks (chunk) {
            // exclude `turbolinks`
            return chunk.name !== 'pjax';
        },        
        cacheGroups: {    
            default: false,
            vendor: {
              test(mod/* , chunk */) {
                    // Only node_modules are needed
                    if (!mod.context.includes('node_modules')) {
                      return false;
                    }
                    // But not node modules that contain these key words in the path
                    if (['guess'].some(str => mod.context.includes(str))) {
                      return false;
                    }
                    return true;
              },
              name: 'vendor'
            }
          }
      }
    },
    plugins: [
        new Webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new GuessPlugin({ GA: '103185238' }),
        new OptimizeCSSAssetsPlugin({}),
        new CleanWebpackPlugin({ verbose: true}),
        new MiniCssExtractPlugin({
            filename: '[name]-[hash].css',
        }),
        new BundleTracker({filename: "../clean_blog/static/webpack-stats.json"}),
        new InjectManifest({
            swSrc: __dirname + '/src/js/serviceWorker.js',
            swDest: cleanBlogRoot + "/templates/serviceWorker.js"
        }),
        new WebpackPwaManifest({
            filename: "manifest.json",
            name: 'www.monotalk.xyz',
            short_name: 'monotalk',
            description: '日々の書き込み',
            background_color: '#ffffff',
            start_url: "https://www.monotalk.xyz/?utm_source=home_screen&utm_campaign=VisitFrom-home_screen&utm_medium=pwa",
            display: "standalone",
            theme_color: "#808080",
            icons: [
                {
                    src: path.resolve('src/icon/icon.png'),
                    sizes: [96, 128, 144, 192, 256, 384, 512] // multiple sizes
                }
            ],
            gcm_sender_id: "482941778795",
            gcm_sender_id_comment: "Do not change the GCM Sender ID",
            related_applications: [],
            prefer_related_applications: false
        })
    ]
}
