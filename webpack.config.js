var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public/assets/');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  entry: APP_DIR + '/app.js',
  output: {
    path: BUILD_DIR,
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: APP_DIR,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        include: APP_DIR,
        loader: "style-loader!css-loader"
      }
    ],
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
  },
  plugins: []
};

module.exports = config;
