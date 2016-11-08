import { get } from 'lodash'

export default class Response {
  constructor(options = {}) {
    this.body = options.body || {}
    this.debug = options.debug || {}
    this.status = options.status
    this.statusText = options.statusText
    this.text = options.text
    this.error = options.error
  }

  get(path, def) {
    const query = !path ? 'body' : `body.${path}`
    return get(this.body, query, def)
  }
}
