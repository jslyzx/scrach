import axios from 'axios'
import qs from 'qs'

import * as _ from '../util/tool'

import store from '../vuex/store'

// axios 配置
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = window.g.ApiUrl;

//POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  _.toast("错误的传参", 'fail');
  store.dispatch('setLoadingState', false);
  return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) => {
  if (res.status !== 200) {
    // _.toast(res.data.msg);
    return Promise.reject(res);
  }
  return res;
}, (error) => {
  //_.toast("网络异常", 'fail');
  store.dispatch('setLoadingState', false);
  return Promise.reject(error);
});

export function fetch(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default {
  /**
   * 用户登录
   */
  Login(params) {
    return fetch('/api/User/login', params)
  },

  /**
   * 用户注册
   */
  Regist(params) {
    return fetch('/api/User/register', params)
  },

  /**
   * 发送注册验证码
   */
  RegistVerifiCode(params) {
    return fetch('/api/User/Sendyzm', params)
  },

  /**
   * 获取约跑步列表
   */
  SportsList() {
    return fetch('/api/sportList')
  },

  /**
   * 获取约出行列表
   */
  TravelsList() {
    return fetch('/api/travelList')
  },

  /**
   * 获取约跑步详情
   */
  SportsDetail(id) {
    return fetch('/api/sportDetail', { sportId: id })
  },

  /**
   * 获取约出行详情
   */
  TravelsDetail(id) {
    return fetch('/api/travelDetail', { travelId: id })
  },

  /**
   * 获取出行活动点击次数
   */
  travelClicks(id) {
    return fetch('/api/travelClickNum', { travelId: id })
  },

  /**
   * 获取用户信息
   */
  UserInfo(id) {
    return fetch('/users/api/userInfo', { userId: id })
  },

  /**
   * 获取用户发布约行个数
   */
  getPubTotravelNum(id) {
    return fetch('/users/api/getPubTotravelNum', { userId: id })
  },

  /**
   * 获取用户自己发布的约行
   */
  getMyTravel(id) {
    return fetch('/users/api/myTravel', { userId: id })
  },
  /**
   * 获取用户自己发布的约跑
   */
  getMySport(id) {
    return fetch('/users/api/mySport', { userId: id })
  },

  /**
   * 发布约行活动
   */
  PostTravel(params) {
    return fetch()
  },

  /**
   * 获取全国JSON数据
   */
  getAddressJson() {
    return fetch('/api/address')
  },
  /**
   * 获取合同列表
   */
  getContractList(params) {
    return fetch('/api/Contract/Querybyphone', params)
  },
  getFgy(id) {
    return fetch('/api/User/Queryfgy', { HouseId: id })
  },
  getRepairSubjectList() {
    return fetch('/api/Repaire/subject')
  },
  /**
   * 保存报修
   */
  saveBx(params) {
    return fetch('/api/Repaire/save', params)
  },
  /**
  获取账单列表,PayStatus:0未支付1已支付 2全部
  */
  getBillList(params) {
    return fetch('/api/Bill/Querylist', params)
  },
  getBillDetail(params) {
    return fetch('/api/Bill/Querybillbyid', params)
  },
  billAliPay(params) {
    return fetch('/api/Bill/webPay_zfb', params)
  },
  billWXPay(params) {
    return fetch('/api/Bill/webPay_wx', params)
  },
  elecAliPay(params) {
    return fetch('/api/Elec/chongzhi', params)
  },
  elecWXPay(params) {
    return fetch('/api/PCElec/wxchongzhi', params)
  },
  initchongzhi(params) {
    return fetch('/api/Elec/Initchongzhi', params)
  },
  getUserData(token) {
    return fetch('/api/User/Query', { access_token: token })
  },
  getIdCard(token) {
    return fetch('/api/User/IdCard', { access_token: token })
  },
  getMyRepairList(params) {
    return fetch('/api/Repaire/Querylist', params)
  },
  getContractDetail(id) {
    return fetch('/api/Contract/QuerybyId', { Id: id })
  },
  updatePhone(params) {
    return fetch('/api/Sysuser/UpdatePhone', params)
  },
  updatePassword(params) {
    return fetch('/api/Sysuser/UpdatePassWord', params)
  },
  getLockList(params) {
    return fetch('/api/House/Querylocal', params)
  },
  getContractTemplate(params) {
    return fetch('/api/template/morenQuery', params)
  },
  signContract(params) {
    return fetch('/api/Contract/qianyue', params)
  },
  getkeyboardPwd(params) {
    return fetch('/api/kjx/getkeyboardPwd', params)
  },
  verifyYzm(params) {
    return fetch('/api/User/Verification', params)
  },
  queryTuizu(params) {
    return fetch('/api/Contract/Querytuizu', params)
  },
  queryBankList() {
    return fetch('/api/bankcard/Query')
  },
  approveTuizu(params) {
    return fetch('/api/Contract/tuizu', params)
  },
  saveFeeback(content) {
    return fetch('/api/feeback/save', content)
  },
  queryTuizuDetail(params) {
    return fetch('/api/tuizu/Query', params)
  },
  queryElecByMonth(params) {
    return fetch('/api/house/zkaddupmonth', params)
  },
  queryOpenId(params) {
    return fetch('/api/User/queryopenid', params)
  },
  queryCity() {
    return fetch('/api/BaseData/QueryCity')
  },
  queryHomeData(params) {
    return fetch('/api/app/Index', params)
  },
  getHouseDetail(params) {
    return fetch('/api/House/xq', params)
  },
  collectHouse(params) {
    return fetch('/api/House/collection', params)
  },
  cancelCollect(params) {
    return fetch('/api/House/cancelcollection', params)
  },
  saveAppointment(params) {
    return fetch('/api/Appointment/save', params)
  },
  queryAppointmentList(params) {
    return fetch('/api/Appointment/list', params)
  },
  queryCollectionList(params) {
    return fetch('/api/House/collectionlist', params)
  },
  saveTg(params) {
    return fetch('/api/Basic/savetuoguan', params)
  },
  queryTg(token) {
    return fetch('/api/Basic/Querytg', { access_token: token })
  },
  getSearchTips(Name) {
    return fetch('/api/House/SearchTip', { Name: Name })
  },
  queryMetro(CityName) {
    return fetch('/api/app/QueryMetro', { CityName: CityName })
  },
  queryArea(name) {
    return fetch('/api/Map/QueryArea', { name: name })
  },
  searchHouse(params) {
    return fetch('/api/House/zkhouselist', params)
  },
  searchWorkNear(params) {
    return fetch('/api/Map/WorkTip', params)
  },
  querySignUrl(id) {
    return fetch('/api/contract/queryurl', { Id: id })
  }
}
