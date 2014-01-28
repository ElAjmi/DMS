if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.ReferentielArticleViewModel = {};

DMS.Mobile.ReferentielArticleViewModel = 
{
	
	connexion : null,
     
	$Bloc1 : null,
	$Bloc2 : null,
	$Bloc3 : null,
	
	$SaveReference : null,
	$AnnulerRef : null,
	$back :  null,
	$synchronisation : null,
	
	ListArticle : [],
	ListQuantiteArticleChange : [],
	
	Init : function()
	{
		
		var confirmDialog = $(''
		
		<!-- popup de confirmation pour quitter la page sans synchronisation-->
 +'<div data-role="popup" id="popupConfirm"  class="ui-corner-all">'
    +'<div data-role="content" data-theme="d" class="ui-corner-bottom ui-content" id="popupContentConfirm">'
+'</div></div>');
	
	$(confirmDialog).appendTo("body");
		<!-- fin popup-->
		
		
		
		var form = this;
	form.initializeEvent(form);
	DMS.Mobile.ArticleRequest.connexion = form.connexion;
	DMS.Mobile.ArticleRequest.SelectAllArticles(function(listArticle){	
		form.ListArticle = listArticle;
		
		DMS.Mobile.FamilleRequest.connexion = form.connexion;
		DMS.Mobile.FamilleRequest.SelectAll(function(ListFamille){
			
			form.InitializeArticle(ListFamille,form);
		});
	});
	
	},
	
	InitializeArticle : function (ListFamille,form)
	{
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
							html += "<div class='ui-block-a detail_article' style='min-width: 162px;'><a style='color:#46CC5B' data-rel='popup'>"+ListFamille[i].ListArticles[k].Designation+"</a></div>";
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
	
	
		$("#ReferentielArticle").trigger('pagecreate');
		// en cas de modification
		form.addColorToFamille(form);
		form.fillQuantityToArticle(form);
		form.addEventToSelectArticle(form,ListFamille);
		//form.addEventToClickArticle(form,ListFamille);
		
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
		for(var i = 0;i<form.ListArticle.length; i++)
	    {
			$("#article_"+form.ListArticle[i].ArticleID).val(form.ListArticle[i].QuantiteRef);
		}	
	},
	
	addEventToSelectArticle : function(form,ListFamille)
	{
		
		$(".article").each(function(index, element) {
            $(element).change(function(){
                 var ArticleIDS = $(this).attr('id');
				 var articleID = ArticleIDS.substring(8,10);
				 var articleQ = new DMS.Mobile.ArticleCommercial();
				 
				 articleQ.ArticleID = articleID;
				 articleQ.QuantiteRef = $(this).val();
			
			    form.ListQuantiteArticleChange.push(articleQ);
			});
        });
	},
	

// bouton annuler ou retour : vider ListQuantiteArticleChange
// bouton enregistrer : update sur la liste form.ListQuantiteArticleChange


initializeEvent : function(form)
{
	$(form.$SaveReference).click(function(){
	   
	   var nbrList =  form.ListQuantiteArticleChange.length;
	   DMS.Mobile.ArticleCommercialRequest.ListArticleCommercial = [];
	   if(nbrList == 0)
	   {
		   DMS.Mobile.Common.RedirectToCalendrier();
	   }
	   else
	   {
	     for(var i = 0; i<form.ListQuantiteArticleChange.length;i++)
		 {
			 DMS.Mobile.ArticleCommercialRequest.connexion = form.connexion;
			 DMS.Mobile.ArticleCommercialRequest.updateArticleCommercial(form.ListQuantiteArticleChange[i],"false",nbrList,function(listArticleCommer){
				 alert("La modification est effectué avec succès");
				 
				       DMS.Mobile.Common.TestServer(function(AcceeServeur){
			
									if (AcceeServeur == true)
									{
											DMS.Mobile.SynchronizeRequest.connexion = form.connexion;
											DMS.Mobile.SynchronizeRequest.SynchronizeArticleCommercial(function(synchr)
													{  
														DMS.Mobile.Common.RedirectToCalendrier();
													});
									}
									else
									{
										// alert("Pas d'accès serveur !!!");
										//
									   $("#popupContentConfirm").html(''
									   +'<form>'
		                                 +'<fieldset id="fieldset">'
											+'<div class="ui-grid-a">' 
											  +'<h3>Voulez-vous quitter sans synchronisation des données ? </label>' 
											+'</div>'
											
											+'<div class="ui-grid-a">'
											    + '<div class="ui-block-a">'
												  +'<a href="#" class="oui"  data-role="button"  data-theme="b" class="show-page-loading-msg" data-textonly="false" data-textvisible="true">Oui</a>'
											   + '</div>'
											   
											   + '<div class="ui-block-b">'
												  +'<a href="#" class="non"  data-role="button"  data-theme="b" class="show-page-loading-msg" data-textonly="false" data-textvisible="true">Non</a>'
											   + '</div>'  
											+'</div>'
											
									+'</fieldset>'
                                +'</form>');
									
									        $("#popupConfirm").trigger("create");
											$("#popupConfirm").popup();
											$("#popupConfirm").popup("open");
											
											
											form.initializeEventPopup(form);
									
									
									}
								
					 });
				 
				       
				 
				 
				 
				 });
		 }
	   }
	});
	
	/*$(form.$synchronisation).click(function(){
	
	    DMS.Mobile.SynchronizeRequest.connexion = form.connexion;
		DMS.Mobile.SynchronizeRequest.SynchronizePropositionCommande(function(synchr)
				{  
					alert("La synchronisation est effectué avec succès");
				});
	});*/
	$(form.$synchronisation).click(function(){
	     $(form.$synchronisation).addClass("ui-disabled"); 
		 
		 DMS.Mobile.ArticleCommercialRequest.connexion = form.connexion;
		DMS.Mobile.ArticleCommercialRequest.SelectAllQuantiteArticleNotSynchronize(function(ListArticleCommercial){
		 if(ListArticleCommercial.length == 0 )
		 {
			 alert("Les données sont synchronisée");
			 $(form.$synchronisation).removeClass('ui-disabled');
		 }
		 else
		 {
		  MS.Mobile.Common.TestServer(function(AcceeServeur){
			
									if (AcceeServeur == true)
									{
											DMS.Mobile.SynchronizeRequest.connexion = form.connexion;
											DMS.Mobile.SynchronizeRequest.SynchronizeArticleCommercial(function(synchr)
													{  
														alert("La synchronisation est effectué avec succès");
													});
									}
									else
									{
										 alert("Pas d'accès serveur !!!");
										$(form.$synchronisation).removeClass('ui-disabled');
									}
								
					 });
					 
		 }
		});
	
	}); 
	
	
	$(form.$AnnulerRef).click(function(){
	     DMS.Mobile.Common.RedirectToCalendrier();
	});
	
	$(form.$back).click(function(){
	     DMS.Mobile.Common.RedirectToCalendrier();
	});
	
},

initializeEventPopup : function(form)
{
	$(".oui").click(function(){
	     DMS.Mobile.Common.RedirectToCalendrier();	
	});
	
	$(".non").click(function(){
	       $("#popupConfirm").popup("close");
	});
},


	
}