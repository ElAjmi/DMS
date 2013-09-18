if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};
	
	
	
DMS.Mobile.GammeRequest = {};	
DMS.Mobile.GammeRequest = 
{
	    JsonObject : null,
		connexion : null,
		ListGamme : [],
				
	
GetListGammeFromServer : function()
	{
		DMS.Mobile.Common.Alert("get list gamme from server");
		 var methode = "GetListGammeDTO";
		 var URL = DMS.Mobile.Common.ServeurUrl+methode;
		 
		 var form = this;
		    DMS.Mobile.Common.CallService(this.CreateGammeDTO,URL,form);
		
	},
	
	
CreateGammeDTO : function (json,form)
	{
		if ( json != null)
		{
			var synch = "true";

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
			
			form.ListGamme.push(gammeDTO);
			}
			form.SaveListGammeInLocal(form.ListGamme,synch,form);
		}
		else{return null;}	
	},
	
	SaveListGammeInLocal : function(gammeDTO,synch,form)
	{
	DMS.Mobile.Common.Alert("length : " +gammeDTO.length);
		for (var i=0; i<gammeDTO.length;i++)
		{
		form.InsertGamme(gammeDTO[i],synch,form);
		DMS.Mobile.Common.Alert("Fin insertion de Gamme : "+i); 
		}
	},
	
		
InsertGamme: function(GammmeObject,synch,formReq) {
       
	     formReq.connexion.transaction(function(tx){ formReq.InsertIntoGamme(tx, formReq,GammmeObject,synch) }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoGamme");}); 
					   		
},

InsertIntoGamme : function(requete,form,GammmeObject,synch) {
   
			requete.executeSql('INSERT INTO Gammes (GammeID, Designation, Synch) VALUES('+GammmeObject.GammeID+',"'+GammmeObject.Designation+'","'+synch+'")');
			
    DMS.Mobile.Common.Alert("Fin insertion Gamme dans la BD");       																																
},
	 
	
	
}