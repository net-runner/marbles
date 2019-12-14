const path = require("path");
module.exports = {
  entry: {
    app: "./src/App.ts"
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  devServer: {
    contentBase: path.join(__dirname, "./dist"),
    compress: true,
    port: 9000
  }
};
