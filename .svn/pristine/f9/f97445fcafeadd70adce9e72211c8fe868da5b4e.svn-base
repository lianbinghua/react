import * as types from '../constants/constants'

export function getOrderDetailData(orderCode,orderGeneration){
  return dispatch=>{
  	 return $.sendData({
  	 	url:types.API+'/oms/MainServlet?method=getOrderDetail&req_fmt_type=jsonp&req_str={"scope":"11102","orderGeneration":"'+
  	 	     orderGeneration+'","orderCode":"'+orderCode+'"}',
  	 	success:function(data){
            dispatch(receiveOrderDetail(data));
  	 	}
  	 })
  }
}
function receiveOrderDetail(data){
	return{
		type:types.GET_ORDER_DETAIL_DATA,
		data:data,
		receivedAt:Date.now()
	}
} 
export function getOrderLogisticsData(orderID,orderGeneration){
  return dispatch=>{
  	 return $.sendData({
  	 	url:types.API+'/oms/MainServlet?method=getOrderOpt&req_fmt_type=jsonp&req_str={"scope":"11102","orderGeneration":"'+
  	 	    orderGeneration+'","orderId":"'+orderID+'"}',
  	 	success:function(data){     	 	     	 	    
  	 	    var orderOptList=data.Result.Data.orderOptList.reverse();	 		
            dispatch(receiveLogisticsDetail(orderOptList));
  	 	}
  	 })
  }
}
function receiveLogisticsDetail(data){
	return{
		type:types.GET_LOGISTICS_DATA,
		data:data,
		receivedAt:Date.now()
	}
}

