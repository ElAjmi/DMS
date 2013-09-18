if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.BD = {};

DMS.Mobile.BD = 
{
	connexion : null,
	InsertTestElement :false,
	
	Initialize : function()
	{
		this.initConnection();
		this.CreateTableTransaction();
	},
	
	initConnection : function()
	{
		this.connexion  = window.openDatabase("BaseDeDonnees", "1.0.0", "OpenGeophone", 100000);
	//this.connexion.execSQL(" PRAGMA foreign_keys = ON ");
	},
	
	CreateTableTransaction : function()
	{
		var form = this;
		this.connexion.transaction(form.CreateTable, form.CreateErrorFunction,function(){form.SuccessFunction(form);});
	},
	
	SuccessFunction : function(form)
	{
		if(form.InsertTestElement == true)
		{
			alert("into insertion");
			form.connexion.transaction(form.insertIntoArticle, form.InsertErrorFunction);
			form.connexion.transaction(form.insertIntoGamme, form.InsertErrorFunction);
			form.connexion.transaction(form.insertIntoFamille, form.InsertErrorFunction);
			form.connexion.transaction(form.insertIntoProfils, form.InsertErrorFunction);
			form.connexion.transaction(form.insertIntoPersonnel, form.InsertErrorFunction);
			form.connexion.transaction(form.insertIntoVilles, form.InsertErrorFunction);
			form.connexion.transaction(form.insertIntoPointVentes, form.InsertErrorFunction);
			form.connexion.transaction(form.insertIntoCommande, form.InsertErrorFunction);
			form.connexion.transaction(form.insertIntoTournees, form.InsertErrorFunction);
			form.connexion.transaction(form.insertIntoTypeMissions, form.InsertErrorFunction);
			form.connexion.transaction(form.insertIntoMissions, form.InsertErrorFunction);
			form.connexion.transaction(form.insertIntoActivite, form.InsertErrorFunction);
			form.connexion.transaction(form.insertIntoClient, form.InsertErrorFunction);
			
		}
	},
	
	CreateErrorFunction : function(err)
	{
		alert ("Error : DMS.Mobile.DB.js  --> Create table error : " + err.message)
	},
	
	InsertErrorFunction : function(err)
	{
		DMS.Mobile.Common.Alert ("Error : DMS.Mobile.DB.js  --> Insertion error : " + err.message)
	},
	
	CreateTable : function(requete)
	{
		try{
       		requete.executeSql("CREATE TABLE IF NOT EXISTS TypeMissions ("+
							"TypeMissionID INTEGER  NOT NULL PRIMARY KEY ,"+
							"Titre NVARCHAR(500)  NULL,"+
							"[Synch] BOOLEAN  NOT NULL"+
							")");
       
           requete.executeSql( "CREATE TABLE IF NOT EXISTS [Client] ("+
								"[ClientID] INTEGER  NOT NULL PRIMARY KEY ,"+
								"[NomResponsable] NVARCHAR(50)  NOT NULL,"+
								"[NomSociete] NVARCHAR(50)  NULL,"+
								"[RaisonSocial] NVARCHAR(50)  NULL,"+
								"[Tel] INTEGER  NULL,"+
								"[Fax] INTEGER  NULL,"+
								"[UrlWeb] NVARCHAR(300)  NULL,"+
								"[Email] NVARCHAR(50)  NULL,"+
								"[ImageIDClient] INTEGER  NULL,"+
								"[EtatClient] INTEGER  NOT NULL,"+
								"[Synch] BOOLEAN NOT NULL,"+
								"[ActiviteID] INTEGER  NOT NULL"+
								")");
								
			 requete.executeSql("CREATE TABLE IF NOT EXISTS [Familles] ("+
						"[FamilleID] INTEGER  PRIMARY KEY NOT NULL ,"+
						"[Designation] NVARCHAR(100)  NOT NULL,"+
						"[GammeID] INTEGER  NOT NULL,"+
						"[Synch] BOOLEAN NOT NULL,"+
						
					    "FOREIGN KEY(GammeID) REFERENCES Gammes(GammeID)"+
						
						")");	
									
		  requete.executeSql(	
									
								"CREATE TABLE IF NOT EXISTS [Gammes] ("+
								"[GammeID] INTEGER  PRIMARY KEY  NOT NULL,"+
								"[Designation] NVARCHAR(100)  NOT NULL,"+
								"[Synch] BOOLEAN NOT NULL"+
								")");	
								
			requete.executeSql(	"CREATE TABLE IF NOT EXISTS [MissionCommande] ("+
								"[MissionID] INTEGER  NOT NULL PRIMARY KEY"+
								")");	
								
		  requete.executeSql( "CREATE TABLE IF NOT EXISTS [Profils] ("+
								"[ProfilID] INTEGER  NOT NULL PRIMARY KEY ,"+
								"[Designation] NVARCHAR(50)  NULL,"+
								"[Description] TEXT  NULL,"+
								"[Synch] BOOLEAN NOT NULL"+
							")"	);

	     	requete.executeSql( "CREATE TABLE IF NOT EXISTS [Personnel] ("+
								"[PersonnelID] INTEGER  PRIMARY KEY  NOT NULL,"+
								"[Login] NVARCHAR(50)  NULL,"+
								"[Password] NVARCHAR(50)  NULL,"+
								"[Nom] NVARCHAR(50)  NULL,"+
								"[Prenom] NVARCHAR(50)  NULL,"+
								"[Tel] INTEGER  NULL,"+
								"[Email] NVARCHAR(50)  NULL,"+
								"[Adresse] NVARCHAR(50)  NULL,"+
								"[Matricule] INTEGER  NULL,"+
								"[Synch] BOOLEAN NOT NULL,"+
								"[ProfilID] INTEGER  NULL,"+
								"FOREIGN KEY(ProfilID) REFERENCES Profils(ProfilID)"+
								")");
								
			
								
		requete.executeSql("CREATE TABLE IF NOT EXISTS [PointVentes] ("+
								"[PointVenteID] INTEGER  PRIMARY KEY  NOT NULL,"	+
								"[Latitude] VARCHAR(50)  NULL,"+
								"[Longitude] VARCHAR(50)  NULL,"+
								"[EtatPointVente] INTEGER  NOT NULL,"+
								"[Responsable] NVARCHAR(50)  NOT NULL,"+
								"[Adresse] NVARCHAR(200)  NULL,"+
								"[Tel] INTEGER  NULL,"+
								"[Fax] INTEGER  NULL,"+
								"[Email] NVARCHAR(50)  NULL,"+
								"[Synch] BOOLEAN NOT NULL,"+
								"[VilleID] INTEGER  NOT NULL,"+
								"[ClientID] INTEGER  NOT NULL,"+
								
								"FOREIGN KEY(ClientID) REFERENCES Client(ClientID),"+
								"FOREIGN KEY(VilleID) REFERENCES Villes(VilleID)"+
								")");	
	
							
		requete.executeSql(	"	CREATE TABLE IF NOT EXISTS [Tournees] ("+
								"[TourneeID] INTEGER  PRIMARY KEY  NOT NULL,"+
								"[DateDebut] DATE  NULL,"+
								"[DateFin] DATE NULL,"+
								"[DateCreation] DATE  NULL,"+
								"[EtatTournee] INTEGER  NOT NULL,"+
								"[Synch] BOOLEAN NOT NULL,"+
								"[TerminalID] INTEGER  NULL,"+
								"[ImprimanteID] INTEGER  NULL,"+
								"[EquipementID] INTEGER  NULL,"+
								"[VehiculeID] INTEGER  NULL,"+
								"[PersonnelID] INTEGER  NOT NULL,"+
								"FOREIGN KEY(PersonnelID) REFERENCES Personnel(PersonnelID)"+
							")"	);
							
							
				requete.executeSql(	"	CREATE TABLE IF NOT EXISTS [Position] ("+
								"[PositionID] INTEGER  PRIMARY KEY AUTOINCREMENT NOT NULL,"+
								"[PersonnelID] INTEGER  NULL,"+
								"[Latitude] FLOAT NULL,"+
								"[Longitude] FLOAT  NULL,"+
								"[Date] DATE NULL,"+
								"[IMEI] VARCHAR(50)  NULL,"+
								"[Synch] BOOLEAN NOT NULL,"+
								"FOREIGN KEY(PersonnelID) REFERENCES Personnel(PersonnelID)"+
							")"	);

		  requete.executeSql( "CREATE TABLE IF NOT EXISTS [Commandes] ("+
		                            
									"[CommandeID] INTEGER  PRIMARY KEY  NOT NULL,"+
									
									"[CAB] VARCHAR(30)  NOT NULL,"+
									"[DateCreation] DATE  NOT NULL,"+
									"[DateLivraisonPrevue] DATE  NOT NULL,"+
									"[EtatCommande] INTEGER  NOT NULL,"+
									
									"[PrixTotalTTC] FLOAT  NOT NULL,"+
									"[PrixTotalHT] FLOAT  NOT NULL,"+
									"[TotalTVA] FLOAT  NULL,"+
									"[CodeCommande] NVARCHAR(50)  NULL,"+
									
									"[Synch] BOOLEAN NOT NULL,"+
									"[CommercialID] INTEGER  NOT NULL,"+
									"[PointVenteID] INTEGER  NOT NULL,"+
									
									"FOREIGN KEY(CommercialID) REFERENCES Personnel(PersonnelID),"+
									"FOREIGN KEY(PointVenteID) REFERENCES PointVentes(PointVenteID)"+
								   ")");	
								   
								   
				requete.executeSql( "CREATE TABLE IF NOT EXISTS [LigneCommande] ("+
									
									"[LigneCommandeID] INTEGER PRIMARY KEY AUTOINCREMENT,"+
									"[Quantite] INTEGER  NOT NULL,"+
									"[PrixTotalArticleTTC] FLOAT  NOT NULL,"+
									"[PrixTotalArticleHT] FLOAT  NOT NULL,"+
									"[Synch] BOOLEAN NOT NULL,"+
									"[CommandeID] INTEGER  NOT NULL,"+
									"[ArticleID] INTEGER NOT NULL,"+
									
									"FOREIGN KEY(CommandeID) REFERENCES Commandes(CommandeID),"+
									"FOREIGN KEY(ArticleID) REFERENCES Article(ArticleID)"+
									
								   ")");					



			requete.executeSql( "CREATE TABLE IF NOT EXISTS [Missions] ("+
								"[MissionID] INTEGER  NOT NULL PRIMARY KEY ,"+
								"[EtatMission] INTEGER  NULL,"+
								"[DateCreation] DATE NOT NULL,"+
								"[DegreUrgence] INTEGER  NULL,"+
								"[DateCloture] DATE  NULL,"+
							    "[Commentaires] TEXT  NULL,"+
								"[TypeMissionID] INTEGER  NOT NULL,"+
								"[Synch] BOOLEAN NOT NULL,"+
								
								"[BCKPersonnelID] INTEGER  NOT NULL,"+
								"[PointVenteID] INTEGER  NOT NULL,"+
								"[TourneeID] INTEGER  NULL,"+
								
								
								"FOREIGN KEY(PointVenteID) REFERENCES PointVentes(PointVenteID),"+
								"FOREIGN KEY(TourneeID) REFERENCES Tournees(TourneeID)"+
								")");	
								
								
			requete.executeSql( "CREATE TABLE IF NOT EXISTS [Article] ("+	
			                    "[ArticleID] INTEGER  NOT NULL PRIMARY KEY ,"+
		                     	"[Designation] VARCHAR(50)  NULL,"+
		                        "[PrixUnitaireHT] FLOAT  NULL,"+
								"[PrixUnitaireTTC] FLOAT  NULL,"+
		                        "[CAB] VARCHAR(50)  NULL,"+
		                        "[QteDispo] INTEGER  NULL,"+
		    					"[FamilleID] INTEGER  NOT NULL,"+
		    					"[Synch] BOOLEAN NOT NULL,"+
		                        "FOREIGN KEY(FamilleID) REFERENCES Familles(FamilleID)"+
			")");	
			
			 requete.executeSql("CREATE TABLE IF NOT EXISTS [Villes] ("+
						"[VilleID] INTEGER NOT NULL PRIMARY KEY,"+
						"[Designation] NVARCHAR(100)  NOT NULL,"+
						"[ZoneID] INTGER  NULL,"+
						"[Latitude] FLOAT   NULL,"+
						"[Longitude] FLOAT NULL,"+
						"[Synch] BOOLEAN NOT NULL"+
						")");	
						
		 	requete.executeSql("CREATE TABLE IF NOT EXISTS [Activite] ("+
						"[ActiviteID] INTEGER NOT NULL PRIMARY KEY,"+
						"[Designation] NVARCHAR(100)  NOT NULL,"+
						"[Synch] BOOLEAN NOT NULL"+
						")");	
						
			requete.executeSql("CREATE TABLE IF NOT EXISTS [Zone] ("+
						"[ZoneID] INTEGER NOT NULL PRIMARY KEY,"+
						"[Designation] NVARCHAR(100)  NOT NULL,"+
						"[Synch] BOOLEAN NOT NULL"+
						")");
			
			
																							       
        }
       catch(err)
        {
           alert("Exception : DMS.Mobile.DB.js  --> Create table exception : " + err.message);
        }
	},
	
	insertIntoArticle : function (requete) {
      alert("insertIntoArticle");
            
            requete.executeSql('INSERT INTO Article (ArticleID, Designation,PrixUnitaireHT,PrixUnitaireTTC, CAB, QteDispo, FamilleID, Synch) VALUES (1271, "Crostina lait", 12,12, "w4e5r6", 12, 1223, "True")');
            requete.executeSql('INSERT INTO Article (ArticleID, Designation,PrixUnitaireHT,PrixUnitaireTTC, CAB, QteDispo, FamilleID, Synch) VALUES (1272, "Crostina Vanille", 13,13, "gzt654", 45, 1223, "True")');
             requete.executeSql('INSERT INTO Article (ArticleID, Designation,PrixUnitaireHT,PrixUnitaireTTC, CAB, QteDispo, FamilleID, Synch) VALUES (1285, "Sablito Fraise", 13,13, "gzt654", 45, 1224, "True")');
			  requete.executeSql('INSERT INTO Article (ArticleID, Designation,PrixUnitaireHT,PrixUnitaireTTC, CAB, QteDispo, FamilleID, Synch) VALUES (1286, "Sablito Chocolat", 13,13, "gzt654", 45, 1224, "True")');
			   requete.executeSql('INSERT INTO Article (ArticleID, Designation,PrixUnitaireHT,PrixUnitaireTTC, CAB, QteDispo, FamilleID, Synch) VALUES (1287, "Major Banane", 13,13, "gzt654", 45, 1225, "True")');
      			requete.executeSql('INSERT INTO Article (ArticleID, Designation,PrixUnitaireHT,PrixUnitaireTTC, CAB, QteDispo, FamilleID, Synch) VALUES (1246, "Major Fraise", 13,13, "gzt654", 45, 1225, "True")');
			   requete.executeSql('INSERT INTO Article (ArticleID, Designation,PrixUnitaireHT,PrixUnitaireTTC, CAB, QteDispo, FamilleID, Synch) VALUES (1247, "Major Chocolat", 13,13, "gzt654", 45, 1225, "True")');
			     requete.executeSql('INSERT INTO Article (ArticleID, Designation,PrixUnitaireHT,PrixUnitaireTTC, CAB, QteDispo, FamilleID, Synch) VALUES (1220, "Gauchou", 13,13, "gzt654", 45, 1226, "True")');
},
    
  insertIntoFamille : function (requete) {
     alert("insertIntoFamille"); 
            
            requete.executeSql('INSERT INTO Familles (FamilleID, Designation,GammeID, Synch) VALUES (1223, "famille1",1231,"True")');
            requete.executeSql('INSERT INTO Familles (FamilleID, Designation,GammeID, Synch) VALUES (1224, "famille2",1231,"True")');
			 requete.executeSql('INSERT INTO Familles (FamilleID, Designation,GammeID, Synch) VALUES (1225, "famille3",1231,"True")');
			 requete.executeSql('INSERT INTO Familles (FamilleID, Designation,GammeID, Synch) VALUES (1226, "famille3",1231,"True")');
            
       
},

insertIntoClient : function (requete) {
	alert("insertIntoClient "); 
            requete.executeSql('INSERT INTO Client (ClientID,NomResponsable,NomSociete,RaisonSocial,Tel,Fax,UrlWeb,Email,ImageIDClient,EtatClient,Synch,ActiviteID) VALUES (1234,"Salah","Carrefour","SA",4543456,6565438,"www.carrefour.com","carrefour@carrefour.com",56543,1,"false",1)');
			
			 requete.executeSql('INSERT INTO Client (ClientID,NomResponsable,NomSociete,RaisonSocial,Tel,Fax,UrlWeb,Email,ImageIDClient,EtatClient,Synch,ActiviteID) VALUES (1224,"Ammar","Geant","SA",4543456,6565438,"www.geant.com","geant@geant.com",59543,1,"false",1)');
			 
			  requete.executeSql('INSERT INTO Client (ClientID,NomResponsable,NomSociete,RaisonSocial,Tel,Fax,UrlWeb,Email,ImageIDClient,EtatClient,Synch,ActiviteID) VALUES (1324,"Mourad","Magazin general","SA",4543456,6565438,"www.magazingeneral.com","magazin general@magazin general.com",59583,1,"false",1)');
                        
       
},

insertIntoProfils : function (requete) {
	alert("insertIntoProfils "); 
            requete.executeSql('INSERT INTO Profils (ProfilID,Designation,Description,Synch) VALUES (04,"Profil","Profil commercial","false")');
                        
       
},

insertIntoVilles : function (requete) {
	alert("insertIntoVille "); 
		requete.executeSql('INSERT INTO Villes(VilleID,Designation,ZoneID,Latitude,Longitude,Synch) VALUES(1,"Tunis",1,12.555,9.2548,"false")');
	
},

insertIntoActivite : function (requete) {
	alert("insertIntoActivite"); 
		requete.executeSql('INSERT INTO Activite(ActiviteID,Designation,Synch) VALUES(1,"Grande surface","false")');
                        
},



insertIntoPersonnel : function (requete) {
     alert("insertIntoPersonnel");  
            
            requete.executeSql('INSERT INTO Personnel (PersonnelID,Login,Password,Nom,Prenom,Tel,Email,Adresse,Matricule,Synch,ProfilID) VALUES (1223, "user","user","Mabrouk","Massaoud",21111111,"mm@gmail.com","LA",999,"false",000)');
             requete.executeSql('INSERT INTO Personnel (PersonnelID,Login,Password,Nom,Prenom,Tel,Email,Adresse,Matricule,Synch,ProfilID) VALUES (1244, "admin1","admin2","hamma","hamma",23111111,"h2@gmail.com","NY",888,"false",000)');
            
       
},
insertIntoTournees : function (requete) {
      alert("insertIntoTournee"); 
            
            requete.executeSql('INSERT INTO Tournees (TourneeID,DateDebut,DateFin,DateCreation,EtatTournee,Synch,TerminalID,ImprimanteID,EquipementID,VehiculeID,PersonnelID) VALUES (1,"16/09/2013","14/02/2013","11/02/2013",1,"false",1,1,1,1,1223)');
            requete.executeSql('INSERT INTO Tournees (TourneeID,DateDebut,DateFin,DateCreation,EtatTournee,Synch,TerminalID,ImprimanteID,EquipementID,VehiculeID,PersonnelID) VALUES (22,"17/09/2013","19/02/2013","18/02/2013",1,"false",1,1,1,1,1223)');
			requete.executeSql('INSERT INTO Tournees (TourneeID,DateDebut,DateFin,DateCreation,EtatTournee,Synch,TerminalID,ImprimanteID,EquipementID,VehiculeID,PersonnelID) VALUES (3,"18/09/2013","19/02/2013","18/02/2013",1,"false",1,1,1,1,1223)');
			requete.executeSql('INSERT INTO Tournees (TourneeID,DateDebut,DateFin,DateCreation,EtatTournee,Synch,TerminalID,ImprimanteID,EquipementID,VehiculeID,PersonnelID) VALUES (4,"19/09/2013","14/02/2013","11/02/2013",1,"false",1,1,1,1,1223)');
            requete.executeSql('INSERT INTO Tournees (TourneeID,DateDebut,DateFin,DateCreation,EtatTournee,Synch,TerminalID,ImprimanteID,EquipementID,VehiculeID,PersonnelID) VALUES (5,"20/09/2013","19/02/2013","18/02/2013",1,"false",1,1,1,1,1223)');
			requete.executeSql('INSERT INTO Tournees (TourneeID,DateDebut,DateFin,DateCreation,EtatTournee,Synch,TerminalID,ImprimanteID,EquipementID,VehiculeID,PersonnelID) VALUES (66,"21/09/2013","19/02/2013","18/02/2013",1,"false",1,1,1,1,1223)');
			requete.executeSql('INSERT INTO Tournees (TourneeID,DateDebut,DateFin,DateCreation,EtatTournee,Synch,TerminalID,ImprimanteID,EquipementID,VehiculeID,PersonnelID) VALUES (7,"22/09/2013","19/02/2013","18/02/2013",1,"false",1,1,1,1,1223)');
             
       
},

insertIntoMissions : function (requete) {
      alert("insertIntoMission"); 
            
             requete.executeSql('INSERT INTO Missions(MissionID,EtatMission,DateCreation,DegreUrgence,DateCloture,Commentaires,TypeMissionID,Synch,BCKPersonnelID,PointVenteID,TourneeID) VALUES (11,0,"12/03/2013",1,"13/02/2013","Commantaires",2,"false",1223,235,1)');
			 
             requete.executeSql('INSERT INTO Missions(MissionID,EtatMission,DateCreation,DegreUrgence,DateCloture,Commentaires,TypeMissionID,Synch,BCKPersonnelID,PointVenteID,TourneeID) VALUES (12,0,"12/03/2013",0,"13/02/2013","Commantaires",2,"false",1223,235,1)');
			 requete.executeSql('INSERT INTO Missions(MissionID,EtatMission,DateCreation,DegreUrgence,DateCloture,Commentaires,TypeMissionID,Synch,BCKPersonnelID,PointVenteID,TourneeID) VALUES (13,0,"12/03/2013",2,"13/02/2013","Commantaires",2,"false",1223,235,1)');
             requete.executeSql('INSERT INTO Missions(MissionID,EtatMission,DateCreation,DegreUrgence,DateCloture,Commentaires,TypeMissionID,Synch,BCKPersonnelID,PointVenteID,TourneeID) VALUES (21,0,"13/03/2013",1,"14/02/2013","Commantaires",3,"false",1223,235,2)');
             requete.executeSql('INSERT INTO Missions(MissionID,EtatMission,DateCreation,DegreUrgence,DateCloture,Commentaires,TypeMissionID,Synch,BCKPersonnelID,PointVenteID,TourneeID) VALUES (31,0,"14/03/2013",1,"15/02/2013","Commantaires",4,"false",1223,235,3)');
             
             requete.executeSql('INSERT INTO Missions(MissionID,EtatMission,DateCreation,DegreUrgence,DateCloture,Commentaires,TypeMissionID,Synch,BCKPersonnelID,PointVenteID,TourneeID) VALUES (41,0,"10/03/2013",1,"11/02/2013","Commantaires",5,"false",1223,236,4)');
             requete.executeSql('INSERT INTO Missions(MissionID,EtatMission,DateCreation,DegreUrgence,DateCloture,Commentaires,TypeMissionID,Synch,BCKPersonnelID,PointVenteID,TourneeID) VALUES (51,0,"13/05/2013",1,"14/05/2013","Commantaires",6,"false",1223,236,5)');
             requete.executeSql('INSERT INTO Missions(MissionID,EtatMission,DateCreation,DegreUrgence,DateCloture,Commentaires,TypeMissionID,Synch,BCKPersonnelID,PointVenteID,TourneeID) VALUES (61,0,"14/03/2013",1,"15/03/2013","Commantaires",7,"false",1223,236,6)');
			 requete.executeSql('INSERT INTO Missions(MissionID,EtatMission,DateCreation,DegreUrgence,DateCloture,Commentaires,TypeMissionID,Synch,BCKPersonnelID,PointVenteID,TourneeID) VALUES (71,0,"14/03/2013",1,"15/03/2013","Commantaires",9,"false",1223,236,7)');
       
},

insertIntoTypeMissions : function (requete) {
      alert("insertIntoTypeMission"); 
            
        
		requete.executeSql('INSERT INTO TypeMissions(TypeMissionID,Titre) VALUES (1,"Facing")');
		requete.executeSql('INSERT INTO TypeMissions(TypeMissionID,Titre) VALUES (2,"Commande")');
		requete.executeSql('INSERT INTO TypeMissions(TypeMissionID,Titre) VALUES (3,"EspacePromo")');
		requete.executeSql('INSERT INTO TypeMissions(TypeMissionID,Titre) VALUES (4,"Livraison")');
		requete.executeSql('INSERT INTO TypeMissions(TypeMissionID,Titre) VALUES (5,"ParametragePV")');
		requete.executeSql('INSERT INTO TypeMissions(TypeMissionID,Titre) VALUES (6,"Recouvrement")');
		requete.executeSql('INSERT INTO TypeMissions(TypeMissionID,Titre) VALUES (7,"ReleveInventaire")');
		requete.executeSql('INSERT INTO TypeMissions(TypeMissionID,Titre) VALUES (8,"RelevePresencePrixConc")');
		requete.executeSql('INSERT INTO TypeMissions(TypeMissionID,Titre) VALUES (9,"RelevePrix")');
		requete.executeSql('INSERT INTO TypeMissions(TypeMissionID,Titre) VALUES (10,"ReleveVenteConcu")');
     
},

  insertIntoGamme : function (requete) {
      alert("insertIntoGamme"); 
            requete.executeSql('INSERT INTO Gammes (GammeID, Designation, Synch) VALUES (1231, "gamme1","True")');
            requete.executeSql('INSERT INTO Gammes (GammeID, Designation, Synch) VALUES (1232, "gamme2","True")');
            requete.executeSql('INSERT INTO Gammes (GammeID, Designation, Synch) VALUES (1233, "gamme3","True")');
            requete.executeSql('INSERT INTO Gammes (GammeID, Designation, Synch) VALUES (1234, "gamme4","True")');
            requete.executeSql('INSERT INTO Gammes (GammeID, Designation, Synch) VALUES (1235, "gamme5","True")');
           
      
},


insertIntoPointVentes : function (requete) {
      alert("insertIntoPointVente"); 
	  
            requete.executeSql('INSERT INTO PointVentes (PointVenteID,Latitude,Longitude,EtatPointVente,Responsable,Adresse,Tel,Fax,Email,Synch,VilleID,ClientID) VALUES (235,"12.345","9.345",1,"Faouzi Ben Gamra","Boston",71456989,71244568,"faouzi@gmail.com","false",1,1234)');
			
			requete.executeSql('INSERT INTO PointVentes (PointVenteID,Latitude,Longitude,EtatPointVente,Responsable,Adresse,Tel,Fax,Email,Synch,VilleID,ClientID) VALUES (236,"12.345","9.345",1,"ben Salah","Chicago",71456789,71234568,"BenSalah@gmail.com","false",1,1224)');
			
			requete.executeSql('INSERT INTO PointVentes (PointVenteID,Latitude,Longitude,EtatPointVente,Responsable,Adresse,Tel,Fax,Email,Synch,VilleID,ClientID) VALUES (237,"12.345","9.345",1,"ben Salah","Michigan",71456789,71234568,"BenSalah@gmail.com","false",1,1224)');
          	
},

insertIntoCommande : function (requete) {
      alert("insertIntoCommande"); 
            requete.executeSql('INSERT INTO Commandes (CAB,DateCreation,DateLivraisonPrevue,EtatCommande,PrixTotalTTC,PrixTotalHT,TotalTVA,CodeCommande,CommandeID,Synch,CommercialID,PointVenteID) VALUES (1213,"12/02/2012","14/02/2012",1,10.500,11.200,1.504,12,10,"false",1223,235)');
          	      
}

}