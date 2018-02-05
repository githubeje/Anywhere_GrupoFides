
var sqlServlet = null;

/*
$(document).ready(function(){
	console.log("[ServerSQL onDeviceReady]");
    serverSQL = new ServerSQL();
    
});
*/

function ServerSQL(booleanDebug) {
	this.db = openDatabase("Database", "1.0", "Cordova Demo", 200000);
	this.len = 0;
	this.globalTx = null;
	this.globalResults = null;
	this.fields = "";
	this.debug = true;
	
	if(booleanDebug != null) {
		debug = booleanDebug;
	}
	
	this.errorCB = function(err,sql) {
		if( this.debug ) {
			console.log("Error processing SQL: "+sql);
		}
	};

	this.successCB = function(sql) {
		if( this.debug ) {
			console.log("success!:"+sql);
		}
	};
	
	
	this.insert = function(sql, funcJavascript) {
		
		if( this.debug ) {
			console.log("SQL:"+sql);
		}
		
		var f = function(tx) {
			tx.executeSql(sql);
			
		};
		
		this.db.transaction(f, null, funcJavascript, null);
	};
    
	this.select = function(sql) {
		
		if( this.debug == true) {
			console.log("SQL:"+sql);
			console.log("[funcion 2F]");		
		}
		
		var localOnEndFunction = this.onEndFunction;
		var obj = this;
		
		if( this.debug ) {
			console.log("[funcion 3F]");
		}
		
		var f = function(tx) {	
			if( this.debug ) {
				console.log("[funcion 4F]");
			}
			var s = new ServerSQL();
			
			if( this.debug ) {
				console.log("[funcion 4.1F]");
			}
			var sqlInside = sql;
			var errorCBinside = s.errorCB;
			
			if( this.debug ) {
				console.log("[funcion 5F]");
			}
			tx.executeSql(sqlInside, [], function(tx, results) {
				if( this.debug ) {
					console.log("[function 5.1F]");
				}
				obj.globalTx = tx;
				obj.globalResults = results;
				
		    	if( results != null) {
		    		obj.len = results.rows.length;
		    		
		    		if( this.debug ) {
		    			console.log("DEMO table: " + obj.len + " rows found.");
		    		}
		    	}
		    	
		    	if(localOnEndFunction != null) {
					var f = eval(localOnEndFunction);
					f();
				}
		    }, errorCBinside);		
		};
		
		if( this.debug ) {
			console.log("[funcion 6F]");
		}
		
		this.db.transaction(f, this.errorCB);
    };

	
	this.createTable = function(tableName, array) {
		var i = 0;
		
		
		if(array != null) {
			for(i=0 ; i < array.length; i++) {
				this.fields += array[i];
				
				if( (i+1) <  array.length ) {
					this.fields += ",";
				}
			}
		}
		
		this.insert('CREATE TABLE IF NOT EXISTS '+tableName+' ('+this.fields+')');
	};
	
	this.drop = function(table) {
		if(table == null) {
			table = "DEMO"; 
		};
		this.insert("delete from "+table);
	};
	
	
	this.addValue = function(key, value) {
		this.insert("INSERT INTO DEMO  ("+this.fields+") VALUES ('"+key+"','"+value+"') ");
	};

	this.printTable = function(tableName, top) {
		this.select("select * from "+tableName);
	};

	this.loadTable = function(sql, javascriptFunction) {
		this.onEndFunction = javascriptFunction; 
		this.select(sql);
	};
	
	this.size = function() {
		return this.len;
	};
};

/* 2014 Dic 31
 * ES UN SINGLETON*/
function MapSQL(tNameParam) {
	var conf = new Config();
	var impl = null;
	
	if(conf.getMethodStorage() == "html5") {
		impl  = new SqlImplementation(tNameParam);
	}
	else if(conf.getMethodStorage() == "WindowLocalStorage") {
		impl = new WindowLocalStorageImplementation(tNameParam);
	}
	
	this.add = function(key, value,funcJavascript) {		
		impl.add(key, value,funcJavascript);
	};
	
	this.del = function(key,funcJavascript) {
		impl.del(key,funcJavascript);
	};
	
	this.delAll = function(funcJavascript) {
		impl.delAll(funcJavascript);
	};
	
	this.clear = function(funcJavascript) {
		impl.clear(funcJavascript);
	};
	
	this.keySet = function(funcIterateData) {
		impl.keySet(funcIterateData);
	};
	
	this.exist = function (key, funcExistData) {
		impl.exist(funcExistData);
	};
	
	this.get = function(key, funcGetData) {
		impl.get(key,funcGetData);
	};
} 

function WindowLocalStorageImplementation(tNameParam) {
	this.tName = tNameParam;

	if(this.tName == null) {
		this.tName = "MAP_TABLE";
	}
	
	this.add = function(key, value,funcJavascript) {
		/*
		 var columnas = JSON.parse(window.localStorage.getItem(this.tName));
		columnas.push({id:key, data:value});
		window.localStorage.setItem(this.tName, JSON.stringify(columnas));
		*/
		
		window.localStorage.setItem(this.tName + "_" + key, value);
		if(funcJavascript != null) {
			var f = eval(funcJavascript);
			f();
		}
		
	};
	
	this.del = function(key,funcJavascript) {
		 /*try {
			var columnas = JSON.parse(window.localStorage.getItem(this.tName ));
			
			var i = 0;
			var newArray = [];
			$.each(columnas, function(k,v) {
				if(v != null) {
					console.log(v.id);
					if(v.id != key) {
						newArray.push(v);
					}
				}
				i++;
			});
			
			window.localStorage.setItem(this.tName, JSON.stringify(newArray));
		}
		catch(e) {
			console.log(e);
		}
		finally {
			var columnas = JSON.parse(window.localStorage.getItem(this.tName));
			console.log(columnas);
			
			if(funcJavascript != null) {
				var f = eval(funcJavascript);
				f();
			}
		}
		*/
		window.localStorage.removeItem(this.tName+ "_" + key)
		
		if(funcJavascript != null) {
			var f = eval(funcJavascript);
			f();
		}
	};
	
	this.delAll = function(funcJavascript) {
		console.log("delAll")
		console.trace();
		
		var arrayToDelete  = new Array();
		
		for(var i = 0; i < window.localStorage.length; i++){
		    var key = window.localStorage.key(i);
		    if(key != null) {
		    	if(key.length >= this.tName.length) {
		    		//console.log("this:"+key.substring(0, this.tName.length) + "--tgus.tName:"+this.tName);
		    		
		    		if(key.substring(0, this.tName.length) == this.tName) {
		    			arrayToDelete.push(key);
		    		}
		    	}
		    }
		}
		
		console.log(arrayToDelete);
		for(var i = 0; i < arrayToDelete.length; i++){
			 window.localStorage.removeItem(arrayToDelete[i]);
		}
		/*
		window.localStorage.setItem(this.tName, JSON.stringify(new Array));
		*/
		if(funcJavascript != null) {
			var f = eval(funcJavascript);
			f();
		}
		else  {
			return;
		}
			
	};
	
	this.clear = function(funcJavascript) {
		  this.delAll(funcJavascript);
	};
	
	this.keySet = function(funcIterateData) {
		var array = new Array();
		
		for(var i = 0; i < window.localStorage.length; i++){
		    var key = window.localStorage.key(i);
		    if(key != null) {
		    	if(key.length >= this.tName.length) {
		    		if(key.substring(0, this.tName.length + 1) == this.tName) {
		    			array.push(key.substring(this.tName.length + 1));
		    		}
		    	}
		    }
		}
		
		if(funcIterateData != null) {
			var f = eval(funcIterateData);
			f(array);
		}
		
		else {
			return array;
		}
		/* 
		try {
			var columnas = JSON.parse(window.localStorage.getItem(this.tName));
			var i = 0;
			var array = new Array();
			$.each(columnas, function(k,v) {
				array.push(v.id);
			});
			
			if(funcIterateData != null) {
				var f = eval(funcIterateData);
				f(array);
			}
		}
		catch(e) {
			console.log(e);
		}
		*/
	};
	
	this.exist = function (key, funcExistData) {
		
		var si = window.localStorage.getItem(this.tName +"_"+key)!=null;
		if(funcExistData != null) {
			var f= eval(funcExistData);
			f(si) ;	
		}
		else {
			return si;
		}
		
		/*
		try {
			var si = false;
			var columnas = JSON.parse(window.localStorage.getItem(this.tName +"_"+key)!=null);
			if(columnas != null) {		
				$.each(columnas, function(k,v) {
					if(v.id = key) {
						si = true;
						return true;
					}
				});
			}
		}
		catch(e) {
			console.log(e);
		}
		if(funcExistData != null) {
			var f = eval(funcExistData);
			f(si);
		}
		else {
			return si;
		}
		*/
	};
	
	this.get = function(key, funcGetData) {
		var value = window.localStorage.getItem(this.tName +"_"+key);
		var json = {id:key,data:value};
		
		if(funcGetData != null) {
			var f= eval(funcGetData);
			f(json) ;	
		}
		else {
			return json;
		}
		
		/*
		try {
			var json = null;
			
			var stor = window.localStorage.getItem(this.tName);
			 
			var columnas = JSON.parse(stor);
			 
			if(columnas != null) {		
				$.each(columnas, function(k,v) {
					if(v.id == key) {
						//console.log(v);
						json = v;
						return true;
					}
				});
			}
			
			if(funcGetData != null) {
				if(json == null) {
					json = {id:null,value:null};
				}
				var f= eval(funcGetData);
				f(json) ;	
			}
 
		}
		catch(e) {
			console.log(e);
		}
		*/
	};
	

	
	if(!this.exist(this.tName)){
		//console.log("[No Existe "+this.tName+"]");
		window.localStorage.setItem(this.tName, JSON.stringify(new Array()));
	}

}

function SqlImplementation(tNameParam) {
	this.tName = tNameParam;
	this.sSql = new ServerSQL(false);
	
	if(this.tName == null) {
		this.tName = "MAP_TABLE";
	}
	
	
	this.sSql.createTable( this.tName , ["id", "data"]);
	
	
	
	this.add = function(key, value,funcJavascript) {		
		this.sSql.insert("INSERT INTO "+this.tName+" VALUES ('"+key+"','"+value+"')",  function() {
			console.log("[AFTER INSERT INTO]");
			if(funcJavascript != null) {
				var f = eval(funcJavascript);
				f();
			}
		}); 
	};
	
	this.del = function(key,funcJavascript) {
		this.sSql.insert("DELETE FROM "+this.tName+" WHERE id ='"+key+"'", function() {
			if(funcJavascript != null) {
				var f = eval(funcJavascript);
				f();
			}
		}); 
	};
	
	this.delAll = function(funcJavascript) {
		this.sSql.insert("DELETE FROM "+this.tName+" ", function() {
			if(funcJavascript != null) {
				var f = eval(funcJavascript);
				f();
			}
		}); 
	};
	
	this.clear = function(funcJavascript) {
		this.sSql.insert("DELETE FROM "+this.tName , function() {
			if(funcJavascript != null) {
				var f = eval(funcJavascript);
				f();
			}
		}); 
	};
	
	this.keySet = function(funcIterateData) {
		var localsSql = this.sSql;
		
		this.sSql.loadTable("SELECT * FROM "+this.tName+" ORDER BY ID" , function() {
			if( localsSql.globalResults.rows.length > 0 ) {
				var size = localsSql.globalResults.rows.length; 
				var array = new Array();
				var row = null;
				
				if ( size > 0) {
					for(var i = 0 ; i < size ; i++) {
						row = localsSql.globalResults.rows.item(i);
						array.push(row);
					}
			    }
				
				if(funcIterateData != null) {
					var f = eval(funcIterateData);
					f(array);
				}
			}
		}); 
		
	};
	
	this.exist = function (key, funcExistData) {
		
		this.get(key, function(data) {
			if(funcExistData != null) {
				var f = eval(funcExistData);
				f(data!=null);
			}
		});
		
	};
	
	this.get = function(key, funcGetData) {
		var localsSql = this.sSql;
		var obj = this;
		
		this.sSql.loadTable("SELECT * FROM "+this.tName+"  WHERE ID ='"+key+"'", function() {
			var retValueGet = null;
			
			if (localsSql.globalResults.rows.length > 0) {
				retValueGet = localsSql.globalResults.rows.item(0);
		    }
			
			if(funcGetData != null) {
				var f = eval(funcGetData);
				f(retValueGet);
			}
		}); 

	};
}