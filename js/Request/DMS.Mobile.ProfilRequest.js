if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.ProfilRequest = {};

DMS.Mobile.ProfilRequest = 
{
		connexion : null,
		Profil : null,
		ListProfil : [],

	////////////////////////////////////////Serveur ////////////////////////
	GetListProfilFromServer : function (callbackViewModel)
	{
		 var Conf = JSON.parse(sessionStorage.getItem("Configuration"));
		 var ServeurURL	= Conf.URL;
		 DMS.Mobile.Common.Alert("get list profil from server");
		 var methode = "GetListProfilsDTO?";
		 var URL = ServeurUrl+methode;
		 
		 var form = this;
		    DMS.Mobile.Common.CallService(function(Json,Form){form.CreateProfilDTO(Json,Form,callbackViewModel);},URL,form);
		
    },
	
	CreateProfilDTO : function(json,form,callbackViewModel)
		{
			
			if ( json != null)
			{
				var len = json.length;
				var synch = "true";
				for (var i=0;i<json.length;i++)
				{
					var profilDTO = new DMS.Mobile.Profils();	
					profilDTO.ProfilID = json[i].ProfilID;
					profilDTO.Designation = json[i].Designation;
					profilDTO.Description = json[i].Description;
					profilDTO.ListPersonnels = json[i].Personnel;	
					
					form.insertProfil(profilDTO,synch,form,len,callbackViewModel);
					
				}
					
				  
			   }
		   else 
		   {callbackViewModel(form.ListProfil);}
			   
		},
	//////////////////////////////////////////////////////////////////
	
	insertProfilIntoArray : function(profil,synch,form,len,callbackViewModel)
	{
		form.ListProfil.push(profil);
		if(form.ListProfil.length == len)
		{
			callbackViewModel(form.ListProfil);
		}
	},
	
/////////////////////////////Insertion LOCAL /////////////////////////////////////
insertProfil : function (profil,synch,form,len,callbackViewModel)
	{
	   form.InsertProfilIntoLocal(profil,synch,form,len,callbackViewModel);
	},
		
InsertProfilIntoLocal: function(ProfilObject,synch,formReq,len,callbackViewModel) {

		
					    formReq.connexion.transaction(function(tx){ formReq.InsertIntoProfil(tx, formReq,ProfilObject,synch) },function(err){ DMS.Mobile.Common.errors(err,"InsertIntoProfil");},function(){formReq.insertProfilIntoArray(ProfilObject,synch,formReq,len,callbackViewModel);}); 
					
					
           },

	InsertIntoProfil : function(requete,form,ProfilObject,synch) {
   
			requete.executeSql('INSERT INTO Profils (ProfilID,Designation,Description,Synch) VALUES('+ProfilObject.ProfilID+',"'+ProfilObject.Designation+'","'+ProfilObject.Description+'","'+synch+'")');
    DMS.Mobile.Common.Alert("Fin insertion Profil");    
       																																
    },
//////////////////////////////////////////////////////////////////////////

//////////////////////////////Select FROM Local //////////////////////////////

//////////////////////////////////////////////////////////////////////////

		

	 	
	
	
	
	
}