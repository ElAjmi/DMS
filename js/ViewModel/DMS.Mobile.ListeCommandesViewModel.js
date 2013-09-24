if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.ListeCommandesViewModel = {};

DMS.Mobile.ListeCommandesViewModel = 
{
	connexion : null,
	ListeCommandes : [],
	$TableListeCommandes : null,
	$TableLigneCommandes : null,
	
	
	
	
	Init: function (form) {
		
		var form = this ;
		
		DMS.Mobile.CommandeRequest.connexion = form.connexion;
		DMS.Mobile.CommandeRequest.SelectAll(function(CommandeList){
		form.initialize(CommandeList,form);
				
			});
		
	
	},
	
	initialize : function(CommandeList,form){
		form.ListeCommandes = CommandeList;
		form.insertCommandes(CommandeList,form);
		form.initializeEvents(CommandeList,form);
	},
	
	initializeEvents : function(CommandeList,form){
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
		 form.insertLigneCommandes(CommandeList,form,idCommande);
		  $.mobile.changePage('#ligneCommande');  
		});
		
		
	},
	
	
	insertCommandes : function(CommandeList,form){
		
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
		
		$(this.$TableListeCommandes).table("refresh");
		$(this.$TableListeCommandes+" > tbody").append(""
			+"<tr id='"+form.ListeCommandes[i].CommandeID+"'>"
				+"<td>"+form.ListeCommandes[i].DateCreation+"</td>"
				//+"<td>"+form.ListeCommandes[i].CAB+"</td>"
				+"<td>"+form.ListeCommandes[i]. DateLivraisonPrevue+"</td>"
				+"<td>"+form.ListeCommandes[i].PrixTotalHT.toFixed(3)+"</td>"
				+"<td>"+form.ListeCommandes[i].PrixTotalTTC.toFixed(3)+"</td>"
				+"<td style='vertical-align: center;'>"+EtatCommandeToShow+"</td>"
				+"<td style='vertical-align: center;'>"+Synchronisation+"</td>"
				+"<td><a data-role='button' class='ui-icon-alt ToPointVente' data-inline='true' data-icon='mappin' data-theme='c' data-iconpos='notext' id='"+form.ListeCommandes[i].CommandeID+"'>D&eacute;tails</a></td>"
				+"<td><a data-role='button' class='ui-icon-alt ToLigneCommande' data-inline='true' data-icon='page' data-theme='c' data-iconpos='notext' id='"+form.ListeCommandes[i].CommandeID+"'>D&eacute;tails</a></td>"
			+"</tr>"
			
		).trigger('create');
				
	}
	},
	
	insertDetailsCommande : function(CommandeList,form,IdCmd){
		
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
	

		
	},

	insertLigneCommandes : function (CommandeList,form,IdCmd){
		$(this.$TableLigneCommandes+" > tbody").empty();
		var CommandeToShow = null;
		for(var i=0; i<form.ListeCommandes.length; i++){
			if(form.ListeCommandes[i].CommandeID == IdCmd)
			{
				CommandeToShow = form.ListeCommandes[i];
				break;
			}
		}
		
		for(var i=0; i<CommandeToShow.ListLignesCommande.length; i++){
		
		$(this.$TableLigneCommandes+" > tbody").append(""
			+"<tr>"
				+"<td>"+CommandeToShow.ListLignesCommande[i].Quantite+"</td>"
				+"<td>"+CommandeToShow.ListLignesCommande[i].ArticleObject.Designation +"</td>"
				+"<td>"+CommandeToShow.ListLignesCommande[i].PrixTotalArticleTTC.toFixed(3)+"</td>"
				+"<td>"+CommandeToShow.ListLignesCommande[i].PrixTotalArticleHT.toFixed(3)+"</td>"
				+"<td><a data-role='button' class='ui-icon-alt ToArticle' data-inline='true' data-icon='page' data-theme='d' data-iconpos='notext' id='"+CommandeToShow.ListLignesCommande[i].ArticleID+"'>D&eacute;tails</a></td>"
				
			+"</tr>"
		).trigger('create');	
	}
		
		
	},
	
	insertArticle : function (CommandeList,form,IdArticle){
		var ArticleToShow = null;
		for(var i=0; i<form.ListeCommandes.length; i++){
			for(var j=0; j<form.ListeCommandes[i].ListLignesCommande.length; j++){
				if(form.ListeCommandes[i].ListLignesCommande[j].ArticleID == IdArticle)
				{
					ArticleToShow = form.ListeCommandes[i].ListLignesCommande[j].ArticleObject;
					break;
				}
			}
		}
			
			$("#popupContenuArticle").html(""
			+"<table width ='100%'><tr><td width='50%' style='padding-right: 30px;padding-left: 30px;'>"
			+"<br/>D\351signation : "+ ArticleToShow.Designation
			+"<br/> Quantit\351 Disponible : "+ ArticleToShow.QuantiteDisponible
			+"<br/> Prix Unitaire HT : "+ArticleToShow.PrixUnitaireHT.toFixed(3)
			+"<br/> Prix Unitaire TTC : "+ArticleToShow.PrixUnitaireTTC.toFixed(3)
			+"</td>"
			+"<td width='50%' style='border-left: 1px solid silver;padding-right: 30px;padding-left: 30px;'>"
			+"<img src='css/images/Produits/sablito.png' >"
			+"</td></tr></table>"
			).trigger('create');
	}
	
	
	
}