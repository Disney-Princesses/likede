import request from '@/utils/request'

// 获取策略管理数据  修改
export function getPolicyDataApi(pageIndex, pageSize, policyName) {
  return request({
    url: '/vm-service/policy/search',
    params: {
      pageIndex,
      pageSize,
      policyName,
    },
  })
}

// 新增策略
export function addPolicy(policyObj) {
  return request({
    url: '/vm-service/policy',
    method: 'POST',
    data: {
      ...policyObj,
    },
  })
}

// 修改策略
export function editPolicy(policyId, currentPolicyObj) {
  return request({
    url: '/vm-service/policy/' + policyId,
    method: 'PUT',
    data: {
      ...currentPolicyObj,
    },
  })
}

// 删除策略
export function delPolicy(policyId, pageIndex, pageSize, policyName) {
  return request({
    url: '/vm-service/policy/' + policyId,
    method: 'DELETE',
    params: {
      pageIndex,
      pageSize,
      policyName,
    },
  })
}
// 根据策略搜索售货机
export function getDetailApi(policyId,pageIndex,pageSize) {
  return request({
    url: '/vm-service/policy/vmList/' + policyId,
    params: {
      pageIndex,
      pageSize
    }
  })
}
