import request from '../utils/request';
import qs from 'qs'

export default {
  //根据状态获取项目分页数据
  getProjectList(projectState, pageNum, pageSize) {
    return request({
      url: '/project/' + projectState + '/' + pageNum + '/' + pageSize,
      method: 'get'
    })
  },

  //根据id获取项目
  getProjectDetail(id) {
    return request({
      url: '/project/' + id,
      method: 'get'
    })
  },

  //根据id删除项目
  deleteProject(id) {
    return request({
      url: '/project/' + id,
      method: 'delete'
    })
  },

  //根据id结束项目
  finishProject(id) {
    return request({
      url: '/project/finish/' + id,
      method: 'put'
    })
  },

  //新建项目
  newProject(projectBody, projectDesc) {
    return request({
      url: '/project',
      method: 'post',
      data: qs.stringify({
        projectBody: projectBody,
        projectDesc: projectDesc
      })
    })
  },

  saveProject(id, detail) {
    return request({
      url: '/project/detail/' + id,
      method: 'put',
      data: qs.stringify({
        detail: detail
      }),
      traditional: true,//这里设置为true,让后台能接收到数组，去除数组后的【】
    })
  },

  updateProject(id, projectBody, projectDesc) {
    return request({
      url: '/project/' + id,
      method: 'put',
      data: qs.stringify({
        projectBody: projectBody,
        projectDesc: projectDesc
      }),
    })
  },


}
