if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Common = {};

DMS.Mobile.Common = 
{
	AcceeServeur: true,
	modeDebug : true,
	//ServeurUrl : "http://192.168.1.11:80/ninject/Service1.svc/",
	ServeurUrl : "http://192.168.1.100/Webservice/Service1.svc/",
	//ServeurUrl : "http://scan-ingeniering.no-ip.biz/Webservice/Service1.svc/",
	
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
		window.location = './Calendrier.html';
	},
	
	
	DrawLoading : function()
	{
		var cl = new CanvasLoader('canvasloader-container');
			cl.setColor('#00aeff'); // default is '#000000'
			cl.setShape('spiral'); // default is 'oval'
			cl.setDiameter(100); // default is 40
			cl.setDensity(40); // default is 40
			cl.setRange(1.3); // default is 1.3
			cl.setFPS(24); // default is 24
			cl.show(); // Hidden by default
			
			// This bit is only for positioning - not necessary
			var loaderObj = document.getElementById("canvasLoader");
			
			$("#canvasloader-container").append("<h3>Chargement en cours</h3></br></br>");
			$("#canvasloader-container").css('background-color','rgba(0, 0, 0, 0.1)');
			$('#page').css("width","400px");
	  		loaderObj.style["top"] = 0 + "px";
	  		loaderObj.style["right"] = 0 + "px";
	}
	
	/*TestServer: function()
	{
		
		}*/
	
}