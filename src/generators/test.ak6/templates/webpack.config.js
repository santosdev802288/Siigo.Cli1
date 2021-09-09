const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['.ts', '.js'],
    },
    mode: 'production',
    entry: {
        test: './src/tests/test.ts',
        seed: './src/tests/seed.ts',
        "seed-distributed": './src/tests/seed-distributed.ts',
    },
    optimization: {
        minimizer: [new UglifyJsPlugin()],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                // exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [['@babel/typescript']],
                    plugins: [
                        '@babel/proposal-class-properties',
                        '@babel/proposal-object-rest-spread'
                    ]
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    // target: 'web',
    externals: /k6(\/.*)?/,
    devtool: 'source-map',
};
