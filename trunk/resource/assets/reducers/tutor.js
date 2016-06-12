import * as types from '../constants/constants'

export default function ReducerTutor(state = {}, action){
  switch (action.type) {
    case types.REQUEST_POSTS:
    console.log('Tutor 一起???')
    return Object.assign({}, state, {
            show:'test'
        });
    case types.SHOW_BAR:
         return Object.assign({}, state, {
            show:true
        });
    case types.HIDE_BAR:
          return Object.assign({}, state, {
            show:false
          })
    default:
      return state
  }
}