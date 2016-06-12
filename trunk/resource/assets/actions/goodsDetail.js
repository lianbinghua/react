import * as types from '../constants/constants'

//获取商品详情数据
export function getGoodsInfoData(id){
  return dispatch =>{
    return $.sendData({
        url:types.API+'/shopping/MainServlet?method=getGoodsInfo&cookie_need_auth=1&req_fmt_type=jsonp&req_str={"scope":"11102","goodsList":[{"goodsID":"'+id+'","cartMethod":"0","callType":0}],"shippingAddress":4,"withGoodsDesc":"1","withExtendsInfo":"1","withSaleCatInfo":"1","withSavInfo":"1","withPicInfo":"1","withSpecialInfo":"1","withPriceInfo":"1","withStockInfo":"1","withShippingInfo":"1","withSkuInfo":"1","withOrhterGoodsInfo":"1"}', 
        success: function(data){
            console.log(data)
            dispatch(getPosts(data))
        }
    })
  }
}

//获取商品评论数据
export function getGoodsComments(id){
  return dispatch =>{
    return $.sendData({
        url:types.TTAPI+'/index.php?scope=11102&r=api/tReview/list&t=911911911&goods_id='+id+'&type=0&page_no=1&page_size=10', 
        success: function(data){
            console.log(data)
            // dispatch(getPosts(data))
        }
    })
  }
}

function getPosts(data) {
  return {
    type: types.GET_GOODS_DATA,
    data:data,
  }
}