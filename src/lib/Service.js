import { isArray } from 'lodash'
import Response from './Response'

export default class Service {
  constructor(options = {}) {
    this.type = options.type || 'GET'

    this.url = options.url || ''

    this.header = isArray(options.header) ? options.header : []

    this.cache = new Response()
  }

  setCache(cache) {
    this.cache = cache
  }

  getCache() {
    return this.cache
  }

  clearCache() {
    this.cache.reset()
  }

  getURL() {
    return this.url
  }

  getType() {
    return this.type
  }

  getHeader() {
    return this.header
  }
}
