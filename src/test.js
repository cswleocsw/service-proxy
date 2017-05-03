import ServiceProxy from './index'

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

const api = new ServiceProxy(config)

// example
api.test.request('getTest', { query: { _: Date.now() } }).then(res => console.log(JSON.parse(res.text)))
api.test.request('postTest', { data: { now: Date.now() } }).then(res => console.log(JSON.parse(res.text)))
api.test.request('putTest').then(res => console.log(JSON.parse(res.text)))
api.test.request('deleteTest').then(res => console.log(JSON.parse(res.text)))
api.test.request('patchTest').then(res => console.log(JSON.parse(res.text)))
