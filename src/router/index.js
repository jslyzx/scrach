import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'
import api from '../fetch/api'
import * as _ from '../util/tool'

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
import Bx from '../pages/Bx'
import BxItem from '../pages/BxItem'
import Bill from '../pages/Bill'
import BillDetail from '../pages/BillDetail'
import Pay from '../pages/Pay'
import PaySuccess from '../pages/PaySuccess'
import Elec from '../pages/Elec'
import IdCard from '../pages/IdCard'

Vue.use(Router)

const router = new Router({
  linkActiveClass: 'active',
  routes: [{
      path: '/',
      component: Home,
      meta: {
        requiresAuth: false,
        keepAlive: true
      }
    },
    {
      path: '/home',
      component: Home,
      meta: {
        requiresAuth: false,
        keepAlive: true
      }
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
      path: '/life',
      component: Life,
      meta: {
        requiresAuth: false,
        keepAlive: true
      }
    },
    {
      path: '/life/fgy',
      component: Fgy,
      meta: {
        requiresAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/life/bx',
      component: Bx,
      meta: {
        requiresAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/life/bx/item',
      component: BxItem,
      meta: {
        requiresAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/life/bill',
      component: Bill,
      meta: {
        requiresAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/life/bill/:id',
      component: BillDetail,
      meta: {
        requiresAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/life/pay',
      component: Pay,
      name: 'pay',
      meta: {
        requiresAuth: true,
        keepAlive: false
      }
    },
    {
      path: '/life/pay/success',
      component: PaySuccess,
      meta: {
        requiresAuth: true,
        keepAlive: false
      }
    },
    {
      path: '/life/elec',
      component: Elec,
      meta: {
        requiresAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/user/idcard',
      component: IdCard,
      meta: {
        requiresAuth: true,
        keepAlive: true
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
  if (to.matched.some(r => r.meta.requiresAuth)) {
    if (store.getters.loginStatus) {
      if (/\/life\/[\w]+/.test(to.path)) {
        api.getContractList({ access_token: store.getters.userInfo.token, iskaimen: 0 })
          .then(res => {
            if (res.numberData.length > 0) {
              next()
            } else {
              next(false)
              _.toast('暂无租约')
            }
          })
      } else {
        next()
      }

    } else {
      next({
        path: '/user/login'
      })
    }

  } else {
    next()
  }
})

export default router
