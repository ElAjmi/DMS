if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Login = {};

DMS.Mobile.Login = 
{
	$ValidateButton: null,
    $CancelButton: null,
    $login:null,
    $password:null,
	
    connexion: null,
	Personnel: null,
	PersonnelLogin: null,
	canvasLoader : null,
	myService : null,

    Initialise: function () {
	try
	{	
	this.InitialiseEvents();
		//this.myService = cordova.require('cordova/plugin/myService');
		//sessionStorage.setItem("service",this.myService);
       DMS.Mobile.GammeRequest.connexion = this.connexion;
	   DMS.Mobile.FamilleRequest.connexion = this.connexion;
	   DMS.Mobile.ArticleRequest.connexion = this.connexion;
	   DMS.Mobile.ProfilRequest.connexion = this.connexion;
	   DMS.Mobile.TypeMissionRequest.connexion = this.connexion;
	   DMS.Mobile.CommandeRequest.connexion = this.connexion;
	   DMS.Mobile.TourneeRequest.connexion = this.connexion;
	   DMS.Mobile.MissionRequest.connexion = this.connexion;
       DMS.Mobile.PointVenteRequest.connexion = this.connexion;
	   DMS.Mobile.ClientRequest.connexion = this.connexion;
	   DMS.Mobile.LigneCommandeRequest.connexion = this.connexion;
	   DMS.Mobile.ZoneRequest.connexion = this.connexion;
	   DMS.Mobile.VilleRequest.connexion = this.connexion;
	   DMS.Mobile.ActiviteRequest.connexion = this.connexion;
	   DMS.Mobile.PositionRequest.connexion = this.connexion;
	   DMS.Mobile.ConfigurationRequest.connexion = this.connexion;
	   DMS.Mobile.TourneePointVenteRequest.connexion = this.connexion;
	   DMS.Mobile.PictureRequest.connexion = this.connexion;
	   DMS.Mobile.FactureRequest.connexion = this.connexion;
	   DMS.Mobile.ReclamationRequest.connexion = this.connexion;
	   DMS.Mobile.PromotionRequest.connexion = this.connexion;
		DMS.Mobile.LivraisonRequest.connexion = this.connexion;
		DMS.Mobile.PromotionArticleRequest.connexion = this.connexion;
		DMS.Mobile.ArticleCommercialRequest.connexion = this.connexion;

	   
	   
	   
	   DMS.Mobile.PersonnelRequest.connexion = this.connexion;
       
	   	}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : Initialise in LoginViewModel",'alert','e'); 
			}
    },
	
	InitialiseEvents: function () {
		try
		{
		var form = this;
		   this.$ValidateButton.click(function(){
			$(this).addClass('ui-disabled');
			   //alert"button");
				form.ValidateLogin();
				if(form.canvasLoader == null)
				{
				DMS.Mobile.Common.DrawLoading(function(){
					form.canvasLoader.show();
					});
				}
				else
				{
					form.canvasLoader.show();
				}
				
				
			form.$CancelButton.click(function(){
				
				DMS.Mobile.Common.RedirectToLogin();
				
				});
			
			
			});
				}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : InitiliseEvents in LoginViewModel",'alert','e'); 
			}
       
    },
	
	
	ValidateLogin:function(){
		try
		{
	
		//alert"validateLogin");
	    var form = this;
		DMS.Mobile.Common.ChangeInformationLabel("Authentification de l'utilisateur ...");
		DMS.Mobile.PersonnelRequest.VerifyPersonnelInLocalSession($(this.$login).val(), $(this.$password).val(),function(personnel){form.fonction1(personnel,form);});
		
		//DMS.Mobile.PersonnelRequest.GetPersonnelFromServer($(this.$login).val(), $(this.$password).val(),function(personnel){form.fonction2(personnel,form);});	
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : ValidateLogin in LoginViewModel",'alert','e'); 
			}
		},
		
		
		fonction1 : function(personnel,form)
		{
			//alert("fonction1");
		  try
		  {
			if ( personnel == null)
			{
			  DMS.Mobile.Common.TestServer(function(AcceeServeur){
			
					if (AcceeServeur == true)
					{
					  //alert("accee serveur");
						DMS.Mobile.PersonnelRequest.GetPersonnelFromServer($(form.$login).val(), $(form.$password).val(),function(personnel){form.fonction2(personnel,form);});
		
					}
					else
					{
						
             		   form.$ValidateButton.removeClass('ui-disabled');
			        	form.canvasLoader.hide();
						alert("Connexion serveur echouée");
					}
				
			   });
			
			}
			else
			{				
			//alert("accees local");

		/*	var ServiceConfig  = { 
 								"PersonnelID" : personnel.PersonnelID 
 							}; 
				form.myService.startService(
											function(r){
												form.myService.setConfiguration(	ServiceConfig,
													function(r){
														form.myService.enableTimer(60000,	
															function(r){alert("service demarr\351");},
															function(e){DMS.Mobile.Notification.ShowMessage(e+" : enableTimer",'alert','e');});
														},
													function(e){DMS.Mobile.Notification.ShowMessage(e+" : fonction1 in setConfiguration",'alert','e');});
												},
											function(e){DMS.Mobile.Notification.ShowMessage(e+" : fonction1 in  startService",'alert','e');});*/
											
			var listPointVente = [];
			var listMissions = [];
			var listClient = [];
			var listTournee = [];
			
			
				
				sessionStorage.setItem("userID", JSON.stringify(personnel.PersonnelID));

				DMS.Mobile.ConfigurationRequest.SelectConfiguration(function(configuration){
					//alert("after config");
					
					
					
					///////////////////////////////////////////////////////////////
					////                                                       ////      
					////          chaque list a part : faux                    ////
					////                                                       ////
					///////////////////////////////////////////////////////////////
					
					
				DMS.Mobile.TourneeRequest.SelectAll(function(ListTournee){
					listTournee = ListTournee;
				
				//alert("listTournee length = "+ListTournee.length);
				//alert("pv 0 = "+ListTournee[0].ListPointVentes.length);

				
					if (listTournee.length>0)
					{
						for(var i = 0; i<listTournee.length;i++)
						{
							for(var k = 0; k<listTournee[i].ListPointVentes.length;k++)
							{
						    	listPointVente.push(listTournee[i].ListPointVentes[k]);
							}
						}

						if(listPointVente.length>0)
						{
							for(var j = 0;j<listPointVente.length;j++)
							{
								var nbrMission = null;
								    nbrMission = listPointVente[j].ListMissions.length;
								if(nbrMission>0)
								{
									for(var n = 0; n<nbrMission;n++)
									{
								       listMissions.push(listPointVente[j].ListMissions[n]);
									}
								}
							}
							

                            for(var m = 0; m<listPointVente.length; m++)
							{

									listClient.push(listPointVente[m].Client);
							}
						 }
						
				       	

						  sessionStorage.setItem("ListPointVente", JSON.stringify(listPointVente));
						  sessionStorage.setItem("ListMission", JSON.stringify(listMissions));
						  sessionStorage.setItem("ListClient", JSON.stringify(listClient));
						  sessionStorage.setItem("ListTournee", JSON.stringify(listTournee));
                          localStorage.setItem("Configuration", JSON.stringify(configuration));

						DMS.Mobile.Common.RedirectToCalendrier();

					}
					else 
					{
						DMS.Mobile.Common.RedirectToCalendrier();
					}
					
					});
				});
				
			}
	}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : fonction1 in LoginViewModel",'alert','e'); 
			}
		},
		
		fonction2 : function(personnel,form)
		{
			//alert("fonction2");
			try
			{
			if ( personnel == null)
			{
				form.$ValidateButton.removeClass('ui-disabled');
			    	form.canvasLoader.hide();
				alert("login et/ou mot de passe incorrecte");
			}
			else
			{
				//alert"accees serveur");
				
		/*	var ServiceConfig  = { 
 								"PersonnelID" : personnel.PersonnelID 
 							}; 
				form.myService.startService(
											function(r){
												form.myService.enableTimer(	60000,
													function(r){
														form.myService.setConfiguration(ServiceConfig,	
															function(r){alert("service demarré");},
															function(e){DMS.Mobile.Notification.ShowMessage(e+" : setConfiguration",'alert','e');});
														},
													function(e){DMS.Mobile.Notification.ShowMessage(e+" : fonction1 in enableTimer",'alert','e');});
												},
											function(e){DMS.Mobile.Notification.ShowMessage(e+" : fonction1 in  startService",'alert','e');});*/
			 var synch = "true";
			 
			 sessionStorage.setItem("userID", JSON.stringify(personnel.PersonnelID));
			// sessionStorage.setItem("accee", JSON.stringify(0));
	
			DMS.Mobile.Common.ChangeInformationLabel("chargement des données à partir de serveur ...");
			DMS.Mobile.PropositionCommandeRequest.connexion = form.connexion,
			DMS.Mobile.PropositionCommandeRequest.insertProposition(function(){
			
			
			
			
		     DMS.Mobile.ConfigurationRequest.GetConfigurationFromServer(function(configuration){
				 DMS.Mobile.PictureRequest.GetListPictureFamilleFromServer(function(listPictureFamille){
		    //DMS.Mobile.PictureRequest.GetListPictureArticleFromServer(function(listPictureArticle){
				//lert("listPicture =" + listPictureArticle.length);
			//DMS.Mobile.PictureRequest.GetListPicturePointVenteFromServer(function(listPicturePointVente){
				//alert("listPicture =" + listPicturePointVente.length);
			//DMS.Mobile.PictureRequest.GetListPictureClientFromServer(function(listPictureClient){
				//alert("listPicture =" + listPictureClient.length);
				
				
			 DMS.Mobile.PromotionArticleRequest.SelectAllPromotionArticleFromServer(function(lisPromotionArticle){
	
			 DMS.Mobile.PromotionRequest.GetListPromotionFromServer(function(listPromotion){	
			 DMS.Mobile.GammeRequest.GetListGammeFromServer(function(listGamme){
				 
			 DMS.Mobile.FamilleRequest.GetListFamilleFromServer(function(listFamille){
			 DMS.Mobile.ArticleRequest.GetListArticleFromServer(function(listArticle){
			 DMS.Mobile.ProfilRequest.GetListProfilFromServer(function(listProfil){
			 DMS.Mobile.TypeMissionRequest.GetListTypeMissionFromServer(function(listTypeMission){	 
			 DMS.Mobile.CommandeRequest.SelectCommandeByPersonnalFromServer(function(listCommande){	
			 DMS.Mobile.LigneCommandeRequest.SelectLigneCommandeByPersonnelFromServer(function(listLigneCommande){	
			 DMS.Mobile.TourneeRequest.SelectTourneeByPersonnalFromServer(function(listTournee){		
			 DMS.Mobile.MissionRequest.SelectMissionByPersonnelFromServer(function(Missions){	
			 DMS.Mobile.ZoneRequest.SelectZoneByPersonnelFromServer(function(zone){	
			 DMS.Mobile.VilleRequest.SelectVilleByPersonnelFromServer(function(listVille){	
			 DMS.Mobile.PointVenteRequest.SelectPointVenteByPersonnelFromServer(function(listPointVente){	
			 DMS.Mobile.ClientRequest.SelectClientByPersonnelFromServer(function(listClient){
				 //alert("client");
			 DMS.Mobile.TourneePointVenteRequest.SelectAllTournePointVenteFromServer(function(listTourneePointVente){	 
			 DMS.Mobile.ActiviteRequest.SelectActiviteByPersonnelFromServer(function(listActivite){
			 DMS.Mobile.FactureRequest.SelectFactureByPersonnelFromServer(function(listFacture){
			DMS.Mobile.ReclamationRequest.SelectReclamationByPersonnelFromServer(function(listReclamation){
			DMS.Mobile.PromotionRequest.GetListFidelisationFromServer(function(listFidelisation){
			 DMS.Mobile.PromotionArticleRequest.SelectAllFidelisationArticleFromServer(function(listFidelisationArticle){
			DMS.Mobile.LivraisonRequest.SelectLivraisonByPersonnelFromServer(function(listLivraison){
			DMS.Mobile.ArticleCommercialRequest.SelectArticleCommercialByPersonnelFromServer(function(listArticleCommercial){ 
			DMS.Mobile.PropositionCommandeRequest.SelectPropositionCommandeByIDFromServer(function(){
			                      //alert("redirection");
								  sessionStorage.setItem("ListPointVente", JSON.stringify(listPointVente));
								  sessionStorage.setItem("ListMission", JSON.stringify(Missions));
								  sessionStorage.setItem("ListClient", JSON.stringify(listClient));
								  sessionStorage.setItem("ListTournee", JSON.stringify(listTournee));
								  localStorage.setItem("Configuration", JSON.stringify(configuration));
								 DMS.Mobile.Common.RedirectToCalendrier();
								// DMS.Mobile.Common.RedirectToCommande();
						//DMS.Mobile.PositionRequest.InitializeGetPosition();

             },personnel.PersonnelID);
			 },personnel.PersonnelID);	
			 },personnel.PersonnelID);	
			 },personnel.PersonnelID);	
			 },personnel.PersonnelID);	 	
			 },personnel.PersonnelID);	 
			 },personnel.PersonnelID);
			 },personnel.PersonnelID);	 
			 },personnel.PersonnelID);	 
			 },personnel.PersonnelID);
			 },personnel.PersonnelID);	 
			 },personnel.PersonnelID);			
			 },personnel.PersonnelID);				
			 },personnel.PersonnelID);		 
			 },personnel.PersonnelID);		 
			 },personnel.PersonnelID);
			 },personnel.PersonnelID);
			 });
			 });
			 });
		     });
			 });
			 });
			 });
		     });
		  //   });
			 //});
			 //});
			 });
			  
		
		
		
			});
		
		
			}
					
		/*	 DMS.Mobile.MissionRequest.SelectMissionByPersonnelFromServer(function(Missions){
			 DMS.Mobile.PointVenteRequest.SelectPointVenteByPersonnelFromServer(function(listPointVente){
			 DMS.Mobile.ClientRequest.SelectClientByPersonnelFromServer(function(listClient){
			
			 
			                      alert("redirection");
								  sessionStorage.setItem("ListPointVente", JSON.stringify(listPointVente));
								  sessionStorage.setItem("ListMission", JSON.stringify(Missions));
								  sessionStorage.setItem("ListClient", JSON.stringify(listClient));
								//  DMS.Mobile.Common.RedirectToCalendrier();
								alert("verifyIntoPointVente");
								DMS.Mobile.PositionRequest.VerifyIntoPointVente();
				 
			 },personnel.PersonnelID);	 
			 },personnel.PersonnelID);	 
			 },personnel.PersonnelID);
					
			  
		
			}*/
				}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : fonction2 in LoginViewModel",'alert','e'); 
			}
		},
		
	
}