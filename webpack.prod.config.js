const path = require('path');
const webpack = require('webpack');
const {CheckerPlugin} = require('awesome-typescript-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    devtool: false,
    mode: 'production',
    entry: ['./resources/typescript/main.ts', './resources/scss/main.scss'],
    optimization: {
        splitChunks: {
            cacheGroups: {
                style: {
                    name: 'style',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/style.css",
        }),
        new webpack.DefinePlugin({
            DEV: false
        }),
        new CheckerPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new OptimizeCSSAssetsPlugin({}),
        new UglifyJsPlugin({
            uglifyOptions: {
                sourceMap: false,
                compress: {
                    sequences: true,
                    dead_code: true,
                    conditionals: true,
                    booleans: true,
                    unused: true,
                    if_return: true,
                    join_vars: true,
                    drop_console: true
                },
                mangle: {
                    reserved: ['$super', '$', 'exports', 'require']
                },
                output: {
                    comments: false
                }
            }
        }),
        new CopyWebpackPlugin([
            {from: './resources/assets', to: 'assets'}
        ])
    ],
    resolve: {
        extensions: ['.ts', '.js', '.css', '.scss', '.sass'],
        modules: ["node_modules"],
        alias: {
            Php: path.join(__dirname, "src/modules"),
            Ts: path.join(__dirname, "resources/typescript"),
            Modules: path.join(__dirname, "resources/typescript/Modules"),
            Interfaces: path.join(__dirname, "resources/typescript/interfaces"),
            Utils: path.join(__dirname, "resources/typescript/Utils")
        },
    },
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, 'public/'),
        publicPath: '/public/'
    },
    module: {
        rules: [
            {
                test: /\.(jpg|jpeg|gif|png|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: 'assets/images/[name].[ext]',
                        limit: 5 * 1024,
                    },
                },
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: 'assets/fonts/[name].[ext]',
                        limit: 5 * 1024,
                    },
                },
            },
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "node_modules/bootstrap/js/src/")
                ],
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'awesome-typescript-loader',
                    options: {
                        configFileName: path.resolve(__dirname, 'tsconfig.json'),
                        declaration: false,
                        useBabel: true,
                        useCache: false,
                        babelCore: "@babel/core",
                        removeComments: true,
                        sourceMap: false,
                    },
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: "css-loader", options: { minimize: true }},
                    {loader: "postcss-loader"},
                    'resolve-url-loader',
                    {loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            includePaths: ['./resources/scss/', './node_modules'],
                        }
                    }
                ]
            }
        ]
    }
};