if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.ZoneRequest = {};

DMS.Mobile.ZoneRequest = 
{
	
	Zone : null,
    connexion: null,
	
	
	insertZoneIntoArray : function(ZoneObject,form,callbackViewModel)
	{
		try
		{
		form.Zone = ZoneObject;
		//alert"appel ville")
		callbackViewModel(form.Zone);
		}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : insertZoneIntoArray in ZoneRequest",'alert','e'); 
				
				  var exception = new DMS.Mobile.Exception();
						exception.FichierE = "VilleRequest";
						exception.FonctionE = "insertZoneIntoArray";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.Zone);
						});
				
			}
	},
	
	////////////////////////////////// ///////////// Server //////////////////////////
	
	SelectZoneByPersonnelFromServer : function (callbackViewModel,PersonnelID)
	{
		try
		{
		var Conf = JSON.parse(localStorage.getItem("Configuration"));
		 
		  form =this;
		
		  var Data = "PersonnelID="+PersonnelID; 
		  
		  var methode= "GetZoneDTOByPersonnelID?";

		  var URL =  Conf.URL+methode+Data;

		     DMS.Mobile.Common.CallService(function(JsonObject,Form){form.createZoneDTO(JsonObject,Form,callbackViewModel);},URL,form);
			 	}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectZoneByPersonnelFromServer in ZoneRequest",'alert','e'); 
				
				 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "VilleRequest";
						exception.FonctionE = "SelectZoneByPersonnelFromServer";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.Zone);
						});
			}
	},

createZoneDTO : function (json,form,callbackViewModel)
{
	try
	{
	if ( json != null)
		{
			var synch = "true";

			var zoneDTO = new DMS.Mobile.Zone();
			
				zoneDTO.ZoneID = json.ZoneID ;
				zoneDTO.Designation = json.Designation;
				zoneDTO.Personnel = json.Personnel;
				zoneDTO.listVilles = json.Villes; 

			form.InsertZone(zoneDTO,synch,form,callbackViewModel);
			
			
		}
		else{callbackViewModel(form.Zone);}	
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : createZoneDTO in ZoneRequest",'alert','e'); 
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "VilleRequest";
						exception.FonctionE = "createZoneDTO";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.Zone);
						});
			
			}
},

	/////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////Insertion LOCAL //////////////////////////////////////	

  InsertZone : function (zone,synch,form,callbackViewModel)
	{
		try
		{
		form.InsertZoneIntoLOCAL(zone,synch,form,callbackViewModel);
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : InsertZone in ZoneRequest",'alert','e'); 
			
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "VilleRequest";
						exception.FonctionE = "InsertZone";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.Zone);
						});
			
			}
	},
	
 insertZone : function (zone)
	{
		try
		{
			var form = this;	
			this.InsertZoneIntoLOCAL(zone,"false",form,null);
				}
			catch(err)
			{
				 
			
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "VilleRequest";
						exception.FonctionE = "insertZone";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							DMS.Mobile.Notification.ShowMessage(err.message+" : insertZone in ZoneRequest",'alert','e');
						});
			}
	},

 InsertZoneIntoLOCAL : function (ZoneObject,synch,formReq,callbackViewModel)
	{
		try
		{
		   if (synch == "false")
			{
		  	    formReq.connexion.transaction(function(tx){ formReq.InsertIntoZone(tx, formReq, ZoneObject,synch) }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoZone");
				}); 
		    }
			else
			{
				formReq.connexion.transaction(function(tx){ formReq.InsertIntoZone(tx, formReq,ZoneObject,synch); }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoZone");},function(){
							
						formReq.insertZoneIntoArray(ZoneObject,formReq,callbackViewModel)	;		
							}); 
			}		
	
		}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : InsertZoneIntoLOCAL in ZoneRequest",'alert','e'); 
				
					var exception = new DMS.Mobile.Exception();
						exception.FichierE = "VilleRequest";
						exception.FonctionE = "InsertZoneIntoLOCAL";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(formReq.Zone);
						});
			}
	},
	
	InsertIntoZone : function (requete,formReq,ZoneObject,synch)
	{
		try
		{
	 requete.executeSql('INSERT INTO Zone (ZoneID,Designation,Synch) VALUES ('+ZoneObject.ZoneID+',"'+ZoneObject.Designation+'","'+synch+'")');	
	 	}
			catch(err)
			{
				 
				        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "VilleRequest";
						exception.FonctionE = "InsertIntoZone";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoZone in ZoneRequest",'alert','e');
						});
			}
	},
	/////////////////////////////////////////////////////////////////////////////////
	
		 //////////////////////////////////////// Delete All Zone ////////////////////////
DeleteAllZone : function(callback)
{
	try
	{
			var form = this;	
			this.connexion.transaction(function(tx){ form.DeleteZones(tx, form,callback);}, function(err){ DMS.Mobile.Common.errors(err,"DeleteZones");
			
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "VilleRequest";
						exception.FonctionE = "DeleteZones";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
			
			});
	 }
	 catch(err)
	 {
			DMS.Mobile.Notification.ShowMessage(err.message+" : DeleteAllZone in ZoneRequest",'alert','e'); 
			
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "VilleRequest";
						exception.FonctionE = "DeleteAllZone";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
	 }	
}, 

DeleteZones : function(requete, form,callback)
{
	requete.executeSql("DELETE  FROM Zone ", [],
              function(tx, result) {				
				form.querySuccessDELETEAll(form,callback);
				}, 
                function(err){DMS.Mobile.Common.errors(err,"DeleteZones");
				
				          var exception = new DMS.Mobile.Exception();
						exception.FichierE = "VilleRequest";
						exception.FonctionE = "DeleteZones";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
				
				});
},

querySuccessDELETEAll : function(form,callback)
{
	callback();
},

///////////////////////////////////////////////////////////////////////////////////////////////////

	
	
	
}