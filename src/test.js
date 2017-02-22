import ServiceProxy from './lib/ServiceProxy'

const service_proxy = new ServiceProxy()

// GET
service_proxy.register('get_product', {
    type: 'GET',
    url: '/product'
})

// POST
service_proxy.register('add_product', {
    type: 'POST',
    url: '/product'
})

service_proxy.request('get_product', { query: { t: Date.now() } })
  .then(res => console.log(res))
  .catch(res => console.log(res))


service_proxy.request('add_product', { data: { 'product-id': '001' } })
  .then(res => console.log(res))
  .catch(res => console.log(res))
