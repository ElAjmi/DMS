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
		var Data = "PersonnelID="+PersonnelID; 	  
		var methode= "GetListCommandeDTOByPersonnelID?";
		var URL = DMS.Mobile.Common.ServeurUrl+methode+Data;
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
				commandeDTO.DateCreation = json[i].DateCreation;
				commandeDTO.DateLivraisonPrevue = json[i].DateLivraisonPrevue;
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
		
InsertCommande: function(Commande){
					var form = this;	
			       	this.InsertCommandeIntoLOCAL(Commande,"false",form,null,null);
    },
	
	
InsertCommandeIntoLOCAL: function(CommandeObject,synch,formReq,len,callbackViewModel) 
{
	if (synch == "false")
	{
					    formReq.connexion.transaction(function(tx){ formReq.InsertIntoCommande(tx, formReq,CommandeObject,synch) },  function(err){ DMS.Mobile.Common.errors(err,"InsertIntoCommande");}); 					   	}
	else
	{
		 formReq.connexion.transaction(function(tx){ formReq.InsertIntoCommande(tx, formReq,CommandeObject,synch) },  function(err){ DMS.Mobile.Common.errors(err,"InsertIntoCommande");}, function(){formReq.insertCommandeIntoArray(CommandeObject,formReq,len,callbackViewModel);}); 
	}
},


InsertIntoCommande : function(requete,form,CommandeObject,synch) 
{
			requete.executeSql('INSERT INTO Commandes (CommandeID,CAB,DateCreation,DateLivraisonPrevue,EtatCommande,PrixTotalTTC,PrixTotalHT,TotalTVA,CodeCommande,Synch,CommercialID,PointVenteID) VALUES('+CommandeObject.CommandeID+',"'+CommandeObject.CAB+'","'+CommandeObject.DateCreation+'","'+CommandeObject.DateLivraisonPrevue+'",'+CommandeObject.EtatCommande+','+CommandeObject.PrixTotalTTC+','+CommandeObject.PrixTotalHT+','+CommandeObject.TotalTVA+',"'+CommandeObject.CodeCommande+'","'+synch+'",'+CommandeObject.CommercialID+','+CommandeObject.PointVenteID+')');
			
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
							    oCommande.CAB = results.rows.item(i).CAB;
							    oCommande.DateLivraisonPrevue = results.rows.item(i).DateLivraisonPrevue;
							    oCommande.PrixTotalTTC = results.rows.item(i).PrixTotalTTC;
							    oCommande.PrixTotalHT = results.rows.item(i).PrixTotalHT;
							    oCommande.TotalTVA = results.rows.item(i).TotalTVA;
							    oCommande.PointVenteID = results.rows.item(i).PointVenteID;
							    oCommande.CommercialID = results.rows.item(i).CommercialID;
        						form.CommandeList.push(oCommande);
        						
							}							
callback(form.CommandeList);       
                    
    },
       
       
   

       
       
}