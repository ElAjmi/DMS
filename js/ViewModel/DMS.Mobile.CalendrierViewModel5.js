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
	
		//alert("init configuration");
			var form = this;
			
			//DMS.Mobile.PositionRequest.InitializeGetPosition();
			
			DMS.Mobile.TourneeRequest.connexion = this.connexion;
			DMS.Mobile.TourneeRequest.SelectAll(function(listTournee){
				//alert("listTournee length = "+listTournee.length);
				form.ListTournee = listTournee;
				form.initialize(form);});
		
		
	},
	
	initialize :function(form)
	{
		//alert("initialize");
		//alert(form.ListTournee);
		
		
		//----------------------------- pop up porposition cmd --------------------//
		var panelPropCMD = $(''
		
		<!-- popup proposition commande-->
 +'<div data-role="popup" id="popupPropCmd" style="width: 502px;height: 520px;"  class="ui-corner-all">'
    +'<div data-role="content" data-theme="d" style="height: 302px;" class="ui-corner-bottom ui-content" id="popupContentPropCmd">'
+'</div></div>');
	
	$(panelPropCMD).appendTo("body");//.trigger('create');	
		//------------------- fin pop up porposition cmd ------------------//
		
		
		
		//----------------------------- pop up ligne facture --------------------//
		
			var panelLigneFacture = $(''
	+'<div data-role="popup"  id="popupDialogLFacture"  style="width:445px; height: 500px;">'
    +'<div data-role="content" data-theme="d" style="height: 302px;" class="ui-corner-bottom ui-content" id="popupContenuLFacture">'
	+'</div></div>');
	
	$(panelLigneFacture).appendTo("body").trigger('create');		
		//------------------- fin pop up ligne facture ------------------//
		
		
		
				   ///----------------- page facture ---------------------///
	     var pageFacture = '<div data-role="page" id="pageFacture">';
	        
							  // panel menu ---------------------------------------------------
		pageFacture += '<div data-theme="c" data-display="overlay" data-position="left" id="panelmenu"'
		 +'data-role="panel" class="ui-panel ui-panel-position-left ui-panel-display-push ui-body-a ui-panel-animate ui-panel-open" >'
		+'<ul data-role="listview" data-theme="c" class="nav-search">'
               +'<li data-icon="edit"><a class="menu_formCommande" href="javascript:void(0);">Saisie commandes</a></li>'
               +'<li data-icon="page"><a class="menu_ListCommande" href="javascript:void(0);">Liste commandes</a></li>'
			    +'<li data-icon="page"><a class="menu_ListArticleRepture1" href="javascript:void(0);">Articles en repture</a></li>'
				 +'<li data-icon="page"><a class="menu_SynchFacture" href="javascript:void(0);">Synchroniser facture</a></li>'
				 
			    +'<li data-icon="page"><a class="menu_galery" href="javascript:void(0);">Gallery articles</a></li>'
				
				+'<li data-icon="page"><a class="menu_Synchronisation1" href="#">Synchronisation</a></li>'
			   +'<li data-icon="page"><a href="javascript:void(0);" class="btnSeDeconnecter" >Se deconnecter</a></li>'
		+'</ul>'
		+'</div>'; //fin panel menu----------------------------------------------------
			
			//content-------------------------------------------------------------------
			 // pageFacture +='<div  style="background: #FFF !important;">';
	         
			 
			 // f content --------------------------
	          //header---------------------------------------------------------------------
			  pageFacture += '<div style="margin-bottom:10px" data-role="header"  data-theme="b" >';
			  ///page += ' <h1>Tournee de '+JourString+'</h1>';
			  pageFacture += ' <h3 style="size:40px;  !important">';
              pageFacture += 'Factures non réglées';
			  pageFacture += '</h3>'; 

			  //pageFacture +='<div class="ui-btn-left" data-role="controlgroup" data-type="horizontal">';
			  pageFacture += '<a href="#panelmenu" data-role="button" data-inline="true" data-mini="true" data-icon="home" data-iconpos="left">Menu</a>';
			 //pageFacture +='</div>';
			  
			  //pageFacture +='<div class="ui-btn-right" data-role="controlgroup" data-type="horizontal">';
			  pageFacture +='<a  href="#" data-rel="back" data-inline="true" class ="retour" data-mini="true"  data-icon="back">Retour</a>'; 
			
              //pageFacture +='</div>';
			 
			  pageFacture += ' </div>';
			  	 
			  //fin header --------------------------------------------------------------
			pageFacture += '<div data-role="content">';  
			
            
			
			pageFacture +='<div class="ui-grid-a">';
			
			 pageFacture +=' <div id="" data-role="content" style=" margin-bottom:2px; width: 19%;" class=" ui-block-a" >'	
            +' <div  data-role="header" data-theme="b">'
			+'<h4 style="font-size:16px; margin: 5px; !important"> N° Facture </h4>'
			+'</div>'
			+'</div>';
			
			
			pageFacture +=' <div id="" data-role="content" style=" margin-bottom:2px;  width: 19%;" class=" ui-block-b" >'	
            +' <div  data-role="header" data-theme="b">'
			+'<h4 style="font-size:16px; margin: 5px; !important"> Montant NET </h4>'
			+'</div>'
			+'</div>';
			
			
			pageFacture +=' <div id="" data-role="content" style=" margin-bottom:2px;  width: 19%;" class=" ui-block-c" >'	
            +' <div  data-role="header" data-theme="b">'
			+'<h4 style="font-size:16px; margin: 5px; !important"> Date Facture </h4>'
			+'</div>'
			+'</div>';
			
			pageFacture +=' <div id="" data-role="content" style=" margin-bottom:2px;  width: 19%;" class=" ui-block-d" >'	
            +' <div  data-role="header" data-theme="b">'
			+'<h4 style="font-size:16px; margin: 5px; !important"> Reste a payer </h4>'
			+'</div>'
			+'</div>';
			
			pageFacture +=' <div id="" data-role="content" style=" margin-bottom:2px;  width: 19%;" class=" ui-block-d" >'	
            +' <div  data-role="header" data-theme="b">'
			+'<h4 style="font-size:16px; margin: 5px; !important"> Taux escompte </h4>'
			+'</div>'
			+'</div>';
			
			 pageFacture += '</div>';
			 pageFacture += '<div class="listArticle" >'; 
			 pageFacture += '</div>';
			
			

					 
					 
					 
					 
					 
					 
     		 pageFacture +='</div>';
			 //--------------------- fin content -----------------//
			 pageFacture +='</div>';
			 //------------------- fin page facture ----------------//
			
			$("body").append(pageFacture);
			form.initEventPageFacture(form);
			
		
		
		
		
		
		//-------------- page calendrier----------//
		var calenderWeek = '<div data-role="page" id="dialog">'
		+'<div  style="background: #FFF !important;">'
		//------ header page -------//
		  /*+'<div data-role="header" data-theme="b">'
			+' <h1>Semaine</h1>'
			+'<a href="" data-role="button" data-inline="true" data-mini="true" data-icon="back" data-iconpos="left" id="back">Retour</a>'
		   +'</div>'   */
		 //------- fin header page -------//
		 //-------- content page ---------//
		   //+'<div data-role="content" style="background: #FFF !important;">'
		   
		   //-------------- header calendar --------------//
		   +'<div id="headerCalendar" class="coin" data-role="header" style="background: #0C0 !important; border:1px solid #0C0;">'
		   +' <h1>  </h1>'
		   +'<a href="" data-role="button" data-theme="b" data-inline="true" data-mini="true" data-icon="back" data-iconpos="left" id="back">Retour</a>'
		   +'</div>'
		   //----------------- fin header calendar---------------//


		   
		   
		   
		   //------------------ contenu calendrier ------------------//
		   +'<div style="border:solid 3px #0C0; ">'
		   	
			+'<div class="ui-grid-a" style="margin-top: 17px;margin-left: 20px;">'
        
		   // ----------- block lundi----------//
           +' <div id="divLundi" data-role="content"  style=" margin-right:9px; ;  width: 22%;" class="coin ui-block-a" >'	
            +' <div  data-role="header" data-theme="e" style="border:1px solid #F3A42E;" >'
			+'<h2> Lundi </h2>'
			+'</div>'
			+' <div  id="lundi" style="border:solid 3px #F7C942; margin-bottom:5px;">'
			+'<ul style="list-style:none; margin-left:0; padding-left:0;">'
			+'</ul>'
           +' </div>'
			+'</div>'
           
		   //--------------- block mardi---------//
            +'<div id="divMardi" data-role="content" style=" margin-right:9px; width: 22%;" class="coin ui-block-b" >'
       	   +'<div  data-role="header" data-theme="e"  style="border:1px solid #F3A42E;" >'
		   +'<h2> Mardi</h2>'
		   +'</div>'
		   +'<div id="mardi" style="border:solid 3px #F7C942; margin-bottom:5px;">'
			+'<ul style="list-style:none; margin-left:0; padding-left:0;">'
			+'</ul>'
           +' </div>'
           +' </div>'
            
			//------------------- block mercredi--------//
            +'<div id="divMercredi" data-role="content" style=" margin-right:9px; width: 22%;" class="coin ui-block-c" > '
            +'<div  data-role="header" data-theme="e" style=" border:1px solid #F3A42E;">'
			+'<h2> Mercredi</h2>'
			+'</div>'
			+'<div id="mercredi" style="border:solid 3px #F7C942; margin-bottom:5px;">'
			+'<ul style="list-style:none; margin-left:0; padding-left:0;">'
			+'</ul>'
            +'</div>'
            +'</div>'
			
			
			//----------- block jeudi------------//
			 +'<div id="divJeudi" data-role="content" style=" margin-right:9px; width: 22%;" class="coin ui-block-d" >	'
             +'<div  data-role="header" data-theme="e" style="border:1px solid #F3A42E;">'
			 +'<h2> Jeudi</h2>'
			+' </div>'
			+' <div id="jeudi" style="border:solid 3px #F7C942; margin-bottom:5px;">'
			+'<ul style="list-style:none; margin-left:0; padding-left:0;">'
			+'</ul>'
           +' </div>'
            +'</div>'
			
			
           +'</div>'
		   
		   
		   +'<div class="ui-grid-b" style="margin-top: 17px;margin-left: 20px;">'
		   //------------- block vendredi------------//
            +'<div id="divVendredi" data-role="content" style="margin-right:9px; width: 22%;" class="coin ui-block-e" >'
       	   +' <div  data-role="header" data-theme="e" style="border:1px solid #F3A42E;">'
			+'<h2> Vendredi </h2>'
			+'</div>'
			+'<div id="vendredi" style="border:solid 3px #F7C942; margin-bottom:5px;">'
			+'<ul style="list-style:none; margin-left:0; padding-left:0;">'
			+'</ul>'
			+'</div>'
           +' </div>'
            
			
			//----------------- block samedi----------//
            +'<div id="divSamedi" data-role="content" style=" margin-right:9px; width: 22%;" class="coin ui-block-e" > '
           +' <div  data-role="header" data-theme="e" style="border:1px solid #F3A42E;">'
			+'<h2> Samedi</h2>'
			+'</div>'
			+'<div id="samedi" style="border:solid 3px #F7C942; margin-bottom:5px;">'
			+'<ul style="list-style:none; margin-left:0; padding-left:0;">'
			+'</ul>'
            +'</div>'
            +' </div>'
		
		    //----------------- block dimanche----------//	
	/*		+'<div id="divDimanche" data-role="content" style=" margin-right:9px; width: 22%;" class="coin ui-block-e"> '
            +'<div  data-role="header" data-theme="e" style="border:1px solid #F3A42E;">'
			+'<h2> Dimanche </h2>'
			+'</div>'
			+'<div  id="dimanche" style="border:solid 3px #F7C942; margin-bottom:5px;">'
			+'<ul style="list-style:none; margin-left:0; padding-left:0;">'
			+'</ul>'
           +' </div>'
            +'</div>'*/
			
			
			+'</div>'
            
		+'</div>'
		   // ---------------- fin contenu calendrier--------//
		   
		   +'</div>'    
		   //------------- fin content page ------------//
		   
		   +'</div>';
		   //---------- fin page ----------//
		$("body").append(calenderWeek);
		
		
		var currentDate = DMS.Mobile.Common.currentDate(); 
		var current = new Date();
		var curr = new Date();
		var currentJour = new Date();
		for(var i=1;i<7;i++){
		
			var day = DMS.Mobile.Common.formatDate(new Date(curr.setDate(curr.getDate() - curr.getDay()+i)));
			var JourString = DMS.Mobile.Common.getJour(new Date(currentJour.setDate(currentJour.getDate() - currentJour.getDay()+i)));
			var DateString = DMS.Mobile.Common.getDateCalender(new Date(current.setDate(current.getDate() - current.getDay()+i)));
			
			if(i==1)
			{
			  var firstDayWeek = day
			}
			
			if(i==6)
			{
			  var lastDayWeek = day
			}
			
			
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
			// page----------------------------------------------------------------------
			var page = '<div data-role="page" id="page'+i+'">';
					  
					  // panel menu ---------------------------------------------------
		page += '<div data-theme="c" data-display="overlay" data-position="left" id="panelmenu"'
		 +'data-role="panel" class="ui-panel ui-panel-position-left ui-panel-display-push ui-body-a ui-panel-animate ui-panel-open" >'
		+'<ul data-role="listview" data-theme="c" class="nav-search">'
               +'<li data-icon="edit"><a class="menu_formCommande" href="javascript:void(0);">Saisie commandes</a></li>'
               +'<li data-icon="page"><a class="menu_ListCommande" href="javascript:void(0);">Liste commandes</a></li>'
			   +'<li data-icon="page"><a class="menu_ListArticleRepture" href="javascript:void(0);">Articles en repture</a></li>'
			  // +'<li data-icon="page"><a class="menu_ListPromotion" href="javascript:void(0);">Liste promotion</a></li>'
			   	  //  +'<li data-icon="page"><a class="menu_ListFidelisation" href="javascript:void(0);">Liste Fidelisation</a></li>'
			      +'<li data-icon="page"><a class="menu_Reclamation" href="javascript:void(0);">Liste réclamation</a></li>'
				  
			    +'<li data-icon="page"><a class="menu_galery" href="javascript:void(0);">Gallery articles</a></li>'
				 +'<li data-icon="page"><a class="menu_livraison" href="javascript:void(0);">Livraison</a></li>'
				  +'<li data-icon="page"><a class="menu_Synchronisation" href="javascript:void(0);">Synchronisation</a></li>'
				 
			   +'<li data-icon="page"><a href="javascript:void(0);" class="btnSeDeconnecter" >Se deconnecter</a></li>'
		+'</ul>'
		+'</div>'; //fin panel menu----------------------------------------------------
			
			 //content-------------------------------------------------------------------
			  page +='<div  style="background: #FFF !important;">';
			  
			  			
			
			//header---------------------------------------------------------------------
			  page += '<div data-role="header"  style="background: #E80000 !important;  border:1px solid #E80000;" class="coin">';
			  ///page += ' <h1>Tournee de '+JourString+'</h1>';
			 // page += ' <h1 style="font-size:40px; margin: auto; !important"> '+JourString;
			  page += ' <h1 style="font-size:40px; margin: auto; !important"> ';
			  page +=  '<div class="ui-grid-a">';
			  page += '<div class="ui-block-a"  >';
			  page += '<div style="float:right;">';
			  page += ''+JourString;
			  page += '</div>';
			  page += '</div>';
			  page += '<div class="ui-block-b"  >';
			  page += '<div style="float:left;">';
			  page += '<img class="WeekTurn" src="css/images/calendar.png" style="margin-left: 21px;margin-top: 8px;"/>';
			  page += '</div>';
			  page += '</div>';
			  page +='</div>';
			  page += '</h1>'; 
			  page += '<h4 style="font-size:14px; margin: auto; !important">'+DateString+'</h4>';
			  page +='<div class="ui-btn-left" data-role="controlgroup" style="margin-top: 11px;" data-type="horizontal">';
			  page += '<a href="#panelmenu" data-role="button" data-theme="b" data-inline="true" data-mini="true" data-icon="home" data-iconpos="left">Menu</a>';
			  page += '<a href="#" class="previousDay" data-role="button" data-theme="b" data-inline="true" data-mini="true" data-icon="arrow-l">Préc<a/>';
			  page +='</div>';
	
			 
		    	

			  page +='<div class="ui-btn-right" data-role="controlgroup" style="margin-top: 11px;" data-type="horizontal">';
			  page +='<a  class="nextDay" href="#" data-role="button" data-theme="b" data-inline="true" data-mini="true"  data-icon="arrow-r" data-iconpos="right">Suiv</a>'; 
			  page += '<a  href="#" class="propositionCMD" data-role="button" data-theme="b data-inline="true" data-mini="true">Proposition commande</a>';
              page +='</div>';
			 
			  page += ' </div>';
			  	 
			  //fin header --------------------------------------------------------------
			  
	

				
		  
		    ///page += '<div class="coin" data-role="header" style="background: #E80000 !important;">';
			///	 page += ' <h1> '+DateString+' </h1>';
          ///  page += '<a href="#" class="previousDay" data-role="button" data-inline="true" data-mini="true" >Previous</a>';
			///page += '<a  class="nextDay" href="#" data-role="button" data-inline="true" data-mini="true">Next</a>'; 
		
			///page += '</div>';
			page += '<div style="border:solid 3px #E80000; ">';
			var indexPointVente = null;
		         if (tournee != null && tournee.ListPointVentes.length>0){
		          for(var k = 0 ;k <tournee.ListPointVentes.length;k++){
					// var Priorite = "";
				  var pointVente = tournee.ListPointVentes[k];
	               indexPointVente = k;
	    
	
	     // remplissage de calendrier d'une semaine
		 var detailClient ='';
		 nomClient = pointVente.Client.NomSociete;
		 codeClient = pointVente.Client.CodeClient;
		 var adrrPV = pointVente.Adresse;
		 var adressePV = adrrPV.split(','); 
		 var gouver = adressePV[0];		

		 detailClient = '<li style="margin-bottom:5px; background-color:#DFD8DB"><p class="parag"><h5>Code client : '+codeClient+'</br>Nom client : '+nomClient+'</h5></p></li>';
	       if (i == 1)
	       {     
		        $("#lundi ul").append(detailClient);
	       }
		    if (i == 2)
	       {
		        $("#mardi ul").append(detailClient);
	       }
		    if (i == 3)
	       {
		        $("#mercredi ul").append(detailClient);
	       }
		   if (i == 4)
	       {
		        $("#jeudi ul").append(detailClient);
	       }
		    if (i == 5)
	       {
		        $("#vendredi ul").append(detailClient);
	       }
		    if (i == 6)
	       { 
		        $("#samedi ul").append(detailClient);
	       }
		/*   if (i == 7)
	       {
			   
		        $("#dimanche ul").append(detailClient);
	       }*/
	 
	
	        var testPV = false;
	        for (var di = 0; di<pointVente.ListMissions.length;di++)
			  {
				 var EnumTypeMission = pointVente.ListMissions[di].TypeMissions.TypeMissionID;
				   if(EnumTypeMission == DMS.Mobile.Constante.TypeMission.Recouvrement)
				   {
					   
					 
						 for(var ri = 0; ri<pointVente.ListMissions[di].ListFacture.length;ri++)
						 {
							if((pointVente.ListMissions[di].ListFacture[ri].EtatFacture) == (DMS.Mobile.Constante.EtatFacture.NonReglee))
							{
						 
					        testPV = true;
					       break;
						   break;
							}
							
						 }
				   }
			  }
			  
			
			var pictureToShow ="";
			if(testPV  == true)
			{
				//pictureToShow='<img class="reglement" src="css/images/cercle-rouge-icone.png"/>';
				pictureToShow ='<a style="color:red; text-decoration:none; " href="#" class="reglement" >Reglement</a>';
				//pictureToShow+='<input type="hidden" value="'+nbrMissionRegelement+'"/>';
				pictureToShow+='<input type="hidden" value="'+indexTournee+'"/>';
				pictureToShow+='<input type="hidden" value="'+indexPointVente+'"/>';
			}
		//	else
		//	{ 
		//	    pictureToShow='<img class="noReglement" src="css/images/cercle-vert-icone.png"/>';
		//		pictureToShow+='<input type="hidden" value="'+nbrMissionRegelement+'"/>';
		//	}
			  
			  page +='<div data-role="collapsible-set" data-theme="e" style="margin-right:12px; margin-left:12px;">';
		      page +='<div data-role="collapsible" data-theme="e" data-content-theme="d" data-collapsed-icon="arrow-r"                      data-expanded-icon="arrow-d" data-iconpos="left" data-collapsed="true">';
		      page +='<h2>';
			     // bouton passer commande
			  page +='<div style="float:right;  margin-left:12px;" >';
			  page +='<a href="#" class="passerCommande" >Commande</a>';
			  page +='<input type="hidden" value="'+indexTournee+'"/><input type="hidden" value="'+k+'"/>';
			  page +='</div>';
			  page +='<div style="float:right;" >';
			  page +=pictureToShow;
			  page +='</div>';
			
			  
			  // fin boutton
			 // page +='<div class="header"><u>Code client : </u>'+pointVente.Client.CodeClient+'     <u>Nom client : </u>'+pointVente.Client.NomSociete+'</center></div>';
			  page +='Code client : '+pointVente.Client.CodeClient+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nom client : '+pointVente.Client.NomSociete+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gouvernorat : '+gouver;
			  /*page +='<div class="subheader">';
			  // error </a>
			  page +='<p>Telephone : '+pointVente.Tel+' </p>';//</a>';
			  page +='<p>Nom responsable : '+pointVente.Responsable+'</p>';//</a>';
			  page +='<input type="hidden" value="'+indexTournee+'"/><input type="hidden" value="'+k+'"/>'; 
			  page +='</div>';*/
			  page +='</h2>';

			  
			 
		   	var EnumEtatPointVente = pointVente.EtatPointVente;
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
		
			var EnumEtatClient = pointVente.Client.EtatClient;
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
					  
					  
					  
	//*	   page +='<div data-role="collapsible" data-theme="c" data-content-theme="d" data-collapsed-icon="plus" data-expanded-icon="minus" data-iconpos="left" data-collapsed="false" data-inset="true">';
	//*	   page +='<h4>D\351tails Client</h4>';
	//*	   page +='<ul  data-role="listview" data-inset="false">';
	//*	   page +='<li style="text-align:center;"><p class="parag">';
			//+"ClientID : "+mission.PointVentes.ClientID
			
			page +='<div class="ui-grid-b">';
			
			page +='<div class="ui-block-a">';
		    page += '<p class="parag">';
			page +='<br/><strong><u>Details Client : </u></strong>';
			page +='<br/>';
			page +='<br/>';
			page +='<br/><strong>Nom Responsable : </strong>'+pointVente.Client.NomResponsable;
			page +='<br/><strong>Nom Soci\351te : </strong>'+pointVente.Client.NomSociete;
			page +='<br/><strong>Raison Sociale : </strong>'+pointVente.Client.RaisonSocial;
			page +='<br/><strong>Telephone : </strong>'+pointVente.Client.Tel;
			page+='<br/><strong>Fax : </strong>'+pointVente.Client.Fax;
			page +='<br/><strong>Site Web : </strong><a>'+pointVente.Client.UrlWeb+'</a>';
			page +='<br/><strong>Email : </strong><a>'+pointVente.Client.Email+'</a>';
			page +='<br/><strong>Activite : </strong>'+pointVente.Client.Activite.Designation;
			page +='<br/><strong>Etat : </strong>'+ EtatClientToShow;
			//page +='<br/>Image : ';
			//page +='<br/><center><img src="css/images/Carrefour.png"/></center>';
	//*		page +='</p></li>';
	//*		page +='</ul></div>';	
	        page +='</p>';
			page +='</div>';
			
			
		    page +='<div class="ui-block-b" style="float:right">';
					  

    //*        page +='<div data-role="collapsible" data-theme="c" data-content-theme="d" data-collapsed-icon="plus" data-expanded-icon="minus" data-collapsed="false" data-iconpos="left" data-inset="true" >';
	//*	   page +='<h4>D\351tails Point Vente</h4>';
	//**	   page +='<ul  data-role="listview" data-inset="false">';
	//*		page +='<li style="text-align:center;"><p class="parag">';
			//+"ClientID : "+mission.PointVentes.ClientID
	
	        page +='<p class="parag">';
			page +='<br/><strong><u>Details point de vente : </u></strong>';
			page +='<br/>';
			page +='<br/>';
			page +='<br/><strong>Ville : </strong>'+pointVente.Ville.Designation;
			page +='<br/><strong>Etat PointVente : </strong>'+ EtatPointVenteToShow;
			page +='<br/><strong>Responsable : </strong>'+pointVente.Responsable;
			page +='<br/><strong>Adresse : </strong>'+pointVente.Adresse;
			page +='<br/><strong>Telephone : </strong>'+pointVente.Tel;
			page +='<br/><strong>Fax : </strong>'+pointVente.Fax;
			page +='<br/><strong>Email : </strong>'+pointVente.Email;
	        page +='</p>';
			page +='</div>';
			
			page +='</div>';
			
		//	var mediaPath1 = 'file:///mnt/sdcard/Images/pointvente/';
		//	var mediaPath2 = 'file:///mnt/sdcard/Images/client/';
			
		//	var html = '<li><a href="http://192.168.1.100:4000/Images/article/'+listPicture[i].Name+'" rel="external">'
		//alert("byte");
		//alert(pointVente.Picture);
		
			page += '<div class="ui-grid-a">';
			page +='<div class="ui-block-a">';
			if(pointVente.Client.Picture !=null)
		{
			//alert(pointVente.Client.Picture.Byte);
				page+='<center><img width="150px" height="150px" src="data:application/octet-stream;base64,' + pointVente.Client.Picture.Byte+'" alt="'+pointVente.Client.Picture.Name+'" /></center>';
		}
			page +='</div>';
			page +='<div class="ui-block-b">';
		if(pointVente.Picture !=null)
		{
			//alert(pointVente.Picture.Byte);	
				page+='<center><img width="150px" height="150px" src="data:application/octet-stream;base64,' + pointVente.Picture.Byte+'" alt="'+pointVente.Picture.Name+'" /></center>';
		}
			page +='</div>';
            page +='</div>';
			
		
			
		//	page +='<center><img src="css/images/Carrefour.png"/></center>';
			
	//*		page +='</p></li>';
	//*		page +='</ul></div>';
	
			  page +='</div>';
			  page +='</div>' ;
									
				  }
			  }
		      page += '</div>';
			  page += '</div>';
			  // fin content--------------------------------------------------------------------
			  
			  // footer-------------------------------------------------------------------------
			//  page += '<div data-role="footer" data-theme="b">';
			/*  page += '<div data-role="navbar" data-theme="b">';
			  page += '<ul>';
		      page += '<li><a class="previousDay" href="" data-role="button" data-icon="arrow-l" data-iconpos="right">Jour precedent</a></li>';
			  page += '	<li><a class="nextDay" href="" data-role="button" data-icon="arrow-r" data-iconpos="left">Jour suivant</a></li>';
			  page += '	</ul>';
			  page += '</div>';*/
			 //  page += '<img class="WeekTurn" src="css/images/calendarTurn.png"/>';
			 //                        page += '</div>';
			  //fin footer-----------------------------------------------------------------------
		      page += '</div>';
			  //fin page------------------------------------------------------------------------
			  
			//   try{
				  $("body").append(page);
				  form.InitButtonStartTournee(tournee,form,i);
		/*	  }
			  catch(err)
				{
					alert(err);
				}*/
		
		}
		var text1 = '';
		    text1 = DMS.Mobile.Common.getWeekNumber(new Date());
			var text ='';
		   text = 'Semaine N° '+text1+' Du '+firstDayWeek+' au '+lastDayWeek ;
	        $("#headerCalendar h1").append(text);
		form.InitializeEvents(form);
	$.mobile.changePage('#page'+form.currentPage);
	  		
	},
	
	InitButtonStartTournee : function (tournee,form,indexPage)
	{
		
		//alert("tournee.EtatTournee " + tournee.EtatTournee + " index page " + indexPage);
		if (tournee != null && tournee.EtatTournee == DMS.Mobile.Constante.EtatTournee.NonDemaree)
		{

			$("#page" + indexPage + " .startTournee").removeClass("ui-disabled");
		}
	},
	
	InitializeEvents:function(form)
	{
		$(".reglement").click(function(){
            // var gg =$(this).parent().html();
		  var indexTournee=   $(this).parent().find("input[type=hidden]:eq(0)").val();
		  var indexPointVente=   $(this).parent().find("input[type=hidden]:eq(1)").val();
		  var pointVente = form.ListTournee[indexTournee].ListPointVentes[indexPointVente];
		
		  
		  
		  for (var d = 0; d<pointVente.ListMissions.length;d++)
			{
				var EnumTypeMission = pointVente.ListMissions[d].TypeMissions.TypeMissionID;
				 if(EnumTypeMission == DMS.Mobile.Constante.TypeMission.Recouvrement)
				 {
					 DMS.Mobile.FactureRequest.connexion = form.connexion;
					 DMS.Mobile.FactureRequest.SelectAllFactureByMissionID(pointVente.ListMissions[d],function(listFactureByMission){
						 
					 if((listFactureByMission == null) || (listFactureByMission == ""))
			         {
						// alert("erreur dans la base de données");
				     }
					 else
					 {
						 for (var cpt = 0; cpt<listFactureByMission.length;cpt++)
						 {
							 var headerList = "";
							 if (listFactureByMission[cpt].EtatFacture == DMS.Mobile.Constante.EtatFacture.NonReglee)
							 {
			//  headerList ='<li data-role="list-divider" style="margin-right:12px; margin-left:12px;"><a href="#">N° Facture : '+listFactureByMission[cpt].FactureID+'&nbsp;&nbsp;&nbsp;&nbsp;Montant NET : '+listFactureByMission[cpt].MontantNet+'&nbsp;&nbsp;&nbsp;&nbsp;Date Facture : '+listFactureByMission[cpt].DateFacture+'&nbsp;&nbsp;&nbsp;&nbspReste A Payer : '+listFactureByMission[cpt].ResteAPayer+'</a></li>';
			
		//	 headerList  +='<div class="LigneFacture">';
		//headerList  +='< a href="#" data-role="button" data-theme="a">';
			 headerList  +='<div class="ui-grid-a LigneFacture "  >'; 
		
			  
			 headerList +=' <div id="" data-role="content" data-theme="e"   style=" background-color:#EAEAEA; margin-bottom:2px; width: 19%;" class=" ui-block-a" >'	
            //+' <div>'
			
			+'<h3 style="margin-left:5px;margin-bottom: 9px;margin-top: 8px;"><center> '+listFactureByMission[cpt].InternalCodeFacture+'</center> </h3>'
			+'<input type="hidden" value="'+listFactureByMission[cpt].FactureID+'"/>'
			+'<input type="hidden" id="'+listFactureByMission[cpt].FactureID+'" value="'+listFactureByMission[cpt].ResteAPayer+'"/>'
			//+'</div>'
			
			+'</div>';

			headerList +=' <div id="" data-role="content" data-theme="e" style="background-color:#EAEAEA; margin-bottom:2px;  width: 19%;" class=" ui-block-b" >'	
            +' <div ">'
			+'<h3 style="margin-left:5px;margin-bottom: 9px;margin-top: 8px;"><center> '+(listFactureByMission[cpt].MontantNet).toFixed(3)+'</center> </h3>'
			+'</div>'
			+'</div>';
			headerList +=' <div id="" data-role="content" data-theme="e" style="background-color:#EAEAEA; margin-bottom:2px;  width: 19%;" class=" ui-block-c" >'	
            +' <div>'
			+'<h3 style="margin-left:5px;margin-bottom: 9px;margin-top: 8px;"><center> '+listFactureByMission[cpt].DateFacture+'</center> </h3>'
			+'</div>'
			+'</div>';
			headerList +=' <div id="" data-role="content" data-theme="e" style="background-color:#EAEAEA; margin-bottom:2px;  width: 19%;" class=" ui-block-d" >'	
            +' <div>'
			+'<h3 id=ResteAPayer'+listFactureByMission[cpt].FactureID+' style="margin-left:5px;margin-bottom: 9px;margin-top: 8px;"><center> '+(listFactureByMission[cpt].ResteAPayer).toFixed(3)+' </center></h3>'
			+'</div>'
			+'</div>';
			headerList +=' <div id="" data-role="content" data-theme="e" style="background-color:#EAEAEA; margin-bottom:2px;  width: 19%;" class=" ui-block-d" >'	
            +' <div>'
			+'<h3 style="margin-left:5px;margin-bottom: 9px;margin-top: 8px;"><center> '+((listFactureByMission[cpt].TauxEscompte)*100)+'% </center></h3>'
			+'</div>'
			+'</div>';
			
		
			headerList += '</div>';
			
			
			//headerList += '</div>';
			
			
			$('.listArticle').append(headerList);
			  $("#pageFacture").trigger('pagecreate');
			  
							 }
						 }
			   
			
					 }
			   form.initializeEventLigneFacture(form);
					 });
				 }
			   
			}
			
			
		     
		  
		  $.mobile.changePage('#pageFacture');
		  
			$('.listArticle').html("");
			
			$("#pageFacture").trigger('pagecreate');
		
			});
			
			
		$(".btnSeDeconnecter").click(function(){
	 
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
		
		$(".previousDay").click(function(){
				$.mobile.changePage('#page'+(form.currentPage-1));
				form.currentPage--;
		});
	
	
	 $(document).on('swipeleft', '[data-role="page"]', function(event){    
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

		$(document).on('swiperight', '[data-role="page"]', function(event){   
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
	
			$(".propositionCMD").click(function(){
				
				DMS.Mobile.PropositionCommandeRequest.connexion = form.connexion;
				DMS.Mobile.PropositionCommandeRequest.SelectPropositionCommande(function(propoCommande){
				
				var poropCMD = '';
				//$("#popupContentPropCmd").html(''
				poropCMD +=' <form>';
            poropCMD +=' <fieldset id="fieldset" style="width: 438px;height: 442px;padding-right: 0px;padding-left: 17px;margin-left: 9px;padding-top: 13px;margin-top: 8px;">';
               poropCMD +=' <legend><h3>Proposition commande :</h3> </legend>';
                poropCMD +='<div class="ui-grid-a coin-class" style="border:2px blue solid;width: 417px;margin-bottom: 0px;padding-top: 14px;" >';
				  
				  		   poropCMD += '<div data-role="fieldcontain" style="margin-top: 0px;margin-bottom: 0px;">';
   poropCMD += ' <fieldset data-role="controlgroup" style="width: 383px;padding-left: 16px;padding-bottom: 13px;" id="PropCommande1">';
   
           var prop1 = propoCommande.Prop1;
		   var prop2 = propoCommande.Prop2;
		   var prop3 = propoCommande.Prop3;
		   if(prop1 == 0)
		   {
         	poropCMD += '<input type="radio" name="radio-choice-1" id="radio-choice-1" value="0" checked="checked" />';
            poropCMD += '	<label for="radio-choice-1">Dernière commande</label>';

         	poropCMD += '<input type="radio" name="radio-choice-1" id="radio-choice-2" value="1"  />';
         	poropCMD += '<label for="radio-choice-2">Moyenne des références mouvementées</label>';

         	poropCMD += '<input type="radio" name="radio-choice-1" id="radio-choice-3" value="2"  />';
         	poropCMD += '<label for="radio-choice-3">Max des références mouvementées</label>';
		   }
		   else if(prop1 == 1)
		   {
			poropCMD += '<input type="radio" name="radio-choice-1" id="radio-choice-1" value="0"  />';
            poropCMD += '	<label for="radio-choice-1">Dernière commande</label>';

         	poropCMD += '<input type="radio" name="radio-choice-1" id="radio-choice-2" value="1" checked="checked"  />';
         	poropCMD += '<label for="radio-choice-2">Moyenne des références mouvementées</label>';

         	poropCMD += '<input type="radio" name="radio-choice-1" id="radio-choice-3" value="2"  />';
         	poropCMD += '<label for="radio-choice-3">Max des références mouvementées</label>';
		   }
			else if(prop1 == 2)
			{
			poropCMD += '<input type="radio" name="radio-choice-1" id="radio-choice-1" value="0"  />';
            poropCMD += '	<label for="radio-choice-1">Dernière commande</label>';

         	poropCMD += '<input type="radio" name="radio-choice-1" id="radio-choice-2" value="1"   />';
         	poropCMD += '<label for="radio-choice-2">Moyenne des références mouvementées</label>';

         	poropCMD += '<input type="radio" name="radio-choice-1" id="radio-choice-3" value="2" checked="checked" />';
         	poropCMD += '<label for="radio-choice-3">Max des références mouvementées</label>';
			}
			
   poropCMD += ' </fieldset>';
poropCMD += '</div>';
               
               
               poropCMD +=' </div>';
                
   poropCMD +=' <div class="ui-grid-a">';
                    
	poropCMD += ' <fieldset data-role="controlgroup" style="width: 383px;padding-left: 16px;padding-bottom: 0px;margin-bottom: 0px;" id="PropCommande2">';

	if(prop2 == "true")
	{
         	poropCMD += '<input type="checkbox" name="PropRefMvt" id="check-box-CMD" value="0" checked="checked" />';
            poropCMD += '<label for="check-box-CMD">Proposition des références non mouvementées</label>';
	}
	else if(prop2 == "false")
	{
		  	poropCMD += '<input type="checkbox" name="PropRefMvt" id="check-box-CMD" value="0" />';
            poropCMD += '<label for="check-box-CMD">Proposition des références non mouvementées</label>';
	}

    poropCMD += ' </fieldset>';
   
   poropCMD +=' </div>';
  
  
                
    poropCMD +=' <div class="ui-grid-a">';
   
    poropCMD +=' <div class="ui-block-a" style="width:83%;">';   

    poropCMD += ' <fieldset data-role="controlgroup" style="width: 307px;padding-left: 16px;padding-bottom: 0px;margin-bottom: 0px;margin-left: 30px;" id="PropCommande3">';

if(prop2 == "false")
{
	
	
	if(prop3 == 0)
	 {
	 poropCMD += '<input type="radio" name="radioChoice2" disabled="disabled"  id="radio-choice-4" value="0" checked="checked" />';
	 poropCMD += '	<label for="radio-choice-4">Moyenne arithmétique</label>';

	 poropCMD += '<input type="radio" name="radioChoice2" disabled="disabled" id="radio-choice-5" value="1"  />';
	 poropCMD += '<label for="radio-choice-5">Référentiels</label>';
	 }
	 else if(prop3 == 1)
	 {
	 poropCMD += '<input type="radio" name="radioChoice2" disabled="disabled" id="radio-choice-4" value="0"  />';
	 poropCMD += '	<label for="radio-choice-4">Moyenne arithmétique</label>';

	 poropCMD += '<input type="radio" name="radioChoice2" disabled="disabled" id="radio-choice-5" value="1" checked="checked" />';
	 poropCMD += '<label for="radio-choice-5">Référentiels</label>';
	 }
	
}
else
{
       
	 if(prop3 == 0)
	 {
	 poropCMD += '<input type="radio" name="radioChoice2"  id="radio-choice-4" value="0" checked="checked" />';
	 poropCMD += '	<label for="radio-choice-4">Moyenne arithmétique</label>';

	 poropCMD += '<input type="radio" name="radioChoice2" id="radio-choice-5" value="1"  />';
	 poropCMD += '<label for="radio-choice-5">Référentiels</label>';
	 }
	 else if(prop3 == 1)
	 {
	 poropCMD += '<input type="radio" name="radioChoice2" id="radio-choice-4" value="0"  />';
	 poropCMD += '	<label for="radio-choice-4">Moyenne arithmétique</label>';

	 poropCMD += '<input type="radio" name="radioChoice2" id="radio-choice-5" value="1" checked="checked" />';
	 poropCMD += '<label for="radio-choice-5">Référentiels</label>';
	 }
}



     poropCMD += ' </fieldset>';
	
	poropCMD +='   </div>';				
	
	poropCMD +=' <div class="ui-block-b" style="width: 54px; margin-top: 38px;">';
	
	    poropCMD +='<a data-role="button" class="ui-icon-alt configureReferentiel" data-inline="true" data-icon="wrench" data-theme="e" data-iconpos="notext" style="  id=""   width: 24px;">Configure</a>'; 
		   
	poropCMD +='   </div>';
					                
 poropCMD +='   </div>';
			 
			 
			 
                
               poropCMD +=' <div class="ui-grid-a" style="margin-left: 95px;margin-top: 7px;">';
                   poropCMD +=' <div class="ui-block-a">';
                       poropCMD +='   <div style=" ">';
                        poropCMD +='   <a href="" align="right" id="annulerProp" data-theme="b" style="width:125px;" data-role="button" >Annuler </a>';
                       poropCMD +='   </div>';
                    poropCMD +='</div>';
                  poropCMD +='  <div class="ui-block-b">';
                      poropCMD +='   <div style="">';
                      poropCMD +='  <a href="" align="right" id="AppliquerPopUp" data-theme="b" style="width:125px;" data-role="button" >Appliquer </a>';
                poropCMD +='  </div>';
                  poropCMD +='  </div>';
               poropCMD +=' </div>';
                
               
           poropCMD +='  </fieldset>';
         poropCMD +=' </form>';
				
				$("#popupContentPropCmd").html(poropCMD);
				
				$("#popupPropCmd").popup();
				$("#popupPropCmd").popup("open");
				$("#popupPropCmd").trigger('create');
				
				form.InitializeEventPopUpPropositionCMD(form);
				
				});
			});
	
		
		$(".nextDay").click(function(){
				$.mobile.changePage('#page'+(form.currentPage+1));
				form.currentPage++;
		});
		
		$(".startTournee").click(function(){
		//	var g = $(this).parent().html();
			var indexTournee = $(this).parent().find("input[type=hidden]:eq(0)").val();
			$(this).addClass("ui-disabled");
			form.updateEtatTournee(form,indexTournee);
			
		});
		$(".WeekTurn").click(function(){
			 form.ShowCalendarWeek();
		});
			
		$(".previousDay:eq(0)").addClass("ui-disabled");
		$(".nextDay:eq(6)").addClass("ui-disabled");
	/*	$(".mission").click(function(){
			//	var gg = $(this).parent().html();
				var indexTournee = $(this).parent().find("input[type=hidden]:eq(0)").val();
				var indexPointVente = $(this).parent().find("input[type=hidden]:eq(1)").val();
				var indexMission = $(this).parent().find("input[type=hidden]:eq(2)").val();
				form.ShowMissionDetails(indexTournee,indexPointVente,indexMission,form);
		});*/
		
		$(".passerCommande").click(function(){
	      // var gg = $(this).parent().html();
		 
	       var indexTournee = $(this).parent().find("input[type=hidden]:eq(0)").val();
		   var indexPointVente = $(this).parent().find("input[type=hidden]:eq(1)").val();
		   var pointVenteID = form.ListTournee[indexTournee].ListPointVentes[indexPointVente].PointVenteID;
		   
		   form.getIndexPointVenteIndexClient(pointVenteID,form,function(){
		   /////// code ajouter //////////
		   
		   sessionStorage.removeItem("CommandeToModify");
		   //sessionStorage.setItem("CommandeToModify", JSON.stringify(Commande));
		   
		   
		    DMS.Mobile.CommandeRequest.connexion = form.connexion;
		    DMS.Mobile.CommandeRequest.SelectAllCommandeOrder(pointVenteID ,function(listCommande){
				
				if(listCommande.length == 0)
				{
					DMS.Mobile.Common.RedirectToCommande();
				    return false;
				}
				else
				{
				
				DMS.Mobile.PropositionCommandeRequest.connexion = form.connexion;
				DMS.Mobile.PropositionCommandeRequest.SelectPropositionCommande(function(propoCommande){
				
				       var prop1 = propoCommande.Prop1;
					   var prop2 = propoCommande.Prop2;
					   var prop3 = propoCommande.Prop3;
					   
					   if ((prop1 == DMS.Mobile.Constante.Proposition1.DerniereCommande) &&(prop2 == "false"))
					   {
						   var commande = listCommande[0];
						   var oCommande = new DMS.Mobile.Commande();
						   oCommande.PointVenteID = commande.PointVenteID;
						   oCommande.CommercialID = commande.CommercialID;
						   oCommande.LignesCommande = commande.LignesCommande;
						   
						   sessionStorage.setItem("CommandeToModify", JSON.stringify(oCommande));
					    	   DMS.Mobile.Common.RedirectToCommande();
				    		   return false;	
					   }
					   if ((prop1 == DMS.Mobile.Constante.Proposition1.MoyenneRefMvt) &&(prop2 == "false"))
					   {
						   var oCommande = new DMS.Mobile.Commande();
						   var listLigneCommande = form.MoyenneRM(form,listCommande);
						   oCommande.PointVenteID = listCommande[0].PointVenteID;
						   oCommande.CommercialID = listCommande[0].CommercialID;
						   oCommande.LignesCommande = listLigneCommande;
						   
						   sessionStorage.setItem("CommandeToModify", JSON.stringify(oCommande));
					    	   DMS.Mobile.Common.RedirectToCommande();
				    		   return false;
						   
					   }
					   if ((prop1 == DMS.Mobile.Constante.Proposition1.MaxRefMvt) &&(prop2 == "false"))
					   {
						   var oCommande = new DMS.Mobile.Commande();
						   var listLigneCommande = form.MaxRM(form,listCommande);
						   oCommande.PointVenteID = listCommande[0].PointVenteID;
						   oCommande.CommercialID = listCommande[0].CommercialID;
						   oCommande.LignesCommande = listLigneCommande;
						   
						   sessionStorage.setItem("CommandeToModify", JSON.stringify(oCommande));
					    	   DMS.Mobile.Common.RedirectToCommande();
				    		   return false;
					   }
					   if ((prop1 == DMS.Mobile.Constante.Proposition1.DerniereCommande) &&(prop2 == "true"))
					   {
						   if (prop3 == DMS.Mobile.Constante.Proposition3.MoyenneA)
						   {
							       var lastCommande = listCommande[0];
								  form.MoyenneAithDerCmd(form,lastCommande,function(lastCommandeMoyenArith){
									  
									  var oCommande = new DMS.Mobile.Commande();
									   oCommande.PointVenteID = lastCommandeMoyenArith.PointVenteID;
									   oCommande.CommercialID = lastCommandeMoyenArith.CommercialID;
									   oCommande.LignesCommande = lastCommandeMoyenArith.LignesCommande;
									  
									  sessionStorage.setItem("CommandeToModify", JSON.stringify(oCommande));
									   DMS.Mobile.Common.RedirectToCommande();
									   return false;
									  
									  });									   
								   
						   }
						   else if (prop3 == DMS.Mobile.Constante.Proposition3.Referentiel)
						   {
							       var lastCommande = listCommande[0];
								    form.ReferentielDerCmd(form,lastCommande,function(lastCommandeMoyenArith){
									  
									  var oCommande = new DMS.Mobile.Commande();
									   oCommande.PointVenteID = lastCommandeMoyenArith.PointVenteID;
									   oCommande.CommercialID = lastCommandeMoyenArith.CommercialID;
									   oCommande.LignesCommande = lastCommandeMoyenArith.LignesCommande;
									  
									  sessionStorage.setItem("CommandeToModify", JSON.stringify(oCommande));
									   DMS.Mobile.Common.RedirectToCommande();
									   return false;
									   
									});
						   }
					   }
					   
					   if ((prop1 == DMS.Mobile.Constante.Proposition1.MoyenneRefMvt) &&(prop2 == "true"))
					   {
						   if (prop3 == DMS.Mobile.Constante.Proposition3.MoyenneA)
						   {
							    var oCommande = new DMS.Mobile.Commande();
								form.MoyenneRMMoyenArith(form,listCommande,function(allLigneCommande){
									   
								   oCommande.PointVenteID = listCommande[0].PointVenteID;
								   oCommande.CommercialID = listCommande[0].CommercialID;
								   oCommande.LignesCommande = allLigneCommande;
								   
								   sessionStorage.setItem("CommandeToModify", JSON.stringify(oCommande));
									   DMS.Mobile.Common.RedirectToCommande();
									   return false;

									
									});
						   }
						   else if (prop3 == DMS.Mobile.Constante.Proposition3.Referentiel)
						   {
							       var oCommande = new DMS.Mobile.Commande();
								form.ReferentielMoyenneRM(form,listCommande,function(allLigneCommande){
									   
								   oCommande.PointVenteID = listCommande[0].PointVenteID;
								   oCommande.CommercialID = listCommande[0].CommercialID;
								   oCommande.LignesCommande = allLigneCommande;
								   
								   sessionStorage.setItem("CommandeToModify", JSON.stringify(oCommande));
									   DMS.Mobile.Common.RedirectToCommande();
									   return false;

									
									});
						   }
					   }
					   if ((prop1 == DMS.Mobile.Constante.Proposition1.MaxRefMvt) &&(prop2 == "true"))
					   {
						   if (prop3 == DMS.Mobile.Constante.Proposition3.MoyenneA)
						   {
							   
							   var oCommande = new DMS.Mobile.Commande();
								form.MaxRMMoyenArith(form,listCommande,function(allLigneCommande){
									   
								   oCommande.PointVenteID = listCommande[0].PointVenteID;
								   oCommande.CommercialID = listCommande[0].CommercialID;
								   oCommande.LignesCommande = allLigneCommande;
								   
								   sessionStorage.setItem("CommandeToModify", JSON.stringify(oCommande));
									   DMS.Mobile.Common.RedirectToCommande();
									   return false;

									
									});
							   
						   }
						   else if (prop3 == DMS.Mobile.Constante.Proposition3.Referentiel)
						   {
							    var oCommande = new DMS.Mobile.Commande();
								form.ReferentielMaxRM(form,listCommande,function(allLigneCommande){
									   
								   oCommande.PointVenteID = listCommande[0].PointVenteID;
								   oCommande.CommercialID = listCommande[0].CommercialID;
								   oCommande.LignesCommande = allLigneCommande;
								   
								   sessionStorage.setItem("CommandeToModify", JSON.stringify(oCommande));
									   DMS.Mobile.Common.RedirectToCommande();
									   return false;

									
									});
						   }
					   }
				
				});  
				
				}
			});
		   
		   
		   ///////////////////////////////
		  // form.getIndexPointVenteIndexClient(pointVenteID,form,function(){
			    
			//	         DMS.Mobile.Common.RedirectToCommande();
				//		 return false;		
				
				});	
	
		});
		
		
			$(".menu_ListPromotion").click(function(){
			
			DMS.Mobile.Common.RedirectToPromotion();
			});
			
		
		$(".menu_ListArticleRepture").click(function(){
			
			DMS.Mobile.Common.RedirectToArticleEnRepture();
			});
			
		$(".menu_ListFidelisation").click(function(){
			
			DMS.Mobile.Common.RedirectToFidelisation();
			});
		$(".menu_Reclamation").click(function(){
		
		    DMS.Mobile.Common.RedirectToReclamation();
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
		
		$(".menu_livraison").click(function(){			 
				  DMS.Mobile.Common.RedirectToLivraison();
		});
		
		
		$(".menu_Synchronisation").click(function(){			 
				 
				  $(this).addClass('ui-disabled'); 
				  
				  DMS.Mobile.Common.connexion = form.connexion;
				  DMS.Mobile.Common.synchronizeAllData(function(){
					  
					  DMS.Mobile.Common.RedirectToCalendrier();
					  
					  });
				 
		});
		
		
		$("#back").click(function(){
				$.mobile.changePage('#page1');
		});
		$("#divLundi").click(function(){
				$.mobile.changePage('#page1');
				form.currentPage = 1;
		});
		$("#divMardi").click(function(){
				$.mobile.changePage('#page2');
				form.currentPage = 2;
		});
		$("#divMercredi").click(function(){
				$.mobile.changePage('#page3');
				form.currentPage = 3;
		});
		$("#divJeudi").click(function(){
				$.mobile.changePage('#page4');
				form.currentPage = 4;
		});
		$("#divVendredi").click(function(){
				$.mobile.changePage('#page5');
				form.currentPage = 5;
		});
		$("#divSamedi").click(function(){
				$.mobile.changePage('#page6');
				form.currentPage = 6;
		});
		$("#divDimanche").click(function(){
				$.mobile.changePage('#page7');
				form.currentPage = 7;
		});
		
			
	},
	
	
	initEventPageFacture  : function(form)
	{
		
		
		
$(".menu_ListArticleRepture1").click(function(){
    
	DMS.Mobile.Common.RedirectToArticleEnRepture();

});


		$(".menu_Synchronisation1").click(function(){			 
				 
				  $(this).addClass('ui-disabled'); 
				  
				  DMS.Mobile.Common.connexion = form.connexion;
				  DMS.Mobile.Common.synchronizeAllData(function(){
					  
					  DMS.Mobile.Common.RedirectToCalendrier();
					  //$.mobile.changePage('#pageFacture');
					 // alert(125);
					  //$.mobile.loadPage('#pageFacture');
					  // $(this).removeClass('ui-disabled'); 
					  });
				 
		});
		
		
		
		$(".menu_SynchFacture").click(function(){
		
		     	DMS.Mobile.Common.TestServer(function(AcceeServeur){
			
									if (AcceeServeur == true)
									{
											DMS.Mobile.SynchronizeRequest.connexion = form.connexion;
											DMS.Mobile.SynchronizeRequest.SynchronizeFacture(function(synchr)
													{  
													//alert("truuuuuuuuuue");
															  DMS.Mobile.Common.RedirectToCalendrier();	
													});
									}
									else
									{
										 alert("Pas d'accès serveur !!!");	
									}
								
					 });
		});
	},
	initializeEventLigneFacture : function(form)
	{	
	
		  $(".LigneFacture").click(function(){
			
			//alert(125);
			//alert($(this).children().html());
			var factureID =   $(this).children().find("input[type=hidden]:eq(0)").val();
			var ResteAPayer =   $(this).children().find("input[type=hidden]:eq(1)").val();
			//alert(factureID);
			
			   var especeF = DMS.Mobile.Constante.ModePayement.Espece;
			   var chequeF = DMS.Mobile.Constante.ModePayement.Cheque;
			   var traiteF = DMS.Mobile.Constante.ModePayement.Traite;
			
			$("#popupContenuLFacture").html(''
	
		+'<form>'
        
		
		+'<fieldset id="fieldset" style=" padding-right: 30px; width:353px; padding-bottom: 7px;">' 
			+'<legend id="legend" align="left"> '
            
			+'<h3>Saisie montant : </h3> '
			+'</legend>'
			
           +'<div class="ui-grid-a" style="margin-bottom: 9px;">'  
		   +'<div class="ui-block-a">'
           +'<label for="un">Montant : </label>'
		   +'</div>'
		   +'<div class="ui-block-b">'
           +'<input name="Montant"  class="inputMontant"  name="name"  data-theme="c" type="number" value=""/>'
		   + '</div>'
		   + '</div>'
		  
		   + '<div class="ui-grid-a" style="margin-bottom: 12px;">'
		   + '<div class="ui-block-b">'
		   +'<label for="un">Mode de payement : </label>'
		   + '</div>'
		   + '<div class="ui-block-b">'
		   
		   
		   + '<div data-role="fieldcontain" style="margin-top: 0px;margin-bottom: 0px;">'
   + ' <fieldset data-role="controlgroup" style="width: 163px;" id="ModePayement">'
         	+ '<input type="radio" name="radio-choice-1" id="radio-choice-1" value="'+especeF+'" checked="checked" />'
         + '	<label for="radio-choice-1">Espéce</label>'

         	+ '<input type="radio" name="radio-choice-1" id="radio-choice-2" value="'+chequeF+'"  />'
         	+ '<label for="radio-choice-2">Par chéque</label>'

         	+ '<input type="radio" name="radio-choice-1" id="radio-choice-3" value="'+traiteF+'"  />'
         	+ '<label for="radio-choice-3">Traite</label>'
   + ' </fieldset>'
+ '</div>'		   
		   
		   
		   + '</div>'
		   + '</div>'
		   
		   + '<div class="ui-grid-a" style="margin-bottom: 15px;">'
		   + '<div class="ui-grid-a">'
		   +'<label for="un">Commentaire : </label>'
		   + '</div>'
		   + '<div class="ui-grid-b" style="width:100% !important;">'
		   + '<div class="class-input">'
		   +'<textarea cols="40" rows="8" name="textarea" class="comment" id="textarea"></textarea>'
		   + '</div>'
		   + '</div>'
		   + '</div>'
		   
		   + '<div class="ui-grid-a">'
		   + '<div class="ui-block-a">'
		      +'<a href="#" class="Montant"  data-role="button"  data-theme="b" class="show-page-loading-msg" data-textonly="false" data-textvisible="true">Enregistrer</a>'
		   + '</div>'
		   + '<div class="ui-block-b">'
		      +'<a href="#" class="AnnuleMontant"  data-role="button"  data-theme="b" class="show-page-loading-msg" data-textonly="false" data-textvisible="true">Annuler</a>'
		   + '</div>'
		   + '</div>'
		   
		   
		   
		
		    
		   
			   
			      
		+'</fieldset>'
       +'</form>');
			
			//data-overlay-theme="a" data-theme="c" class="ui-corner-all"
		
		//	alert($("#popupDialogLFacture").html());
			$("#popupDialogLFacture").trigger("create");
			$("#popupDialogLFacture").popup();
			
			$("#popupDialogLFacture").popup("open");

		          form.eventButtonMontant(form,factureID,ResteAPayer);
       	
			});
    },
			
		eventButtonMontant : function(form,factureID,ResteAPayer)
		{
			var montantSaisie = null;
			var resteapayer = null;
			var commentaire = null
			var modePayement = null;
			
			


			$(".comment").change(function(){

			 commentaire = $(this).val();
			});
			
			$(".inputMontant").change(function(){
			
			resteapayer = parseFloat(ResteAPayer);
			 montantSaisie = parseFloat($(this).val());
			 
			});
	  		
			$(".AnnuleMontant").click(function(){
				
				  montantSaisie = null;
			     $("#popupDialogLFacture").popup("close");
			});
			
		 $(".Montant").click(function(){
			 modePayement = $("#ModePayement :radio:checked").val();
		 if(montantSaisie == null)  
		  {
			  alert("Il faut saisir une montant");
		  }
		  else if(montantSaisie < 0)  
		  {
			  alert("Impossible : montant negative");
		  }
		  else
		  {
			   if(montantSaisie > resteapayer)
			   {
				   alert("Montant saisie est superieure au reste a payer");
			   }
			   else
			   {
				    var dateCreation = DMS.Mobile.Common.currentDate();
			        var heureCreation = DMS.Mobile.Common.currentHours();

					var historicFactureDTO = new DMS.Mobile.HistoriqueFacture();
						historicFactureDTO.FactureID = factureID;
						historicFactureDTO.MontantSaisie = montantSaisie;
						historicFactureDTO.Commentaires = commentaire;
						historicFactureDTO.ModePayement = modePayement;
						historicFactureDTO.DateHistorique = dateCreation;
						historicFactureDTO.HeureHistorique = heureCreation;
						
					
					DMS.Mobile.HistoriqueFactureRequest.connexion = form.connexion;
					DMS.Mobile.HistoriqueFactureRequest.InsertNewHistoric(historicFactureDTO,function(){
				   
     				   DMS.Mobile.FactureRequest.connexion = form.connexion;
					   DMS.Mobile.FactureRequest.UpdateEtatFacture(factureID,montantSaisie,resteapayer,function(restAPayer){
									$("#popupDialogLFacture").popup("close");		
								//	form.restP = restAPayer;
								
									$("#"+factureID).val(restAPayer);
										//form.EventMontantRestant(form,factureID,montantSaisie,resteapayer);
										form.EventMontantRestant(form,factureID,restAPayer);				   
							   });
					});
						   
			   }
		  }
		  });
			
		},
			//EventMontantRestant  : function(form,factureID,montantSaisie,resteapayer)
			EventMontantRestant  : function(form,factureID,RestAPayer)
			{
				//var reste = null;
			//	reste = resteapayer - montantSaisie;
				//$("#ResteAPayer"+factureID+" center").text(""+reste);
				$("#ResteAPayer"+factureID+" center").text(""+(RestAPayer.toFixed(3)));
			},
			
			
		updateEtatTournee :function (form,indexTournee){
		DMS.Mobile.TourneeRequest.UpdateTournee(DMS.Mobile.Constante.EtatTournee.EnCours,form.ListTournee[indexTournee].TourneeID,function(){
			
			form.ListTournee[indexTournee].EtatTournee = DMS.Mobile.Constante.EtatTournee.EnCours;
			});
	},
	
	getIndexPointVenteIndexClient : function(PointVenteID,form,callback)
	{
		DMS.Mobile.ClientRequest.connexion = form.connexion;
		DMS.Mobile.ClientRequest.SelectAllClient(function(ListClient){
				
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
					
			    	sessionStorage.setItem("indexPointVente", JSON.stringify(indexPointVente));
				 	sessionStorage.setItem("indexClient", JSON.stringify(indexClient));
					callback();
		});
			
	},
	
	ShowCalendarWeek : function()
	{
		        $.mobile.changePage('#dialog');
				//$("#setdetails").html(details+ButtonToShow);
				$("#dialog").trigger('pagecreate');
	},
	
	
	InitializeEventPopUpPropositionCMD : function(form)
	{
		
		$(".configureReferentiel").click(function(){
		
		     DMS.Mobile.Common.RedirectToRefrenceArticle();	
		});
		
		
	/*	$("#radio-choice-1").bind( "change", function(event, ui) {
		   prop1 = $(this).val();
		 
		});
		$("#radio-choice-2").bind( "change", function(event, ui) {
		  prop1 = $(this).val();

	    });
		$("#radio-choice-3").bind( "change", function(event, ui) {
		  prop1 = $(this).val();
		});
		$("#radio-choice-4").bind( "change", function(event, ui) {
		  prop3 = $(this).val();
		});
		$("#radio-choice-5").bind( "change", function(event, ui) {
		  prop3 = $(this).val();
		});*/
	    $("#check-box-CMD").bind( "change", function(event, ui) {
				 
				if ($("#check-box-CMD").is(":checked"))
					{
						//prop2 = "true";
						$("#radio-choice-4").checkboxradio('enable');
						$("#radio-choice-5").checkboxradio('enable');
					}
					else
					{
						//prop2 = "false";
						$("#radio-choice-4").checkboxradio('disable');
						$("#radio-choice-5").checkboxradio('disable');
					}
				 
		 });
			  
                 $("#annulerProp").click(function(){
					 	 
					//	$("#popupContentPropCmd").html("");
						$("#popupPropCmd").popup();
						$("#popupPropCmd").popup("close");
							 
					 });



                 $("#AppliquerPopUp").click(function(){
					 
					 var prop1 = null;
					 var prop2 = null;
					 var prop3 = null;
		
					 var oPropositionCommande = new DMS.Mobile.PropositionCommande();
					 prop1 = $("#PropCommande1 :radio:checked").val();
					 prop3 = $("#PropCommande3 :radio:checked").val();
					if ($("#check-box-CMD").is(":checked"))
					{
						prop2 = "true";
					}
					else
					{
						prop2 = "false";
					}
					
					 
					 var userID = sessionStorage.getItem("userID");
					 oPropositionCommande.PropositionID = userID;
					 oPropositionCommande.Prop1 = prop1;
					 oPropositionCommande.Prop2 = prop2;
					 oPropositionCommande.Prop3 = prop3;
					 var synch="false";
					 
					 DMS.Mobile.PropositionCommandeRequest.connexion = form.connexion;
					 DMS.Mobile.PropositionCommandeRequest.UpdatePropositionByID(oPropositionCommande,synch,function(){
						 					 
							$("#popupPropCmd").popup();
							$("#popupPropCmd").popup("close");
					});				 
			  });
	},
	
	
	////////////////////////////////// les fonctions utilisées pour proposition commande ////////////
	
	ReferentielDerCmd : function(form,lastCommande,callback)
	{
		var listArticleID = [];

		for(var i = 0; i<lastCommande.LignesCommande.length;i++)
		{
			listArticleID.push(lastCommande.LignesCommande[i].ArticleID);
		}
		
		DMS.Mobile.ArticleRequest.connexion = form.connexion;
			DMS.Mobile.ArticleRequest.SelectAllArticles(function(listArticle){
			for(var j = 0; j<listArticle.length;j++)
			{
				var test = true;
					for(var k =0; k<listArticleID.length;k++)
					{
					     if(listArticle[j].ArticleID == listArticleID[k])
						   {
							   test = false;
							   break;
						   }	
					}
					
					if(test == true)
					{
						var oLigneCommande = new DMS.Mobile.LigneCommande();
						
						oLigneCommande.Quantite = listArticle[j].QuantiteRef;
						oLigneCommande.ArticleID = listArticle[j].ArticleID;
						oLigneCommande.PrixTotalArticleTTC = ((listArticle[j].PrixUnitaireTTC)*(oLigneCommande.Quantite));
						oLigneCommande.PrixTotalArticleHT = ((listArticle[j].PrixUnitaireHT)*(oLigneCommande.Quantite));
						
						lastCommande.LignesCommande.push(oLigneCommande);
					}
				}
				
				callback(lastCommande);
		    });
	},
	
	MoyenneAithDerCmd : function(form,lastCommande,callback)
	{
		var listArticleID = [];
		var totalQuantite = 0;
		var c = 0;
		for(var i = 0; i<lastCommande.LignesCommande.length;i++)
		{
			totalQuantite +=lastCommande.LignesCommande[i].Quantite;
			listArticleID.push(lastCommande.LignesCommande[i].ArticleID);
			c++;
		}
		
		var moyenneArithQuant = totalQuantite/c;
			DMS.Mobile.ArticleRequest.connexion = form.connexion;
			DMS.Mobile.ArticleRequest.SelectAllArticles(function(listArticle){
		         
				for(var j = 0; j<listArticle.length;j++)
				{
					var test = true;
					for(var k =0; k<listArticleID.length;k++)
					{
					     if(listArticle[j].ArticleID == listArticleID[k])
						   {
							   test = false;
							   break;
						   }	
					}
					if(test == true)
					{
						var oLigneCommande = new DMS.Mobile.LigneCommande();
						
						oLigneCommande.Quantite = Math.round(moyenneArithQuant);
						oLigneCommande.ArticleID = listArticle[j].ArticleID;
						oLigneCommande.PrixTotalArticleTTC = ((listArticle[j].PrixUnitaireTTC)*(oLigneCommande.Quantite));
						oLigneCommande.PrixTotalArticleHT = ((listArticle[j].PrixUnitaireHT)*(oLigneCommande.Quantite));
						
						lastCommande.LignesCommande.push(oLigneCommande);
					}
				}
				
				callback(lastCommande);
		    });
	},
	
    MaxRM : function(form,listCommande)
	{
		var listObjet = form.fonctionTrie(form,listCommande);
		var listLigneCommande = [];
		for(var i =0; i<listObjet.length;i++)
		{
			var quantiteMax = 0	;
			for(var j =0; j<listObjet[i].ListQuantite.length;j++)
			{
				if(quantiteMax <listObjet[i].ListQuantite[j])
				{
					quantiteMax = listObjet[i].ListQuantite[j];
				}
			}
			
			var ligneCommande = new DMS.Mobile.LigneCommande();
			
			ligneCommande.Quantite = quantiteMax;
			ligneCommande.ArticleID = listObjet[i].LigneCommande.ArticleID;
			ligneCommande.PrixTotalArticleTTC = listObjet[i].LigneCommande.PrixTotalArticleTTC;
			ligneCommande.PrixTotalArticleHT = listObjet[i].LigneCommande.PrixTotalArticleHT;
			
		    listLigneCommande.push(ligneCommande);
		}
		return listLigneCommande;
    },

ReferentielMaxRM : function(form,listCommande,callback)
{
	var listLigneCommande = form.MaxRM(form,listCommande);
	 var listArticleID = [];
	 for(var i = 0; i<listLigneCommande.length;i++)
		{
			listArticleID.push(listLigneCommande[i].ArticleID);
		}
		
		DMS.Mobile.ArticleRequest.connexion = form.connexion;
		DMS.Mobile.ArticleRequest.SelectAllArticles(function(listArticle){
				
				  
			   for(var j = 0; j<listArticle.length;j++)
				{
					var test = true;
					for(var k =0; k<listArticleID.length;k++)
					{
					     if(listArticle[j].ArticleID == listArticleID[k])
						   {
							   test = false;
							   break;
						   }	
					}
					if(test == true)
					{
						var oLigneCommande = new DMS.Mobile.LigneCommande();
						
						oLigneCommande.Quantite = listArticle[j].QuantiteRef;
						oLigneCommande.ArticleID = listArticle[j].ArticleID;
						oLigneCommande.PrixTotalArticleTTC = ((listArticle[j].PrixUnitaireTTC)*(oLigneCommande.Quantite));
						oLigneCommande.PrixTotalArticleHT = ((listArticle[j].PrixUnitaireHT)*(oLigneCommande.Quantite));
						
						listLigneCommande.push(oLigneCommande);
					}
				}
				
				callback(listLigneCommande);
				  
		
		});
},
	
MaxRMMoyenArith : function(form,listCommande,callback)
{
	var listLigneCommande = form.MaxRM(form,listCommande);
	
	  var listArticleID = [];
	  var totalQuantite = 0;
	  var c = 0;
		for(var i = 0; i<listLigneCommande.length;i++)
		{
			totalQuantite +=listLigneCommande[i].Quantite;
			listArticleID.push(listLigneCommande[i].ArticleID);
			c++;
		}
		
		var moyenneArithQuant = totalQuantite/c;
		
		DMS.Mobile.ArticleRequest.connexion = form.connexion;
		DMS.Mobile.ArticleRequest.SelectAllArticles(function(listArticle){
				
				  
			   for(var j = 0; j<listArticle.length;j++)
				{
					var test = true;
					for(var k =0; k<listArticleID.length;k++)
					{
					     if(listArticle[j].ArticleID == listArticleID[k])
						   {
							   test = false;
							   break;
						   }	
					}
					if(test == true)
					{
						var oLigneCommande = new DMS.Mobile.LigneCommande();
						
						oLigneCommande.Quantite = Math.round(moyenneArithQuant);
						oLigneCommande.ArticleID = listArticle[j].ArticleID;
						oLigneCommande.PrixTotalArticleTTC = ((listArticle[j].PrixUnitaireTTC)*(oLigneCommande.Quantite));
						oLigneCommande.PrixTotalArticleHT = ((listArticle[j].PrixUnitaireHT)*(oLigneCommande.Quantite));
						
						listLigneCommande.push(oLigneCommande);
					}
				}
				
				callback(listLigneCommande);
				  
		
		});
		
	
},

ReferentielMoyenneRM : function(form,listCommande,callback)
{
	var listLigneCommande = form.MoyenneRM(form,listCommande);
	var listArticleID = [];
	for(var i = 0; i<listLigneCommande.length;i++)
		{
			listArticleID.push(listLigneCommande[i].ArticleID);
		}
	
	   DMS.Mobile.ArticleRequest.connexion = form.connexion;
		DMS.Mobile.ArticleRequest.SelectAllArticles(function(listArticle){
			 for(var j = 0; j<listArticle.length;j++)
				{
					var test = true;
					for(var k =0; k<listArticleID.length;k++)
					{
					     if(listArticle[j].ArticleID == listArticleID[k])
						   {
							   test = false;
							   break;
						   }	
					}
					if(test == true)
					{
						var oLigneCommande = new DMS.Mobile.LigneCommande();
						
						oLigneCommande.Quantite =  listArticle[j].QuantiteRef;
						oLigneCommande.ArticleID = listArticle[j].ArticleID;
						oLigneCommande.PrixTotalArticleTTC = ((listArticle[j].PrixUnitaireTTC)*(oLigneCommande.Quantite));
						oLigneCommande.PrixTotalArticleHT = ((listArticle[j].PrixUnitaireHT)*(oLigneCommande.Quantite));
						
						listLigneCommande.push(oLigneCommande);
					}
				}
				
				callback(listLigneCommande);
				  
		
		});
					
},

MoyenneRMMoyenArith : function(form,listCommande,callback)
{
	var listLigneCommande = form.MoyenneRM(form,listCommande);
	
	  var listArticleID = [];
	  var totalQuantite = 0;
	  var c = 0;
		for(var i = 0; i<listLigneCommande.length;i++)
		{
			totalQuantite +=listLigneCommande[i].Quantite;
			listArticleID.push(listLigneCommande[i].ArticleID);
			c++;
		}
		
		var moyenneArithQuant = totalQuantite/c;
		
		DMS.Mobile.ArticleRequest.connexion = form.connexion;
		DMS.Mobile.ArticleRequest.SelectAllArticles(function(listArticle){
				
				  
			   for(var j = 0; j<listArticle.length;j++)
				{
					var test = true;
					for(var k =0; k<listArticleID.length;k++)
					{
					     if(listArticle[j].ArticleID == listArticleID[k])
						   {
							   test = false;
							   break;
						   }	
					}
					if(test == true)
					{
						var oLigneCommande = new DMS.Mobile.LigneCommande();
						
						oLigneCommande.Quantite = Math.round(moyenneArithQuant);
						oLigneCommande.ArticleID = listArticle[j].ArticleID;
						oLigneCommande.PrixTotalArticleTTC = ((listArticle[j].PrixUnitaireTTC)*(oLigneCommande.Quantite));
						oLigneCommande.PrixTotalArticleHT = ((listArticle[j].PrixUnitaireHT)*(oLigneCommande.Quantite));
						
						listLigneCommande.push(oLigneCommande);
					}
				}
				
				callback(listLigneCommande);
				  
		
		});
		
	
},

	MoyenneRM : function(form,listCommande)
	{
		var listObjet = form.fonctionTrie(form,listCommande);
		var listLigneCommande = [];
		for(var i =0; i<listObjet.length;i++)
		{	
			var indice = 0;
			var moyenneQuantite = 0;
			var TotalQuantite = 0;
			for(var j =0; j<listObjet[i].ListQuantite.length;j++)
			{
				TotalQuantite += listObjet[i].ListQuantite[j];
				indice++;
			}
			moyenneQuantite = TotalQuantite/indice;
			
			var ligneCommande = new DMS.Mobile.LigneCommande();
			
			ligneCommande.Quantite = Math.round(moyenneQuantite);
			ligneCommande.ArticleID = listObjet[i].LigneCommande.ArticleID;
			ligneCommande.PrixTotalArticleTTC = listObjet[i].LigneCommande.PrixTotalArticleTTC;
			ligneCommande.PrixTotalArticleHT = listObjet[i].LigneCommande.PrixTotalArticleHT;
			
		    listLigneCommande.push(ligneCommande);
		
		}
		return listLigneCommande;
	},
	
	
	fonctionTrie : function(form,listCommande)
	{
		  var oCommande = new DMS.Mobile.Commande();
		  var allListLigneCommande = [];
		  
		  for (var i =0; i<listCommande.length; i++)
		  {
			 	
			  for(var j =0; j<listCommande[i].LignesCommande.length;j++)
			  {
			         allListLigneCommande.push(listCommande[i].LignesCommande[j]);
			  }
		  }
		  
		  var allListLigneCommande = form.sortHashTable(allListLigneCommande,"ArticleID",false);
		  
		  
		  
		  var listLigneCommande = new Array();
		  var m =1;
		  for(var k = 0 ; k<allListLigneCommande.length;k++)
		  {
			  if(listLigneCommande[0] == null)
			  {
				  listLigneCommande[m-1] = allListLigneCommande[k];
			  }
			  else
			  {
				  if (listLigneCommande[m-1].ArticleID != allListLigneCommande[k].ArticleID)
				  {
					  listLigneCommande[m] = allListLigneCommande[k];
					  m++;
				  }
			  }
			  
		  }
		  
		var listObjet = [];
		//  var s =0;
		  for(var n = 0; n<listLigneCommande.length;n++)
		  {
                    var objet = new Object();
					objet.LigneCommande =listLigneCommande[n];
					objet.ListQuantite = []; 
			  for(var t = 0; t<allListLigneCommande.length;t++)
			  {
				  if(listLigneCommande[n].ArticleID == allListLigneCommande[t].ArticleID)
				  {
					//  listLigneCommande[n].ListQuantite.push(allListLigneCommande[t].Quantite);
					//  s++
					objet.ListQuantite.push(allListLigneCommande[t].Quantite);
				  }
			  }
			//  s = 0;
			listObjet.push(objet);
		  }
		  
		  
		  return listObjet;
	},
	
	
	
	/// les fonctions initialiser dans constante//
	
   unset : function(array, ind)
   {
		var output=[];
		var index = ind;
		var j = 0;
		for(var i in array)
		{
			if (i!=index)
			{
				output[j]=array[i];
				j++;
			}
		}
		return output;
   },
	
	
	sortHashTable : function(hashTable, key, removeKey) 
	{
		hashTable = (hashTable instanceof Array ? hashTable : []);
		var newHashTable = hashTable.sort(function (a, b) {
			return (typeof(a[key]) === 'number' ?  a[key] - b[key] : a[key] > b[key]);
		});
		if (removeKey) {
			for (i in newHashTable) {
				delete newHashTable[i][key];
			}
		}
		return newHashTable;
   },
   
   
 /*  synchronizeAllData : function(form)
   {
	  var SessionPersonnel = localStorage.getItem("Personnel");
	  
	  var oPersonnel = JSON.parse(SessionPersonnel);
	  
	   	DMS.Mobile.SynchronizeRequest.connexion = form.connexion;
		DMS.Mobile.SynchronizeRequest.SynchCheck(function(synchroneTest){
			
				// toutes les données sont synchronizer (true)
				if(synchroneTest == true)
				{
					DMS.Mobile.PersonnelRequest.connexion = form.connexion;
					DMS.Mobile.PersonnelRequest.DeleteAllData(null,function(){
						
						form.getAllDataFromServer(form,oPersonnel,function(){
							    localStorage.setItem("Personnel", JSON.stringify(oPersonnel));
								alert("succès de synchronisation");
								DMS.Mobile.Common.RedirectToCalendrier();
							});
						
					});
				}
				else
				{
					
					DMS.Mobile.Common.TestServer(function(AcceeServeur){
					if (AcceeServeur == true)
					{
							DMS.Mobile.SynchronizeRequest.connexion = form.connexion;
							DMS.Mobile.SynchronizeRequest.SynchronizeAll(function(test){
								if(test == "true")
								{
									DMS.Mobile.PersonnelRequest.connexion = form.connexion;
									DMS.Mobile.PersonnelRequest.DeleteAllData(null,function(){
								
								      form.getAllDataFromServer(form,oPersonnel,function(){
										  
										  localStorage.setItem("Personnel", JSON.stringify(oPersonnel));
										    alert("succès de synchronisation");
											DMS.Mobile.Common.RedirectToCalendrier();
										});
								      
									});
								}
								});
					}
					else
					{
						alert("Connexion serveur echouée");
					}
				
			   });
				}
			
			});
					
   },
   
getAllDataFromServer : function(form,oPersonnel,callback)
{

	
       DMS.Mobile.PropositionCommandeRequest.connexion = form.connexion,
       DMS.Mobile.GammeRequest.connexion = this.connexion;
	   DMS.Mobile.FamilleRequest.connexion = this.connexion;
	   DMS.Mobile.ArticleRequest.connexion = this.connexion;
	   DMS.Mobile.ProfilRequest.connexion = this.connexion;
	   DMS.Mobile.TypeMissionRequest.connexion = this.connexion;
	   DMS.Mobile.CommandeRequest.connexion = this.connexion;
	   DMS.Mobile.TourneeRequest.connexion = this.connexion;
	   DMS.Mobile.MissionRequest.connexion = this.connexion;
       DMS.Mobile.PointVenteRequest.connexion = this.connexion;
	   DMS.Mobile.ClientRequest.connexion = this.connexion;
	   DMS.Mobile.LigneCommandeRequest.connexion = this.connexion;
	   DMS.Mobile.ZoneRequest.connexion = this.connexion;
	   DMS.Mobile.VilleRequest.connexion = this.connexion;
	   DMS.Mobile.ActiviteRequest.connexion = this.connexion;
	   DMS.Mobile.PositionRequest.connexion = this.connexion;
	   DMS.Mobile.ConfigurationRequest.connexion = this.connexion;
	   DMS.Mobile.TourneePointVenteRequest.connexion = this.connexion;
	   DMS.Mobile.PictureRequest.connexion = this.connexion;
	   DMS.Mobile.FactureRequest.connexion = this.connexion;
	   DMS.Mobile.ReclamationRequest.connexion = this.connexion;
	   DMS.Mobile.PromotionRequest.connexion = this.connexion;
		DMS.Mobile.LivraisonRequest.connexion = this.connexion;
		DMS.Mobile.PromotionArticleRequest.connexion = this.connexion;
		DMS.Mobile.ArticleCommercialRequest.connexion = this.connexion;
		DMS.Mobile.PersonnelRequest.connexion = form.connexion;
      
   
			DMS.Mobile.PropositionCommandeRequest.insertProposition(function(){
				
				 DMS.Mobile.ConfigurationRequest.GetConfigurationFromServer(function(configuration){
		//    DMS.Mobile.PictureRequest.GetListPictureArticleFromServer(function(listPictureArticle){
				//lert("listPicture =" + listPictureArticle.length);
		//	DMS.Mobile.PictureRequest.GetListPicturePointVenteFromServer(function(listPicturePointVente){
				//alert("listPicture =" + listPicturePointVente.length);
		//	DMS.Mobile.PictureRequest.GetListPictureClientFromServer(function(listPictureClient){
				//alert("listPicture =" + listPictureClient.length);	
DMS.Mobile.PromotionArticleRequest.SelectAllPromotionArticleFromServer(function(lisPromotionArticle){
	
			 DMS.Mobile.PromotionRequest.GetListPromotionFromServer(function(listPromotion){	
			 DMS.Mobile.GammeRequest.GetListGammeFromServer(function(listGamme){
				 
			 DMS.Mobile.FamilleRequest.GetListFamilleFromServer(function(listFamille){
			 DMS.Mobile.ArticleRequest.GetListArticleFromServer(function(listArticle){
			 DMS.Mobile.ProfilRequest.GetListProfilFromServer(function(listProfil){
			 DMS.Mobile.TypeMissionRequest.GetListTypeMissionFromServer(function(listTypeMission){	 
			 DMS.Mobile.CommandeRequest.SelectCommandeByPersonnalFromServer(function(listCommande){	
			 DMS.Mobile.LigneCommandeRequest.SelectLigneCommandeByPersonnelFromServer(function(listLigneCommande){	
			 DMS.Mobile.TourneeRequest.SelectTourneeByPersonnalFromServer(function(listTournee){		
			 DMS.Mobile.MissionRequest.SelectMissionByPersonnelFromServer(function(Missions){	
			 DMS.Mobile.ZoneRequest.SelectZoneByPersonnelFromServer(function(zone){	
			 DMS.Mobile.VilleRequest.SelectVilleByPersonnelFromServer(function(listVille){	
			 DMS.Mobile.PointVenteRequest.SelectPointVenteByPersonnelFromServer(function(listPointVente){	
			 DMS.Mobile.ClientRequest.SelectClientByPersonnelFromServer(function(listClient){
				 //alert("client");
			 DMS.Mobile.TourneePointVenteRequest.SelectAllTournePointVenteFromServer(function(listTourneePointVente){	 
			 DMS.Mobile.ActiviteRequest.SelectActiviteByPersonnelFromServer(function(listActivite){
			 DMS.Mobile.FactureRequest.SelectFactureByPersonnelFromServer(function(listFacture){
			DMS.Mobile.ReclamationRequest.SelectReclamationByPersonnelFromServer(function(listReclamation){
			DMS.Mobile.PromotionRequest.GetListFidelisationFromServer(function(listFidelisation){
			 DMS.Mobile.PromotionArticleRequest.SelectAllFidelisationArticleFromServer(function(listFidelisationArticle){
			DMS.Mobile.LivraisonRequest.SelectLivraisonByPersonnelFromServer(function(listLivraison){
			DMS.Mobile.ArticleCommercialRequest.SelectArticleCommercialByPersonnelFromServer(function(listArticleCommercial){ 
			DMS.Mobile.PropositionCommandeRequest.SelectPropositionCommandeByIDFromServer(function(){
			DMS.Mobile.PersonnelRequest.InsertPersonnel(oPersonnel,"true",null,function(oPersonnel){
				
			
			                               callback();
			
			
			 });	
		     },oPersonnel.PersonnelID);
			 },oPersonnel.PersonnelID);	
			 },oPersonnel.PersonnelID);	
			 },oPersonnel.PersonnelID);	
			 },oPersonnel.PersonnelID);	 	
			 },oPersonnel.PersonnelID);	 
			 },oPersonnel.PersonnelID);
			 },oPersonnel.PersonnelID);	 
			 },oPersonnel.PersonnelID);	 
			 },oPersonnel.PersonnelID);
			 },oPersonnel.PersonnelID);	 
			 },oPersonnel.PersonnelID);			
			 },oPersonnel.PersonnelID);				
			 },oPersonnel.PersonnelID);		 
			 },oPersonnel.PersonnelID);		 
			 },oPersonnel.PersonnelID);
			 },oPersonnel.PersonnelID);
			 });
			 });
			 });
		     });
			 });
			 });
			 });
		//   });
		//	 });
		//	 });
			 });
			 
			});

}*/

}
	