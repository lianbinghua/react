import * as types from '../constants/constants'
//获取cms数据
export function hideBar(){
  return {
    type: types.HIDE_BAR
  }
}

export function showBar(){
  return {
    type: types.SHOW_BAR
  }
}

export function actionTypeTest(){
  console.log('是同时执行了吗???')
  return {
    type: types.REQUEST_POSTS
  }
}