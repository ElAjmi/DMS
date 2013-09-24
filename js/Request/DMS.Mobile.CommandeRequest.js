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
		var Conf = JSON.parse(sessionStorage.getItem("Configuration"));
		var ServeurURL	= Conf.URL;
		var form = this;
		var Data = "PersonnelID="+PersonnelID; 	  
		var methode= "GetListCommandeDTOByPersonnelID?";
		var URL = ServeurUrl+methode+Data;
	    DMS.Mobile.Common.CallService(function(JsonObject,Form){form.createCommandeDTO(JsonObject,Form,callbackViewModel);},URL,form);
	},
	
	createCommandeDTO : function (json,form,callbackViewModel)
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
		},
		
		
		insertCommandeIntoArray : function (commande,form,len,callbackViewModel)
		{
			form.CommandeList.push(commande);
			
			if(form.CommandeList.length == len)
			{
				callbackViewModel(form.CommandeList);
					
							
			}
		},
		
		
////////////////////////////////////////////////////////////////////////////////////////////	
	
/////////////////////////////////////////Insertion LOCAL ////////////////////////////////


insertCommande : function (commande,synch,form,len,callbackViewModel)
		{
			form.InsertCommandeIntoLOCAL(commande,synch,form,len,callbackViewModel);
	
		},
		
InsertCommande: function(callbackViewModel,Commande){
					var form = this;	
			       	this.InsertCommandeIntoLOCAL(Commande,"false",form,null,callbackViewModel);
    },
	
	
InsertCommandeIntoLOCAL: function(CommandeObject,synch,formReq,len,callbackViewModel) 
{
	if (synch == "false")
	{
					    formReq.connexion.transaction(function(tx){ formReq.InsertIntoCommande(tx, formReq,CommandeObject,synch) },  function(err){ DMS.Mobile.Common.errors(err,"InsertIntoCommande");},function(){callbackViewModel();}); 					   	}
	else
	{
		 formReq.connexion.transaction(function(tx){ formReq.InsertIntoCommande(tx, formReq,CommandeObject,synch) },  function(err){ DMS.Mobile.Common.errors(err,"InsertIntoCommande");}, function(){formReq.insertCommandeIntoArray(CommandeObject,formReq,len,callbackViewModel);}); 
	}
},


InsertIntoCommande : function(requete,form,CommandeObject,synch) 
{
   alert(CommandeObject.CAB+',"'+CommandeObject.DateCreation+'","'+CommandeObject.DateLivraisonPrevue+'",'+CommandeObject.EtatCommande+','+CommandeObject.PrixTotalTTC+','+CommandeObject.PrixTotalHT+','+CommandeObject.TotalTVA+',"'+CommandeObject.CodeCommande+'","'+synch+'",'+CommandeObject.CommercialID+','+CommandeObject.PointVenteID);
   
			requete.executeSql('INSERT INTO Commandes (CAB,DateCreation,DateLivraisonPrevue,EtatCommande,PrixTotalTTC,PrixTotalHT,TotalTVA,CodeCommande,Synch,CommercialID,PointVenteID) VALUES("'+CommandeObject.CAB+'","'+CommandeObject.DateCreation+'","'+CommandeObject.DateLivraisonPrevue+'",'+CommandeObject.EtatCommande+','+CommandeObject.PrixTotalTTC+','+CommandeObject.PrixTotalHT+','+CommandeObject.TotalTVA+',"'+CommandeObject.CodeCommande+'","'+synch+'",'+CommandeObject.CommercialID+','+CommandeObject.PointVenteID+')');
			
			
    DMS.Mobile.Common.Alert("Fin insertion Commandes");       																																
},

////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////SELECT From LOcal //////////////////////////////////////////   

	SelectAll : function (callback)
	{
		var form = this;
		this.connexion.transaction(function(tx){ form.SelectFromCommande(tx, form,callback); }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromCommande");});
	}, 
	
     SelectFromCommande : function(requete,form,callback) {
   
   			requete.executeSql('SELECT * FROM Commandes', [], function(tx, results) {form.querySuccess(tx,results,form,callback);});
       
},
    
    
    querySuccess:function (requete, results,form,callback) {
  
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
      
                    
    },
	
	InsertPointVenteIntoCommandeList : function(CommandeLC,form,len,callback)	
	{
		form.CommandeList.push(CommandeLC);
		if(form.CommandeList.length == len)
		{
			callback(form.CommandeList);
		}
	},
       
//----------------------------------------------------       
   SelectLastCommande: function (callbackLastCommande) {
	
	  var form = this;
	  this.connexion.transaction(function(tx){ form.LastCommande(tx,form,callbackLastCommande); }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromActiviteByID");});
    },
    
     LastCommande : function(requete,form,callbackLastCommande) {
   
   			requete.executeSql("SELECT * FROM Commandes ORDER BY CommandeID DESC LIMIT 1", [], function(tx, results) {form.querySuccessLastCommande(tx,results,form,callbackLastCommande);});
       
    },
    
    querySuccessLastCommande : function (requete, results,form,callbackLastCommande) {
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

       
       
}