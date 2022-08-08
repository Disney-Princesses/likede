import request from '@/utils/request'

// 获取商品类型数据 商品类型搜索
export function getGoodsTypeApi() {
  return request({
    url: '/vm-service/skuClass/search',
  })
}

// 新增商品
export function createGoodsTypeApi(className) {
  return request({
    url: '/vm-service/skuClass',
    method: 'POST',
    data: {
      className,
    },
  })
}

// 修改商品类型
export const changeGoodsTypeApi = (classId, className) => {
  return request({
    url: '/vm-service/skuClass/' + classId,
    method: 'PUT',
    data: {
      className,
    },
  })
}

// 删除商品类型
export function delGoodsTypeApi(classId) {
  return request({
    url: '/vm-service/skuClass/' + classId,
    method: 'DELETE',
  })
}

// 获取商品数据
export function getGoodsList() {
  return request({
    url: '/vm-service/sku/search',
  })
}
