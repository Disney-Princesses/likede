import request from "@/utils/request"

/**
 * 获取区域列表
 * @param {Object} params 
 * @returns Promise
 */
export const getAreaListApi = (params) => {
    return request({
        url: '/vm-service/region/search',
        params
    })
}

/**
 * 新增区域
 * @param {String} regionName 区域名称
 * @param {String} remark 备注
 * @returns Promise
 */
export const addAreaApi = (regionName,remark) => {
    return request({
        url: '/vm-service/region',
        method: 'POST',
        data: {
            regionName,
            remark
        }
    })
}

/**
 * 修改区域
 * @param {String} id 区域id
 * @param {String} regionName 区域名称
 * @param {String} remark 备注
 * @returns Promise
 */
export const editAreaApi = (id,regionName,remark) => {
    return request({
        url: '/vm-service/region/' + id,
        method: 'PUT',
        data: {
            regionName,
            remark
        }
    })
}

/**
 * 删除区域
 * @param {String} id 
 * @returns Promise
 */
export const delAreaApi = (id) => {
    return request({
        url: '/vm-service/region/' + id,
        method: 'DELETE'
    })
}

/**
 * 点位搜索
 * @param {Object} params 
 * @returns Promise
    pageIndex			
    pageSize			
    name		点位名称
    regionId	区域id
 */
export const pointSearch = (params) => {
    return request({
        url: 'vm-service/node/search',
        params
    })
}

/**
 * 合作商搜索
 * @param {Object} params 
 * @returns Promise
 */
export const partnerSearchApi = (params) => {
    return request({
        url: '/user-service/partner/search',
        params
    })
}