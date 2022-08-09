// 处理时间
export const handleTime = (data) => {
  data = data.replace('T', ' ').replace('-', '.').replace('-', '.')
  return data
}

// 处理工单状态
export const handleStatus = (data) => {
  const status = ['待办', '进行', '取消', '完成']
  return status[data - 1]
}

export const taskStatus = (data, status) => {
  const statusList = ['待办', '进行', '取消', '完成']
  status = statusList.findIndex((item) => item === data) + 1
  return status
}

// 处理订单状态
export const handleOrder = (data) => {
  const statusList = ['未支付', '支付完成', '出货成功', '出货失败']
  return statusList[data]
}
