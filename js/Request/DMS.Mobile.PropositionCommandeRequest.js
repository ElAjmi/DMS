if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.PropositionCommandeRequest = {};

DMS.Mobile.PropositionCommandeRequest = 
{
    connexion: null,
	
	/////////////// fonction d'insertion des valeurs par défaut//////////
	
	insertProposition : function(callback)
	{
		try
		{
			var form = this;	
			this.InsertPropositionIntoLOCAL(form,"false",callback);
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertProposition in PropositionCommandeRequest",'alert','e'); 
			
			   var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PropositionCommandeRequest";
						exception.FonctionE = "insertProposition";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
		}
	},
	
	
	InsertPropositionIntoLOCAL  : function(formReq,synch,callback)
	{
		try
		{
		  formReq.connexion.transaction(function(tx){ formReq.InsertIntoPropositionCommande(tx, formReq,synch); }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoPropositionCommande");
		  
		      var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PropositionCommandeRequest";
						exception.FonctionE = "InsertIntoPropositionCommande";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
		  
		  
		  },function(){
							
						          callback();		
							});
	    }
		catch(err)
		{
		  DMS.Mobile.Notification.ShowMessage(err.message+" : insertProposition in PropositionCommandeRequest",'alert','e'); 
		  
		  var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PropositionCommandeRequest";
						exception.FonctionE = "insertProposition";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
		}
	},
	
	InsertIntoPropositionCommande : function(requete, form,synch)
	{
		try
		{
	 		var userID = sessionStorage.getItem("userID");
			var prop1 = DMS.Mobile.Constante.Proposition1.DerniereCommande;
			var prop2 = "true";
			var prop3 = DMS.Mobile.Constante.Proposition3.MoyenneA;
			// valeur par defaut de proposition commande 
			// update si les données recupérer de serveur 
			// update les données sont modifiées par le commercial.
			requete.executeSql('INSERT INTO PropositionCommande (PropositionID, Prop1,Prop2,Prop3,Synch) VALUES ( '+userID+','+prop1+',"'+prop2+'",'+prop3+',"'+synch+'")');
						
	 	}
			catch(err)
			{
				
				
				
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PropositionCommandeRequest";
						exception.FonctionE = "InsertIntoPropositionCommande";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoPropositionCommande in PropositionCommandeRequest",'alert','e'); 
						});
			}
	},
	///////  serveur : fonction update des données serveur/////////////
	
	SelectPropositionCommandeByIDFromServer : function(callbackViewModel,PersonnelID)
	{
		try
		{
		var Conf = JSON.parse(localStorage.getItem("Configuration"));
		 
		  form =this;
		 form.ListArticleCommercial = [];
		  var Data = "PersonnelID="+PersonnelID; 
		  
		  var methode= "GetPropositionCommandeDTOByPersonnelID?";

		  var URL =  Conf.URL+methode+Data;

		     DMS.Mobile.Common.CallService(function(JsonObject,Form){form.createArticlePropositionCommandeDTO(JsonObject,Form,callbackViewModel);},URL,form);
			 	}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectPropositionCommandeByIDFromServer in PropositionCommandeRequest",'alert','e'); 
				
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PropositionCommandeRequest";
						exception.FonctionE = "SelectPropositionCommandeByIDFromServer";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel ();
						});
			}
	},
	
	createArticlePropositionCommandeDTO : function(json,form,callbackViewModel)
	{
		try
		{
			// var len = json.length;
		 if (json != null) 
		 {
			var synch = "true";
			
                var oPropositionCommande = new DMS.Mobile.PropositionCommande();
					
					oPropositionCommande.PropositionID = json.PropositionCommandeID1;					                    oPropositionCommande.Prop1 = json.Prop1;
					oPropositionCommande.Prop2 = json.Prop2;
					oPropositionCommande.Prop3 = json.Prop3;

				
				form.UpdatePropositionByID(oPropositionCommande,synch,callbackViewModel);
		 }
		 else
		 {
			 callbackViewModel();
		 }
		}
		catch(err)
		{
		  DMS.Mobile.Notification.ShowMessage(err.message+" : createArticlePropositionCommandeDTO in PropositionCommandeRequest",'alert','e');
		  
		  var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PropositionCommandeRequest";
						exception.FonctionE = "createArticlePropositionCommandeDTO";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel ();
						});
		}
	},
	
	//// Select Proposition commande ///////////////////////////////////////
	
	
	SelectPropositionCommande : function(callback)
	{
		try
		{
			var form = this;
			this.connexion.transaction(function(tx){ form.SelectSingleProposition(tx, form,callback); }, function(err){ DMS.Mobile.Common.errors(err,"SelectSingleProposition");
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PropositionCommandeRequest";
						exception.FonctionE = "SelectSingleProposition";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(null);
						});
			});
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectPropositionCommande in PropositionCommandeRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PropositionCommandeRequest";
						exception.FonctionE = "SelectPropositionCommande";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(null);
						});
		}
	},
	
	SelectSingleProposition : function(requete, form,callback)
	{
		try
		{ 
				requete.executeSql("SELECT * FROM PropositionCommande", [], function(tx, results) {form.querySuccessSelectProp(tx,results,form,callback);});
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectSingleProposition in PropositionCommandeRequest",'alert','e'); 
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PropositionCommandeRequest";
						exception.FonctionE = "SelectSingleProposition";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(null);
						});
		}
	},
	
	querySuccessSelectProp : function(tx,results,form,callback)
	{
	  try
	 {
		var len = results.rows.length;
			if (len>0){
					var oPropositionCommande = new DMS.Mobile.PropositionCommande();
					
					oPropositionCommande.PropositionID = results.rows.item(0).PropositionID;
					oPropositionCommande.Prop1 = results.rows.item(0).Prop1;
					oPropositionCommande.Prop2 = results.rows.item(0).Prop2;
					oPropositionCommande.Prop3 = results.rows.item(0).Prop3;
                        
						callback(oPropositionCommande);
			}
			else
			{
				callback(null);
			}
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessSelectProp in PropositionCommandeRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PropositionCommandeRequest";
						exception.FonctionE = "querySuccessSelectProp";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(null);
						});
		}
	},
	
	
///////////// update proposition py ID //////////////////////////////////////
	
	UpdatePropositionByID : function(oProposition,synch, callback)
	{
		try
		{
				var form = this;	
			this.connexion.transaction(function(tx){ form.UpdatePropositionObject(tx, form,synch,oProposition,callback) ;}, function(err){ DMS.Mobile.Common.errors(err,"UpdatePropositionObject");
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PropositionCommandeRequest";
						exception.FonctionE = "UpdatePropositionObject";
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
			DMS.Mobile.Notification.ShowMessage(err.message+" : UpdatePropositionByID in PropositionCommandeRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PropositionCommandeRequest";
						exception.FonctionE = "UpdatePropositionByID";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
		}
	},
	
	UpdatePropositionObject : function(requete, formReq,synch,oProposition,callback)
	{
		try
		{
			    requete.executeSql(' UPDATE PropositionCommande SET Synch= ? WHERE PropositionID = ?', [synch,oProposition.PropositionID]);				
				requete.executeSql(' UPDATE PropositionCommande SET Prop1= ? WHERE PropositionID = ?', [oProposition.Prop1,oProposition.PropositionID]);
				requete.executeSql(' UPDATE PropositionCommande SET Prop2= ? WHERE PropositionID = ?', [oProposition.Prop2,oProposition.PropositionID]);
				requete.executeSql(' UPDATE PropositionCommande SET Prop3= ? WHERE PropositionID = ?', [oProposition.Prop3,oProposition.PropositionID],function(tx, results) {formReq.querySuccessUpdate(tx,results,formReq, callback);});
				
		 		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateCommandeObject in PropositionCommandeRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PropositionCommandeRequest";
						exception.FonctionE = "UpdateCommandeObject";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
		}  
	},
	
	querySuccessUpdate : function(erquete,results,form, callback)
	{
		callback();
	},
	
	
	////////////////////// select propositionCommande not synchronize //////////:
	
	SelectPropositionCommandeNotSynchronize : function(callback)
	{
		try
		{
	      var form = this;	
		this.connexion.transaction(function(tx){ form.UpdatePropositionCMDSynch(tx, form,callback) ;}, function(err){ DMS.Mobile.Common.errors(err,"UpdatePropositionCMDSynch");
		
		
		      var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PropositionCommandeRequest";
						exception.FonctionE = "UpdatePropositionCMDSynch";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(null);
						});
		
		});
	    }
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectPropositionCommandeNotSynchronize in PropositionCommandeRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PropositionCommandeRequest";
						exception.FonctionE = "SelectPropositionCommandeNotSynchronize";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(null);
						});
		}
	},
	
	
	UpdatePropositionCMDSynch : function(requete,form,callback)
	{
		 try
		{
					requete.executeSql("SELECT * FROM PropositionCommande WHERE Synch =?", ["false"], function(tx, results) {form.querySuccessPropNotSynch(tx,results,form,callback);});
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : UpdatePropositionCMDSynch in PropositionCommandeRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PropositionCommandeRequest";
						exception.FonctionE = "UpdatePropositionCMDSynch";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(null);
						});
		}
	}, 
	
	querySuccessPropNotSynch : function(requete,results,form,callback)
	{
	//	if ((results !="") &&(results != null))
	try
	{
	var resu = results.rows.length;

		if (resu != 0)
		{
			 var propositionCommandeDTO = new DMS.Mobile.PropositionCommande();
			    
				propositionCommandeDTO.PropositionID = results.rows.item(0).PropositionID ;
		        propositionCommandeDTO.Prop1 = results.rows.item(0).Prop1;
				propositionCommandeDTO.Prop2 = results.rows.item(0).Prop2;
				propositionCommandeDTO.Prop3 = results.rows.item(0).Prop3;
				
				callback(propositionCommandeDTO);
		}
		else
		{
			callback(null);
		}
		
	}
	catch(err)
	{
		 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PropositionCommandeRequest";
						exception.FonctionE = "querySuccessPropNotSynch";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(null);
						});
	}
		
	},
	
	///////////// update synch aprés la synchronisation serveur /////////////////////
	
	UpdateSynchPropCommade : function (callback)
	{
		try
	{
		var form = this;	
			this.connexion.transaction(function(tx){ form.UpdateSynchParametre(tx, form,callback); }, function(err){ DMS.Mobile.Common.errors(err,"UpdateSynchParametre");
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PropositionCommandeRequest";
						exception.FonctionE = "UpdateSynchParametre";
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
		DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateSynchPropCommade in PropositionCommandeRequest",'alert','e'); 
		
		                var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PropositionCommandeRequest";
						exception.FonctionE = "UpdateSynchPropCommade";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
	}
	},
	
	UpdateSynchParametre : function(requete, form,callback)
	{
		try
	{
	    requete.executeSql('UPDATE PropositionCommande SET Synch= ? WHERE Synch = ?', ["true","false"], function(tx, results) {form.querySuccessUpdateSynch(tx,results,form, callback);});
	}
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateSynchArticleCommercial in ArticleCommercialRequest",'alert','e'); 
		
		 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PropositionCommandeRequest";
						exception.FonctionE = "UpdateSynchArticleCommercial";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
	}
	},
	
	querySuccessUpdateSynch : function(tx,results,form, callback)
	{
		callback();
	},
	
	
	//////////////////////////////// DELETE ALL PROPOSITION COMMANDE FORM DATA BASE /////////////////
	
DeleteAllPropositionCommande : function(callback)
{
	try
	{
		var form = this;	
		this.connexion.transaction(function(tx){ form.DeletePropositionCommande(tx, form,callback);}, function(err){ DMS.Mobile.Common.errors(err,"DeletePropositionCommande");
		
		var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PropositionCommandeRequest";
						exception.FonctionE = "DeletePropositionCommande";
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
			DMS.Mobile.Notification.ShowMessage(err.message+" : DeletePropositionCommande in PropositionCommandeRequest",'alert','e'); 
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PropositionCommandeRequest";
						exception.FonctionE = "DeletePropositionCommande";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
	 }	
},

DeletePropositionCommande : function(requete, form,callback)
{
	requete.executeSql("DELETE  FROM PropositionCommande ", [],
              function(tx, result) {				
				form.querySuccessDELETEAll(form,callback);
				}, 
                function(err){DMS.Mobile.Common.errors(err,"DeletePropositionCommande");
				
				      var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PropositionCommandeRequest";
						exception.FonctionE = "DeletePropositionCommande";
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
	
	
	
	
	
	
}