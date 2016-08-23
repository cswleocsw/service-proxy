import superagent from 'superagent'
import { each, isArray, isObject, find, isEqual, remove } from 'lodash'

export default class Proxy {
  request(service, options = {}) {
    let promise = new Promise((resolve, reject) => {
      let httpRequest = superagent(service.getType(), service.getURL())

      // header
      let headers = service.getHeader()

      if (options.header && isArray(options.header)) {
        headers = headers.concat(options.header)
      }

      each(headers, (header) => httpRequest.set(header.key, header.value))

      // query
      if (options.query) {
        each(options.query, (o) => httpRequest.query(o))
      }

      if (service.getType() === 'POST' && isObject(options.data)) {
        httpRequest.send(options.data)
      }

      // 封裝 superagent 的訊息
      httpRequest
        .then((response) => {
          resolve({
            status: response.status,
            text: response.text,
            body: response.body,
            statusText: response.statusText,
            debug: response
          })
        })
        .catch((error) => {
          reject({
            status: error.status,
            text: error.response.text,
            body: error.response.body,
            statusText: error.response.statusText,
            debug: error
          })
        })
    })

    return promise
  }
}