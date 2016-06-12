/**
 * 
 * @authors weilei.zhu (purelite.zhu@gmail.com)
 * @date    2016-03-13 14:28:39
 * @version $Id$
 */

import './orderDetailStyle'
import * as types from '../../constants/constants'
import {getOrderDetailData,getOrderLogisticsData} from 'assets/actions/orderDetail'
import { connect } from 'react-redux'
import { Link } from 'react-router'
var OrderInfo=React.createClass({
	render:function(){
		var data=this.props.data;
		return(
			<div className="order-info">
		       <h2><span className="icons"></span>订单信息</h2>
		       <div>
		          <ul>   
		            <li>订单状态：<span>{data.orderStatusMsg}</span></li>
		            <li>订单号：<span>{data.orderCode}</span></li>
		            <li>下单日期：<span>{data.createDt}</span></li>
		            <li>发货地：<span>{data.substationName}</span></li>
		           <li className={this.props.data.isShowReceiveDt==1?'show':'hide'}>预计收货日期：<span>{this.props.data.receiveDt}</span></li>
		          </ul>
		           <p className={data.remark?'show':'hide'}>备注:{this.props.data.remark}</p>
		       </div>
		    </div>
		)
	}
})
var UserInfo=React.createClass({
	render:function(){
		var data=this.props.data;
		return(
           <div className="consignee-info">
		       <h2><span className="icons"></span>收货人信息</h2>
		       <div>
		          <p><span>{data.receiver}</span><span>{data.mobile}</span></p>
		          <p>{data.shipAddr}</p>
		       </div>
		    </div>
	    )
	}
})

var List=React.createClass({
	render:function(){
		var data=this.props.data;
		return(
	          <li>                   
	             <div className="good-content">	              
	                <div className="good-image">	               
	                  <img src={data.goodsPic}/> 	                
	                </div>                
	                <dl>
	                    <dt>{data.goodsName}</dt>                      
	                </dl>	               
	             </div>
	             <div className="price-number">
	               <span className="price">￥{data.goodsPrice.toFixed(2)}</span>
	               <span className="number">x{data.goodsNumber}</span>
	             </div>                   
	          </li>		         
		)
	}
})
var GoodInfo=React.createClass({
	render:function(){
		var data=this.props.data;		
		return(
			<div className="detail-good-info">
		       <h2><span className="icons"></span>商品信息</h2>
		       <ul>
			       {
                     data.orderItemList.map(function(items,i){
                     	return( <List key={i} data={items}/>)
                     })
			       }		        
		       </ul>
		       <div>
		          <p><span>商品总额</span><span>￥{data.goodsCallFee.toFixed(2)}</span></p>
		          <p><span>运费</span><span>￥{data.shipCallFee.toFixed(2)}</span><span> + </span></p>		         
		          <p className={data.discountFee?'show':'hide'}><span>满减</span><span>￥{data.discountFee.toFixed(2)}</span><span>-</span></p>	          
		          <p className={data.couponFee?'show':'hide'}><span>优惠券</span><span>￥{data.couponFee.toFixed(2)}</span><span>-</span></p>		          
		          <p className={data.hasPayFee?'show':'hide'}><span>已支付</span><span>￥{data.hasPayFee.toFixed(2)}</span><span>-</span></p>		          
		          <p><span>还需支付</span><span>￥{data.notPayFee.toFixed(2)}</span></p>
		       </div>
		    </div>
		)
	}
})
var Logistics=React.createClass({
	render:function(){
		var orderOptList=this.props.data;		
		return(
			<div className="logistics-info">
                <h2><span className="icons"></span>物流信息</h2>
                <Link to={`/logistics/${this.props.dcName}/${this.props.orderGeneration}/${this.props.orderID}`}>
					<div>
						<p>{orderOptList.optRemark}</p>
						<p><span>{orderOptList.optDt}</span></p>
						<i></i>					
					</div>
				</Link>
			</div>
		)
	}
})
var OrderDetail =  React.createClass({	
    getDefaultProps:function(){
        return{
        	detailData:{
        		orderItemList:[],
        		goodsCallFee:0,
        		shipCallFee:0,
        		discountFee:0,
        		couponFee:0,
        		hasPayFee:0,
        		notPayFee:0,
        		goodsPrice:0
        	},
        	logisticsData:[]        	
        }
    },
	componentDidMount:function(){	 
	  var orderCode=this.props.params.orderCode;
	  var orderID=this.props.params.orderID;
	  var orderGeneration=this.props.params.orderGeneration;	  
	  this.props.dispatch(getOrderDetailData(orderCode,orderGeneration));
	  this.props.dispatch(getOrderLogisticsData(orderID,orderGeneration));	     	   
	},		
	render:function(){		     	
	   var data=this.props.detailData;		 
	   var logisticsData=this.props.logisticsData.length>0?this.props.logisticsData[0]:{};	   	
	   var params=this.props.params; 
	     	 
	    return(
	      	<div className="orderDetail">
	  	        {<OrderInfo data={data} />}
			    {<UserInfo data={data}/>}
			    {<Logistics data={logisticsData} dcName={data.dcName} orderGeneration={params.orderGeneration} orderID={params.orderID}/>}
			    {<GoodInfo data={data}/>}
			    <p className={data.isShowToPay==1?'p-m show':'p-m hide'}>
			        <a className="btn-g-1">去支付</a>
			    </p> 
	      	</div>
	    )
	   
      
	}
});

function mapStateToProps(state) {	
  const {ReducerOrderDetail} = state.reducer
  const {detailData,logisticsData} = ReducerOrderDetail;

  return {detailData,logisticsData}
}

export default connect(mapStateToProps)(OrderDetail);
