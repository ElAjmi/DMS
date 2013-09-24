  if (typeof (DMS) == 'undefined') DMS = {};
	if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};
	
	
	
	DMS.Mobile.TourneeRequest = {};
	
	DMS.Mobile.TourneeRequest = 
	{
	
		
		TourneeList :[],
		connexion: null,

	
		
									
		insertTourneeIntoArray : function(tournee,form,len,callbackViewModel)	
		{
			form.TourneeList.push(tournee);
			if(form.TourneeList.length == len)
			{
				callbackViewModel(form.TourneeList);
							
			}
		},
		
		
	///////////////////////////////////////////////////Serveur ////////////////////////////////////////
	
	SelectTourneeByPersonnalFromServer : function(callbackViewModel,PersonnelID)
	{
		var Conf = JSON.parse(sessionStorage.getItem("Configuration"));
		var ServeurURL	= Conf.URL;
		var form = this;
		var Data = "PersonnelID="+PersonnelID; 	  
		var methode= "GetListTourneeDTOByPersonnelID?";
		var URL = ServeurUrl+methode+Data;
	    DMS.Mobile.Common.CallService(function(JsonObject,Form){form.createTourneeDTO(JsonObject,Form,callbackViewModel);},URL,form);
	},
	
	createTourneeDTO : function(json,form,callbackViewModel)
	{
		if ( json != null)
		{
			var synch = "true";
			var len =json.length;
			for (var i=0;i<json.length;i++)
			{
				var tourneeDTO = new DMS.Mobile.Tournee();
				
				tourneeDTO.TourneeID = json[i].TourneeID;
			
				var dDebut = DMS.Mobile.Common.ParseDateJson(json[i].DateDebut);
				tourneeDTO.DateDebut = dDebut;
				var hDebut = DMS.Mobile.Common.ParseHeureJson(json[i].DateDebut);	
				tourneeDTO.HeureDebut = hDebut;
	
                var dFin = DMS.Mobile.Common.ParseDateJson(json[i].DateFin);
				tourneeDTO.DateFin =  dFin;
				var hFin = DMS.Mobile.Common.ParseHeureJson(json[i].DateFin);	
				tourneeDTO.HeureFin = hFin;
				
				var dCreation = DMS.Mobile.Common.ParseDateJson(json[i].DateCreation);
				tourneeDTO.DateCreation = dCreation;
				var hCreation = DMS.Mobile.Common.ParseHeureJson(json[i].DateCreation);	
				tourneeDTO.HeureCreation = hCreation;
				
				tourneeDTO.EtatTournee = json[i].EtatTournee;
				tourneeDTO.TerminalID = json[i].TerminalID;
				tourneeDTO.ImprimanteID = json[i].ImprimanteID;
				tourneeDTO.EquipementID = json[i].EquipementID;
				
				tourneeDTO.VehiculeID = json[i].VehiculeID
				tourneeDTO.PersonnelID = json[i].PersonneID;
				tourneeDTO.listMission = json[i].Missions;
				tourneeDTO.listPositions = json[i].Positions;
				
			form.InsertTournee(tourneeDTO,synch,form,len,callbackViewModel);							

			}
			
		}
		else{callbackViewModel(form.TourneeList);}	
	},
	
///////////////////////////////////Insert In Local ///////////////////////////////	
	
InsertTournee: function (tournee,synch,form,len,callbackViewModel)
		{
			form.InsertTourneeIntoLOCAL(tournee,synch,form,len,callbackViewModel);
	
		},
		
insertTournee: function(Tournee){
					var form = this;	
			       	this.InsertTourneeIntoLOCAL(Tournee,"false",form,null,null);
    },	
	
	
    InsertTourneeIntoLOCAL : function(TourneeObject,synch,formReq,len,callbackViewModel) 
	{
			if (synch == "false")
			{
				 formReq.connexion.transaction(function(tx){ formReq.InsertIntoTournee(tx, formReq,TourneeObject,synch) ;}, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoTournee");});
		    }
			else
			{
				 formReq.connexion.transaction(function(tx){ formReq.InsertIntoTournee(tx, formReq,TourneeObject,synch) ;}, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoTournee");},function(){formReq.insertTourneeIntoArray(TourneeObject,formReq,len,callbackViewModel);});
			}
								
    },

 
   
   InsertIntoTournee : function(requete,form,TourneeObject,synch) {
   
			requete.executeSql('INSERT INTO Tournees (TourneeID,DateDebut,DateFin,DateCreation,HeureDebut,HeureFin,HeureCreation,EtatTournee,Synch,TerminalID,ImprimanteID,EquipementID,VehiculeID,PersonnelID) VALUES('+TourneeObject.TourneeID+',"'+TourneeObject.DateDebut+'","'+TourneeObject.DateFin+'","'+TourneeObject.DateCreation+'","'+TourneeObject.HeureDebut+'","'+TourneeObject.HeureFin+'","'+TourneeObject.HeureCreation+'",'+TourneeObject.EtatTournee+',"'+synch+'",'+TourneeObject.TerminalID+','+TourneeObject.ImprimanteID+','+TourneeObject.EquipementID+','+TourneeObject.VehiculeID+','+TourneeObject.PersonnelID+')');
			      																																
},
	
	///////////////////////////////////////////////////////////////////////////////////////////////////
		
//////////////////////////////////////////////////////////Slection from Local /////////////////

SelectAll: function (callback) {
			 
			var form = this;	
			this.connexion.transaction(function(tx){ form.SelectFromTournee(tx, form,callback) }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromTournee");});
		},
		
		
		SelectFromTournee : function(requete,form,callback) {
				requete.executeSql('SELECT * FROM Tournees', [], function(tx, results) {form.querySuccess(tx,results,form,callback);});
		   
		},
		
		
		querySuccess:function (requete, results,form,callback) {
			
			var len = results.rows.length;
			
			for (var i=0;i<len;i++){
				var oTournee = new DMS.Mobile.Tournee();
				oTournee.listMission = [];	
				oTournee.TourneeID = results.rows.item(i).TourneeID;
				oTournee.DateDebut = results.rows.item(i).DateDebut;
				oTournee.DateFin = results.rows.item(i).DateFin;
				oTournee.DateCreation = results.rows.item(i).DateCreation;
				oTournee.EtatTournee = results.rows.item(i).EtatTournee;
				oTournee.Synch = results.rows.item(i).Synch;
				oTournee.TerminalID = results.rows.item(i).TerminalID;
				oTournee.ImpimanteID = results.rows.item(i).ImpimanteID;
				oTournee.EquipementID = results.rows.item(i).EquipementID;
				oTournee.VehiculeID = results.rows.item(i).VehiculeID;
				oTournee.PersonnelID = results.rows.item(i).PersonnelID;
				
				
		DMS.Mobile.MissionRequest.connexion = form.connexion;
		DMS.Mobile.MissionRequest.SelectMission(function(tournee){form.insertTourneeIntoTourneeList(tournee,form,len,callback);},oTournee);							
				
				}
		},
		
		insertTourneeIntoTourneeList : function(tournee,form,len,callback)	
		{
			
			form.TourneeList.push(tournee);
			if(form.TourneeList.length == len)
			{
				callback(form.TourneeList);
							
			}
		},
///////////////////////////////////////////////////////////////////////////////////////		
	///////////////////////////////////////////////////////////////////////////////////////////////////
		
//////////////////////////////////////////////////////////Update In Local /////////////////

		UpdateTournee: function (Etat,TourneeID) {
			 
			var form = this;	
			this.connexion.transaction(function(tx){ form.UpdateEtatTournee(tx, form,Etat,TourneeID) }, function(err){ DMS.Mobile.Common.errors(err,"UpdateTournee");});
		},
		
		
		UpdateEtatTournee : function(requete,form,Etat,TourneeID) {
				requete.executeSql(' UPDATE Tournees SET EtatTournee= ? WHERE TourneeID = ?', [Etat,TourneeID], function(tx, results) {form.querySuccessUpdate(tx,results,form,Etat,TourneeID);});
		   
		},
		
		querySuccessUpdate :function (requete, results,form,Etat,TourneeID) {
			//alert("update succes !")
		
		},
		
		
///////////////////////////////////////////////////////////////////////////////////////		

	}