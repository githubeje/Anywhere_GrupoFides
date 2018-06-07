/*
 * Version
 * MEthod
 * Data
 * */
function ServerCaller() {
	print = true;
	version = new Version();
	
	this.clearCache = function() {
		var json = {};
		for ( var i = 0, len = localStorage.length; i < len; ++i ) {
			if( localStorage.key(i).length >= "idModelo_".length) {
				if( localStorage.key(i).substring(0, "idModelo_".length) == "idModelo_" ) {
					json[localStorage.key(i)] = "";
				}
			}
		}
		
		$.each(json, function(k,v) {
			console.log("[Removing \""+k+"\"]");
			localStorage.removeItem(k);
		});

	};
	
	this.call = function(json) {
		var eSucess 	= json.success;
		var eError 		= json.error;
		var url 		= json.url;
		var dataSend 	= json.data;
		
		var respCached = this.getCache(url, dataSend);
		//console.log("[servletCaller check url-->"+JSON.stringify(json)+"]");
		
		if( respCached == null) {
			var log = new Log();
			log.addLog("[SIN CACHE]");
			
			json["beforeSend"] = function(e) {	
				try {
					var log = new Log();
					log.addLog("[BEFORESEND SHOW LOADING]");
					//$.mobile.loading("show");
				}
				catch(e) {
					console.log(e);
				}
			};
			json["success"] = function(dataReceive,x,y) {
				var log = new Log();
				log.addLog("[SUCESS]");
				var caller = new ServerCaller();
				if(eSucess != null) {
					eval(eSucess(dataReceive,x,y));
				}
				
				caller.putCache(url,dataSend, dataReceive );
			};
			json["error"] = function (xhr, ajaxOptions, thrownError,b,c) {
				var url = "";
				if(json != null) {
					url = json.url;
				}
				
				if(eError != null) {
					eval(eError(xhr, ajaxOptions, thrownError,b,c));
				}
				
				/*
				if(json.error != null) {
					var f = json.error;
					f(xhr, ajaxOptions, thrownError,b,c);
				} 
				*/
				//superPopup("msg","ServerCaller", "SC: A ocurrido un error inesperado, revisa tu conexi�n a internet e int�ntalo nuevamente. "+url+"<br/>");
			};
			json["complete"] = function(data) {
				var log = new Log();
				log.addLog("[COMPLETE HIDE LOADING]");
				try {
					//console.log("[HIDE LOADING]");
					//$.mobile.loading("hide");
				}
				catch(e) {
					console.log(e);
				}
				
			};
			
			try {
				$.ajax(json);
			}
			catch(e) {
				console.log(JSON.strongify(json));
				console.log(e);
			}
		}
		else {
			console.log("[CON CACHE]");
			
			try {
				console.log("[LOADING]");
				var f = eval(eSucess);
				f(respCached);
				
			}
			catch(e) {
				superPopup("msg","ServerCaller", "CC: A ocurrido un error inesperado. "+e);
			}
			finally {
				
			}
		}
	};

	this.getLocalItem = function(key) {
		//var any = new Anywhere();
		//if(print == true) console.log("[getcache]"+key+" -->"+localStorage.getItem(key));
		return localStorage.getItem(key);
	};
	
	this.setLocalItem = function(key, value) {
		//var any = new Anywhere();
		//localStorage.setItem(key, value);
	};
	
	this.getCache = function(url, params) {
		
		
		var config = new Config();
		
		if(config.wCache() == true) {
			var hashCodeParams = this.getHashParams(params); 
			var hashCodeUrl    = this.getHashUrl(url);
			
			version.getVersions(function(version) {
				var lastId = version.thisVersion;
				
				//console.log("get HashCode[params]:" + hashCodeParams + "  HashCode[url]:" + hashCodeUrl + " lastId:"+lastId);
				
				var keyModelo = "idModelo_"+lastId;
				
				/*JSON URL*/
				var keyUrl = hashCodeUrl;
				
				/*JSON PARAMS*/
				var keyParams = hashCodeParams;
				
				var dataKey = keyModelo + '-' + keyUrl + '-' + keyParams;
				
				var thisObject = new ServerCaller();
				/*var cacheRespuesta = thisObject.getLocalItem(dataKey);
				
				if(cacheRespuesta != null) {
					if(print == true)  console.log("[GET CACHE]"+dataKey);
					return JSON.parse(cacheRespuesta);
				}
				*/
			});
			

		}
		
		return null;
	};
	
	
	this.getHashUrl = function(url) {
		//return this.toHashCode(url).toString();
		return  url.toString();
	};
	
	this.getHashParams = function(params) {
		//return this.toHashCode(JSON.stringify(params)).toString();
		params =  JSON.stringify(params);
		if(params == null || params == 'undefined' ) {
			return "";
		} 
		else {
			return params;
		}
	};
	
	this.putCache = function(url, params ,value) {
		var config = new Config();
		
		if(config.wCache() == true) {
			/*
			var hashCodeParams = this.getHashParams(params); 
			var hashCodeUrl    = this.getHashUrl(url);
			
			version.getVersions(function(version) {
				var lastId = version.lastVersion;
				
				//console.log("put HashCode[params]:" + hashCodeParams + "  HashCode[url]:" + hashCodeUrl + " lastId:"+lastId);
				
				JSON MODELO
				var keyModelo = "idModelo_"+lastId;
				
				JSON URL
				var keyUrl = hashCodeUrl;
				
				JSON PARAMS
				var keyParams = hashCodeParams;
				
				var dataKey = keyModelo + '-' + keyUrl + '-' + keyParams;
				
				var thisObject = new ServerCaller();
				var cacheRespuesta = thisObject.getLocalItem(dataKey);
				if(cacheRespuesta == null) {
					if(print == true) console.log("[PUT CACHE]");
					thisObject.setLocalItem(dataKey, JSON.stringify(value));
				}
			});
			*/
		}
		
		return null;
	};
	
	
	this.toHashCode = function(str){
	    var hash = 0;
	    
	    if( str != null) {
		    if (str.length == 0) return hash;
		    for (i = 0; i < str.length; i++) {
		        char = str.charCodeAt(i);
		        hash = ((hash<<5)-hash)+char;
		        hash = hash & hash; // Convert to 32bit integer
		    }
		}	
	    return hash;
	};
}