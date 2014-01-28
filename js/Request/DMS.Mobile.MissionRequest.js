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
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "MissionRequest";
						exception.FonctionE = "insertMissionIntoArray";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListMission);
						});
		}
	},

	InsertMissionIntoMissionList : function(oPointVente,mission,form,len,callback)	
	{
		try
		{
			
				oPointVente.ListMissions.push(mission);
				if(oPointVente.ListMissions.length == len)
				{
					callback(oPointVente);
				}
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertMissionIntoMissionList in MissionRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "MissionRequest";
						exception.FonctionE = "InsertMissionIntoMissionList";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(oPointVente);
						});
		}
	},
	
	//////////////////////////////////////////////////serveur ////////////////////////////////////////
	SelectMissionByPersonnelFromServer : function(callbackViewModel,PersonnelID)
	{
		var form = this;
		try
		{
			var Conf = JSON.parse(localStorage.getItem("Configuration"));
			
			
			
			var Data = "PersonnelID="+PersonnelID; 
		  
			var methode= "GetListMissionDTOByPersonnelID?";
	
			var URL = Conf.URL+methode+Data;
	
			 DMS.Mobile.Common.CallService(function(JsonObject,Form){form.createMissionDTO(JsonObject,Form,callbackViewModel);},URL,form);
			 
			
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectMissionByPersonnelFromServer in MissionRequest",'alert','e'); 
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "MissionRequest";
						exception.FonctionE = "SelectMissionByPersonnelFromServer";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListMission);
						});
		}
	},
	
	createMissionDTO : function(json,form,callbackViewModel)
	{
		try
		{
			var len = json.length;
		if ( len>0)
		{
			var synch = "true";
			
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
			//missionDTO.TourneeID = json[i].TourneeID;
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
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "MissionRequest";
						exception.FonctionE = "createMissionDTO";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListMission);
						});
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
		
	                	var exception = new DMS.Mobile.Exception();
						exception.FichierE = "MissionRequest";
						exception.FonctionE = "insertMission";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListMission);
						});
		    
		}
		},
		
   InsertMission: function(Mission){
			var form = this;
			try
			{
						
			       	this.InsertMissionIntoLOCAL(Mission,"false",form,null,null);
  		     }
			catch(err)
		     {
			 
		
		                var exception = new DMS.Mobile.Exception();
						exception.FichierE = "MissionRequest";
						exception.FonctionE = "InsertMission";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							DMS.Mobile.Notification.ShowMessage(err.message+" : InsertMission in MissionRequest",'alert','e');
						});
		    }
    },	
	
	
	 InsertMissionIntoLOCAL: function(MissionObject,synch,formReq,len,callbackViewModel) 
	 {
		try
		{
			if (synch == "false")
			{
				formReq.connexion.transaction(function(tx){ formReq.InsertIntoMission(tx, formReq,MissionObject,synch); }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoMission");
				
				          var exception = new DMS.Mobile.Exception();
						exception.FichierE = "MissionRequest";
						exception.FonctionE = "InsertIntoMission";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(formReq.ListMission);
						});
				
				}); 
		    }
			else
			{
				formReq.connexion.transaction(function(tx){ formReq.InsertIntoMission(tx, formReq,MissionObject,synch); }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoMission");
				
				        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "MissionRequest";
						exception.FonctionE = "InsertIntoMission";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(formReq.ListMission);
						});
				
				},function(){
							
						formReq.insertMissionIntoArray(MissionObject,formReq,len,callbackViewModel)	;		
							}); 
							//formReq.insertMissionIntoArray(MissionObject,formReq,len,callbackViewModel)	;
			}
		 		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertMissionIntoLOCAL in MissionRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "MissionRequest";
						exception.FonctionE = "InsertMissionIntoLOCAL";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(formReq.ListMission);
						});
		}
	},

	InsertIntoMission : function(requete,form,MissionObject,synch) {
   try
   {
			requete.executeSql('INSERT INTO Missions(MissionID,EtatMission,DateCreation,DegreUrgence,DateCloture,HeureCreation,HeureCloture,Commentaires,TypeMissionID,Synch,BCKPersonnelID,PointVenteID) VALUES( '+MissionObject.MissionID+','+MissionObject.EtatMission+',"'+MissionObject.DateCreation+'",'+MissionObject.DegreUrgence+',"'+MissionObject.DateCloture+'","'+MissionObject.HeureCreation+'","'+MissionObject.HeureCloture+'","'+MissionObject.Commentaires+'",'+MissionObject.TypeMissionID+',"'+synch+'",'+MissionObject.BCKPersonnelID+','+MissionObject.PointVenteID+')');
			}
			catch(err)
		{
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "MissionRequest";
						exception.FonctionE = "InsertIntoMission";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoMission in MissionRequest",'alert','e'); 
						});
		}		    																																
    },
	///////////////////////////////////////////////////////////////////////////////////////////////////
 
 
/////////////////////////////////////////// Select From LOCAL /////////////////////////		
	SelectMission: function (callback,oPointVente) {
	 var form = this;
	try
	{
	  this.connexion.transaction(function(tx){ form.SelectFromMissionByPointVenteID(tx, form,callback,oPointVente) ;}, function(err){ DMS.Mobile.Common.errors(err,"SelectFromMissionByTourneeID");
	  
	                    var exception = new DMS.Mobile.Exception();
						exception.FichierE = "MissionRequest";
						exception.FonctionE = "SelectFromMissionByPointVenteID";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromMissionByPointVenteID in MissionRequest",'alert','e');  
						});
	  });
	 		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectMission in MissionRequest",'alert','e'); 
			
		                var exception = new DMS.Mobile.Exception();
						exception.FichierE = "MissionRequest";
						exception.FonctionE = "SelectMission";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							DMS.Mobile.Notification.ShowMessage(err.message+" : SelectMission in MissionRequest",'alert','e');  
						});
		}
	 
    },
    
     SelectFromMissionByPointVenteID : function(requete,form,callback,oPointVente) {
  try
  {
   			requete.executeSql("SELECT * FROM Missions WHERE PointVenteID = ?", [oPointVente.PointVenteID], function(tx, results) {form.querySuccess(tx,results,form,callback,oPointVente);});
       		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromMissionByPointVenteID in MissionRequest",'alert','e'); 
			
			           var exception = new DMS.Mobile.Exception();
						exception.FichierE = "MissionRequest";
						exception.FonctionE = "SelectFromMissionByPointVenteID";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(oPointVente);
						});
			
		}
    },
    
    
   
    
    querySuccess:function (requete, results,form,callback,oPointVente) {
	try
	{
		var len = results.rows.length;
	
		if (len>0){
			for (var i=0; i<len; i++){
				
				var oMission = new DMS.Mobile.Mission();
				oMission.ListFacture = [];
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
				
				
				DMS.Mobile.TypeMissionRequest.connexion = form.connexion;
				DMS.Mobile.FactureRequest.connexion = form.connexion;
				
		DMS.Mobile.TypeMissionRequest.SelectTypeMission(function(mission){
			
				
					DMS.Mobile.FactureRequest.SelectAllFactureByMission(mission ,function(Mission){
						
					form.InsertMissionIntoMissionList(oPointVente,Mission,form,len,callback);
					
					});
			},oMission);
	
			
		}
	}
	else{callback(oPointVente);}
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccess in MissionRequest",'alert','e'); 
		
	                	var exception = new DMS.Mobile.Exception();
						exception.FichierE = "MissionRequest";
						exception.FonctionE = "querySuccess";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(oPointVente);
						});
		
		}
        						
	},
////////////////////////////////////////////////////////////////////////////

/////-------------------- select all mission not synchronize by pointVenteID

SelectAllMissionByPointVente : function(PointVente,callback)
{
	//alert"SelectAllMissionByTourneeID");
	var form = this;
	try
	{
		
		this.connexion.transaction(function(tx){ form.SelectAllMissionNotSynch(tx, form,callback,PointVente); }, function(err){ DMS.Mobile.Common.errors(err,"SelectAllMissionNotSynch");
		
		                var exception = new DMS.Mobile.Exception();
						exception.FichierE = "MissionRequest";
						exception.FonctionE = "SelectAllMissionNotSynch";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							 callback(PointVente);
						});
		
		});
	}
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllMissionByPointVente in MissionRequest",'alert','e'); 
		                var exception = new DMS.Mobile.Exception();
						exception.FichierE = "MissionRequest";
						exception.FonctionE = "SelectAllMissionByPointVente";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							 callback(PointVente);
						});
	}
},

SelectAllMissionNotSynch : function(requete, form,callback,PointVente)
{
	//alert"SelectAllMissionNotSynch");
	try
	{
	   			requete.executeSql("SELECT * FROM Missions WHERE Synch =? AND PointVenteID=?", ["false",PointVente.PointVenteID], function(tx, results) {form.querySuccessAllMission(tx,results,form,callback,PointVente);});
    }
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllMissionNotSynch in MissionRequest",'alert','e'); 
		 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "MissionRequest";
						exception.FonctionE = "SelectAllMissionNotSynch";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							 callback(PointVente);
						});
	}
},

querySuccessAllMission : function(requete,results,form,callback,PointVente)
{
	//alert"querySuccessAllMission");
	try
	{
		var len = results.rows.length;
		PointVente.ListMissions = [];
		if (len>0){
			for (var i=0; i<len; i++){
				
				var oMission = new DMS.Mobile.Mission();
				oMission.MissionID = results.rows.item(i).MissionID ;
				oMission.EtatMission = results.rows.item(i).EtatMission;
				oMission.DateCreation = results.rows.item(i).DateCreation;
				oMission.HeureCreation = results.rows.item(i).HeureCreation;
				oMission.DegreUrgence = results.rows.item(i).DegreUrgence; 
				oMission.DateCloture = results.rows.item(i).DateCloture; 
				oMission.HeureCloture = results.rows.item(i).HeureCloture; 
				oMission.Commentaires = results.rows.item(i).Commentaires;
				oMission.TypeMissionID = results.rows.item(i).TypeMissionID;
				oMission.Synch = results.rows.item(i).Synch;
				oMission.BCKPersonnelID = results.rows.item(i).BCKPersonnelID;
				oMission.PointVenteID = results.rows.item(i).PointVenteID;
				//oMission.TourneeID = results.rows.item(i).TourneeID;
				
				
				form.InsertListMissionIntoPointVente(form,oMission,PointVente,len,callback);
			}
		  }
		  else
		  {
			  //alert"callback all tourne : ligne cmd vide");
			  callback(PointVente);
		  }
	}
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessAllMission in MissionRequest",'alert','e'); 
		                var exception = new DMS.Mobile.Exception();
						exception.FichierE = "MissionRequest";
						exception.FonctionE = "querySuccessAllMission";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							 callback(PointVente);
						});
	}
},

InsertListMissionIntoPointVente : function(form,Mission,PointVente,len,callback)
{
	try
	{
		//alert"InsertListMissionIntoTournee");
		PointVente.ListMissions.push(Mission);
		if (PointVente.ListMissions.length == len)
		{
			//alert"callback all tourne");
			callback(PointVente);
		}
	}
	catch(err)
	{
		var exception = new DMS.Mobile.Exception();
						exception.FichierE = "MissionRequest";
						exception.FonctionE = "InsertListMissionIntoPointVente";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							 callback(PointVente);
						});
	}
},


///////////////////////////////////////////// Update In Local //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///------------------------- update etat mission ----------------//

		UpdateMission: function (Etat,MissionID,callback) {
		var form = this;
		try
		{	
				
			this.connexion.transaction(function(tx){ form.UpdateEtatMission(tx, form,Etat,MissionID,callback); }, function(err){ DMS.Mobile.Common.errors(err,"UpdateMission");
			
			         var exception = new DMS.Mobile.Exception();
						exception.FichierE = "MissionRequest";
						exception.FonctionE = "UpdateEtatMission";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							 callback();
						});
			
			});
				}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateMission in MissionRequest",'alert','e'); 
		    
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "MissionRequest";
						exception.FonctionE = "UpdateMission";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							 callback();
						});
		
		}
		},
		
		
		UpdateEtatMission : function(requete,form,Etat,MissionID,callback) {
		try
		{
			var dateCloture = DMS.Mobile.Common.currentDate();
			var heureCloture = DMS.Mobile.Common.currentHours();
			if(Etat == DMS.Mobile.Constante.EtatMission.Cloturee)
			{
				requete.executeSql(' UPDATE Missions SET DateCloture= ? WHERE MissionID = ?', [dateCloture,MissionID]);
				requete.executeSql(' UPDATE Missions SET HeureCloture= ? WHERE MissionID = ?', [heureCloture,MissionID]);
			}
			    requete.executeSql(' UPDATE Missions SET Synch= ? WHERE MissionID = ?', ["false",MissionID]);
				requete.executeSql(' UPDATE Missions SET EtatMission= ? WHERE MissionID = ?', [Etat,MissionID], function(tx, results) {form.querySuccessUpdate(tx,results,form,Etat,MissionID,callback);});
		 		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateEtatMission in MissionRequest",'alert','e'); 
			
			   var exception = new DMS.Mobile.Exception();
						exception.FichierE = "MissionRequest";
						exception.FonctionE = "UpdateEtatMission";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							 callback();
						});
		}  
		},
		
		querySuccessUpdate :function (requete, results,form,Etat,MissionID,callback) {
		    callback();
		},

////-------------------- update synch des mission ( de non synchroniser ==> a synchroniser) -------------------//


		UpdateSynchMission: function (callback) {
			var form = this;
			try
			{	 
					
				this.connexion.transaction(function(tx){ form.UpdateMissionNotSynch(tx, form,callback); }, function(err){ DMS.Mobile.Common.errors(err,"UpdateSynchMission");
				
				        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "MissionRequest";
						exception.FonctionE = "UpdateMissionNotSynch";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							 callback();
						});
				
				
				});
					}
				catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateSynchMission in MissionRequest",'alert','e'); 
				 
				 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "MissionRequest";
						exception.FonctionE = "UpdateSynchMission";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							 callback();
						});
				
			}
		},

	UpdateMissionNotSynch : function(requete, form,callback) {
		try
		{
				requete.executeSql(' UPDATE Missions SET Synch= ? WHERE Synch = ?', ["true","false"], function(tx, results) {form.querySuccessUpdateSynch(tx,results,form,callback);});
		 		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateEtatMission in MissionRequest",'alert','e'); 
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "MissionRequest";
						exception.FonctionE = "UpdateEtatMission";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							 callback();
						});
		}  
		},

querySuccessUpdateSynch : function(requete,results,form,callback)
{
	callback();
},

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			 //////////////////////////////////////// Delete All Mission ////////////////////////
DeleteAllMission : function(callback)
{
	var form = this;
	try
	{
				
			this.connexion.transaction(function(tx){ form.DeleteMissions(tx, form,callback);}, function(err){ DMS.Mobile.Common.errors(err,"DeleteMissions");
			
			           var exception = new DMS.Mobile.Exception();
						exception.FichierE = "MissionRequest";
						exception.FonctionE = "DeleteMissions";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							 callback();
						});
			
			});
	 }
	 catch(err)
	 {
			DMS.Mobile.Notification.ShowMessage(err.message+" : DeleteAllMission in MissionRequest",'alert','e'); 
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "MissionRequest";
						exception.FonctionE = "DeleteAllMission";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							 callback();
						});
	 }	
}, 

DeleteMissions : function(requete, form,callback)
{
	requete.executeSql("DELETE  FROM Missions ", [],
              function(tx, result) {				
				form.querySuccessDELETEAll(form,callback);
				}, 
                function(err){DMS.Mobile.Common.errors(err,"DeleteMissions");
				
				       var exception = new DMS.Mobile.Exception();
						exception.FichierE = "MissionRequest";
						exception.FonctionE = "DeleteMissions";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							 callback();
						});
					
				});
},

querySuccessDELETEAll : function(form,callback)
{
	callback();
},

///////////////////////////////////////////////////////////////////////////////////////////////////




}