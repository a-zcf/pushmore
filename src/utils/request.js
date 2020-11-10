import axios from 'axios'
import Api from '../api/api'
import Vue from 'vue'
import store from '../store/store'
import * as types from '../store/types'
import { Toast } from 'vant'
Vue.use(Toast);

let T = {};
var url = function (name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
};
T.p = url;

axios.defaults.withCredentials = false
axios.interceptors.request.use(config => {
  var token = T.p('token');
  store.commit(types.LOGIN, token);
  config.data = JSON.stringify(config.data)
  config.headers = {
    'Content-Type': 'application/json;charset=UTF-8'
  }
  if (store.state.token) {
    config.headers.accessToken = `${store.state.token}`;
  }
  return config
},
  err => {
    return Promise.resolve(err)
  })

axios.interceptors.response.use(response => {
  if (response.data.code === 0) {
    return response
  } else if (response.data.code === 1000) {
    let url = location.href
    store.commit(types.LOGOUT)
    Toast.fail(response.data.msg);
    window.location.href = Api.red_url + url
  } else {

  }
  return response
},
  error => {
    if(error.response){
      switch (error.response.data.code) {
        case 101:
          Toast.fail('您还未参与活动!');
          break
        case 102:
          Toast.fail('账号不存在!');
          break
        case 103:
          Toast.fail('账号已被使用!');
      }
    }
    return Promise.reject(error.response.data)
  })
let base = Api.base
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    dataType: 'jsonp',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export const getRequest = (url,params) => {
  return axios({
    method: 'get',
    params:params,
    url: `${base}${url}`,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}