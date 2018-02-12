const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const BUILD_DIR = path.resolve(__dirname, "build");

const config = {
    entry: {
        bundle: "./src/index.js",
        vendor: ["react", "react-dom"]
    },
    output: {
        path: BUILD_DIR,
        // filename: "[name].[chunkhash].js",
        // chunkFilename: "[name].[chunkhash].js",
        filename: "[name].js",
        publicPath: "build/"
    },
    module: {
        rules: [
            {
                use: "babel-loader",
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.pcss$|\.css$/,
                enforce: "pre",
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        "css-loader?sourceMap&modules&importLoaders=1&localIdentName=[path]___[name]__[local]",
                        "postcss-loader"
                    ]
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [{ loader: "url-loader", options: { limit: 40000 } }, "image-webpack-loader"]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),

        new webpack.optimize.CommonsChunkPlugin({ name: "vendor" }),

        new webpack.NamedModulesPlugin(),

        new ExtractTextPlugin({
            allChunks: true,
            filename: "style.css"
        }),

        new webpack.ProvidePlugin({
            "window.jQuery": "jquery",
            jQuery: "jquery",
            $: "jquery",
            jquery: "jquery"
        }),

        new HtmlWebPackPlugin({
            template: "./src/index.html"
        })
    ],

    devtool: "source-map",

    devServer: {
        contentBase: "./build"
    }
};

module.exports = config;
