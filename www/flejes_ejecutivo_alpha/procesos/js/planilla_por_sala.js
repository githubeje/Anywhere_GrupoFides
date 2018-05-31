/**
 * 2015-05-11
 * (A-003) Tipo, Categoría, Comentario, FOTO (máx. 3)
 * VERSIÓN 2
 * 
 * */



var stockImage = 'Sin Imagen';
var posLatitud = null;
var posLongitud = null;
var pointAddress = null;

var idCliente = [];
var idCadena = [];
var idLocal = [];

var objAnywhere = null;
var quiebreSaveInit = false;

var nombreModulo = "Flejes";

$(".titleTag").each(function() {
	$(this).html(nombreModulo);
});

reiniciaFotos();
createPhotoButton(1,true, true, "Foto.");
createPhotoButton(2,true, false, "Foto.");
createPhotoButton(3,true, false, "Foto.");
createPhotoButton(4,false);

$('#quiebrestock_principal').bind( 'pagebeforecreate',function(event) {
	if(objAnywhere == null) {
		objAnywhere = new ObjAnyWhereCCL_CP({"disabled1":"no",
											 "disabled2":"no",
											 "disabled3":"no",
											 
											 "getCache1":"no",
											 "getCache2":"no",
											 "getCache3":"no",
											 
											 "system.producto.class":"required",
											 "system.producto.class":"required",
											 
											 //"categorias.only":[428,429,430,431,432,433,434],
											 
											 "omit4":"yes",
											 "omit5":"yes"});
		
		$("#combos").html(objAnywhere.getHtml());
	}
});

$('#quiebrestock_principal').bind( 'pageshow',function(event) {
	console.log("[pageshow] quiebrestock_promocion.js");
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
								
			});
		}, 
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("error : " + textStatus + "," + errorThrown);
	    }
	});
	
	var geo = new GeoGlobal();
	geo.refreshGeo(function(lat, lo) {
		posLatitud = lat;
		posLongitud = lo;

	}, function(point) {
		pointAddress = point;
	});
});


$("#tipo").live("click",function() {
	
});

function saveQuiebre() {
	if(!quiebreSaveInit) {
		quiebreSaveInit = true;
		internalSave();
	}	

}


function internalSave() {
	console.log("hola como estas");
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
		 
		 //if( fotosObligatoriasCargadas() ) {
			 internalSave_ModoSimple();	 
		 //}
		 //else {
		//	 quiebreSaveInit = false;
		 //}
	 }
	 else {
		 var popup = new MasterPopup();
		 popup.alertPopup(nombreModulo, "Debes completar todos los datos en rojo");
		 quiebreSaveInit = false;
	 } 
	 
}


function internalSave_ModoSimple() {
	
		
		var saveUtil = new SaveUtils();
		var params = saveUtil.serializePage("formSend", objAnywhere);
		params["formulario_id"]    = "A-003";
		params["formulario_alias"] = nombreModulo;
		params["latitud"]     = posLatitud;
		params["longitud"]    = posLongitud;
		params["point"]   	  = pointAddress;
		params["fotoUno"] = varFotoUno;
		params["fotoDos"] = varFotoDos;
		params["fotoTres"] = varFotoTres;
		params["fotoCuatro"] = varFotoCuatro;
		
		var success = function(data,status,jqXHR) { 
			var mensajeSave = "Información enviada correctamente";
			if(data != null) {
				if(data.dataFalsa == "dataFalsa") {
					mensajeSave = "Alerta sin conexion a Internet. Su informaci&oacute;n ser&aacute; guardada en el celular y apenas cuente con Internet usted debe reenviarla (ir al men&uacute; principal)";
				}
			}
			var popup = new MasterPopup();
			popup.alertPopup(nombreModulo, mensajeSave, {"funcYes":  function() {
			   $.mobile.changePage( "../../menu.html", { transition: "flip"} );
			}});
		}
		
		var anySave = new AnywhereManager();
		anySave.saveClaseWeb(true, "anywhere_movil_restanywhere", "AnySave", "	", params, success);
		guardaProtocolo();
	
 
}

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
			num_val1:5,
		},
		function(data,status,jqXHR) { 
			var mensajeSave = "Registro de fleje enviado correctamente";
			if(data != null) {
				if(data.dataFalsa == "dataFalsa") {
					mensajeSave = "Alerta sin conexion a Internet. Su informaci&oacute;n ser&aacute; guardada en el celular y apenas cuente con Internet usted debe reenviarla (ir al men&uacute; principal)";
				}
			}
			var popup = new MasterPopup();
			popup.alertPopup(nombreModulo, mensajeSave, {"funcYes":  function() {
			    $.mobile.changePage( "planilla_por_sala.html", { transition: "flip"} );
			}});
		});
}


function DisOrEnable(radio,id) {
	if(radio.value == "si") {
		$("#"+id).closest('tr').hide();	
	}
	else {
		$("#"+id).closest('tr').show();
	}
	
}
