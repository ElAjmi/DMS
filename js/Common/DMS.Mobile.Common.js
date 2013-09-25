if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Common = {};

DMS.Mobile.Common = 
{
	 
	AcceeServeur: null,
	modeDebug : false,
//	configuration : this.GetConfiguration,
	//ServeurUrl : "http://192.168.1.8:80/ninject/Service1.svc/",
	//PositionDelay :12000 ,
	//Perimetre : 5,
	//ServeurUrl : configuration.URL,
	//PositionDelay : configuration.Frequence,
	//Perimetre : configuration.Perimetre,
	
	
	
	init : function(callback)
	{
		try
		{
			var Conf = JSON.parse(sessionStorage.getItem("Configuration"));
			
			if (Conf == null)
			{
					configurationDTO = new DMS.Mobile.Configuration();
	
						configurationDTO.Frequence = 12000;
						configurationDTO.Perimetre = 5;
						configurationDTO.URL = "http://192.168.1.8:80/ninject/Service1.svc/";
						
						
						  sessionStorage.setItem("Configuration", JSON.stringify(configurationDTO));
			}
	
		   callback();
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : init in common",'alert','e'); 
		}
	
	},
		
		
		
		
		ParseDateJson : function(d)
		{
			try
			{
				//var date = new Date(eval(d.split('/').reverse().join('')));
				var date = eval("new "+ d.split('/').reverse().join(''));
					var day = date.getDate();
					var month = (1+date.getMonth());
					var year = date.getFullYear().toString();
					
					if (day < 10)
					{
						 day = "0"+day;
					}
					if (month < 10)
					{
						 month = "0"+month;
					}
					
						return(day + '/' + month + '/'  + year);
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : ParseDateJson in common" ,'alert','e'); 
			}
		},
		ParseHeureJson : function(d)
		{
			try
			{
				var date = eval("new "+ d.split('/').reverse().join(''));
				var hours = (date.getHours())+1;
				var minutes = date.getMinutes();
				if(hours < 10)
				{
					hours = "0"+hours;
				}
				if(minutes < 10)
				{
					minutes = "0"+minutes;
				}
				
				return(hours+':'+minutes);
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : ParseHeureJson in common",'alert','e'); 
			}
		},		
		currentHours : function()
		{
			try
			{
				var date = new Date;
				var hours = (date.getHours())+1;
				var minutes = date.getMinutes();
				if(hours < 10)
				{
					hours = "0"+hours;
				}
				if(minutes < 10)
				{
					minutes = "0"+minutes;
				}
				
				return(hours+':'+minutes);
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : currentHours in common",'alert','e'); 
			}
		},
		currentDate : function()
		{
			try
			{
				var date = new Date;
				var day = date.getDate();
					var month = (1+date.getMonth());
					var year = date.getFullYear().toString();
					
					if (day < 10)
					{
						 day = "0"+day;
					}
					if (month < 10)
					{
						 month = "0"+month;
					}
					
						return(day + '/' + month + '/'  + year);
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : currentDate in common",'alert','e'); 
			}
		},
		
	DisplayProperty :function(obj)
	 {
		 try
		 {
			var str = '';
			for (var p in obj) {
				if (obj.hasOwnProperty(p)) {
					str += p + ' : ' + obj[p] + '\n';
				}
			}
			alert(str);
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : DisplayProperty in common",'alert','e'); 
		}
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
	
	RedirectToListeCommandes : function()
	{
		window.location = './Commande.html';
	},
	
	RedirectionToMissionsParPointVente: function()
	{
		window.location = './MissionsPV.html';
	},
	
	DrawLoading : function()
	{
		try
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
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : DrawLoading in common",'alert','e'); 
		}
	},
	

     CallService: function(callback,Url,form1) 
	 {
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
							form.AcceeServeur = true;
							DMS.Mobile.Common.Alert("result = " + msg);
							form.ServiceSucceeded(msg,callback,form1);
						},  
						 error: function (msg) {
							 form.AcceeServeur = false;
                             form.ServiceFailed(msg);
                        }
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
	   try
	   {
			DMS.Mobile.Common.Alert("result = " + result);					

			   JsonObject = result;
			   
			   callback(JsonObject,form);	
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : ServiceSucceded in common",'alert','e'); 
		}		   
		},
	
	TestServer: function(callback)
	{
		try
		{
			var Conf = JSON.parse(sessionStorage.getItem("Configuration"));
			alert("test service");
			var form = this;
			var methode = "TestServer?";
			 var URL =Conf.URL+methode;
			 
			 var form = this;
				DMS.Mobile.Common.CallService(function(Json,Form){callback(form.AcceeServeur);},URL,form);
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : TestServer in common",'alert','e'); 
		}
	},
		
	/*	TestServerFunction : function(json,form)
		{
			if ( json != null)
			{
				form.AcceeServeur = json;
			}
		    else 
		    {
				form.AcceeServeur = false;
			}
			   
		},
	
	*/
	
	
	 deg2rad: function (angle){
		 try
		 {
    // Converts the number in degrees to the radian equivalent  
    // 
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/deg2rad    // +   original by: Enrique Gonzalez
    // *     example 1: deg2rad(45);
    // *     returns 1: 0.7853981633974483
    return (angle / 180) * Math.PI;
	}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : deg2rad in common",'alert','e'); 
		}
},
 
 calculDistanceKM:function (lat1,long1,lat2,long2)
 {
	 try
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
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : calculDistanceKM in common",'alert','e'); 
		}
}
	
	
}