function doMark(params) {
	console.log("doMark();");
	self.postMessage({m: "doMsg", p: ", doing do Mark" }); // start the worker
	
	try {
		if(params.url != null) {
			self.postMessage({m: "doMsg", p: ", loading url" }); // start the worker
			
			load(params.url,function(data) {
				var result = data.responseText;
				
				self.postMessage({m: "doWait" }); // start the worker
			});  
		}
		else {
			console.log("Ajax no se envió debido a que no hay URL");
			self.postMessage({m: "doWait" }); // start the worker
		}
	}
	catch (e) {
		self.postMessage({m: "doMsg", p: ",Error:"+e }); // start the worker
	}
}

/*@@     WORKER     @@@*/
self.addEventListener('message', function(e) {
	try {
		dateIni = e.data.dIni;
		var m = eval(e.data.m);
		var p = e.data.p;
		
		m(p);
	}
	catch(e) {
		
	}
	
}, false);


function load(url, callback) {
	var xhr;

	if(typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();
	else {
		var versions = ["MSXML2.XmlHttp.5.0", 
			 	"MSXML2.XmlHttp.4.0",
			 	"MSXML2.XmlHttp.3.0", 
			 	"MSXML2.XmlHttp.2.0",
			 	"Microsoft.XmlHttp"]

		for(var i = 0, len = versions.length; i < len; i++) {
		try {
			xhr = new ActiveXObject(versions[i]);
			break;
		}
			catch(e){}
		} // end for
	}
		
	xhr.onreadystatechange = ensureReadiness;
		
	function ensureReadiness() {
		if(xhr.readyState < 4) {
			return;
		}
			
		if(xhr.status !== 200) {
			return;
		}

		// all is well	
		if(xhr.readyState === 4) {
			callback(xhr);
		}			
	}
		
	xhr.open('GET', url, true);
	xhr.send('');
}
	
/*
load('data.json', function(xhr) {	
	var result = xhr.responseText;	
});
*/