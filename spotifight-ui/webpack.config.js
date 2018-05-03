var path = require('path');
var webpack = require('webpack');
<<<<<<< HEAD
var CompressionPlugin = require('compression-webpack-plugin');

=======
>>>>>>> test
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
<<<<<<< HEAD
=======
      //<--key to reduce React's size
>>>>>>> test
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
<<<<<<< HEAD
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
=======
    // new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
>>>>>>> test
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};