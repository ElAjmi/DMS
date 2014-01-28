if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.ListReclamationViewModel = {};

DMS.Mobile.ListReclamationViewModel = 
{	
	connexion : null,
	ListReclamation : [],
	
	$content : null,
	$ButtonRetour : null,
	$formListReclamation : null,
	$synchroRecBtn  : null,
	$btnAddRec : null,
	
	
	
	
	
Init : function ()
	{
		
		//----------------------------- pop up reponse --------------------//
		
			var panelReponseReclamation = $(''
	/*+'<div data-rolr="popup"  id="popupDialogReponse" >'
    +'<div data-role="content" data-theme="d" class="ui-corner-bottom ui-content" id="popupContenuReponse">'
	+'</div></div>');*/
	+'<div data-role="popup"  id="popupDialogReponse" style="width: 448.766px; height: 242.375px;" >'
    
	+'</div>');
	
	$(panelReponseReclamation).appendTo("body").trigger('create');		
		//------------------- fin pop up reponse ------------------//
		
		
		
		
				   ///----------------- page Ajout d'une nouvelle reclamation ---------------------///
	     var pageReclamation = '<div data-role="page" id="pageNvReclamation">';
	        
							  // panel menu ---------------------------------------------------
		pageReclamation += '<div data-theme="c" data-display="overlay" data-position="left" id="panelmenu"'
		 +'data-role="panel" class="ui-panel ui-panel-position-left ui-panel-display-push ui-body-a ui-panel-animate ui-panel-open" >'
		+'<ul data-role="listview" data-theme="c" class="nav-search">'
     /*          +'<li data-icon="edit"><a class="menu_formCommande" href="javascript:void(0);">Saisie commandes</a></li>'
               +'<li data-icon="page"><a class="menu_ListCommande" href="javascript:void(0);">Liste commandes</a></li>'
			    +'<li data-icon="page"><a class="menu_ListArticleRepture" href="javascript:void(0);">Articles en repture</a></li>'
				 
			    +'<li data-icon="page"><a class="menu_galery" href="javascript:void(0);">Gallery articles</a></li>'
			   +'<li data-icon="page"><a href="javascript:void(0);" class="btnSeDeconnecter" >Se deconnecter</a></li>'*/
		+'</ul>'
		+'</div>'; //fin panel menu----------------------------------------------------
		

	          //header---------------------------------------------------------------------
			  pageReclamation += '<div style="margin-bottom:10px" data-role="header"  data-theme="b" >';
			  pageReclamation += ' <h3 style="size:40px;  !important">';
              pageReclamation += 'Ajout réclamation';
			  pageReclamation += '</h3>'; 
			// pageReclamation += '<a href="#panelmenu" data-role="button" data-inline="true" data-mini="true" data-icon="home" data-iconpos="left">Menu</a>';
			  pageReclamation +='<a  href="#" data-rel="back" data-inline="true" class ="retour" data-mini="true"  data-icon="back">Retour</a>'; 
			  pageReclamation += ' </div>'; 
			  //fin header --------------------------------------------------------------
		
		     pageReclamation += '<div data-role="content">';  

			 pageReclamation +='<div class="ui-grid-a">';
			               
	                    pageReclamation +='<div class="ui-block-a">';
						  
							   pageReclamation +='<div data-role="fieldcontain" style="width: 250px;">';
									pageReclamation +='<div class="ui-grid-a">';
									pageReclamation +='<label for="select-choice-1" class="select">Client :</label>';
									pageReclamation +='</div>';
									
									pageReclamation +='<div class="ui-grid-a" style="width:100%;height: 45px;margin-top: 8px;">';
									pageReclamation +='<select name="select-choice-1" id="SelectClient">';
										pageReclamation +='<option value="" >Client</option>';		
									pageReclamation +='</select>';
									pageReclamation +='</div>';
									
								pageReclamation +='</div>';
								
						pageReclamation +='</div>';
						
						pageReclamation +='<div class="ui-block-b">';
						  
							   pageReclamation +='<div data-role="fieldcontain" style="width: 250px;">';
							        pageReclamation +='<div class="ui-grid-a">';
									pageReclamation +='<label for="select-choice-2" class="select">Point de vente :</label>';
									pageReclamation +='</div>';
									
									pageReclamation +='<div class="ui-grid-a" style="width:100%;height: 45px;margin-top: 8px;">';
									pageReclamation +='<select name="select-choice-2" id="SelectPointVente">';
										pageReclamation +='<option value="" >Point de vente</option>';
										
									pageReclamation +='</select>';
									pageReclamation +='</div>';
								pageReclamation +='</div>';
								
						pageReclamation +='</div>';
			
			
						   
			 pageReclamation +='</div>';
			 
			 pageReclamation +='<div class="ui-grid-a">';
			                        						  
							   pageReclamation +='<div data-role="fieldcontain" style="width: 250px;">';
							   pageReclamation +='<div class="ui-grid-a">';
									pageReclamation +='<label for="select-choice-3" class="select">Type réclamation :</label>';
									pageReclamation +='</div>';
									pageReclamation +='<div class="ui-grid-a" style="width:100%;height: 45px;margin-top: 8px;">';
									pageReclamation +='<select name="select-choice-3" id="SelectTypeRec">';
										pageReclamation +='<option value="" >Type réclamation</option>';
										
									pageReclamation +='</select>';
									pageReclamation +='</div>';
								pageReclamation +='</div>';
								
									
			 pageReclamation +='</div>';
			 
			 pageReclamation +='<div class="ui-grid-a">';
			                   
						pageReclamation +='<div class="ui-grid-a">';
						      pageReclamation +='<label>Commentaire</label>';
						pageReclamation +='</div>';
						
						pageReclamation +='<div class="ui-grid-a" style="width:100%;">';	   
							  pageReclamation +='<textarea style="width:700px; height:115px;" cols="40" rows="8" name="textarea1" class="NewTextarea"></textarea>'
						pageReclamation +='</div>';		
							   
			 pageReclamation +='</div>';
			 
			  pageReclamation +='</div>';
			 //--------------------- fin content -----------------//
			 
			 //-----------------footer----------------//
			 
			  pageReclamation +='<div data-role="footer" data-position="fixed" data-theme="b">';
              pageReclamation +='<div class="ui-grid-a">';
			  pageReclamation +='<div class="ui-block-a">';
			  pageReclamation +='<a href="" align="right" id="btnCancel" data-rel="back" data-theme="c" style="width: 155px; margin-left: 28px;" data-role="button" >Annuler </a>';
			  pageReclamation +='</div>'
			  pageReclamation +='<div class="ui-block-b">';
              pageReclamation +='<a href="" align="right" id="btnSave" data-theme="c" style="width: 155px; margin-left: 28px;" data-role="button" >Enregistrer </a>';
			  pageReclamation +='</div>'  
              pageReclamation +='</div>';
              pageReclamation +='</div>';
			 
			 //-----------------fin footer------------//
			 
			 
			 pageReclamation +='</div>';
			 //------------------- fin page reclamation ----------------//
			
			 $("body").append(pageReclamation);
			 
		
		
		
		
		
		
			var form = this;
			DMS.Mobile.ReclamationRequest.connexion = this.connexion;
			//alert("avant selectAll");
			DMS.Mobile.ReclamationRequest.SelectAll(function(listReclamation){
				//alert("apres selectAll");
				form.ListReclamation = listReclamation;
				//alert(listReclamation[0].PointVentes);
				//alert(listReclamation[0].ListReponse.length);
				//alert(form.ListReclamation[0].PointVentes);
				//alert(form.ListReclamation[0].ListReponse.length);
				
				   form.initialize(form,listReclamation);
				
				});	
	},
	
	initialize : function(form,listReclamation)
	{
		//alert(listReclamation[0].PointVentes.length)
		//alert(form.ListReclamation[0].PointVentes.length)
		
	//alert("initialize");
			  var nbrReclamation = null;
			  nbrReclamation = form.ListReclamation.length;
if(nbrReclamation != 0){
//alert(nbrReclamation);
              var nomFO = form.ListReclamation[0].Personnel.Nom+" "+form.ListReclamation[0].Personnel.Prenom;
	//		 alert(nomFO);
			  
			  
			  var userID = sessionStorage.getItem("userID");
			  var page = '';
			  for(var i = 0;i<nbrReclamation;i++)
			  {
				   var enumTypeRec = null;
				   var rec = null;
				   enumTypeRec =  form.ListReclamation[i].TypeReclamationID;
				  // alert(enumTypeRec);
			  if(enumTypeRec == DMS.Mobile.Constante.TypeReclamation.RecFacing)
				  {
					  
					  rec = "Facing";
				  }
				  else if(enumTypeRec == DMS.Mobile.Constante.TypeReclamation.RecCommande)
				  {
					  rec = "Commande";
				  }
				  else if(enumTypeRec == DMS.Mobile.Constante.TypeReclamation.RecEspacePromo)
				  {
					  rec = "Espace promotionnel";
				  }
				  else if(enumTypeRec == DMS.Mobile.Constante.TypeReclamation.RecLivraison)
				  {
					  rec = "Livraison";
				  }
				  else if(enumTypeRec == DMS.Mobile.Constante.TypeReclamation.RecParametragePV)
				  {
					  rec = "Paramétrage point de vente";
				  }
				  else if(enumTypeRec == DMS.Mobile.Constante.TypeReclamation.RecRecouvrement)
				  {
					  rec = "Recouvrement";
				  }
				  else if(enumTypeRec == DMS.Mobile.Constante.TypeReclamation.RecReleveInventaire)
				  {
					  rec = "Relevé inventaire";
				  }
				  else if(enumTypeRec == DMS.Mobile.Constante.TypeReclamation.RecRelevePresencePrixConc)
				  {
					  rec = "Relevé Prix conccurant";
				  }
				  else if(enumTypeRec == DMS.Mobile.Constante.TypeReclamation.RecRelevePrix)
				  {
					  rec = "Relevé prix";
				  }
				  else if(enumTypeRec == DMS.Mobile.Constante.TypeReclamation.ReclamationReleveVenteConc)
				  {
					  rec = "Relevé présence conccurant";
				  }
				   
				   
				   
				   var etatTraitement = form.ListReclamation[i].EtatTraitement;
				//   alert(etatTraitement);
				   
				   //var c = form.ListReclamation[i].PointVentes;
				  // alert(c);
				   
			  if(etatTraitement != DMS.Mobile.Constante.EtatTraitement.Supprimee)
			  {
			         var recla = null;
					 recla = form.ListReclamation[i];

				  if(etatTraitement == DMS.Mobile.Constante.EtatTraitement.Traitee)
			      {
				page += '<div class="ui-grid-a">';
				page += '<div class="ui-block-a" style="width:85%;">';
				
					  
			  page +='<div data-role="collapsible-set" class="reclamation"  data-theme="b" style="margin-right:12px; margin-left:12px;">';

		      page +='<div data-role="collapsible" data-theme="b" data-content-theme="b" data-collapsed-icon="arrow-r" data-expanded-icon="arrow-d" data-iconpos="left" data-collapsed="true">';
				  }
				  else if(etatTraitement == DMS.Mobile.Constante.EtatTraitement.NonTraitee)
				  {
                page += '<div class="ui-grid-a">';
				page += '<div class="ui-block-a" style="width:85%;">';
				
					  
			  page +='<div data-role="collapsible-set" class="reclamation"  data-theme="b" style="margin-right:12px; margin-left:12px;">';

		      page +='<div data-role="collapsible" data-theme="e" data-content-theme="b" data-collapsed-icon="arrow-r" data-expanded-icon="arrow-d" data-iconpos="left" data-collapsed="true">';
				  }	
					

			  	 var nomClient = recla.PointVentes.Client.NomSociete;
				// alert(nomClient);
				//var a = rec.PointVentes.Client.NomSociete;
				//alert(a);
				//alert(1);
				 var adrrPV = form.ListReclamation[i].PointVentes.Adresse;
				 var adressePV = adrrPV.split(','); 
				 var gouver = adressePV[0];	
			
			  page +='<h2>';
			  
			  var nbrReponseNonConsulter = 0;
			for(var k = 0; k<form.ListReclamation[i].ListReponse.length;k++)
	        {
				var etatConsultation = form.ListReclamation[i].ListReponse[k].EtatConsultation;
		       if((etatConsultation == DMS.Mobile.Constante.EtatConsultation.NonConsulte) && (form.ListReclamation[i].ListReponse[k].PersonnelID != userID))
			   {
				   nbrReponseNonConsulter++;
			   }
			   
			   
	        }
			  
			  
			     // bouton repondre
			 page +='<div class="ui-grid-a">';
			 
			 
				page +='<div class="ui-block-a" style="float:right;width:20%;">'; 

page +='<div style="float:right;  margin-left:12px;" >';				 
			  page +='<span class="spanNbrReponse ui-li-count ui-btn-up-c ui-btn-corner-all" style="padding-right:6px; padding-left: 5px;">'+nbrReponseNonConsulter+'</span>';			  
			  page +='</div>';
			  
              page +='<div style="float:right;" >';
				  /* if(etatTraitement == DMS.Mobile.Constante.EtatTraitement.NonTraitee)
				  {
					  page +='<a href="javascript:void(0)"   class="Rependre" >Rependre</a>';
					  
					  
					  }*/
			  page +='<input type="hidden" value="'+i+'"/>';
			  page +='<input type="hidden" value="'+nbrReponseNonConsulter+'"/>';
			  page +='</div>';
			  
			  page +='</div>';
			  // fin boutton
			 

		
		page +='<div class="ui-block-b" style="width:80%;">';
	page +='<p style="overflow: hidden;  text-overflow: ellipsis; margin-top: 0px;margin-bottom: 0px;">'+form.ListReclamation[i].TexteReclamation+'</p>';
	page +='<p style="font-size: smaller;margin-top: 5px;margin-bottom: 0px;margin-left: 14px;">'+form.ListReclamation[i].DateCreation+'&nbsp;&nbsp;&nbsp;&nbsp; '+nomClient+' :&nbsp; '+gouver+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Type de Reclamation :  '+rec+'</p>';
		page +='</div>';
		
		page +='</div>';




			 // page +=''+form.ListReclamation[i].DateCreation+'&nbsp;&nbsp;&nbsp;&nbsp; '+nomClient+' :&nbsp; '+gouver;
//page +='</div>';
			  page +='</h2>';
			  
			 page +=' <ul data-role="listview" data-inset="true" id=listReponse'+form.ListReclamation[i].ReclamationID+'>';
  //   page +='<li data-role="list-divider">Vendredi 8 octobre 2010 <span class="ui-li-count">2</span></li>';
 
    page +='<li style="display: none;"><a href="index.html">';
        page +='<h2>Stephen Weber</h2>';
        page +='</a><p><strong>"Vous" </strong></p>';
        page +='<p>Hé Stephen, si vous êtes disponible demain à 10 heures, nous avons </p>';
       page +=' <p class="ui-li-aside"><strong>6:24</strong>PM</p>';
    page +='</li>';
	
	for(var j = 0; j<form.ListReclamation[i].ListReponse.length;j++)
	{
	
        page +='<li data-role="list-divider" data-theme="c">';
				if(form.ListReclamation[i].ListReponse[j].PersonnelID == userID)
				{
					page +='<h2>'+nomFO+'</h2>';
				}
				else
				{
					 page +='<h2>Back Office</h2>';
				}
				   
        page +='<p>'+form.ListReclamation[i].ListReponse[j].TexteReclamation +'</p>';
        page +='<p class="ui-li-aside"><strong>'+form.ListReclamation[i].ListReponse[j].DateCreation+'   '+form.ListReclamation[i].ListReponse[j].HeureCreation+'</strong></p>';
page +='</li>';
	}
page +='</ul>';
			  
			  
			  
			  
			  
			  page += '</div>';
			  page += '</div>';
			  
			  page += '</div>';
			  
			  page += '<div class="ui-block-b" style="width:15%;margin-top: 10px;">';
			  
			      if(etatTraitement == DMS.Mobile.Constante.EtatTraitement.NonTraitee)
				  {
					  page +='<a href="javascript:void(0)" data-role="button" data-theme="e" style="width: 115px; margin-left: 0px;margin-top: 0px;margin-bottom: 9px;padding-bottom: 0px;padding-right: 0px;height: 42.188;border-bottom-width: 9px;border-top-width: 11px;" class="Repend" >Répondre</a>';
					//  <a href="" align="right" id="btnCancel" data-rel="back" data-theme="c" style="width: 155px; margin-left: 28px;" data-role="button" >Annuler </a>';
					  
					  }
					  page +='<input type="hidden" value="'+i+'"/>';
			  page +='<input type="hidden" value="'+nbrReponseNonConsulter+'"/>';
			  
			  page += '</div>';
			  
			  page += '</div>';//ui-grid-a
			  
			  
			  
			  }//if
		
			
			  }// for
			  form.$content.append(page).trigger('create');
} // if (nbrReclamation != 0)
			//  $("#formListReclamation").trigger('pagecreate');
			  form.InitializeEventReclamation(form);
			  
              
			  
			  //initialisation pour la page ajout d'une reclamation
			  		DMS.Mobile.ClientRequest.connexion = this.connexion;
					//alert("avant selectAllClient");
					DMS.Mobile.ClientRequest.SelectAllClient(function(ListClient)
					{
						//alert("apres selectAllClient");
						form.fillTypeReclamation(form);
						form.fillSelectClient(ListClient,form);
						form.InitializeEventNewRec(form,ListClient);
						//form.InitializeEventTypeRec(form);
						//form.InitializeEventNewTexterea(form);
						form.InitializeEventBtn(form)
						
					});

	},
	
	///// teste obligatoire sur les champs null
	InitializeEventBtn : function(form)
	{
	//	$("#btnCancel").click(function(){
		     
	//	});
		$("#btnSave").click(function(){
		     
			 var clientID = null;
			 var pointVenteID = null;
			 var typeReclamationEnum = null;
			 var commentaire = null;
			 
			 clientID = $("#SelectClient").val();
			 pointVenteID = $("#SelectPointVente").val();
			 typeReclamationEnum = $("#SelectTypeRec").val();
			 commentaire =  $(".NewTextarea").val();
			 
			 
			        var etatTraitement = DMS.Mobile.Constante.EtatTraitement.NonTraitee;
					var etatConsultation = DMS.Mobile.Constante.EtatConsultation.NonConsulte;
					var dateCreation = DMS.Mobile.Common.currentDate();
			        var heureCreation = DMS.Mobile.Common.currentHours();
					var dateCr = DMS.Mobile.Common.DateInverseSpliting(dateCreation);
					var dateCreationTrie = dateCr+' '+heureCreation;
					
					var newReclamation = new  DMS.Mobile.Reclamation();
					
					newReclamation.TypeReclamationID = typeReclamationEnum;
					newReclamation.ParentID = null;
					newReclamation.TexteReclamation = commentaire;
					newReclamation.PointVenteID = pointVenteID;
					
					var userID = sessionStorage.getItem("userID")
					newReclamation.PersonnelID = userID;
					newReclamation.EtatTraitement = etatTraitement;
					newReclamation.EtatConsultation = etatConsultation;
					newReclamation.DateCreation = dateCreation;
					newReclamation.HeureCreation = heureCreation;
					newReclamation.DateCreationTrie = dateCreationTrie;
					
				if((clientID == "") || (clientID == null))
				{
					alert("Séléctionner un client");
				}
				else if((pointVenteID == "") || (pointVenteID == null))
				{
					alert("Séléctionner un point de vente");
				}
				else if((typeReclamationEnum == "") || (typeReclamationEnum == null))
				{
					alert("Séléctionner votre type de réclamation");
				}
				else if((commentaire == "") || (commentaire == null))
				{
					alert("Saisir le commentaire de la réclamation");
				}
				else
				{
					
					 DMS.Mobile.ReclamationRequest.connexion = form.connexion;
					 DMS.Mobile.ReclamationRequest.InsertReclamation(newReclamation,function(){
					 //alert("succès");
					 DMS.Mobile.Common.RedirectToReclamation();
					 });
				}
 			 
		});
	},
	
/*InitializeEventNewTexterea : function(form)
	{
		var CommentaireSaisie = null;
		$(".NewTextarea").change(function(){
			
			 CommentaireSaisie = $(this).val();
			
	         //   alert(CommentaireSaisie);		
		});
	
	},*/
	
fillTypeReclamation : function(form)
{
	//les types de réclamaition (sauvgarder dans la base de données
	var inonnue = DMS.Mobile.Constante.TypeReclamation.RecInconnue;
	var RecFacing = DMS.Mobile.Constante.TypeReclamation.RecFacing;
	var RecCommande = DMS.Mobile.Constante.TypeReclamation.RecCommande;
	var RecEspacePromo = DMS.Mobile.Constante.TypeReclamation.RecEspacePromo;
	var RecLivraison = DMS.Mobile.Constante.TypeReclamation.RecLivraison;
	var RecParametragePV = DMS.Mobile.Constante.TypeReclamation.RecParametragePV;
	var RecRecouvrement = DMS.Mobile.Constante.TypeReclamation.RecRecouvrement;
	var RecReleveInventaire = DMS.Mobile.Constante.TypeReclamation.RecReleveInventaire;
	var RecRelevePresencePrixConc = DMS.Mobile.Constante.TypeReclamation.RecRelevePresencePrixConc;
	var RecRelevePrix = DMS.Mobile.Constante.TypeReclamation.RecRelevePrix;
	var ReclamationReleveVenteConc = DMS.Mobile.Constante.TypeReclamation.ReclamationReleveVenteConc;
	
	var html1 = ' <option value="'+RecFacing+'" >Facing</option>';
	$("#SelectTypeRec").append(html1);
	
	var html2 = ' <option value="'+RecCommande+'" >Commande</option>';
	$("#SelectTypeRec").append(html2);
	
	var html3 = ' <option value="'+RecEspacePromo+'" >Espace promotionnel</option>';
	$("#SelectTypeRec").append(html3);
	
	var html4 = ' <option value="'+RecLivraison+'" >Livraison</option>';
	$("#SelectTypeRec").append(html4);
	
	var html5 = ' <option value="'+RecParametragePV+'" >Paramétrage point de vente </option>';
	$("#SelectTypeRec").append(html5);
	
	var html6 = ' <option value="'+RecRecouvrement+'" > Recouvrement </option>';
	$("#SelectTypeRec").append(html6);
	
	var html7 = ' <option value="'+RecReleveInventaire+'" > Relevé inventaire </option>';
	$("#SelectTypeRec").append(html7);
	
	var html8 = ' <option value="'+RecRelevePresencePrixConc+'" >Relevé présence conccurant </option>';
	$("#SelectTypeRec").append(html8);
	
	var html9 = ' <option value="'+RecRelevePrix+'" > Relevé prix </option>';
	$("#SelectTypeRec").append(html9);
	
	var html10 = ' <option value="'+ReclamationReleveVenteConc+'" > Relevé présence conccurant </option>';
	$("#SelectTypeRec").append(html10);
	
	
},	

/*InitializeEventTypeRec : function(form)
{
	$("#SelectTypeRec").change(function(){
			
			if($(this).val()!= "")
			{
				var a = $(this).val();
			   //  alert(a);	
				 
			}
			else{
				  alert("null");
				}
			
			
			});
},*/

	
fillSelectClient:function(ListClient,form)
	{
		for(var i = 0;i<ListClient.length;i++)
		{
			var html = ' <option value="'+ListClient[i].ClientID+'" index="'+i+'">'+ListClient[i].NomSociete+'</option>';
			var a = $("#SelectClient");
			$("#SelectClient").append(html);
		}
	},
	
fillSelectPointVente:function(ListClient,index,form)
	{
		
		$("#SelectPointVente").html('<option value="">Point de vente </option>');
		for(var i = 0;i<ListClient[index].listPointVentes.length;i++)
		{
			var html = ' <option value="'+ListClient[index].listPointVentes[i].PointVenteID+'">'+ListClient[index].listPointVentes[i].Adresse+'</option>';
			$("#SelectPointVente").append(html);
			$("#SelectPointVente").selectmenu('refresh');
		}

	},
	
	
	InitializeEventNewRec : function(form,ListClient)
	{
		$("#SelectClient").change(function(){
			if($(this).val()!= ""){
				var index = $(this).find(":selected").attr("index");
				$("#SelectPointVente").selectmenu('enable');
				form.fillSelectPointVente(ListClient,index,form);
			}
			else
			{
				$("#SelectPointVente").selectmenu('disable');;
			}
			$("#SelectPointVente").trigger("create");
			
		});
		
		
		$("#SelectPointVente").change(function(){

			$("#SelectClient").trigger("create");

		});
		
	},
	
	
	
	
	
	InitializeEventReclamation : function(form)
	{
		$(form.$btnAddRec).click(function(){
			
				  $.mobile.changePage('#pageNvReclamation');
			     // $("#pageNvReclamation").trigger('pagecreate');
			 
			});
		
		
		
				
		$(form.$synchroRecBtn).click(function(){
		
		          	DMS.Mobile.Common.TestServer(function(AcceeServeur){
			
									if (AcceeServeur == true)
									{
											DMS.Mobile.SynchronizeRequest.connexion = form.connexion;
											DMS.Mobile.SynchronizeRequest.SynchronizeReclamation(function(synchr)
													{  
													//alert("syyyyynchhhhhhhhhhhhh");
													if(synchr == false)
													{
														alert("Il n'y a pas des nouveaux reclamations à synchroniser"); 
													}
													else
													{
														alert("succès de synchronisation");
															//  DMS.Mobile.Common.RedirectToListeCommandes();	
													}
													});
									}
									else
									{
										 alert("Pas d'accès serveur !!!");	
									}
								
					 });
		});
				
				
		(form.$ButtonRetour).click(function(){
			
			  DMS.Mobile.Common.RedirectToCalendrier();
			});
			
				$(".menu_Synchronisation").click(function(){			 
				 
				  $(this).addClass('ui-disabled'); 
				  
				  DMS.Mobile.Common.connexion = form.connexion;
				  DMS.Mobile.Common.synchronizeAllData(function(){
					  
					  DMS.Mobile.Common.RedirectToReclamation();
					  
					  });
				 
		});
		
		$(".menu_ListArticleRepture").click(function(){
    
	DMS.Mobile.Common.RedirectToArticleEnRepture();

});
			
		
		$("#btnSeDeconnecter").click(function(){
	 
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
			
			
			//$(".Repend").click(function(){
				$('body').on('click',".Repend",function() {
				 var indexReclamation = $(this).next("input[type=hidden]:eq(0)").val();
				$("#popupDialogReponse").html(''
		   
		      +'<form >'
		+'<fieldset id="fieldset" style="padding-top: 15px;padding-right: 15px;padding-left: 15px;padding-bottom: 15px;border-left-width: 2px;border-top-width: 2px;border-right-width: 2px;border-bottom-width: 2px;width: 387.766px;height: 192.375px;-webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;margin-left: 15px;margin-top: 6px;" >' 
			+'<legend id="legend" align="left"> '
            
			+'<h3>Commentaire : </h3> '
			+'</legend>'
			
           +'<div class="ui-block-a">' 
		    
		   +'<div class="ui-grid-a">'
		   +'<textarea style="width:384px; height:115px;" cols="40" rows="8" name="textarea" class="textarea"></textarea>'
		   +'</div>'
		   +'<div class="ui-grid-a">'
		   +'<div class="ui-block-a">'
		   +'<a href="#" style="width: 135.75px;margin-left: 46px;" class="EnregistrerComment"  data-role="button"  data-theme="b" class="show-page-loading-msg" data-textonly="false" data-textvisible="true">Enregistrer</a>'
		   +'</div>'
		   +'<div class="ui-block-b">'
		   +'<a href="#" style="width: 135.75px;" class="AnnuleComment"  data-role="button"  data-theme="b" class="show-page-loading-msg" data-textonly="false" data-textvisible="true">Annuler</a>'
           +'</div>'
		   +'</div>'
		   
		   +'</div>'         
		+'</fieldset>'
       +'</form>');
		 
		
//alert("3");
		$("#popupDialogReponse").popup().trigger("create").popup("open")
		//	alert(4);	
			form.eventButtonCommentaire(form,indexReclamation);
				
				
	});
		
	/* $(".Rependre").click(function(){
			// alert("Click bouton");
		  var indexReclamation = $(this).next("input[type=hidden]:eq(0)").val();
		 
		   $("#popupDialogReponse").html(''
		   
		      +'<form >'
		+'<fieldset id="fieldset" style="padding-top: 15px;padding-right: 15px;padding-left: 15px;padding-bottom: 15px;border-left-width: 2px;border-top-width: 2px;border-right-width: 2px;border-bottom-width: 2px;width: 387.766px;height: 192.375px;-webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;margin-left: 15px;margin-top: 6px;" >' 
			+'<legend id="legend" align="left"> '
            
			+'<h3>Commentaire : </h3> '
			+'</legend>'
			
           +'<div class="ui-block-a">' 
		    
		   +'<div class="ui-grid-a">'
		   +'<textarea style="width:384px; height:115px;" cols="40" rows="8" name="textarea" class="textarea"></textarea>'
		   +'</div>'
		   +'<div class="ui-grid-a">'
		   +'<div class="ui-block-a">'
		   +'<a href="#" style="width: 135.75px;margin-left: 46px;" class="EnregistrerComment"  data-role="button"  data-theme="b" class="show-page-loading-msg" data-textonly="false" data-textvisible="true">Enregistrer</a>'
		   +'</div>'
		   +'<div class="ui-block-b">'
		   +'<a href="#" style="width: 135.75px;" class="AnnuleComment"  data-role="button"  data-theme="b" class="show-page-loading-msg" data-textonly="false" data-textvisible="true">Annuler</a>'
           +'</div>'
		   +'</div>'
		   
		   +'</div>'         
		+'</fieldset>'
       +'</form>');
		 
		
		//	$("#popupDialogReponse").popup();
		//	$("#popupDialogReponse").popup("open")
		//	$("#popupDialogReponse").trigger('create');
		$("#popupDialogReponse").popup().trigger("create").popup("open")
		
		alert("1");
	/*	$( "#popupDialogReponse" ).popup({
			  create: function( event, ui ) {
				  alert("2");
				  $(this).popup("open");
				  alert("3");
				  }
			});*/
			
		/* $("#popupDialogReponse").popup({
                       afteropen: function( event, ui ) {
						   alert("4");
						   }
         }); */


		
		 //alert("ici1");
		   //  form.eventButtonCommentaire(form,indexReclamation);
		 
	/*	 });*/
		  		 
		 
		
$("div:jqmData(role='collapsible')").each(function(){
    form.bindEventTouch($(this),form); 
});
    		 
	},
	
 bindEventTouch : function(element,form) {
    element.bind('tap', function(event, ui) {
       if(element.hasClass('ui-collapsible-collapsed')) {
         //   alert(element.attr('id')+' is closed');
		 var indexReclamation = element.find("input[type=hidden]:eq(0)").val();
		var nbrReponse = element.find("input[type=hidden]:eq(1)").val();
		var reclamation = form.ListReclamation[indexReclamation];
		if (nbrReponse !=0)
		{
			var etatConsultation = DMS.Mobile.Constante.EtatConsultation.Consulte
			
			DMS.Mobile.ReclamationRequest.connexion = form.connexion;
			DMS.Mobile.ReclamationRequest.UpdateEtatConsultationByID(etatConsultation,reclamation,function(){
				var a = element;
				element.find("span.spanNbrReponse:eq(0)").text("0");
				element.find("input[type=hidden]:eq(1)").val(0);
				});
		}
		  
        } else {
          //  alert(element.attr('id')+' is open');
		  
		  	
        }
    });
},

eventButtonCommentaire : function(form,indexReclamation)
{
	//alert("event button commentaire");
	        var CommentaireSaisie = null;
			var reclamation = form.ListReclamation[indexReclamation];
			//var resteapayer = null;
			$(".textarea").change(function(){
			
			//alert("change");
			 CommentaireSaisie = $(this).val();
			// resteapayer = parseInt(ResteAPayer);
			});
	  		
			$(".AnnuleComment").click(function(){
				//alert("annuler");
				  CommentaireSaisie = null;
			     $("#popupDialogReponse").popup("close");
			});
			
			 $(".EnregistrerComment").click(function(){
				// alert("enreg");
				 if((CommentaireSaisie == null) ||(CommentaireSaisie == ""))
				 {  
				      alert("Aucun commentaire n'a été saisi");
				 }
				 else
				 {
					// alert("enregistrer");
					var etatTraitement = DMS.Mobile.Constante.EtatTraitement.NonTraitee;
					var etatConsultation = DMS.Mobile.Constante.EtatConsultation.NonConsulte;
					var dateCreation = DMS.Mobile.Common.currentDate();
			        var heureCreation = DMS.Mobile.Common.currentHours();
					var dateCr = DMS.Mobile.Common.DateInverseSpliting(dateCreation);
					var dateCreationTrie = dateCr+' '+heureCreation;
					var reponseReclamation = new  DMS.Mobile.Reclamation();
					
					reponseReclamation.TypeReclamationID = reclamation.TypeReclamationID;
					reponseReclamation.ParentID = reclamation.ReclamationID;
					reponseReclamation.TexteReclamation = CommentaireSaisie;
					reponseReclamation.PointVenteID = reclamation.PointVenteID;
					reponseReclamation.PersonnelID = reclamation.PersonnelID;
					reponseReclamation.EtatTraitement = etatTraitement;
					reponseReclamation.EtatConsultation = etatConsultation;
					reponseReclamation.DateCreation = dateCreation;
					reponseReclamation.HeureCreation = heureCreation;
					reponseReclamation.DateCreationTrie = dateCreationTrie;
					
					  var nomFO = form.ListReclamation[0].Personnel.Nom+" "+form.ListReclamation[0].Personnel.Prenom;
					
					 DMS.Mobile.ReclamationRequest.connexion = form.connexion;
					 DMS.Mobile.ReclamationRequest.InsertReclamation(reponseReclamation,function(){
						 
						 
						// alert("success");
						$("#popupDialogReponse").popup("close");
						 var li = '';
						 
						  li +='<li data-role="list-divider" data-theme="c">';
					      li +='<h2>'+nomFO+'</h2>';
					      li +='<p>'+reponseReclamation.TexteReclamation +'</p>';
						  li +='<p class="ui-li-aside"><strong>'+reponseReclamation.DateCreation+'   '+reponseReclamation.HeureCreation+'</strong></p>';
						  li +='</li>';
						  
						  
		 
						     $("#listReponse"+reclamation.ReclamationID).prepend($(li));
						     $("#listReponse"+reclamation.ReclamationID).listview('refresh');
						  
						 });
				 }
				 
				 });
			
}
	
	
	
}