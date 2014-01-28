if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.ListeCommandesViewModel = {};

DMS.Mobile.ListeCommandesViewModel = 
{
	connexion : null,
	ListeCommandes : [],
	$TableListeCommandes : null,
	$TableLigneCommandes : null,
	$synchroCmdBtn : null,
	$modifBTN : null,
	$btnSeDeconnecter  : null,
	
	
	
	
	Init: function (form) {
	try
	{	
		var form = this ;
		
		DMS.Mobile.CommandeRequest.connexion = form.connexion;
		DMS.Mobile.CommandeRequest.SelectAll(function(CommandeList){
		form.initialize(CommandeList,form);
				
			});
		
		}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : Init in ListCommandeViewModel",'alert','e'); 
			}
	},
	
	initialize : function(CommandeList,form){
		try
		{
		form.ListeCommandes = CommandeList;
		form.insertCommandes(CommandeList,form);
		form.initializeEvents(CommandeList,form);
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : initialize in ListCommandeViewModel",'alert','e'); 
			}
	},
	
	initializeEvents : function(CommandeList,form){
	try
	{
		$(form.$btnSeDeconnecter).click(function(){
			
				 	 sessionStorage.removeItem("CommandeToModify");
					// sessionStorage.removeItem("MissionID");
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
		
		// panel pv click
		$(document).on('click','.ToPointVente',function(e) { 
			 var idCommande = $(this).attr("id");
			 form.insertDetailsCommande(CommandeList,form,idCommande);
			 $('#popupDialogPV').popup();
   			 $('#popupDialogPV').popup('open');
		});
		//panel article click
		$(document).on('click','.ToArticle',function(e) { 
			 var IdArticle = $(this).attr("id");
			form.insertArticle(CommandeList,form,IdArticle);
			 $('#popupDialogArticle').popup();
			 $('#popupDialogArticle').css({position:'fixed',left:'15%',right:'15%',top:'25%'});
   			 $('#popupDialogArticle').popup('open');
		});
		// lc button click
		$(document).on('click','.ToLigneCommande',function(e) { 
		 var idCommande = $(this).attr("id");
		 sessionStorage.removeItem("CommandeToModify");
		 form.insertLigneCommandes(CommandeList,form,idCommande);
		 
		  $.mobile.changePage('#ligneCommande');  
		});
		
		// btn synchroniser
		$(form.$synchroCmdBtn).click(function(e){
		  //alert("synchronisation des listes des commandes ");
		  
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
										 alert("Pas d'accès serveur !!!");	
									}
								
					 });
		 
		
		});
		
		
		$(".menu_ListArticleRepture").click(function(){
			
			DMS.Mobile.Common.RedirectToArticleEnRepture();
			});
			
		$(".menu_Synchronisation").click(function(){
			
			$(this).addClass('ui-disabled'); 
				  
				  DMS.Mobile.Common.connexion = form.connexion;
				  DMS.Mobile.Common.synchronizeAllData(function(){
					  
					  DMS.Mobile.Common.RedirectToListeCommandes();
				  });
			
			});
		
		
		
		// btn modifier
		$(form.$modifBTN).click(function(e) { 
		 
		 	DMS.Mobile.Common.RedirectToCommande();
		});
		
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : initializeEvents in ListCommandeViewModel",'alert','e'); 
			}
	},
	
/*	synchronizeServer : function(form,jsonText,callback)
	{
		try
		{
			//alert("synchronize server");
		var Conf = JSON.parse(localStorage.getItem("Configuration"));
		
		var Data = "jsonText="+jsonText; 	  
		var methode= "SynchronizeServer?";
		var URL = Conf.URL+methode+Data;
	    //var URL = "http://http://localhost:1307/Service1.svc/"+methode+Data;
	    DMS.Mobile.Common.CallService(function(JsonObject,Form){form.ReponseService(JsonObject,Form,callback);},URL,form);
		
		}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : synchronizeServer in ListeCommandeViewModel",'alert','e'); 
			}
	},
	
	ReponseService : function(json,form,callback)
	{
		try
		{
			//alert("reponseJson : "+json);
		if ( json != null)
		{
			//alert("json = "+json);
			callback(json);
		}
		else
		{
			callback("false");
		}
		}
		catch(err)
		{DMS.Mobile.Notification.ShowMessage(err.message+" : ReponseService in ListeCommandeViewModel",'alert','e'); }
			
	},
	
	ChangeSynch : function(form)
	{
		//alert("changeSynch");
	//	DMS.Mobile.PositionRequest.connexion = form.connexion;
		  DMS.Mobile.CommandeRequest.connexion = form.connexion;
		  DMS.Mobile.TourneeRequest.connexion = form.connexion;
		  DMS.Mobile.LigneCommandeRequest.connexion = form.connexion;
		  DMS.Mobile.MissionRequest.connexion = form.connexion;
		  
		 //alert("UpdatesynchPosition");
	//	DMS.Mobile.PositionRequest.UpdateSynchPosition(function(){
			 //alert("UpdateSynchTournee");
			DMS.Mobile.TourneeRequest.UpdateSynchTournee(function(){
				 //alert("UpdateSynchMission");
				DMS.Mobile.MissionRequest.UpdateSynchMission(function(){
					 //alert("UpdateSynchCommande");
					DMS.Mobile.CommandeRequest.UpdateSynchCommande(function(){
						 //alert("UpdateSynchLigneCommande");
						DMS.Mobile.LigneCommandeRequest.UpdateSynchLigneCommande(function(){
							
							alert("La synchronisation est effectuée avec succès");
							
							});
						});
					});
				});
		//	});
	},
	*/
	insertCommandes : function(CommandeList,form){
		try
		{
	var panelPV = $(""
	+"<div data-role='popup' id='popupDialogPV' data-overlay-theme='a' data-theme='c' class='ui-corner-all'>"
    +"<div data-role='content' data-theme='d' class='ui-corner-bottom ui-content' id='popupContenuPV'>"
    +"</div></div>");
	
	var panelArticle = $(""
	+"<div data-role='popup' id='popupDialogArticle' data-overlay-theme='a' data-theme='c' class='ui-corner-all'>"
    +"<div data-role='content' data-theme='d' class='ui-corner-bottom ui-content' id='popupContenuArticle'>"
    +"</div></div>");

	
	$(panelPV).appendTo("body").trigger('create');
	$(panelArticle).appendTo("body").trigger('create');
	
			
	for(var i=0; i<form.ListeCommandes.length; i++){
			var cmp = i;
			var Synchronisation = "";
			var EnumEtatCommande = form.ListeCommandes[i].EtatCommande;
			var EtatCommandeToShow = null;
			
			switch (EnumEtatCommande)
				{
				case DMS.Mobile.Constante.EtatCommande.NonValidee : EtatCommandeToShow ='<img src="css/images/Cart/alert.png" align="middle">&nbsp;&nbsp;&nbsp;<span class="smallLabel" style="color:orange;">Non valid\351e</span>' ;
				break;
				case DMS.Mobile.Constante.EtatCommande.Validee : EtatCommandeToShow ='<img src="css/images/Cart/done.png" align="middle">&nbsp;&nbsp;&nbsp;<span class="smallLabel" style="color:#006600;">Valid\351e</span>' ;
				break;
				case DMS.Mobile.Constante.EtatCommande.Annulee : EtatCommandeToShow ='<img src="css/images/Cart/cancel.png" align="middle">&nbsp;&nbsp;&nbsp;<span class="smallLabel" style="color:red;">Annul\351e</span>' ;
				break;
				case DMS.Mobile.Constante.EtatCommande.EnCoursDeTraitement : EtatCommandeToShow ='<img src="css/images/Cart/synch.png" align="middle">&nbsp;&nbsp;&nbsp;<span class="smallLabel" style="color:#0066FF;">En cours de traitement</span>' ;
				break;
				case DMS.Mobile.Constante.EtatCommande.Refusee  : EtatCommandeToShow ='<img src="css/images/Cart/remove.png" align="middle">&nbsp;&nbsp;&nbsp;<span class="smallLabel" style="color:red;">Refus\351e</span>';
				break;
				
				default : EtatCommandeToShow ='<img src="css/images/Cart/inconnu.png" align="middle">&nbsp;&nbsp;&nbsp;<span class="smallLabel" style="color:orange;">Etat inconnu</span>';
				}
				
				
				
				
				switch (form.ListeCommandes[i].Synch)
				{
					case "false" : Synchronisation ='<img src="css/images/synch_red.png" align="middle">&nbsp;&nbsp;&nbsp;<span class="smallLabel" style="color:red;">Non synchronis\351e</span>';
					break;
					case "true" : Synchronisation ='<img src="css/images/synch_blue.png" align="middle">&nbsp;&nbsp;&nbsp;<span class="smallLabel" style="color:#0066FF;">Synchronis\351e</span>';
					break;
				}
		
	//	$(this.$TableListeCommandes).table("refresh");
		//$(this.$TableListeCommandes+" > tbody").append(""
		var prixTotalHT = form.ListeCommandes[i].PrixTotalHT;
		var prixTotalTTC = form.ListeCommandes[i].PrixTotalTTC
		
		$(this.$TableListeCommandes).find("tbody:eq(0)").append(""
			+"<tr id='"+form.ListeCommandes[i].CommandeID+"'>"
				+"<td>"+form.ListeCommandes[i].DateCreation+"</td>"
				//+"<td>"+form.ListeCommandes[i].CAB+"</td>"
				+"<td>"+form.ListeCommandes[i]. DateLivraisonPrevue+"</td>"
				//+"<td>"+parseFloat(form.ListeCommandes[i].PrixTotalHT.replace(",", ".")).toFixed(3)+"</td>"
				//+"<td>"+parseFloat(form.ListeCommandes[i].PrixTotalTTC.replace(",", ".")).toFixed(3)+"</td>"
				+"<td>"+(form.ListeCommandes[i].PrixTotalHT).toFixed(3)+"</td>"
				+"<td>"+(form.ListeCommandes[i].PrixTotalTTC).toFixed(3)+"</td>"
				+"<td style='vertical-align: center;'>"+EtatCommandeToShow+"</td>"
				+"<td style='vertical-align: center;'>"+Synchronisation+"</td>"
				+"<td><a data-role='button' class='ui-icon-alt ToPointVente' data-inline='true' data-icon='mappin' data-theme='c' data-iconpos='notext' id='"+form.ListeCommandes[i].CommandeID+"'>D&eacute;tails</a></td>"
				+"<td><a data-role='button' class='ui-icon-alt ToLigneCommande' data-inline='true' data-icon='page' data-theme='c' data-iconpos='notext' id='"+form.ListeCommandes[i].CommandeID+"'>D&eacute;tails</a></td>"
			+"</tr>"
			
		).trigger('create');
				
	}
		}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : insertCommande in ListCommandeViewModel",'alert','e'); 
			}
	},
	
	insertDetailsCommande : function(CommandeList,form,IdCmd){
	try
	{	
		var CommandeToShow = null;
		for(var i=0; i<form.ListeCommandes.length; i++){
			if(form.ListeCommandes[i].CommandeID == IdCmd)
			{
				CommandeToShow = form.ListeCommandes[i];
				break;
			}
		}
		
			
			
			var EnumEtatPointVente = CommandeToShow.PointVentes.EtatPointVente;
			var EtatPointVenteToShow = null;
			
			switch (EnumEtatPointVente)
				{
				case DMS.Mobile.Constante.EtatPointVente.Active : EtatPointVenteToShow ="Activ\351" ;
				break;
				case DMS.Mobile.Constante.EtatPointVente.Desactive : EtatPointVenteToShow ="D\351sctiv\351" ;
				break;
				case DMS.Mobile.Constante.EtatPointVente.NonActive : EtatPointVenteToShow ="Non activ\351" ;
				break;
				}
		
			var EnumEtatClient = CommandeToShow.PointVentes.Client.EtatClient;
			var EtatClientToShow = null;
			
			switch (EnumEtatClient)
				{
				case DMS.Mobile.Constante.EtatClient.Active : EtatClientToShow ="Activ\351" ;
				break;
				case DMS.Mobile.Constante.EtatClient.Desactive : EtatClientToShow ="D\351sactiv\351" ;
				break;
				case DMS.Mobile.Constante.EtatClient.Bloque : EtatClientToShow ="Bloqu\351" ;
				break;
				}
		
		$("#popupContenuPV").html(""
			+"<table><tr>"
		
			+"<td width='50%' style='border-right: 1px solid silver;padding-right: 30px;padding-left: 30px;'><br/>Ville : "+CommandeToShow.PointVentes.Ville.Designation
			+"<br/>Etat PointVente : "+ EtatPointVenteToShow
			+"<br/>Responsable : "+CommandeToShow.PointVentes.Responsable
			+"<br/>Adresse : "+CommandeToShow.PointVentes.Adresse
			+"<br/>T\351l : "+CommandeToShow.PointVentes.Tel
			+"<br/>Fax : "+CommandeToShow.PointVentes.Fax
			+"<br/>Email : "+CommandeToShow.PointVentes.Email
			+"</td>"
	
			
			+"<td width='50%' style='padding-right: 30px;padding-left: 30px;'><br/>Nom Responsable : "+CommandeToShow.PointVentes.Client.NomResponsable
			+"<br/>Nom Soci\351te : "+CommandeToShow.PointVentes.Client.NomSociete
			+"<br/>Raison Sociale : "+CommandeToShow.PointVentes.Client.RaisonSocial
			+"<br/>T\351l : "+CommandeToShow.PointVentes.Client.Tel
			+"<br/>Fax : "+CommandeToShow.PointVentes.Client.Fax
			+"<br/>Site Web : <a>"+CommandeToShow.PointVentes.Client.UrlWeb+"</a>"
			+"<br/>Email : <a>"+CommandeToShow.PointVentes.Client.Email+"</a>"
			+"<br/>Activit\351 : "+CommandeToShow.PointVentes.Client.Activite.Designation
			+"<br/>Etat : "+ EtatClientToShow
			+"</td></tr></table>").trigger('create');
	
	}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : insertDetailCommande in ListCommandeViewModel",'alert','e'); 
			}
		
	},

	insertLigneCommandes : function (CommandeList,form,IdCmd){
	try
	{
		//$(this.$TableLigneCommandes+" > tbody").empty();
		$(this.$TableLigneCommandes).find("tbody:eq(0)").empty();
		var CommandeToShow = null;
		for(var i=0; i<form.ListeCommandes.length; i++){
			if(form.ListeCommandes[i].CommandeID == IdCmd)
			{
				CommandeToShow = form.ListeCommandes[i];
				sessionStorage.setItem("CommandeToModify", JSON.stringify(CommandeToShow));
				break;
			}
		}
		
		for(var i=0; i<CommandeToShow.LignesCommande.length; i++){
		
		//$(this.$TableLigneCommandes+" > tbody").append(""
		$(this.$TableLigneCommandes).find("tbody:eq(0)").append(""
			+"<tr>"
				+"<td>"+CommandeToShow.LignesCommande[i].Quantite+"</td>"
				+"<td>"+CommandeToShow.LignesCommande[i].ArticleObject.Designation +"</td>"
			/*	+"<td>"+parseFloat(CommandeToShow.LignesCommande[i].PrixTotalArticleTTC.replace(",", ".")).toFixed(3)+"</td>"
				+"<td>"+parseFloat(CommandeToShow.LignesCommande[i].PrixTotalArticleHT.replace(",", ".")).toFixed(3)+"</td>"*/
				+"<td>"+(CommandeToShow.LignesCommande[i].PrixTotalArticleTTC).toFixed(3)+"</td>"
				+"<td>"+(CommandeToShow.LignesCommande[i].PrixTotalArticleHT).toFixed(3)+"</td>"
				+"<td><a data-role='button' class='ui-icon-alt ToArticle' data-inline='true' data-icon='page' data-theme='d' data-iconpos='notext' id='"+CommandeToShow.LignesCommande[i].ArticleID+"'>D&eacute;tails</a></td>"
				
			+"</tr>"
		).trigger('create');	
	}
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : insertLigneCommande in ListCommandeViewModel",'alert','e'); 
			}
		
	},
	
	insertArticle : function (CommandeList,form,IdArticle){
	try
	{
		var ArticleToShow = null;
		for(var i=0; i<form.ListeCommandes.length; i++){
			for(var j=0; j<form.ListeCommandes[i].LignesCommande.length; j++){
				if(form.ListeCommandes[i].LignesCommande[j].ArticleID == IdArticle)
				{
					ArticleToShow = form.ListeCommandes[i].LignesCommande[j].ArticleObject;
					break;
				}
			}
		}
			
			$("#popupContenuArticle").html(""
			+"<table width ='100%'><tr><td width='50%' style='padding-right: 0px;padding-left: 0px;vertical-align:top;'>"
			+"<br/><strong>D\351signation :</strong> "+ ArticleToShow.Designation
			+"<br/><strong>Quantit\351 Disponible :</strong> "+ ArticleToShow.QuantiteDisponible
			+"<br/><strong>Prix Unitaire HT :</strong> "+(ArticleToShow.PrixUnitaireHT).toFixed(3)
			+"<br/><strong>Prix Unitaire TTC :</strong> "+ (ArticleToShow.PrixUnitaireTTC).toFixed(3)
			+"</td>"
			+"<td width='50%' style='border-left: 1px solid silver;padding-right: 30px;padding-left: 30px;'>"
			+"<img src='css/images/Produits/sablito.png' >"
			+"</td></tr></table>"
			).trigger('create');
				}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : insertArticle in ListCommandeViewModel",'alert','e'); 
			}
	}
	
	
	
}