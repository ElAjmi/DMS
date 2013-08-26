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
    Url: "http://192.168.1.6:80/ninject/Service1.svc/",
	
	// GetCommercialDTO: function (login,password) {
	 
	 	GetPersonnel: function (login, password) {
				var form = this;	
					//alert("this.connexion = " + this.connexion);
			       	this.connexion.transaction(function(tx){ form.SelectFromPersonnel(tx,login, password, form) }, this.error);
    }, 	


 SelectFromPersonnel : function(requete, login, password, form) {		
     requete.executeSql('SELECT * FROM Personnel WHERE Personnel.Login == login && Personnel.Password == password', [], function(tx, results) {form.querySuccess(tx,results,form);})
    },
	
	  querySuccess:function (requete, results,form) {
		   
								var oPersonnel = new DMS.Mobile.Personnel();
							
								oPersonnel.PersonnelID = results.rows.item(i).PersonnelID;
								oPersonnel.Login = results.rows.item(i).Login;
								oPersonnel.Password = results.rows.item(i).Password;
								oPersonnel.Nom = results.rows.item(i).Nom;
								oPersonnel.Prenom = results.rows.item(i).Prenom;
								oPersonnel.Tel = results.rows.item(i).Tel;
								oPersonnel.Email = results.rows.item(i).Email;
								oPersonnel.Adresse = results.rows.item(i).Adresse;
       							oPersonnel.Matricule = results.rows.item(i).Matricule;
       							oPersonnel.Synch = results.rows.item(i).Synch; 
       							oPersonnel.ProfilID = results.rows.item(i).ProfilID;
								
        						form.Personnel = oPersonnel;                  
    },



    InsertPersonnel: function(PersonnelObject,synch,formReq) {
		
			       //var form = form == null ||; 
			        formReq.connexion.transaction(function(tx){ formReq.InsertIntoPersonnel(tx, formReq,PersonnelObject,synch) }, this.error); 
           },

	InsertIntoPersonnel : function(requete,form,PersonnelObject,synch) {
   
           /* var ProfilRequest = new DMS.Mobile.ProfilRequest();
			ProfilRequest.insertProfil(PersonnelObject.Profils, synch);*/
             
   			//requete.executeSql('SELECT * FROM Commandes', [], function(tx, results) {form.querySuccess(tx,results,form);});
			requete.executeSql('INSERT INTO Personnel (Login,Password,Nom,Prenom,Tel,Email,Adresse,Matricule,Synch,ProfilID) VALUES ( "'+PersonnelObject.Login+'","'+PersonnelObject.Password+'","'+PersonnelObject.Nom+'","'+PersonnelObject.Prenom+'",'+PersonnelObject.Tel+',"'+PersonnelObject.Email+'","'+PersonnelObject.Adresse+'",'+PersonnelObject.Matricule+',"'+synch+'",000)');
			
           
	alert("fin insertion");																																
    },
	 
	error:function (err) {
        alert("error : " + err.message);   
    },
	
	
	
	 SavePersonnelInLocal: function(PersonnelObject,synch,form)
	 {
           this.InsertPersonnel(PersonnelObject,synch,form);
	 
	 },
	 
	 GetPersonnelFrmLocal: function(_login, _password)
	 {
		  var form = this; 
		  
	 
	 },
	 
	 
	 
	 GetPersonnelFromServer: function(_login,_password) 
		{
		   alert(_login);
		    var login = _login;
		    var password = _password;
	        var Data = "login="+login+"&password="+password; 
		  //  var Url = "http://localhost/ninject/Service1.svc/commercial"+Data;
		  var methode= "GetCommercial?";
		   
		  var URL = this.Url+methode+Data;
		    
			var form = this;
		    this.CallService(this.CreatePersonnelDTO,URL,form);
		},
		
		CreatePersonnelDTO : function(json,form)
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
			}
			else
			{return null;}
		},
		
	/*	 WCFJSON: function(Url) 
		{
		   
		  //  var login = "admin";
		  //  var password = "admin";
		      var Type = "GET";
		  //  var Url = "http://10.0.2.2/ninject/Service1.svc/commercial/admin/admin";
		  
		    ContentType = "http/xml; charset=utf-8";
		    DataType = "xml"; 
			var ProcessData = true; 
			
		    this.CallService(Type,Url,ProcessData);
		   
		},*/
	 
	 // Function to call WCF  Service       
	 CallService: function(callback,Url,form) {
	 	alert("CallService");
				/*$.ajaxSetup({
								error: function (x, e) {
									if (x.status == 0) {
										alert('You are offline!!\n Please Check Your Network.');
									} else if (x.status == 404) {
										alert('Requested URL not found.');
									} else if (x.status == 500) {
										alert('Internal Server Error.');
									} else if (e == 'parsererror') {
										alert('Error.\nParsing JSON Request failed.');
									} else if (e == 'timeout') {
										alert('Request Time out.');
									} else {
										alert('Unknow Error.\n' + x.status);
									}
								}
                            });*/
							
			    // setTimeout( function(){
					$.ajax({

						cache: true,
						url: Url,
					   // data: "{}",
						type: "GET",
						//jsonpCallback: "RestaurantMenu",
						contentType: "application/javascript",
						dataType: "jsonp",
				
						success: function(msg) {//On Successfull service call
							alert("result = " + msg);
							form.ServiceSucceeded(msg,callback,form);
						},
						
					  //  error: ServiceFailed// When Service call fails
					});//} ,10000);
					
   },
   
    ServiceFailed: function(result) {
			alert('Service call failed: ' + result.status + '' + result.statusText);
			
		},
		
	ServiceFailed: function(xhr) {
       alert("ServiceFailed" + xhr.responseText);

		if (xhr.responseText) {
			var err = xhr.responseText;
			if (err)
				error(err);
			else
				error({ Message: "Unknown server error." })
		}
    return;
},
		
   ServiceSucceeded: function(result,callback,form) {
			alert("result = " + result);
		
			
			var obj = jQuery.parseJSON(result);
            //alert( "login :" +obj.Login+"cmd"+obj.Commandes[0].CAB );
			alert("obj= "+obj);
			   JsonObject = obj;
			   if (JsonObject != null)
			   {
			   callback(JsonObject,form);
			   }

		}
		





}