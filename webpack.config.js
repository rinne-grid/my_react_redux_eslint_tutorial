const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { 
                test: /\.js$/,
                exclude: path.resolve(__dirname, '/node_modules'),
                loader: 'babel-loader'
            },
            {
               test: /\.js$/,
               exclude: path.resolve(__dirname, '/node_models/'),
               loader: 'eslint-loader'
            }
        ]
    },
    devServer: {
        contentBase: './dist',
        port: 8080,
        inline: true,
        
    }
}