/**
 * Cliente , 
 * Cadena, 
 * Local, 
 * Categoria DEL CLIENTE,  
 * Producto DEL CLIENTE
 * 
 * hecha para IPOs
 * Muestran los productos del CLIENTE
 * 
 * 
 * */
function ObjAnyWhereCCL_CP(json) {
	this.num = 0;
	this.json = json;
	
	if(this.json == null || this.json == undefined) {
		this.json = {};
	}
	
	if( this.json.column1 != null && this.json.column1 != undefined ) {
		this.json["theme5.columna1.name"] = this.json.column1;
	}
	
	if( this.json.column2 != null &&  this.json.column2 != undefined ) {
		this.json["theme5.columna2.name"] = this.json.column2;
	}
	
	/*disabled*/
	if( this.json.disabled1 == null && this.json.disabled1 == undefined ) {
		this.json["disabled1"] = "no";
	}
	
	if( this.json.disabled2 == null &&  this.json.disabled2 == undefined ) {
		this.json["disabled2"] = "no";
	}
	
	if( this.json.disabled3 == null &&  this.json.disabled3 == undefined ) {
		this.json["disabled3"] = "no";
	}
	
	if( this.json.disabled11 == null &&  this.json.disabled11 == undefined ) {
		this.json["disabled11"] = "no";
	}
	
	if( this.json.disabled12 == null &&  this.json.disabled12 == undefined ) {
		this.json["disabled12"] = "no";
	}
	
	if( this.json.disabled21 == null &&  this.json.disabled21 == undefined ) {
		this.json["disabled21"] = "no";
	}
	
	/*CACHE*/
	if( this.json.cacheclear != null && this.json.cacheclear != undefined ) {
		if (this.json["cacheclear"] == "yes" ) {
			var map = new MapSQL("cacheTripletaSelector");
			map.clear();	
		}
		
	}
	
	if( this.json.cache1 == null && this.json.cache1 == undefined ) {
		this.json["cache1"] = "no";
	}
	
	if( this.json.cache11 == null &&  this.json.cache11 == undefined ) {
		this.json["cache11"] = "no";
	}
	
	if( this.json.cache12 == null &&  this.json.cache12 == undefined ) {
		this.json["cache12"] = "no";
	}
	
	if( this.json.cache2 == null &&  this.json.cache2 == undefined ) {
		this.json["cache2"] = "no";
	}
	
	if( this.json.cache21 == null &&  this.json.cache21 == undefined ) {
		this.json["cache21"] = "no";
	}
	
	if( this.json.cache3 == null &&  this.json.cache3 == undefined ) {
		this.json["cache3"] = "no";
	}
	
	/*GET CACHE*/
	if( this.json.getCache1 == null && this.json.getCache1 == undefined ) {
		this.json["getCache1"] = "no";
	}
	
	if( this.json.getCache2 == null &&  this.json.getCache2 == undefined ) {
		this.json["getCache2"] = "no";
	}
	
	if( this.json.getCache3 == null &&  this.json.getCache3 == undefined ) {
		this.json["getCache3"] = "no";
	}
	
	if( this.json.getCache11 == null &&  this.json.getCache11 == undefined ) {
		this.json["getCache11"] = "no";
	}
	
	if( this.json.getCache12 == null &&  this.json.getCache12 == undefined ) {
		this.json["getCache12"] = "no";
	}
	
	if( this.json.getCache21 == null &&  this.json.getCache21 == undefined ) {
		this.json["getCache21"] = "no";
	}
	
	/*SE DEPREC�*/
	if( this.json.column1 != null && this.json.column1 != undefined ) {
		this.json["theme5.columna1.name"] = this.json.column1;
	}
	
	if( this.json.column2 != null &&  this.json.column2 != undefined ) {
		this.json["theme5.columna2.name"] = this.json.column2;
	}
	
	if(this.json.column3 == null || this.json.column3 == undefined) {
		this.json["column3"] = "";
	}
	
	if(this.json.column4 == null || this.json.column4 == undefined) {
		this.json["column4"] = "";
	}
	
	if(this.json.style1 == null || this.json.style1 == undefined) {
		this.json["style1"] = "";
	}
	
	if(this.json["theme4"] == null || this.json["theme4"] == undefined) {
		this.json["theme4"] = "combo";
	}
	
	if(this.json["theme5.columna1.name"] == null || this.json["theme5.columna1.name"] == undefined) {
		this.json["column1"] = "PRECIO NORMAL";
	}
	else {
		this.json["column1"] = this.json["theme5.columna1.name"];
	}

	if(this.json["theme5.columna2.name"] == null || this.json["theme5.columna2.name"] == undefined) {
		this.json["column2"] = "PRECIO TARJETA";
	}
	else {
		this.json["column2"] = this.json["theme5.columna2.name"];
	}
	
	if(this.json["theme5.columna3.name"] == null || this.json["theme5.columna3.name"] == undefined) {
		this.json["column3"] = "-";
	}
	else {
		this.json["column3"] = this.json["theme5.columna3.name"];
	}
	
	if(this.json["theme5.columna4.name"] == null || this.json["theme5.columna4.name"] == undefined) {
		this.json["column4"] = "-";
	}
	else {
		this.json["column4"] = this.json["theme5.columna4.name"];
	}
		
	if(this.json["theme5.columna5.name"] == null || this.json["theme5.columna5.name"] == undefined) {
		this.json["column5"] = "-";
	}
	else {
		this.json["column5"] = this.json["theme5.columna5.name"];
	}
	
	if(this.json["theme5.columna1.visibility"] == null || this.json["theme5.columna1.visibility"] == undefined) {
		this.json["theme5.columna1.visibility"] = true;
	}
	
	if(this.json["theme5.columna2.visibility"] == null || this.json["theme5.columna2.visibility"] == undefined) {
		this.json["theme5.columna2.visibility"] = true;
	}
	
	if(this.json["theme5.columna3.visibility"] == null || this.json["theme5.columna3.visibility"] == undefined) {
		this.json["theme5.columna3.visibility"] = false;
	}
	
	if(this.json["theme5.columna4.visibility"] == null || this.json["theme5.columna4.visibility"] == undefined) {
		this.json["theme5.columna4.visibility"] = false;
	}
	
	if(this.json["theme5.columna5.visibility"] == null || this.json["theme5.columna5.visibility"] == undefined) {
		this.json["theme5.columna5.visibility"] = false;
	}
	
	if(this.json["theme5.columna1.type"] == null || this.json["theme5.columna1.type"] == undefined) {
		this.json["theme5.columna1.type"] = "number";
	}
	
	if(this.json["theme5.columna2.type"] == null || this.json["theme5.columna2.type"] == undefined) {
		this.json["theme5.columna2.type"] = "number";
	}
	
	if(this.json["theme5.columna3.type"] == null || this.json["theme5.columna3.type"] == undefined) {
		this.json["theme5.columna3.type"] = "number";
	}
	
	if(this.json["theme5.columna4.type"] == null || this.json["theme5.columna4.type"] == undefined) {
		this.json["theme5.columna4.type"] = "number";
	}
	
	if(this.json["theme5.columna5.type"] == null || this.json["theme5.columna5.type"] == undefined) {
		this.json["theme5.columna5.type"] = "number";
	}
	
	if(this.json.getLabel1 == null || this.json.getLabel1 == undefined) {
		this.json["getLabel1"]  = "Cliente";
	}
	if(this.json.getLabel11 == null || this.json.getLabel11 == undefined) {
		this.json["getLabel11"] = "Cliente11";
	}
	if(this.json.getLabel12 == null || this.json.getLabel12 == undefined) {
		this.json["getLabel12"] = "Cliente12";
	}
	if(this.json.getLabel2== null || this.json.getLabel2 == undefined) {
		this.json["getLabel2"] = "Cadenas";
	}
	if(this.json.getLabel21 == null || this.json.getLabel21 == undefined) {
		this.json["getLabel21"] = "Cadenas21";
	}
	if(this.json.getLabel3 == null || this.json.getLabel3 == undefined) {
		this.json["getLabel3"] = "Locales";
	}
	if(this.json.getLabel4 == null || this.json.getLabel4 == undefined) {
		this.json["getLabel4"] = "Categor&iacute;a";
	}	
	if(this.json.getLabel5 == null || this.json.getLabel5 == undefined) {
		this.json["getLabel5"] = "Producto";
	}
	
	if( this.json["listeners.addProducto"] == null || this.json["listeners.addProducto"] == undefined) {
		this.json["listeners.addProducto"] = (function() { }).toString();
	}
	else {
		this.json["listeners.addProducto"] = (this.json["listeners.addProducto"]).toString();
	}
	
	if( this.json["listeners.endAddProducto"] == null || this.json["listeners.endAddProducto"] == undefined) {
		this.json["listeners.endAddProducto"] = (function() { }).toString();
	}
	else {
		this.json["listeners.endAddProducto"] = (this.json["listeners.endAddProducto"]).toString();
	}
	
	if(this.json["system.cache.producto"] == null || this.json["system.cache.producto"] == undefined) {
		this.json["system.cache.producto"] = false;
	}
	
	if(this.json["system.producto.class"] == null || this.json["system.producto.class"] == undefined) {
		this.json["system.producto.class"] = "";
	}
	
	/*CLASES POR COLUMNA*/
	for(i = 1 ; i<=5; i++) {
		if(this.json["system.producto.columna"+i+".class"] == null || this.json["system.producto.columna"+i+".class"] == undefined) {
			this.json["system.producto.columna"+i+".class"] = "";
		}
	}
	
	
	
	//console.log(this.json);
	
	$.mobile.selectmenu.prototype.options.nativeMenu = false;
	
	this.getHtml = function() {
		this.num= parseInt(Math.random() * 100000);
		
		
		while( $("#divTable_"+this.num).length > 0 ) {
			this.num = parseInt(Math.random() * 100000);
		}
		
		this.setNum(this.num)
		
		var html ="<input type='hidden' name='hiddenJson' id='hiddenJson' value='"+JSON.stringify(this.json)+"'/>";
		
		if(this.json.omit1 != "yes"  ) {
			html+= 	  "<div class='ui-field-contain ui-body ui-br' data-role='fieldcontain' "+this.json.style1+">" +
					  "<label for='selectClientes_"+this.num+"' class='ui-select'>"+this.json.getLabel1+":</label>" +
	                  "<div class='ui-select'>" +
	                   "<select  class='required' name='selectClientes_"+this.num+"' id='selectClientes_"+this.num+"'  onchange=\"(function() { var any = new ObjAnyWhereCCL_CP();  ";
			
		
				html+= " any.onChangeCliente('"+this.num+"'); ";
		 
			
			html+=	  "  } )();\"  >" +
					  "<option value='' selected>Escoger Cliente</option>"+
					  "</select>" +
	                  "</div></div>";
		}
		
		if(this.json.omit11 != "yes"  ) {
			html+= 	  "<div class='ui-field-contain ui-body ui-br' data-role='fieldcontain' "+this.json.style11+">" +
					  "<label for='selectRegiones_"+this.num+"' class='ui-select'>"+this.json.getLabel11+":</label>" +
	                  "<div class='ui-select'>" +
	                   "<select  class='required' name='selectRegiones_"+this.num+"' id='selectRegiones_"+this.num+"'  onchange=\"(function() { var any = new ObjAnyWhereCCL_CP();  ";
			
			
				html += " any.onChangeRegion('"+this.num+"'); ";
	 		 
			 
			html+=	  "    } )();\"  >" +
					  "<option value='' selected>Escoger Regi&oacute;n</option>"+
					  "</select>" +
	                  "</div></div>";
		}
		
		if(this.json.omit12 != "yes"  ) {
			html+= 	  "<div class='ui-field-contain ui-body ui-br' data-role='fieldcontain' "+this.json.style12+">" +
					  "<label for='selectComunas_"+this.num+"' class='ui-select'>"+this.json.getLabel12+":</label>" +
	                  "<div class='ui-select'>" +
	                   "<select  class='required' name='selectComunas_"+this.num+"' id='selectComunas_"+this.num+"'  onchange=\"(function() { var any = new ObjAnyWhereCCL_CP();  ";
			
			
			 
				html += " any.onChangeComuna('"+this.num+"'); ";
	 		 
			
			html+=  "  ";
			html+=	  "   } )();\"  >" +
					  "<option value='' selected>Escoger Comuna</option>"+
					  "</select>" +
	                  "</div></div>";
		}

		if(this.json.omit2 != "yes"  ) {
			html+=    "<div class='ui-field-contain ui-body ui-br' data-role='fieldcontain'>" +
					  "<label for='selectCadenas_"+this.num+"' class='ui-select'>"+this.json.getLabel2+":</label>" +
	                  "<div class='ui-select'>" +
	                  "<select  class='required' name='selectCadenas_"+this.num+"' id='selectCadenas_"+this.num+"'  onchange=\"(function() { var any = new ObjAnyWhereCCL_CP();   ";

            
				html+= " any.onChangeCadena('"+this.num+"'); ";
		   
	         
	        html+=	  "   ";
	        html+=	  "   ";
			html+=    "    } )();\"  >" +
	                  "<option value='' selected>Escoger Cadena</option>"+
					  "</select>" +
	                  "</div></div>";
		}
		
		if(this.json.omit21 != "yes"  ) {
			html+= 	  "<div class='ui-field-contain ui-body ui-br' data-role='fieldcontain' "+this.json.style21+">" +
					  "<label for='selectDistribuidores_"+this.num+"' class='ui-select'>"+this.json.getLabel21+":</label>" +
	                  "<div class='ui-select'>" +
	                   "<select  class='required' name='selectDistribuidores_"+this.num+"' id='selectDistribuidores_"+this.num+"'  onchange=\"(function() { var any = new ObjAnyWhereCCL_CP();  ";
			
	 
			html += " any.onChangeDistribuidor('"+this.num+"'); ";
	 	 
			 
			html+=	  "     } )();\"  >" +
					  "<option value='' selected>Escoger Distribuidor</option>"+
					  "</select>" +
	                  "</div></div>";
		}
        
		if(this.json.omit3 != "yes"  ) {
			html+=    "<div class='ui-field-contain ui-body ui-br' data-role='fieldcontain'>" +
					  "<label for='selectLocales_"+this.num+"' class='ui-select'>"+this.json.getLabel3+":</label>" +
	                  "<div class='ui-select'>" +
	                  "<select  class='required' name='selectLocales_"+this.num+"' id='selectLocales_"+this.num+"' " +
					  "  onchange=\"(function() { var any = new ObjAnyWhereCCL_CP();  ";
			 
			 			html += " any.onChangeLocal('"+this.num+"'); ";
			 		 
 
					  
			html+=	  " } )();\" >" +
					  "<option value='' selected>Escoger Local</option>"+
					  "</select>" +
	                  "</div></div>";
		}
         
		
		if(this.json.omit4 != "yes"  ) {
			
			if(this.json.theme4 == "combo") { 
				   html+=    "<div class='ui-field-contain ui-body ui-br' data-role='fieldcontain'>" +
				   			"<label for='selectCategorias_"+this.num+"' class='ui-select'>"+this.json.getLabel4+":</label>" +
				   			"<div class='ui-select'>" +
				   			"<select  class='required' name='selectCategorias_"+this.num+"' id='selectCategorias_"+this.num+"' " +
				   			" onchange=\"(function() { var any = new ObjAnyWhereCCL_CP(); any.onChangeCategoria('"+this.num+"'); ";
			     
				   
			       html+= "  } )();\" >";
			       html+= "<option value='' selected>Escoger "+this.json.getLabel4+"</option>"+
					      "</select>" +
			              "</div></div>";
			}
			else if( this.json.theme4 == "table" ) {
				 html+= "<div class='ui-field-contain ui-body ui-br' data-role='fieldcontain' id='divCatContainer_"+this.num+"'></div>";
			}
			
			
	       
		}
		
		  
		if(this.json.omit5 != "yes"  && this.json.omit4 != "yes") {
			
			if( this.json.theme4 != "table" )  {
					html += this.getHTMLproductoContainer();
			}
		}
                  
		//this.loadClients(this.num);
		
	
		return html;
	};
	
	this.getJson = function() {
		return JSON.parse($("#hiddenJson").val());
	};
	
	this.setJson = function(paramJson) {
		return this.json = paramJson;
	};
	
	this.setConf = function(numPos) {
		var localJson = JSON.parse($("#hiddenJson").val());
		numPos = this.getNum();
		
		if( localJson["disabled1"] == "yes") {
			console.log("[DESHABILITANDO cliente]");
			$("#selectClientes_"+numPos).selectmenu('disable');	
		}
		
		if( localJson["disabled2"] == "yes") {
			console.log("[DESHABILITANDO cadena]");
			$("#selectCadenas_"+numPos).selectmenu('disable');	
		}

		if( localJson["disabled3"] == "yes") {
			console.log("[DESHABILITANDO local]");
			$("#selectLocales_"+numPos).selectmenu('disable');	
		}
		
		if( localJson["disabled11"] == "yes") {
			console.log("[DESHABILITANDO cliente]");
			$("#selectRegiones_"+numPos).selectmenu('disable');	
		}
		
		if( localJson["disabled12"] == "yes") {
			console.log("[DESHABILITANDO comunas]");
			$("#selectComunas_"+numPos).selectmenu('disable');	
		}
		
		if( localJson["disabled21"] == "yes") {
			console.log("[DESHABILITANDO distribuidores]");
			$("#selectDistribuidores_"+numPos).selectmenu('disable');	
		}
 
	};
	
	
	this.loadClients = function(id) {
			id = this.getNum();
			this.setConf();
			
			console.log("[loading Clientes] "+JSON.stringify({id:id}));
			
			var json = this.getJson();
			
			if( $("#selectClientes_"+id+" option").length == 1 ) {
				var any = new AnywhereManager();
				
				any.getClientes(true, function(data) {
					var cant = 0;
					$.each(data.results, function(k,v) {
						$("#selectClientes_"+id).append("<option value='"+v.ID+"' >"+v.NAME+"</option>");
						cant=cant+1;
					});
					
					var cached = false;
					if( json["getCache1"] == "yes" ) {
						var obj = new ObjAnyWhereCCL_CP();
						console.log("************  getCahe1 ");
						obj.getLastCliente(function(value) {
							if(value != null) {
								 
								console.log("##########  CHANGING CLIENTE TO"+value.data);
								$("#selectClientes_"+id+" option[value="+value.data+"]").prop("selected","selected");
								
							}
							
							$("#selectClientes_"+id).selectmenu('refresh',true);
							$("#selectClientes_"+id).trigger('change');	
						});
					}
					else {
						if(cant==1) {
							console.log("[set cliente=eq(1)]");
							$("#selectClientes_"+id+" option:eq(1)").prop("selected","selected");
							//$("#selectClientes_"+id).trigger('change');
						}
						
						$("#selectClientes_"+id).selectmenu('refresh',true);
						$("#selectClientes_"+id).trigger('change');	
					}

				});
			}
	};
	
	this.loadCadenas = function(numPos) {
		numPos = this.getNum();
		console.log("[loading Cadenas] "+JSON.stringify({id:numPos}))

		 
		var any = new AnywhereManager();
		var json = this.getJson();

		any.ipos_getCadenasTT(true, $("#selectClientes_"+numPos).val(), $("#selectRegiones_"+numPos).val(), $("#selectComunas_"+numPos).val(), function(data) {
			var cant = 0;
			$("#selectCadenas_"+numPos).html("<option value='-1' >Escoger Cadena</option>");
			
			$.each(data.results, function(k,v) {
				$("#selectCadenas_"+numPos).append("<option value='"+v.id+"' >"+v.nombre+"</option>");
				cant=cant+1;
			});
			
			var cached = false;
			if( json["getCache2"] == "yes" ) {
				var obj = new ObjAnyWhereCCL_CP();
				console.log("************  getCahe2 ");
				
				obj.getLastCadena(function(value) {
					if(value != null) {
 
						console.log("##########  CHANGING CADENA TO"+value.data);
						$("#selectCadenas_"+numPos+" option[value="+value.data+"]").prop("selected","selected");
					}
					
					$("#selectCadenas_"+numPos).selectmenu('refresh',true);
					$("#selectCadenas_"+numPos).trigger('change');	
				});
			}
			else {
				if(cant==1) {
					$("#selectCadenas_"+numPos+" option:eq(1)").prop("selected", true);

				}
				
				$("#selectCadenas_"+numPos).selectmenu('refresh',true);
				$("#selectCadenas_"+numPos).trigger('change');
			}
			

		});
		

	};
	
	this.loadLocales = function(numPos) {
		
		numPos = this.getNum();
		console.log("[loading Locales] "+JSON.stringify({id:numPos}))
		
		var any = new AnywhereManager();
		var json = this.getJson();

		any.ipos_getLocalesTT(true, $("#selectClientes_"+numPos).val(),  $("#selectRegiones_"+numPos).val(), $("#selectComunas_"+numPos).val(), $("#selectCadenas_"+numPos).val(),  function(data) {
			var cant = 0;
			$("#selectLocales_"+numPos).html("<option value='-1' >Escoger Local</option>");
			
			$.each(data.results, function(k,v) {
				$("#selectLocales_"+numPos).append("<option value='"+v.id+"' >"+v.nombre+"</option>");
				cant=cant+1;
			});
			
			var cached = false;
			if( json["getCache3"] == "yes" ) {
				console.log("************  getCahe3 ");
				var obj = new ObjAnyWhereCCL_CP();
				
				obj.getLastLocal(function(value) {
					if(value != null) {
						cached = true;
						console.log("##########  CHANGING LOCAL TO"+value.data);
					 
						$("#selectLocales_"+numPos+" option[value="+value.data+"]").prop("selected","selected");
					}
					
					$("#selectLocales_"+numPos).selectmenu('refresh',true);
					$("#selectLocales_"+numPos).trigger('change');	
				});
			}
			else {
				if(cant==1 || !cached) {
					$("#selectLocales_"+numPos+" option:eq(1)").prop("selected", true);
				}
				
				$("#selectLocales_"+numPos).selectmenu('refresh',true);
				$("#selectLocales_"+numPos).trigger('change');	
			}
		});
		

	};
	
	
	this.loadRegiones = function(numPos) {
		numPos = this.getNum();
		var idCliente = $("#selectClientes_"+numPos).val();
		
		console.log("[loading Regiones] "+JSON.stringify({"id": numPos , "idCliente": idCliente}));
		
		var any = new AnywhereManager();
		var json = this.getJson();
		
		
		any.ipos_getRegiones(true, idCliente , function(data) {
			$("#selectRegiones_"+numPos).html("<option value='-1' >Escoger Regi&oacute;n</option>");
			var cant = 0;
			
			$.each(data.results, function(k,v) {
				$("#selectRegiones_"+numPos).append("<option value='"+v.id+"' >"+v.nombre+"</option>");
				cant=cant+1;
			});
			
			var cached = false;
			if( json["getCache11"] == "yes" ) {
				var obj = new ObjAnyWhereCCL_CP();
				
				obj.getLastRegion(function(value) {
					if(value != null) {
						cached = true;
						console.log("##########  CHANGING REGION TO"+value.data);
						$("#selectRegiones_"+numPos+" option[value="+value.data+"]").prop("selected","selected");
						 
					}
					
					$("#selectRegiones_"+numPos).selectmenu('refresh',true);				
					$("#selectRegiones_"+numPos).trigger('change');	
				});
			}
			else {
				if(cant==1) {
					$("#selectRegiones_"+numPos+" option:eq(1)").prop("selected", true);
				}

				$("#selectRegiones_"+numPos).selectmenu('refresh',true);
				$("#selectRegiones_"+numPos).trigger('change');	
			}
			
			
		});
	};
	
	
	
	this.loadComunas = function(numPos) {
		numPos = this.getNum();
		
		console.log("[loading Comunas] "+JSON.stringify({id:numPos}))
		
		var any = new AnywhereManager();
		var json = this.getJson();
		
		any.ipos_getComunas(true, $("#selectClientes_"+numPos).val(), $("#selectRegiones_"+numPos).val(),  function(data) {
			$("#selectComunas_"+numPos).html("<option value='-1' >Escoger Comuna</option>");
			var cant = 0;
			
			$.each(data.results, function(k,v) {
				$("#selectComunas_"+numPos).append("<option value='"+v.id+"' >"+v.nombre+"</option>");
				cant=cant+1;
			});
			
			var cached = false;
			if( json["getCache12"] == "yes" ) {
				var obj = new ObjAnyWhereCCL_CP();
				
				obj.getLastComuna(function(value) {
					if(value != null) {
						cached = true;
						console.log("##########  CHANGING COMUNA TO"+value.data);
						$("#selectComunas_"+numPos+" option[value="+value.data+"]").prop("selected","selected");
					}
					
					$("#selectComunas_"+numPos).selectmenu('refresh',true);
					$("#selectComunas_"+numPos).trigger('change');	
				});
			}
			else {
				if(cant==1) {
					$("#selectComunas_"+numPos+" option:eq(1)").prop("selected", true);
				}
				
				$("#selectComunas_"+numPos).selectmenu('refresh',true);
				$("#selectComunas_"+numPos).trigger('change');	
			}
			
		});
		

	};
	
	this.loadDistribuidores = function(numPos) {
		numPos = this.getNum();
		console.log("[loading Distribuidores] "+JSON.stringify({id:numPos}))
		
		var any = new AnywhereManager();
		var json = this.getJson();
		
		any.ipos_getDistribuidores(true, $("#selectClientes_"+numPos).val(), $("#selectRegiones_"+numPos).val(), $("#selectComunas_"+numPos).val(), $("#selectCadenas_"+numPos).val(),  function(data) {
			$("#selectDistribuidores_"+numPos).html("<option value='-1' >Escoger Distribuidor</option>");
			var cant = 0;
			
			$.each(data.results, function(k,v) {
				$("#selectDistribuidores_"+numPos).append("<option value='"+v.id+"' >"+v.nombre+"</option>");
				cant=cant+1;
			});
			
			var cached = false;
			if( json["getCache21"] == "yes" ) {
				var obj = new ObjAnyWhereCCL_CP();
				console.log("************  getCahe21 ");
				
				obj.getLastDistribuidor(function(value) {
					if(value != null) {
						console.log("##########  CHANGING DISTRIBUIDOR TO"+value.data);
						$("#selectDistribuidores_"+numPos+" option[value="+value.data+"]").prop("selected","selected");
					}
					
					$("#selectDistribuidores_"+numPos).selectmenu('refresh',true);
					$("#selectDistribuidores_"+numPos).trigger('change');	
				});
			}
			else {
				if(cant==1) {
					$("#selectDistribuidores_"+numPos+" option:eq(1)").prop("selected", true);
				}
				
				$("#selectDistribuidores_"+numPos).trigger('change');	
				$("#selectDistribuidores_"+numPos).selectmenu('refresh',true);
			}
			
		});
		

	};
	
	this.loadCategorias = function(numPos) {
			numPos = this.getNum();
			console.log("[loading categorias] "+JSON.stringify({id:numPos}))
 
		
			$("#divCatContainer_"+numPos).html("");
 
			var localJson = JSON.parse($("#hiddenJson").val());
			var catOnly = localJson["categorias.only"];
			
			var any = new AnywhereManager();
			any.ipos_getCategorias(true, $("#selectClientes_"+numPos).val(), function(data) {
						var cant = 0;
						$("#selectCategorias_"+numPos).html("<option value='-1' >Escoger Categoria</option>");
						
						if(localJson.theme4 == "combo") { 
							$.each(data.results, function(k,v) {
								if( catOnly != null ) {
									$.each(catOnly, function(pos, value) {
										if(value == v.IDPARAMETRO) {
											$("#selectCategorias_"+numPos).append("<option value='"+v.IDPARAMETRO+"' >"+v.DESCPARAMETRO+"</option>");
											cant=cant+1;
										}
									});
								}
								else {
									$("#selectCategorias_"+numPos).append("<option value='"+v.IDPARAMETRO+"' >"+v.DESCPARAMETRO+"</option>");
									cant=cant+1;
								}
							});
							
							if(cant==1) {
								$("#selectCategorias_"+numPos+" option:eq(1)").prop("selected", true);
								$("#selectCategorias_"+numPos).trigger('change');
							}
							
							$("#selectCategorias_"+numPos).selectmenu('refresh',true);
						}
						else if( localJson.theme4 == "table" ) {
							console.log("[loadCategorias table]");
							//$("#selectCategorias_"+numPos).html("<option value='-1' >Escoger Categoria</option>");
							
							$("#divCatContainer_"+numPos).append("<ul data-role='listview' name='separador' id='ulCatContainer_"+numPos+"'>");
							
							$.each(data.results, function(k,v) {
								if( catOnly != null ) {
									$.each(catOnly, function(pos, value) {
										if(value == v.IDPARAMETRO) {
											$("#ulCatContainer_"+numPos).append("<li  data-role='list-divider'>"+v.DESCPARAMETRO+"</li>");
											
											var any5 = new ObjAnyWhereCCL_CP(localJson);
											any5.setNumPos(numPos);						
											$("#ulCatContainer_"+numPos).append("<li>"+any5.getHTMLproductoContainer(v.IDPARAMETRO)+"</li>");
										}
									});
								}
								else {
									$("#ulCatContainer_"+numPos).append("<li  data-role='list-divider'>"+v.DESCPARAMETRO+"</li>");
									
									var any5 = new ObjAnyWhereCCL_CP(localJson);
									any5.setNumPos(numPos);						
									$("#ulCatContainer_"+numPos).append("<li>"+any5.getHTMLproductoContainer(v.IDPARAMETRO)+"</li>");
								}
								
								cant=cant+1;
			
								any.ipos_getProductos(true, $("#selectClientes_"+numPos).val(), $("#selectLocales_"+numPos).val(),  v.IDPARAMETRO, function(data) {
									var any2 = new ObjAnyWhereCCL_CP(localJson);
									any2.setNumPos(numPos);
									any2.processProductos(data, v.IDPARAMETRO);
								});
							});
							
							$("#divCatContainer_"+numPos).append("</ul>");
							
							$.each($("ul[name=separador]"), function(k,v) {
								$(v).listview();
							});
						}
					},localJson.idGrupoParam);
		
	};
	
	this.loadProductos = function(numPos) {
		numPos = this.getNum();
		console.log("[loading Productos] "+JSON.stringify({id:numPos}))
 
 		
		var any = new AnywhereManager();
		var localJson = JSON.parse($("#hiddenJson").val());
		
		
		if( localJson.prodFunction == null || localJson.prodFunction == undefined ) {
			
			any.ipos_getProductos(true, $("#selectClientes_"+numPos).val(), $("#selectLocales_"+numPos).val(), $("#selectCategorias_"+numPos).val(),   function(data) {
				var any2 = new ObjAnyWhereCCL_CP(localJson);
				any2.setNumPos(numPos);
				any2.processProductos(data);
			});
		}
		else if( localJson.prodFunction == "activacion" ) {		

			any.ipos_getPromociones(true, $("#selectClientes_"+numPos).val(), $("#selectCadenas_"+numPos).val(), function(data) {
				var any2 = new ObjAnyWhereCCL_CP(localJson);
				any2.setNumPos(numPos);
				any2.processProductos(data);
			});
		}
	};
	
	this.setNumPos = function(numPos) {
		this.num = numPos;
	};
	
	
	this.processProductos = function(data, idCategoria) {
		$(queryProducto+" tbody").html("");
		
		var numPos = this.num;
		var cant = 0;
		var localJson = JSON.parse($("#hiddenJson").val());
		var queryProducto = "#selectProductos_"+numPos;
		
		if(idCategoria != null) {
			queryProducto += idCategoria;
		}
		
		if(localJson.theme5 == "table") { 
			console.log("Process producto 1 - table");
			
			var col1Hidden = "";
			var col2Hidden = "";
			var col3Hidden = "";
			var col4Hidden = "";
			var col5Hidden = "";
			
			if( localJson["theme5.columna1.visibility"] == false) {
				col1Hidden = "display:none;";
			}
			
			if ( localJson["theme5.columna2.visibility"] == false) {
				col2Hidden = "display:none;";
			}
			
			if ( localJson["theme5.columna3.visibility"] == false) {
				col3Hidden = "display:none;";
			}
			
			if ( localJson["theme5.columna4.visibility"] == false) {
				col4Hidden = "display:none;";
			}
			
			if ( localJson["theme5.columna5.visibility"] == false) {
				col5Hidden = "display:none;";
			}
			
			var obj = new ObjAnyWhereCCL_CP(localJson);

			$(queryProducto+" tbody").html("");

			$.each(data.results, function(k,v) {

				var str = "<tr>";
				str+="			<td>"+v.NOMBREPRODUCTO+"</td>";
				str+="			<td style='"+col1Hidden+"'> <input type='hidden' id='id' name='id'  value='"+v.IDPRODUCTO+"' size='1' width='40px' class=''/>";
				str+="    								   "+obj.getColType( 1 , localJson["theme5.columna1.type"] , v.IDPRODUCTO, "pNormal"   , idCategoria)+"</td>";
				str+="			<td style='"+col2Hidden+"'>"+obj.getColType( 2 , localJson["theme5.columna2.type"] , v.IDPRODUCTO, "pTarjeta"  , idCategoria)+"</td>";
				str+="			<td style='"+col3Hidden+"'>"+obj.getColType( 3 , localJson["theme5.columna3.type"] , v.IDPRODUCTO, "pColumna3" , idCategoria)+"</td>";
				str+="			<td style='"+col4Hidden+"'>"+obj.getColType( 4 , localJson["theme5.columna4.type"] , v.IDPRODUCTO, "pColumna4" , idCategoria)+"</td>";
				str+="			<td style='"+col5Hidden+"'>"+obj.getColType( 5 , localJson["theme5.columna5.type"] , v.IDPRODUCTO, "pColumna5" , idCategoria)+"</td>";
				str+="</tr>";
				
				$(queryProducto+" tbody").append(str);
				cant=cant+1;
			});	

			$(queryProducto+" tbody").append("<tr style='height:120px;'><td></td><td></td><td></td><td></td><td></td></tr>");
			
			var f = new Function("("+localJson["listeners.endAddProducto"]+")()");
			f();
			
			$(queryProducto).css({"font-size":"10px"});
			$(".new").textinput();  
			$(".new").css({"font-size":"7px"});
			$(".ui-input-text").css({"width" : "85px"});
		}
		else if(localJson.theme5 == "exists") {
			console.log("Process producto 2- exists");
			console.log(data.results);
			$.each(data.results, function(k,v) {
				var str = "<tr>";
					str+=	"<td>"+v.NOMBREPRODUCTO+"</td>";
					str+=	"<td><input type='hidden' id='id' name='id'  					value='"+v.IDPRODUCTO+"' size='1' width='40px'/>";
					str+=	"    <input type='radio' id='existe'  name='existe"+v.IDPRODUCTO+"' class='new' value='"+v.IDPRODUCTO+"' size='1' width='20px'/></td>";
					str+=	"<td><input type='radio' id='existe'  name='existe"+v.IDPRODUCTO+"' class='new'  value='"+v.IDPRODUCTO+"' size='1' width='20px' /></td>";
					str+=	"<td><input type='radio' id='existe'  name='existe"+v.IDPRODUCTO+"' class='new'  value='"+v.IDPRODUCTO+"' size='1' width='20px' /></td>";
					str+="</tr>";
					
				$(queryProducto+" tbody").append(str);
				cant=cant+1;
			});	
			
			var f = new Function("("+localJson["listeners.endAddProducto"]+")()");
			f();
			
			$(queryProducto).css({"font-size":"10px"});
			//$(".new").checkboxradio("refresh");
			$(".new").css({"font-size":"7px"});
			$(".ui-input-text").css({"width" : "85px"});
		}
		else {
			console.log("Process producto 3 - else"+numPos);
			
			$.each(data.results, function(k,v) {				
				$(queryProducto).append("<option value='"+v.IDPRODUCTO+"' >"+v.NOMBREPRODUCTO+"</option>");
				cant=cant+1;
			});
			
			var f = new Function("("+localJson["listeners.endAddProducto"]+")()");
			f();
			
			console.log("[CANT PRODUCTOS]"+cant);
			if(cant==1) {
				$(queryProducto+" option:eq(1)").prop("selected", true);
				$(queryProducto).trigger('change');
			}
			
			$(queryProducto).selectmenu('refresh',true);
		}
		
		console.log("[END ITERACION POR PRODUCTO]"+cant);
	};
	
	
	this.getColType = function(posicion , tipo, numProducto, idName , idCategoria) {
		var id = "";
		var name="";
		var value = "";
		
		if( tipo == "radiomultiple") {
			id = "row_"+numProducto+"_"+idName;
			name = "row_"+numProducto;
			value = idName;
		}
		else if( tipo == "radio"    || tipo == "radio_defaultChecked" ||
				 tipo == "checkbox" || tipo == "checkbox_defaultChecked" ) {
			id = "row_"+numProducto+"_"+idName;
			name = "row_"+numProducto+"_"+idName;
			value = "1";
		}
		else {
			id = idName+"_"+numProducto;	
		}
		
		var allObjects 		= this.getJson()["system.producto.class"];
		var thisColPosition = this.getJson()["system.producto.columna"+posicion+".class"];
		var concatClass= (allObjects+" "+thisColPosition).trim();
		
		var idCatString = JSON.stringify({"idCategoria" : idCategoria, "idProducto": numProducto});
		if( tipo == "number" ) {
			return "<input type='number' id='"+id+"'  name='"+id+"' class='id_object new "+concatClass+"' value='' size='1' width='20px' lang='"+idCatString+"'/> ";
		}
		else if( tipo == "texto" ) {
			return "<input type='text'   id='"+id+"'  name='"+id+"' class='id_object new "+concatClass+"' value='' size='1' width='20px' lang='"+idCatString+"'/> ";
		}
		else if( tipo == "truefalse" ) {
			var htm = "<select id='"+id+"'  name='"+id+"' 			class='id_object new "+concatClass+"' lang='"+idCatString+"'>";
			htm    += " <option value=''>-</option> ";
			htm    += " <option value='yes'>Si</option> ";
			htm    += " <option value='no' >No</option> ";
			htm    += "</select>";
			
			return htm;
		}
		else if( tipo == "checkbox" ) {
			return "<input type='checkbox' id='"+id+"'  name='"+id+"'  class='id_object "+concatClass+"' lang='"+idCatString+"'/> ";
		}
		else if( tipo == "checkbox_defaultChecked" ) {
			return "<input type='checkbox' id='"+id+"'  name='"+id+"'  class='id_object "+concatClass+"' lang='"+idCatString+"' checked=\"checked\"/> ";
		}
		else if( tipo == "radio") {
			return "<input type='radio' id='"+id+"'  name='"+id+"'  class='id_object "+concatClass+"' lang='"+idCatString+"' value='"+value+"'/> ";
		}
		else if( tipo == "radio_defaultChecked") {
			return "<input type='radio' id='"+id+"'  name='"+id+"'  class='id_object "+concatClass+"' lang='"+idCatString+"' value='"+value+"' checked=\"checked\"/> ";
		}
		else if( tipo == "radiomultiple") {
			return "<input type='radio' id='"+id+"'  name='"+name+"'  class='id_object "+concatClass+"' lang='"+idCatString+"' value='"+value+"' onclick='(function() {  var any = new ObjAnyWhereCCL_CP(); any.checkOrUncheck(\""+id+"\"); } )();'/> ";
		}
		else {
			return "<input type='number' id='"+id+"'    name='"+id+"' class='id_object new "+concatClass+"' value='0' size='1' width='20px' lang='"+idCatString+"'/> ";
		}
		
	};
	
	this.checkOrUncheck = function(radio) {
		console.log( $("#"+radio).attr("title") );
		
//		
//		if( $("#"+radio).attr("checked") == true ) {
//			console.log("Eliminando checked");
//			$("#"+radio).removeAttr("checked");
//		}
//		else {	
//			
//			console.log("Activando checked");
//			$("#"+radio).attr("checked", true);
//
//			
//		}
			
			if(  $("#"+radio).attr("title") != "1" ) {
				 $("#"+radio).attr("title","1");
				 
			}
			else {	
			
				$("#"+radio).removeAttr("checked");
				$("#"+radio).removeAttr("title");
			}
			
			
			 
	};
	
	this.resetCadenas = function(numPos) {
		
		$("#selectCadenas_"+numPos).html("<option value='' selected>Escoger Cadena</option>");
		$("#selectCadenas_"+numPos+" option:eq(1)").prop("selected", true);
		$("#selectCadenas_"+numPos).selectmenu('refresh',true);
	};
	
	this.resetLocales = function(numPos) {
		$("#selectLocales_"+numPos).html("<option value='' selected>Escoger Local</option>");
		$("#selectLocales_"+numPos+" option:eq(1)").prop("selected", true);
		$("#selectLocales_"+numPos).selectmenu('refresh',true);
	};
	
	this.resetCategorias = function(numPos) {
		var a = $("#selectCategorias_"+numPos+" option[value='']").text();
		$("#selectCategorias_"+numPos).html("<option value='' selected>"+a+"</option>");
		$("#selectCategorias_"+numPos+" option:eq(1)").prop("selected", true);
		$("#selectCategorias_"+numPos).selectmenu('refresh',true);
	};
	
	this.resetProductos = function(numPos) {
		if( this.getJson().theme5 == "table" || this.getJson().theme5 == "exists") { 
			console.log("RESET PRODUCTOS 1");
			$("#selectProductos_"+numPos+" tbody").html("");
		}
		else {
			console.log("RESET PRODUCTOS 2");
			$("#selectProductos_"+numPos).html("<option value='' selected>Escoger Producto</option>");
			$("#selectProductos_"+numPos+" option:eq(1)").prop("selected", true);
			$("#selectProductos_"+numPos).selectmenu('refresh',true);
		}
	};
	
	this.getCliente = function() {
		return $("#selectClientes_"+this.num).val();
	};
	
	this.getRegion = function() {
		return $("#selectRegiones_"+this.num).val();
	};
	
	this.getComuna = function() {
		return $("#selectComunas_"+this.num).val();
	};
	
	this.getCadena = function() {
		return $("#selectCadenas_"+this.num).val();
	};
	
	this.getLocal = function() {
		return $("#selectLocales_"+this.num).val();
	};

	this.getCategoria = function() {
		return $("#selectCategorias_"+this.num).val();
	};
	
	this.getProducto = function() {
		return $("#selectProductos_"+this.num).val();
	};
	
	this.getDistribuidor = function() {
		return $("#selectDistribuidores_"+this.num).val();
	};
	
	this.setNum = function(num) {
		if(num != null) {
			if( $("#hiddenNum").length == 0) {
				$("body").append("<input type='hidden' id='hiddenNum' name='hiddenNum' value='"+num+"' />");
			}
			else {
				$("#hiddenNum").val(num);
			}
		}
	}
	
	this.getNum = function() {
		var localNum = 0;
		
		if( $("#hiddenNum").length > 0) {
			localNum =  $("#hiddenNum").val();
		}
			
	    console.log("[num:"+localNum+"]");
	    return localNum;
	}
	
	this.onChangeCliente = function(num) {
		var val = $("#selectClientes_"+num).val();
		console.log("[onChangeCliente]"+val);
		if(val == -1) return;
		
		var localJson = JSON.parse($("#hiddenJson").val());
 		
		if( localJson["cache1"] == "yes" ) {
			var map = new MapSQL("cacheTripletaSelector");
			map.del("selectedCliente", function() {
				console.log("adding cliente->"+val);
				var map2 = new MapSQL("cacheTripletaSelector");
				map2.add("selectedCliente", val );	
				
				var any = new ObjAnyWhereCCL_CP();
				any.loadRegiones(); 
			});
		
		} else {
			var any = new ObjAnyWhereCCL_CP();
			any.loadRegiones(); 
		}

	};
	
	this.getLastCliente = function(funcGetData) {
		var map = new MapSQL("cacheTripletaSelector");
		map.get("selectedCliente", funcGetData);
	};
	
	this.onChangeCadena = function(num) {
		var val = $("#selectCadenas_"+num).val();
		console.log("[onChangeCadena]"+val);
		if(val == -1) return;
		
		var localJson = JSON.parse($("#hiddenJson").val());
		
		if( localJson["cache2"] == "yes" ) {
			var map = new MapSQL("cacheTripletaSelector");
			console.log("CAMBI� CADENA TO--->"+val);
			
			map.del("selectedCadena", function() {
				console.log("adding cadena->"+val);
				var map2 = new MapSQL("cacheTripletaSelector");
				map2.add("selectedCadena", val);
				
				var localJson = JSON.parse($("#hiddenJson").val());
				var any = new ObjAnyWhereCCL_CP();
				any.loadLocales();
				
				if( localJson["omit21"] != "yes") {
					any.loadDistribuidores();
				}
				
				
				if( localJson["omit4"] != "yes") {
					any.loadCategorias();
				}

			});
		}
		else {
			var any = new ObjAnyWhereCCL_CP();
			any.loadLocales();
			
			if( localJson["omit21"] != "yes") {
				any.loadDistribuidores();
			}
			
			if( localJson["omit4"] != "yes") {
				any.loadCategorias();
			}
		}
	};
	
	/*ON CHANGE REGION*/
	this.getLastRegion = function(funcGetData) {
		var map = new MapSQL("cacheTripletaSelector");
		map.get("selectedRegion", funcGetData);
	};
	
	this.onChangeRegion = function(num) {
		var val = $("#selectRegiones_"+num).val();
		console.log("[onChangeRegion]"+val);
		if(val == -1) return;
		
		var localJson = JSON.parse($("#hiddenJson").val());
		
		if( localJson["cache11"] == "yes" ) {
			var map = new MapSQL("cacheTripletaSelector");
			 
			map.del("selectedRegion", function() {
				console.log("adding Region->"+val);
				var map2 = new MapSQL("cacheTripletaSelector");
				map2.add("selectedRegion", val);
				
				var any = new ObjAnyWhereCCL_CP();
				any.loadComunas(); 
			});
		}
		else {
			var any = new ObjAnyWhereCCL_CP();
			any.loadComunas(); 
		}
		
		
	};
	
	/*ON CHANGE COMUNA*/
	this.getLastComuna = function(funcGetData) {
		var map = new MapSQL("cacheTripletaSelector");
		map.get("selectedComuna", funcGetData);
	};
	
	this.onChangeComuna = function(num) {
		var val = $("#selectComunas_"+num).val();
		console.log("[onChangeComuna]"+val);
		if(val == -1) return;
		
		var localJson = JSON.parse($("#hiddenJson").val());
		
		if( localJson["cache12"] == "yes" ) {
			
			var map = new MapSQL("cacheTripletaSelector");
			console.log("CAMBIO COMUNA TO--->"+val);
			
			map.del("selectedComuna", function() {
				console.log("adding comuna->"+val);
				var map2 = new MapSQL("cacheTripletaSelector");
				map2.add("selectedComuna", val);
				
				var any = new ObjAnyWhereCCL_CP();
				any.loadCadenas();
			});
		}
		else {
			var any = new ObjAnyWhereCCL_CP();
			any.loadCadenas();
		}
		
		
	};
	
	/*ON CHANGE DISTRIBUIDOR*/
	this.getLastDistribuidor = function(funcGetData) {
		var map = new MapSQL("cacheTripletaSelector");
		map.get("selectedDistribuidor", funcGetData);
	};
	
	this.onChangeDistribuidor = function(num) {
		var val = $("#selectDistribuidores_"+num).val();
		console.log("[onChangeDistribuidor]"+val);
		if(val == -1) return;
		
		if( localJson["cache3"] == "yes" ) {
			var map = new MapSQL("cacheTripletaSelector");
			console.log("CAMBI� DISTRIBUIDOR TO--->"+val);
			
			map.del("selectedDistribuidor", function() {
				console.log("adding distribuidor->"+val);
				var map2 = new MapSQL("cacheTripletaSelector");
				map2.add("selectedDistribuidor", val);
			});
		}
		

		
	};
	
	this.getLastCadena = function(funcGetData) {
		var map = new MapSQL("cacheTripletaSelector");
		map.get("selectedCadena", funcGetData);
	};
	
	this.onChangeLocal = function(num) {
		var val = $("#selectLocales_"+num).val();
		console.log("[onChangeLocal]"+val);
		if(val == -1) return;
		
		var localJson = JSON.parse($("#hiddenJson").val());
		
		if( localJson["cache3"] == "yes" ) {
			var map = new MapSQL("cacheTripletaSelector");
			console.log("CAMBIÓ LOCAL TO--->"+val);
			
			map.del("selectedLocal", function() {
				console.log("adding local->"+val);
				var map2 = new MapSQL("cacheTripletaSelector");
				map2.add("selectedLocal", val);
				
				
			});
		}
 
		
	};
	
	this.getLastLocal = function(funcGetData) {
		
		var map = new MapSQL("cacheTripletaSelector");
		map.get("selectedLocal", funcGetData);
	}; 
	
	this.onChangeCategoria = function(num) {
		var val = $("#selectCategorias_"+num).val();
		console.log("[onChangeCategoria]"+val);
		if(val == -1) return;
		var localJson = JSON.parse($("#hiddenJson").val());
		
		if( localJson["cache3"] == "yes" ) {
			var map = new MapSQL("cacheTripletaSelector");
			console.log("CAMBIÓ CATEGORÍA TO--->"+val);
			
			map.del("selectedCategoria", function() {
				console.log("adding categoría->"+val);
				var map2 = new MapSQL("cacheTripletaSelector");
				map2.add("selectedCategoria", val);
				
				var localJson = JSON.parse($("#hiddenJson").val());
				if( localJson["omit4"] != "yes") {
					var any = new ObjAnyWhereCCL_CP();
					any.loadProductos();
				}

			});
		}
		else {
		 
			if( localJson["omit4"] != "yes") {
				var any = new ObjAnyWhereCCL_CP();
				any.loadProductos();
			}

		}
		
	};
	
	this.getLastCategoria = function(funcGetData) {
		var map = new MapSQL("cacheTripletaSelector");
		map.get("selectedCategoria", funcGetData);
	}; 
	
	this.getHTMLproductoContainer = function(idCategoria) {
		var htmlLocal = "";
		if(idCategoria == null) {
			idCategoria="";
		}
		
		if(this.json.theme5 == null || this.json.theme5 == "list") {
			 htmlLocal+=    "<div class='ui-field-contain ui-body ui-br' data-role='fieldcontain'>" +
					  		"<label for='selectProductos_"+this.num+""+idCategoria+"' class='ui-select'>"+this.json.getLabel5+":</label>" +
					  		"<div class='ui-select'>" +
					  		"<select  class='required' name='selectProductos_"+this.num+""+idCategoria+"' id='selectProductos_"+this.num+""+idCategoria+"'   >" +
					  		"<option value='' selected>Escoger Producto</option>"+
					  		"</select>" +
					  		"</div></div>";
		}
		else if( this.json.theme5 == "table" || this.json.theme5 == "exists") {
			 htmlLocal+=   "<div class='ui-field-contain ui-body ui-br' data-role='fieldcontain'>";
			 
			 if(this.json.msg != null) {
				 htmlLocal+=" <div data-role='fieldcontain'> "+this.json.msg+" </div>";
			 }
			 
			 htmlLocal+="<label for='selectProductos_"+this.num+""+idCategoria+"' class='ui-select'>Producto:</label>" +
					  "<table name='selectProductos_"+this.num+""+idCategoria+"' id='selectProductos_"+this.num+""+idCategoria+"'>" +
					  "<thead>" +
					    "<tr>";
			 
			 if( this.json.theme5 == "table") {
				
				var col1Hidden = "";
				var col2Hidden = "";
				var col3Hidden = "";
				var col4Hidden = "";
				var col5Hidden = "";
				
				if( this.json["theme5.columna1.visibility"] == false) {
					col1Hidden = "display:none;";
				}
				
				if ( this.json["theme5.columna2.visibility"] == false) {
					col2Hidden = "display:none;";
				}
				
				if ( this.json["theme5.columna3.visibility"] == false) {
					col3Hidden = "display:none;";
				}
				
				if ( this.json["theme5.columna4.visibility"] == false) {
					col4Hidden = "display:none;";
				}
				
				if ( this.json["theme5.columna5.visibility"] == false) {
					col5Hidden = "display:none;";
				}
				
				console.log("@@@@  COLUMN 4");
				console.log(this.json.column4);
				
				htmlLocal+="<th>Producto</th>";
				htmlLocal+="<th style='width=50px;"+col1Hidden+"' data-priority='1'>"+this.json.column1+"</th>";
				htmlLocal+="<th style='width=50px;"+col2Hidden+"' data-priority='2'>"+this.json.column2+"</th>";
				htmlLocal+="<th style='width=50px;"+col3Hidden+"' data-priority='3'>"+this.json.column3+"</th>";
				htmlLocal+="<th style='width=50px;"+col4Hidden+"' data-priority='4'>"+this.json.column4+"</th>";
				htmlLocal+="<th style='width=50px;"+col5Hidden+"' data-priority='5'>"+this.json.column5+"</th>";
					
			 }
			
			 if ( this.json.theme5 == "exists" ) {
				 html+="<th  >Producto</th>" +
				       "<th style='width=50px' data-priority='1'>"+this.json.column1+"</th>" +
				       "<th style='width=50px' data-priority='2'>"+this.json.column2+"</th>"+
					   "<th style='width=50px' data-priority='3'>"+this.json.column3+"</th>";
			 }
				
			 htmlLocal += "</tr>"+
					  "</thead>" +
					  "<tbody>" +
					  "</tbody>" +
					  "</table>" +
	                  "</div></div>";
		}
		
		return htmlLocal;
	};
}
