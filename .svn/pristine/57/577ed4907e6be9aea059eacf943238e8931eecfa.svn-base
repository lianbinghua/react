import * as types from '../../constants/constants'
import {PropTypes} from 'react'
import Button from 'comp/button/button'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import './mobileBindStyle'
import 'css/common'
var MobBindStep1 = React.createClass({
	getInitialState:function(){
		return {
			errorMsg:""	
		}
	},
    removeErrorMsg:function(){
    	this.setState({errorMsg:""})
    },
	nextClick:function(){
		var mobile = this.refs.texlInput.value;
		this.props.getMobile(mobile);
   		if(mobile == ''){
   			this.setState({
   				errorMsg:"手机号不能为空！"
   			});
   			return;
   		}
   		if(mobile == this.props.getParamsMob()){ 
   			this.setState({
   				errorMsg:"同一手机号不可重复绑定，建议您更换其他手机号码试一下！"
   			}); 
	        return;
        }
   		if(/^1[3|4|5|7|8][0-9]\d{8}$/.test(mobile)){
   			var _this = this;
			$.sendData({
				url:types.API+'/authorize/MainServlet?method=isMobileBind&req_fmt_type=jsonp&req_str={"scope":"11102","phone":"'+mobile+'"}',
				success:function(data){
					if(data.Result.Header.resultID == 0){
						if(data.Result.Data.isBindResult.isBind == 0){
							_this.props.changeState();
							_this.setState({
								errorMsg:""
							});
						}else if(data.Result.Data.isBindResult.isBind == 1){
							_this.setState({
								errorMsg:"同一手机号不可重复绑定，建议您更换其他手机号码试一下！"
							});
						}
					}
				}
			});
   		}else{
 			this.setState({
   				errorMsg:"您输入的手机格式有误，请重新输入！"
   			});
   		}
   		
	},
	render:function(){
		return(
		        <div id="Js-mbstep1">
			        <div className="mobileBind_yzm">
			            <ul className="mb_ul">
			              <li>
			                <div className="mphone"><span className="m_phone_icon"></span><input type="tel" ref="texlInput" onFocus={this.removeErrorMsg} placeholder="请输入手机号" /></div>
			              </li>
			            </ul> 
			            <div className="mobileBindMsg"><span>{this.state.errorMsg}</span></div>
			            <Button handleClick={this.nextClick} className="mt10" name="下一步"/>
			        </div> 
			    </div>
		)
	}
});

var uniqueKey = new Date().getTime();
var wtimer = 60;
var whandle = 0;
var isPicCode = 2;
var picCode = -1;

var MobBindStep2 = React.createClass({
	getInitialState:function(){
		return {
			smsVoiApi:"getCheckSms",
			disable:false,
			codeValue:"获取验证码",
			codeNoticeTxt:"请输入验证码",
			displayState:"block",
			smsSendMsg:"none",
			voiceSendMsg:"none",
			changeColor:"btn_getyzm",
  			typeCode:"voiceCode",
  			dxMsg:"未收到短信?",
  			exchageCodeBtn:"切换语音验证码",
  			errorMsg:"",
			imgCode:types.API+'/authorize/MainServlet?method=getCheckPic&req_str={"scope":"11102","uniqueKey":"'+uniqueKey+'"}&_t='+new Date().getTime()
		}
	},
	removeErrorMsg:function(){
    	this.setState({errorMsg:""})
    },
	isTypeCode:function(){
		if(this.state.typeCode == "voiceCode"){
			this.setState({
				smsVoiApi:"getVoiceCode",
				typeCode:"smsCode",
				codeValue:"获取语音码",
				codeNoticeTxt:"语音验证码",
				dxMsg:"未收到语音?",
				exchageCodeBtn:"切换短信验证码",
			});
		}else{
			this.setState({
				smsVoiApi:"getCheckSms",
				typeCode:"voiceCode",
				codeValue:"获取验证码",
				codeNoticeTxt:"短信验证码",
				dxMsg:"未收到短信?",
				exchageCodeBtn:"切换语音验证码",
			});
		}
	},
	refeshImgCode:function(){
		picCode = -1;
		this.setState({
			imgCode:types.API+'/authorize/MainServlet?method=getCheckPic&req_str={"scope":"11102","uniqueKey":"'+uniqueKey+'"}&_t='+new Date().getTime()
		});
	},
	getPicCode:function(){
		picCode = this.refs.picCode.value;
		if(picCode.length != 4){
			this.setState({
				picCodeMsg:"请输入正确的图形验证码"
			});
		}
	},
	smsCodeChk:function(){	
		this.getPicCode();
	    if(wtimer!=60){
	      return;
	    }
	    if(this.refs.picCode.value != '')
	    this.getSmsCode();
	},
	getSmsCode:function(){
		var pic='';
		if(isPicCode == 2){
			if(picCode == -1){
				this.setState({
					errorMsg:"图形验证码错误，请核对后重试！"
				});
			}else{
				pic = ',"checkCode":"'+picCode+'"'
			}
			this.resetCountDown();
			this.setState({readonly:true});
			var _this = this;
			$.sendData({
				url:types.API+'/authorize/MainServlet?method='+_this.state.smsVoiApi+'&req_fmt_type=jsonp&req_str={"scope":"11102","mobile":"'+_this.props.mobile+'","isQuick":"'+isPicCode+'","uniqueKey":"'+uniqueKey+'"'+pic+'}',
				success:function(data){
					if(data.Result.Header.resultID != 0){
						_this.setState({
							readonly:false,
							errorMsg:data.Result.Header.resultMessage
						});
						return;
					}
					if(data.Result.Data.dayTimes){
				        if( _this.state.smsVoiApi == 'getVoiceCode'){
				          	_this.setState({
			          			voiceSendMsg:"block",
			          			smsSendMsg:"none"
				          	}); 
				        }else{
				          	_this.setState({			          			
			          			smsSendMsg:"block",
			          			voiceSendMsg:"none"
				          	}); 
				        }
				    }
					if(data.Result.Data.isPicCode == 1){
				        _this.countDown(); 
				        _this.setState({
				        	isPicCode:"2"
				        });
			     	}else{
				         _this.setState({
				        	isPicCode:"1"
				        });
				        _this.countDown();  
				    }
			    }
			});
		}
	},	
	countDown:function(){
		if(wtimer == 0){
 			this.setState({
 				displayState:"block",
 				changeColor:"btn_getyzm",
 				readonly:false
 			});
			clearTimeout(whandle);
			if( this.state.smsVoiApi == 'getCheckSms'){
	            this.setState({
	            	codeValue:"获取验证码",
	            	disable:false
	            });
	        }else{
	        	this.setState({
	            	codeValue:"获取语音码",
	            	disable:false
	            });
	        }
	        wtimer = 60;
	    }else{	
	    	this.refs.getCodeBtn.value = "重新发送"+wtimer+"秒";
	    	wtimer--;
 			var codeValue = this.refs.getCodeBtn.value;
			whandle = setTimeout(this.countDown, 1000);
        	this.setState({
 				displayState:"none",
 				disable:"disabled",
 				changeColor:"btn_getyzmb9",
 				codeValue:codeValue				
 			}); 
		}
	},
	resetCountDown:function(){
		this.setState({
        	changeColor:"btn_getyzm",
        	disable:false,
        	displayState:"block"
        });
		wtimer = 60;
		clearTimeout(whandle);
		if( this.state.smsVoiApi == 'getCheckSms'){
            this.setState({
            	codeValue:"获取验证码"
            });
        }else{
        	this.setState({
            	codeValue:"获取语音码"
            });
        }
	},
	subClick:function(){
		var vcode = this.refs.vcode.value;
		var imageCode = this.refs.picCode.value;
		if(vcode.length == 0){
			this.setState({
				errorMsg:"请填写短信验证码"
			});
		}else{
			var _this = this;
			_this.setState({
				errorMsg:""
			});
	        $.sendData({
	        	url:types.API+'/authorize/MainServlet?method=BindMobilePhone&req_fmt_type=jsonp&req_str={"scope":"11102","imageCode":"'+imageCode+'","phoneVaCode":"'+vcode+'","phone":"'+_this.props.mobile+'"}',
	        	success: function(data){
	        		if(data.Result.Header.resultID == 105006 || data.Result.Header.resultID == 105001){
		            	alert('绑定成功');
		            	location.href="http://nine.tootoo.cn";
		          	}else{
		          		_this.setState({
		          			errorMsg:data.Result.Header.resultMessage
		          		});
		          	}
	        	}
	        });
		}
	},
	render:function(){
	 	return(
	  		<div>
	  	 	  	<div className="sendInfo">
	  	        	<div className="sendInfo_img">
		  	            <p className="sendInfo_icon"></p>
		  	            <p className="sendInfo_text" style={{display:this.state.smsSendMsg}}>我们已将短信发送至您的手机<span>{this.props.mobile}</span></p>
		  	            <p className="sendInfo_text" style={{display:this.state.voiceSendMsg}}>我们即将呼叫您的手机<span>{this.props.mobile}</span></p>
	  	        	</div>
	  	    	</div>
		  	    <div className="mobileBind_yzm">      
		  	        <ul>   
		  	            <li id="Js-picCode">
		  	                <div className="m_picyzm_l">
		  	                    <span className="m_picyzm_icon"></span><input type="text" ref="picCode" onFocus={this.removeErrorMsg} className="picCode" placeholder="请输入验证码"/>
		  	                </div>
		  	                <div className="m_dxyzm_r">
		  	                   <span><img className="vcode" src={this.state.imgCode} onClick={this.refeshImgCode} /></span>
		  	                </div>
		  	            </li>
		  	            <li>
		  	                <div className="m_dxyzm_l"><span className="m_dxyzm_icon"></span><input type="tel" onFocus={this.removeErrorMsg} ref="vcode" className="dxCode" placeholder={this.state.codeNoticeTxt}/></div>
		  	                <div className="m_dxyzm_r"><input type="button" className={this.state.changeColor} onClick={this.smsCodeChk} ref="getCodeBtn" disabled={this.state.disable} value={this.state.codeValue}/></div>       
		  	                <div className="mobileBindMsg mt10"><span className="ml10">{this.state.errorMsg}</span></div>
		  	            </li>
		  	        </ul>
			        <Button handleClick={this.subClick} className="mt10" name="绑定"/>
			        <div className="bindTxt mb10" style={{display:this.state.displayState}}><span>{this.state.dxMsg}</span><a onClick={this.isTypeCode} type={this.state.typeCode}>{this.state.exchageCodeBtn}</a></div>
		  	    </div>
      		</div>
	 	)
	}
});

var MobileBind = React.createClass({
	getInitialState:function(){
		return {
			link: '/home',
			bindState:'1',
			mobile:''
		}
	},
	setMobile:function(mobile){
		var mobile = mobile; 
		this.setState({
			mobile:mobile
		});
	},
	getParamsMob:function() {
    	var paramsMob = this.props.params.mobile;
	    return paramsMob;
	},
	changeStep:function(){
		this.setState({
			bindState:'2'
		})
	},
	render:function(){
		var name  = this.state.name;
		if(this.state.bindState ==1){
			return(
				<div className="mobileBind">
					<MobBindStep1 changeState={this.changeStep} getParamsMob={this.getParamsMob} getMobile={this.setMobile}/>
				</div>
			)		
		}else if(this.state.bindState == 2){
			return(
				<div className="mobileBind">
					<MobBindStep2 mobile={this.state.mobile}/>
				</div>
			)
		}
			
	}
});

export default connect()(MobileBind)