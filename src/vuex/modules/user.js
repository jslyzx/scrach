import api from '../../fetch/api'
import * as types from '../types'

const state = {
  // 用户登录状态
  loginStatus: JSON.parse(localStorage.getItem('loginStatus')) || false,
  // 用户登录信息
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
  // 用户数据信息
  userData: {},
  // 用户合同列表
  userContractList: [],
  // 身份认证信息
  idCard: {},
  // openid
  openId: JSON.parse(localStorage.getItem('openId')) || '',
  city: JSON.parse(localStorage.getItem('city')) || ''
}

const actions = {
  /**
   * 用户登录
   */
  setUserInfo({ commit }, res) {
    localStorage.setItem('userInfo', JSON.stringify(res))
    localStorage.setItem('loginStatus', true)
    commit(types.SET_USER_INFO, res)
    commit(types.SET_LOGIN_STATUS, true)
  },

  /**
   * 退出登录
   */
  setSignOut({ commit }) {
    localStorage.removeItem('loginStatus')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('openId')
    commit(types.SET_LOGIN_STATUS, false)
    commit(types.SET_USER_INFO, {})
    commit(types.SET_OPEN_ID, '')
  },
  /**
   *   获取用户合同列表
   */
  getUserContractList({ commit }, params) {
    api.getContractList(params)
      .then(res => {
        commit(types.GET_USER_CONTRACT_LIST, res.numberData)
      })
  },
  getUserData({ commit }, token) {
    api.getUserData(token)
      .then((res) => {
        commit(types.GET_USER_DATA, res.numberData)
      })
  },
  getIdCard({ commit }, token) {
    api.getIdCard(token)
      .then((res) => {
        commit(types.GET_USER_ID_CARD, res.numberData)
      })
  },
  setOpenId({ commit }, res) {
    localStorage.setItem('openId', JSON.stringify(res))
    commit(types.SET_OPEN_ID, res)
  },
  setCity({ commit }, res) {
    localStorage.setItem('city', JSON.stringify(res))
    commit(types.SET_CITY, res)
  }
}

const getters = {
  userData: state => state.userData,
  loginStatus: state => state.loginStatus,
  userInfo: state => state.userInfo,
  userContractList: state => state.userContractList,
  idCard: state => state.idCard,
  openId: state => state.openId,
  city: state => state.city
}

const mutations = {
  [types.SET_USER_INFO](state, res) {
    state.userInfo = res
  },
  [types.SET_LOGIN_STATUS](state, status) {
    state.loginStatus = status
  },
  [types.GET_USER_CONTRACT_LIST](state, res) {
    state.userContractList = res
  },
  [types.GET_USER_DATA](state, res) {
    state.userData = res
  },
  [types.GET_USER_ID_CARD](state, res) {
    state.idCard = res
  },
  [types.SET_OPEN_ID](state, res) {
    state.openId = res
  },
  [types.SET_CITY](state, res) {
    state.city = res
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
