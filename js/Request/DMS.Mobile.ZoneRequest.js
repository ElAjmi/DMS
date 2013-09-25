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
		alert("appel ville")
		callbackViewModel(form.Zone);
		}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : insertZoneIntoArray in ZoneRequest",'alert','e'); 
			}
	},
	
	////////////////////////////////// ///////////// Server //////////////////////////
	
	SelectZoneByPersonnelFromServer : function (callbackViewModel,PersonnelID)
	{
		try
		{
		var Conf = JSON.parse(sessionStorage.getItem("Configuration"));
		 
		  form =this;
		
		  var Data = "PersonnelID="+PersonnelID; 
		  
		  var methode= "GetZoneDTOByPersonnelID?";

		  var URL =  Conf.URL+methode+Data;

		     DMS.Mobile.Common.CallService(function(JsonObject,Form){form.createZoneDTO(JsonObject,Form,callbackViewModel);},URL,form);
			 	}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectZoneByPersonnelFromServer in ZoneRequest",'alert','e'); 
			}
	},

createZoneDTO : function (json,Form,callbackViewModel)
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
				DMS.Mobile.Notification.ShowMessage(err.message+" : insertZone in ZoneRequest",'alert','e'); 
			}
	},

 InsertZoneIntoLOCAL : function (ZoneObject,synch,formReq,callbackViewModel)
	{
		try
		{
		   if (synch == "false")
			{
		  	    formReq.connexion.transaction(function(tx){ formReq.InsertIntoZone(tx, formReq, ZoneObject,synch) }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoZone");}); 
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
				DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoZone in ZoneRequest",'alert','e'); 
			}
	}
	/////////////////////////////////////////////////////////////////////////////////
}