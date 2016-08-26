import { expect } from 'chai'
import Service  from '../src/Service'

describe('#Service', () => {
  const options = {
    type: 'GET',
    url: '/test',
    header: [
      { key: 'Content-Type', value: 'application/json' }
    ]
  }

  const service = new Service(options)

  it('getType()', () => {
    expect(service.getType()).to.be.equal(options.type)
  })

  it('getURL()', () => {
    expect(service.getURL()).to.be.equal(options.url)
  })

  it('getHeader()', () => {
    expect(service.getHeader()[0]).to.be.equal(options.header[0])
  })
})
