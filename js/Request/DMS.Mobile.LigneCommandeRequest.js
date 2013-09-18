if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.LigneCommandeRequest = {};

DMS.Mobile.LigneCommandeRequest = 
{
	
	ListLigneCommande : [],
    connexion: null,

insertLigneCommandeIntoCommande : function (commande, ligneCommande,form,len,callbackCommande)
	{
		commande.ListLignesCommande.push(ligneCommande)
		if ( commande.ListLignesCommande.length == len)
		{
			callbackCommande(commande);
		}
		
	},
	
	
	insertLigneCommandeIntoArray : function(LigneCommande,form,len,callbackViewModel)
	{
		form.ListLigneCommande.push(LigneCommande);
		if ( form.ListLigneCommande.length == len)
		{
			callbackViewModel(form.ListLigneCommande);
		}
	},
	
//////////////////////////////////////////////// Serveur  /////////////////////
	SelectLigneCommandeByPersonnelFromServer : function (callbackViewModel,PersonnelID)
	{
		  form =this;
		
		  var Data = "PersonnelID="+PersonnelID; 
		  
		  var methode= "GetListLigneCommandeDTOByPersonnelID?";

		  var URL = DMS.Mobile.Common.ServeurUrl+methode+Data;

		     DMS.Mobile.Common.CallService(function(JsonObject,Form){form.createLigneCommandeDTO(JsonObject,Form,callbackViewModel);},URL,form);
	},
	
	createLigneCommandeDTO : function (json,form,callbackViewModel)
	{
		if ( json != null)
		{
			var synch = "true";
            var len = json.length;
			for (var i=0;i<json.length;i++)
			{
			var ligneCommandeDTO = new DMS.Mobile.LigneCommande();
			
				ligneCommandeDTO.CommandeID = json[i].CommandeID ;
				ligneCommandeDTO.ArticleID = json[i].ArticleID;
				ligneCommandeDTO.Quantite = json[i].Quantite;
				ligneCommandeDTO.PrixTotalArticleTTC = json[i].PrixTotalTTC; 
				ligneCommandeDTO.PrixTotalArticleHT = json[i].PrixTotalHT; 
				ligneCommandeDTO.Articles = json[i].Articles;
				ligneCommandeDTO.Commandes = json[i].Commandes;

			form.InsertLigneCommande(ligneCommandeDTO,synch,form,len,callbackViewModel);
			
			}
			
		}
		else{callbackViewModel(form.ListLigneCommande);}	
		
	},
	
	
	////////////////////////////////////////////////////////////////////////////// 
	
/////////////////////////Insertion LOCAL /////////////////////////////////////

   InsertLigneCommande : function (ligneCommande,synch,form,len,callbackViewModel)
		{
			form.InsertLigneCommandeIntoLOCAL(ligneCommande,synch,form,len,callbackViewModel);
	
		},
		
   insertLigneCommande: function(ligneCommande){
					var form = this;	
			       	this.InsertLigneCommandeIntoLOCAL(ligneCommande,"false",form,null,null);
    },	
	
	
	
	InsertLigneCommandeIntoLOCAL: function(LigneCommandeObject,synch,formReq,len,callbackViewModel) 
   {
	    	if (synch == "false")
			{
		  	    formReq.connexion.transaction(function(tx){ form.InsertIntoLigneCommande(tx, formReq, LigneCommandeObject,synch) }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoLigneCommande");}); 
		    }
			else
			{
				formReq.connexion.transaction(function(tx){ formReq.InsertIntoLigneCommande(tx, formReq,LigneCommandeObject,synch); }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoLigneCommande");},function(){
							
						formReq.insertLigneCommandeIntoArray(LigneCommandeObject,formReq,len,callbackViewModel)	;		
							}); 
			}		
	
					
    },
	
	InsertIntoLigneCommande : function(requete,form, LigneCommande,synch){
	
             if (synch == "false")
			 {      
                    requete.executeSql('INSERT INTO LigneCommande (LigneCommandeID,Quantite,PrixTotalArticleTTC,PrixTotalArticleHT,Synch,CommandeID,ArticleID) VALUES ('+LigneCommande.LigneCommandeID+','+LigneCommande.Quantite+','+LigneCommande.PrixTotalArticleTTC+','+LigneCommande.PrixTotalArticleHT+',"'+synch+'",'+LigneCommande.CommandeID+','+LigneCommande.ArticleID+')');
			 }
			 else
			 {
				   requete.executeSql('INSERT INTO LigneCommande (Quantite,PrixTotalArticleTTC,PrixTotalArticleHT,Synch,CommandeID,ArticleID) VALUES ('+LigneCommande.Quantite+','+LigneCommande.PrixTotalArticleTTC+','+LigneCommande.PrixTotalArticleHT+',"'+synch+'",'+LigneCommande.CommandeID+','+LigneCommande.ArticleID+')');
				   
			 }
	
	}
    
    
 //////////////////////////////////////////////////////////////////////////////      
	
/////////////////////////Select From LOCAL /////////////////////////////////////	
	
//////////////////////////////////////////////////////////////////////////////   	
	
	
}