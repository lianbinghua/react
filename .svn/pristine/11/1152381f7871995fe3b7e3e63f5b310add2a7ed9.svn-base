import * as types from '../constants/constants'


export default function ReducerHome(state = {}, action){
  switch (action.type) {
    case types.REQUEST_POSTS:
         console.log('我要发请求了 显示进度条吧21111');
         return Object.assign({}, state, {
          isFetching: true,
        });
    case types.RECEIVE_POSTS:
          console.log('请求发完 拿到数据了');
          return Object.assign({}, state, {
            isFetching: false,
            img: action.data.result.content[0].img,
            lastUpdate:action.receivedAt
          })
   case types.GET_PHASE_DATA:
        console.log('GET_PHASE_DATA拿到数据了');
        return Object.assign({}, state, {
          isFetching: false,
          phase: action.data.result.mbPhaseInfo.mbPhaseInfoList,
          lastUpdate:action.receivedAt
        })
    default:
      return state
  }
}

