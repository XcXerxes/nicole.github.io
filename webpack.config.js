const { resolve } = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const webpackMerge = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const prod = process.env.NODE_ENV === 'production'

// Obiekt konfiguracyjny webpacka
const webpackConfig = {

    // entry point
    entry: "./src/main.js",

    // output object
    output: {

        // dla właściwości path musimy podać ścieżkę absolutną (patrz import modułu path)
        path: resolve(__dirname, "./dist"),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@': resolve('src')
        }
    },
    // Modules
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(scss|css)$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                minimize: true,
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [
                                    require('autoprefixer')({
                                        browsers: [
                                            '>1%',
                                            'last 4 versions',
                                            'Firefox ESR',
                                            'not ie < 9', // React doesn't support IE8 anyway
                                        ],
                                        flexbox: 'no-2009',
                                    }),
                                ],
                            },
                        },
                            'sass-loader'
                        
                    ]
                })
            },

            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: "[name].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader'
              },
            // HANDLEBARS LOADER (optional)
            {
                test: /\.hbs$/,
                exclude: /node_modules/,
                use: {
                    loader: "handlebars-template-loader"
                }
            },
            {
                test: /\.art$/,
                include: path.resolve(__dirname, 'src/pages'),
                loader: 'art-template-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin('dist'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new ExtractTextPlugin("main.css"),
        new HtmlWebpackPlugin({
            template: './index.html',
            title: 'nicole'
        })
    ],

    node: {
        fs: "empty" // avoids error messages (check documentation: https://github.com/emaphp/handlebars-template-loader)
    }

};
module.exports = prod ? webpackMerge(webpackConfig, {
    plugins: [
        new webpack.optimize.SplitChunksPlugin({
            chunks: 'all',
            minimize: 0,
            minChunks: 1,
             maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                vendor: {
                    test: /[\\/]jquery|bootstrap[\\/]/,
                    priority: -10,
                    name: 'vendor'
                }
            }
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/) ,
        new BundleAnalyzerPlugin()
    ]
    // optimization: {
    //     splitChunks: {
    //       chunks: "initial",         // 必须三选一： "initial" | "all"(默认就是all) | "async"
    //       minSize: 0,                // 最小尺寸，默认0
    //       minChunks: 1,              // 最小 chunk ，默认1
    //       maxAsyncRequests: 1,       // 最大异步请求数， 默认1
    //       maxInitialRequests: 1,    // 最大初始化请求书，默认1
    //       name: () => {},              // 名称，此选项课接收 function
    //       cacheGroups: {                 // 这里开始设置缓存的 chunks
    //         priority: "0",                // 缓存组优先级 false | object |
    //         vendor: {                   // key 为entry中定义的 入口名称
    //           chunks: "initial",        // 必须三选一： "initial" | "all" | "async"(默认就是异步)
    //           test: /Jquery$/,     // 正则规则验证，如果符合就提取 chunk
    //           name: "vendor",           // 要缓存的 分隔出来的 chunk 名称
    //           minSize: 0,
    //           enforce: true,
    //           maxAsyncRequests: 1,       // 最大异步请求数， 默认1
    //           maxInitialRequests: 1,    // 最大初始化请求书，默认1
    //           reuseExistingChunk: true   // 可设置是否重用该chunk（查看源码没有发现默认值）
    //         }
    //       }
    //     }
    //   },
}) : webpackConfig