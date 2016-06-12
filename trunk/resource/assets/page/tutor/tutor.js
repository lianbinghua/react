import { connect } from 'react-redux';
import {hideBar} from 'assets/actions/tutor'

var Tutor =  React.createClass({
	componentDidMount:function(){
		this.props.dispatch(hideBar());
	},
	render:function(){
		return(
			<div>
				<div>{this.props.name}</div>
			</div>

		) 
	}
});

function mapStateToProps(state){
	return {
		name:'这是什么 是攻略啊啊啊啊啊'
	}
}
//module.exports = Tutor;
export default connect(mapStateToProps)(Tutor);
