/**
 * 
 * @authors weilei.zhu (purelite.zhu@gmail.com)
 * @date    2016-03-09 11:27:38
 * @version $Id$
 */
import { Link } from 'react-router'
import './footerStyle'

var Menu = React.createClass({
	render:function(){
		var styleName = this.props.active ? "active" : "" ;
		return (
			<Link to={this.props.link} className={styleName}><span></span><p>{this.props.children}</p></Link>
		)
	}
});
var Footer = React.createClass({
		render:function(){
			var items = [
				{link:"home",text:"首页"},
				{link:"tutor",text:"攻略"},
				{link:"discover",text:"发现"},
				{link:"user",text:"我的"}
			]
			var curPath =this.props.Fprop.location.pathname == '/' ? 'home' : this.props.Fprop.location.pathname
			var menus = items.map(function(item){
				return (
					<Menu key={item.link} link={item.link} active={curPath == item.link}>{item.text}</Menu>
				)
			})
			return(
				<div className="footer">
					{menus}
				</div>
			)
		}
});
module.exports = Footer;
