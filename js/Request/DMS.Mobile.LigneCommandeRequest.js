if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.LigneCommandeRequest = {};

DMS.Mobile.LigneCommandeRequest = 
{
	
	ListLigneCommande : [],
    connexion: null,


	
	
	insertLigneCommandeIntoArray : function(LigneCommande,form,len,callbackViewModel)
	{
		try
		{
			//alert"insert ligne commande into array");
		
			form.ListLigneCommande.push(LigneCommande);
			if ( form.ListLigneCommande.length == len)
			{
				//alert"call view model");
				callbackViewModel(form.ListLigneCommande);
			}
				}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertLigneCommandeIntoArray in LigneCommandeRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "insertLigneCommandeIntoArray";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.ListLigneCommande);
						});
			
		}
	},
	
//////////////////////////////////////////////// Serveur  /////////////////////
	SelectLigneCommandeByPersonnelFromServer : function (callbackViewModel,PersonnelID)
	{
		form =this;
		try
		{
		  var Conf = JSON.parse(localStorage.getItem("Configuration"));
		
		  
		
		  var Data = "PersonnelID="+PersonnelID; 
		  
		  var methode= "GetListLigneCommandeDTOByPersonnelID?";

		  var URL = Conf.URL+methode+Data;

		     DMS.Mobile.Common.CallService(function(JsonObject,Form){form.createLigneCommandeDTO(JsonObject,Form,callbackViewModel);},URL,form);
				}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectLigneCommandeByPersonnelFromServer in LigneCommandeRequest",'alert','e'); 
			
			    var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "SelectLigneCommandeByPersonnelFromServer";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.ListLigneCommande);
						});
		}
	},
	
	createLigneCommandeDTO : function (json,form,callbackViewModel)
	{
		try
		{
			var len = json.length;
		 if (len>0)
		 //if (( json != null) && (json != []))
		 {
			
		
			var synch = "true";
            
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
		else{
		
			callbackViewModel(form.ListLigneCommande);}	
		
		
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : CreateLigneCommandeDTO in LigneCommandeRequest",'alert','e'); 
			
			   var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "CreateLigneCommandeDTO";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.ListLigneCommande);
						});
		}
	},
	
	
	////////////////////////////////////////////////////////////////////////////// 
	
/////////////////////////Insertion LOCAL /////////////////////////////////////

   InsertLigneCommande : function (ligneCommande,synch,form,len,callbackViewModel)
		{
			//alert("insert ligne commande");
			try
			{
			form.InsertLigneCommandeIntoLOCAL(ligneCommande,synch,form,len,callbackViewModel);
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertLigneCommande in LigneCommandeRequest",'alert','e'); 
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "InsertLigneCommande";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.ListLigneCommande);
						});
			
		}
		},
		
   insertLigneCommande: function(ligneCommande,len,callbackViewModel){
			var form = this;
			try
			{
				//alert"insert ligne cmd");
							
			       	this.InsertLigneCommandeIntoLOCAL(ligneCommande,"false",form,len,callbackViewModel);
						}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertLigneCommande in LigneCommandeRequest",'alert','e'); 
			   			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "insertLigneCommande";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.ListLigneCommande);
						});
		}
    },	
	
	
	
	InsertLigneCommandeIntoLOCAL: function(LigneCommandeObject,synch,formReq,len,callbackViewModel) 
   {
	   try
	   {
		    //alert"insertLigneCommandeIntoLOCLA");
		   
				formReq.connexion.transaction(function(tx){ formReq.InsertIntoLigneCommande(tx, formReq,LigneCommandeObject,synch); }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoLigneCommande");
				
			   			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "InsertIntoLigneCommande";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.ListLigneCommande);
						});				                 
				
				},function(){
							
						formReq.insertLigneCommandeIntoArray(LigneCommandeObject,formReq,len,callbackViewModel)	;		
							}); 
					
	
				}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertLigneCommandeIntoLOCAL in LigneCommandeRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "InsertLigneCommandeIntoLOCAL";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.ListLigneCommande);
						});	
		}		
    },
	
	InsertIntoLigneCommande : function(requete,form, LigneCommande,synch){
		try
		{
		//alert'?'+','+LigneCommande.Quantite+','+LigneCommande.PrixTotalArticleTTC+','+LigneCommande.PrixTotalArticleHT+',"'+synch+'",'+LigneCommande.CommandID+','+LigneCommande.ArticleID);
		
				   requete.executeSql('INSERT INTO LigneCommande (Quantite,PrixTotalArticleTTC,PrixTotalArticleHT,Synch,CommandeID,ArticleID) VALUES ('+LigneCommande.Quantite+','+LigneCommande.PrixTotalArticleTTC+','+LigneCommande.PrixTotalArticleHT+',"'+synch+'",'+LigneCommande.CommandeID+','+LigneCommande.ArticleID+')');
				   
	
		}
			catch(err)
		{
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "InsertIntoLigneCommande";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoLigneCommande in LigneCommandeRequest",'alert','e');
						});
			 
		}
	
	},
    
    
 //////////////////////////////////////////////////////////////////////////////      
	
/////////////////////////Select From LOCAL /////////////////////////////////////	

SelectLigneCommande: function (callback,oCommande) {
 var form = this;
try
{
	 
	  this.connexion.transaction(function(tx){ form.SelectFromLigneCommandeBYCommandeID (tx, form,callback,oCommande); }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromLigneCommandeBYCommandeID");
	                      
						   var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "SelectFromLigneCommandeBYCommandeID";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(oCommande);
						});
	  
	  });
	  	}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectLigneCommande in LigneCommandeRequest",'alert','e'); 
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "SelectLigneCommande";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(oCommande);
						});
		}
    },
    
     SelectFromLigneCommandeBYCommandeID : function(requete,form,callback,oCommande) {
   try
   {
   			requete.executeSql("SELECT * FROM LigneCommande WHERE CommandeID = ?", [oCommande.CommandeID], function(tx, results) {form.querySuccessByCommandeID(tx,results,form,callback,oCommande);});
    	}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromLigneCommandeByCommandeID in LigneCommandeRequest",'alert','e'); 
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "SelectFromLigneCommandeByCommandeID";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(oCommande);
						});
		}
    },
    
    
    
    
    
    querySuccessByCommandeID : function (requete, results,form,callback,oCommande) {
try
{		
		var len = results.rows.length;
		oCommande.LignesCommande = [];
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
			oLigneCommande.Synch = results.rows.item(i).Synch;
			
			DMS.Mobile.ArticleRequest.connexion = form.connexion ;
			DMS.Mobile.ArticleRequest.SelectAll(function(LigneCommande){
				form.InsertLigneCommandeIntoCommande(form,callback,oCommande,LigneCommande,len);
				},oLigneCommande);
			
			}
		     				
			}
			else {callback(oCommande);}
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessByCommandeID in LigneCommandeRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "querySuccessByCommandeID";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(oCommande);
						});
		}
        						
	},
	
	InsertLigneCommandeIntoCommande : function(form,callback,oCommande,LigneCommande,len){
	try
	{
		oCommande.LignesCommande.push(LigneCommande);
		if(len==oCommande.LignesCommande.length){
		callback(oCommande);
		}
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertLigneCommandeIntoCommande in LigneCommandeRequest",'alert','e'); 
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "InsertLigneCommandeIntoCommande";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(oCommande);
						});
		}
	},	
	
////-------------------- Select all ligne commande not synchronize by commandeID  ----------------////////
SelectAllLigneCommandeByCommandeID : function(Commande,callback)
{
	//alert"SelectAllLigneCommandeByCommandeID");
	var form = this;
	 try
	{
		
		this.connexion.transaction(function(tx){ form.SelectAllLingeCommandeNotSynch(tx, form,callback,Commande); }, function(err){ DMS.Mobile.Common.errors(err,"SelectAllLingeCommandeNotSynch");
		
		                var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "SelectAllLingeCommandeNotSynch";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(Commande);
						});
		
		});
	}
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllLigneCommandeByCommandeID in LigneCommandeRequest",'alert','e'); 
		
		 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "SelectAllLigneCommandeByCommandeID";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(Commande);
						});
	}
},	

SelectAllLingeCommandeNotSynch : function(requete, form,callback,Commande)
{
	//alert"SelectAllLingeCommandeNotSynch");
	try
	{
	   			requete.executeSql("SELECT * FROM LigneCommande WHERE Synch =? AND CommandeID=?", ["false",Commande.CommandeID], function(tx, results) {form.querySuccessAllLigneCommande(tx,results,form,callback,Commande);});
    }
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllLingeCommandeNotSynch in LigneCommandeRequest",'alert','e'); 
		
		var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "SelectAllLingeCommandeNotSynch";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(Commande);
						});
	}
},
	
querySuccessAllLigneCommande : function(requete,results,form,callback,Commande)
{
	//alert"querySuccessAllLigneCommande");
	try
	{
	var len = results.rows.length;
		Commande.LignesCommande = [];
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
			
			
			form.InsertListLigneCommandeIntoCommande(form,oLigneCommande,Commande,len,callback);
			
			}
		     				
		    }
			else {callback(Commande);}
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessAllLigneCommande in LigneCommandeRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "querySuccessAllLigneCommande";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(Commande);
						});
		}
},	

InsertListLigneCommandeIntoCommande : function(form,oLigneCommande,Commande,len,callback)
{
	//alert"InsertListLigneCommandeIntoCommande");
	try
	{
		Commande.LignesCommande.push(oLigneCommande);
		if(Commande.LignesCommande.length == len)
		{
			//alert"callbacl ligne commande");
			callback(Commande);
		}
	}
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : InsertListLigneCommandeIntoCommande in LigneCommandeRequest",'alert','e');
		
		 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "InsertListLigneCommandeIntoCommande";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(Commande);
						});
	}
},

	
//////////////////////////////////////////////////////////////////////////////   



////-------------------- Select all ligne commande by commandeID (++)  ----------------////////
SelectAllLigneCommandeByCmdID : function(Commande,callback)
{
	//alert"SelectAllLigneCommandeByCommandeID");
	var form = this;
	 try
	{
		
		this.connexion.transaction(function(tx){ form.SelectAllLingeCmd(tx, form,callback,Commande); }, function(err){ DMS.Mobile.Common.errors(err,"SelectAllLingeCmd");
		
		           var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "SelectAllLingeCmd";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(Commande);
						});
		
		});
	}
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllLigneCommandeByCmdID in LigneCommandeRequest",'alert','e'); 
		
		var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "SelectAllLigneCommandeByCmdID";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(Commande);
						});
	}
},	

SelectAllLingeCmd : function(requete, form,callback,Commande)
{
	//alert"SelectAllLingeCommandeNotSynch");
	try
	{
	   			requete.executeSql("SELECT * FROM LigneCommande WHERE CommandeID=?", [Commande.CommandeID], function(tx, results) {form.querySuccessAllLigneCmd(tx,results,form,callback,Commande);});
    }
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllLingeCmd in LigneCommandeRequest",'alert','e');
		
		                var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "SelectAllLingeCmd";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(Commande);
						}); 
	}
},
	
querySuccessAllLigneCmd : function(requete,results,form,callback,Commande)
{
	//alert"querySuccessAllLigneCommande");
	try
	{
	var len = results.rows.length;
		Commande.LignesCommande = [];
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
			
			
			form.InsertListLigneCommandeIntoCmd(form,oLigneCommande,Commande,len,callback);
			
			}
		     				
		    }
			else {callback(Commande);}
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessAllLigneCmd in LigneCommandeRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "querySuccessAllLigneCmd";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(Commande);
						});
		}
},	

InsertListLigneCommandeIntoCmd : function(form,oLigneCommande,Commande,len,callback)
{
	//alert"InsertListLigneCommandeIntoCommande");
	try
	{
		Commande.LignesCommande.push(oLigneCommande);
		if(Commande.LignesCommande.length == len)
		{
			//alert"callbacl ligne commande");
			callback(Commande);
		}
	}
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : InsertListLigneCommandeIntoCmd in LigneCommandeRequest",'alert','e');
		
		var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "InsertListLigneCommandeIntoCmd";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(Commande);
						});
	}
},

	
//////////////////////////////////////////////////////////////////////////////   	

//////////////////////////////////////// Delete All ligne commande ////////////////////////
DeleteAllLigneCommande : function(callback)
{
	var form = this;
	try
	{
				
			this.connexion.transaction(function(tx){ form.DeleteLigneCommande(tx, form,callback);}, function(err){ DMS.Mobile.Common.errors(err,"DeleteLigneCommande");
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "DeleteLigneCommande";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback();
						});
			
			});
	 }
	 catch(err)
	 {
			DMS.Mobile.Notification.ShowMessage(err.message+" : DeleteAllLigneCommande in LigneCommandeRequest",'alert','e'); 
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "DeleteAllLigneCommande";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback();
						});
	 }	
}, 

DeleteLigneCommande : function(requete, form,callback)
{
	requete.executeSql("DELETE  FROM LigneCommande ", [],
              function(tx, result) {				
				form.querySuccessDELETEAll(form,callback);
				}, 
                function(err){DMS.Mobile.Common.errors(err,"DeleteLigneCommande");
				
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "DeleteLigneCommande";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback();
						});
				
				});
},

querySuccessDELETEAll : function(form,callback)
{
	callback();
},

//////////////////////////////////////// Delete ligne commande by commandeID /////////////////////////
DeleteLigneCommandeByCommandeID : function(CommandeObject,callbackViewModel)
{
	//alert("delete ligne commande by commandeID");
	//alert("delete ligne commande de la commande : "+CommandeObject.CommandeID);
	  var form = this;
	  	try
		{
					
			this.connexion.transaction(function(tx){ form.DeleteLigneCommandeObject(tx, form,CommandeObject,callbackViewModel);}, function(err){ DMS.Mobile.Common.errors(err,"DeleteLigneCommandeObject");
			
			      var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "DeleteLigneCommandeObject";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.ListLigneCommande);
						});
			
			});
	    }
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : DeleteLigneCommandeByCommandeID in LigneCommandeRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "DeleteLigneCommandeByCommandeID";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.ListLigneCommande);
						});
		}	
	
},

DeleteLigneCommandeObject : function(requete,form,CommandeObject,callbackViewModel)
{

try
{
	//alert("delete ligne commande object");
	           requete.executeSql("DELETE FROM LigneCommande WHERE CommandeID=?", [CommandeObject.CommandeID],
              function(tx, result) {
				//  alert("succées suppression");
				//alert("insert ligne commande"); 
				
				form.querySuccessDELETE(form,CommandeObject,callbackViewModel);
				
				
				}, 
                function(err){DMS.Mobile.Common.errors(err,"DeleteLigneCommandeObject");
				
				      var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "querySuccessDELETE";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.ListLigneCommande);
						});
				
				});
     
}
catch(err)
{
	var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "DeleteLigneCommandeObject";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.ListLigneCommande);
						});
}
	
},


querySuccessDELETE : function(form,Commande,callbackViewModel)
{
//alert("query success delete");
try
{
	var nbLigneCommande = Commande.LignesCommande.length;
			//alert("nb ligne cmd = "+nbLigneCommande);
			for (var i = 0; i<nbLigneCommande ; i++)
			{	
				Commande.LignesCommande[i].CommandeID = Commande.CommandeID;
				form.insertLigneCommande(Commande.LignesCommande[i],nbLigneCommande,callbackViewModel);
			}
}
catch(err)
{
	var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "querySuccessDELETE";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.ListLigneCommande);
						});
}
},

////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////// update Ligne Commande ///////////////////////////

UpdateLigneCommande : function(ligneCommande,len,callbackViewModel)
{
	//alert("update ligne commande");
	var form = this;
    	try
		{
					
			this.connexion.transaction(function(tx){ form.UpdateLigneCommandeObject(tx, form,ligneCommande,len,callbackViewModel) }, function(err){ DMS.Mobile.Common.errors(err,"UpdateLigneCommandeObject");
			
			         var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "UpdateLigneCommandeObject";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.ListLigneCommande);
						});
			});
	    }
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateLigneCommande in LigneCommandeRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "UpdateLigneCommande";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.ListLigneCommande);
						});
		}	
},

UpdateLigneCommandeObject : function(requete,formReq,LigneCommandeObject,len,callbackViewModel)
{
	//alert("update ligne commande object");
			try
		{
				requete.executeSql(' UPDATE LigneCommande SET Quantite= ? WHERE LigneCommandeID = ?', [LigneCommandeObject.Quantite,LigneCommandeObject.LigneCommandeID]);
				requete.executeSql(' UPDATE LigneCommande SET Synch= ? WHERE LigneCommandeID = ?', ["false",LigneCommandeObject.LigneCommandeID],function(tx, results) {formReq.querySuccessUpdate(tx,results,formReq,LigneCommandeObject,len,callbackViewModel);});
				
		 		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateLigneCommandeObject in LigneCommandeRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "UpdateLigneCommande";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.ListLigneCommande);
						});
		}
},

querySuccessUpdate : function(requete,results,form,LigneCommandeObject,len,callbackViewModel)
{
//	alert("succee update ligne commande");
try
{
	form.insertLigneCommandeIntoArray(LigneCommandeObject,form,len,callbackViewModel);
}
catch(err)
{
	var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "querySuccessUpdate";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.ListLigneCommande);
						});
}
},

	   ////-------------------- update synch des lignes commandes ( de non synchroniser ==> a synchroniser) -------------------//


UpdateSynchLigneCommande: function (callback) {
		var form = this;
		try
		{	 
				
			this.connexion.transaction(function(tx){ form.UpdateLigneCommandeNotSynch(tx, form,callback) }, function(err){ DMS.Mobile.Common.errors(err,"UpdateLigneCommandeNotSynch");
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "UpdateLigneCommandeNotSynch";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback();
						});
			
			});
				}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateSynchLigneCommande in LigneCommandeRequest",'alert','e'); 
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "UpdateSynchLigneCommande";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback();
						});
		}
		},

UpdateLigneCommandeNotSynch : function(requete, form,callback) {
		try
		{
				requete.executeSql(' UPDATE LigneCommande SET Synch= ? WHERE Synch = ?', ["true","false"], function(tx, results) {form.querySuccessUpdateSynch(tx,results,form,callback);});
		 		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateLigneCommandeNotSynch in LigneCommandeRequest",'alert','e'); 
			
			          var exception = new DMS.Mobile.Exception();
						exception.FichierE = "LigneCommandeRequest";
						exception.FonctionE = "UpdateLigneCommandeNotSynch";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback();
						});
		}  
		},

querySuccessUpdateSynch : function(requete,results,form,callback)
{
	callback();
}
	
}