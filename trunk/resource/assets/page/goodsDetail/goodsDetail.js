/**
 * 
 * @authors weilei.zhu (purelite.zhu@gmail.com)
 * @date    2016-03-10 18:18:44
 * @version $Id$
 */

var ButtonComp = require('comp/button/button');
var GoodsListComp = require('comp/goodsList/goodsList');
import {Carousel} from 'react-responsive-carousel'
import { Link } from 'react-router'
import './goodsDetailStyle'
import { connect } from 'react-redux';
import {getGoodsInfoData,getGoodsComments} from 'assets/actions/goodsDetail'

var CarouselImg = React.createClass({
    render:function(){
    	var imgArr = this.props.imgArr;
        console.log(imgArr,'获取商品详情轮播图')
        if(imgArr){
        	return (
	        	<Carousel axis="horizontal" showThumbs={false} showArrows={false}  showStatus={false} >
	                {imgArr.map(img =>
			          <img key={img.picType} src={img.picPath}></img>
			        )}
	            </Carousel>
        	);
        }else{
        	return (
			    <img src=''></img>
	        );
        }
        
    }
});

var GoodsBaseInfo = React.createClass({
    render:function(){
    	var infos = this.props.baseInfos;
    	var goods_price,goods_down,goods_min_buy;

    	console.log(infos,'获取商品详情基本信息')
    	if(infos){
    		/*if(infos.skuInfo.promotionPrice){
	            infos.skuInfo.promotionPrice = infos.skuInfo.promotionPrice.toFixed(2);
	        }
	        if(infos.skuInfo.theOriginalPrice){
	            infos.skuInfo.theOriginalPrice = infos.skuInfo.theOriginalPrice.toFixed(2);
	        }*/
	        //价格
    		if(infos.skuInfo.isPromotion==1 && infos.skuInfo.promotionStatus==1 && infos.isPromotion==1 && infos.skuInfo.promotionType==1)
    			goods_price = <span className='price_span_1'>¥ {infos.skuInfo.promotionPrice}</span>;
    		else
    			goods_price = <span className='price_span_1'>¥ {infos.skuInfo.theOriginalPrice}</span>;
    		//下降标识
    		if(infos.skuInfo.isPromotion==1 && infos.skuInfo.promotionStatus==1 && infos.isPromotion==1 && infos.skuInfo.promotionType==1)
				goods_down = <span className='price_span_2'>降</span>;
			else
				goods_down = <span></span>;
			//起售标识
			if(infos.skuInfo.minBuyNum>1)
				goods_min_buy =  <span className='price_span_3'>{infos.skuInfo.minBuyNum}{infos.skuInfo.marketingUnit}起售</span>;
			else
				goods_min_buy =  <span></span>;

    		return (
	            <div className="goods-info">
					<p className="tips_title">{infos.goodsTitle}</p>
					<p className="tips">{infos.goodsBrief}</p>
					<p className="price">
						{goods_price}
						{goods_down}
						{goods_min_buy}	
				    </p>
				</div>
        	);
    	}else{
    		return (
	            <div className="goods-info">
					<p>Loading</p>
				</div>
        	);
    	}
    }
});
var PreGoods = React.createClass({
    render : function(){
        var infos = this.props.baseInfos;
        var pre_goods,pre_class;
        if(infos){
            if(infos.canReserve==1 && infos.extendsInfo.sendDays!=''){
                pre_goods = <p><span className="span_pre">预定 </span><i>预定商品</i> <span className='span_send'>{infos.extendsInfo.sendDays[0].sendDay} 发货</span></p>;
                pre_class = 'pre-order';
            }
            else{
                pre_goods = <span></span>;
                pre_class = '';
            }
            return (
                <div className={pre_class}>{pre_goods}</div>
            );

        }else{
            return (
                <div></div>
            );
        }
    }
});
var GoodsDesc = React.createClass({
	render : function(){
		var infos = this.props.descInfos;
        var description;
		if(infos){
			var desc = decodeURIComponent(infos.goodsDesc.goodsDesc).replace(/\+/g," ");
            if(desc)
    			return (
                    <div>{desc}</div>
                );
            else
                return (
                    <div>暂无详情</div>
                );
		}else{
			return (
                <div></div>
            );
		}
		
		
	}
});
var GoodsParam = React.createClass({
    render : function(){
        var param = this.props.baseInfos;
        var chanDI,goodsUnit,storeMode,storageTemperature,productDt,shelfLife;
        if(param){
            if(param.extendsInfo.chanDI)
               chanDI = <li><span>产地</span><span>{param.extendsInfo.chanDI}</span></li>
            if(param.skuInfo.goodsUnit)
                goodsUnit = <li><span>规格</span><span>{param.skuInfo.goodsUnit}</span></li>
            if(param.extendsInfo.storeMode)
                storeMode = <li><span>建议储藏方式</span><span>{param.extendsInfo.storeMode}</span></li>
            if(param.storageTemperature)
                storageTemperature = <li><span>当前存储温度</span><span>{param.storageTemperature}</span></li>
            if(param.skuInfo.productDt)
                productDt = <li><span>生产日期</span><span>{param.skuInfo.productDt}</span></li>
            if(param.extendsInfo.shelfLife && param.extendsInfo.shelfLife!=0)
                shelfLife = <li><span>保质期</span><span>{param.extendsInfo.shelfLife}</span></li>

            return (
                <ul>
                    <li><span>品牌</span><span>{param.brandName||'其他'}</span></li>
                    {chanDI}{goodsUnit}{storeMode}{storageTemperature}{productDt}{shelfLife}
                </ul>
            );

        }else{
            return (
                <div></div>
            );
        }
    }
});
var GoodsComments =  React.createClass({
    render : function(){
        return (
            <section className="shopComment">
                <ul className="column-1">
                    <li>
                        <dl>
                            <dt>
                                <div className="goods-img">
                                    <span><img src="http://img01.ttmimg.com/v3/ttmimg/file/20160307/default/34995857730716109"></img></span>
                                </div>
                            </dt>
                            <dd>
                                <p>江玉英</p>
                                <p>03-26 10:45</p>
                            </dd>
                        </dl>
                    </li>
                </ul>
                <div className="commentTxt">
                    <p>有机地方角度看借款方角度看，肉很鲜，我们全家都很喜欢吃 推荐购买哦！</p>
                    <img src="http://img01.ttmimg.com/v3/ttmimg/file/20160308/default/35065774265432265"></img>
                    <img src="http://img02.ttmimg.com/5E/C6/2016038144539848.jpg"></img>
                    <img src="http://img01.ttmimg.com/v3/ttmimg/file/20160307/default/35003227847411414"></img>
                </div>
            </section>
        );
    }
});

var Detail = React.createClass({
		getDefaultProps : function () {
		    return {
		    	goodsImg1:[{
					picPath: "http://img02.ttmimg.com/5E/C6/2016038144539848.jpg",
					picType: "4",
					picDisOrder: "4"
				}],
		    };
		},
	    getInitialState: function() {
	    	console.log('goodsDetailstart',this.props)
			return {
                nav_active_param:'navv_active',
                nav_active_comment:'',
                display_param:'block',
                display_comment:'none'
            };
		},

		componentDidMount: function(){
			console.log(this.props.params.key,'+++++++')//{"promotionId":"82029","goodsId":"2080210"} 
			this.props.dispatch(getGoodsInfoData('2079897'));//2079919  2079897
		},

        getGoodsParams : function(){
            this.setState({
                nav_active_param:'navv_active',
                nav_active_comment:'',
                display_param:'block',
                display_comment:'none'
            });
        },
        getComment : function(){
            this.setState({
                nav_active_param:'',
                nav_active_comment:'navv_active',
                display_param:'none',
                display_comment:'block'
            });
            // this.props.dispatch(getGoodsComments('2079897'));
        },
		render:function(){
			return(
				<div className="detail">
					<CarouselImg imgArr={this.props.goodsImg} />
					<GoodsBaseInfo baseInfos={this.props.goodsInfo} />
					<div className="item">
						<div className="left">配送至</div>
						<div className="Js-address-result" onClick={this.getAddressClick}>北京市 东城区 其他区域</div>
					</div>
                    <PreGoods baseInfos={this.props.goodsInfo} />
					<div className="m-pro-tab">
						<ul className="navv navv-tabs" >
							<li data-type='0' type="desc" className={this.state.nav_active_param} onClick={this.getGoodsParams}>图文参数</li>
							<li data-type='2' type="comment" className={this.state.nav_active_comment} onClick={this.getComment}>商品晒单</li>
						</ul>
						<div className="tab-content Js-goods-detail" id="Js-show-desc" style={{display:this.state.display_param}}>
                            <div className="tab-param">
                                <GoodsParam baseInfos={this.props.goodsInfo} />
                            </div>
                            <GoodsDesc descInfos={this.props.goodsInfo} />
                        </div>
						<div className="tab-comment Js-goods-detail" id="Js-show-comment" style={{display:this.state.display_comment}}>
                            <GoodsComments />
                            <p className="see_more"><a href="">查看更多评论<em className="arrow"></em></a></p>
                        </div>
					</div>
					<h1>详情详情</h1>
					<p>type:{this.props.params.type}</p>
					<p>key:{this.props.params.key}</p>
					<GoodsListComp/>
				</div>
			) 
		}
});



function mapStateToProps(state) {
  const {redGoodsDetail} = state.reducer
  const {
    goodsImg, goodsInfo,
  } = redGoodsDetail || {
    goodsImg: [],
    goodsInfo: [],
  }

  return {
    goodsImg,
    goodsInfo,
  }
}



// module.exports = Detail;
export default connect(mapStateToProps)(Detail);