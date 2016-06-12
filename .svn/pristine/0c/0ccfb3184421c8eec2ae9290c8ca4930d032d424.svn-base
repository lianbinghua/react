import * as types from '../constants/constants'

export default function ReducerGoodsDeatil(state = {}, action){
  switch (action.type) {
    case types.GET_GOODS_DATA:
          console.log('bbbbbbbbbbbbbbbbbbbbbb----------------拿到数据');
          return Object.assign({}, state, {
            isFlag: false,
            goodsImg: action.data.Result.Data.goodsInfo[0].picInfo.picPaths,
            goodsInfo:action.data.Result.Data.goodsInfo[0],
            lastUpdate:action.receivedAt
        })
    default:
      return state
  }
}