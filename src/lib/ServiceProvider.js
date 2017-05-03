import isString from 'lodash.isstring'

import Proxy from './Proxy'
import Service from './Service'

export default class ServiceProvider {
  constructor(options = {}) {
    this.name = options.name || ''
    this.map = new Map()
  }

  register(key, options = {}) {
    if (!isString(key)) {
      console.log('key type is should be string')
      return
    }

    if (this.map.has(key)) {
      return
    }

    this.map.set(key, new Service(options))
  }

  request(key, options = {}) {
    const service = this.map.get(key)

    if (!service || !(service instanceof Service)) {
      throw new Error(`request service ${key} is not define`)
    }

    return Proxy.request(service, options)
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
