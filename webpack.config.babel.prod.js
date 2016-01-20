import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'


export default {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname,'dist'),
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
      '__DEV__': JSON.stringify(false),
      '__PROD__': JSON.stringify(true)
    }),
    new webpack.ProvidePlugin({
      'THREE': 'three'
    }),
    new CopyWebpackPlugin([
      { from: 'static' }
    ],
    { ignore: ['.DS_Store', '.keep'] }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        drop_console: true,
        pure_funcs: ['console.log']
      }
    }),
    new ExtractTextPlugin('style.css', {allChunks: true}),
  ]
}
