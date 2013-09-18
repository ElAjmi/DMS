if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};
		
	
DMS.Mobile.FamilleRequest = {};
	
DMS.Mobile.FamilleRequest = 
{
		connexion : null,
		ListFamille : [],
		

	
GetListFamilleFromServer : function()
{
		DMS.Mobile.Common.Alert("get list famille from server");
		 var methode = "GetListFamilleDTO";
		 var URL = DMS.Mobile.Common.ServeurUrl+methode;
		 
		 var form = this;
		    DMS.Mobile.Common.CallService(this.CreateFamilleDTO,URL,form);
		
},

CreateFamilleDTO : function (json,form)
	{
		if ( json != null)
		{
			var synch = "true";

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
			
			form.ListFamille.push(familleDTO);
			}
			form.SaveListFamilleInLocal(form.ListFamille,synch,form);
		}
		else{return null;}	
},
	
SaveListFamilleInLocal : function(ListFamille,synch,form)
{
	DMS.Mobile.Common.Alert("length : " +ListFamille.length);
		for (var i=0; i<ListFamille.length;i++)
		{
		form.InsertFamille(ListFamille[i],synch,form);
		DMS.Mobile.Common.Alert("Fin insertion de Famille : "+i); 
		}
},


InsertFamille: function(FamilleObject,synch,formReq) 
{
   formReq.connexion.transaction(function(tx){ formReq.InsertIntoFamille(tx, formReq,FamilleObject,synch) }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoFamille");}); 
					   
},

InsertIntoFamille : function(requete,form,FamilleObject,synch) {
   
			requete.executeSql('INSERT INTO Familles (FamilleID, Designation,GammeID, Synch) VALUES('+FamilleObject.FamilleID+',"'+FamilleObject.Designation+'",'+FamilleObject.GammeID+',"'+synch+'")');
			
    DMS.Mobile.Common.Alert("Fin insertion Famille");       																																
},
	 
	
	
	
}