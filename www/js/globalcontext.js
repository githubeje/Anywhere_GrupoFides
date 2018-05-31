function getInstancer() {
	this.getObject = function(objectName) {
		var o = eval("new "+objectName+"()");
		return o;
	}
};


function Anywhere() {
	this.getWSAnywhere_context = function() {
		return "http://www.anywhere.cl/fides/ws1/"; //prod
		//return "http://www.anywhere.cl/wsprogestionchilebi/";
		//return "http://localhost:8090/fides/ws1/"; //LOCAL PANCHO
		//return "http://192.168.1.5:8080/wsprogestionchilebi/";
	};

	this.getWSAnywjere_contextEjeCore = function() {
		return "http://www.anywhere.cl/fides/ws2/"; // prod
		//return "http://localhost:8080/fides/ws2/"; // LOCAL PANCHO
		//return "http://localhost:8080/wsprogestionchilebi2/";
		//return "http://localhost:8090/web/";
	};
	
	this.getAnywhere_context = function() {
		return "http://www.anywhere.cl/fides/ws1/";
		//return "http://www.anywhere.cl/wsprogestionchilebi/";
		//return "http://192.168.1.6:8080/progestionchilebi/";
		//return "http://localhost:8080/fides/ws1/";

	}; 
	

}


function Config() {
	/*	Clustered:
	 * 	INDICA SI EL PROGRAMADA ESTA CLUSTERIZADO POR LOCAL,
	 *  2015-05-07,
	 *  A la fecha existe un problema cuando estÃ¡ clusterizado, ya que demora mucho tiempo al hacer 1 peticiÃ³n por cada posibilidad.  
	 *  Sin embargo, de igual manera funciona.
	 * */
	
	this.clustered = false; //Ya no aplica
	this.wInitCache = function() {
		return true;
	};
	
	this.wCache = function() {
		return true;
	};
	
	this.dropDatabasesOnInit = function() {
		return false;
	};
	
	this.isOnlyOneRequest = function() {
		return true;
	};
	
	this.getIdSender = function() {
		return "456543884918";
	};
	
	this.getCompanyName = function() {
		return "Progesti&oacute;n";
	};
	
	this.getStaticUsuario = function() {
		return "";
	};
	
	this.getStaticClave = function() {
		return "";
	};
	
	this.getUnicClient = function() {
		/* 6  Mars
		 * 13 Burstbee
		 * 14 MarsTT
		 * 17 Agrosuper
		 * 21 P&G
		 * 23 Mars Choco
		 * 24 Kimberly Clark
		 * * cualquiera
		 * */
		return "*";
	};
	
	this.getMethodStorage = function() {
		/*
		 * html5,WindowLocalStorage
		 * */
		
		return "WindowLocalStorage";
		//return "html5";
	}
}

function ConfigPostLogin() {
	this.solicitarIngresoInOutObligatorio = function(javascriptFunc) {
		var cluster = new Cluster();
		cluster.getModulos(function(modulos) {
			var haveInOut = false;
			$.each(modulos, function(k,v) {
				if(v.idproducto == "4") {
					haveInOut = true;
				}
			});
			
			if(javascriptFunc != null) {
				var f = eval(javascriptFunc);
				f(haveInOut);
			}
		});
	 
		 
	};
}

function Cluster() {

	
	this.getClientes = function(funcJavascript) {
		var map = new MapSQL("dataSQL");
		map.get("cluster",function(o) {
			var jsonCluster = null;
			
			try {
				jsonCluster = JSON.parse(o.data);
			}
			catch(e) {
				jsonCluster = {};
			}
			
			if(funcJavascript != null) {
				if( jsonCluster.clientes != null) {
					if( jsonCluster.clientes.length >= 1) {
						var f = eval(funcJavascript);
						f(jsonCluster.clientes[0]);		
					}
				}
			}				
		});
	};
	
	this.getModulos = function(funcJavascript) {
		var map = new MapSQL("dataSQL");
		map.get("cluster",function(o) {
			var jsonCluster = null;
			
			try {
				jsonCluster = JSON.parse(o.data);
			}
			catch(e) {
				jsonCluster = {};
			}
			
			if(funcJavascript != null) {
				if( jsonCluster.modulos != null) {
					if( jsonCluster.modulos.length >= 1) {
						var f = eval(funcJavascript);
						f(jsonCluster.modulos);		
					}
				}
			}				
		});
	}
	
 
}

function InOutUtils() {
	this.isInside = function(functionIsInside) {
		if(functionIsInside == null) return;
		  
		var login = new Login();
	
		login.getUsuario(function(usuario) {
			console.log("getUsuario!!!!");
			
			var success = function(data,status,jqXHR) {
				console.log("success!!!!");
				
				var fSuccess = function(data,status,jqXHR, x, versions) {
					var funcReturn = eval(x);
					try {
						funcReturn(data.total > 0, data.data[0], versions);
					}
					catch(e) {
						try {
							funcReturn(false, data.data[0], versions);	
						}
						catch(e) {
							
						}
					}
				}

				var fValidaLastVersion = function(versions) {
					
					var funcReturn = eval(functionIsInside);
					console.log("fValidaLastVersion");
					console.log(versions);
					
					if(versions.lastVersion == -1) { //SIN SESIÓN
						FunctionTool.evalFunction(funcReturn(true, 1, versions));
					}
					else {
						FunctionTool.evalFunction(fSuccess(data,status,jqXHR, functionIsInside, versions));	
					}
				};
				
				//console.log("getting versions:");
				
				var version = new Version();
				version.getVersions(fValidaLastVersion);

			};
			
			var eje = new AnywhereManager();
		 
			var p = {
					success : success,
					error : success
			}
 
			
			eje.getClaseWeb(true, "anywhere_movil_restanywhere", "Presencia", "get", p ,success);
			
		 
		});
		
	};
}
 
function IposPagerUtil() {
	this.init = function() {
		
	}
	
	
}

function Validar() {
 
	this.validarEmail = function(email) {
			expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		    if ( !expr.test(email) )
		      return false;
		    else
		      return true;
	};
	
	this.revisarDigito = function ( dvr )
	{	
		dv = dvr + ""	
		if ( dv != '0' && dv != '1' && dv != '2' && dv != '3' && dv != '4' && dv != '5' && dv != '6' && dv != '7' && dv != '8' && dv != '9' && dv != 'k'  && dv != 'K')	
		{		
			return false;	
		}	
		return true;
	}

	this.revisarDigito2 = function( crut )
	{	
		largo = crut.length;	
		if ( largo < 2 )	
		{		
			return false;	
		}	
		if ( largo > 2 )		
			rut = crut.substring(0, largo - 1);	
		else		
			rut = crut.charAt(0);	
		dv = crut.charAt(largo-1);	
		this.revisarDigito( dv );	

		if ( rut == null || dv == null )
			return 0	

		var dvr = '0'	
		suma = 0	
		mul  = 2	

		for (i= rut.length -1 ; i >= 0; i--)	
		{	
			suma = suma + rut.charAt(i) * mul		
			if (mul == 7)			
				mul = 2		
			else    			
				mul++	
		}	
		res = suma % 11	
		if (res==1)		
			dvr = 'k'	
		else if (res==0)		
			dvr = '0'	
		else	
		{		
			dvi = 11-res		
			dvr = dvi + ""	
		}
		if ( dvr != dv.toLowerCase() )	
		{			
			return false	
		}

		return true
	}

	this.validarRut = function (texto)
	{	
		var tmpstr = "";	
		for ( i=0; i < texto.length ; i++ )		
			if ( texto.charAt(i) != ' ' && texto.charAt(i) != '.' && texto.charAt(i) != '-' )
				tmpstr = tmpstr + texto.charAt(i);	
		texto = tmpstr;	
		largo = texto.length;	

		if ( largo < 2 )	
		{		
			return false;	
		}	

		for (i=0; i < largo ; i++ )	
		{			
			if ( texto.charAt(i) !="0" && texto.charAt(i) != "1" && texto.charAt(i) !="2" && texto.charAt(i) != "3" && texto.charAt(i) != "4" && texto.charAt(i) !="5" && texto.charAt(i) != "6" && texto.charAt(i) != "7" && texto.charAt(i) !="8" && texto.charAt(i) != "9" && texto.charAt(i) !="k" && texto.charAt(i) != "K" )
	 		{				
				return false;		
			}	
		}	

		var invertido = "";	
		for ( i=(largo-1),j=0; i>=0; i--,j++ )		
			invertido = invertido + texto.charAt(i);	
		var dtexto = "";	
		dtexto = dtexto + invertido.charAt(0);	
		dtexto = dtexto + '-';	
		cnt = 0;	

		for ( i=1,j=2; i<largo; i++,j++ )	
		{		
			//alert("i=[" + i + "] j=[" + j +"]" );		
			if ( cnt == 3 )		
			{			
				dtexto = dtexto + '.';			
				j++;			
				dtexto = dtexto + invertido.charAt(i);			
				cnt = 1;		
			}		
			else		
			{				
				dtexto = dtexto + invertido.charAt(i);			
				cnt++;		
			}	
		}	

		invertido = "";	
		for ( i=(dtexto.length-1),j=0; i>=0; i--,j++ )		
			invertido = invertido + dtexto.charAt(i);	

		 

		if ( this.revisarDigito2(texto) )		
			return true;	

		return false;
	}
	
}

function SaveUtils() {
	this.consoleLog = true;
	
	this.getDefValue = function(object) {
		var length = null;
		var type = "text";
		
		try {
			/*MAPEA LOS TIPOS*/
			if($(object).attr("type") != null) {
				type = $(object).attr("type");
				
				if("text" == type) {
					if($(object).attr("data-role") == "date") {
						type = $(object).attr("data-role");
					}
				}
				else if("hidden" == type) {
					type = "text";
				}
				else if("radio" == type) {
					type = "text";
				}
			}
			
			/*MAPEA LOS LARGOS*/
			if(type == "text" ) {
				if($(object).attr("maxlength") != null) {
					length = $(object).attr("maxlength");
				}
				else {
					length = "250";
				}
			}
			
			/*retorna el objeto*/
			if( $(object).attr("type") == "radio") {
				return {"value"  		:$(object).is(':checked')? $(object).val() : null, 
					    "data-length" 	:length,
					    "data-type" 	:type }; 
			}
			else {
				return {"value"  		:$(object).val() , 
					    "data-length" 	:length,
					    "data-type" 	:type }; 	
			}   
		}
		catch(e) {
			//$("#errorContainer").html($("#errorContainer").html() + "<br/>" + e);
		}
	};
	
	this.simpleOrList = function(json, name, iterateObject) {
		var saveUtil = this;
				
		if(name != null) {
			if(json[name] != null) {
				if(!Array.isArray(json[name]) ){
					var tmp = json[name];
					json[name] = [];
					json[name].push(tmp);
				}
				
				json[name].push(saveUtil.getDefValue( $(iterateObject) ));
			}
			else {
				json[name] = saveUtil.getDefValue( $(iterateObject) );	
			}
		}
		
		return json;
	}
	
	this.transponeFilas = function(json, remove) {
		console.log("[transportandoFila]");
		console.log(json);
		/*
		 * Transpone todas las filas que comienzan con "g_row" y las transforma en columnas,
		 * la idea es pasar los parametros en forma de columna.
		 * */
		var mapCols = [];
		var mapColsPosition = [];
		
		jQuery.each(json, function(k,v) {
			if(k != null) {
				if( k.indexOf("g_row_") >= 0) {
					if(Array.isArray(v)) {
					    console.log("ISARRAY ");
						var colPosition = 0;
						$.each(v, function(k2,v2) {
 
						
							if( json["gato_col_"+colPosition] == null) {
								json["gato_col_"+colPosition] = [];
							}
							
							if(mapCols.indexOf(colPosition) < 0) {
								mapCols.push(colPosition);	
							}
							
							json["gato_col_"+colPosition].push(v2);
													
							colPosition++;
						}); 
					}
					else {
						/*ESTA ZONA ESTA CON POSIBILIDAD DE ERRORES*/
						
						var colPosition = 1;
						
						if(mapColsPosition[k] == null) {
							mapColsPosition[k] = mapColsPosition.length;
						}
					
						colPosition = mapColsPosition[k];
						console.log("NOT ARRAY "+colPosition);
						 
						if( json["gato_col_"+colPosition] == null) {
							json["gato_col_"+colPosition] = [];
							
							mapCols.push(colPosition);
						}
						
						console.log(colPosition);
						
						json["gato_col_"+colPosition].push(v);
						 
					}
					
				}
			}
		});
	}
	
	this.serializePage = function(idContextHtml, objAnywhere) {
		var json = {};
		var saveUtil = this;
		
		try {
			if(objAnywhere != null) {
				json["cliente"]  = objAnywhere.getCliente();
				json["cadena"]   = objAnywhere.getCadena();
				json["local"]    = objAnywhere.getLocal();
				json["categoria"]= objAnywhere.getCategoria();
				json["producto"] = objAnywhere.getProducto();
			}
			
			/*para textos*/
			//console.log("cantidad de input[type=text]:"+$("#"+idContextHtml+" input[type=text]").length);
			$("#"+idContextHtml+" input[type=hidden]").each(function(){
				var name = $(this).attr("name");
				json = saveUtil.simpleOrList(json, name, $(this));
			});
			
			/*Para radios*/
			$("#"+idContextHtml+" input[type=radio]").each(function(){
				var name = $(this).attr("name");
				json = saveUtil.simpleOrList(json, name, $(this));
			});
			
			
			/*para textos*/
			//console.log("cantidad de input[type=text]:"+$("#"+idContextHtml+" input[type=text]").length);
			$("#"+idContextHtml+" input[type=text]").each(function(){
				var name = $(this).attr("name");
				json = saveUtil.simpleOrList(json, name, $(this));
			});
			
			/*para numeros*/
			//console.log("cantidad de input[type=number]:"+$("#"+idContextHtml+" input[type=number]").length);
			$("#"+idContextHtml+" input[type=number]").each(function(){
				var name = $(this).attr("name");
				json = saveUtil.simpleOrList(json, name, $(this));
			});
			
			/*para fechas*/
			//console.log("cantidad de input[type=number]:"+$("#"+idContextHtml+" input[type=number]").length);
			$("#"+idContextHtml+" input[type=date]").each(function(){
				var name = $(this).attr("name");
				json = saveUtil.simpleOrList(json, name, $(this));
			});
			
			
			/*para textareas*/
			//console.log("cantidad de textarea:"+$("#"+idContextHtml+" textarea").length);
			$("#"+idContextHtml+" textarea").each(function(){
				var name = $(this).attr("name");
				json = saveUtil.simpleOrList(json, name, $(this));
			});
			
			/*para select*/
			//console.log("cantidad de selects:"+$("#"+idContextHtml+" select").length);
			$("#"+idContextHtml+" select").each(function(){
				var name = $(this).attr("name");
				json = saveUtil.simpleOrList(json, name, $(this));
			});
			
			saveUtil.transponeFilas(json);
		}
		catch(e) {
			//$("#errorContainer").html($("#errorContainer").html() + "<br/>" + e);
		}
		
		console.log(json);
		return json;
	};
}


function Logger() {
	
	this.logStr = {};
	this.linea = 1;
	
	this.log = function(msg) {
		 
		this.logStr["linea"+this.linea] = {};
		this.logStr["linea"+this.linea]["msg"] = msg
		this.linea++;
	};
	
	this.logFunction = function(funcName,params,respuesta) {
		 
		this.logStr["linea"+this.linea] = {};
		this.logStr["linea"+this.linea]["function"]  = funcName
		this.logStr["linea"+this.linea]["params"]	 = params
		this.logStr["linea"+this.linea]["respuesta"] = respuesta
		this.linea++;
	};
	
	this.download = function() {
		console.log("[download] logger.txt");
		this.saveAs(JSON.stringify(this.logStr), "logger.txt");
	};
	
	this.sendToSenver = function() {
		var any = new Anywhere();
		var vUrl = any.getWSAnywhere_context() + "EjeCoreI?claseweb=cl.imasd.any.web.Logger";
		var login = new Login();
		var localJson = this.logStr;
		
		login.getUsuario(function(usuario) {
			$.ajax({ 
				type: "POST",
				dataType:"json",
				url: vUrl,
				timeout:8000,
				async: true,
				data: { "json" : JSON.stringify(localJson) , usuario : JSON.stringify(usuario)  },
				crossDomain : true,
			 
				success: function(data) {
					 console.log("[@@@@Sended to server]");
				},
				 
			});
		});
		
	};
	
	this.saveAs = function(textToWrite, fileNameToSaveAs ) {
		var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
 

		var downloadLink = document.createElement("a");
		downloadLink.download = fileNameToSaveAs;
		downloadLink.innerHTML = "Download File";
		if (window.webkitURL != null)
		{
			// Chrome allows the link to be clicked
			// without actually adding it to the DOM.
			downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
		}
		else
		{
			// Firefox requires the link to be added to the DOM
			// before it can be clicked.
			downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
			downloadLink.onclick = destroyClickedElement;
			downloadLink.style.display = "none";
			document.body.appendChild(downloadLink);
		}

		downloadLink.click();
		 
	}
	
}

function GeoGlobal() {
	this.refreshGeo = function(javascriptXY, javascriptPoint) {
		var options = { enableHighAccuracy: true, timeout: 180000, maximumAge: 0 };
		
		var onSuccess = function onSuccess(position) {
			posLatitud = position.coords.latitude;
			posLongitud = position.coords.longitude;
			
			if(javascriptXY != null) {
				var f = eval(javascriptXY);
				f(posLatitud, posLongitud);
			}
			
			var geocoder = new google.maps.Geocoder();
			var latlng = new google.maps.LatLng(posLatitud,posLongitud);
			geocoder.geocode({'latLng': latlng}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					if (results[0]) {
						pointAddress = results[0].formatted_address;
						
						if(javascriptPoint != null) {
							var f = eval(javascriptPoint);
							f(pointAddress);
						}
					} 
				 
				} 
				 
			});
			
			
		};
		
		var onError = function onError(err) {
			 
		};
		
		if (navigator.geolocation) {
			  navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
	    }
	 
		
	}
	
}

function DeviceInfo() {
	
	 
	
	this.getDeviceInfo = function(funcJavascript) {
		var info = {};
		
	    try { info["model"]  	= device.model 		} catch(e) { info["model"] = "-Error-" };
	    try { info["cordova"]	= device.cordova 	} catch(e) { info["cordova"] = "-Error-" };
	    try { info["platform"]  = device.platform 	} catch(e) { info["platform"] = "-Error-" };
	    try { info["uuid"]  	= device.uuid 		} catch(e) { info["uuid"] = "-Error-" };
	    try { info["version"]  	= device.version 	} catch(e) { info["version"] = "-Error-" };
	    
	    try {
	    	getAppVersion(function(version) {
	    			
	    		info["app_version"] = version;
	        	if(funcJavascript != null) {
	        		var f = eval(funcJavascript);
	        		f(info);
	        	}
	        });	
	       
	    }
	    catch(e) {
	    	info["app_version"] =  e;
	    }
	    
	    if(info["model"] == null 	   || info["model"] == undefined) { info["model"] = "-Error-" }
	    if(info["cordova"] == null 	   || info["cordova"] == undefined) { info["cordova"] = "-Error-" }
	    if(info["platform"] == null    || info["platform"] == undefined) { info["platform"] = "-Error-" }
	    if(info["uuid"] == null 	   || info["uuid"] == undefined) { info["uuid"] = "-Error-" }
	    if(info["version"] == null 	   || info["version"] == undefined) { info["version"] = "-Error-" }
	    if(info["app_version"] == null || info["app_version"] == undefined) { info["app_version"] = "-Error-" }
	    
	    return info;
	}
}

function Log() {
	this.showLog = function() {
	
		var popupMsg = new MasterPopup();
		popupMsg.alertPopup("Acualizando", $("#hiddenLog").val() );
		
	}
	
	this.addLog = function(txt) {
	
		$("#hiddenLog").val(  $("#hiddenLog").val() + "<br/>" + txt);
		
	}
};


function Version() {
	
	this.setThisVersion = function(lastVersion, funcJavascript) {
 
		var map = new MapSQL();
		map.del("getThisVersion", function() {
			map.add("getThisVersion",lastVersion, funcJavascript);
		});
	};
	
	this.getVersions = function(funcJavascript) {
		var oVersion = new Version();
		oVersion.getThisVersion(function(localThisVersion) {
			var oVersion = new Version();
			oVersion.getLastVersion(function(lastVersion) {
				var f = eval(funcJavascript);
				var json = {};
				json["thisVersion"] = localThisVersion.data;
				json["lastVersion"] = lastVersion;
				
				f(json);
			});
		});
	};
	
	this.getThisVersion = function(funcJavascript) {
		var map = new MapSQL();
		map.get("getThisVersion", function(valor) {
			if(valor == null) {
				valor = -1;
			}
			
			var f = eval(funcJavascript);
			f(valor);
		});
	};	
	
	this.getLastVersion = function(funcJavascript) {
		var retValue = -1;
		try {
			
			var login = new Login();
			login.getUsuario(function(usuario) {
				var any = new Anywhere();
				//var vUrl = any.getWSAnywhere_context() +"dispatcher?m=getVersion&c=Version&usuario="+JSON.stringify(usuario);
				var vUrl = any.getWSAnywjere_contextEjeCore() +"EjeCoreI";
				var localLastVersion = -1;
				
				$.ajax({ 
					type: "POST",
					dataType:"json",
					url: vUrl,
					timeout:8000,
					async: false,
					data: { "claseweb":"cl.imasd.view.sencha.anywhere.Conf", 
							"modulo":"anywhere_movil_restanywhere",
							"thing":"Version",
							"accion":"get",
							"idusuario":JSON.stringify(usuario)  },
					crossDomain : true,
					beforeSend : function() {
						$.mobile.loading("show");
					},
					success: function(data) {
						
						if(data.success == true) {
							localLastVersion = data.data[0].idmodeloActual;
						}	
					},
					error: function() {
						
					},
					complete: function() {
						$.mobile.loading("hide");
					}
				});
				
				var f = eval(funcJavascript);
				f(localLastVersion);
				
			});
			
			
		}
		catch(e) {
			console.log(e);
		}

		console.log("retValue:"+retValue);
		return retValue;
	};
	
}


function Parametros() {
	this.loadParametros = function(id, javascriptMethod) {
		var any = new Anywhere();
		var vUrl = any.getWSAnywhere_context() +"services/p2s/querys/parametros/"+id;
		
		var caller = new ServerCaller();
		caller.call({ 
			type: "GET",
			dataType:"json",
			url: vUrl ,
			async: false,
			crossDomain : true,
			success: function(data) {
				if(javascriptMethod != null && javascriptMethod != 'indefined') {
					var f = eval(javascriptMethod);
					f(data);
				}
			}
		
		});
	};
}

function JsTool() {
	this.getUrlParameter = function(sParam) {

		    var sPageURL = window.location.search.substring(1);
		    var sURLVariables = sPageURL.split('&');
		    
		    for (var i = 0; i < sURLVariables.length; i++) {
		        var sParameterName = sURLVariables[i].split('=');
		        
		        if (sParameterName[0] == sParam) {
		            return sParameterName[1];
		        }
		    }
	};
	
	this.onlyNumbers = function(input) {
		//$(input).val($(input).val().replace(/[^1-9\.]/g,''));
	};
}

function AnywhereManager() {
	var any = new Anywhere();
	
	this.clearCache = function() {
		var caller = new ServerCaller();
		caller.clearCache();
	};
	
	this.login = function(async, usuario , clave,  funcJavascript) {
		console.log("[AnywhereManager.login.begin] v.2015.09.2");
		
		
		/*
		    var vUrl = any.getWSAnywhere_context() + "dispatcher";
			var params = { "m" : "access" , "c" : "Login" ,rutPer : usuario, clave : clave };
		*/
		var vUrl = any.getWSAnywjere_contextEjeCore() + "EjeCoreI";

		var params = { "claseweb" : "cl.imasd.view.sencha.anywhere.Conf" ,
				       "modulo" : "anywhere_movil_restanywhere",
				       "thing" : "Login",
				       "accion":"get",
				       rutPer : usuario, 
				       clave : clave };
		
		var dataReturn = null;
		$.ajax({ 
			type: "GET",
			dataType:"json",
			url: vUrl ,
			async: false,
			data: params,
			crossDomain : true,
			cache: false,
			success: function(data) {
				if(funcJavascript != null) {
					var funcSuccesLocal = eval(funcJavascript);
					dataReturn = funcSuccesLocal(data);
				}
			},
			error: function(error) {
				console.log("[Globalcontext.callServer.ajaxError]"+error+"  "+vUrl+" "+JSON.stringify(params));
				throw new Error("[Globalcontext.callServer.ajaxError]"+error+"  "+vUrl+" "+JSON.stringify(params));
			}
		});
		return dataReturn;
		console.log("[AnywhereManager.login.end]");
	};
	
	this.getConsultaTareasIn = function(/*async,*/ idCliente , idCadena, idLocal, idUsuario, funcJavascript) {
		console.log("[AnywhereManager.ConsultaTareasIn.begin]");
		var idUsuario = sessionStorage.getItem("rutT");
		/*
		if(async) {
				   this.loadFromServer_Async(any.getWSAnywhere_context() + "dispatcher", 
						   {m: "ConsultaTareasIn" , 
					   		c: "SaveHelper", 
					   		idCliente : idCliente, 
					   		idCadena : idCadena,
					   		idLocal : idLocal,
					   		idUsuario : idUsuario}, funcJavascript);
		}
		else {*/
			return this.loadFromServer_Sync(any.getWSAnywhere_context() + "services/alertasvarias/ConsultaTareasIn", 
					{idCliente : idCliente, 
		   			idCadena : idCadena,
		   			idLocal : idLocal,
		   			idUsuario : idUsuario});
		/*}*/	
		
		console.log("[AnywhereManager.ConsultaTareasIn.end]");
	};	
	
	
	this.getPerfilacion = function(async, funcJavascript) {
		//console.log("[AnywhereManager.getPerfilacion.begin]");
		/*
		var idUsuario = sessionStorage.getItem("rutT");
		
		if(async) {
			       this.loadFromServer_Async(any.getWSAnywhere_context() + "services/p2s/querys/perfilacionlogin/"+idUsuario, {},funcJavascript);
		}
		else {
			return this.loadFromServer_Sync(any.getWSAnywhere_context() + "services/p2s/querys/perfilacionlogin/"+idUsuario, {});
		}
		*/
		//console.log("[AnywhereManager.getPerfilacion.end]");
	};
	
	this.getClientes = function (async, funcJavascript) {
		//console.log("[AnywhereManager.getClientes.begin]");
		/*
		var idUsuario = sessionStorage.getItem("rutT");
		
		if(async) {
				   this.loadFromServer_Async(any.getWSAnywhere_context() + "dispatcher", {m: "getClientesFromUsuario", c: "UsuarioCliente", idusuario : idUsuario }, funcJavascript);
		}
		else {
			return this.loadFromServer_Sync(any.getWSAnywhere_context() + "dispatcher", {m: "getClientesFromUsuario", c: "UsuarioCliente", idusuario : idUsuario });
		}
		*/
		//console.log("[AnywhereManager.getClientes.end]");
		
	};
	
	this.ipos_getCadenas = function(async, idCliente, funcJavascript) {
		console.log("[AnywhereManager.ipos_getCadenas.begin]");
		/*
		var idUsuario = sessionStorage.getItem("rutT");
		
		if(async) {
			       this.loadFromServer_Async(any.getWSAnywhere_context() + "dispatcher", {"m": "getCadenaFromUsuario", "c": "UsuarioCliente", "idusuario" : idUsuario, "idcliente": idCliente }, funcJavascript);
		}
		else {
			return this.loadFromServer_Sync(any.getWSAnywhere_context() + "dispatcher", {"m": "getCadenaFromUsuario", "c": "UsuarioCliente", "idusuario" : idUsuario, "idcliente": idCliente });
		}
		*/
		console.log("[AnywhereManager.ipos_getCadenas.end]");
	};
	
	this.ipos_getCadenasTT = function(async, idCliente, idRegion, idComuna, funcJavascript) {
		console.log("[AnywhereManager.ipos_getCadenasTT.begin]");
		
		var idUsuario = sessionStorage.getItem("rutT");
		
		if(async) {
			       this.loadFromServer_Async(any.getWSAnywhere_context() + "dispatcher", {"m": "getCadenaFromClienteRegionComuna", "c": "UsuarioCliente", "idusuario" : idUsuario, "idcliente": idCliente, "idregion" : idRegion, "idcomuna": idComuna }, funcJavascript);
		}
		else {
			return this.loadFromServer_Sync(any.getWSAnywhere_context()  + "dispatcher", {"m": "getCadenaFromClienteRegionComuna", "c": "UsuarioCliente", "idusuario" : idUsuario, "idcliente": idCliente, "idregion" : idRegion, "idcomuna": idComuna });
		}
		
		console.log("[AnywhereManager.ipos_getCadenasTT.end]");
	};
	
	this.ipos_getLocales = function(async, idCliente, idCadena, funcJavascript) {
		console.log("[AnywhereManager.ipos_getLocales.begin]");
		var idUsuario = sessionStorage.getItem("rutT");
		
		if(async) {
			       this.loadFromServer_Async(any.getWSAnywhere_context() + "dispatcher", {m: "getLocalesFromUsuario", c: "UsuarioCliente", idusuario : idUsuario , idcliente: idCliente, idcadena: idCadena }, funcJavascript);
		}
		else {
			return this.loadFromServer_Sync(any.getWSAnywhere_context() + "dispatcher", {m: "getLocalesFromUsuario", c: "UsuarioCliente", idusuario : idUsuario , idcliente: idCliente, idcadena: idCadena });
		}
		
		console.log("[AnywhereManager.ipos_getLocales.end]");
	};
	
	this.ipos_getLocalesTT = function(async, idCliente, idRegion , idComuna, idCadena, funcJavascript) {
		console.log("[AnywhereManager.ipos_getLocalesTT.begin]");
		var idUsuario = sessionStorage.getItem("rutT");
		
		if(async) {
			       this.loadFromServer_Async(any.getWSAnywhere_context() + "dispatcher", {m: "getLocalFromClienteRegionComunaCadena", c: "UsuarioCliente", "idusuario" : idUsuario , "idcliente" : idCliente, "idcadena" : idCadena, "idregion":idRegion, "idcomuna" : idComuna }, funcJavascript);
		}
		else {
			return this.loadFromServer_Sync(any.getWSAnywhere_context() + "dispatcher" , {m: "getLocalFromClienteRegionComunaCadena", c: "UsuarioCliente", "idusuario" : idUsuario , "idcliente" : idCliente, "idcadena" : idCadena, "idregion":idRegion, "idcomuna" : idComuna });
		}
		
		console.log("[AnywhereManager.ipos_getLocalesTT.end]");
	};
	
	this.ipos_getRegiones = function(async, idCliente,  funcJavascript) {
		console.log("[AnywhereManager.ipos_getRegiones.begin]");
		var idUsuario = sessionStorage.getItem("rutT");
		
		if(async) {
			       this.loadFromServer_Async(any.getWSAnywhere_context() + "dispatcher", {m: "getRegionFromCliente", c: "UsuarioCliente", idusuario : idUsuario , idcliente: idCliente }, funcJavascript);
		}
		else {
			return this.loadFromServer_Sync(any.getWSAnywhere_context() + "dispatcher", {m: "getRegionFromCliente", c: "UsuarioCliente", idusuario : idUsuario , idcliente: idCliente });
		}
		
		console.log("[AnywhereManager.ipos_getRegiones.end]");
	};
	
	this.ipos_getComunas = function(async, idCliente, idRegion, funcJavascript) {
		console.log("[AnywhereManager.ipos_getComunas.begin]");
		var idUsuario = sessionStorage.getItem("rutT");
		
		if(async) {
			       this.loadFromServer_Async(any.getWSAnywhere_context() + "dispatcher", {m: "getComunaFromClienteRegion", c: "UsuarioCliente", idusuario : idUsuario , idcliente: idCliente, idregion: idRegion }, funcJavascript);
		}
		else {
			return this.loadFromServer_Sync(any.getWSAnywhere_context() + "dispatcher", {m: "getComunaFromClienteRegion" , c: "UsuarioCliente", idusuario : idUsuario , idcliente: idCliente, idregion: idRegion });
		}
		
		console.log("[AnywhereManager.ipos_getComunas.end]");
	};
	
	this.ipos_getDistribuidores = function(async, idCliente, idRegion,idComuna,idCadena, funcJavascript) {
		console.log("[AnywhereManager.ipos_getDistribuidores.begin]");
		var idUsuario = sessionStorage.getItem("rutT");
		
		if(async) {
			       this.loadFromServer_Async(any.getWSAnywhere_context() + "dispatcher", {m: "getDistribuidorFromClienteRegionComunaCadena", c: "UsuarioCliente", idusuario : idUsuario , idcliente: idCliente, idregion: idRegion, idcomuna: idComuna, idcadena: idCadena }, funcJavascript);
		}
		else {
			return this.loadFromServer_Sync(any.getWSAnywhere_context() + "dispatcher", {m: "getDistribuidorFromClienteRegionComunaCadena" , c: "UsuarioCliente", idusuario : idUsuario , idcliente: idCliente, idregion: idRegion, idcomuna: idComuna, idcadena: idCadena });
		}
		
		console.log("[AnywhereManager.ipos_getDistribuidores.end]");
	};
	
	this.ipos_getCategorias = function(async, idCliente, funcJavascript, idGrupo) {
		console.log("[AnywhereManager.ipos_getCategorias.begin]");
		var idUsuario = sessionStorage.getItem("rutT");
		
		if(async) {
				   this.loadFromServer_Async(any.getWSAnywhere_context() + "dispatcher", {m: "getCategoriaFromUsuario", c: "UsuarioCliente", "padreparametro":idGrupo, idcliente: idCliente }, funcJavascript);
		}
		else {
			return this.loadFromServer_Sync(any.getWSAnywhere_context() + "dispatcher", {m: "getCategoriaFromUsuario", c: "UsuarioCliente" , "padreparametro":idGrupo, idcliente: idCliente });
		}
		
		console.log("[AnywhereManager.ipos_getCategorias.end]");
	};
	
	this.ipos_getProductos = function(async, idCliente, idLocal, idCategoria, funcJavascript) {
		console.log("[AnywhereManager.ipos_getProductos.begin]");
		var idUsuario = sessionStorage.getItem("rutT");
		
		console.log("[ipos_getProductos]");
		if(async) {
				   this.loadFromServer_Async(any.getWSAnywhere_context() + "dispatcher", {"idlocal": idLocal, m: "getProductoFromUsuario", c: "UsuarioCliente", idcliente: idCliente, "idcategoria" : idCategoria }, funcJavascript);
		}
		else {
			return this.loadFromServer_Sync(any.getWSAnywhere_context() + "dispatcher", {"idlocal": idLocal, m: "getProductoFromUsuario", c: "UsuarioCliente" , idcliente: idCliente, "idcategoria": idCategoria });
		}
		
		console.log("[AnywhereManager.ipos_getProductos.end]");
	};
	
	this.ipos_getPromociones = function(async, idCliente, idCadena, funcJavascript) {
		console.log("[AnywhereManager.ipos_getPromociones.begin]");
		var idUsuario = sessionStorage.getItem("rutT");
		
		if(async) {
				   this.loadFromServer_Async(any.getWSAnywhere_context() + "dispatcher", {m: "getPromocionesFromUsuario", c: "UsuarioCliente", idcliente: idCliente, idcategoria: idCadena }, funcJavascript);
		}
		else {
			return this.loadFromServer_Sync(any.getWSAnywhere_context() + "dispatcher", {m: "getPromocionesFromUsuario", c: "UsuarioCliente" , idcliente: idCliente, idcategoria: idCadena });
		}
		
		console.log("[AnywhereManager.ipos_getProductos.end]");
	};
	
	
	this.imarket_getCompetidores= function(async, idCliente , funcJavascript) {
		console.log("[AnywhereManager.imarket_getCompetidores.begin]");
		var idUsuario = sessionStorage.getItem("rutT");
		
		if(async) {
				   this.loadFromServer_Async(any.getWSAnywhere_context() + "dispatcher", {m: "getData", c: "Competidor", idcliente : idCliente }, funcJavascript);
		}
		else {
			return this.loadFromServer_Sync(any.getWSAnywhere_context() + "dispatcher", {m: "getData", c: "Competidor", idcliente : idCliente });
		}
		
		console.log("[AnywhereManager.imarket_getCompetidores.end]");
	};
	
	this.imarket_getCategoriaCompetidores= function(async, idCliente , funcJavascript) {
		console.log("[AnywhereManager.imarket_getCategoriaCompetidores.begin]");
		var idUsuario = sessionStorage.getItem("rutT");
		
		if(async) {
				   this.loadFromServer_Async(any.getWSAnywhere_context() + "dispatcher", {m: "getCategoriaCompetidoresFromCliente", c: "UsuarioCliente", idcliente: idCliente}, funcJavascript) ;
		}
		else {
			return this.loadFromServer_Sync(any.getWSAnywhere_context() + "dispatcher", {m: "getCategoriaCompetidoresFromCliente", c: "UsuarioCliente", idcliente: idCliente}) ;
		}
		
		console.log("[AnywhereManager.imarket_getCategoriaCompetidores.end]");
	};
	
	this.imarket_getProductosCompetidores= function(async, idCompetencia , idCategoria, funcJavascript) {
		console.log("[AnywhereManager.imarket_getProductosCompetidores.begin]");
		var idUsuario = sessionStorage.getItem("rutT");
		
		if(async) {
				   this.loadFromServer_Async(any.getWSAnywhere_context() + "dispatcher", {m: "getProductoFromCompetidor" , c: "UsuarioCliente", idcompetencia: idCompetencia, idcategoria : idCategoria}, funcJavascript);
		}
		else {
			return this.loadFromServer_Sync(any.getWSAnywhere_context() + "dispatcher", {m: "getProductoFromCompetidor" , c: "UsuarioCliente", idcompetencia: idCompetencia, idcategoria : idCategoria});
		}
		
		console.log("[AnywhereManager.imarket_getProductosCompetidores.end]");
	};	
	
	this.generator_getListaFormularios= function(async, funcJavascript) {
		console.log("[AnywhereManager.generator_getListaFormularios.begin]");
		
		if(async) {
			   this.loadFromServer_Async(any.getWSAnywhere_context() + "services/p2s/querys/listadoformulario", {}, funcJavascript);
		}
		else {
			return this.loadFromServer_Sync(any.getWSAnywhere_context() + "services/p2s/querys/listadoformulario", {});
		}
		
		console.log("[AnywhereManager.generator_getListaFormularios.end]");
	};
	
	this.generator_getFormularios= function(async, idForm, funcJavascript) {
		console.log("[AnywhereManager.generator_getFormularios.begin]");
		
		if(async) {
			       this.loadFromServer_Async(any.getWSAnywhere_context() + "services/p2s/querys/camposformulario/" + idForm + "/" + idForm, {}, funcJavascript);
		}
		else {
			return this.loadFromServer_Sync(any.getWSAnywhere_context() + "services/p2s/querys/camposformulario/" + idForm + "/" + idForm, {});
		}
		
		console.log("[AnywhereManager.generator_getFormularios.end]");
	};
	
	this.getClaseWeb = function (async, modulo, thing, accion, parameters, funcJavascript) {
		
		console.log("[AnywhereManager.getClaseWeb.begin]");
		var login = new Login();
		login.getUsuario(function(usuario) {
			var params = {claseweb: "cl.imasd.view.sencha.anywhere.Conf", idusuario : JSON.stringify(usuario), "modulo": modulo, "thing": thing , "accion": accion};
			if(parameters != null){
 				 for (var key in parameters) {
					 params[key] = parameters[key];
				 }
 			}
			var anyCaller = new AnywhereManager();
			var any = new Anywhere();
			
			if(async) {
					   anyCaller.loadFromServer_Async(any.getWSAnywjere_contextEjeCore()+ "EjeCoreI",params , funcJavascript);
			}
			else {
				return anyCaller.loadFromServer_Sync(any.getWSAnywjere_contextEjeCore() + "EjeCoreI", params);
			}
			
			console.log("[AnywhereManager.getClaseWeb.end]");
		});
	};
	
	this.saveClaseWeb = function (async, modulo, thing, accion, parameters, funcJavascript) {
		console.log("[AnywhereManager.getClaseWeb.begin]");
		var login = new Login();
		login.getUsuario(function(usuario) {
			var map  = new MapSQL("PRESENCIA");
			map.get("idregistro",function(value) {

				var params = {claseweb: "cl.imasd.view.sencha.anywhere.Conf", 
						idusuario : JSON.stringify(usuario), 
						"modulo": modulo, 
						"thing": thing , 
						"accion": accion,
						"idPresenciaVigente": value.data};
				if(parameters != null){
					 for (var key in parameters) {
						 params[key] = parameters[key];
					 }
				}
				
				var anyCaller = new AnywhereManager();
				var any = new Anywhere();
				
				if(async) {
					params["modulo"] = "anywhere_movil_restanywhere";
					params["thing"] = "AnySave";
					params["modulo"] = "add";
					
					
					anyCaller.save(
						any.getWSAnywjere_contextEjeCore()+ "EjeCoreI",
						params,
						funcJavascript );

					//anyCaller.loadFromServer_Async(any.getWSAnywjere_contextEjeCore()+ "EjeCoreI",params , funcJavascript, "POST");
				}
				else {
					return anyCaller.loadFromServer_Sync(any.getWSAnywjere_contextEjeCore() + "EjeCoreI", params, null, "POST");
				}
			});
		});
	};
	
	this.loadFromServer_Async = function(vUrl, params, funcJavascript, type) {
		if(funcJavascript == null) {
			funcJavascript = function(data) {};
		}
		this.callServer(vUrl, params, true, funcJavascript, type);
	};
	
	this.loadFromServer_Sync = function(vUrl, params, nulo, type) {
		var funcJavascript = null;
		if(funcJavascript == null) {
			funcJavascript = function(data) { return data;};
		}
		return this.callServer(vUrl, params, false,  funcJavascript);
	};
	
	this.checkSavesPendientes = function(urlRedirect, functionJavascript) {
		var stack = localStorage.getItem("idSaves");
		if(stack != null && stack != undefined && this.getSavesPendientes() > 0 ) {			
			stack = JSON.parse(stack);			
			
			var popup = new MasterPopup();
			popup.confirmPopup("Guardar"
					, "Se ha encontrado "+this.getSavesPendientes()+" registro(s) pendiente(s) por informar, \u00BFDesea hacerlo ahora?.</div>"
					, { "funcYes": function() {
						var mng = new AnywhereManager();
						mng.sendSavesToServer(urlRedirect, functionJavascript);		
						popup.closePopup();
					  }});

		}
	};
	
	
	this.resetStorage = function() {
		localStorage.clear();
	};
	
	this.sendSavesToServer = function(urlRedirect, functionJavascript) {
		
		if(localStorage.getItem("idSaves") != null) {
			var popup = new MasterPopup();
			popup.bloqPopup("Actualizando", "Informando registros<br/>", {"callbackopen": function() {
				
				var f = function() {
	
						var oks = 0;
						var mal = 0;
						
						var stack = JSON.parse(localStorage.getItem("idSaves"));
						
						try {
					
							$.each(stack, function(k,v) {
								console.log("[KEY "+k+"]");
								try {
									console.log("[KEY "+k+" 1]");
									var newSave = localStorage.getItem(k);
									//var popupNewSave = new MasterPopup();
									//popupNewSave.alertPopup("New Save", newSave);
									
									if(newSave != null) {
										console.log("[KEY "+k+" 2]");
										newSave = JSON.parse(newSave);
										newSave.async = false;
										
										var gc = new AnywhereManager();
										var ok = gc.saveMaster(newSave);
										console.log("[KEY "+k+" 4]");
										if(ok) {
											oks += 1;
											var mngLocal = new AnywhereManager();
											console.log("[KEY "+k+" 5]");
											mngLocal.deleteSavePendiente(k);
										}
										else {
											mal += 1;
										}
										console.log("[KEY "+k+" 5]");
									}else {
										localStorage.removeItem(k);
									}
									
								}catch(e) {
									var popupError = new MasterPopup();
									popupError.alertPopup("Actualizando", "Ha ocurrido un error desconocido <br/>"+e);
								}
										
								console.log("[END KEY "+k+"]");
							});
						} 
						catch(e) {
							console.log(e);
						}
						finally {
	
							var popupMsg = new MasterPopup();
							popupMsg.alertPopup("Actualizando", "Registros cargados:"+oks+" <br/> Registros pendientes:"+mal+" <br/>",{"funcYes":  function() {
							   if(functionJavascript != null){
								   var func =  eval(functionJavascript);
								   func();
								}
							}});
	
							popup.closePopup();	
							checkSaves();
						}
						
						console.log("TERMINÓ sendSavesToServer");
				};
				
				//FunctionTool.evalFunction(f);
				window.setTimeout( f, 2000);
				
			}});

			
		}
		
	};
	
	this.deleteSavePendiente = function(key) {
		var keys = localStorage.getItem("idSaves");
		console.log("[TRYING DELETE]"+key);
		if( keys != null) {
			keys = JSON.parse(keys);
			console.log("[KEY BEFORE]"+keys);
			delete keys[key];
			localStorage.setItem("idSaves", JSON.stringify(keys));
			localStorage.removeItem(key); 
			
			console.log("[KEY AFTER]"+keys);
		}
	};
	
	this.getSavesPendientes = function() {
		var cant = 0;
		var keys = localStorage.getItem("idSaves");
		console.log("[GETSAVES PENDIENTES ]"+keys);
		
		if(keys != null) {
			var stack = JSON.parse(keys);
			$.each(stack, function(k,v) {
				cant = cant + 1;
			});
		}
		
		console.log("[GETSAVES PENDIENTES ]"+keys);
		
		return cant;
	};
	
	this.save = function(vUrl, params, sucess, error, complete, async) {
		var versionAqui = "save v1.0.2 ";
		console.log(" "+versionAqui+" "+vUrl);
		/**
		 * save
		 * */
		
		if(async == null) {
			async = true;
		}
		
		params["success"] = sucess;
		params["error"] = error;
		params["complete"] = complete;
		
		var newSave = {"type": "POST",
					   "async": async,
					   "url": vUrl ,
					   "data": params,
					   "sucess": sucess,
					   "error" : error,
					   "complete":complete};
			
		var version = new Version();
		console.log(versionAqui+" getting version");
		version.getLastVersion(function(lastVersion){
			if( lastVersion == -1) {//-1 = SIN SESIÓN
				console.log(versionAqui+" SIN SESION");
				try {
					var stack = localStorage.getItem("idSaves");
					if(stack == null || stack == undefined) {
						stack = JSON.stringify({});
					}
					
					try {
						stack = JSON.parse(stack);
					}catch(e) {
						stack = JSON.stringify({});
						stack = JSON.parse(stack);
					}
					
					var newId = "idSaves_" +Math.random();
					stack[newId] =  "";
					
					localStorage.setItem(newId	  ,JSON.stringify(newSave));
					localStorage.setItem("idSaves",JSON.stringify(stack));
					
					if(params.success != null) {
						var func = eval(sucess);
						func({"dataFalsa":"dataFalsa"});
					}
	
					if(params.complete != null) { 
						/*
						var func2 = eval(params.complete);
						func2();*/
					}
				}
				catch(e) {
					console.log(e);
				}
			}
			else {
				console.log(versionAqui+" CON SESION");
				
				var gc = new AnywhereManager();
				gc.saveMaster(newSave);
			}
		})
		
		
		
	};
	
	this.saveMaster = function(newSave) {
		console.log("[Globalcontext.save] ");
		console.log(newSave.url+ " " + JSON.stringify(newSave.data));
		var ok = false;
		
		try {
			$.ajax({ 
				type: newSave.type ,
				dataType:"json",
				url: newSave.url,
				async: newSave.async,
				data: newSave.data,
				cache: false,
				crossdomain:true,
				success: function(data) {
					console.log("IN [Globalcontext.save.success] "+newSave.url+" "+newSave.data);
					
					if(newSave.sucess != null) {
						var f = eval(newSave.sucess);
					
						f(data);
					}
					
					ok = true;
					console.log("OUT [Globalcontext.save.success] "+newSave.url+" "+newSave.data);
				},
				error: function(jqXHR,  textStatus,  errorThrown ) {
					console.log("IN [Globalcontext.save.error]"+JSON.stringify(jqXHR)+" "+JSON.stringify(textStatus)+" "+JSON.stringify(errorThrown));
					
					if(newSave.error != null) {
						var f = eval(newSave.error);
						f(jqXHR,  textStatus,  errorThrown );
					}
	
					ok = false;
					console.log("OUT [Globalcontext.save.error]"+JSON.stringify(jqXHR)+" "+JSON.stringify(textStatus)+" "+JSON.stringify(errorThrown));
					
				},
				complete: function(jqXHR,  textStatus,  errorThrown) {
					console.log("IN [Globalcontext.save.complete]"+textStatus+"  "+newSave.url);
					
					if(newSave.complete != null) {
						var f = eval(newSave.complete);
						f(jqXHR,  textStatus,  errorThrown);
					}
	
					console.log("OUT [Globalcontext.save.complete]"+textStatus+"  "+newSave.url);
				}
			});
		}
		catch(e) {
			console.log("[Globalcontext.save.catch]"+e+"  "+newSave.url+" ");
			ok = false;

		}
		
		return ok;
	};
	
	this.callServer = function(vUrl, params, async , funcJavascript, type) {
		console.log("[Globalcontext.callServer] "+vUrl+" "+JSON.stringify(params));
		var dataReturn = null;
		if(type == null) {
			type = "GET";
		}
		
		try {
			var log = new Log();
			log.addLog("CALLING SERVER");
			
			params.success = funcJavascript;
			var data = params;
			
			var fsucess = params.success;
			var ferror = params.error;
			var fcomplete = params.complete;
			
			params.success = null;
			params.error = null;
			params.complete = null;
			
			var caller = new ServerCaller();
			caller.call({ 
				type: type,
				dataType:"json",
				url: vUrl ,
				async: async,
				data: params,
				crossDomain : true,
				cache: false,
				success: function(data,a,b) {
					
					if(fsucess != null) {
						var f = eval(fsucess);
						dataReturn = f(data,a,b);
					}
 
				},
				error: function(error,a,b,c) {
					if(ferror != null) {
						var f = eval(ferror);
						f(error,a,b,c);
					}
					//console.log("[Globalcontext.callServer.ajaxError]"+error+"  "+vUrl+" "+JSON.stringify(params));
					//throw new Error("[Globalcontext.callServer.ajaxError]"+error+"  "+vUrl+" "+JSON.stringify(params));
				},
				complete : function(a,b,c,d) {
					if(fcomplete != null) {
						var f = eval(fcomplete);
						f(a,b,c,d);
					}
				}
			});
		}
		catch(e) {
			//console.log("[Globalcontext.callServer.catch]"+e+"  "+vUrl+" "+JSON.stringify(params));
			throw new Error("[Globalcontext.callServer.catch]"+e+"  "+vUrl+" "+JSON.stringify(params));

		}
		
		return dataReturn;
	};
	
	this.makeId = function()  {
		console.log("[MasterPopup.makeid]");
	    var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    for( var i=0; i < 20; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));

	    return text;
	};
}


function AnySave() {

	var pointAddress = 'No definido';
	var stockImage = 'Sin Imagen';
	var posLatitud = null;
	var posLongitud = null;
	var quiebreSaveInit = false;
	var nombreModulo = "nn"
	var formularioID = null;
	var message = null;
	
	var geo = new GeoGlobal();
	geo.refreshGeo(function(lat, lo) {
		posLatitud = lat;
		posLongitud = lo;

	}, function(point) {
		pointAddress = point;
	});


	this.save = function (nM, fID, fJava) {
		console.log("save v9.0.0");
		nombreModulo = nM;
		formularioID = fID;
		
		if(!quiebreSaveInit) {
			quiebreSaveInit = true;
			internalSave(fJava);
		}	
	}

	function internalSave(fJava) {
		
		 if ($('#formSend').validate({
			 	errorPlacement: function(error, element) {
					if ($(element).is('select')) {
						error.insertAfter($(element).parent());
					}
					else {
						error.insertAfter(element);
					}
				}
			 }).form() == true) {
			 
			 if( fotosObligatoriasCargadas() ) {
				 internalSave_ModoSimple(fJava);	 
			 }
			 else {
				 quiebreSaveInit = false;
			 }
		 }
		 else {
			 var popup = new MasterPopup();
			 popup.alertPopup(nombreModulo, "Debes completar todos los datos en rojo");
			 quiebreSaveInit = false;
		 } 
		 
	}



	function internalSave_ModoSimple(fJava) {
		console.log("internalSave_ModoSimple");
		
		if(!checkRadios()) {
			quiebreSaveInit = false;
			return;
		}
		
		var saveUtil = new SaveUtils();
		var params = saveUtil.serializePage("formSend", objAnywhere);
		params["formulario_id"]    = formularioID;
		params["formulario_alias"] = nombreModulo;
		params["latitud"]     = posLatitud;
		params["longitud"]    = posLongitud;
		params["point"]   	  = pointAddress;
		params["fotoUno"] = $("#hiddenFotoUno").val();
		params["fotoDos"] = $("#hiddenFotoDos").val();
		params["fotoTres"] = $("#hiddenFotoTres").val();
		params["fotoCuatro"] = $("#hiddenFotoCuatro").val();
	 
		
		var success = function(data,status,jqXHR) { 
			var mensajeSave = null;

			if(data != null) {
				var any = new AnySave();
				any.setLastData(JSON.stringify(data));
				
				if(data.success == true) {
					mensajeSave = "Informaci&oacute;n enviada correctamente";	
				}
				else {
					mensajeSave = "La informaci&oacute;n enviada no pudo ser procesada";	
				}
				if(data.dataFalsa == "dataFalsa") {
					mensajeSave = "Alerta sin conexi&oacute;n a Internet. Su informaci&oacute;n ser&aacute; guardada en el celular y apenas cuente con Internet usted debe reenviarla (ir al men&uacute; principal)";
				}
			}
			var popup = new MasterPopup();
			popup.alertPopup(nombreModulo, mensajeSave, {"funcYes":  function() {
			   $.mobile.changePage( "index.html", { transition: "flip"} );
			}});
			
			if(fJava != null) {
				var e = eval(fJava);
				e();
			}
		}
		
		quiebreSaveInit = false;
		 
		var anySave = new AnywhereManager();
		anySave.saveClaseWeb(true, "anywhere_movil_restanywhere", "AnySave", "add", params, success);
	}
	
	function checkRadios() {
		var ok = true;
		
		var namesRadio = {};
		$("input[type=radio]").each(function() {
			if( $(this).hasClass( "required" ) ) {
				namesRadio[$(this).attr("name")] = "";
			}
		});
		
		$.each(namesRadio, function(k,v) {	
			if( $('input[name='+k+']:checked').val() == null) {
				ok = false;
				
				if($("#msg_"+k).length == 0){
					var radio = $('input[type=radio][name='+k+']').parent();
					
					radio.change(function() {
						$("#msg_"+k).remove();
					});
					
					radio.parent().append("<b id='msg_"+k+"' style='color:red;'>Este campo es obligatorio</b>");
					
					//$('input[type=radio][name='+k+']')[1].append("<b id='msg_"+k+"'>Este campo es obligatorio</b>");	
				}
				
			}
		});
		
		return ok;
	}
	
	this.setLastData = function(data) {
		if($("#lastMessageSave").length > 0) {
			$("#lastMessageSave").remove();
		}
		
		$("body").append("<input type='hidden' id='lastMessageSave' value='"+data+"' />");
	}
	
	this.getLastData = function() {
		return $("#lastMessageSave").val();
	}
}

class FunctionTool {
	static evalFunction(func) {
		if(func!=null) {
	 
			if(typeof func == 'function') {
				var f = func;
				f();
			}
		}
	};
}

