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
      { from: "src/wwwroot/index.html", to:"wwwroot/index.html" },
      { from: "src/config/app.json5", to:"config/app.json5" }
    ]),
    new webpack.DefinePlugin({ "global.GENTLY": false })
  ],
};

module.exports = config;
