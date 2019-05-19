const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
    devtool: "source-map",
    entry: "./src/javascripts/phoneBook.js",
    output: {
        filename: "script.js",
        path: path.resolve(__dirname, "public/dist")
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader, "css-loader", "sass-loader"
            ]
        }, {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader, "css-loader"
            ]
        }, {
            test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)$/,
            use: "file-loader?name=[path][name].[ext]?[hash]"
        }, {
            test: /\.vue$/,
            use: "vue-loader"
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"]
                }
            }
        }
        ]
    },
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.esm.js"
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "styles.css"
        }),
    ],
    devServer: {
        // historyApiFallBack: true,
        // contentBase: path.join(__dirname, "views/"),
        // compress: true,
        host: 'localhost',
        port: 8080,
        proxy: [{
            path: '*',
            target: 'http://localhost:3000',
            secure: false
        }]
    }
};