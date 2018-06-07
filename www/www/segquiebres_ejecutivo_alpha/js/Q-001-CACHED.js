var objAnywhere = null;
var facingSaveInit = false;
var nombreModulo = "2. OOS";

$(".titleTag").each(function() {
	$(this).html(nombreModulo);
});

$('#precio_principal').bind( 'pagebeforecreate',function(event) {
	console.log("precio_principal");
	
	objAnywhere = new ObjAnyWhereCCL_CP({
										 "disabled1":"yes",
										 "disabled2":"yes",
										 "disabled3":"yes",
										 
										 "getCache1":"yes",
										 "getCache2":"yes",
										 "getCache3":"yes", 
		 
										 "theme5":"table",
										 "theme5.columna1.name":"Hay<br/>Producto",
										 "theme5.columna2.name":"En<br/>Riesgo",
										 "theme5.columna3.name":"Quiebre",
										 "theme5.columna4.name":"No<br/>Clusterizado",
										 
										 "theme5.columna1.visibility":true,
										 "theme5.columna2.visibility":true,
										 "theme5.columna3.visibility":true,
										 "theme5.columna4.visibility":true,
										 
										 "theme5.columna1.type":"radio",
										 "theme5.columna2.type":"radio",
										 "theme5.columna3.type":"radio",
										 "theme5.columna4.type":"radio",
										 
										 //"categorias.only":[414,415,416,417],
										 "system.producto.class":"required"});
	
	
	$("#combos").html(objAnywhere.getHtml());

});

$('#precio_principal').bind( 'pageshow',function(event) {
	console.log("[pageshow] precios.js");
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
				 
				 internalSave2();
			 }
			 else {
				 var popup = new MasterPopup();
				 popup.alertPopup(nombreModulo, "Debes completar todos los datos en rojo");
				 facingSaveInit = false;
			 } 
		}
		
		function internalSave2() {
			
			
			var cantOk    = 0;
			var cantError = 0;
			var cantTotal = $("input[name='id']").length;
			var any = new Anywhere();
			var vUrl = any.getWSAnywhere_context() + "services/cargamasivastock/save";
			var anySave= new AnywhereManager();
			
			$("input[name='id']").each(function(k,v){
				var id = $(this).val();				
				var json = localStorage.getItem("precio");
				if(json == null) {
					json = "{}";
				}
				var json = JSON.parse(json);
				
				
				json["pNormal_"+$(v).val()]  = $("#pNormal_"+$(v).val()).val();
				json["pTarjeta_"+$(v).val()] = $("#pTarjeta_"+$(v).val()).val();
 
				var pos = 1;
				var okValue = -1;
				console.log("Cant de Existencias:"+$("input[name=row_"+id+"]").length );
				$("input[name=row_"+id+"]").each(function(k,v) {
					console.log( "CHECKED-->" + $(this).attr("checked")  );
					if( $(this).attr("checked") == "checked" ) {
						okValue = pos;
					}
					pos++;
				});
				
				var params = {a1  : sessionStorage.getItem("rutT"),
					     a2  : objAnywhere.getCliente(),
					     a3  : id,
					     a4  : "0", 
						 a5  : "",
						 a6  : "",
						 a7  : "", 
						 a8  : objAnywhere.getCategoria(),
						 a9  : "",
						 a10 : okValue,
						 a11 : 0,
						 a12 : objAnywhere.getCadena(),
						 a13 : objAnywhere.getLocal()
					};
				
				anySave.save(vUrl, params , 
					function() {
						
					}
					,
					function() {
						
					},
					function(data,status,jqXHR) {
						console.log("TerminoC_ "+cantOk);
						cantOk+=1;			
						
						if(cantTotal == (cantOk + cantError ) ) {
							var popup = new MasterPopup();
							popup.alertPopup(nombreModulo, "Datos guardados correctamente", {"funcYes":  function() {
							    $.mobile.changePage( "index.html", { transition: "flip"} );
							}});
						}
					});
			});
			
			
		}