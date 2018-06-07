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

var nombreModulo = "Fotos - Entrada";

$(".titleTag").each(function() {
	$(this).html(nombreModulo);
});

reiniciaFotos();
createPhotoButton(1,true, true, "Foto Gondola");
createPhotoButton(2,true, true, "Foto Pasillo");
createPhotoButton(3,true, true, "Foto a ocultar");
createPhotoButton(4,true, true, "Foto a ocultar");

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
											 
											 "getCache1":"yes",
											 "getCache2":"yes",
											 "getCache3":"yes",
											 
											 "system.producto.class":"required",
											 "system.producto.class":"required",
											 
											 "hidden3":"yes",
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

	 var any = new Anywhere();
	 var vUrl = any.getWSAnywhere_context() + "services/alertasvarias/saveextendido/";
	 
	 
	 var idUsuario = sessionStorage.getItem("rutT");
	 fecha = moment().format("YYYYMMDD");
	 hora = moment().format("HHmmss");
	 
	 
	 var success = function(data) {
		 //console.log(data);
		 
		 var mensajeSave = "Alerta enviada correctamente";
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
		 createPhotoButton(2,true, true, "Foto Pasillo");
		 createPhotoButton(3,true, true, "Foto a ocultar");
		 createPhotoButton(4,true, true, "Foto a ocultar");
	 }

	 
	 var f = {
			 nombreModulo: nombreModulo,
			 formularioID: "PROT-1",
			 formName : "formSend",
			 objAnywhere: objAnywhere,
			 silent: false,
			 success : success 
		 };
	 
	 anySaveObject.save(f);
	 
	 
}



