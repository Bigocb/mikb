import axios from 'axios'

const client = axios.create({
  baseURL: 'http://parents.myplex.life',
  json: true
})

export default {
  async execute(method, resource, data) {
    // inject the accessToken for each request
    //  let accessToken = await Vue.prototype.$auth.getAccessToken()
    return client({
      method,
      url: resource,
      mode: 'no-cors',
      data,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    }).then(req => {
      return req.data
    })
  },
  getPosts(familyid) {
    return this.execute('get', `/tasks/${familyid}`)
  },
  getTagPosts(tag) {
    return this.execute('get', `/tag/${tag}`)
  },
  getMostReadPosts(familyid) {
    return this.execute('get', `/read/tasks/${familyid}`)
  },
  getRecentPosts(familyid) {
    return this.execute('get', `/person/recent/${familyid}`)
  },
  getPrefs(familyid) {
    return this.execute('get', `/person/prefs/${familyid}`)
  },
  setPrefs(familyid, data) {
    return this.execute('put', `/person/prefs/${familyid}`, data)
  },
  getSinglePost(id) {
    return this.execute('get', `/task/${id}`)
  },
  getPostList(id) {
    return this.execute('get', `/task/list/${id}`)
  },
  getApprovalPosts(familyid) {
    return this.execute('get', `/approve/tasks/${familyid}`)
  },
  getToDos(familyid) {
    return this.execute('get', `/person/todo/${familyid}`)
  },
  getToRead(familyid) {
    return this.execute('get', `/person/toread/${familyid}`)
  },
  getArchived(familyid) {
    return this.execute('get', `/person/archive/${familyid}`)
  },
  getUserLists(familyid) {
    return this.execute('get', `/person/list/${familyid}`)
  },
  createUserLists(familyid, data) {
    return this.execute('put', `/person/list/${familyid}`, data)
  },
  deleteUserLists(familyid, data) {
    console.log(data)
    return this.execute('delete', `/person/list/${familyid}`, data)
  },
  updateUserListPosts(familyid, data) {
    console.log(data)
    return this.execute('put', `/person/list/posts/${familyid}`, data)
  },
  getUserListPosts(familyid) {
    return this.execute('get', `/person/list/posts/${familyid}`)
  },
  createUserListPosts(familyid, data) {
    console.log(data)
    return this.execute('post', `/person/list/posts/${familyid}`, data)
  },
  deleteUserListPosts(familyid, data) {
    console.log(data)
    return this.execute('delete', `/person/list/posts/${familyid}`, data)
  },
  getFamily(email) {
    this.email = this.execute('get', `/person/${email}`)
    return this.email
  },
  createPost(data) {
    console.log(data);
    return this.execute('post', '/new/tasks', data)
  },
  updatePost(id, data) {
    return this.execute('put', `/task/${id}`, data)
  },
  updateReadCount(id) {
    return this.execute('post', `/task/${id}`)
    console.log(`api ${id}`)
  },
  approvePost(id) {
    return this.execute('put', `/app/task/${id}`)
  },
  updateTags(id, data) {
    return this.execute('put', `/add/tags/${id}`, data)
  },
  deleteTags(id, data) {
    console.log(data)
    return this.execute('delete', `/delete/tags/${id}`, data)
  },
  addTags(data) {
    console.log(data);
    return this.execute('put', `/tags`, data)
  },
  getTags() {
    return this.execute('get', `/tags`)
  },
  getTopTags() {
    return this.execute('get', `/top/tags`)
  },
  deletePost(id) {
    return this.execute('delete', `/task/${id}`)
  }
}