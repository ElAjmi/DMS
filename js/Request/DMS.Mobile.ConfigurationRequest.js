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
		try
		{
		 var Conf = JSON.parse(sessionStorage.getItem("Configuration"));
		 
		 var methode = "GetConfigurationDTO?";
		 var URL = Conf.URL+methode;
		 
		 var form = this;
		    DMS.Mobile.Common.CallService(function(Json,Form){form.CreateConfigurationDTO(Json,Form,callbackViewModel);},URL,form);
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : GetConfigurationFromServer in ConfigurationRequest",'alert','e'); 
		}
		
    },	
	
	CreateConfigurationDTO : function(json,form,callbackViewModel)
		{
			try
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
		  }
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : CreateConfiguratinoDTO in ConfigurationRequest",'alert','e'); 
		}
			   
		},
		
		
	insertConfigurationIntoArray : function(configuration,synch,form,callbackViewModel)
	{
		try
		{
	    	form.Configuration = configuration;
			callbackViewModel(form.Configuration);
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertConfigurationIntoArray in ConfigurationRequest",'alert','e'); 
		}
	},
	//////////////////////////////////////////////////////////////////
	
	
	insertConfiguration : function(configuration,synch,form,callbackViewModel)
	{
		try
		{
		form.InsertConfigurationIntoLocal(configuration,synch,form,callbackViewModel);
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertConfiguration in ConfigurationRequest",'alert','e'); 
		}
	},
	
	InsertConfigurationIntoLocal:function(configurationObject,synch,formReq,callbackViewModel)
	{
		try
		{
		    formReq.connexion.transaction(function(tx){ formReq.InsertIntoConfiguration(tx, formReq,configurationObject,synch) },function(err){ DMS.Mobile.Common.errors(err,"InsertIntoConfiguration");},function(){formReq.insertConfigurationIntoArray(configurationObject,synch,formReq,callbackViewModel);}); 
				}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertConfigurationIntoLocal in ConfigurationRequest",'alert','e'); 
		}
	},	
	
	InsertIntoConfiguration : function(requete,form,configurationObject,synch)
	{
		try
		{
		requete.executeSql('INSERT INTO Configuration (ConfigurationID,URL,Perimetre,Synch,Frequence) VALUES('+configurationObject.ConfigurationID+',"'+configurationObject.URL+'",'+configurationObject.Perimetre+',"'+synch+'",'+configurationObject.Frequence+')');
}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoConfiguration in ConfigurationRequest",'alert','e'); 
		}
	},
	
	/////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////Select From LOCAL /////////////////////////////
	
	SelectConfiguration: function (callback) {
	try
	{
				var form = this;	
			       	this.connexion.transaction(function(tx){ form.SelectFromConfiguration(tx, form,callback) }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromConfiguration");});
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectConfiguration in ConfigurationRequest",'alert','e'); 
		}
    },
	
	
	SelectFromConfiguration : function (requete,form,callback)
	{
		try
		{
		requete.executeSql("SELECT * FROM Configuration", [], function(tx, results) {form.querySuccess(tx,results,form,callback);});
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromConfiguration in ConfigurationRequest",'alert','e'); 
		}
	},
	
	
	  querySuccess:function (requete, results,form,callback) {
		try
		{				
						form.Configuration = null;

								var configurationDTO = new DMS.Mobile.Configuration();
								
								configurationDTO.ConfigurationID = results.rows.item(0).ConfigurationID;
								configurationDTO.Frequence = results.rows.item(0).Frequence;
								configurationDTO.Perimetre = results.rows.item(0).Perimetre;
								configurationDTO.URL = results.rows.item(0).URL;
							
							form.Configuration = configurationDTO;
							
		callback(form.Configuration);
						
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccess in ConfigurationRequest",'alert','e'); 
		}	
	  },
	
	
	////////////////////////////////////////////////////////////////////////////
	
	
	
}