import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import PostsManager from '@/components/PostsManager'
import NewPost from '@/components/NewPost'
import Front from '@/components/Front'
import News from '@/components/news'
import Detail from '@/components/Detail'
import list from '@/components/list'
import Tags from '@/components/Tags'
import Approvals from '@/components/Approvals'
import LoginPage from '../login/login'
import RegisterPage from '../register/RegisterPage'


Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'Front',
      component: Front
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
      path: '/approvals',
      name: 'Approvals',
      component: Approvals
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
      path: '/front',
      name: 'Front',
      component: Front
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
          path: '/news',
          component: News
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
  const  authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})

export default router