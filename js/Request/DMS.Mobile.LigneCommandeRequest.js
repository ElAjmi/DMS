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
		  var Conf = JSON.parse(sessionStorage.getItem("Configuration"));
		  var ServeurURL	= Conf.URL;
		  form =this;
		
		  var Data = "PersonnelID="+PersonnelID; 
		  
		  var methode= "GetListLigneCommandeDTOByPersonnelID?";

		  var URL = ServeurUrl+methode+Data;

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
		  	    formReq.connexion.transaction(function(tx){ formReq.InsertIntoLigneCommande(tx, formReq, LigneCommandeObject,synch); }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoLigneCommande");}); 
		    }
			else
			{
				formReq.connexion.transaction(function(tx){ formReq.InsertIntoLigneCommande(tx, formReq,LigneCommandeObject,synch); }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoLigneCommande");},function(){
							
						formReq.insertLigneCommandeIntoArray(LigneCommandeObject,formReq,len,callbackViewModel)	;		
							}); 
			}		
	
					
    },
	
	InsertIntoLigneCommande : function(requete,form, LigneCommande,synch){
		
		alert ('?'+','+LigneCommande.Quantite+','+LigneCommande.PrixTotalArticleTTC+','+LigneCommande.PrixTotalArticleHT+',"'+synch+'",'+LigneCommande.CommandID+','+LigneCommande.ArticleID);
		
		
             if (synch = "false")
			 {       
                    requete.executeSql('INSERT INTO LigneCommande (LigneCommandeID,Quantite,PrixTotalArticleTTC,PrixTotalArticleHT,Synch,CommandeID,ArticleID) VALUES ('+LigneCommande.LigneCommandeID+','+LigneCommande.Quantite+','+LigneCommande.PrixTotalArticleTTC+','+LigneCommande.PrixTotalArticleHT+',"'+synch+'",'+LigneCommande.CommandeID+','+LigneCommande.ArticleID+')');
			 }
			 else
			 {
				   requete.executeSql('INSERT INTO LigneCommande (Quantite,PrixTotalArticleTTC,PrixTotalArticleHT,Synch,CommandeID,ArticleID) VALUES ('+LigneCommande.Quantite+','+LigneCommande.PrixTotalArticleTTC+','+LigneCommande.PrixTotalArticleHT+',"'+synch+'",'+LigneCommande.CommandeID+','+LigneCommande.ArticleID+')');
				   
			 }
	
	},
    
    
 //////////////////////////////////////////////////////////////////////////////      
	
/////////////////////////Select From LOCAL /////////////////////////////////////	

SelectLigneCommande: function (callback,oCommande) {
	  var form = this;
	  this.connexion.transaction(function(tx){ form.SelectFromLigneCommandeBYCommandeID (tx, form,callback,oCommande); }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromLigneCommandeBYCommandeID");});
    },
    
     SelectFromLigneCommandeBYCommandeID : function(requete,form,callback,oCommande) {
   
   			requete.executeSql("SELECT * FROM LigneCommande WHERE CommandeID = ?", [oCommande.CommandeID], function(tx, results) {form.querySuccessByCommandeID(tx,results,form,callback,oCommande);});
       
    },
    
    
    
    
    
    querySuccessByCommandeID : function (requete, results,form,callback,oCommande) {
		
		var len = results.rows.length;
		oCommande.ListLignesCommande = [];
			if(len>0){
			for (var i=0;i<len;i++)
			{
			var oLigneCommande = new DMS.Mobile.LigneCommande();
			oLigneCommande.LigneCommandeID = results.rows.item(i).LigneCommandeID;
			oLigneCommande.Quantite = results.rows.item(i).Quantite;
			oLigneCommande.PrixTotalArticleTTC = results.rows.item(i).PrixTotalArticleTTC;
			oLigneCommande.PrixTotalArticleHT = results.rows.item(i).PrixTotalArticleHT;
			oLigneCommande.CommandeID = results.rows.item(i).CommandeID;
			oLigneCommande.ArticleID = results.rows.item(i).ArticleID;
			
			DMS.Mobile.ArticleRequest.connexion = form.connexion ;
			DMS.Mobile.ArticleRequest.SelectAll(function(LigneCommande){
				form.InsertLigneCommandeIntoCommande(form,callback,oCommande,LigneCommande,len);
				},oLigneCommande);
			
			}
		     				
			}
			else {callback(oCommande);}
	
        						
	},
	
	InsertLigneCommandeIntoCommande : function(form,callback,oCommande,LigneCommande,len){
		oCommande.ListLignesCommande.push(LigneCommande);
		if(len==oCommande.ListLignesCommande.length){
		callback(oCommande);
		}
	}
	
	
//////////////////////////////////////////////////////////////////////////////   	
	
	
}