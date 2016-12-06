# ServiceProxy [![Build Status](https://travis-ci.org/cswleocsw/service-proxy.svg?branch=master)](https://travis-ci.org/cswleocsw/service-proxy)

> ServiceProxy provide a simple interface for API request。


## Use
register -> request


```
const service_proxy = new ServiceProxy()

// register
service_proxy.regiser('query_product', {
    type: 'GET',
    url: '/product'
})



service_proxy.regiser('create_product', {
    type: 'POST',
    url: '/product'
})

...


// request
const promise = service_proxy.request('product'}
    
promise.then((res) => {
    console.log(res)
})

promise.catch((res) => {
    console.log(res)
})
    
```

### Request method
support GET、POST、PUT、DELETE

### Query string

```
const promise = service_proxy.request('product', { query: { updateTS: Date.now() } }}
```

### Post form data
```
const promise = service_proxy.request('product', { data: { updateTS: Date.now() } }}
```

### Response
```
promise.then(res => console.log(res))
```

#### attribute
* body
* status
* statusText
* text
* debug

#### method
* get

```
// if body => { "success": { products: [ { ... } ] } }
cosnt products = res.get('success.products')
```