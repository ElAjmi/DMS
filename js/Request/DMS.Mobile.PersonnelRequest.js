if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};


DMS.Mobile.PersonnelRequest = {};

DMS.Mobile.PersonnelRequest = 
{
	Personnel: null,
	connexion: null,
 

	
	 
/*	 	SelectOnePersonnelTransaction: function (login, password, Form, callback) {
		try
		{
			var form;
				if (Form == null)
				{
				 form = this;	
			    form.connexion.transaction(function(tx){ form.SelectFromPersonnel(tx,login, password, form, callback) },  function(err){ DMS.Mobile.Common.errors(err,"SelectFromPersonnel");});
				}
				else
				{
				form = Form;	
			    form.connexion.transaction(function(tx){ form.SelectFromPersonnel(tx,login, password, form, callback) }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromPersonnel");});
				}
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectOnePersonnelTransaction in PersonnelRequest",'alert','e'); 
		}
    }, 	*/


 /*	SelectFromPersonnel : function(requete, login, password, form, callback) {	
try
{

	if ((login == null) && (password == null))
	{
		requete.executeSql('SELECT * FROM Personnel', [],function(tx, results) {form.CreatePersonnel(tx,results,form,callback)});
	}
	else
	{	
     		requete.executeSql('SELECT * FROM Personnel WHERE Login = ? AND Password = ?', [login,password],function(tx, results) {form.CreatePersonnel(tx,results,form,callback)});
	}
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromPersonnel in PersonnelRequest",'alert','e'); 
		}
    },*/
	
	
	
	
	
/*	  CreatePersonnel : function (requete, results, form, callback) {
	try
	{	   
		   DMS.Mobile.Common.Alert("results.rows.item.length = " + results.rows.item.length);
		   DMS.Mobile.Common.Alert("results.rows.length = " + results.rows.length);
		   if (results.rows.length != 0)
		   {
								var oPersonnel = new DMS.Mobile.Personnel();
							
								oPersonnel.PersonnelID = results.rows.item(0).PersonnelID;
								oPersonnel.Login = results.rows.item(0).Login;
								oPersonnel.Password = results.rows.item(0).Password;
								oPersonnel.Nom = results.rows.item(0).Nom;
								oPersonnel.Prenom = results.rows.item(0).Prenom;
								oPersonnel.Tel = results.rows.item(0).Tel;
								oPersonnel.Email = results.rows.item(0).Email;
								oPersonnel.Adresse = results.rows.item(0).Adresse;
       							oPersonnel.Matricule = results.rows.item(0).Matricule; 
       							oPersonnel.ProfilID = results.rows.item(0).ProfilID;
								
        						form.Personnel = oPersonnel;      
		   }
		   else 
		   {form.Personnel = null;}
		   callback(form.Personnel,form);
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : CreatePersonnel in PersonnelRequest",'alert','e'); 
		}
    },*/




	 
	
	
	

	 
/*	 GetPersonnelFromLocal: function(_login, _password,callback)
	 {
		 try
		 {
		  var form = this; 
		  form.SelectOnePersonnelTransaction(_login, _password, form, callback);
		  		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : GetPersonnelFromLocal in PersonnelRequest",'alert','e'); 
		}
	 
	 },*/
	 insertPersonnelIntoArray : function(personnel,form,callbackViewModel)
	 {
		 try
		 {
		 form.Personnel = personnel;
		 localStorage.setItem("Personnel", JSON.stringify(form.Personnel));
		 callbackViewModel(form.Personnel);
		 	}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertPersonnelIntoArray in PersonnelRequest",'alert','e'); 
		}
	},
	 
	 
	 
	 
	 
	 GetPersonnelFromServer: function(_login,_password,callbackViewModel) 
		{
			alert("GetpersonnelFromServer");
			try
			{
			var Conf = JSON.parse(sessionStorage.getItem("Configuration"));
		 
		    DMS.Mobile.Common.Alert(_login);
		    var login = _login;
		    var password = _password;
	        var Data = "login="+login+"&password="+password; 
		  
		  var methode= "GetCommercialByLogin?";
		   
		  var URL = Conf.URL+methode+Data;
		    
			var form = this;
		    
			DMS.Mobile.Common.CallService(function(JsonObject,Form){form.CreatePersonnelDTO(JsonObject,Form,callbackViewModel);},URL,form);
				}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : GetPersonnelFromServer in PersonnelRequest",'alert','e'); 
		}
		},
		
		CreatePersonnelDTO : function(json,form,callbackViewModel)
		{
			
			try
			{  alert("create personneldto");	
		if ( json != null)
		{
			var synch = "true";
			var personnelDTO = new DMS.Mobile.Personnel();
			
			personnelDTO.PersonnelID = json.PersonnelID;
			personnelDTO.Login = json.Login;
			personnelDTO.Password = json.Password;
			personnelDTO.Nom = json.Nom;
			personnelDTO.Prenom = json.Prenom;
			personnelDTO.Tel = json.Tel;
			personnelDTO.Email = json.Email;
			personnelDTO.Adresse = json.Adresse;
			personnelDTO.Matricule = json.Matricule;
			personnelDTO.ProfilID = json.ProfilID;
			personnelDTO.ListCommandes = json.Commandes;
			personnelDTO.ListMissions = json.Missions;
			personnelDTO.ListObjectifs = json.Objectifs;
			personnelDTO.Profils = json.Profils;
			personnelDTO.ListReclamations = json.Reclamations;
			
			form.InsertPersonnel(personnelDTO,synch,form,callbackViewModel);     
		   }
		   else 
		   {
			   localStorage.setItem("Personnel", JSON.stringify(form.Personnel));
		       callback2(form.Personnel);
		   }
		   
		   		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : CreatePersonnelDTO in PersonnelRequest",'alert','e'); 
		}
		},
		
		
	InsertPersonnel: function(PersonnelObject,synch,form,callbackViewModel)
	  {
		 try
		 {
              form.InsertPersonnelIntoLOCAL(PersonnelObject,synch,form,callbackViewModel);
		 }
		catch(err)
		 {
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertPersonnel in PersonnelRequest",'alert','e'); 
		 }  
	 
	 },
		
		
		    InsertPersonnelIntoLOCAL: function(PersonnelObject,synch,formReq,callbackViewModel) {
		try
		{

			        formReq.connexion.transaction(function(tx){ formReq.InsertIntoPersonnel(tx, formReq,PersonnelObject,synch); }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoPersonnel");},function(){formReq.insertPersonnelIntoArray(PersonnelObject,formReq,callbackViewModel);}); 
					
        }
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertPersonnelIntoLOCAL in PersonnelRequest",'alert','e'); 
		}
		   },

	InsertIntoPersonnel : function(requete,form,PersonnelObject,synch) {  
	try
	{		
			requete.executeSql('INSERT INTO Personnel (PersonnelID,Login,Password,Nom,Prenom,Tel,Email,Adresse,Matricule,Synch,ProfilID) VALUES('
+PersonnelObject.PersonnelID+',"'+PersonnelObject.Login+'","'+PersonnelObject.Password+'","'+PersonnelObject.Nom+'","'+PersonnelObject.Prenom+'",'+PersonnelObject.Tel+',"'+PersonnelObject.Email+'","'+PersonnelObject.Adresse+'",'+PersonnelObject.Matricule+',"'+synch+'",'+PersonnelObject.ProfilID+')');
       
	DMS.Mobile.Common.Alert("fin insertion personnel");	
	
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoPersonnel in PersonnelRequest",'alert','e'); 
		}																															
    },
	 
		
	 
	 
	 /////////////////////////////////////////////////////////////////////////////////////////////
	 VerifyPersonnelInLocalSession : function(_login, _password,callback)
	 {
		 alert("VerifyPersonnelInLocalSession");
	    try
		{
		  var form = this; 
		  form.Personnel = JSON.parse(localStorage.getItem("Personnel"));
		  if (form.Personnel == null)
		  {
		  callback(form.Personnel);
		  }
		  else
		  {
			  if((form.Personnel.Login == _login) && (form.Personnel.Password == _password))
		      {
				  alert("ok");
				  callback(form.Personnel);
			  }
			  else
			  {
				  callback(null);
			  }
		  }
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : GetPersonnelFromLocalSession in PersonnelRequest",'alert','e'); 
		}
	 }
	 
	 
	 
	 
	 
	 // Function to call WCF  Service       
/*	 CallService: function(callback,Url,form,callback2) {
	try
	{
		alert("callservice personnel")
	DMS.Mobile.Common.Alert("CallService");
					$.ajax({

						cache: true,
						url: Url,
						type: "GET",
						contentType: "application/javascript",
						dataType: "jsonp",
				
						success: function(msg) {
							DMS.Mobile.Common.Alert("result = " + msg);
							form.ServiceSucceeded(msg,callback,form,callback2);
						},  
					});
			
				}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : callService in PersonnelRequest",'alert','e'); 
		}			
   },
   
	ServiceFailed: function(xhr) {
        
try
{
	alert("service ffffailed");
		if (xhr.responseText) {
			var err = xhr.responseText;
			if (err)
				error(err);
			else
				error({ Message: "Unknown server error." })
		}
    
	
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : ServiceFailed in PersonnelRequest",'alert','e'); 
		}
		return;
},*/
		
/*   ServiceSucceeded: function(result,callback,form,callback2) {
		try
		{
		
			DMS.Mobile.Common.Alert("result = " + result);
		
			
	
			   JsonObject = result;
			   
			   callback(JsonObject,form,callback2);
			   
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : ServiceSucceeded in PersonnelRequest",'alert','e'); 
		}
}*/
		





}