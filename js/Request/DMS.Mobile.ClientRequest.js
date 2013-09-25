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
			pointVente.Client = client;
			callbackPointVente(pointVente);
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertClientIntoPointVente in ClientRequest",'alert','e'); 
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
		} 
	},

insertClientIntoArray : function(client,form,len,callbackViewModel)
{
	try
	{
		form.ClientList.push(client);
		if (form.ClientList.length == len)
		{
			alert("appel activite");
			callbackViewModel(form.ClientList);
		}
	}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertClientIntoArray in ClientRequest",'alert','e'); 
		} 
},
	
	
	
	//////////////////////////////////////////////// Serveur/////////////////////////////
	
	SelectClientByPersonnelFromServer : function(callbackViewModel,PersonnelID)
	{
		try
		{
		    var Conf = JSON.parse(sessionStorage.getItem("Configuration"));
		    
			var form = this;
            var Data = "PersonnelID="+PersonnelID;  
		    var methode= "GetListClientDTOByPersonnelID?";		
		    var URL = Conf.URL+methode+Data;

		    DMS.Mobile.Common.CallService(function(JsonObject,Form){form.createClientDTO(JsonObject,Form,callbackViewModel)},URL,form);
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectClientByPersonnelFromServer in ClientRequest",'alert','e'); 
		}
	},
	
	
	createClientDTO : function(json,form,callbackViewModel)
	{
		try
		{
			if ( json != null)
		{
			var synch = "true";
            var len = json.length;
			
		    for (var i=0;i<json.length;i++)
			{
				
			var clientDTO = new DMS.Mobile.Client();
			
				clientDTO.ClientID = json[i].ClientID ;
				clientDTO.NomResponsable =  json[i].NomResponsable;
				clientDTO.NomSociete =  json[i].NomSociete;
				clientDTO.RaisonSocial =  json[i].RaisonSociale; 
				clientDTO.Tel =  json[i].Tel; 
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
		}
},
insertClient : function(client)
{
	try
	{
	var form = this;	
	this.InsertClientIntoLOCAL(client,"false",form,null,null);
	}
			catch(err)
	{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertClient in ClientRequest",'alert','e'); 
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
				formReq.connexion.transaction(function(tx){ formReq.InsertIntoClient(tx, formReq,clientObject,synch); }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoClient");},function(){
							
						formReq.insertClientIntoArray(clientObject,formReq,len,callbackViewModel);		
							}); 
							//formReq.insertClientIntoArray(clientObject,formReq,len,callbackViewModel);
			}
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertClientIntoLOCAL in ClientRequest",'alert','e'); 
		}
},

InsertIntoClient : function(requete,formReq,ClientObject,synch)
{
 try
 {
	requete.executeSql('INSERT INTO Client(ClientID,NomResponsable,NomSociete,RaisonSocial,Tel,Fax,UrlWeb,Email,ImageIDClient,EtatClient,Synch,ActiviteID) VALUES('+ClientObject.ClientID+',"'+ClientObject.NomResponsable+'","'+ClientObject.NomSociete+'","'+ClientObject.RaisonSocial+'",'+ClientObject.Tel+','+ClientObject.Fax+',"'+ClientObject.UrlWeb+'","'+ClientObject.Email+'",'+ClientObject.ImageIDClient+','+ClientObject.EtatClient+',"'+synch+'",'+ClientObject.ActiviteID+')');
	}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoClient in ClientRequest",'alert','e'); 
		}
},
//////////////////////////////////////////////////////////////////////////////
	
///////////////////////////////////////////////Select From LOCAL ////////////////////

SelectAllClient: function (callback) {
	try
	{			var form = this;	
			       	this.connexion.transaction(function(tx){ form.SelectFromClient(tx, form,callback) }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromClient");});
   	}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllClient in ClientRequest",'alert','e'); 
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
		}
        
        
    },
	
	querySuccess : function (requete, results,form,callback) 
{
	try
	{
				var len = results.rows.length;
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
					oClient.ImageIDClient = results.rows.item(i).ImageIDClient;
					oClient.EtatClient = results.rows.item(i).EtatClient;
					
					
					form.ClientList.push(oClient);
											
				}							
callback(form.ClientList);
	}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccess in ClientRequest",'alert','e'); 
		}
                           
    },
	
	  SelectClient: function (callback,oPointVente) {
		try
		{
	  		var form = this;	
		this.connexion.transaction(function(tx){ form.SelectFromClientByPoinVenteID(tx, form,callback,oPointVente); }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromClientByPoinVenteID");});
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectClient in ClientRequest",'alert','e'); 
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
			oClient.Email = results.rows.item(0).Email;
			oClient.ImageIDClient = results.rows.item(0).ImageIDClient;
			oClient.EtatClient = results.rows.item(0).EtatClient;
			oClient.ActiviteID = results.rows.item(0).ActiviteID;
						
			DMS.Mobile.ActiviteRequest.connexion = form.connexion;
DMS.Mobile.ActiviteRequest.SelectActivite(function(client){form.insertClientIntoPointVente(oPointVente,client,callback);},oClient);
			
			}else{callback(oPointVente);}
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessByPointeVente in ClientRequest",'alert','e'); 
		}
                    
    },
	

	
	/////////////////////////////////////////////////////////////////////////////
}