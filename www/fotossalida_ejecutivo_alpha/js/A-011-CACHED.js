/**
 * 2015-05-11
 * (A-002) Tipo, Categoría, Comentario, FOTO (máx. 3)
 * 
 * 
 * */


var pointAddress = 'No definido';
var stockImage = 'Sin Imagen';
var posLatitud = null;
var posLongitud = null;
var objAnywhere = null;
var quiebreSaveInit = false;

var idCliente = [];
var idCadena = [];
var idLocal = [];

var nombreModulo = "Fotos - Salida";

$(".titleTag").each(function() {
	$(this).html(nombreModulo);
});

reiniciaFotos();
createPhotoButton(1,true, true, "Foto Gondola");
createPhotoButton(2,true, true, "Foto Hoja");
createPhotoButton(3,true, true, "Foto Cabecera");
createPhotoButton(4,true, true, "Foto Cabecera");

//var anySaveObject = new AnySave();

$('#quiebrestock_principal').bind( 'pagebeforecreate',function(event) {
	if(objAnywhere == null) {
		objAnywhere = new ObjAnyWhereCCL_CP({
			
 											 "hide1":true,
											 "hide2":true,
											 "hide3":true,
		
		  									 "disabled1":"no",
											 "disabled2":"no",
											 "disabled3":"no",
											 
											 "getCache1":"no",
											 "getCache2":"no",
											 "getCache3":"no",
											 
											 "system.producto.class":"required",
											 "system.producto.class":"required",
											 "omit4":"yes",
											 "omit5":"yes" 
										});
		
		$("#combos").html(objAnywhere.getHtml());
	}
});

$('#quiebrestock_principal').bind( 'pageshow',function(event) {
	console.log("[pageshow] quiebrestock_promocion.js");
	objAnywhere.loadClients();
 
});

 
function saveQuiebre() {
	var successs = function(data) {
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
		
		reiniciaFotos();
		createPhotoButton(1,true, true, "Foto Gondola");
		createPhotoButton(2,true, true, "Foto Hoja");
		createPhotoButton(3,true, true, "Foto Cabecera");
		createPhotoButton(4,true, true, "Foto Cabecera");

	}
	
	//internalSave3();
	
	
	anySaveObject.save({
		 nombreModulo: nombreModulo,
		 formularioID: "PROT-2",
		 formName : "formSend",
		 objAnywhere: objAnywhere,
		 silent: false,
		 success : successs
	});

}

 

