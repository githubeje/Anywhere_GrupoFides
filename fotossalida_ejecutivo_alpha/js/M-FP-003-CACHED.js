/**
 * (M-FP-003) Selector Categoría, listado de Producto, Facing, precio, existe fleje (SI/NO)
 * 2015-05-11
 * */

var objAnywhere = null;
var posLatitud = null;
var posLongitud = null;
var pointAddress = null;
var shareofShelfSaveInit = false;
var nombreModulo = "3. Price & Share";

$(".titleTag").each(function() {
	$(this).html(nombreModulo);
});

$('#shareofshelf_principal').bind( 'pagebeforecreate',function(event) {
	console.log("shareofshelf_principal");
	
	restartCombosShareOfShelf();
	
});

function restartCombosShareOfShelf() {
	objAnywhere = new ObjAnyWhereCCL_CP({
		
		 "disabled1":"yes",
		 "disabled2":"yes",
		 "disabled3":"yes",
		 
		 "getCache1":"yes",
		 "getCache2":"yes",
		 "getCache3":"yes", 
		
		 "theme5":"table",
		 "theme5.columna2.visibility":true,
		 "theme5.columna3.visibility":true,
		 "theme5.columna1.name":"Facing",
		 "theme5.columna2.name":"Precio",
		 "theme5.columna3.name":"¿Es Promoción?",
		 "theme5.columna3.type":"truefalse",	
		 
		// "categorias.only":[410,411,412,413],
		 "system.producto.class":"required" });

	$("#combos").html(objAnywhere.getHtml());	
}

$('#shareofshelf_principal').bind( 'pageshow',function(event) {
	console.log("[pageshow] shareofshelf.js");
	objAnywhere.loadClients();
});


function saveShareOfShelf() {
	if(!shareofShelfSaveInit) {
		shareofShelfSaveInit = true;
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
			 shareofShelfSaveInit = false;
		 } 
		 
	}


	function internalSave2() {	
		
			internalSave3();
		
	}

	function internalSave3() {
			console.log("Sending");
			var cant = 0;
			var estado_gestion = 205;
			var any = new Anywhere();
			var vUrl = any.getWSAnywhere_context() + "dispatcher?m=iposfacingextendido2&c=Facing";
			var cantOk    = 0;
			var cantError = 0;
			var cantTotal = $("input[name='id']").length;
			var map = new MapSQL("SHAREOFSHELF_MFP003");
			
			$("input[name='id']").each(function(k,v){
				var json = localStorage.getItem("precio");
				if(json == null) {
					json = "{}";
				}
				var json = JSON.parse(json);
				json["col1"] = $("#pNormal_"+$(v).val()).val();
				json["col2"] = $("#pTarjeta_"+$(v).val()).val();
				json["col3"] = $("#pColumna3_"+$(v).val()).val();
				
				map.add($(v).val(),JSON.stringify(json), 
						function() {
					
							var dataForm = { idCliente:objAnywhere.getCliente(),
									 idCadena:objAnywhere.getCadena(),
									 idLocal:objAnywhere.getLocal(),
										 idCategoria:objAnywhere.getCategoria(),
										 idProducto: $(v).val(),
									 a5: $("#pNormal_"+$(v).val()).val(), //CARAS
									 precio: $("#pTarjeta_"+$(v).val()).val(), //PRECIO
									 fleje: $("#pColumna3_"+$(v).val()).val(), //FLEJE
									 tipoFormulario: "facing_precios",
									 a7:fecha.value,
									 a8:facingImage,
									 a9:estado_gestion,
									 address : pointAddress,
									 latitud : posLatitud,
									 longitud : posLongitud,
									 idUsuario : sessionStorage.getItem("rutT") };
			
			
			
							var anySave = new AnywhereManager();
							anySave.save(vUrl, dataForm,
									function(data,status,jqXHR) {
										cantOk+=1;				
									},
									function() {
										cantError+=1;
									},
									function() {
										cant=cant+1;
										console.log("Sending "+cant);
										
										console.log(cantTotal + " = "+ (cantOk + cantError ) );
										if(cantTotal == (cantOk + cantError ) ) {
											var popup = new MasterPopup();
											popup.alertPopup("Facing & Precios", "Datos guardados correctamente", {"funcYes":  function() {
											    $.mobile.changePage("index.html", { transition: "flip"} );
											
											}});
										}
									},
									false);
			
						});
		});
	}
	