import ServiceProxy from 'service-proxy'

// text example
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

const sp = new ServiceProxy(config)

const testAPI = sp.make('test')

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
