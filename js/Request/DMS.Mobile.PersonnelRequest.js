if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};


DMS.Mobile.PersonnelRequest = {};

DMS.Mobile.PersonnelRequest = 
{
	Personnel: null,
	connexion: null,
 

	/////////////////////////////////////
	SelectPersonnelByID : function(callback,Reclamation )
	{DMS.Mobile.Common.Alert2("SelectPersonnelByID");
	var form = this;
		try
	{
		
		this.connexion.transaction(function(tx){ form.SelectPersonnelByIDRec(tx, form,callback,Reclamation); }, function(err){ DMS.Mobile.Common.errors(err,"SelectPersonnelByID");
		
		           var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PersonnelRequest";
						exception.FonctionE = "SelectPersonnelByIDRec";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							 callback(Reclamation);
						});
		
		});
	}
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : SelectPersonnelByID in PersonnelRequest",'alert','e'); 
		
		                var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PersonnelRequest";
						exception.FonctionE = "SelectPersonnelByID";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							 callback(Reclamation);
						});
	}
	},
	
	SelectPersonnelByIDRec : function(requete, form,callback,Reclamation)
	{
				try
	{
	   			requete.executeSql("SELECT *  FROM Personnel WHERE PersonnelID = ?", [Reclamation.PersonnelID], function(tx, results) {form.querySuccessPersonnelID(tx,results,form,callback,Reclamation);});
    }
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : SelectPersonnelByIDRec in PersonnelRequest",'alert','e'); 
		                var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PersonnelRequest";
						exception.FonctionE = "SelectPersonnelByIDRec";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							 callback(Reclamation);
						});
	}
	},
	
	querySuccessPersonnelID : function(tx,results,form,callback,Reclamation)
	{
		try
		{
				if((results != null) && (results != ""))
				{
						var oPersonnel = new DMS.Mobile.Personnel();
									
						oPersonnel.PersonnelID = results.rows.item(0).PersonnelID;
						oPersonnel.Login = results.rows.item(0).Login;
						oPersonnel.Password = results.rows.item(0).Password;
						oPersonnel.Nom = results.rows.item(0).Nom;
						oPersonnel.Prenom = results.rows.item(0).Prenom;
						oPersonnel.Tel = results.rows.item(0).Tel;
						oPersonnel.Email = results.rows.item(0).Email;
						oPersonnel.Adresse = results.rows.item(0).Adresse;
						oPersonnel.Matricule = results.rows.item(0).Matricule; 
						oPersonnel.ProfilID = results.rows.item(0).ProfilID;
					
					DMS.Mobile.Common.Alert2("callback select Personnel");
					Reclamation.Personnel = oPersonnel;
					callback(Reclamation);
					
				}
				else
				{
					callback(Reclamation);
				}

		}
		catch(err)
		{
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PersonnelRequest";
						exception.FonctionE = "querySuccessPersonnelID";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							 callback(Reclamation);
						});
		}


	},
	
	 
	 
	 /////////////////////////////////////////
/*	 	SelectOnePersonnelTransaction: function (login, password, Form, callback) {
		try
		{
			var form;
				if (Form == null)
				{
				 form = this;	
			    form.connexion.transaction(function(tx){ form.SelectFromPersonnel(tx,login, password, form, callback) },  function(err){ DMS.Mobile.Common.errors(err,"SelectFromPersonnel");});
				}
				else
				{
				form = Form;	
			    form.connexion.transaction(function(tx){ form.SelectFromPersonnel(tx,login, password, form, callback) }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromPersonnel");});
				}
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectOnePersonnelTransaction in PersonnelRequest",'alert','e'); 
		}
    }, 	*/


 /*	SelectFromPersonnel : function(requete, login, password, form, callback) {	
try
{

	if ((login == null) && (password == null))
	{
		requete.executeSql('SELECT * FROM Personnel', [],function(tx, results) {form.CreatePersonnel(tx,results,form,callback)});
	}
	else
	{	
     		requete.executeSql('SELECT * FROM Personnel WHERE Login = ? AND Password = ?', [login,password],function(tx, results) {form.CreatePersonnel(tx,results,form,callback)});
	}
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromPersonnel in PersonnelRequest",'alert','e'); 
		}
    },*/
	
	
	
	
	
/*	  CreatePersonnel : function (requete, results, form, callback) {
	try
	{	   
		   DMS.Mobile.Common.Alert("results.rows.item.length = " + results.rows.item.length);
		   DMS.Mobile.Common.Alert("results.rows.length = " + results.rows.length);
		   if (results.rows.length != 0)
		   {
								var oPersonnel = new DMS.Mobile.Personnel();
							
								oPersonnel.PersonnelID = results.rows.item(0).PersonnelID;
								oPersonnel.Login = results.rows.item(0).Login;
								oPersonnel.Password = results.rows.item(0).Password;
								oPersonnel.Nom = results.rows.item(0).Nom;
								oPersonnel.Prenom = results.rows.item(0).Prenom;
								oPersonnel.Tel = results.rows.item(0).Tel;
								oPersonnel.Email = results.rows.item(0).Email;
								oPersonnel.Adresse = results.rows.item(0).Adresse;
       							oPersonnel.Matricule = results.rows.item(0).Matricule; 
       							oPersonnel.ProfilID = results.rows.item(0).ProfilID;
								
        						form.Personnel = oPersonnel;      
		   }
		   else 
		   {form.Personnel = null;}
		   callback(form.Personnel,form);
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : CreatePersonnel in PersonnelRequest",'alert','e'); 
		}
    },*/




	 
	
	
	

	 
/*	 GetPersonnelFromLocal: function(_login, _password,callback)
	 {
		 try
		 {
		  var form = this; 
		  form.SelectOnePersonnelTransaction(_login, _password, form, callback);
		  		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : GetPersonnelFromLocal in PersonnelRequest",'alert','e'); 
		}
	 
	 },*/
	 insertPersonnelIntoArray : function(personnel,form,callbackViewModel)
	 {
		 try
		 {
		 form.Personnel = personnel;
		// alert(form.Personnel);
		 localStorage.setItem("Personnel", JSON.stringify(form.Personnel));
		 callbackViewModel(personnel);
		 	}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertPersonnelIntoArray in PersonnelRequest",'alert','e'); 
			
		            	var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PersonnelRequest";
						exception.FonctionE = "insertPersonnelIntoArray";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							  callbackViewModel(personnel);
						});
			
		}
	},
	 
	 
	 
	 
	 
	 GetPersonnelFromServer: function(_login,_password,callbackViewModel) 
		{
			//alert("GetpersonnelFromServer");
			var form = this;
			try
			{
			var Conf = JSON.parse(localStorage.getItem("Configuration"));
		 
		    DMS.Mobile.Common.Alert(_login);
		    var login = _login;
		    var password = _password;
	        var Data = "login="+login+"&password="+password; 
		  
		  var methode= "GetCommercialByLogin?";
		   
		  var URL = Conf.URL+methode+Data;
		    
			
		    
			DMS.Mobile.Common.CallService(function(JsonObject,Form){form.CreatePersonnelDTO(JsonObject,Form,callbackViewModel);},URL,form);
				}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : GetPersonnelFromServer in PersonnelRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PersonnelRequest";
						exception.FonctionE = "GetPersonnelFromServer";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							  callbackViewModel(form.Personnel);
						});
		}
		},
		
		CreatePersonnelDTO : function(json,form,callbackViewModel)
		{
			
			//alert("CreatePersonnelDTO");
			try
			{
				form.Personnel = null;
				  //alert"create personneldto");	
		if ( json != null)
		{
			//alert"json non null");
			var synch = "true";
			var personnelDTO = new DMS.Mobile.Personnel();
			
			personnelDTO.PersonnelID = json.PersonnelID;
			personnelDTO.Login = json.Login;
			personnelDTO.Password = json.Password;
			personnelDTO.Nom = json.Nom;
			personnelDTO.Prenom = json.Prenom;
			personnelDTO.Tel = json.Tel;
			personnelDTO.Email = json.Email;
			personnelDTO.Adresse = json.Adresse;
			personnelDTO.Matricule = json.Matricule;
			personnelDTO.ProfilID = json.ProfilID;
			personnelDTO.ListCommandes = json.Commandes;
			personnelDTO.ListMissions = json.Missions;
			personnelDTO.ListObjectifs = json.Objectifs;
			personnelDTO.Profils = json.Profils;
			personnelDTO.ListReclamations = json.Reclamations;
			
			
		DMS.Mobile.SynchronizeRequest.connexion = form.connexion;
		DMS.Mobile.SynchronizeRequest.SynchCheck(function(synchroneTest){
			
				// toutes les données sont synchronizer (true)
				//alert("SynchCheck");
				if(synchroneTest == true)
				{
					form.DeleteAllData(form,function(){
					   form.InsertPersonnel(personnelDTO,synch,form,callbackViewModel);
					});
				}
				else
				{
					DMS.Mobile.SynchronizeRequest.connexion = form.connexion;
		            DMS.Mobile.SynchronizeRequest.SynchronizeAll(function(test){
						if(test == "true")
						{
							form.DeleteAllData(form,function(){
								   form.InsertPersonnel(personnelDTO,synch,form,callbackViewModel);
								});
						}
						});
				}
			
			});
		
			     
		
		
		   }
		   else 
		   {
			   //alert"json null");
			   localStorage.setItem("Personnel", JSON.stringify(form.Personnel));
		       callbackViewModel(form.Personnel);
		   }
		   
		   		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : CreatePersonnelDTO in PersonnelRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PersonnelRequest";
						exception.FonctionE = "CreatePersonnelDTO";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							  callbackViewModel(form.Personnel);
						});
		}
		},
		
		
	InsertPersonnel: function(PersonnelObject,synch,form,callbackViewModel)
	  {
		  //alert("InsertPersonnel");
		 try
		 {
			 if(form == null)
			 {
				 form = this;
			 }
              form.InsertPersonnelIntoLOCAL(PersonnelObject,synch,form,callbackViewModel);
		 }
		catch(err)
		 {
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertPersonnel in PersonnelRequest",'alert','e'); 
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PersonnelRequest";
						exception.FonctionE = "InsertPersonnel";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							  callbackViewModel(form.Personnel);
						});
		 }  
	 
	 },
		
		
		    InsertPersonnelIntoLOCAL: function(PersonnelObject,synch,formReq,callbackViewModel) {
		try
		{
//alert("InsertPersonnelIntoLOCAL");
			        formReq.connexion.transaction(function(tx){ formReq.InsertIntoPersonnel(tx, formReq,PersonnelObject,synch); }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoPersonnel");},function(){formReq.insertPersonnelIntoArray(PersonnelObject,formReq,callbackViewModel);}); 
					
        }
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertPersonnelIntoLOCAL in PersonnelRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PersonnelRequest";
						exception.FonctionE = "InsertPersonnelIntoLOCAL";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							  callbackViewModel(formReq.Personnel);
						});
			
		}
		   },

	InsertIntoPersonnel : function(requete,form,PersonnelObject,synch) {  
	try
	{		//alert("InsertIntoPersonnel");
			requete.executeSql('INSERT INTO Personnel (PersonnelID,Login,Password,Nom,Prenom,Tel,Email,Adresse,Matricule,Synch,ProfilID) VALUES('
+PersonnelObject.PersonnelID+',"'+PersonnelObject.Login+'","'+PersonnelObject.Password+'","'+PersonnelObject.Nom+'","'+PersonnelObject.Prenom+'",'+PersonnelObject.Tel+',"'+PersonnelObject.Email+'","'+PersonnelObject.Adresse+'",'+PersonnelObject.Matricule+',"'+synch+'",'+PersonnelObject.ProfilID+')');
       
	//alert("fin insertion personnel");	
	
			}
			catch(err)
		{
			
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PersonnelRequest";
						exception.FonctionE = "InsertIntoPersonnel";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoPersonnel in PersonnelRequest",'alert','e'); 
						});
		}																															
    },
	 
		
	 
	 
	 /////////////////////////////////////////////////////////////////////////////////////////////
	 VerifyPersonnelInLocalSession : function(_login, _password,callback)
	 {
		 //alert"VerifyPersonnelInLocalSession");
		  var form = this; 
	    try
		{
			
		 
		  	var SessionPersonnel = localStorage.getItem("Personnel");
		  if ( SessionPersonnel != null)
		  {
		  form.Personnel = JSON.parse(SessionPersonnel);
		  }
		  else
		  {
			  form.Personnel = null;
		  }
		 
		  if (form.Personnel == null)
		  {
			  
		      callback(form.Personnel);
		  }
		  else
		  {
			   
			  if((form.Personnel.Login == _login) && (form.Personnel.Password == _password))
		      {
				 
				  //alert("utilisateur existant dans localStorage");
				  callback(form.Personnel);
			  }
			  else
			  {
				   
	/*			  //alert("utilisateur inexistant");
				  // si utilisateur inéxistant dans local storage : 
				      // - vider local storage
					  // - vider la BD local si toutes les données sont synchroniser
					  
					  var synch = true;
					  
					  	DMS.Mobile.PositionRequest.connexion = form.connexion;
						DMS.Mobile.CommandeRequest.connexion = form.connexion;
						DMS.Mobile.TourneeRequest.connexion = form.connexion;
					 
						DMS.Mobile.PositionRequest.SelectAllPositionNotSynchro(function(ListPosition){
						DMS.Mobile.CommandeRequest.SelectAllCommandeNotSynchro(function(ListCommande){
						DMS.Mobile.TourneeRequest.SelectAllTourneeNotSynchro(function(ListTournee){
							
							var nbrPosition = ListPosition.length;
							var nbrTournee = ListTournee.length;
							var nbrCommande = ListCommande.length;
							 if((nbrPosition != 0)||(nbrTournee != 0)||(nbrCommande != 0))
							 {
								
								 synch = false;
							 }
							  
							  if (synch == true)
							  {
								  alert("donner synchro");
								  localStorage.removeItem("Personnel");
								  //delete all tables
								  
								  DMS.Mobile.ActiviteRequest.connexion = form.connexion;
								  DMS.Mobile.ArticleRequest.connexion = form.connexion;
								  DMS.Mobile.ClientRequest.connexion = form.connexion;
								  DMS.Mobile.CommandeRequest.connexion = form.connexion;
								  DMS.Mobile.ConfigurationRequest.connexion = form.connexion;
								  DMS.Mobile.FamilleRequest.connexion = form.connexion;
								  DMS.Mobile.GammeRequest.connexion = form.connexion;
								  DMS.Mobile.LigneCommandeRequest.connexion = form.connexion;
								  DMS.Mobile.MissionRequest.connexion = form.connexion;
								  //DMS.Mobile.PersonnelRequest.connexion = form.connexion;
								  DMS.Mobile.PointVenteRequest.connexion = form.connexion;
								  DMS.Mobile.PositionRequest.connexion = form.connexion;
								  DMS.Mobile.ProfilRequest.connexion = form.connexion;
								  DMS.Mobile.TourneeRequest.connexion = form.connexion;
								  DMS.Mobile.TypeMissionRequest.connexion = form.connexion;
								  DMS.Mobile.VilleRequest.connexion = form.connexion;
								  DMS.Mobile.ZoneRequest.connexion = form.connexion;
								  DMS.Mobile.FactureRequest.connexion = form.connexion;
								  DMS.Mobile.PictureRequest.connexion = form.connexion;
								  DMS.Mobile.ReclamationRequest.connexion = form.connexion;
								  
								  
								  DMS.Mobile.PictureRequest.DeleteAllPicture(function(){
								  DMS.Mobile.ReclamationRequest.DeleteAllFacture(function(){
								  DMS.Mobile.ActiviteRequest.DeleteAllActivite(function(){
								  DMS.Mobile.ArticleRequest.DeleteAllArticle(function(){
								  DMS.Mobile.ClientRequest.DeleteAllClient(function(){
								  DMS.Mobile.CommandeRequest.DeleteAllCommande(function(){
								  DMS.Mobile.ConfigurationRequest.DeleteAllConfiguration(function(){
								  DMS.Mobile.FamilleRequest.DeleteAllFamille(function(){
								  DMS.Mobile.GammeRequest.DeleteAllGamme(function(){
								  DMS.Mobile.LigneCommandeRequest.DeleteAllLigneCommande(function(){
								  DMS.Mobile.MissionRequest.DeleteAllMission(function(){
								  form.DeleteAllPersonnel(function(){
								  DMS.Mobile.PointVenteRequest.DeleteAllPointVente(function(){
								  DMS.Mobile.PositionRequest.DeleteAllPosition(function(){
								  DMS.Mobile.ProfilRequest.DeleteAllProfil(function(){
								  DMS.Mobile.TourneeRequest.DeleteAllTournee(function(){
								  DMS.Mobile.TypeMissionRequest.DeleteAllTypeMission(function(){
								  DMS.Mobile.VilleRequest.DeleteAllVille(function(){
								  DMS.Mobile.ZoneRequest.DeleteAllZone(function(){
								  DMS.Mobile.TourneePointVenteRequest.DeleteAllTourneePointVente(function(){
								  DMS.Mobile.FactureRequest.DeleteAllFacture(function(){
								 
								               callback(null);
								  
								  });
								  });	
								  });
								  });			   
								  });
								  });
								  });
								  });
								  });
								  });
								  });
								  });
								  });
								  });
								  });
								  });
								  });
								  });
								  });
								  });
								  });		   
							  }
							  else
							  {
								alert("vous ne pouvez pas connecté car il y a des données ne sont pas synchroniser");
							  }
							 
							
						});
						});
						});	*/
						
					callback(null);
			  }
		  }
		}
		catch(err)
		{
			 
			 
			DMS.Mobile.Notification.ShowMessage(err.message+" : GetPersonnelFromLocalSession in PersonnelRequest",'alert','e'); 
			
			  var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PersonnelRequest";
						exception.FonctionE = "GetPersonnelFromLocalSession";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.Personnel);
						});
			
		}
	 },
	 
	 //////////////////////////////////////// Delete All Data /////////////////
	 DeleteAllData : function (form,callback)
	 {
		 try
		 {
			 
		 if(form == null)
		 {
			 form = this;
	     }
		  //alert("utilisateur inexistant");
				  // si utilisateur inéxistant dans local storage : 
				      // - vider local storage
					  // - vider la BD local si toutes les données sont synchroniser
					 
								  localStorage.removeItem("Personnel");
								  
								  //delete all tables
								  
								  DMS.Mobile.ActiviteRequest.connexion = form.connexion;
								  DMS.Mobile.ArticleRequest.connexion = form.connexion;
								  DMS.Mobile.ClientRequest.connexion = form.connexion;
								  DMS.Mobile.CommandeRequest.connexion = form.connexion;
								  DMS.Mobile.ConfigurationRequest.connexion = form.connexion;
								  DMS.Mobile.FamilleRequest.connexion = form.connexion;
								  DMS.Mobile.GammeRequest.connexion = form.connexion;
								  DMS.Mobile.LigneCommandeRequest.connexion = form.connexion;
								  DMS.Mobile.MissionRequest.connexion = form.connexion;
								  //DMS.Mobile.PersonnelRequest.connexion = form.connexion;
								  DMS.Mobile.PointVenteRequest.connexion = form.connexion;
								  DMS.Mobile.PositionRequest.connexion = form.connexion;
								  DMS.Mobile.ProfilRequest.connexion = form.connexion;
								  DMS.Mobile.TourneeRequest.connexion = form.connexion;
								  DMS.Mobile.TypeMissionRequest.connexion = form.connexion;
								  DMS.Mobile.VilleRequest.connexion = form.connexion;
								  DMS.Mobile.ZoneRequest.connexion = form.connexion;
								  DMS.Mobile.FactureRequest.connexion = form.connexion;
								  DMS.Mobile.PictureRequest.connexion = form.connexion;
								  DMS.Mobile.ReclamationRequest.connexion = form.connexion;
								  DMS.Mobile.PromotionRequest.connexion = form.connexion;
								  DMS.Mobile.HistoriqueFactureRequest.connexion = form.connexion;
								  DMS.Mobile.LivraisonRequest.connexion = form.connexion;
								  DMS.Mobile.PromotionArticleRequest.connexion = form.connexion;
								  DMS.Mobile.PropositionCommandeRequest.connexion = form.connexion ;
								  DMS.Mobile.ReclamationRequest.connexion = form.connexion;
								  DMS.Mobile.TourneePointVenteRequest.connexion = form.connexion;
								  
								  
								  
								  DMS.Mobile.PromotionRequest.DeleteAllPromotion(function(){
								  DMS.Mobile.PromotionRequest.DeleteAllFidelisation(function(){
								  DMS.Mobile.HistoriqueFactureRequest.DeleteAllHistoriqueFacture(function(){
								  DMS.Mobile.LivraisonRequest.DeleteAllLivraison(function(){
								  DMS.Mobile.PromotionArticleRequest.DeleteAllPromotionArticle(function(){
								  DMS.Mobile.PropositionCommandeRequest.DeleteAllPropositionCommande(function(){
								  DMS.Mobile.ReclamationRequest.DeleteAllReclamation(function(){
								  
								  DMS.Mobile.PictureRequest.DeleteAllPicture(function(){
						//		  DMS.Mobile.ReclamationRequest.DeleteAllFacture(function(){
								  DMS.Mobile.ActiviteRequest.DeleteAllActivite(function(){
								  DMS.Mobile.ArticleRequest.DeleteAllArticle(function(){
								  DMS.Mobile.ClientRequest.DeleteAllClient(function(){
								  DMS.Mobile.CommandeRequest.DeleteAllCommande(function(){
								  DMS.Mobile.ConfigurationRequest.DeleteAllConfiguration(function(){
								  DMS.Mobile.FamilleRequest.DeleteAllFamille(function(){
								  DMS.Mobile.GammeRequest.DeleteAllGamme(function(){
								  DMS.Mobile.LigneCommandeRequest.DeleteAllLigneCommande(function(){
								  DMS.Mobile.MissionRequest.DeleteAllMission(function(){
								  form.DeleteAllPersonnel(function(){
								  DMS.Mobile.PointVenteRequest.DeleteAllPointVente(function(){
								//  DMS.Mobile.PositionRequest.DeleteAllPosition(function(){
								  DMS.Mobile.ProfilRequest.DeleteAllProfil(function(){
								  DMS.Mobile.TourneeRequest.DeleteAllTournee(function(){
								  DMS.Mobile.TypeMissionRequest.DeleteAllTypeMission(function(){
								  DMS.Mobile.VilleRequest.DeleteAllVille(function(){
								  DMS.Mobile.ZoneRequest.DeleteAllZone(function(){
								  DMS.Mobile.TourneePointVenteRequest.DeleteAllTourneePointVente(function(){
								  DMS.Mobile.FactureRequest.DeleteAllFacture(function(){
								 
								               //callback(null);
											   callback()
								  
								  });
								  });	
								  });
								  });			   
								  });
							//	  });
								//  });
								  });
								  });
								  });
								  });
								  });
								  });
								  });
								  });
								  });
								  });
								  });
								  });
								  });
								  });
								  });
								  });
								  });
								  });
								  });
								  });
								  });		   
		 }
		 catch(err)
		 {
			           var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PersonnelRequest";
						exception.FonctionE = "DeleteAllData";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
		 }
		
	 },
	 
	 
	 //////////////////////////////////////// Delete All Personnel ////////////////////////
DeleteAllPersonnel : function(callback)
{
	var form = this;
	try
	{
				
			this.connexion.transaction(function(tx){ form.DeletePersonnels(tx, form,callback);}, function(err){ DMS.Mobile.Common.errors(err,"DeleteAllPersonnel");
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PersonnelRequest";
						exception.FonctionE = "DeletePersonnels";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
			
			});
	 }
	 catch(err)
	 {
			DMS.Mobile.Notification.ShowMessage(err.message+" : DeleteAllPersonnel in PersonnelRequest",'alert','e'); 
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PersonnelRequest";
						exception.FonctionE = "DeleteAllPersonnel";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
	 }	
}, 

DeletePersonnels : function(requete, form,callback)
{
	requete.executeSql("DELETE FROM Personnel ", [],
              function(tx, result) {				
				form.querySuccessDELETEAll(form,callback);
				}, 
                function(err){DMS.Mobile.Common.errors(err,"DeletePersonnels");
				
				      var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PersonnelRequest";
						exception.FonctionE = "DeletePersonnels";
						exception.Exception = err.code;
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


	 
	 
	 
	 
	 
	 // Function to call WCF  Service       
/*	 CallService: function(callback,Url,form,callback2) {
	try
	{
		alert("callservice personnel")
	DMS.Mobile.Common.Alert("CallService");
					$.ajax({

						cache: true,
						url: Url,
						type: "GET",
						contentType: "application/javascript",
						dataType: "jsonp",
				
						success: function(msg) {
							DMS.Mobile.Common.Alert("result = " + msg);
							form.ServiceSucceeded(msg,callback,form,callback2);
						},  
					});
			
				}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : callService in PersonnelRequest",'alert','e'); 
		}			
   },
   
	ServiceFailed: function(xhr) {
        
try
{
	alert("service ffffailed");
		if (xhr.responseText) {
			var err = xhr.responseText;
			if (err)
				error(err);
			else
				error({ Message: "Unknown server error." })
		}
    
	
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : ServiceFailed in PersonnelRequest",'alert','e'); 
		}
		return;
},*/
		
/*   ServiceSucceeded: function(result,callback,form,callback2) {
		try
		{
		
			DMS.Mobile.Common.Alert("result = " + result);
		
			
	
			   JsonObject = result;
			   
			   callback(JsonObject,form,callback2);
			   
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : ServiceSucceeded in PersonnelRequest",'alert','e'); 
		}
}*/
		





}