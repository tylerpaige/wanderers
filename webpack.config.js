var path = require('path');

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
      }
    ]
  }

};
