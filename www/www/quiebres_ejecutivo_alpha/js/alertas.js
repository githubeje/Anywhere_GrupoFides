var pointAddress = 'No definido';
var stockImage = 'Sin Imagen';
var posLatitud = null;
var posLongitud = null;
var objAnywhere = null;
var alertaSaveInit = false;


$('#alertas_principal').bind( 'pagebeforecreate',function(event) {
	if(objAnywhere == null) {
		objAnywhere = new ObjAnyWhereCCL_CP({"omit4":"no", "system.producto.class":"required"});
		$("#combos").html(objAnywhere.getHtml());
	}
	
	

});

var onPhotoDataSuccess_Izquierda = function(imageData) {
	var captureStock = document.getElementById("captureIzquierda");
	captureStock.style.display = "block";
	captureStock.src = "data:image/jpeg;base64," + imageData;
	stockImage = imageData;
	
	superPopup("poderPehuenche",'Mensaje','Foto tomada');
};	

$('#alertas_principal').bind( 'pageshow',function(event) {
	console.log("[pageshow] activacion_promocion.js");
	objAnywhere.loadClients();
});



function saveAlertas() {
	if(!alertaSaveInit) {
		alertaSaveInit = true;
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
		 alertaSaveInit = false;
	 } 
}

function internalSave2() {
		 var any = new Anywhere();
		 var vUrl = any.getWSAnywhere_context() + "services/alertasvarias/saveextendido2/";
		 var anySave = new AnywhereManager();
		 
		 
		 var idUsuario = sessionStorage.getItem("rutT");
		 fecha = moment().format("YYYYMMDD");
		 hora = moment().format("HHmmss");
		 
		 anySave.save(vUrl,  { a1: idUsuario,
				a2: $( "select[name^='selectClientes_']" ).val(),
				a3: $( "select[name^='selectCadenas_']" ).val(),
				a4: $( "select[name^='selectLocales_']" ).val(),
				a5: $( "select[name^='selectCategorias_']" ).val(),
				a6: $( "select[name^='selectProductos_']" ).val(),
				tipo: $( "select[name^='type']" ).val(),
				msg : $( "#msg" ).val(),
				a7: 0 ,
				a8: fecha, 
				a9: hora, 
				a10: stockImage, 
				a11: "", 
				a12: "", 
				a13: "",
				a14: "", 
				a15: "",
				tipoAlerta: "100"
			},
			function(data,status,jqXHR) {
				
				var mensajeSave = "Alerta enviada correctamente";
				if(data != null) {
					if(data.dataFalsa == "dataFalsa") {
						mensajeSave = "Alerta sin conexion a Internet. Su informaci&oacute;n ser&aacute; guardada en el celular y apenas cuente con Internet usted debe reenviarla (ir al men&uacute; principal)";
					}
				}
				var popup = new MasterPopup();
				popup.alertPopup("Alertas", mensajeSave, {"funcYes":  function() {
				    $.mobile.changePage( "index.html", { transition: "flip"} );
				}});
				
			});
	
}

