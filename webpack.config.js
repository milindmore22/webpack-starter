const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "../css/[name].min.css",
});

module.exports = {
  entry:{
    public : './src/js/main.js',
    admin : './src/js/admin/admin.js'
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist/js/')
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "eslint-loader",
        options: {
          failOnError: true,
          failOnWarning: true,
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env']
          }
        }
      },
      {
        test: /\.(sass|scss)$/,
        exclude: /(node_modules|bower_components)/,
        use: extractSass.extract({
          use: [{
              loader: "css-loader",
              options: {
                minimize: true
              }
          }, {
              loader: "sass-loader"
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new UglifyJSPlugin(),
    new StyleLintPlugin( { failOnError:false } ),
    extractSass,
  ]
};
