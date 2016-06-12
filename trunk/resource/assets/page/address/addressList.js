/**
 * 
 * @authors weilei.zhu (purelite.zhu@gmail.com)
 * @date    2016-03-13 14:28:39
 * @version $Id$
 */

import './addressListStyle'
import * as types from '../../constants/constants'
import * as actionCreators from 'assets/actions/address'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import {bindActionCreators} from 'redux'
var List=React.createClass({
	 handleClick:function(){
       var id=this.props.data.shipAddrID;
       debugger
       this.props.deleteAddr(id);
	 },
     render:function(){
     	var items=this.props.data;
     	return(
     		  <li key={items.shipAddrID}> 
				      <div className="address_txt">						        
				          <p className="ml">
				            <span className="fl f15 col363636">{items.receiver}</span>
				            <span className="fr f15 col363636">{items.mobileNumber}</span>
				          </p>
				          <p className="ml pd5">{items.addrDetail}</p>
				        
				      </div>
				      <div className="address_manage">							        
				        <div className="xg_del fr">
				          <div className="xg fl">
				            <Link to={`/address/addressEdit/${items.shipAddrID}/${items.province}/${items.provinceName}/${items.city}/${items.cityName}/${items.district}/${items.districtName}/${items.area}/${items.areaName}`}>
				              <span className="xgicon fl"></span>
				              <span className="fl f13 ml5">编辑</span>
				            </Link>
				          </div>
				          <div className="del fl" onClick={this.handleClick}>
				             <span className="delicon fl"></span>
				             <span className="fl f13 ml5">删除</span>
				          </div>
				        </div>
				      </div>
			    </li>
     	)
     }
});
var AddressList =  React.createClass({
	getDefaultProps:function(){
         return{         	
         	addressList:{
         		addressList:[]
         	}
         }
	},
    componentDidMount:function(){
         this.props.getAddressListData(1);
    },  
    deleteAddress:function(shipAddrID){    
    	if(confirm("您确定要删除该地址吗?")){
           $.sendData({
				url:types.API+'/address/MainServlet?method=deleteAddress&req_fmt_type=jsonp&req_str={"scope":"11102","shipAddrID":"'+shipAddrID+'","needReturn":"0"}',
				success:function(data){
	               if(data.Result.Header.resultID == 0){
						alert("删除成功");
                        this.props.getAddressListData(1);
						
					}
				}.bind(this)
			})
    	}
      
    },
    render:function(){
    	var data=this.props.addressList;    	
    	var _this=this;
    	if(data.addressList.length>0){
    		return(
	    		<div className="addressList">
                   <ul>
                      {
	                   	 data.addressList.map(function(items){
                           return(<List key={items.shipAddrID} data={items} deleteAddr={_this.deleteAddress}/>)
	                   	 })
	                   }
                   </ul>
                   <Link to='address/addressAdd' className="add-address">添加新地址</Link>
	    		</div>
	        )
    	}else{
    		return(
    			<div className="addressList">
    			    <div className="emptyAddress">
				        <span className="emptyAddress-img"></span>
				        <p>目前还没有地址</p>       
				    </div> 
    			</div>    			
    		)
    	}   	
    	
    }
});

function mapStateToProps(state) {	
  const {ReducerAddress} = state.reducer
  const {addressList} = ReducerAddress;

  return {addressList}
}
function mapDispatchToProps(dispatch){
	 return bindActionCreators(actionCreators, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(AddressList);
