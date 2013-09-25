if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};
	
	
	
DMS.Mobile.GammeRequest = {};	
DMS.Mobile.GammeRequest = 
{
	    JsonObject : null,
		connexion : null,
		ListGamme : [],
				
	
GetListGammeFromServer : function(callbackViewModel)
	{
		try
		{
		var Conf = JSON.parse(sessionStorage.getItem("Configuration"));
		
		DMS.Mobile.Common.Alert("get list gamme from server");
		var methode = "GetListGammeDTO";
		var URL = Conf.URL+methode;
		 
		 var form = this;
		    DMS.Mobile.Common.CallService(function(json,Form){form.CreateGammeDTO(JsonObject,Form,callbackViewModel);},URL,form);
			
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : GetListGammeFromServer in GammeRequest",'alert','e'); 
		}
		
	},
	
	
CreateGammeDTO : function (json,form,callbackViewModel)
	{
		try
		{
		if ( json != null)
		{
			var synch = "true";
			var len =json.length;

			for (var i=0;i<json.length;i++)
			{
			var gammeDTO = new DMS.Mobile.Gamme();
			gammeDTO.GammeID = json[i].GammeID;
			gammeDTO.Designation = json[i].Designation;
			gammeDTO.ListFamilles = json[i].Familles;
			gammeDTO.ListObjectifs = json[i].Objectifs;
			gammeDTO.ListPromotions = json[i].Promotions;
			gammeDTO.ListRelevePresencePrixConcurrents = json[i].RelevePresencePrixConcurrents;
			gammeDTO.ListRelevePrix = json[i].RelevePrix;
			
			form.insertGamme(gammeDTO,synch,form,len,callbackViewModel);
			}

		}
		else{callbackViewModel(form.ListGamme);}	
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : CreateGammeDTO in GammeRequest",'alert','e'); 
		}
	},
	
	
	insertGammeIntoArray : function(Gamme,form,len,callbackViewModel)
	{
		try
		{
		form.ListGamme.push(Gamme)
		if(form.ListGamme.length == len)
		{
			callbackViewModel(form.ListGamme);
		}
				}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertGammeIntoArray in GammeRequest",'alert','e'); 
		}
	},
	
	insertGamme : function(gamme,synch,form,len,callbackViewModel)
	{
		try
		{
	      form.InsertGammeIntoLOCAL(gamme,synch,form,len,callbackViewModel);
		 		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertGamme in GammeRequest",'alert','e'); 
		}
	},
	
		
InsertGammeIntoLOCAL: function(GammeObject,synch,formReq,len,callbackViewModel) {
  try
  {     
	     formReq.connexion.transaction(function(tx){ formReq.InsertIntoGamme(tx, formReq,GammeObject,synch) }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoGamme");},function(){formReq.insertGammeIntoArray(GammeObject,formReq,len,callbackViewModel);}); 
	}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertGammeIntoLOCAL in GammeRequest",'alert','e'); 
		}	   		
},

InsertIntoGamme : function(requete,form,GammeObject,synch) {
   try
   {
			requete.executeSql('INSERT INTO Gammes (GammeID, Designation, Synch) VALUES('+GammeObject.GammeID+',"'+GammeObject.Designation+'","'+synch+'")');
			
    DMS.Mobile.Common.Alert("Fin insertion Gamme dans la BD");     
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoGamme in GammeRequest",'alert','e'); 
		}  																																
},
	 
	
	
}