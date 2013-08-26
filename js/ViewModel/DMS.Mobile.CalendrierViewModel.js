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
	
	SearchArray : [],
	TourneeArray : [],
	connexion: null,
	
	init : function ()
	{
		var form = this;
		DMS.Mobile.TourneeRequest.connexion = this.connexion;
		DMS.Mobile.TourneeRequest.Connect(function(listTournee){
			form.initialize(listTournee,form);
			});
			
		},
	initialize : function(listTournee,form){
		form.TourneeArray = listTournee;
		//form.insertTournee(form.TourneeArray,form);
		form.rechercheTourneeSemaineEncours(form.TourneeArray,form); 
		form.initailizeEvents(form.TourneeArray,form);
	},
	
	initailizeEvents : function (listTournee,form)
	{
		form.$SearchButton.click(function() {
				form.rechercheTourneeParDate(listTournee,form,form.$DateDebut.val(),form.$DateFin.val());
				});
		form.$Suivant.click(function() {
				form.rechercheTourneeSemaineSuivante(listTournee,form);
				});
		form.$Precedant.click(function() {
				form.rechercheTourneeSemainePrecedante(listTournee,form);
				});
		
			
	},
	
	insertTournee : function(listTournee,form)
	{
		for (var i=0;i<listTournee.length;i++){
				//alert("tournee = " + listTournee[i]);
				$(this.$TourneeContainer).append(""
				+"<tr>"
				+"<td  width='10%' class='ui-bar-c td'>"+listTournee[i].DateDebut+"</div></td>"
				+"<td class='ui-bar-f td' style='padding-right:5px;padding-left:5px;'>"
				
				+"<div data-role='collapsible' data-theme='c' data-content-theme='d' data-collapsed-icon='arrow-d' data-expanded-icon='arrow-u' data-iconpos='right'>"
				+"<h4><table id ='table' border='0' width='100%'><tr><td><img src='css/images/task2.png' id='img'></td><td width='95%'> Missions</td></tr></table></h4>"
				+"<div id='Tournee"+listTournee[i].TourneeID+"'></div>"
				+"<br/></div></td></tr>").trigger('create');
				
				DMS.Mobile.MissionRequest.connexion = form.connexion;
				
				var tourneeID = listTournee[i].TourneeID;
				//alert("TID = " + tourneeID);
				DMS.Mobile.MissionRequest.Connect(function(listMission){form.insertMission(listMission,form)},tourneeID);
		}
	},
	
	insertMission : function(listMission,form)
	{
		var tourneeID;
		var ul = $("<ul  data-role='listview' data-inset='false' id='ulmission'></ul>");
		for (var i=0;i<listMission.length;i++){
			var j = i+1;
			//alert("listMission.length = "+listMission.length);
			tourneeID = listMission[i].TourneeID;
			//alert("mission = " + listMission[i]+" missionID = " + listMission[i].MissionID);
		var li = $("<li><h3>Mission "+ j +" : </h3>"
			+"<p class='parag'> Etat Mission : " + listMission[i].EtatMission + " <br/> Date Cloture : " + listMission[i].DateCloture + " <br/> Commentaires : " + listMission[i].Commentaires + " <br/> Type Mission : <a href='#' style='color: blue ; text-decoration: none;'>" + listMission[i].TypeMissionID + "</a> <br/> Point Vente : <a href='#' style='color: blue ; text-decoration: none;'>" + listMission[i].PointVenteID +"</a></p>"
			+"</li>");
			
			if(listMission[i].DegreUrgence==0){
			$($(li)).addClass('greenprio');
			}
			if(listMission[i].DegreUrgence==1){
			$($(li)).addClass('orangeprio');
			}
			if(listMission[i].DegreUrgence==2){
			$($(li)).addClass('redprio');
			}
			
			
			$(ul).append($(li));
			}
			$("#Tournee"+tourneeID).append($(ul)).trigger('create');
			
	},
	
	rechercheTourneeParDate : function(listTournee,form,DateDebut,DateFin)
	{
		this.$TourneeContainer.empty();
		this.SearchArray = [];
		
		for (var i=0;i<listTournee.length;i++){
			
			dd1=DateDebut.split('-').reverse().join('');
			dd2=listTournee[i].DateDebut.split('/').reverse().join('');
			df1=DateFin.split('-').reverse().join('');
			df2=listTournee[i].DateDebut.split('/').reverse().join('');
		
			//alert("inside for loop :"+ i+" -> "+ dd1 +"compare to : "+dd2+"\n"+ df1 +" compare to : "+df2);
			if((dd2>=dd1)&&(df2<=df1))
			{
				this.SearchArray.push(listTournee[i]);
				//alert("Found : "+this.SearchArray[i].TourneeID);
			}
		}
		form.insertTournee(this.SearchArray,form);
		if (this.SearchArray.length==0){
			alert("Aucune Tourn\351e !")
		}
		
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
		alert("DateDebut : "+DateDebutEC+" DateFin : "+DateFinEC);
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
		alert("DateDebut : "+DateDebutSS+" DateFin : "+DateFinSS);
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
		alert("DateDebut : "+DateDebutSP+" DateFin : "+DateFinSP);
		form.rechercheTourneeParDate(listTournee,form,DateDebutSP,DateFinSP);
	}

	
	
	
}