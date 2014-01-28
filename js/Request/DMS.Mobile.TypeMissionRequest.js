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
		var Conf = JSON.parse(localStorage.getItem("Configuration"));
		 
		DMS.Mobile.Common.Alert("get list type mission from server");
		 var methode = "GetListTypeMissionDTO?";
		                
		 var URL =  Conf.URL+methode;
		 
		 var form = this;
		    DMS.Mobile.Common.CallService(function(Json,Form){form.CreateTypeMissionDTO(Json,Form,callbackViewModel);},URL,form);
			
		}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : GetListTypeMissionFromServer in TypeMissionRequest",'alert','e'); 
				
				
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TypeMissionRequest";
						exception.FonctionE = "GetListTypeMissionFromServer";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListTypeMission);
						});
			}
	},
	
CreateTypeMissionDTO : function (json,form,callbackViewModel)
	{
		try
		{
		
		var len = json.length;
		if ( len>0)
		{
			
			var synch = "true";

			for (var i=0;i<json.length;i++)
			{
			var typeMissionDTO = new DMS.Mobile.TypeMission();
			
			typeMissionDTO.TypeMissionID = json[i].TypeMissionID;
			typeMissionDTO.Titre = json[i].Titre;
			typeMissionDTO.Missions = json[i].Missions;
			
			form.insertTypeMission(typeMissionDTO,synch,form,len,callbackViewModel);
			}
			
		}
		else{callbackViewModel(form.ListTypeMission);}	
		
		}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : CreateTypeMissionDTO in TypeMissionRequest",'alert','e'); 
				
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TypeMissionRequest";
						exception.FonctionE = "CreateTypeMissionDTO";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListTypeMission);
						});
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
				
					var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TypeMissionRequest";
						exception.FonctionE = "insertTypeMissionIntoArray";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListTypeMission);
						});
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
				
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TypeMissionRequest";
						exception.FonctionE = "insertTypeMission";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListTypeMission);
						});
			}
	},
	
InsertTypeMissionIntoLocal: function(TypeMissionObject,synch,formReq,len,callbackViewModel) {
try
{
					    formReq.connexion.transaction(function(tx){ formReq.InsertIntoTypeMission(tx, formReq,TypeMissionObject,synch) }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoTypeMission");
						
						var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TypeMissionRequest";
						exception.FonctionE = "InsertIntoTypeMission";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(formReq.ListTypeMission);
						});
						
						},function(){formReq.insertTypeMissionIntoArray(TypeMissionObject,synch,formReq,len,callbackViewModel);}); 
}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : InsertTypeMissionIntoLocal in TypeMissionRequest",'alert','e'); 
				
				        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TypeMissionRequest";
						exception.FonctionE = "InsertTypeMissionIntoLocal";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(formReq.ListTypeMission);
						});
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
				
				 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TypeMissionRequest";
						exception.FonctionE = "InsertIntoTypeMission";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListTypeMission);
						});
			}    																																
},
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////SElectFromLOCAL ///////////////////////////

SelectTypeMission: function (callback,oMission) {
	try
	{ 
	  var form = this;
	  this.connexion.transaction(function(tx){ form.SelectFromTypeMissionByID(tx, form,callback,oMission); }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromTypeMissionByID");
	  
	  
	   var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TypeMissionRequest";
						exception.FonctionE = "SelectFromTypeMissionByID";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(oMission);
						});
						});
   }
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectTypeMission in TypeMissionRequest",'alert','e'); 
				
				  var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TypeMissionRequest";
						exception.FonctionE = "SelectTypeMission";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(oMission);
						});
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
				
				        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TypeMissionRequest";
						exception.FonctionE = "SelectFromTypeMissionByID";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(oMission);
						});
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
				
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TypeMissionRequest";
						exception.FonctionE = "querySuccess";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(oMission);
						});
			}				
	},
///////////////////////////////////////////////////////////////////////////////	
	 //////////////////////////////////////// Delete All Type Mission ////////////////////////
DeleteAllTypeMission : function(callback)
{
	try
	{
			var form = this;	
			this.connexion.transaction(function(tx){ form.DeleteTypeMissions(tx, form,callback);}, function(err){ DMS.Mobile.Common.errors(err,"DeleteTypeMissions");
			
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TypeMissionRequest";
						exception.FonctionE = "DeleteTypeMissions";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel();
						});
			
			});
	 }
	 catch(err)
	 {
			DMS.Mobile.Notification.ShowMessage(err.message+" : DeleteAllTypeMission in TypeMissionRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TypeMissionRequest";
						exception.FonctionE = "DeleteAllTypeMission";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel();
						});
	 }	
}, 

DeleteTypeMissions : function(requete, form,callback)
{
	requete.executeSql("DELETE  FROM TypeMissions ", [],
              function(tx, result) {				
				form.querySuccessDELETEAll(form,callback);
				}, 
                function(err){DMS.Mobile.Common.errors(err,"DeleteTypeMissions");
				
				
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TypeMissionRequest";
						exception.FonctionE = "DeleteTypeMissions";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel();
						});
				
				});
},

querySuccessDELETEAll : function(form,callback)
{
	callback();
},

///////////////////////////////////////////////////////////////////////////////////////////////////

	
	
}