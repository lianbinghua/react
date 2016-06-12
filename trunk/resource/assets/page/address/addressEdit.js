/**
 * 
 * @authors weilei.zhu (purelite.zhu@gmail.com)
 * @date    2016-03-13 14:28:39
 * @version $Id$
 */

import './addressListStyle'
import * as types from '../../constants/constants'
import * as actionCreators from 'assets/actions/address'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import {bindActionCreators} from 'redux'

var AddressAdd =  React.createClass({

    componentDidMount:function(){
         
    },    
    render:function(){    	 	
    	return(<div>aaaa</div>)
    }
});


export default connect()(AddressAdd);
