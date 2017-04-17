# ServiceProxy [![Build Status](https://travis-ci.org/cswleocsw/service-proxy.svg?branch=master)](https://travis-ci.org/cswleocsw/service-proxy)

> ServiceProxy provide a simple interface for API request。

## Use
```
// https://httpbin.org/

const config = {
  test: {
     getTest: {
      type: 'GET',
      url: 'https://httpbin.org/get'
    },
    postTest: {
      type: 'POST',
      url: 'https://httpbin.org/post'
    },
    putTest: {
      type: 'PUT',
      url: 'https://httpbin.org/put'
    },
    deleteTest: {
      type: 'DELETE',
      url: 'https://httpbin.org/delete'
    },
    patchTest: {
      type: 'PATCH',
      url: 'https://httpbin.org/patch'
    }
  }
}

const api = new ServiceProvider(config)

// example
api.test.request('getTest', { query: { _: Date.now() } }).then(res => console.log(JSON.parse(res.text)))    // queryString
api.test.request('postTest', { data: { now: Date.now() } }).then(res => console.log(JSON.parse(res.text)))  // form data
api.test.request('putTest').then(res => console.log(JSON.parse(res.text)))
api.test.request('deleteTest', { header: [ { key: 'Content-Type', value: 'application/json' } ]}).then(res => console.log(JSON.parse(res.text))) // with header
api.test.request('patchTest').then(res => console.log(JSON.parse(res.text)))


// with vue



```
