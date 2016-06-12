webpackJsonp([3,5],{

/***/ 287:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React) {"use strict";

	__webpack_require__(288);

	var Discover = React.createClass({
	  displayName: "Discover",

	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "discover" },
	      "这是发现"
	    );
	  }
	}); /**
	     * 
	     * @authors weilei.zhu (purelite.zhu@gmail.com)
	     * @date    2016-03-13 14:28:39
	     * @version $Id$
	     */

	module.exports = Discover;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(148)))

/***/ },

/***/ 288:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(289);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(253)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/sass-loader/index.js!./discoverStyle.scss", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/sass-loader/index.js!./discoverStyle.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 289:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(252)();
	// imports


	// module
	exports.push([module.id, "/**\n * \n * @authors weilei.zhu (purelite.zhu@gmail.com)\n * @date    2016-03-15 10:32:41\n * @version $Id$\n */\n.discover {\n  background: #969697;\n  width: 100%;\n  height: 500px; }\n", ""]);

	// exports


/***/ }

});