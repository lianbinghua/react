import * as types from '../constants/constants'
import fetch from 'isomorphic-fetch'
//获取cms数据
//

export function getCmsData(id){
  return dispatch =>{
    dispatch(requestPosts())
   /*  return fetch(`http://h5.tootoo.cn/cms/identity`+id+`.html`,{ mode:"cors-with-forced-preflight" })
      .then(res => console.log('Rs==',res))
      .then(json => dispatch(receivePosts(json)))*/
    return $.sendData({
          url:'http://h5.tootoo.cn/cms/identity'+id+'.html', 
          success: function(data){
              dispatch(receivePosts(data))
          }
      })
  }
}

//获取分类
export function getMbPhase(){
  return dispatch =>{
    return $.sendData({
          url:types.API+'/muying/themeInfo/getMbPhase.jsonp?str={"scope":"11102"}', 
          success: function(data){
              dispatch(receivePhase(data))
          }
      })
  }
}
function receivePhase(data){
  return {
    type: types.GET_PHASE_DATA,
    data:data,
    receivedAt: Date.now()
  }

}

function requestPosts() {
  return {
    type: types.REQUEST_POSTS,
  }
}
function receivePosts(data) {
  return {
    type: types.RECEIVE_POSTS,
    data:data,
    receivedAt: Date.now()
  }
}

/*//获取文章，先触发requestPosts开始获取action，完成后触发receivePosts获取成功的action
function fetchPosts(reddit) {
  return dispatch => {
    dispatch(requestPosts(reddit))
    return fetch(`https://www.reddit.com/r/${reddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(reddit, json)))
  }
}

//上锁
function shouldFetchPosts(state, reddit) {
  const posts = state.reducer.postsByReddit[reddit]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

//如果需要则开始获取文章
export function fetchPostsIfNeeded(reddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), reddit)) {
      return dispatch(fetchPosts(reddit))
    }
  }
}*/
