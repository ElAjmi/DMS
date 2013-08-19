if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Login = {};

DMS.Mobile.Login = 
{
    $login: null,
    $password: null,

    $InsertUser: null,
    $ValidateButton: null,
    $ExitButton: null,
    $TestDB: null,

    connexion: null,

    Initialise: function () {
       this.InitialiseEvents();
    },

    InitialiseEvents: function () {

        var form = this;
        this.$ValidateButton.click(function () {
        	
            form.GetUser();
        });
        
        this.$InsertUser.click(function () {
        	
            form.AddUser();
        });
    },





    Connect: function () {

        this.connexion = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
        //var connexion = window.openDatabase("DataBase", "1.0.0", "DataBase", 100000);
        alert("connexion " + this.connexion);
    },

    AddUser: function () {
        alert("AddUser");
       this.connexion.transaction(this.InsertUser, this.Erreur);    
    },
    
    
    // Insertion dans la base de données
    GetUser: function () {
        alert("GetUser = " + this.$login.val() + " ---- " + this.$password.val());
        this.connexion.transaction(this.SelectUser, this.Erreur);
    },

    InsertUser: function (requete) {
    try{
        alert("InsertUser");
        requete.executeSql("CREATE TABLE IF NOT EXISTS Utilisateur (UtilisateurID numeric, Nom text, Prenom text, login text, password text)");
        requete.executeSql("INSERT INTO Utilisateur (UtilisateurID, Nom, Prenom, login, password) VALUES (1,'azerty','azerty','admin','admin')");
    	 alert("fin InsertUser");
    	 }catch(err)
        {
           alert(err);
        }
    },


    SelectUser: function (requete) {
	var form = this;
    try{
        alert("selectUser");
        //requete.executeSql('SELECT * FROM Utilisateur', [], form.Resultat, form.ErreurSelect);
        requete.executeSql('select * from Utilisateur', [],function(tx, rs) {
        				alert("here");
                        for(var i=0; i<rs.rows.length; i++) {
                            var row = rs.rows.item(i)
                            this.verifyUser(row['login'], row['password']);
                            result[i] = {
                                login: row['login'],
                                password: row['password']
                                
                            }
                        }

                        success(result); //toss the result into the 'success' callback
                    })
        }catch(err)
        {
           alert(err);
        }
    },
    // On récupére le lien dans la variable globale
    Resultat: function (requete, resultat) {
        alert("Resultat");
        var result = resultat.rows.length;
        var i = 0;
        var login = resultat.rows.item(3).login;
        var password = resultat.rows.item(4).password;
        this.verifyUser(login, password);
    },
    // Si il y a une erreur
    ErreurSelect: function (requete, err) {
        if (err.code == 5) {
            alert("Vous n'avez pas configuré le lien du serveur distant");
        }
        else {
            alert("Erreur de traitement : " + err.code);
        }
    },

    Erreur: function (err) {

        alert("Erreur de traitement : " + err.code);

    },

    verifyUser: function (login, password) {
        alert("loginBase = " + login + "; loginElement = " + this.$login.val());
        alert("passwordBase = " + password + "; passwordElement = " + this.$password.val());
    }


}