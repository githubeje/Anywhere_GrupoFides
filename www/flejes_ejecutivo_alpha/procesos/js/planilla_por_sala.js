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

var anySaveObject = new AnySave();

$('#quiebrestock_principal').bind( 'pagebeforecreate',function(event) {
	if(objAnywhere == null) {
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
		
	/*
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
	*/
});


$("#tipo").live("click",function() {
	
});

function test() {
	console.log(".testSerialize");
	
	var su = new SaveUtils();
	var p = su.serializePage("formSend", objAnywhere);
	console.log(p);
}

function saveQuiebre() {
	var success = function(data) {
		var mensajeSave = "Registro de fleje enviado correctamente";
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
	
	anySaveObject.save({
		 nombreModulo: nombreModulo,
		 formularioID: "PROT-5",
		 formName : "formSend",
		 objAnywhere: objAnywhere,
		 silent: false,
		 success : success
	});

}
 /*

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
	
 
}*/

 


function DisOrEnable(radio,id) {
	if(radio.value == "si") {
		$("#"+id).closest('tr').hide();	
	}
	else {
		$("#"+id).closest('tr').show();
	}
	
}
