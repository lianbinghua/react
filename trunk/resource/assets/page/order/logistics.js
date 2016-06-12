/**
 * 
 * @authors weilei.zhu (purelite.zhu@gmail.com)
 * @date    2016-03-13 14:28:39
 * @version $Id$
 */

import './logisticsStyle'
import * as types from '../../constants/constants'
import {getOrderLogisticsData} from 'assets/actions/orderDetail'
import { connect } from 'react-redux'
import { Link } from 'react-router'

var Logistics =  React.createClass({	
    getDefaultProps:function(){
        return{
        	logisticsData:{}
        }
    },
	componentDidMount:function(){		
	   var orderID=this.props.params.orderID;
	   var orderGeneration=this.props.params.orderGeneration;	  
	   this.props.dispatch(getOrderLogisticsData(orderID,orderGeneration));	
	},
	render:function(){		
	    var data=this.props.logisticsData;	 
	    return(
	        <div className="logistics-detail">			  
			   <h2 className={this.props.params.dcName?'show':'hide'}>配送公司：<span>{this.props.params.dcName}</span></h2>			   
			   <ul>
			     {
			     	data.map(function(orderOptList,i){
                        return(
                        	<li key={i}>
						      <p>{orderOptList.optRemark}</p>
						      <span>{orderOptList.optDt}</span>
						    </li>
                        )
			     	})
			     }			    
			   </ul>
			</div>
	    )
	   
      
	}
});

function mapStateToProps(state) {	
  const {ReducerOrderDetail} = state.reducer
  const {logisticsData} = ReducerOrderDetail;

  return {logisticsData}
}

export default connect(mapStateToProps)(Logistics);
