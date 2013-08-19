if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.ArticleRequest = {};

DMS.Mobile.ArticleRequest = 
{

	
	ArticleList :[],
	connexion: null,

  Connect: function () {
				var form = this;	
					alert("this.connexion = " + this.connexion);
                    //this.connexion = window.openDatabase("BaseDeDonnées", "1.0.0", "OpenGeophone", 100000);
			       	this.connexion.transaction(function(tx){ form.SelectFromArticle(tx, form) }, this.errorselectFromArticle);
    },
    
    
    
    
     SelectFromArticle : function(requete,form) {
       	
       	
			
					requete.executeSql('SELECT * FROM Article', [], function(tx, results) {form.querySuccess(tx,results,form);});
        
        
        
    },
    
    
    errorselectFromArticle:function (err) {
   alert("errorselectFromArticle : " + err.message);   
    },
    
    
    querySuccess:function (requete, results,form) {
        alert("tx = " + requete);
							var len = results.rows.length;
							var id;
        
							alert("Article table: " + len + " rows found.");
							var myproducts = new Array();
							for (var i=0; i<len; i++){
								alert("Row = " + i + " ID = " + results.rows.item(i).ArticleID + " Data =  " + results.rows.item(i).Designation);
		   
								var oArticle = new DMS.Mobile.Article();
								oArticle.ArticleID = results.rows.item(i).ArticleID;
								oArticle.Designation = results.rows.item(i).Designation;
								oArticle.PrixUnitaire = results.rows.item(i).PrixUnitaire;
								oArticle.CAB = results.rows.item(i).CAB;
								oArticle.QteDispo = results.rows.item(i).QteDispo;
								oArticle.FamilleID = results.rows.item(i).FamilleID;
								oArticle.Synch = results.rows.item(i).Synch;
       							
        						form.ArticleList.push(oArticle);
        						
        
							}
							
form.displayArticle(form.ArticleList);
        
                    
    },
       
    displayArticle : function(array){
    	for(var i =0;i<array.length;i++)
			{
				alert(array[i].Designation);
			}
    }
}