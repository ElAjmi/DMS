if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.ListArticleReptureViewModel = {};

DMS.Mobile.ListArticleReptureViewModel = 
{	
	connexion : null,
	ListArticle : [],
	seuilArticle : null,
	
	$content : null,
	$ButtonRetour : null,
	$listArticle : null,
	
	$formListArticleRepture : null,
	
	
Init : function ()
	{
		var Conf = JSON.parse(localStorage.getItem("Configuration"));	 
		this.seuilArticle = Conf.SeuilArticle;
		
		
				//----------------------------- pop up image Article --------------------//
		
			var panelLigneFacture = $(''
	+'<div data-role="popup"  id="popupDialogLArticle" >'
    +'<div data-role="content" data-theme="d" class="ui-corner-bottom ui-content" id="popupContenuLArticle">'
	+'</div></div>');
	
	$(panelLigneFacture).appendTo("body").trigger('create');		
		//------------------- fin pop up image Article ------------------//
		
			 
		
				var form = this;
			DMS.Mobile.ArticleRequest.connexion = this.connexion;
			
			DMS.Mobile.ArticleRequest.SelectAllArticles(function(listArticle){
				
				form.ListArticle = listArticle;
				
				form.initialize(form);
				
				});	
	},
	
	initialize : function(form)
	{
		
		var nbrArticle = form.ListArticle.length;
		for (var i = 0; i<nbrArticle;i++)
		{
			 var headerList = "";
			 var backColor = null;
			  headerList  +='<div class="ui-grid-a LigneArticle "  >';
			  
			if((form.ListArticle[i].QuantiteDisponible<form.seuilArticle)&&(form.ListArticle[i].QuantiteDisponible != 0))
			{
				headerList +=' <div id="" data-role="content"   style=" background-color:#F3C259; margin-bottom:2px; width: 19%;" class=" ui-block-a" >'	
			+'<h3 style="margin-left:5px;margin-bottom: 9px;margin-top: 8px;"><center> '+form.ListArticle[i].CodeArticle+'</center> </h3>'
			+'<input type="hidden" value="'+i+'"/>'
			//+'<input type="hidden" value="'+listFactureByMission[cpt].ResteAPayer+'"/>'			
			+'</div>';

			headerList +=' <div id="" data-role="content"  style="background-color:#F3C259; margin-bottom:2px;  width: 40%;" class=" ui-block-b" >'	
            +' <div ">'
			+'<h3 style="margin-left:5px;margin-bottom: 9px;margin-top: 8px;"><center> '+form.ListArticle[i].Designation+'</center> </h3>'
			+'</div>'
			+'</div>';
			
			headerList +=' <div id="" data-role="content"  style="background-color:#F3C259; margin-bottom:2px;  width: 19%;" class=" ui-block-c" >'	
            +' <div>'
			+'<h3 style="margin-left:5px;margin-bottom: 9px;margin-top: 8px;"><center> '+form.ListArticle[i].CAB+'</center> </h3>'
			+'</div>'
			+'</div>';
			
			headerList +=' <div id="" data-role="content" style="background-color:#F3C259; margin-bottom:2px;  width: 19%;" class=" ui-block-d" >'	
            +' <div>'
			+'<h3 style="margin-left:5px;margin-bottom: 9px;margin-top: 8px;"><center> '+form.ListArticle[i].QuantiteDisponible+' </center></h3>'
			+'</div>'
			+'</div>';
			}
			
			else if(form.ListArticle[i].QuantiteDisponible == 0)
			{
				headerList +=' <div id="" data-role="content"   style=" background-color:#EE1414; margin-bottom:2px; width: 19%;" class=" ui-block-a" >'	
			+'<h3 style="margin-left:5px;margin-bottom: 9px;margin-top: 8px;"><center> '+form.ListArticle[i].CodeArticle+'</center> </h3>'
			+'<input type="hidden" value="'+i+'"/>'
			//+'<input type="hidden" value="'+listFactureByMission[cpt].ResteAPayer+'"/>'			
			+'</div>';

			headerList +=' <div id="" data-role="content"  style="background-color:#EE1414; margin-bottom:2px;  width: 40%;" class=" ui-block-b" >'	
            +' <div ">'
			+'<h3 style="margin-left:5px;margin-bottom: 9px;margin-top: 8px;"><center> '+form.ListArticle[i].Designation+'</center> </h3>'
			+'</div>'
			+'</div>';
			
			headerList +=' <div id="" data-role="content"  style="background-color:#EE1414; margin-bottom:2px;  width: 19%;" class=" ui-block-c" >'	
            +' <div>'
			+'<h3 style="margin-left:5px;margin-bottom: 9px;margin-top: 8px;"><center> '+form.ListArticle[i].CAB+'</center> </h3>'
			+'</div>'
			+'</div>';
			
			headerList +=' <div id="" data-role="content" style="background-color:#EE1414; margin-bottom:2px;  width: 19%;" class=" ui-block-d" >'	
            +' <div>'
			+'<h3 style="margin-left:5px;margin-bottom: 9px;margin-top: 8px;"><center> '+form.ListArticle[i].QuantiteDisponible+' </center></h3>'
			+'</div>'
			+'</div>';
			}
			
			 
			
		//	headerList +=' <div id="" data-role="content" data-theme="e" style="background-color:#EAEAEA; margin-bottom:2px;  width: 19%;" class=" ui-block-d" >'	
        //    +' <div>'
		//	+'<h3 style="margin-left:5px;margin-bottom: 9px;margin-top: 8px;"><center> '+form.ListArticle[i].Quota+'</center></h3>'
		//	+'</div>'
		//	+'</div>';
			
		
			headerList += '</div>';
			
					(form.$listArticle).append(headerList);
			 (form.$formListArticleRepture).trigger('pagecreate');
			
		}
		 form.initializeEventLigneArticle(form);

	},
	
	initializeEventLigneArticle : function(form)
	{
		
		
		
		$(".menu_Synchronisation").click(function(){			 
				 
				  $(this).addClass('ui-disabled'); 
				  
				  DMS.Mobile.Common.connexion = form.connexion;
				  DMS.Mobile.Common.synchronizeAllData(function(){
					  
					  DMS.Mobile.Common.RedirectToArticleEnRepture();
					  
					  });
				 
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
		
		 $(".LigneArticle").bind("click",function(){
		 
		// alert($(this).parent().find("input[type=hidden]:eq(0)").val());
		 var indexArticle =  $(this).parent().find("input[type=hidden]:eq(0)").val();
		 var article = form.ListArticle[indexArticle];
		// alert("indexArticle : "+indexArticle);
		 //alert(article.Picture);
		 
		 $("#popupContenuLArticle").html(''
			+'<img class="popphoto" src="css/images/Carrefour.png" alt="Colorful city">');
		//+'<img width="200px" height="200px" src="data:application/octet-stream;base64,' + article.Picture.Byte+'" alt="'+article.Picture.Name+'" />');
			
			$("#popupDialogLArticle").trigger("create");
			$("#popupDialogLArticle").popup();
			
			$("#popupDialogLArticle").popup("open");
	/*	 if(article.Picture.Byte != null)
		 {
		    alert(article.Picture.Byte);
			
		 	$("#popupContenuLArticle").html(''
			+'<img class="popphoto" src="src="css/images/Carrefour.png" alt="Colorful city">');
		//+'<img width="200px" height="200px" src="data:application/octet-stream;base64,' + article.Picture.Byte+'" alt="'+article.Picture.Name+'" />');
			
			$("#popupDialogLArticle").trigger("create");
			$("#popupDialogLArticle").popup();
			
			$("#popupDialogLArticle").popup("open");
		 }*/
		 });
	}
}