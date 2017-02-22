import webpack from 'webpack'
import Config from 'webpack-config'
import DashboardPlugin from 'webpack-dashboard/plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import BrowserSyncPlugin from 'browser-sync-webpack-plugin'
import PathRewriterPlugin from 'webpack-path-rewriter'
import git from 'git-rev-sync'
import moment from 'moment'

export default new Config().extend('webpack/base.config.js').merge({
  devtool: '#source-map',
  entry: {
    app: [ require.resolve('webpack-dev-server/client') + '?/', require.resolve('webpack/hot/dev-server'), './test.js' ]
  },
  output: {
      pathinfo: true
  },
  plugins: [
    new DashboardPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new PathRewriterPlugin({ emitStats: false }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.pug',
      excludeChunks: ['pitaya', 'header'],
      git: git.short(),
      rev: moment().format()
    }),
    new BrowserSyncPlugin(
      {
        host: 'localhost',
        port: 4000,
        proxy: {
          target: 'http://localhost:3100/',
          ws: true
        },
        logPrefix: 'service-proxy',
        plugins: [
          {
            module: 'bs-html-injector',
            options: {
              files: [ 'src/**/*.pug' ]
            }
          }
        ]
      },
      {
        reload: false
      }
    )
  ]
})
