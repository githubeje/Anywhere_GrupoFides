/**
 * 2015-05-11
 * (A-003) Tipo, Categoría, Comentario, FOTO (máx. 3)
 * VERSIÓN 2
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
			 internalSave3();	 
		 }
		 else {
			 quiebreSaveInit = false;
		 }
	 }
	 else {
		 var popup = new MasterPopup();
		 popup.alertPopup(nombreModulo, "Debes completar todos los datos en rojo");
		 quiebreSaveInit = false;
	 } 
	 
}


function internalSave3() {
	 var prods = new Array();
	 prods.push(objAnywhere.getProducto());
	 
	 var cats = new Array();
	 cats.push(objAnywhere.getCategoria());
	 
	 var descVal1 = new Array();
	 descVal1.push($("#tipo").val());
	 
	 var descVal2 = new Array();
	 //descVal2.push("");
	 
	 var descVal3 = new Array();
	 //descVal3.push("");
	 
	 var descVal4 = new Array();
	 //descVal4.push("");
	 
	 var stock = new Array();
	 //stock.push("");
	
	 var numVal1 = new Array();
	 numVal1.push($("#num_val1").val())
	 
	 var numVal2 = new Array();
	 
	
	 var anySave = new AnywhereManager();
	 
	 var params = { a1: idUsuario,
			cliente: objAnywhere.getCliente(),
			cadena: objAnywhere.getCadena(),
			local: objAnywhere.getLocal(),
			categorias: JSON.stringify(cats),
			productos: JSON.stringify(prods),
			desc_val1: JSON.stringify(descVal1),
			desc_val2: JSON.stringify(descVal2),			
			desc_val3: JSON.stringify(descVal3),			
			desc_val4: JSON.stringify(descVal4),
			num_val1: JSON.stringify(numVal1),
			num_val2: JSON.stringify(numVal2),
			fec_val1: -1,
			fec_val2: -1,
			idstock: JSON.stringify(stock),
			latitud: posLatitud,
			longitud: posLongitud,
			point: null,
			comentario: $("#comentario").val(),  
			hiddenFotoUno: $("#hiddenFotoUno").val(),
			hiddenFotoDos: $("#hiddenFotoDos").val(),
			hiddenFotoTres: $("#hiddenFotoTres").val(),
			hiddenFotoCuatro: $("#hiddenFotoCuatro").val(),
			tipoAlerta:3,
			formulario_id: "A-003",
			formulario_alias: nombreModulo
		};
	 

	 var funcSuccess = function(data,status,jqXHR) { 
		 	if(data.success == true) {
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
		 	}
		 	else {
		 		var popup = new MasterPopup();
				popup.alertPopup(nombreModulo, "Ha ocurrido un error desconocido, inténtelo nuevamente o contacte a su administrador.");
				quiebreSaveInit = false;
		 	}
		};
	 
	 anySave.saveClaseWeb(true, "anywhere_movil_restanywhere", "OldSaveAlertas", "add", params, funcSuccess);	 
	 
}

/*

function internalSave_ModoSimple() {

	 var any = new Anywhere();
	 var vUrl = any.getWSAnywhere_context() + "services/alertasvarias/saveextendido2";
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
			desc_val4: nombreModulo,
			tipo: $("#tipo").val(),
			tipoAlerta:3,
		},
		function(data,status,jqXHR) { 
			var mensajeSave = "Información enviada correctamente";
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
*/
