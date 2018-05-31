var idApp = "8";
var config = new Config();
//var senderId = "714500947627";
var senderId = config.getIdSender();
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

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	//registraGCM();
}

function registraGCM() {
	addLog("[registraGCM]");
	
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
	
}

function addLog(msg) {
	if(msg != null && msg != "" ) {
		if($("#deviceLog").length != 0) {
			$("#deviceLog").append(msg + "<br/>");	
		}
	}
}

function onNotificationAPN(e) {
	addLog("onNotificationAPN");
	
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
	addLog("onNotificationGCM:"+e.event);
	e["senderId"] = senderId;
	
	var login = new Login();
	login.getUsuario(function(localUsuario) {
	
		onNotificationGCM_wuser(e, localUsuario);
		 
	});
}

function onNotificationGCM_wuser(e, localUsuario) {
	 
		var any = new Anywhere();
	    var device = new DeviceInfo();
	    device.getDeviceInfo(function(dev) {
	    	onNotificationGCM_wuser_etapa2(any, dev, e, localUsuario);
	    });
	 
		
}

function onNotificationGCM_wuser_etapa2(any, dev, e, localUsuario) {
		try {
			
			switch( e.event ) {
				case "registered":
						if ( e.regid.length > 0 ) {
							idDevice = e.regid;
					
							
							var any = new AnywhereManager();
							
							var data = {  a1: JSON.stringify(localUsuario),
									a2:idDevice, idDeviceNative : dev.uuid, a3:senderId,
									dataCell: JSON.stringify(dev),
									event: JSON.stringify(e) };
							
							addLog("saveClaseWeb");
							any.saveClaseWeb(true, 
											 "anywhere_movil_restanywhere", 
											 "EnrolaDevice", 
											 "upd", 
											 data, function() {
								addLog("Enrolement send it");
							});
						 
						} 
						break;
				case "message":
						addLog("onNotificationGCM: message"+JSON.stringify(e));
						
						$.ajax({ 
							type: "POST",
							url: any.getWSAnywhere_context()+ "services/notificacion/tracking/save",
							data: {  a1:idDevice, a2: localUsuario.usuario , a3:idApp, a4:e.payload.msgcnt, a5:"1" },
							crossDomain : true,
							success: function(data,status,jqXHR) { console.log("transaccion guardada"); },
							error: function(XMLHttpRequest, textStatus, errorThrown) { console.log("transaccion incompleta"); }
						});				
						
						try {
							var my_media = new Media("/sounds/beep-027.wav");
							my_media.play();
						}
						catch(e) {
							
						}
						
						if(e.coldstart) { }
						else { }
						/*idMessage = e.payload.msgcnt;
						var url = "#mensaje";    
						$(location).attr("href",url);
						$("#txt_mensaje").html(e.payload.message);
						$("#btn_responder").removeClass("ui-disabled");  */
						break;
				case "error":
						console.log("ERROR -> MSG:" + e.msg);
						break;
				default:
						console.log("EVENT -> Unknown, an event was received and we do not know what it is");
				break;
			}
		}
		catch(e) {
			addLog(JSON.stringify(e));
		}
} 

function tokenHandler (result) {
	idDevice = result;
	$.getJSON("http://www.anywhere.cl/wsprogestionchilebi/services/p2s/querys/listamensajes/" + idUsuario + "/" + idApp,{ },getMensajes);
}

function tokenHandler2 (idUsuario, idApp, functionOnComplete) {
	
	if( idUsuario != null) {
		var any = new Anywhere();
		$.ajax({ 
			type: "GET",
			url: any.getWSAnywhere_context() + "services/p2s/querys/listamensajes/" + idUsuario + "/" + idApp,
			data: { },
			crossDomain : true,
			beforeSend: function() {
				//$.mobile.showPageLoadingMsg();
			},
			success: function(data,status,jqXHR) {
				var f = eval(getMensajes);
				f(data);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) { 
				//alert("Ocurri&oacute; un error al desenrolar el dispositivo"+textStatus);
			},
			complete: function(data) {
				//$.mobile.hidePageLoadingMsg();
				if(functionOnComplete != null) {
					var f = eval(functionOnComplete);
					f(data);	
				}
			}
		});
	}
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
}

onFail = function(message) {
	alert('Failed because: ' + message);
}


/*
onPhotoDataSuccess = function(imageData) {
	var capturefacing = document.getElementById("capturefacing");
	capturefacing.style.display = "block";
	capturefacing.src = "data:image/jpeg;base64," + imageData;
	facingImage = imageData;
}

$("#enrolar").live("click",
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
							 alert("Se ha guardado el registro");
							 limpiaForm("#formulario1");
						},
						error: function(XMLHttpRequest, textStatus, errorThrown) { 
							alert("Ocurri&oacute; un error al guardar el registro");
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

$("#desenrolar").live("click",
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
				alert("Se ha desenrolado el dispositivo")
				limpiaForm("#formulario1");
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) { 
				alert("Ocurri&oacute; un error al desenrolar el dispositivo")
				limpiaForm("#formulario1");
			},
			complete: function(data) {
				$.mobile.hidePageLoadingMsg();
				$(location).attr("href","index.html");
			}
		});
	});
*/	

function getMensajes(data) {	
	$("#lvw_mensajes").empty();
	$.each(data, function(key, val) {		
		$.each(val, function(key2, val2) {
			try {
				console.log("[" +val2[0].value + " --- " + val2[2].value + "]");
				
				 var conf = new Config();
				 var popup = new MasterPopup();
				 var configura = {"funcYes": function() {
					 console.log("Yesss!!!!!!");
					 
					 var any = new Anywhere();
					 $.ajax({ 
							type: "POST",
							url: 	any.getWSAnywhere_context()+ "EjeCoreI?claseweb=cl.imasd.repo.web.Base_Mensaje",
							data: {  valor1 : JSON.stringify(val) , valor2 : JSON.stringify(val2)  },
							success: function(data,status,jqXHR) { 
								 console.log("Desactivo Mensaje");
							},
							error: function(XMLHttpRequest, textStatus, errorThrown) { console.log("transaccion incompleta"); }
						});		
					 
				 }};
				 popup.alertPopup(conf.getCompanyName(), val2[0].value + "<br/>" + val2[2].value,configura);
				 
				  
				if(val2[3].value == '2') {
					$("#lvw_mensajes").append('<li><a href="#mensaje" data-params="mensaje='+ escape(val2[2].value) +'">'+ 
					val2[2].value + '<span class="ui-li-count">' + val2[0].value + '</span></a></li>');
				}
				else {
					$("#lvw_mensajes").append('<li style="border-left: 5px solid #f00;"><a href="#mensaje"  data-params="mensaje='+ escape(val2[2].value) +'">'+ 
					val2[2].value + '<span class="ui-li-count">' + val2[0].value + '</span></a></li>');
				}
			}
			catch(e) {
				
			}
		});
	});
	$("#lvw_mensajes").listview("refresh");
}
