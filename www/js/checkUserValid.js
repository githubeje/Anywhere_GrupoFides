$(document).ready(function() {
	console.log("idusuario:"+sessionStorage.getItem("rutT") + " cargo:"+sessionStorage.getItem("cargo"));
	
	if( sessionStorage.getItem("rutT") == null || sessionStorage.getItem("rutT") == "undefined" ) {
		goToLogin();
	}
	
	$(document).live("click", function() {
		if( sessionStorage.getItem("rutT") == null || sessionStorage.getItem("rutT") == "undefined" ) {
			goToLogin();
		}
	});
});

function goToLogin() {
	console.log("goToLogin");
	
	var div = "";
	var newhref  = "";
	
	if( sessionStorage.getItem("canRedirect") == null || sessionStorage.getItem("canRedirect") == "true" ) { 
		try {
			//form.errorisimo.value = 1;
			div = $(location).attr("href");;
			newhref =  div.substring(0, div.indexOf("www/") + 3) + "/index.html";
			
			if(document.location.href != newhref) {
				$(location).attr("href","index.html");
			}
		}
		catch (e) {
			sessionStorage.setItem("canRedirect","false");
			console.log("error:"+e);
			popupSession ("Sin sessión", "href="+div+"<br/>newhref="+newhref+"<br/>"+e );
			return;
		}
		
		sessionStorage.setItem("canRedirect","true");
		return;
	}
	else {
		console.log("goToLogin[ya se notificó]");
	}
	

}


function popupSession(asunto, msg){
	$("html").simpledialog2({
		mode: "button",
   		headerText: asunto,
    	headerClose: true,
    	buttonPrompt: msg,
    	buttons : {
    		"OK": {
    			click: function () { 

    				return true;
    			}
    		},
			"Cancel": {
				click: function () { 
					
				},
				icon: "delete",
				theme: "c"
			}
    	}
	});
}