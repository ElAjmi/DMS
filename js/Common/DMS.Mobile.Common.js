if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Common = {};

DMS.Mobile.Common = 
{
	AcceeServeur: true,
	modeDebug : false,
	ServeurUrl : "http://192.168.1.8:80/ninject/Service1.svc/",
	//ServeurUrl : "http://127.0.0.1:32173/Service1.svc/",
	PositionDelay : 120000,
	Perimetre : 5,
	
		
		ParseDateJson : function(d)
		{
			var date = new Date(parseInt(d.slice(6, -2)));
				var day = date.getDate() ;
				var month = (1+date.getMonth());
				var year = date.getFullYear().toString();
				
				if ((1<= day)&&(day<=9))
				{
					var day = "0"+day;
				}
				if ((1<= month)&&(month<=9))
				{
					var month = "0"+month;
				}
				
				 	return(day + '/' + month + '/'  + year);
		},		
		
		
	DisplayProperty :function(obj)
	 {
	    var str = '';
	    for (var p in obj) {
	        if (obj.hasOwnProperty(p)) {
	            str += p + ' : ' + obj[p] + '\n';
	        }
	    }
	    alert(str);
	},  
	
	errors:function (err,type) {
        alert("error in "+type+" : " + err.message);   
    },
	
	
	Alert : function(obj)
	{
		if(this.modeDebug == true)
		{
			alert(obj);
		}
	},
	
	RedirectToLogin : function()
	{
		window.location = './login.html';
	},
	
	RedirectToCalendrier : function()
	{
		window.location = './Calendrier2.html';
	},
	
	RedirectToCommande : function()
	{
		window.location = './FormulaireCommande.html';
	},
	
	
	DrawLoading : function()

	{
		var cl = new CanvasLoader('canvasloader-container');
		cl.setColor('#100b9e'); // default is '#000000'
		cl.setShape('roundRect'); // default is 'oval'
		cl.setDiameter(29); // default is 40
		cl.setDensity(15); // default is 40
		cl.setRange(1.2); // default is 1.3
		cl.setSpeed(1); // default is 2
		cl.setFPS(20); // default is 24
		cl.show(); // Hidden by default
		
		// This bit is only for positioning - not necessary
		  var loaderObj = document.getElementById("canvasLoader");
  		loaderObj.style.position = "absolute";
  		loaderObj.style["top"] = cl.getDiameter() * -0.5 + "px";
  		loaderObj.style["left"] = cl.getDiameter() * -0.5 + "px";
	},
	

     CallService: function(callback,Url,form1) {
			
			
				var form = this;
				 DMS.Mobile.Common.Alert("CallService");
					$.ajax({
						async: false,
                        data: "{}",
						cache: true,
						url: Url,
						type: "GET",
						contentType: "application/javascript",
						dataType: "jsonp",
				
						success: function(msg) {
							DMS.Mobile.Common.Alert("result = " + msg);
							form.ServiceSucceeded(msg,callback,form1);
						},  
					});
			
	         
					
    },
   ServiceFailed: function(xhr) {
			   alert("ServiceFailed" + xhr.responseText);
		
				if (xhr.responseText) {
					var err = xhr.responseText;
					if (err)
						error(err);
					else
						error({ Message: "Unknown server error." })
				}
			return;
		},
		
   ServiceSucceeded: function(result,callback,form) {
			DMS.Mobile.Common.Alert("result = " + result);					

			   JsonObject = result;
			   
			   callback(JsonObject,form);			   
		},
	
	/*TestServer: function()
	{
		
		}*/
		
/*	Pinger_ping : function(ip, callback) 
	{

			  if(!this.inUse) {
			
				this.inUse = true;
				this.callback = callback
				this.ip = ip;
			
				var _that = this;
			
				this.img = new Image();
			
				this.img.onload = function() {_that.good();};
				this.img.onerror = function() {_that.good();};
			
				this.start = new Date().getTime();
				this.img.src = "http://" + ip;
				this.timer = setTimeout(function() { _that.bad();}, 1500);
			
			  }
	}
	*/
	
	
	 deg2rad: function (angle){
    // Converts the number in degrees to the radian equivalent  
    // 
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/deg2rad    // +   original by: Enrique Gonzalez
    // *     example 1: deg2rad(45);
    // *     returns 1: 0.7853981633974483
    return (angle / 180) * Math.PI;
},
 
 calculDistanceKM:function (lat1,long1,lat2,long2)
 {
	var r = 6366;
	 
	var lat1 = lat1;
	var lon1 = long1;
	 
	var lat2 = lat2;
	var lon2 = long2;
 
/**
 * Conversion des entrées en ° vers des Radians
 */
lat1 = this.deg2rad(lat1);
lon1 = this.deg2rad(lon1);
lat2 = this.deg2rad(lat2);
lon2 = this.deg2rad(lon2);
 
/**
 * Formule simple
 * d=acos(sin(lat1)*sin(lat2)+cos(lat1)*cos(lat2)*cos(lon1-lon2))
 */
 
var ds = Math.acos( Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon1-lon2) );
ds = ds * r;
return ds // Distance en km : 0.024053337627628308
}
	
	
}