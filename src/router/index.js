import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import PostsManager from '@/components/PostsManager'
import NewPost from '@/components/NewPost'
import Dashboard from '@/components/Dashboard'
import Detail from '@/components/Detail'
import list from '@/components/list'
import Tags from '@/components/Tags'
import LoginPage from '../login/login'
import RegisterPage from '../register/RegisterPage'


Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/posts-manager',
      name: 'PostsManager',
      component: PostsManager
    },
    {
      path: '/user',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/new-post',
      name: 'NewPost',
      component: NewPost
    },
    {
      path: '/tags/:id',
      name: 'Tags',
      component: Tags
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
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