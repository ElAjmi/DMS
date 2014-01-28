  if (typeof (DMS) == 'undefined') DMS = {};
	if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};
	
	
	
	DMS.Mobile.ActiviteRequest = {};
	
	DMS.Mobile.ActiviteRequest = 
	{
		connexion: null,
		ListActivite : [],
		
		
		insertActiviteIntoArray : function(activite,form,len,callbackViewModel)
		{
			try
			{
				form.ListActivite.push(activite);
				if(form.ListActivite.length == len)
				{
					callbackViewModel(form.ListActivite);
				}
		    }
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : insertActiviteIntoArray in ActiviteRequest",'alert','e'); 
				
				var exception = new DMS.Mobile.Exception();
				
				exception.FichierE = "ActiviteRequest";
				exception.FonctionE = "insertActiviteIntoArray";
				exception.Exception = err.message;
				exception.Synch = "false";
				
				DMS.Mobile.Common.connexion = form.connexion;
				DMS.Mobile.Common.InsertException(exception,function(){
				           callbackViewModel(form.ListActivite);
				});
			}
		},

		////////////////////////////////////////Serveur ////////////////////////
	
	SelectActiviteByPersonnelFromServer :function(callbackViewModel,PersonnelID)
	{
		var form = this;
		try
		{
		 var Conf = JSON.parse(localStorage.getItem("Configuration"));
		 	
		 
         var Data = "PersonnelID="+PersonnelID; 
		 var methode = "GetListActiviteDTOByPersonnelID?";
		 var URL = Conf.URL+methode+Data;
		 
	 DMS.Mobile.Common.CallService(function(JsonObject,Form){form.createActiviteDTO(JsonObject,Form,callbackViewModel);},URL,form);
	 	}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectActivitebyPersonnelFromServer in ActiviteRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
				
				exception.FichierE = "ActiviteRequest";
				exception.FonctionE = "SelectActivitebyPersonnelFromServer";
				exception.Exception = err.message;
				exception.Synch = "false";
				
				DMS.Mobile.Common.connexion = form.connexion;
				DMS.Mobile.Common.InsertException(exception,function(){
				           callbackViewModel(null);
				});
		}
			
	},
	
	createActiviteDTO : function(json,form,callbackViewModel)
	{
		try
		{
			var len = json.length;
			if ( len>0)
			{
				var synch = "true";
				
				
				for (var i=0;i<json.length;i++)
				{
				   var activiteDTO = new DMS.Mobile.Activite();
				   activiteDTO.ActiviteID = json[i].ActiviteID;
				   activiteDTO.Designation =json[i].Description;
				   activiteDTO.listClient =json[i].Client;
				   
				   form.InsertActivite(activiteDTO,synch,form,len,callbackViewModel);
				
				}
			}
			
			else
			{
				callbackViewModel(form.ListActivite);
			}
				}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : createActiviteDTO in ActiviteRequest",'alert','e'); 
		   
		    var exception = new DMS.Mobile.Exception();
				
				exception.FichierE = "ActiviteRequest";
				exception.FonctionE = "createActiviteDTO";
				exception.Exception = err.message;
				exception.Synch = "false";
				
				DMS.Mobile.Common.connexion = form.connexion;
				DMS.Mobile.Common.InsertException(exception,function(){
				           callbackViewModel(form.ListActivite);
				});
		}
	},
	
	//////////////////////////////////////////////////////////////////
	
/////////////////////////////Insertion LOCAL /////////////////////////////////////

InsertActivite : function(activite,synch,form,len,callbackViewModel)
{
	try
	{
	form.InsertActiviteIntoLOCAL(activite,synch,form,len,callbackViewModel);
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertActivite in ActiviteRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
				
				exception.FichierE = "ActiviteRequest";
				exception.FonctionE = "InsertActivite";
				exception.Exception = err.message;
				exception.Synch = "false";
				
				DMS.Mobile.Common.connexion = form.connexion;
				DMS.Mobile.Common.InsertException(exception,function(){
				           callbackViewModel(form.ListActivite);
				});
		}
},

insertActivite : function(activite)
{
	var form = this;
	try
	{	
		this.InsertActiviteIntoLOCAL(activite,"false",form,null,null);
	}
	catch(err)
	{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertActivite in ActiviteRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
				
				exception.FichierE = "ActiviteRequest";
				exception.FonctionE = "insertActivite";
				exception.Exception = err.message;
				exception.Synch = "false";
				
				DMS.Mobile.Common.connexion = form.connexion;
				DMS.Mobile.Common.InsertException(exception,function(){
				           callbackViewModel(form.ListActivite);
				});
	}
},

InsertActiviteIntoLOCAL : function (activiteObject,synch,formReq,len,callbackViewModel)
{
	try
	{
	  	if (synch == "false")
			{
		  	    formReq.connexion.transaction(function(tx){ formReq.InsertIntoActivite(tx, formReq, activiteObject,synch) }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoActivite");}); 
		    }
			else
			{
				formReq.connexion.transaction(function(tx){ formReq.InsertIntoActivite(tx, formReq,activiteObject,synch); }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoActivite");},function(){
							
						formReq.insertActiviteIntoArray(activiteObject,formReq,len,callbackViewModel)	;		
							}); 
			}	
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertActiviteIntoLOCAL in ActiviteRequest",'alert','e'); 
		   var exception = new DMS.Mobile.Exception();
				
				exception.FichierE = "ActiviteRequest";
				exception.FonctionE = "InsertActiviteIntoLOCAL";
				exception.Exception = err.message;
				exception.Synch = "false";
				
				DMS.Mobile.Common.connexion = formReq.connexion;
				DMS.Mobile.Common.InsertException(exception,function(){
				           callbackViewModel(formReq.ListActivite);
				});
		}
},

InsertIntoActivite : function(requete,form,activiteObject,synch)
{
	try
	{
		requete.executeSql('INSERT INTO Activite (ActiviteID,Designation,Synch)VALUES('+activiteObject.ActiviteID+',"'+activiteObject.Designation+'","'+synch+'")');
	}
	catch(err)
	{
			
	
	      var exception = new DMS.Mobile.Exception();
				
				exception.FichierE = "ActiviteRequest";
				exception.FonctionE = "InsertIntoActivite";
				exception.Exception = err.message;
				exception.Synch = "false";
				
				DMS.Mobile.Common.connexion = formReq.connexion;
				DMS.Mobile.Common.InsertException(exception,function(){
				           DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoActivite in ActiviteRequest",'alert','e'); 
				});
	}
},


//////////////////////////////////////////////////////////////////////////

//////////////////////////////Select FROM Local //////////////////////////////
	SelectActivite: function (callback,client) {
try
{
	  var form = this;
	  this.connexion.transaction(function(tx){ form.SelectFromActiviteByID(tx, form,callback,client); }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromActiviteByID");
	  
	                var exception = new DMS.Mobile.Exception();
				
					exception.FichierE = "ActiviteRequest";
					exception.FonctionE = "SelectFromActiviteByID";
					exception.Exception = err.message;
					exception.Synch = "false";
					
					DMS.Mobile.Common.connexion = formReq.connexion;
					DMS.Mobile.Common.InsertException(exception,function(){
							   callback(client);
					});
	  });
	  	}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectActivite in ActiviteRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
				
				exception.FichierE = "ActiviteRequest";
				exception.FonctionE = "SelectActivite";
				exception.Exception = err.message;
				exception.Synch = "false";
				
				DMS.Mobile.Common.connexion = formReq.connexion;
				DMS.Mobile.Common.InsertException(exception,function(){
				           callback(client);
				});
		}
  },
    
     SelectFromActiviteByID : function(requete,form,callback,client) {
   try
   {
   			requete.executeSql("SELECT * FROM Activite WHERE ActiviteID = ?", [client.ActiviteID], function(tx, results) {form.querySuccessByClient(tx,results,form,callback,client);});
       
}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromActiviteByID in ActiviteRequest",'alert','e'); 
			var exception = new DMS.Mobile.Exception();
				
				exception.FichierE = "ActiviteRequest";
				exception.FonctionE = "SelectFromActiviteByID";
				exception.Exception = err.message;
				exception.Synch = "false";
				
				DMS.Mobile.Common.connexion = formReq.connexion;
				DMS.Mobile.Common.InsertException(exception,function(){
				           callback(client);
				});
		}
    },
    
    querySuccessByClient:function (requete, results,form,callback,client) {
	try
	{
		var len = results.rows.length;
			if(len>0){
			var oActivite = new DMS.Mobile.Activite();	
			oActivite.ActiviteID = results.rows.item(0).ActiviteID;
			oActivite.Designation = results.rows.item(0).Designation;

			client.Activite = oActivite;
			}
			callback(client);
			
			
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessByClient in ActiviteRequest",'alert','e'); 
			var exception = new DMS.Mobile.Exception();
				
				exception.FichierE = "ActiviteRequest";
				exception.FonctionE = "querySuccessByClient";
				exception.Exception = err.message;
				exception.Synch = "false";
				
				DMS.Mobile.Common.connexion = form.connexion;
				DMS.Mobile.Common.InsertException(exception,function(){
				           callback(client);
				});
		}
        						
	},

//////////////////////////////////////// Delete All Activite ////////////////////////
DeleteAllActivite : function(callback)
{
	var form = this;
	try
	{	
			this.connexion.transaction(function(tx){ form.DeleteActivites(tx, form,callback);}, function(err){ 
			      DMS.Mobile.Common.errors(err,"DeleteAllActivite");
				      
					  var exception = new DMS.Mobile.Exception();
				
						exception.FichierE = "ActiviteRequest";
						exception.FonctionE = "DeleteActivites";
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
			DMS.Mobile.Notification.ShowMessage(err.message+" : DeleteAllActivite in ActiviteRequest",'alert','e'); 
		
			var exception = new DMS.Mobile.Exception();
				
				exception.FichierE = "ActiviteRequest";
				exception.FonctionE = "DeleteAllActivite";
				exception.Exception = err.message;
				exception.Synch = "false";
				
				DMS.Mobile.Common.connexion = form.connexion;
				DMS.Mobile.Common.InsertException(exception,function(){
				           callback();
				});
	 }	
}, 

DeleteActivites : function(requete, form,callback)
{
	
	requete.executeSql("DELETE  FROM Activite ", [],
              function(tx, result) {				
				form.querySuccessDELETEAll(form,callback);
				}, 
                function(err){
					DMS.Mobile.Common.errors(err,"DeleteActivites");
					
     				    var exception = new DMS.Mobile.Exception();
				
						exception.FichierE = "ActiviteRequest";
						exception.FonctionE = "DeleteActivites";
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
//////////////////////////////////////////////////////////////////////////
	
}