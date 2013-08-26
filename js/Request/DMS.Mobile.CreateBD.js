if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.BD = {};

DMS.Mobile.BD = 
{
	connexion : null,
	InsertTestElement :true,
	
	Initialize : function()
	{
		this.initConnection();
		this.CreateTableTransaction();
	},
	
	initConnection : function()
	{
		this.connexion  = window.openDatabase("BaseDeDonnees", "1.0.0", "OpenGeophone", 100000);
	},
	
	CreateTableTransaction : function()
	{
		var form = this;
		this.connexion.transaction(form.CreateTable, form.CreateErrorFunction,function(){form.SuccessFunction(form)});
	},
	
	SuccessFunction : function(form)
	{
		if(form.InsertTestElement == true)
		{
			form.connexion.transaction(form.insertIntoGamme, form.InsertErrorFunction);
			form.connexion.transaction(form.insertIntoFamille, form.InsertErrorFunction);
			form.connexion.transaction(form.insertIntoArticle, form.InsertErrorFunction);
			form.connexion.transaction(form.insertIntoProfils, form.InsertErrorFunction);
			form.connexion.transaction(form.insertIntoPersonnel, form.InsertErrorFunction);
			form.connexion.transaction(form.insertIntoPointVentes, form.InsertErrorFunction);
			form.connexion.transaction(form.insertIntoCommande, form.InsertErrorFunction);
			form.connexion.transaction(form.insertIntoTournees, form.InsertErrorFunction);
			form.connexion.transaction(form.insertIntoTypeMissions, form.InsertErrorFunction);
			form.connexion.transaction(form.insertIntoMissions, form.InsertErrorFunction);
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
							"TypeMissionID INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT,"+
							"Titre NVARCHAR(500)  NULL"+
							")");
       
           requete.executeSql( "CREATE TABLE IF NOT EXISTS [Client] ("+
								"[ClientID] INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT,"+
								"[NomResponsable] NVARCHAR(50)  NOT NULL,"+
								"[NomSociete] NVARCHAR(50)  NULL,"+
								"[RaisonSocial] NVARCHAR(50)  NULL,"+
								"[Tel] INTEGER  NULL,"+
								"[Fax] INTEGER  NULL,"+
								"[UrlWeb] NVARCHAR(300)  NULL,"+
								"[Email] NVARCHAR(50)  NULL,"+
								"[ImageIDClient] INTEGER  NULL,"+
								"[EtatClient] INTEGER  NOT NULL,"+
								"[Synch] BOOLEAN DEFAULT 'True' NOT NULL,"+
								
								"[ActiviteID] TEXT  NULL"+
								")");
								
			 requete.executeSql("CREATE TABLE IF NOT EXISTS [Familles] ("+
						"[FamilleID] INTEGER  PRIMARY KEY NOT NULL,"+
						"[Designation] NVARCHAR(100)  NOT NULL,"+
						"[GammeID] INTEGER  NOT NULL,"+
						"[Synch] BOOLEAN DEFAULT 'True' NOT NULL,"+
						
					    "FOREIGN KEY(GammeID) REFERENCES Gammes(GammeID)"+
						
						")");	
									
		  requete.executeSql(	
									
								"CREATE TABLE IF NOT EXISTS [Gammes] ("+
								"[GammeID] INTEGER  PRIMARY KEY AUTOINCREMENT NOT NULL,"+
								"[Designation] NVARCHAR(100)  NOT NULL,"+
								"[Synch] BOOLEAN DEFAULT 'True' NOT NULL"+
								")");	
								
			requete.executeSql(	"CREATE TABLE IF NOT EXISTS [MissionCommande] ("+
								"[MissionID] INTEGER  NOT NULL PRIMARY KEY"+
								")");	
								
		  requete.executeSql( "CREATE TABLE IF NOT EXISTS [Profils] ("+
								"[ProfilID] INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT,"+
								"[Designation] NVARCHAR(50)  NULL,"+
								"[Description] TEXT  NULL,"+
								"[Synch] BOOLEAN DEFAULT 'True' NOT NULL"+
							")"	);

	     	requete.executeSql( "CREATE TABLE IF NOT EXISTS [Personnel] ("+
								"[PersonnelID] INTEGER  PRIMARY KEY AUTOINCREMENT NOT NULL,"+
								"[Login] NVARCHAR(50)  NULL,"+
								"[Password] NVARCHAR(50)  NULL,"+
								"[Nom] NVARCHAR(50)  NULL,"+
								"[Prenom] NVARCHAR(50)  NULL,"+
								"[Tel] INTEGER  NULL,"+
								"[Email] NVARCHAR(50)  NULL,"+
								"[Adresse] NVARCHAR(50)  NULL,"+
								"[Matricule] INTEGER  NULL,"+
								"[Synch] BOOLEAN DEFAULT 'True' NOT NULL,"+
								"[ProfilID] INTEGER  NULL,"+
								"FOREIGN KEY(ProfilID) REFERENCES Profils(ProfilID)"+
								")");
								
			
								
		requete.executeSql("CREATE TABLE IF NOT EXISTS [PointVentes] ("+
								"[PointVenteID] INTEGER  PRIMARY KEY AUTOINCREMENT NOT NULL,"	+
								"[Latitude] VARCHAR(50)  NULL,"+
								"[Longitude] VARCHAR(50)  NULL,"+
								"[EtatPointVente] INTEGER  NOT NULL,"+
								"[Responsable] NVARCHAR(50)  NOT NULL,"+
								"[Adresse] NVARCHAR(200)  NULL,"+
								"[Tel] INTEGER  NULL,"+
								"[Fax] INTEGER  NULL,"+
								"[Email] NVARCHAR(50)  NULL,"+
								"[Synch] BOOLEAN DEFAULT 'True' NOT NULL,"+
								
								"[VilleID] INTEGER  NULL,"+
								"[ClientID] INTEGER  NOT NULL,"+
								"FOREIGN KEY(ClientID) REFERENCES Client(ClientID)"+
								")");	
	
							
		requete.executeSql(	"	CREATE TABLE IF NOT EXISTS [Tournees] ("+
								"[TourneeID] INTEGER  PRIMARY KEY AUTOINCREMENT NOT NULL,"+
								"[DateDebut] DATE  NULL,"+
								"[DateFin] DATE NULL,"+
								"[DateCreation] DATE  NULL,"+
								"[EtatTournee] INTEGER  NOT NULL,"+
								"[Synch] BOOLEAN DEFAULT 'True' NOT NULL,"+
								"[TerminalID] INTEGER  NULL,"+
								"[ImpimanteID] INTEGER  NULL,"+
								"[EquipementID] INTEGER  NULL,"+
								"[VehiculeID] INTEGER  NULL,"+
								"[PersonnelID] INTEGER  NOT NULL,"+
								"FOREIGN KEY(PersonnelID) REFERENCES Personnel(PersonnelID)"+
							")"	);

		  requete.executeSql( "CREATE TABLE IF NOT EXISTS [Commandes] ("+
									"[CAB] VARCHAR(30)  NOT NULL,"+
									"[DateCreation] DATE  NOT NULL,"+
									"[DateLivraisonPrevue] DATE  NOT NULL,"+
									"[EtatCommande] INTEGER  NOT NULL,"+
									
									"[PrixTotalTTC] FLOAT  NOT NULL,"+
									"[PrixTotalHT] FLOAT  NOT NULL,"+
									"[TotalTVA] FLOAT  NULL,"+
									"[CodeCommande] NVARCHAR(50)  NULL,"+
									"[CommandeID] INTEGER  PRIMARY KEY AUTOINCREMENT NOT NULL,"+
									"[Synch] BOOLEAN DEFAULT 'True' NOT NULL,"+
									"[CommercialID] INTEGER  NOT NULL,"+
									"[PointVenteID] INTEGER  NOT NULL,"+
									
									"FOREIGN KEY(CommercialID) REFERENCES Personnel(PersonnelID),"+
									"FOREIGN KEY(PointVenteID) REFERENCES PointVentes(PointVenteID)"+
								   ")");			



			requete.executeSql( "CREATE TABLE IF NOT EXISTS [Missions] ("+
								"[MissionID] INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT,"+
								"[EtatMission] INTEGER  NULL,"+
								"[DateCreation] DATE NOT NULL,"+
								"[DegreUrgence] INTEGER  NULL,"+
								"[DateCloture] DATE  NULL,"+
							    "[Commentaires] TEXT  NULL,"+
								"[TypeMissionID] INTEGER  NOT NULL,"+
								"[Synch] BOOLEAN DEFAULT 'True' NOT NULL,"+
								
								"[BCKPersonnelID] INTEGER  NOT NULL,"+
								"[PointVenteID] INTEGER  NOT NULL,"+
								"[TourneeID] INTEGER  NULL,"+
								
								"FOREIGN KEY(BCKPersonnelID) REFERENCES Personnel(PersonnelID),"+
								"FOREIGN KEY(PointVenteID) REFERENCES PointVentes(PointVenteID),"+
								"FOREIGN KEY(TourneeID) REFERENCES Tournees(TourneeID)"+
								")");	
								
								
			requete.executeSql( "CREATE TABLE IF NOT EXISTS [Article] ("+	
			                    "[ArticleID] INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT,"+
		                     	"[Designation] VARCHAR(50)  NULL,"+
		                        "[PrixUnitaire] FLOAT  NULL,"+
		                        "[CAB] VARCHAR(50)  NULL,"+
		                        "[QteDispo] INTEGER  NULL,"+
		    					"[FamilleID] INTEGER  NOT NULL,"+
		    					"[Synch] NUMERIC DEFAULT 'True' NOT NULL,"+
		                        "FOREIGN KEY(FamilleID) REFERENCES Familles(FamilleID)"+
			")");	
			
			
																							       
        }
       catch(err)
        {
           alert("Exception : DMS.Mobile.DB.js  --> Create table exception : " + err.message);
        }
	},
	
	insertIntoArticle : function (requete) {
      
            
            requete.executeSql('INSERT INTO Article (ArticleID, Designation,PrixUnitaire, CAB, QteDispo, FamilleID, Synch) VALUES (1271, "article1", 12, "w4e5r6", 12, 1223, "True")');
            requete.executeSql('INSERT INTO Article (ArticleID, Designation,PrixUnitaire, CAB, QteDispo, FamilleID, Synch) VALUES (1272, "article2", 13, "gzt654", 45, 1223, "True")');
            
      
},
    
  insertIntoFamille : function (requete) {
      
            
            requete.executeSql('INSERT INTO Familles (FamilleID, Designation,GammeID, Synch) VALUES (1223, "famille1",1231,"True")');
            requete.executeSql('INSERT INTO Familles (FamilleID, Designation,GammeID, Synch) VALUES (1224, "famille2",1231,"True")');
            
       
},

insertIntoProfils : function (requete) {
      
            
            requete.executeSql('INSERT INTO Profils (ProfilID,Designation,Description,Synch) VALUES (000,"Profil","Profil commercial","false")');
                        
       
},

insertIntoPersonnel : function (requete) {
      
            
            requete.executeSql('INSERT INTO Personnel (PersonnelID,Login,Password,Nom,Prenom,Tel,Email,Adresse,Matricule,Synch,ProfilID) VALUES (1223, "user","user","Mabrouk","Massaoud",21111111,"mm@gmail.com","LA",999,"false",000)');
             requete.executeSql('INSERT INTO Personnel (PersonnelID,Login,Password,Nom,Prenom,Tel,Email,Adresse,Matricule,Synch,ProfilID) VALUES (1244, "admin1","admin2","hamma","hamma",23111111,"h2@gmail.com","NY",888,"false",000)');
            
       
},
insertIntoTournees : function (requete) {
      
            
            requete.executeSql('INSERT INTO Tournees (TourneeID,DateDebut,DateFin,DateCreation,EtatTournee,Synch,TerminalID,ImpimanteID,EquipementID,VehiculeID,PersonnelID) VALUES (1,"12/02/2013","14/02/2013","11/02/2013",1,"false",1,1,1,1,1223)');
            requete.executeSql('INSERT INTO Tournees (TourneeID,DateDebut,DateFin,DateCreation,EtatTournee,Synch,TerminalID,ImpimanteID,EquipementID,VehiculeID,PersonnelID) VALUES (15,"17/02/2013","19/02/2013","18/02/2013",1,"false",1,1,1,1,1223)');
			requete.executeSql('INSERT INTO Tournees (TourneeID,DateDebut,DateFin,DateCreation,EtatTournee,Synch,TerminalID,ImpimanteID,EquipementID,VehiculeID,PersonnelID) VALUES (16,"26/08/2013","19/02/2013","18/02/2013",1,"false",1,1,1,1,1223)');
             requete.executeSql('INSERT INTO Tournees (TourneeID,DateDebut,DateFin,DateCreation,EtatTournee,Synch,TerminalID,ImpimanteID,EquipementID,VehiculeID,PersonnelID) VALUES (17,"02/09/2013","19/02/2013","18/02/2013",1,"false",1,1,1,1,1223)');
              requete.executeSql('INSERT INTO Tournees (TourneeID,DateDebut,DateFin,DateCreation,EtatTournee,Synch,TerminalID,ImpimanteID,EquipementID,VehiculeID,PersonnelID) VALUES (18,"19/08/2013","19/02/2013","18/02/2013",1,"false",1,1,1,1,1223)');
               
       
},

insertIntoMissions : function (requete) {
      
            
             requete.executeSql('INSERT INTO Missions(MissionID,EtatMission,DateCreation,DegreUrgence,DateCloture,Commentaires,TypeMissionID,Synch,BCKPersonnelID,PointVenteID,TourneeID) VALUES (1,0,"12/03/2013",1,"13/02/2013","Commantaires",1,"false",1223,235,1)');
             requete.executeSql('INSERT INTO Missions(MissionID,EtatMission,DateCreation,DegreUrgence,DateCloture,Commentaires,TypeMissionID,Synch,BCKPersonnelID,PointVenteID,TourneeID) VALUES (2,0,"13/03/2013",1,"14/02/2013","Commantaires",1,"false",1223,235,1)');
             requete.executeSql('INSERT INTO Missions(MissionID,EtatMission,DateCreation,DegreUrgence,DateCloture,Commentaires,TypeMissionID,Synch,BCKPersonnelID,PointVenteID,TourneeID) VALUES (3,0,"14/03/2013",1,"15/02/2013","Commantaires",1,"false",1223,235,1)');
             
             requete.executeSql('INSERT INTO Missions(MissionID,EtatMission,DateCreation,DegreUrgence,DateCloture,Commentaires,TypeMissionID,Synch,BCKPersonnelID,PointVenteID,TourneeID) VALUES (9,0,"10/03/2013",1,"11/02/2013","Commantaires",1,"false",1223,236,15)');
             requete.executeSql('INSERT INTO Missions(MissionID,EtatMission,DateCreation,DegreUrgence,DateCloture,Commentaires,TypeMissionID,Synch,BCKPersonnelID,PointVenteID,TourneeID) VALUES (10,0,"13/05/2013",1,"14/05/2013","Commantaires",1,"false",1223,236,15)');
             requete.executeSql('INSERT INTO Missions(MissionID,EtatMission,DateCreation,DegreUrgence,DateCloture,Commentaires,TypeMissionID,Synch,BCKPersonnelID,PointVenteID,TourneeID) VALUES (12,0,"14/03/2013",1,"15/03/2013","Commantaires",1,"false",1223,236,15)');
       
},

insertIntoTypeMissions : function (requete) {
      
            
             requete.executeSql('INSERT INTO TypeMissions(TypeMissionID,Titre) VALUES (1,"Titre Type Mission")');
     
},

  insertIntoGamme : function (requete) {
      
            requete.executeSql('INSERT INTO Gammes (GammeID, Designation, Synch) VALUES (1231, "gamme1","True")');
            requete.executeSql('INSERT INTO Gammes (GammeID, Designation, Synch) VALUES (1232, "gamme2","True")');
            requete.executeSql('INSERT INTO Gammes (GammeID, Designation, Synch) VALUES (1233, "gamme3","True")');
            requete.executeSql('INSERT INTO Gammes (GammeID, Designation, Synch) VALUES (1234, "gamme4","True")');
            requete.executeSql('INSERT INTO Gammes (GammeID, Designation, Synch) VALUES (1235, "gamme5","True")');
           
      
},


insertIntoPointVentes : function (requete) {
      
            requete.executeSql('INSERT INTO PointVentes (PointVenteID,Latitude,Longitude,EtatPointVente,Responsable,Adresse,Tel,Fax,Email,Synch,VilleID,ClientID) VALUES (235,"12.345","9.345",1,"ben Salah","Boston",71456789,71234568,"BenSalah@gmail.com","false",1,45)');
          	
},

insertIntoCommande : function (requete) {
      
            requete.executeSql('INSERT INTO Commandes (CAB,DateCreation,DateLivraisonPrevue,EtatCommande,PrixTotalTTC,PrixTotalHT,TotalTVA,CodeCommande,CommandeID,Synch,CommercialID,PointVenteID) VALUES (1213,"12/02/2012","14/02/2012",1,10.500,11.200,1.504,12,10,"false",1223,235)');
          	      
}

}