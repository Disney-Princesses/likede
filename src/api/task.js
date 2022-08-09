import request from '@/utils/request'
/**
 * 工单搜索/获取工单
 * @param {*} params 搜索所需的对象
 * @returns Promise
 */
export const taskSearch = (params) => {
  return request({
    url: '/task-service/task/search',
    params,
  })
}

/**
 * 通过工单Id获取工单详细信息
 * @param {String} taskId //工单Id
 * @returns
 */
export const getTaskInfoApi = (taskId) => {
  return request({
    url: '/task-service/task/taskInfo/' + taskId,
  })
}

/**
 * 根据工单id获取补货详情
 * @param {String} taskId
 * @returns promise
 */
export const getAddGoodsApi = (taskId) => {
  return request({
    url: `/task-service/taskDetails/${taskId}`,
  })
}
