var DB = null;
var dbCreated = false;

document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
    DB = window.openDatabase("DMS_SOTUBI_DB", "1.0", "DMS_SOTUBI", 200000);
    DB.transaction(CreateTableInBD, CreateTableError,successCB); 
    }
  
  function CreateTableError(err)
  {
            alert("CreateTableError : " + err.message);    
  }
  

  function CreateTableInBD(requete, err)
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
           alert("Exception Create table =" + err.message);
        }
        
        
  }
  
  
function successCB() {

                     }
     
