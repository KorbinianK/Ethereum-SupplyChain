// // webpack v4
// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const WebpackMd5Hash = require('webpack-md5-hash');
// // const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const DEV_MODE = process.env.NODE_ENV !== 'production';
// const webpack = require('webpack');

// module.exports = {
//   devtool: DEV_MODE ? "eval" : "source-map",
//   entry: {
//     main: "./src/index.js",
//     vendor: ["jquery", "popper", "bootstrap"]
//   },
//   output: {
//     path: path.resolve(__dirname, "dist"),
//     filename: "[name].[chunkhash].js"
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loader: "babel-loader"
//       },
//       {
//         test: /\.scss$/,
//         use: DEV_MODE
//           ? [
//               "style-loader",
//               {
//                 loader: "css-loader",
//                 options: {
//                   sourceMap: true
//                 }
//               },
//               {
//                 loader: "sass-loader",
//                 options: {
//                   sourceMap: true
//                 }
//               }
//             ]
//           : ExtractTextPlugin.extract({
//               fallback: "style-loader",
//               use: ["css-loader", "sass-loader"]
//             })
//       },
//       {
//         test: /\.(gif|png|jpe?g|svg)$/i,
//         use: [
//           {
//             loader: "url-loader",
//             options: {
//               limit: 8192,
//               name: "public/[name].[ext]?[hash:7]"
//             }
//           },
//           {
//             loader: "image-webpack-loader",
//             options: {
//               bypassOnDebug: true,
//               mozjpeg: {
//                 progressive: true,
//                 quality: 75
//               }
//             }
//           }
//         ]
//       },
//       {
//         test: /\.html$/,
//         use: [
//           {
//             loader: "html-loader",
//             options: {
//               attrs: [":data-src"],
//               minimize: true
//             }
//           }
//         ]
//       }
//     ]
//   },
//   plugins: [
//     new CleanWebpackPlugin(["dist"]),
//     new ExtractTextPlugin({
//       filename: "style.[contenthash].css"
//     }),
//     new HtmlWebpackPlugin({
//       inject: false,
//       hash: true,
//       template: "./src/index.html",
//       filename: "index.html",
//       minify: !DEV_MODE && {
//         collapseWhitespace: true,
//         preserveLineBreaks: true,
//         removeComments: true
//       }
//     }),
//     new WebpackMd5Hash(),
//     new webpack.ProvidePlugin({
//       $: "jquery",
//       jQuery: "jquery",
//       jquery: "jquery",
//       "window.jQuery": "jquery",
//       "window.$": "jquery",
//       "window.Tether": "tether",
//       Tether: "tether"
//     })
//   ]
// };





const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

const DEV_MODE = process.env.NODE_ENV === 'dev';

module.exports = {
    devtool: DEV_MODE ? 'eval' : 'source-map',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].[chunkhash].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: DEV_MODE
                    ? [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                    ]
                    : ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'sass-loader'],
                    }),
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'public/[name].[ext]?[hash:7]',
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true,
                            mozjpeg: {
                                progressive: true,
                                quality: 75,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: [':data-src'],
                            minimize: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new WebpackMd5Hash(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'windows.jQuery': 'jquery',
        }),
        new CopyWebpackPlugin([
            {
                from: './public',
                to: 'public',
            },
        ]),
        new HtmlWebPackPlugin({
            template: './src/index.html',
            favicon: '',
            minify: !DEV_MODE && {
                collapseWhitespace: true,
                preserveLineBreaks: true,
                removeComments: true,
            },
        }),
        new ExtractTextPlugin('styles.[contenthash].css'),
    ],
};