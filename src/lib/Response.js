import { get } from 'lodash'

export default class Response {
  constructor(options = {}) {
    this.body = options.body || {}
    this.debug = options.debug || {}
    this.status = options.status || ''
    this.statusText = options.statusText || ''
    this.text = options.text || ''
    this.error = options.error || {}
  }

  get(path, def) {
    if (path === undefined) {
      return this.body
    }
    return get(this.body, `${path}`, def)
  }

  reset() {
    this.body = {}
    this.debug = {}
    this.status = ''
    this.statusText = ''
    this.text = ''
    this.error = {}
  }
}
