const Merge = require("webpack-merge");
const BaseConfig = require("./webpack.config.js");
const TerserPlugin = require('terser-webpack-plugin');   

module.exports = Merge(BaseConfig, {
    plugins: [],        
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
        ],
    },
});
