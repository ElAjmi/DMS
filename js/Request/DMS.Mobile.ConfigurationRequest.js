if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.ConfigurationRequest = {};

DMS.Mobile.ConfigurationRequest = 
{
		connexion : null,
		Configuration : null,

	////////////////////////////////////////Serveur ////////////////////////
	GetConfigurationFromServer : function (callbackViewModel)
	{
		 var Conf = JSON.parse(sessionStorage.getItem("Configuration"));
		 var ServeurURL	= Conf.URL;
		 var methode = "GetConfigurationDTO?";
		 var URL = ServeurUrl+methode;
		 
		 var form = this;
		    DMS.Mobile.Common.CallService(function(Json,Form){form.CreateConfigurationDTO(Json,Form,callbackViewModel);},URL,form);
		
    },	
	
	CreateConfigurationDTO : function(json,form,callbackViewModel)
		{
			
			if ( json != null)
			{
				var synch = "true";
			
					var configurationDTO = new DMS.Mobile.Configuration();	
					configurationDTO.ConfigurationID = json.ConfigurationID;
					configurationDTO.Frequence = json.Frequence;
					configurationDTO.Perimetre = json.Perimetre;
					configurationDTO.URL = json.URL;	
					
					form.insertConfiguration(configurationDTO,synch,form,callbackViewModel);				  
			   }
		   else 
		   {callbackViewModel(form.Configuration);}
			   
		},
		
		
	insertConfigurationIntoArray : function(configuration,synch,form,callbackViewModel)
	{
	    	form.Configuration = configuration;
			callbackViewModel(form.Configuration);
	},
	//////////////////////////////////////////////////////////////////
	
	
	insertConfiguration : function(configuration,synch,form,callbackViewModel)
	{
		form.InsertConfigurationIntoLocal(configuration,synch,form,callbackViewModel);
	},
	
	InsertConfigurationIntoLocal:function(configurationObject,synch,formReq,callbackViewModel)
	{
		    formReq.connexion.transaction(function(tx){ formReq.InsertIntoConfiguration(tx, formReq,configurationObject,synch) },function(err){ DMS.Mobile.Common.errors(err,"InsertIntoConfiguration");},function(){formReq.insertConfigurationIntoArray(configurationObject,synch,formReq,callbackViewModel);}); 
					
	},	
	
	InsertIntoConfiguration : function(requete,form,configurationObject,synch)
	{
		requete.executeSql('INSERT INTO Configuration (ConfigurationID,URL,Perimetre,Synch,Frequence) VALUES('+configurationObject.ConfigurationID+',"'+configurationObject.URL+'",'+configurationObject.Perimetre+',"'+synch+'",'+configurationObject.Frequence+')');

	},
	
	/////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////Select From LOCAL /////////////////////////////
	
	SelectConfiguration: function (callback) {
				var form = this;	
			       	this.connexion.transaction(function(tx){ form.SelectFromConfiguration(tx, form,callback) }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromConfiguration");});
    },
	
	
	SelectFromConfiguration : function (requete,form,callback)
	{
		requete.executeSql("SELECT * FROM Configuration", [], function(tx, results) {form.querySuccess(tx,results,form,callback);});
	},
	
	
	  querySuccess:function (requete, results,form,callback) {
						
						form.Configuration = null;

								var configurationDTO = new DMS.Mobile.Configuration();
								
								configurationDTO.ConfigurationID = results.rows.item(0).ConfigurationID;
								configurationDTO.Frequence = results.rows.item(0).Frequence;
								configurationDTO.Perimetre = results.rows.item(0).Perimetre;
								configurationDTO.URL = results.rows.item(0).URL;
							
							form.Configuration = configurationDTO;
							
		callback(form.Configuration);
							
	  },
	
	
	////////////////////////////////////////////////////////////////////////////
	
	
	
}