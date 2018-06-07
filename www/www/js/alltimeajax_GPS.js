
var workerPosLatitud = 0;
var workerPosLongitud = 0;
var workerAdress = "";
var workerUsuario = null;

function initDoMark() {
	try {
	 
		addLogg("Device ready...");
		msgWithGeo();
	}
	catch(e) {
		//addLog(e);
	}
}


function msgWithGeo() {
	refreshGeo();
	
	if(workerUsuario == null) {
		var login = new Login();
		login.getUsuario(function(usuario) {
			workerUsuario = usuario;
		});
	}
	
	var url = null;
	
	if(workerUsuario != null ) {
		
		
		var any = new Anywhere();
		url=any.getWSAnywjere_contextEjeCore();
		url+="EjeCoreI?claseweb=cl.imasd.view.sencha.anywhere.Conf&";
		url+="modulo=anywhere_movil_restanywhere&";
		url+="thing=AnySavePosition&";
		url+="accion=add&";
		url+="latitud="+workerPosLatitud+"&";
		url+="longitud="+workerPosLongitud+"&";
		url+="address="+workerAdress+"&";
		url+="idusuario="+JSON.stringify(workerUsuario);
		
		//addLog(", doTrack");
		 
		$.ajax({ 
			type: "POST" ,
			dataType:"html",
			url: url,
			cache: false,
			success: function(data) {
				//addLog(", doWait");
				setTimeout(function(){  msgWithGeo(); }, 60000);
			},
			error: function() {
				//addLog(", doWait");
				setTimeout(function(){  msgWithGeo(); }, 60000);
			},
			complete: function() {
				
			}
		});
	}
 
}


function refreshGeo() {
	try {
		var geo = new GeoGlobal();
		geo.refreshGeo(function(lat, lo) {
			workerPosLatitud = lat;
			workerPosLongitud = lo;
			addLogg(workerPosLatitud + ","+ workerPosLongitud);
		}, function(point) {
			workerAdress = point;
			addLogg(workerAdress);
		});
	}
	catch(e) {
		addLogg(e);
	}
}


function addLogg(msg) {
	if($("#debugArea").length >0) {
		$("#debugArea").append(msg);	
	}
}