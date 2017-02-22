import webpack from 'webpack'
import Config from 'webpack-config'

export default new Config().extend('webpack/base.config.js').merge({
  output: {
    library: 'ServiceProxy',
    libraryTarget: 'umd'
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(true),
    // new webpack.optimize.UglifyJsPlugin({
    //     mangle: true,
    //     output: {
    //         comments: false
    //     },
    //     compress: {
    //         warnings: false
    //     }
    // })
  ]
})
