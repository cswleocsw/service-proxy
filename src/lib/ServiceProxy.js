import _ from 'lodash'
import ServiceProvider from './ServiceProvider'

const handler = {
  get(target, property, receiver) {
    if (property === 'make') {
      return function (...args) {
        return target.make.apply(target, args)
      }
    }

    if (target.map.has(property)) {
      return target.map.get(property)
    } else {
      throw new ReferenceError(`Property ${property} does not exist.`)
    }
  },

  set(target, key, value, receiver) {
    throw new ReferenceError(`Property ${key} can not set.`)
  }
}

export default class ServiceProxy {
  constructor(data = {}) {
    this.map = new Map()
    this.bind(data)
    return new Proxy(this, handler)
  }

  bind(data) {
    _.each(data, (service, name) => {
      let sp = new ServiceProvider({ name })

      try {
        _.each(service, (v, k) => {
          sp.register(k, v)
        })
      } catch (e) {
        console.error(e)
        sp = null
      }

      if (sp) {
        this.map.set(name, sp)
      }
    })
  }

  make(type) {
    return this.map.get(type)
  }
}
