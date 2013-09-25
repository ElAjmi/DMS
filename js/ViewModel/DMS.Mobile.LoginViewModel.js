if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Login = {};

DMS.Mobile.Login = 
{
	$ValidateButton: null,
    $login:null,
    $password:null,
	
    connexion: null,
	Personnel: null,
	PersonnelLogin: null,

    Initialise: function () {
	try
	{	
	this.InitialiseEvents();
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
	   
	   
	   
	   DMS.Mobile.PersonnelRequest.connexion = this.connexion;
       
	   	}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : Initialise in LoginViewModel",'alert','e'); 
			}
    },
	
	InitialiseEvents: function () {
		try
		{
		var form = this;
		   this.$ValidateButton.click(function(){
			$(this).addClass('ui-disabled');
			   alert("button");
				form.ValidateLogin();
				
				DMS.Mobile.Common.DrawLoading();
				
				
			
			});
				}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : InitiliseEvents in LoginViewModel",'alert','e'); 
			}
       
    },
	
	
	ValidateLogin:function(){
		try
		{
		alert("validateLogin");
	    var form = this;
		DMS.Mobile.PersonnelRequest.VerifyPersonnelInLocalSession($(this.$login).val(), $(this.$password).val(),function(personnel){form.fonction1(personnel,form)});
		
		//DMS.Mobile.PersonnelRequest.GetPersonnelFromServer($(this.$login).val(), $(this.$password).val(),function(personnel){form.fonction2(personnel,form);});	
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : ValidateLogin in LoginViewModel",'alert','e'); 
			}
		},
		
		
		fonction1 : function(personnel,form)
		{
			alert("fonction1");
			try
			{
			if ( personnel == null)
			{
			  DMS.Mobile.Common.TestServer(function(AcceeServeur){
			
					if (AcceeServeur == true)
					{
						DMS.Mobile.PersonnelRequest.GetPersonnelFromServer($(form.$login).val(), $(form.$password).val(),function(personnel){form.fonction2(personnel,form);});
		
					}
					else
					{
						alert("Connexion serveur echouée");
					}
				
			   });
			
			}
			else
			{				
			alert("accees local");
			alert(personnel.PersonnelID);
			
			var listPointVente = [];
			var listMission = [];
			var listClient = [];
			var listTournee = [];
			
			
				
				sessionStorage.setItem("userID", JSON.stringify(personnel.PersonnelID));
				//sessionStorage.setItem("accee", JSON.stringify(1));
				DMS.Mobile.ConfigurationRequest.SelectConfiguration(function(configuration){
					
				  DMS.Mobile.TourneeRequest.SelectAll(function(ListTournee){
					listTournee = ListTournee;
					alert("nbr tournee : "+listTournee.length);
					if (listTournee.length>0)
					{
						for(var i = 0; i<listTournee.length;i++)
						{
							for(var k = 0; k<listTournee[i].listMission.length;k++)
							{
						    	listMission.push(listTournee[i].listMission[k]);
							}
						}
						alert("nb mission : "+listMission.length);
						if(listMission.length>0)
						{
							for(var j = 0;j<listMission.length;j++)
							{
								listPointVente.push(listMission[j].PointVentes);
							}
							
							alert("nbr pv : "+listPointVente.length);
							if(listPointVente.length>0)
							{
								for(var m = 0; m<listPointVente.length; m++)
								{
									alert("client : "+listPointVente[m].Client);
									listClient.push(listPointVente[m].Client);
								}
							}
						
						}	
						
						  sessionStorage.setItem("ListPointVente", JSON.stringify(listPointVente));
						  sessionStorage.setItem("ListMission", JSON.stringify(listMission));
						  sessionStorage.setItem("ListClient", JSON.stringify(listClient));
						  sessionStorage.setItem("ListTournee", JSON.stringify(listTournee));
						  sessionStorage.setItem("Configuration", JSON.stringify(configuration));
						
						DMS.Mobile.Common.RedirectToCalendrier();
						//DMS.Mobile.PositionRequest.InitializeGetPosition();
					}
					
					;});
				});
				
			}
	}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : fonction1 in LoginViewModel",'alert','e'); 
			}
		},
		
		fonction2 : function(personnel,form)
		{
			try
			{
			if ( personnel == null)
			{
				alert("login et/ou mot de passe incorrecte");
			}
			else
			{
				alert("accees serveur");
			 var synch = "true";
			 
			 sessionStorage.setItem("userID", JSON.stringify(personnel.PersonnelID));
			// sessionStorage.setItem("accee", JSON.stringify(0));
	
		     DMS.Mobile.ConfigurationRequest.GetConfigurationFromServer(function(configuration){
			 DMS.Mobile.GammeRequest.GetListGammeFromServer(function(listGamme){
			 DMS.Mobile.FamilleRequest.GetListFamilleFromServer(function(listFamille){
			 DMS.Mobile.ArticleRequest.GetListArticleFromServer(function(listArticle){
			 DMS.Mobile.ProfilRequest.GetListProfilFromServer(function(listProfil){
			 DMS.Mobile.TypeMissionRequest.GetListTypeMissionFromServer(function(listTypeMission){
			 DMS.Mobile.CommandeRequest.SelectCommandeByPersonnalFromServer(function(listCommande){ 
			 DMS.Mobile.LigneCommandeRequest.SelectLigneCommandeByPersonnelFromServer(function(listLigneCommande){
			 DMS.Mobile.TourneeRequest.SelectTourneeByPersonnalFromServer(function(listTournee){
			 DMS.Mobile.MissionRequest.SelectMissionByPersonnelFromServer(function(listMission){
			 DMS.Mobile.ZoneRequest.SelectZoneByPersonnelFromServer(function(zone){
			 DMS.Mobile.VilleRequest.SelectVilleByPersonnelFromServer(function(listVille){
			 DMS.Mobile.PointVenteRequest.SelectPointVenteByPersonnelFromServer(function(listPointVente){
			 DMS.Mobile.ClientRequest.SelectClientByPersonnelFromServer(function(listClient){
			 DMS.Mobile.ActiviteRequest.SelectActiviteByPersonnelFromServer(function(listActivite){
			 
			                      alert("redirection");
								  sessionStorage.setItem("ListPointVente", JSON.stringify(listPointVente));
								  sessionStorage.setItem("ListMission", JSON.stringify(listMission));
								  sessionStorage.setItem("ListClient", JSON.stringify(listClient));
								  sessionStorage.setItem("ListTournee", JSON.stringify(listTournee));
								  sessionStorage.setItem("Configuration", JSON.stringify(configuration));
								 DMS.Mobile.Common.RedirectToCalendrier();
						//DMS.Mobile.PositionRequest.InitializeGetPosition();

				 
			 },personnel.PersonnelID);	 
			 },personnel.PersonnelID);	 
			 },personnel.PersonnelID);
			 },personnel.PersonnelID);	 
			 },personnel.PersonnelID);			
			 },personnel.PersonnelID);				
			 },personnel.PersonnelID);		 
			 },personnel.PersonnelID);		 
			 },personnel.PersonnelID);
			 });
			 });
			 });
			 });
			 });
			 });
			  
		
			}
					
		/*	 DMS.Mobile.MissionRequest.SelectMissionByPersonnelFromServer(function(listMission){
			 DMS.Mobile.PointVenteRequest.SelectPointVenteByPersonnelFromServer(function(listPointVente){
			 DMS.Mobile.ClientRequest.SelectClientByPersonnelFromServer(function(listClient){
			
			 
			                      alert("redirection");
								  sessionStorage.setItem("ListPointVente", JSON.stringify(listPointVente));
								  sessionStorage.setItem("ListMission", JSON.stringify(listMission));
								  sessionStorage.setItem("ListClient", JSON.stringify(listClient));
								//  DMS.Mobile.Common.RedirectToCalendrier();
								alert("verifyIntoPointVente");
								DMS.Mobile.PositionRequest.VerifyIntoPointVente();
				 
			 },personnel.PersonnelID);	 
			 },personnel.PersonnelID);	 
			 },personnel.PersonnelID);
					
			  
		
			}*/
				}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : fonction2 in LoginViewModel",'alert','e'); 
			}
		},
		
	
}