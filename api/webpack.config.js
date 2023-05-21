const path = require("path");
const webpack = require("webpack");

const JsLoader = {
  test: /\.ts$/,
  use: "ts-loader",
  exclude: /node_modules/
}

module.exports = {
    target: 'node',
    mode: "production",
    entry: path.join(__dirname, "index.ts"),
    output: {
        path: path.join(process.cwd(), "dist"),
        filename: "bundle.js",
        clean: true
    },
    resolve: {
        extensions: [".js", ".ts"],
    },
    module: {
        rules: [ JsLoader ]
    },
    optimization: {
        minimize: true,
        minimizer: [
          new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
          }),
        ],
    },
    externals: {
      mongodb: 'commonjs mongodb',
      mongoose: 'commonjs mongoose',
      express: 'commonjs express'
    },
}