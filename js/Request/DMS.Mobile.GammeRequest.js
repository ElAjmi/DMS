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
		var form = this;
		try
		{
		var Conf = JSON.parse(localStorage.getItem("Configuration"));
		
		DMS.Mobile.Common.Alert("get list gamme from server");
		var methode = "GetListGammeDTO";
		var URL = Conf.URL+methode;
		 
		 
		    DMS.Mobile.Common.CallService(function(json,Form){form.CreateGammeDTO(JsonObject,Form,callbackViewModel);},URL,form);
			
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : GetListGammeFromServer in GammeRequest",'alert','e'); 
		
		            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "GammeRequest";
						exception.FonctionE = "GetListGammeFromServer";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.ListGamme);
						});
		
		}
		
	},
	
	
CreateGammeDTO : function (json,form,callbackViewModel)
	{
		try
		{
			var len =json.length;
		if ( len>0)
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
		
			
			
			form.insertGamme(gammeDTO,synch,form,len,callbackViewModel);
			}

		}
		else{callbackViewModel(form.ListGamme);}	
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : CreateGammeDTO in GammeRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "GammeRequest";
						exception.FonctionE = "CreateGammeDTO";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.ListGamme);
						});
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
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "GammeRequest";
						exception.FonctionE = "insertGammeIntoArray";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.ListGamme);
						}); 
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
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "GammeRequest";
						exception.FonctionE = "insertGamme";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.ListGamme);
						}); 
		}
	},
	
		
InsertGammeIntoLOCAL: function(GammeObject,synch,formReq,len,callbackViewModel) {
  try
  {     
	     formReq.connexion.transaction(function(tx){ formReq.InsertIntoGamme(tx, formReq,GammeObject,synch) }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoGamme");
		 
		         var exception = new DMS.Mobile.Exception();
						exception.FichierE = "GammeRequest";
						exception.FonctionE = "InsertIntoGamme";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.ListGamme);
						}); 
		 
		 },function(){formReq.insertGammeIntoArray(GammeObject,formReq,len,callbackViewModel);}); 
	}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertGammeIntoLOCAL in GammeRequest",'alert','e');
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "GammeRequest";
						exception.FonctionE = "InsertGammeIntoLOCAL";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.ListGamme);
						}); 
			 
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
			
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "GammeRequest";
						exception.FonctionE = "InsertGammeIntoLOCAL";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoGamme in GammeRequest",'alert','e');
						});
		 
		}  																																
},

////////////////////////////////////////////////////////////////////////////////

	 
			 //////////////////////////////////////// Delete All Gamme ////////////////////////
DeleteAllGamme : function(callback)
{
	var form = this;
	try
	{
				
			this.connexion.transaction(function(tx){ form.DeleteGammes(tx, form,callback);}, function(err){ DMS.Mobile.Common.errors(err,"DeleteGammes");
			
			       var exception = new DMS.Mobile.Exception();
						exception.FichierE = "GammeRequest";
						exception.FonctionE = "DeleteGammes";
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
			DMS.Mobile.Notification.ShowMessage(err.message+" : DeleteAllGamme in GammeRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "GammeRequest";
						exception.FonctionE = "DeleteAllGamme";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback();
						});
	 }	
}, 

DeleteGammes : function(requete, form,callback)
{
	requete.executeSql("DELETE  FROM Gammes ", [],
              function(tx, result) {				
				form.querySuccessDELETEAll(form,callback);
				}, 
                function(err){DMS.Mobile.Common.errors(err,"DeleteGammes");
				
				        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "GammeRequest";
						exception.FonctionE = "DeleteGammes";
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

	
	
}