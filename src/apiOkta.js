import Vue from 'vue'
import axios from 'axios'

const client = axios.create({
  baseURL: 'https://dev-603038.oktapreview.com',
  json: true
})

export default {
data () {
return {
activeUser: {}
}
},
  async execute (method, resource, data) {
    // inject the accessToken for each request
  // let accessToken = await Vue.prototype.$auth.getAccessToken()
    return client({
      method,
      url: resource,
      data,
      headers: {
               Authorization: `SSWS 00MaH_cwmQam4tIVtAIrW7sLOTEppNYwP3sQnlnMDr`
      }
    }).then(req => {
      return req.data
    })
  },
  getUser () {
  this.activeUser = this.execute('get', '/api/v1/users/me', true)
    return this.activeUser
  }
}