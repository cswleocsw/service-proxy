import { isString, isObject } from 'lodash'

import Proxy from './Proxy'
import Service from './Service'

export default class ServiceProxy {
  constructor(options = {}) {
    this.name = options.name || ''
    this.map = new Map()
    this.proxy = new Proxy()
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
    let service = this.map.get(key)

    if (!service || !(service instanceof Service)) {
      throw new Error(`request service ${key} is not define`)
      return
    }

    return this.proxy.request(service, options)
  }

  get(key) {
    return this.map.get(key)
  }

  list() {
    let arr = []
    this.map.forEach((_, key) => arr.push(key))
    return arr
  }

  getName() {
    return this.name
  }
}
