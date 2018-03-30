const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function getAbsPath(_path) {
    return path.resolve(__dirname, './',  _path);
}

const PUBLIC_PATH = '/static/';

module.exports = function(options) {
    options = options || {};

    const commonRules = [
        {
            test: /\.js$/,
            include: [
                getAbsPath('src'),
            ],
            use: ['babel-loader']
        },
        {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
              context: getAbsPath('assets/images'),
              name: '[path][name].[ext]',
              publicPath: `${PUBLIC_PATH}images/`,
              outputPath: 'images/',
            }
        },
        {
            test: /\.(scss|sass)$/,

            // github.com/webpack-contrib/extract-text-webpack-plugin#options
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    {
                        // github.com/webpack-contrib/css-loader#options-1
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 3,
                            camelCase: true,
                            minimize: false,
                            /* https://github.com/webpack-contrib/css-loader/issues/101 */
                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            // incluePaths is to resolve sass imports in node_modules
                            // Uncomment when required
                            // includePaths: [ getAbsPath('node_modules') ]
                        }
                    },
                ],
            })
        },
        {
            test: /\.(css)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    /*
                        Not including postcss and autoprefixer plugin for .css files
                        Assuming css files would be vendor files and will already be prefixed
                    */
                    {
                        // github.com/webpack-contrib/css-loader#options-1
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                        }
                    }
                ]
            })
        }
    ];

    const commonPlugins = [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true,
        }),

        // For generating index.html github.com/jantimon/html-webpack-plugin#configuration
        new HtmlWebpackPlugin({
          template: getAbsPath('src/index.html'),
        }),

        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            comments: false,
        }),
    ];

    return {
        // webpack.js.org/configuration/devtool/#devtool
        devtool: 'eval',

        //All ./ paths are resolved relative to this
        context: getAbsPath('src'),

        entry: {
            app: ['./index.js'],
        },

        output: {
            path: getAbsPath('dist/'),
            filename: '[name].js',
            publicPath: PUBLIC_PATH,
        },

        resolve: {
            modules: [
              './',
              'node_modules',
            ],
            alias: {
                images: getAbsPath('assets/images'),
                fonts: getAbsPath('assets/fonts'),
            }
        },

        module: {
            rules: commonRules
        },

        watchOptions: {
            ignored: /node_modules/
        },

        plugins: commonPlugins,

        stats: {
            children: false,
        },

    };
}
