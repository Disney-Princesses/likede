import request from '@/utils/request'

/**
 * 订单搜索
 * @param {Object} data pageIndex	
pageSize			
orderNo		
startDate			
endDate
 * @returns 
 */
export const getOrderSearch = (data) => {
  return request({
    url: '/order-service/order/search',
    params: data,
  })
}
