const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: "./src/index.tsx",
    devtool: 'sourcemap',
    plugins: [
        new BundleAnalyzerPlugin()
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        libraryTarget: 'umd',
        publicPath: '/wp-content/themes/sahara-news-portal/assets/dist/',
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".scss", ".css"],
    },

    module: {
        rules: [
            {
                test: /\.(ts|tsx)/,
                loader: ['babel-loader', 'awesome-typescript-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: {
                    loader: 'file-loader',
                    options: {
                        name: '[hash].[ext]',
                        outputPath: 'images/',
                        publicPath: '/wp-content/themes/sahara-news-portal/assets/dist/images'
                    }
                }
            },
            {
                test: /\.(ttf|wtf|otf)$/,
                loader: {
                    loader: 'file-loader',
                    options: {
                        name: '[hash].[ext]',
                        outputPath: 'fonts/',
                        publicPath: '/wp-content/themes/sahara-news-portal/assets/dist/fonts'
                    }
                }
            }
        ]
    }
};