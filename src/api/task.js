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

/**
 *根据设备编号获取补货清单
 * @param {String} innerCode //设备编号
 * @returns
 */
export const getreplenishListApi = (innerCode) => {
  return request({
    url: '/vm-service/channel/channelList/' + innerCode,
  })
}

/**
 * 新建工单
 * @param {Object} body //新建工单需要参数
 * @returns
 */
export const addTaskListApi = (data) => {
  return request({
    url: '/task-service/task/create',
    method: 'POST',
    data,
  })
}

/**
 * 根据设备编号获取运营人员列表
 * @param {String} innerCode //设备编号
 * @returns
 */
export const getOperatorUser = (innerCode) => {
  return request({
    url: '/user-service/user/operatorList/' + innerCode,
  })
}

/**
 * 获取所有工单类型
 * @returns promise
 */
export const getTaskStatusList = () => {
  return request({
    url: '/task-service/taskType/list',
  })
}

/**
 * 取消工单
 * @param {Object} data  //teskId工单Id desc拒绝描述
 * @returns
 */
export const concelTask = (data) => {
  return request({
    url: '/task-service/task/cancel/' + data.taskId,
    method: 'POST',
    data: {
      desc: data.desc,
      taskId: data.taskId,
    },
  })
}

/**设置自动补货工单阈值
 * @param {int} alertValue //预警值(百分比，如50代表，满量的百分之50为补货预警值)
 * @returns promise
 */
export const setAutoSupply = (alertValue) => {
  return request({
    url: '/task-service/task/autoSupplyConfig',
    method: 'POST',
    data: {
      alertValue,
    },
  })
}
