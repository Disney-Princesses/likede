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

/**
 * 新增合作商
 * @param {Object} data 
 * @returns  Promise
 */
export const addPartnerApi = (data) => {
    return request({
        url: '/user-service/partner',
        method: 'POST',
        data
    })
}


/**
 * 修改合作商
 * @param {String} id 
 * @returns  Promise
 */
 export const editPartnerApi = (id,data) => {
    return request({
        url: '/user-service/partner/' + id,
        method: 'PUT',
        data
    })
}

/**
 * 删除合作商
 * @param {String} id 
 * @returns Promise
 */
export const delPartnerApi = (id) => {
    return request({
        url: '/user-service/partner/' + id,
        method: 'DELETE'
    })
}

/**
 * 重置合作商密码
 * @param {String} id 
 * @returns Promise
 */
export const resetPartnerPwdApi = (id) => {
    return request({
        url: '/user-service/partner/resetPwd/' + id,
        method: 'PUT'
    })
}

/**
 * 点位搜索
 * pageIndex			
pageSize			
name		点位名称
regionId			区域id
 * @param {Object} params 
 * @returns Promise
 */
export const pointSearchApi = (params) => {
    return request({
        url: '/vm-service/node/search',
        params
    })
}

/**
 * 获取点位详情
 * @param {String} id 点位ID 
 * @returns Promise
 */
export const pointDetailApi = (id) => {
    return request({
        url: '/vm-service/node/vmList/' + id,
    })
}

/**
 * 删除点位
 * @param {String} id 点位id
 * @returns Promise
 */
export const delPointApi = (id) => {
    return request({
        url: '/vm-service/node/' + id,
        method: 'DELETE'
    })
}

/**
 * 商圈列表
 * @returns 
 */
export const businessArea = () => {
    return request({
        url: 'vm-service/businessType'
    })
}