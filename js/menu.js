

var idApp = "8";
var config = new Config();
//var senderId = "714500947627";
var senderId = config.getIdSender()
var idUsuario = sessionStorage.getItem("tmp");
var latitud;
var longitud;
var direccion;
var idMessage;
var pushNotification;
var typeDevice = null;
var idDevice;
var pictureSource; 
var destinationType;
var facingImage = "";
var registred = false;


var Menu = function() {
	this.loadZonas = function() {
	 
		var cluster = new Cluster();
		var menuObject0 = this;
		cluster.getClientes(function(clienteDelUsuario) {
			
			var clienteACargar = null;
			var confPre = new Config();
 			
			if(( clienteDelUsuario.id == confPre.getUnicClient() || confPre.getUnicClient() == "*" )) {
				clienteACargar = (clienteDelUsuario);
			}
			
			if(clienteACargar == null) {
				var popup = new MasterPopup();
				popup.alertPopup("Error",
						"El usuario que est&aacute;s ingresando no est&aacute; habilitado para esta aplicaci&oacute;n", 
						{"funcYes" : function() {  navigator.app.exitApp();  }});
			}
			else {
				/* ANTES DE CARGAR LOS BOTONES PREGUNTA SI ESTÁ DENTRO*/
				/* CRITICO */
				
				var conf = new ConfigPostLogin();
				var menuObject = menuObject0;
				
				conf.solicitarIngresoInOutObligatorio(function(isInOutActivate) {
					console.log("IntOut ISACTIVE:"+isInOutActivate);
					if(isInOutActivate) {
						var ioUtil = new InOutUtils();
						ioUtil.isInside(function(inside,registro) {
							var json = menuObject.getButtonDefault(inside);
							json["inout"] = true;
							
							menuObject.loadZonas_etapa2(clienteACargar, inside, json);
							
							var map = new MapSQL("PRESENCIA");
							map.delAll(function() {
								map.add("idregistro", registro.idregistro);	
							})
						});
					}
					else {
						var json = menuObject.getButtonDefault(true);
						menuObject.loadZonas_etapa2(clienteACargar, null, json);
					}
				});
			}
		});
		

 
		
		
		
		
		 
	};
	
	this.getButtonDefault = function(valDefault) {
		var jsonEnableButtons = {};
		jsonEnableButtons["inout"] = valDefault;
		jsonEnableButtons["stepstep"] = valDefault;
		jsonEnableButtons["agenda"] = valDefault;
		jsonEnableButtons["ipos"] = valDefault;
		jsonEnableButtons["imarket"] = valDefault;
		jsonEnableButtons["imarker"] = valDefault;
		jsonEnableButtons["generatorform"] = valDefault;
		jsonEnableButtons["locator"] = valDefault;
		jsonEnableButtons["enrolamiento"] = valDefault;
		jsonEnableButtons["fotosentrada"] = valDefault;
		jsonEnableButtons["preciosyfacing"] = valDefault;
		jsonEnableButtons["stepstep"] = valDefault;
		jsonEnableButtons["facing"] = valDefault;
		jsonEnableButtons["alertas"] = valDefault;
		jsonEnableButtons["quiebres"] = valDefault;
		jsonEnableButtons["fotossalida"] = valDefault;
		jsonEnableButtons["out"] = valDefault;
		
		
		return jsonEnableButtons;
	}
	
	this.loadZonas_etapa2 =function(localClientes, inside, jsonEnableButtons) {
		var any = new AnywhereManager();
		var modulos = new Array();
		var log = new Log();
		
		$("#listaBotones").html("");
		
		var cluster = new Cluster();
		cluster.getModulos(function(modulos) {
			var menu = new Menu();
			
			$.each(modulos, function(k,v) {
				menu.addBoton(v.idproducto , true, "283" , localClientes.id , jsonEnableButtons);
			});
			
			$("#listaBotones").listview("refresh");
		});
		
	};
	
	this.getRol = function(rol) {
		if( rol == "281" ) {
			return "kam";
		}
		else if (rol == "282") {
			return "kamaccount";
		}
		else if (rol == "283") {
			return "ejecutivo";
		}
	};
	
	this.getCliente = function(cliente) {
		console.log(cliente);
		
		if ( cliente == "2") {	
			return "Playstation";
		}					
		else if ( cliente == "4") {
			return "Sony";
		}
		else if ( cliente == "6") {
			return "Mars";
		}
		else if ( cliente == "7") {
			return "Tesa";
		}
		else if ( cliente == "8") {
			return "Sofruco";
		}
		else if ( cliente == "9") {
			return "Whirlpool";
		}
		else if ( cliente == "10") {
			return "Epson";
		}
		else if ( cliente == "11") {
			return "Sika";
		}
		else if ( cliente == "12") {
			return "Redbull";
		}
		else if ( cliente == "13") {
			return "Burstbee";
		}
		else if ( cliente == "14") {
			return "MarsTT";
		}
		else if ( cliente == "15") {
			return "PyGTT";
		}
		else if ( cliente == "16") {
			return "Embonor";
		}
		else if ( cliente == "17") {
			return "Agrosuper";
		}
		else if ( cliente == "18") {
			return "LeGrand";
		}
		else if ( cliente == "19") {
			return "Petrizzio";
		}
		else if ( cliente == "20") {
			return "AgrosuperTM";
		}
		else if ( cliente == "21") {
			return "PyG_Rep";
		}
		else if ( cliente == "22") {
			return "MarsChoco - MALO NO OSE OCUPA";
		}
		else if ( cliente == "23") {
			return "MarsChoco";
		}
		else if ( cliente == "24") {
			return "KimberlyClark";
		}
		else if ( cliente == "25") {
			return "MarsChocoMerca";
		}
		else if ( cliente == "26") {
			return "Sika";
		}
		else if ( cliente == "27") {
			return "Adidas";
		}
		else if ( cliente == "28") {
			return "Nestle";
		}
		else if ( cliente == "29") {
			return "Duracell";
		}
		else if ( cliente == "30") {
			return "NestleSupervisores";
		}
		else if ( cliente == "31") {
			return "Abbott";
		}
		else if ( cliente == "32") {
			return "Sony_";
		}
		else if ( cliente == "33") {
			return "alpha";
		}
		else if ( cliente == "97") {
			return "any2016";
		}
		else if ( cliente == "99") {
			return "Demo";
		}
		else {
			return "sincliente";
		}
		
	};
	
	this.addBoton = function(idmodulo, activo, idrol, idcliente, jsonEnableButtons) {
			var rol = this.getRol(idrol);
			var cliente = this.getCliente(idcliente);
			console.log("CLIENTE:"+cliente);
			
			if ( idmodulo == "1") {		 		return this.addBoton_inout(activo, rol, cliente, jsonEnableButtons.inout);
			}
			else if ( idmodulo == "2") {
				return this.addBoton_fotosentrada(activo, rol, cliente, jsonEnableButtons.stepstep);
			}
			else if ( idmodulo == "3") {
				return this.addBoton_preciosyfacing(activo, rol, cliente, jsonEnableButtons.preciosyfacing);
			}
			else if ( idmodulo == "4") {
				return this.addBoton_flejes(activo, rol, cliente, jsonEnableButtons.ipos);
			}
			else if ( idmodulo == "5") {
				return this.addBoton_alertas(activo, rol, cliente, jsonEnableButtons.alertas);
			}
			else if ( idmodulo == "6") {
				return this.addBoton_quiebres(activo, rol, cliente, jsonEnableButtons.quiebres);
			}
			else if ( idmodulo == "7") {
				return this.addBoton_stepstep(activo, rol, cliente, jsonEnableButtons.stepstep);
			}
			else if ( idmodulo == "8") {
				return this.addBoton_fotossalida(activo, rol, cliente, jsonEnableButtons.fotossalida);
			}
			else if ( idmodulo == "9") {
				return this.addBoton_out(activo, rol, cliente, jsonEnableButtons.out);
			}
			/*
			else if ( idmodulo == "10") {
				return this.addBoton_enrolamiento(activo, rol, cliente, jsonEnableButtons.enrolamiento);
			}
			else if ( idmodulo == "11") {
				return this.addBoton_enrolamiento(activo, rol, cliente, jsonEnableButtons.enrolamiento);
			}
			else if ( idmodulo == "12") {
				return this.addBoton_enrolamiento(activo, rol, cliente, jsonEnableButtons.enrolamiento);
			}
			else if ( idmodulo == "13") {
				return this.addBoton_enrolamiento(activo, rol, cliente, jsonEnableButtons.enrolamiento);
			}
			*/
	};
	
	this.addBoton_inout = function(activo, rol, cliente, enabled) {
		var strDisabled = "";
		if(enabled != true) {
			strDisabled = "class='ui-disabled'";
		}
		
		var htm = "";
		htm += " <li "+strDisabled+"> ";
		
		if(activo == true) {
			htm += " 	<a href='inout_"+rol+"_"+cliente+"/procesos/index.html' data-transition='flip' > ";
		}
		else {
			htm += " 	<a href='javascript:;' onclick='var popup = new MasterPopup(); popup.alertPopup(\"Anywhere\",\"M&#243;dulo desactivado\"); ' > ";		
		}
		 
		htm += " 		<img width='96'src='icons/MenuIcon/01-IN.png'> "; 
		htm += " 		<h2>IN "+cliente+"</h2><p>Registro de entrada</p> "; 
		htm += " 	</a> "; 
		htm += " </li> ";
			
		$("#listaBotones").append(htm);
	};
	
	
	this.addBoton_stepstep = function(activo, rol, cliente, enabled) {
		var strDisabled = "";
		if(enabled != true) {
			strDisabled = "class='ui-disabled'";
		}
		
		var htm = "";
		htm += " <li id='modulo2' "+strDisabled+"> "; 
		//htm += " <li id='modulo1' style='display:none' "+strDisabled+">  ";
		//htm += " 	<a href='step/index.html' rel='external'> ";
		
		if(activo == true) {
			htm += " 	<a href='segquiebres_ejecutivo_alpha/index.html' data-transition='flip' > ";
		}
		else {
			htm += " 	<a href='javascript:;' onclick='var popup = new MasterPopup(); popup.alertPopup(\"Anywhere\",\"M&#243;dulo desactivado\"); ' > ";		
		}
		
		htm += " 		<img width='96'src='icons/MenuIcon/02-STEPSTEP.png'> ";
		htm += " 			<h2>Seguimiento de quiebres</h2><p>Seguimiento de los motivos de quiebre de un producto</p> "; 
		htm += " 	</a> "; 
		htm += " </li>";
		
		$("#listaBotones").append(htm);
	};
	
	this.addBoton_flejes = function(activo, rol, cliente, enabled) {
		var strDisabled = "";
		if(enabled != true) {
			strDisabled = "class='ui-disabled'";
		}
		
		var htm = "";
		htm += " <li id='modulo2' "+strDisabled+"> "; 

		if(activo == true) {
			htm += " 	<a href='flejes_"+rol+"_"+cliente+"/procesos/planilla_por_sala.html' data-transition='flip' > ";
		}
		else {
			htm += " 	<a href='javascript:;' onclick='var popup = new MasterPopup(); popup.alertPopup(\"Anywhere\",\"M&#243;dulo desactivado\"); ' > ";		
		}
		
		htm += " 		<img width='96'src='icons/MenuIcon/05-FLEJE.png'> ";
		htm += " 			<h2>Flejes</h2><p>Registro de flejes</p> "; 
		htm += " 	</a>"; 
		htm += " </li>";
		
		$("#listaBotones").append(htm);
	};
	this.addBoton_alertas = function(activo, rol, cliente, enabled) {
		var strDisabled = "";
		if(enabled != true) {
			strDisabled = "class='ui-disabled'";
		}
		
		var htm = "";
		htm += " <li id='modulo2' "+strDisabled+"> ";
		
		if(activo == true) {
			htm += " 	<a href='alertas_"+rol+"_"+cliente+"/index.html' data-transition='flip' > ";
		}
		else {
			htm += " 	<a href='javascript:;' onclick='var popup = new MasterPopup(); popup.alertPopup(\"Anywhere\",\"M&#243;dulo desactivado\"); ' > ";		
		}
		
		htm += " 		<img width='96'src='icons/MenuIcon/06-ALERTA.png'> ";
		htm += " 			<h2>Alertas</h2><p>Registro de alertas</p> "; 
		htm += " 	</a>"; 
		htm += " </li>";
		
		$("#listaBotones").append(htm);
	};
	this.addBoton_quiebres = function(activo, rol, cliente, enabled) {
		var strDisabled = "";
		if(enabled != true) {
			strDisabled = "class='ui-disabled'";
		}
		
		var htm = "";
		htm += " <li id='modulo2' "+strDisabled+"> "; 

		if(activo == true) {
			htm += " 	<a href='quiebres_"+rol+"_"+cliente+"/index.html' data-transition='flip' > ";
		}
		else {
			htm += " 	<a href='javascript:;' onclick='var popup = new MasterPopup(); popup.alertPopup(\"Anywhere\",\"M&#243;dulo desactivado\"); ' > ";		
		}
		
		htm += " 		<img width='96'src='icons/MenuIcon/07-QUIEBRE.png'> ";
		htm += " 			<h2>Quiebres</h2><p>Registro de quiebres</p> "; 
		htm += " 	</a>"; 
		htm += " </li>";
		
		$("#listaBotones").append(htm);
	};
	this.addBoton_preciosyfacing = function(activo, rol, cliente, enabled) {
		var strDisabled = "";
		if(enabled != true) {
			strDisabled = "class='ui-disabled'";
		}
		
		var htm = "";
		htm += " <li id='modulo2' "+strDisabled+"> "; 

		if(activo == true) {
			htm += " 	<a href='preciosyfacing_"+rol+"_"+cliente+"/procesos/index.html' data-transition='flip' > ";
		}
		else {
			htm += " 	<a href='javascript:;' onclick='var popup = new MasterPopup(); popup.alertPopup(\"Anywhere\",\"M&#243;dulo desactivado\"); ' > ";		
		}
		
		htm += " 		<img width='96'src='icons/MenuIcon/04-PRE_FAC.png'> ";
		htm += " 			<h2>Precios y facing</h2><p>Registro de precios y facing</p> "; 
		htm += " 	</a>"; 
		htm += " </li>";
		
		$("#listaBotones").append(htm);
	};
	
	this.addBoton_fotosentrada = function(activo, rol, cliente, enabled) {
		var strDisabled = "";
		if(enabled != true) {
			strDisabled = "class='ui-disabled'";
		}
		
		var htm = "";
		htm += " <li id='modulo2' "+strDisabled+"> "; 

		if(activo == true) {
			htm += " 	<a href='fotosentrada_"+rol+"_"+cliente+"/index.html' data-transition='flip' > ";
		}
		else {
			htm += " 	<a href='javascript:;' onclick='var popup = new MasterPopup(); popup.alertPopup(\"Anywhere\",\"M&#243;dulo desactivado\"); ' > ";		
		}
		
		htm += " 		<img width='96'src='icons/MenuIcon/03-F_ENTR.png'> ";; 
		htm += " 			<h2>Fotos de entrada</h2><p>Registro de imagenes de entrada en g&oacute;ndolas</p> "; 
		htm += " 	</a>"; 
		htm += " </li>";
			
		$("#listaBotones").append(htm);
	};
	
	this.addBoton_fotossalida = function(activo, rol, cliente, enabled) {
		var strDisabled = "";
		if(enabled != true) {
			strDisabled = "class='ui-disabled'";
		}
		
		var htm = "";
		htm += " <li id='modulo2' "+strDisabled+" > "; 

		if(activo == true) {
			htm += " 	<a href='fotossalida_"+rol+"_"+cliente+"/index.html' data-transition='flip' > ";
		}
		else {
			htm += " 	<a href='javascript:;' onclick='var popup = new MasterPopup(); popup.alertPopup(\"Anywhere\",\"M&#243;dulo desactivado\"); ' > ";		
		}
		
		htm += " 		<img width='96'src='icons/MenuIcon/08-F_SAL.png'> ";
		htm += " 			<h2>Fotos de salida</h2><p>Registro de imagenes de salida en góndolas</p> "; 
		htm += " 	</a>"; 
		htm += " </li>";
		
		$("#listaBotones").append(htm);
	};
	
	this.addBoton_out = function(activo, rol, cliente, enabled) {
		var strDisabled = "";
		if(enabled != true) {
			strDisabled = "class='ui-disabled'";
		}
		
		var htm = "";
		htm += " <li "+strDisabled+"> ";
		
		if(activo == true) {
			htm += " 	<a href='out_"+rol+"_"+cliente+"/procesos/index.html' data-transition='flip' > ";
		}
		else {
			htm += " 	<a href='javascript:;' onclick='var popup = new MasterPopup(); popup.alertPopup(\"Anywhere\",\"M&#243;dulo desactivado\"); ' > ";		
		}
		 
		htm += " 		<img width='96'src='icons/MenuIcon/09-OUT.png'> "; 
		htm += " 		<h2>OUT "+cliente+"</h2><p>Registro de salida</p> "; 
		htm += " 	</a> "; 
		htm += " </li> ";
			
		$("#listaBotones").append(htm);
	};
	
	this.addBoton_ipos = function(activo, rol, cliente, enabled) {
		var strDisabled = "";
		if(enabled != true) {
			strDisabled = "class='ui-disabled'";
		}
		
		var htm = "";
		htm += " <li "+strDisabled+"> ";
		
		if(activo == true) {
			htm += " 	<a href='ipos_"+rol+"_"+cliente+"/procesos/index.html' data-transition='flip'  > ";
		}
		else {
			htm += " 	<a href='javascript:;' onclick='var popup = new MasterPopup(); popup.alertPopup(\"Anywhere\",\"M&#243;dulo desactivado\"); ' > ";		
		}
		 
		htm += " 		<img src='icons/ipos.png'> "; 
		htm += " 		<h2>IPos "+cliente+"</h2><p>Aplicaci&oacute;n m&oacute;vil de apoyo a la gesti&oacute;n de fuerzas de ventas</p> "; 
		htm += " 	</a> "; 
		htm += " </li> ";
			
		$("#listaBotones").append(htm);
	}; 
	
	
	
	this.addBoton_imarket = function(activo, rol, cliente, enabled) {
		var strDisabled = "";
		if(enabled != true) {
			strDisabled = "class='ui-disabled'";
		}
		
		var htm = "";
		htm += "<li "+strDisabled+">";
		
		if(activo == true) {
			htm += " 	<a href='imarket_"+rol+"_"+cliente+"/index.html' data-transition='flip' > ";
		}
		else {
			htm += " 	<a href='javascript:;' onclick='var popup = new MasterPopup(); popup.alertPopup(\"Anywhere\",\"M&#243;dulo desactivado\"); ' > ";	
		}
		
		htm += "		<img src='icons/imarket.png'> "; 
		htm += "			<h2>IMarket "+cliente+"</h2><p>Aplicaci&oacute;n m&oacute;vil para recolecci&oacute;n de informaci&oacute;n de la competencia</p> "; 
		htm += "	</a> "; 
		htm += "</li>";
		
		$("#listaBotones").append(htm);
	};
	
	this.addBoton_imarker = function(activo, rol, cliente, enabled) {
		var strDisabled = "";
		if(enabled != true) {
			strDisabled = "class='ui-disabled'";
		}
		
		var htm = "";
		htm+= "	<li id='modulo6' "+strDisabled+"> "; 
		htm+= "		<a href='imarker/index.html' rel='external'> "; 
		htm+= "			<img src='icons/imarker.png'> "; 
		htm+= "				<h2>IMarker</h2><p>Aplicaci&oacute;n para el marcado de puntos georeferenciados</p> "; 
		htm+= "		</a> "; 
		htm+= "	</li> ";
		$("#listaBotones").append(htm);
	};
	
	this.addBoton_generatorform = function(activo, rol, cliente, enabled) {
		var strDisabled = "";
		if(enabled != true) {
			strDisabled = "class='ui-disabled'";
		}
		
		var htm = "";
		htm+= "	 <li id='modulo7_ejecutivo' "+strDisabled+"> ";
		htm+= "	 <a href='generator_ejecutivo/lista.html' rel='external'> ";
		htm+= "	 <img src='icons/generator.png'>  ";
		htm+= "	 			<h2>GeneratorForm-Gestor</h2><p>Repositorio de Formularios de trabajos</p> "; 
		htm+= "	 </a> "; 
		htm+= "	 </li> ";
	
		$("#listaBotones").append(htm);
	};
	
	this.addBoton_locator = function(activo, rol, cliente, enabled) {
		var strDisabled = "";
		if(enabled != true) {
			strDisabled = "class='ui-disabled'";
		}
		
		var htm = "";
		htm+= " <li id='modulo8' "+strDisabled+"> ";
		htm+= " 	<a href='ilocator/index.html' rel='external'> "; 
		htm+= " 		<img src='icons/locator.png'> "; 
		htm+= " 			<h2>Locator</h2><p>Aplicaci&oacute;n para la localizacion de puntos geogr&aacute;ficos</p> "; 
		htm+= " 	</a> "; 
		htm+= " </li>";
		$("#listaBotones").append(htm);
	};
	
	this.addBoton_enrolamiento =function(activo, rol, cliente, enabled) {
		var strDisabled = "";
		if(enabled != true) {
			strDisabled = "class='ui-disabled'";
		}
		
		var htm = "";
		htm+= "<li id='modulo9' "+strDisabled+"> ";
		htm+= "		<a href='enrolar/index.html'>Enrolar ";
		htm+= "			<img src='icons/enroll.png'> "; 
		htm+= "				<h2></h2><p>Enrolamiento de usuario al sistema de notificaciones</p> "; 
		htm+= "		</a> "; 
		htm+= "</li>";
		
		$("#listaBotones").append(htm);
	};
};

function showLog() {
	
	var popupMsg = new MasterPopup();
	popupMsg.alertPopup("Acualizando", $("#hiddenLog").val() );
	
}


/*

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	try { 
		pushNotification = window.plugins.pushNotification;
		typeDevice=(device.platform == "android" || device.platform == "Android")?0:1;
		if (device.platform == 'android' || device.platform == 'Android') {
			pushNotification.register(successHandler, errorHandler, {"senderID":senderId,"ecb":"onNotificationGCM"});
		}
		else {
			pushNotification.register(tokenHandler, errorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});
		}
	}
	catch(err) { 
		txt="There was an error on this page.\n\n"; 
		txt+="Error description: " + err.message + "\n\n"; 
	}
	pictureSource=navigator.camera.PictureSourceType;
	destinationType=navigator.camera.DestinationType;
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

function onNotificationAPN(e) {
	if (e.alert) {
		navigator.notification.alert(e.alert);
	}
	if (e.sound) {
		var snd = new Media(e.sound);
		snd.play();
	}
	if (e.badge) {
		pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
	}
}

function onNotificationGCM(e) {
	switch( e.event ) {
		case "registered":
				if ( e.regid.length > 0 ) {
					idDevice = e.regid;
					$.ajax({ 
						type: "POST",
						url: "http://www.anywhere.cl/wsprogestionchilebi/services/enrolamiento/update",
						data: {  a1:idUsuario, a2:idDevice, a3:senderId },
						crossDomain : true,
						success: function(data,status,jqXHR) { 
							console.log("transaccion guardada");
							registred = true;
							$.getJSON("http://www.anywhere.cl/wsprogestionchilebi/services/p2s/querys/listamensajes/" + idUsuario + "/" + idApp,{ },getMensajes);
						},
						error: function(XMLHttpRequest, textStatus, errorThrown) { console.log("transaccion incompleta"); }
					});		
				} 
				break;
		case "message":
				$.ajax({ 
					type: "POST",
					url: "http://www.anywhere.cl/wsprogestionchilebi/services/notificacion/tracking/save",
					data: {  a1:idDevice, a2:idUsuario, a3:idApp, a4:e.payload.msgcnt, a5:"1" },
					crossDomain : true,
					success: function(data,status,jqXHR) { console.log("transaccion guardada"); },
					error: function(XMLHttpRequest, textStatus, errorThrown) { console.log("transaccion incompleta"); }
				});				
				if (e.foreground) {
					var my_media = new Media("/android_asset/www/" + e.soundname);
					my_media.play();
				}
				else if(e.coldstart) { }
				else { }
				idMessage = e.payload.msgcnt;
				var url = "#mensaje";    
				$(location).attr("href",url);
				$("#txt_mensaje").html(e.payload.message);
				$("#btn_responder").removeClass("ui-disabled");  
				break;
		case "error":
				console.log("ERROR -> MSG:" + e.msg);
				break;
		default:
				console.log("EVENT -> Unknown, an event was received and we do not know what it is");
		break;
	}
}

function tokenHandler (result) {
	idDevice = result;
	$.getJSON("http://www.anywhere.cl/wsprogestionchilebi/services/p2s/querys/listamensajes/" + idUsuario + "/" + idApp,{ },getMensajes);
}

function successHandler (result) { }

function errorHandler (error) { }

function onSuccess(position) {
	latitud = position.coords.longitude;
	longitud = position.coords.longitude;
	direccion =	position.coords.heading;
}

function onError(error) {
	console.log("Intente realizar nuevamente esta operaci&oacute;n.  Si el problema persiste, busque un sitio con mejor recepci&oacute;n");
}

capturePhotoEdit = function(source) {
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
		quality : 50,
		destinationType : destinationType.DATA_URL,
		sourceType : source
	});
};

onFail = function(message) {
	alert('Failed because: ' + message);
};
		
onPhotoDataSuccess = function(imageData) {
	var capturefacing = document.getElementById("capturefacing");
	capturefacing.style.display = "block";
	capturefacing.src = "data:image/jpeg;base64," + imageData;
	facingImage = imageData;
};


//$("#menu_principal").bind("pagebeforecreate",function() { 
//	
//	var popup = new MasterPopup();
//	popup.alertPopup("Login", "pagebeforecreate Menu");
//	
//});

//$("#menu_principal").bind("pagecreate",function() {		  console.log("menu_principal pagecreate");});
//$("#menu_principal").bind("pageinit",function() {		  console.log("menu_principal pageinit");});
//$("#menu_principal").bind("pagebeforehide",function() {	  console.log("menu_principal pagebeforehide");});
//$("#menu_principal").bind("pagebeforeshow",function() {	  console.log("menu_principal pagebeforeshow");});
//$("#menu_principal").bind("pageremove",function() {		  console.log("menu_principal pageremove");});
//$("#menu_principal").bind("pagehide",function() {		  console.log("menu_principal pagehide");});
//$("#menu_principal").bind("pagebeforeshow",function() {	  console.log("menu_principal pagebeforeshow");});
//$("#menu_principal").bind("pageshow",function() { });

*/

function cargaURL(url) {
    var ref = window.open(url, '_system', 'location=no');
    setTimeout(function() {
        ref.close();
    }, 5000);
}



$("#menu_principal").bind("pageshow",function() {
	var tool = new JsTool();
	var check = tool.getUrlParameter("check"); 
	var log = new Log();

    var sessionId = sessionStorage.getItem("rutT");
    var sessionIdCliente = sessionStorage.getItem("clienteT2");
    var IdVersion = $("#version").html();
     
	
	
	/*ACTUALIZA CACHEO*/
    var menu = new Menu();
	var init = new InitCache();
	init.iniciaCacheo(function() {
		menu.loadZonas();
		checkSaves();
	});	
		 
	
	/*SHOW VERSION IN MENU*/
	var info = new DeviceInfo();
	var jSonDevice = info.getDeviceInfo(function(jSonDevice) {
		$("#version").html(jSonDevice.app_version);
	});
	
	registraGCM();
	//initDoMark();
});


function checkSaves() {
	var mng = new AnywhereManager();
	var cant = mng.getSavesPendientes();
	$("#listaPendientes").html("");
	
	
	
	if( cant != 0 ) {
		var htm = "";
		htm+= "<li> ";
		htm+= "		<a href='javascript:; var mng22 = new AnywhereManager(); mng22.checkSavesPendientes(null, null ); '>Pendientes ";
		htm+= "				<h2></h2><p>"+cant+" registro(s) pendiente(s) por informar. PINCHE AQUI </p> "; 
		htm+= "		</a> "; 
		htm+= "</li>";
		
		$("#listaPendientes").html(htm);
		$("#listaPendientes").listview("refresh");
	}
	
	
}

/*
$("#mensaje").bind("pageinit",function() {
	idDevice = "APA91bHLUBJ-ltkaFogL9D4f9vNe9mnQiY8E2KfjOsSn-iiOlOCbN7NiNLkncm30KnZoRwaF3LtZcRZF_qgBpV1Dazgc2TNbQ8AvXxOGVGsVkKyIxUHIt2_xi9-kSfYa4VK_IH2YFLLb";
	$.ajax({
		type: "POST",
		url: "http://www.anywhere.cl/wsprogestionchilebi/services/notificacion/tracking/save",
		data: {  a1:idDevice, a2:idUsuario, a3:idApp, a4:"3", a5:"5" },
		crossDomain : true,
		success: function(data,status,jqXHR) { console.log("transaccion guardada"); },
		error: function(XMLHttpRequest, textStatus, errorThrown) { console.log("transaccion incompleta"); }
	});	
});

$("#enrolar").bind("click",
	function() {
		if(facingImage == null) {
			alert("Debe tomar una fotografia del usuario");
			return;
		}
		else {
			if ($("#formulario1").validate({
				errorPlacement: function(error, element) {
					if ($(element).is("select")) {
						error.insertAfter($(element).parent());
					}
					else {
						error.insertAfter(element);
					}
				}
			}).form() == true) {
				if(idDevice!=null && senderId !=null) {
					$.ajax({ 
						type: "POST",
						url: "http://www.anywhere.cl/wsprogestionchilebi/services/enrolamiento/save",
						data: {  a1 : $("#txt_rut").val(), a2 : $("#txt_password").val(), a3 : idDevice, a4 : typeDevice, 
								 a5 : senderId, a6 : direccion, a7 : latitud, a8 : longitud, a9 : facingImage
						},
						crossDomain : true,
						beforeSend: function() {
							$.mobile.showPageLoadingMsg();
						},				
						success: function(data,status,jqXHR) {
							 popup("Enrolar ", "Se ha guardado el registro");
							 limpiaForm("#formulario1");
						},
						error: function(XMLHttpRequest, textStatus, errorThrown) { 
							popup("Enrolar ", "Ocurri&oacute; un error al guardar el registro");
							limpiaForm("#formulario1");
						},
						complete: function(data) {
							$.mobile.hidePageLoadingMsg();
							$(location).attr("href","#principal");
						}
					});
				}	
			}
		}
});

$("#desenrolar").bind("click",
	function() {
		pushNotification.unregister(successHandler, errorHandler);
		$.ajax({ 
			type: "POST",
			url: "http://www.anywhere.cl/wsprogestionchilebi/services/enrolamiento/delete",
			data: {  a1:$("#txt_rut").val(), a2:$("txt_password").val(), a3:idDevice },
			crossDomain : true,
			beforeSend: function() {
				$.mobile.showPageLoadingMsg();
			},
			success: function(data,status,jqXHR) {
				alert("Se ha desenrolado el dispositivo");
				limpiaForm("#formulario1");
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) { 
				alert("Ocurri&oacute; un error al desenrolar el dispositivo");
				limpiaForm("#formulario1");
			},
			complete: function(data) {
				$.mobile.hidePageLoadingMsg();
				$(location).attr("href","login.html");
			}
		});
	});
	
$("#response").bind("click", function(e) {
	if ($("#formulario2").validate({
		errorPlacement: function(error, element) {
			if ($(element).is("select")) {
				error.insertAfter($(element).parent());
			}
			else {
				error.insertAfter(element);
			}
		}
	}).form() == true) {
		$.ajax({ 
			type: "POST",
			url: "http://www.anywhere.cl/wsprogestionchilebi/services/notificacion/response/save",
			data: {  a1:idDevice, a2:idUsuario, a3:idMessage, a4:$("#txt_respuesta").val() },
			crossDomain : true,
			beforeSend: function() {
				$.mobile.showPageLoadingMsg();
			},			
			success: function(data,status,jqXHR) {
				alert("Se ha guardado el registro");
				limpiaForm("#formulario2");
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) { 
				alert("Ocurri� un error al guardar el registro");
				limpiaForm("#formulario2");
			},
			complete: function(data) {
				$.mobile.hidePageLoadingMsg();
				$(location).attr("href","#principal");
			}
		});
	};
});

$("#lvw_mensajes li a").bind("click", function(e) {
	data = $(this).jqmData("params");
	globalParams = data !== null ? data : null;
	$("#txt_mensaje").val(getUrlVars(globalParams)["mensaje"]);
	$("#btn_responder").addClass("ui-disabled");
});

function getMensajes(data) {
	$("#lvw_mensajes").empty();
	$.each(data, function(key, val) {
		$.each(val, function(key2, val2) {
			if(val2[3].value == '2') {
				$("#lvw_mensajes").append('<li><a href="#mensaje" data-params="mensaje='+ escape(val2[2].value) +'">'+ 
				val2[2].value + '<span class="ui-li-count">' + val2[0].value + '</span></a></li>');
			}
			else {
				$("#lvw_mensajes").append('<li style="border-left: 5px solid #f00;"><a href="#mensaje"  data-params="mensaje='+ escape(val2[2].value) +'">'+ 
				val2[2].value + '<span class="ui-li-count">' + val2[0].value + '</span></a></li>');
			}
		});
	});
	$("#lvw_mensajes").listview("refresh");
}

$("#agenda").bind("click", function(e) {
	$.ajax({ 
		type: "POST",
		dataType:"json",
		url: "http://www.anywhere.cl/agenda/login/access",
		data: { rutPer : "11111111-1", clave : "1-1" },
		crossDomain : true,
		success: function(data,status,jqXHR) {
			var tmp = "";
			$.each(data,function(key,val) {
				sessionStorage.setItem(key,val);
				tmp = key;
			});
			$(location).attr("href","agenda/index.html");
		},
		beforeSend: function() {
		    e.preventDefault();
		    e.stopPropagation();					
		    $.mobile.loading("show");					
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
			popup("Mensaje", "Aplicaci�n no disponible en estos instantes, vuelta a intentarlo mas tarde","login.html");
		},
		complete: function(data) { }				
	});
	
	
	
});


*/