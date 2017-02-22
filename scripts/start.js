import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import rimraf from 'rimraf'
import config from '../webpack.config.babel'

const port = 3100

const compiler = webpack(config)

rimraf.sync('build/*')

const server = new WebpackDevServer(compiler, {
  hot: true,
  publicPath: config.output.publicPath,
  quiet: true,
  historyApiFallback: true,
  watchOptions: {
    ignored: /node_modules/
  },
  proxy: {
    '/pt/*': {
      target: 'http://localhost:3000',
      secure: false
    }
  }
})

server.listen(port)
