import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'

import Home from '../pages/Home'
import Sport from '../pages/Sport'
import Travel from '../pages/Travel'
import Detail from '../pages/Detail'
import User from '../pages/User'
import Login from '../pages/Login'
import Regist from '../pages/Regist'
import UserInfo from '../pages/UserInfo'
import Set from '../pages/Set'
import Post from '../pages/Post'
import UserMsg from '../pages/UserMsg'
import Navbar from '../pages/Navbar'
import Life from '../pages/Life'
import NotFound from '../pages/NotFound'
import Fgy from '../pages/Fgy'
import Contract from '../pages/Contract'

Vue.use(Router)

const router = new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/sport',
      name: 'sport',
      component: Sport
    },
    {
      path: '/travel',
      name: 'travel',
      component: Travel
    },
    {
      path: '/sport/:id',
      component: Detail
    },
    {
      path: '/travel/:id',
      component: Detail
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
			path: '/user/login',
			component: Login,
      meta: {
        requiresAuth: false
      }
		},
		{
			path: '/user/regist',
			component: Regist,
      meta: {
        requiresAuth: false
      }
		},
		{
			path: '/user/info',
			component: UserInfo
		},
		{
			path: '/user/set',
			component: Set
		},
		{
			path: '/user/post',
			component: Post
		},
		{
			path: '/user/msg',
			component: UserMsg
		},
    {
			path: '/user/navbar',
			component: Navbar
		},
    {
      path: '/life',
      component: Life,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/life/fgy',
      component: Fgy,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      name: 'notfound',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(r => r.meta.requiresAuth)){
    if(store.getters.loginStatus){
      next()
    }else{
      next({
        path: '/user/login'
      })
    }
    
  }else{
    next()
  }
})

export default router