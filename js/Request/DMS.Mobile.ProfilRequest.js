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
		 var Conf = JSON.parse(localStorage.getItem("Configuration"));
		
		 DMS.Mobile.Common.Alert("get list profil from server");
		 var methode = "GetListProfilsDTO?";
		 var URL = Conf.URL+methode;
		 
		 var form = this;
		    DMS.Mobile.Common.CallService(function(Json,Form){form.CreateProfilDTO(Json,Form,callbackViewModel);},URL,form);
		
		
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : GetListProfilFromServer in ProfilRequest",'alert','e'); 
			
			   var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ProfilRequest";
						exception.FonctionE = "GetListProfilFromServer";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListProfil);
						});	
		}
    },
	
	CreateProfilDTO : function(json,form,callbackViewModel)
		{
		try
		{	
			var len = json.length;
			if ( len>0)
			{
			
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
		   var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ProfilRequest";
						exception.FonctionE = "CreateProfilDTO";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListProfil);
						});	
		
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
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ProfilRequest";
						exception.FonctionE = "insertProfilIntoArray";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListProfil);
						});
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
		        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ProfilRequest";
						exception.FonctionE = "insertProfil";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListProfil);
						});
		
		}
	},
		
InsertProfilIntoLocal: function(ProfilObject,synch,formReq,len,callbackViewModel) {
try
{
		
					    formReq.connexion.transaction(function(tx){ formReq.InsertIntoProfil(tx, formReq,ProfilObject,synch) },function(err){ DMS.Mobile.Common.errors(err,"InsertIntoProfil");
						
						var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ProfilRequest";
						exception.FonctionE = "InsertIntoProfil";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(formReq.ListProfil);
						});
						
						},function(){formReq.insertProfilIntoArray(ProfilObject,synch,formReq,len,callbackViewModel);}); 
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertProfilIntoLocal in ProfilRequest",'alert','e'); 
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ProfilRequest";
						exception.FonctionE = "InsertProfilIntoLocal";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(formReq.ListProfil);
						});
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
			 
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ProfilRequest";
						exception.FonctionE = "InsertIintoProfil";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIintoProfil in ProfilRequest",'alert','e');
						});
		}																														
    },
//////////////////////////////////////////////////////////////////////////

	 //////////////////////////////////////// Delete All Profil ////////////////////////
DeleteAllProfil : function(callback)
{
	try
	{
			var form = this;	
			this.connexion.transaction(function(tx){ form.DeleteProfils(tx, form,callback);}, function(err){ DMS.Mobile.Common.errors(err,"DeleteProfils");
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ProfilRequest";
						exception.FonctionE = "DeleteProfils";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
			
			});
	 }
	 catch(err)
	 {
			DMS.Mobile.Notification.ShowMessage(err.message+" : DeleteAllProfil in ProfilRequest",'alert','e'); 
	
	var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ProfilRequest";
						exception.FonctionE = "DeleteAllProfil";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
	 }	
}, 

DeleteProfils : function(requete, form,callback)
{
	requete.executeSql("DELETE  FROM Profils ", [],
              function(tx, result) {				
				form.querySuccessDELETEAll(form,callback);
				}, 
                function(err){DMS.Mobile.Common.errors(err,"DeleteProfils");
				
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ProfilRequest";
						exception.FonctionE = "DeleteProfils";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
					});
},

querySuccessDELETEAll : function(form,callback)
{
	callback();
},

///////////////////////////////////////////////////////////////////////////////////////////////////
	
	

//////////////////////////////Select FROM Local //////////////////////////////

//////////////////////////////////////////////////////////////////////////

		

	 	
	
	
	
	
}