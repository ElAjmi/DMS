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
		try
		{
			var Conf = JSON.parse(sessionStorage.getItem("Configuration"));
			
			var form = this;
			var Data = "PersonnelID="+PersonnelID; 	  
			var methode= "GetListCommandeDTOByPersonnelID?";
			var URL = Conf.URL+methode+Data;
			DMS.Mobile.Common.CallService(function(JsonObject,Form){form.createCommandeDTO(JsonObject,Form,callbackViewModel);},URL,form);
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectCommandeByPersonnelFromServer in CommandeRequest",'alert','e'); 
		}
	},
	
	createCommandeDTO : function (json,form,callbackViewModel)
	{
		try
		{
		if ( json != null)
	    {
			var synch = "true";
			var len =json.length;
			
			for (var i=0;i<json.length;i++)
			{
				var commandeDTO = new DMS.Mobile.Commande();
				
				commandeDTO.CommandeID = json[i].CommandeID;
				commandeDTO.CAB = json[i].CAB;
				
				var dCreation = DMS.Mobile.Common.ParseDateJson(json[i].DateCreation);	
				commandeDTO.DateCreation = dCreation;
				var hCreation = DMS.Mobile.Common.ParseHeureJson(json[i].DateCreation);	
				commandeDTO.HeureCreation = hCreation;
				
				var dLivraisonPrevue = DMS.Mobile.Common.ParseDateJson(json[i].DateLivraisonPrevue);	
				commandeDTO.DateLivraisonPrevue = dLivraisonPrevue;
				var hLivraisonPrevue = DMS.Mobile.Common.ParseHeureJson(json[i].DateLivraisonPrevue);	
				commandeDTO.HeureLivraisonPrevue = hLivraisonPrevue; 
				
				commandeDTO.EtatCommande = json[i].EtatCommande;
				commandeDTO.PrixTotalTTC = json[i].PrixTotalTTC;
				commandeDTO.PrixTotalHT = json[i].PrixTotalHT;
				commandeDTO.CodeCommande = json[i].CodeCommande;
				commandeDTO.TotalTVA = json[i].TotalTVA;
				commandeDTO.PointVenteID = json[i].PointVenteID;
				commandeDTO.CommercialID = json[i].CommercialID;
				commandeDTO.Personnel = json[i].Personnel;
				commandeDTO.PointVentes = json[i].PointVentes;
				commandeDTO.ListLignesCommande = json[i].LignesCommande;
				commandeDTO.ListLivraisons = json[i].Livraisons;

		       
				form.insertCommande(commandeDTO,synch,form,len,callbackViewModel);

			}
	
		}
		else{callbackViewModel(form.CommandeList);}	
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : createCommandeDTO in CommandeRequest",'alert','e'); 
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
		}
	
		},
		
InsertCommande: function(callbackViewModel,Commande){
		try
		{
					var form = this;	
			       	this.InsertCommandeIntoLOCAL(Commande,"false",form,null,callbackViewModel);
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertCommande in CommandeRequest",'alert','e'); 
		}
    },
	
	
InsertCommandeIntoLOCAL: function(CommandeObject,synch,formReq,len,callbackViewModel) 
{
	try
	{
		if (synch == "false")
		{
							formReq.connexion.transaction(function(tx){ formReq.InsertIntoCommande(tx, formReq,CommandeObject,synch) },  function(err){ DMS.Mobile.Common.errors(err,"InsertIntoCommande");},function(){callbackViewModel();}); 					   	}
		else
		{
			 formReq.connexion.transaction(function(tx){ formReq.InsertIntoCommande(tx, formReq,CommandeObject,synch) },  function(err){ DMS.Mobile.Common.errors(err,"InsertIntoCommande");}, function(){formReq.insertCommandeIntoArray(CommandeObject,formReq,len,callbackViewModel);}); 
		}
	}
    catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : InsertCommandeIntoLOCAL in CommandeRequest",'alert','e'); 
	}
},


InsertIntoCommande : function(requete,form,CommandeObject,synch) 
{
	try
	{
   alert(CommandeObject.CAB+',"'+CommandeObject.DateCreation+'","'+CommandeObject.DateLivraisonPrevue+'",'+CommandeObject.EtatCommande+','+CommandeObject.PrixTotalTTC+','+CommandeObject.PrixTotalHT+','+CommandeObject.TotalTVA+',"'+CommandeObject.CodeCommande+'","'+synch+'",'+CommandeObject.CommercialID+','+CommandeObject.PointVenteID);
   
			requete.executeSql('INSERT INTO Commandes (CAB,DateCreation,HeureCreation,DateLivraisonPrevue,HeureLivraisonPrevue,EtatCommande,PrixTotalTTC,PrixTotalHT,TotalTVA,CodeCommande,Synch,CommercialID,PointVenteID) VALUES("'+CommandeObject.CAB+'","'+CommandeObject.DateCreation+'","'+CommandeObject.HeureCreation+'","'+CommandeObject.DateLivraisonPrevue+'","'+CommandeObject.HeureLivraisonPrevue+'",'+CommandeObject.EtatCommande+','+CommandeObject.PrixTotalTTC+','+CommandeObject.PrixTotalHT+','+CommandeObject.TotalTVA+',"'+CommandeObject.CodeCommande+'","'+synch+'",'+CommandeObject.CommercialID+','+CommandeObject.PointVenteID+')');
			
			
    DMS.Mobile.Common.Alert("Fin insertion Commandes");    
	}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoCommande in CommandeRequest",'alert','e'); 
		}   																																
},

////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////SELECT From LOcal //////////////////////////////////////////   

	SelectAll : function (callback)
	{
		try
		{
		var form = this;
		this.connexion.transaction(function(tx){ form.SelectFromCommande(tx, form,callback); }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromCommande");});
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAll in CommandeRequest",'alert','e'); 
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
		}
       
},
    
    
    querySuccess:function (requete, results,form,callback) {
  try
  {
							var len = results.rows.length;
        
							for (var i=0; i<len; i++){
								
								var oCommande = new DMS.Mobile.Commande();
								oCommande.CommandeID = results.rows.item(i).CommandeID;
							    oCommande.CAB = results.rows.item(i).DateCreation;
								oCommande.DateCreation = results.rows.item(i).CAB;
							    oCommande.DateLivraisonPrevue = results.rows.item(i).DateLivraisonPrevue;
							    oCommande.PrixTotalTTC = results.rows.item(i).PrixTotalTTC;
							    oCommande.PrixTotalHT = results.rows.item(i).PrixTotalHT;
							    oCommande.TotalTVA = results.rows.item(i).TotalTVA;
							    oCommande.PointVenteID = results.rows.item(i).PointVenteID;
							    oCommande.CommercialID = results.rows.item(i).CommercialID;
								oCommande.EtatCommande = results.rows.item(i).EtatCommande;
        						oCommande.Synch = results.rows.item(i).Synch;
								
								DMS.Mobile.PointVenteRequest.connexion = form.connexion;
								DMS.Mobile.LigneCommandeRequest.connexion = form.connexion;
													
DMS.Mobile.PointVenteRequest.SelectPointVente(function(CommandePV){
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
		}
	},
       
//----------------------------------------------------       
   SelectLastCommande: function (callbackLastCommande) {
	try
	{
	  var form = this;
	  this.connexion.transaction(function(tx){ form.LastCommande(tx,form,callbackLastCommande); }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromActiviteByID");});
	  }
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectLastCommande in CommandeRequest",'alert','e'); 
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
        			
					
					}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessLastCommande in CommandeRequest",'alert','e'); 
		}			
	} 

       
       
}