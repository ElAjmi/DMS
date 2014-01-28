if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.ReclamationRequest = {};

DMS.Mobile.ReclamationRequest = 
{
	connexion: null,
	ListReclamation : [],
	
	
	////////////////////////////////// SERVEUR /////////////////////////////////////
	
	SelectReclamationByPersonnelFromServer : function(callbackViewModel,PersonnelID)
	{
		try
		{
			var Conf = JSON.parse(localStorage.getItem("Configuration"));
			
			var form = this;
			
			var Data = "PersonnelID="+PersonnelID; 
		  
			var methode= "GetReclamationDTOByPersonnelID?";
	
			var URL = Conf.URL+methode+Data;
	
			 DMS.Mobile.Common.CallService(function(JsonObject,Form){form.createReclamationDTO(JsonObject,Form,callbackViewModel);},URL,form);
			 
			
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectReclamationByPersonnelFromServer in ReclamationRequest",'alert','e'); 
			
			    var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ReclamationRequest";
						exception.FonctionE = "SelectReclamationByPersonnelFromServer";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListReclamation);
						});
		}
	},
	
	
	createReclamationDTO : function(json,form,callbackViewModel)
	{
		try
		{
			var len = json.length;
		if ( len>0)
		{
			var synch = "true";
			var existServer = "true";
			
			for (var i=0;i<json.length;i++)
			{
				var reclamationDTO = new DMS.Mobile.Reclamation();
			
				reclamationDTO.ReclamationID = json[i].ReclamationID ;
				reclamationDTO.TypeReclamationID = json[i].TypeReclamationID;
				reclamationDTO.TexteReclamation = json[i].TexteReclamation ;
				reclamationDTO.PointVenteID = json[i].PointVenteID;
				reclamationDTO.PersonnelID = json[i].PersonnelID ;
				reclamationDTO.ParentID = json[i].ParentID;	
				
				
				
				reclamationDTO.EtatTraitement = json[i].EtatTraitement;
				reclamationDTO.EtatConsultation = json[i].EtatConsultation ;
				
				var dCreation = DMS.Mobile.Common.ParseDateJson(json[i].DateCreation);			
				reclamationDTO.DateCreation = dCreation;
				
				var hCreation = DMS.Mobile.Common.ParseHeureJson(json[i].DateCreation);	
				reclamationDTO.HeureCreation = hCreation;
				
				var dateTimeCreation = DMS.Mobile.Common.ParseDateTimeJson(json[i].DateCreation);				
				reclamationDTO.DateCreationTrie = dateTimeCreation;
			
				form.insertReclamation(reclamationDTO,synch,existServer,form,len,callbackViewModel);
			}
			
		}
		else{callbackViewModel(form.ListReclamation);}	
	
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : createReclamationDTO in ReclamationRequest",'alert','e'); 
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ReclamationRequest";
						exception.FonctionE = "createReclamationDTO";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListReclamation);
						});
		}
	},
	
	
	//////////////////////////////////////////// insertion local ///////////////////////////

insertReclamation : function (reclamation,synch,existServer,form,len,callbackViewModel)
		{
			try
			{
			form.InsertReclamationIntoLOCAL(reclamation,synch,existServer,form,len,callbackViewModel);
			}
			catch(err)
		{
		   DMS.Mobile.Notification.ShowMessage(err.message+" : insertReclamation in ReclamationRequest",'alert','e'); 
		                var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ReclamationRequest";
						exception.FonctionE = "insertReclamation";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListReclamation);
						});
		}
		},
		
InsertReclamation: function(reclamation,callbackViewModel){
 try
	{
				var form = this;
				var existServer = "false";
				var synch = "false";	
				this.InsertReclamationIntoLOCAL(reclamation,synch,existServer,form,null,callbackViewModel);
	}
		catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" :InsertFacture  in ReclamationRequest",'alert','e');
		
		                var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ReclamationRequest";
						exception.FonctionE = "InsertFacture";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListReclamation);
						}); 
	}
},
		
	InsertReclamationIntoLOCAL : function(reclamationObject,synch,existServer,formReq,len,callbackViewModel)
	{
		try
		{
			if (synch == "false")
			{
				formReq.connexion.transaction(function(tx){ formReq.InsertIntoReclamation(tx, formReq,reclamationObject,synch,existServer); }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoReclamation");
				
				
				 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ReclamationRequest";
						exception.FonctionE = "InsertIntoReclamation";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel();
						}); 
				
				
				},function(){
					callbackViewModel();
					}); 
		    }
			else
			{
				formReq.connexion.transaction(function(tx){ formReq.InsertIntoReclamation(tx, formReq,reclamationObject,synch,existServer); }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoReclamation");
				
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ReclamationRequest";
						exception.FonctionE = "InsertIntoReclamation";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListReclamation);
						}); 
				
				},function(){
							
						formReq.insertReclamationIntoArray(reclamationObject,formReq,len,callbackViewModel)	;		
							}); 
							//formReq.insertMissionIntoArray(MissionObject,formReq,len,callbackViewModel)	;
			}
		 		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertReclamationIntoLOCAL in ReclamationRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ReclamationRequest";
						exception.FonctionE = "InsertReclamationIntoLOCAL";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListReclamation);
						});
		}
	},
	
	InsertIntoReclamation : function(requete, formReq,reclamationObject,synch,existServer)
	{
		try
		{
			if (synch == "false")
			{
						requete.executeSql('INSERT INTO Reclamation(TexteReclamation,TypeReclamationID,PointVenteID,PersonnelID,ParentID,Synch,DateCreation,HeureCreation,EtatConsultation,EtatTraitement,DateCreationTrie,ExistServer) VALUES( "'+reclamationObject.TexteReclamation+'",'+reclamationObject.TypeReclamationID+','+reclamationObject.PointVenteID+','+reclamationObject.PersonnelID+',"'+reclamationObject.ParentID+'","'+synch+'","'+reclamationObject.DateCreation+'","'+reclamationObject.HeureCreation+'",'+reclamationObject.EtatConsultation+','+reclamationObject.EtatTraitement+',"'+reclamationObject.DateCreationTrie+'","'+existServer+'")');
			}
			else
			{
			requete.executeSql('INSERT INTO Reclamation(ReclamationID,TexteReclamation,TypeReclamationID,PointVenteID,PersonnelID,ParentID,Synch,DateCreation,HeureCreation,EtatConsultation,EtatTraitement,DateCreationTrie,ExistServer) VALUES( '+reclamationObject.ReclamationID+',"'+reclamationObject.TexteReclamation+'",'+reclamationObject.TypeReclamationID+','+reclamationObject.PointVenteID+','+reclamationObject.PersonnelID+',"'+reclamationObject.ParentID+'","'+synch+'","'+reclamationObject.DateCreation+'","'+reclamationObject.HeureCreation+'",'+reclamationObject.EtatConsultation+','+reclamationObject.EtatTraitement+',"'+reclamationObject.DateCreationTrie+'","'+existServer+'")');
			}
			
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoReclamation in ReclamationRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ReclamationRequest";
						exception.FonctionE = "InsertIntoReclamation";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoReclamation in ReclamationRequest",'alert','e');
						});
		}	
	},
	
	
	
	insertReclamationIntoArray : function(reclamation,form,len,callbackViewModel)
	{
				try
		{
		
		form.ListReclamation.push(reclamation);
		if (form.ListReclamation.length == len)
		{
			callbackViewModel(form.ListReclamation);
		}
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertReclamationIntoArray in ReclamationRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ReclamationRequest";
						exception.FonctionE = "insertReclamationIntoArray";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListReclamation);
						});
		}
	},
	
	//////////////////////select local ///////////////////////
	
	SelectAll : function(callback)
	{	
	DMS.Mobile.Common.Alert2("SelectAll in reclamation");
		try
	{
	
	  var form = this;
	  this.connexion.transaction(function(tx){ form.SelectFromReclamation(tx, form,callback) ;}, function(err){ DMS.Mobile.Common.errors(err,"SelectFromReclamation");
	  
	            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ReclamationRequest";
						exception.FonctionE = "SelectFromReclamation";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.ListReclamation);
						});
	  
	  });
	 		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAll in ReclamationRequest",'alert','e'); 
		                var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ReclamationRequest";
						exception.FonctionE = "SelectAll";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.ListReclamation);
						});
		
		}

			
},
	SelectFromReclamation : function(requete, form,callback) 
			{
				try
				{
			requete.executeSql("SELECT * FROM Reclamation WHERE ParentID = ? ORDER BY DateTime(DateCreationTrie)  Desc", ["null"], function(tx, results) {form.querySuccessAll(tx,results,form,callback);});
		   }
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromRecmation in ReclamationRequest",'alert','e'); 
				
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ReclamationRequest";
						exception.FonctionE = "SelectFromRecmation";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.ListReclamation);
						});
			}
	},
	
	querySuccessAll : function(requete,results,form,callback)
	{
		try
			{
				
			var len = results.rows.length;
			if(len>0){
			for (var i=0;i<len;i++){
				var oReclamation = new DMS.Mobile.Reclamation();
				oReclamation.ListReponse = [];	
				oReclamation.ReclamationID = results.rows.item(i).ReclamationID;
				oReclamation.TypeReclamationID = results.rows.item(i).TypeReclamationID;
				oReclamation.PointVenteID = results.rows.item(i).PointVenteID;
				oReclamation.PersonnelID = results.rows.item(i).PersonnelID;
				oReclamation.EtatTraitement = results.rows.item(i).EtatTraitement;
				oReclamation.DateCreation = results.rows.item(i).DateCreation;
				oReclamation.HeureCreation = results.rows.item(i).HeureCreation;
				oReclamation.EtatConsultation = results.rows.item(i).EtatConsultation;
				oReclamation.TexteReclamation = results.rows.item(i).TexteReclamation;
				oReclamation.ParentID = results.rows.item(i).ParentID;
				
				
				
		DMS.Mobile.PointVenteRequest.connexion = form.connexion;
		DMS.Mobile.PersonnelRequest.connexion = form.connexion;
		
		DMS.Mobile.PointVenteRequest.SelectPointVenteByID(function(reclamationPointVente){
		DMS.Mobile.PersonnelRequest.SelectPersonnelByID(function(reclamationPersonnel){	
		
		form.SelectReponseByReclamation(function(reclamation){
			
			form.insertReclamationIntoReclamationList(reclamation,form,len,callback);
			
		},reclamationPersonnel);
		},reclamationPointVente);
			},oReclamation);							
				
				}
			}else
			{callback(form.ListReclamation);}
				}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessAll in ReclamationRequest",'alert','e'); 
				
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ReclamationRequest";
						exception.FonctionE = "querySuccessAll";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.ListReclamation);
						});
			}
	},
	
	
	
	//////////////////////////////
	
	SelectReponseByReclamation:function(callback,reclamation)
	{   DMS.Mobile.Common.Alert2("SelectReponseByReclamation");
		try
		{
		var form = this;	
			this.connexion.transaction(function(tx){ form.SelectAllReclamation(tx, form,callback,reclamation) ;}, function(err){ DMS.Mobile.Common.errors(err,"SelectAllReclamation");
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ReclamationRequest";
						exception.FonctionE = "SelectAllReclamation";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(reclamation);
						});
			
			});
			
		}
		catch(err)
		{
			alert(err.message);
				//DMS.Mobile.Notification.ShowMessage(err.message+" : SelectReponseByReclamation in ReclamationRequest",'alert','e'); 
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ReclamationRequest";
						exception.FonctionE = "SelectReponseByReclamation";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(reclamation);
						});
		}
	},
	
	SelectAllReclamation:function(requete, form,callback,reclamation)
	{
				try
				{
			requete.executeSql('SELECT * FROM Reclamation WHERE ParentID  = ? ORDER BY DateTime(DateCreationTrie) Desc', [reclamation.ReclamationID], function(tx, results) {form.querySuccessAllRec(tx,results,reclamation, form,callback);});
		   }
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllReclamation in ReclamationRequest",'alert','e'); 
				
				        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ReclamationRequest";
						exception.FonctionE = "SelectAllReclamation";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(reclamation);
						});
			}
	},
	
	
	querySuccessAllRec : function(requete,results,reclamation, form,callback)
	{
		try
			{
				
			var len = results.rows.length;
			if(len>0){
			for (var i=0;i<len;i++){
				var oReclamation = new DMS.Mobile.Reclamation();
				oReclamation.ListReponse = [];	
				oReclamation.ReclamationID = results.rows.item(i).ReclamationID;
				oReclamation.TypeReclamationID = results.rows.item(i).TypeReclamationID;
				oReclamation.PointVenteID = results.rows.item(i).PointVenteID;
				oReclamation.PersonnelID = results.rows.item(i).PersonnelID;
				oReclamation.EtatTraitement = results.rows.item(i).EtatTraitement;
				oReclamation.DateCreation = results.rows.item(i).DateCreation;
				oReclamation.HeureCreation = results.rows.item(i).HeureCreation;
				oReclamation.EtatConsultation = results.rows.item(i).EtatConsultation;
				oReclamation.TexteReclamation = results.rows.item(i).TexteReclamation;
				oReclamation.ParentID = results.rows.item(i).ParentID;
				
				

			form.insertReponseInReclamation(reclamation,form,len,callback,oReclamation);
			
	
				}
			}else
			{callback(reclamation);}
				}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccess in TourneeRequest",'alert','e'); 
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ReclamationRequest";
						exception.FonctionE = "querySuccess";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(reclamation);
						});
			}
	},
	
	insertReponseInReclamation : function(reclamation,form,len,callback,oReclamation)
	{
         try
		 {			
			reclamation.ListReponse.push(oReclamation);
			if(reclamation.ListReponse.length == len)
			{
				DMS.Mobile.Common.Alert2("Callback insert reponse in reclamation");
				
				callback(reclamation);
			}
		 }
		 catch(err)
		 {
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ReclamationRequest";
						exception.FonctionE = "insertReponseInReclamation";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(reclamation);
						});
  		 }
	},
	
	insertReclamationIntoReclamationList : function(reclamation,form,len,callback)
	{
		try
		{
			form.ListReclamation.push(reclamation);
			if (form.ListReclamation.length == len)
			{
				DMS.Mobile.Common.Alert2("callback inreclamation");
				callback(form.ListReclamation);
			}
		}
		catch(err)
		{
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ReclamationRequest";
						exception.FonctionE = "insertReclamationIntoReclamationList";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(reclamation);
						});
		}
	},
	

	
	
		
	//////////////////////// update etatConsultation reclamation by id	
	UpdateEtatConsultationByID : function(Etat,reclamation,callback)
	{
			try
		{	
			var form = this;	
			this.connexion.transaction(function(tx){ form.UpdateEtatReclamation(tx, form,Etat,reclamation,callback); }, function(err){ DMS.Mobile.Common.errors(err,"UpdateEtatReclamation");
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ReclamationRequest";
						exception.FonctionE = "UpdateEtatReclamation";
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
			DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateEtatConsultationByID in ReclamationRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ReclamationRequest";
						exception.FonctionE = "UpdateEtatConsultationByID";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
		}
	},
	
	UpdateEtatReclamation : function(requete, form,Etat,reclamation,callback)
	{
		try
		{
			var etatNonConsulter = DMS.Mobile.Constante.EtatConsultation.NonConsulte;
             var userID = sessionStorage.getItem("userID")
		requete.executeSql(' UPDATE Reclamation SET Synch= ? WHERE ((ReclamationID = ? OR ParentID = ?) AND (PersonnelID <> ?) AND (EtatConsultation = ?))', ["false",reclamation.ReclamationID,reclamation.ReclamationID,userID,etatNonConsulter]);
		requete.executeSql(' UPDATE Reclamation SET EtatConsultation= ? WHERE ((ReclamationID = ? OR ParentID = ?) AND (PersonnelID <> ?) AND (EtatConsultation = ?))', [Etat,reclamation.ReclamationID,reclamation.ReclamationID,userID,etatNonConsulter], function(tx, results) {form.querySuccessUpdate(tx,results,form,Etat,reclamation,callback);});
		 		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateEtatReclamation in ReclamationRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ReclamationRequest";
						exception.FonctionE = "UpdateEtatReclamation";
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


	 //////////////////////////////////////// Delete All Reclamation ////////////////////////
DeleteAllReclamation : function(callback)
{
	try
	{
			var form = this;	
			this.connexion.transaction(function(tx){ form.DeleteReclamation(tx, form,callback);}, function(err){ DMS.Mobile.Common.errors(err,"DeleteReclamation");
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ReclamationRequest";
						exception.FonctionE = "DeleteReclamation";
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
			DMS.Mobile.Notification.ShowMessage(err.message+" : DeleteAllReclamation in ReclamationRequest",'alert','e'); 
			
		            	var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ReclamationRequest";
						exception.FonctionE = "DeleteAllReclamation";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
	 }	
}, 

DeleteReclamation : function(requete, form,callback)
{
	requete.executeSql("DELETE  FROM Reclamation ", [],
              function(tx, result) {				
				form.querySuccessDELETEAll(form,callback);
				}, 
                function(err){DMS.Mobile.Common.errors(err,"DeleteReclamation");
				   
				        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ReclamationRequest";
						exception.FonctionE = "DeleteReclamation";
						exception.Exception = err.message;
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


	//////////////////////////// select all reclamation not synchronize ////////////////////////////////
	
	SelectAllReclamationNotSynchro : function(callback)
	{
		try
		{
			this.ListReclamation = [];
			var form = this;
			this.connexion.transaction(function(tx){ form.SelectAllReclamationNotSynch(tx, form,callback); }, function(err){ DMS.Mobile.Common.errors(err,"SelectAllReclamationNotSynch");
			
			             var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ReclamationRequest";
						exception.FonctionE = "SelectAllReclamationNotSynch";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.ListReclamation);
						});
			
			});
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllReclamationNotSynchro in ReclamationRequest",'alert','e'); 
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ReclamationRequest";
						exception.FonctionE = "SelectAllReclamationNotSynchro";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.ListReclamation);
						});
		}
    },
	
	SelectAllReclamationNotSynch : function(requete, form,callback){
	//alert"SelectAllCommandeNotSynch");
   try
    { 
   			requete.executeSql("SELECT * FROM Reclamation WHERE Synch =?", ["false"], function(tx, results) {form.querySuccessAllRecla(tx,results,form,callback);});
    }
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllReclamationNotSynch in ReclamationRequest",'alert','e'); 
		
		
		                var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ReclamationRequest";
						exception.FonctionE = "SelectAllReclamationNotSynch";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.ListReclamation);
						});
	}

},


querySuccessAllRecla : function(requete,results,form,callback){
	//alert"querySuccessAllCommande");
     try
	 {
		 form.ListReclamation = [];
		var len = results.rows.length;
		//alert"nbr cmd = "+len);
		if (len>0){
			for (var i=0; i<len; i++){
				
				
				var oReclamation = new DMS.Mobile.Reclamation();
				oReclamation.ListReponse = [];	
				oReclamation.ReclamationID = results.rows.item(i).ReclamationID;
				oReclamation.TypeReclamationID = results.rows.item(i).TypeReclamationID;
				oReclamation.PointVenteID = results.rows.item(i).PointVenteID;
				oReclamation.PersonnelID = results.rows.item(i).PersonnelID;
				oReclamation.EtatTraitement = results.rows.item(i).EtatTraitement;
				oReclamation.DateCreation = results.rows.item(i).DateCreation;
				oReclamation.HeureCreation = results.rows.item(i).HeureCreation;
				oReclamation.EtatConsultation = results.rows.item(i).EtatConsultation;
				oReclamation.TexteReclamation = results.rows.item(i).TexteReclamation;
				oReclamation.ExistServer = results.rows.item(i).ExistServer;
				oReclamation.ParentID = results.rows.item(i).ParentID;
				
				form.ListReclamation.push(oReclamation);
				
			}
			
			callback(form.ListReclamation);
		}
		else
		{
			callback(form.ListReclamation);
		}
      }
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessAllRecla in ReclamationRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ReclamationRequest";
						exception.FonctionE = "querySuccessAllRecla";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.ListReclamation);
						});
		}

},

	
	
	/////////////////////////////// update synch et existServer aprés la synchronisation serveur////////
	
	UpdateSynchReclamation : function(callback)
	{
		try
		{	
			var form = this;	
			this.connexion.transaction(function(tx){ form.UpdateSynchRec(tx, form,callback); }, function(err){ DMS.Mobile.Common.errors(err,"UpdateSynchRec");
			
			        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ReclamationRequest";
						exception.FonctionE = "UpdateSynchRec";
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
			DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateSynchReclamation in ReclamationRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ReclamationRequest";
						exception.FonctionE = "UpdateSynchReclamation";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
		}
	},
	
	UpdateSynchRec : function(requete, form,callback)
	{
        try
		{

		requete.executeSql(' UPDATE Reclamation SET ExistServer= ? WHERE Synch = ?', ["true","false"]);
		requete.executeSql(' UPDATE Reclamation SET Synch= ? WHERE Synch = ?', ["true","false"], function(tx, results) {form.querySuccessUpdateSynch(tx,results,form,callback);});
		 		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateSynchRec in ReclamationRequest",'alert','e'); 
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ReclamationRequest";
						exception.FonctionE = "UpdateSynchRec";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
		}  
	},
	
	querySuccessUpdateSynch : function(tx,results,form,callback)
	{
		callback();
	},
	//////////////////////////////////////////////////////////////////////////////////////////////////////
	
		//////////////////////////////// DELETE ALL PROPOSITION COMMANDE FORM DATA BASE /////////////////
	
DeleteAllReclamation : function(callback)
{
	try
	{
		var form = this;	
		this.connexion.transaction(function(tx){ form.DeleteReclamations(tx, form,callback);}, function(err){ DMS.Mobile.Common.errors(err,"DeleteReclamations");
		
		                var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ReclamationRequest";
						exception.FonctionE = "DeleteReclamations";
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
			DMS.Mobile.Notification.ShowMessage(err.message+" : DeleteAllReclamation in ReclamationRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ReclamationRequest";
						exception.FonctionE = "DeleteAllReclamation";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
	 }	
},

DeleteReclamations : function(requete, form,callback)
{
	requete.executeSql("DELETE  FROM Reclamation ", [],
              function(tx, result) {				
				form.querySuccessDELETEAll(form,callback);
				}, 
                function(err){DMS.Mobile.Common.errors(err,"DeleteReclamations");
				 
				        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ReclamationRequest";
						exception.FonctionE = "DeleteReclamations";
						exception.Exception = err.message;
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
	
}