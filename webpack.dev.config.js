var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader')

const config = {
  entry: ['./src/app.tsx'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.js'
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
    new CheckerPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  }
};

module.exports = config;
