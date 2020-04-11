import axios from 'axios';
import store from "../store/store";
import router from "../router/router";
import {Message, MessageBox} from "element-ui";


//创建axios实例
const service = axios.create({
  baseURL: '/api',
  timeout: 15000,
  header: 'Content-Type:application/x-www-form-urlencoded'
});


//request拦截器
service.interceptors.request.use(config => {
  //请求头预处理，让每个请求在有token的情况下都携带token
  if (store.state.token !== '') {
    config.headers['token'] = store.state.token;
  }
  return config;
});

//response拦截器
service.interceptors.response.use(response => {
//  错误响应在此被拦截，具体调用中不需要判断是否是200响应
  const res = response.data;

  if ((typeof (res.code) != 'undefined' && res.code !== 200)) {
    if ((typeof (res.code) != 'undefined' && res.code !== 403)) {
      //显示失败信息，持续5s
      Message({
        message: res.msg,
        type: "error",
        duration: 5 * 1000
      })
    }

    if (res.code === 403) {
      store.commit('logout');
      MessageBox.confirm('验证失败，点击确定重新登录', '状态异常', {
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        router.push('/login').then(r => {
        });
        location.reload()
      }).catch(() => {
        router.push('/login').then(r => {
        });
        location.reload()
      })
    }
    return Promise.reject('error')
  } else {
    return response.data
  }
}, error => {
  let message;
  if (error.response.status === 504) {
    message = '连接超时'
  } else {
    message = error.message
  }
  Message.error({
    message: message,
    type: "error",
    duration: 5 * 1000
  });
  return Promise.reject(error)
});


export default service
