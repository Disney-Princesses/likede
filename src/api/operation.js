import request from '@/utils/request'

/**
 * 工单搜索/获取工单
 * @param {*} params 搜索运维工单的信息
 * @returns
 */
export const TaskOperationApi = (params) => {
  return request({
    url: '/task-service/task/search',
    params,
  })
}

/**
 * 根据设备编号获取维修人员列表
 * @param {String} innerCode //设备编号
 * @returns
 */
export const getRepairUserList = (innerCode) => {
  return request({
    url: '/user-service/user/repairerList/' + innerCode,
  })
}
