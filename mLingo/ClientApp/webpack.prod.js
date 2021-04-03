const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

/*

const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
new WorkboxWebpackPlugin.GenerateSW({
            swDest: 'sw.js',
            clientsClaim: true,
            skipWaiting: false,
          })

*/



module.exports = merge(common, {

  mode: 'production',
  entry: "./src/index.js",
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: path.resolve(__dirname, 'build')
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({ filename:'main.[contentHash].css' }),
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },


  module: {
    rules: [
    {
        test: /\.(ttf|eot|svg|png|jpg|gif|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
    },
    {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ["@babel/preset-env","@babel/preset-react"]
        }
      },
      {
      test: /\.(js|jsx)$/,
      include: [path.resolve(__dirname, '/public')],
      loader: 'babel-loader'
    },
    {
      test: /.(sa|sc|c)ss$/,

      use: [{
        loader: MiniCssExtractPlugin.loader
      }, {
        loader: "css-loader",

        options: {
          sourceMap: true
        }
      }, {
        loader: "sass-loader",

        options: {
          sourceMap: true
        }
      }]
    }]
  }
});