const path = require('path');
const BUILD_DIR = path.resolve(__dirname, './public/build');

module.exports = {
  mode: 'development',
  entry: './client/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    ],
  },
};
