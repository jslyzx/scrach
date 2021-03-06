import api from '../../fetch/api'
import * as types from '../types'

/**
 * App通用配置
 */
const state = {
  loading: false,
  showToast: false,
  leftNavStatus: false,
  showSuccess: true,
  showFail: false,
  toastMsg: '操作成功',
  showTimePicker: false,
  alertMsg: '退出登录',
  showAlert: false,
  //维修科目列表
  repairSubjectList: [],
  bankList: []
}

const actions = {
  setLoadingState({ commit }, status) {
    commit(types.COM_LOADING_STATUS, status)
  },
  setNavState({ commit }, status) {
    commit(types.COM_NAV_STATUS, status)
  },
  showToast({ commit }, status) {
    commit(types.COM_SHOW_TOAST, status)
  },
  showSuccess({ commit }, status) {
    commit(types.COM_SHOW_SUCCESS, status)
  },
  showFail({ commit }, status) {
    commit(types.COM_SHOW_FAIL, status)
  },
  toastMsg({ commit }, str) {
    commit(types.COM_TOAST_MSG, str)
  },
  showAlert({ commit }, status) {
    commit(types.COM_SHOW_ALERT, status)
  },
  alertMsg({ commit }, str) {
    commit(types.COM_ALERT_MSG, str)
  },
  showTimePicker({ commit }, status) {
    commit(types.COM_SHOW_TIME_PICKER, status)
  },
  /**
   *   获取维修科目列表
   */
  getRepairSubjectList({ commit }) {
    api.getRepairSubjectList()
      .then(res => {
        commit(types.GET_REPAIR_SUBJECT_LIST, res.numberData)
      })
  },
  queryBankList({ commit }) {
    api.queryBankList()
      .then(res => {
        commit(types.GET_BANK_LIST, res.numberData)
      })
  }
}

const getters = {
  loading: state => state.loading,
  showToast: state => state.showToast,
  showAlert: state => state.showAlert,
  repairSubjectList: state => state.repairSubjectList,
  bankList: state => state.bankList
}


const mutations = {
  [types.COM_LOADING_STATUS](state, status) {
    state.loading = status
  },

  [types.COM_SHOW_TOAST](state, status) {
    state.showToast = status
  },

  [types.COM_SHOW_SUCCESS](state, status) {
    state.showSuccess = status
  },

  [types.COM_SHOW_FAIL](state, status) {
    state.showFail = status
  },

  [types.COM_TOAST_MSG](state, str) {
    state.toastMsg = str
  },

  [types.COM_NAV_STATUS](state, status) {
    state.leftNavStatus = status
  },

  [types.COM_SHOW_TIME_PICKER](state, status) {
    state.showTimePicker = status
  },

  [types.COM_SHOW_ALERT](state, status) {
    state.showAlert = status
  },
  [types.COM_ALERT_MSG](state, str) {
    state.alertMsg = str
  },
  [types.GET_REPAIR_SUBJECT_LIST](state, status) {
    state.repairSubjectList = status
  },
  [types.GET_BANK_LIST](state, res) {
    state.bankList = res
  }
}


export default {
  state,
  actions,
  getters,
  mutations
}
