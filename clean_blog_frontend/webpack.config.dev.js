const Merge = require("webpack-merge");
const BaseConfig = require("./webpack.config.js");

module.exports = Merge(BaseConfig, {
    "devtool" : "inline-source-map"
});
