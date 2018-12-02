import axios from 'axios'

const client = axios.create({
  baseURL: 'http://parents.myplex.life',
  json: true
})


export default {
  async execute (method, resource, data) {
    // inject the accessToken for each request
  //  let accessToken = await Vue.prototype.$auth.getAccessToken()
    return client({
      method,
      url: resource,
      data,
      headers: {
   //     Authorization: `Bearer ${accessToken}`
      }
    }).then(req => {
      return req.data
    })
  },
  getPosts (familyid) {
    return this.execute('get', `/tasks/${familyid}`)
  },
  getSinglePost (id) {
    return this.execute('get', `/task/${id}`)
  },
  getApprovalPosts (familyid) {
    return this.execute('get', `/approve/tasks/${familyid}`)
  },
  getFamily (email) {
    this.email = this.execute('get', `/person/${email}`)
    return this.email
  },
  createPost (data) {
    console.log(data);
    return this.execute('post', '/new/tasks', data)
  },
  updatePost (id, data) {
   return this.execute('put', `/task/${id}`, data)
  },
  approvePost (id) {
    return this.execute('put', `/app/task/${id}`)
   },
  updateTags (id, data) {
    return this.execute('put', `/add/tags/${id}`, data)
   },
  getTags () {
    return this.execute('get', `/tags`)
   },
  deletePost (id) {
   return this.execute('delete', `/task/${id}`)
  }
}