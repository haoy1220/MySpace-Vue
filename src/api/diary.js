import request from '../utils/request';
import qs from 'qs'

export default {
  //上传图片
  uploadImg(formdata) {
    return request({
      url: '/diary/uploadImg',
      method: 'post',
      data: formdata,
      headers: {'Content-Type': 'multipart/form-data'},
    })
  },

  //添加日记
  addDiary(diaryTitle, diaryBody) {
    return request({
      url: '/diary/',
      method: 'post',
      data: qs.stringify({
        diaryTitle: diaryTitle,
        diaryBody: diaryBody
      })
    })
  },

  //获取分页日志
  getDiaryList(pageNum, pageSize) {
    return request({
      url: '/diary/list/' + pageNum + '/' + pageSize,
      method: 'get',
    })
  },

  //删除日记
  deleteDiary(id) {
    return request({
      url: '/diary/' + id,
      method: 'delete'
    })
  },

  //修改日记
  updateDiary(id, diaryTitle, diaryBody) {
    return request({
      url: '/diary/' + id,
      method: 'put',
      data: qs.stringify({
        diaryTitle: diaryTitle,
        diaryBody: diaryBody
      })
    })
  },

  //根据id获取日记
  getDiaryById(id) {
    return request({
      url: '/diary/' + id,
      method: 'get'
    })
  },

  //获取归档
  getArchive() {
    return request({
      url: '/diary/archive',
      method: 'get'
    })
  },

  searchDiary(text, pageNum, pageSize) {
    return request({
      url: '/diary/' + text + '/' + pageNum + '/' + pageSize,
      method: 'get'
    })
  }

}
