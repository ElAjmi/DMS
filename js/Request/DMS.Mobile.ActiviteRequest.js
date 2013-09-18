  if (typeof (DMS) == 'undefined') DMS = {};
	if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};
	
	
	
	DMS.Mobile.ActiviteRequest = {};
	
	DMS.Mobile.ActiviteRequest = 
	{
		connexion: null,
		ListActivite : [],
		
		
		insertActiviteIntoArray : function(activite,form,len,callbackViewModel)
		{
			form.ListActivite.push(activite);
			if(form.ListActivite.length == len)
			{
				callbackViewModel(form.ListActivite);
			}
		},

		////////////////////////////////////////Serveur ////////////////////////
	
		SelectActiviteByPersonnelFromServer :function(callbackViewModel,PersonnelID)
	{		
		 var form = this;
         var Data = "PersonnelID="+PersonnelID; 
		 var methode = "GetListActiviteDTOByPersonnelID?";
		 var URL = DMS.Mobile.Common.ServeurUrl+methode+Data;
		 
	 DMS.Mobile.Common.CallService(function(JsonObject,Form){form.createActiviteDTO(JsonObject,Form,callbackViewModel);},URL,form);
			
	},
	
	createActiviteDTO : function(json,form,callbackViewModel)
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
	},
	
	//////////////////////////////////////////////////////////////////
	
/////////////////////////////Insertion LOCAL /////////////////////////////////////

InsertActivite : function(activite,synch,form,len,callbackViewModel)
{
	form.InsertActiviteIntoLOCAL(activite,synch,form,len,callbackViewModel);
},

insertActivite : function(activite)
{
	var form = this;	
		this.InsertActiviteIntoLOCAL(activite,"false",form,null,null);
},

InsertActiviteIntoLOCAL : function (activiteObject,synch,formReq,len,callbackViewModel)
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
},

InsertIntoActivite : function(requete,form,activiteObject,synch)
{
		requete.executeSql('INSERT INTO Activite (ActiviteID,Designation,Synch)VALUES('+activiteObject.ActiviteID+',"'+activiteObject.Designation+'","'+synch+'")');
},


//////////////////////////////////////////////////////////////////////////

//////////////////////////////Select FROM Local //////////////////////////////
	SelectActivite: function (callback,client) {
	
	  var form = this;
	  this.connexion.transaction(function(tx){ form.SelectFromActiviteByID(tx, form,callback,client); }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromActiviteByID");});
    },
    
     SelectFromActiviteByID : function(requete,form,callback,client) {
   
   			requete.executeSql("SELECT * FROM Activite WHERE ActiviteID = ?", [client.ActiviteID], function(tx, results) {form.querySuccessByClient(tx,results,form,callback,client);});
       
    },
    
    querySuccessByClient:function (requete, results,form,callback,client) {
		var len = results.rows.length;
			if(len>0){
			var oActivite = new DMS.Mobile.Activite();	
			oActivite.ActiviteID = results.rows.item(0).ActiviteID;
			oActivite.Designation = results.rows.item(0).Designation;

			client.Activite = oActivite;
			}
			callback(client);
        						
	}

//////////////////////////////////////////////////////////////////////////
	
}