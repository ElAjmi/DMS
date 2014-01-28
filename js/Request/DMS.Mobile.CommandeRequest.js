if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.CommandeRequest = {};

DMS.Mobile.CommandeRequest = 
{

	
	CommandeList :[],
	connexion: null,    
	
	
	
///////////////////////////////////////////////////////// SERVEUR //////////////////////////
	SelectCommandeByPersonnalFromServer : function(callbackViewModel,PersonnelID)
	{
		var form = this;
		try
		{
			var Conf = JSON.parse(localStorage.getItem("Configuration"));
			
			
			var Data = "PersonnelID="+PersonnelID; 	  
			var methode= "GetListCommandeDTOByPersonnelID?";
			var URL = Conf.URL+methode+Data;
			DMS.Mobile.Common.CallService(function(JsonObject,Form){form.createCommandeDTO(JsonObject,Form,callbackViewModel);},URL,form);
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectCommandeByPersonnelFromServer in CommandeRequest",'alert','e'); 
			
			  var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "SelectCommandeByPersonnelFromServer";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callbackViewModel(form.CommandeList);
						});
		}
	},
	
	createCommandeDTO : function (json,form,callbackViewModel)
	{
		
		try
		{
			var len =json.length;
		if ( len>0)
	    {
			var synch = "true";
			
			
			for (var i=0;i<json.length;i++)
			{
				var commandeDTO = new DMS.Mobile.Commande();
				
				commandeDTO.CommandeID = json[i].CommandeID;
				commandeDTO.CAB = json[i].CAB;
				
				var dCreation = DMS.Mobile.Common.ParseDateJson(json[i].DateCreation);	
				commandeDTO.DateCreation = dCreation;
				var hCreation = DMS.Mobile.Common.ParseHeureJson(json[i].DateCreation);	
				commandeDTO.HeureCreation = hCreation;
				
				//var dateTimeCreation = DMS.Mobile.Common.ParseDateTimeJson(json[i].DateCreation);				
				//commandeDTO.DateCreationTrie = dateTimeCreation;
				
				var dLivraisonPrevue = DMS.Mobile.Common.ParseDateJson(json[i].DateLivraisonPrevue);	
				commandeDTO.DateLivraisonPrevue = dLivraisonPrevue;
				
				commandeDTO.EtatCommande = json[i].EtatCommande;
				commandeDTO.PrixTotalTTC = json[i].PrixTotalTTC;
				commandeDTO.PrixTotalHT = json[i].PrixTotalHT;
				
				commandeDTO.TotalTVA = json[i].TotalTVA;
				commandeDTO.PointVenteID = json[i].PointVenteID;
				commandeDTO.CommercialID = json[i].CommercialID;
				commandeDTO.Personnel = json[i].Personnel;
				commandeDTO.PointVentes = json[i].PointVentes;
				commandeDTO.LignesCommande = json[i].LignesCommande;
				commandeDTO.Livraisons = json[i].Livraisons;

		       
				form.insertCommande(commandeDTO,synch,form,len,callbackViewModel);

			}
	
		}
		else{callbackViewModel(form.CommandeList);}	
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : createCommandeDTO in CommandeRequest",'alert','e');
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "createCommandeDTO";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callbackViewModel(form.CommandeList);
						}); 
		}
		},
		
		
		insertCommandeIntoArray : function (commande,form,len,callbackViewModel)
		{
			
			try
			{
			form.CommandeList.push(commande);
			
			if(form.CommandeList.length == len)
			{
				
				callbackViewModel(form.CommandeList);
					
							
			}
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertCommandeIntoArray in CommandeRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "insertCommandeIntoArray";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callbackViewModel(form.CommandeList);
						}); 
			
		}
		},
		
		
////////////////////////////////////////////////////////////////////////////////////////////	
	
/////////////////////////////////////////Insertion LOCAL ////////////////////////////////


insertCommande : function (commande,synch,form,len,callbackViewModel)
		{
			
			try
			{
			form.InsertCommandeIntoLOCAL(commande,synch,form,len,callbackViewModel);
	        }
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertCommande in CommandeRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "insertCommande";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callbackViewModel(form.CommandeList);
						}); 
		}
	
		},
		
InsertCommande: function(callbackViewModel,Commande){
	var form = this;
		try
		{
					//alert"insertCommande");
						
			       	this.InsertCommandeIntoLOCAL(Commande,"false",form,null,callbackViewModel);
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertCommande in CommandeRequest",'alert','e'); 
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "insertCommande";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callbackViewModel(null);
						});
		}
    },
	
	
InsertCommandeIntoLOCAL: function(CommandeObject,synch,formReq,len,callbackViewModel) 
{
	try
	{
		if (synch == "false")
		{
			//alert"false");
							formReq.connexion.transaction(function(tx){ formReq.InsertIntoCommande(tx, formReq,CommandeObject,synch) },  function(err){ DMS.Mobile.Common.errors(err,"InsertIntoCommande");
							
							     var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "InsertIntoCommande";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callbackViewModel(null);
						});
							
							},function(){
								//alert"succes insertion cmd local");
								DMS.Mobile.LigneCommandeRequest.connexion = formReq.connexion;
								var nbLigneCommande = CommandeObject.LignesCommande.length;
								//alert"nb ligne cmd = "+nbLigneCommande);
								for (var i = 0; i<nbLigneCommande ; i++)
								{
									CommandeObject.LignesCommande[i].CommandeID = CommandeObject.CommandeID;
								DMS.Mobile.LigneCommandeRequest.insertLigneCommande(CommandeObject.LignesCommande[i],nbLigneCommande,callbackViewModel);
								}
								}); 					   	
		}
		else
		{
			
			 formReq.connexion.transaction(function(tx){ formReq.InsertIntoCommande(tx, formReq,CommandeObject,synch) },  function(err){ DMS.Mobile.Common.errors(err,"InsertIntoCommande");
			 
			    var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "InsertIntoCommande";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callbackViewModel(formReq.CommandeList);
						});
			 
			 }, function(){
				// alert("success insertion cmd serveur ");
				 formReq.insertCommandeIntoArray(CommandeObject,formReq,len,callbackViewModel);}); 
		}
	}
    catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : InsertCommandeIntoLOCAL in CommandeRequest",'alert','e');
		
		 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "InsertCommandeIntoLOCAL";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callbackViewModel(null);
						}); 
	}
},


InsertIntoCommande : function(requete,form,CommandeObject,synch) 
{
	try
	{

  if (synch == "false")
			 {  
			
			 //alert"ins cmd local");
			 //alertCommandeObject.CommandeID+", "+CommandeObject.DateCreation+", "+CommandeObject.HeureCreation+", "+CommandeObject.DateLivraisonPrevue+", "+CommandeObject.EtatCommande+", "+CommandeObject.PrixTotalTTC+", "+CommandeObject.PrixTotalHT+", "+CommandeObject.TotalTVA+", "+synch+", "+CommandeObject.CommercialID+", "+CommandeObject.PointVenteID);
			 requete.executeSql('INSERT INTO Commandes (CommandeID,DateCreation,HeureCreation,DateLivraisonPrevue,EtatCommande,PrixTotalTTC,PrixTotalHT,TotalTVA,Synch,CommercialID,PointVenteID) VALUES('+CommandeObject.CommandeID+',"'+CommandeObject.DateCreation+'","'+CommandeObject.HeureCreation+'","'+CommandeObject.DateLivraisonPrevue+'",'+CommandeObject.EtatCommande+','+CommandeObject.PrixTotalTTC+','+CommandeObject.PrixTotalHT+','+CommandeObject.TotalTVA+',"'+synch+'",'+CommandeObject.CommercialID+','+CommandeObject.PointVenteID+')');
			 }
			 else
			 {
				 
				// alert("inse cmd serveur");
			requete.executeSql('INSERT INTO Commandes (CommandeID,CAB,DateCreation,HeureCreation,DateLivraisonPrevue,EtatCommande,PrixTotalTTC,PrixTotalHT,TotalTVA,Synch,CommercialID,PointVenteID) VALUES('+CommandeObject.CommandeID+',"'+CommandeObject.CAB+'","'+CommandeObject.DateCreation+'","'+CommandeObject.HeureCreation+'","'+CommandeObject.DateLivraisonPrevue+'",'+CommandeObject.EtatCommande+','+CommandeObject.PrixTotalTTC+','+CommandeObject.PrixTotalHT+','+CommandeObject.TotalTVA+',"'+synch+'",'+CommandeObject.CommercialID+','+CommandeObject.PointVenteID+')');
		
			 }
			
   //alert"Fin insertion Commandes");    
	}
			catch(err)
		{
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "InsertIntoCommande";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								 DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoCommande in CommandeRequest",'alert','e');
						}); 
			 
		}   																																
},

////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////SELECT From LOcal //////////////////////////////////////////   

	SelectAll : function (callback)
	{
		var form = this;
		try
		{
		
		this.connexion.transaction(function(tx){ form.SelectFromCommande(tx, form,callback); }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromCommande");});
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAll in CommandeRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "SelectAll";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(form.CommandeList);
						}); 
		}
	}, 
	
     SelectFromCommande : function(requete,form,callback) {
   try
   {
   			requete.executeSql('SELECT * FROM Commandes', [], function(tx, results) {form.querySuccess(tx,results,form,callback);});
	}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromCommande in CommandeRequest",'alert','e');
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "SelectFromCommande";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(form.CommandeList);
						});  
		}
       
},
    
    
    querySuccess:function (requete, results,form,callback) {
  try
  {
							var len = results.rows.length;
        
							for (var i=0; i<len; i++){
								
								var oCommande = new DMS.Mobile.Commande();
								oCommande.CommandeID = results.rows.item(i).CommandeID;
							    oCommande.CAB = results.rows.item(i).CAB;
								oCommande.DateCreation = results.rows.item(i).DateCreation;
							    oCommande.DateLivraisonPrevue = results.rows.item(i).DateLivraisonPrevue;
							    oCommande.PrixTotalTTC = results.rows.item(i).PrixTotalTTC;
							    oCommande.PrixTotalHT = results.rows.item(i).PrixTotalHT;
							    oCommande.TotalTVA = results.rows.item(i).TotalTVA;
								oCommande.Synch = results.rows.item(i).Synch;
							    oCommande.PointVenteID = results.rows.item(i).PointVenteID;
							    oCommande.CommercialID = results.rows.item(i).CommercialID;
								oCommande.EtatCommande = results.rows.item(i).EtatCommande;
        						
								
								DMS.Mobile.PointVenteRequest.connexion = form.connexion;
								DMS.Mobile.LigneCommandeRequest.connexion = form.connexion;
													
DMS.Mobile.PointVenteRequest.SelectPointVenteByCommandeID(function(CommandePV){
	DMS.Mobile.LigneCommandeRequest.SelectLigneCommande(function (CommandeLC){
		form.InsertPointVenteIntoCommandeList(CommandeLC,form,len,callback);
	},CommandePV)
	},oCommande);	
;
							}
}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccess in CommandeRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "querySuccess";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(form.CommandeList);
						});
		}
									 
                    
    },
	
	InsertPointVenteIntoCommandeList : function(CommandeLC,form,len,callback)	
	{
		try
		{
		form.CommandeList.push(CommandeLC);
		if(form.CommandeList.length == len)
		{
			callback(form.CommandeList);
		}
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertPointVenteIntoCommandeList in CommandeRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "InsertPointVenteIntoCommandeList";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(form.CommandeList);
						});
		}
	},
	
	/////////////////////////////////////// select all commande not synchronize /////////////
	
SelectAllCommandeNotSynchro : function(callback)
{
	//alert"form.CommandeList = "+this.CommandeList.length); 
	//alert"SelectAllCommandeNotSynchro");
	var form = this;
	 try
	{
		this.CommandeList = [];
		
		this.connexion.transaction(function(tx){ form.SelectAllCommandeNotSynch(tx, form,callback); }, function(err){ DMS.Mobile.Common.errors(err,"SelectAllCommandeNotSynchro");
		  
		  var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "SelectAllCommandeNotSynchro";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(form.CommandeList);
						});
		
		});
	}
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllCommandeNotSynchro in CommandeRequest",'alert','e'); 
		var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "SelectAllCommandeNotSynchro";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(form.CommandeList);
						});
	}
},

SelectAllCommandeNotSynch : function(requete, form,callback){
	//alert"SelectAllCommandeNotSynch");
   try
    { 
   			requete.executeSql("SELECT * FROM Commandes WHERE Synch =?", ["false"], function(tx, results) {form.querySuccessAllCommande(tx,results,form,callback);});
    }
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllCommandeNotSynch in CommandeRequest",'alert','e'); 
		
		var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "SelectAllCommandeNotSynch";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(form.CommandeList);
						});
	}

},

querySuccessAllCommande : function(requete,results,form,callback){
	//alert"querySuccessAllCommande");
     try
	 {
		var len = results.rows.length;
		//alert"nbr cmd = "+len);
		if (len>0){
			for (var i=0; i<len; i++){
				var oCommande = new DMS.Mobile.Commande();
				
				oCommande.CommandeID = results.rows.item(i).CommandeID;
				oCommande.CAB = results.rows.item(i).CAB;
				oCommande.DateCreation = results.rows.item(i).DateCreation;
				oCommande.HeureCreation = results.rows.item(i).HeureCreation;
				oCommande.DateLivraisonPrevue = results.rows.item(i).DateLivraisonPrevue;
				oCommande.EtatCommande = results.rows.item(i).EtatCommande;
				oCommande.PrixTotalTTC = results.rows.item(i).PrixTotalTTC;
				oCommande.PrixTotalHT = results.rows.item(i).PrixTotalHT;
			
				
				oCommande.TotalTVA = results.rows.item(i).TotalTVA;
				oCommande.PointVenteID = results.rows.item(i).PointVenteID;
				oCommande.CommercialID = results.rows.item(i).CommercialID;
				
				DMS.Mobile.LigneCommandeRequest.connexion = form.connexion;
				DMS.Mobile.LigneCommandeRequest.SelectAllLigneCommandeByCommandeID(oCommande,function(commande){
					
					form.insertCommandeIntoArray(commande,form,len,callback);
					
					});
			}
		}
		else
		{
			callback(form.CommandeList);
		}
      }
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessAllCommande in CommandeRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "querySuccessAllCommande";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(form.CommandeList);
						});
		}

},

///////////-------------------- SelectCommandeNotSynchronizeByID -------------------////////

SelectCommandeNotSynchByID : function(CommandeID,callback)
{
	var form = this;
	try
	{
	
	  this.connexion.transaction(function(tx){ form.CommandeNotSynchByID(tx,form,CommandeID,callback); }, function(err){ DMS.Mobile.Common.errors(err,"CommandeNotSynchByID");
	         
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "CommandeNotSynchByID";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(null);
						});
	  });
	  }
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectCommandeNotSynchByID in CommandeRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "SelectCommandeNotSynchByID";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(null);
						});
		}
},

CommandeNotSynchByID : function(requete,form,CommandeID,callback)
{
	try
	{
			requete.executeSql("SELECT * FROM Commandes WHERE CommandeID = ? AND Synch = ?", [CommandeID,"false"], function(tx, results) {form.querySuccessCommandeNotSynchByID(tx,results,form,callback);});
       
	   }
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : CommandeNotSynchByID in CommandeRequest",'alert','e');            
			          var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "CommandeNotSynchByID";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(null);
						});
		}
},

querySuccessCommandeNotSynchByID:function(requete,results,form,callback)
{
try
	{
		var i=0;
		var len = results.rows.length;
			if(len>0){					
								var oCommande = new DMS.Mobile.Commande();
								
								oCommande.CommandeID = results.rows.item(i).CommandeID;
							    oCommande.CAB = results.rows.item(i).CAB;
							    oCommande.DateLivraisonPrevue = results.rows.item(i).DateLivraisonPrevue;
							    oCommande.PrixTotalTTC = results.rows.item(i).PrixTotalTTC;
							    oCommande.PrixTotalHT = results.rows.item(i).PrixTotalHT;
							    oCommande.TotalTVA = results.rows.item(i).TotalTVA;
							    oCommande.PointVenteID = results.rows.item(i).PointVenteID;
							    oCommande.CommercialID = results.rows.item(i).CommercialID;
								
        						callback(oCommande);
			}
			else
			{
				callback(null);
			}
        			
					
					}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessLastCommande in CommandeRequest",'alert','e'); 
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "querySuccessLastCommande";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(null);
						});
		}	
},
       //---------------------------------// Select All Commande order by commandeID //--------------------//
	   
SelectAllCommandeOrder : function(pointVenteID, callback)
{
	var form = this;
	 try
	{
		this.CommandeList = [];
		
		this.connexion.transaction(function(tx){ form.SelectAllCmdOrder(tx, form,callback,pointVenteID); }, function(err){ DMS.Mobile.Common.errors(err,"SelectAllCmdOrder");
		
		       var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "SelectAllCmdOrder";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(form.CommandeList);
						});
		
		});
	}
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllCommandeOrder in CommandeRequest",'alert','e');
		
		var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "SelectAllCommandeOrder";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(form.CommandeList);
						}); 
	}
},

SelectAllCmdOrder : function(requete, form,callback, pointVenteID){
   try
    { 
   			requete.executeSql("SELECT * FROM Commandes  WHERE PointVenteID = ?  ORDER BY CommandeID DESC", [pointVenteID], function(tx, results) {form.querySuccessAllCommandeOrder(tx,results,form,callback);});
    }
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllCmdOrder in CommandeRequest",'alert','e');
		
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "SelectAllCmdOrder";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(form.CommandeList);
						});  
	}

},

querySuccessAllCommandeOrder : function(requete,results,form,callback){
     try
	 {
		 form.CommandeList = [];
		var len = results.rows.length;
		if (len>0){
			for (var i=0; i<len; i++){
				var oCommande = new DMS.Mobile.Commande();
				
				oCommande.CommandeID = results.rows.item(i).CommandeID;
				oCommande.CAB = results.rows.item(i).CAB;
				oCommande.DateCreation = results.rows.item(i).DateCreation;
				oCommande.HeureCreation = results.rows.item(i).HeureCreation;
				oCommande.DateLivraisonPrevue = results.rows.item(i).DateLivraisonPrevue;
				oCommande.EtatCommande = results.rows.item(i).EtatCommande;
				oCommande.PrixTotalTTC = results.rows.item(i).PrixTotalTTC;
				oCommande.PrixTotalHT = results.rows.item(i).PrixTotalHT;
			
				
				oCommande.TotalTVA = results.rows.item(i).TotalTVA;
				oCommande.PointVenteID = results.rows.item(i).PointVenteID;
				oCommande.CommercialID = results.rows.item(i).CommercialID;
				
				DMS.Mobile.LigneCommandeRequest.connexion = form.connexion;
				DMS.Mobile.LigneCommandeRequest.SelectAllLigneCommandeByCmdID(oCommande,function(commande){
					
					form.insertCommandeIntoArray(commande,form,len,callback);
					
					});
			}
		}
		else
		{
			callback(form.CommandeList);
		}
      }
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessAllCommandeOrder in CommandeRequest",'alert','e'); 
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "querySuccessAllCommandeOrder";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(form.CommandeList);
						});
		}

},
	   
	   
	   
	   
//----------------------------------------/// select last commande ///--------------------------------------//      
   SelectLastCommande: function (callbackLastCommande) {
	  var form = this;
	try
	{
	
	  this.connexion.transaction(function(tx){ form.LastCommande(tx,form,callbackLastCommande); }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromActiviteByID");
	  
	        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "querySuccessAllCommandeOrder";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackLastCommande(null);
						});
	  
	  });
	  }
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectLastCommande in CommandeRequest",'alert','e');
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "SelectLastCommande";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackLastCommande(null);
						}); 
		}
    },
    
     LastCommande : function(requete,form,callbackLastCommande) {
   try
   {
   			requete.executeSql("SELECT * FROM Commandes ORDER BY CommandeID DESC LIMIT 1", [], function(tx, results) {form.querySuccessLastCommande(tx,results,form,callbackLastCommande);});
       
	   }
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : LastCommande in CommandeRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "LastCommande";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackLastCommande(null);
						}); 
		}
    },
    
    querySuccessLastCommande : function (requete, results,form,callbackLastCommande) {
	try
	{
		var i=0;
		var len = results.rows.length;
			if(len>0){					
								var oCommande = new DMS.Mobile.Commande();
								oCommande.CommandeID = results.rows.item(i).CommandeID;
							    oCommande.CAB = results.rows.item(i).CAB;
							    oCommande.DateLivraisonPrevue = results.rows.item(i).DateLivraisonPrevue;
							    oCommande.PrixTotalTTC = results.rows.item(i).PrixTotalTTC;
							    oCommande.PrixTotalHT = results.rows.item(i).PrixTotalHT;
							    oCommande.TotalTVA = results.rows.item(i).TotalTVA;
							    oCommande.PointVenteID = results.rows.item(i).PointVenteID;
							    oCommande.CommercialID = results.rows.item(i).CommercialID;
        						callbackLastCommande(oCommande);
			}
        	else
			{
				callbackLastCommande(null);
			}		
					
					}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessLastCommande in CommandeRequest",'alert','e'); 
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "querySuccessLastCommande";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackLastCommande(null);
						}); 
		}			
	} ,
	
	/////////////////////////////////////////////// Update commande ////////////////////////////////////////
	
	UpdateCommande : function(callbackViewModel, commande)
	{
		var form = this;
		try
		{
					
			this.connexion.transaction(function(tx){ form.UpdateCommandeObject(tx, form,commande,callbackViewModel); }, function(err){ DMS.Mobile.Common.errors(err,"UpdateCommandeObject");
			
			      var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "UpdateCommandeObject";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(null);
						}); 
			
			});
	    }
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateCommande in CommandeRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "UpdateCommande";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(null);
						}); 
		}
	},
	
	
UpdateCommandeObject : function (requete,formReq,CommandeObject,callbackViewModel)
{
	//alert("updateCommandeObject");
		try
		{
			    requete.executeSql(' UPDATE Commandes SET DateLivraisonPrevue= ? WHERE CommandeID = ?', [CommandeObject.DateLivraisonPrevue,CommandeObject.CommandeID]);
			    requete.executeSql(' UPDATE Commandes SET PrixTotalTTC= ? WHERE CommandeID = ?', [CommandeObject.PrixTotalTTC,CommandeObject.CommandeID]);
			    requete.executeSql(' UPDATE Commandes SET PrixTotalHT= ? WHERE CommandeID = ?', [CommandeObject.PrixTotalHT,CommandeObject.CommandeID]);
			    requete.executeSql(' UPDATE Commandes SET TotalTVA= ? WHERE CommandeID = ?', [CommandeObject.TotalTVA,CommandeObject.CommandeID]);
			    requete.executeSql(' UPDATE Commandes SET PointVenteID= ? WHERE CommandeID = ?', [CommandeObject.PointVenteID,CommandeObject.CommandeID]);				
				requete.executeSql(' UPDATE Commandes SET EtatCommande= ? WHERE CommandeID = ?', [CommandeObject.EtatCommande,CommandeObject.CommandeID]);
				requete.executeSql(' UPDATE Commandes SET DateModification= ? WHERE CommandeID = ?', [CommandeObject.DateModification,CommandeObject.CommandeID]);
				requete.executeSql(' UPDATE Commandes SET HeureModification= ? WHERE CommandeID = ?', [CommandeObject.HeureModification,CommandeObject.CommandeID],function(tx, results) {formReq.querySuccessUpdate(tx,results,formReq,CommandeObject,callbackViewModel);});
				
		 		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateCommandeObject in CommandeRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "UpdateCommandeObject";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(null);
						}); 
		}  
},

querySuccessUpdate : function(requete,results,formReq,CommandeObject,callbackViewModel)
{
	//alert("delete ligne commande");
	try
	{
	DMS.Mobile.LigneCommandeRequest.connexion = formReq.connexion;
	
	DMS.Mobile.LigneCommandeRequest.DeleteLigneCommandeByCommandeID(CommandeObject,callbackViewModel);
	}
	catch(err)
	{
		var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "querySuccessUpdate";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(CommandeObject);
						}); 
	}
},
       
////-------------------- update synch des Commandes ( de non synchroniser ==> a synchroniser) -------------------//


UpdateSynchCommande: function (callback) {
		var form = this;
		try
		{	 
				
			this.connexion.transaction(function(tx){ form.UpdateCommandeNotSynch(tx, form,callback) }, function(err){ DMS.Mobile.Common.errors(err,"UpdateCommandeNotSynch");
			
			       var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "UpdateCommandeNotSynch";
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
			DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateSynchCommande in CommandeRequest",'alert','e'); 
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "UpdateSynchCommande";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback();
						}); 
		}
		},

UpdateCommandeNotSynch : function(requete, form,callback) {
		try
		{
				requete.executeSql(' UPDATE Commandes SET Synch= ? WHERE Synch = ?', ["true","false"], function(tx, results) {form.querySuccessUpdateSynch(tx,results,form,callback);});
		 		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateCommandeNotSynch in CommandeRequest",'alert','e'); 
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "UpdateCommandeNotSynch";
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
},

		 //////////////////////////////////////// Delete All Commande ////////////////////////
DeleteAllCommande : function(callback)
{
	var form = this;
	try
	{
				
			this.connexion.transaction(function(tx){ form.DeleteCommandes(tx, form,callback);}, function(err){ DMS.Mobile.Common.errors(err,"DeleteAllCommande");
			
			   var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "DeleteCommandes";
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
			DMS.Mobile.Notification.ShowMessage(err.message+" : DeleteAllCommande in CommandeRequest",'alert','e'); 
	     
	                    var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "DeleteAllCommande";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback();
						}); 
	
	 }	
}, 

DeleteCommandes : function(requete, form,callback)
{
	requete.executeSql("DELETE  FROM Commandes ", [],
              function(tx, result) {				
				form.querySuccessDELETEAll(form,callback);
				}, 
                function(err){DMS.Mobile.Common.errors(err,"DeleteCommandes");
				
				         var exception = new DMS.Mobile.Exception();
						exception.FichierE = "CommandeRequest";
						exception.FonctionE = "DeleteCommandes";
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

///////////////////////////////////////////////////////////////////////////////////////////////////

       
}