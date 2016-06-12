import {PropTypes} from 'react'
import ButtonComp from 'comp/button/button'
import GoodsListComp from 'comp/goodsList/goodsList'
import {Carousel} from 'react-responsive-carousel'
import './homeStyle'
import { Link } from 'react-router'
import 'css/carousel'
import {getCmsData,getMbPhase} from 'assets/actions/home'
import {actionTypeTest} from 'assets/actions/tutor'
import * as homeActions from 'assets/actions/home'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Header from 'comp/header/header'
import Footer from 'comp/footer/footer'
var HomePage = React.createClass({
	componentDidMount:function(){
		console.log('HomePage----99999');
	},
	handleClick:function(){
		this.props.onAddClick();
	},
	render:function(){
		return <h1 onClick={this.handleClick}>这是首页----{this.props.testNum}</h1>
	}

});
var CImg = React.createClass({
	render:function(){
		const {initsrc,PAGE_TYPE,PAGE_KEY} = this.props;
		return(
			<Link to={`/detail/${PAGE_TYPE}/${PAGE_KEY}`}><img src={initsrc}></img></Link>
		)
	}
});
var CarouselImg = React.createClass({
    render:function(){
    	var imgArr = this.props.imgArr;
        return (
            <Carousel axis="horizontal" showThumbs={false} showArrows={false}  showStatus={false} >
                {imgArr.map(img =>
		          <CImg
		          	key={img.PAGE_KEY}
		            initsrc={img.initsrc}
		            PAGE_TYPE={img.PAGE_TYPE}
		            PAGE_KEY = {img.PAGE_KEY} />

		        )}
            </Carousel>
        );
    }
});

CarouselImg.propTypes = {
  imgArr: PropTypes.arrayOf(PropTypes.shape({
    PAGE_TYPE: PropTypes.string.isRequired,
    PAGE_KEY: PropTypes.string.isRequired,
    initsrc: PropTypes.string.isRequired,
  })).isRequired,
  //go: PropTypes.func.isRequired
}

var Swiper = React.createClass({
	render:function(){
		return(
			<div></div>
		)
	}
});

var StaticImg = React.createClass({
	render:function(){
		return (
			<div></div>
		)
	}

});

var Home = React.createClass({
		contextTypes: {
    		router: React.PropTypes.object
  		},
 		getDefaultProps : function () {
		    return {
		    	title : '123',
		    	img:[{
					initsrc: "http://img01.ttmimg.com/www/images/stonescms/2016160312/667aa97d52a6089a.jpg",
					PAGE_TYPE: "5008",
					PAGE_KEY: "1010101"
				}],
				phase:[{phaseName:"这是啥"}]
		    };
		},
		getInitialState: function() {
			return {
		    	title : '123',
		    	userPhaseId:1,
		    	name:"点击",
		    };
		},
		componentWillMount:function(){
			$.storage('l','test','test111zzaass',60*24*30);
			$.removeCookie('u');
			console.log($.getDay('*'))
			console.log($.getTime())
			gb.isLogin();
			console.log($.uniq([1,2,2,3,4,1,222,33,3]))

		},
		componentDidMount:function() {
			//this.props.dispatch(actionTypeTest())
			//this.props.dispatch(getCmsData(this.state.userPhaseId))
			console.log('storage===',$.storage('l','test'))
			console.log('cookie=====',$.cookie('u'))
			if(this.props.isFetching === undefined){
				//this.props.dispatch(getCmsData(this.state.userPhaseId))
				//this.props.dispatch(getMbPhase())
				this.props.getCmsData(this.state.userPhaseId)
			}
		},
		componentWillReceiveProps:function(nextProps) {
			console.log('执行componentWillReceiveProps',nextProps);
			    
		},
		handleClick:function(){
			this.setState({
				userPhaseId:this.state.userPhaseId >= 6 ? 1:this.state.userPhaseId+1
			});
			this.props.dispatch(getCmsData(this.state.userPhaseId));
		},
		testClick:function(){
			this.context.router.push('tutor');
		},
		dispatchClick:function(text){
			
		},
		render:function(){
			var name  = this.state.name;
			const { dispatch, visibleTodos, visibilityFilter } = this.props;
			return(
				<div className="home Image">
					<CarouselImg imgArr={this.props.img} />
					<HomePage testNum={this.state.userPhaseId} onAddClick={this.dispatchClick}/>
					<h1 style={{background:"red"}} onClick={this.handleClick}>{this.props.title}</h1>
					<ButtonComp handleClick={this.testClick} name={name}/>
					<div>{this.props.phase[0].phaseName}</div>
				</div>
			) 
		}
});

function mapStateToProps(state) {
  const {redHome} = state.reducer
  const {
    isFetching,
    img,
    phase
  } = redHome || {
    isFetching: true,
    img: [],
    phase:[{phaseName:''}]
  }
  return {
    img,
    isFetching,
    phase
  }
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
  return bindActionCreators(homeActions, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)
