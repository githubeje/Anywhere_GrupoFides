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

var nombreModulo = "Alertas";

$(".titleTag").each(function() {
	$(this).html(nombreModulo);
});

reiniciaFotos();
createPhotoButton(1,true, true, "Foto.");
createPhotoButton(2,false);
createPhotoButton(3,false);
createPhotoButton(4,false);

var anySaveObject = new AnySave();

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

function saveQuiebre() {
	var success = function() {
		guardaProtocolo();
	}
	
	anySaveObject.save({
		 nombreModulo: nombreModulo,
		 formularioID: "PROT-6",
		 formName : "formSend",
		 objAnywhere: objAnywhere,
		 silent: false,
		 success : success
	});
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
			num_val1:6,
		},
		function(data,status,jqXHR) {
			
		 
		});
}
