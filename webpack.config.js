const path = require('path');

module.exports = {
    entry: './client/index.js',
    mode: 'development',
    devtool: 'source-map',
    cache: true,
    output: {
        path: path.resolve(__dirname, 'assets/js/'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
};
