var path = require('path');
var webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');

var SRC_DIR = path.join(__dirname, '/src');
var DIST_DIR = path.join(__dirname, '/public');

module.exports = {
  entry: [`babel-polyfill`, `${SRC_DIR}/index.jsx`],
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module: {
    rules: [
      {
        test: /\.js[x]?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'env']
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader'
            // options: {}
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};