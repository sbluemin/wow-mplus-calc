// webpack.config.js

var path = require('path');
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './client/index.js',
    output: {
        path: path.join(__dirname, 'app/static'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './client/index.html'
        })
    ],

    module: {
        loaders: [{
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: '/\.js$/',
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/
            }
        ]
    },

    // Create Sourcemaps for the bundle
    devtool: 'source-map'
}