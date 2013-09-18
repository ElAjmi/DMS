if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.MissionRequest = {};

DMS.Mobile.MissionRequest = 
{
	
	connexion: null,
	ListMission : [],

    insertMissionIntoArray : function(Mission,form,len,callbackViewModel)
    {
		form.ListMission.push(Mission);
		if (form.ListMission.length == len)
		{
			callbackViewModel(form.ListMission);
		}
	},

	InsertMissionIntoArray : function(oTournee,mission,form,len,callback)	
	{
		oTournee.listMission.push(mission);
		if(oTournee.listMission.length == len)
		{
			callback(oTournee);
		}
	},
	
	//////////////////////////////////////////////////serveur ////////////////////////////////////////
	SelectMissionByPersonnelFromServer : function(callbackViewModel,PersonnelID)
	{
		var form = this;
		
        var Data = "PersonnelID="+PersonnelID; 
	  
		var methode= "GetListMissionDTOByPersonnelID?";

		var URL = DMS.Mobile.Common.ServeurUrl+methode+Data;

		 DMS.Mobile.Common.CallService(function(JsonObject,Form){form.createMissionDTO(JsonObject,Form,callbackViewModel);},URL,form);
	},
	
	createMissionDTO : function(json,form,callbackViewModel)
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
				missionDTO.DateCreation = json[i].DateCreation;
				missionDTO.DegreUrgence = json[i].DegreUrgence; 
				missionDTO.DateCloture = json[i].DateCloture; 
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
	},
	
/////////////////////////Insertion LOCAL ///////////////////////////////


   insertMission : function (mission,synch,form,len,callbackViewModel)
		{
			form.InsertMissionIntoLOCAL(mission,synch,form,len,callbackViewModel);
	
		},
		
   InsertMission: function(Mission){
					var form = this;	
			       	this.InsertMissionIntoLOCAL(Mission,"false",form,null,null);
    },	
	
	
	 InsertMissionIntoLOCAL: function(MissionObject,synch,formReq,len,callbackViewModel) 
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
		 
	},

	InsertIntoMission : function(requete,form,MissionObject,synch) {
   
			requete.executeSql('INSERT INTO Missions(MissionID,EtatMission,DateCreation,DegreUrgence,DateCloture,Commentaires,TypeMissionID,Synch,BCKPersonnelID,PointVenteID,TourneeID) VALUES( '+MissionObject.MissionID+','+MissionObject.EtatMission+',"'+MissionObject.DateCreation+'",'+MissionObject.DegreUrgence+',"'+MissionObject.DateCloture+'","'+MissionObject.Commentaires+'",'+MissionObject.TypeMissionID+',"'+synch+'",'+MissionObject.BCKPersonnelID+','+MissionObject.PointVenteID+','+MissionObject.TourneeID+')');
			    																																
    },
	///////////////////////////////////////////////////////////////////////////////////////////////////
 
 
/////////////////////////////////////////// Select From LOCAL /////////////////////////		
	SelectMission: function (callback,oTournee) {
	 
	  var form = this;
	  this.connexion.transaction(function(tx){ form.SelectFromMissionByTourneeID(tx, form,callback,oTournee) }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromMissionByTourneeID");});
    },
    
     SelectFromMissionByTourneeID : function(requete,form,callback,oTournee) {
   
   			requete.executeSql("SELECT * FROM Missions WHERE TourneeID = ?", [oTournee.TourneeID], function(tx, results) {form.querySuccess(tx,results,form,callback,oTournee);});
       
    },
    
    
   
    
    querySuccess:function (requete, results,form,callback,oTournee) {
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
			
				DMS.Mobile.PointVenteRequest.SelectPointVente(function(miss){form.InsertMissionIntoArray(oTournee,mission,form,len,callback)},mission);
			
			},oMission);
	
			
		}
	}
	else{callback(oTournee);}
	
        						
	},
////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////// Update In Local //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		UpdateMission: function (Etat,MissionID) {
			 
			var form = this;	
			this.connexion.transaction(function(tx){ form.UpdateEtatMission(tx, form,Etat,MissionID) }, function(err){ DMS.Mobile.Common.errors(err,"UpdateMission");});
		},
		
		
		UpdateEtatMission : function(requete,form,Etat,MissionID) {
				requete.executeSql(' UPDATE Missions SET EtatMission= ? WHERE MissionID = ?', [Etat,MissionID], function(tx, results) {form.querySuccessUpdate(tx,results,form,Etat,MissionID);});
		   
		},
		
		querySuccessUpdate :function (requete, results,form,Etat,MissionID) {
			//alert("update succes !")
		
		},

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}