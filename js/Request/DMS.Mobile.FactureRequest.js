if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.FactureRequest = {};

DMS.Mobile.FactureRequest = 
{
	connexion: null,
	ListFacture : [],
	
	
	////////////////////////////////// SERVEUR /////////////////////////////////////
	
	SelectFactureByPersonnelFromServer : function(callbackViewModel,PersonnelID)
	{
		var form = this;
		try
		{
			var Conf = JSON.parse(localStorage.getItem("Configuration"));
			
			
			
			var Data = "PersonnelID="+PersonnelID; 
		  
			var methode= "GetFactureDTOByPersonnelID?";
	
			var URL = Conf.URL+methode+Data;
	
			 DMS.Mobile.Common.CallService(function(JsonObject,Form){form.createFactureDTO(JsonObject,Form,callbackViewModel);},URL,form);
			 
			
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFactureByPersonnelFromServer in FactureRequest",'alert','e'); 
			
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FactureRequest";
						exception.FonctionE = "SelectFactureByPersonnelFromServer";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.ListFacture);
						});
		}
	},
	
	createFactureDTO : function(json,form,callbackViewModel)
	{
		try
		{
			form.ListFacture = [];
			var len = json.length;
		if ( len>0)
		{
			var synch = "true";
			
			for (var i=0;i<json.length;i++)
			{
				var factureDTO = new DMS.Mobile.Facture();
			
				factureDTO.FactureID = json[i].FactureID ;
				factureDTO.CAB = json[i].CAB;
				factureDTO.EtatFacture = json[i].EtatFacture ;
				factureDTO.ResteAPayer = json[i].ResteAPayer;
			//	factureDTO.CommentairesID = json[i].CommentairesID ;
				factureDTO.MissionID = json[i].MissionID;
				factureDTO.MontantNet = json[i].MontantNet ;
				factureDTO.TauxEscompte = json[i].TauxEscompte;
			//	factureDTO.Commentaires = json[i].Commentaires;
				factureDTO.InternalCodeFacture = json[i].InternalCodeFacture;
				var dFacture = DMS.Mobile.Common.ParseDateJson(json[i].DateFacture);			
				factureDTO.DateFacture = dFacture;
				
				
			
				form.insertFacture(factureDTO,synch,form,len,callbackViewModel);
			}
			
		}
		else{callbackViewModel(form.ListFacture);}	
	
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : createFactureDTO in FactureRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FactureRequest";
						exception.FonctionE = "createFactureDTO";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.ListFacture);
						});
		}
	},
	
	//////////////////////////////////////////// insertion local ///////////////////////////
	
insertFacture : function (facture,synch,form,len,callbackViewModel)
		{
			try
			{
			form.InsertFactureIntoLOCAL(facture,synch,form,len,callbackViewModel);
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertFacture in FactureRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FactureRequest";
						exception.FonctionE = "insertFacture";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.ListFacture);
						});
		}
		},
		
InsertFacture: function(facture){
			var form = this;
			try
			{
						
			       	this.InsertFactureIntoLOCAL(facture,"false",form,null,null);
  		}
			catch(err)
		{
					var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FactureRequest";
						exception.FonctionE = "InsertFacture";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								DMS.Mobile.Notification.ShowMessage(err.message+" : InsertFacture in FactureRequest",'alert','e'); 
						});
			
		}
    },
	
InsertFactureIntoLOCAL: function(FactureObject,synch,formReq,len,callbackViewModel) 
	 {
		try
		{
			if (synch == "false")
			{
				formReq.connexion.transaction(function(tx){ formReq.InsertIntoFacture(tx, formReq,FactureObject,synch); }, function(err){ 
				          	var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FactureRequest";
						exception.FonctionE = "InsertIntoFacture";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							DMS.Mobile.Common.errors(err,"InsertIntoFacture");}); 
						});
				
				
		    }
			else
			{
				formReq.connexion.transaction(function(tx){ formReq.InsertIntoFacture(tx, formReq,FactureObject,synch); }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoFacture");
				
				        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FactureRequest";
						exception.FonctionE = "InsertIntoFacture";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.ListFacture);
						});
				
				},function(){
							
						formReq.insertFactureIntoArray(FactureObject,formReq,len,callbackViewModel)	;		
							}); 
							//formReq.insertMissionIntoArray(MissionObject,formReq,len,callbackViewModel)	;
			}
		 		}
			catch(err)
		{
			  var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FactureRequest";
						exception.FonctionE = "InsertFactureIntoLOCAL";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								DMS.Mobile.Notification.ShowMessage(err.message+" : InsertFactureIntoLOCAL in FactureRequest",'alert','e'); 
						});
			
		}
	},
	
		InsertIntoFacture : function(requete,form,FactureObject,synch) {
   try
   {
			requete.executeSql('INSERT INTO Facture(FactureID,CAB,EtatFacture,ResteAPayer,DateFacture,MissionID,MontantNet,TauxEscompte,Synch,InternalCodeFacture) VALUES( '+FactureObject.FactureID+',"'+FactureObject.CAB+'",'+FactureObject.EtatFacture+','+FactureObject.ResteAPayer+',"'+FactureObject.DateFacture+'",'+FactureObject.MissionID+','+FactureObject.MontantNet+','+FactureObject.TauxEscompte+',"'+synch+'",'+FactureObject.InternalCodeFacture+')');
			}
			catch(err)
		{
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FactureRequest";
						exception.FonctionE = "InsertIntoFacture";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoFacture in FactureRequest",'alert','e'); 
						});
			
		}		    																																
    },
	
	///////////////////////////////////////////////////////////////////////////////
	
	insertFactureIntoArray : function(Facture,form,len,callbackViewModel)
	{
		try
		{
		
		form.ListFacture.push(Facture);
		if (form.ListFacture.length == len)
		{
			callbackViewModel(form.ListFacture);
		}
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertFactureIntoArray in FactureRequest",'alert','e'); 
			   var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FactureRequest";
						exception.FonctionE = "insertFactureIntoArray";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.ListFacture);
						});
		}
	}	,
	///******************************  select all facture not synchronize ************//
	SelectAllFactureNotSynchro : function(callback)
	{
		var form = this;
	    try
	    {
		
		this.connexion.transaction(function(tx){ form.SelectFactureNotSynch(tx, form,callback); }, function(err){ DMS.Mobile.Common.errors(err,"SelectFactureNotSynch");
		    
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FactureRequest";
						exception.FonctionE = "SelectFactureNotSynch";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(form.ListFacture);
						});
		
		});
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllFactureNotSynchro in FactureRequest",'alert','e'); 
				   var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FactureRequest";
						exception.FonctionE = "SelectAllFactureNotSynchro";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(form.ListFacture);
						});
			}
	},
	
	SelectFactureNotSynch : function(requete, form,callback)
	{
		try
		{
					requete.executeSql("SELECT * FROM Facture WHERE Synch =?", ["false"], function(tx, results) {form.querySuccessFactureNotSynch(tx,results,form,callback);});
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFactureNotSynch in FactureRequest",'alert','e'); 
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FactureRequest";
						exception.FonctionE = "SelectFactureNotSynch";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(form.ListFacture);
						});
		}
	},
	
	querySuccessFactureNotSynch : function(tx,results,form,callback)
	{
		  try
	{
		form.ListFacture = [];
		var len = results.rows.length;
		if (len>0){
			for (var i=0; i<len; i++){
				
				var oFacture = new DMS.Mobile.Facture();	
				
				oFacture.FactureID = results.rows.item(i).FactureID ;
				oFacture.CAB = results.rows.item(i).CAB;
				oFacture.EtatFacture = results.rows.item(i).EtatFacture ;
				oFacture.ResteAPayer = results.rows.item(i).ResteAPayer;
				//oFacture.CommentairesID = results.rows.item(i).CommentairesID ;
				oFacture.MissionID = results.rows.item(i).MissionID;
				oFacture.MontantNet = results.rows.item(i).MontantNet ;
				oFacture.TauxEscompte = results.rows.item(i).TauxEscompte;
				//oFacture.Commentaires = results.rows.item(i).Commentaires;			
				oFacture.DateFacture = results.rows.item(i).DateFacture;
				oFacture.InternalCodeFacture = results.rows.item(i).InternalCodeFacture;
				
				
				form.insertFactureIntoFactureList(oFacture, form,len,callback);
			}
		  }
		  else
		  {
			  //alert"callback all tourne : ligne cmd vide");
			  callback(form.ListFacture);
		  }
		  	
	}
	catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessFactureNotSynch in FactureRequest",'alert','e'); 
				
					var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FactureRequest";
						exception.FonctionE = "querySuccessFactureNotSynch";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(form.ListFacture);
						});
			}
	},
	
	insertFactureIntoFactureList : function(oFacture, form,len,callback)
	{
		try
		{
			form.ListFacture.push(oFacture)
			if(form.ListFacture.length == len)
			{
				callback(form.ListFacture);
			}
		}
		catch(err)
		{ 
		              var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FactureRequest";
						exception.FonctionE = "insertFactureIntoFactureList";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(form.ListFacture);
						});
		}
	},
	
	///****************************** select all facture by MissionID (for mission) *********//
SelectAllFactureByMission : function (Mission , callback)
	{
		var form = this;
	try
	{
		
		this.connexion.transaction(function(tx){ form.SelectAllFactureForMission(tx, form,callback,Mission); }, function(err){ DMS.Mobile.Common.errors(err,"SelectAllFactureForMission");
		
		            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FactureRequest";
						exception.FonctionE = "SelectAllFactureForMission";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(Mission);
						});
		
		});
	}
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllFactureByMission in FactureRequest",'alert','e'); 
		 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FactureRequest";
						exception.FonctionE = "SelectAllFactureByMission";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(Mission);
						});
		
	}
	},
	
	SelectAllFactureForMission : function(requete, form,callback,Mission)
	{
		try
	{
	   			requete.executeSql("SELECT * FROM Facture WHERE MissionID =?", [Mission.MissionID], function(tx, results) {form.querySuccessAllFactureForMission(tx,results,form,callback,Mission);});
    }
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllFactureForMission in FactureRequest",'alert','e'); 
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FactureRequest";
						exception.FonctionE = "SelectAllFactureForMission";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(Mission);
						});
		
	}
	},
	
	querySuccessAllFactureForMission : function(requete,results,form,callback,Mission)
	{
		try
	{
		form.ListFacture = [];
		var len = results.rows.length;
		if (len>0){
			for (var i=0; i<len; i++){
				
				var oFacture = new DMS.Mobile.Facture();	
				
				oFacture.FactureID = results.rows.item(i).FactureID ;
				oFacture.CAB = results.rows.item(i).CAB;
				oFacture.EtatFacture = results.rows.item(i).EtatFacture ;
				oFacture.ResteAPayer = results.rows.item(i).ResteAPayer;
				//oFacture.CommentairesID = results.rows.item(i).CommentairesID ;
				oFacture.MissionID = results.rows.item(i).MissionID;
				oFacture.MontantNet = results.rows.item(i).MontantNet ;
				oFacture.TauxEscompte = results.rows.item(i).TauxEscompte;
				//oFacture.Commentaires = results.rows.item(i).Commentaires;			
				oFacture.DateFacture = results.rows.item(i).DateFacture;
				oFacture.InternalCodeFacture = results.rows.item(i).InternalCodeFacture;
				
				
				form.insertFactureIntoMission(oFacture, Mission, form,len,callback);
			}
		  }
		  else
		  {
			  //alert"callback all tourne : ligne cmd vide");
			  callback(Mission);
		  }
	}
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessAllFactureForMission in FactureRequest",'alert','e'); 
		
		var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FactureRequest";
						exception.FonctionE = "querySuccessAllFactureForMission";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(Mission);
						});
	}
	}	,
	
	
	insertFactureIntoMission : function(Facture, Mission, form,len,callbackViewModel)
	{
		try
		{
		
		Mission.ListFacture.push(Facture);
		if (Mission.ListFacture.length == len)
		{
			callbackViewModel(Mission);
		}
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertFactureIntoMission in FactureRequest",'alert','e'); 
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FactureRequest";
						exception.FonctionE = "insertFactureIntoMission";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(Mission);
						});
			
		}
	}	,
	
	
	
	////**************************************************************************//
	
	
	////****************************** UpdateSynchFacture **************************///
	
	UpdateSynchFacture : function(callback)
	{
		var form = this;	
		try
		{	 
			var form = this;	
			this.connexion.transaction(function(tx){ form.UpdateFactureNotSynch(tx, form,callback) }, function(err){ DMS.Mobile.Common.errors(err,"UpdateFactureNotSynch");
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FactureRequest";
						exception.FonctionE = "UpdateFactureNotSynch";
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
			DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateSynchFacture in FactureRequest",'alert','e');
			
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FactureRequest";
						exception.FonctionE = "UpdateSynchFacture";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback();
						}); 
		}
	},
	
	UpdateFactureNotSynch : function(requete, form,callback) {
		try
		{
				requete.executeSql('UPDATE Facture SET Synch= ? WHERE Synch = ?', ["true","false"], function(tx, results) {form.querySuccessUpdateSynch(tx,results,form,callback);});
		 		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateFactreNotSynch in FactureRequest",'alert','e'); 
		
		        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FactureRequest";
						exception.FonctionE = "UpdateFactreNotSynch";
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
		
	/////////////////////////////////////// SELECT FROM LOCAL ////////////////////////////
	SelectAllFactureByMissionID : function (Mission , callback)
	{
		var form = this;
			try
	{
		
		this.connexion.transaction(function(tx){ form.SelectAllFacture(tx, form,callback,Mission); }, function(err){ DMS.Mobile.Common.errors(err,"SelectAllFacture");
		
		      
			   var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FactureRequest";
						exception.FonctionE = "SelectAllFacture";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(form.ListFacture);
						}); 
		
		});
	}
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllFactureByMissionID in FactureRequest",'alert','e'); 
		
		  var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FactureRequest";
						exception.FonctionE = "SelectAllFactureByMissionID";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(form.ListFacture);
						}); 
	}
	},
	
	SelectAllFacture : function(requete, form,callback,Mission)
	{
		try
	{
	   			requete.executeSql("SELECT * FROM Facture WHERE MissionID =?", [Mission.MissionID], function(tx, results) {form.querySuccessAllFacture(tx,results,form,callback);});
    }
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllFacture in FactureRequest",'alert','e'); 
		
		 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FactureRequest";
						exception.FonctionE = "SelectAllFacture";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(form.ListFacture);
						}); 
	}
	},
	
	querySuccessAllFacture : function(requete,results,form,callback)
	{
		try
	{
		form.ListFacture = [];
		var len = results.rows.length;
		if (len>0){
			for (var i=0; i<len; i++){
				
				var oFacture = new DMS.Mobile.Facture();	
				
				oFacture.FactureID = results.rows.item(i).FactureID ;
				oFacture.CAB = results.rows.item(i).CAB;
				oFacture.EtatFacture = results.rows.item(i).EtatFacture ;
				oFacture.ResteAPayer = results.rows.item(i).ResteAPayer;
			//	oFacture.CommentairesID = results.rows.item(i).CommentairesID ;
				oFacture.MissionID = results.rows.item(i).MissionID;
				oFacture.MontantNet = results.rows.item(i).MontantNet ;
				oFacture.TauxEscompte = results.rows.item(i).TauxEscompte;
			//	oFacture.Commentaires = results.rows.item(i).Commentaires;			
				oFacture.DateFacture = results.rows.item(i).DateFacture;
				oFacture.InternalCodeFacture = results.rows.item(i).InternalCodeFacture;
				
				
				form.insertFactureIntoArray(oFacture, form,len,callback);
			}
		  }
		  else
		  {
			  //alert"callback all tourne : ligne cmd vide");
			  callback(form.ListFacture);
		  }
	}
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessAllFacture in FactureRequest",'alert','e'); 
	    
		 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FactureRequest";
						exception.FonctionE = "querySuccessAllFacture";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(form.ListFacture);
						}); 
	
	
	}
	}	,
	
	
	//////////////////////////////// UPDATE FROM LOCAL ///////////////////////////////////////
	UpdateEtatFacture : function(factureID,montantSaisie,ResteAPayer,callback)
	{
		var form = this;
		try
		{	 
				
			this.connexion.transaction(function(tx){ 
			           form.UpdateFacture(tx, form,factureID,montantSaisie,ResteAPayer,callback) ;
			}, function(err){ DMS.Mobile.Common.errors(err,"UpdateFacture");
			
			        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FactureRequest";
						exception.FonctionE = "UpdateFacture";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(0);
						}); 
			
			});
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateEtatFacture in FactureRequest",'alert','e'); 
		
		       var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FactureRequest";
						exception.FonctionE = "UpdateEtatFacture";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(0);
						}); 
		}

	},
	
UpdateFacture : function(requete, form,factureID,mSaisie,RAPayer,callback)
	 {  try
		{
			var montantSaisie = mSaisie.toFixed(3);
			var ResteAPayer = RAPayer.toFixed(3);
				requete.executeSql(' UPDATE Facture SET Synch= ? WHERE FactureID = ?', ["false",factureID]);
				
				var reglee = DMS.Mobile.Constante.EtatFacture.Reglee;
				
				if(montantSaisie == ResteAPayer)
				{
				  requete.executeSql(' UPDATE Facture SET ResteAPayer= ? WHERE FactureID = ?', [0,factureID]);
				  requete.executeSql(' UPDATE Facture SET EtatFacture= ? WHERE FactureID = ?', [reglee,factureID], function(tx, results) {form.querySuccessUpdateFacture(callback,0);});
				}
				else
				{
					var reste = ResteAPayer - montantSaisie;
					requete.executeSql(' UPDATE Facture SET ResteAPayer= ? WHERE FactureID = ?', [reste,factureID], function(tx, results) {form.querySuccessUpdateFacture(callback,reste);});
				}
				
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateFacture in FactureRequest",'alert','e'); 
			
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FactureRequest";
						exception.FonctionE = "UpdateFacture";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(0);
						}); 
		}
	}  ,
		
		
		
		querySuccessUpdateFacture : function(callback,reste)
		{
			callback(reste);
		},
	
	
	
	////////////////////////////////// DELETE FROM LOCAL ////////////////////////////////////
	DeleteAllFacture : function(callback)
	{
		var form = this;
			try
			{
						
					this.connexion.transaction(function(tx){ form.DeleteFactures(tx, form,callback);}, function(err){ DMS.Mobile.Common.errors(err,"DeleteFactures");
					
					    var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FactureRequest";
						exception.FonctionE = "DeleteFactures";
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
					DMS.Mobile.Notification.ShowMessage(err.message+" : DeleteAllFacture in FactureRequest",'alert','e'); 
					
					    var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FactureRequest";
						exception.FonctionE = "DeleteAllFacture";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback();
						});
			 }	
	},
	
	DeleteFactures : function(requete, form,callback)
	{
		requete.executeSql("DELETE  FROM Facture ", [],
              function(tx, result) {				
				form.querySuccessDELETEAll(form,callback);
				}, 
                function(err){DMS.Mobile.Common.errors(err,"DeleteFactures");
				
				        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FactureRequest";
						exception.FonctionE = "DeleteFactures";
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
}