import request from '@/utils/request'
import store from '@/store'

/**
 * 人员搜索(列表页)
 * @param {*} params
 * pageIndex 当前页
 * pageSize
 * userName  人员名称
 * roleId    角色Id
 * isRepair  true/false	是否是运维人员
 * @returns
 */
export const getPeopleList = (params) => {
  return request({
    url: '/user-service/user/search',
    method: 'GET',
    params,
  })
}

/**
 * 角色列表
 * @returns
 */
export const getRolesList = () => {
  return request({
    url: '/user-service/role',
    method: 'GET',
  })
}

/**
 * 区域列表
 * @returns
 */
export const getRegionsList = () => {
  return request({
    url: '/vm-service/region/search',
    method: 'GET',
    params: {
      pageIndex: 1,
      pageSize: 100000,
    },
  })
}

/**
 * 添加人员
 * @returns
 */
export const addPeople = (data) => {
  return request({
    url: '/user-service/user',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 * 发送图片
 * @param {*} data  FormData()
 * @returns
 */
export const addImg = (data) => {
  return request({
    url: '/vm-service/sku/fileUpload',
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: store.state.user.userInfo.token,
    },
  })
}

/**
 * 添加人员
 * @returns
 */
export const editPeople = (id, data) => {
  return request({
    url: '/user-service/user/' + id,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 * 删除人员
 * @returns
 */
export const delPeople = (id) => {
  return request({
    url: '/user-service/user/' + id,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
