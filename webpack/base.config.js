import path from 'path'
import webpack from 'webpack'
import Config from 'webpack-config'
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'

export default new Config().merge({
  context: path.resolve(__dirname, '..', 'src'),

  entry: {
    app: ['./index.js']
  },

  output: {
    filename: 'service-proxy.js',
    path: path.resolve(__dirname, '..', 'build')
  },

  resolve: {
    extensions: ['.js'],
    modules: [
      'node_modules'
    ]
  },

  plugins: [
    new CaseSensitivePathsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      }
    ]
  }
})
