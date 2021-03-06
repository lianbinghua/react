import * as types from '../../constants/constants'
import ButtonComp from 'comp/button/button'
import {PropTypes} from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Footer from 'comp/footer/footer'
import 'css/common'
import './userStyle'

var LogOff = React.createClass({
	render:function(){
		return(
			<div className="userHeader">
				<div className="cicleBg">
					<div className="cicleTxt">
						<p className="loginReg"><Link to="/login">登录/注册</Link></p>					
					</div>
				</div>
			</div>
		)		
	}	
});
var LoginIn = React.createClass({
	render:function(){
		return(
			<div className="userHeader">
				<Link to="/myAccount">
					<div className="cicleBg">
						<div className="cicleTxt">
							<p className="head_img"><img src={this.props.avatarUrl} /></p>					
						</div>
					</div>
					<p className="username">{this.props.userName}</p>
				</Link>
			</div>
		)	
	}
}); 
var UserMenu = React.createClass({
	handleClick:function(){
		event.preventDefault();
        this.props.onSelect(this.props.link);
	},
	render:function(){
		return (		
			<li>
				<Link to={this.props.link} onClick={this.handleClick}>
					<div className="menuList">
						<div className={this.props.styleName}></div>
						<p>{this.props.children}</p>
					</div>
				</Link>
			</li>			
		)
	}
});
var User = React.createClass({  
	getInitialState:function(){
		return {
			logState:"LoginIn",
			userName:"",
			avatarUrl:""	
		}
	}, 
	isLogin:function(){
		var _this = this;
		$.sendData({
	        url:types.API+"/authorize/MainServlet?method=verifySession&req_fmt_type=jsonp&cookie_need_auth=0&auth_type=1&cookie_scope=11102&check_level=2", 
	        success: function(data){
	        	if(data.Result.Header.resultID == 0){
	        		_this.setState({
	        			logState:"LoginIn"
	        		});
	        		_this.getUserInfo();
	        	}else{
	        		_this.setState({
	        			logState:"logOff"
	        		});
	        	}
	        }
	    });
	},
	getUserInfo:function(){
		var _this = this;
		$.sendData({
	        url:types.API+'/authorize/MainServlet?method=getUserTootooInfo&req_fmt_type=jsonp&req_str={"isAccount":"1","isGiftCard":"1","isScore":"1","isOther":"1","isUserInfo":"1","scope":"11102"}', 
	        success: function(data){
	        	if(data.Result.Header.resultID == 0){
	        		_this.setState({ 
	        			logState:"LoginIn",
	        			userName:data.Result.Data.userInfo.nickName
        			});
	        		if((data.Result.Data.userInfo.avatarUrl).indexOf("http") == 0){
	        			_this.setState({
	        				avatarUrl:data.Result.Data.userInfo.avatarUrl
	        			});
	        		}else{
	        			_this.setState({
	        				avatarUrl:"http://img01.ttmimg.com/www/images/stonescms/d2fc767c56b6618e.png"
	        			});
	        		}
	        	}else if(data.Result.Header.resultID == 170000){
					_this.setState({ 
	        			logState:"logOff"
        			});
				}
	        }
	    });
	},
	componentDidMount:function() {
	   this.isLogin();
	},
	handleClick: function (link) {
			this.setState({link:link})
	},
	render:function(){
		var bodyHeight = (window.screen.height)+'px';
		var _this = this;
		var items = [
			{link:"/order",title:"我的订单",className:"myOrder"},
			{link:"/myComment",title:"我的评价",className:"myComment"},
			{link:"/myCollection",title:"我的收藏",className:"myCollection"},
			{link:"/addressList",title:"收货地址",className:"myAddress"},
		]
		var userMenus = items.map(function(item){
			return (
				<UserMenu key={item.link} link={item.link} styleName={item.className} onSelect={_this.handleClick}>{item.title}</UserMenu>
			)
		});
		if(this.state.logState == 'logOff'){
			return(
				<div className="user" id="Js-user" style={{height:bodyHeight}}>
					<LogOff/>
					<div className="userMenu"><ul>{userMenus}</ul></div>
				</div>
			)
		}else if(this.state.logState == 'LoginIn'){
			return(
				<div className="user" id="Js-user" style={{height:bodyHeight}}>
					<LoginIn userName={this.state.userName} avatarUrl={this.state.avatarUrl}/>
					<div className="userMenu"><ul>{userMenus}</ul></div>
				</div>
			)
		}
		 
	}
});
module.exports = User;