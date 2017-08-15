var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader')
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const Visualizer = require('webpack-visualizer-plugin');

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
    filename: '[name]-[chunkhash].js'
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
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin('styles-[chunkhash].css'),
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
