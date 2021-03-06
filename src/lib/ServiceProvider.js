import Proxy from './Proxy'
import Service from './Service'

export default class ServiceProvider {
  constructor(options = {}) {
    this.name = options.name || ''

    // superagent withCredentials
    this.cors = options.cors || false

    this.map = new Map()
  }

  register(key, options = {}) {
    if (typeof key !== 'string') {
      console.log('key type is should be string')
      return
    }

    if (this.map.has(key)) {
      return
    }

    this.map.set(key, new Service(options))
  }

  request(key, payload = {}) {
    const service = this.map.get(key)

    if (!service || !(service instanceof Service)) {
      throw new Error(`request service ${key} is not define`)
    }

    return Proxy.request(service, payload, this.cors)
  }

  get(key) {
    return this.map.get(key)
  }

  list() {
    const arr = []
    this.map.forEach((_, key) => arr.push(key))
    return arr
  }

  getName() {
    return this.name
  }
}
