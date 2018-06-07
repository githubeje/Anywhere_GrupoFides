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
		
										 "hide1":true,
										 "hide2":true,
										 "hide3":true,
	
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
	/*
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
	*/
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

		 
 

		function test() {
			var saveUtil = new SaveUtils();
			var params = saveUtil.serializePage("formSend", objAnywhere);
			console.log(params);
		}