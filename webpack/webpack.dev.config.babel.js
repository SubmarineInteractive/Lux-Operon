import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default {
  context: path.resolve( __dirname, '..' ),
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
    './src/main.js',
    './src/stylesheets/main.scss'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    root: path.resolve( __dirname, '..', 'src' ),
    alias: {
      common: 'components/WebGLCommon'
    },
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
        exclude: /node_modules/,
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
        loaders: [ 'style', 'css' ]
      },
      {
        test: /\.scss$/,
        loaders: [ 'style', 'css', 'sass' ]
      },
      {
        test: /\.(glsl|frag|vert)$/,
        exclude: /node_modules/,
        loader: 'raw!glslify'
      },
      {
        test: /splitText\.js$/,
        loader: 'imports?define=>false!exports?SplitText'
      },
      {
        test: /drawSvg\.js$/,
        loader: 'imports?define=>false!exports?SplitText'
      },
      {
        test: /\.dae$/,
        exclude: /node_modules/,
        loader: path.join( __dirname, 'loaders', 'spline-loader' )
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify( process.env.NODE_ENV ),
      '__DEV__': JSON.stringify( true ),
      '__PROD__': JSON.stringify( false )
    }),
    new webpack.ProvidePlugin({
      'THREE': 'three',
      'React': 'react'
    }),
    new CopyWebpackPlugin( [
      { from: 'static' }
    ],
    { ignore: [ '.DS_Store', '.keep' ] })
  ]
};
