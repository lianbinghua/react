/**
 * 
 * @authors weilei.zhu (purelite.zhu@gmail.com)
 * @date    2016-03-13 14:28:39
 * @version $Id$
 */
import ReactIScroll from 'react-iscroll'
import iScroll from 'iscroll'
import './discoverStyle'
var Discover =  React.createClass({
	 getDefaultProps: function() {
	    return ({
	      options: {
	        	mouseWheel: true,
	        	scrollbars: true,
	        	freeScroll: true,
			    invertWheelDirection: true,
			    momentum: false,
				shrinkScrollbars: 'scale',
				fadeScrollbars: true
	      }
	    })
	 },
	 getInitialState:function(){
	 	return {y:0}
	 },
	onRefresh: function(iScrollInstance) {
	     var yScroll = iScrollInstance.y;

  		console.log("vertical position:" + yScroll)
  		if(this.state.y != yScroll) {
		    this.setState({y: yScroll})
		  }

	},
	render:function(){
		return (
			<div style={{height:"568px"}}>
		<ReactIScroll iScroll={iScroll}
					options={this.props.options}
					onRefresh={this.onRefresh}>
				<div className="discover">这是发现</div>
		</ReactIScroll>
		</div>
		)

	}
});
module.exports = Discover;