var objAnywhere = null;
var posLatitud = null;
var posLongitud = null;
var pointAddress = null;
var shareofShelfSaveInit = false;

$('#shareofshelf_principal').bind( 'pagebeforecreate',function(event) {
	console.log("shareofshelf_principal");
	objAnywhere = new ObjAnyWhereCCL_CP({ "cacheclear":"yes",
										 
										 "cache1":"yes",
										 "cache2":"yes",
										 "cache3":"yes",
		
										 "omit4":"yes",
											
										 "theme5":"table",
		 								 "theme5.columna1.type" : "texto",
										 "theme5.columna2.type" : "radiomultiple",
										 "theme5.columna3.type" : "radiomultiple",
										 "theme5.columna4.type" : "radiomultiple",
										 
										 "theme5.columna0.visibility":false,
		 								 "theme5.columna1.visibility":false,
		 								 "theme5.columna2.visibility":false,
		 								 "theme5.columna3.visibility":false,
		 								 "theme5.columna4.visibility":false,
		 								 
		 								 "theme5.columna1.name":"",
										 "theme5.columna2.name":"",
										 "theme5.columna3.name":"",
										 "theme5.columna4.name":"",
										 
										 "system.producto.class":"required",
						
						});
	$("#combos").html(objAnywhere.getHtml());
	
	
	
});

$('#shareofshelf_principal').bind( 'pageshow',function(event) {
	console.log("[pageshow] shareofshelf.js");
	objAnywhere.loadClients();
});


function continueToMenu() {
	
};