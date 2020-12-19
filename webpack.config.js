const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'js/my-first-webpack.bundle.js'
  },

  devServer: {
    contentBase: './docs',
  },

  plugins: [
    new HtmlWebpackPlugin({  // Also generate a test.html
        filename: 'index.html',
        template: './src/index.html'
      })
  ],

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      }
    ]
  }


};