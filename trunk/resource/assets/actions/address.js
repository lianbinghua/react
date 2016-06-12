import * as types from '../constants/constants'

export function getAddressListData(pageNumber){
	return dispatch=>{
		return $.sendData({
			url:types.API+'/address/MainServlet?method=getAllAddress&req_fmt_type=jsonp&req_str={"scope":"11102","pageNumber":'+
			    pageNumber+',"pageSize":"10"}',
			success:function(data){
				dispatch(receiveAddressList(data));
			}
		})
	}
}

function receiveAddressList(data){
        return{
        	type:types.GET_ADDRESS_LIST,
        	data:data,
        	receiveAt:Date.now()
        }
} 