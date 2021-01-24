const path = require('path');

module.exports = {

  mode: 'development',
  entry: './app/spotify.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public', 'artistDiscovery'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$|.m?jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: { extensions: ['.js', '.jsx'] },

}