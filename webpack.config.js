var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssPath = './bundle.css';

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.json$/,
        use: [{
          loader: "json-loader"
        }]
      },
      {
        test: /\.js$/,
        use: [
          {
            loader : 'babel-loader',
            options : {
              presets : ['es2015'],
              plugins : ['transform-object-rest-spread']
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [{
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
            query: {
              sourceMap: true
            }
          }]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin(cssPath)
  ]

};
