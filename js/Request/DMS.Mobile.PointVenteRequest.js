  if (typeof (DMS) == 'undefined') DMS = {};
	if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};
	
	
	
	DMS.Mobile.PointVenteRequest = {};
	
	DMS.Mobile.PointVenteRequest = 
	{
			connexion: null,
			ListPointVente : [],
			

	
	insertPointVenteIntoArray : function(pointVente,form,len,callbackViewModel)
	{
		form.ListPointVente.push(pointVente);
		if (form.ListPointVente.length == len)
		{
			alert("appel client");
			callbackViewModel(form.ListPointVente);
		}
	},
	
	
//////////////////////////////////////////////////////// Serveur /////////////////////////	

	SelectPointVenteByPersonnelFromServer :function(callbackViewModel,PersonnelID)
	{		
	     var Conf = JSON.parse(sessionStorage.getItem("Configuration"));
		 var ServeurURL	= Conf.URL;
		 var form = this;
         var Data = "PersonnelID="+PersonnelID; 
		 var methode = "GetListPointVenteDTOByPersonnelID?";
		 var URL = ServeurUrl+methode+Data;
		 
	 DMS.Mobile.Common.CallService(function(JsonObject,Form){form.createPointVenteDTO(JsonObject,Form,callbackViewModel);},URL,form);
			
	},
	
	
	createPointVenteDTO : function (json,form,callbackViewModel)
	{
		if ( json != null)
		{
			var synch = "true";
            var len = json.length;
			
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
	},
////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////Insertion LOCAL ////////////////////////////

InsertPointVente : function(pointVente,synch,form,len,callbackViewModel)
{
	form.InsertPointVenteIntoLOCAL(pointVente,synch,form,len,callbackViewModel);
},

insertPointVente : function(pointVente)
{
	var form = this;	
		this.InsertVilleIntoLOCAL(pointVente,"false",form,null,null);
},

InsertPointVenteIntoLOCAL : function(pointVenteObject,synch,formReq,len,callbackViewModel)
{
		  	if (synch == "false")
			{
		  	    formReq.connexion.transaction(function(tx){ formReq.InsertIntoPointVente(tx, formReq, pointVenteObject,synch) }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoPointVente");}); 
		    }
			else
			{
				formReq.connexion.transaction(function(tx){ formReq.InsertIntoPointVente(tx, formReq,pointVenteObject,synch); }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoPointVente");},function(){
							
						formReq.insertPointVenteIntoArray(pointVenteObject,formReq,len,callbackViewModel)	;		
							});
							//formReq.insertPointVenteIntoArray(pointVenteObject,formReq,len,callbackViewModel)	;	
			}	
},

InsertIntoPointVente : function(requete,formReq,PointVenteObject,synch)
{
	requete.executeSql('INSERT INTO PointVentes (PointVenteID,Latitude,Longitude,EtatPointVente,Responsable,Adresse,Tel,Fax,Email,Synch,VilleID,ClientID)VALUES('+PointVenteObject.PointVenteID+',"'+PointVenteObject.Latitude+'","'+PointVenteObject.Longitude+'",'+PointVenteObject.EtatPointVente+',"'+PointVenteObject.Responsable+'","'+PointVenteObject.Adresse+'",'+PointVenteObject.Tel+','+PointVenteObject.Fax+',"'+PointVenteObject.Email+'","'+synch+'",'+PointVenteObject.VilleID+','+PointVenteObject.ClientID+')');
},

//////////////////////////////////////////////////////////////////////////////////////////
	
///////////////////////////Select From LOCAL /////////////////////////////

	SelectAllPointVente: function (callback) {
				var form = this;	
			       	this.connexion.transaction(function(tx){ form.SelectFromPointVente(tx, form,callback) }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromPointVente");});
    },
	
	SelectFromPointVente : function (requete,form,callback)
	{
		requete.executeSql("SELECT * FROM PointVentes", [], function(tx, results) {form.querySuccess(tx,results,form,callback);});
	},
	
	
	  querySuccess:function (requete, results,form,callback) {
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
							
	  },
	
	SelectPointVente: function (callback,oMission) {
	 
	  var form = this;
	  this.connexion.transaction(function(tx){ form.SelectFromPointVenteByMissionID(tx, form,callback,oMission); }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromPointVenteByMissionID");});
    },
    
     SelectFromPointVenteByMissionID : function(requete,form,callback,oMission) {
   
   			requete.executeSql("SELECT * FROM PointVentes WHERE PointVenteID = ?", [oMission.PointVenteID], function(tx, results) {form.querySuccessByMission(tx,results,form,callback,oMission);});
       
    },
    
    
    
    
    
    querySuccessByMission:function (requete, results,form,callback,oMission) {
		
		var len = results.rows.length;
			if(len>0){
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
			DMS.Mobile.VilleRequest.connexion = form.connexion;
			
	DMS.Mobile.VilleRequest.SelectVille(function(pointventeville){
		DMS.Mobile.ClientRequest.SelectClient(function(pointventeclient){form.insertPointVenteIntoMission(oMission,pointventeclient,callback);},pointventeville);
		},oPointVente);

			}else
			{
				callback(oMission);
			}
        						
	},
	
	insertPointVenteIntoMission : function (oMission,pointventeclient,callback){
		
		oMission.PointVentes = pointventeclient;
		callback(oMission);
	}
	
////////////////////////////////////////////////////////////////////////////////////////	
	}