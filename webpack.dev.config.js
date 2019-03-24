const path = require('path');
const webpack = require('webpack');
const {CheckerPlugin} = require('awesome-typescript-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// function test(options) {}
// test.prototype.apply = function(compiler) {
//     compiler.plugin('done', function() {
//         console.log('\x1Bc');
//     });
//     compiler.hooks.afterCompile.tap('clear', () => {
//         console.log('\x1Bc');
//     })
// };

function srcPath(subdir) {
    return path.join(__dirname, "src", subdir);
}

module.exports = {
    mode: 'development',
    devtool: 'source-map',
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
    stats: { children: false },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/style.css",
        }),
        new webpack.DefinePlugin({
            DEV: true
        }),
        new CheckerPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new CopyWebpackPlugin([
            {from: './resources/assets', to: 'assets'}
        ]),
    ],
    resolve: {
        extensions: ['.ts', '.js', '.css', '.scss'],
        modules: ["node_modules"],
        alias: {
            Ts: path.join(__dirname, "resources/typescript"),
            Components: path.join(__dirname, "resources/typescript/Components"),
            Interfaces: path.join(__dirname, "resources/typescript/Interfaces"),
        },
    },
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, 'public/build/'),
        publicPath: '/public/build/',
        pathinfo: false
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /(node_modules|\.spec\.ts$)/,
                enforce: 'post',
                use: {
                    loader: 'istanbul-instrumenter-loader',
                    options: {
                        esModules: true
                    }
                },
            },
            {
                test: /\.(jpg|jpeg|gif|png|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: 'assets/images/[name].[ext]',
                        limit: 1024,
                    },
                },
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: 'assets/fonts/[name].[ext]',
                        limit: 1024,
                    },
                },
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/fonts/[name].[ext]',
                        limit: 1024,
                    },
                }
            },
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "node_modules/bootstrap/js/src/")
                ],
                use: {
                    loader: 'babel-loader',
                }
            },
            // {
            //     test: /\.ts$/,
            //     enforce: 'pre',
            //     use: [
            //         {
            //             loader: 'tslint-loader',
            //             options: {
            //                 "format": "codeFrame",
            //                 "formatter": "codeFrame"
            //             }
            //         }
            //     ]
            // },
            // {
            //     test: /\.js$/,
            //     enforce: 'pre',
            //     use: [
            //         {
            //             loader: 'eslint-loader'
            //         }
            //     ]
            // },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: path.resolve(__dirname, 'tsconfig.json'),
                            declaration: false,
                            useBabel: true,
                            useCache: true,
                            babelCore: "@babel/core",
                        },
                    },

                ],
            },
            {
                test: /\.(scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {loader: "postcss-loader", options: {sourceMap: 'inline'}},
                    {loader: "fast-sass-loader",
                        options: {
                            includePaths: ['./resources/scss/', './node_modules'],
                            // outputStyle: 'expanded'
                        }
                    },
                    'resolve-url-loader'
                ]
            }
        ]
    }
};