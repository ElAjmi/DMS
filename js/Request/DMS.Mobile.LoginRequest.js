if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.LoginRequest = {};

DMS.Mobile.LoginRequest = 
{

	
	PersonnelList :[],
	connexion: null,

  Connect: function () {
				var form = this;	
					alert("this.connexion = " + this.connexion);
                    //this.connexion = window.openDatabase("BaseDeDonnees", "1.0.0", "OpenGeophone", 100000);
			       	this.connexion.transaction(function(tx){ form.SelectFromPersonnel(tx, form) }, this.errorselectFromPersonnel);
    },
    
    
    
    
     SelectFromPersonnel : function(requete,form) {
       	
       	
			
					requete.executeSql('SELECT * FROM Personnel', [], function(tx, results) {form.querySuccess(tx,results,form);});
        
        
        
    },
    
    
    errorselectFromPersonnel:function (err) {
   		alert("errorselectFromPersonnel : " + err.message);   
    },
    
    
    querySuccess:function (requete, results,form) {
        alert("tx = " + requete);
							var len = results.rows.length;
							var id;
        
							alert("Personnel table: " + len + " rows found.");
							
							for (var i=0; i<len; i++){
								//alert("Row = " + i + " ID = " + results.rows.item(i).Nom  + " Data =  " + results.rows.item(i).Prenom);
		   
								var oPersonnel = new DMS.Mobile.Personnel();
								oPersonnel.PersonnelID = results.rows.item(i).PersonnelID;
								oPersonnel.Login = results.rows.item(i).Login;
								oPersonnel.Password = results.rows.item(i).Password;
								oPersonnel.Nom = results.rows.item(i).Nom;
								oPersonnel.Prenom = results.rows.item(i).Prenom;
								oPersonnel.Tel = results.rows.item(i).Tel;
								oPersonnel.Email = results.rows.item(i).Email;
								oPersonnel.Adresse = results.rows.item(i).Adresse;
       							oPersonnel.Matricule = results.rows.item(i).Matricule;
       							oPersonnel.Synch = results.rows.item(i).Synch; 
       							oPersonnel.ProfilID = results.rows.item(i).ProfilID;
        						form.PersonnelList.push(oPersonnel);
        						
							}
							
form.displayArticle(form.PersonnelList);
        
                    
    },
       
    displayArticle : function(array){
	    function objToString (obj) {
	    var str = '';
	    for (var p in obj) {
	        if (obj.hasOwnProperty(p)) {
	            str += p + '::' + obj[p] + '\n';
	        }
	    }
	    return str;
		}
		
    	/*for(var i =0;i<array.length;i++){
    	alert(objToString (array[i]));
		}  */
	}
}