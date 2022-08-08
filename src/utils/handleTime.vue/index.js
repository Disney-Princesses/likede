export const handleTime = (data) => {
  data = data.replace('T', ' ').replace('-', '.').replace('-', '.')
  return data
}

export const handleStatus = (data) => {
  const status = ['待办', '进行', '取消', '完成']
  return status[data - 1]
}

export const taskStatus = (data, status) => {
  const statusList = ['待办', '进行', '取消', '完成']
  status = statusList.findIndex((item) => item === data) + 1
  return status
}
