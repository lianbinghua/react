/**
 * 
 * @authors weilei.zhu (purelite.zhu@gmail.com)
 * @date    2016-03-09 11:27:38
 * @version $Id$
 */
import { Link } from 'react-router'
import './navStyle'

var Nav = React.createClass({
		getInitialState:function(){
			return {
				curState:'close',
				body:null
			}
		},
		componentDidMount:function(){
			this.setState({
				body:document
			})
		},
		toggleMenu:function(status){
			this.setState({
				curState:this.state.curState == 'close'?'open':'close'
			},function(){
				if(this.state.body){
					if(this.state.curState == 'open'){
						this.state.body.addEventListener('click',this.toggleMenu,false)
					}else{
						this.state.body.removeEventListener('click',this.toggleMenu)
					}
				}
			})
		},
		render:function(){
			return(
				<div className="nav">
					<Link to='home' className={this.state.curState} onClick={this.toggleMenu}></Link>
					<Link to='cart' className={this.state.curState} onClick={this.toggleMenu}></Link>
					<Link to='user' className={this.state.curState} onClick={this.toggleMenu}></Link>
					<Link to='service' className={this.state.curState} onClick={this.toggleMenu}></Link>
					<label className={this.state.curState == 'close' ? 'open-button':'open-button menu-open'} onClick={this.toggleMenu}>
						<span className={this.state.curState}/>
						<span className={this.state.curState}/>
						<span className={this.state.curState}/>
					</label>
				</div>
			)
		}
});
module.exports = Nav;
