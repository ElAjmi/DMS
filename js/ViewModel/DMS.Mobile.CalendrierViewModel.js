if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.CalendrierViewModel = {};

DMS.Mobile.CalendrierViewModel = 
{
	$TourneeContainer : null,
	$DateDebut : null,
	$DateFin : null,
	$SearchButton : null,
	$Suivant : null,
	$Precedant : null ,
	$SSuivante : null,
	$SPrecedante : null ,
	$Periode : null ,
	
	
	TourneeArray : [],
	CommercialTourneeArray :[],
	connexion: null,
	$Details : null,
		
	init : function ()
	{
		var form = this;
		DMS.Mobile.TourneeRequest.connexion = this.connexion;
		DMS.Mobile.TourneeRequest.SelectAll(function(listTournee){form.initialize(listTournee,form);});
			
		},
	initialize : function(listTournee,form){
		form.TourneeArray = listTournee;
		//form.rechercheTourneeSemaineEncours(listTournee,form);
		form.rechercheTourneeAujourdhui(listTournee,form);
		form.initailizeEvents(listTournee,form);
	},
	
	initailizeEvents : function (listTournee,form)
	{
		form.$SearchButton.click(function() {
				if(form.validateDate(form.$DateDebut.val(),form.$DateFin.val())){
					form.rechercheTourneeParDate(listTournee,form,form.$DateDebut.val(),form.$DateFin.val());
					
					}
				else alert("DateDebut doit etre < DateFin !");
				});
				
		form.$SSuivante.click(function() {
				form.rechercheTourneeSemaineSuivante(listTournee,form);
				});
				
		form.$SPrecedante.click(function() {
				form.rechercheTourneeSemainePrecedante(listTournee,form);
				});
		form.$Suivant.click(function() {
				form.rechercheTourneeDemain(listTournee,form);
				});
		form.$Precedant.click(function() {
				form.rechercheTourneeHier(listTournee,form);
				});

		
	$(document).ready(function() {  	
		 $(document).on('click','[data-role=button]',function(e) { 
			 var id = $(this).attr("id");
			if(id.substr(0,5)=="demar")
			 {
				 id = id.substr(5,id.length);
				 var text ="tourn\351e "+id+" est d\351marr\351e !";
				 DMS.Mobile.Notification.ShowMessage(text,"info",'e');
			 }
			e.preventDefault();
			 });
	});
	
	 $(document).on('click','#redircmd',function(e) { 
		DMS.Mobile.Notification.ShowMessage("Redirection vers le formulaire de saisie commande","info",'e');
	});
		
		
			
	},
	
		
	validateDate : function (DateDebut,DateFin)
	{
		dd1=DateDebut.split('-').reverse().join('');
		dd2=DateFin.split('-').reverse().join('');
		if(dd1>dd2){
			return false;
		}
		else return true;
	},
	
	
	insertTournee : function(Tournee,form)
	{
				var tmp = new Date(DMS.Mobile.Dates.SplitDate(Tournee.DateDebut));
				tmp = DMS.Mobile.Dates.Days(tmp);
				 var tournee = Tournee;
		
	//------------------------ insertion tournées --------------------------------------
				$(this.$TourneeContainer).append(""
				+"<tr>"
				+"<td  width='10%' class='ui-bar-c td'>"+tmp+"<br/>"+tournee.DateDebut+"</div></td>"
				+"<td width ='80%' class='ui-bar-f td' style='padding-right:5px;padding-left:5px;'>"
				+"<div data-role='collapsible' data-theme='c' data-content-theme='d' data-collapsed-icon='arrow-d' data-expanded-icon='arrow-u' data-iconpos='right'>"
				+"<h4><table id ='table' border='0' width='100%'><tr><td><img src='css/images/task2.png' id='img'></td><td width='95%'>Tourn\351e</td></tr></table></h4>"
				+"<div id='Tournee"+tournee.TourneeID+"'></div>"
				+"<br/></div></td>"
				+"<td width ='20%' style='vertical-align:top; padding-top:20px;' id='tdbtn'><a href='#' data-role='button' data-inline='true' data-icon='check' data-iconpos='right' data-theme='b' id='demar"+tournee.TourneeID+"'>D\351marrer</a></td>"
				+"</tr>").trigger('create');
				
	//------------------------ insertion missions --------------------------------------
				
		var ul = $("<ul  data-role='listview' data-inset='false'></ul>");
		for (var k=0;k<tournee.listMission.length;k++){
			var j = k+1;
			tourneeID = tournee.TourneeID;
			mission = tournee.listMission[k];
		var li = $("<li id='li"+mission.MissionID+"'><h2 style='color:#999999;'>Mission "+ j +" : </h2>"
			/*+"<table width='100%' border='0'>"		
			+"<tbody>"
			+"<tr>"
			+"<td>"
			
			+"<div data-role='collapsible' data-theme='c' data-content-theme='d' data-collapsed-icon='plus' data-expanded-icon='minus' data-iconpos='right' data-inset='false'>"
		   +"<h4>D\351tails Mission</h4>"
		   +"<ul  data-role='listview' data-inset='false'>"
			+"<li><p class='parag'> "
			+"<br/>Etat Mission : " + mission.EtatMission 
			+ "<br/> Date Cloture : " + mission.DateCloture 
			+ "<br/> Commentaires : " + mission.Commentaires 
			//+ "<br/> Type Mission : " + mission.TypeMissionID 
			+ "<br/> Type Mission : " + mission.TypeMissions.Titre
			+"</p></li>"
			+"</ul></div>"
			
			
			+"<div data-role='collapsible' data-theme='c' data-content-theme='d' data-collapsed-icon='plus' data-expanded-icon='minus' data-iconpos='right' data-inset='false'>"
		   +"<h4>D\351tails Point Vente</h4>"
		   +"<ul  data-role='listview' data-inset='false'>"
			+"<li><p class='parag'>"
			//+"ClientID : "+mission.PointVentes.ClientID
			+"<br/>Ville : "+mission.PointVentes.Ville.Designation+" Gouvernorat : "+mission.PointVentes.Ville.Gouvernorat
			+"<br/>Etat PointVente : "+mission.PointVentes.EtatPointVente
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
			+"<li><p class='parag'>"
			//+"ClientID : "+mission.PointVentes.ClientID
			+"<br/>Nom Responsable : "+mission.PointVentes.Client.NomResponsable
			+"<br/>Nom Soci\351te : "+mission.PointVentes.Client.NomSociete
			+"<br/>Raison Sociale : "+mission.PointVentes.Client.RaisonSocial
			+"<br/>T\351l : "+mission.PointVentes.Client.Tel
			+"<br/>Fax : "+mission.PointVentes.Client.Fax
			+"<br/>Site Web : <a>"+mission.PointVentes.Client.UrlWeb+"</a>"
			+"<br/>Email : <a>"+mission.PointVentes.Client.Email+"</a>"
			+"<br/>Activit\351 : "+mission.PointVentes.Client.Activite.Designation
			+"<br/>Etat : "+mission.PointVentes.Client.EtatClient
			+"<br/>Image : "
			+"<br/><center><img src='css/images/Carrefour.png'/></center>"
			+"</p></li>"
			+"</ul></div>"
			+"</td></tr><tr><td><div id='cmdbtn"+mission.MissionID+"' align='right'><a id='redircmd' href='#' data-role='button' data-inline='true' >Formulaire commande</a></div></td></tr><tbody></table>"*/
			
			//*****************************************************************
			
			+"<div id='wrapper'>"
			  +"<div id='tabContainer'>"
				+"<div class='tabs'>"
				  +"<ul>"
					+"<li id='tabHeader_1'>D\351tails Mission</li>"
					+"<li id='tabHeader_2'>D\351tails Client</li>"
					+"<li id='tabHeader_3'>D\351tails Point De Vente</li>"
				  +"</ul>"
				+"</div>"
				+"<div class='tabscontent'>"
				  +"<div class='tabpage' id='tabpage_1'>"
				  +"<p class='parag'> "
					+"<br/>Etat Mission : " + mission.EtatMission 
					+ "<br/> Date Cloture : " + mission.DateCloture 
					+ "<br/> Commentaires : " + mission.Commentaires 
					//+ "<br/> Type Mission : " + mission.TypeMissionID 
					+ "<br/> Type Mission : " + mission.TypeMissions.Titre
					+"</p>"
				  +"</div>"
				  +"<div class='tabpage' id='tabpage_2'>"
					  +"<p class='parag'>"
						//+"ClientID : "+mission.PointVentes.ClientID
						+"<br/>Nom Responsable : "+mission.PointVentes.Client.NomResponsable
						+"<br/>Nom Soci\351te : "+mission.PointVentes.Client.NomSociete
						+"<br/>Raison Sociale : "+mission.PointVentes.Client.RaisonSocial
						+"<br/>T\351l : "+mission.PointVentes.Client.Tel
						+"<br/>Fax : "+mission.PointVentes.Client.Fax
						+"<br/>Site Web :"+mission.PointVentes.Client.UrlWeb
						+"<br/>Email :"+mission.PointVentes.Client.Email
						+"<br/>Activit\351 : "+mission.PointVentes.Client.Activite.Designation
						+"<br/>Etat : "+mission.PointVentes.Client.EtatClient
						+"<br/>Image : "
						+"<br/><center><img src='css/images/Carrefour.png'/></center>"
						+"</p>"
				  +"</div>"
				  +"<div class='tabpage' id='tabpage_3'>"
				  +"<p class='parag'>"
					//+"ClientID : "+mission.PointVentes.ClientID
					+"<br/>Ville : "+mission.PointVentes.Ville.Designation+" Gouvernorat : "+mission.PointVentes.Ville.Gouvernorat
					+"<br/>Etat PointVente : "+mission.PointVentes.EtatPointVente
					+"<br/>Responsable : "+mission.PointVentes.Responsable
					+"<br/>Adresse : "+mission.PointVentes.Adresse
					+"<br/>T\351l : "+mission.PointVentes.Tel
					+"<br/>Fax : "+mission.PointVentes.Fax
					+"<br/>Email : "+mission.PointVentes.Email
					+"</p>"
				  +"</div>"
				+"</div>"
			  +"</div>"
			+"</div>"
			
			+"</li>");
			
						
			if(mission.DegreUrgence==0){
			$($(li)).addClass('greenprio');
			}
			if(mission.DegreUrgence==1){
			$($(li)).addClass('orangeprio');
			}
			if(mission.DegreUrgence==2){
			$($(li)).addClass('redprio');
			}
			
			$(ul).append($(li));
				
						
			}
									
			$("#Tournee"+tournee.TourneeID).append($(ul)).trigger('create');
			
			for (var k=0;k<tournee.listMission.length;k++){
				var m = tournee.listMission[k];
				if(m.TypeMissions.Titre!="Titre Type Mission")
				{
					$('#cmdbtn'+m.MissionID).hide();
				}
			}
			
			var container = $("#tabContainer");
		var tabcon = $(".tabscontent div");
		//alert(tabcon.childNodes.item(1));
    // set current tab
    var navitem = $("#tabHeader_1");
		
    //store which tab we are on
    var ident = $(navitem).attr("id").split("_")[1];
		//alert(ident);
    $(navitem).parent().attr("data-current",ident);
    //set current tab with class of activetabheader
   $(navitem).attr("class","tabActiveHeader");

    //hide two tab contents we don't need
   	 
    	$(tabcon).each(function(index, element) {
            if (index != 0){
				$(this).hide();
			}
        });
    //this adds click event to tabs
    var tabs = $(container).find("li");
	$(tabs).each(function(index, element) {
        $(this).click(function(e) {
            var current = $(this).parent().attr("data-current");
  //remove class of activetabheader and hide old contents
  $("#tabHeader_" + current).attr("class","");
   $("#tabpage_" + current).hide();

  var ident = $(this).attr("id").split("_")[1];
  //add class of activetabheader to new active tab and show contents
  $(this).attr("class","tabActiveHeader");
  $("#tabpage_" + ident).show();
  $(this).parent().attr("data-current",ident);
        });;
    });
	},
	
	
	rechercheTourneeParDate : function(listTournee,form,DateDebut,DateFin)
	{
		
		//$(this.$Periode).text("Du "+DateDebut+" Au "+DateFin);
		
		this.$TourneeContainer.empty();
		var cmp = 0;
		var Tour = new DMS.Mobile.Tournee;
		//affichage entete
			var tmp1 = new Date(DMS.Mobile.Dates.SplitDate(DateDebut));
			//alert(tmp1)
			tmp1 = DMS.Mobile.Dates.Days(tmp1);
			var tmp2 = new Date(DMS.Mobile.Dates.SplitDate(DateFin));
			//alert(tmp2)
			tmp2 = DMS.Mobile.Dates.Days(tmp2);
			dd1=DateDebut.split('-').reverse().join('');	
			df1=DateFin.split('-').reverse().join('');
		  if (dd1==df1){$(this.$Periode).text(tmp1+", le "+DateDebut);}
		  else {$(this.$Periode).text("Du "+tmp1+" "+DateDebut+" Au "+tmp2+" "+DateFin);}
			
		for (var i=0;i<listTournee.length;i++){
			 var tournee = listTournee[i];
			 
			dd1=DateDebut.split('-').reverse().join('');
			dd2=tournee.DateDebut.split('/').reverse().join('');
			df1=DateFin.split('-').reverse().join('');
			df2=tournee.DateDebut.split('/').reverse().join('');
			// test tournee entre dates
			if((dd2>=dd1)&&(df2<=df1))
			{
				form.insertTournee(tournee,form);
				cmp = cmp+1
			}
		}
		if (cmp==0){
			//alert("Aucune Tourn\351e !");
			DMS.Mobile.Notification.ShowMessage("Aucune Tourn\351e pour cette date !","alert",'e');
		}
		
	},
	
		
	rechercheTourneeAujourdhui : function(listTournee,form)
	{
		this.$TourneeContainer.empty();
		var curr = new Date();
		var DateDebutA = DMS.Mobile.Dates.Dayformat(curr);
		var DateFinA= DMS.Mobile.Dates.Dayformat(curr);
		form.rechercheTourneeParDate(listTournee,form,DateDebutA,DateFinA);
	},
	
	rechercheTourneeDemain : function(listTournee,form)
	{
		var curr = new Date();
		var tomorrow = new Date(curr.getTime() + 24 * 60 * 60 * 1000);
		var DateDebutD = DMS.Mobile.Dates.Dayformat(curr);
		var DateFinD= DMS.Mobile.Dates.Dayformat(tomorrow);
		form.rechercheTourneeParDate(listTournee,form,DateDebutD,DateFinD);
	},
	
	rechercheTourneeHier : function(listTournee,form)
	{
		var curr = new Date();
		var yesterday = new Date(curr.getTime() - 24 * 60 * 60 * 1000);
		var DateDebutH = DMS.Mobile.Dates.Dayformat(curr);
		var DateFinH= DMS.Mobile.Dates.Dayformat(yesterday);
		form.rechercheTourneeParDate(listTournee,form,DateDebutH,DateFinH);
	},
	
	
	rechercheTourneeSemaineEncours : function(listTournee,form)
	{
		this.$TourneeContainer.empty();
		var curr = new Date();
		var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()+1));
		var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay()+7));
		//alert("first day : "+firstday+"last day : "+lastday);
		var DateDebutEC = DMS.Mobile.Dates.Dayformat(firstday);
		var DateFinEC = DMS.Mobile.Dates.Dayformat(lastday);
		//alert("DateDebut : "+DateDebutEC+" DateFin : "+DateFinEC);
		form.rechercheTourneeParDate(listTournee,form,DateDebutEC,DateFinEC);
	},
	
	rechercheTourneeSemaineSuivante : function(listTournee,form)
	{
		this.$TourneeContainer.empty();
		var curr = new Date();
		var Nextweek = DMS.Mobile.Dates.Nextweek(curr);
		var firstday = new Date(Nextweek.setDate(Nextweek.getDate() - Nextweek.getDay()+1));
		var lastday = new Date(Nextweek.setDate(Nextweek.getDate() - Nextweek.getDay()+7));
		//alert("first day : "+firstday+"last day : "+lastday);
		var DateDebutSS = DMS.Mobile.Dates.Dayformat(firstday);
		var DateFinSS = DMS.Mobile.Dates.Dayformat(lastday);
		//alert("DateDebut : "+DateDebutSS+" DateFin : "+DateFinSS);
		form.rechercheTourneeParDate(listTournee,form,DateDebutSS,DateFinSS);
	},
	
	rechercheTourneeSemainePrecedante : function(listTournee,form)
	{
		this.$TourneeContainer.empty();
		var curr = new Date();
		var Lastweek = DMS.Mobile.Dates.Lastweek(curr);
		var firstday = new Date(Lastweek.setDate(Lastweek.getDate() - Lastweek.getDay()+1));
		var lastday = new Date(Lastweek.setDate(Lastweek.getDate() - Lastweek.getDay()+7));
		//alert("first day : "+firstday+"last day : "+lastday);
		var DateDebutSP = DMS.Mobile.Dates.Dayformat(firstday);
		var DateFinSP = DMS.Mobile.Dates.Dayformat(lastday);
		//alert("DateDebut : "+DateDebutSP+" DateFin : "+DateFinSP);
		form.rechercheTourneeParDate(listTournee,form,DateDebutSP,DateFinSP);
	},
	
	 Display :function(obj)
	 {
	    var str = '';
	    for (var p in obj) {
	        if (obj.hasOwnProperty(p)) {
	            str += p + ' : ' + obj[p] + '\n';
	        }
	    }
	    return str;
	}     

	
	
	
}