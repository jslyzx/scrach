import api from '../../fetch/api'
import * as types from '../types'

const state = {
  fgy: {},
  bxItem: {}
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
  setBxItem({commit}, params){
    commit(types.SET_BX_ITEM, params)
  }
}

const getters = {
  fgy: state => state.fgy,
  bxItem: state => state.bxItem
}

const mutations = {
  [types.GET_FGY](state, res) {
    state.fgy = res
  },
  [types.SET_BX_ITEM](state, res){
    state.bxItem = res
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
