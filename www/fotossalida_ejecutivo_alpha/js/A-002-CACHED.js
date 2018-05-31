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

var nombreModulo = "1. Alertas";

$(".titleTag").each(function() {
	$(this).html(nombreModulo);
});

reiniciaFotos();
createPhotoButton(1,true, true, "Foto.");
createPhotoButton(2,false);
createPhotoButton(3,false);
createPhotoButton(4,false);

$('#quiebrestock_principal').bind( 'pagebeforecreate',function(event) {
	if(objAnywhere == null) {
		objAnywhere = new ObjAnyWhereCCL_CP({"disabled1":"yes",
											 "disabled2":"yes",
											 "disabled3":"yes",
											 
											 "getCache1":"yes",
											 "getCache2":"yes",
											 "getCache3":"yes",
											 
											 "omit4": "yes",
											 
											 "system.producto.class":"required",
											 "system.producto.class":"required",
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
	if(!quiebreSaveInit) {
		quiebreSaveInit = true;
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
		 
		 internalSave3();
	 }
	 else {
		 var popup = new MasterPopup();
		 popup.alertPopup(nombreModulo, "Debes completar todos los datos en rojo");
		 quiebreSaveInit = false;
	 } 
	 
}


function internalSave3() {

	 var any = new Anywhere();
	 var vUrl = any.getWSAnywhere_context() + "services/alertasvarias/saveextendido/";
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
			msg: $("#comentario").val(), 
			a8: fecha, 
			a9: hora, 
			a10: varFotoUno,
			a100: varFotoDos,
			a1000: varFotoTres,
			a10000: varFotoCuatro,
			a11: "0", 
			a12: "0", 
			a13: "0",
			desc_val1: $("#tipo").val(),
			tipoAlerta:2,
		},
		function(data,status,jqXHR) { 
			var mensajeSave = "Alerta enviada correctamente";
			if(data != null) {
				if(data.dataFalsa == "dataFalsa") {
					mensajeSave = "Alerta sin conexion a Internet. Su informaci&oacute;n ser&aacute; guardada en el celular y apenas cuente con Internet usted debe reenviarla (ir al men&uacute; principal)";
				}
			}
			var popup = new MasterPopup();
			popup.alertPopup(nombreModulo, mensajeSave, {"funcYes":  function() {
			    $.mobile.changePage( "index.html", { transition: "flip"} );
			}});
		});
}
