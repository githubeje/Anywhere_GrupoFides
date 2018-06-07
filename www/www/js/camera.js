var varFotoUno = null;
var varFotoDos = null;
var varFotoTres = null;
var varFotoCuatro = null;

$(document).ready(function() {
	console.log("[init] camera.js");
	
	document.addEventListener("deviceready", onDeviceReady, false);
	
	function onDeviceReady() {
		pictureSource = navigator.camera.PictureSourceType;
		destinationType = navigator.camera.DestinationType;
	}	
	
	$("div[data-role='page']").live('pageshow',function(event, ui){
		console.log("page showed");
		if((navigator.camera == null || Camera == null) ) {
			prepateAPic_withCam();
		}
	});
	
	
	function prepateAPic_withCam() {
		// Grab elements, create settings, etc.
		if($("#navBarFotoUno").length != 0) {
			if( $("#video").length == 0 ) {
				$("#navBarFotoUno").append("  <video id='video' width='262' height='350'  style='display:none;'></video> ");	
			}
			
			if( $("#canvas").length == 0 ) {
				$("#navBarFotoUno").append("  <canvas id='canvas' width='262' height='350' style='display:none;'></canvas> ");
			}
			
			var canvas = document.getElementById("canvas"),
				context = canvas.getContext("2d"),
				video = document.getElementById("video"),
				videoObj = { "video": true },
				errBack = function(error) {
					console.log("Video capture error: ", error.code); 
				};

			if(navigator.getUserMedia) { // Standard
				navigator.getUserMedia(videoObj, function(stream) {
					video.src = stream;
					video.play();
				}, errBack);
			} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
				navigator.webkitGetUserMedia(videoObj, function(stream){
					video.src = window.webkitURL.createObjectURL(stream);
					video.play();
				}, errBack);
			}
			else if(navigator.mozGetUserMedia) { // Firefox-prefixed
				navigator.mozGetUserMedia(videoObj, function(stream){
					video.src = window.URL.createObjectURL(stream);
					video.play();
				}, errBack);
			}
		}
	}
	
	function takeAPic_withCam() {
		console.log("TOMANDO FOTO");
		try {
			var canvas = document.getElementById("canvas")
			var context = canvas.getContext("2d");
			
			context.drawImage(video, 0, 0, 262, 350);
			
			return canvas.toDataURL("image/jpeg", 1.0);
		}
		catch(e) {
			return "";
		}
		
	}
	
	 capturePhoto = function(e) {
		 /*SECCIÓN DEL IF DESHABILITADA */
		if( !isMobile() && false ) {
			var fOk = eval(e);
			fOk(null);
		}
		else {
			var modoAlternativo = 2// 0,1 o 2
			if((navigator.camera == null || Camera == null) ) {
				if(modoAlternativo==0) {
					console.log("[IMG ALT 0]");
					superPopup("popupCamara",'Captura de foto','No Existe camara');
				}
				else if(modoAlternativo==1) {
					/*MODO ALTERNATIVO 1*/
					console.log("[IMG ALT 1]");
					var principalE = e;
					if( $("#fileFired").length == 0 ) {
						$("body").append(" <input type='file' id='fileFired' name='fileFired' /> ");
						$("#fileFired").bind('change', function (e) { //dynamic property binding
					    	var FR = new FileReader();
					        FR.onload = function(eLocal) {
					        	if(principalE != null) {
					        		var base64 = eLocal.target.result;
					        		base64 = base64.replace("data:image/jpeg;base64,","");
					        		
					        		var f = eval(principalE);
					        		f(base64);
					        	}
					        };       
					        FR.readAsDataURL( this.files[0] );
						});
					}				
					$("#fileFired").trigger( "click" );
				}
				else  if(modoAlternativo==2) {
					var principalE = e;
					
					if( $("#fileFired").length == 0 ) {
						var base64 = takeAPic_withCam(); 
						base64 = base64.replace("data:image/jpeg;base64,","");
						
						var f = eval(principalE);
		        		f(base64);
					}
				}
				
				/*END MODO ALTERNATIVO 1*/
			}
			else {	
				
				try {
					navigator.camera.getPicture(e, onFail, {
						quality : 100,
						destinationType : destinationType.DATA_URL,
						sourceType : Camera.PictureSourceType.CAMERA,
						EncodingType : 1,
						targetWidth: 350,
						targetHeight: 500 });	
				}
				catch(error) {
					superPopup("popupCamara",'Fallo',error);
				}
			}
		}
	};
	
	onFail = function(message) {
		superPopup("popupCamara","Mensaje", "Fallo debido a: " + message);
	};
	
});

function fotosObligatoriasCargadas() {
	
	
	varFotoUno = null;
	varFotoDos = null;
	varFotoTres = null;
	varFotoCuatro = null;
	
	var nu = "";
	
	var isOk = true;
	
	if(isOk) {
		nu = "Uno";
		
		if(	checkPhotosClassRequired(nu) ) {
			isOk &= checkPhotosObligtoria2Parte(nu);
			console.log("CHEKING FOTO "+nu);
		}
		else {
			console.log("SIN CHEKING FOTO "+nu);
		}
	}

	if(isOk) {
		nu = "Dos";
		if( checkPhotosClassRequired(nu) ) {
			isOk &= checkPhotosObligtoria2Parte(nu);
			console.log("CHEKING FOTO "+nu);
		}
		else {
			console.log("SIN CHEKING FOTO "+nu);
		}
	}
	
	if(isOk) {
		nu = "Tres";
		if( checkPhotosClassRequired(nu) ) {
			isOk &= checkPhotosObligtoria2Parte(nu);
			console.log("CHEKING FOTO "+nu);
		}
		else {
			console.log("SIN CHEKING FOTO "+nu);
		}
	}
	
	if(isOk) {
		nu = "Cuatro";
		if( checkPhotosClassRequired(nu) ) {
			isOk &= checkPhotosObligtoria2Parte(nu);
			console.log("CHEKING FOTO "+nu);
		}
		else {
			console.log("SIN CHEKING FOTO "+nu);
		}
	}
	
	return isOk;
}

function checkPhotosObligtoria2Parte(nu) {
	var m = new MasterPopup();
	if($("#hiddenFoto"+nu).val() == "") {	
		m.alertPopup("Anywhere", "Falta incorporar la foto "+nu+".");
		
		return false;
	}
	
	return true;
}


function checkPhotosClassRequired(nu) {
	return $("#hiddenFoto"+nu).attr("class") == "required";
}

onPhotoDataSuccess_Uno = function(imageData) {
	var captureStock = document.getElementById("fotoUno");
	captureStock.style.display = "block";
	captureStock.src = "data:image/jpeg;base64," + imageData;
	varFotoUno = imageData;
	$("#hiddenFotoUno").val(imageData);
	//superPopup("poderPehuenche",'Mensaje',"Foto "+nombreModulo);
};

onPhotoDataSuccess_Dos = function(imageData) {
	var captureStock = document.getElementById("fotoDos");
	captureStock.style.display = "block";
	captureStock.src = "data:image/jpeg;base64," + imageData;
	varFotoDos = imageData;
	$("#hiddenFotoDos").val(imageData);
	//superPopup("poderPehuenche",'Mensaje',"Foto "+nombreModulo);
};

onPhotoDataSuccess_Tres = function(imageData) {
	var captureStock = document.getElementById("fotoTres");
	captureStock.style.display = "block";
	captureStock.src = "data:image/jpeg;base64," + imageData;
	varFotoTres = imageData;
	$("#hiddenFotoTres").val(imageData);
	//superPopup("poderPehuenche",'Mensaje',"Foto "+nombreModulo);
};

onPhotoDataSuccess_Cuatro = function(imageData) {
	var captureStock = document.getElementById("fotoCuatro");
	captureStock.style.display = "block";
	captureStock.src = "data:image/jpeg;base64," + imageData;
	varFotoCuatro = imageData;
	$("#hiddenFotoCuatro").val(imageData);
	//superPopup("poderPehuenche",'Mensaje',"Foto "+nombreModulo);
};

function reiniciaFotos() {
	
	createPhotoButton(1,true, false);
	createPhotoButton(2,true, false);
	createPhotoButton(3,true, false);
	createPhotoButton(4,true, false);
	
	varFotoUno = null;
	varFotoDos = null;
	varFotoTres = null;
	varFotoCuatro = null;
}

function isMobile() { 
	 if( navigator.userAgent.match(/Android/i)
	 || navigator.userAgent.match(/webOS/i)
	 || navigator.userAgent.match(/iPhone/i)
	 || navigator.userAgent.match(/iPad/i)
	 || navigator.userAgent.match(/iPod/i)
	 || navigator.userAgent.match(/BlackBerry/i)
	 || navigator.userAgent.match(/Windows Phone/i)
	 ){
	    return true;
	  }
	 else {
	    return false;
	  }
}


function createPhotoButton(fotoNumber, visible, isRequired, newGlosa) {
	var nu = "";
	
	if(fotoNumber == 1) {
		nu = "Uno";
	}
	else if(fotoNumber == 2) {
		nu = "Dos";		
	}
	else if(fotoNumber == 3) {
		nu = "Tres";
	} 
	else if(fotoNumber == 4) {
		nu = "Cuatro";
	} 	
	
	var isM = isMobile();
	if( isRequired == true && isM) {
		$("#hiddenFoto"+nu).addClass("required");
	}
	else {
		$("#hiddenFoto"+nu).removeClass("required");
	}
	
	$("#hiddenFoto"+nu).removeAttr("value");
	
	if(newGlosa != null ) {
		$("#botonFoto"+nu).html(newGlosa);
	}
	else {
		$("#botonFoto"+nu).html("Foto");
	}
	
	if(visible == true ) {
		$("#navBarFoto"+nu).show();
	}
	else {
		$("#navBarFoto"+nu).hide();
	}
}