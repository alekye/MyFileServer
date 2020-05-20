const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const nodeExternals = require('webpack-node-externals');

const targetDir = "./dist";

const config = {
  mode: "development",
  // mode: "production",
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
      { from: "public", to:"public" },
      { from: "src/config", to:"config" }
    ])
  ],
};

module.exports = config;
