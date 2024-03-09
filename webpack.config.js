const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;

module.exports = {
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  devServer:{
    port: 3001
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "contact",
      filename: "remoteEntry.js",
      remotes: {
        "home": "home@http://localhost:3000/remoteEntry.js"
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
      exposes: {
        // "./Header": "./src/components/Header",
      },
    }),
    new HTMLWebpackPlugin({
      template: './public/index.html',
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
