const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader')

const config = {
  entry: {
    app: './src/app.tsx',
    vendor: [
      'immutable',
      'lodash',
      'node-libs-browser',
      'react',
      'react-dom',
      'redux',
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      },
      {
        exclude: /node_modules/,
        test: /\.(js|jsx|ts|tsx)$/,
        use: 'awesome-typescript-loader'
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      }
    ]
  },
  devtool: 'eval-source-map',
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new CheckerPlugin(),
    new ManifestPlugin(),
    new Visualizer(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  }
};

module.exports = config;
