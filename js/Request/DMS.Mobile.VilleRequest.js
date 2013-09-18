  if (typeof (DMS) == 'undefined') DMS = {};
	if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};
	
	
	
	DMS.Mobile.VilleRequest = {};
	
	DMS.Mobile.VilleRequest = 
	{
		ListVille : [],
		connexion: null,

insertVilleIntoArray : function(ville,form,len,callbackViewModel)
{
	form.ListVille.push(ville);
	if (form.ListVille.length == len)
	{
		alert("appel pv");
		callbackViewModel(form.ListVille);
	}
},


	
	////////////////////////////////////////Serveur ////////////////////////
	
	SelectVilleByPersonnelFromServer : function (callbackViewModel,PersonnelID)
	{
		  form =this;
		
		  var Data = "PersonnelID="+PersonnelID; 
		  
		  var methode= "GetListVilleDTOByPersonnelID?";

		  var URL = DMS.Mobile.Common.ServeurUrl+methode+Data;

		     DMS.Mobile.Common.CallService(function(JsonObject,Form){form.createVilleDTO(JsonObject,Form,callbackViewModel);},URL,form);
	},
	
	createVilleDTO : function(json,form,callbackViewModel)
	{
		if ( json != null)
		{
			var synch = "true";
            var len = json.length;
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
	},
	
	//////////////////////////////////////////////////////////////////
	
/////////////////////////////Insertion LOCAL /////////////////////////////////////
InsertVille : function(ville,synch,form,len,callbackViewModel)
{
	form.InsertVilleIntoLOCAL(ville,synch,form,len,callbackViewModel);
},

insertVille : function(ville)
{
		var form = this;	
		this.InsertVilleIntoLOCAL(ville,"false",form,null,null);
},

InsertVilleIntoLOCAL : function (villeObject,synch,formReq,len,callbackViewModel)
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
},


InsertIntoVille : function (requete,formReq,villeObject,synch)
{
	requete.executeSql('INSERT INTO Villes (VilleID,Designation,ZoneID,Latitude,Synch,Longitude) VALUES ('+villeObject.VilleID+',"'+villeObject.Designation+'",'+villeObject.ZoneID+',"'+villeObject.Latitude+'","'+synch+'",'+villeObject.Longitude+')');
},
//////////////////////////////////////////////////////////////////////////

//////////////////////////////Select FROM Local //////////////////////////////
	
	
		
	SelectVille: function (callback,oPointVente) {
	 
	  var form = this;
	  this.connexion.transaction(function(tx){ form.SelectFromVilleByID(tx, form,callback,oPointVente); }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromVilleByID");});
    },
    
     SelectFromVilleByID : function(requete,form,callback,oPointVente) {
   
   			requete.executeSql("SELECT * FROM Villes WHERE VilleID = ?", [oPointVente.VilleID], function(tx, results) {form.querySuccessByPointVente(tx,results,form,callback,oPointVente);});
       
    },
    
    
   
    
    querySuccessByPointVente:function (requete, results,form,callback,oPointVente) {
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

//////////////////////////////////////////////////////////////////////////	
	
}