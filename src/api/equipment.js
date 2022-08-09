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

/**
 *  获取售货机类型
 * @param {} typeId 售货机id
 * @returns Promise
 */
export const getVmTypeInfo = (typeId) => {
  return request({
    url: `/vm-service/vmType/${typeId}`,
  })
}
/**
 * 获取售货机货道详情
 * @param {*} innerCode 售货机编号
 * @returns promise
 */
export const getChannelInfo = (innerCode) => {
  return request({
    url: `/vm-service/channel/channelList/${innerCode}`,
  })
}
/**获取商圈类型
 *
 * @param {} id 商圈类型id
 * @returns Promise
 */
export const getbusiness = (id) => {
  return request({
    url: 'vm-service/businessType/name/' + id,
  })
}

/**获取商圈下销量前10的商品(补货推荐)
 *
 * @param {*} id  商圈类型id
 * @returns
 */
export const getbusinessList = (id) => {
  return request({
    url: '/vm-service/sku/businessTop10/' + id,
  })
}
/**
 *  获取一定时间范围之内的收入
 * @param {Object} params
 * partnerid 合作商id
 * start 开始日期
 * end 结束日期
 * innerCode 售货机编号
 * @returns Promise
 */
export const getOrderAmount = (params) => {
  return request({
    url: '/order-service/report/orderAmount',
    params,
  })
}

/**
 *  获取一定时间范围之内的订单总数
 * @param {Object} params
 * partnerid 合作商id
 * start 开始日期
 * end 结束日期
 * innerCode 售货机编号
 * @returns Promise
 */
export const getOrderCount = (params) => {
  return request({
    url: '/order-service/report/orderCount',
    params,
  })
}
/** 获取售货机补货次数
 * @param {*} innerCode  设备编号
 * @param {*} start 开始日期
 * @param {*} end 结束日期
 * @param params
 * @returns
 */
export const getSupplyCount = (innerCode, start, end, params) => {
  return request({
    url: `/task-service/task/supplyCount/${innerCode}/${start}/${end}`,
    params,
  })
}

/** 获取售货机维修次数
 * @param {*} innerCode  设备编号
 * @param {*} start 开始日期
 * @param {*} end 结束日期
 * @param params
 * @returns
 */
export const getRepairCount = (innerCode, start, end, params) => {
  return request({
    url: `/task-service/task/repairCount/${innerCode}/${start}/${end}`,
    params,
  })
}

/** 获取售货机商品销量
 * @param {*} innerCode  设备编号
 * @param {*} start 开始日期
 * @param {*} end 结束日期
 * @param params
 * @returns
 */
export const getSkuCollect = (innerCode, start, end, params) => {
  return request({
    url: `/order-service/report/skuCollect/${innerCode}/${start}/${end}`,
    params,
  })
}

// 上传图片
export const imgUpdataApi = (data) => {
  return request({
    url: '/vm-service/sku/fileUpload',
    method: 'POST',
    data,
  })
}
/**售货机类型修改
 *
 * @param {*} id 类型Id
 * @returns Promise
 */
export const modifyVmTypeApi = (data) => {
  return request({
    url: `/vm-service/vmType/${data.typeId}`,
    method: 'PUT',
    data,
  })
}

/**售货机类型新建
 *
 * @param {*} id 类型Id
 * @returns Promise
 */
export const addVmTypeApi = (data) => {
  return request({
    url: `/vm-service/vmType`,
    method: 'POST',
    data,
  })
}

/**售货机类型删除
 *
 * @param {*} id 类型Id
 * @returns Promise
 */
export const removeVmTypeApi = (id) => {
  return request({
    url: `/vm-service/vmType/${id}`,
    method: 'DELETE',
  })
}
/**
 *
 * @param {*} innerCode 售货机编号
 * @param {*} policyId 策略Id
 * @returns
 */
export const CancellationPolicy = (innerCode, policyId) => {
  return request({
    url: `/vm-service/vm/cancelPolicy/${innerCode}/${policyId}`,
    method: 'PUT',
  })
}

/**商品搜索
 *
 * @param {*} pageIndex 页数
 * @returns Promise
 */
export const searchService = (pageIndex, skuName) => {
  return request({
    url: '/vm-service/sku/search',
    params: {
      pageSize: 10,
      pageIndex,
      skuName,
    },
  })
}
/** 货道配置
 *
 * @param {*} data
 * innerCode  售货机编号
 * channelList :{
 * channelCode 货道编码(如：1-1,1-2)
 * skuId :商品Id
 * }
 * @returns Promise
 */
export const channelConfig = (channelList, innerCode) => {
  return request({
    url: '/vm-service/channel/channelConfig',
    method: 'PUT',
    data: {
      channelList,
      innerCode,
    },
  })
}
