  if (typeof (DMS) == 'undefined') DMS = {};
	if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};
	
	
	
	DMS.Mobile.VilleRequest = {};
	
	DMS.Mobile.VilleRequest = 
	{
		ListVille : [],
		connexion: null,

insertVilleIntoArray : function(ville,form,len,callbackViewModel)
{
	try
	{
	form.ListVille.push(ville);
	if (form.ListVille.length == len)
	{
		//alert"appel pv");
		callbackViewModel(form.ListVille);
	}
	}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : insertVilleIntoArray in VilleRequest",'alert','e'); 
				
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "VilleRequest";
						exception.FonctionE = "insertVilleIntoArray";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListVille);
						});
			}
},


	
	////////////////////////////////////////Serveur ////////////////////////
	
	SelectVilleByPersonnelFromServer : function (callbackViewModel,PersonnelID)
	{
		try
		{
		var Conf = JSON.parse(localStorage.getItem("Configuration"));
		
		  form =this;
		
		  var Data = "PersonnelID="+PersonnelID; 
		  
		  var methode= "GetListVilleDTOByPersonnelID?";

		  var URL =  Conf.URL+methode+Data;

		     DMS.Mobile.Common.CallService(function(JsonObject,Form){form.createVilleDTO(JsonObject,Form,callbackViewModel);},URL,form);
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectVilleByPersonnelFromServer in VilleRequest",'alert','e'); 
				
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "VilleRequest";
						exception.FonctionE = "SelectVilleByPersonnelFromServer";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListVille);
						});
			}
	},
	
	createVilleDTO : function(json,form,callbackViewModel)
	{
		try
		{
			var len = json.length;
		if ( len>0)
		{
			var synch = "true";
            
			for (var i=0;i<json.length;i++)
			{
			var villeDTO = new DMS.Mobile.Ville();
			
				villeDTO.VilleID = json[i].VilleID ;
				villeDTO.Designation = json[i].Designation;
				villeDTO.Zones = json[i].Zones;
				villeDTO.Latitude = json[i].Latitude; 
				villeDTO.Longitude = json[i].Longitude; 
				villeDTO.ZoneID = json[i].ZoneID;
				villeDTO.listPointVentes = json[i].PointVentes;

			form.InsertVille(villeDTO,synch,form,len,callbackViewModel);
			
			}
			
		}
		else{callbackViewModel(form.ListVille);}	
		}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : createVilleDTO in VilleRequest",'alert','e'); 
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "VilleRequest";
						exception.FonctionE = "createVilleDTO";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListVille);
						});
			}
	},
	
	//////////////////////////////////////////////////////////////////
	
/////////////////////////////Insertion LOCAL /////////////////////////////////////
InsertVille : function(ville,synch,form,len,callbackViewModel)
{
	try
	{
	form.InsertVilleIntoLOCAL(ville,synch,form,len,callbackViewModel);
	}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : InsertVille in VilleRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "VilleRequest";
						exception.FonctionE = "InsertVille";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListVille);
						});
			
			}
},

insertVille : function(ville)
{
	try
	{
		var form = this;	
		this.InsertVilleIntoLOCAL(ville,"false",form,null,null);
		}
			catch(err)
			{
				
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "VilleRequest";
						exception.FonctionE = "insertVille";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							DMS.Mobile.Notification.ShowMessage(err.message+" : insertVille in VilleRequest",'alert','e'); 
			
						});
			
			}
},

InsertVilleIntoLOCAL : function (villeObject,synch,formReq,len,callbackViewModel)
{
	try
	{
	  	if (synch == "false")
			{
		  	    formReq.connexion.transaction(function(tx){ formReq.InsertIntoVille(tx, formReq, villeObject,synch) }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoVille");}); 
		    }
			else
			{
				formReq.connexion.transaction(function(tx){ formReq.InsertIntoVille(tx, formReq,villeObject,synch); }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoVille");},function(){
							
						formReq.insertVilleIntoArray(villeObject,formReq,len,callbackViewModel)	;		
							}); 
			}		
}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : InsertVilleIntoLOCAL in VilleRequest",'alert','e'); 
				
				        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "VilleRequest";
						exception.FonctionE = "InsertVilleIntoLOCAL";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(formReq.ListVille);
						});
			}
},


InsertIntoVille : function (requete,formReq,villeObject,synch)
{
	try
	{
	requete.executeSql('INSERT INTO Villes (VilleID,Designation,ZoneID,Latitude,Synch,Longitude) VALUES ('+villeObject.VilleID+',"'+villeObject.Designation+'",'+villeObject.ZoneID+',"'+villeObject.Latitude+'","'+synch+'",'+villeObject.Longitude+')');
	}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoVille in VilleRequest",'alert','e'); 
			}
},
//////////////////////////////////////////////////////////////////////////

//////////////////////////////Select FROM Local //////////////////////////////
	
	
		
	SelectVille: function (callback,oPointVente) {
	try
	{ 
	  var form = this;
	  this.connexion.transaction(function(tx){ form.SelectFromVilleByID(tx, form,callback,oPointVente); }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromVilleByID");
	  
	   var exception = new DMS.Mobile.Exception();
						exception.FichierE = "VilleRequest";
						exception.FonctionE = "SelectFromVilleByID";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(oPointVente);
						});
	  
	  });
	  }
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectVille in VilleRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "VilleRequest";
						exception.FonctionE = "SelectVille";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(oPointVente);
						});
			
			}
    },
    
     SelectFromVilleByID : function(requete,form,callback,oPointVente) {
   try
   {
   			requete.executeSql("SELECT * FROM Villes WHERE VilleID = ?", [oPointVente.VilleID], function(tx, results) {form.querySuccessByPointVente(tx,results,form,callback,oPointVente);});
       }
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromVilleByID in VilleRequest",'alert','e'); 
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "VilleRequest";
						exception.FonctionE = "SelectFromVilleByID";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(oPointVente);
						});
			}
    },
    
    
   
    
    querySuccessByPointVente:function (requete, results,form,callback,oPointVente) {
	try
	{
		var len = results.rows.length;
			if(len>0){
			var oVille = new DMS.Mobile.Ville();	
			oVille.VilleID = results.rows.item(0).VilleID;
			oVille.Designation = results.rows.item(0).Designation;
			oVille.Latitude = results.rows.item(0).Latitude;
			oVille.Longitude  = results.rows.item(0).Longitude;
			oVille.ZoneID = results.rows.item(0).ZoneID;
			oPointVente.Ville = oVille;
			
			}
			callback(oPointVente);
        	}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessByPointVente in VilleRequest",'alert','e'); 
				
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "VilleRequest";
						exception.FonctionE = "querySuccessByPointVente";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(oPointVente);
						});
			}					
	},

//////////////////////////////////////////////////////////////////////////	


	 //////////////////////////////////////// Delete All Ville ////////////////////////
DeleteAllVille : function(callback)
{
	try
	{
			var form = this;	
			this.connexion.transaction(function(tx){ form.DeleteVilles(tx, form,callback);}, function(err){ DMS.Mobile.Common.errors(err,"DeleteVilles");
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "VilleRequest";
						exception.FonctionE = "DeleteVilles";
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
			DMS.Mobile.Notification.ShowMessage(err.message+" : DeleteAllVille in VilleRequest",'alert','e'); 
	
	             var exception = new DMS.Mobile.Exception();
						exception.FichierE = "VilleRequest";
						exception.FonctionE = "DeleteAllVille";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
	 }	
}, 

DeleteVilles : function(requete, form,callback)
{
	requete.executeSql("DELETE  FROM Villes ", [],
              function(tx, result) {				
				form.querySuccessDELETEAll(form,callback);
				}, 
                function(err){DMS.Mobile.Common.errors(err,"DeleteVilles");
				
				        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "VilleRequest";
						exception.FonctionE = "DeleteVilles";
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

	
}