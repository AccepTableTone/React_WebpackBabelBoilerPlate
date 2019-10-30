/**from node - get path and file systme */
var path = require("path");
const fs = require("fs");
/**to make a copy of our html page with the js references */
var HtmlWebpackPlugin = require("html-webpack-plugin");
//const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//  .BundleAnalyzerPlugin;
/**ahhhhh webpack   e!--[../] */
const webpack = require("webpack");
/**we want to sort out the paths for any each alias we create */
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const isDevelopment = process.env.NODE_ENV !== "production";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: ["./index.js"],
    module: {
        rules: [
            { test: /\.(js|jsx)$/, use: "babel-loader" },
            //{ test: /\.css$/, use: ["style-loader", "css-loader"] },
            {
                test: /\.(sa|sc)ss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            }
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
    mode: isDevelopment ? "development" : "production",
    plugins: [
        /**uncomment this to get the bundle analysis page when running or building */
        // new BundleAnalyzerPlugin(),
        new HtmlWebpackPlugin({
            template: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "css/site.css"
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
