  if (typeof (DMS) == 'undefined') DMS = {};
	if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};
	
	
	
	DMS.Mobile.TourneeRequest = {};
	
	DMS.Mobile.TourneeRequest = 
	{
	
		TourneeListID :[],
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
				
				   var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneeRequest";
						exception.FonctionE = "insertTourneeIntoArray";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.TourneeList);
						});
			}
		},
		
		
	///////////////////////////////////////////////////Serveur ////////////////////////////////////////
	
	SelectTourneeByPersonnalFromServer : function(callbackViewModel,PersonnelID)
	{
		try
		{
		var Conf = JSON.parse(localStorage.getItem("Configuration"));
		
		var form = this;
		var Data = "PersonnelID="+PersonnelID; 	  
		var methode= "GetListTourneeDTOByPersonnelID?";
		var URL = Conf.URL+methode+Data;
	    DMS.Mobile.Common.CallService(function(JsonObject,Form){form.createTourneeDTO(JsonObject,Form,callbackViewModel);},URL,form);
		
		}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectTourneeByPersonnelFromServer in TourneeRequest",'alert','e'); 
				
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneeRequest";
						exception.FonctionE = "SelectTourneeByPersonnelFromServer";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.TourneeList);
						});
			}
	},
	
	createTourneeDTO : function(json,form,callbackViewModel)
	{
		try
		{
			var len =json.length;
		if ( len>0)
		{
			var synch = "true";
			
			for (var i=0;i<json.length;i++)
			{
				var tourneeDTO = new DMS.Mobile.Tournee();
				
				tourneeDTO.TourneeID = json[i].TourneeID;
			//alert"date debut = "+json[i].DateDebut);
				var dDebut = DMS.Mobile.Common.ParseDateJson(json[i].DateDebut);
				tourneeDTO.DateDebut = dDebut;
				var hDebut = DMS.Mobile.Common.ParseHeureJson(json[i].DateDebut);	
				tourneeDTO.HeureDebut = hDebut;
	//alert"date debut = "+json[i].DateCloture);
                var dFin = DMS.Mobile.Common.ParseDateJson(json[i].DateCloture);
				tourneeDTO.DateFin =  dFin;
				var hFin = DMS.Mobile.Common.ParseHeureJson(json[i].DateCloture);	
				tourneeDTO.HeureFin = hFin;
				//alert"date debut = "+json[i].DateCreation);
				var dCreation = DMS.Mobile.Common.ParseDateJson(json[i].DateCreation);
				tourneeDTO.DateCreation = dCreation;
				var hCreation = DMS.Mobile.Common.ParseHeureJson(json[i].DateCreation);	
				tourneeDTO.HeureCreation = hCreation;
				
				tourneeDTO.EtatTournee = json[i].EtatTournee;
								
				tourneeDTO.VehiculeID = json[i].VehiculeID
				tourneeDTO.PersonnelID = json[i].PersonneID;
				tourneeDTO.PointVentes = json[i].PointVentes;
				tourneeDTO.ListPointVentes = json[i].Positions;
				
			form.InsertTournee(tourneeDTO,synch,form,len,callbackViewModel);							

			}
			
		}
		else{callbackViewModel(form.TourneeList);}	
		
		}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : ceateTourneeDTO in TourneeRequest",'alert','e'); 
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneeRequest";
						exception.FonctionE = "ceateTourneeDTO";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.TourneeList);
						});
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
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneeRequest";
						exception.FonctionE = "InsertTournee";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.TourneeList);
						});
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
				
				        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneeRequest";
						exception.FonctionE = "insertTournee";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							DMS.Mobile.Notification.ShowMessage(err.message+" : insertTournee in TourneeRequest",'alert','e'); 
						});
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
				
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneeRequest";
						exception.FonctionE = "InsertTourneeIntoLOCAL";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.TourneeList);
						});
			}						
    },

 
   
   InsertIntoTournee : function(requete,form,TourneeObject,synch) {
   try
   {
			requete.executeSql('INSERT INTO Tournees (TourneeID,DateDebut,DateCloture,DateCreation,HeureDebut,HeureCloture,HeureCreation,EtatTournee,Synch,VehiculeID,PersonnelID) VALUES('+TourneeObject.TourneeID+',"'+TourneeObject.DateDebut+'","'+TourneeObject.DateCloture+'","'+TourneeObject.DateCreation+'","'+TourneeObject.HeureDebut+'","'+TourneeObject.HeureCloture+'","'+TourneeObject.HeureCreation+'",'+TourneeObject.EtatTournee+',"'+synch+'",'+TourneeObject.VehiculeID+','+TourneeObject.PersonnelID+')');
		}
			catch(err)
			{
				
				        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneeRequest";
						exception.FonctionE = "InsertIntoTournee";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoTournee in TourneeRequest",'alert','e'); 
						});
			}	      																																
},
	
	///////////////////////////////////////////////////////////////////////////////////////////////////
		
//////////////////////////////////////////////////////////Slection from Local /////////////////

              ///////////////////// select tourne by ID ////////////
SelectTourneeByID : function(tourneeID, callback)
{
	try
    {
		    var form = this;	
			this.connexion.transaction(function(tx){ form.SelectFromTourneeByID(tx, form,tourneeID,callback); }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromTourneeByID");
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneeRequest";
						exception.FonctionE = "SelectFromTourneeByID";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(null);
						});
			
			});
    }
	catch (err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : SelectTourneeByID in TourneeRequest",'alert','e'); 
	
	                    var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneeRequest";
						exception.FonctionE = "SelectTourneeByID";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(null);
						});
	}
},		

SelectFromTourneeByID : function(requete, form,tourneeID, callback)
{
		try
			{
					requete.executeSql("SELECT * FROM Tournees WHERE TourneeID =?", [tourneeID], function(tx, results) {form.querySuccessTourneeByID(tx,results,form,callback);});
		   }
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromTourneeByID in TourneeRequest",'alert','e'); 
				
				        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneeRequest";
						exception.FonctionE = "SelectFromTourneeByID";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(null);
						});
			}
},	  

querySuccessTourneeByID : function(requete,results,form,callback)
{
	try
	{
			var oTournee = new DMS.Mobile.Tournee();
			if(results != null){
			
				
				oTournee.ListPointVentes = [];	
				oTournee.TourneeID = results.rows.item(0).TourneeID;
				oTournee.DateDebut = results.rows.item(0).DateDebut;
				oTournee.DateFin = results.rows.item(0).DateFin;
				oTournee.DateCreation = results.rows.item(0).DateCreation;
				oTournee.EtatTournee = results.rows.item(0).EtatTournee;
				oTournee.EquipementID = results.rows.item(0).EquipementID;
				oTournee.VehiculeID = results.rows.item(0).VehiculeID;
				oTournee.PersonnelID = results.rows.item(0).PersonnelID;
				
				
		DMS.Mobile.PointVenteRequest.connexion = form.connexion;
		DMS.Mobile.PointVenteRequest.SelectPointVente(function(tournee){
			callback(tournee);
			},oTournee);							
				
				
			}else
			{callback(oTournee);}
				}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessTourneeByID in TourneeRequest",'alert','e'); 
				        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneeRequest";
						exception.FonctionE = "querySuccessTourneeByID";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(null);
						});
			}
},


///////////////////// select all /////////////////////////////

SelectAll: function (callback) {
		try
		{	
		 
	 
			var form = this;	
			this.connexion.transaction(function(tx){ form.SelectFromTournee(tx, form,callback) ;}, function(err){ DMS.Mobile.Common.errors(err,"SelectFromTournee");});
			
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAll in TourneeRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneeRequest";
						exception.FonctionE = "SelectAll";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.TourneeList);
						});
			
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
				
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneeRequest";
						exception.FonctionE = "SelectFromTournee";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.TourneeList);
						});
			}
		},
		
		
		querySuccess:function (requete, results,form,callback) {
			try
			{
				
			var len = results.rows.length;
			if(len>0){
			for (var i=0;i<len;i++){
				var oTournee = new DMS.Mobile.Tournee();
				oTournee.ListPointVentes = [];	
				oTournee.TourneeID = results.rows.item(i).TourneeID;
				oTournee.DateDebut = results.rows.item(i).DateDebut;
				oTournee.DateFin = results.rows.item(i).DateFin;
				oTournee.DateCreation = results.rows.item(i).DateCreation;
				oTournee.EtatTournee = results.rows.item(i).EtatTournee;
				oTournee.TerminalID = results.rows.item(i).TerminalID;
				oTournee.ImpimanteID = results.rows.item(i).ImpimanteID;
				oTournee.EquipementID = results.rows.item(i).EquipementID;
				oTournee.VehiculeID = results.rows.item(i).VehiculeID;
				oTournee.PersonnelID = results.rows.item(i).PersonnelID;
				
				
		DMS.Mobile.PointVenteRequest.connexion = form.connexion;
		DMS.Mobile.PointVenteRequest.SelectPointVente(function(tournee){
			form.insertTourneeIntoTourneeList(tournee,form,len,callback);
			},oTournee);							
				
				}
			}else
			{callback(form.TourneeList);}
				}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccess in TourneeRequest",'alert','e'); 
				        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneeRequest";
						exception.FonctionE = "querySuccess";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.TourneeList);
						});
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
				 
				        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneeRequest";
						exception.FonctionE = "insertTourneeIntoTourneeList";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.TourneeList);
						});
			}
		},
/////----------------------- select all tournee not synchronize ----------------------------------//////////	
SelectAllTourneeNotSynchro : function(callback)
{
	//alert"SelectAllTourneeNotSynchro");
	try
	{
		this.TourneeList = [];
		var form = this;
		this.connexion.transaction(function(tx){ form.SelectAllTourneeNotSynch(tx, form,callback); }, function(err){ DMS.Mobile.Common.errors(err,"SelectAllTourneeNotSynch");
		
		         var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneeRequest";
						exception.FonctionE = "SelectAllTourneeNotSynch";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.TourneeList);
						});
		 
		
		});
	}
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllTourneeNotSynchro in TourneeRequest",'alert','e'); 
		
		                var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneeRequest";
						exception.FonctionE = "SelectAllTourneeNotSynchro";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.TourneeList);
						});
	}
},

SelectAllTourneeNotSynch : function(requete, form,callback)
{
	//alert"SelectAllTourneeNotSynch");
	try
    { 
   			requete.executeSql("SELECT * FROM Tournees WHERE Synch =?", ["false"], function(tx, results) {form.querySuccessAllTournee(tx,results,form,callback);});
    }
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllTourneeNotSynch in TourneeRequest",'alert','e'); 
		
		 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneeRequest";
						exception.FonctionE = "SelectAllTourneeNotSynch";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.TourneeList);
						});
	}
},

querySuccessAllTournee : function(requete,results,form,callback)
{
	//alert"querySuccessAllTournee");
		try
			{
			var len = results.rows.length;
			if(len>0)
			{
			for (var i=0;i<len;i++){
				var oTournee = new DMS.Mobile.Tournee();
								
				oTournee.ListPointVentes = [];	
				oTournee.TourneeID = results.rows.item(i).TourneeID;
				oTournee.DateDebut = results.rows.item(i).DateDebut;
				oTournee.HeureDebut = results.rows.item(i).HeureDebut;
				oTournee.DateCloture = results.rows.item(i).DateCloture;
				oTournee.HeureCloture = results.rows.item(i).HeureCloture;
				oTournee.DateCreation = results.rows.item(i).DateCreation;
				oTournee.HeureCreation = results.rows.item(i).HeureCreation;
				oTournee.EtatTournee = results.rows.item(i).EtatTournee;
				oTournee.TerminalID = results.rows.item(i).TerminalID;
				oTournee.ImpimanteID = results.rows.item(i).ImpimanteID;
				oTournee.EquipementID = results.rows.item(i).EquipementID;
				oTournee.VehiculeID = results.rows.item(i).VehiculeID;
				oTournee.PersonnelID = results.rows.item(i).PersonnelID;
				
				
				//DMS.Mobile.MissionRequest.connexion = form.connexion;
					//DMS.Mobile.MissionRequest.SelectAllMissionByTourneeID(oTournee,function(Tournee){
					DMS.Mobile.PointVenteRequest.connexion = from.connexion;
					DMS.Mobile.PointVenteRequest.SelectAllPointVenteByTourneeID(oTournee,function(Tournee){
					form.insertTourneeIntoTourneeList(Tournee,form,len,callback);
					
					});
			    }
			}
			else
			{
				//alert"all tournee list : vide");
				callback(form.TourneeList);}
		}
		catch(err){
			DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessAllTournee in TourneeRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneeRequest";
						exception.FonctionE = "querySuccessAllTournee";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.TourneeList);
						});
			}
},

	
	///////////////////////////////////////////////////////////////////////////////////////////////////
		
//////////////////////////////////////////////////////////Update In Local /////////////////

//------------------------ update etat tournee ------------------------------//
		UpdateTournee: function (Etat,TourneeID,callback) {
			try
			{ 
			//alert"update etat : " + Etat + " tourneeID : " + TourneeID);
			var form = this;	
			this.connexion.transaction(function(tx){ form.UpdateEtatTournee(tx, form,Etat,TourneeID,callback); }, function(err){ DMS.Mobile.Common.errors(err,"UpdateEtatTournee");
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneeRequest";
						exception.FonctionE = "UpdateEtatTournee";
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
				DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateTournee in TourneeRequest",'alert','e'); 
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneeRequest";
						exception.FonctionE = "UpdateTournee";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
			}
		},
		
		
		UpdateEtatTournee : function(requete,form,Etat,TourneeID,callback) {
			try
			{
				// etat du tournée cloturée
					var dateCloture = DMS.Mobile.Common.currentDate();
			        var heureCloture = DMS.Mobile.Common.currentHours();
			if(Etat == DMS.Mobile.Constante.EtatTournee.Cloturee)
			{
				requete.executeSql(' UPDATE Tournees SET DateCloture= ? WHERE TourneeID = ?', [dateCloture,TourneeID]);
				requete.executeSql(' UPDATE Tournees SET HeureCloture= ? WHERE TourneeID = ?', [heureCloture,TourneeID]);
			}  
				requete.executeSql(' UPDATE Tournees SET Synch= ? WHERE TourneeID = ?', ["false",TourneeID]);
				requete.executeSql(' UPDATE Tournees SET EtatTournee= ? WHERE TourneeID = ?', [Etat,TourneeID], function(tx, results) {form.querySuccessUpdate(tx,results,form,Etat,TourneeID,callback);});
		   }
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateEtatTournee in TourneeRequest",'alert','e'); 
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneeRequest";
						exception.FonctionE = "UpdateEtatTournee";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
			}
		},
		
		querySuccessUpdate :function (requete, results,form,Etat,TourneeID,callback) {
			//alert"update succes !")
			callback();
		},
///////---------------- update etat list tournee--------------------///

		UpdateListTournee: function (Etat,len,TourneeID,callback) {
			
			try
			{ 
			var form = this;	
			this.connexion.transaction(function(tx){ form.UpdateEtatListTournee(tx, form,Etat,len,TourneeID,callback) }, function(err){ DMS.Mobile.Common.errors(err,"UpdateEtatListTournee");
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneeRequest";
						exception.FonctionE = "UpdateEtatListTournee";
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
				DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateListTournee in TourneeRequest",'alert','e'); 
				
				        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneeRequest";
						exception.FonctionE = "UpdateListTournee";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
			}
		},
		
		
		UpdateEtatListTournee : function(requete,form,Etat,len,TourneeID,callback) {
			try
			{
				requete.executeSql(' UPDATE Tournees SET Synch= ? WHERE TourneeID = ?', ["false",TourneeID]);
				requete.executeSql(' UPDATE Tournees SET EtatTournee= ? WHERE TourneeID = ?', [Etat,TourneeID], function(tx, results) {form.querySuccessUpdateList(tx,results,form,Etat,len,TourneeID,callback);});
		   }
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateEtatListTournee in TourneeRequest",'alert','e'); 
				
				        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneeRequest";
						exception.FonctionE = "UpdateEtatListTournee";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
			}
		},
		
		querySuccessUpdateList :function (requete, results,form,Etat,len,TourneeID,callback) {
		try
		{	//alert("update succes !")
			form.TourneeListID.push(TourneeID);
			if(len == form.TourneeListID.length)
			{
			callback();
			}
		}
		catch(err)
		{
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneeRequest";
						exception.FonctionE = "querySuccessUpdateList";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
		}
		
		},
		
////-------------------- update synch des Tournees ( de non synchroniser ==> a synchroniser) -------------------//


		UpdateSynchTournee: function (callback) {
		try
		{	 
			var form = this;	
			this.connexion.transaction(function(tx){ form.UpdateTourneeNotSynch(tx, form,callback) }, function(err){ DMS.Mobile.Common.errors(err,"UpdateTourneeNotSynch");
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneeRequest";
						exception.FonctionE = "UpdateTourneeNotSynch";
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
			DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateSynchTournee in TourneeRequest",'alert','e'); 
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneeRequest";
						exception.FonctionE = "UpdateSynchTournee";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
		}
		},

	UpdateTourneeNotSynch : function(requete, form,callback) {
		try
		{
				requete.executeSql(' UPDATE Tournees SET Synch= ? WHERE Synch = ?', ["true","false"], function(tx, results) {form.querySuccessUpdateSynch(tx,results,form,callback);});
		 		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateTourneeNotSynch in TourneeRequest",'alert','e'); 
						var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneeRequest";
						exception.FonctionE = "UpdateTourneeNotSynch";
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


	 //////////////////////////////////////// Delete All Tournee ////////////////////////
DeleteAllTournee : function(callback)
{
	try
	{
			var form = this;	
			this.connexion.transaction(function(tx){ form.DeleteTournees(tx, form,callback);}, function(err){ DMS.Mobile.Common.errors(err,"DeleteTournees");
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneeRequest";
						exception.FonctionE = "DeleteTournees";
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
			DMS.Mobile.Notification.ShowMessage(err.message+" : DeleteAllTournee in TourneeRequest",'alert','e'); 
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneeRequest";
						exception.FonctionE = "DeleteAllTournee";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
	 }	
}, 

DeleteTournees : function(requete, form,callback)
{
	requete.executeSql("DELETE  FROM Tournees ", [],
              function(tx, result) {				
				form.querySuccessDELETEAll(form,callback);
				}, 
                function(err){DMS.Mobile.Common.errors(err,"DeleteTournees");
				
				        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "TourneeRequest";
						exception.FonctionE = "DeleteTournees";
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
	
		
		
///////////////////////////////////////////////////////////////////////////////////////		

	}