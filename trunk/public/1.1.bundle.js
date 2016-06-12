webpackJsonp([1,5],{

/***/ 283:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React) {'use strict';

	var _reactRouter = __webpack_require__(181);

	__webpack_require__(284);

	/**
	 * 
	 * @authors weilei.zhu (purelite.zhu@gmail.com)
	 * @date    2016-03-10 18:18:44
	 * @version $Id$
	 */

	var ButtonComp = __webpack_require__(259);
	var GoodsListComp = __webpack_require__(262);

	var Detail = React.createClass({
		displayName: 'Detail',

		getInitialState: function getInitialState() {
			console.log('goodsDetailstart', this.props);
			return null;
		},
		render: function render() {
			return React.createElement(
				'div',
				{ className: 'user' },
				React.createElement(
					'h1',
					null,
					'详情详情详情详情'
				),
				React.createElement(GoodsListComp, null)
			);
		}
	});
	module.exports = Detail;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(148)))

/***/ },

/***/ 284:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(285);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(253)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/sass-loader/index.js!./goodsDetailStyle.scss", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/sass-loader/index.js!./goodsDetailStyle.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 285:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(252)();
	// imports


	// module
	exports.push([module.id, "/**\n * \n * @authors weilei.zhu (purelite.zhu@gmail.com)\n * @date    2016-03-10 17:50:22\n * @version $Id$\n */\n.user {\n  background: yellow; }\n", ""]);

	// exports


/***/ }

});