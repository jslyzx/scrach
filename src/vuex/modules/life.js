import api from '../../fetch/api'
import * as types from '../types'

const state = {
  fgy: {},
  bxItem: {},
  billList: [],
  billDetail: {}
}

const actions = {
  /**
   * 获取房管员
   */
  getFgy({ commit }, params) {
    api.getFgy(params)
      .then(res => {
        commit(types.GET_FGY, res.numberData)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  setBxItem({ commit }, params) {
    commit(types.SET_BX_ITEM, params)
  },
  getBillList({ commit }, params) {
    // debugger
    api.getBillList(params)
      .then(res => {
        commit(types.GET_BILL_LIST, res.numberData)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  getBillDetail({ commit }, params) {
    api.getBillDetail(params)
      .then(res => {
        commit(types.GET_BILL_DETAIL, res.numberData)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

const getters = {
  fgy: state => state.fgy,
  bxItem: state => state.bxItem,
  billList: state => state.billList,
  billDetail: state => state.billDetail
}

const mutations = {
  [types.GET_FGY](state, res) {
    state.fgy = res
  },
  [types.SET_BX_ITEM](state, res) {
    state.bxItem = res
  },
  [types.GET_BILL_LIST](state, res) {
    state.billList = res
  },
  [types.GET_BILL_DETAIL](state, res) {
    state.billDetail = res
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
