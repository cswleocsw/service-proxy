import { isArray } from 'lodash'

export default class Service {
  constructor(options = {}) {
    this.type = options.type || 'GET'
    this.url = options.url || ''
    this.header = isArray(options.header) ? options.header : []
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
