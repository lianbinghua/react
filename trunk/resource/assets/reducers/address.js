import * as types from '../constants/constants'

export default function ReducerAddress(state={},action){	
    switch (action.type){
        case types.GET_ADDRESS_LIST:
             return Object.assign({},state,{
             	addressList:action.data.Result.Data
             })
        default:
            return state
    }
}