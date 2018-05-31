//var direccion="El Pacifico 2 Etapa Jose Payet, Lima";
var map = null;
var geocoder = null;
var marker = null;
var latitud = null;
var longitud = null;
var style = "<style> .tabla, .tabla TD, .tabla TH .tabla TR {font-family:Georgia,'Times New Roman',serif;font-size:13pt;}table, td, th { padding: 5px;border:1px solid green;border-color:green;border-collapse:collapse } th { background-color:green;color:white;} td{background-color:#A3DC84;color:white;text-align:center} .boton{background:#5CCD00;background:-moz-linear-gradient(top,#5CCD00 0%,#4AA400 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#5CCD00),color-stop(100%,#4AA400));background:-webkit-linear-gradient(top,#5CCD00 0%,#4AA400 100%);background:-o-linear-gradient(top,#5CCD00 0%,#4AA400 100%);background:-ms-linear-gradient(top,#5CCD00 0%,#4AA400 100%);background:linear-gradient(top,#5CCD00 0%,#4AA400 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#5CCD00',endColorstr='#4AA400',GradientType=0);padding:4px 15px;color:#fff;font-family:'Helvetica Neue',sans-serif;font-size:16px;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;border:1px solid #459A00} a:hover{background-color:yellow;}.button:hover {color: blue;}</style>";

function drawMap(mapDiv) {
	var infowindow = new google.maps.InfoWindow({size: new google.maps.Size(150,50)});
	geocoder = new google.maps.Geocoder();
	if(typeof direccion != 'undefined') {
		geocoder.geocode( { "address": direccion}, 
			function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					var latLng = new google.maps.LatLng(results[0].geometry.location.lat(),results[0].geometry.location.lng());
					var mapProperties = {
						center : latLng,
						zoom : 16,//zoom : 14,
						mapTypeId : google.maps.MapTypeId.ROADMAP
					};
					map = new google.maps.Map(document.getElementById(mapDiv), mapProperties);
					google.maps.event.addListener(map, "click", 
						function() {
							infowindow.close();
					});
					marker = new google.maps.Marker({
						map : map,			
						position : latLng,
						draggable : true
					});
					codeAddressReverse(latLng);
				}
				else {
					popup("Mensaje", "La direccion que Ud. ha indicado no se puede encontrar.", principal,principal);
				}
		}); 
	}
	else {
		$("#" + mapDiv).gmap("getCurrentPosition", 
			function(position, status) {
				if ( status === "OK" ) {
		            latitud = position.coords.latitude;
		            longitud = position.coords.longitude;
		        	var latLng = new google.maps.LatLng(latitud, longitud);
		        	var mapProperties = {
		        		center : latLng,
		        		zoom : 16,//zoom : 20,
		        		mapTypeId : google.maps.MapTypeId.ROADMAP
		        	};
		        	map = new google.maps.Map(document.getElementById(mapDiv), mapProperties);
		        	google.maps.event.addListener(map, "click", function() {
		                infowindow.close();
		        	});
		        	marker = new google.maps.Marker({
		        		map : map,			
		        		position : latLng,
		        		draggable : true
		        	});
		        	codeAddressReverse(latLng);
				}
		});
	}
	return map;
}

function addInfoWindow(message) {
	var info = message;
	var infoWindow = new google.maps.InfoWindow({
		content : message
	});
	google.maps.event.addListener(marker, "click", function() {
		infoWindow.open(map, marker);
	});
}

function codeAddress() {
	geocoder = new google.maps.Geocoder();
	geocoder.geocode( { "address": direccion}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
			marker.setPosition(results[0].geometry.location);
			return true;
		}
		else { 
			popup("Mensaje", "La direccion que Ud. ha indicado no se puede encontrar. ¿Desea buscar manualmente?", "#mapa", "#nuevo");
		}
	}); 	
}

function clone(obj){
    if(obj == null || typeof(obj) != "object") return obj;
    var temp = new obj.constructor(); 
    for(var key in obj) temp[key] = clone(obj[key]);
    return temp;
}

function geocodePosition(pos) {
	var direccion = null;
	geocoder.geocode({ latLng: pos}, function(responses) {
		if (responses && responses.length > 0) {
			marker.formatted_address = responses[0].formatted_address;
			direccion = marker.formatted_address;
			var parametro = "data-params='{\"param1\":\"" + marker.formatted_address + "\"}'";
			var referencia = "<a href='#nuevo' id='loaddirection' " + parametro + "><button class='boton'>Agregar Ubicacion</button></a>";
			infowindow.setContent(style + '<TABLE><TR><TH colspan="2"> Direccion: ' + marker.formatted_address + '</TH></TR><<TR><TD>Coordenadas de Ubicacion: ' + marker.getPosition().toUrlValue(6)  + '</TD><TD>' + referencia + '</TD></TR></TABLE>' );
			infowindow.open(map, marker);
		}
		else {
			marker.formatted_address = "Lo sentimos. No se puede determinar una direccion.";
		}
	});
	return direccion;
}

function codeAddressReverse(pos) {
	geocoder = new google.maps.Geocoder();
	geocoder.geocode( { latLng: pos}, 
		function(responses, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				direccion = responses[0].formatted_address;
				addInfoWindow('<hr width="100%"><div style="font-family:Georgia;font-size:12px;color:#080567;" align="center"> Direccion: "' + direccion.toUpperCase() + '"</div><hr width="100%">');	
				if (marker) {
					marker.setMap(null);
				}	
				marker = new google.maps.Marker({
					map: map,
					draggable: true,
					position: pos
				});
				google.maps.event.addListener(marker, "dragend", 
					function() {
						geocodePosition(marker.getPosition());
				});
				google.maps.event.addListener(marker, "click", 
					function() {
						infowindow = new google.maps.InfoWindow({size: new google.maps.Size(150,50)});
						if (marker.formatted_address) {
							infowindow.setContent(style + "<TABLE><TR><TH> Direccion: " + direccion + "</TH><TR><TD>Coordenadas de Ubicacion: " + marker.getPosition().toUrlValue(6)  + "</TD></TR><TR><TD>" + referencia + "</TD>" );
						}
						else  {
							var parametro = "data-params='{\"param1\":\"" + direccion + "\"}'";
							var referencia = "<a href='#nuevo' id='loaddirection' " + parametro + "><button class='boton'>Agregar Ubicacion</button></a>";
							infowindow.setContent(style + "<TABLE><TR><TH colspan='2'> Direccion: " + direccion + "</TH></TR><TR><TD>Coordenadas de Ubicacion: " + marker.getPosition().toUrlValue(6)  + "</TD><TD>" + referencia + "</TD></TR></TABLE>" );
						}
						infowindow.open(map, marker);
				});
				google.maps.event.trigger(marker, "click");
			}
			else {
				popup("Mensaje", "La direccion que Ud. ha indicado no se puede encontrar.", "#mapa", "#nuevo"); 	
			}
	});
}

function foundYou(latG,lonG) {
	  var address = null;
	  var geocoder2 = new google.maps.Geocoder();
	  var latlng2 = new google.maps.LatLng(latG,lonG);
	  geocoder2.geocode({'latLng': latlng2}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
	      if (results[0]) {
	        address = results[0].address_components[1].long_name+' '+results[0].address_components[0].long_name+', '+results[0].address_components[3].long_name;
	        console.log(address);
	      }
	    } 
	    else {
	      address = "Geocoder failed due to: ";
	      console.log(address);
	    }
	  });
}


