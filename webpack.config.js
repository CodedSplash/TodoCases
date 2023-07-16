const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;


module.exports = {
  mode,
  target,
  devtool,
  devServer: {
      static: path.join(__dirname, "dist"),
      open: true
  },
  entry: path.resolve('@babel/polyfill', __dirname, 'src', 'index.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/index.[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(s|sc|sa)ss$/i,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('postcss-preset-env')],
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          minimize: true
        }
      },
      {
      test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
  new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      inject : 'body'
  }),
  new MiniCssExtractPlugin({
      filename: 'css/style.[contenthash].css'
  })
  ]
}
