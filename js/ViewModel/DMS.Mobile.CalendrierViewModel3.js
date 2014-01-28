if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.CalendrierViewModel = {};

DMS.Mobile.CalendrierViewModel = 
{
	connexion : null,
	currentPage : 1,
	ListTournee : [],
	
	Init : function ()
	{
		try
		{
		//alert("init configuration");
			var form = this;
			DMS.Mobile.TourneeRequest.connexion = this.connexion;
			DMS.Mobile.TourneeRequest.SelectAll(function(listTournee){
			//	alert("listTournee length = "+listTournee.length);
				form.ListTournee = listTournee;
				form.initialize(form);});
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : init in CalendrierViewModel",'alert','e'); 
		}
		
	},
	
	initialize :function(form)
	{
	//	alert("initialize");
		//alert(form.ListTournee);
		var detailsPage = "<div data-role='page' id='dialog'>"
		  +"<div data-role='header' data-theme='b'>"
			+" <h1>D&eacute;tails mission</h1>"
			+"<a href='' data-role='button' data-inline='true' data-mini='true' data-icon='back' data-iconpos='left' id='back'>Retour</a>"
		   +"</div>"   
		   +"<div data-role='content' id='setdetails'>"
		   +"</div>"    
		   +"</div>";
		$("body").append(detailsPage);
		var currentDate = DMS.Mobile.Common.currentDate(); 
		var curr = new Date();
		for(var i=1;i<8;i++){
			var day = DMS.Mobile.Common.formatDate(new Date(curr.setDate(curr.getDate() - curr.getDay()+i)));
			if (currentDate == day)
			{
				form.currentPage = i;
			}
			var tournee = null;
			var indexTournee = null;
			for(var j = 0 ;j<form.ListTournee.length;j++)
			{
				if (form.ListTournee[j].DateDebut == day)
				{
					//alert("tounrée " + day);
					tournee = form.ListTournee[j];
					indexTournee = j;
					break;
				}
			}
			var page = '<div data-role="page" id="page'+i+'">';
			  page += '<div data-role="header" data-theme="b">';
			  page += ' <h1>Liste des missions du '+ day +'</h1>';
			  page += '<a href="#panelmenu" data-role="button" data-inline="true" data-mini="true" data-icon="home" data-iconpos="left">Menu</a>';
			  page += '<a class="startTournee ui-disabled" href="javascript:void(0);" data-role="button" data-inline="true" data-mini="true" data-icon="home" data-iconpos="left">Demarrer Tournée </a><input type="hidden" value="'+indexTournee+'"';
			  page += ' </div>';
			  page += ' <div data-role="content">';
			  // panel manu ---------------------------------------------------
		 
		page += '<div data-theme="c" data-display="overlay" data-position="left" id="panelmenu"'
		 +'data-role="panel" class="ui-panel ui-panel-position-left ui-panel-display-push ui-body-a ui-panel-animate ui-panel-open" >'
		+'<ul data-role="listview" data-theme="c" class="nav-search">'
               +'<li data-icon="edit"><a class="menu_formCommande" href="javascript:void(0);">Saisie commandes</a></li>'
               +'<li data-icon="page"><a class="menu_ListCommande" href="javascript:void(0);">Liste commandes</a></li>'
		+'</ul>'
		+'</div>';
			  page += '<ul data-role="listview">';
			  
			 
			  if (tournee != null && tournee.Missions.length>0){
				  
				  
				  
				  for(var k = 0 ;k <tournee.Missions.length;k++){
					  var Priorite = "";
				  var mission = tournee.Missions[k];
				  
				  
				   
				if(mission.DegreUrgence==DMS.Mobile.Constante.DegreUrgence.Normal){
				Priorite = "<img src='css/images/green.png' class='img'>";
				}
				if(mission.DegreUrgence==DMS.Mobile.Constante.DegreUrgence.Moyen){
					Priorite = "<img src='css/images/orange.png' class='img'>";
				}
				if(mission.DegreUrgence==DMS.Mobile.Constante.DegreUrgence.Eleve){
					Priorite = "<img src='css/images/red.png' class='img'>";
				}
					
					page += "<li  id='li"+mission.MissionID+"' data-icon='false'><a class='mission' href= 'javascript:void(0);'> "
					+"<img src='css/images/provider.png'>"
					+"<h2>Mission "+ k +"</h2>"
					+"<p>"+mission.TypeMissions.Titre+" </p></a>"
					+Priorite
					+"<input type='hidden' value='"+indexTournee+"'/><input type='hidden' value='"+k+"'/></li>"; 	 
					
				  }
			  }
		      page += '</ul>';
			  page += '</div>';
			  page += '<div data-role="footer" data-theme="b">';
			  page += '<div data-role="navbar" data-theme="b">';
			  page += '<ul>';
		      page += '<li><a class="previousDay" href="" data-role="button" data-icon="arrow-l" data-iconpos="right">Jour precedent</a></li>';
			  page += '	<li><a class="nextDay" href="" data-role="button" data-icon="arrow-r" data-iconpos="left">Jour suivant</a></li>';
			  page += '	</ul>';
			  page += '</div>';
			  page += '</div>';
		      page += '  </div>';
			  //alert(page);
			  try{
				  $("body").append(page);
				  form.InitButtonStartTournee(tournee,form,i);
			  }
			  catch(err)
				{
					alert(err);
				}
		}
		form.InitializeEvents(form);
	$.mobile.changePage('#page'+form.currentPage);
	  		
	},
	
	InitButtonStartTournee : function (tournee,form,indexPage)
	{
		
		//alert("tournee.EtatTournee " + tournee.EtatTournee + " index page " + indexPage);
		if (tournee != null && tournee.EtatTournee == DMS.Mobile.Constante.EtatTournee.NonDemaree && tournee.Missions.length>0)
		{

			$("#page" + indexPage + " .startTournee").removeClass("ui-disabled");
		}
	},
	
	InitializeEvents:function(form)
	{
		
		$(".previousDay").click(function(){
				$.mobile.changePage('#page'+(form.currentPage-1));
				form.currentPage--;
		});
		$(".nextDay").click(function(){
				$.mobile.changePage('#page'+(form.currentPage+1));
				form.currentPage++;
		});
		
		$(".startTournee").click(function(){
			
			var indexTournee = $(this).parent().find("input[type=hidden]:eq(0)").val();
			$(this).addClass("ui-disabled");
			form.updateEtatTournee(form,indexTournee);
			
		});
			
		$(".previousDay:eq(0)").addClass("ui-disabled");
		$(".nextDay:eq(6)").addClass("ui-disabled");
		
		$(".mission").click(function(){
				//alert($(this).parent().html());
				var indexTournee = $(this).parent().find("input[type=hidden]:eq(0)").val();
				var indexMission = $(this).parent().find("input[type=hidden]:eq(1)").val();
				form.ShowMissionDetails(indexTournee,indexMission,form);
		});
		
		$(".menu_ListCommande").click(function(){
				DMS.Mobile.Common.RedirectToListeCommandes();;
		});
		
		$(".menu_formCommande").click(function(){			 
				  DMS.Mobile.Common.RedirectToCommande();
		});
		
		$("#back").click(function(){
				$.mobile.changePage('#page'+ form.currentPage);
		});
		
			
	},
	
	updateEtatTournee :function (form,indexTournee){
		DMS.Mobile.TourneeRequest.UpdateTournee(DMS.Mobile.Constante.EtatTournee.EnCours,form.ListTournee[indexTournee].TourneeID,function(){
			
			form.ListTournee[indexTournee].EtatTournee = DMS.Mobile.Constante.EtatTournee.EnCours;
			});
	},
	
	ShowMissionDetails : function(indexTournee,IndexMission,form)
	{
		
		var EnumEtatMission = form.ListTournee[indexTournee].Missions[IndexMission].EtatMission;
			var EtatMissionToShow = null;
			
			switch (EnumEtatMission)
				{
				case DMS.Mobile.Constante.EtatMission.NonDemaree : EtatMissionToShow ="Non D\351mar\351e" ;
				break;
				case DMS.Mobile.Constante.EtatMission.EnCours : EtatMissionToShow ="En cours" ;
				break;
				case DMS.Mobile.Constante.EtatMission.Cloturee : EtatMissionToShow ="Cloture\351" ;
				break;
				case DMS.Mobile.Constante.EtatMission.Annulee : EtatMissionToShow ="Annulee\351" ;
				break;
				}
						
			var EnumEtatPointVente = form.ListTournee[indexTournee].Missions[IndexMission].PointVentes.EtatPointVente;
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
		
			var EnumEtatClient = form.ListTournee[indexTournee].Missions[IndexMission].PointVentes.Client.EtatClient;
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
	
		var details = ""
		+"<div data-role='collapsible-set'>"
		+"<div data-role='collapsible' data-theme='c' data-content-theme='d' data-collapsed-icon='plus' data-expanded-icon='minus' data-iconpos='right' data-inset='false' data-collapsed='false'>"
		   +"<h4>D\351tails Mission</h4>"
		   +"<ul  data-role='listview' data-inset='false'>"
			+"<li style='text-align:center;'><p class='parag'> "
			+"<br/>MissionID : " + form.ListTournee[indexTournee].Missions[IndexMission].MissionID
			+"<br/>Etat Mission : " + EtatMissionToShow
			+ "<br/> Date Cloture : " + form.ListTournee[indexTournee].Missions[IndexMission].DateCloture 
			+ "<br/> Commentaires : " + form.ListTournee[indexTournee].Missions[IndexMission].Commentaires 
			//+ "<br/> Type Mission : " + mission.TypeMissionID 
			+ "<br/> Type Mission : " + form.ListTournee[indexTournee].Missions[IndexMission].TypeMissions.Titre
			+"</p></li>"
			+"</ul></div>"
	
			+"<div data-role='collapsible' data-theme='c' data-content-theme='d' data-collapsed-icon='plus' data-expanded-icon='minus' data-iconpos='right' data-inset='false' >"
		   +"<h4>D\351tails Point Vente</h4>"
		   +"<ul  data-role='listview' data-inset='false'>"
			+"<li style='text-align:center;'><p class='parag'>"
			//+"ClientID : "+mission.PointVentes.ClientID
			+"<br/>Ville : "+form.ListTournee[indexTournee].Missions[IndexMission].PointVentes.Ville.Designation
			+"<br/>Etat PointVente : "+ EtatPointVenteToShow
			+"<br/>Responsable : "+form.ListTournee[indexTournee].Missions[IndexMission].PointVentes.Responsable
			+"<br/>Adresse : "+form.ListTournee[indexTournee].Missions[IndexMission].PointVentes.Adresse
			+"<br/>T\351l : "+form.ListTournee[indexTournee].Missions[IndexMission].PointVentes.Tel
			+"<br/>Fax : "+form.ListTournee[indexTournee].Missions[IndexMission].PointVentes.Fax
			+"<br/>Email : "+form.ListTournee[indexTournee].Missions[IndexMission].PointVentes.Email
			+"</p></li>"
			+"</ul></div>"
	
			
			+"<div data-role='collapsible' data-theme='c' data-content-theme='d' data-collapsed-icon='plus' data-expanded-icon='minus' data-iconpos='right' data-inset='false'>"
		   +"<h4>D\351tails Client</h4>"
		   +"<ul  data-role='listview' data-inset='false'>"
			+"<li style='text-align:center;'><p class='parag'>"
			//+"ClientID : "+mission.PointVentes.ClientID
			+"<br/>Nom Responsable : "+form.ListTournee[indexTournee].Missions[IndexMission].PointVentes.Client.NomResponsable
			+"<br/>Nom Soci\351te : "+form.ListTournee[indexTournee].Missions[IndexMission].PointVentes.Client.NomSociete
			+"<br/>Raison Sociale : "+form.ListTournee[indexTournee].Missions[IndexMission].PointVentes.Client.RaisonSocial
			+"<br/>T\351l : "+form.ListTournee[indexTournee].Missions[IndexMission].PointVentes.Client.Tel
			+"<br/>Fax : "+form.ListTournee[indexTournee].Missions[IndexMission].PointVentes.Client.Fax
			+"<br/>Site Web : <a>"+form.ListTournee[indexTournee].Missions[IndexMission].PointVentes.Client.UrlWeb+"</a>"
			+"<br/>Email : <a>"+form.ListTournee[indexTournee].Missions[IndexMission].PointVentes.Client.Email+"</a>"
			+"<br/>Activit\351 : "+form.ListTournee[indexTournee].Missions[IndexMission].PointVentes.Client.Activite.Designation
			+"<br/>Etat : "+ EtatClientToShow
			+"<br/>Image : "
			+"<br/><center><img src='css/images/Carrefour.png'/></center>"
			+"</p></li>"
			+"</ul></div>";
			
			var EnumTypeMission = form.ListTournee[indexTournee].Missions[IndexMission].TypeMissions.TypeMissionID;
			var ButtonToShow = "";
			
			switch (EnumTypeMission)
				{
				case DMS.Mobile.Constante.TypeMission.Facing :  ButtonToShow = "Facing";
				break;
				case DMS.Mobile.Constante.TypeMission.Commande :  ButtonToShow = "Formulaire commande";
				break;
				case DMS.Mobile.Constante.TypeMission.EspacePromo :  ButtonToShow = "Espace Promo";
				break;
				case DMS.Mobile.Constante.TypeMission.Livraison :  ButtonToShow = "Livraison";
				break;
				case DMS.Mobile.Constante.TypeMission.ParametragePV :  ButtonToShow = "Param\351trage PV";
				break;
				case DMS.Mobile.Constante.TypeMission.Recouvrement :  ButtonToShow = "Recouvrement";
				break;
				case DMS.Mobile.Constante.TypeMission.ReleveInventaire :  ButtonToShow = "Relev\351 Inventaire";
				break;
				case DMS.Mobile.Constante.TypeMission.RelevePresencePrixConc :  ButtonToShow = "Relev\351 Pr\351sence Prix Concurrentiel";
				break;
				case DMS.Mobile.Constante.TypeMission.RelevePrix :  ButtonToShow = "Relev\351 Prix";
				break;
				case DMS.Mobile.Constante.TypeMission.ReleveVenteConcu :  ButtonToShow = "Relev\351 Vente Concurrentiel";
				break;
						
				}
			
			if (form.ListTournee[indexTournee].EtatTournee == DMS.Mobile.Constante.EtatTournee.EnCours){		
			ButtonToShow = "<div class='cmdbtn' align='right'><a class='StartMission' href='#' data-role='button' data-inline='true' >"+ButtonToShow+"</a></div>";
			}else
			{ButtonToShow = "";}
				
				$.mobile.changePage('#dialog');
				$("#setdetails").html(details+ButtonToShow);
				$("#dialog").trigger('pagecreate');
				
				form.InitializeEventStartMission(form.ListTournee[indexTournee].Missions[IndexMission],form);
				
				
				
	},
	
	InitializeEventStartMission:function(mission,form)
	{
		$(".StartMission").unbind("click");
		$(".StartMission").click(function(){
				var EnumTypeMission = mission.TypeMissions.TypeMissionID;
				
				 var idMission = mission.MissionID;
	             var etat = DMS.Mobile.Constante.EtatMission.EnCours;
	             DMS.Mobile.MissionRequest.connexion = form.connexion;
				 DMS.Mobile.MissionRequest.UpdateMission(etat,idMission,function(){
	                      
						  
					switch (EnumTypeMission)
				{
				case DMS.Mobile.Constante.TypeMission.Facing :  
				break;
				case DMS.Mobile.Constante.TypeMission.Commande :  
				
					sessionStorage.setItem("missionToStart", JSON.stringify(mission));
					
					////////////////////////////////////
					
			        var PointVenteID =  mission.PointVenteID;
					
					DMS.Mobile.ClientRequest.connexion = form.connexion;
		            DMS.Mobile.ClientRequest.SelectAllClient(function(ListClient){
			    	//alert("after callback client");
			
					for(var i = 0; i<ListClient.length;i++)
					{
						for(var j = 0;j<ListClient[i].listPointVentes.length;j++)
						{
							if(ListClient[i].listPointVentes[j].PointVenteID == PointVenteID)
							{
								var indexPointVente = j;
								var indexClient = i;
								break;
							}
						}
						if(indexClient != null)
						{ 
						    break;
						}
						
					}
					
					//alert("indexClient = "+indexClient);
					//alert("indexPointVente = "+indexPointVente);
					sessionStorage.setItem("indexPointVente", JSON.stringify(indexPointVente));
					sessionStorage.setItem("indexClient", JSON.stringify(indexClient));
					DMS.Mobile.Common.RedirectToCommande();		
				
				});
					
					////////////////////////////////////
					
					//DMS.Mobile.Common.RedirectToCommande();
					break;
				case DMS.Mobile.Constante.TypeMission.EspacePromo :  
				break;
				case DMS.Mobile.Constante.TypeMission.Livraison :  
				break;
				case DMS.Mobile.Constante.TypeMission.ParametragePV :  
				break;
				case DMS.Mobile.Constante.TypeMission.Recouvrement :  
				break;
				case DMS.Mobile.Constante.TypeMission.ReleveInventaire :  
				break;
				case DMS.Mobile.Constante.TypeMission.RelevePresencePrixConc :  
				break;
				case DMS.Mobile.Constante.TypeMission.RelevePrix :  
				break;
				case DMS.Mobile.Constante.TypeMission.ReleveVenteConcu :  
				break;
						
				}
					
						  
				 });
			
			
		});
	}
}