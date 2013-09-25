if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.CalendrierViewModel = {};

DMS.Mobile.CalendrierViewModel = 
{
	$TourneeContainer : null,
	$DetailsContainer : null,
	
	
	CurrentPageID : null,
	connexion: null,
	
	init : function ()
	{
		try
		{
		
		var form = this;
		DMS.Mobile.TourneeRequest.connexion = this.connexion;
		
		DMS.Mobile.PositionRequest.connexion = this.connexion;
		//  alert("InitializeGetPosition");
		//DMS.Mobile.PositionRequest.InitializeGetPosition();
		
		DMS.Mobile.TourneeRequest.SelectAll(function(listTournee){form.initialize(listTournee,form);});
					}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : init in CalendrierViewModel",'alert','e'); 
			}
		},
		
	initialize : function(listTournee,form){
		try
		{
		form.rechercheTourneeSemaineEncours(listTournee,form);
		form.initializeEvents(listTournee,form);
				}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : initialize in CalendrierViewModel",'alert','e'); 
			}
	},
	
	initializeEvents : function (listTournee,form)
	{
		try
		{
		
		       $(document).on('swiperight', '[data-role="page"]', function(event){    
			if(event.handled !== true) // This will prevent event triggering more then once
			{
				var index =$(this).attr('id');
				//alert(index);
				var nextpage = $(this).next('[data-role="page"]');
				if ((index=="dialog")||(index=="page7")){nextpage="";}
				// swipe using id of next page if exists
				if (nextpage.length > 0) {
					$.mobile.changePage(nextpage, {transition: "slide", reverse: false}, true, true);
				}
				event.handled = true;
				
			}
			return false;         
		});

		$(document).on('swipeleft', '[data-role="page"]', function(event){   
			if(event.handled !== true) // This will prevent event triggering more then once
			{
				var index =$(this).attr('id');
				//alert(index);
				var prevpage = $(this).prev('[data-role="page"]');
				if ((index=="dialog")||(index=="page1")){prevpage="";}
				if (prevpage.length > 0) {
					$.mobile.changePage(prevpage, {transition: "slide", reverse: true}, true, true);
				}
				event.handled = true;
				
			}
			return false;            
		});
		 
		
		$('li').click(function(){
		var previous = $(this).closest('[data-role=page]');
		//alert($(previous).attr("id"));
		form.CurrentPageID = $(previous).attr("id");
		   var MissionId = $(this).attr('id');
		  MissionId = MissionId.substr(2,MissionId.length);
	   form.detailsMission(MissionId,form,listTournee);
		 
		});
		
		$(document).on('click','#back',function(e) { 
			$.mobile.changePage("#"+form.CurrentPageID, { 
			  transition: 'slide',
			  reverse: true });
			
			
		});
		
		
		 $(document).on('click','[data-role=button]',function(e) { 
			 var idTournee = $(this).attr("id");
			if(idTournee.substr(0,5)=="demar")
			 {
				 idTournee = idTournee.substr(5,idTournee.length);
				 var etat = DMS.Mobile.Constante.EtatTournee.EnCours;
				 DMS.Mobile.TourneeRequest.UpdateTournee(etat,idTournee);
				 var text ="D\351marrage de la tourn\351e "+idTournee+" !";
				 DMS.Mobile.Notification.ShowMessage(text,"info",'e');
				 
			 }
			e.preventDefault();
			});
			
			
		 $(document).on('click','[data-role=button]',function(e) { 
			 var idMission = $(this).attr("id");
			if(idMission.substr(0,8)=="redircmd")
			 {
				 idMission = idMission.substr(8,idMission.length);
				 var etat = DMS.Mobile.Constante.EtatMission.EnCours;
				 DMS.Mobile.MissionRequest.UpdateMission(etat,idMission);
				 var text ="D\351marrage de la mission "+idMission+"<br> Redirection vers le formulaire de commande ! ";
				 DMS.Mobile.Notification.ShowMessage(text,"info",'e');
			 }
			e.preventDefault();
			});
			
				}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : initializeEvents in CalendrierViewModel",'alert','e'); 
			}
	},
	
				
	
	insertTournee : function(ListTournees,form)
	{
		try
		{
		  var detailsmission =$("<div data-role='page' id='dialog'>"
		  +"<div data-role='header' data-theme='b'>"
			+" <h1>D&eacute;tails mission</h1>"
			+"<a href='#' data-role='button' data-rel='back' data-inline='true' data-mini='true' data-icon='back' data-iconpos='left' id='back'>Retour</a>"
		   +"</div>"   
		   +"<div data-role='content' id='setdetails'>"
		   +"</div>"    
		   +"</div>");
		   
	
	   $(detailsmission).appendTo("body");
	   
		for (var j=0; j<ListTournees.length;j++){	
			var tournee = ListTournees[j];
			var k= j+1;
			
			
			var page = $("<div data-role='page' data-content-theme='c' id='page"+k+"'>"
		  +"<div data-role='header' data-theme='b'>"
			+"<h1>Calendrier - Page "+k+"</h1>"
			+'<a href="#panelmenu" data-role="button" data-inline="true" data-mini="true" data-icon="home" data-iconpos="left">Menu</a>'
		  +"</div>"    
		 +"<div data-role='content'>"
		 
		 // panel manu ---------------------------------------------------
		 
		+'<div data-theme="c" data-display="overlay" data-position="left" id="panelmenu"'
		 +'data-role="panel" class="ui-panel ui-panel-position-left ui-panel-display-push ui-body-a ui-panel-animate ui-panel-open" >'
		+'<ul data-role="listview" data-theme="c" class="nav-search">'
            +'<li data-icon="delete" data-theme="e"><a href="#" data-rel="close">Fermer menu</a></li>'
               +'<li data-icon="edit"><a href="FormulaireCommande.html">Saisie commandes</a></li>'
               +'<li data-icon="page"><a href="Commande.html">Liste commandes</a></li>'
                +'<li data-icon="calendar"><a href="Calendrier2.html">Calendrier</a></li> ' 
		+'</ul>'
		+'</div>'
		//-------------------------------------------------------------------- 
		 
			+"<div id='setdate"+k+"' align='center'></div>"
			+"<div id='tablemissions"+k+"'></div>"
			+"<div align='right'><a href='#' data-role='button' data-inline='true' data-icon='check' data-iconpos='right' data-theme='b' id='demar"+tournee.TourneeID+"'>D&eacute;marrer</a></div>"
		
		+"</div>" 
		+"</div>");
		
	
		
		$(page).appendTo("body");
			
			
			var ul = $("<ul data-role='listview' data-inset='true'></ul>");
			var Priorite = "";
			for (var i=0; i<tournee.listMission.length;i++){
				var mission = tournee.listMission[i];
				var h = i+1;
			
			if(mission.DegreUrgence==DMS.Mobile.Constante.DegreUrgence.Normal){
				Priorite = "<img src='css/images/green.png' class='img'>";
			}
			if(mission.DegreUrgence==DMS.Mobile.Constante.DegreUrgence.Moyen){
				Priorite = "<img src='css/images/orange.png' class='img'>";
			}
			if(mission.DegreUrgence==DMS.Mobile.Constante.DegreUrgence.Eleve){
				Priorite = "<img src='css/images/red.png' class='img'>";
			}
			
			var li = $("<li id='li"+mission.MissionID+"' data-icon='false'><a href='#dialog' data-rel='page' data-transition='pop' id='diagLink'>"
			+"<img src='css/images/provider.png'>"
			+"<h2>Mission "+ h +"</h2>"
			+"<p>"+mission.TypeMissions.Titre+" </p></a>"
			+Priorite
			+"</li>");	
				
			
			 $(ul).append($(li)).trigger('create');
			   
			}
		$("#tablemissions"+k).append($(ul));
		$("#setdate"+k).html("<h3>"+DMS.Mobile.Dates.Days(DMS.Mobile.Dates.SplitDate(tournee.DateDebut))+", "+tournee.DateDebut+"</h3>");
		
		
		
		}
		 $.mobile.changePage('#page1');  
		 		}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : insertTournee in CalendrierViewModel",'alert','e'); 
			}
	},
	
	
	detailsMission : function(missionID,form,listTournee)
	{
		try
		{
		alert(missionID);
		var mission = null;
		for(var i=0;i<listTournee.length;i++){
			for (var k=0;k<listTournee[i].listMission.length;k++){
				
				if(listTournee[i].listMission[k].MissionID==missionID)
				{
					mission = listTournee[i].listMission[k];
					break;
				}
			}
		}
		
		var EnumEtatMission = mission.EtatMission;
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
						
			var EnumEtatPointVente = mission.PointVentes.EtatPointVente;
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
		
			var EnumEtatClient = mission.PointVentes.Client.EtatClient;
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
			+"<br/>MissionID : " + mission.MissionID
			+"<br/>Etat Mission : " + EtatMissionToShow
			+ "<br/> Date Cloture : " + mission.DateCloture 
			+ "<br/> Commentaires : " + mission.Commentaires 
			//+ "<br/> Type Mission : " + mission.TypeMissionID 
			+ "<br/> Type Mission : " + mission.TypeMissions.Titre
			+"</p></li>"
			+"</ul></div>"
	
			+"<div data-role='collapsible' data-theme='c' data-content-theme='d' data-collapsed-icon='plus' data-expanded-icon='minus' data-iconpos='right' data-inset='false' >"
		   +"<h4>D\351tails Point Vente</h4>"
		   +"<ul  data-role='listview' data-inset='false'>"
			+"<li style='text-align:center;'><p class='parag'>"
			//+"ClientID : "+mission.PointVentes.ClientID
			+"<br/>Ville : "+mission.PointVentes.Ville.Designation
			+"<br/>Etat PointVente : "+ EtatPointVenteToShow
			+"<br/>Responsable : "+mission.PointVentes.Responsable
			+"<br/>Adresse : "+mission.PointVentes.Adresse
			+"<br/>T\351l : "+mission.PointVentes.Tel
			+"<br/>Fax : "+mission.PointVentes.Fax
			+"<br/>Email : "+mission.PointVentes.Email
			+"</p></li>"
			+"</ul></div>"
	
			
			+"<div data-role='collapsible' data-theme='c' data-content-theme='d' data-collapsed-icon='plus' data-expanded-icon='minus' data-iconpos='right' data-inset='false'>"
		   +"<h4>D\351tails Client</h4>"
		   +"<ul  data-role='listview' data-inset='false'>"
			+"<li style='text-align:center;'><p class='parag'>"
			//+"ClientID : "+mission.PointVentes.ClientID
			+"<br/>Nom Responsable : "+mission.PointVentes.Client.NomResponsable
			+"<br/>Nom Soci\351te : "+mission.PointVentes.Client.NomSociete
			+"<br/>Raison Sociale : "+mission.PointVentes.Client.RaisonSocial
			+"<br/>T\351l : "+mission.PointVentes.Client.Tel
			+"<br/>Fax : "+mission.PointVentes.Client.Fax
			+"<br/>Site Web : <a>"+mission.PointVentes.Client.UrlWeb+"</a>"
			+"<br/>Email : <a>"+mission.PointVentes.Client.Email+"</a>"
			+"<br/>Activit\351 : "+mission.PointVentes.Client.Activite.Designation
			+"<br/>Etat : "+ EtatClientToShow
			+"<br/>Image : "
			+"<br/><center><img src='css/images/Carrefour.png'/></center>"
			+"</p></li>"
			+"</ul></div>";
			
			var EnumTypeMission = mission.TypeMissions.TypeMissionID;
			var ButtonToShow = "";
			
			switch (EnumTypeMission)
				{
				case DMS.Mobile.Constante.TypeMission.Facing :  ButtonToShow = "<div class='cmdbtn' align='right'><a id='redircmd"+mission.MissionID+"' href='#' data-role='button' data-inline='true' >Facing</a></div>";
				break;
				case DMS.Mobile.Constante.TypeMission.Commande :  ButtonToShow = "<div class='cmdbtn' align='right'><a id='redircmd"+mission.MissionID+"' href='#' data-role='button' data-inline='true' >Formulaire commande</a></div>";
				break;
				case DMS.Mobile.Constante.TypeMission.EspacePromo :  ButtonToShow = "<div class='cmdbtn' align='right'><a id='redircmd"+mission.MissionID+"' href='#' data-role='button' data-inline='true' >Espace Promo</a></div>";
				break;
				case DMS.Mobile.Constante.TypeMission.Livraison :  ButtonToShow = "<div class='cmdbtn' align='right'><a id='redircmd"+mission.MissionID+"' href='#' data-role='button' data-inline='true' >Livraison</a></div>";
				break;
				case DMS.Mobile.Constante.TypeMission.ParametragePV :  ButtonToShow = "<div class='cmdbtn' align='right'><a id='redircmd"+mission.MissionID+"' href='#' data-role='button' data-inline='true' >Param\351trage PV</a></div>";
				break;
				case DMS.Mobile.Constante.TypeMission.Recouvrement :  ButtonToShow = "<div class='cmdbtn' align='right'><a id='redircmd"+mission.MissionID+"' href='#' data-role='button' data-inline='true' >Recouvrement</a></div>";
				break;
				case DMS.Mobile.Constante.TypeMission.ReleveInventaire :  ButtonToShow = "<div class='cmdbtn' align='right'><a id='redircmd"+mission.MissionID+"' href='#' data-role='button' data-inline='true' >Relev\351 Inventaire</a></div>";
				break;
				case DMS.Mobile.Constante.TypeMission.RelevePresencePrixConc :  ButtonToShow = "<div class='cmdbtn' align='right'><a id='redircmd"+mission.MissionID+"' href='#' data-role='button' data-inline='true' >Relev\351 Pr\351sence Prix Concurrentiel</a></div>";
				break;
				case DMS.Mobile.Constante.TypeMission.RelevePrix :  ButtonToShow = "<div class='cmdbtn' align='right'><a id='redircmd"+mission.MissionID+"' href='#' data-role='button' data-inline='true' >Relev\351 Prix</a></div>";
				break;
				case DMS.Mobile.Constante.TypeMission.ReleveVenteConcu :  ButtonToShow = "<div class='cmdbtn' align='right'><a id='redircmd"+mission.MissionID+"' href='#' data-role='button' data-inline='true' >Relev\351 Vente Concurrentiel</a></div>";
				break;
						
				}
			
			
				$("#setdetails").html($(details+ButtonToShow)).trigger('create');
		 
			 		}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : detailsMission in CalendrierViewModel",'alert','e'); 
			}
	},
	
	rechercheTourneeParDate : function(listTournee,form,DateDebut,DateFin)
	{
		try
		{
		var ListTourneeByDate =[];					
		for (var i=0;i<listTournee.length;i++){
			
			var tournee = listTournee[i];
			dd1=DateDebut.split('-').reverse().join('');
			dd2=tournee.DateDebut.split('/').reverse().join('');
			df1=DateFin.split('-').reverse().join('');
			df2=tournee.DateDebut.split('/').reverse().join('');
			
			// test tournee entre 2 dates
			if((dd2>=dd1)&&(df2<=df1))
			{
				ListTourneeByDate.push(tournee);
			}
		}
		if (ListTourneeByDate.length==0){
			DMS.Mobile.Notification.ShowMessage("Aucune Tourn\351e pour cette date !","alert",'e');
		}
		else{form.insertTournee(ListTourneeByDate,form);}
				}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : rechercheTourneeParDate in CalendrierViewModel",'alert','e'); 
			}
	},
	
		
	
	
	
	
	rechercheTourneeSemaineEncours : function(listTournee,form)
	{
		try
		{
		var curr = new Date();
		var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()+1));
		var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay()+7));
		//alert("first day : "+firstday+"last day : "+lastday);
		var DateDebutEC = DMS.Mobile.Dates.Dayformat(firstday);
		var DateFinEC = DMS.Mobile.Dates.Dayformat(lastday);
		//alert("DateDebut : "+DateDebutEC+" DateFin : "+DateFinEC);
		form.rechercheTourneeParDate(listTournee,form,DateDebutEC,DateFinEC);
				}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : rechercheTourneeSemaineEncours in CalendrierViewModel",'alert','e'); 
			}
	}	
	
}