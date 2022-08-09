import request from '@/utils/request'


/**
 * 获取一定日期范围之内的合作商分成汇总数据
 * partnerName	否		合作商名称
 * start	是	2020-01-01	开始日期时间
 * end	是	2020-01-01	结束日期时间
 * pageIndex	是		
 * pageSize	是		
 * @param {Object} params 
 * @returns Promise
 */
export const partnerCollectApi = (params) => {
    return request({
        url: '/order-service/report/partnerCollect',
        params
    })
}

/**
 * 获取一定时间范围之内的分成总数
 * partnerId	否		合作商Id
 * start	是	2020-01-01 12:00:00	开始日期时间
 * end	是	2020-01-01 12:00:00	结束日期时间
 * @param {Object} params 
 * @returns Promise
 */
export const totalBillApi = (params) => {
    return request({
        url: '/order-service/report/totalBill',
        params
    })
}

/**
 * 获取一定时间范围之内的收入
 * partnerId	否		合作商Id
 * start	是	2020-01-01 00:00:00	开始日期时间
 * end	是	2020-01-01 00:00:00	结束日期时间
 * innerCode	否		售货机编号
 * @param {Object} params 
 * @returns Promise
 */
export const orderAmountApi = (params) => {
    return request({
        url: '/order-service/report/orderAmount',
        params
    })
}

/**
 * 获取一定时间范围之内的订单总数
 * partnerId	否		合作商Id
 * start	是	2020-01-01 00:00:00	开始日期时间
 * end	是	2020-01-01 00:00:00	结束日期时间
 * innerCode	否		售货机编号
 * @param {Object} params 
 * @returns Promise
 */
export const orderCountApi = (params) => {
    return request({
        url: '/order-service/report/orderCount',
        params
    })
}
