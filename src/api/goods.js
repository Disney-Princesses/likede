import request from '@/utils/request'

// 获取商品类型数据 商品类型搜索
export function getGoodsTypeApi(pageIndex) {
  return request({
    url: '/vm-service/skuClass/search',
    params: {
      pageIndex,
    },
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
export function getGoodsList(pageIndex) {
  return request({
    url: '/vm-service/sku/search',
    params: {
      pageIndex: pageIndex,
    },
  })
}

// 新增商品
export function addNewGood(objectData) {
  return request({
    url: '/vm-service/sku',
    method: 'POST',
    data: {
      ...objectData,
    },
  })
}

// 修改商品
export function editGoodApi(skuId, ObjectData) {
  return request({
    url: '/vm-service/sku/' + skuId,
    method: 'PUT',
    data: {
      ...ObjectData,
    },
  })
}

// 商品数据导入
export function importGoodData(fileName) {
  return request({
    url: '/vm-service/sku/upload',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: fileName,
  })
}

// 图片上传
export function uploadImg(fileName) {
  return request({
    url: '/vm-service/sku/fileUpload',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: fileName,
  })
}
