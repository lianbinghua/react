/**
 * 
 * @authors weilei.zhu (purelite.zhu@gmail.com)
 * @date    2016-03-16 13:18:14
 * @version $Id$
 */



import './headerStyle'

var HomeHeader = React.createClass({
	render:function(){
		return(
			<div className="index-header clearfix">
		      <div className="by-list" id="Js-header-changeDate"><span id="Js-userPhaseId"></span><i></i></div>
		      <h2></h2>
		      <span className="search-btn Js-search-good-special"></span>
		      <a><span className="cart-btn"><i className="Js-cartGoodsNum">0</i></span></a>
		      <div className="index-list" id="Js-header-dateList">
		        <span></span>
		        <ul id="Js-userPhase-list">
		        </ul>
		      </div>
		    </div>
		)
	}
});
var CommonHeader = React.createClass({
	render:function(){
		return (
			<div className="title-header">
		      <a id="Js-back" href="javascript:history.go(-1);" className="tlink"><span className="goback"></span></a>
		      <h1 className="title-txt">{this.props.title}</h1>
		  </div>
		)
	}
});
var Header = React.createClass({
		getInitialState: function () {
			return {title: '首页' }
		},
		handleClick: function (link) {
 			this.setState({link:link})
 		},
		render:function(){
			return(
				<div className="header" ref='Js-header'>
					<HomeHeader/>
				</div>
			)
		}
});
module.exports = Header;