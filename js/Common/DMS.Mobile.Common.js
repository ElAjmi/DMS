if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Common = {};

DMS.Mobile.Common = 
{
	connexion : null,
	AcceeServeur: null,
	modeDebug : false,
	modeDebug2 : false,
	    tab_jour : new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"),
	//tab_mois : new Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"),
		tab_mois : new Array("Jan", "F\351v", "Mar", "Avr", "Mai", "Jui", "Jui", "Aoû", "Sep", "Oct", "Nov", "D\351c"),
    //configuration : this.GetConfiguration,
	//ServeurUrl : "http://192.168.1.8:80/ninject/Service1.svc/",
	//PositionDelay :12000 ,
	//Perimetre : 5,
	//ServeurUrl : configuration.URL,
	//PositionDelay : configuration.Frequence,
	//Perimetre : configuration.Perimetre,
	
	
	//*************************** Difference entre 2 date (en jour , heurs, minute, seconde) ******//
	
dateDiff : function(date1, date2){
    var diff = {};                           // Initialisation du retour
    var tmp = date2 - date1;
 
    tmp = Math.floor(tmp/1000);             //Nombre de secondes entre les 2 dates
    diff.sec = tmp % 60;                    // Extraction du nombre de secondes
 
    tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
    diff.min = tmp % 60;                    // Extraction du nombre de minutes
 
    tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
    diff.hour = tmp % 24;                   // Extraction du nombre d'heures
     
    tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
    diff.day = tmp;
     
    return diff;
},
	
	//****************************************************************************//
	
	//************************************ fonction de synchronisation ************************************//
	 synchronizeAllData : function(callback)
   {
	   var form = this;
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
								//DMS.Mobile.Common.RedirectToCalendrier();
							    callback();
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
											callback();
											//DMS.Mobile.Common.RedirectToCalendrier();
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
					  DMS.Mobile.PictureRequest.GetListPictureFamilleFromServer(function(listPictureFamille){
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
			 
			});

},

	//*****************************************************************************************************//
	
	
	
	//*********************** Fonctions d'insertion des exceptions dans la BD locle **********************//
	InsertException : function (oException,callback)
	{
		try
	    {
			var form = this;
	        form.InsertExceptionIntoLOCAL(oException,form,callback);
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertException in Common",'alert','e'); 
		}
	},
	
	InsertExceptionIntoLOCAL : function(oException,formReq,callback)
	{
		try
	    {
		 formReq.connexion.transaction(function(tx){ formReq.InsertIntoException(tx, formReq,oException); }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoException");},function(){
							
						callback();		
		   });
	    }
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertExceptionIntoLOCAL in Common",'alert','e'); 
		}
	},
	
	InsertIntoException : function (requete, form, oException)
	{
			try
	{
		requete.executeSql('INSERT INTO Exception (FichierE,FonctionE,Exception,Synch)VALUES("'+oException.FichierE+'","'+oException.FonctionE+'","'+oException.Exception+'","'+oException.synch+'")');
			}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoException in Common",'alert','e'); 
		}
	},
	
	//****************************************************************************************************//
	
	//*********** fonctions utilisées pour la compraison des deux dates ***********//
	  dateGet : function(strDate){	  
	    day = strDate.substring(0,2);
		month = strDate.substring(3,5);
		year = strDate.substring(6,10);
		d = new Date();
		d.setDate(day);
		d.setMonth(month);
		d.setFullYear(year); 
		return d;  
	  },
	  
	  //Retorune:
	  //   0 si date_1=date_2
  	  //   1 si date_1>date_2
	  //  -1 si date_1<date_2	  
	   compare : function(date_1, date_2){
	    diff = date_1.getTime()-date_2.getTime();
	    return (diff==0?diff:diff/Math.abs(diff));
	   },
	
	//*****************************************************************************//
	
	DateInverseSpliting : function(date)
	{//new Date('2011-04-11')


		
		
		var elem = date.split('/');
		jour = elem[0];
		mois = elem[1];
		annee = elem[2];
		
		var d = ''+annee+'-'+mois+'-'+jour;
		
		//String s = "2011-07-08 03:48:45";
        //var sdf = new Date(d);
return d;
	},
	
	
	DateSplitingFormat : function(date){
	try
	{
		//var elem = date.split('/');
		var elem = date.split('-');
		jour = elem[2];
		mois = elem[1];
		annee = elem[0];
		
		if (jour.length == 1)
		{
			 jour = "0"+jour;
		}
		if (mois.length == 1)
		{
			 mois = "0"+mois;
		}
		
		return ''+jour+'/'+mois+'/'+annee;//format dd/mm/yyyy
		}
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : DateSpliting in Dates",'alert','e'); 
	}
  }	,
	
		DateSplitingFormat1 : function(date){
	try
	{
		if (date == "")
		{
			return "";
		}
		else
		{
			//var elem = date.split('/');
			var elem = date.split('-');
			jour = elem[2];
			mois = elem[1];
			annee = elem[0];
			
		
			
			return ''+jour+'/'+mois+'/'+annee;//format dd/mm/yyyy
		}
		}
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : DateSpliting in Dates",'alert','e'); 
	}
  }	,
	
	
	
	
	 getWeekNumber : function(uneDate) {
		var d = new Date(uneDate);
		var DoW = d.getDay();
		d.setDate(d.getDate() - (DoW + 6) % 7 + 3); // Nearest Thu
		var ms = d.valueOf(); // GMT
		d.setMonth(0);
		d.setDate(4); // Thu in Week 1
		return Math.round((ms - d.valueOf()) / (7 * 864e5)) + 1;
	},
	
	
	init : function(callback)
	{
		try
		{
			
			//localStorage.setItem("Configuration", null);
			//localStorage.setItem("Personnel", null);
			
		//	var Conf = JSON.parse(localStorage.getItem("Configuration"));

	var SessionConf = localStorage.getItem("Configuration");
if ( SessionConf != null)
		  {
		  Conf = JSON.parse(SessionConf);
		  }
		  else
		  {
			  Conf = null;
			 }
	
			
			
			this.initCanvasLoader();
			if (Conf == null)
			{
					configurationDTO = new DMS.Mobile.Configuration();
	
	                    configurationDTO.SeuilArticle = 1500;
						configurationDTO.Frequence = 12000;
						configurationDTO.Perimetre = 5;
						//configurationDTO.URL = "http://192.168.1.111:80/ninject/Service1.svc/";
					    //configurationDTO.URL = "http://scan-ingeniering.no-ip.biz:4000/Service1.svc/";
					
					 configurationDTO.URL = "http://192.168.1.100:4001/Service1.svc/";
					
					    //configurationDTO.URL = "http://41.227.44.224:4000/Service1.svc/";
						//configurationDTO.URL = "http://localhost:1307/Service1.svc/";
						
						  localStorage.setItem("Configuration", JSON.stringify(configurationDTO));
			}
	
		   callback();
		}
		catch(err)
		{
			//alert(err.message);
			DMS.Mobile.Notification.ShowMessage(err.message+" : init in common",'alert','e'); 
		}
	
	},
		
		
			ParseDateTimeJson : function(d)
		{
			try
			{
				//var date = new Date(eval(d.split('/').reverse().join('')));
				var date = eval("new "+ d.split('/').reverse().join(''));
					var day = date.getDate();
					var month = (1+date.getMonth());
					var year = date.getFullYear().toString();
					var hours = date.getHours();
				    var minutes = date.getMinutes();
					var secondes = date.getSeconds();
					if(hours < 10)
					{
						hours = "0"+hours;
					}
					if(minutes < 10)
					{
						minutes = "0"+minutes;
					}
					if(secondes < 10)
					{
						secondes = "0"+secondes;
					}
					
					if (day < 10)
					{
						 day = "0"+day;
					}
					if (month < 10)
					{
						 month = "0"+month;
					}
									
						
						return(year + '-' + month + '-'  + day+' '+hours+':'+minutes+':'+secondes);
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : ParseDateJson in common" ,'alert','e'); 
			}
		},
		
		
		ParseDateJson : function(d)
		{
			try
			{
				//var date = new Date(eval(d.split('/').reverse().join('')));
				var date = eval("new "+ d.split('/').reverse().join(''));
					var day = date.getDate();
					var month = (1+date.getMonth());
					var year = date.getFullYear().toString();
					
					if (day < 10)
					{
						 day = "0"+day;
					}
					if (month < 10)
					{
						 month = "0"+month;
					}
					
						return(day + '/' + month + '/'  + year);
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : ParseDateJson in common" ,'alert','e'); 
			}
		},
		ParseHeureJson : function(d)
		{
			try
			{
				var date = eval("new "+ d.split('/').reverse().join(''));
				var hours = date.getHours();
				var minutes = date.getMinutes();
				if(hours < 10)
				{
					hours = "0"+hours;
				}
				if(minutes < 10)
				{
					minutes = "0"+minutes;
				}
				
				return(hours+':'+minutes);
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : ParseHeureJson in common",'alert','e'); 
			}
		},		
		currentHours : function()
		{
			try
			{
				var date = new Date;
				var hours = (date.getHours());
				var minutes = date.getMinutes();
				if(hours < 10)
				{
					hours = "0"+hours;
				}
				if(minutes < 10)
				{
					minutes = "0"+minutes;
				}
				
				return(hours+':'+minutes);
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : currentHours in common",'alert','e'); 
			}
		},
		
		numDayInWeek : function(date)
		{
			var form = this;
			var day = date.getDay();
			return day
		},
		getJour : function(date)
		{
			var form = this;
			var day = date.getDay();
			var jourString = form.tab_jour[day]
			return jourString;
	    },
		
		getDateCalender : function (date)
		{
			var form = this;
			var day = date.getDay();
			var jourString = form.tab_jour[day];
			var dayNum = date.getDate();
			var month = (1+date.getMonth());
			var moisString = form.tab_mois[month-1];
			var year = date.getFullYear().toString();
			
			return (dayNum+'  '+moisString+'.'+year);
		},
			
		formatDate : function(date)
		{
			try
			{
				    var day = date.getDate();
					var month = (1+date.getMonth());
					var year = date.getFullYear().toString();
					
					if (day < 10)
					{
						 day = "0"+day;
					}
					if (month < 10)
					{
						 month = "0"+month;
					}
					
						return(day + '/' + month + '/'  + year);
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : formatDate in common",'alert','e'); 
			}

		},
		
		formatDateYear : function(date)
		{
			try
			{
				    var day = date.getDate();
					var month = (1+date.getMonth());
					var year = date.getFullYear().toString();
					
				
						return(year );
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : formatDateYear in common",'alert','e'); 
			}

		},
		
	formatDateDayMonth : function(date)
		{
			try
			{
				    var day = date.getDate();
					var month = (1+date.getMonth());
					var year = date.getFullYear().toString();
					
					if (day < 10)
					{
						 day = "0"+day;
					}
					if (month < 10)
					{
						 month = "0"+month;
					}
					
						return(day + '/' + month );
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : formatDateDayMonth in common",'alert','e'); 
			}

		},
		
		currentDate : function()
		{
			try
			{
				var date = new Date;
				var day = date.getDate();
					var month = (1+date.getMonth());
					var year = date.getFullYear().toString();
					
					if (day < 10)
					{
						 day = "0"+day;
					}
					if (month < 10)
					{
						 month = "0"+month;
					}
					
						return(day + '/' + month + '/'  + year);
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : currentDate in common",'alert','e'); 
			}
		},
		
	DisplayProperty :function(obj)
	 {
		 try
		 {
			var str = '';
			for (var p in obj) {
				if (obj.hasOwnProperty(p)) {
					str += p + ' : ' + obj[p] + '\n';
				}
			}
			alert(str);
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : DisplayProperty in common",'alert','e'); 
		}
	},  
	
	errors:function (err,type) {
        alert("error in "+type+" : " + err.message);   
    },
	
	
	Alert : function(obj)
	{
		if(this.modeDebug == true)
		{
			alert(obj);
		}
	},
	Alert2 : function(obj)
	{
		if(this.modeDebug2 == true)
		{
			alert(obj);
		}
	},
	
	RedirectToLogin : function()
	{
		window.location = './login.html';
	},
	
	RedirectToPromotion : function()
	{
		window.location = './Promotion.html';
	},
	
	RedirectToRefrenceArticle : function()
	{
		window.location = './ArticleReferentiel.html';
	},
	
	RedirectToGallery: function()
	{
		window.location = './Galery.html';
	},
	
	RedirectToFidelisation : function()
	{
		document.location.href = './Fidelisation.html';
	},
	
	RedirectToCalendrier : function()
	{
		//window.location = './Calendrier2.html';
	     document.location.href = './Calendrier2.html';
	},
	
	RedirectToArticleEnRepture : function()
	{
		document.location.href = './ListArticleRepture.html';
	},
	
	RedirectToCommande : function()
	{
		window.location = './FormulaireCommande2.html';
	},
	
	RedirectToReclamation : function()
	{
		window.location = './ListReclamation.html';
	},
	
	RedirectToListeCommandes : function()
	{
		window.location = './Commande.html';
	},
	
	RedirectToLivraison : function()
	{
		window.location = './Livraison.html';
	},
	
	RedirectionToMissionsParPointVente: function()
	{
		window.location = './MissionsPV.html';
	},
	
	redirectionToService: function()
	{
		window.location = './index-2.0.0.html';
	},
	
	
	initCanvasLoader : function()
	{
		
	},
	
	ChangeInformationLabel : function(text)
	{
		$("#informationLabel").text(text);
	},
	DrawLoading : function(callback)
	{
		try
		{   // $('#canvasloader-container').show();
			//var cl = null; 
			cl = new CanvasLoader('canvasloader-container');
			cl.setColor('#100b9e'); // default is '#000000'
			cl.setShape('roundRect'); // default is 'oval'
			cl.setDiameter(29); // default is 40
			cl.setDensity(15); // default is 40
			cl.setRange(1.2); // default is 1.3
			cl.setSpeed(1); // default is 2
			cl.setFPS(20); // default is 24
			
			
			// This bit is only for positioning - not necessary
			  var loaderObj = document.getElementById("canvasLoader");
			loaderObj.style.position = "absolute";
			loaderObj.style["top"] = cl.getDiameter() * -0.5 + "px";
			loaderObj.style["left"] = cl.getDiameter() * -0.5 + "px";
			
			DMS.Mobile.Login.canvasLoader = cl;
			//cl.show(); // Hidden by default
			callback();
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : DrawLoading in common",'alert','e'); 
		}
	},
	
	stopDraw : function()
	{
		//$('#canvasloader-container').hide();
	
	},
	
	
	
/*	CallService1 : function(callback,Url,form1)
	{
		var ip = "192.168.1.100:4000"
	         form1.ping(ip,function(msg){
				 
				 alert(msg);
				 });	
	},
	
	 ping : function(ip, callback) {

    if (!this.inUse) {
        this.status = 'unchecked';
        this.inUse = true;
        this.callback = callback;
        this.ip = ip;
        var _that = this;
        this.img = new Image();
        this.img.onload = function () {
            _that.inUse = false;
            _that.callback('responded');

        };
        this.img.onerror = function (e) {
            if (_that.inUse) {
                _that.inUse = false;
                _that.callback('responded121', e);
            }

        };
        this.start = new Date().getTime();
        this.img.src = "http://" + ip;
        this.timer = setTimeout(function () {
            if (_that.inUse) {
                _that.inUse = false;
                _that.callback('timeout');
            }
        }, 1500);
    }
},*/
/*{
       $.ajax({
          url: 'http://192.168.1.100',
          success: function(result){
             alert('reply');
          },     
          error: function(result){
              alert('timeout/error');
			  alert(result.text);
          }
       });
    },*/


/*{
	var ip = "192.168.1.100:4000";
  if(!this.inUse) {

    this.inUse = true;
    this.callback = callback
    this.ip = ip;

    var _that = this;

    this.img = new Image();

    this.img.onload = function() {_that.good();};
    this.img.onerror = function() {_that.good();};

    this.start = new Date().getTime();
    this.img.src = "http://" + ip;
    this.timer = setTimeout(function() { _that.bad(function(data){
		alert(data);
		});}, 1500);
alert( this.timer );
  }
},*/
	

     CallService: function(callback,Url,form1) 
	 {
		
		 
		 try
		 {
				var form = this;
				 DMS.Mobile.Common.Alert("CallService");
				 
					$.ajax({
						async: false,
                        data: "{}",
						cache: true,
						url: Url,
						type: "GET",
						contentType: "application/javascript",
						dataType: "jsonp",
				
						success: function(msg) {
							form.AcceeServeur = true;
							DMS.Mobile.Common.Alert("result = " + msg);
							form.ServiceSucceeded(msg,callback,form1);
						},  
						 error: function (msg) {
							 form.AcceeServeur = false;
                             form.ServiceFailed(msg);
                        }
					});
		
		 }
		 catch(err)
		 {
			 form.AcceeServeur = false;
             form.ServiceFailed(err);
		 }
					
    },
   ServiceFailed: function(xhr) {
	  
			   alert("ServiceFailed" + xhr.responseText);
		
				if (xhr.responseText) {
					var err = xhr.responseText;
					if (err)
						error(err);
					else
						error({ Message: "Unknown server error." })
				}
			return;
		
		
		},
		
   ServiceSucceeded: function(result,callback,form) {
	   try
	   {
			//alert("result = " + result);					

			   JsonObject = result;
			   
			   callback(JsonObject,form);	
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : ServiceSucceded in common",'alert','e'); 
		}		   
		},
	
	TestServer : function(callback)
	{
		try
		{
			var Conf = JSON.parse(localStorage.getItem("Configuration"));

			var form = this;
			var methode = "TestServer?";
			 var URL =Conf.URL+methode;
			 
			 var form = this;
				DMS.Mobile.Common.CallService(function(Json,Form){callback(form.AcceeServeur);},URL,form);
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : TestServer in common",'alert','e'); 
		}
	},
		
	/*	TestServerFunction : function(json,form)
		{
			if ( json != null)
			{
				form.AcceeServeur = json;
			}
		    else 
		    {
				form.AcceeServeur = false;
			}
			   
		},
	
	*/
	
	
	 deg2rad: function (angle){
		 try
		 {
    // Converts the number in degrees to the radian equivalent  
    // 
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/deg2rad    // +   original by: Enrique Gonzalez
    // *     example 1: deg2rad(45);
    // *     returns 1: 0.7853981633974483
    return (angle / 180) * Math.PI;
	}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : deg2rad in common",'alert','e'); 
		}
},
 
 calculDistanceKM:function (lat1,long1,lat2,long2)
 {
	 try
	 {
				var r = 6366;
				 
				var lat1 = lat1;
				var lon1 = long1;
				 
				var lat2 = lat2;
				var lon2 = long2;
			 
			/**
			 * Conversion des entrées en ° vers des Radians
			 */
			lat1 = this.deg2rad(lat1);
			lon1 = this.deg2rad(lon1);
			lat2 = this.deg2rad(lat2);
			lon2 = this.deg2rad(lon2);
			 
			/**
			 * Formule simple
			 * d=acos(sin(lat1)*sin(lat2)+cos(lat1)*cos(lat2)*cos(lon1-lon2))
			 */
			 
			var ds = Math.acos( Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon1-lon2) );
			ds = ds * r;
			return ds // Distance en km : 0.024053337627628308
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : calculDistanceKM in common",'alert','e'); 
		}
}
	
	
}