import superagent from 'superagent'
import get from 'lodash.get'
import isObject from 'lodash.isobject'
import isArray from 'lodash.isarray'
import each from 'lodash.foreach'

import Response from './Response'

export default class Proxy {
  static request(service, options = {}, withCredentials = false) {
    return new Promise((resolve, reject) => {
      let url = service.getURL()

      if (url && options.route_params) {
        url = url.replace(/:([^/.?]+)/g, (match, token) => {
          if (get(options.route_params, token, '')) {
            return get(options.route_params, token, '')
          }
          return `:${token}`
        })
      }

      const httpRequest = superagent(service.getType(), url)

      // header
      let headers = service.getHeader()

      if (options.header && isArray(options.header)) {
        headers = headers.concat(options.header)
      }

      each(headers, header => httpRequest.set(header.key, header.value))

      // query
      if (options.query) {
        each(options.query, (v, k) => {
          const query = {}
          query[k] = v
          httpRequest.query(query)
        })
      }

      const protocol = service.getType()

      if (isObject(options.data)) {
        httpRequest.send(options.data)
      }

      // form data
      if (options.form === true && true) {
        httpRequest.type('form')
      }

      if (withCredentials) {
        httpRequest.withCredentials()
      }

      // 封裝 superagent 的訊息
      httpRequest
        .then((response) => {
          const res = new Response({
            status: get(response, 'status'),
            text: get(response, 'text', ''),
            body: get(response, 'body', {}),
            statusText: get(response, 'statusText'),
            debug: response
          })
          service.setCache(res)
          resolve(res)
        })
        .catch((error) => {
          const res = new Response({
            status: get(error, 'status'),
            text: get(error, 'response.text', ''),
            body: get(error, 'response.body', {}),
            statusText: get(error, 'response.statusText'),
            debug: error
          })
          service.setCache(res)
          reject(res)
        })
    })
  }
}
