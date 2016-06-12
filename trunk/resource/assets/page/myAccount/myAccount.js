import * as types from '../../constants/constants'
import {PropTypes} from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Footer from 'comp/footer/footer'
import Button from 'comp/button/button'
import 'css/common'
import './myAccountStyle'

var bdMobile;
var MyAccount = React.createClass({ 
	getInitialState:function(){
		return {
			nickName:"",
			mobile:"",
			bdMobile:""	
		}
	}, 
	componentDidMount:function() {
	   this.getUserInfo();
	},
	getUserInfo:function(){
		var _this = this;
		$.sendData({
	        url:types.API+'/authorize/MainServlet?method=getUserTootooInfo&req_fmt_type=jsonp&req_str={"isAccount":"1","isGiftCard":"1","isScore":"1","isOther":"1","isUserInfo":"1","scope":"11102"}', 
	        success: function(data){
	        	if(data.Result.Header.resultID == 0){
	        		_this.setState({
	        			nickName:data.Result.Data.userInfo.nickName,
	        			mobile:data.Result.Data.userInfo.mobile
	        		});
	        		var bindMobile = data.Result.Data.userInfo.mobile;
	        		console.log('bindMobile=='+bindMobile);
	        		if(bindMobile != '未绑定'){
	        			var substrMob = bindMobile.substr(3,4);
	        			bdMobile = bindMobile.replace(substrMob,"****");
	        			_this.setState({
	        				bdMobile:bdMobile
	        			});
	        		}else{
	        			_this.setState({
	        				bdMobile:"未绑定"
	        			});
	        		}	
	        	}else if(data.Result.Header.resultID == 170000){
	        		location.href="http://nine.tootoo.cn/login";
	        	}else{
	        		alert(data.Result.Header.resultMessage);
	        	}
	        }
	    });
	}, 
	render:function(){
		return(
			<div className="myAccount">
				<ul>
					<li>
				      	<Link to={`/updateName/${this.state.nickName}`}>  
				         	<div className="pd10">
				          		<div className="list_l">
			            			<span className="fl f15 col363636">昵称</span>
				            		<span className="fr f13 col727272">{this.state.nickName}</span>
				          		</div>
				          		<div className="list_r">
				            		<span className="arrow_r"></span>
				          		</div>
				         	</div>
				      	</Link>
				    </li>
				    <li>
				      	<Link to={`/mobileBind/${this.state.mobile}`}> 
				         	<div className="pd10">
				          		<div className="list_l">
				            		<span className="fl f15 col363636">绑定手机</span>
				            		<span className="fr f13 col727272">{this.state.bdMobile}</span>
				          		</div>
			          			<div className="list_r">        
				            		<span className="arrow_r"></span>
				          		</div>
				         	</div>    
				      	</Link>
				    </li> 
			    </ul>
		    </div>
		)
	}
});
module.exports = MyAccount;