var webpack = require('webpack');

module.exports = {
  entry: ['whatwg-fetch', './pre.js'],
  output: {
    path: './dist',
    publicPath: '',
    filename: 'bundle.js'
  },
  module: {
		loaders: [
    ]
  },
  devtool: '#source-map',
  debug: true,
  plugins: [
    new webpack.BannerPlugin('created by ginny')
  ]
};
