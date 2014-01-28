if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.SynchronizeRequest = {};

DMS.Mobile.SynchronizeRequest = 
{
     connexion: null,
     listPosition : [],
	 listTournee : [],
	 listCommande : [],
	 listReclamation : [],
	 listFacture : [],
	 listHistoricFacture : [],
	 listArticleCommercial : [],
	 propositionCommande : null,
	 
	 init : function()
	 { 
 
	      var form = this;
		 
		  var objectSynch = new Object();
		  objectSynch.ListPosition = form.listPosition;
		  objectSynch.ListCommande = form.listCommande;
		  objectSynch.ListTournee  = form.listTournee;
		  objectSynch.ListReclamation  = form.listReclamation;
		  objectSynch.ListArticleCommercial = form.listArticleCommercial;
		  objectSynch.PropositionCommande = form.propositionCommande;
		  
		  var objFacture = new Object();
		  objFacture.ListFacture  = form.listFacture;
		  objFacture.ListHistoricFacture  = form.listHistoricFacture;
		  
		  objectSynch.Facture  = objFacture;
		  
		  
		  
		  return objectSynch;
	 },

// verification s'il y a des données non synchroniser

SynchCheck : function (callback)
{
	                  var form = this;
					  var synch = true;
					  
					// 	DMS.Mobile.PositionRequest.connexion = form.connexion;
						DMS.Mobile.CommandeRequest.connexion = form.connexion;
						DMS.Mobile.TourneeRequest.connexion = form.connexion;
					    DMS.Mobile.PropositionCommandeRequest.connexion = form.connexion;
					    DMS.Mobile.ArticleCommercialRequest.connexion = form.connexion;
						DMS.Mobile.ReclamationRequest.connexion = form.connexion;
						DMS.Mobile.FactureRequest.connexion = form.connexion;
						DMS.Mobile.HistoriqueFactureRequest.connexion = form.connexion;
						
					 
		                DMS.Mobile.PropositionCommandeRequest.SelectPropositionCommandeNotSynchronize(function(propositionCommande){			
		                DMS.Mobile.ArticleCommercialRequest.SelectAllQuantiteArticleNotSynchronize(function(ListArticleCommercial){
			            DMS.Mobile.ReclamationRequest.SelectAllReclamationNotSynchro(function(ListReclamation){
				        DMS.Mobile.FactureRequest.SelectAllFactureNotSynchro(function(ListFacture){
				        DMS.Mobile.HistoriqueFactureRequest.SelectAllHistoricFactureNotSynch(function(ListHistoric){
				
			
					//	DMS.Mobile.PositionRequest.SelectAllPositionNotSynchro(function(ListPosition){
						DMS.Mobile.CommandeRequest.SelectAllCommandeNotSynchro(function(ListCommande){
						DMS.Mobile.TourneeRequest.SelectAllTourneeNotSynchro(function(ListTournee){
							
						//	var nbrPosition = ListPosition.length;
							var nbrTournee = ListTournee.length;
							var nbrCommande = ListCommande.length;
							var nbrArticleCommercial = ListArticleCommercial.length;
							var nbrReclamation = ListReclamation.length;
							var nbrFacture = ListFacture.length;
							var nbrHistorique = ListHistoric.length;
							 if((nbrTournee != 0)||(nbrCommande != 0)||(nbrArticleCommercial != 0)||(nbrReclamation != 0)||(nbrFacture != 0)||(nbrHistorique != 0)||(propositionCommande != null))
							 {
								
								 synch = false;
							 }
							 
							 callback(synch);
						
						});
						});
						});
						});
						});
							 
						});
						});
				//	});
},


// Synchronization de toutes les données
	SynchronizeAll : function(callback)
	{
		var form = this;
		var enumSynchronize = DMS.Mobile.Constante.Synchronize.All;
		var objectSynch = this.init();
		
		//	DMS.Mobile.PositionRequest.connexion = form.connexion;
						DMS.Mobile.CommandeRequest.connexion = form.connexion;
						DMS.Mobile.TourneeRequest.connexion = form.connexion;
					    DMS.Mobile.PropositionCommandeRequest.connexion = form.connexion;
					    DMS.Mobile.ArticleCommercialRequest.connexion = form.connexion;
						DMS.Mobile.ReclamationRequest.connexion = form.connexion;
						DMS.Mobile.FactureRequest.connexion = form.connexion;
						DMS.Mobile.HistoriqueFactureRequest.connexion = form.connexion;
						
					 
		    DMS.Mobile.PropositionCommandeRequest.SelectPropositionCommandeNotSynchronize(function(propositionCommande){			
		    DMS.Mobile.ArticleCommercialRequest.SelectAllQuantiteArticleNotSynchronize(function(ListArticleCommercial){
			DMS.Mobile.ReclamationRequest.SelectAllReclamationNotSynchro(function(ListReclamation){
			DMS.Mobile.FactureRequest.SelectAllFactureNotSynchro(function(ListFacture){
			DMS.Mobile.HistoriqueFactureRequest.SelectAllHistoricFactureNotSynch(function(ListHistoric){
							
							
		 
		//	DMS.Mobile.PositionRequest.SelectAllPositionNotSynchro(function(ListPosition){
			DMS.Mobile.CommandeRequest.SelectAllCommandeNotSynchro(function(ListCommande){
			DMS.Mobile.TourneeRequest.SelectAllTourneeNotSynchro(function(ListTournee){
				
			//	  objectSynch.ListPosition = ListPosition;
		          objectSynch.ListCommande = ListCommande;
		          objectSynch.ListTournee  = ListTournee;
				  
				  objectSynch.Facture.ListFacture = ListFacture;
				  objectSynch.Facture.ListHistoricFacture = ListHistoric;
				  objectSynch.ListReclamation  = ListReclamation;
		          objectSynch.ListArticleCommercial = ListArticleCommercial;
		          objectSynch.PropositionCommande = propositionCommande;
				  
				  form.Synchronize(form,enumSynchronize,objectSynch,callback);
				
		//	});
			});
			});	
			});
			});
			});	
			});
			});	
		
		
	},
	
	// synchroniser le paramétrage de proposition commande pour le commercial logger
	SynchronizePropositionCommande : function(callback)
	{
		 var form = this;
		var enumSynchronize = DMS.Mobile.Constante.Synchronize.PropositionCommande;
		var objectSynch = this.init();
		
		DMS.Mobile.PropositionCommandeRequest.connexion = form.connexion;
		DMS.Mobile.PropositionCommandeRequest.SelectPropositionCommandeNotSynchronize(function(propositionCommande){
			
			if(propositionCommande == null)
			{
				callback(false);
			}
			else
			{
				objectSynch.PropositionCommande = propositionCommande;  
				form.Synchronize(form,enumSynchronize,objectSynch,callback);
			}
		});
	},
	
	// synchronisation de la liste des articlesCommercial
	SynchronizeArticleCommercial : function(callback)
	{
		var form = this;
		var enumSynchronize = DMS.Mobile.Constante.Synchronize.ArticleCommercial;
		var objectSynch = this.init();
		
		DMS.Mobile.ArticleCommercialRequest.connexion = form.connexion;
		DMS.Mobile.ArticleCommercialRequest.SelectAllQuantiteArticleNotSynchronize(function(ListArticleCommercial){
			
			if(ListArticleCommercial.length == 0)
			{
				callback(false);
			}
			else
			{
				objectSynch.ListArticleCommercial = ListArticleCommercial;  
				form.Synchronize(form,enumSynchronize,objectSynch,callback);
			}
		});
	},
	
	// synchronisation de la liste des réclamations
	SynchronizeReclamation : function(callback)
	{
		var form = this;
		var enumSynchronize = DMS.Mobile.Constante.Synchronize.Reclamation;
		var objectSynch = this.init();
		
			DMS.Mobile.ReclamationRequest.connexion = form.connexion;
		
		 
			DMS.Mobile.ReclamationRequest.SelectAllReclamationNotSynchro(function(ListReclamation){
							if(ListReclamation.length == 0)
							{
								callback(false);
							}
							else
							{
								 objectSynch.ListReclamation = ListReclamation;  
				                 form.Synchronize(form,enumSynchronize,objectSynch,callback);
							}
				 
				
			});
				
	},
	
	
	//Synchronisation de la liste des positions
	SynchronizePosition : function()
	{
		var form = this;
		var enumSynchronize = DMS.Mobile.Constante.Synchronize.Position;
		var objectSynch = this.init();
		
			DMS.Mobile.PositionRequest.connexion = form.connexion;
		
		 
			DMS.Mobile.PositionRequest.SelectAllPositionNotSynchro(function(ListPosition){
							
				  objectSynch.ListPosition = ListPosition;  
				  form.Synchronize(form,enumSynchronize,objectSynch);
				
			});
				
	},

	//Synchronisation de liste des facture
	SynchronizeFacture : function(callback)
	{
		var form = this;
		var enumSynchronize = DMS.Mobile.Constante.Synchronize.Facture;
		var objectSynch = this.init();
		
		    DMS.Mobile.FactureRequest.connexion = form.connexion;
			DMS.Mobile.FactureRequest.SelectAllFactureNotSynchro(function(ListFacture){
				
				if(ListFacture.length == 0)
				{
					alert("Liste des factures à été synchronisé");
				}
				else
				{
				
		          objectSynch.Facture.ListFacture = ListFacture;
				  
				  
			DMS.Mobile.HistoriqueFactureRequest.connexion = form.connexion;
			DMS.Mobile.HistoriqueFactureRequest.SelectAllHistoricFactureNotSynch(	function(ListHistoric){
				
				
				objectSynch.Facture.ListHistoricFacture = ListHistoric;
				  
				  form.Synchronize(form,enumSynchronize,objectSynch,callback);
				
			  });
				}
			});
	
	},


	
	//Synchronisation de liste des commandes
	SynchronizeCommande : function(callback)
	{
		var form = this;
		var enumSynchronize = DMS.Mobile.Constante.Synchronize.Commande;
		var objectSynch = this.init();
		
		    DMS.Mobile.CommandeRequest.connexion = form.connexion;
			DMS.Mobile.CommandeRequest.SelectAllCommandeNotSynchro(function(ListCommande){
				
				if(ListCommande.length == 0)
				{
					alert("Liste des commandes à été synchronisée");
				}
				else
				{
		          objectSynch.ListCommande = ListCommande;
				  
				  form.Synchronize(form,enumSynchronize,objectSynch,callback);
				}
			});
	
	},
	
	//Synchronisation de liste des tournées
	SynchronizeTourne : function()
	{
		var form = this;
		var enumSynchronize = DMS.Mobile.Constante.Synchronize.All;
		var objectSynch = this.init();

		    DMS.Mobile.TourneeRequest.connexion = form.connexion;
		 
			DMS.Mobile.TourneeRequest.SelectAllTourneeNotSynchro(function(ListTournee){
				
				if("Liste des tournées à été synchronisée");
		          objectSynch.ListTournee  = ListTournee;
				  
				  form.Synchronize(form,enumSynchronize,objectSynch);
				
			});
	},


    Synchronize : function(form,enumSynchronize,objectSynch, callback)
	{
		try
		{ 
			var jsonText = JSON.stringify(objectSynch);
				 
			// appel de la méthode de synchronisiation a partir de service, retourne "true" en cas de succees de            //sauvgarde dans la base de données serveur
				form.synchronizeServer(form,jsonText,function(ReponseSynch){
			 
					if (ReponseSynch == "true")
					{
						form.ChangeSynch(form,enumSynchronize,callback);
					}
					else
					{
						switch (enumSynchronize)
						{
							case DMS.Mobile.Constante.Synchronize.All :  
							      alert("Echec de synchronisation de toutes les données");
								  callback(ReponseSynch);
							break;
							case DMS.Mobile.Constante.Synchronize.Reclamation :  
							      alert("Echec de synchronisation de liste des réclamations");
								  callback(ReponseSynch);
							break;
							case DMS.Mobile.Constante.Synchronize.Facture :  
							      alert("Echec de synchronisation de liste des factures");
								  callback(ReponseSynch);
							break;
							case DMS.Mobile.Constante.Synchronize.Position :  
							      alert("Echec de synchronisation de liste des positions");
								  callback(ReponseSynch);
							break;
							case DMS.Mobile.Constante.Synchronize.Commande :  
							      alert("Echec de synchronisation de liste des commandes");
								  callback(ReponseSynch);
							break;
							case DMS.Mobile.Constante.Synchronize.Tournee :  
							      alert("Echec de synchronisation de liste des tournées");
								  callback(ReponseSynch);
							break;
							
							case DMS.Mobile.Constante.Synchronize.PropositionCommande :  
							      alert("Echec de synchronisation de paramétrage de proposition commande");
								  callback(ReponseSynch);
							break;
							case DMS.Mobile.Constante.Synchronize.ArticleCommercial :  
							      alert("Echec de synchronisation de liste des quantitées référentiels des articles");
								  callback(ReponseSynch);
							break;
							
						}
						
					}
			 
			   });
				
			
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : Synchronize in SynchronizeRequest",'alert','e'); 
		}
	 },
	 
	 
	synchronizeServer : function(form,jsonText,callback)
	{
		try
		{
			var Conf = JSON.parse(localStorage.getItem("Configuration"));
			
			var Data = "jsonText="+jsonText; 	  
			var methode= "SynchronizeServer?";
			//var url = "http://localhost:1307/Service1.svc/"
			//var URL = url+methode+Data;
			var URL = Conf.URL+methode+Data;
			DMS.Mobile.Common.CallService(function(JsonObject,Form){form.ReponseService(JsonObject,Form,callback);},URL,form);
		
		}
		catch(err)
		{
	    	DMS.Mobile.Notification.ShowMessage(err.message+" : synchronizeServer in SynchronizeRequest",'alert','e'); 
		}
	},


    ReponseService : function(json,form,callback)
	{
		try
		{
			//alert("reponseService");
			//alert(json);
			if ( json != null)
			{
				callback(json);
			}
			else
			{
				callback("false");
			}
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : ReponseService in SynchronizeRequest",'alert','e');   }
			
	},
	
	ChangeSynch : function(form,enumSynchronize, callback)
	{
		
		
		switch (enumSynchronize)
		{
				case DMS.Mobile.Constante.Synchronize.All :  
					      DMS.Mobile.PositionRequest.connexion = form.connexion;
						  DMS.Mobile.CommandeRequest.connexion = form.connexion;
						  DMS.Mobile.TourneeRequest.connexion = form.connexion;
						  DMS.Mobile.LigneCommandeRequest.connexion = form.connexion;
						  DMS.Mobile.MissionRequest.connexion = form.connexion;
						  DMS.Mobile.ReclamationRequest.connexion = form.connexion;
						  DMS.Mobile.ArticleCommercialRequest.connexion = form.connexion;
						  DMS.Mobile.PropositionCommandeRequest.connexion = form.connexion;
						  DMS.Mobile.FactureRequest.connexion = form.connexion;
						  DMS.Mobile.HistoriqueFactureRequest.connexion = form.connexion;
						   
						   
						  DMS.Mobile.ReclamationRequest.UpdateSynchReclamation(function(){  
						  DMS.Mobile.ArticleCommercialRequest.UpdateSynchArticleCommercial(function(){   
						  DMS.Mobile.PropositionCommandeRequest.UpdateSynchPropCommade(function(){
						  DMS.Mobile.FactureRequest.UpdateSynchFacture(function(){
						  DMS.Mobile.HistoriqueFactureRequest.UpdateSynchHistoFacture(function(){
						//  DMS.Mobile.PositionRequest.UpdateSynchPosition(function(){
								DMS.Mobile.TourneeRequest.UpdateSynchTournee(function(){
									DMS.Mobile.MissionRequest.UpdateSynchMission(function(){
										DMS.Mobile.CommandeRequest.UpdateSynchCommande(function(){
											DMS.Mobile.LigneCommandeRequest.UpdateSynchLigneCommande(function(){
											
										//	alert("La synchronisation des données est effectuée avec succès");
											callback("true");
											});
										});
									});
								});
					//		});
							});
							});
							});
							});
							});
				break;
				case DMS.Mobile.Constante.Synchronize.Position :  
					      DMS.Mobile.PositionRequest.connexion = form.connexion;
						  DMS.Mobile.PositionRequest.UpdateSynchPosition(function(){
							 
									alert("La synchronisation des positions est effectuée avec succès");
									callback("true");				
							 });
				break;
				case DMS.Mobile.Constante.Synchronize.Reclamation :  
					      DMS.Mobile.ReclamationRequest.connexion = form.connexion;
						  DMS.Mobile.ReclamationRequest.UpdateSynchReclamation(function(){
							 
									alert("La synchronisation des réclamations est effectuée avec succès");
									callback("true");				
							 });
				break;
				case DMS.Mobile.Constante.Synchronize.Commande :  

						  DMS.Mobile.CommandeRequest.connexion = form.connexion;
						  DMS.Mobile.LigneCommandeRequest.connexion = form.connexion;
						  DMS.Mobile.CommandeRequest.UpdateSynchCommande(function(){
						  DMS.Mobile.LigneCommandeRequest.UpdateSynchLigneCommande(function(){
								
								    alert("La synchronisation des commandes est effectuée avec succès");
									callback("true");
								
							});
						   });

				break;
				case DMS.Mobile.Constante.Synchronize.ArticleCommercial :  

						  DMS.Mobile.ArticleCommercialRequest.connexion = form.connexion;
						  DMS.Mobile.ArticleCommercialRequest.UpdateSynchArticleCommercial(function(){
								
								    alert("La synchronisation est effectuée avec succès");
									callback("true");
								
						   });

				break;
				case DMS.Mobile.Constante.Synchronize.PropositionCommande :  

						  DMS.Mobile.PropositionCommandeRequest.connexion = form.connexion;
						  DMS.Mobile.PropositionCommandeRequest.UpdateSynchPropCommade(function(){
								
								    alert("La synchronisation des paramétres de proposition est effectuées avec succès");
									callback("true");
								
						   });

				break;
					case DMS.Mobile.Constante.Synchronize.Facture :  

						  DMS.Mobile.FactureRequest.connexion = form.connexion;
						  DMS.Mobile.HistoriqueFactureRequest.connexion = form.connexion;
						  DMS.Mobile.FactureRequest.UpdateSynchFacture(function(){
						  DMS.Mobile.HistoriqueFactureRequest.UpdateSynchHistoFacture(function(){
								
								    alert("La synchronisation des factures est effectuée avec succès");
									callback("true");
								
							});
						   });

				break;
				case DMS.Mobile.Constante.Synchronize.Tournee :  

						  DMS.Mobile.TourneeRequest.connexion = form.connexion;
						  DMS.Mobile.MissionRequest.connexion = form.connexion;				  
		                  DMS.Mobile.TourneeRequest.UpdateSynchTournee(function(){
					      DMS.Mobile.MissionRequest.UpdateSynchMission(function(){

							    alert("La synchronisation des tournées est effectuée avec succès");
								callback("true");
							
						   });
						  });
				break;
		}
		
	},



}