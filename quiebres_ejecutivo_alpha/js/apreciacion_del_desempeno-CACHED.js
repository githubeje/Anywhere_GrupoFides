var objAnywhere = null;
var posLatitud = null;
var posLongitud = null;
var pointAddress = null;
var apreciacionSaveInit = false;

reiniciaFotos();
createPhotoButton(1,true, true, "Foto Consultora.");
createPhotoButton(2,true, true, "Foto PDV .");
createPhotoButton(3,false);
createPhotoButton(4,false);


$('#shareofshelf_principal').bind( 'pagebeforecreate',function(event) {
	console.log("shareofshelf_principal");
	
	objAnywhere = new ObjAnyWhereCCL_CP({"omit4":"yes",
										 "disabled1":"yes",
										 "disabled2":"yes",
										 "disabled3":"yes",
										 
										 "getCache1":"yes",
										 "getCache2":"yes",
										 "getCache3":"yes"});
	$("#combos").html(objAnywhere.getHtml());
	changeGenero("hembra");
	
});

$('#shareofshelf_principal').bind( 'pageshow',function(event) {
	console.log("[pageshow] shareofshelf_principal.js");
	objAnywhere.loadClients();
});

function changeGenero(option) {
	if(option == "hembra") {
		$("#divMachito").hide();
		$("#divHembra").show();
	}
	else if (option == "machito") {
		$("#divHembra").hide();
		$("#divMachito").show();
	}
}


function saveApreciacion() {
		if(!apreciacionSaveInit) {
			apreciacionSaveInit = true;
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
		 
		 
		 if( fotosObligatoriasCargadas() ) {
			 internalSave2(); 
		 }
		 else {
			 apreciacionSaveInit = false;
		 }
 	 
	 }
	 else {
		 var popup = new MasterPopup();
		 popup.alertPopup("Apreciaci&#243;n", "Debes completar todos los datos en rojo");
		 apreciacionSaveInit = false;
	 } 
	 
}

function internalSave2() {
	 var any = new Anywhere();
	 var vUrl = any.getWSAnywhere_context() + "dispatcher?c=ApreciacionDesempeno&m=save";
	 var anySave = new AnywhereManager();
	 
	 
	 var idUsuario = sessionStorage.getItem("rutT");
	 fecha = moment().format("YYYYMMDD");
	 hora = moment().format("HHmmss");
	 
	 var params = {   idcliente: objAnywhere.getCliente(),
			 		idcadena: objAnywhere.getCadena(),
			 		idlocal: objAnywhere.getLocal(),
			 		rutEvaluado:	$("#rut_evaluado").val(),
					nombre: $("#nombre").val(),
					tipoConsultora: $("#tipo_consultora").val(),
			 		genero:     	"f",
			 		pregunta11:     $("input[name=pregunta_1_1]:checked").val(),
			 		pregunta12:     "0",
			 		pregunta13:     "0",
			 		pregunta14:     "0",
			 		pregunta15:     "0",
			 		pregunta21:     $("#pregunta_2_1").val(),
			 		pregunta22:     $("#pregunta_2_2").val(),
			 		pregunta23:     $("#pregunta_2_3").val(),
			 		pregunta24:     $("#pregunta_2_4").val(),
			 		pregunta25:     $("#pregunta_2_5").val(),
			 		pregunta26:     $("#pregunta_2_6").val(),
			 		pregunta31:     $("#pregunta_3_1").val(),
			 		pregunta32:     $("#pregunta_3_2").val(),
			 		pregunta33:     $("#pregunta_3_3").val(),
			 		pregunta34:     $("#pregunta_3_4").val(),
			 		pregunta35:     $("#pregunta_3_5").val(),
			 		pregunta36:     $("#pregunta_3_6").val(),
			 		pregunta37:     $("#pregunta_3_7").val(),
			 		pregunta38:     $("#pregunta_3_8").val(),
			 		pregunta39:     $("#pregunta_3_9").val(),
			 		pregunta310:    $("#pregunta_3_10").val(),
			 		pregunta311:    $("#pregunta_3_11").val(),
			 		pregunta312:    $("#pregunta_3_12").val(),
			 		pregunta41:     "-",
			 		pregunta42:     "-",
			 		pregunta43:     "-",
			 		pregunta44:     "-",
			 		pregunta45:     "-",
			 		pregunta46:     "-",
			 		pregunta47:     "-",
			 		pregunta48:     "-",
			 		pregunta49:     "-",
			 		pregunta410:    "-",
			 		pregunta51:     $("input[name=pregunta_5_1]:checked").val(),
			 		pregunta52:     "0",
			 		pregunta53:     "0",
			 		pregunta54:     "0",
			 		pregunta55:     "0",
					F1: $("#hiddenFotoUno").val()	   ,
					F2: $("#hiddenFotoDos").val() 
			 		};

		var funcSuccess = function(data,status,jqXHR) {
			var mensajeSave = "Apreciacion enviada correctamente";
			if(data != null) {
				if(data.dataFalsa == "dataFalsa") {
					mensajeSave = "Apreciacion sin conexion a Internet. Su informaci&oacute;n ser&aacute; guardada en el celular y apenas cuente con Internet usted debe reenviarla (ir al men&uacute; principal)";
				}
				else if(data.success == true) {
					var popup = new MasterPopup();
					popup.alertPopup("Apreciacion", mensajeSave, {"funcYes":  function() {
					    $.mobile.changePage( "index.html", { transition: "flip"} );
					}});	
				}
				else {
					var popup = new MasterPopup();
					popup.alertPopup("Error Cod 1", "Algo extraño ocurrió, inténtalo nuevamente.");
					apreciacionSaveInit = false;
				}
			}
			else {
				var popup = new MasterPopup();
				popup.alertPopup("Error Cod 1", "Algo extraño ocurrió, inténtalo nuevamente.");
				apreciacionSaveInit = false;
			}
		};
	 
		anySave.saveClaseWeb(true, "anywhere_movil_restanywhere", "OldSaveApreciacionDesempeno", "add", params, funcSuccess);	
}