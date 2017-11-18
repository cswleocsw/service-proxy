# ServiceProxy [![Build Status](https://travis-ci.org/cswleocsw/service-proxy.svg?branch=master)](https://travis-ci.org/cswleocsw/service-proxy)

> ServiceProxy provide a simple interface for API request。

## Use ServiceProvider
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

const apiTest = new ServiceProvider(config)

// example
testAPI.request('getTest', {
    query: {
      _: Date.now()
    }
  })
  .then(res => console.log(JSON.parse(res.text)))
  .catch(error => console.error('get.catch.error', error))

testAPI.request('postTest', {
    data: {
      now: Date.now()
    }
  })
  .then(res => console.log(JSON.parse(res.text)))
  .catch(error => console.error('post.catch.error', error))

testAPI.request('putTest')
  .then(res => console.log(JSON.parse(res.text)))
  .catch(error => console.error('put.catch.error', error))

testAPI.request('deleteTest')
  .then(res => console.log(JSON.parse(res.text)))
  .catch(error => console.error('delete.catch.error', error))

testAPI.request('patchTest')
  .then(res => console.log(JSON.parse(res.text)))
  .catch(error => console.error('patch.catch.error', error))
