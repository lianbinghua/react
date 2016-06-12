import Home from 'page/home/home'
import Header from 'comp/header/header'
import Nav from 'comp/nav/nav'
var Root = React.createClass({
	render:function(){		
		var  Content = this.props.default || this.props.children;
		return(
			<div>
				{Content}
				<Nav  Fprop = {this.props}/>
			</div>
		)
	}
})
module.exports = Root;
