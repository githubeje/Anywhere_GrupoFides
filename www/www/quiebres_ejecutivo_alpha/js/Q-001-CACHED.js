var objAnywhere = null;
var facingSaveInit = false;

var idCliente = [];
var idCadena = [];
var idLocal = [];
var idCorr = [];

var nombreModulo = "Quiebres";

$(".titleTag").each(function() {
	$(this).html(nombreModulo);
});

var anySaveObject = new AnySave();

$('#precio_principal').bind( 'pagebeforecreate',function(event) {
	console.log("precio_principal");
	

	objAnywhere = new ObjAnyWhereCCL_CP({
		
										 "hide1":"yes",
										 "hide2":"yes",
										 "hide3":"yes",
	
										 "disabled1":"no",
										 "disabled2":"no",
										 "disabled3":"no",
										 
										 "getCache1":"yes",
										 "getCache2":"yes",
										 "getCache3":"yes", 
		 
										 "theme5":"table",
										 "theme5.columna1.name":"Hay<br/>Producto",
										 "theme5.columna2.name":"En<br/>Riesgo",
										 "theme5.columna3.name":"Quiebre",
										 "theme5.columna4.name":"No<br/>Clusterizado",
										 
										 "theme5.columna1.visibility":true,
										 "theme5.columna2.visibility":true,
										 "theme5.columna3.visibility":true,
										 "theme5.columna4.visibility":false,
										 
										 "theme5.columna1.type":"radio",
										 "theme5.columna2.type":"radio",
										 "theme5.columna3.type":"radio",
										 "theme5.columna4.type":"radio",
										 
										 "system.producto.class":"required"});
	
	
	$("#combos").html(objAnywhere.getHtml());

});


$('#precio_principal').bind( 'pageshow',function(event) {
	console.log("[pageshow] precios.js");
	objAnywhere.loadClients();
	var any = new Anywhere();
	$.ajax({ 
		type: "GET",
		dataType:"json",
		url: "http://www.anywhere.cl/fides/ws1/services/p2s/querys/infoultimavisita/" + sessionStorage.getItem("rutT") ,
		dataType:"json",
		crossDomain : true,
		success: function(data,status,jqXHR) {
			$.each(data, function(key, val) {
				$.each(val, function(key2, val2) {
					idCliente.push(val2[0].value);
					idCadena.push(val2[1].value);
					idLocal.push(val2[2].value);	
					idCorr.push(val2[3].value);	
				});
			});
			
			$( document ).ready(function() {
				console.log(data);
				document.getElementById('selectClientes_1000').options[document.getElementById('selectClientes_1000').selectedIndex].value = idCliente[0];
				document.getElementById('selectCadenas_1000').options[document.getElementById('selectCadenas_1000').selectedIndex].value   = idCadena[0];
				document.getElementById('selectLocales_1000').options[document.getElementById('selectLocales_1000').selectedIndex].value   = idLocal[0];
				objAnywhere.loadCategorias('1000');						
			});
		}, 
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("error : " + textStatus + "," + errorThrown);
	    }
	});
});


 

		function savePrecio() {
			 
				var success = function(data,status,jqXHR) {
					var mensajeSave = "Registro enviado correctamente";
					if(data != null) {
						if(data.dataFalsa == "dataFalsa") {
							mensajeSave = "Alerta sin conexion a Internet. Su informaci&oacute;n ser&aacute; guardada en el celular y apenas cuente con Internet usted debe reenviarla (ir al men&uacute; principal)";
						}
					}
					var popup = new MasterPopup();
					popup.alertPopup(nombreModulo, mensajeSave, {"funcYes":  function() {
					    $.mobile.changePage( "../menu.html", { transition: "flip"} );
					}});
					
					{
						Protocolo.guardaProtocolo({
							moduloId : 4,
							objAnywhere:objAnywhere,
						});
						
						internalSave2();
					}
				}
				anySaveObject.save({
					 nombreModulo: nombreModulo,
					 formularioID: "PROT-4",
					 formName : "formSend",
					 objAnywhere: objAnywhere,
					 silent: false,
					 success : success
				});
			 
		}

		 

		function internalSave2() {
			
			
			var cantOk    = 0;
			var cantError = 0;
			var cantTotal = $("input[name='id']").length;
			var any = new Anywhere();
			var vUrl = any.getWSAnywhere_context() + "services/cargamasivastock/save";
			var vUrlquiebre = any.getWSAnywhere_context() + "services/cargamasivastock/saveseguimientoquiebre";
			var anySave= new AnywhereManager();
			
			$("input[name='id']").each(function(k,v){
				var id = $(this).val();				
				var json = localStorage.getItem("precio");
				if(json == null) {
					json = "{}";
				}
				var json = JSON.parse(json);
				
				
				json["pNormal_"+$(v).val()]  = $("#pNormal_"+$(v).val()).val();
				json["pTarjeta_"+$(v).val()] = $("#pTarjeta_"+$(v).val()).val();
 
				var pos = 1;
				var okValue = -1;
				console.log("Cant de Existencias:"+$("input[name=g_row_"+id+"]").length );
				$("input[name=g_row_"+id+"]").each(function(k,v) {
					console.log( "CHECKED-->" + $(this).attr("checked")  );
					if( $(this).attr("checked") == "checked" ) {
						okValue = pos;
						if( okValue == 3){
							parametroquiebre = {
									idUsuario  			: sessionStorage.getItem("rutT"),
									idCliente			: idCliente[0],
									idCadena			: idCadena[0],
									idLocal				: idLocal[0],
									idCorr  			: idCorr[0],
									idProducto  		: id,
								    estadoSeguimiento  	: "0"
							};
							console.log(parametroquiebre);
							anySave.save(vUrlquiebre, parametroquiebre , function(){},function(){},function(){});
							delete parametroquiebre;
							
						}
					}
					pos++;
				});
				
				var params = {a1  : sessionStorage.getItem("rutT"),
					     a2  : objAnywhere.getCliente(),
					     a3  : id,
					     a4  : "0", 
						 a5  : "",
						 a6  : "",
						 a7  : "", 
						 a8  : objAnywhere.getCategoria(),
						 a9  : "",
						 a10 : okValue,
						 a11 : 0,
						 a12 : objAnywhere.getCadena(),
						 a13 : objAnywhere.getLocal()
					};
				
				anySave.save(vUrl, params , 
					function() {
						
					}
					,
					function() {
						
					},
					function(data,status,jqXHR) {
						console.log("TerminoC_ "+cantOk);
						cantOk+=1;			
						
						if(cantTotal == (cantOk + cantError ) ) {
							//guardaProtocolo();
							/*
							var popup = new MasterPopup();
							popup.alertPopup(nombreModulo, "Datos guardados correctamente", {"funcYes":  function() {
							    $.mobile.changePage( "index.html", { transition: "flip"} );
							}});
							*/
						}
					});
			});
			
			
			
		}

		function test() {
			var saveUtil = new SaveUtils();
			var params = saveUtil.serializePage("formSend", objAnywhere);
			console.log(params);
		}