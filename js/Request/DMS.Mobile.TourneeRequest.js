  if (typeof (DMS) == 'undefined') DMS = {};
	if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};
	
	
	
	DMS.Mobile.TourneeRequest = {};
	
	DMS.Mobile.TourneeRequest = 
	{
	
		
		TourneeList :[],
		connexion: null,

	
		
									
		insertTourneeIntoArray : function(tournee,form,len,callbackViewModel)	
		{
			try
			{
					form.TourneeList.push(tournee);
					if(form.TourneeList.length == len)
					{
						callbackViewModel(form.TourneeList);
									
					}
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : insertTourneeIntoArray in TourneeRequest",'alert','e'); 
			}
		},
		
		
	///////////////////////////////////////////////////Serveur ////////////////////////////////////////
	
	SelectTourneeByPersonnalFromServer : function(callbackViewModel,PersonnelID)
	{
		try
		{
		var Conf = JSON.parse(sessionStorage.getItem("Configuration"));
		
		var form = this;
		var Data = "PersonnelID="+PersonnelID; 	  
		var methode= "GetListTourneeDTOByPersonnelID?";
		var URL = Conf.URL+methode+Data;
	    DMS.Mobile.Common.CallService(function(JsonObject,Form){form.createTourneeDTO(JsonObject,Form,callbackViewModel);},URL,form);
		
		}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectTourneeByPersonnelFromServer in TourneeRequest",'alert','e'); 
			}
	},
	
	createTourneeDTO : function(json,form,callbackViewModel)
	{
		try
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
		
		}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : ceateTourneeDTO in TourneeRequest",'alert','e'); 
			}
	},
	
///////////////////////////////////Insert In Local ///////////////////////////////	
	
InsertTournee: function (tournee,synch,form,len,callbackViewModel)
		{
			try
			{
			form.InsertTourneeIntoLOCAL(tournee,synch,form,len,callbackViewModel);
	}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : InsertTournee in TourneeRequest",'alert','e'); 
			}
		},
		
insertTournee: function(Tournee){
			
			try
			{
						var form = this;	
			       	this.InsertTourneeIntoLOCAL(Tournee,"false",form,null,null);
					}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : insertTournee in TourneeRequest",'alert','e'); 
			}
    },	
	
	
    InsertTourneeIntoLOCAL : function(TourneeObject,synch,formReq,len,callbackViewModel) 
	{
		try
		{
			if (synch == "false")
			{
				 formReq.connexion.transaction(function(tx){ formReq.InsertIntoTournee(tx, formReq,TourneeObject,synch) ;}, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoTournee");});
		    }
			else
			{
				 formReq.connexion.transaction(function(tx){ formReq.InsertIntoTournee(tx, formReq,TourneeObject,synch) ;}, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoTournee");},function(){formReq.insertTourneeIntoArray(TourneeObject,formReq,len,callbackViewModel);});
			}
		}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : InsertTourneeIntoLOCAL in TourneeRequest",'alert','e'); 
			}						
    },

 
   
   InsertIntoTournee : function(requete,form,TourneeObject,synch) {
   try
   {
			requete.executeSql('INSERT INTO Tournees (TourneeID,DateDebut,DateFin,DateCreation,HeureDebut,HeureFin,HeureCreation,EtatTournee,Synch,TerminalID,ImprimanteID,EquipementID,VehiculeID,PersonnelID) VALUES('+TourneeObject.TourneeID+',"'+TourneeObject.DateDebut+'","'+TourneeObject.DateFin+'","'+TourneeObject.DateCreation+'","'+TourneeObject.HeureDebut+'","'+TourneeObject.HeureFin+'","'+TourneeObject.HeureCreation+'",'+TourneeObject.EtatTournee+',"'+synch+'",'+TourneeObject.TerminalID+','+TourneeObject.ImprimanteID+','+TourneeObject.EquipementID+','+TourneeObject.VehiculeID+','+TourneeObject.PersonnelID+')');
		}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoTournee in TourneeRequest",'alert','e'); 
			}	      																																
},
	
	///////////////////////////////////////////////////////////////////////////////////////////////////
		
//////////////////////////////////////////////////////////Slection from Local /////////////////

SelectAll: function (callback) {
		try
		{	 
			var form = this;	
			this.connexion.transaction(function(tx){ form.SelectFromTournee(tx, form,callback) }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromTournee");});
			
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAll in TourneeRequest",'alert','e'); 
			}
		},
		
		
		SelectFromTournee : function(requete,form,callback) {
			try
			{
				requete.executeSql('SELECT * FROM Tournees', [], function(tx, results) {form.querySuccess(tx,results,form,callback);});
		   }
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromTournee in TourneeRequest",'alert','e'); 
			}
		},
		
		
		querySuccess:function (requete, results,form,callback) {
			try
			{
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
				
				}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccess in TourneeRequest",'alert','e'); 
			}
		},
		
		insertTourneeIntoTourneeList : function(tournee,form,len,callback)	
		{
			try
			{
			
			form.TourneeList.push(tournee);
			if(form.TourneeList.length == len)
			{
				callback(form.TourneeList);
							
			}
			
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : insertTourneeIntoTourneeList in TourneeRequest",'alert','e'); 
			}
		},
///////////////////////////////////////////////////////////////////////////////////////		
	///////////////////////////////////////////////////////////////////////////////////////////////////
		
//////////////////////////////////////////////////////////Update In Local /////////////////

		UpdateTournee: function (Etat,TourneeID) {
			try
			{ 
			var form = this;	
			this.connexion.transaction(function(tx){ form.UpdateEtatTournee(tx, form,Etat,TourneeID) }, function(err){ DMS.Mobile.Common.errors(err,"UpdateTournee");});
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateTournee in TourneeRequest",'alert','e'); 
			}
		},
		
		
		UpdateEtatTournee : function(requete,form,Etat,TourneeID) {
			try
			{
				requete.executeSql(' UPDATE Tournees SET EtatTournee= ? WHERE TourneeID = ?', [Etat,TourneeID], function(tx, results) {form.querySuccessUpdate(tx,results,form,Etat,TourneeID);});
		   }
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateEtatTournee in TourneeRequest",'alert','e'); 
			}
		},
		
		querySuccessUpdate :function (requete, results,form,Etat,TourneeID) {
			//alert("update succes !")
		
		},
		
		
///////////////////////////////////////////////////////////////////////////////////////		

	}