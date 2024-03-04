const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  devServer:{
    port: 3000
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
    })
  ],
  module: {
    rules: [
    //   { test: /\.(png|jpg|gif)$/, use: 'url-loader?limit=8192' },
      {
        test: /.js$/,
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
};
