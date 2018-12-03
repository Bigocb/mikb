import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import PostsManager from '@/components/PostsManager'
import Approvals from '@/components/Approvals'
import NewPost from '@/components/NewPost'
import Dashboard from '@/components/Dashboard'
import Detail from '@/components/Detail'
import Tags from '@/components/Tags'
import Auth from '@okta/okta-vue'

Vue.use(Auth, {
  issuer: 'https://dev-603038.oktapreview.com/oauth2/default',
  client_id: '0oahgxw0iqZVLCEjD0h7',
  redirect_uri: 'http://parents.myplex.life:8080/implicit/callback',
  scope: 'openid profile email'
})

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/implicit/callback',
      component: Auth.handleCallback()
    },
    {
      path: '/posts-manager',
      name: 'PostsManager',
      component: PostsManager
      // meta: {
      //   requiresAuth: true
      // }
    },
    {
      path: '/new-post',
      name: 'NewPost',
      component: NewPost
      // meta: {
      //   requiresAuth: true
      // }
    },
    {
      path: '/tags/:id',
      name: 'Tags',
      component: Tags
      // meta: {
      //   requiresAuth: true
      // }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
      // meta: {
      //   requiresAuth: true
      // }
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
      // meta: {
      //   requiresAuth: true
      // }
    },
    {
      path: '/Approvals',
      name: 'Approvals',
      component: Approvals
      // meta: {
      //   requiresAuth: true
      // }
    },
     { path: '*', redirect: '/' }
  ]
})

//router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router