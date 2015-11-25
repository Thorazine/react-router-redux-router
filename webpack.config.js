var webpack = require('webpack');
module.exports = {
    entry: [
      "./jsx/index.jsx"
    ],
    output: {
        path: __dirname + '/public/dist',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true
        })
    ]

};