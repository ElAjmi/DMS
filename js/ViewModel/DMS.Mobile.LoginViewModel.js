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
       DMS.Mobile.GammeRequest.connexion = this.connexion;
	   DMS.Mobile.GammeRequest.GetListGammeFromServer();
	   
	   DMS.Mobile.FamilleRequest.connexion = this.connexion;
	   DMS.Mobile.FamilleRequest.GetListFamilleFromServer();
	   
	   DMS.Mobile.ArticleRequest.connexion = this.connexion;
	   DMS.Mobile.ArticleRequest.GetListArticleFromServer();
	   
	   DMS.Mobile.ProfilRequest.connexion = this.connexion;
	   DMS.Mobile.ProfilRequest.GetListProfilFromServer();
	   
	   DMS.Mobile.TypeMissionRequest.connexion = this.connexion;
	   DMS.Mobile.TypeMissionRequest.GetListTypeMissionFromServer();
	   
	   DMS.Mobile.CommandeRequest.connexion = this.connexion;
	   DMS.Mobile.TourneeRequest.connexion = this.connexion;
	   DMS.Mobile.MissionRequest.connexion = this.connexion;
       DMS.Mobile.PointVenteRequest.connexion = this.connexion;
	   DMS.Mobile.ClientRequest.connexion = this.connexion;
	   DMS.Mobile.LigneCommandeRequest.connexion = this.connexion;
	   DMS.Mobile.ZoneRequest.connexion = this.connexion;
	   DMS.Mobile.VilleRequest.connexion = this.connexion;
	   DMS.Mobile.ActiviteRequest.connexion = this.connexion;
	   
	   
	   
	   DMS.Mobile.PersonnelRequest.connexion = this.connexion;
       this.InitialiseEvents();
    },
	
	InitialiseEvents: function () {
		var form = this;
		   this.$ValidateButton.click(function(){
			
				form.ValidateLogin();
				
				DMS.Mobile.Common.DrawLoading();
				
				
			
			});
       
    },
	
	
	ValidateLogin:function(){
	    var form = this;
		//DMS.Mobile.PersonnelRequest.GetPersonnelFrmLocal($(this.$login).val(), $(this.$password).val(),function(personnel){form.fonction1(personnel,form)});
		
		DMS.Mobile.PersonnelRequest.GetPersonnelFromServer($(this.$login).val(), $(this.$password).val(),function(personnel){form.fonction2(personnel,form)});	
		},
		
		
		fonction1 : function(personnel,form)
		{
			
			if ( personnel == null)
			{
			//DMS.Mobile.Common.TestServer();
				if (DMS.Mobile.Common.AcceeServeur == true)
				{
					DMS.Mobile.PersonnelRequest.GetPersonnelFromServer($(this.$login).val(), $(this.$password).val(),function(personnel){form.fonction2(personnel,form)});
	
				}
				else
				{
					alert("Connexion serveur echouée");
				}
			
			}
			else
			{				
				DMS.Mobile.Common.RedirectToCalendrier();
				sessionStorage.setItem("userID", JSON.stringify(personnel));
				alert("personnel is"+personnel.Login);
			}
		},
		
		fonction2 : function(personnel,form)
		{
						if ( personnel == null)
			{
				alert("login et/ou mot de passe incorrecte");
			}
			else
			{
			 var synch = "true";
			 
			// sessionStorage.setItem("Personnel", JSON.stringify(personnel));
			 
			 
		     
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
								//  DMS.Mobile.Common.RedirectToCalendrier();
								alert("InitializeGetPosition");
								DMS.Mobile.PositionRequest.InitializeGetPosition();
				 
			 },personnel.PersonnelID);	 
			 },personnel.PersonnelID);	 
			 },personnel.PersonnelID);
			 },personnel.PersonnelID);	 
			 },personnel.PersonnelID);			
			 },personnel.PersonnelID);				
			 },personnel.PersonnelID);		 
			 },personnel.PersonnelID);		 
			 },personnel.PersonnelID); 
		
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
		},
		
	
}