/**
 * (M-FP-003) Selector Categoría, listado de Producto, Facing, precio, existe fleje (SI/NO)
 * 2015-05-11
 * */

var objAnywhere = null;
var posLatitud = null;
var posLongitud = null;
var pointAddress = null;
var shareofShelfSaveInit = false;
var nombreModulo = "Precios y facing";

var idCliente = [];
var idCadena = [];
var idLocal = [];

$(".titleTag").each(function() {
	$(this).html(nombreModulo);
});

$('#shareofshelf_principal').bind( 'pagebeforecreate',function(event) {
	console.log("shareofshelf_principal");
	
	restartCombosShareOfShelf();
	
});

function restartCombosShareOfShelf() {
	objAnywhere = new ObjAnyWhereCCL_CP({
		
		 "disabled1":"no",
		 "disabled2":"no",
		 "disabled3":"no",
		 
		 "getCache1":"no",
		 "getCache2":"no",
		 "getCache3":"no", 
		
		 "theme5":"table",
		 "theme5.columna2.visibility":true,
		 "theme5.columna3.visibility":true,
		 "theme5.columna1.name":"Facing",
		 "theme5.columna2.name":"Precio",
		 "theme5.columna3.name":"¿Es Promoción?",
		 "theme5.columna3.type":"truefalse",	
		 
		// "categorias.only":[410,411,412,413],
		 "system.producto.class":"required" });

	$("#combos").html(objAnywhere.getHtml());	
}

$('#shareofshelf_principal').bind( 'pageshow',function(event) {
	console.log("[pageshow] shareofshelf.js");
	objAnywhere.loadClients();
	var any = new Anywhere();
	$.ajax({ 
		type: "GET",
		dataType:"json",
		url: any.getWSAnywhere_context() + "services/p2s/querys/infoultimavisita/" + sessionStorage.getItem("rutT") ,
		dataType:"json",
		crossDomain : true,
		success: function(data,status,jqXHR) {
			$.each(data, function(key, val) {
				$.each(val, function(key2, val2) {
					idCliente.push(val2[0].value);
					idCadena.push(val2[1].value);
					idLocal.push(val2[2].value);					
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
	       alert("error : " + textStatus + "," + errorThrown);
	    }
	});
	
	
});

function guardaProtocolo() {

	 var any = new Anywhere();
	 var vUrl = any.getWSAnywhere_context() + "services/alertasvarias/guardaprotocolo/";
	 var anySave = new AnywhereManager();
	 
	 var idUsuario = sessionStorage.getItem("rutT");
	 fecha = moment().format("YYYYMMDD");
	 hora = moment().format("HHmmss");
	 
	 anySave.save(vUrl,  { a1: idUsuario,
			a2: objAnywhere.getCliente(),
			a3: objAnywhere.getCadena(),
			a4: objAnywhere.getLocal(),
			a5: objAnywhere.getCategoria(),
			a6: objAnywhere.getProducto(),
			num_val1:3,
		},
		function(data,status,jqXHR) { 
			var mensajeSave = "Registro de ingreso enviado correctamente";
			if(data != null) {
				if(data.dataFalsa == "dataFalsa") {
					mensajeSave = "Alerta sin conexion a Internet. Su informaci&oacute;n ser&aacute; guardada en el celular y apenas cuente con Internet usted debe reenviarla (ir al men&uacute; principal)";
				}
			}
			var popup = new MasterPopup();
			popup.alertPopup(nombreModulo, mensajeSave, {"funcYes":  function() {
			    $.mobile.changePage( "../../menu.html", { transition: "flip"} );
			}});
		});
}

function saveShareOfShelf() {
	if(!shareofShelfSaveInit) {
		shareofShelfSaveInit = true;
		internalSave();
	}	

}

	function internalSave() {
		
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
			 
			 
			 internalSave2();
			 
		 }
		 else {
			 var popup = new MasterPopup();
			 popup.alertPopup("Alerta", "Debes completar todos los datos en rojo");
			 shareofShelfSaveInit = false;
		 } 
		 
	}


	function internalSave2() {	
		
			internalSave3();
		
	}

	function internalSave3() {
			console.log("Sending");
			var cant = 0;
			var estado_gestion = 205;
			var any = new Anywhere();
			var vUrl = any.getWSAnywhere_context() + "dispatcher?m=iposfacingextendido2&c=Facing";
			var cantOk    = 0;
			var cantError = 0;
			var cantTotal = $("input[name='id']").length;
			var map = new MapSQL("SHAREOFSHELF_MFP003");
			
			$("input[name='id']").each(function(k,v){
				var json = localStorage.getItem("precio");
				if(json == null) {
					json = "{}";
				}
				var json = JSON.parse(json);
				json["col1"] = $("#pNormal_"+$(v).val()).val();
				json["col2"] = $("#pTarjeta_"+$(v).val()).val();
				json["col3"] = $("#pColumna3_"+$(v).val()).val();
				
				map.add($(v).val(),JSON.stringify(json), 
						function() {
					
							var dataForm = { idCliente:objAnywhere.getCliente(),
									 idCadena:objAnywhere.getCadena(),
									 idLocal:objAnywhere.getLocal(),
										 idCategoria:objAnywhere.getCategoria(),
										 idProducto: $(v).val(),
									 a5: $("#pNormal_"+$(v).val()).val(), //CARAS
									 precio: $("#pTarjeta_"+$(v).val()).val(), //PRECIO
									 fleje: $("#pColumna3_"+$(v).val()).val(), //FLEJE
									 tipoFormulario: "facing_precios",
									 a7:fecha.value,
									 a8:facingImage,
									 a9:estado_gestion,
									 address : pointAddress,
									 latitud : posLatitud,
									 longitud : posLongitud,
									 idUsuario : sessionStorage.getItem("rutT"),
									 code: 3};
			
			
			
							var anySave = new AnywhereManager();
							anySave.save(vUrl, dataForm,
									function(data,status,jqXHR) {
										cantOk+=1;				
									},
									function() {
										cantError+=1;
									},
									function() {
										cant=cant+1;
										console.log("Sending "+cant);
										
										console.log(cantTotal + " = "+ (cantOk + cantError ) );
										if(cantTotal == (cantOk + cantError ) ) {
											guardaProtocolo();
											var popup = new MasterPopup();
											popup.alertPopup("Facing & Precios", "Datos guardados correctamente", {"funcYes":  function() {
											    $.mobile.changePage("index.html", { transition: "flip"} );
											
											}});
										}
									},
									false);
			
						});
		});
	}
	
