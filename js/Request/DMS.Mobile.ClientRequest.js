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
		pointVente.Client = client;
		callbackPointVente(pointVente);
	},

insertActiviteIntoClient: function(mission,callback)	
	{ 
		callback(mission);  
	},

insertClientIntoArray : function(client,form,len,callbackViewModel)
{
	form.ClientList.push(client);
	if (form.ClientList.length == len)
	{
		alert("appel activite");
		callbackViewModel(form.ClientList);
	}
},
	
	
	
	//////////////////////////////////////////////// Serveur/////////////////////////////
	
	SelectClientByPersonnelFromServer : function(callbackViewModel,PersonnelID)
	{
		    var Conf = JSON.parse(sessionStorage.getItem("Configuration"));
		    var ServeurURL	= Conf.URL;
			var form = this;
            var Data = "PersonnelID="+PersonnelID;  
		    var methode= "GetListClientDTOByPersonnelID?";		
		    var URL = ServeurUrl+methode+Data;

		    DMS.Mobile.Common.CallService(function(JsonObject,Form){form.createClientDTO(JsonObject,Form,callbackViewModel)},URL,form);
	},
	
	
	createClientDTO : function(json,form,callbackViewModel)
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
	},
	
	
	
	//////////////////////////////////////////////////////////////////////////////////////
	
/////////////////////////////////////////Insertion LOCAL //////////////
InsertClient : function(client,synch,form,len,callbackViewModel)
{
	form.InsertClientIntoLOCAL(client,synch,form,len,callbackViewModel);
},
insertClient : function(client)
{
	var form = this;	
	this.InsertClientIntoLOCAL(client,"false",form,null,null);
},

InsertClientIntoLOCAL : function (clientObject,synch,formReq,len,callbackViewModel)
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
},

InsertIntoClient : function(requete,formReq,ClientObject,synch)
{
	requete.executeSql('INSERT INTO Client(ClientID,NomResponsable,NomSociete,RaisonSocial,Tel,Fax,UrlWeb,Email,ImageIDClient,EtatClient,Synch,ActiviteID) VALUES('+ClientObject.ClientID+',"'+ClientObject.NomResponsable+'","'+ClientObject.NomSociete+'","'+ClientObject.RaisonSocial+'",'+ClientObject.Tel+','+ClientObject.Fax+',"'+ClientObject.UrlWeb+'","'+ClientObject.Email+'",'+ClientObject.ImageIDClient+','+ClientObject.EtatClient+',"'+synch+'",'+ClientObject.ActiviteID+')');
},
//////////////////////////////////////////////////////////////////////////////
	
///////////////////////////////////////////////Select From LOCAL ////////////////////

SelectAllClient: function (callback) {
				var form = this;	
			       	this.connexion.transaction(function(tx){ form.SelectFromClient(tx, form,callback) }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromClient");});
    },
    
    SelectFromClient : function(requete,form,callback) {
       	
       				
					requete.executeSql('SELECT * FROM Client', [], function(tx, results) {form.querySuccess(tx,results,form,callback);});
    
        
        
    },
	
	querySuccess : function (requete, results,form,callback) 
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
                           
    },
	
	  SelectClient: function (callback,oPointVente) {
	  		var form = this;	
		this.connexion.transaction(function(tx){ form.SelectFromClientByPoinVenteID(tx, form,callback,oPointVente); }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromClientByPoinVenteID");});
	},
    
     SelectFromClientByPoinVenteID : function(requete,form,callback,oPointVente) {
		 
		requete.executeSql('SELECT * FROM Client WHERE ClientID = ?', [oPointVente.ClientID], function(tx, results) {form.querySuccessByPointVente(tx,results,form,callback,oPointVente);});
    
    },
    
    
    
    
    
   querySuccessByPointVente : function (requete, results,form,callback,oPointVente) {
	  
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
                    
    },
	
	insertClientIntoPointVente : function (oPointVente,client,callback)
	{
		oPointVente.Client = client;
		
		callback(oPointVente);
	}
	
	/////////////////////////////////////////////////////////////////////////////
}