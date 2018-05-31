$.urlParam = function(name){
	 	var sPageURL = window.location.search.substring(1);
	    var sURLVariables = sPageURL.split('&');
	    for (var i = 0; i < sURLVariables.length; i++) 
	    {
	        var sParameterName = sURLVariables[i].split('=');
	        if (sParameterName[0] == name) 
	        {
	            return sParameterName[1];
	        }
	    }
}

function drawnLine(tagname,data,label,seriex) {
	document.getElementById(tagname).innerHTML = "";
	var plot2 = $.jqplot (tagname,data, {
	    title: "Plot With Options",
	    axesDefaults: {
	    	labelRenderer: $.jqplot.CanvasAxisLabelRenderer
	    },
	    axes: {
			xaxis: {
				label: "X Axis",
				pad: 0
			},
			yaxis: {
				label: "Y Axis"
			}	
	    }
	 });
}

function drawnBarStack(tagname,data,label,seriex) {
	document.getElementById(tagname).innerHTML = "";
  	plot1 = jQuery.jqplot (tagname, data, 
    {
  	  stackSeries: true,
  	  captureRightClick: true,
      seriesDefaults:{
            renderer:$.jqplot.BarRenderer,
            rendererOptions: {
            	fillToZero: true,
        	  	barMargin: 10,
        	  	highlightMouseDown: true
            },
			pointLabels: { show: true }
      }, 
      series: label,
	  legend: {
            show: true,
			location: "e",
      		placement: "outside"
        },
      axes: {
            xaxis: {
                renderer: $.jqplot.CategoryAxisRenderer,
                ticks: seriex
            },
            yaxis: {
				padMin : 0
            }
        }
    });
}

function drawnBar(tagname, ticks,data,label) {
  	plot1 = jQuery.jqplot (tagname, data, 
    {
      seriesDefaults:{
            renderer:$.jqplot.BarRenderer,
            barMargin: 10,
            rendererOptions: {fillToZero: true },
			pointLabels: { show: true }
      }, 
      series: label,
	  legend: {
            show: true,
			location: "e",
      		placement: "outside"
        },
      axes: {
            xaxis: {
                renderer: $.jqplot.CategoryAxisRenderer,
                ticks: ticks
            },
            yaxis: {
                pad: 1.2,
				min: 0
            }
        }
    });
}


function limpiaForm(miForm) {
	$(":input", miForm).each(function() {
		var type = $(this).attr("type");
		var tag = this.tagName.toLowerCase();
		if (type == "text" || type == "password" || tag == "textarea" || type == "number"){
			$(this).val("");
		}
		else if (type == "checkbox" || type == "radio")
			this.checked = false;
		else if (tag == "select"){
			$(this).val(0);
			$(this).selectmenu("refresh");
		}
	});
}

function popup(asunto, msg, url){
	$("html").simpledialog2({
		mode: "button",
   		headerText: asunto,
    	headerClose: true,
    	buttonPrompt: msg,
    	buttons : {
    		"OK": {
    			click: function () { 
    				$("#buttonoutput").text("OK");
    				if(url!=""){
    					$(location).attr("href",url);
    				}
    				return true;
    			}
    		},
			"Cancel": {
				click: function () { 
					$("#buttonoutput").text("Cancel");
				},
				icon: "delete",
				theme: "c"
			}
    	}
	});
}

function confirmWJavasript(asunto, msg, metodoJavascript){
	$("html").simpledialog2({
		mode: "button",
   		headerText: asunto,
    	headerClose: true,
    	buttonPrompt: msg,
    	buttons : {
    		"No, Continuar": {
    			click: function () { 
					var f = eval(metodoJavascript);
					f();
					
    				return true;
    			}
    		},
			"Si, esperar": {
				click: function () { 
					$("#buttonoutput").text("Cancel");
				},
				icon: "delete",
				theme: "c"
			}
    	}
	});
}

MasterPopup = function() {
	var popupIdentify = null;
	
	this.createPopup = function(id, asunto, msg, url1, url2, metodoJavascript, headerClose, omitButtonTrue, omitButtonFalse, jsonProps) {
		console.log("[MasterPopup.createPopup]");
		
		var funcYes = null;
		var funcNo = null;
		
		if(id == null) {
			id = this.makeId();
		}
		
		if( $("#"+id).length == 0){
			$("body").append("<div id='"+id+"'></id>");
			popupIdentify = "#"+id;
		}
		else {
			popupIdentify = id;
		}
		
		if(jsonProps == null || jsonProps == "undefined" || jsonProps == undefined) {
			jsonProps = {};
		}
		
		if(jsonProps.urlYes != null) {
			url1 = jsonProps.urlYes;
		}
		
		if(jsonProps.urlNo != null) {
			url2 = jsonProps.urlNo;
		}
		
		if(jsonProps.funcYes != null) {
			funcYes = jsonProps.funcYes;
		}
		
		if(jsonProps.funcNo != null) {
			funcNo = jsonProps.funcNo;
		}
		
		var buttons = {
				"OK" : {
					click : function() {
						$("#buttonoutput").text("OK");
						if(funcYes != null) {
							var f = eval(funcYes);
							f();
						}
						if (url1 != '' && url1 != null) {
							//$(location).attr("href", url1);
							//$("body").append("<a href='"+url1+"' id='masterARDIRECT'  ></a>");
							//$("#masterARDIRECT").trigger("click");
							
						}
						
						$(popupIdentify).remove();
						return true;
					}
				},
				"Cancel" : {
					click : function() {
						$("#buttonoutput").text("Cancel");
						if(funcNo != null) {
							var f = eval(funcNo);
							f();
						}
						if (url2 != '' && url2 != null) {
							$(location).attr("href", url2);
						}
						
						$(popupIdentify).remove();
					},
					icon : "question",
					theme : "c"
				}};
		
		if(omitButtonTrue == true) delete buttons["OK"];
		if(omitButtonFalse == true) delete buttons["Cancel"];
		


		var configuration = {
				mode : "button",
				headerText : asunto,
				headerClose : headerClose,
				buttonPrompt : msg,
				buttons : buttons ,
				callbackOpen: jsonProps.callbackopen,
				callbackClose: jsonProps.callbackClose};
		
		if(jsonProps.callbackopen == null) {
			delete configuration["callbackOpen"]; 
		};
		if(jsonProps.callbackClose == null){
			delete configuration["callbackClose"];
		};
		
		$(popupIdentify).simpledialog2(configuration);
	};
	
	this.makeId = function()  {
		console.log("[MasterPopup.makeid]");
	    var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    for( var i=0; i < 5; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));

	    return text;
	};
	
	this.bloqPopup =  function(asunto, msg , configura) {
		console.log("[MasterPopup.bloqPopup]");
		this.createPopup(null, asunto, msg, null, null, null, false,true,true, configura);
	};
	
	this.alertPopup = function(asunto, msg, configura) {
		console.log("[MasterPopup.alertPopup]");
		this.createPopup(null, asunto, msg, null, null, null, false, false, true, configura);
	};
	
	this.confirmPopup = function(asunto, msg, configura) {
		console.log("[MasterPopup.confirmPopup]");
		this.createPopup(null, asunto, msg, null, null, null, false, false, false, configura);
	};
	
	this.closePopup = function() {
		console.log("[MasterPopup.closePopup]");
		
		$(popupIdentify).simpledialog2('close');
	};
	
	this.ACTION_REFRESHPAGE = function()
	{
	    $.mobile.changePage(
	    	    window.location.href,
	    	    true, true
	    	  );
	};
};


function superPopup(id, asunto, msg, url1, url2, metodoJavascript) {
	var p = new MasterPopup();
	p.createPopup(id, asunto, msg, url1, url2, metodoJavascript);
}

function popup(asunto, msg, url1, url2) {
	var p = new MasterPopup();
	p.createPopup("html", asunto, msg, url1, url2);
}

function getUrlVars(params) {
	var vars = [], hash;
	var hashes = params.split("&");
	for ( var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split("=");
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}

function updateDateTime(field,format) {
    now = moment(new Date());
	$(field).val(now.format(format));
};

function detectBrowser(namediv) {
	var useragent = navigator.userAgent;
	var mapdiv = document.getElementById(namediv);

	if (useragent.indexOf("iPhone") != -1 || useragent.indexOf("Android") != -1 ) {
		mapdiv.style.width = "100%";
		mapdiv.style.height = "100%";
	}
	else {
		mapdiv.style.width = $(window).width();
		mapdiv.style.height = $(window).height();
	}
}
