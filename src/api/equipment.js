import request from '@/utils/request'
/**
 * 获取搜索售货机(售货机列表)
 * @param {Object}  params
 * pageIndex 页码
 * pageSize 每页数量
 * status 售货机状态 （0:未投放；1：运营，3：撤机）
 * @returns Promise
 */
export const getServiceData = (params) => {
  return request({
    url: '/vm-service/vm/search',
    params,
  })
}
/**获取售货机类型列表
 * 
 * @param {Object} params 
 * pageIndex 页码
   pageSize 每页数量
   name 名称
 * @returns  Promise
 */
export const getServiceListVmType = (params) => {
  return request({
    url: '/vm-service/vmType/search',
    params,
  })
}

/**
 * 获取点位（点位搜索）
 * @param {Object} params 
 *  pageIndex 页码
   pageSize 每页数量
   name 名称
   regionid 区域ID
 * @returns  Promise
 */
export const getNodeList = (params) => {
  return request({
    url: '/vm-service/node/search',
    params,
  })
}
/**
 * 新增售货机
 * @param {Object} data
 * vmType 售货机类型Id
 * nodeId 所属点位Id
 * createUserId 创建人Id
 * @returns Promise
 */
export const addServiceData = (data) => {
  return request({
    url: '/vm-service/vm',
    method: 'POST',
    data,
  })
}
/**
 * 获取策略列表
 * @param {Object} data
 * @returns
 */
export const getPolicyList = (params) => {
  return request({
    url: '/vm-service/policy',
    params,
  })
}
/**
 *
 * @param {Object} data
 * innerCodeList 售货机编号列表 []
 * policyId  策略列表
 * @returns
 */
export const applyPolicy = (data) => {
  return request({
    url: '/vm-service/vm/applyPolicy',
    method: 'PUT',
    data,
  })
}
/**
 * 查询售货机策略
 * @param {*} innerCode 售货机编号
 * @returns Promise
 */
export const getVmPolicy = (innerCode) => {
  return request({
    url: `/vm-service/policy/vmPolicy/${innerCode}`,
  })
}

/**
 * 修改售货机点位
 * @param {} id 售货机id
 * @param {*} nodeId  点位id
 * @returns Promise
 */
export const ModifyVmNode = (id, nodeId) => {
  return request({
    url: `/vm-service/vm/${id}/${nodeId}`,
    method: 'PUT',
  })
}
