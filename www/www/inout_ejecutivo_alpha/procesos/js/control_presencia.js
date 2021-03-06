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

var nombreModulo = "InOut - Procesos";

var NumeroVisita = [];
var NumeroTarea = [];
var NombreTarea = [];
var EstadoTarea = [];

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
			
											 "cache1":"yes",
											 "cache2":"yes",
											 "cache3":"yes",
			 
											 "disabled1":"no",
											 "disabled2":"no",
											 "disabled3":"no",
											 
											 "getCache1":"yes",
											 "getCache2":"yes",
											 "getCache3":"yes",
											 
											 "system.producto.class":"required",
											 
											 "omit4":"yes",
											 "omit5":"yes" 
										});
		
		$("#combos").html(objAnywhere.getHtml());
	}
});

$('#principal').bind( 'pageshow',function(event) {
	objAnywhere.loadClients();
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
			
			/*GUARDADO GLOBAL*/
			var map = new MapSQL("PRESENCIA");
			map.delAll(function() {
				map.add("idregistro", registro.idregistro);	
			})
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
					checkSiYaIngreso(false);
					$("#in").addClass("ui-disabled");
					$("#out").addClass("ui-disabled");
					$("#save").addClass("ui-disabled");
									
					guardaProtocolo();
										
					var popup = new MasterPopup();
					popup.alertPopup("Registro", "Informaci&oacute;n correctamente guardada.");
				};
				
				var mng = new AnywhereManager();
				if(evento == 2) {
					mng.saveClaseWeb(true,  "anywhere_movil_restanywhere", "Presencia", "upd", params, succ);
				}
				else {
					mng.saveClaseWeb(true,  "anywhere_movil_restanywhere", "Presencia", "add", params, succ);	
				}
				
			});
		}
		
	});
	var any = new Anywhere();
	$.ajax({ 
		type: "GET",
		dataType:"json",
		url: any.getWSAnywhere_context() + "services/p2s/querys/protocolo/" + sessionStorage.getItem("rutT") + "/" + objAnywhere.getCliente() + "/" + objAnywhere.getCadena() + "/" + objAnywhere.getLocal() ,
		/*sessionStorage.getItem("tmp")*/
		dataType:"json",
		crossDomain : true,
		success: function(data,status,jqXHR) {
			$.each(data, function(key, val) {
				$.each(val, function(key2, val2) {
					NumeroVisita.push(val2[0].value);
					NumeroTarea.push(val2[1].value);
					NombreTarea.push(val2[2].value);
					EstadoTarea.push(val2[3].value);					
				});
			});
			$("#tablaprotocolo").html(
					""
				+	"	<div align='middle'>"
				+	"		<p><strong>PROTOCOLO DE VISITAS</strong></p>"
				+	"		<p> Visita anterior : Nº " + NumeroVisita[0] + " </p>"
				+	" 	</div>"
				+	"<table align='middle' border='1'>"
				+   "   <tr> "
				+   " 		<td><strong>Actividad</strong></td>"
				+   " 		<td><strong>Estado de realización</strong></td>"
				+   "   </tr> "
				+   "   <tr> "
				+   " 		<td>" + NombreTarea[0] + "</td>"
				+   " 		<td>" + EstadoTarea[0] + "</td>"
				+   "   </tr> "
				+   "   <tr> "
				+   " 		<td>" + NombreTarea[1] + "</td>"
				+   " 		<td>" + EstadoTarea[1] + "</td>"
				+   "   </tr> "
				+   "   <tr> "
				+   " 		<td>" + NombreTarea[2] + "</td>"
				+   " 		<td>" + EstadoTarea[2] + "</td>"
				+   "   </tr> "
				+   "   <tr> "
				+   " 		<td>" + NombreTarea[3] + "</td>"
				+   " 		<td>" + EstadoTarea[3] + "</td>"
				+   "   </tr> "
				+   "   <tr> "
				+   " 		<td>" + NombreTarea[4] + "</td>"
				+   " 		<td>" + EstadoTarea[4] + "</td>"
				+   "   </tr> "
				+   "   <tr> "
				+   " 		<td>" + NombreTarea[5] + "</td>"
				+   " 		<td>" + EstadoTarea[5] + "</td>"
				+   "   </tr> "
				+   "</table> "
			);
			/*console.table(data);
			console.table(val);
			console.table(NombreTarea);*/
			if (data != null){
				//popup("Mensaje", "Resultados","#lista_protocolo");
				/*$(location).attr("href","#informe");*/
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
	       console.log("error : " + textStatus + "," + errorThrown);
	    }
	})
	
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
			num_val1:0,
		},
		
		function(data,status,jqXHR) { 
			/*
			var mensajeSave = "Registro de ingreso enviado correctamente";
			if(data != null) {
				if(data.dataFalsa == "dataFalsa") {
					mensajeSave = "Alerta sin conexion a Internet. Su informaci&oacute;n ser&aacute; guardada en el celular y apenas cuente con Internet usted debe reenviarla (ir al men&uacute; principal)";
				}
			}
			var popup = new MasterPopup();
			popup.alertPopup(nombreModulo, mensajeSave, {"funcYes":  function() {
			    $.mobile.changePage( "index.html", { transition: "flip"} );
			
			}});
			*/
		});
}

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
