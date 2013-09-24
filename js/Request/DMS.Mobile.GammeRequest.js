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
		var Conf = JSON.parse(sessionStorage.getItem("Configuration"));
		var ServeurURL	= Conf.URL;
		DMS.Mobile.Common.Alert("get list gamme from server");
		var methode = "GetListGammeDTO";
		var URL = ServeurUrl+methode;
		 
		 var form = this;
		    DMS.Mobile.Common.CallService(function(json,Form){form.CreateGammeDTO(JsonObject,Form,callbackViewModel);},URL,form);
		
	},
	
	
CreateGammeDTO : function (json,form,callbackViewModel)
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
	},
	
	
	insertGammeIntoArray : function(Gamme,form,len,callbackViewModel)
	{
		form.ListGamme.push(Gamme)
		if(form.ListGamme.length == len)
		{
			callbackViewModel(form.ListGamme);
		}
	},
	
	insertGamme : function(gamme,synch,form,len,callbackViewModel)
	{
	      form.InsertGammeIntoLOCAL(gamme,synch,form,len,callbackViewModel);
	},
	
		
InsertGammeIntoLOCAL: function(GammeObject,synch,formReq,len,callbackViewModel) {
       
	     formReq.connexion.transaction(function(tx){ formReq.InsertIntoGamme(tx, formReq,GammeObject,synch) }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoGamme");},function(){formReq.insertGammeIntoArray(GammeObject,formReq,len,callbackViewModel);}); 
					   		
},

InsertIntoGamme : function(requete,form,GammeObject,synch) {
   
			requete.executeSql('INSERT INTO Gammes (GammeID, Designation, Synch) VALUES('+GammeObject.GammeID+',"'+GammeObject.Designation+'","'+synch+'")');
			
    DMS.Mobile.Common.Alert("Fin insertion Gamme dans la BD");       																																
},
	 
	
	
}