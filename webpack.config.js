const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        config: './src/config/index.js',
        live_config: './src/live_config/index.js',
        viewer: './src/viewer/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].js'
    },
    module: {
        rules: [
            { test: /\.js/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        historyApiFallback: true,
        open: false,
        port: 8080
    }
};