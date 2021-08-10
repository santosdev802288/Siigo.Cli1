const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {

    resolve: {
        extensions: ['.ts', '.js'],
    },

    mode: 'development',

    entry: {
        seed: './src/tests/seed.ts',
        test: './src/tests/test.ts',
        'test.grpc': './src/tests/test.grpc.ts',
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
    plugins: [
        new CopyPlugin({
          patterns: [
            { from: path.resolve(__dirname, "src", "definitions"), to: "definitions" },
          ],
        }),
      ],

    // target: 'web',
    externals: /k6(\/.*)?/,
    devtool: 'source-map',
};