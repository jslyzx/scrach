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
import RepairList from '../pages/RepairList'
import MyContractList from '../pages/MyContractList'
import Settings from '../pages/Settings'
import ContractDetail from '../pages/ContractDetail'
import ModifyPhone from '../pages/ModifyPhone'
import ModifyPassword from '../pages/ModifyPassword'
import Kaimen from '../pages/Kaimen'
import SelectContract from '../pages/SelectContract'
import ContractSign from '../pages/ContractSign'
import ContractSignSuccess from '../pages/ContractSignSuccess'
import Tuizu from '../pages/Tuizu'
import Remark from '../pages/Remark'
import TuizuDetail from '../pages/TuizuDetail'
import ElecQuery from '../pages/ElecQuery'
import PayMask from '../pages/PayMask'
import SelectCity from '../pages/SelectCity'
import HouseDetail from '../pages/HouseDetail'
import HouseAppointment from '../pages/HouseAppointment'
import MyAppointmentList from '../pages/MyAppointmentList'
import MyCollectionList from '../pages/MyCollectionList'
import TuoGuan from '../pages/TuoGuan'
import ZhaoFang from '../pages/ZhaoFang'
import Search from '../pages/Search'
import WorkNearby from '../pages/WorkNearby'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [{
      path: '/',
      name: 'index',
      component: Home,
      meta: {
        requiresAuth: false,
        keepAlive: true
      }
    },
    {
      path: '/home',
      name: 'home',
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
      name: 'fgy',
      meta: {
        requiresAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/life/bx',
      component: Bx,
      name: 'repair',
      meta: {
        requiresAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/life/bx/item',
      component: BxItem,
      name: 'repairItem',
      meta: {
        requiresAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/life/bill',
      component: Bill,
      name: 'billList',
      meta: {
        requiresAuth: true,
        keepAlive: true
      }
    },
    {
      name: 'BillDetail',
      path: '/life/bill/:id',
      component: BillDetail,
      meta: {
        requiresAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/life/pay/a',
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
        requiresAuth: false,
        keepAlive: false,
        other: true
      }
    },
    {
      path: '/life/elec',
      component: Elec,
      name: 'elec',
      meta: {
        requiresAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/user/idcard',
      component: IdCard,
      name: 'IdCard',
      meta: {
        requiresAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/user/repair-list',
      component: RepairList,
      name: 'myRepairList',
      meta: {
        requiresAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/user/contract-list',
      component: MyContractList,
      name: 'MyContractList',
      meta: {
        requiresAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/user/settings',
      component: Settings,
      name: 'settings',
      meta: {
        requiresAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/user/contract/detail/:id',
      name: 'ContractDetail',
      component: ContractDetail,
      meta: {
        requiresAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/user/settings/modify-phone',
      name: 'ModifyPhone',
      component: ModifyPhone,
      meta: {
        requiresAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/user/settings/modify-password',
      name: 'ModifyPassword',
      component: ModifyPassword,
      meta: {
        requiresAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/life/kaimen',
      name: 'Kaimen',
      component: Kaimen,
      meta: {
        requiresAuth: true,
        keepAlive: false
      }
    },
    {
      path: '/life/select-contract',
      name: 'SelectContract',
      component: SelectContract,
      meta: {
        requiresAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/user/contract/sign/:id',
      name: 'ContractSign',
      component: ContractSign,
      meta: {
        requiresAuth: true,
        keepAlive: false,
        other: true
      }
    },
    {
      path: '/contract/sign/success',
      component: ContractSignSuccess,
      meta: {
        requiresAuth: true,
        keepAlive: false,
        other: true
      }
    },
    {
      path: '/life/tuizu',
      component: Tuizu,
      name: 'tuizu',
      meta: {
        requiresAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/user/settings/remark',
      component: Remark,
      name: 'remark',
      meta: {
        requiresAuth: true,
        keepAlive: false
      }
    },
    {
      name: 'tuizuDetail',
      component: TuizuDetail,
      path: '/life/tuizu/:id',
      meta: {
        requiresAuth: true,
        keepAlive: false
      }
    },
    {
      name: 'ElecQuery',
      path: '/life/elec/query/:id',
      component: ElecQuery,
      meta: {
        requiresAuth: true,
        keepAlive: false
      }
    },
    {
      name: 'PayMask',
      path: '/pay/pay-mask',
      component: PayMask,
      meta: {
        requiresAuth: false,
        keepAlive: false
      }
    },
    {
      name: 'SelectCity',
      path: '/city/select',
      component: SelectCity,
      meta: {
        requiresAuth: false,
        keepAlive: true
      }
    },
    {
      name: 'HouseDetail',
      path: '/house/detail/:id',
      component: HouseDetail,
      meta: {
        requiresAuth: false,
        keepAlive: true,
        other: true
      }
    },
    {
      name: 'HouseAppointment',
      path: '/house/appointment/:id',
      component: HouseAppointment,
      meta: {
        requiresAuth: false,
        keepAlive: false
      }
    },
    {
      path: '/user/appoint-list',
      name: 'AppointList',
      component: MyAppointmentList,
      meta: {
        requiresAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/user/collection-list',
      name: 'CollectionList',
      component: MyCollectionList,
      meta: {
        requiresAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/house/tg',
      component: TuoGuan,
      name: 'TuoGuan',
      meta: {
        requiresAuth: true,
        keepAlive: true
      }
    },
    {
      name: 'ZhaoFang',
      component: ZhaoFang,
      path: '/zhaofang',
      meta: {
        requiresAuth: false,
        keepAlive: true
      }
    },
    {
      path: '/hosue/search',
      name: 'search',
      component: Search,
      meta: {
        requiresAuth: false,
        keepAlive: false
      }
    },
    {
      path: '/work/nearby',
      name: 'WorkNearby',
      component: WorkNearby,
      meta: {
        requiresAuth: false,
        keepAlive: false
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
    if (store.getters.loginStatus) { //已登录
      if (/^\/life\/[\w]+$/.test(to.fullPath)) {
        //loading效果
        store.dispatch('setLoadingState', true)
        api.getContractList({ access_token: store.getters.userInfo.token, iskaimen: 0, Status: 5 })
          .then(res => {
            store.dispatch('setLoadingState', false)
            if (res.Code === 1002) {
              store.dispatch('setSignOut')
              next({
                path: '/user/login'
              })
            } else {
              if (res.numberData.length === 0) { //没有合同
                next(false)
                _.toast('暂无租约')
              } else if (res.numberData.length === 1) { //只有一个合同不需要选择，直接进相关功能页，把ContractId和HouseId带过去
                next({
                  path: to.path,
                  query: {
                    ContractId: res.numberData[0].Id,
                    HouseId: res.numberData[0].HouseId,
                    CompanyId: res.numberData[0].CompanyId,
                    HouseName: res.numberData[0].HouseName
                  }
                })
              } else {
                next({
                  name: 'SelectContract',
                  query: { redirect: to.path }
                })
              }
            }
          })
      } else {
        next()
      }
    } else { //未登录，跳登录页面
      next({
        path: '/user/login'
      })
    }

  } else {
    next()
  }
})

export default router
