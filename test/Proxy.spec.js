import {expect} from 'chai'
import Proxy  from '../src/Proxy'
import Service  from '../src/Service'

describe('#Proxy', () => {
  const proxy = new Proxy()

  const options = {
    type: 'GET',
    url: '/test',
    header: [
      {key: 'Content-Type', value: 'application/json'}
    ]
  }

  const service = new Service(options)

  it('#request()', (done) => {
    proxy.request(service)
      .then(res => done())
      .catch(res => done())
  })
})
