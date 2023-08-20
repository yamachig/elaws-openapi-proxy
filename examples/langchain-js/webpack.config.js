const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlInlineScriptPlugin = require("html-inline-script-webpack-plugin");

/** @returns {import("webpack").Configuration} */
module.exports = (env, argv) => {
    const distDir = path.resolve(
        __dirname,
        (argv.mode === "development") ? "dist-dev" : "dist-prod",
    )
    return {
        mode: (argv.mode === "development") ? "development" : "production",
        entry: "./src/main.ts",
        output: {
            filename: "main.js",
            path: distDir,
            library: "lib",
            libraryTarget: "umd"
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: "ts-loader",
                },
            ],
        },
        resolve: {
            extensions: [
                ".ts", ".js",
            ],
        },
        plugins: [
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1,
            }),
            new HtmlWebpackPlugin({
                minify: false,
                template: "src/index.html",
            }),
            new HtmlInlineScriptPlugin(),
        ],
    };
};
