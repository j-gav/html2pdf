/* global __dirname, require, module*/

const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const env = require('yargs').argv.env; // use --env with webpack 2
// const pkg = require('./package.json');

let libraryName = 'html2pdf';

let plugins = [], outputFile;

if (env === 'build') {
  mode = 'production';
  outputFile = libraryName + '.min.js';
} else {
  mode = 'development';
  outputFile = libraryName + '.js';
}

const config = {
  entry: __dirname + '/src/index.js',
  mode,
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '/lib'),
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js']
  },
  optimization: {
    minimize: env === 'build',
    minimizer: [new TerserPlugin({
      terserOptions: {
        output: {
          comments: false
        }
      },
      extractComments: false
    })]
  }
};

module.exports = config;
