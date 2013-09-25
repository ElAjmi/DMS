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
		}
		},

		////////////////////////////////////////Serveur ////////////////////////
	
	SelectActiviteByPersonnelFromServer :function(callbackViewModel,PersonnelID)
	{
		try
		{
		 var Conf = JSON.parse(sessionStorage.getItem("Configuration"));
		 	
		 var form = this;
         var Data = "PersonnelID="+PersonnelID; 
		 var methode = "GetListActiviteDTOByPersonnelID?";
		 var URL = Conf.URL+methode+Data;
		 
	 DMS.Mobile.Common.CallService(function(JsonObject,Form){form.createActiviteDTO(JsonObject,Form,callbackViewModel);},URL,form);
	 	}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectActivitebyPersonnelFromServer in ActiviteRequest",'alert','e'); 
		}
			
	},
	
	createActiviteDTO : function(json,form,callbackViewModel)
	{
		try
		{
			if ( json != null)
			{
				var synch = "true";
				var len = json.length;
				
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
		}
},

insertActivite : function(activite)
{
	try
	{
	var form = this;	
		this.InsertActiviteIntoLOCAL(activite,"false",form,null,null);
			}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertActivite in ActiviteRequest",'alert','e'); 
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
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoActivite in ActiviteRequest",'alert','e'); 
		}
},


//////////////////////////////////////////////////////////////////////////

//////////////////////////////Select FROM Local //////////////////////////////
	SelectActivite: function (callback,client) {
try
{
	  var form = this;
	  this.connexion.transaction(function(tx){ form.SelectFromActiviteByID(tx, form,callback,client); }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromActiviteByID");});
	  	}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectActivite in ActiviteRequest",'alert','e'); 
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
		}
        						
	}

//////////////////////////////////////////////////////////////////////////
	
}