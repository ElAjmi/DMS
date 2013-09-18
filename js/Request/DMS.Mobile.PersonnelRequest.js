if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};


DMS.Mobile.PersonnelRequest = {};

DMS.Mobile.PersonnelRequest = 
{
 
	ModeConnection : true,
	PersonnelList :[],
	Personnel: null,
	connexion: null,
    JsonObject : null,

	
	 
	 	SelectOnePersonnelTransaction: function (login, password, Form, callback) {
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
    }, 	


 	SelectFromPersonnel : function(requete, login, password, form, callback) {	
	if ((login == null) && (password == null))
	{
		requete.executeSql('SELECT * FROM Personnel', [],function(tx, results) {form.CreatePersonnel(tx,results,form,callback)});
	}
	else
	{	
     		requete.executeSql('SELECT * FROM Personnel WHERE Login = ? AND Password = ?', [login,password],function(tx, results) {form.CreatePersonnel(tx,results,form,callback)});
	}
    },
	
	  CreatePersonnel : function (requete, results, form, callback) {
		   
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

    },



    InsertPersonnel: function(PersonnelObject,synch,formReq) {
		

			        formReq.connexion.transaction(function(tx){ formReq.InsertIntoPersonnel(tx, formReq,PersonnelObject,synch); }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoPersonnel");}); 
           },

	InsertIntoPersonnel : function(requete,form,PersonnelObject,synch) {  
			requete.executeSql('INSERT INTO Personnel (PersonnelID,Login,Password,Nom,Prenom,Tel,Email,Adresse,Matricule,Synch,ProfilID) VALUES('
+PersonnelObject.PersonnelID+',"'+PersonnelObject.Login+'","'+PersonnelObject.Password+'","'+PersonnelObject.Nom+'","'+PersonnelObject.Prenom+'",'+PersonnelObject.Tel+',"'+PersonnelObject.Email+'","'+PersonnelObject.Adresse+'",'+PersonnelObject.Matricule+',"'+synch+'",'+PersonnelObject.ProfilID+')');
       
	DMS.Mobile.Common.Alert("fin insertion personnel");																																
    },
	 
	 
	
	
	
	 SavePersonnelInLocal: function(PersonnelObject,synch,form)
	 {
	 DMS.Mobile.Common.Alert("test function save personnel in local"+PersonnelObject+synch+form);
           form.InsertPersonnel(PersonnelObject,synch,form);
		   
	 
	 },
	 
	 GetPersonnelFrmLocal: function(_login, _password,callback)
	 {
		  var form = this; 
		  form.SelectOnePersonnelTransaction(_login, _password, form, callback);
		  
	 
	 },
	 
	 
	 GetPersonnelFromServer: function(_login,_password,callback2) 
		{
		    DMS.Mobile.Common.Alert(_login);
		    var login = _login;
		    var password = _password;
	        var Data = "login="+login+"&password="+password; 
		  
		  var methode= "GetCommercialByLogin?";
		   
		  var URL = DMS.Mobile.Common.ServeurUrl+methode+Data;
		    
			var form = this;
		    this.CallService(this.CreatePersonnelDTO,URL,form,callback2);
		},
		
		CreatePersonnelDTO : function(json,form,callback2)
		{
				
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
			
			form.SavePersonnelInLocal(personnelDTO, synch,form);
		  
			
			form.Personnel = personnelDTO;      
		   }
		   else 
		   {form.Personnel = null;}
		   
		   callback2(form.Personnel, form);
		   
		},
	 
	 // Function to call WCF  Service       
	 CallService: function(callback,Url,form,callback2) {
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
					
   },
   
	ServiceFailed: function(xhr) {
        

		if (xhr.responseText) {
			var err = xhr.responseText;
			if (err)
				error(err);
			else
				error({ Message: "Unknown server error." })
		}
    return;
},
		
   ServiceSucceeded: function(result,callback,form,callback2) {
			DMS.Mobile.Common.Alert("result = " + result);
		
			
	
			   JsonObject = result;
			   
			   callback(JsonObject,form,callback2);
			   

		}
		





}