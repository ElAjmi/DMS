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
		try
		{
		 var Conf = JSON.parse(sessionStorage.getItem("Configuration"));
		
		 DMS.Mobile.Common.Alert("get list profil from server");
		 var methode = "GetListProfilsDTO?";
		 var URL = Conf.URL+methode;
		 
		 var form = this;
		    DMS.Mobile.Common.CallService(function(Json,Form){form.CreateProfilDTO(Json,Form,callbackViewModel);},URL,form);
		
		
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : GetListProfilFromServer in ProfilRequest",'alert','e'); 
		}
    },
	
	CreateProfilDTO : function(json,form,callbackViewModel)
		{
		try
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
			   
			   
			   	}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : CreateProfilDTO in ProfilRequest",'alert','e'); 
		}
		},
	//////////////////////////////////////////////////////////////////
	
	insertProfilIntoArray : function(profil,synch,form,len,callbackViewModel)
	{
		try
		{
		form.ListProfil.push(profil);
		if(form.ListProfil.length == len)
		{
			callbackViewModel(form.ListProfil);
		}
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertProfilIntoArray in ProfilRequest",'alert','e'); 
		}
	},
	
/////////////////////////////Insertion LOCAL /////////////////////////////////////
insertProfil : function (profil,synch,form,len,callbackViewModel)
	{
		try
		{
	   form.InsertProfilIntoLocal(profil,synch,form,len,callbackViewModel);
	   	}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertProfil in ProfilRequest",'alert','e'); 
		}
	},
		
InsertProfilIntoLocal: function(ProfilObject,synch,formReq,len,callbackViewModel) {
try
{
		
					    formReq.connexion.transaction(function(tx){ formReq.InsertIntoProfil(tx, formReq,ProfilObject,synch) },function(err){ DMS.Mobile.Common.errors(err,"InsertIntoProfil");},function(){formReq.insertProfilIntoArray(ProfilObject,synch,formReq,len,callbackViewModel);}); 
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertProfilIntoLocal in ProfilRequest",'alert','e'); 
		}			
					
           },

	InsertIntoProfil : function(requete,form,ProfilObject,synch) {
   try
   {
			requete.executeSql('INSERT INTO Profils (ProfilID,Designation,Description,Synch) VALUES('+ProfilObject.ProfilID+',"'+ProfilObject.Designation+'","'+ProfilObject.Description+'","'+synch+'")');
    DMS.Mobile.Common.Alert("Fin insertion Profil");    
       			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIintoProfil in ProfilRequest",'alert','e'); 
		}																														
    },
//////////////////////////////////////////////////////////////////////////

//////////////////////////////Select FROM Local //////////////////////////////

//////////////////////////////////////////////////////////////////////////

		

	 	
	
	
	
	
}