if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.TourneePointVenteRequest = {};

DMS.Mobile.TourneePointVenteRequest = 
{
	connexion : null,
	ListTourneePointVente : [],
	
	////////////////////////////////////// Serveur ////////////////////////////
	
	SelectAllTournePointVenteFromServer : function(callbackViewModel,PersonnelID)
	{
		try
		{
			var Conf = JSON.parse(localStorage.getItem("Configuration"));
			
			var form = this;
			
			var Data = "PersonnelID="+PersonnelID; 
		  
			var methode= "getAllTourneePointVenteByPersonnelID?";
	
			var URL = Conf.URL+methode+Data;
	
			 DMS.Mobile.Common.CallService(function(JsonObject,Form){form.createTourneePointVenteDTO(JsonObject,Form,callbackViewModel);},URL,form);
			 
			
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllTournePointVenteFromServer in TourneePointVenteRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneePointVenteRequest";
						exception.FonctionE = "SelectAllTournePointVenteFromServer";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListTourneePointVente);
						});
		}
	},
	
	
	createTourneePointVenteDTO : function(json,form,callbackViewModel)
	{
		try
		{
			var len = json.length;
		if ( len>0)
		{
			var synch = "true";
			
			for (var i=0;i<json.length;i++)
			{
				var tourneePointVenteDTO = new DMS.Mobile.TourneePointVente();
			

	            tourneePointVenteDTO.TourneeID = json[i].TourneeID;
				tourneePointVenteDTO.listPointVenteID = [];
				for (var j = 0;j<json[i].listPointVenteID.length;j++)
				{
					tourneePointVenteDTO.listPointVenteID.push(json[i].listPointVenteID[j]);
				}
			
				form.insertTourneePointVente(tourneePointVenteDTO,synch,form,len,callbackViewModel);
			}
			
		}
		else{callbackViewModel(form.ListTourneePointVente);}	
	
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : createTourneePointVenteDTO in TourneePointVenteRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneePointVenteRequest";
						exception.FonctionE = "createTourneePointVenteDTO";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListTourneePointVente);
						});
		}
	},
	
	
	insertTourneePointVente : function(tourneePointVente,synch,form,len,callbackViewModel)
	{
		 try
		 {
			form.InsertTourneePointVenteIntoLOCAL(tourneePointVente,synch,form,len,callbackViewModel);
		 }
		 catch(err)
		 {
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertTourneePointVente in TourneePointVenteRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneePointVenteRequest";
						exception.FonctionE = "insertTourneePointVente";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListTourneePointVente);
						});
			
		 }
	},
	
	InsertTourneePointVenteIntoLOCAL : function(tourneePointVenteObject,synch,formReq,len,callbackViewModel)
	{
		try
		{

				formReq.connexion.transaction(function(tx){ formReq.InsertIntoTourneePointVente(tx, formReq,tourneePointVenteObject,synch); }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoTourneePointVente");
				
				        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneePointVenteRequest";
						exception.FonctionE = "InsertIntoTourneePointVente";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(formReq.ListTourneePointVente);
						});
				
				
				},function(){
							
						formReq.insertTourneePointVenteIntoArray(tourneePointVenteObject,formReq,len,callbackViewModel);		
							}); 
						
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertTourneePointVenteIntoLOCAL in TourneePointVenteRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneePointVenteRequest";
						exception.FonctionE = "InsertTourneePointVenteIntoLOCAL";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(formReq.ListTourneePointVente);
						});
		}
	},
	
	InsertIntoTourneePointVente : function(requete, form,tourneePointVenteObject,synch)
	{
	   try
       {
		   for(var i = 0; i<tourneePointVenteObject.listPointVenteID.length;i++)
		   {
			requete.executeSql('INSERT INTO TourneePointVente(TourneeID,PointVenteID) VALUES( '+tourneePointVenteObject.TourneeID+','+tourneePointVenteObject.listPointVenteID[i]+')');
		   }
		}
		 catch(err)
		{
			 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneePointVenteRequest";
						exception.FonctionE = "InsertIntoTourneePointVente";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoTourneePointVente in TourneePointVenteRequest",'alert','e');
						});
		}	
	},
	
	insertTourneePointVenteIntoArray : function(tourneePointVenteObject,form,len,callbackViewModel)
	{
		try
		{
		form.ListTourneePointVente.push(tourneePointVenteObject);
		if(form.ListTourneePointVente.length == len)
		{
			callbackViewModel(form.ListTourneePointVente);
			
		}
		}
		catch(err)
		{
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneePointVenteRequest";
						exception.FonctionE = "insertTourneePointVenteIntoArray";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListTourneePointVente);
						});
		}
	},
	
	
	///////////////////////////////////// delete all ////////////////////////////////
	
	DeleteAllTourneePointVente : function(callback)
	{
		try
	{
			var form = this;	
			this.connexion.transaction(function(tx){ form.DeleteTourneePointVentes(tx, form,callback);}, function(err){ DMS.Mobile.Common.errors(err,"DeleteAllTourneePointVente");
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneePointVenteRequest";
						exception.FonctionE = "DeleteTourneePointVentes";
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
			DMS.Mobile.Notification.ShowMessage(err.message+" : DeleteAllTourneePointVente in TourneePointRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneePointVenteRequest";
						exception.FonctionE = "DeleteAllTourneePointVente";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
	 }	
	},
	
	DeleteTourneePointVentes:function(requete,form,callback)
	{
		requete.executeSql("DELETE  FROM TourneePointVente ", [],
              function(tx, result) {				
				form.querySuccessDELETEAll(form,callback);
				}, 
                function(err){DMS.Mobile.Common.errors(err,"DeleteTourneePointVentes");
				
				        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneePointVenteRequest";
						exception.FonctionE = "DeleteTourneePointVentes";
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
/////////////////////////////////////////////////////////////////////

	/////////////////////////////////////////// select /////////////////////////////
/*	SelectAllPointVenteIDByTournee : function(tourneeID,callback)
	{
	   try
       {
		    var form = this;	
			this.connexion.transaction(function(tx){ form.SelectFromTourneePointVenteByTourneeID(tx, form,tourneeID,callback) }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromTourneePointVenteByTourneeID");});
       }
	   catch (err)
	   {
		DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllPointVenteIDByTournee in TourneePointVenteRequest",'alert','e'); 
	   }
   },
   
   SelectFromTourneePointVenteByTourneeID : function(requete, form,tourneeID,callback) 
   {
	 		try
			{
					requete.executeSql("SELECT PointVenteID FROM TourneePointVente WHERE TourneeID =?", [tourneeID], function(tx, results) {form.querySuccessPointVenteByTourneeID(tx,results,form,callback);});
		   }
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromTourneePointVenteByTourneeID in TourneePointVenteRequest",'alert','e'); 
			}
},

querySuccessPointVenteByTourneeID : function(requte,results,form,callback)
{
	try
	 {
		var len = results.rows.length;
		var listPointVenteID = [];
		//if(len>0){
		for (var i=0;i<len;i++)
		{
			listPointVenteID.push(results.rows.item(i));
		}
		alert("nb id pv = "+listPointVenteID.length);
		callback(listPointVenteID);
	}
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessPointVenteByTourneeID in TourneePointVenteRequest",'alert','e'); 
	}
			
			
}*/
	
	
	
	
}