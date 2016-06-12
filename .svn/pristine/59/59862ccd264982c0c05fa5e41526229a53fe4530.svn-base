/**
 * 
 * @authors weilei.zhu (purelite.zhu@gmail.com)
 * @date    2016-03-09 11:27:38
 * @version $Id$
 */
var Too = (function() {
    var $ = {};
    $.cookie = function(name, value, options) {
        if (typeof value !== 'undefined') {
            options = options || {};
            if (value === null) {
                value = '';
                options = $.extend({}, options);
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires === 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires === 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString();
            }
            var path = options.path ? '; path=' + (options.path) : ';path=/';
            var domain = options.domain ? '; domain=' + (options.domain) : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else {
            var cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = $.trim(cookies[i]);
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    }
    $.removeCookie = function(key) {
        $.cookie(key, '', {
            expires: -1
        });
    }
    $.sendData = function(options) {
        var mat = options.url.match(/https?:\/\/([^\/]+)/);
        if (mat && location.host != mat[0]) {
            $.jsonp(options);
        } else {
            $.ajax(options);
        }
    }
    $.jsonp = function(options) {
        options = options || {};
        if (!options.url) {
            throw new Error("Parameter is not valid");
        }
        var callbackName = ('jsonp_' + Math.random()).replace(".", "");
        var oHead = document.getElementsByTagName('head')[0];
        //options.data[options.callback] = callbackName;
        //var params = formatParams(options.data);
        var oS = document.createElement('script');
        oHead.appendChild(oS);
        window[callbackName] = function(json) {
            oHead.removeChild(oS);
            clearTimeout(oS.timer);
            window[callbackName] = null;
            options.success && options.success(json);
        };
        if (options.url.indexOf('?') == -1) {
            oS.src = options.url + '?callback=' + callbackName;
        } else {
            oS.src = options.url + '&callback=' + callbackName;
        }
        if (options.time) {
            oS.timer = setTimeout(function() {
                window[callbackName] = null;
                oHead.removeChild(oS);
                options.fail && options.fail({
                    message: "timeOut"
                });
            }, time);
        }
    }
    $.ajax = function(options) {
        options = options || {};
        options.type = (options.type || "GET").toUpperCase();
        options.dataType = options.dataType || "json";
        var params = formatParams(options.data);
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else {
            var xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                var status = xhr.status;
                if (status >= 200 && status < 300) {
                    options.success && options.success(xhr.responseText, xhr.responseXML);
                } else {
                    options.fail && options.fail(status);
                }
            }
        }
        if (options.type == "GET") {
            xhr.open("GET", options.url + "?" + params, true);
            xhr.send(null);
        } else if (options.type == "POST") {
            xhr.open("POST", options.url, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(params);
        }
    }
    $.storage = function(st, key, value, expires) {
            if (st == 'l') {
                st = window.localStorage;
                expires = expires || 60;
            } else {
                st = window.sessionStorage;
                expires = expires || 5;
            }
            if (typeof value != 'undefined') {
                try {
                    return st.setItem(key, JSON.stringify({
                        data: value,
                        expires: new Date().getTime() + expires * 1000 * 60
                    }));
                } catch (e) {}
            } else {
                var result = JSON.parse(st.getItem(key) || '{}');
                if (result && new Date().getTime() < result.expires) {
                    return result.data;
                } else {
                    st.removeItem(key);
                    return null;
                }
            }
        }
    /**
     * 去掉空格
     * @name    trim
     * @param   {String}  要去掉空格的字符串
     * @param   {Boolean} 是否去掉字符串中间的空格
     * @return  {String}  处理过的字符串
     */
    $.trim = function(str, is_global) {
        if (!str) return "";
        var result = str.replace(/(^\s+)|(\s+$)/g, "");
        if (is_global) result = result.replace(/\s/g, "");
        return result;
    }
    /**
     * 获得URL中以GET方式传输的参数
     * @name getParamByName
     * @param {String} 要获得的参数名
     * @return {String} 指定参数名的值
     */
    $.getParamByName = function(name) {
        var match = new RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }
    $.extend = function(target) {
            var deep, args = [].slice().call(arguments, 1)
            if (typeof target == 'boolean') {
                deep = target
                target = args.shift()
            }
            args.forEach(function(arg) {
                extend(target, arg, deep)
            })
            return target
        }
        /**
         * @取当前时间 2014-01-14 
         * @return 2014-01-14
         */
    $.getDay = function(separator) {
        if (typeof(separator) == 'undefined') {
            separator = '-';
        }
        var myDate = new Date();
        var year = myDate.getFullYear();
        var month = myDate.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        var day = myDate.getDate();
        day = day < 10 ? '0' + day : day;
        return year + separator + month + separator + day;
    }

    /**
     * @取当前时间 12:11:10 
     * @return 14:44:55
     */
    $.getTime = function(separator, hasMs) {
        if (typeof(separator) == 'undefined') {
            separator = ':';
        }
        var myDate = new Date();
        var hour = myDate.getHours();
        hour = hour < 10 ? '0' + hour : hour;
        var mint = myDate.getMinutes();
        mint = mint < 10 ? '0' + mint : mint;
        var seconds = myDate.getSeconds();
        seconds = seconds < 10 ? '0' + seconds : seconds;
        var ms = myDate.getMilliseconds();
        var result = hour + separator + mint + separator + seconds;
        if (typeof(hasMs) != 'undeinfed' && hasMs) {
            result += separator + ms;
        }
        return result;
    }

    /**
     * @取当前时间戳
     * @return 1439361919265
     */
    $.getTimestamp = function() {
            return new Date().getTime();
        }
        /**
         * @对象merage
         * @obj2的权重大
         */
    $.merageObj = function(obj1, obj2) {
        for (var p in obj2) {
            try {
                if (obj2[p].constructor == Object) {
                    obj1[p] = $.merageObj(obj1[p], obj2[p]);
                } else {
                    obj1[p] = obj2[p];
                }
            } catch (e) {
                obj1[p] = obj2[p];
            }
        }
        return obj1;
    }
    /**
     * @inArray
     * @param {Array} arr 主体
     * @param {String} str字符串
     * @param {Boolean} include是否和匹配的字符串完全相同或者是包含的关系
     */
    $.inArray = function(arr, str, include) {
        if (util.isArray(arr)) {
            var res = false;
            arr.forEach(function(item) {
                if (typeof(include) != 'undefined' && include) {
                    var reg = new RegExp(str, 'gm')
                    if (reg.test(item)) {
                        res = true;
                    }
                } else {
                    if (item == str) {
                        res = true;
                    }
                }
            });
            return res;
        }
    }
    /**
     * @数组去重
     * @算法: 设置成一个对象的属性
     */
    $.uniq = function(arr) {
        if (isArray(arr)) {
            var obj = {};
            for (var i = 0; i < arr.length; i++) {
                obj[arr[i]] = i;
            }
            arr = [];
            var j = 0;
            for (var i in obj) {
                arr[j] = i;
                j += 1;
            }
        }
            return arr;
        }
    /**
     * @getUrlParam
     * @time 2014-10-8
     */
    $.getUrlParam = function(url) {
        var urlParseRE = /^(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/;
        return urlParseRE.exec(url);
    }
    return $;
})()

    function extend(target, source, deep) {
        for (key in source)
            if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
                if (isPlainObject(source[key]) && !isPlainObject(target[key]))
                    target[key] = {}
                if (isArray(source[key]) && !isArray(target[key]))
                    target[key] = []
                extend(target[key], source[key], deep)
            } else if (source[key] !== undefined) target[key] = source[key]
    }

    function isPlainObject(obj) {
        return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
    }

    function isArray(object) {
        return object instanceof Array
    }

    function formatParams(data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
        }
        return arr.join('&');
    }
    module.exports = Too;
//window.Too = Too;
//window.gb === undefined && (window.gb = Too)



/*var sendData = function (){
        function ajax(options) {
            options = options || {};
            options.type = (options.type || "GET").toUpperCase();
            options.dataType = options.dataType || "json";
            var params = formatParams(options.data);
            if (window.XMLHttpRequest) {
                var xhr = new XMLHttpRequest();
            } else { 
                var xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    var status = xhr.status;
                    if (status >= 200 && status < 300) {
                        options.success && options.success(xhr.responseText, xhr.responseXML);
                    } else {
                        options.fail && options.fail(status);
                    }
                }
            }
            if (options.type == "GET") {
                xhr.open("GET", options.url + "?" + params, true);
                xhr.send(null);
            } else if (options.type == "POST") {
                xhr.open("POST", options.url, true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send(params);
            }
        }

        function jsonp(options) {
            options = options || {};
            if (!options.url) {
                throw new Error("Parameter is not valid");
            }
            var callbackName = ('jsonp_' + Math.random()).replace(".", "");
            var oHead = document.getElementsByTagName('head')[0];
            //options.data[options.callback] = callbackName;
            //var params = formatParams(options.data);
            var oS = document.createElement('script');
            oHead.appendChild(oS);
            window[callbackName] = function (json) {
                oHead.removeChild(oS);
                clearTimeout(oS.timer);
                window[callbackName] = null;
                options.success && options.success(json);
            };
            if(options.url.indexOf('?') == -1){
                oS.src = options.url+ '?callback=' + callbackName;
            }else{
                oS.src = options.url+ '&callback=' + callbackName;
            }
            if (options.time) {
                oS.timer = setTimeout(function () {
                    window[callbackName] = null;
                    oHead.removeChild(oS);
                    options.fail && options.fail({ message: "timeOut" });
                }, time);
            }
        };
        function formatParams(data) {
            var arr = [];
            for (var name in data) {
                arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
            }
            return arr.join('&');
        }
        return function(options){
            var mat = options.url.match(/https?:\/\/([^\/]+)/);
            if (mat && location.host != mat[0]) {
                return jsonp(options);
            } else {
                return ajax(options);
            }
        };

    }();
    $.sendData = sendData;*/