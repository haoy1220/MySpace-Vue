import request from '../utils/request';
import qs from 'qs'


export default {
  login(email, password) {
    return request({
      url: '/user/login',
      method: 'post',
      data: qs.stringify({
        email: email,
        password: password
      })
    })
  },

  checkEmail(email) {
    return request({
      url: '/user/checkValid',
      method: 'post',
      data: qs.stringify({
        email: email
      })
    })
  },

  register(email, nickname, password, sex) {
    return request({
      url: '/user',
      method: 'post',
      data: qs.stringify({
        email: email,
        nickname: nickname,
        password: password,
        sex: sex === '男' ? 1 : 0
      })
    })
  },

  active(id, activeCode) {
    return request({
      url: '/user/active',
      method: 'post',
      data: qs.stringify({
        //获取url？后面的参数
        id: id,
        activeCode: activeCode
      })
    })
  },

  forget(email, newPassword, verifyCode) {
    return request({
      url: '/user/resetPassword',
      method: 'put',
      data: qs.stringify({
        email: email,
        newPassword: newPassword,
        verifyCode: verifyCode
      })
    })
  },


  verifyEmail(email) {
    return request({
      url: '/user/verifyEmail',
      method: 'post',
      data: qs.stringify({
        email: email
      })
    })
  },

  getUserInfo(email) {
    return request({
      url: '/user/' + email,
      method: 'get',
    })
  },


  updateUserInfo(email, nickname) {
    return request({
      url: '/user/' + email,
      method: 'put',
      data: qs.stringify({
        nickname: nickname
      })
    })
  },

  getUsers(pageNum, pageSize) {
    return request({
      url: '/user/' + pageNum + "/" + pageSize,
      method: 'get',
    })
  },

  deleteUser(id) {
    return request({
      url: '/user/' + id,
      method: 'delete',
    })
  },

  getUsersInfo(){
    return request({
      url: '/user/boy',
      method: 'get',
    })
  }
}
