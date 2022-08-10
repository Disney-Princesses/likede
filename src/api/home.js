import request from '@/utils/request'

/** 获取当时工单汇总信息(人员统计头部信息)
 *
 * @param {*} start  开始时间
 * @param {*} end    结束时间
 * @returns Promise
 */
export const getTaskReportInfo = (start, end) => {
  return request({
    url: `/task-service/task/taskReportInfo/${start}/${end}`,
  })
}

//  获取一定时间范围之内的订单总数
/**
 * 
 * @param {Object} params 
 * start  开始时间
    end    结束时间
 * @returns Promise
 */
export const getTaskorderCount = (params) => {
  return request({
    url: `/order-service/report/orderCount`,
    params,
  })
}

//  获取一定时间范围之内的收入
/**
 * 
 * @param {Object} params 
 * start  开始时间
    end    结束时间
 * @returns Promise
 */
export const getTaskoRevenueAmount = (params) => {
  return request({
    url: `/order-service/report/orderAmount`,
    params,
  })
}

/** 获取销售前几的商品
 *
 * @param {*} start  开始时间
 * @param {*} end    结束时间
 * @returns Promise
 */
export const getTaskSkuTop = (start, end) => {
  return request({
    url: `/order-service/report/skuTop/${10}/${start}/${end}`,
  })
}
/** 获取销售额统计
 *
 * @param {*} collectType 统计时间类型，1:按日统计，2:按月统计
 * @param {*} start 开始日期
 * @param {*} end 结束日期
 * @returns Promise
 */
export const getAmountCollect = (collectType, start, end) => {
  return request({
    url: `/order-service/report/amountCollect/${collectType}/${start}/${end}`,
  })
}

/** 根据地区汇总销售额数据(销售量分布)
 *
 * @param {*} start 开始日期
 * @param {*} end 结束日期
 * @returns Promise
 */
export const getSalesCollect = (start, end) => {
  return request({
    url: `/order-service/report/regionCollect/${start}/${end}`,
  })
}
/**合作商点位汇总统计
 *
 * @returns Promise
 */
export const getNodeCollect = () => {
  return request({
    url: '/vm-service/node/nodeCollect',
  })
}
/**获取点位总数
 *
 * @returns Promise
 */
export const getNodeCount = () => {
  return request({
    url: '/vm-service/node/count',
  })
}

/**获取点位总数
 *
 * @returns Promise
 */
export const getPartnerCount = () => {
  return request({
    url: '/user-service/partner/count',
  })
}
/**获取10个故障设备列表
 *
 * @returns Promise
 */
export const getAbnormalTop = () => {
  return request({
    url: '/status-service/status/top10',
  })
}
