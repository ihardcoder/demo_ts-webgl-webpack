const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

const SourceDir = Path.resolve(__dirname,'../src/');

module.exports = {
  context: Path.join(__dirname,'../src'),
  entry: {
    'index': Path.resolve(__dirname,'../src/js/index.ts')
  },
  output: {
    path: Path.join(__dirname,'../dist'),
    filename: '[name].js',
    publicPath: './'
  },
  target: 'web',
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      use: ['babel-loader','awesome-typescript-loader']
    },{
      test: /\.html$/,
      loader: 'html-loader'
    },{
      test: /\.glsl$/,
      loader: 'raw-loader'
    }, {
      test: /\.scss$/,
      use: [MiniCssExtractPlugin.loader, {
        loader: 'css-loader',
        options: {
          minimize: true
        }
      }, 'sass-loader']
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname,'../src/index.html'),
      filename: 'index.html'
    })
  ],
  resolve: {
    extensions: [".ts", ".json",".scss",".glsl",'.js'],
    plugins: [
      new TsConfigPathsPlugin({
        configFileName: Path.resolve(__dirname,'../tsconfig.json')
      })
    ]
  }
};