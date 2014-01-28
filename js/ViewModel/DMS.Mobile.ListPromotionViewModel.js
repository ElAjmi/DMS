if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.ListPromotionViewModel = {};

DMS.Mobile.ListPromotionViewModel = 
{
	
	connexion : null,
	ListPromotion : null,
	
	$content : null,
	
	$formListPromotion : null,
	$listPromotion : null,
	$SelectGamme : null,
	$SelectFamille : null,
	$SelectArticle : null,
	
	filtredGamme:null,
	filtredFamille : null,
	filtredArticle : null,
	
		
Init : function ()
	{
		
					var form = this;
					
			DMS.Mobile.PromotionRequest.connexion = this.connexion;
	/*		DMS.Mobile.PromotionRequest.SelectAllClientFidelisation(function(listf){
				
				var fff= [];
				fff = listf;
				});*/
			
			DMS.Mobile.PromotionRequest.SelectAllPromotion(function(listPromotion){
				
				form.ListPromotion = form.filterCurrent(listPromotion,form);
				form.fillAllSelect(form.ListPromotion,form);
				form.initializeEvent(form);
				form.initialize(form);
			//	alert("length : "+form.ListPromotion.length);
				
				});
	},
	filterCurrent : function(listPromotion,form)
	{
		var filtredPromotion = new Array();
		var currentDate = DMS.Mobile.Common.currentDate();
		
		
		//alert(currentDate);
		//var date1 = new Date('2012-07-20');
		//alert (date1);
		var dateCourant = DMS.Mobile.Common.dateGet(currentDate);
		dateCourant.setHours(0,0,0,0);
		
		var nbrPromotion = listPromotion.length;
		for (var i = 0; i<nbrPromotion;i++)
		{
			var dateDebut = DMS.Mobile.Common.dateGet(listPromotion[i].DateDebut);
			dateDebut.setHours(0,0,0,0);
			var dateFin = DMS.Mobile.Common.dateGet(listPromotion[i].DateFin);
			dateFin.setHours(0,0,0,0);
			
			  //Retorune:
	  //   0 si date_1=date_2
  	  //   1 si date_1>date_2
	  //  -1 si date_1<date_2
			var compareDateDebut = DMS.Mobile.Common.compare(dateCourant,dateDebut);
			var compareDateFin = DMS.Mobile.Common.compare(dateCourant,dateFin);
			
			var datedebut = DMS.Mobile.Common.DateInverseSpliting(listPromotion[i].DateDebut);
			var datefin = DMS.Mobile.Common.DateInverseSpliting(listPromotion[i].DateFin);
			var datecourant = DMS.Mobile.Common.DateInverseSpliting(currentDate);
				
			var dateD = new Date(datedebut);
			var dateF = new Date(datefin);
			var dateC = new Date(datecourant);
			


			 if(((compareDateDebut == 1) || (compareDateDebut == 0)) &&(compareDateFin == -1))
			{
				filtredPromotion.push(listPromotion[i]);
			}
		
			
			 
		}
		return filtredPromotion;
	},
	
	fillAllSelect:function(ListPromotion,form)
	{
		for(var i = 0;i<ListPromotion.length;i++)
		{
			for(var j = 0;j<ListPromotion[i].ListGamme.length;j++)
			{
				for(var h = 0;h<ListPromotion[i].ListGamme[j].ListFamilles.length;h++)
				{
					
					for(var e = 0;e<ListPromotion[i].ListGamme[j].ListFamilles[h].ListArticles.length;e++)
					{
						$(form.$SelectArticle).append('<option value="'+ListPromotion[i].ListGamme[j].ListFamilles[h].ListArticles[e].ArticleID+'">'+ListPromotion[i].ListGamme[j].ListFamilles[h].ListArticles[e].Designation+'</option>');
					}
					
					$(form.$SelectFamille).append('<option indexPromotion="'+i+'" indexGamme="'+j+'" indexFamille="'+h+'" value="'+ListPromotion[i].ListGamme[j].ListFamilles[h].FamilleID+'">'+ListPromotion[i].ListGamme[j].ListFamilles[h].Designation+'</option>');
				}
				$(form.$SelectGamme).append('<option indexPromotion="'+i+'" indexGamme="'+j+'" value="'+ListPromotion[i].ListGamme[j].GammeID+'">'+ListPromotion[i].ListGamme[j].Designation+'</option>');
			}
			
		}
	},
	
	initialize : function(form)
	{
		(form.$listPromotion).html("");
		
		 var dateCourant = new Date();
		 var numCurrentDay = DMS.Mobile.Common.numDayInWeek(dateCourant);
		
		 var current = new Date();
		 
		 var year = DMS.Mobile.Common.formatDateYear(new Date(current.setDate(current.getDate() - current.getDay()+numCurrentDay)));
		 $("#date").html(year);
		 
		 var tabDay = [];
		 for (var k = 1; k< 8; k++)
		 {
			  var j = DMS.Mobile.Common.formatDateDayMonth(new Date(current.setDate(current.getDate() - current.getDay()+k)));
			  tabDay.push(j);
		 }
		 for (var y = 1; y< 8; y++)
		 {
			 var d = DMS.Mobile.Common.formatDateDayMonth(new Date(current.setDate(current.getDate() - current.getDay()+y)));
			 tabDay.push(d);
		 }
		 for (var z = 1; z< 8; z++)
		 {
			 var m = DMS.Mobile.Common.formatDateDayMonth(new Date(current.setDate(current.getDate() - current.getDay()+z)));
			 tabDay.push(m);
		 }
		 
		 
		 
		 
		 
		 
		 for (var a = 0; a< 7; a++)
		 {
	   var day1 = tabDay[(numCurrentDay-1)+a]
		 $("#J"+(a+1)).html(day1);
		 }
		 for (var b = 0; b< 7; b++)
		 {
		 var day2 = tabDay[((numCurrentDay-1)+7)+b]
		 $("#J"+(b+8)).html(day2);
		 }
		
		
		
		
		
		var currentDate = DMS.Mobile.Common.currentDate();
		var dateCourant = DMS.Mobile.Common.dateGet(currentDate);
		dateCourant.setHours(0,0,0,0);
		var filtredList = form.ListPromotion;
		
		if (form.filtredGamme != null && form.filtredGamme!="")
		{
			filtredList = form.FilterByGamme(filtredList,form);
		}
		if (form.filtredFamille != null && form.filtredFamille!="")
		{
			filtredList = form.FilterByFamille(filtredList,form);
		}
		if (form.filtredArticle != null && form.filtredArticle!="")
		{
			filtredList = form.FilterByArticle(filtredList,form);
		}
		
		var nbrPromotion = filtredList.length;
		for (var i = 0; i<nbrPromotion;i++)
		{
			var dateDebut = DMS.Mobile.Common.dateGet(filtredList[i].DateDebut);
			dateDebut.setHours(0,0,0,0);
			var dateFin = DMS.Mobile.Common.dateGet(filtredList[i].DateFin);
			dateFin.setHours(0,0,0,0);
			
			  //Retorune:
	  //   0 si date_1=date_2
  	  //   1 si date_1>date_2
	  //  -1 si date_1<date_2
			var compareDateDebut = DMS.Mobile.Common.compare(dateCourant,dateDebut);
			var compareDateFin = DMS.Mobile.Common.compare(dateCourant,dateFin);
			
			var datedebut = DMS.Mobile.Common.DateInverseSpliting(filtredList[i].DateDebut);
			var datefin = DMS.Mobile.Common.DateInverseSpliting(filtredList[i].DateFin);
			var datecourant = DMS.Mobile.Common.DateInverseSpliting(currentDate);
				
			var dateD = new Date(datedebut);
			var dateF = new Date(datefin);
			var dateC = new Date(datecourant);
			


			 
				
				
				var diff = DMS.Mobile.Common.dateDiff(dateC, dateF);
				var nbrDayDiff = (diff.day)+1;
				//alert(nbrDayDiff);
				
				
				 var headerList = "";
			// var backColor = null;
			  headerList  +='<div class="ui-grid-a LignePromotion "  id=lignePro'+filtredList[i].PromotionID+'>';
			  
			  
			  headerList +=' <div id="" data-role="content" style="background-color:#B0DFF7; margin-bottom:2px; width: 20%; height: 20px;" class="promotionEvent ui-block-a" >'	
		+'<h3 style="font-size: 13px; margin-left:5px;margin-bottom: 3px;margin-top: 1px;"><center> '+filtredList[i].Designation+'</center> </h3>'
			+'<input type="hidden" value="'+i+'"/>'
						
			+'</div>';

			headerList +=' <div id="" data-role="content"  style="margin-bottom:2px;  width: 5.7%; height: 19px;" class=" ui-block-b" >'	
			+'</div>';
			
			headerList +=' <div id="" data-role="content"  style=" margin-bottom:2px;  width: 5.7%; height: 19px;" class=" ui-block-c" >'	
			+'</div>';
			
			headerList +=' <div id="" data-role="content" style=" margin-bottom:2px;  width: 5.7%; height: 19px;" class=" ui-block-d" >'	
			+'</div>';
			
				headerList +=' <div id="" data-role="content" style="margin-bottom:2px;  width: 5.7%; height: 19px;" class=" ui-block-d" >'	
			+'</div>';
			
			headerList +=' <div id="" data-role="content" style=" margin-bottom:2px;  width: 5.7%; height: 19px;" class=" ui-block-d" >'	
			+'</div>';
			
			headerList +=' <div id="" data-role="content" style=" margin-bottom:2px;  width: 5.7%; height: 19px;" class=" ui-block-d" >'	
			+'</div>';
			
			headerList +=' <div id="" data-role="content" style=" margin-bottom:2px;  width: 5.7%; height: 19px;" class=" ui-block-d" >'	
			+'</div>';
			
			headerList +=' <div id="" data-role="content" style=" margin-bottom:2px;  width: 5.7%; height: 19px;" class=" ui-block-d" >'	
			+'</div>';
			
			headerList +=' <div id="" data-role="content" style=" margin-bottom:2px;  width: 5.7%; height: 19px;" class=" ui-block-d" >'	
			+'</div>';
			
			headerList +=' <div id="" data-role="content" style=" margin-bottom:2px;  width: 5.7%; height: 19px;" class=" ui-block-d" >'	
			+'</div>';
			
			headerList +=' <div id="" data-role="content" style=" margin-bottom:2px;  width: 5.7%; height: 19px;" class=" ui-block-d" >'	
			+'</div>';
			
			headerList +=' <div id="" data-role="content" style=" margin-bottom:2px;  width: 5.7%; height: 19px;" class=" ui-block-d" >'	
			+'</div>';
			
			headerList +=' <div id="" data-role="content" style=" margin-bottom:2px;  width: 5.7%; height: 19px;" class=" ui-block-d" >'	
			+'</div>';
			
			headerList +=' <div id="" data-role="content" style=" margin-bottom:2px;  width: 5.7%; height: 19px;" class=" ui-block-d" >'	
			+'</div>';
			
			headerList += '</div>';
			
					(form.$listPromotion).append(headerList);
					
					form.AddArticleToPromotion(filtredList[i],form);
			 (form.$formListPromotion).trigger('pagecreate');
				
				
				form.ColorLigneFonction1(form,nbrDayDiff,"lignePro"+filtredList[i].PromotionID);
			
			
			 
		}
	},
	
	AddArticleToPromotion : function(promotion,form)
	{
		var indice = 0;
		for(var ii= 0 ; ii<promotion.ListGamme.length ;ii++)
		{
				for(var jj = 0; jj< promotion.ListGamme[ii].ListFamilles.length ;jj++)
			    {
					indice++
				}
		}
		
			
		var html1 = '<div class="ui-grid-a" style="background-color: #B0DFF7;font-weight: bold; height: 22px;padding-top: 8px;">';
		if(indice == 1)
		{
		  html1 += '<div class="ui-block-a" style="width: 48%;margin-left: 7px;margin-right: 1px;">';
		    html1+='<div class="ui-grid-a">';
			html1+='		<div class="ui-block-a"><center>Designation</center></div>';
			html1+='		<div class="ui-block-b">';
			html1+='			<div class="ui-grid-a">';
			html1+='				<div class="ui-block-a"><center>Prix Unit HT</center></div>';
			html1+='				<div class="ui-block-b"><center>Prix Soldé</center></div>';
			html1+='			</div>';
			html1+='		</div>';
			html1+='</div>';
		  html1 += '</div>';
		}
		else
		{
		html1 += '<div class="ui-block-a" style="width: 48%;margin-left: 7px;margin-right: 1px;">';
		    html1+='<div class="ui-grid-a">';
			html1+='		<div class="ui-block-a"><center>Designation</center></div>';
			html1+='		<div class="ui-block-b">';
			html1+='			<div class="ui-grid-a">';
			html1+='				<div class="ui-block-a"><center>Prix Unit HT</center></div>';
			html1+='				<div class="ui-block-b"><center>Prix Soldé</center></div>';
			html1+='			</div>';
			html1+='		</div>';
			html1+='</div>';
		html1 += '</div>';
					
		html1 += '<div class="ui-block-b" style="width: 48%;margin-left: 7px;margin-right: 1px;">';
			html1+='<div class="ui-grid-a">';
			html1+='		<div class="ui-block-a"><center>Designation</center></div>';
			html1+='		<div class="ui-block-b">';
			html1+='			<div class="ui-grid-a">';
			html1+='				<div class="ui-block-a"><center>Prix Unit HT</center></div>';
			html1+='				<div class="ui-block-b"><center>Prix Soldé</center></div>';
			html1+='			</div>';
			html1+='		</div>';
			html1+='</div>';
		html1 += '</div>';
		}
		html1 += '</div>';
		
	(form.$listPromotion).append(html1);
		var html = '<div class="ui-grid-a" style="background-color: #B0DFF7;border-radius: 5px; margin-bottom:10px;padding-bottom: 7px;">';
		var inc = 0;
		for(var i= 0 ; i<promotion.ListGamme.length ;i++)
		{
		     //html += 
			
			for(var j= 0 ; j<promotion.ListGamme[i].ListFamilles.length ;j++)
			{ 
				if(inc%2==0)
				{
					html += '<div class="ui-block-a" style="background-color: cornsilk;border-radius: 5px; margin-bottom: 6px; width: 48%; margin-left: 7px;margin-right: 1px;">';
				}
				else
				{
					html += '<div class="ui-block-b" style="background-color: cornsilk;border-radius: 5px; margin-bottom: 6px; width: 48%; margin-left: 7px;margin-right: 1px;">';
				}
				///////traitement//////
				for(var h= 0 ; h<promotion.ListGamme[i].ListFamilles[j].ListArticles.length ;h++)
				{
					var article = promotion.ListGamme[i].ListFamilles[j].ListArticles[h];
					var prixAfterSold = (article.PrixUnitaireHT-parseFloat(promotion.Remise*article.PrixUnitaireHT)).toFixed(3);
					html+='<div class="ui-grid-a">';
                    html+='		<div class="ui-block-a"><center>'+article.Designation+'</center></div>';
					html+='		<div class="ui-block-b">';
					html+='			<div class="ui-grid-a">';
                    html+='				<div class="ui-block-a"><center>'+(article.PrixUnitaireHT).toFixed(3)+'</center></div>';
					html+='				<div class="ui-block-b"><center>'+prixAfterSold+'</center></div>';
                    html+='			</div>';
					html+='		</div>';
                    html+='</div>';

				}
				/////////
				html += '</div>';
				inc++;
			}
			
			/////
		}
		html += '</div>';
		(form.$listPromotion).append(html);
	},
	
	
	ColorLigneFonction1 : function(form,nbrDayDiff,ligneProID)
	{
		for (var i = 1 ;i<= nbrDayDiff;i++)
		{
			$("#"+ligneProID+" div:eq("+i+")").css("background-color","#FDB913");
		}
	},
	
	FilterByGamme : function (ListPromotion,form)
	{
		var filtredList = new Array();
		for(var i = 0;i<ListPromotion.length;i++)
		{
			var promotion = {};
			$.extend(promotion,ListPromotion[i]);
			promotion.ListGamme = [];
			for(var j = 0;j<ListPromotion[i].ListGamme.length;j++)
			{
				if(ListPromotion[i].ListGamme[j].GammeID == form.filtredGamme)
				{
					promotion.ListGamme.push(ListPromotion[i].ListGamme[j]);
				}
			}
			if(promotion.ListGamme.length > 0)
			{
				filtredList.push(promotion);
			}
			
		}
		return filtredList;
	},
	
	FilterByFamille : function (ListPromotion,form)
	{
		var filtredList = new Array();
		for(var i = 0;i<ListPromotion.length;i++)
		{
			var promotion = {};
			$.extend(promotion,ListPromotion[i]);
			promotion.ListGamme = [];
			for(var j = 0;j<ListPromotion[i].ListGamme.length;j++)
			{
				var gamme = {};
				$.extend(gamme,ListPromotion[i].ListGamme[j]);
				gamme.ListFamilles = [];
				for(var h = 0;h<ListPromotion[i].ListGamme[j].ListFamilles.length;h++)
				{
					if(ListPromotion[i].ListGamme[j].ListFamilles[h].FamilleID == form.filtredFamille)
					{
						gamme.ListFamilles.push(ListPromotion[i].ListGamme[j].ListFamilles[h]);
					}
				}
				if(gamme.ListFamilles.length > 0)
				{
					promotion.ListGamme.push(gamme);
				}
			}
			if(promotion.ListGamme.length > 0)
			{
				filtredList.push(promotion);
			}
			
		}
		return filtredList;
	},
	
	FilterByArticle : function (ListPromotion,form)
	{
		var filtredList = new Array();
		for(var i = 0;i<ListPromotion.length;i++)
		{
			var promotion = {};
			$.extend(promotion,ListPromotion[i]);
			promotion.ListGamme = [];
			for(var j = 0;j<ListPromotion[i].ListGamme.length;j++)
			{
				var gamme = {};
				$.extend(gamme,ListPromotion[i].ListGamme[j]);
				gamme.ListFamilles = [];
				for(var h = 0;h<ListPromotion[i].ListGamme[j].ListFamilles.length;h++)
				{
					var famille = {};
					$.extend(famille,ListPromotion[i].ListGamme[j].ListFamilles[h]);
					famille.ListArticles = [];
					for(var e = 0;e<ListPromotion[i].ListGamme[j].ListFamilles[h].ListArticles.length;e++)
					{
						if(ListPromotion[i].ListGamme[j].ListFamilles[h].ListArticles[e].ArticleID == form.filtredArticle)
						{
							famille.ListArticles.push(ListPromotion[i].ListGamme[j].ListFamilles[h].ListArticles[e]);
						}
					}
					if(famille.ListArticles.length > 0)
					{
						gamme.ListFamilles.push(famille);
					}
				}
				if(gamme.ListFamilles.length > 0)
				{
					promotion.ListGamme.push(gamme);
				}
			}
			if(promotion.ListGamme.length > 0)
			{
				filtredList.push(promotion);
			}
			
		}
		return filtredList;
	},
	
	initializeEvent : function(form)
	{
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
		$(".menu_ListArticleRepture").click(function(){
			
			DMS.Mobile.Common.RedirectToArticleEnRepture();
			});
			
				
			$(".menu_ListCommande").click(function(){
				DMS.Mobile.Common.RedirectToListeCommandes();
		});
		
		$(".menu_formCommande").click(function(){			 
				  DMS.Mobile.Common.RedirectToCommande();
		});
		
		$(".menu_galery").click(function(){			 
				  DMS.Mobile.Common.RedirectToGallery();
		});
		
		
		$(form.$SelectGamme).change(function(){
			form.filtredGamme = $(this).val();
			if (form.filtredGamme != "")
			{
				$(form.$SelectFamille).val("");
				form.filtredFamille = "";
				$(form.$SelectFamille).selectmenu('disable');
				$(form.$SelectArticle).val("");
				form.filtredArticle = "";
				$(form.$SelectArticle).selectmenu('disable');
			}else
			{
				
				$(form.$SelectFamille).selectmenu('enable');
				$(form.$SelectArticle).selectmenu('enable');
			}
			form.initialize(form);
		});
		
		$(form.$SelectFamille).change(function(){
			form.filtredFamille = $(this).val();
			if (form.filtredFamille != "")
			{
				$(form.$SelectGamme).val("");
				form.filtredGamme = "";
				$(form.$SelectGamme).selectmenu('disable');
				$(form.$SelectArticle).val("");
				form.filtredArticle = "";
				$(form.$SelectArticle).selectmenu('disable');
			}else
			{
				
				$(form.$SelectGamme).selectmenu('enable');
				$(form.$SelectArticle).selectmenu('enable');
			}
			form.initialize(form);
		});
		
		$(form.$SelectArticle).change(function(){
			form.filtredArticle = $(this).val();
			if (form.filtredArticle != "")
			{
				$(form.$SelectGamme).val("");
				form.filtredGamme = "";
				$(form.$SelectGamme).selectmenu('disable');
				$(form.$SelectFamille).val("");
				form.filtredFamille = "";
				$(form.$SelectFamille).selectmenu('disable');
			}else
			{
				
				$(form.$SelectGamme).selectmenu('enable');
				$(form.$SelectFamille).selectmenu('enable');
			}
			form.initialize(form);
		});
	},
	
	
			  
}