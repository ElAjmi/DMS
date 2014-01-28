if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.ClientRequest = {};

DMS.Mobile.ClientRequest = 
{

	Client : null,
	ClientList :[],
	connexion: null,

insertClientIntoPointVente : function(pointVente,client,callbackPointVente)
	{
		try
		{
			DMS.Mobile.Common.Alert2("callback client");
			pointVente.Client = client;
			callbackPointVente(pointVente);
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertClientIntoPointVente in ClientRequest",'alert','e'); 
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ClientRequest";
						exception.FonctionE = "insertClientIntoPointVente";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = this.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callbackPointVente(pointVente);
						});
		} 
	},

insertActiviteIntoClient: function(mission,callback)	
	{ 
	
	try
	{
		callback(mission);  
	}
	catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertActiviteIntoClient in ClientRequest",'alert','e'); 
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ClientRequest";
						exception.FonctionE = "insertActiviteIntoClient";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = this.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callback(mission);
						});
			
		} 
	},

insertClientIntoArray : function(client,form,len,callbackViewModel)
{
	try
	{
		form.ClientList.push(client);
		if (form.ClientList.length == len)
		{
			//alert("appel activite");
			callbackViewModel(form.ClientList);
		}
	}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertClientIntoArray in ClientRequest",'alert','e');
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ClientRequest";
						exception.FonctionE = "insertClientIntoArray";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callbackViewModel(form.ClientList);
						}); 
		} 
},
	
	
	
	//////////////////////////////////////////////// Serveur/////////////////////////////
	
	SelectClientByPersonnelFromServer : function(callbackViewModel,PersonnelID)
	{
		var form = this;
		try
		{
		    var Conf = JSON.parse(localStorage.getItem("Configuration"));
		    
			
            var Data = "PersonnelID="+PersonnelID;  
		    var methode= "GetListClientDTOByPersonnelID?";		
		    var URL = Conf.URL+methode+Data;

		    DMS.Mobile.Common.CallService(function(JsonObject,Form){form.createClientDTO(JsonObject,Form,callbackViewModel)},URL,form);
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectClientByPersonnelFromServer in ClientRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ClientRequest";
						exception.FonctionE = "SelectClientByPersonnelFromServer";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callbackViewModel(form.ClientList);
						}); 
		}
	},
	
	
	createClientDTO : function(json,form,callbackViewModel)
	{
		try
		{
			form.ClientList = [];
			 var len = json.length;
		 if ( len>0)
		 {
			var synch = "true";
          
		    for (var i=0;i<json.length;i++)
			{
				
			var clientDTO = new DMS.Mobile.Client();
			
				clientDTO.ClientID = json[i].ClientID ;
				clientDTO.NomResponsable =  json[i].NomResponsable;
				clientDTO.NomSociete =  json[i].NomSociete;
				clientDTO.RaisonSocial =  json[i].RaisonSociale; 
				clientDTO.Tel =  json[i].Tel; 
				clientDTO.CodeClient =  json[i].CodeClient; 
				clientDTO.Fax =  json[i].Fax;
				clientDTO.UrlWeb =  json[i].UrlWeb;
				clientDTO.Email =  json[i].Email;
				clientDTO.ActiviteID =  json[i].ActiviteID;
				clientDTO.ImageIDClient =  json[i].ImageIDClient;
				clientDTO.EtatClient =  json[i].EtatClient;
	            clientDTO.listObjectifs =  json[i].Objectifs;
	            clientDTO.listPointVentes =  json[i].PointVentes;	
				
				clientDTO.listPromotions =  json[i].Promotions;
	            clientDTO.listActivites =  json[i].Activites;
			
				form.InsertClient(clientDTO,synch,form,len,callbackViewModel);
			}

		}
		else{callbackViewModel(form.ClientList);}	
	
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : createClientDTO in ClientRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ClientRequest";
						exception.FonctionE = "createClientDTO";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callbackViewModel(form.ClientList);
						});
		}
	},
	
	
	
	//////////////////////////////////////////////////////////////////////////////////////
	
/////////////////////////////////////////Insertion LOCAL //////////////
InsertClient : function(client,synch,form,len,callbackViewModel)
{
	try
	{
	form.InsertClientIntoLOCAL(client,synch,form,len,callbackViewModel);
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertClient in ClientRequest",'alert','e');
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ClientRequest";
						exception.FonctionE = "InsertClient";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callbackViewModel(form.ClientList);
						}); 
		}
},
insertClient : function(client)
{
	var form = this;
	try
	{
		
	this.InsertClientIntoLOCAL(client,"false",form,null,null);
	}
			catch(err)
	{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertClient in ClientRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ClientRequest";
						exception.FonctionE = "insertClient";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   
						});
	}
},

InsertClientIntoLOCAL : function (clientObject,synch,formReq,len,callbackViewModel)
{
	try
	{
		  	if (synch == "false")
			{
		  	    formReq.connexion.transaction(function(tx){ formReq.InsertIntoClient(tx, formReq, clientObject,synch) }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoClient");}); 
		    }
			else
			{
				formReq.connexion.transaction(function(tx){ formReq.InsertIntoClient(tx, formReq,clientObject,synch); }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoClient");
				
				       var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ClientRequest";
						exception.FonctionE = "InsertIntoClient";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callbackViewModel(form.ClientList);
						}); 
				
				},function(){
							
						formReq.insertClientIntoArray(clientObject,formReq,len,callbackViewModel);		
							}); 
							//formReq.insertClientIntoArray(clientObject,formReq,len,callbackViewModel);
			}
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertClientIntoLOCAL in ClientRequest",'alert','e');
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ClientRequest";
						exception.FonctionE = "InsertClientIntoLOCAL";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callbackViewModel(form.ClientList);
						}); 
		}
},

InsertIntoClient : function(requete,formReq,ClientObject,synch)
{
 try
 {
	requete.executeSql('INSERT INTO Client(ClientID,NomResponsable,NomSociete,RaisonSocial,Tel,Fax,UrlWeb,Email,ImageIDClient,EtatClient,Synch,ActiviteID,CodeClient) VALUES('+ClientObject.ClientID+',"'+ClientObject.NomResponsable+'","'+ClientObject.NomSociete+'","'+ClientObject.RaisonSocial+'",'+ClientObject.Tel+','+ClientObject.Fax+',"'+ClientObject.UrlWeb+'","'+ClientObject.Email+'",'+ClientObject.ImageIDClient+','+ClientObject.EtatClient+',"'+synch+'",'+ClientObject.ActiviteID+','+ClientObject.CodeClient+')');
	}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoClient in ClientRequest",'alert','e');
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ClientRequest";
						exception.FonctionE = "InsertIntoClient";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callbackViewModel(form.ClientList);
						}); 
		}
},
//////////////////////////////////////////////////////////////////////////////
	
///////////////////////////////////////////////Select From LOCAL ////////////////////

SelectAllClient: function (callback) {
	var form = this;
	try
	{				
			       	this.connexion.transaction(function(tx){ form.SelectFromClient(tx, form,callback); }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromClient");
					
					    var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ClientRequest";
						exception.FonctionE = "SelectFromClient";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callback(form.ClientList);
						}); 
					
					});
   	}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllClient in ClientRequest",'alert','e');
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ClientRequest";
						exception.FonctionE = "SelectAllClient";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callback(form.ClientList);
						});  
		}
					
 },
    
    SelectFromClient : function(requete,form,callback) {
       	
     try
	 {  				
					requete.executeSql('SELECT * FROM Client', [], function(tx, results) {form.querySuccess(tx,results,form,callback);});
    	}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromClient in ClientRequest",'alert','e'); 
			
			  var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ClientRequest";
						exception.FonctionE = "SelectFromClient";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callback(form.ClientList);
						}); 
		}
        
        
    },
	
	querySuccess : function (requete, results,form,callback) 
{
	try
	{
				var len = results.rows.length;
				if (len > 0){
				var id;
				var myproducts = new Array();
				for (var i=0; i<len; i++)
				{
				    
		   
					var oClient = new DMS.Mobile.Client();
					oClient.ClientID = results.rows.item(i).ClientID;
					oClient.NomResponsable = results.rows.item(i).NomResponsable;
					oClient.NomSociete = results.rows.item(i).NomSociete;
					oClient.RaisonSociale = results.rows.item(i).RaisonSociale;
					oClient.Tel = results.rows.item(i).Tel;
					oClient.Fax = results.rows.item(i).Fax;
					oClient.UrlWeb = results.rows.item(i).UrlWeb;
					oClient.Email = results.rows.item(i).Email;
					oClient.CodeClient = results.rows.item(i).CodeClient;
					oClient.ImageIDClient = results.rows.item(i).ImageIDClient;
					oClient.EtatClient = results.rows.item(i).EtatClient;
					oClient.listPointVentes = [];
					
				DMS.Mobile.PointVenteRequest.connexion = form.connexion;
		DMS.Mobile.PointVenteRequest.SelectAllPointVenteByClient(function(client){form.insertClientIntoClientList(client,form,len,callback);},oClient);
											
				}							
				}else{
					callback(form.ClientList);
				}
	}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccess in ClientRequest",'alert','e'); 
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ClientRequest";
						exception.FonctionE = "querySuccess";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callback(form.ClientList);
						}); 
		}
                           
    },
	
	insertClientIntoClientList:function(client,form,len,callback)
	{
		try
			{			
			form.ClientList.push(client);
			//alert("form.ClientList = " + form.ClientList );
			//alert("nbr Client = " + form.ClientList.length );
			if(form.ClientList.length == len)
			{
				callback(form.ClientList);
							
			}
			
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : insertClientIntoClientList in ClientRequest",'alert','e'); 
				 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ClientRequest";
						exception.FonctionE = "insertClientIntoClientList";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callback(form.ClientList);
						}); 
				
			}
	},
	
	/////////////////////////////////////////////////////////////////////////////////////////////
	
	  SelectClient: function (callback,oPointVente) {
		var form = this;
		try
		{
		DMS.Mobile.Common.Alert2("SelectClient");	
	  			
		this.connexion.transaction(function(tx){ form.SelectFromClientByPoinVenteID(tx, form,callback,oPointVente); }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromClientByPoinVenteID");
		
		         var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ClientRequest";
						exception.FonctionE = "SelectFromClientByPoinVenteID";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callback(oPointVente);
						});

		   });
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectClient in ClientRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ClientRequest";
						exception.FonctionE = "SelectClient";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callback(oPointVente);
						});
		}
	},
    
	
     SelectFromClientByPoinVenteID : function(requete,form,callback,oPointVente) {
	try
	{
		requete.executeSql('SELECT * FROM Client WHERE ClientID = ?', [oPointVente.ClientID], function(tx, results) {form.querySuccessByPointVente(tx,results,form,callback,oPointVente);});
    	}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromClientByPointVenteID in ClientRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ClientRequest";
						exception.FonctionE = "SelectFromClientByPoinVenteID";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callback(oPointVente);
						});
			
		}
	
    },
    
    
    
    
    
   querySuccessByPointVente : function (requete, results,form,callback,oPointVente) {
	  try
	  {
		var len = results.rows.length;
			if(len>0){	
			var oClient = new DMS.Mobile.Client();
			oClient.ClientID = results.rows.item(0).ClientID;
			oClient.NomResponsable = results.rows.item(0).NomResponsable;
			oClient.NomSociete = results.rows.item(0).NomSociete;
			oClient.RaisonSocial = results.rows.item(0).RaisonSocial;
			oClient.Tel = results.rows.item(0).Tel;
			oClient.Fax = results.rows.item(0).Fax;
			oClient.UrlWeb = results.rows.item(0).UrlWeb;
			oClient.CodeClient = results.rows.item(0).CodeClient;
			oClient.Email = results.rows.item(0).Email;
			oClient.ImageIDClient = results.rows.item(0).ImageIDClient;
			oClient.EtatClient = results.rows.item(0).EtatClient;
			oClient.ActiviteID = results.rows.item(0).ActiviteID;
						
			DMS.Mobile.ActiviteRequest.connexion = form.connexion;
			DMS.Mobile.PictureRequest.connexion = form.connexion;
			
DMS.Mobile.ActiviteRequest.SelectActivite(function(client){
	DMS.Mobile.PictureRequest.SelectPictureByClient(function(ClientPicture){
	
	form.insertClientIntoPointVente(oPointVente,ClientPicture,callback);
	
	},client);
},oClient);
			
			}else{callback(oPointVente);}
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessByPointeVente in ClientRequest",'alert','e'); 
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ClientRequest";
						exception.FonctionE = "querySuccessByPointVente";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callback(oPointVente);
						});
			
		}
                    
    },
	
	
	/////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////
		 //////////////////////////////////////// Delete All Client ////////////////////////
DeleteAllClient : function(callback)
{
	var form = this;
	try
	{
				
			this.connexion.transaction(function(tx){ form.DeleteClients(tx, form,callback);}, function(err){ DMS.Mobile.Common.errors(err,"DeleteAllClient");
			
			     var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ClientRequest";
						exception.FonctionE = "DeleteClients";
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
			DMS.Mobile.Notification.ShowMessage(err.message+" : DeleteAllClient in ClientRequest",'alert','e'); 
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ClientRequest";
						exception.FonctionE = "DeleteAllClient";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callback();
						});
	 }	
}, 

DeleteClients : function(requete, form,callback)
{
	requete.executeSql("DELETE  FROM Client ", [],
              function(tx, result) {				
				form.querySuccessDELETEAll(form,callback);
				}, 
                function(err){DMS.Mobile.Common.errors(err,"DeleteClients");
				
				      var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ClientRequest";
						exception.FonctionE = "DeleteClients";
						exception.Exception = err.message;
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