import api from '../../fetch/api'
import * as types from '../types'

const state = {
  fgy: {}
}

const actions = {
  /**
   * 获取房管员
   */
  getFgy({ commit }, params) {
    debugger
    api.getFgy(params)
      .then(res => {
        debugger
        commit(types.GET_FGY, res.numberData)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

const getters = {
  fgy: state => state.fgy
}

const mutations = {
  [types.GET_FGY](state, res) {
    state.fgy = res
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
