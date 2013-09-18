if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.ProfilRequest = {};

DMS.Mobile.ProfilRequest = 
{
		connexion : null,
		Profil : null,
		ListProfil : [],

	////////////////////////////////////////Serveur ////////////////////////
	GetListProfilFromServer : function ()
	{
		  DMS.Mobile.Common.Alert("get list profil from server");
		 var methode = "GetListProfilsDTO?";
		 var URL = DMS.Mobile.Common.ServeurUrl+methode;
		 
		 var form = this;
		    DMS.Mobile.Common.CallService(this.CreateProfilDTO,URL,form);
		
    },
	
	CreateProfilDTO : function(json,form)
		{
			
			if ( json != null)
			{
				var synch = "true";
			for (var i=0;i<json.length;i++)
			{
				var profilDTO = new DMS.Mobile.Profils();	
				profilDTO.ProfilID = json[i].ProfilID;
				profilDTO.Designation = json[i].Designation;
				profilDTO.Description = json[i].Description;
				profilDTO.ListPersonnels = json[i].Personnel;	
				
				form.ListProfil.push(profilDTO);    
				
			}
				form.SaveListProfilInLocal(form.ListProfil,synch,form);
				  
			   }
		   else 
		   {return null;}
			   
		},
	//////////////////////////////////////////////////////////////////
	
/////////////////////////////Insertion LOCAL /////////////////////////////////////
SaveListProfilInLocal : function (ListProfil,synch,form)
	{
	    DMS.Mobile.Common.Alert("length : " +ListProfil.length);
		for ( i=0; i<ListProfil.length;i++)
		{
		form.InsertProfil(ListProfil[i],synch,form);
		DMS.Mobile.Common.Alert("Fin insertion de profil : "+i); 
		}
	},
		
InsertProfil: function(ProfilObject,synch,formReq) {

		
					    formReq.connexion.transaction(function(tx){ formReq.InsertIntoProfil(tx, formReq,ProfilObject,synch) },function(err){ DMS.Mobile.Common.errors(err,"InsertIntoProfil");}); 
					
					
           },

	InsertIntoProfil : function(requete,form,ProfilObject,synch) {
   
			requete.executeSql('INSERT INTO Profils (ProfilID,Designation,Description,Synch) VALUES('+ProfilObject.ProfilID+',"'+ProfilObject.Designation+'","'+ProfilObject.Description+'","'+synch+'")');
    DMS.Mobile.Common.Alert("Fin insertion Profil");    
       																																
    },
//////////////////////////////////////////////////////////////////////////

//////////////////////////////Select FROM Local //////////////////////////////

//////////////////////////////////////////////////////////////////////////

		

	 	
	
	
	
	
}