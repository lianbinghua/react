/**
 * 
 * @authors weilei.zhu (purelite.zhu@gmail.com)
 * @date    2016-03-09 11:27:38
 * @version $Id$
 */
import {PropTypes} from 'react'
import './buttonStyle'
var Button = React.createClass({
		getInitialState: function() {
			return {
				styleName:"normal",
				name:"确定"
			}
		},
		render:function(){
			return <div className={this.props.styleName || this.state.styleName} onClick={this.props.handleClick}>{this.props.name || this.state.name}</div>
		}
});

Button.propTypes = {
   handleClick: PropTypes.func.isRequired
}
module.exports = Button;

