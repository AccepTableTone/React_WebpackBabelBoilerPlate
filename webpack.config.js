/**from node - get path and file systme */
var path = require("path");
const fs = require("fs");
/**to make a copy of our html page with the js references */
var HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
/**ahhhhh webpack   e!--[../] */
const webpack = require("webpack");
/**we want to sort out the paths for any each alias we create */
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  entry: "./index.js",
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: "babel-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] }
    ]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "main.bundle.js",
    chunkFilename: "vendors.bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"],
    /**create list of folder aliases here */
    alias: {
      components: resolveApp("./src/components/")
    }
  },
  mode: "development",
  plugins: [
    /**uncomment this to get the bundle analysis page when running or building */
    // new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ],
  /**chop the js into 2 piles */
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all"
        }
      }
    }
  }
};
