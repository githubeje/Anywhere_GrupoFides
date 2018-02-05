var myWorker = new Worker("js/alltimeGPS_broda.js");
var workerPosLatitud = 0;
var workerPosLongitud = 0;
var workerAdress = "";
var workerUsuario = null;

var success = function(e) {
	try {
		dateIni = e.data.dIni;
		var m = eval(e.data.m);
		var p = e.data.p;
		
		m(p);
	}
	catch(e) {
		$("#debugArea").append(e);
	}
};



function initDoMark() {
	try {
		
		
		myWorker.addEventListener('message', success , false);

		
		$("#debugArea").append("Device ready...");
		msgWithGeo();
	}
	catch(e) {
		$("#debugArea").append(e);
	}
}


function doWait() {
	try { 
		console.log("doWait();");
		setTimeout(function(){  
			msgWithGeo();
		}, 5000);
	}
	catch(e) {
		
	}
}


function doMsg(msg) {
	$("#debugArea").append(", "+msg);
}

function msgWithGeo() {
	$("#debugArea").append(", msgWithGeo");
	
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
	}

	$("#debugArea").append(", PostMessage doMark");
	myWorker.postMessage({m: "doMark", 
						  p: {"url": url} });
	
	$("#debugArea").append(", EndPostMessage doMark");
}

function refreshGeo() {
	var geo = new GeoGlobal();
	geo.refreshGeo(function(lat, lo) {
		workerPosLatitud = lat;
		workerPosLongitud = lo;

	}, function(point) {
		workerAdress = point;
	});
}