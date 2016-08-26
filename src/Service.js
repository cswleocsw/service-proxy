import { get, isArray } from 'lodash'

export default class Service {
  constructor(options = {}) {
    this.type = options.type || 'GET'

    this.url = options.url || ''

    this.header = isArray(options.header) ? options.header : []

    this.cache = {}
  }

  setCache(cache) {
    this.cache = cache
  }

  getCache(path = '') {
    return get(this.cache, path, this.cache)
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
