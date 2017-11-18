import each from 'lodash.foreach'
import ServiceProvider from './ServiceProvider'

export default class ServiceProxy {
  constructor(data = {}, options = {}) {
    // superagent withCredentials
    this.cors = options.cors || false

    this.map = new Map()

    this.bind(data)
  }

  bind(data) {
    each(data, (service, name) => {
      let sp = new ServiceProvider({ name, cors: this.cors })

      try {
        each(service, (v, k) => {
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
