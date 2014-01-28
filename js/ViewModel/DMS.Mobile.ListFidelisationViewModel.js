if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.ListFidelisationViewModel = {};

DMS.Mobile.ListFidelisationViewModel = 
{
	connexion : null,
	ListClient : null,
	
	$content : null,
	
	$formListFidelisation : null,
	$listFidelisation : null,
	$SelectClient  : null,
	$SelectGamme : null,
	$SelectFamille : null,
	$SelectArticle : null,
	
	filtredGamme:null,
	filtredFamille : null,
	filtredArticle : null,
	filtredClient : null,
	
	
	
	Init : function ()
	{
		
					var form = this;
					
			DMS.Mobile.PromotionRequest.connexion = this.connexion;
			DMS.Mobile.PromotionRequest.SelectAllClientFidelisation(function(listClientFidelisation){
				
				form.ListClient = form.filterCurrent(listClientFidelisation,form);
	            form.fillAllSelect(form.ListClient,form);    
				form.initializeEvent(form);
				form.initialize(form);
			});
	},
	
	filterCurrent : function(listClientFidelisation, form)
	{
		var currentDate = DMS.Mobile.Common.currentDate();
		var dateCourant = DMS.Mobile.Common.dateGet(currentDate);
		dateCourant.setHours(0,0,0,0);
		
		for(var i = 0; i<listClientFidelisation.length;i++)
		{
			var filtredFidelisation = new Array();
			nbrFidelisation = listClientFidelisation[i].listPromotions.length;
			
			for (var k = 0; k<nbrFidelisation;k++)
		   {
			var dateDebut = DMS.Mobile.Common.dateGet(listClientFidelisation[i].listPromotions[k].DateDebut);
			dateDebut.setHours(0,0,0,0);
			var dateFin = DMS.Mobile.Common.dateGet(listClientFidelisation[i].listPromotions[k].DateFin);
			dateFin.setHours(0,0,0,0);
			
			var compareDateDebut = DMS.Mobile.Common.compare(dateCourant,dateDebut);
			var compareDateFin = DMS.Mobile.Common.compare(dateCourant,dateFin);
			
			var datedebut = DMS.Mobile.Common.DateInverseSpliting(listClientFidelisation[i].listPromotions[k].DateDebut);
			var datefin = DMS.Mobile.Common.DateInverseSpliting(listClientFidelisation[i].listPromotions[k].DateFin);
			var datecourant = DMS.Mobile.Common.DateInverseSpliting(currentDate);
				
			var dateD = new Date(datedebut);
			var dateF = new Date(datefin);
			var dateC = new Date(datecourant);
			
			 if(((compareDateDebut == 1) || (compareDateDebut == 0)) &&(compareDateFin == -1))
			{
				filtredFidelisation.push(listClientFidelisation[i].listPromotions[k]);
			}
		   }
		   
		   listClientFidelisation[i].listPromotions = filtredFidelisation; 
		}
		return listClientFidelisation;
	},
	
	
	fillAllSelect:function(ListClient,form)
	{
          for(var k = 0; k<ListClient.length; k++)
		  {  				
				for(var i = 0;i<ListClient[k].listPromotions.length;i++)
				{
					for(var j = 0;j<ListClient[k].listPromotions[i].ListGamme.length;j++)
					{
						for(var h = 0;h<ListClient[k].listPromotions[i].ListGamme[j].ListFamilles.length;h++)
						{
							
							for(var e = 0;e<ListClient[k].listPromotions[i].ListGamme[j].ListFamilles[h].ListArticles.length;e++)
							{
								$(form.$SelectArticle).append('<option value="'+ListClient[k].listPromotions[i].ListGamme[j].ListFamilles[h].ListArticles[e].ArticleID+'">'+ListClient[k].listPromotions[i].ListGamme[j].ListFamilles[h].ListArticles[e].Designation+'</option>');
							}
							
							$(form.$SelectFamille).append('<option indexClient = "'+k+'" indexPromotion="'+i+'" indexGamme="'+j+'" indexFamille="'+h+'" value="'+ListClient[k].listPromotions[i].ListGamme[j].ListFamilles[h].FamilleID+'">'+ListClient[k].listPromotions[i].ListGamme[j].ListFamilles[h].Designation+'</option>');
						}
						$(form.$SelectGamme).append('<option indexClient = "'+k+'" indexPromotion="'+i+'" indexGamme="'+j+'" value="'+ListClient[k].listPromotions[i].ListGamme[j].GammeID+'">'+ListClient[k].listPromotions[i].ListGamme[j].Designation+'</option>');
					}
					
				}
				$(form.$SelectClient).append('<option indexClient = "'+k+'"  value="'+ListClient[k].ClientID+'">'+ListClient[k].NomSociete+'</option>');
		  }
	},
	
	
	
	initialize : function(form)
	{
		(form.$listFidelisation).html("");
		
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
		
		//**********
			var filtredList = form.ListClient;
		
		if (form.filtredClient!= null && form.filtredClient!="")
		{
			filtredList = form.FilterByClient(filtredList,form);
		}
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
		//**********
		
		var nbrClient = filtredList.length;
		for (var i = 0; i<nbrClient ; i++)
		{
			
			 var headerListClient = "";
			    headerListClient  +='<div class="ui-grid-a LigneClientFidelisation " >';
				headerListClient +=' <div id="" data-role="content" style="background-color:rgba(247, 86, 86, 0.87); margin-bottom:2px; width: 100%; height: 20px;" class="ui-block-a" >'	
		+'<h3 style="font-size: 13px; color: azure; margin-left:5px;margin-bottom: 3px;margin-top: 1px;"><center> '+filtredList[i].NomSociete+'</center> </h3>'
			//+'<input type="hidden" value="'+i+'"/>'					
			+'</div>';
			headerListClient  +='</div>';
			(form.$listFidelisation).append(headerListClient);
			(form.$formListFidelisation).trigger('pagecreate');
			
			
			var nbrPromotion = filtredList[i].listPromotions.length;
			for(var k = 0; k<nbrPromotion ; k++)
			{
				var dateDebut = DMS.Mobile.Common.dateGet(filtredList[i].listPromotions[k].DateDebut);
				dateDebut.setHours(0,0,0,0);
				var dateFin = DMS.Mobile.Common.dateGet(filtredList[i].listPromotions[k].DateFin);
				dateFin.setHours(0,0,0,0);
				
				var compareDateDebut = DMS.Mobile.Common.compare(dateCourant,dateDebut);
				var compareDateFin = DMS.Mobile.Common.compare(dateCourant,dateFin);
				
				var datedebut = DMS.Mobile.Common.DateInverseSpliting(filtredList[i].listPromotions[k].DateDebut);
				var datefin = DMS.Mobile.Common.DateInverseSpliting(filtredList[i].listPromotions[k].DateFin);
				var datecourant = DMS.Mobile.Common.DateInverseSpliting(currentDate);
					
				var dateD = new Date(datedebut);
				var dateF = new Date(datefin);
				var dateC = new Date(datecourant);
				
				
				var diff = DMS.Mobile.Common.dateDiff(dateC, dateF);
				var nbrDayDiff = (diff.day)+1;
				
				
				
			    var headerList = "";
			    headerList  +='<div class="ui-grid-a LigneFidelisation "  id=lignePro'+filtredList[i].listPromotions[k].PromotionID+'>';
			  
			  
			  headerList +=' <div id="" data-role="content" style="background-color:#B0DFF7; margin-bottom:2px; width: 20%; height: 20px;" class="promotionEvent ui-block-a" >'	
		+'<h3 style="font-size: 13px; margin-left:5px;margin-bottom: 3px;margin-top: 1px;"><center> '+filtredList[i].listPromotions[k].Designation+'</center> </h3>'
			//+'<input type="hidden" value="'+i+'"/>'
						
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
			
					(form.$listFidelisation).append(headerList);
					
					form.AddArticleToPromotion(filtredList[i].listPromotions[k],form);
			 (form.$formListFidelisation).trigger('pagecreate');
				
				
				form.ColorLigneFonction1(form,nbrDayDiff,"lignePro"+filtredList[i].listPromotions[k].PromotionID);
			}
			
			
			
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
		
	(form.$listFidelisation).append(html1);
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
		(form.$listFidelisation).append(html);
	},
	
	
		ColorLigneFonction1 : function(form,nbrDayDiff,ligneProID)
	{
		for (var i = 1 ;i<= nbrDayDiff;i++)
		{
			$("#"+ligneProID+" div:eq("+i+")").css("background-color","#FDB913");
		}
	},
	
	
	FilterByClient : function (ListClient,form)
	{
		var filtredList = new Array();
		for(var k = 0;k<ListClient.length;k++)
		{
			if(ListClient[k].ClientID == form.filtredClient)
			{
			      filtredList.push(ListClient[k]);
			}
			
		}
		return filtredList;
	},
	
	
	
	FilterByGamme : function (ListClient,form)
	{
		var filtredList = new Array();
		for(var k = 0;k<ListClient.length;k++)
		{
			var client = {};
			$.extend(client,ListClient[k]);
			client.listPromotions = [];
	     
		   for(var i = 0; i<ListClient[k].listPromotions.length;i++)
		   {
			   var promotion = {};
			   $.extend(promotion,ListClient[k].listPromotions[i]);
			   promotion.ListGamme = [];
					
					for(var j = 0;j<ListClient[k].listPromotions[i].ListGamme.length;j++)
					{
						if(ListClient[k].listPromotions[i].ListGamme[j].GammeID == form.filtredGamme)
						{
							promotion.ListGamme.push(ListClient[k].listPromotions[i].ListGamme[j]);
						}
					}
					if(promotion.ListGamme.length > 0)
					{
						client.listPromotions.push(promotion);
						
					}				
		   }
		   	if(client.listPromotions.length > 0)
			{
			      filtredList.push(client);
			}
			
		}
		return filtredList;
	},
	
   FilterByFamille : function (ListClient,form)
	{
		var filtredList = new Array();
		 
		for(var k = 0;k<ListClient.length;k++)
		{
			var client = {};
			$.extend(client,ListClient[k]);
			client.listPromotions = [];
			
				for(var i = 0;i<ListClient[k].listPromotions.length;i++)
				{
					var promotion = {};
					$.extend(promotion,ListClient[k].listPromotions[i]);
					promotion.ListGamme = [];
					for(var j = 0;j<ListClient[k].listPromotions[i].ListGamme.length;j++)
					{
						var gamme = {};
						$.extend(gamme,ListClient[k].listPromotions[i].ListGamme[j]);
						gamme.ListFamilles = [];
						for(var h = 0;h<ListClient[k].listPromotions[i].ListGamme[j].ListFamilles.length;h++)
						{
							if(ListClient[k].listPromotions[i].ListGamme[j].ListFamilles[h].FamilleID == form.filtredFamille)
							{
								gamme.ListFamilles.push(ListClient[k].listPromotions[i].ListGamme[j].ListFamilles[h]);
							}
						}
						if(gamme.ListFamilles.length > 0)
						{
							promotion.ListGamme.push(gamme);
						}
					}
					
					if(promotion.ListGamme.length > 0)
					{
						client.listPromotions.push(promotion);
						
					}
					
				}
				
			if(client.listPromotions.length > 0)
			{
				filtredList.push(client);
			}
		
		}
		return filtredList;
	},
	
	FilterByArticle : function (ListClient,form)
	{
		var filtredList = new Array();
			 
		for(var k = 0;k<ListClient.length;k++)
		{
			var client = {};
			$.extend(client,ListClient[k]);
			client.listPromotions = [];
					
				for(var i = 0;i<ListClient[k].listPromotions.length;i++)
				{
					var promotion = {};
					$.extend(promotion,ListClient[k].listPromotions[i]);
					promotion.ListGamme = [];
					for(var j = 0;j<ListClient[k].listPromotions[i].ListGamme.length;j++)
					{
						var gamme = {};
						$.extend(gamme,ListClient[k].listPromotions[i].ListGamme[j]);
						gamme.ListFamilles = [];
						for(var h = 0;h<ListClient[k].listPromotions[i].ListGamme[j].ListFamilles.length;h++)
						{
							var famille = {};
							$.extend(famille,ListClient[k].listPromotions[i].ListGamme[j].ListFamilles[h]);
							famille.ListArticles = [];
							for(var e = 0;e<ListClient[k].listPromotions[i].ListGamme[j].ListFamilles[h].ListArticles.length;e++)
							{
								if(ListClient[k].listPromotions[i].ListGamme[j].ListFamilles[h].ListArticles[e].ArticleID == form.filtredArticle)
								{
									famille.ListArticles.push(ListClient[k].listPromotions[i].ListGamme[j].ListFamilles[h].ListArticles[e]);
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
						client.listPromotions.push(promotion);
						
					}
					
				}
				
				if(client.listPromotions.length > 0)
				{
					filtredList.push(client);
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
		$("#synchroBtn").click(function(e){
		  //alert("synchronisation des listes des commandes ");
		  
		  DMS.Mobile.PositionRequest.connexion = form.connexion;
		  DMS.Mobile.CommandeRequest.connexion = form.connexion;
		  DMS.Mobile.TourneeRequest.connexion = form.connexion;
		 
		// DMS.Mobile.PositionRequest.SelectAllPositionNotSynchro(function(ListPosition){
		 DMS.Mobile.CommandeRequest.SelectAllCommandeNotSynchro(function(ListCommande){
		 DMS.Mobile.TourneeRequest.SelectAllTourneeNotSynchro(function(ListTournee){
			 
			// alert("nb pos = " +ListPosition.length+" nbr commande = "+ListCommande.length+" nbr tour = "+ListTournee.length);
			 var objectSynch = new Object();
			// objectSynch.ListPosition = ListPosition;
			 objectSynch.ListCommande = ListCommande;
			 objectSynch.ListTournee = ListTournee;
			 
			 var jsonText = JSON.stringify(objectSynch);
			// alert("object json = "+jsonText);
			 
			//jsonText = "{'ListPosition':[],'ListCommande':[{'CommandeID':31,'LignesCommande':[{'LigneCommandeID':9}]}],'ListTournee':[{'Missions':[{'MissionID':29}],'TourneeID':2}]}";
			 
			 form.synchronizeServer(form,jsonText,function(SuccessSynch){
			 // appel de la méthode de synchronisiation a partir de service, retourne "true" en cas de succees de             //sauvgarde dans la base de données serveur
			 
			// var SuccessSynch = true; 
			//alert("SuccessSynch : "+SuccessSynch);
			 if (SuccessSynch == "true")
			 {
				// alert("succes true");
				 // modifier le champ synch dans les tables synchroniser
			    form.ChangeSynch(form);
			 }
			 else
			 {
				 alert("La synchronisation n'est pas effectuée");
			 }
			 
			 });
			 
			 }); 
			 });	 
			// });
		 
		
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
				
				$(form.$SelectClient).val("");
				form.filtredClient = "";
				$(form.$SelectClient).selectmenu('disable');
			}else
			{
				
				$(form.$SelectFamille).selectmenu('enable');
				$(form.$SelectArticle).selectmenu('enable');
				$(form.$SelectClient).selectmenu('enable');
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
				
				$(form.$SelectClient).val("");
				form.filtredClient = "";
				$(form.$SelectClient).selectmenu('disable');
			}else
			{
				
				$(form.$SelectGamme).selectmenu('enable');
				$(form.$SelectArticle).selectmenu('enable');
				$(form.$SelectClient).selectmenu('enable');
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
				
				$(form.$SelectClient).val("");
				form.filtredClient = "";
				$(form.$SelectClient).selectmenu('disable');
			}else
			{
				
				$(form.$SelectGamme).selectmenu('enable');
				$(form.$SelectFamille).selectmenu('enable');
				$(form.$SelectClient).selectmenu('enable');
			}
			form.initialize(form);
		});
		
			$(form.$SelectClient).change(function(){
			form.filtredClient = $(this).val();
			if (form.filtredClient != "")
			{
				$(form.$SelectGamme).val("");
				form.filtredGamme = "";
				$(form.$SelectGamme).selectmenu('disable');
				
				$(form.$SelectFamille).val("");
				form.filtredFamille = "";
				$(form.$SelectFamille).selectmenu('disable');
				
				$(form.$SelectArticle).val("");
				form.filtredArticle = "";
				$(form.$SelectArticle).selectmenu('disable');
			}else
			{
				
				$(form.$SelectGamme).selectmenu('enable');
				$(form.$SelectFamille).selectmenu('enable');
				$(form.$SelectArticle).selectmenu('enable');
			}
			form.initialize(form);
		});
	},
		
}