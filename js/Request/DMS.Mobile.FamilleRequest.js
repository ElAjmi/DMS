if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};
		
	
DMS.Mobile.FamilleRequest = {};
	
DMS.Mobile.FamilleRequest = 
{
		connexion : null,
		ListFamille : [],
		

	
GetListFamilleFromServer : function(callbackViewModel)
{
	    var Conf = JSON.parse(sessionStorage.getItem("Configuration"));
		var ServeurURL	= Conf.URL;
		DMS.Mobile.Common.Alert("get list famille from server");
		 var methode = "GetListFamilleDTO";
		 var URL = ServeurUrl+methode;
		 
		 var form = this;
		    DMS.Mobile.Common.CallService(function(Json,Form){form.CreateFamilleDTO(Json,Form,callbackViewModel);},URL,form);
		
},

CreateFamilleDTO : function (json,form,callbackViewModel)
	{
		if ( json != null)
		{
			var synch = "true";
            var len = json.length;

			for (var i=0;i<json.length;i++)
			{
			var familleDTO = new DMS.Mobile.Famille();
			familleDTO.FamilleID = json[i].FamilleID;
			familleDTO.Designation = json[i].Designation;
			familleDTO.GammeID = json[i].GammeID;
			familleDTO.ListArticles = json[i].Articles;
			familleDTO.Gammes = json[i].Gammes;
			familleDTO.ListPromotions = json[i].Promotions;
			familleDTO.ListRelevePresencePrixConcurrents = json[i].RelevePresencePrixConcurrents;
			familleDTO.ListRelevePrix = json[i].RelevePrix;
			
		        form.insertFamille(familleDTO,synch,form,len,callbackViewModel);
			}
			
		}
		else{callbackViewModel(form.ListFamille);}	
},
	
	
	insertFamilleIntoArray : function(FamilleObject,form,len,callbackViewModel)
	{
		form.ListFamille.push(FamilleObject);
		if (form.ListFamille.length == len)
		{
			callbackViewModel(form.ListFamille);
		}
	},
	
insertFamille : function(famille,synch,form,len,callbackViewModel)
{
     form.InsertFamilleIntoLOCAL(famille,synch,form,len,callbackViewModel);
},


InsertFamilleIntoLOCAL: function(FamilleObject,synch,formReq,len,callbackViewModel) 
{
   formReq.connexion.transaction(function(tx){ formReq.InsertIntoFamille(tx, formReq,FamilleObject,synch) }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoFamille");},function(){formReq.insertFamilleIntoArray(FamilleObject,formReq,len,callbackViewModel);}); 
					   
},

InsertIntoFamille : function(requete,form,FamilleObject,synch) {
   
			requete.executeSql('INSERT INTO Familles (FamilleID, Designation,GammeID, Synch) VALUES('+FamilleObject.FamilleID+',"'+FamilleObject.Designation+'",'+FamilleObject.GammeID+',"'+synch+'")');
			
    DMS.Mobile.Common.Alert("Fin insertion Famille");       																																
},
	 
	
	
	
}