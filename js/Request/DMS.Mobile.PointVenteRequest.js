  if (typeof (DMS) == 'undefined') DMS = {};
	if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};
	
	
	
	DMS.Mobile.PointVenteRequest = {};
	
	DMS.Mobile.PointVenteRequest = 
	{
			connexion: null,
			ListPointVente : [],
			

	
	insertPointVenteIntoArray : function(pointVente,form,len,callbackViewModel)
	{
		try
		{
			form.ListPointVente.push(pointVente);
			if (form.ListPointVente.length == len)
			{
				//alert"appel client");
				callbackViewModel(form.ListPointVente);
			}
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertPointVenteIntoArray in PointVenteRequest",'alert','e'); 
			
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "insertPointVenteIntoArray";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListPointVente);
						});
		}
	},
	
	
//////////////////////////////////////////////////////// Serveur /////////////////////////	

	SelectPointVenteByPersonnelFromServer :function(callbackViewModel,PersonnelID)
	{
		var form = this;
		try
		{		
	     var Conf = JSON.parse(localStorage.getItem("Configuration"));
		 
		 
         var Data = "PersonnelID="+PersonnelID; 
		 var methode = "GetListPointVenteDTOByPersonnelID?";
		 var URL = Conf.URL+methode+Data;
		 
	 DMS.Mobile.Common.CallService(function(JsonObject,Form){form.createPointVenteDTO(JsonObject,Form,callbackViewModel);},URL,form);
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectPointVenteByPersonneFromServer in PointVenteRequest",'alert','e'); 
			
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "SelectPointVenteByPersonneFromServer";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListPointVente);
						});
		}		
	},
	
	
	createPointVenteDTO : function (json,form,callbackViewModel)
	{
		try
		{
			var len = json.length;
		if ( len>0)
		{
			var synch = "true";
            
			
		    for (var i=0;i<json.length;i++)
			{
			var pointVenteDTO = new DMS.Mobile.PointVente();
			
			pointVenteDTO.PointVenteID = json[i].PointVenteID;
			pointVenteDTO.ClientID = json[i].ClientID;
			pointVenteDTO.Latitude = json[i].Latitude;
			pointVenteDTO.Longitude = json[i].Longitude;
			pointVenteDTO.EtatPointVente = json[i].EtatPointVente;
			pointVenteDTO.VilleID = json[i].VilleID;
			pointVenteDTO.Responsable = json[i].Responsable;
			
			pointVenteDTO.Adresse = json[i].Adresse;
			pointVenteDTO.Tel = json[i].Tel;
			pointVenteDTO.Fax = json[i].Fax;
			pointVenteDTO.Email = json[i].Email;
			pointVenteDTO.Client = json[i].Client;
			pointVenteDTO.ListEspacesPromos = json[i].EspacesPromos;
			pointVenteDTO.ListLineaires = json[i].Lineaires
			
			pointVenteDTO.ListMissions = json[i].Missions;
			pointVenteDTO.ListReclamations = json[i].Reclamations;
			pointVenteDTO.ListRelevePresencePrixConcurrents = json[i].RelevePresencePrixConcurrents;
			pointVenteDTO.ListRelevePrix = json[i].RelevePrix;
			pointVenteDTO.ListReleveStock = json[i].ReleveStock;
			pointVenteDTO.ListCommandes = json[i].Commandes;
			
			
			form.InsertPointVente(pointVenteDTO,synch,form,len,callbackViewModel);
			}
		}
		else{callbackViewModel(form.ListPointVente);}	
				}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : CreatePointVenteDTO in PointVenteRequest",'alert','e'); 
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "CreatePointVenteDTO";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListPointVente);
						});
		}
	},
////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////Insertion LOCAL ////////////////////////////

InsertPointVente : function(pointVente,synch,form,len,callbackViewModel)
{
	try
	{
	form.InsertPointVenteIntoLOCAL(pointVente,synch,form,len,callbackViewModel);
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertPointVente in PointVenteRequest",'alert','e'); 
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "InsertPointVente";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListPointVente);
						});
		}
},

insertPointVente : function(pointVente)
{
	var form = this;	
	try
	{
	
		this.InsertVilleIntoLOCAL(pointVente,"false",form,null,null);
				}
			catch(err)
		{
			
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "insertPointVente";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							DMS.Mobile.Notification.ShowMessage(err.message+" : insertPointVente in PointVenteRequest",'alert','e'); 
						});
		}
},

InsertPointVenteIntoLOCAL : function(pointVenteObject,synch,formReq,len,callbackViewModel)
{
	try
	{
		  	if (synch == "false")
			{
		  	    formReq.connexion.transaction(function(tx){ formReq.InsertIntoPointVente(tx, formReq, pointVenteObject,synch) }, function(err){ 
				
				       var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "InsertIntoPointVente";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							DMS.Mobile.Common.errors(err,"InsertIntoPointVente");
						});
				
				}); 
		    }
			else
			{
				formReq.connexion.transaction(function(tx){ formReq.InsertIntoPointVente(tx, formReq,pointVenteObject,synch); }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoPointVente");
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "InsertIntoPointVente";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(formReq.ListPointVente);
						});		},function(){
							
						formReq.insertPointVenteIntoArray(pointVenteObject,formReq,len,callbackViewModel);
						
						
							});
							//formReq.insertPointVenteIntoArray(pointVenteObject,formReq,len,callbackViewModel)	;	
			}	
			
					}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertPointVenteIntoLOCAL in PointVenteRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "InsertPointVenteIntoLOCAL";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(formReq.ListPointVente);
						});	
		}
},

InsertIntoPointVente : function(requete,formReq,PointVenteObject,synch)
{
	try
	{
	requete.executeSql('INSERT INTO PointVentes (PointVenteID,Latitude,Longitude,EtatPointVente,Responsable,Adresse,Tel,Fax,Email,Synch,VilleID,ClientID)VALUES('+PointVenteObject.PointVenteID+',"'+PointVenteObject.Latitude+'","'+PointVenteObject.Longitude+'",'+PointVenteObject.EtatPointVente+',"'+PointVenteObject.Responsable+'","'+PointVenteObject.Adresse+'",'+PointVenteObject.Tel+','+PointVenteObject.Fax+',"'+PointVenteObject.Email+'","'+synch+'",'+PointVenteObject.VilleID+','+PointVenteObject.ClientID+')');
	
			}
			catch(err)
		{
			
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "InsertIntoPointVente";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoPointVente in PointVenteRequest",'alert','e'); 
						});	
		}
},

//////////////////////////////////////////////////////////////////////////////////////////
	
///////////////////////////Select From LOCAL /////////////////////////////

SelectAllPointVenteByClient : function(callback,oClient)
{
	var form = this;
	try
	{
		
	  
	  this.connexion.transaction(function(tx){ form.SelectFromPointVenteByClientID(tx, form,callback,oClient) ;}, function(err){ DMS.Mobile.Common.errors(err,"SelectFromPointVenteByClientID");
	  
	             var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "SelectFromPointVenteByClientID";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(oClient);
						});	
	  
	  });
	 		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllPointVenteByClient in PointVenteRequest",'alert','e'); 
			
			  var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "SelectAllPointVenteByClient";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(oClient);
						});
		}
},

SelectFromPointVenteByClientID : function(requete,form,callback,oClient)
{
	try
	{
	   			requete.executeSql("SELECT * FROM PointVentes WHERE ClientID = ?", [oClient.ClientID], function(tx, results) {form.querySuccessPointVenteByClient(tx,results,form,callback,oClient);});
       		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromPointVenteByClientID in PointVenteRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "SelectFromPointVenteByClientID";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(oClient);
						});
		}
},

querySuccessPointVenteByClient : function(requete,results,form,callback,oClient)
{
	try
	{
		var len = results.rows.length;
		
		if (len>0){
			for (var i=0; i<len; i++){
				
				var oPointVente = new DMS.Mobile.PointVente();
			
			    oPointVente.PointVenteID = results.rows.item(i).PointVenteID;
				oPointVente.Latitude = results.rows.item(i).Latitude;
				oPointVente.Longitude = results.rows.item(i).Longitude;
				oPointVente.EtatPointVente = results.rows.item(i).EtatPointVente;
				oPointVente.Adresse = results.rows.item(i).Adresse;
				oPointVente.Responsable = results.rows.item(i).Responsable;						
				oPointVente.ClientID = results.rows.item(i).ClientID;
				oPointVente.Email = results.rows.item(i).Email;
				oPointVente.Fax = results.rows.item(i).Fax;
				oPointVente.Tel = results.rows.item(i).Tel;
				oPointVente.VilleID = results.rows.item(i).VilleID;
			
				form.InsertPointVenteIntoPointVenteList(oClient,oPointVente,form,len,callback);
			}
		}
		else
		{callback(oClient);}
	}
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessPointVenteByClient in PointVenteRequest",'alert','e');
		
		var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "querySuccessPointVenteByClient";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(oClient);
						});
	}
},

InsertPointVenteIntoPointVenteList:function(oClient,oPointVente,form,len,callback)
{
		try
		{
			   oClient.listPointVentes.push(oPointVente);
				
				
				if( oClient.listPointVentes.length == len)
				{
					callback(oClient);
				}
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertPointVenteIntoPointVenteList in PointVenteRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "InsertPointVenteIntoPointVenteList";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(oClient);
						});
		}
},






	SelectAllPointVente: function (callback) {
	var form = this;
	try
	{
					
			       	this.connexion.transaction(function(tx){ form.SelectFromPointVente(tx, form,callback) }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromPointVente");
					
					var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "SelectFromPointVente";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.ListPointVente);
						});
					
					});
   		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllPointVente in PointVenteRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "SelectAllPointVente";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.ListPointVente);
						});
		}
    },
	
	SelectFromPointVente : function (requete,form,callback)
	{
		try
		{
		requete.executeSql("SELECT * FROM PointVentes", [], function(tx, results) {form.querySuccess(tx,results,form,callback);});
		
				}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromPointVente in PointVenteRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "SelectFromPointVente";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.ListPointVente);
						});
		}
	},
	
	
	  querySuccess:function (requete, results,form,callback) {
			try
			{		
					
							var len = results.rows.length;
						form.ListPointVente = [];
						DMS.Mobile.Common.Alert(" length mission DB : " +len);
						
							for (var i=0; i<len; i++)
							{
								var pointVenteDTO = new DMS.Mobile.PointVente();
								
								pointVenteDTO.PointVenteID = results.rows.item(i).PointVenteID;
								pointVenteDTO.Latitude = results.rows.item(i).Latitude;
								pointVenteDTO.Longitude = results.rows.item(i).Longitude;
								pointVenteDTO.EtatPointVente = results.rows.item(i).EtatPointVente;
								pointVenteDTO.Adresse = results.rows.item(i).Adresse;
								pointVenteDTO.Responsable = results.rows.item(i).Responsable;						
								pointVenteDTO.ClientID = results.rows.item(i).ClientID;
								pointVenteDTO.Email = results.rows.item(i).Email;
								pointVenteDTO.Fax = results.rows.item(i).Fax;
								pointVenteDTO.Tel = results.rows.item(i).Tel;
								pointVenteDTO.VilleID = results.rows.item(i).VilleID;
								form.ListPointVente.push(pointVenteDTO);
							}
		callback(form.ListPointVente);
		
				}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccess in PointVenteRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "querySuccess";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.ListPointVente);
						});
		}
							
	  },
	  
	  /////// select point vente by id /////////////
	  SelectPointVenteByID : function(callback,reclamation)
	  {
		  DMS.Mobile.Common.Alert2("SelectPointVenteByID");
		  	try
	{
		var form = this;
		this.connexion.transaction(function(tx){ form.SelectPointVenteRec(tx, form,callback,reclamation); }, function(err){ DMS.Mobile.Common.errors(err,"SelectPointVenteRec");
		
		          var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "SelectPointVenteRec";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(reclamation);
						});
		
		});
	}
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : SelectPointVenteByID in PointVenteRequest",'alert','e'); 
		
		  var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "SelectPointVenteByID";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(reclamation);
						});
	}
	 },
	SelectPointVenteRec : function(requete, form,callback,reclamation)
	{
			try
	{
	   			requete.executeSql("SELECT *  FROM PointVentes WHERE PointVenteID = ?", [reclamation.PointVenteID], function(tx, results) {form.querySuccessPointVenteID(tx,results,form,callback,reclamation);});
    }
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : SelectPointVenteRec in PointVenteRequest",'alert','e'); 
		
		var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "SelectPointVenteRec";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(reclamation);
						});
	}
	},
	
	
	querySuccessPointVenteID : function(tx,results,form,callback,reclamation)
	{
		try
		{
		if((results != null) && (results != ""))// && (results.rows.length>0) &&(results.rows.item.length>0))
		{
			var oPointVente = new DMS.Mobile.PointVente();
			oPointVente.PointVenteID = results.rows.item(0).PointVenteID;
			oPointVente.ClientID = results.rows.item(0).ClientID;
			oPointVente.Latitude = results.rows.item(0).Latitude;
			oPointVente.Longitude = results.rows.item(0).Longitude;
			oPointVente.EtatPointVente = results.rows.item(0).EtatPointVente;
			oPointVente.VilleID = results.rows.item(0).VilleID;
			oPointVente.Responsable = results.rows.item(0).Responsable;
			oPointVente.Adresse = results.rows.item(0).Adresse;
			oPointVente.Tel = results.rows.item(0).Tel;
			oPointVente.Fax = results.rows.item(0).Fax;
			oPointVente.Email = results.rows.item(0).Email;
			
			
			
			
			DMS.Mobile.ClientRequest.connexion = form.connexion;
			DMS.Mobile.ClientRequest.SelectClient(function(pointventeclient){
				
			reclamation.PointVentes = pointventeclient;
			DMS.Mobile.Common.Alert2("callback point vente");
			callback(reclamation);
			
			},oPointVente);
						
			
		}
		else
		{
			DMS.Mobile.Common.Alert2("callback point vente nuuuuuuuuul");
			callback(reclamation);
		}
		}
		catch(err)
		{
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "querySuccessPointVenteID";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(reclamation);
						});
		}
	},
	
	//////////////////////////// select pv by tournee ID non synchronizer //////////////////
	
	SelectAllPointVenteByTourneeID : function(Tournee,callback)
	{
			//alert"SelectAllPointVenteByTourneeID");
			var form = this;
	try
	{
		
		this.connexion.transaction(function(tx){ form.SelectAllPointVente(tx, form,callback,Tournee); }, function(err){ DMS.Mobile.Common.errors(err,"SelectAllPointVente");
		
		                var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "SelectAllPointVente";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(Tournee);
						});
		
		});
	}
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllPointVenteByTourneeID in PointVenteRequest",'alert','e'); 
		
		   var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "SelectAllPointVenteByTourneeID";
						exception.Exception = err.messasge;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(Tournee);
						});
	}
	},
	
	SelectAllPointVente : function(requete, form,callback,Tournee)
	{
		//alert"SelectAllPointVente");
	try
	{
	   			requete.executeSql("SELECT *  FROM PointVentes INNER JOIN "+
                         "TourneePointVente ON PointVentes.PointVenteID = TourneePointVente.PointVenteID AND TourneePointVente.TourneeID = ?", [Tournee.TourneeID], function(tx, results) {form.querySuccessAllPointVente(tx,results,form,callback,Tournee);});
    }
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllPointVente in PointVenteRequest",'alert','e'); 
		
		                var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "SelectAllPointVente";
						exception.Exception = err.messasge;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(Tournee);
						});
	}
	},
	
	querySuccessAllPointVente : function(requete,results,form,callback,Tournee)
	{
		try
		{
		var len = results.rows.length;
		if (len>0){
			for (var i=0; i<len; i++){
				
			var oPointVente = new DMS.Mobile.PointVente();
			oPointVente.PointVenteID = results.rows.item(i).PointVenteID;
			oPointVente.ClientID = results.rows.item(i).ClientID;
			oPointVente.Latitude = results.rows.item(i).Latitude;
			oPointVente.Longitude = results.rows.item(i).Longitude;
			oPointVente.EtatPointVente = results.rows.item(i).EtatPointVente;
			oPointVente.VilleID = results.rows.item(i).VilleID;
			oPointVente.Responsable = results.rows.item(i).Responsable;
			oPointVente.Adresse = results.rows.item(i).Adresse;
			oPointVente.Tel = results.rows.item(i).Tel;
			oPointVente.Fax = results.rows.item(i).Fax;
			oPointVente.Email = results.rows.item(i).Email;
			
			DMS.Mobile.MissionRequest.connexion = form.connexion;
			//seulement les missions non synchroniser
			DMS.Mobile.MissionRequest.SelectAllMissionByPointVente(function(pointVenteMission){
				
			   form.insertPointVenteIntoPointVenteList(Tournee,pointVenteMission,len,callback);
			
			},oPointVente);
			
			}
		}
			else
			{
				callback(Tournee);
			}
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessAllPointVente in PointVenteRequest",'alert','e'); 
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "querySuccessAllPointVente";
						exception.Exception = err.messasge;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(Tournee);
						});
		}		
	},
	
	//////////////////////////////////////////////////////////////////////////
	
	SelectByID : function(callback,livraison)
	{
		 var form = this;
		try
	 {
	 
	  this.connexion.transaction(function(tx){ form.SelectFromPointVenteByID(tx, form,callback,livraison); }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromPointVenteByID");
	  
	  
	  var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "SelectFromPointVenteByID";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(livraison);
						});
	  
	  });
	  		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectByID in PointVenteRequest",'alert','e'); 
		
		                var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "SelectByID";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(livraison);
						});
		}
	},
	
	SelectFromPointVenteByID : function(requete,form,callback,livraison) {
   try
   {
	  
    	requete.executeSql("SELECT *  FROM PointVentes WHERE PointVenteID = ?", [livraison.PointVenteID], function(tx, results) {form.querySuccessByID(tx,results,form,callback,livraison);});
       		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromPointVenteByID in PointVenteRequest",'alert','e'); 
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "SelectFromPointVenteByID";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(livraison);
						});
		}
    },
	
	querySuccessByID:function (requete, results,form,callback,livraison) {
	try
	{	
		var len = results.rows.length;
		//oTournee.ListPointVentes
		if (len>0){
			//for (var i=0; i<len; i++){
				
			var oPointVente = new DMS.Mobile.PointVente();
			oPointVente.ListMissions = [];
			oPointVente.PointVenteID = results.rows.item(0).PointVenteID;
			oPointVente.ClientID = results.rows.item(0).ClientID;
			oPointVente.Latitude = results.rows.item(0).Latitude;
			oPointVente.Longitude = results.rows.item(0).Longitude;
			oPointVente.EtatPointVente = results.rows.item(0).EtatPointVente;
			oPointVente.VilleID = results.rows.item(0).VilleID;
			oPointVente.Responsable = results.rows.item(0).Responsable;
			oPointVente.Adresse = results.rows.item(0).Adresse;
			oPointVente.Tel = results.rows.item(0).Tel;
			oPointVente.Fax = results.rows.item(0).Fax;
			oPointVente.Email = results.rows.item(0).Email;
			
						
			DMS.Mobile.ClientRequest.connexion = form.connexion;
			DMS.Mobile.VilleRequest.connexion = form.connexion;
			
			
			DMS.Mobile.VilleRequest.SelectVille(function(pointventeville){
		
				DMS.Mobile.ClientRequest.SelectClient(function(pointventeclient){
				
					
					form.insertPointVenteIntolivraison(livraison,pointventeclient,callback);
				
				
				},pointventeville);
			},oPointVente);
			}else
			{
				callback(livraison);
			}
        		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessByID in PointVenteRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "querySuccessByID";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(livraison);
						});
		}						
	},
	
	insertPointVenteIntolivraison : function(livraison,pointVente,callback)
	{
		try
		{
		livraison.PointVentes = pointVente;
		    callback(livraison);
		}
		catch(err)
		{
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "insertPointVenteIntolivraison";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = this.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(livraison);
						});
		}
	},
	
	/////////////////////////////////////// select all point vente by all commande(pointVenteID a partir d'objet commande//////////
	
	SelectPointVenteByCommandeID: function (callback,oCommande) {

var form = this;	 
	 try
	 {
	  
	  this.connexion.transaction(function(tx){ form.SelectFromPointVenteByCommandeID(tx, form,callback,oCommande); }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromPointVenteByCommandeID");
	  
	  
	  var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "SelectFromPointVenteByCommandeID";
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
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectPointVenteByCommandeID in PointVenteRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "SelectPointVenteByCommandeID";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(oCommande);
						});
	  
		}
    },
	 SelectFromPointVenteByCommandeID : function(requete,form,callback,oCommande) {
   try
   {
	  
    	requete.executeSql("SELECT *  FROM PointVentes WHERE PointVenteID = ?", [oCommande.PointVenteID], function(tx, results) {form.querySuccessByCommande(tx,results,form,callback,oCommande);});
       		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromPointVenteByCommandeID in PointVenteRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "SelectFromPointVenteByCommandeID";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(oCommande);
						});
		}
    },
	
	  querySuccessByCommande:function (requete, results,form,callback,oCommande) {
	try
	{	
		var len = results.rows.length;
		//oTournee.ListPointVentes
		if (len>0){
			//for (var i=0; i<len; i++){
				
			var oPointVente = new DMS.Mobile.PointVente();
			oPointVente.ListMissions = [];
			oPointVente.PointVenteID = results.rows.item(0).PointVenteID;
			oPointVente.ClientID = results.rows.item(0).ClientID;
			oPointVente.Latitude = results.rows.item(0).Latitude;
			oPointVente.Longitude = results.rows.item(0).Longitude;
			oPointVente.EtatPointVente = results.rows.item(0).EtatPointVente;
			oPointVente.VilleID = results.rows.item(0).VilleID;
			oPointVente.Responsable = results.rows.item(0).Responsable;
			oPointVente.Adresse = results.rows.item(0).Adresse;
			oPointVente.Tel = results.rows.item(0).Tel;
			oPointVente.Fax = results.rows.item(0).Fax;
			oPointVente.Email = results.rows.item(0).Email;
			
						
			DMS.Mobile.ClientRequest.connexion = form.connexion;
			DMS.Mobile.VilleRequest.connexion = form.connexion;
			DMS.Mobile.MissionRequest.connexion = form.connexion;
			
	DMS.Mobile.VilleRequest.SelectVille(function(pointventeville){
		
		DMS.Mobile.ClientRequest.SelectClient(function(pointventeclient){
			DMS.Mobile.MissionRequest.SelectMission(function(pointVenteMission){
				
			form.insertPointVenteIntoCommande(oCommande,pointVenteMission,callback);
			
			},pointventeclient);
		   },pointventeville);
		},oPointVente);
    //   }
			}else
			{
				callback(oCommande);
			}
        		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessByCommande in PointVenteRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "querySuccessByCommande";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(oCommande);
						});
		}						
	},
	insertPointVenteIntoCommande : function(oCommande,pointVente,callback)
	{
		try
		{
		oCommande.PointVentes = pointVente;
		    callback(oCommande);
		}
catch(err)
{
	var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "insertPointVenteIntoCommande";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = this.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(oCommande);
						});
}

	},
	
	////////////////////////////////////////////////////////////////////////////////////////
	
	
	//////////////////////////////////////// select all pointvente by all TourneeID //////////////
	
	SelectPointVente: function (callback,oTournee) {
	   var form = this;
	 try
	 {
		 
	// SelectAllPointVenteIDByTournee(oTournee.TourneeID,function
	
	  this.connexion.transaction(function(tx){ form.SelectFromPointVenteByTourneeID(tx, form,callback,oTournee); }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromPointVenteByTourneeID");
	  
	  var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "SelectFromPointVenteByTourneeID";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(oTournee);
						});
	  
	  });
	  		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectPointVente in PointVenteRequest",'alert','e'); 
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "SelectPointVente";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(oTournee);
						});
		}
    },
    
     SelectFromPointVenteByTourneeID : function(requete,form,callback,oTournee) {
   try
   {
	  
    	requete.executeSql("SELECT *  FROM PointVentes INNER JOIN "+
                         "TourneePointVente ON PointVentes.PointVenteID = TourneePointVente.PointVenteID WHERE TourneePointVente.TourneeID = ?", [oTournee.TourneeID], function(tx, results) {form.querySuccessByTournee(tx,results,form,callback,oTournee);});
       		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromPointVenteByTourneeID in PointVenteRequest",'alert','e'); 
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "SelectFromPointVenteByTourneeID";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(oTournee);
						});
		}
    },
    
    
    
    
    
    querySuccessByTournee:function (requete, results,form,callback,oTournee) {
	try
	{	
		var len = results.rows.length;
		//oTournee.ListPointVentes
		if (len>0){
			for (var i=0; i<len; i++){
				
			var oPointVente = new DMS.Mobile.PointVente();
			oPointVente.ListMissions = [];
			oPointVente.PointVenteID = results.rows.item(i).PointVenteID;
			oPointVente.ClientID = results.rows.item(i).ClientID;
			oPointVente.Latitude = results.rows.item(i).Latitude;
			oPointVente.Longitude = results.rows.item(i).Longitude;
			oPointVente.EtatPointVente = results.rows.item(i).EtatPointVente;
			oPointVente.VilleID = results.rows.item(i).VilleID;
			oPointVente.Responsable = results.rows.item(i).Responsable;
			oPointVente.Adresse = results.rows.item(i).Adresse;
			oPointVente.Tel = results.rows.item(i).Tel;
			oPointVente.Fax = results.rows.item(i).Fax;
			oPointVente.Email = results.rows.item(i).Email;
			
					
			DMS.Mobile.PictureRequest.connexion = form.connexion;			
			DMS.Mobile.ClientRequest.connexion = form.connexion;
			DMS.Mobile.VilleRequest.connexion = form.connexion;
			DMS.Mobile.MissionRequest.connexion = form.connexion;
			
	DMS.Mobile.VilleRequest.SelectVille(function(pointventeville){
		
		DMS.Mobile.ClientRequest.SelectClient(function(pointventeclient){
			DMS.Mobile.MissionRequest.SelectMission(function(pointVenteMission){
				DMS.Mobile.PictureRequest.SelectPictureByPV(function(pointVentePicture){
				//alert("return");
			form.insertPointVenteIntoPointVenteList(oTournee,pointVenteMission,len,callback);
			
			},pointVenteMission);
			},pointventeclient);
		   },pointventeville);
		},oPointVente);
       }
			}else
			{
				callback(oTournee);
			}
        		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessByTournee in PointVenteRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "querySuccessByTournee";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(oTournee);
						});
		}						
	},
	
	insertPointVenteIntoPointVenteList : function (oTournee,pointVente,len,callback){
	try
	{	
	
		oTournee.ListPointVentes.push(pointVente);
		if(len == oTournee.ListPointVentes.length)
		{
			
		    callback(oTournee);
		}
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertPointVenteIntoMission in PointVenteRequest",'alert','e'); 
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "insertPointVenteIntoMission";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = this.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(oTournee);
						});
		}	
	},
	
////////////////////////////////////////////////////////////////////////////////////////	
	 //////////////////////////////////////// Delete All Point de vente ////////////////////////
DeleteAllPointVente : function(callback)
{
	var form = this;
	try
	{
				
			this.connexion.transaction(function(tx){ form.DeletePointVentes(tx, form,callback);}, function(err){ DMS.Mobile.Common.errors(err,"DeletePointVentes");
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "DeletePointVentes";
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
			DMS.Mobile.Notification.ShowMessage(err.message+" : DeleteAllPointVente in PointVenteRequest",'alert','e'); 
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "DeleteAllPointVente";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
	 }	
}, 

DeletePointVentes : function(requete, form,callback)
{
	requete.executeSql("DELETE  FROM PointVentes ", [],
              function(tx, result) {				
				form.querySuccessDELETEAll(form,callback);
				}, 
                function(err){DMS.Mobile.Common.errors(err,"DeletePointVentes");
				
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PointVenteRequest";
						exception.FonctionE = "DeletePointVentes";
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