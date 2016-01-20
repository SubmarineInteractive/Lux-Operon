import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

export default {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
    './src/index.js',
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    root: path.resolve( __dirname, 'src' ),
    alias: {
      'Container': 'helpers/Container'
    },
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: [
      '',
      '.js',
      '.jsx',
      '.json'
    ]
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      {
        test: /node_modules/,
        loader: 'ify'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css', "autoprefixer?browsers=last 2 version"],
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', "autoprefixer?browsers=last 2 version", 'sass'],
      },
    ],
    postLoaders: [
      {
        test: /\.js$/,
        loader: 'ify'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/template/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      '__DEV__': JSON.stringify(true),
      '__PROD__': JSON.stringify(false)
    }),
    new webpack.ProvidePlugin({
      'THREE': 'three'
    }),
    new CopyWebpackPlugin([
      { from: 'static' }
    ],
    { ignore: ['.DS_Store', '.keep'] })
  ]
}
