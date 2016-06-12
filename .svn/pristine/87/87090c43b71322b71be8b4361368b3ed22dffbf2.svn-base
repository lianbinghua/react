import * as types from '../constants/constants'

export default function ReducerOrderDetail(state = {}, action){  
  switch (action.type) {
    case types.GET_ORDER_DETAIL_DATA:
         return Object.assign({}, state, {
           detailData:action.data.Result.Data
        });  
    case types.GET_LOGISTICS_DATA:
         return Object.assign({},state,{
          logisticsData:action.data
         })  
    default:
      return state
  }
}