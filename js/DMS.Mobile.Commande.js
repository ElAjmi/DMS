if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Commande = {};

DMS.Mobile.Commande = 
{
    $DateLivraisonPrevu: null,
    $PrixTotalTTC: null,
    $PrixTotalHT: null,
    $TotalTVA: null,
    $InsertCommande: null,
    $ValidateButton: null,
    $ExitButton: null,
    
    CommandeID : null,
    CommandeCAB : null,
    DateLivraisonPrevu: null,
    PrixTotalTTC: null,
    PrixTotalHT: null,
    TotalTVA: null,
    PointVente : null,
    client : null,
    listArticle : [],

    connexion: null,


Initialise: function () {
       this.InitialiseEvents();
    },

    InitialiseEvents: function () {

            form.InsertCommande();
    },
    
     Connect: function () {

        this.connexion = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
        //var connexion = window.openDatabase("DataBase", "1.0.0", "DataBase", 100000);
        alert("connexion " + this.connexion);
    },
    
    
     AddCommande: function () {
        alert("AddCommande");
       this.connexion.transaction(this.InsertCommande, this.Erreur);    
    },
    
    
    InsertCommande: function (requete) {
    try{
        alert("InsertCommande");
       
        requete.executeSql("INSERT INTO Commandes (DateLivraisonPrevue, PrixTotalTTC, PrixTotalHT, TotalTVA) VALUES (12/12/2012,'1524','5486','9856')");
    	 alert("fin InsertCommande");
    	 }catch(err)
        {
           alert(err);
        }
    },



GetCommandes: function () {
        alert("GetCommande");
       this.connexion.transaction(this.GetCommande, this.Erreur);    
    },


GetCommande : function(requete, IdCommande)
{
 try{
        alert("InsertCommande");
       
       results = requete.executeSql("SELCT * FROM Commandes WHERE CommandeID ="+ IdCommande);
    	 alert("fin InsertCommande");
    	 }catch(err)
        {
           alert(err);
        }
},

	GetCommandeFromBD : function(results)
	{
		    this.CommandeID = results.rows.item(0).id;
            this.listArticle = DMS.Mobile.Article.GetListArticle(CommandeID);
                    
	}
	
	
}