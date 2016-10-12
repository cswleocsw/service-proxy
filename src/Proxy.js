import superagent from 'superagent'
import { get, each, isArray, isObject } from 'lodash'

export default class Proxy {
  request(service, options = {}) {
    let promise = new Promise((resolve, reject) => {
      let url = service.getURL()

      if (url && options.route_params) {
        url = url.replace(/:([^\/\.\?]+)/g, (match, token) => {
          // TODO: fix regex
          if (get(options.route_params, token, '')) {
            return get(options.route_params, token, '')
          } else {
            return `:${token}`
          }
        })
      }

      let httpRequest = superagent(service.getType(), url)

      // header
      let headers = service.getHeader()

      if (options.header && isArray(options.header)) {
        headers = headers.concat(options.header)
      }

      each(headers, (header) => httpRequest.set(header.key, header.value))

      // query
      if (options.query) {
        each(options.query, (v, k) => {
          const query = {}
          query[k] = v
          httpRequest.query(query)
        })
      }

      if (service.getType() === 'POST' && isObject(options.data)) {
        httpRequest.send(options.data)
      }

      // 封裝 superagent 的訊息
      httpRequest
        .then((response) => {
          let res = {
            status: response.status,
            text: response.text,
            body: response.body,
            statusText: response.statusText,
            debug: response
          }
          service.setCache(res)
          resolve(res)
        })
        .catch((error) => {
          let res = {
            status: error.status,
            text: error.response.text,
            body: error.response.body,
            statusText: error.response.statusText,
            debug: error
          }
          service.setCache(res)
          reject(res)
        })
    })

    return promise
  }
}
