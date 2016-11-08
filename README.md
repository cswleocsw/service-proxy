# ServiceProxy [![Build Status](https://travis-ci.org/cswleocsw/service-proxy.svg?branch=master)](https://travis-ci.org/cswleocsw/service-proxy)

ServiceProxy 統整了API的功能，讓使用者只能要定義相關的操作設定即可快速的供外部套件使用。


## Basic
register -> request


```
const sp = new ServiceProxy({ name: 'lobby' })

// register
sp.regiser('source', {
    type: 'GET',
    url: '/source.json',
    header: [{ key: 'Content-Type', value: 'application/json' }]
})

sp.regiser('product', {
    type: 'GET',
    url: '/product',
    header: [{ key: 'Content-Type', value: 'application/json' }]
})


...


// request
const promise = sp.request('source'}
    
promise.then((res) => {
    console.log(res)
})

promise.catch((res) => {
    console.log(res)
})
    
```


## GET

```
sp.regiser('source', {
    type: 'GET',
    url: '/source'
})
```



## query
```
const promise = sp.request('source', { query: [{ timestamp: 1478588520321 }] })
```


## POST

```
sp.regiser('product', { 
	type: 'POST',
	url: '/product'
})

service.request('post', {
  data: {
    num: 10        
  }
})

```


## header

```
sp.regiser('source', {
    type: 'GET',
    url: '/source.json',
    header: [{ key: 'Content-Type', value: 'application/json' }]
})
```

### Response
source.json
```
{
    "hello": "world"
}
```

```
sp.regiser('source', {
    type: 'GET',
    url: '/source.json',
    header: [{ key: 'Content-Type', value: 'application/json' }]
})

const res = sp.request('source')

res.get('hello')  // return 'hello'

```

### Cache
```
sp.regiser('source', {
    type: 'GET',
    url: '/source.json',
    header: [{ key: 'Content-Type', value: 'application/json' }]
})

const res = sp.request('source')

// request will cache last response in service cache 

const res = sp.getCache('source')
res.get('hello')  // 

```
