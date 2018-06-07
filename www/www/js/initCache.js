
function InitCache() {
	console.log("InitCache 1")
	version = new Version();
 
	this.iniciaCacheo = function(metodoJavascript) {
		var any = new Anywhere();
		var config = new Config();
		
		console.log("[CACHE INICIAL "+config.wInitCache()+"]");
		if( config.wInitCache() == true ) {
			console.log("[CACHE INICIAL ACTIVADO]");
			
			var fValidaLastVersion = function(versions) {
				//console.log(JSON.stringify(versions));
				
				if(versions.lastVersion == -1) {
					/*SIN CONEXION*/
					console.log("[MODO SIN CONEXION] THISV:"+ versions.thisVersion + " LASTSERVERV:"+versions.lastVersion);
					
					if(versions.thisVersion != -1) {
						console.log("[MODELO NO NECESITA UPDATE]");
						var f = eval(metodoJavascript);
						f();
					}
					else {
						console.log("[REFRESING MODELO]");
						
						var popup = new MasterPopup();
						popup.alertPopup("Error",
								"No se ha configurado correctamente la aplicaci&oacute;n y actualmente no tiene conexi&oacute;n, por favor con&eacute;ctese a internet y ejecute la aplicaci&oacute;n nuevamente", 
								{"funcYes" : function() {  navigator.app.exitApp();  }});
						
					}
				}
				else {
					/*CON CONEXION*/
					console.log("[MODO CON CONEXION] THISV:"+ versions.thisVersion + " LASTSERVERV:"+ versions.lastVersion);
					if(  versions.thisVersion == -1 || versions.thisVersion != versions.lastVersion) {
						console.log("[REFRESING MODELO]");
						
						
						var config = new Config();
						var init = new InitCache();
						
						if( config.isOnlyOneRequest() ) {
							var sql = new MapSQL("dataSQL");
							sql.delAll(function() {
								init.makeUpdateOnlyOneRequest(metodoJavascript, versions.lastVersion);	
							});
							
							
						}
						else {
							init.makeUpdateMultiRequest(metodoJavascript);	
						}
						
					
					}
					else {
						console.log("[MODELO NO NECESITA UPDATE]");
						var funcLocal = eval(metodoJavascript);
						funcLocal();
					}
				}
			};
			
			version.getVersions(fValidaLastVersion);
			
		}
		else {
			console.log("[CACHE INICIAL NO-ACTIVADO]");
			var f = eval(metodoJavascript);
			f();
		}

		
	};
	
	
	this.makeUpdateOnlyOneRequest = function(metodoJavascript, lastVersion) {
		console.log("[#### makeUpdateOnlyOneRequest]");
		
		var popup = new MasterPopup();
		popup.bloqPopup("Mensaje",
				"Nuevo modelo encontrado!!, <br/> espere unos minutos mientras se configura la aplicac&oacute;n.<br/><div 'newModelDiv'></div>",
				{"callbackopen": function() {
					var popupInside1 = popup;
					var lastVersion1 = lastVersion;
					
					var init = new AnywhereManager();
					init.getClaseWeb(true, "ipos_client_movil", "ClusterLocal", "get", null, function(data) {
						lastVersion2 = lastVersion1;
						
						if(data == null) {
							popupInside1.alertPopup("Error",
									"No se ha configurado correctamente, por favor ejecute la aplicaci&oacute;n nuevamente", 
									{"funcYes" : function() {  navigator.app.exitApp();  }});
						}
						else {
							var version = new Version();
							version.setThisVersion(lastVersion2);
							

							var popupInside2 = popupInside1;
							var map = new MapSQL("dataSQL");					
							map.del("cluster", function() {
								var popupInside3 = popupInside2;
								var object = JSON.stringify(data);
													
								//console.log(">>> Tring to save Data:");
								//console.log(object);
								map.add("cluster", object , function() {
									popupInside3.closePopup();
									
									if(metodoJavascript != null) {
										var funcLocal = eval(metodoJavascript);
										funcLocal();
									}
								});
							});
						}
						
					});
							 
					
				}});
		
		
		
	};
	
	this.makeUpdateMultiRequest = function(metodoJavascript) {
		console.log("[#### makeUpdateMultiRequest]");
		
		var popup = new MasterPopup();
		popup.bloqPopup("Mensaje",
				"Nuevo modelo encontrado!!, <br/> espere unos minutos mientras se configura la aplicac&oacute;n.<br/><div 'newModelDiv'></div>",
				{"callbackopen": function() {
					var popupInside1 = popup;
					
		 
						var popupInside2 = popupInside1;
						var init = new InitCache();
						var ok = init.regeneraModeloLocal(function() {
							popupInside2.closePopup();
							
							if(metodoJavascript != null) {
								var funcLocal = eval(metodoJavascript);
								funcLocal();
							}
						});
							 
					
				}});
	};
	
	this.verificaUpdate = function(IdCliente,IdVersion) {
		var retValue = "-1";
		try {
			var any = new Anywhere();
			var vUrl = any.getWSAnywhere_context() +"dispatcher?m=getVersionApp&c=Version";
			
			$.ajax({ 
				type: "POST",
				dataType:"json",
				url: vUrl,
				timeout:8000,
				async: false,
				data: { id1 : IdCliente, id2 : IdVersion },
				crossDomain : true,
				success: function(data) {
					if(data.success == true) {
						retValue = data.results[0].url;
					}	
				},
				error: function() {
				}
			});
		}
		catch(e) {
			//console.log(e);
		}
		//alert(retValue);
		return retValue;
	};

	
	this.regeneraModeloLocal = function(metodoJavascript) {
		var version = new Version();
		version.getVersions(function(jsonVersion) {
			version.setThisVersion(jsonVersion.lastVersion, function() {
				var init = new InitCache();
				init.regeneraModeloLocal_fase2(metodoJavascript);
			});
		});
	};
	
	this.regeneraModeloLocal_fase2 = function(metodoJavascript) {
		console.log("regeneraModeloLocal_fase2");
		
		var log = new Logger();
		var popup = new MasterPopup();
		var ok = true;
		var error = "";
		
		try {

			log.log("Cleared SIZE:"+ (1024 * 1024 * 5 - unescape(encodeURIComponent(JSON.stringify(localStorage))).length));
			
			var any = new Anywhere();

			var usuario  = sessionStorage.getItem("usuario");
			var ok = true;
			var init = new AnywhereManager();
			init.clearCache();
			
			var perfilacion = init.getPerfilacion(false);
			log.logFunction("getPerfilacion", [], perfilacion);

			
			var dataClientes = init.getClientes(false);
			log.logFunction("getClientes",[], dataClientes);

			
			if(this.clustered == true) {
				log.log("@@@ clustered ");
			}
			
			if( dataClientes != null) {
				$.each(dataClientes.results, function(k,v) {
					//IPOS
					var dataCadenas =init.ipos_getCadenas(false, v.ID);
					log.logFunction("ipos_getCadenas", [v.ID], dataCadenas );
					
					if( dataCadenas != null ) {

						
						$.each(dataCadenas.results, function(k2,v2) {
							var dataLocales = init.ipos_getLocales(false, v.ID, v2.idcadena);
							log.logFunction("ipos_getLocales", [v.ID, v2.idcadena], dataLocales ); 

							/* SW con clustered*/
							var config = new Config();
							
							if(config.clustered == true) {
								log.log("********************************  CON CLUSTER *********************************"+config.clustered);
								if( dataLocales != null ) {
									$.each(dataLocales.results, function(kLo,vLo) {
											var dataCategorias = init.ipos_getCategorias(false, v.ID);
											log.logFunction("ipos_getCategorias", [v.ID] , dataCategorias ); 										
											
											if( dataCategorias != null ) {
												
												var resultados = dataCategorias.results;
												
												$.each( resultados , function(k22,v22) {
													var pros = init.ipos_getProductos(false, v.ID, vLo.idlocal, v22.IDPARAMETRO);
													log.logFunction("ipos_getProductos", [v.ID, vLo.idlocal, v22.IDPARAMETRO] , pros ); 		
													
												});
											}
									});
								}
							}
							
							
							var promociones = init.ipos_getPromociones(false, v.ID, v2.idcadena);
							log.logFunction("ipos_getPromociones", [v.ID, v2.idcadena] , promociones ); 
 
						});
					}
	
					/* SW sin clustered */
					var config = new Config();
					
					if(config.clustered != true) {
						log.log("@@@@@@@@@@@@@@@@@@@@@@@@@  SIN CLUSTER @@@@@@@@@@@@@@@@@@@@@@@@@@@@@"+config.clustered);
						var dataCategorias = init.ipos_getCategorias(false, v.ID);
						log.logFunction("ipos_getCategorias", [v.ID] , dataCategorias ); 
						
						$.each(dataCategorias.results, function(k22,v22) {
							var pros = init.ipos_getProductos(false, v.ID, -1, v22.IDPARAMETRO);
							log.logFunction("ipos_getProductos", [v.ID, -1, v22.IDPARAMETRO] , pros ); 
						});
					}
					
					//IMARKET
					var dataCompetidor = init.imarket_getCompetidores(false, v.ID);
					log.logFunction("imarket_getCompetidores", [v.ID] , dataCompetidor ); 
					
					$.each(dataCompetidor.results, function(k2,v2) {
						var catCompetidos = init.imarket_getCategoriaCompetidores(false,  v.ID);
						log.logFunction("imarket_getCategoriaCompetidores", [v.ID] , catCompetidos ); 

						$.each(catCompetidos.results, function(k3,v3) {
								var productoCompetidores = init.imarket_getProductosCompetidores(false, v2.id, v3.IDPARAMETRO);
								log.logFunction("imarket_getProductosCompetidores", [v2.id, v3.IDPARAMETRO] , productoCompetidores ); 
								
						});
					});
				});
			
			}
			
			var formularios = init.generator_getListaFormularios(false);
			log.logFunction("generator_getListaFormularios", [] , formularios ); 
		
			
			if(formularios != null) {
				 
				$.each(formularios, function(k,v){	
					 
					var dataFormulario = init.generator_getFormularios(false, v.h[0].value);
					log.logFunction("generator_getFormularios", [v.h[0].value] , dataFormulario ); 
 
				});
			}

			var param = new Parametros();
			param.loadParametros(250,function(dataFormulario) {
				log.logFunction("loadParametros", [250] , dataFormulario ); 
			});
			 
			param.loadParametros(241,function(dataFormulario) {
				log.logFunction("loadParametros", [241] , dataFormulario ); 
			});
			
			ok = true;
		}
		catch(e) {
			error = e;
			ok = false;
			console.log("[InitCache.regeneraModeloLocal.error] "+e);
		}
		finally {
			
		}
		
		if(ok != true) {
			version.setThisVersion("-1");
			var popup = new MasterPopup();
			popup.alertPopup("Error", "Ha ocurrido un error al intentar descargar el modelo actual, por favor int�ntelo nuevamente <br/>" + error+ "<br/>", {"urlYes" :"menu.html" });
		}
		
		log.log("Actual SIZE:"+ (1024 * 1024 * 5 - unescape(encodeURIComponent(JSON.stringify(localStorage))).length));
		log.log("Estado Acci�n:"+ok);
		log.sendToSenver();
		
		if( metodoJavascript != null) {
			var f = eval(metodoJavascript);
			f();
		}
		
		
		return ok;
		 
	};
	
}