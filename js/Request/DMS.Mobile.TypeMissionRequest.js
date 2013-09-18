if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.TypeMissionRequest = {};

DMS.Mobile.TypeMissionRequest = 
{
		ListTypeMission : [],
		connexion : null,
		
	
GetListTypeMissionFromServer : function()
	{
		DMS.Mobile.Common.Alert("get list type mission from server");
		 var methode = "GetListTypeMissionDTO?";
		                
		 var URL = DMS.Mobile.Common.ServeurUrl+methode;
		 
		 var form = this;
		    DMS.Mobile.Common.CallService(this.CreateTypeMissionDTO,URL,form);
		
	},
	
CreateTypeMissionDTO : function (json,form)
	{
		
		if ( json != null)
		{
			var synch = "true";

			for (var i=0;i<json.length;i++)
			{
			var typeMissionDTO = new DMS.Mobile.TypeMission();
			
			typeMissionDTO.TypeMissionID = json[i].TypeMissionID;
			typeMissionDTO.Titre = json[i].Titre;
			typeMissionDTO.listMissions = json[i].Missions;
			
			form.ListTypeMission.push(typeMissionDTO);
			}
			form.SaveListTypeMissionInLocal(form.ListTypeMission,synch,form);
		}
		else{return null;}	
		
	},
	
///////////////////////////////////////Insert In LOCAL /////////////////////////
	
SaveListTypeMissionInLocal : function(TypeMissionDTO,synch,form)
	{
	DMS.Mobile.Common.Alert("length : " +TypeMissionDTO.length);
		for ( i=0; i<TypeMissionDTO.length;i++)
		{
		form.InsertTypeMission(TypeMissionDTO[i],synch,form);
		DMS.Mobile.Common.Alert("Fin insertion de typeMission : "+i); 
		}
	},
	
InsertTypeMission: function(TypeMissionObject,synch,formReq) {

					    formReq.connexion.transaction(function(tx){ formReq.InsertIntoTypeMission(tx, formReq,TypeMissionObject,synch) }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoTypeMission");}); 

      },

InsertIntoTypeMission : function(requete,form,TypeMissionObject,synch) {
   
			requete.executeSql('INSERT INTO TypeMissions(TypeMissionID,Titre,Synch) VALUES('+TypeMissionObject.TypeMissionID+',"'+TypeMissionObject.Titre+'","'+synch+'")');
			
    DMS.Mobile.Common.Alert("Fin insertion Type mission");       																																
},
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////SElectFromLOCAL ///////////////////////////

SelectTypeMission: function (callback,oMission) {
	 
	  var form = this;
	  this.connexion.transaction(function(tx){ form.SelectFromTypeMissionByID(tx, form,callback,oMission); }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromTypeMissionByID");});
    },
    
     SelectFromTypeMissionByID : function(requete,form,callback,oMission) {
   
   			requete.executeSql("SELECT * FROM TypeMissions WHERE TypeMissionID = ?", [oMission.TypeMissionID], function(tx, results) {form.querySuccess(tx,results,form,callback,oMission);});
       
    },
	
    querySuccess:function (requete, results,form,callback,oMission) {
		
		var len = results.rows.length;
			if (len>0){
				
				var oTypeMission = new DMS.Mobile.TypeMission();	
				oTypeMission.TypeMissionID = results.rows.item(0).TypeMissionID;
				oTypeMission.Titre = results.rows.item(0).Titre;
				
				oMission.TypeMissions = oTypeMission;
			}
			
			callback(oMission);
        						
	}
///////////////////////////////////////////////////////////////////////////////	
	
	
}