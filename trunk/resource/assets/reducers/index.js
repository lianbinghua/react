/**
 * 
 * @authors weilei.zhu (purelite.zhu@gmail.com)
 * @date    2016-04-01 10:57:05
 * @version $Id$
 * 命名规范 red+模块名称
 */


import { combineReducers } from 'redux'
import redHome from 'reducers/home'
import redTutor from 'reducers/tutor'
import redGoodsDetail from 'reducers/goodsDetail'
import ReducerOrderDetail from 'reducers/orderDetail'
import ReducerAddress from 'reducers/address'

const rootReducer = combineReducers({
  redTutor,
  redHome,
  redGoodsDetail,
  ReducerOrderDetail,
  ReducerAddress
})
export default rootReducer