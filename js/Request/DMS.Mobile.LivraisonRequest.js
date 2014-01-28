if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.LivraisonRequest = {};

DMS.Mobile.LivraisonRequest = 
{
	connexion: null,
	ListLivraison : [],
	
	
	////////////////////////////////// SERVEUR /////////////////////////////////////
	
	SelectLivraisonByPersonnelFromServer : function(callbackViewModel,PersonnelID)
	{
		var form = this;
		try
		{
			var Conf = JSON.parse(localStorage.getItem("Configuration"));
			
			
			
			var Data = "PersonnelID="+PersonnelID; 
		  
			var methode= "GetLivraisonDTOByPersonnelID?";
	
			var URL = Conf.URL+methode+Data;
	
			 DMS.Mobile.Common.CallService(function(JsonObject,Form){form.createLivraisonDTO(JsonObject,Form,callbackViewModel);},URL,form);
			 
			
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectLivraisonByPersonnelFromServer in LivraisonRequest",'alert','e');
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LivraisonRequest";
						exception.FonctionE = "SelectLivraisonByPersonnelFromServer";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.ListLivraison);
						});
			
			}
	},
	
	
	createLivraisonDTO : function(json,form,callbackViewModel)
	{
		try
		{
			var len = json.length;
		if ( len>0)
		{
			var synch = "true";
			
			for (var i=0;i<json.length;i++)
			{
				var LivraisonDTO = new DMS.Mobile.Livraison();
			
				
				LivraisonDTO.CommandeID = json[i].LivraisonID ;
				LivraisonDTO.CodeLivraison = json[i].CodeLivraison ;
				LivraisonDTO.DatePlanification = DMS.Mobile.Common.ParseDateJson(json[i].DatePlanification) ;
				LivraisonDTO.Etat = json[i].EtatLivraison ;
				LivraisonDTO.ClientID = json[i].ClientID ;
				LivraisonDTO.PointVenteID = json[i].PointVenteID ;
				
				var dateTimeCreation = DMS.Mobile.Common.ParseDateTimeJson(json[i].DatePlanification);				
				LivraisonDTO.DateCreationTrie = dateTimeCreation;
				
				
				
				
			
				form.insertLivraison(LivraisonDTO,synch,form,len,callbackViewModel);
			}
			
		}
		else{callbackViewModel(form.ListLivraison);}	
	
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : createLivraisonDTO in LivraisonRequest",'alert','e'); 
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LivraisonRequest";
						exception.FonctionE = "createLivraisonDTO";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.ListLivraison);
						});
		}
	},
	
	
	//////////////////////////////////////////// insertion local ///////////////////////////

insertLivraison : function (Livraison,synch,form,len,callbackViewModel)
		{
			try
			{
			form.InsertLivraisonIntoLOCAL(Livraison,synch,form,len,callbackViewModel);
			}
			catch(err)
		{
		   DMS.Mobile.Notification.ShowMessage(err.message+" : insertLivraison in LivraisonRequest",'alert','e'); 
		   
		                var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LivraisonRequest";
						exception.FonctionE = "insertLivraison";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.ListLivraison);
						});
		}
		},
		
InsertLivraison: function(Livraison){
 var form = this;
 try
	{
					
				this.InsertLivraisonIntoLOCAL(Livraison,"false",form,null,null);
	}
		catch(err)
	{
		var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LivraisonRequest";
						exception.FonctionE = "InsertLivraison";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							DMS.Mobile.Notification.ShowMessage(err.message+" :InsertLivraison  in LivraisonRequest",'alert','e');
						});
		
		 
	}
},
		
	InsertLivraisonIntoLOCAL : function(LivraisonObject,synch,formReq,len,callbackViewModel)
	{
		try
		{
			if (synch == "false")
			{
				formReq.connexion.transaction(function(tx){ formReq.InsertIntoLivraison(tx, formReq,LivraisonObject,synch); }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoLivraison");
				
				        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LivraisonRequest";
						exception.FonctionE = "InsertIntoLivraison";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListLivraison);
						});
				
				
				}); 
		    }
			else
			{
				formReq.connexion.transaction(function(tx){ formReq.InsertIntoLivraison(tx, formReq,LivraisonObject,synch); }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoLivraison");
				
				        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LivraisonRequest";
						exception.FonctionE = "InsertIntoLivraison";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListLivraison);
						});
				
				},function(){
							
						formReq.insertLivraisonIntoArray(LivraisonObject,formReq,len,callbackViewModel)	;		
							}); 
							//formReq.insertMissionIntoArray(MissionObject,formReq,len,callbackViewModel)	;
			}
		 		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertLivraisonIntoLOCAL inLivraisonRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LivraisonRequest";
						exception.FonctionE = "InsertLivraisonIntoLOCAL";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListLivraison);
						});
		}
	},
	
	InsertIntoLivraison : function(requete, formReq,LivraisonObject,synch)
	{
		try
		{
			requete.executeSql('INSERT INTO Livraison(CommandeID,CodeLivraison,DatePlanification,Etat,ClientID,PointVenteID,DateCreationTrie,Synch) VALUES("'+LivraisonObject.CommandeID+'","'+LivraisonObject.CodeLivraison+'","'+LivraisonObject.DatePlanification+'","'+LivraisonObject.Etat+'","'+LivraisonObject.ClientID+'","'+LivraisonObject.PointVenteID+'","'+LivraisonObject.DateCreationTrie+'","'+LivraisonObject.Synch+'")');
			}
			catch(err)
		{
			
			
			  var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LivraisonRequest";
						exception.FonctionE = "InsertIntoLivraison";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoLivraison in LivraisonRequest",'alert','e'); 
						});
		}	
	},
	
	
	
	insertLivraisonIntoArray : function(Livraison,form,len,callbackViewModel)
	{
				try
		{
		
		form.ListLivraison.push(Livraison);
		if (form.ListLivraison.length == len)
		{
			callbackViewModel(form.ListLivraison);
		}
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertLivraisonIntoArray in LivraisonRequest",'alert','e');
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LivraisonRequest";
						exception.FonctionE = "insertLivraisonIntoArray";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListLivraison);
						}); 
		}
	},
	
	////////////////////////////////////////////////////////////////:
	
	SelectAll : function(callback)
	{	
	 var form = this;
		try
	{
	
	 
	  this.connexion.transaction(function(tx){ form.SelectFromLivraison(tx, form,callback) ;}, function(err){ DMS.Mobile.Common.errors(err,"SelectFromLivraison");
	  
	          var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LivraisonRequest";
						exception.FonctionE = "SelectFromLivraison";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.ListLivraison);
						}); 
			 
	  });
	 		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAll in LivraisonRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LivraisonRequest";
						exception.FonctionE = "SelectAll";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.ListLivraison);
						});
		}

			
},
	SelectFromLivraison : function(requete, form,callback) 
			{
				try
				{
			requete.executeSql("SELECT * FROM Livraison ORDER BY DateTime(DateCreationTrie)  Desc", [], function(tx, results) {form.querySuccessAll(tx,results,form,callback);});
		   }
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromLivraison in LivraisonRequest",'alert','e'); 
				
				  var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LivraisonRequest";
						exception.FonctionE = "SelectFromLivraison";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.ListLivraison);
						});
			}
	},
	
	querySuccessAll : function(requete,results,form,callback)
	{
		try
			{
				
			var len = results.rows.length;
			if(len>0){
			for (var i=0;i<len;i++){
				var oLivraison = new DMS.Mobile.Livraison();
				oLivraison.CommandeID = results.rows.item(i).CommandeID;
				oLivraison.CodeLivraison = results.rows.item(i).CodeLivraison ;
				oLivraison.DatePlanification = results.rows.item(i).DatePlanification;
				oLivraison.Etat = results.rows.item(i).Etat ;
				oLivraison.ClientID = results.rows.item(i).ClientID ;
				oLivraison.PointVenteID = results.rows.item(i).PointVenteID ;				
				oLivraison.DateCreationTrie = results.rows.item(i).DateCreationTrie;
				
				DMS.Mobile.PointVenteRequest.connexion = form.connexion;
				DMS.Mobile.PointVenteRequest.SelectByID (function(livraison){
						form.insertLivraisonIntoLivraisonList(livraison,form,len,callback);
				},oLivraison);
				
									
				
				}
			}else
			{callback(form.ListLivraison);}
				}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessAll in LivraisonRequest",'alert','e'); 
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LivraisonRequest";
						exception.FonctionE = "querySuccessAll";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.ListLivraison);
						});
			}
	},
	insertLivraisonIntoLivraisonList : function(Livraison,form,len,callback)
	{
		try
		{
		form.ListLivraison.push(Livraison);
		if (form.ListLivraison.length == len)
		{
			callback(form.ListLivraison);
		}
		}
		catch(err)
		{
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LivraisonRequest";
						exception.FonctionE = "insertLivraisonIntoLivraisonList";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.ListLivraison);
						});
		}
	},
	
	
	//////////////////////////////// DELETE ALL LIVRAISON FORM DATA BASE /////////////////
	
DeleteAllLivraison : function(callback)
{
	var form = this;
	try
	{
			
		this.connexion.transaction(function(tx){ form.DeleteLivraisons(tx, form,callback);}, function(err){ DMS.Mobile.Common.errors(err,"DeleteLivraisons");
		
		var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LivraisonRequest";
						exception.FonctionE = "DeleteLivraisons";
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
			DMS.Mobile.Notification.ShowMessage(err.message+" : DeleteAllLivraison in LivraisonRequest",'alert','e'); 
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LivraisonRequest";
						exception.FonctionE = "DeleteAllLivraison";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
	 }	
},

DeleteLivraisons : function(requete, form,callback)
{
	try
	{
	requete.executeSql("DELETE  FROM Livraison ", [],
              function(tx, result) {				
				form.querySuccessDELETEAll(form,callback);
				}, 
                function(err){DMS.Mobile.Common.errors(err,"querySuccessDELETEAll");
				       
					    var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LivraisonRequest";
						exception.FonctionE = "querySuccessDELETEAll";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
				
				});
	}
	catch (err)
	{
		                var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LivraisonRequest";
						exception.FonctionE = "DeleteLivraisons";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
	}
},

querySuccessDELETEAll : function(form,callback)
{
	callback();
},	
	
	
	
	
	
	
	
}