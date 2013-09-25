if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.TypeMissionRequest = {};

DMS.Mobile.TypeMissionRequest = 
{
		ListTypeMission : [],
		connexion : null,
		
	
GetListTypeMissionFromServer : function(callbackViewModel)
	{
		try
		{
		var Conf = JSON.parse(sessionStorage.getItem("Configuration"));
		 
		DMS.Mobile.Common.Alert("get list type mission from server");
		 var methode = "GetListTypeMissionDTO?";
		                
		 var URL =  Conf.URL+methode;
		 
		 var form = this;
		    DMS.Mobile.Common.CallService(function(Json,Form){form.CreateTypeMissionDTO(Json,Form,callbackViewModel);},URL,form);
			
		}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : GetListTypeMissionFromServer in TypeMissionRequest",'alert','e'); 
			}
	},
	
CreateTypeMissionDTO : function (json,form,callbackViewModel)
	{
		try
		{
		
		if ( json != null)
		{
			var len = json.length;
			var synch = "true";

			for (var i=0;i<json.length;i++)
			{
			var typeMissionDTO = new DMS.Mobile.TypeMission();
			
			typeMissionDTO.TypeMissionID = json[i].TypeMissionID;
			typeMissionDTO.Titre = json[i].Titre;
			typeMissionDTO.listMissions = json[i].Missions;
			
			form.insertTypeMission(typeMissionDTO,synch,form,len,callbackViewModel);
			}
			
		}
		else{callbackViewModel(form.ListTypeMission);}	
		
		}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : CreateTypeMissionDTO in TypeMissionRequest",'alert','e'); 
			}
	},
	
	
	
	insertTypeMissionIntoArray : function(TypeMission,synch,form,len,callbackViewModel)
	{
		try
		{
		form.ListTypeMission.push(TypeMission);
		if(form.ListTypeMission.length == len)
		{
			callbackViewModel(form.ListTypeMission);
		}
		}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : insertTypeMissionIntoArray in TypeMissionRequest",'alert','e'); 
			}
	},
	
///////////////////////////////////////Insert In LOCAL /////////////////////////
	
insertTypeMission : function(TypeMissionDTO,synch,form,len,callbackViewModel)
	{
		try
		{
	   form.InsertTypeMissionIntoLocal(TypeMissionDTO,synch,form,len,callbackViewModel);
	   }
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : insertTypeMission in TypeMissionRequest",'alert','e'); 
			}
	},
	
InsertTypeMissionIntoLocal: function(TypeMissionObject,synch,formReq,len,callbackViewModel) {
try
{
					    formReq.connexion.transaction(function(tx){ formReq.InsertIntoTypeMission(tx, formReq,TypeMissionObject,synch) }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoTypeMission");},function(){formReq.insertTypeMissionIntoArray(TypeMissionObject,synch,formReq,len,callbackViewModel);}); 
}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : InsertTypeMissionIntoLocal in TypeMissionRequest",'alert','e'); 
			}
      },

InsertIntoTypeMission : function(requete,form,TypeMissionObject,synch) {
 try
 {  
			requete.executeSql('INSERT INTO TypeMissions(TypeMissionID,Titre,Synch) VALUES('+TypeMissionObject.TypeMissionID+',"'+TypeMissionObject.Titre+'","'+synch+'")');
			
    DMS.Mobile.Common.Alert("Fin insertion Type mission");   
	}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoTypeMission in TypeMissionRequest",'alert','e'); 
			}    																																
},
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////SElectFromLOCAL ///////////////////////////

SelectTypeMission: function (callback,oMission) {
	try
	{ 
	  var form = this;
	  this.connexion.transaction(function(tx){ form.SelectFromTypeMissionByID(tx, form,callback,oMission); }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromTypeMissionByID");});
   }
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectTypeMission in TypeMissionRequest",'alert','e'); 
			}
    },
    
     SelectFromTypeMissionByID : function(requete,form,callback,oMission) {
   try
   {
   			requete.executeSql("SELECT * FROM TypeMissions WHERE TypeMissionID = ?", [oMission.TypeMissionID], function(tx, results) {form.querySuccess(tx,results,form,callback,oMission);});
       }
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromTypeMissionByID in TypeMissionRequest",'alert','e'); 
			}
    },
	
    querySuccess:function (requete, results,form,callback,oMission) {
		try
		{
		var len = results.rows.length;
			if (len>0){
				
				var oTypeMission = new DMS.Mobile.TypeMission();	
				oTypeMission.TypeMissionID = results.rows.item(0).TypeMissionID;
				oTypeMission.Titre = results.rows.item(0).Titre;
				
				oMission.TypeMissions = oTypeMission;
			}
			
			callback(oMission);
        		}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccess in TypeMissionRequest",'alert','e'); 
			}				
	}
///////////////////////////////////////////////////////////////////////////////	
	
	
}