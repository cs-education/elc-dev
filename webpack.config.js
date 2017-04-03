var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public/');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  entry: APP_DIR + '/app.js',
  output: {
    path: BUILD_DIR,
    filename: 'elc.js'
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
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.png$/,
        include: APP_DIR,
        loader: 'url-loader?mimetype=image/png'
      }
    ],
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
  },
  plugins: []
};

module.exports = config;
