if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.LivraisonViewModel = {};

DMS.Mobile.LivraisonViewModel = 
{
	connexion : null,
	ListLivraison : [],
	$LivraisonContainer:null,
	$SelectClient : null,
	$SelectPointVente : null,
	$SelectDate:null,
	
	filtredDate : null,
	filtredClient: null,
	filtredPointVente: null,
	
	
	Init:function()
	{
		var form = this;
		DMS.Mobile.LivraisonRequest.connexion = this.connexion;
		DMS.Mobile.LivraisonRequest.SelectAll(function(ListLivraison)
		{
			form.ListLivraison = ListLivraison;
			form.fillListDate(ListLivraison,form);
			form.Initialize(form);
		});
		
		DMS.Mobile.ClientRequest.connexion = this.connexion;
		DMS.Mobile.ClientRequest.SelectAllClient(function(ListClient)
		{
			form.fillSelectClient(ListClient,form);
			form.InitializeEvent(form,ListClient);
			
		});
	},
	
	Initialize:function(form)
	{
		$(form.$LivraisonContainer).html('<div class="ui-grid-a">'+
					 '<div id="" data-role="content" style=" margin-bottom:2px; width: 12%;" class=" ui-block-a" ><div  data-role="header" data-theme="b"><h4 style="font-size:12px; margin: 5px; !important">Code Livraison </h4></div></div><div id="" data-role="content" style=" margin-bottom:2px; width: 25%;" class=" ui-block-b" ><div  data-role="header" data-theme="b"><h4 style="font-size:12px; margin: 5px; !important">Adresse </h4></div></div><div id="" data-role="content" style=" margin-bottom:2px; width: 12%;" class=" ui-block-c" ><div  data-role="header" data-theme="b"><h4 style="font-size:12px; margin: 5px; !important">Ville </h4></div></div><div id="" data-role="content" style=" margin-bottom:2px; width: 12%;" class=" ui-block-d" ><div  data-role="header" data-theme="b"><h4 style="font-size:12px; margin: 5px; !important">Client </h4></div></div><div id="" data-role="content" style=" margin-bottom:2px; width: 12%;" class=" ui-block-e" ><div  data-role="header" data-theme="b"><h4 style="font-size:12px; margin: 5px; !important"> Date de Planification </h4></div></div><div id="" data-role="content" style=" margin-bottom:2px; width: 12%;" class=" ui-block-f" ><div  data-role="header" data-theme="b"><h4 style="font-size:12px; margin: 5px; !important"> Commande </h4></div></div><div id="" data-role="content" style=" margin-bottom:2px; width: 12%;" class=" ui-block-j" ><div  data-role="header" data-theme="b"><h4 style="font-size:12px; margin: 5px; !important">Etat </h4></div></div></div>');
					 
		var filtredList = form.ListLivraison;
		
		if (form.filtredClient != null && form.filtredClient!="")
		{
			filtredList = form.filtreByClient(filtredList,form);
		}
		if (form.filtredDate != null && form.filtredDate!="")
		{
			filtredList = form.filtreByDate(filtredList,form);
		}
		if (form.filtredPointVente != null && form.filtredPointVente!="")
		{
			filtredList = form.filtreByPointVente(filtredList,form);
		}
		
		for(var i = 0;i<filtredList.length;i++)
		{
			/*var html = ' <tr>'+
						 ' <th>'+filtredList[i].CodeLivraison+'</th>'+
						 ' <td>'+filtredList[i].DatePlanification+'</td>'+
						 ' <td>'+filtredList[i].CommandeID+'</td>'+
						 ' <td>'+filtredList[i].Etat+'</td>'+
						'</tr>';*/
			var etat = null;
			switch(filtredList[i].Etat)	
			{
				case 0 : etat = '<h4 style="font-size:12px;color:red; margin: 5px; !important">Encours </h4>';
				break;
				case 1 : etat = '<h4 style="font-size:12px;color:green; margin: 5px; !important">Livrée </h4>';
				break;
			}		
						
					 var html = '	<div class="ui-grid-a">'+
					 '<div id="" data-role="content" style=" margin-bottom:2px; width: 12%;" class=" ui-block-a" ><div  data-role="header" data-theme="e"><h4 style="font-size:12px; margin: 5px; !important"> '+filtredList[i].CodeLivraison+' </h4></div></div><div id="" data-role="content" style=" margin-bottom:2px; width: 25%;" class=" ui-block-b" ><div  data-role="header" data-theme="e"><h4 style="font-size:12px; margin: 5px; !important">'+filtredList[i].PointVentes.Adresse+' </h4></div></div><div id="" data-role="content" style=" margin-bottom:2px; width: 12%;" class=" ui-block-c" ><div  data-role="header" data-theme="e"><h4 style="font-size:12px; margin: 5px; !important">'+filtredList[i].PointVentes.Ville.Designation+' </h4></div></div><div id="" data-role="content" style=" margin-bottom:2px; width: 12%;" class=" ui-block-d" ><div  data-role="header" data-theme="e"><h4 style="font-size:12px; margin: 5px; !important">'+filtredList[i].PointVentes.Client.NomSociete+' </h4></div></div><div id="" data-role="content" style=" margin-bottom:2px; width: 12%;" class=" ui-block-e" ><div  data-role="header" data-theme="e"><h4 style="font-size:12px; margin: 5px; !important"> '+filtredList[i].DatePlanification+' </h4></div></div><div id="" data-role="content" style=" margin-bottom:2px; width: 12%;" class=" ui-block-f" ><div  data-role="header" data-theme="e"><h4 style="font-size:12px; margin: 5px; !important"> '+filtredList[i].CommandeID+' </h4></div></div><div id="" data-role="content" style=" margin-bottom:2px; width: 12%;" class=" ui-block-j" ><div  data-role="header" data-theme="e">'+etat+'</div></div></div>';
						
			$(form.$LivraisonContainer).append(html);
		}
		$("#page").trigger("pagecreate");
	},
	
	fillListDate:function(ListLivraison,form)
	{
		for(var i = 0;i<ListLivraison.length;i++)
		{
			var html = ' <option value="'+ListLivraison[i].DatePlanification+'">'+ListLivraison[i].DatePlanification+'</option>';
			$(form.$SelectDate).append(html);
		}
	},
	
	fillSelectClient:function(ListClient,form)
	{
		for(var i = 0;i<ListClient.length;i++)
		{
			var html = ' <option value="'+ListClient[i].ClientID+'" index="'+i+'">'+ListClient[i].NomSociete+'</option>';
			var a = $(form.$SelectClient);
			$(form.$SelectClient).append(html);
		}

	},
	
	fillSelectPointVente:function(ListClient,index,form)
	{
		
		$(form.$SelectPointVente).html('<option value="">Point de vente </option>');
		for(var i = 0;i<ListClient[index].listPointVentes.length;i++)
		{
			var html = ' <option value="'+ListClient[index].listPointVentes[i].PointVenteID+'">'+ListClient[index].listPointVentes[i].Adresse+'</option>';
			$(form.$SelectPointVente).append(html);
		}

	},
	
	InitializeEvent : function(form,ListClient)
	{
		$(form.$SelectDate).change(function(){
			form.filtredDate = $(this).val();
			form.Initialize(form);
		});
		
		$(form.$SelectClient).change(function(){
			form.filtredClient = $(this).val();
			if($(this).val()!= ""){
				var index = $(this).find(":selected").attr("index");
				$(form.$SelectPointVente).selectmenu('enable');
				form.fillSelectPointVente(ListClient,index,form);
			}
			else
			{
				$(form.$SelectPointVente).selectmenu('disable');
			}
			$(form.$SelectPointVente).trigger("create");
			form.Initialize(form);
		});
		
		$(form.$SelectPointVente).change(function(){
			if($(this).val()!="")
			{
				$(form.$SelectClient).selectmenu('disable');;
			}else
			{
				$(form.$SelectClient).selectmenu('enable');
			}
			$(form.$SelectClient).trigger("create");
			form.filtredPointVente = $(this).val();
			form.Initialize(form);
		});
		
						$(".menu_Synchronisation").click(function(){			 
				 
				  $(this).addClass('ui-disabled'); 
				  
				  DMS.Mobile.Common.connexion = form.connexion;
				  DMS.Mobile.Common.synchronizeAllData(function(){
					  
					  DMS.Mobile.Common.RedirectToLivraison();
					  
					  });
				 
		});
		
		$(".menu_ListArticleRepture").click(function(){
    
	DMS.Mobile.Common.RedirectToArticleEnRepture();

});

$(".menu_Reclamation").click(function(){

DMS.Mobile.Common.RedirectToReclamation();

});
	
		
		$(".menu-ListCommande").click(function(){
			
			DMS.Mobile.Common.RedirectToListeCommandes();
			});
        $(".menu-SaisieCommande").click(function(){
			
			DMS.Mobile.Common.RedirectToCommande();
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
	},
	
	filtreByDate : function (ListLivraison,form)
	{
		var filtredList = new Array();
		for(var i = 0;i<ListLivraison.length;i++)
		{
			if(ListLivraison[i].DatePlanification == form.filtredDate)
			{
				filtredList.push(ListLivraison[i]);
			}
		}
		return filtredList;
	},
	
	filtreByClient : function (ListLivraison,form)
	{
		var filtredList = new Array();
		for(var i = 0;i<ListLivraison.length;i++)
		{
			if(ListLivraison[i].ClientID == form.filtredClient)
			{
				filtredList.push(ListLivraison[i]);
			}
		}
		return filtredList;
	},
	
	filtreByPointVente : function (ListLivraison,form)
	{
		var filtredList = new Array();
		for(var i = 0;i<ListLivraison.length;i++)
		{
			if(ListLivraison[i].PointVenteID == form.filtredPointVente)
			{
				filtredList.push(ListLivraison[i]);
			}
		}
		return filtredList;
	}
}