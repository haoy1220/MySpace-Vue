import request from '../utils/request';
import qs from 'qs'

export default {
  //新增
  addMemo(memoType, memoEmail, preTime, memoDate, memoContent) {
    return request({
      url: '/memo',
      method: 'post',
      data: qs.stringify({
        memoType: memoType,
        memoEmail: memoEmail,
        preTime: preTime,
        memoDate: memoDate,
        memoContent: memoContent
      })
    })
  },

//根据类型获取分页
  getMemoListByType(type, pageNum, pageSize) {
    return request({
      url: '/memo/' + type + '/' + pageNum + '/' + pageSize,
      method: 'get'
    })
  },

  //根据id删除
  deleteMemo(id) {
    return request({
      url: '/memo/' + id,
      method: 'delete'
    })
  }

}
