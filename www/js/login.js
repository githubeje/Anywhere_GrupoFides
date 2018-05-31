var mensaje = "Error";
var estado;    
var rut;
var login;


/* HOOK EVENTS */
	 
	
	$("#login").live( "pagebeforecreate", function() {
		console.log("pagebeforecreate[begin]");
		var login = new Login();
		$("#divUserContainer").html(login.getUserMethod());
		console.log("pagebeforecreate[end]");
	});
	
	$("#login").live( "pageshow", function() {
		var conf = new Config();
		$("#clave").val(conf.getStaticClave());
		
		if(conf.dropDatabasesOnInit()) {
			console.log("[droping databse on init]");
			var sql = new MapSQL();
			sql.delAll();
			
			var sql = new MapSQL("cacheTripletaSelector");
			sql.delAll();
		};
		
	});
	
	document.addEventListener("deviceready", onDeviceReady, false);
	
	function onDeviceReady() {
		registraGCM();
	}

/* END HOOK EVENTS */


function logea() {

		rut = $("#rutPer").val(); 
		clave = $("#clave").val(); 
				
		var version = new Version();
		
		var any = new AnywhereManager();
		any.login(true, rut, clave, function(data,status,jqXHR) {		
			var tmp = "";
	        	if (data!=null) {
				  if(data.success == true || data.success == "true" ){
					  estado = true;
				  }
				  else {
					  estado = false;
				  }
	       
				  mensaje = data.message;
				  var rutT = data.rutT;
				  var cargo = data.cargo;
				  var clienteT = "2";
				  var clienteT2 = data.clienteT2;
				  var cadenaT = "1";
				  var localT = "1";
				  tmp = data.key;
				
				  var func;
			
				if(estado==true){
					var login = new Login();
					login.newUsuario(mensaje, rutT, clienteT, clienteT2, cadenaT, localT, cargo, clave, rut, tmp);
					
					func = function() {
						
						 $.mobile.changePage( "menu.html", { transition: "flip"} );
					};
				}
				else{
					console.log("AUT:false");
					
					func = function() {
						var popup = new MasterPopup();
						popup.alertPopup("Login", "Usuario o Clave inv&#225;lida");
					};
				}
				
				var f = eval(func);
				f();
				
				
	        }
	        else {
	        	popup("Mensaje", "Usuario o clave invalido","index.html");
	        }	
			
		});
	
}

$("div[data-role='page']").live('pageshow',function(event, ui){
    
    var login = new Login();
    login.getUsuario(function(usuario) {
        tokenHandler2(usuario.rutT,8);
    });

    
});



function Login() {
	this.getUserMethod = function() {	
		
		this.getUsuario(function(usuario) {	
			
			var conf = new Config();
 			
			var sinUsuario = "<input type='text' 	  name='rutPer' 	  id='rutPer' placeholder='Username or Email' value='"+conf.getStaticUsuario()+"'> ";
			var conUsuario = "<div class='ui-select'>";
			conUsuario += "<select  class='required'  name='rutPer' 	  id='rutPer' onchange='(function(){ var login = new Login(); login.changeUsuario() })();' >";
			conUsuario += "<option value='"+usuario.usuario+"' selected>"+usuario.usuario+"</option>";
			conUsuario += "<option value='-1'>Nuevo Usuario</option>";
			conUsuario += "</select>";	
			conUsuario += "</div>";
			
			if(usuario.usuario == null) {
				console.log("[Sin Usuario Previo]");
				$("#divUserContainer").html( "<label for='rutPer'><img src='images/usuario24.png'></label>"+sinUsuario );
			}
			else {
				console.log("[Con Usuario Previo]");
				$("#divUserContainer").html( "<label for='rutPer'><img src='images/usuario24.png'></label>"+conUsuario );
			}
			
			$('#login').trigger("create");
		});
	};
	
	this.getUsuario = function(funcJavascript) {
		//console.log("[getUsuario]");
		var map = new MapSQL();
		map.get("usuario", function(value) {
		
			if( value != null ) {
				var json = value.data;
				
				try {
					if(json != null) {	
						
						var user = JSON.parse(json);						
						var f = eval(funcJavascript);
						f(user);
						
						return;
					}
					else {
						
					}
				}
				catch(e) {
					console.log(e);
				}
			}
			
			var session = {};
			session["mensaje"] = null;
			session["rutT"] = null;
			session["clienteT"] = null;
			session["clienteT2"] = null;
			session["cadenaT"] = null;
			session["localT"] = null;
			session["cargo"] = null;
			session["clave"] = null;
			session["usuario"] = null;
			
			var f = eval(funcJavascript);
			f(session);
			
		});

	}; 
	
	this.newUsuario = function( mensaje, rutT, clienteT, clienteT2, cadenaT, localT, cargo, clave, rut, tmp) {
		
		/*MALO DEBE ELIMINARSE*/
		sessionStorage.setItem("tmp",tmp);
		sessionStorage.setItem("mensaje",mensaje);
		sessionStorage.setItem("rutT",rutT);
		sessionStorage.setItem("clienteT",clienteT);
		sessionStorage.setItem("clienteT2",clienteT2);
		sessionStorage.setItem("cadenaT",cadenaT);
		sessionStorage.setItem("localT",localT);
		sessionStorage.setItem("cargo",cargo);
		sessionStorage.setItem("clave",clave);
		sessionStorage.setItem("usuario",rut);
		/*MALO DEBE ELIMINARSE*/
		
		var session = {};
		session["mensaje"] = mensaje;
		session["rutT"] = rutT;
		session["clienteT"] = clienteT;
		session["clienteT2"] = clienteT2;
		session["cadenaT"] = cadenaT;
		session["localT"] = localT;
		session["cargo"] = cargo;
		session["clave"] = clave;
		session["usuario"] = rut;
		

		var map = new MapSQL();
		map.del("usuario", function(funcJavascript) {
			map.add("usuario",JSON.stringify(session));
		});
	};
	
	
	this.changeUsuario = function() {	
		
		console.log("changeUsuario");
		
		if($("#rutPer").val() == "-1") {
			var map = new MapSQL();
			map.delAll();
			
			var sql = new MapSQL("MAP_TABLE");
			sql.delAll();
			
			var sql = new MapSQL("cacheTripletaSelector");
			sql.delAll();
			
			var sql = new MapSQL("dataSQL");
			sql.delAll();
			
			
			map.del("usuario", function(funcJavascript) {
				var login = new Login();
				login.getUserMethod();
			});
		}		
	};
}

