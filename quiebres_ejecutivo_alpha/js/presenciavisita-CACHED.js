var objAnywhere = null;
var facingSaveInit = false;
var fotoFacing = null;
var nombreModulo = "3. Presencia por Visita";

$(".titleTag").each(function() {
	$(this).html(nombreModulo);
});

reiniciaFotos();
createPhotoButton(1,true, true, "Foto Consultora.");
createPhotoButton(2,true, true, "Foto PDV .");
createPhotoButton(3,false);
createPhotoButton(4,false);


$( document ).on( "pagecreate", function() {
    $( ".photopopup" ).on({
        popupbeforeposition: function() {
            var maxHeight = $( window ).height() - 60 + "px";
            $( ".photopopup img" ).css( "max-height", maxHeight );
        }
    });
    
    
    $('#viewfoto').on({
        'click': function() {
        	var rutaFotoExito = objAnywhere.getCliente();
        	rutaFotoExito += "-" + objAnywhere.getCadena();
        	rutaFotoExito += "-" + objAnywhere.getLocal() + ".jpg";
        	var any = new Anywhere();
        	$('#my_image').attr('src',any.getWSAnywhere_context() + 'images/fotoexito/' + rutaFotoExito);
        }
    });
    
    
});

$('#presenciavisita_principal').bind( 'pagebeforecreate',function(event) {
	console.log("presenciavisita_principal");
	
	objAnywhere = new ObjAnyWhereCCL_CP({"omit4":"yes",
										 "disabled1":"yes",
										 "disabled2":"yes",
										 "disabled3":"yes",
										 
										 "getCache1":"yes",
										 "getCache2":"yes",
										 "getCache3":"yes"});
	
	$("#combos").html(objAnywhere.getHtml());
	
});

$('#presenciavisita_principal').bind( 'pageshow',function(event) {
	console.log("[pageshow] presenciavisita.js");
	objAnywhere.loadClients();
});

		function savePrecio() {
			if(!facingSaveInit) {
				facingSaveInit = true;
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
					 facingSaveInit = false;
				 }
				
			 }
			 else {
				 var popup = new MasterPopup();
				 popup.alertPopup("Presencia por Visita", "Debes completar todos los datos en rojo");
				 facingSaveInit = false;
			 } 
		}
		
		function internalSave2() {
			
			var any = new Anywhere();
			var vUrl = any.getWSAnywhere_context() + "dispatcher?c=Facing&m=presenciavisita";
			var anySave= new AnywhereManager();
			
			var json = localStorage.getItem("precio");
			if(json == null) { json = "{}"; }
			var json = JSON.parse(json);
			
				
			var params = { a1: objAnywhere.getCliente(),
				a2: objAnywhere.getCadena(),
				a3: objAnywhere.getLocal(),
				a4: $("#pregunta_1_1").val(),
				a5: $("#pregunta_1_2").val(), 
				a6: $("#pregunta_1_3").val(),
				a7: $("#pregunta_1_4").val(),
				a8: $("#pregunta_1_5").val(),
				a9: $("#pregunta_1_6").val(),
				a10: $("#pregunta_1_7").val(),
				a11: $("#pregunta_1_8").val(),
				a12: $("#pregunta_1_9").val(), 
				a13: $("#pregunta_2_1").val(),
				a14: $("#pregunta_2_2").val(), 
				a15: $("#pregunta_2_3").val(), 
				a16: $("#pregunta_2_4").val(),
				a17: $("#pregunta_2_5").val(), 
				a18: $("#pregunta_2_6").val(),
				a19: $("#pregunta_2_7").val(), 
				a20: $("#pregunta_2_8").val(),
				a21: $("#comentario").val(),
				a22: sessionStorage.getItem("rutT"),
				a23: $("#rut_evaluado").val(),	
				nombre: $("#nombre").val(),
				tipoConsultora: $("#tipo_consultora").val(),
				F1: $("#hiddenFotoUno").val(),
				F2: $("#hiddenFotoDos").val() 
			};
				 
			
			var funcSuccess = function(data,status,jqXHR) {
				
				var mensajeSave = "Presencia por Visita enviada correctamente";
				if(data != null) {
					if(data.dataFalsa == "dataFalsa") {
						mensajeSave = "Presencia por Visita sin conexion a Internet. Su informaci&oacute;n ser&aacute; guardada en el celular y apenas cuente con Internet usted debe reenviarla (ir al men&uacute; principal)";
					}
					else if(data.success == true) {
						var popup = new MasterPopup();
						popup.alertPopup("Presencia por Visita", mensajeSave, {"funcYes":  function() {
						    $.mobile.changePage( "index.html", { transition: "flip"} );
						}});	
					}
					else {
						var popup = new MasterPopup();
						popup.alertPopup("Error Cod 1", "Algo extraño ocurrió, inténtalo nuevamente.");
						facingSaveInit = false;
					}
				}
				else {
					var popup = new MasterPopup();
					popup.alertPopup("Error Cod 1", "Algo extraño ocurrió, inténtalo nuevamente.");
					facingSaveInit = false;
				}

			};
			
			
			
			anySave.saveClaseWeb(true, "anywhere_movil_restanywhere", "OldSavePresenciaVisita", "add", params, funcSuccess);	
			
		}