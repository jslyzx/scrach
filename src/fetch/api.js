import axios from 'axios'
import qs from 'qs'

import * as _ from '../util/tool'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://106.14.96.37:83/';

//POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  _.toast("错误的传参", 'fail');
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
  _.toast("网络异常", 'fail');
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
  getFgy(id){
    return fetch('/api/User/Queryfgy', {HouseId: id})
  }
}
