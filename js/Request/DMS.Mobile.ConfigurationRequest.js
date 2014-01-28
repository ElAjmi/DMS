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
		 var form = this;
		try
		{
		 var Conf = JSON.parse(localStorage.getItem("Configuration"));
		 
		 var methode = "GetConfigurationDTO?";
		 var URL = Conf.URL+methode;
		 
		
		    DMS.Mobile.Common.CallService(function(Json,Form){form.CreateConfigurationDTO(Json,Form,callbackViewModel);},URL,form);
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : GetConfigurationFromServer in ConfigurationRequest",'alert','e'); 
			
			   var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ConfigurationRequest";
						exception.FonctionE = "GetConfigurationFromServer";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.Configuration);
						});
			
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
					configurationDTO.SeuilArticle = 1500;
					
					form.insertConfiguration(configurationDTO,synch,form,callbackViewModel);				  
			   }
		   else 
		   {callbackViewModel(form.Configuration);}
		  }
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : CreateConfiguratinoDTO in ConfigurationRequest",'alert','e'); 
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ConfigurationRequest";
						exception.FonctionE = "CreateConfiguratinoDTO";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.Configuration);
						});
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
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ConfigurationRequest";
						exception.FonctionE = "insertConfigurationIntoArray";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.Configuration);
						});
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
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ConfigurationRequest";
						exception.FonctionE = "insertConfiguration";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.Configuration);
						});
			
		}
	},
	
	InsertConfigurationIntoLocal:function(configurationObject,synch,formReq,callbackViewModel)
	{
		try
		{
		    formReq.connexion.transaction(function(tx){ formReq.InsertIntoConfiguration(tx, formReq,configurationObject,synch) },function(err){ DMS.Mobile.Common.errors(err,"InsertIntoConfiguration");
			
			    var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ConfigurationRequest";
						exception.FonctionE = "InsertIntoConfiguration";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.Configuration);
						});
			
			},function(){formReq.insertConfigurationIntoArray(configurationObject,synch,formReq,callbackViewModel);
			
			}); 
				}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertConfigurationIntoLocal in ConfigurationRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ConfigurationRequest";
						exception.FonctionE = "InsertConfigurationIntoLocal";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.Configuration);
						});
		}
	},	
	
	InsertIntoConfiguration : function(requete,form,configurationObject,synch)
	{
		try
		{
		requete.executeSql('INSERT INTO Configuration (ConfigurationID,URL,Perimetre,Synch,Frequence,SeuilArticle) VALUES('+configurationObject.ConfigurationID+',"'+configurationObject.URL+'",'+configurationObject.Perimetre+',"'+synch+'",'+configurationObject.Frequence+','+configurationObject.SeuilArticle+')');
}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoConfiguration in ConfigurationRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ConfigurationRequest";
						exception.FonctionE = "InsertIntoConfiguration";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.Configuration);
						});
		}
	},
	
	/////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////Select From LOCAL /////////////////////////////
	
	SelectConfiguration: function (callback) {
	var form = this;	
	try
	{
				
			       	this.connexion.transaction(function(tx){ form.SelectFromConfiguration(tx, form,callback) }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromConfiguration");
					
					   var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ConfigurationRequest";
						exception.FonctionE = "SelectFromConfiguration";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(form.Configuration);
						});
					
					});
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectConfiguration in ConfigurationRequest",'alert','e'); 
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ConfigurationRequest";
						exception.FonctionE = "SelectConfiguration";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(form.Configuration);
						});
			
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
			
			  var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ConfigurationRequest";
						exception.FonctionE = "SelectFromConfiguration";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(form.Configuration);
						});
			
		}
	},
	
	
	  querySuccess:function (requete, results,form,callback) {
		try
		{				
		              var len = results.rows.length;
							
							
		   						if(len>0){
									
		
						form.Configuration = null;

								var configurationDTO = new DMS.Mobile.Configuration();
								
							configurationDTO.ConfigurationID = results.rows.item(0).ConfigurationID;
								configurationDTO.Frequence = results.rows.item(0).Frequence;
								configurationDTO.Perimetre = results.rows.item(0).Perimetre;
								configurationDTO.URL = results.rows.item(0).URL;
								configurationDTO.SeuilArticle = results.rows.item(0).SeuilArticle;
							
							form.Configuration = configurationDTO;
							
		callback(form.Configuration);
								}
								else
								{
								    callback(form.Configuration);
								}
						
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccess in ConfigurationRequest",'alert','e'); 
			
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ConfigurationRequest";
						exception.FonctionE = "querySuccess";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(form.Configuration);
						});
		}	
	  },
	
	
	////////////////////////////////////////////////////////////////////////////
	
		 //////////////////////////////////////// Delete All Configuration ////////////////////////
DeleteAllConfiguration : function(callback)
{
	var form = this;
	try
	{
				
			this.connexion.transaction(function(tx){ form.DeleteConfigurations(tx, form,callback);}, function(err){ DMS.Mobile.Common.errors(err,"DeleteAllConfiguration");
			
			        	var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ConfigurationRequest";
						exception.FonctionE = "DeleteConfigurations";
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
			DMS.Mobile.Notification.ShowMessage(err.message+" : DeleteAllConfiguration in ConfigurationRequest",'alert','e'); 
			
			
			        	var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ConfigurationRequest";
						exception.FonctionE = "DeleteAllConfiguration";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback();
						});
	 }	
}, 

DeleteConfigurations : function(requete, form,callback)
{
	requete.executeSql("DELETE FROM Configuration ", [],
              function(tx, result) {				
				form.querySuccessDELETEAll(form,callback);
				}, 
                function(err){DMS.Mobile.Common.errors(err,"DeleteConfiguration");
				    
					 	var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ConfigurationRequest";
						exception.FonctionE = "DeleteConfigurations";
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

///////////////////////////////////////////////////////////////////////////////////////////////////

  
	
	
}