/**
 * Versión 2.0.1
 * Fecha: 2016-04-26
 * Francisco
 * */

var evento = "-1";
var fecha_inicio = [];
var hora_inicio = [];
var fecha_termino = [];
var hora_termino = [];
var direccionx = [];
var idregistro=null;

var facingImage = "";
var posLatitud = null;
var posLongitud = null;
var pointAddress = null;

var objAnywhere = null;

var NumeroVisitaOut = [];
var NumeroTareaOut = [];
var NombreTareaOut = [];
var EstadoTareaOut = [];

var idCliente = [];
var idCadena = [];
var idLocal = [];

$("#principal").live("pageshow",function() {
	var geo = new GeoGlobal();
	geo.refreshGeo(function(lat, lo) {
		posLatitud = lat;
		posLongitud = lo;

	}, function(point) {
		pointAddress = point;
	});
	
	checkSiYaIngreso(true);
});

$('#principal').bind( 'pagebeforecreate',function(event) {
	if(objAnywhere == null) {
		objAnywhere = new ObjAnyWhereCCL_CP({
											"hide1":true,
											"hide2":true,
											"hide3":true,
			 
											"disabled1":"no",
											"disabled2":"no",
											"disabled3":"no",
											 
											 "getCache1":"yes",
											 "getCache2":"yes",
											 "getCache3":"yes",
											 
											 "system.producto.class":"required",
											 "system.producto.class":"required",
											 "omit4":"yes",
											 "omit5":"yes" 
										});
		
		$("#combos").html(objAnywhere.getHtml());
	}
});

$('#principal').bind( 'pageshow',function(event) {
	objAnywhere.loadClients();
	var any = new Anywhere();
	/*
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
	*/
});


function checkSiYaIngreso(cambiaEstados) {
	var util = new InOutUtils();
	util.isInside(function(inside, registro) {
		
		if(inside) {
			$("#regHoraIncio").html("[" + registro.horaingreso + "]");
			
			if(cambiaEstados) {
				$("#in").addClass("ui-disabled");
				$("#out").removeClass("ui-disabled");
			}
			evento="2";
			
 
		}
		else {
			$("#regHoraIncio").html("");
			evento="1";
			
			if(cambiaEstados) {
				$("#out").addClass("ui-disabled");
				$("#in").removeClass("ui-disabled");
			}
		}
	});
}

$("#save").live("click",function() {
	var login = new Login();
	login.getUsuario(function(user) {
		if( posLatitud == -1 || posLongitud == -1) {
			console.log(posLatitud + " " + posLongitud);
			
			var popup = new MasterPopup();
			popup.alertPopup("GPS", "Aún no ha sido posible capturar la ubicación. Ubique una zona despejada o espere unos segundos para intentarlo nuevamente.");
		}
		else {
			var map = new MapSQL("PRESENCIA");
			map.get("idregistro",function(value) {
				console.log(value);
				var now = moment(new Date());

				var params =  { idUsuario:JSON.stringify(user),					
								evento:evento,					
							    fecha:now.format("YYYY/DD/MM"),			
								hora:now.format("HH:mm:ss"),	
								latitud:posLatitud,		
								longitud:posLongitud,		
								punto:pointAddress,  	
								imagen:facingImage,			
								idregistro:value.data,	
								estado_gestion: 205	};
				
				var succ = function(data,status,jqXHR) { 
					var inout = new InOutUtils();
					inout.setOut();
					
					checkSiYaIngreso(false);
					$("#in").addClass("ui-disabled");
					$("#out").addClass("ui-disabled");
					$("#save").addClass("ui-disabled");
					
					var popup = new MasterPopup();
					popup.alertPopup("Registro", "Informaci&oacute;n correctamente guardada.");
					
					var act = new Activity();
					act.getActivityThisVisita("#tablaprotocolo2");
					
				};
				
				var mng = new AnywhereManager();
				if(evento == 2) {
					params["success"] = succ;
					mng.saveClaseWeb(true,  "anywhere_movil_restanywhere", "Presencia", "upd", params );
				}
				else {
					mng.saveClaseWeb(true,  "anywhere_movil_restanywhere", "Presencia", "add", params );	
				}
				
			});
		}

	});
	/*
	var any = new Anywhere();
	$.ajax({ 
		type: "GET",
		dataType:"json",
		url: any.getWSAnywhere_context() + "services/p2s/querys/protocoloactual/" + sessionStorage.getItem("rutT") + "/" + objAnywhere.getCliente() + "/" + objAnywhere.getCadena() + "/" + objAnywhere.getLocal() ,
//		 sessionStorage.getItem("tmp") 
		dataType:"json",
		crossDomain : true,
		success: function(data,status,jqXHR) {
			$.each(data, function(key, val) {
				$.each(val, function(key2, val2) {
					NumeroVisitaOut.push(val2[0].value);
					NumeroTareaOut.push(val2[1].value);
					NombreTareaOut.push(val2[2].value);
					EstadoTareaOut.push(val2[3].value);					
				});
			});
			$("#tablaprotocolo2").html(
					""
				+	"	<div align='middle'>"
				+	"		<p><strong>PROTOCOLO DE VISITAS</strong></p>"
				+	"		<p> Visita actual : Nº " + NumeroVisitaOut[0] + " </p>"
				+	" 	</div>"
				+	"<table align='middle' border='1'>"
				+   "   <tr> "
				+   " 		<td><strong>Actividad</strong></td>"
				+   " 		<td><strong>Estado de realización</strong></td>"
				+   "   </tr> "
				+   "   <tr> "
				+   " 		<td>" + NombreTareaOut[0] + "</td>"
				+   " 		<td>" + EstadoTareaOut[0] + "</td>"
				+   "   </tr> "
				+   "   <tr> "
				+   " 		<td>" + NombreTareaOut[1] + "</td>"
				+   " 		<td>" + EstadoTareaOut[1] + "</td>"
				+   "   </tr> "
				+   "   <tr> "
				+   " 		<td>" + NombreTareaOut[2] + "</td>"
				+   " 		<td>" + EstadoTareaOut[2] + "</td>"
				+   "   </tr> "
				+   "   <tr> "
				+   " 		<td>" + NombreTareaOut[3] + "</td>"
				+   " 		<td>" + EstadoTareaOut[3] + "</td>"
				+   "   </tr> "
				+   "   <tr> "
				+   " 		<td>" + NombreTareaOut[4] + "</td>"
				+   " 		<td>" + EstadoTareaOut[4] + "</td>"
				+   "   </tr> "
				+   "   <tr> "
				+   " 		<td>" + NombreTareaOut[5] + "</td>"
				+   " 		<td>" + EstadoTareaOut[5] + "</td>"
				+   "   </tr> "
				+   "</table> "
			);
			console.table(data);
			console.log(NombreTareaOut);
			if (data != null){
				//popup("Mensaje", "Resultados","#lista_protocolo");
//				$(location).attr("href","#informe");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			 console.log("error : " + textStatus + "," + errorThrown);
	    }
	})
	*/
	
});

 
$("#filtro_presencia").live("pageshow",function() {
	fecha_inicio = [];
	hora_inicio = [];
	fecha_termino = [];
	hora_termino = [];
	direccionx = [];	
});

$("#search").live("click", function() {
	var any = new Anywhere();
	var vUrl = any.getWSAnywhere_context() + "services/p2s/querys/informepresencia/";

	fi = moment($("#fecha_inicio").val(),"DD/MM/YYYYY").format("YYYY-DD-MM");
	ft = moment($("#fecha_termino").val(),"DD/MM/YYYYY").format("YYYY-DD-MM");
	$.getJSON(vUrl + fi + "/" + ft ,{},
		function(data) {
			$.each(data, function(key, val) {
				$.each(val, function(key2, val2) {
					fecha_inicio.push(val2[0].value);
					hora_inicio.push(val2[1].value);
					fecha_termino.push(val2[2].value);
					hora_termino.push(val2[3].value);
					direccionx.push(val2[4].value);					
				});
			});
			if (data == null || data == ''){
				popup("Mensaje", "La busqueda realizada no tiene resultados","#filtro_presencia");
			}
			else {
				$(location).attr("href","#informe");
			}
	});
});

$("#informe").live("pageshow",function() {
	columna1 =  '<div class="ui-block-a" style="background-color:#CCCCCC;font-weight:bold;text-align:left">Fecha Ingreso</div>';
	columna2 =  '<div class="ui-block-b" style="background-color:#CCCCCC;font-weight:bold;text-align:center">Hora Ingreso</div>';
	columna3 =  '<div class="ui-block-c" style="background-color:#CCCCCC;font-weight:bold;text-align:center">Fecha Salida</div>';
	columna4 =  '<div class="ui-block-d" style="background-color:#CCCCCC;font-weight:bold;text-align:center">Hora Salida</div>';
	columna5 =  '<div class="ui-block-e" style="background-color:#CCCCCC;font-weight:bold;text-align:center">Ubicaci&oacute;n  Salida</div>';
	contenido = "";
	var x;
	for(x=0;x<fecha_inicio.length;x++) {
		contenido = contenido + '<div class="ui-block-a" style="background-color:#EEEEEE;text-align:left">' + fecha_inicio[x] + '</div>';
		contenido = contenido + '<div class="ui-block-b" style="background-color:#EEEEEE;text-align:center">' + hora_inicio[x] + '</div>'; 
		contenido = contenido + '<div class="ui-block-c" style="background-color:#EEEEEE;text-align:center">' + fecha_termino[x] + '</div>';		
		contenido = contenido + '<div class="ui-block-d" style="background-color:#EEEEEE;text-align:center">' + hora_termino[x] + '</div>';		
		contenido = contenido + '<div class="ui-block-e" style="background-color:#EEEEEE;text-align:center">' + direccionx[x] + '</div>';	
	}
	$("div.ui-grid-d").html(columna1 + columna2 + columna3 + columna4 + columna5 + contenido);
});

onPhotoDataSuccess_Facing_In = function(imageData) {
	var captureStock = document.getElementById("captureFacing");
	captureStock.style.display = "block";
	captureStock.src = "data:image/jpeg;base64," + imageData;
	facingImage = imageData;
	superPopup("poderPehuenche",'Mensaje','Foto Registro Ingreso tomada');
};

onPhotoDataSuccess_Facing_Out = function(imageData) {
	var captureStock = document.getElementById("captureFacing");
	captureStock.style.display = "block";
	captureStock.src = "data:image/jpeg;base64," + imageData;
	facingImage = imageData;
	superPopup("poderPehuenche",'Mensaje','Foto Registro Salida tomada');
};


function clickIn() {
	capturePhoto(onPhotoDataSuccess_Facing_In);
	
	$("#save").removeClass("ui-disabled");
}

function clickOut() {
	capturePhoto(onPhotoDataSuccess_Facing_Out);
	
	$("#save").removeClass("ui-disabled");
}
