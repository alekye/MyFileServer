const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
// const nodeExternals = require('webpack-node-externals');

const targetDir = "./dist";

const config = {
  // mode: "development",
  mode: "production",
  entry: {
    index: "./src/index.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, targetDir)
  },
  target: "node",
  // externals: [nodeExternals()],
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: "src/wwwroot", to:"wwwroot" },
      { from: "src/config", to:"config" }
    ]),
    new webpack.DefinePlugin({ "global.GENTLY": false })
  ],
};

module.exports = config;
