var path = require('path');
var SRC_DIR = path.join(__dirname, '/src');
var DIST_DIR = path.join(__dirname, '/public');
const { resolve } = require('path');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// ENV vars
const VERSION = require("./package.json").version;
const isPRODUCTION = String(process.env.NODE_ENV).toUpperCase() === 'PRODUCTION';
const SERVER_HOST = typeof process.env.SERVER_HOST !== 'undefined' ? process.env.SERVER_HOST : '';
const DEV_HOST = 'http://localhost';
const DEV_PORT = process.env.DEV_PORT || 9000;

const SRC_FOLDER = 'src';
const TRG_FOLDER = 'dist';

const SUPPRESS_VENDOR_LOGS = process.env.SUPPRESS_VENDOR_LOGS || false;
const suppressVendorLogsObj = {};
SUPPRESS_VENDOR_LOGS && (suppressVendorLogsObj['console.log'] = text => { if (typeof text === 'string' && text.indexOf('Phaser') !== -1) { return; } });
(true || SUPPRESS_VENDOR_LOGS) && (suppressVendorLogsObj['console.info'] = text => { if (typeof text === 'string' && text.indexOf('Download the React DevTools') !== -1) { return; } });


module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module: {
    rules: [{
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'env']
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: 'raw-loader'
      },
      {
                      test: /\.(png|svg)$/,
                      loader: 'url-loader?limit=200000'
                  },
                  {
                      test: /\.woff(\?.*)?$/,
                      loader: 'url-loader?prefix=fonts/&name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff'
                  },
                  {
                      test: /\.woff2(\?.*)?$/,
                      loader: 'url-loader?prefix=fonts/&name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff2'
                  },
                  {
                      test: /\.ttf(\?.*)?$/,
                      loader: 'url-loader?prefix=fonts/&name=fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream'
                  },
                  {
                      test: /\.eot(\?.*)?$/, loader: 'file-loader?prefix=fonts/&name=fonts/[name].[ext]'
                  },
                  {
                      test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                      loader: 'url-loader?prefix=fonts/&name=fonts/[name].[ext]&limit=10000&mimetype=image/svg+xml'
                  },

    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [

        new ExtractTextPlugin('[name].css'),

        new HtmlWebpackPlugin({
            title: 'Application',
            template: resolve(__dirname, SRC_FOLDER, 'index.html'),
            inject: 'body'
        }),

        new webpack.DefinePlugin(Object.assign(
            suppressVendorLogsObj,
            {
                'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
                'NODE_ENV': JSON.stringify('production'),
                'PRODUCTION': JSON.stringify(false),
                'VERSION': JSON.stringify(VERSION),

                'SERVER_HOST': JSON.stringify(SERVER_HOST),

                // Phaser vars
                'WEBGL_RENDERER': JSON.stringify(true),
                'CANVAS_RENDERER': JSON.stringify(true)
            })),

    ]


};
