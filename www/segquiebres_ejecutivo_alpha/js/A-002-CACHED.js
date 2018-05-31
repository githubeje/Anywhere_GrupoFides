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
var idCorr = [];

var idCorrSesion = 0;

var nombreModulo = "Seguimiento de Quiebres";

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
		objAnywhere = new ObjAnyWhereCCL_CP({"disabled1":"no",
											 "disabled2":"no",
											 "disabled3":"no",
											 
											 "getCache1":"no",
											 "getCache2":"no",
											 "getCache3":"no",
											 
											 "omit4": "yes",
											 
											 "system.producto.class":"required",
											 "system.producto.class":"required",
											 "omit5":"yes"
									      });
		
		$("#combos").html(objAnywhere.getHtml());
		$("#combosquiebre").html(objAnywhere.getHtmlSegQuiebre(sessionStorage.getItem("rutT")));
		objAnywhere.setProductosQuebrados(sessionStorage.getItem("rutT"));
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
					idCorr.push(val2[3].value);
				});
			});
			
			$( document ).ready(function() {
				document.getElementById('selectClientes_1000').options[document.getElementById('selectClientes_1000').selectedIndex].value = idCliente[0];
				document.getElementById('selectCadenas_1000').options[document.getElementById('selectCadenas_1000').selectedIndex].value   = idCadena[0];
				document.getElementById('selectLocales_1000').options[document.getElementById('selectLocales_1000').selectedIndex].value   = idLocal[0];
				idCorrSesion = idCorr[0];				
			});
		}, 
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("error : " + textStatus + "," + errorThrown);
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
			num_val1:6,
		},
		function(data,status,jqXHR) { 
			var mensajeSave = "Registro de seguimiento de quiebre enviado correctamente";
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

function actualizaEstadoProductoQuebrado() {

	 var any = new Anywhere();
	 var vUrl2 = any.getWSAnywhere_context() + "services/alertasvarias/actualizaestadoproductoquebrado/";
	 var anySave = new AnywhereManager();
	 
	 var idUsuario = sessionStorage.getItem("rutT");
	 console.log(idCorrSesion);
	 anySave.save(vUrl2,  { 
		 updIdUsuario: idUsuario,
		 updIdCorr: idCorrSesion,
		 updIdCliente: objAnywhere.getCliente(),
		 updIdCadena: objAnywhere.getCadena(),
		 updIdLocal: objAnywhere.getLocal(),
		 updIdProductoQuebrado: objAnywhere.getProductoQuebrado(),
		 updImgUno: varFotoUno,
		 updIdComentario: $("#comentario").val(), 
		 updIdTipo: $("#tipo").val(),
		},
		function(data,status,jqXHR) { 
			
		});
	 
	 removeOptions(document.getElementById("selectProductoQuebrado_1000"));
	 objAnywhere.setProductosQuebrados(sessionStorage.getItem("rutT"));
}


function removeOptions(selectbox)
{
    var i;
    for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
    {
        selectbox.remove(i);
    }
}


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
			a6: objAnywhere.getProductoQuebrado(),
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
			num_val1:7,
		},
		function(data,status,jqXHR) {
			guardaProtocolo();
			actualizaEstadoProductoQuebrado();
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
		});
}
