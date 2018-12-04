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
import LoginPage from '../login/login'
import RegisterPage from '../register/RegisterPage'

// Vue.use(Auth, {
//   issuer: 'https://dev-603038.oktapreview.com/oauth2/default',
//   client_id: '0oahgxw0iqZVLCEjD0h7',
//   redirect_uri: 'http://parents.myplex.life:8080/implicit/callback',
//   scope: 'openid profile email'
// })

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
      path: '/user',
      name: 'Hello',
      component: Hello
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
    {
      path: '/login',
      component: LoginPage
    }, {
      path: '/register',
      component: RegisterPage
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

//router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})

export default router