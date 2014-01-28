if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.CommandeViewModel = {};

DMS.Mobile.CommandeViewModel = 
{
	
	connexion: null,
	Commande : null,
	LignesCommande : [],
	indexClient : null,
	indexPointVente : null,
	indexTest : null,
	
//	$popupContenuBasic : null,
	
	$btnSeDeconnecter : null,
	$EnvoyerCommande : null,
	$DateLivraisonSouhaite : null,
	$TotalTVA : null,
	$PrixTotalTTC : null,
	$PrixTotalHT : null,
	$footer: null,
	$Bloc1 : null,
	$Bloc2 : null,
	$Bloc3 : null,
	//$popupBasic : null,
	
	$selectClient : null,
	$selectPointVente : null,
	$client : null,
	$pointVente : null,
	$dtailsClient : null,
	$detailPointVente : null,
	$SelectPointVente : null,
	$ButtonDetail : null,
	$AnnulerCommande : null,


	Init : function()
	{
		//************* PopUp Detail article **************//
			var panelDetailArticle = $(''
	+'<div data-role="popup" id="popupBasic">'
    +'<div data-role="content" data-theme="d" class="ui-corner-bottom ui-content" id="popupContenuBasic">'
	+'</div></div>');
	
	$(panelDetailArticle).appendTo("body").trigger('create');
		
		//*************----------------------**************//
		
		
		this.GetFromSession();
		if(this.Commande != null)
		{
			this.LignesCommande = this.Commande.LignesCommande;
			
			if(this.Commande.DateLivraisonPrevue == null)
			{
			//	this.AddCommandePropose();
				this.indexTest = 2;
			}
			else
			{
			    this.indexTest = 1;
			}
			this.InitUpdateCommande();
	
			
			
			
		}
		else
		{
			//alert("new commande");
			this.Commande = new DMS.Mobile.Commande();
			this.InitNewCommande();
		}
		
		
	},
	
	GetFromSession : function(){
		
		var SessionCommande = sessionStorage.getItem("CommandeToModify");
		var SessionMission = sessionStorage.getItem("missionToStart");
		
		if( SessionCommande != null)
		{
		   this.Commande = JSON.parse(SessionCommande);
		}
		else
		{
			 this.Commande = null;
		}
		if (SessionCommande != null)
		{
	    	 var mission = 	JSON.parse(SessionCommande);
		}
		else
		{
			var mission = null;
		}
	//	if (mission != null){
			
			//this.indexClient =  mission.PointVenteID;
			//this.indexPointVente =  mission.PointVentes.ClientID;
			
			this.indexClient = sessionStorage.getItem("indexClient");
			this.indexPointVente = sessionStorage.getItem("indexPointVente");
			//alert("indexClient = "+this.indexClient);
			//alert("indexPointVente = "+this.indexPointVente);
	//	}
		//alert(this.Commande);
	},
	
	InitUpdateCommande : function()
	{
		var form = this;
		this.InitializeEvents(form);
		if(form.indexTest == 1)
		{
		var dateLL = this.Commande.DateLivraisonPrevue;
		var dd = DMS.Mobile.Common.DateInverseSpliting(dateLL);
		this.$DateLivraisonSouhaite.val(dd);
		}
		DMS.Mobile.FamilleRequest.connexion = this.connexion;
		DMS.Mobile.FamilleRequest.SelectAll(function(ListFamille){
			
			form.InitializeArticle(ListFamille,form);
		});
		
		
			DMS.Mobile.ClientRequest.connexion = form.connexion;
		    DMS.Mobile.ClientRequest.SelectAllClient(function(ListClient){
				//alert("after callback client");
			
					for(var i = 0; i<ListClient.length;i++)
					{
						for(var j = 0;j<ListClient[i].listPointVentes.length;j++)
						{
							if(ListClient[i].listPointVentes[j].PointVenteID == form.Commande.PointVenteID)
							{
								form.indexPointVente = j;
								form.indexClient = i;
								break;
							}
						}
						if(form.indexClient != null)
						{ 
						    break;
						}
						
					}
					form.InitializeClient(ListClient,form);
				
				
				});
	},
	
	getCurrentPositionFromGPS : function(form,callback,ListClient)
	{
		
		try
		{	
		
		//alert("get current position from gps");
          DMS.Mobile.PositionRequest.getCurrentPosition(function(position){	
		  //alert("Latitude = "+position.coords.latitude);
		  form.GetClient(position,form,callback,ListClient);
		  
	        },
			function(err)
			{
				DMS.Mobile.Common.errors(err,"gélocalisation");
				
				callback();
				
			});
		}
	    catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : GetPositionFromGPS in PoistionRequest",'alert','e'); 
			callback();
		}
	},
	
	
	GetClient : function(position,form,callback,ListClient)
	{
		var Conf = JSON.parse(sessionStorage.getItem("Configuration"));
		var Perimetre = Conf.Perimetre;
		
		var currentLat = position.coords.latitude;
		var currentlong = position.coords.longitude;
		var DistanceMin = Perimetre;
		
				for (var i =0; i<ListClient.length;i++)
				{
					for(var j = 0; j<ListClient[i].listPointVentes.length;j++)
					{
						var latPV = ListClient[i].listPointVentes[j].Latitude;
						var longPV = ListClient[i].listPointVentes[j].Longitude;
						
						
						if(DMS.Mobile.Common.calculDistanceKM(currentLat,currentlong,latPV,longPV)<Perimetre )
						 {
						   if (DMS.Mobile.Common.calculDistanceKM(currentLat,currentlong,latPV,longPV) < DistanceMin) 
							{
									DistanceMin = DMS.Mobile.Common.calculDistanceKM(currentLat,currentlong,latPV,longPV) ;
									form.indexClient = i;
									form.indexPointVente = j;
							}
						 }
					}
				}
				
	       callback();
		
	},
	
	
	InitNewCommande : function()
	{
		var form = this;
		this.InitializeEvents(form);
		
		DMS.Mobile.FamilleRequest.connexion = this.connexion;
		DMS.Mobile.FamilleRequest.SelectAll(function(ListFamille){
			
			form.InitializeArticle(ListFamille,form);
		
			
		});
		
	
		
	DMS.Mobile.ClientRequest.connexion = form.connexion;
		    DMS.Mobile.ClientRequest.SelectAllClient(function(ListClient){
				
			//	form.getCurrentPositionFromGPS(form,function(){
				//	alert("success callback");
					form.InitializeClient(ListClient,form);
				//	},ListClient);
				
				});
			
		
		
		
	},
	
		InitializeEvents : function(form)
		{

$(".menu_ListArticleRepture").click(function(){
    
	DMS.Mobile.Common.RedirectToArticleEnRepture();

});


		$(".menu_Synchronisation").click(function(){			 
				 
				  $(this).addClass('ui-disabled'); 
				  
				  DMS.Mobile.Common.connexion = form.connexion;
				  DMS.Mobile.Common.synchronizeAllData(function(){
					  
					  DMS.Mobile.Common.RedirectToCommande();
					  
					  });
				 
		});



            $(form.$btnSeDeconnecter).click(function(){


					 sessionStorage.removeItem("missionToStart");
					 sessionStorage.removeItem("CommandeToModify");
					 sessionStorage.removeItem("indexClient");
					 sessionStorage.removeItem("indexPointVente");
					 
				
					 sessionStorage.removeItem("ListClient");
					 sessionStorage.removeItem("ListMission");
					 sessionStorage.removeItem("ListPointVente");
					 
					 sessionStorage.removeItem("ListTournee");
					 sessionStorage.removeItem("indexClient");
					 sessionStorage.removeItem("indexPointVente");
					 sessionStorage.removeItem("userID");
					 
					 DMS.Mobile.Common.RedirectToLogin();
				
			});

		    $(form.$AnnulerCommande).click(function(){

					 sessionStorage.removeItem("missionToStart");
					 sessionStorage.removeItem("CommandeToModify");
					 sessionStorage.removeItem("indexClient");
					 sessionStorage.removeItem("indexPointVente");
			     //   parent.history.back();
			        DMS.Mobile.Common.RedirectToListeCommandes();
			 return false;
		    });

			
			$(form.$DateLivraisonSouhaite).change(function() {
		    	form.Commande.DateLivraisonPrevue =	$(form.$DateLivraisonSouhaite).val();				
			});
			
			
			$(form.$EnvoyerCommande).click(function() {
				// alert("click bouton");
				$(this).addClass('ui-disabled');
				 form.InitializeCommande(form);
				 });
				 
				 $(window).bind('beforeunload', function(){
					 
					 // window.sessionStorage.clear();
 
					// sessionStorage.removeItem("MissionID");
					 sessionStorage.removeItem("missionToStart");
					 sessionStorage.removeItem("CommandeToModify");
					 sessionStorage.removeItem("indexClient");
					 sessionStorage.removeItem("indexPointVente");
					 
					
			});
		},
		
	InitializeCommande : function(form)
	{
		try
		{
		//alert("initializeCommande");
		//alert("form = "+form);
		var listLigneCommande = form.LignesCommande;
		//alert("listlignecmd = "+listLigneCommande.length);
		 form.Commande.LignesCommande = listLigneCommande;
		 //alert("nb list commande = "+form.Commande.LignesCommande.length);
		//form.Commande.DateLivraisonPrevue = "01/01/2013";
		
		var dateFormat = $(form.$DateLivraisonSouhaite).val();
		
		 if ((dateFormat != null)&&(dateFormat != ""))
		 {
	        	form.Commande.DateLivraisonPrevue = DMS.Mobile.Common.DateSplitingFormat(dateFormat);
		 }
		 
		if (listLigneCommande.length == 0)
		{
			alert("Aucun article séléctionner");
			$(form.$EnvoyerCommande).removeClass('ui-disabled');
		}
		else if ((form.Commande.DateLivraisonPrevue == null)||(form.Commande.DateLivraisonPrevue == ""))
			 {
			    alert("Vous devez séléctionner la date de livraison souhaité");
				$(form.$EnvoyerCommande).removeClass('ui-disabled');	
				$(form.$ButtonDetail).trigger("click");
			 }
			 else if ((form.Commande.PointVentes == null)||(form.Commande.PointVentes == ""))
			 {
				 alert("Vous devez séléctionner une point de vente");
				 $(form.$EnvoyerCommande).removeClass('ui-disabled');
				 $(form.$ButtonDetail).trigger("click");	
			 }
			 else 
			 {
				//alert("commande");
				//<<--- update commande --->>
				 if (form.indexTest == 1)
				 {
					 //alert("modification");
					// alert("modification");
					form.Commande.EtatCommande = DMS.Mobile.Constante.EtatCommande.NonValidee;
					form.Commande.DateModification = DMS.Mobile.Common.currentDate();
					form.Commande.HeureModification  = DMS.Mobile.Common.currentHours();
					
					DMS.Mobile.CommandeRequest.connexion = form.connexion;
					DMS.Mobile.CommandeRequest.SelectCommandeNotSynchByID(form.Commande.CommandeID,function(commande){
						if(commande == null)
						{
							alert("Echec de modification : commande synchronisée");
						}
						else
						{
								DMS.Mobile.CommandeRequest.connexion = form.connexion;
					DMS.Mobile.CommandeRequest.UpdateCommande(function(listLigneCommande){
						     							 
							 alert("Commande modifiée");
							 //synchronisation
	                        DMS.Mobile.Common.RedirectToListeCommandes();
							
	                              },form.Commande);
						}
						});
					
				

				 }
				 
				 //<<--- ajout commande proposée-->> // form.indexTest == 2

				 //<<--- ajout d'un nouveau commande --->>
				 else
				 {
					//  alert("Ajout");
				
				 
				 // insertion commande dans la bd local
				 DMS.Mobile.CommandeRequest.connexion = form.connexion;
DMS.Mobile.CommandeRequest.SelectLastCommande(function(oCommande){
	
	//alert("last commande id = "+oCommande.CommandeID);
	//alert("nbr ligne cmd = "+ form.Commande.LignesCommande.length);
	var commercialID = sessionStorage.getItem("userID");  
	//alert(commercialID); 
	if (oCommande == null)
	{
		form.Commande.CommandeID = 1;
	}
	else
	{
	    form.Commande.CommandeID = oCommande.CommandeID+1;
	}
	form.Commande.EtatCommande = DMS.Mobile.Constante.EtatCommande.NonValidee;
		
	var dateCreation = DMS.Mobile.Common.currentDate();
	var heureCreation = DMS.Mobile.Common.currentHours();
		
 //   var dateCr = DMS.Mobile.Common.DateInverseSpliting(dateCreation);
//	var dateCreationTrie = dateCr+' '+heureCreation;
	
	form.Commande.DateCreation = dateCreation;
	form.Commande.HeureCreation  = heureCreation;
	//form.Commande.DateCreationTrie = dateCreationTrie;
	
	form.Commande.CommercialID = commercialID;
	DMS.Mobile.CommandeRequest.InsertCommande(function(listLigneCommande){
		          alert("Commande ajouté");
	
	
	// 2 cas : ajout commande a partir d'une mission 
	       //  ajout commande a partir de la bouton saisir commande
	 var SessionMission = 	sessionStorage.getItem("missionToStart");
	 
	 if( SessionMission != null)
	{	
	 //var idMission = sessionStorage.getItem("MissionID");
	var etat = DMS.Mobile.Constante.EtatMission.Cloturee;
	//alert("etat : "+etat);
	 DMS.Mobile.MissionRequest.connexion = form.connexion;
	 
	 var mission = 	JSON.parse(SessionMission);
	 var missionID = mission.MissionID;
	// alert("missionID = "+missionID);
				 DMS.Mobile.MissionRequest.UpdateMission(etat,missionID,function(){
					// alert("callback mission");
					// var mission = 	JSON.parse(sessionStorage.getItem("missionToStart"));
					 
					 DMS.Mobile.TourneeRequest.connexion = form.connexion;
					 DMS.Mobile.TourneeRequest.SelectTourneeByID(mission.TourneeID,function(tournee){
						 
						 var nbrMission = tournee.Missions.length;
						// alert("nbr mission");
						 var test = true;
						 for(var i = 0; i<nbrMission; i++)
						 {
							// alert(tournee.Missions[i].EtatMission);
							 if(tournee.Missions[i].EtatMission !=  DMS.Mobile.Constante.EtatMission.Cloturee)
							 {
								 test = false;
								 break;
							 }
						 }
						// alert("test = "+test);
						 if (test == true)
						 {
							// alert("update etat tournee");
							 // update etat tournee "CLOTUREE"
							 DMS.Mobile.TourneeRequest.connexion = form.connexion;
							 DMS.Mobile.TourneeRequest.UpdateTournee(DMS.Mobile.Constante.EtatTournee.Cloturee,mission.TourneeID,function(){
			//alert("redirection to list commande");
			
			          // test connexion au serveur, s'il y a accée serveur alors synchronisation
		             //synchronisation des commandes
	                                DMS.Mobile.Common.TestServer(function(AcceeServeur){
			
										if (AcceeServeur == true)
										{
												DMS.Mobile.SynchronizeRequest.connexion = form.connexion;
												DMS.Mobile.SynchronizeRequest.SynchronizeCommande(function()
														{  
																  DMS.Mobile.Common.RedirectToListeCommandes();	
														});
										}
										else
										{
											 DMS.Mobile.Common.RedirectToListeCommandes();	
										}
									
								   });
		                   	});
						 }
						 else
						 {
							 
							 // test connexion au serveur, s'il y a accée serveur alors synchronisation
		                     //synchronisation des commandes
							  	DMS.Mobile.Common.TestServer(function(AcceeServeur){
			
									if (AcceeServeur == true)
									{
											DMS.Mobile.SynchronizeRequest.connexion = form.connexion;
											DMS.Mobile.SynchronizeRequest.SynchronizeCommande(function(synchr)
													{  
															  DMS.Mobile.Common.RedirectToListeCommandes();	
													});
									}
									else
									{
										 DMS.Mobile.Common.RedirectToListeCommandes();	
									}
								
							   });
						 }
						  
						 
						 });
					 
					 
	                       
				 });
	                              
	}
	else
	{
		// test connexion au serveur, s'il y a accée serveur alors synchronisation
		//synchronisation des commandes
	
			  DMS.Mobile.Common.TestServer(function(AcceeServeur){
			
					if (AcceeServeur == true)
					{
					        DMS.Mobile.SynchronizeRequest.connexion = form.connexion;
							DMS.Mobile.SynchronizeRequest.SynchronizeCommande(function()
									{  
											  DMS.Mobile.Common.RedirectToListeCommandes();	
									});
					}
					else
					{
						 DMS.Mobile.Common.RedirectToListeCommandes();	
             		}
				
			   });
	
	
		
	}
								  
								  },form.Commande);
 });
				 }
				 
			 }
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InitializeCommande in CommandeViewModel",'alert','e');
		}
	},
	
	InitializeArticle : function (ListFamille,form)
	{
	//var html1 ="";
	//var html2 = "";
	//var html3 = "";
		var j = 0;
		for (var i = 0; i<ListFamille.length;i++)
		{
			
			///////////// style="color:#99F"
			
				j = j%3;
				if(ListFamille[i].ListArticles.length != 0)
				{
				var htmlFamille  = "";
				htmlFamille  += "<div class='famille' style='padding-top: 1px;padding-left: 2px;'>";
				for (var k =0; k<ListFamille[i].ListArticles.length;k++)
				{
					
				var html = "";
				    html += "<div class='ui-field-contain' >";
					html += "<div class='ui-grid-a'  style='min-height: 40px;'>";
					
					if (ListFamille[i].ListArticles[k].QuantiteDisponible>0)
					{
						if((ListFamille[i].ListArticles[k].Promotion) != null)
						{
						html += "<div class='ui-block-a detail_article' style='min-width: 162px;'><a  href='javascript:void(0);' style='color:#46CC5B' data-rel='popup'>"+ListFamille[i].ListArticles[k].Designation+"</a></div>";
						html += "<div class='ui-block-b' style='float:right; margin-right:1px; !important'><input  class='article ' type='number'  style='width:75px;'  name='name' id='article_"+ListFamille[i].ListArticles[k].ArticleID+"' value=''   /><input type='hidden' value='"+i+"'/> <input type='hidden' value='"+k+"'/> ";
						}
						else
						{
					html += "<div class='ui-block-a detail_article' style='min-width: 162px;'><a  data-rel='popup'>"+ListFamille[i].ListArticles[k].Designation+"</a></div>";
					html += "<div class='ui-block-b' style='float:right; margin-right:1px; !important'><input  class='article' type='number'  style='width:75px'  name='name' id='article_"+ListFamille[i].ListArticles[k].ArticleID+"' value=''  /><input type='hidden' value='"+i+"'/> <input type='hidden' value='"+k+"'/> ";
						}
					}
					else
					{
						html += "<div class='ui-block-a detail_article' style='min-width: 162px;'><a style='color:#F00' data-rel='popup'>"+ListFamille[i].ListArticles[k].Designation+"</a></div>";
						html += "<div class='ui-block-b' style='float:right; margin-right:1px; !important'><input  class='article ' type='number'  style='width:75px;'  name='name' id='article_"+ListFamille[i].ListArticles[k].ArticleID+"' value=''   /><input type='hidden' value='"+i+"'/> <input type='hidden' value='"+k+"'/> ";
					}
				//	data-clear-btn='true'
					
					html += "</div>";
					html += "</div>";
					htmlFamille += html;
					
					
				}
				
				htmlFamille += "</div>";
				
				switch (j){
						case 0 : 
						$(form.$Bloc1).append(htmlFamille)
						break;
						case 1 : 
						$(form.$Bloc2).append(htmlFamille);
						break;
						case 2 : 
						$(form.$Bloc3).append(htmlFamille);
						break;
						
						}
				j++;
				}
		}
	
	
		
		//$("#CrudCommande").trigger('pagecreate');
		// en cas de modification
		form.addColorToFamille(form);
		form.fillQuantityToArticle(form);
		form.addEventToSelectArticle(form,ListFamille);
		form.addEventToClickArticle(form,ListFamille);
		
	},
	
	
	addColorToFamille : function (form)
	{
		$(form.$Bloc1).css("margin","0px 0px 0px 0px");
		$(form.$Bloc1).find(".famille:odd").css("background-color","rgb(240, 244, 255) ");
		$(form.$Bloc1).find(".famille:even").css("background-color","rgb(241, 241, 241) ");
		$(form.$Bloc1).find(".famille:odd").css("border-radius","5px");
		$(form.$Bloc1).find(".famille:even").css("border-radius","5px");
		
		$(form.$Bloc2).css("margin","0px 0px 0px 0px");
		$(form.$Bloc2).find(".famille:even").css("background-color","rgb(234, 248, 250)");
		$(form.$Bloc2).find(".famille:even").css("border-radius","5px");
		$(form.$Bloc2).find(".famille:odd").css("background-color","rgb(220, 245, 248)");
		$(form.$Bloc2).find(".famille:odd").css("border-radius","5px");
		
		$(form.$Bloc3).css("margin","0px 0px 0px 0px");
		$(form.$Bloc3).find(".famille:odd").css("background-color","rgb(240, 244, 255) ");
		$(form.$Bloc3).find(".famille:odd").css("border-radius","5px");
		$(form.$Bloc3).find(".famille:even").css("background-color","rgb(241, 241, 241) ");
		$(form.$Bloc3).find(".famille:even").css("border-radius","5px");
	},
	
	// en cas de modification
	fillQuantityToArticle : function(form)
	{
		for(var i = 0;i<form.LignesCommande.length; i++)
	    {
			$("#article_"+form.LignesCommande[i].ArticleID).val(form.LignesCommande[i].Quantite);
		}
		form.CalculTotalCommande(form);	
	},
	
	
	addEventToClickArticle : function(form,ListFamille)
	{
		
	//	$(".detail_article").each(function(index, element) {
			//alert("element "+$(element));

             $(".detail_article").click(function(){
				//alert("click element");
				 $("#popupBasic").popup();
				var familleIndex = $(this).parent().find('input[type=hidden]:eq(0)').val();
		        var articleIndex = $(this).parent().find('input[type=hidden]:eq(1)').val();
				//alert(familleIndex + "///////" +articleIndex );
				var article = ListFamille[familleIndex].ListArticles[articleIndex];
				$("#popupContenuBasic").html(''
				           +'<h4 style="margin-bottom: 16px;"> Détails article </h4>'
                           +'<ul  data-role="listview" data-inset="false">'
                           +'<li style="text-align:center;"><p class="parag">' 
                           +'<br/>Desingation : '+article.Designation
                           +'<br/>CAB : '+article.CAB
						   +'<br/>Prix Unitaire HT : '+article.PrixUnitaireHT
						   +'<br/>Prix Unitaire TTC : '+article.PrixUnitaireTTC
						   +'<br/>Quantité Disponible : '+article.QuantiteDisponible
						   +'<br/>Imange : '
						   +'<br/> <a href="#" id="Close-PopUp" data-role="button" data-theme="b" >Fermer</a>'
                           +'</li>'
                           +'</ul>');
						    
						   

				  
					$("#popupBasic").popup("open");	
					alert(5555);
				
			/*	$( "#popupBasic" ).popup({
  create: function( event, ui ) {
	   $("#popupBasic").popup();
					$("#popupBasic").popup("open");	
	  }
	  //$("#popupBasic").popup().trigger("create").popup("open");
});*/
				//form.addEventToClickClose(form);
				//$('#popupBasic').trigger('create');
					
            
			   });
     //   });
	},
	
	addEventToClickClose : function(form)
	{
		$("#Close-PopUp").click(function(){
		//	  var html = "";
		//	  $(form.$popupContenuBasic).html(html);
		//	  $('#popupBasic').trigger('create');
			  $('#popupBasic').popup("close");	
			  
			});
	},
	
	addEventToSelectArticle : function(form,ListFamille)
	{
		$(".article").each(function(index, element) {
            $(element).change(function(){
				//alert("article click");
				form.UpdateCommandedArticle(element,form,ListFamille);
				form.CalculTotalCommande(form);
			});
        });
	},
	
	
	
	InitializeClient:function(ListClient,form)
	{ 
	//alert("InitializeClient");
		try
		{
		var html = "";
		//<option value="standard">Standard: 7 day</option>
		for (var i = 0; i<ListClient.length;i++)
		{
			html += "<li> <label> "+ListClient[i].NomSociete+" </label><input type='hidden' value='"+ i +"' /> </li>";
			
			
			//alert("ListClient[i].ClientID "+ ListClient[i].ClientID);
		}
		
		$(form.$selectClient).html(html).listview("refresh");
		$("#CrudCommande").trigger('pagecreate');
		
		form.addEventToSelectClient(form,ListClient);
		
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : InitializeClient in ListCommandeViewModel",'alert','e'); 
			}
	},
	
	addEventToSelectClient : function (form,ListClient)
	{
		//alert("addEventToSelectClient");
		$(form.$selectClient).children("li").each(function(index, element) {
            $(element).click(function(){
				var ClientIndex = $(this).children("input:eq(0)").val();
				$(form.$client).find(".ui-btn-text:eq(0)").text(ListClient[ClientIndex].NomSociete);
				$(form.$client).trigger("click");
				$(form.$pointVente).find(".ui-btn-text:eq(0)").text("Point de vente");
				$(form.$SelectPointVente).removeClass("ui-disabled");
				
				form.InitializeDetailsClient(form,ListClient[ClientIndex]);
				form.InitializePointVente(form,ListClient[ClientIndex].listPointVentes);
			});
			
			if(index == form.indexClient)
			{
				//alert("click list client");
				$(element).trigger("click");
				$(form.$client).trigger("click");
		      	form.indexClient = null;
			}
    });
	
	},
	
	InitializeDetailsClient : function(form,oClient)
	{
		var html = "<h4> Details client : </h4>";
		    html += "<div data-role='fieldcontain'>";
            html += "<label for='name'><strong>Nom du societé : </strong></label>";
            html += "<label for='name'>"+oClient.NomSociete+"</label>";
			html += "</div>";
			html += "<div data-role='fieldcontain'>";
			html += "<label for='name'><strong>Nom du résponsable : </strong></label>";
            html += "<label for='name'>"+oClient.NomResponsable+"</label>";
			html += "</div>";
			html += "<div data-role='fieldcontain'>";
			html += "<label for='name'><strong>Téléphone : </strong></label>";
            html += "<label for='name'>"+oClient.Tel+"</label>";
			html += "</div>";

      $(form.$dtailsClient).html(html);
	   $(form.$detailPointVente).html("");
	},
	
	InitializePointVente : function (form,listPointVente)
	{
		try
		{
				var html = "";
		
				for (var i = 0; i<listPointVente.length;i++)
				{
					html += "<li> <label> "+listPointVente[i].Adresse+" </label><input type='hidden' value='"+ i +"' /> </li>";
				}
				
				$(form.$selectPointVente).html(html).listview("refresh");
				
				
				form.addEventToSelectPointVente(form,listPointVente);
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InitializeClient in ListCommandeViewModel",'alert','e'); 
		}
	},
	
	addEventToSelectPointVente : function (form,listPointVente)
	{
		$(form.$selectPointVente).children("li").each(function(index, element) {
            $(element).click(function(){
				
				var PointVenteIndex = $(this).children("input:eq(0)").val();
				$(form.$pointVente).find(".ui-btn-text:eq(0)").text(listPointVente[PointVenteIndex].Adresse);
				$(form.$pointVente).trigger("click");
				form.Commande.PointVentes = listPointVente[PointVenteIndex];
				form.Commande.PointVenteID = listPointVente[PointVenteIndex].PointVenteID;
				form.InitializeDetailsPointVente(form,listPointVente[PointVenteIndex]);
			});
			
			if(index == form.indexPointVente)
			{
				$(element).trigger("click");
				$(form.$pointVente).trigger("click");
		      	form.indexPointVente = null;
			}
    	});
	},
	
	InitializeDetailsPointVente : function (form,oPointVente)
	{
		var html = "<h4> Details point vente : </h4>";
		    html += "<div data-role='fieldcontain'>";
            html += "<label for='name'><strong>Adresse : </strong></label>";
            html += "<label for='name'>"+oPointVente.Adresse+"</label>";
			html += "</div>";
			html += "<div data-role='fieldcontain'>";
			html += "<label for='name'><strong>Nom du résponsable : </strong></label>";
            html += "<label for='name'>"+oPointVente.Responsable+"</label>";
			html += "</div>";
			html += "<div data-role='fieldcontain'>";
			html += "<label for='name'><strong>Téléphone : </strong></label>";
            html += "<label for='name'>"+oPointVente.Tel+"</label>";
			html += "</div>";

      $(form.$detailPointVente).html(html);
	},
	
	UpdateCommandedArticle :function (element,form,ListFamille)
	{
		//alert("updateCommandeArticle");
		try
		{
		
		var familleIndex = $(element).parent().parent().find('input[type=hidden]:eq(0)').val();
		var articleIndex = $(element).parent().parent().find('input[type=hidden]:eq(1)').val();
		//alert("familleIndex " + familleIndex);
		//alert("articleIndex " + articleIndex);
		
		//alert("UpdateCommandedArticle " + articleID);
		var quantite = $.trim($(element).val());
		//alert("quantite " + quantite);
		var articleID = ListFamille[familleIndex].ListArticles[articleIndex].ArticleID;
		var PrixunitaireHT = ListFamille[familleIndex].ListArticles[articleIndex].PrixUnitaireHT;
		var PrixunitaireTTC = ListFamille[familleIndex].ListArticles[articleIndex].PrixUnitaireTTC;
		//alert("PrixunitaireHT " + PrixunitaireHT);
		//alert("PrixunitaireTTC " + PrixunitaireTTC);
		if (quantite != "" && quantite != 0){
			quantite = parseInt(quantite);
		}
		else
		{
			quantite = 0;
		}
		
		//alert("articleID = " + articleID);
		var index = -1;
		
		for(var i = 0;i<form.LignesCommande.length;i++)
		{
			//alert("Article ID 1 "+form.LignesCommande[i].ArticleID);
			//alert("Article ID 2 "+articleID);

			
			if(form.LignesCommande[i].ArticleID == articleID)
			{
				
				index = i;
				//alert("index in if"+index);
				break;
			}
			
		}
		
		if (index==-1)
		
		{
			//alert("index 1 is "+index);
			if (quantite != 0)
			{
				var ligneCommande = new DMS.Mobile.LigneCommande();
				

				ligneCommande.Quantite = quantite;
				ligneCommande.PrixTotalArticleTTC = (PrixunitaireTTC * quantite).toFixed(3)
				ligneCommande.PrixTotalArticleHT = (PrixunitaireHT * quantite).toFixed(3)
				ligneCommande.PrixTotalArticleTTC  = parseFloat(ligneCommande.PrixTotalArticleTTC);
				ligneCommande.PrixTotalArticleHT  = parseFloat(ligneCommande.PrixTotalArticleHT);
				ligneCommande.ArticleID = articleID;
				form.LignesCommande.push(ligneCommande);
				//alert("form.ListLigneCommande"+form.LignesCommande.length);
			}
		}
		else 
		{
			//alert("index 2 is "+index);
			if (quantite != 0)
			{
				var ligneCommande = new DMS.Mobile.LigneCommande();

				
				ligneCommande.Quantite = quantite;
				ligneCommande.PrixTotalArticleTTC = (PrixunitaireTTC * quantite).toFixed(3);
				ligneCommande.PrixTotalArticleHT = (PrixunitaireHT * quantite).toFixed(3);
				ligneCommande.PrixTotalArticleTTC  = parseFloat(ligneCommande.PrixTotalArticleTTC);
				ligneCommande.PrixTotalArticleHT  = parseFloat(ligneCommande.PrixTotalArticleHT);
				ligneCommande.ArticleID = articleID;
				form.LignesCommande[index]= ligneCommande;
			}
			else
			{
				form.LignesCommande.splice(index,1);
			}
			
		}
		
		//alert("Form.Commande.ListLignesCommande "+ form.Commande.ListLignesCommande);
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateCommandeArticle in CommandeViewModel",'alert','e'); 
			}
	},
	
	CalculTotalCommande : function (form)
	{
		try
		{
		var totalHT = 0;
		var totalTTC = 0;
		var totalTVA = 0;
		
		for(var i = 0 ; i<form.LignesCommande.length ;i++)
		{
			totalHT += form.LignesCommande[i].PrixTotalArticleHT;
			totalTTC += form.LignesCommande[i].PrixTotalArticleTTC;
			
			

			//alert("totalTTC"+totalTTC);
		}
		
		 
		 totalHT = totalHT.toFixed(3);
		 totalTTC = totalTTC.toFixed(3);
		 totalTVA =  totalTTC - totalHT ;
		 totalTVA  = totalTVA.toFixed(3);
		 form.Commande.PrixTotalHT = totalHT;
		// alert("formCommandePrixHT : "+form.Commande.PrixTotalHT);
		 form.Commande.PrixTotalTTC = totalTTC;
		 form.Commande.TotalTVA = totalTVA;
		 
		
		 
		 form.$PrixTotalHT.text(totalHT+" DT");
		 form.$PrixTotalTTC.text(totalTTC+" DT");
		 form.$TotalTVA.text(totalTVA+" DT");
	}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : calculTotalCommande in CommandeViewModel",'alert','e'); 
			}
	},
	
}