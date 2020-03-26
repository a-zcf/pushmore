import axios from 'axios'
import Api from '../api/api'
import Vue from 'vue'
import { Toast } from 'vant'
Vue.use(Toast);
axios.defaults.withCredentials = false
axios.interceptors.request.use(config => {
  config.data = JSON.stringify(config.data)
  config.headers = {
    'Content-Type': 'application/json;charset=UTF-8'
  }
  return config
},
err => {
  return Promise.resolve(err)
})

axios.interceptors.response.use(response => {
  if (response.data.code === '0001') {
    Toast.fail(response.data.message);
     let url = location.href
    //  window.location.href = Api.base + Api.Login + '?redirect_url=' + url
  }
  return response
},
error => {
  if (error.response && error.response.data.code === '0001') {
    Toast.fail(error.response.data);
    return Promise.reject(error.response.data)
  }
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
export const getRequest = (url) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
