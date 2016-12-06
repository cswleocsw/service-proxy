import { expect } from 'chai'
import ServiceProvider from '../src/ServiceProxy'

describe('#ServiceProxy', () => {
  let serviceProxy

  it('#register()', () => {
    serviceProxy = new ServiceProvider()
    serviceProxy.register('source', { type: 'GET', url: '/source.json' })
    expect(serviceProxy.get('source').getType()).to.be.equal('GET')
    expect(serviceProxy.get('source').getURL()).to.be.equal('/source.json')
  })

  it('#request()', () => {
    const promise = serviceProxy.request('source')
    expect(promise).to.be.a('promise');
  })
})
