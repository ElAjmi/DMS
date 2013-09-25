if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.MissionRequest = {};

DMS.Mobile.MissionRequest = 
{
	
	connexion: null,
	ListMission : [],

    insertMissionIntoArray : function(Mission,form,len,callbackViewModel)
    {
		try
		{
		form.ListMission.push(Mission);
		if (form.ListMission.length == len)
		{
			callbackViewModel(form.ListMission);
		}
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertMissionIntoArray in MissionRequest",'alert','e'); 
		}
	},

	InsertMissionIntoMissionList : function(oTournee,mission,form,len,callback)	
	{
		try
		{
				oTournee.listMission.push(mission);
				if(oTournee.listMission.length == len)
				{
					callback(oTournee);
				}
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertMissionIntoMissionList in MissionRequest",'alert','e'); 
		}
	},
	
	//////////////////////////////////////////////////serveur ////////////////////////////////////////
	SelectMissionByPersonnelFromServer : function(callbackViewModel,PersonnelID)
	{
		try
		{
			var Conf = JSON.parse(sessionStorage.getItem("Configuration"));
			
			var form = this;
			
			var Data = "PersonnelID="+PersonnelID; 
		  
			var methode= "GetListMissionDTOByPersonnelID?";
	
			var URL = Conf.URL+methode+Data;
	
			 DMS.Mobile.Common.CallService(function(JsonObject,Form){form.createMissionDTO(JsonObject,Form,callbackViewModel);},URL,form);
			 
			
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectMissionByPersonnelFromServer in MissionRequest",'alert','e'); 
		}
	},
	
	createMissionDTO : function(json,form,callbackViewModel)
	{
		try
		{
		if ( json != null)
		{
			var synch = "true";
			var len = json.length;
			for (var i=0;i<json.length;i++)
			{
				var missionDTO = new DMS.Mobile.Mission();
			
				missionDTO.MissionID = json[i].MissionID ;
				missionDTO.EtatMission = json[i].EtatMission;
				
				var dCreation = DMS.Mobile.Common.ParseDateJson(json[i].DateCreation);			
				missionDTO.DateCreation = dCreation;
				var hCreation = DMS.Mobile.Common.ParseHeureJson(json[i].DateCreation);	
				missionDTO.HeureCreation = hCreation;
				
				missionDTO.DegreUrgence = json[i].DegreUrgence; 
				
				var dCloture = DMS.Mobile.Common.ParseDateJson(json[i].DateCloture);	
				missionDTO.DateCloture = dCloture; 
				var hCloture = DMS.Mobile.Common.ParseHeureJson(json[i].DateCloture);	
				missionDTO.HeureCloture = hCloture;
				
				missionDTO.Commentaires = json[i].Commentaires;
				missionDTO.TypeMissionID = json[i].TypeMissionID;
				missionDTO.BCKPersonnelID = json[i].BCKPersonnelID;
				missionDTO.PointVenteID = json[i].PointVenteID;
				missionDTO.TourneeID = json[i].TourneeID;
				missionDTO.PointVentes = json[i].PointVentes;
	            missionDTO.Tournees = json[i].Tournees;
	            missionDTO.TypeMissions = json[i].TypeMissions;	
			
				form.insertMission(missionDTO,synch,form,len,callbackViewModel);
			}
			
		}
		else{callbackViewModel(form.ListMission);}	
	
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : createMissionDTO in MissionRequest",'alert','e'); 
		}
	},
	
/////////////////////////Insertion LOCAL ///////////////////////////////


   insertMission : function (mission,synch,form,len,callbackViewModel)
		{
			try
			{
			form.InsertMissionIntoLOCAL(mission,synch,form,len,callbackViewModel);
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertMission in MissionRequest",'alert','e'); 
		}
		},
		
   InsertMission: function(Mission){
			try
			{
					var form = this;	
			       	this.InsertMissionIntoLOCAL(Mission,"false",form,null,null);
  		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertMission in MissionRequest",'alert','e'); 
		}
    },	
	
	
	 InsertMissionIntoLOCAL: function(MissionObject,synch,formReq,len,callbackViewModel) 
	 {
		try
		{
			if (synch == "false")
			{
				formReq.connexion.transaction(function(tx){ formReq.InsertIntoMission(tx, formReq,MissionObject,synch); }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoMission");}); 
		    }
			else
			{
				formReq.connexion.transaction(function(tx){ formReq.InsertIntoMission(tx, formReq,MissionObject,synch); }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoMission");},function(){
							
						formReq.insertMissionIntoArray(MissionObject,formReq,len,callbackViewModel)	;		
							}); 
							//formReq.insertMissionIntoArray(MissionObject,formReq,len,callbackViewModel)	;
			}
		 		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertMissionIntoLOCAL in MissionRequest",'alert','e'); 
		}
	},

	InsertIntoMission : function(requete,form,MissionObject,synch) {
   try
   {
			requete.executeSql('INSERT INTO Missions(MissionID,EtatMission,DateCreation,DegreUrgence,DateCloture,HeureCreation,HeureCloture,Commentaires,TypeMissionID,Synch,BCKPersonnelID,PointVenteID,TourneeID) VALUES( '+MissionObject.MissionID+','+MissionObject.EtatMission+',"'+MissionObject.DateCreation+'",'+MissionObject.DegreUrgence+',"'+MissionObject.DateCloture+'","'+MissionObject.HeureCreation+'","'+MissionObject.HeureCloture+'","'+MissionObject.Commentaires+'",'+MissionObject.TypeMissionID+',"'+synch+'",'+MissionObject.BCKPersonnelID+','+MissionObject.PointVenteID+','+MissionObject.TourneeID+')');
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoMission in MissionRequest",'alert','e'); 
		}		    																																
    },
	///////////////////////////////////////////////////////////////////////////////////////////////////
 
 
/////////////////////////////////////////// Select From LOCAL /////////////////////////		
	SelectMission: function (callback,oTournee) {
	try
	{
	  var form = this;
	  this.connexion.transaction(function(tx){ form.SelectFromMissionByTourneeID(tx, form,callback,oTournee) }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromMissionByTourneeID");});
	 		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectMission in MissionRequest",'alert','e'); 
		}
	 
    },
    
     SelectFromMissionByTourneeID : function(requete,form,callback,oTournee) {
  try
  { 
   			requete.executeSql("SELECT * FROM Missions WHERE TourneeID = ?", [oTournee.TourneeID], function(tx, results) {form.querySuccess(tx,results,form,callback,oTournee);});
       		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromMissionByTourneeID in MissionRequest",'alert','e'); 
		}
    },
    
    
   
    
    querySuccess:function (requete, results,form,callback,oTournee) {
	try
	{
		var len = results.rows.length;
		if (len>0){
			for (var i=0; i<len; i++){
				
				var oMission = new DMS.Mobile.Mission();
				oMission.MissionID = results.rows.item(i).MissionID ;
				oMission.EtatMission = results.rows.item(i).EtatMission;
				oMission.DateCreation = results.rows.item(i).DateCreation;
				oMission.DegreUrgence = results.rows.item(i).DegreUrgence; 
				oMission.DateCloture = results.rows.item(i).DateCloture; 
				oMission.Commentaires = results.rows.item(i).Commentaires;
				oMission.TypeMissionID = results.rows.item(i).TypeMissionID;
				oMission.Synch = results.rows.item(i).Synch;
				oMission.BCKPersonnelID = results.rows.item(i).BCKPersonnelID;
				oMission.PointVenteID = results.rows.item(i).PointVenteID;
				oMission.TourneeID = results.rows.item(i).TourneeID;
				
				DMS.Mobile.TypeMissionRequest.connexion = form.connexion;
				DMS.Mobile.PointVenteRequest.connexion = form.connexion;
				
		DMS.Mobile.TypeMissionRequest.SelectTypeMission(function(mission){
			
				DMS.Mobile.PointVenteRequest.SelectPointVente(function(miss){form.InsertMissionIntoMissionList(oTournee,mission,form,len,callback)},mission);
			
			},oMission);
	
			
		}
	}
	else{callback(oTournee);}
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccess in MissionRequest",'alert','e'); 
		}
        						
	},
////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////// Update In Local //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		UpdateMission: function (Etat,MissionID) {
		try
		{	 
			var form = this;	
			this.connexion.transaction(function(tx){ form.UpdateEtatMission(tx, form,Etat,MissionID) }, function(err){ DMS.Mobile.Common.errors(err,"UpdateMission");});
				}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateMission in MissionRequest",'alert','e'); 
		}
		},
		
		
		UpdateEtatMission : function(requete,form,Etat,MissionID) {
		try
		{
				requete.executeSql(' UPDATE Missions SET EtatMission= ? WHERE MissionID = ?', [Etat,MissionID], function(tx, results) {form.querySuccessUpdate(tx,results,form,Etat,MissionID);});
		 		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateEtatMission in MissionRequest",'alert','e'); 
		}  
		},
		
		querySuccessUpdate :function (requete, results,form,Etat,MissionID) {
			//alert("update succes !")
		
		},

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}