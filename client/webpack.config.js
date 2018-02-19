const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const autoprefixer = require("autoprefixer");
const precss = require("precss");

const BUILD_DIR = path.resolve(__dirname, "build");

const config = {
    entry: {
        bundle: "./src/index.js",
        vendor: ["react", "react-dom", "tether", "axios", "autoprefixer", "bootstrap",
            "popper.js", "jquery", "react-transition-group", "redux", "react-redux", "redux-thunk", "react-router-redux"],
        "font-awesome": "font-awesome/scss/font-awesome.scss"
    },
    output: {
        path: BUILD_DIR,
        filename: "[name].js",
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
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
            },
            {
                test: /react-select\.css$|tms-dashboard.+\.css$|react-datetime\.css$/,
                enforce: "pre",
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader?sourceMap"]
                })
            },
            {
                test: /\.pcss$|\.css$/,
                exclude: /react-select\.css$|tms-dashboard.+\.css$|react-datetime\.css$/,
                use: [
                    "style-loader",
                    "css-loader?sourceMap&modules&importLoaders=1&localIdentName=[path]___[name]__[local]",
                    "postcss-loader"
                ]
            },
            {
                test: /\.(scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader", // translates CSS into CommonJS modules
                        }, {
                            loader: "postcss-loader", // Run post css actions
                            options: {
                                plugins() {
                                    // post css plugins, can be exported to postcss.config.js
                                    return [
                                        precss,
                                        autoprefixer
                                    ];
                                }
                            }
                        }, {
                            loader: "sass-loader" // compiles SASS to CSS
                        }
                    ]
                })
            },
            // Bootstrap 4
            {
                test: /bootstrap\/dist\/js\/umd\//, use: "imports-loader?jQuery=jquery"
            }, // font-awesome
            {
                test: /font-awesome\.config\.js/,
                use: [
                    { loader: "style-loader" },
                    { loader: "font-awesome-loader" }
                ]
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "fonts/",    // where the fonts will go
                        publicPath: "../"       // override the default path
                    }
                }]
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),

        new webpack.optimize.CommonsChunkPlugin({ name: "vendor" }),

        new webpack.NamedModulesPlugin(),

        new ExtractTextPlugin({
            filename: "style.css"
        }),

        new webpack.ProvidePlugin({
            "window.jQuery": "jquery",
            jQuery: "jquery",
            $: "jquery",
            Tether: "tether",
            "window.Tether": "tether",
            jquery: "jquery",
            Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
            Button: "exports-loader?Button!bootstrap/js/dist/button",
            Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
            Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
            Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
            Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
            Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
            Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
            Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
            Util: "exports-loader?Util!bootstrap/js/dist/util"
        }),

        new HtmlWebPackPlugin({
            template: "./src/index.html"
        })
    ],

    devtool: "source-map",

    devServer: {
        hot: true,
        contentBase: "./build",
        historyApiFallback: true // for history push state to work
    }
};

module.exports = config;
