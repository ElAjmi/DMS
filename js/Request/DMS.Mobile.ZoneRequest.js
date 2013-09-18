if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.ZoneRequest = {};

DMS.Mobile.ZoneRequest = 
{
	
	Zone : null,
    connexion: null,
	
	
	insertZoneIntoArray : function(ZoneObject,form,callbackViewModel)
	{
		form.Zone = ZoneObject;
		alert("appel ville")
		callbackViewModel(form.Zone);
	},
	
	////////////////////////////////// ///////////// Server //////////////////////////
	
	SelectZoneByPersonnelFromServer : function (callbackViewModel,PersonnelID)
	{
		  form =this;
		
		  var Data = "PersonnelID="+PersonnelID; 
		  
		  var methode= "GetZoneDTOByPersonnelID?";

		  var URL = DMS.Mobile.Common.ServeurUrl+methode+Data;

		     DMS.Mobile.Common.CallService(function(JsonObject,Form){form.createZoneDTO(JsonObject,Form,callbackViewModel);},URL,form);
	},

createZoneDTO : function (json,Form,callbackViewModel)
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
},

	/////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////Insertion LOCAL //////////////////////////////////////	

  InsertZone : function (zone,synch,form,callbackViewModel)
	{
		form.InsertZoneIntoLOCAL(zone,synch,form,callbackViewModel);
	},
	
 insertZone : function (zone)
	{
			var form = this;	
			this.InsertZoneIntoLOCAL(zone,"false",form,null);
	},

 InsertZoneIntoLOCAL : function (ZoneObject,synch,formReq,callbackViewModel)
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
	
	},
	
	InsertIntoZone : function (requete,formReq,ZoneObject,synch)
	{
	 requete.executeSql('INSERT INTO Zone (ZoneID,Designation,Synch) VALUES ('+ZoneObject.ZoneID+',"'+ZoneObject.Designation+'","'+synch+'")');	
	}
	/////////////////////////////////////////////////////////////////////////////////
}