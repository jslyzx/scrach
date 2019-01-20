import api from '../../fetch/api'
import * as types from '../types'

const state = {
  // 用户登录状态
  loginStatus: JSON.parse(localStorage.getItem('loginStatus')) || false,
  // 用户登录信息
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
  // 用户数据信息
  userData: [],
  // 用户合同列表
  userContractList: JSON.parse(localStorage.getItem('userContractList')) || []
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
    localStorage.removeItem('userContractList')
    commit(types.SET_LOGIN_STATUS, false)
    commit(types.SET_USER_INFO, {})
    commit(types.SET_USER_CONTRACT_LIST, [])
  },
  /**
   *   设置用户合同列表
   */
  setUserContractList({ commit }, params) {
    api.getContractList(params)
      .then(res => {
        localStorage.setItem('userContractList', JSON.stringify(res.numberData))
        commit(types.SET_USER_CONTRACT_LIST, res.numberData)
      })
  },
}

const getters = {
  getUserData: state => state.userData,
  loginStatus: state => state.loginStatus,
  userInfo: state => state.userInfo,
  userContractList: state => state.userContractList
}

const mutations = {
  [types.SET_USER_INFO](state, res) {
    state.userInfo = res
  },

  [types.SET_LOGIN_STATUS](state, status) {
    state.loginStatus = status
  },

  [types.GET_USER_DATA](state, res) {
    state.userData = res
  },
  [types.SET_USER_CONTRACT_LIST](state, res) {
    state.userContractList = res
  }

}

export default {
  state,
  actions,
  getters,
  mutations
}
