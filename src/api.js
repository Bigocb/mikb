import axios from 'axios'

const client = axios.create({
  baseURL: 'https://api.mikn.app',
  json: true
})

export default {
  async execute(method, resource, data) {
    // inject the accessToken for each request
    //  let accessToken = await Vue.prototype.$auth.getAccessToken()
    return client({
      method,
      url: resource,
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
    return this.execute('get', `/posts/${familyid}`)
  },
  getTagPosts(tag) {
    return this.execute('get', `/tag/${tag}`)
  },
  getMostReadPosts(familyid) {
    return this.execute('get', `/read/tasks/${familyid}`)
  },
  getRecentPosts(familyid) {
    return this.execute('get', `/posts/${familyid}?recent=true`)
  },
  getPrefs(familyid) {
    return this.execute('get', `/person/prefs/${familyid}`)
  },
  setPrefs(familyid, data) {
    return this.execute('put', `/person/prefs/${familyid}`, data)
  },
  getSinglePost(id) {
    return this.execute('get', `/post/${id}`)
  },
  getPostList(id) {
    return this.execute('get', `/post/list/${id}`)
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
    return this.execute('post', '/post/new', data)
  },
  updatePost(id, data) {
    return this.execute('put', `/post/${id}`, data)
  },
  updateReadCount(id) {
    return this.execute('post', `/post/${id}`)
    console.log(`api ${id}`)
  },
  approvePost(id) {
    return this.execute('put', `/app/task/${id}`)
  },
  updateTags(data) {
    return this.execute('put', `/post/tag?add=true`, data)
  },
  deleteTags(data) {
    console.log(data)
    return this.execute('delete', '/post/tag?delete=true', data)
  },
  addTags(data) {
    console.log(data);
    return this.execute('put', `/tags`, data)
  },
  getTags() {
    return this.execute('get', `/tags`)
  },
    getUsersNews(familyid) {
        return this.execute('get', `/news/user/${familyid}`)
    },
    addNewsSource(data) {
        return this.execute('put', '/news/sources',data)
    },
    getUsersSources(familyid) {
        return this.execute('put', `/news/user/${familyid}`)
    },
  getTopTags() {
    return this.execute('get', `/top/tags`)
  },
  deletePost(id) {
    return this.execute('delete', `/task/${id}`)
  },
    getNewsSources() {
        return this.execute('get', `/news/sources`)
    }
}