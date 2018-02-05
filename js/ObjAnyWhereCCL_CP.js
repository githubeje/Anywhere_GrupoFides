/**
 * Cliente , 
 * Cadena, 
 * Local, 
 * Categoria DEL CLIENTE,  
 * Producto DEL CLIENTE
 * 
 * hecha para IPOs
 * Muestran los productos del CLIENTE
 * V 20150817  Cluste MAPSQL
 * 
 * */


function ValorMoreLess(tipo,id) {
		if(tipo == "more") {
			valor = document.querySelector('#' + id).value;
			document.querySelector('#' + id).value = Number(valor)+1;
		}
		else if(tipo == "less") {
			valor = document.querySelector('#' + id).value;
			document.querySelector('#' + id).value = Number(valor)-1;
		}
}

function ObjAnyWhereCCL_CP(paramJSON) {
	this.num = 0;
	this.json = paramJSON;

	
	this.initNormal = function(json) {
			
			
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
			
			if( this.json.cache2 == null &&  this.json.cache2 == undefined ) {
				this.json["cache2"] = "no";
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
			
			/*COLUMNA DATA*/
			if(this.json["theme5.columna1.data"] == null || this.json["theme5.columna1.data"] == undefined) {  	this.json["theme5.columna1.data"] = []; }
			if(this.json["theme5.columna2.data"] == null || this.json["theme5.columna2.data"] == undefined) {	this.json["theme5.columna2.data"] = []; }
			if(this.json["theme5.columna3.data"] == null || this.json["theme5.columna3.data"] == undefined) {	this.json["theme5.columna3.data"] = []; }
			if(this.json["theme5.columna4.data"] == null || this.json["theme5.columna4.data"] == undefined) {	this.json["theme5.columna4.data"] = []; }
			if(this.json["theme5.columna5.data"] == null || this.json["theme5.columna5.data"] == undefined) {	this.json["theme5.columna5.data"] = [];	}

			
			if(this.json["theme5.columna0.name"] == null || this.json["theme5.columna0.name"] == undefined) {
				this.json["column0"] = "Producto";
			}
			else {
				this.json["column0"] = this.json["theme5.columna0.name"];
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
				this.json["getLabel1"] = "Cliente";
			}
			if(this.json.getLabel2== null || this.json.getLabel2 == undefined) {
				this.json["getLabel2"] = "Cadenas";
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
			

			$.mobile.selectmenu.prototype.options.nativeMenu = false;
			
				};
	
	this.getHtml = function() {
		/*this.num= parseInt(Math.random() * 100000);*/
		this.num=1000;
		 
		this.setNum(this.num)
		
		var html ="<input type='hidden' name='hiddenJson'    id='hiddenJson'    value='"+JSON.stringify(this.json)+"'/>";
		 
 
		if(this.json.omit1 != "yes"  ) {
			html+= 	  "<div class='ui-field-contain ui-body ui-br' data-role='fieldcontain' "+this.json.style1+">" +
					"<label for='selectClientes_"+this.num+"' class='ui-select'>"+this.json.getLabel1+":</label>" +
	                 		"<div class='ui-select'>" +
						"<select eje-type='number' class='required' name='selectClientes_"+this.num+"' id='selectClientes_"+this.num+"'  " +
							"onchange=\"(function() { ";
							if( this.json["cache1"] == "yes" ) {
	      							html+= " any.onChangeCadena('"+this.num+"'); ";
	      			  			}
							html+= "var any = new ObjAnyWhereCCL_CP(); " +
							"any.loadCadenas('"+this.num+"'); " +
							"})();\"  >" +
							"<option value='' selected>Escoger Cliente</option>" +
						"</select>" +
	                  		"</div>" +
				  "</div>";
				
		}
        
		if(this.json.omit2 != "yes"  ) {
			html+=    "<div class='ui-field-contain ui-body ui-br' data-role='fieldcontain'>" +
					  "<label for='selectCadenas_"+this.num+"' class='ui-select'>"+this.json.getLabel2+":</label>" +
	                  "<div class='ui-select'>" +
	                  "<select  eje-type='number' class='required' name='selectCadenas_"+this.num+"' id='selectCadenas_"+this.num+"'  onchange=\"(function() { var any = new ObjAnyWhereCCL_CP();   ";
					 
	                  if( this.json["cache2"] == "yes" ) {
	      					html+= " any.onChangeCadena('"+this.num+"'); ";
	      			  }
	                  
			html+=    "  any.loadLocales('"+this.num+"');  } )();\"  >" +
	                  "<option value='' selected>Escoger Cadena</option>"+
					  "</select>" +
	                  "</div></div>";
		}
        
		if(this.json.omit3 != "yes"  ) {
			html+=    "<div class='ui-field-contain ui-body ui-br' data-role='fieldcontain'>" +
					  "<label for='selectLocales_"+this.num+"' class='ui-select'>"+this.json.getLabel3+":</label>" +
	                  "<div class='ui-select'>" +
	                  "<select  eje-type='number'  class='required' name='selectLocales_"+this.num+"' id='selectLocales_"+this.num+"' " +
					  "  onchange=\"(function() { var any = new ObjAnyWhereCCL_CP();  ";
			
			 		  if( this.json["cache3"] == "yes" ) {
			 			  	html += " any.onChangeLocal('"+this.num+"'); ";
			 		  }
					  
					  if( this.json.omit4 != "yes") {
						  html += "  any.loadCategorias('"+this.num+"'); ";
					  }
					  
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
				   			"<select  eje-type='number' class='required' name='selectCategorias_"+this.num+"' id='selectCategorias_"+this.num+"' " +
				   			" onchange=\"(function() { var any = new ObjAnyWhereCCL_CP(); ";
				   
				   
				   if( this.json["cache4"] == "yes" ) {
					   html += " any.onChangeCategoria('"+this.num+"'); ";
				   }

			     
				   if(this.json.omit5 != "yes") {
			       		html+=   " any.loadProductos('"+this.num+"'); ";
			       }
			
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
	
	this.setConf = function(numPos) {
		var localJson = JSON.parse($("#hiddenJson").val());
		numPos = this.getNum();
		
		if( localJson["disabled1"] == "yes") {
			//console.log("[DESHABILITANDO cliente]");
			$("#selectClientes_"+numPos).selectmenu('disable');	
		}
		
		if( localJson["disabled2"] == "yes") {
			//console.log("[DESHABILITANDO cadena]");
			$("#selectCadenas_"+numPos).selectmenu('disable');	
		}

		if( localJson["disabled3"] == "yes") {
			//console.log("[DESHABILITANDO local]");
			$("#selectLocales_"+numPos).selectmenu('disable');	
		}
		
		if( localJson["disabled11"] == "yes") {
			//console.log("[DESHABILITANDO cliente]");
			$("#selectRegiones_"+numPos).selectmenu('disable');	
		}
		
		if( localJson["disabled12"] == "yes") {
			//console.log("[DESHABILITANDO comunas]");
			$("#selectComunas_"+numPos).selectmenu('disable');	
		}
		
		if( localJson["disabled21"] == "yes") {
			//console.log("[DESHABILITANDO distribuidores]");
			$("#selectDistribuidores_"+numPos).selectmenu('disable');	
		}
		
	};
	
	this.getJson = function() {
		return JSON.parse($("#hiddenJson").val());
	};
	
	this.setJson = function(paramJson) {
		return this.json = paramJson;
	};
	
	this.loadClients = function(id) {	
			 id = this.num;
			 this.setConf();
		 
			
			var json = this.getJson();
						
			if( $("#selectClientes_"+id+" option").length == 1 ) {
				if( json["disabled1"] == "yes") {
					$("#selectClientes_"+id).selectmenu('disable');	
				}
				
				
				var any = new AnywhereManager();
				var map = new MapSQL("dataSQL");					
				map.get("cluster", function(valor) {
					
					var cp = new ObjAnyWhereCCL_CP();
					var vaalorJson = cp.parsea(valor.data);
 					var cant = 0;
					var cached = false;
					
					 
					
					$.each(vaalorJson.clientes , function(k,v) {
						/*
						for(var i = 0; i< v.cadenas.length; i++) {
							delete v.cadenas[i].locales;
						}
						*/
							
						var strCadenas = JSON.stringify(v.cadenas);
						
						map.add("cliente_"+v.id, strCadenas, function() {
							$("#selectClientes_"+id).append("<option value='"+v.id+"' >"+v.name+"</option>");	
						});
						
						cant=cant+1;
					});
					
					
					if(cant==1 && json["getCache1"] != "yes"  ) {
						//console.log("##########  CLIENTE CON 1 OBJETO Y SIN OBTENCION DE CACHE ");
						$("#selectClientes_"+id+" option:eq(1)").prop("selected",true);
						//$("#selectClientes_"+id).trigger('change');
						
						$("#selectClientes_"+id).selectmenu('refresh',true);
						$("#selectClientes_"+id).trigger('change');	
					}
					else {
						if( json["getCache1"] == "yes" ) {
							//console.log("##########  CLIENTE CON MAS DE 1 OBJETO Y CON OBTENCION DE CACHE ");
							var obj = new ObjAnyWhereCCL_CP();
							
							obj.getLastCliente(function(value) {
								//console.log("##########  CHANGING CLIENTE TO "+value.data+"]");
								 
								if(value != null) {
									cached = true;
									//console.log("##########  END CHANGING CLIENTE TO "+value.data+"]");
									$("#selectClientes_"+id+" option[value="+value.data+"]").prop("selected","selected");
									
									if(json["getCache2"] == "yes"  && false) {
										var obj = new ObjAnyWhereCCL_CP();
										obj.loadCadenas(id);	
									}
									
								}
								
								
								$("#selectClientes_"+id).selectmenu('refresh',true);
								$("#selectClientes_"+id).trigger('change');	
							});
						}
						else {
							$("#selectClientes_"+id).selectmenu('refresh',true);
							$("#selectClientes_"+id).trigger('change');	
						}
					}
				});
				

			}
	};
	
	this.loadCadenas = function(numPos) {
		this.resetCadenas(numPos);
		this.resetLocales(numPos);
		this.resetCategorias(numPos);
		this.resetProductos(numPos);

		if(numPos==null) {
			numPos = this.num;
		}

		var any = new AnywhereManager();
		var json = this.getJson();
 
		var idCliente = $("#selectClientes_"+numPos+" option:selected").val();
		var strCadenas = null;
		
		var map = new MapSQL("dataSQL");
		map.get("cliente_"+idCliente, function(value) {
			strCadenas = value.data;
		});
 
		if( strCadenas == null || strCadenas == undefined) {
			return;
		}

		var jsonCadenas = this.parsea(strCadenas);

		var cant = 0;
		var cached = false;
		
		if( json["disabled2"] == "yes") {
			$("#selectCadenas_"+numPos).selectmenu('disable');	
		}
		
		var cant = 0;
		$.each(jsonCadenas , function(k,v) {
			map.add("cadena_"+v.idcadena, JSON.stringify(v.locales), function() {
				$("#selectCadenas_"+numPos).append("<option value='"+v.idcadena+"' >"+v.nemo+"</option>");
				cant=cant+1;
			});
		});
	 
		var cached = false;
		
		
		if(cant==1 && json["getCache2"] != "yes") {
			//console.log("##########  CADENA CON 1 OBJETO Y SIN OBTENCION DE CACHE ");
			
			$("#selectCadenas_"+numPos+" option:eq(1)").prop("selected", true);
			$("#selectCadenas_"+numPos).selectmenu('refresh',true);
			$("#selectCadenas_"+numPos).trigger('change');
			


		}
		else {
			//console.log("##########  CADENA CON MAS DE 1 OBJETO Y CON OBTENCION DE CACHE ");
			if( json["getCache2"] == "yes" ) {
				var obj = new ObjAnyWhereCCL_CP();
				
				obj.getLastCadena(function(value) {
					//console.log("##########  CHANGING CADENA TO"+value.data);
					
					 if(value != null) {
						cached = true;
						//console.log("##########  END CHANGING CADENA TO "+value.data+"]");
						$("#selectCadenas_"+numPos+" option[value="+value.data+"]").prop("selected","selected");
						
						if(json["getCache3"] == "yes"  && false) { 
							var obj = new ObjAnyWhereCCL_CP();
							obj.loadLocales(numPos);	
						}
						
					}
					  
					$("#selectCadenas_"+numPos).selectmenu('refresh',true);
					$("#selectCadenas_"+numPos).trigger('change');	
				});
			}
			else {
				$("#selectCadenas_"+numPos).selectmenu('refresh',true);
				$("#selectCadenas_"+numPos).trigger('change');	
			}
		}

		 

	};
	
	this.loadLocales = function(numPos) {
		this.resetLocales(numPos);
		this.resetCategorias(numPos);
		this.resetProductos(numPos);
		
		var any = new AnywhereManager();
		var json = this.getJson();
		
		var idCadena = $("#selectCadenas_"+numPos+" option:selected").val();
		//console.log("idCadena:"+idCadena);
		
		var strLocales = null; 
		
		var map = new MapSQL("dataSQL");
		map.get("cadena_"+idCadena, function(value) {
			strLocales = value.data;
		});
		
		if( strLocales == null || strLocales == undefined) {
			return;
		}
		
		var jsonLocales = this.parsea(strLocales);
		var cant = 0;
		var cached = false;
		
		if( json["disabled3"] == "yes") {
			$("#selectLocales_"+numPos).selectmenu('disable');	
		}
 
		$.each(jsonLocales , function(k,v) {
			map.add("local_"+v.idlocal, JSON.stringify(v.categorias), function() {
				$("#selectLocales_"+numPos).append("<option value='"+v.idlocal+"' >"+v.nombre+"</option>");
				cant=cant+1;
			});
		});
		
		if(cant==1 && json["getCache3"] != "yes") {
			//console.log("##########  LOCALES CON 1 OBJETO Y SIN OBTENCION DE CACHE ");
			
			$("#selectLocales_"+numPos+" option:eq(1)").prop("selected", true);
			$("#selectLocales_"+numPos).trigger('change');	
			$("#selectLocales_"+numPos).selectmenu('refresh',true);
		}
		else {
			if( json["getCache3"] == "yes" ) {
				//console.log("##########  LOCALES CON MAS DE 1 OBJETO Y CON OBTENCION DE CACHE ");
				
				var obj = new ObjAnyWhereCCL_CP();
				
				obj.getLastLocal(function(value) {
					//console.log("##########  CHANGING LOCALES TO "+value.data);
					
					if(value != null) {
						cached = true; 
						//console.log("##########  END CHANGING LOCALES TO "+value.data+"]");
						$("#selectLocales_"+numPos+" option[value="+value.data+"]").prop("selected","selected");
						
						if(json["getCache4"] == "yes") {
							var obj = new ObjAnyWhereCCL_CP();
							obj.loadCategorias(numPos);	
						}
					}
					
					$("#selectLocales_"+numPos).selectmenu('refresh',true);
					$("#selectLocales_"+numPos).trigger('change');	
				});
			}
			else {
				$("#selectLocales_"+numPos).selectmenu('refresh',true);
				$("#selectLocales_"+numPos).trigger('change');	
			}
		}

	};
	
	this.loadCategorias = function(numPos) {
			$("#divCatContainer_"+numPos).html("");
			
			this.resetCategorias(numPos);
			this.resetProductos(numPos);
			var localJson = JSON.parse($("#hiddenJson").val());
			var catOnly = localJson["categorias.only"];
			
			var idLocal = $("#selectLocales_"+numPos+" option:selected").val();
			var strCategorias = null;
			var map = new MapSQL("dataSQL");
			map.get("local_"+idLocal, function(value) {
				strCategorias = value.data;
			});
			
			if( strCategorias == null || strCategorias == undefined) {
				return;
			}
			
			var jsonCategorias = this.parsea(strCategorias);
			var cant = 0;
			var cached = false;
			
		  
			if(localJson.theme4 == "combo") { 
				$.each(jsonCategorias , function(k,v) {
					var map = new MapSQL("dataSQL");
					map.add("categoria_"+v.idparametro, JSON.stringify(v.productos), function() {
						if( catOnly != null ) {
							$.each(catOnly, function(pos, value) {
								if(value == v.idparametro) {
									$("#selectCategorias_"+numPos).append("<option value='"+v.idparametro+"' >"+v.descparametro+"</option>");
									cant=cant+1;
								}
							});
						}
						else {
							$("#selectCategorias_"+numPos).append("<option value='"+v.idparametro+"' lang='"+JSON.stringify(v.productos)+"'>"+v.descparametro+"</option>");
							cant=cant+1;
						}
					});	
				});
				
				if(cant==1) {
					$("#selectCategorias_"+numPos+" option:eq(1)").prop("selected", true);
					
				}
				
				$("#selectCategorias_"+numPos).selectmenu('refresh',true);
				$("#selectCategorias_"+numPos).trigger('change');
				
			}
			else if( localJson.theme4 == "table" ) {
				$("#divCatContainer_"+numPos).append("<ul data-role='listview' name='separador' id='ulCatContainer_"+numPos+"'>");
				
				$.each(jsonCategorias , function(k,v) {
					var map = new MapSQL("dataSQL");
					map.add("categoria_"+v.idparametro, JSON.stringify(v.productos), function() {
						if( catOnly != null ) {
							$.each(catOnly, function(pos, value) {
								if(value == v.idparametro) {
									$("#ulCatContainer_"+numPos).append("<li  data-role='list-divider'>"+v.descparametro+"</li>");
									
									var any5 = new ObjAnyWhereCCL_CP(localJson);
									any5.setNumPos(numPos);						
									$("#ulCatContainer_"+numPos).append("<li>"+any5.getHTMLproductoContainer(v.idparametro)+"</li>");
								}
							});
						}
						else {
							$("#ulCatContainer_"+numPos).append("<li  data-role='list-divider'>"+v.descparametro+"</li>");
							
							var any5 = new ObjAnyWhereCCL_CP(localJson);
							any5.setNumPos(numPos);						
							$("#ulCatContainer_"+numPos).append("<li>"+any5.getHTMLproductoContainer(v.idparametro)+"</li>");
						}

						var any2 = new ObjAnyWhereCCL_CP(localJson);
						any2.setNumPos(numPos);
						/*RARO*/
						any2.processProductos(v.productos, v.idparametro);
					});
				});
				
				$("#divCatContainer_"+numPos).append("</ul>");
				
				$.each($("ul[name=separador]"), function(k,v) {
					$(v).listview();
				});
			}
					 
	};
	
	this.loadProductos = function(numPos) {
		this.resetProductos(numPos);		
		var any = new AnywhereManager();
		var localJson = JSON.parse($("#hiddenJson").val());
		
		var idCategoria = $("#selectCategorias_"+numPos+" option:selected").val();
		var strProductos = null;
		var map = new MapSQL("dataSQL");
		map.get("categoria_"+idCategoria, function(value) {
			strProductos = value.data;
		});
		
		if( strProductos == null || strProductos == undefined) {
			//console.log("Error, Sin Categoría obtenible.");
			return;
		}
		
		var jsonProductos = this.parsea(strProductos);
 
		this.processProductos(jsonProductos);
		 
	};
	
	this.setNumPos = function(numPos) {
		this.num = numPos;
	};
	
	
	this.processProductos = function(data, idCategoria) {
		$(queryProducto+" tbody").html("");
		
		var numPos = this.getNum();
		var cant = 0;
		var localJson = JSON.parse($("#hiddenJson").val());
		var queryProducto = "#selectProductos_"+numPos;
		
		if(idCategoria != null) {
			queryProducto += idCategoria;
		}
		
		if(localJson.theme5 == "table") { 
			//console.log("Process producto 1 - table");
			
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

			
			//console.log("bef - each-->");
			$.each(data, function(k,v) {
				console.log(v);
				var str = "<tr>";
				str+="			<th align='left'>"+v.nombreproducto;
				str+="				<input type='hidden' name='gato_id_producto' 	id='gato_row_"+v.idproducto+"_id_producto'	value='"+v.idproducto+"'/>";
				str+="				<input type='hidden' name='gato_producto_desc' 	id='gato_row_"+v.idproducto+"_producto'		value='"+v.nombreproducto+"' />";			
				str+="			</th>";
				if(col1Hidden != "display:none;") {
					str+="			<td>";//+localJson["column1"];
					str+="				 <input type='hidden' id='id' name='id'  value='"+v.idproducto+"' size='1' width='40px' class=''/>";
					str+="    			 	"+obj.getColType( localJson["theme5.columna1.type"] , v.idproducto, "pNormal", idCategoria,1, localJson["theme5.columna1.name"], localJson["theme5.columna1.data"], v.data_adic1, localJson["theme5.columna1.readonly"])+"</td>";
				}
				
				if(col2Hidden != "display:none;") {
					str+="			<td>";//+localJson["column2"];
					str+="			    "+obj.getColType( localJson["theme5.columna2.type"] , v.idproducto, "pTarjeta"  , idCategoria, 2, localJson["theme5.columna2.name"], localJson["theme5.columna2.data"], v.data_adic2, localJson["theme5.columna2.readonly"])+"</td>";
				}
				
				if(col3Hidden != "display:none;") {
					str+="			<td>";//+localJson["column3"];
					str+="			    "+obj.getColType( localJson["theme5.columna3.type"] , v.idproducto, "pColumna3" , idCategoria, 3, localJson["theme5.columna3.name"], localJson["theme5.columna3.data"], v.data_adic3, localJson["theme5.columna3.readonly"])+"</td>";
				}
				
				if(col4Hidden != "display:none;") {
					str+="			<td>";//+localJson["column4"];
					str+="			     "+obj.getColType( localJson["theme5.columna4.type"] , v.idproducto, "pColumna4" , idCategoria,4, localJson["theme5.columna4.name"], localJson["theme5.columna4.data"], v.data_adic4, localJson["theme5.columna4.readonly"])+"</td>";
				}
				
				if(col5Hidden != "display:none;") {
					str+="			<td>";//+localJson["column5"];
					str+="			    "+obj.getColType( localJson["theme5.columna5.type"] , v.idproducto, "pColumna5" , idCategoria, 5, localJson["theme5.columna5.name"], localJson["theme5.columna5.data"], v.data_adic5, localJson["theme5.columna5.readonly"])+"</td>";
				}
				str+="</tr>";
				
				$(queryProducto+" tbody").append(str);
				cant=cant+1;
			});	
			//console.log("end - each");
			$(queryProducto+" tbody").append("<tr style='height:120px;'></tr>");
			
			var f = new Function("("+localJson["listeners.endAddProducto"]+")()");
			f();
			
			$(queryProducto).css({"font-size":"10px"});
			$(".new").textinput();  
			$(".new").css({"font-size":"7px"});
			$("combos .ui-input-text").css({"width" : "85px"});
		}
		else if(localJson.theme5 == "exists") {
			//console.log("Process producto 2- exists");
			
			$.each(data , function(k,v) {
				var str = "<tr>";
					str+=	"<td align='left'>"+v.nombreproducto+"</td>";
					str+=	"<td><input type='hidden' id='id' name='id'  					value='"+v.idproducto+"' size='1' width='40px'/>";
					str+=	"    <input type='radio' id='existe'  name='existe"+v.idproducto+"' class='new' value='"+v.idproducto+"' size='1' width='20px'/></td>";
					str+=	"<td><input type='radio' id='existe'  name='existe"+v.idproducto+"' class='new'  value='"+v.idproducto+"' size='1' width='20px' /></td>";
					str+=	"<td><input type='radio' id='existe'  name='existe"+v.idproducto+"' class='new'  value='"+v.idproducto+"' size='1' width='20px' /></td>";
					str+="</tr>";
					
				$(queryProducto+" tbody").append(str);
				cant=cant+1;
			});	
			
			var f = new Function("("+localJson["listeners.endAddProducto"]+")()");
			f();
			
			$(queryProducto).css({"font-size":"10px"});
			//$(".new").checkboxradio("refresh");
			$(".new").css({"font-size":"7px"});
			$("combos .ui-input-text").css({"width" : "85px"});
		}
		else { /*SELECT NORMAL */
			//console.log("Process producto 3 - else >>"+queryProducto);
			
			$.each(data , function(k,v) {				
				$(queryProducto).append("<option value='"+v.idproducto+"' >"+v.nombreproducto+"</option>");
				cant=cant+1;
			});
			
			var f = new Function("("+localJson["listeners.endAddProducto"]+")()");
			f();
			
			if(cant==1) {
				$(queryProducto+" option:eq(1)").prop("selected", true);
			}
			
			$(queryProducto).selectmenu('refresh',true);
			$(queryProducto).trigger('change');
		}
		
		//console.log("[END ITERACION POR PRODUCTO]"+cant);
	};
	
	this.getColType = function(tipo, numProducto, idName , idCategoria, position, columnName, data, dataAdicional, readONLY) {
		var readonly = "";
		if(readONLY == true) {
			readonly = "readonly='readonly'";
		}
		
		var id = "";
		var name="";
		var value = "";
		
		if( tipo == "radio") {
			id 	 	= "g_row_"+numProducto;
			name 	= "g_row_"+numProducto;
			value 	= "1";
		}
		else if( tipo == "number") {
			id 	 	= "g_row_"+numProducto;
			name 	= "g_row_"+numProducto;
			value 	= "1";
		}
		else if( tipo == "number2") {
			id 		= "g_row_"+idName+"_"+numProducto;
			name 	= "g_row_"+idName+"_"+numProducto;
			value 	= "1";
		}
		else if( tipo == "range") {
			id 		= "g_row_"+idName+"_"+numProducto;
			name 	= "g_row_"+idName+"_"+numProducto;
			value 	= "0";
		}
		else if( tipo == "radiomultiple") {
			id 		= "g_row_"+numProducto;
			name 	= "g_row_"+numProducto+"_"+idName;
			value 	= "1";
		}
		else if( tipo == "combobox" ) {
			id 		= "g_row_"+numProducto;
			name 	= "g_row_"+numProducto+"_"+idName;
			value 	= "1";
		}
		else if( tipo == "combobox2" ) {
			id 		= "g_row_"+numProducto;
			name 	= "g_row_"+numProducto;
			value 	= "1";
		}
		else {
			id 		= "g_row_"+idName+"_"+numProducto;
			name 	= "g_row_"+idName+"_"+numProducto;
			value   = 0;
		}
		
		 
		
		var idCatString = JSON.stringify({"idCategoria" : idCategoria, "idProducto": numProducto});
		if( tipo == "number" ) {
			return "<input type='number' id='"+id+"'  name='"+name+"' class='id_object new "+this.getJson()["system.producto.class"]+"' size='1' width='20px' lang='"+idCatString+"' value='"+dataAdicional+"' "+readonly+"/> ";
		}
		else if( tipo == "number2" ) {
			return "<input class='height: 200px !important' type='number' id='"+id+"'  name='"+name+"' class='id_object new "+this.getJson()["system.producto.class"]+"' size='1' width='20px' lang='"+idCatString+"' value='"+dataAdicional+"' "+readonly+"/> <img onclick=ValorMoreLess('more','"+id+"') src='../../images/arrow-up.png' alt='Mas' style='position: absolute; margin-left: 135px; margin-top: -30px'/> <img onclick=ValorMoreLess('less','"+id+"') src='../../images/arrow-down.png' alt='Menos' style='position: absolute; margin-left: 165px; margin-top: -30px'/>";
		}
		else if( tipo == "texto" || tipo == "text" ) {
			return "<input type='text'   id='"+id+"'  name='"+name+"' class='id_object new "+this.getJson()["system.producto.class"]+"' size='1' width='20px' lang='"+idCatString+"' value='"+dataAdicional+"' "+readonly+"/> ";
		}
		else if( tipo == "truefalse" ) {
			var htm = "<select id='"+id+"'  name='"+name+"' class='id_object new "+this.getJson()["system.producto.class"]+"' lang='"+idCatString+"' >";
			htm    += " <option value=''>-</option> ";
			htm    += " <option value='yes'>Si</option> ";
			htm    += " <option value='no' >No</option> ";
			htm    += "</select>";
			
			return htm;
		}
		else if( tipo == "truefalse_defaultyes" ) {
			var htm = "<select id='"+id+"'  name='"+name+"' class='id_object new "+this.getJson()["system.producto.class"]+"' lang='"+idCatString+"'>";
			htm    += " <option value='yes'>Si</option> ";
			htm    += " <option value='no' >No</option> ";
			htm    += "</select>";
			
			return htm;
		}
		else if( tipo == "checkbox" ) {
			return "<input type='checkbox' id='"+id+"'     name='"+name+"'  class='id_object' lang='"+idCatString+"'/> ";
		}
		else if( tipo == "radio") {
			return "<input type='radio'    id='"+id+"'    name='"+name+"'   class='id_object "+this.getJson()["system.producto.class"]+"' lang='"+idCatString+"' value='"+columnName+"'/> ";
		}
		else if( tipo == "radiomultiple") {
			return "<input type='radio'    id='"+name+"'  name='"+name+"'   class='id_object ' lang='"+idCatString+"' value='"+columnName+"' onclick='(function() {  var any = new ObjAnyWhereCCL_CP(); any.checkOrUncheck(\""+name+"\"); } )();'/> ";
		}
		else if(tipo == "combobox") {
			var htm = "<select id='"+id+"'  name='"+name+"' class='id_object new "+this.getJson()["system.producto.class"]+"' lang='"+idCatString+"'>";
			$.each(data, function(k,v) {
				htm+="<option value='"+v+"'>"+v+"</option>";
			});
			
			htm+="</select>";
			return htm;
		}
		else if(tipo == "combobox2") {
			var htm = "<select id='"+id+"'  name='"+name+"' class='id_object new "+this.getJson()["system.producto.class"]+"' lang='"+idCatString+"'>";
			$.each(data, function(k,v) {
				htm+="<option value='"+v+"'>"+v+"</option>";
			});
			
			htm+="</select>";
			return htm;
		}
		else {
			return "<input type='number' id='"+id+"'    name='"+name+"' class='id_object new "+this.getJson()["system.producto.class"]+"' value='0' size='1' width='20px' lang='"+idCatString+"'/> ";
		}
		
	};
	
	this.checkOrUncheck = function(radio) {
		//console.log( $("#"+radio).attr("title") );
		
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
		$("#selectCategorias_"+numPos).html("<option value='' selected>Escoger Categor&iacute;a</option>");
		$("#selectCategorias_"+numPos+" option:eq(1)").prop("selected", true);
		$("#selectCategorias_"+numPos).selectmenu('refresh',true);
		
	};
	
	this.resetProductos = function(numPos) {
		if( this.getJson().theme5 == "table" || this.getJson().theme5 == "exists") { 
			//console.log("RESET PRODUCTOS 1");
			$("#selectProductos_"+numPos+" tbody").html("");
		}
		else {
			//console.log("RESET PRODUCTOS 2");
			$("#selectProductos_"+numPos).html("<option value='' selected>Escoger Producto</option>");
			$("#selectProductos_"+numPos+" option:eq(1)").prop("selected", true);
			$("#selectProductos_"+numPos).selectmenu('refresh',true);
		}
	};
	
	this.getCliente = function() {
		return $("#selectClientes_"+this.num).val();
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
	
	this.onChangeCliente = function(num) {
		var val = $("#selectClientes_"+num).val();
		var map = new MapSQL("cacheTripletaSelector");
		//console.log("CAMBI� CLIENTE TO--->"+val);
		
		map.del("selectedCliente", function() {
			//console.log("adding cliente->"+val);
			var map2 = new MapSQL("cacheTripletaSelector");
			map2.add("selectedCliente", val );	
		});
		
	};
	
	this.getLastCliente = function(funcGetData) {
		var map = new MapSQL("cacheTripletaSelector");
		map.get("selectedCliente", funcGetData);
	};
	
	this.onChangeCadena = function(num) {
		var val = $("#selectCadenas_"+num).val();
		var map = new MapSQL("cacheTripletaSelector");
		//console.log("CAMBI� CADENA TO--->"+val);
		
		map.del("selectedCadena", function() {
			//console.log("adding cadena->"+val);
			var map2 = new MapSQL("cacheTripletaSelector");
			map2.add("selectedCadena", val);
		});
		
	};
	
	this.getLastCadena = function(funcGetData) {
		var map = new MapSQL("cacheTripletaSelector");
		map.get("selectedCadena", funcGetData);
	};
	
	this.onChangeLocal = function(num) {
		var val = $("#selectLocales_"+num).val();
		var map = new MapSQL("cacheTripletaSelector");
		//console.log("CAMBIÓ LOCAL TO--->"+val);
		
		map.del("selectedLocal", function() {
			//console.log("adding local->"+val);
			var map2 = new MapSQL("cacheTripletaSelector");
			map2.add("selectedLocal", val);
		});
	};
	
	this.getLastLocal = function(funcGetData) {
		
		var map = new MapSQL("cacheTripletaSelector");
		map.get("selectedLocal", funcGetData);
	}; 
	
	this.onChangeCategoria = function(num) {
		var val = $("#selectCategorias_"+num).val();
		var map = new MapSQL("cacheTripletaSelector");
		//console.log("CAMBIÓ CATEGORÍA TO--->"+val);
		
		map.del("selectedCategoria", function() {
			//console.log("adding categoria->"+val);
			var map2 = new MapSQL("cacheTripletaSelector");
			map2.add("selectedCategoria", val);
		});
 
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
			 
			 //htmlLocal+="<label for='selectProductos_"+this.num+""+idCategoria+"' class='ui-select'>Producto:</label>" +
			 htmlLocal+="<table  name='selectProductos_"+this.num+""+idCategoria+"' id='selectProductos_"+this.num+""+idCategoria+"'>" +
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
				
				//console.log("@@@@  COLUMN 4");
				//console.log(this.json.column4);
				
				htmlLocal+="<th>"+this.json.column0+"</th>";
				if(col1Hidden != "display:none;") {
					htmlLocal+="<th data-priority='1'  >"+this.json.column1+"</th>";
				}
				
				if(col2Hidden != "display:none;") {
					htmlLocal+="<th  data-priority='2'  >"+this.json.column2+"</th>";
				}
				
				if(col3Hidden != "display:none;") {
					htmlLocal+="<th data-priority='3'  >"+this.json.column3+"</th>";
				}
				
				if(col4Hidden != "display:none;") {
					htmlLocal+="<th  data-priority='4'  >"+this.json.column4+"</th>";
				}
				
				if(col5Hidden != "display:none;") {
					htmlLocal+="<th  data-priority='5'  >"+this.json.column5+"</th>";
				}
					
			 }
			
			 if ( this.json.theme5 == "exists" ) {
				 html+="<th  >"+this.json.column0+"</th>" +
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
	
	
	if(paramJSON != null){
		this.initNormal(paramJSON);
	}
	
	this.getCluster = function() {
		return $("#hiddenCluster").val();
	}
	
	this.parsea = function(str) {
		var json = {};
		try {
			json = JSON.parse(str);
		}
		catch(e) {
			
		}
		
		return json;
	}
	
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
			
	    //console.log("[num:"+localNum+"]");
	    return localNum;
	}
}
