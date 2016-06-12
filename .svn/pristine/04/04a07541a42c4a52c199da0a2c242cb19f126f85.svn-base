/**
 * [description]
 * global function 
 */
var GBFN = (function(){
	var gb = {};
	/**
	 * [isLogin 是否登录]
	 * @return {Boolean} [description]
	 */
	gb.isLogin = function(){
		var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
        	var item = cookies[i].split('=');
        	if(item[0].trim() == 'u'){
        		var userInfo = decodeURIComponent(item[1]).split('|');
        		return [userInfo[0],userInfo[1]]
        	}
        }
        return [0,0];
	}
	/**
	 * [getGeos description]
	 * @param  {[type]} 获取地址
	 * @return {[type]}     [description]
	 */
    gb.getGeos = function(geo) {
    	var cookies = document.cookie.split(';'),
    	    proviceId = '',proviceName='',
			cityId = '',cityName='',
			countryId='',countryName='',
			areaId = '';
    	for (var i = 0; i < cookies.length; i++) {
        	var item = cookies[i].split('=');
        	if(item[0].trim() == 'geos'){
               	var str = decodeURIComponent(item[1]);
               	if (str == '' || typeof str == 'undefined' || str == null) {
		            str = defaultGeos;
		        }
		       	var arrObj=str.split('|');
               	if(arrObj.length !=17){
               	  alert('geos error');
                  return false;
               	}
                if (arrObj[9] == '')
		            arrObj[9] = 0;		        

		        if(geo==1){
                   proviceId = arrObj[0];
    			   cityId = arrObj[3];
    			   countryId = arrObj[6];
    			   areaId = arrObj[9];
    			  return proviceId+","+cityId+","+countryId+","+areaId;
		        }else if(geo==2){
		        	if(arrObj[0]==1){
	    				proviceName = arrObj[4];
	    				cityName = arrObj[7];
	    				countryName = arrObj[10];
	    				areaId = arrObj[9];
		        	}else{
		        		proviceName = arrObj[1];
		    			cityName = arrObj[4];
		    			countryName = arrObj[7];
		    			areaId = arrObj[6];
		        	}
                   return [proviceName,cityName,countryName,areaId];
		        }else{
		        	return arrObj;
		        }
		        
        	}
        }
    }
	return gb;
})()
module.exports = GBFN;
