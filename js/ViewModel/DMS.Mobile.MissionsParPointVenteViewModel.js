if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.MissionsParPointVenteViewModel = {};

DMS.Mobile.MissionsParPointVenteViewModel = 
{
	$MissionsContainer : null,
	$DetailsContainer : null,
	
	
	connexion: null,
	
	init : function ()
	{
		try
		{
		var form = this;
		var myTournee = new DMS.Mobile.Tournee();
		myTournee.TourneeID = 1;
		DMS.Mobile.MissionRequest.connexion = form.connexion;
		DMS.Mobile.MissionRequest.SelectMission(function(tournee){form.initialize(tournee,form);},myTournee);	
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : init in MissionParPointVenteViewModel",'alert','e'); 
			}
	},
		
	initialize : function(tournee,form){
		try
		{
		form.triListeMissions(tournee);
		form.insertMission(tournee,form);
		form.initializeEvents(tournee,form);
		}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : initialize in MissionParPointVenteViewModel",'alert','e'); 
			}
		
	},
	
	initializeEvents : function (tournee,form)
	{
		try
		{
		
		$('li').click(function(){
		var previous = $(this).closest('[data-role=page]');
		//alert($(previous).attr("id"));
		form.CurrentPageID = $(previous).attr("id");
		   var MissionId = $(this).attr('id');
		  MissionId = MissionId.substr(2,MissionId.length);
	   form.detailsMission(MissionId,form,tournee);
		 
		});
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : initializeEvents in MissionParPointVenteViewModel",'alert','e'); 
			}
		},
		
		triListeMissions : function(tournee){
			try
			{
			var obj =tournee.Missions;
			obj.sort(function(a,b) {
				 return a.DegreUrgence > b.DegreUrgence ? -1 : a.DegreUrgence < b.DegreUrgence ?  1 : 0; 
				 });
				 }
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : trilisteMissions in MissionParPointVenteViewModel",'alert','e'); 
			}
		},
				
	
	insertMission : function(tournee,form)
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

			
			
			var ul = $("<ul data-role='listview' data-inset='true'></ul>");
			var Priorite = "";
			var DegreUrgence = "";
			for (var i=0; i<tournee.Missions.length;i++){
				var mission =tournee.Missions[i];
				var h = i+1;
			
			if(mission.DegreUrgence==DMS.Mobile.Constante.DegreUrgence.Normal){
				Priorite = "<img src='css/images/green.png' class='img'>";
				DegreUrgence = "<span style='color:green;'>Normal</span>";
			}
			if(mission.DegreUrgence==DMS.Mobile.Constante.DegreUrgence.Moyen){
				Priorite = "<img src='css/images/orange.png' class='img'>";
				DegreUrgence = "<span style='color:orange;'>Moyen</span>";
			}
			if(mission.DegreUrgence==DMS.Mobile.Constante.DegreUrgence.Eleve){
				Priorite = "<img src='css/images/red.png' class='img'>";
				DegreUrgence = "<span style='color:red;'>Elev&eacute;</span>";
			}	
			
			var li = $("<li id='li"+mission.MissionID+"' data-icon='false'><a href='#dialog' data-rel='page' data-transition='pop' id='diagLink'>"
			+"<img src='css/images/shopping.png'>"
			+"<h2>Mission "+ h +"</h2>"
			+"<p>"+mission.TypeMissions.Titre+" </p><p>Mission ID : "+mission.MissionID+" </p><h2>Degr&eacute; d'urgence : "+DegreUrgence+"</h2></a>"
			+Priorite
			+"</li>");	
				
			
			 $(ul).append($(li)).trigger('create');
			   
			}
		$(this.$MissionsContainer).append($(ul)).trigger('create');
		 
		 }
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : insertMission in MissionParPointVenteViewModel",'alert','e'); 
			}
	},
	
	
	detailsMission : function(missionID,form,tournee)
	{
		try
		{
		var mission = null;
		
			for (var k=0;k<tournee.Missions.length;k++){
				
				if(tournee.Missions[k].MissionID==missionID)
				{
					mission = tournee.Missions[k];
					break;
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
			+ "<br/> Type Mission : " + mission.TypeMissions.Titre
			+"</p></li>"
			+"</ul></div>"
	
			+"<div data-role='collapsible' data-theme='c' data-content-theme='d' data-collapsed-icon='plus' data-expanded-icon='minus' data-iconpos='right' data-inset='false' >"
		   +"<h4>D\351tails Point Vente</h4>"
		   +"<ul  data-role='listview' data-inset='false'>"
			+"<li style='text-align:center;'><p class='parag'>"
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
				DMS.Mobile.Notification.ShowMessage(err.message+" : detailsMission in MissionParPointVenteViewModel",'alert','e'); 
			}
	},

	
	
}