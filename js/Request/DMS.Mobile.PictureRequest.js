  if (typeof (DMS) == 'undefined') DMS = {};
	if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};
	
	
	
	DMS.Mobile.PictureRequest = {};
	
	DMS.Mobile.PictureRequest = 
	{
		connexion: null,
		ListPictureArticle : [],
		ListPicturePV : [],
		ListPictureClient : [],
		ListPictureFamille : [],
		
		
		
		///////////////// SELECT ALL PICTURE FORM SREVER ////////////////////////////
		
					//**************** ListPitureFamille ********************//
		GetListPictureFamilleFromServer : function(callbackViewModel)
	{
	var form = this;
		try
		{
			
			var Conf = JSON.parse(localStorage.getItem("Configuration"));
			 
			
			 var methode = "GetFamillePicture?";
			 var URL = Conf.URL+methode;
			 
			 
				DMS.Mobile.Common.CallService(function(Json,Form){
					
					form.CreatePictureFamilleDTO(Json,Form,callbackViewModel);},URL,form);
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : GetListPictureFamilleFromServer in PictureRequest",'alert','e'); 
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "GetListPictureFamilleFromServer";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListPictureFamille);
						});
		} 
		
	},
	
	CreatePictureFamilleDTO : function (json,form,callbackViewModel)
	{
		try
		{
			form.ListPictureFamille = [];
			var len = json.length;
			if ( len>0)
			{
				
				var synch = "true";
	
				for (var i=0;i<json.length;i++)
				{
				var PictureDTO = new DMS.Mobile.Picture();
				
				
				PictureDTO.PictureID = json[i].PictureID;
				PictureDTO.Name= json[i].Name;
				PictureDTO.FamilleID= json[i].FamilleID;
				PictureDTO.Byte= json[i].ImageBytes;
				
				
					form.DownloadPictureFamille(function(picture){
						
						//DMS.Mobile.ArticleRequest.connexion = form.connexion;
						//DMS.Mobile.ArticleRequest.SelectArticleByPicture(function(picture){},picture);
						form.insertPictureFamille(picture,synch,form,len,callbackViewModel);
					
					},PictureDTO)
				  
				}
			
			}
			else{callbackViewModel(form.ListPictureFamille);}	
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : CreatePictureFamilleDTO in PictureRequest",'alert','e'); 
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "CreatePictureFamilleDTO";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListPictureFamille);
						});
		} 
	},
	

	 DownloadPictureFamille: function(callback,picture){
		var form = this;
		 try
		 {
		 
		 
		 window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,function (fileSystem)
		 {
			 
			 fileSystem.root.getDirectory("Images", {create: true}, function (fileSystem)
		 {
			
			 fileSystem.getDirectory("famille", {create: true}, function (fileSystem)
		 {
			 
			 fileSystem.getFile(
        picture.Name, {create: true, exclusive: false}, 
        function gotFileEntry(fileEntry) {
            var sPath = fileEntry.fullPath.replace(picture.Name,"");
            var fileTransfer = new FileTransfer();
            fileEntry.remove();

            fileTransfer.download(
                "http://192.168.1.100:4001/Images/Famille/"+picture.Name,
                sPath + picture.Name,
                function(theFile) {
                    console.log("download complete: " + theFile.toURI());
                    
					callback(picture);
                },
                function(error) {
                    
					callback(picture);
                }
            );
        }, function(err){ DMS.Mobile.Common.errors(err,"gotFileEntry");
		

			     var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "DownloadPictureFamille gotFileEntry";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(picture);
						});
			   
			   
			   });
		
		
		 });
		 });
		 },null);
		 
		 }
		 catch(err)
		 {
			  var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "DownloadPictureFamille";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(picture);
						});
	     }
	
},
	
	
	insertPictureFamille : function(picture,synch,form,len,callbackViewModel)
	{
		try
		{
            form.InsertPictureFamilleIntoLocal(picture,synch,form,len,callbackViewModel);
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertPictureFamille in PictureRequest",'alert','e'); 
			           var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "insertPictureFamille";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListPictureFamille);
						});
		} 
	},
		

InsertPictureFamilleIntoLocal : function(PictureObject,synch,formReq,len,callbackViewModel) {

  try
  {
					    formReq.connexion.transaction(function(tx){ formReq.InsertIntoPictureFamille(tx, formReq,PictureObject,synch) }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoPictureFamille");
						
						var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "InsertIntoPictureFamille";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(formReq.ListPictureFamille);
						});
						
						},function(){formReq.insertPictureFamilleIntoArray(PictureObject,synch,formReq,len,callbackViewModel);}); 
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertPictureFamilleIntoLocal in PictureRequest",'alert','e'); 
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "InsertPictureFamilleIntoLocal";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(formReq.ListPictureFamille);
						});
		} 				   
					
           },

insertPictureFamilleIntoArray : function(Picture,synch,form,len,callbackViewModel)
	{
		try
		{
			form.ListPictureFamille.push(Picture);
			
			if(form.ListPictureFamille.length == len)
			{
				
				callbackViewModel(form.ListPictureFamille);
			}
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertPictureFamilleIntoArray in PictureRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "insertPictureFamilleIntoArray";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListPictureFamille);
						});
		} 
	},

	InsertIntoPictureFamille : function(requete,form,PictureObject,synch) {
try
{   

			requete.executeSql('INSERT INTO Pictures (PictureID, Name,Byte,FamilleID,Synch) VALUES( '+PictureObject.PictureID+',"'+PictureObject.Name+'","'+PictureObject.Byte+'",'+PictureObject.FamilleID+',"'+synch+'")');
			
    DMS.Mobile.Common.Alert("Fin insertion Pictures Famille"); 
	
	}
		catch(err)
		{
			 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "InsertIntoPictureFamille";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoPictureFamille in PictureRequest",'alert','e');
						});
		}       																																
    },
	//**********************************************************//		
		
		
		
		
					//**************** ListPitureClient ********************//
		GetListPictureClientFromServer : function(callbackViewModel)
	{
		var form = this;
		try
		{
			
			var Conf = JSON.parse(localStorage.getItem("Configuration"));
			 
			DMS.Mobile.Common.Alert("get list picture from server");
			 var methode = "GetClientPicture?";
			 var URL = Conf.URL+methode;
			 
			 
				DMS.Mobile.Common.CallService(function(Json,Form){form.CreatePictureClientDTO(Json,Form,callbackViewModel);},URL,form);
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : GetListPictureClientFromServer in PictureRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "GetListPictureClientFromServer";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListPictureClient);
						});
		} 
		
	},
	
	CreatePictureClientDTO : function (json,form,callbackViewModel)
	{
		try
		{
			form.ListPictureClient = [];
			var len = json.length;
			if ( len>0)
			{
				
				var synch = "true";
	
				for (var i=0;i<json.length;i++)
				{
				var PictureDTO = new DMS.Mobile.Picture();
				
				
				PictureDTO.PictureID = json[i].PictureID;
				PictureDTO.Name= json[i].Name;
				PictureDTO.ClientID= json[i].ClientID;
				PictureDTO.Byte= json[i].ImageBytes;
				
				
					form.DownloadPictureClient(function(picture){
						
						//DMS.Mobile.ArticleRequest.connexion = form.connexion;
						//DMS.Mobile.ArticleRequest.SelectArticleByPicture(function(picture){},picture);
						form.insertPictureClient(picture,synch,form,len,callbackViewModel);
					
					},PictureDTO)
				  
				}
			
			}
			else{callbackViewModel(form.ListPictureClient);}	
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : CreatePictureClientDTO in PictureRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "CreatePictureClientDTO";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListPictureClient);
						});
		} 
	},
	

	 DownloadPictureClient: function(callback,picture){
		 var form = this;
		 try
		 {
		 
		 window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,function (fileSystem)
		 {
			 
			 fileSystem.root.getDirectory("Images", {create: true}, function (fileSystem)
		 {
			
			 fileSystem.getDirectory("client", {create: true}, function (fileSystem)
		 {
			 
			 fileSystem.getFile(
        picture.Name, {create: true, exclusive: false}, 
        function gotFileEntry(fileEntry) {
            var sPath = fileEntry.fullPath.replace(picture.Name,"");
            var fileTransfer = new FileTransfer();
            fileEntry.remove();

            fileTransfer.download(
                "http://192.168.1.100:4000/Images/Client/"+picture.Name,
                sPath + picture.Name,
                function(theFile) {
                    console.log("download complete: " + theFile.toURI());
                    
					callback(picture);
                },
                function(error) {
                    
					callback(picture);
                }
            );
        }, function(err){ DMS.Mobile.Common.errors(err,"gotFileEntry");
		
		             var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "DownloadPictureClient gotFileEntry";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(picture);
						});
		
		         });
		 });
		 });
		 },null);
	
		 }
		 catch(err)
		 {
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "DownloadPictureClient";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(picture);
						});
		 }
},
	
	
	insertPictureClient : function(picture,synch,form,len,callbackViewModel)
	{
		try
		{
            form.InsertPictureClientIntoLocal(picture,synch,form,len,callbackViewModel);
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertPictureClient in PictureRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "insertPictureClient";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListPictureClient);
						});
		} 
	},
		

InsertPictureClientIntoLocal : function(PictureObject,synch,formReq,len,callbackViewModel) {

  try
  {
					    formReq.connexion.transaction(function(tx){ formReq.InsertIntoPictureClient(tx, formReq,PictureObject,synch) }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoPictureClient");
						
						 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "InsertIntoPictureClient";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(formReq.ListPictureClient);
						});
						
						},function(){formReq.insertPictureClientIntoArray(PictureObject,synch,formReq,len,callbackViewModel);}); 
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertPictureClientIntoLocal in PictureRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "InsertPictureClientIntoLocal";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(formReq.ListPictureClient);
						});
		} 				   
					
           },

insertPictureClientIntoArray : function(Picture,synch,form,len,callbackViewModel)
	{
		try
		{
			form.ListPictureClient.push(Picture);
			
			if(form.ListPictureClient.length == len)
			{
				
				callbackViewModel(form.ListPictureClient);
			}
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertPictureClientIntoArray in PictureRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "insertPictureClientIntoArray";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListPictureClient);
						});
		} 
	},

	InsertIntoPictureClient : function(requete,form,PictureObject,synch) {
try
{   

			requete.executeSql('INSERT INTO Pictures (PictureID, Name,Byte,ClientID,Synch) VALUES( '+PictureObject.PictureID+',"'+PictureObject.Name+'","'+PictureObject.Byte+'",'+PictureObject.ClientID+',"'+synch+'")');
			
    DMS.Mobile.Common.Alert("Fin insertion Pictures Client"); 
	
	}
		catch(err)
		{
			 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "InsertIntoPictureClient";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoPictureClient in PictureRequest",'alert','e');
						});
		}       																																
    },
	//**********************************************************//
		
		
				//**************** ListPiturePointVente ********************//
		GetListPicturePointVenteFromServer : function(callbackViewModel)
	{
		var form = this;
		try
		{
			
			var Conf = JSON.parse(localStorage.getItem("Configuration"));
			 
			DMS.Mobile.Common.Alert("get list picture from server");
			 var methode = "GetPointVentePicture?";
			 var URL = Conf.URL+methode;
			 
			 
				DMS.Mobile.Common.CallService(function(Json,Form){form.CreatePicturePointVenteDTO(Json,Form,callbackViewModel);},URL,form);
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : GetListPicturePointVenteFromServer in PictureRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "GetListPicturePointVenteFromServer";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListPicturePV);
						});
		} 
		
	},
	
	CreatePicturePointVenteDTO : function (json,form,callbackViewModel)
	{
		try
		{
			form.ListPicturePV = [];
			
			var len = json.length;
			if ( len>0)
			{
				
				var synch = "true";
	
				for (var i=0;i<json.length;i++)
				{
				var PictureDTO = new DMS.Mobile.Picture();
				
				
				PictureDTO.PictureID = json[i].PictureID;
				PictureDTO.Name= json[i].Name;
				PictureDTO.PointVenteID= json[i].PointVenteID;
				PictureDTO.Byte= json[i].ImageBytes;
				
				
					form.DownloadPicturePointVente(function(picture){
						
						//DMS.Mobile.ArticleRequest.connexion = form.connexion;
						//DMS.Mobile.ArticleRequest.SelectArticleByPicture(function(picture){},picture);
						form.insertPicturePointVente(picture,synch,form,len,callbackViewModel);
					
					},PictureDTO)
				  
				}
			
			}
			else{callbackViewModel(form.ListPicturePV);}	
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : GetListPicturePointVenteFromServer in PictureRequest",'alert','e'); 
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "GetListPicturePointVenteFromServer";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListPicturePV);
						});
		} 
	},
	

	 DownloadPicturePointVente: function(callback,picture){
		var form = this;
		try
		{
		 window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,function (fileSystem)
		 {
			 
			 fileSystem.root.getDirectory("Images", {create: true}, function (fileSystem)
		 {
			
			 fileSystem.getDirectory("pointVente", {create: true}, function (fileSystem)
		 {
			 
			 fileSystem.getFile(
        picture.Name, {create: true, exclusive: false}, 
        function gotFileEntry(fileEntry) {
            var sPath = fileEntry.fullPath.replace(picture.Name,"");
            var fileTransfer = new FileTransfer();
            fileEntry.remove();

            fileTransfer.download(
                "http://192.168.1.100:4000/Images/pointvente/"+picture.Name,
                sPath + picture.Name,
                function(theFile) {
                    console.log("download complete: " + theFile.toURI());
                    
					callback(picture);
                },
                function(error) {
                    
					callback(picture);
                }
            );
        }, function(err){ DMS.Mobile.Common.errors(err,"gotFileEntry");
		
		                 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "DownloadPicturePointVente gotFileEntry";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(picture)
						});
		
		       });
		 });
		 });
		 },null);
		}
		catch(err)
		{
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "DownloadPicturePointVente";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(picture)
						});
		}
	
},
	
	
	insertPicturePointVente : function(picture,synch,form,len,callbackViewModel)
	{
		try
		{
            form.InsertPicturePointVenteIntoLocal(picture,synch,form,len,callbackViewModel);
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertPicturePointVente in PictureRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "insertPicturePointVente";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListPicturePV)
						});
		} 
	},
		

InsertPicturePointVenteIntoLocal : function(PictureObject,synch,formReq,len,callbackViewModel) {

  try
  {
					    formReq.connexion.transaction(function(tx){ formReq.InsertIntoPicturePV(tx, formReq,PictureObject,synch) }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoPicturePV");
						
						var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "InsertIntoPicturePV";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(formReq.ListPicturePV)
						});
						
						},function(){formReq.insertPicturePVIntoArray(PictureObject,synch,formReq,len,callbackViewModel);}); 
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertPicturePointVenteIntoLocal in PictureRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "InsertPicturePointVenteIntoLocal";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(formReq.ListPicturePV)
						});
		} 				   
					
           },

insertPicturePVIntoArray : function(Picture,synch,form,len,callbackViewModel)
	{
		try
		{
			form.ListPicturePV.push(Picture);
			
			if(form.ListPicturePV.length == len)
			{
				
				callbackViewModel(form.ListPicturePV);
			}
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertPicturePVIntoArray in PictureRequest",'alert','e'); 
			
			              var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "insertPicturePVIntoArray";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListPicturePV)
						});
		} 
	},

	InsertIntoPicturePV : function(requete,form,PictureObject,synch) {
try
{   

			requete.executeSql('INSERT INTO Pictures (PictureID, Name,Byte,PointVenteID,Synch) VALUES( '+PictureObject.PictureID+',"'+PictureObject.Name+'","'+PictureObject.Byte+'",'+PictureObject.PointVenteID+',"'+synch+'")');
			
    DMS.Mobile.Common.Alert("Fin insertion Pictures PointVente"); 
	
	}
		catch(err)
		{
			
			
			             var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "InsertIntoPicturePV";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoPicturePV in PictureRequest",'alert','e'); 
						});
		}       																																
    },
	//**********************************************************//
		
		
		
		
		
		
		
		//**************** ListPitureArticle ********************//
		GetListPictureArticleFromServer : function(callbackViewModel)
	{
		var form = this;
		try
		{
			
			var Conf = JSON.parse(localStorage.getItem("Configuration"));
			 
			DMS.Mobile.Common.Alert("get list picture from server");
			 var methode = "GetarticlesPicture?";
			 var URL = Conf.URL+methode;
			 
			 
				DMS.Mobile.Common.CallService(function(Json,Form){form.CreatePictureDTO(Json,Form,callbackViewModel);},URL,form);
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : GetListPictureArticleFromServer in PictureRequest",'alert','e'); 
		
		 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "GetListPictureArticleFromServer";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListPictureArticle);
						});
		
		} 
		
	},
	
	CreatePictureDTO : function (json,form,callbackViewModel)
	{
		try
		{
			form.ListPicture = [];
			var len = json.length;
			if ( len>0)
			{
				
				var synch = "true";
	
				for (var i=0;i<json.length;i++)
				{
				var PictureDTO = new DMS.Mobile.Picture();
				
				
				PictureDTO.PictureID = json[i].PictureID;
				PictureDTO.Name= json[i].Name;
				PictureDTO.ArticleID= json[i].Article;
				PictureDTO.Byte= json[i].ImageBytes;
				
				
					form.DownloadPicture(function(picture){
						
						//DMS.Mobile.ArticleRequest.connexion = form.connexion;
						//DMS.Mobile.ArticleRequest.SelectArticleByPicture(function(picture){},picture);
						form.insertPicture(picture,synch,form,len,callbackViewModel);
					
					},PictureDTO)
				  
				}
			
			}
			else{callbackViewModel(form.ListPictureArticle);}	
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : CreatePictureDTO in PictureRequest",'alert','e'); 
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "CreatePictureDTO";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListPictureArticle);
						});
		} 
	},
	
	/*DownloadPicture : function(callback,picture){
		
		var fileTransfer = new FileTransfer();
			alert(window.appRootDir.fullPath);
		fileTransfer.download(
			"http://192.168.1.8/ninject/"+picture.Name,
			window.appRootDir.fullPath + "/" +picture.Name,
			function(entry) {
				console.log("download complete: " + entry.fullPath);
				callback();
			},
			function(error) {
				console.log("download error source " + error.source);
				console.log("download error target " + error.target);
				console.log("upload error code" + error.code);
				callback()
			}
		);
		
		
		
	},*/
	
	
	 DownloadPicture: function(callback,picture){
	var form = this;
	try
	{
		 window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,function (fileSystem)
		 {
			 
			 fileSystem.root.getDirectory("Images", {create: true}, function (fileSystem)
		 {
			
			 fileSystem.getDirectory("article", {create: true}, function (fileSystem)
		 {
			 
			 fileSystem.getFile(
        picture.Name, {create: true, exclusive: false}, 
        function gotFileEntry(fileEntry) {
            var sPath = fileEntry.fullPath.replace(picture.Name,"");
            var fileTransfer = new FileTransfer();
            fileEntry.remove();

            fileTransfer.download(
                "http://192.168.1.100:4000/Images/article/"+picture.Name,
                sPath + picture.Name,
                function(theFile) {
                    console.log("download complete: " + theFile.toURI());
                    
					callback(picture);
                },
                function(error) {
                    
					callback(picture);
                }
            );
        }, function(err){ DMS.Mobile.Common.errors(err,"gotFileEntry");
		
		var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "DownloadPicture gotFileEntry";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(picture);
						});
		
		           });
		 });
		 });
		 },null);
		 
	}
	catch(err)
	{
		var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "DownloadPicture";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(picture);
						});
	}
		 
		 
		 
		 
		 
		 
		 
/*window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
    function onFileSystemSuccess(fileSystem) {
        fileSystem.root.getFile(
        picture.Name, {create: true, exclusive: false}, 
        function gotFileEntry(fileEntry) {
            var sPath = fileEntry.fullPath.replace(picture.Name,"");
            var fileTransfer = new FileTransfer();
            fileEntry.remove();

            fileTransfer.download(
                "http://192.168.1.7/ninject/"+picture.Name,
                sPath + picture.Name,
                function(theFile) {
                    console.log("download complete: " + theFile.toURI());
                    alert(theFile.toURI());
					callback();
                },
                function(error) {
                    alert("download error source " + error.source);
                    alert("download error target " + error.target);
                    alert("upload error code: " + error.code);
					callback();
                }
            );
        }, function(err){ DMS.Mobile.Common.errors(err,"gotFileEntry");callback();});
    }, function(err){ DMS.Mobile.Common.errors(err,"getFile");callback();});*/
},
	
	
	insertPicture : function(picture,synch,form,len,callbackViewModel)
	{
		try
		{
            form.InsertPictureIntoLocal(picture,synch,form,len,callbackViewModel);
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertPicture in PictureRequest",'alert','e'); 
		  
		          var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "insertPicture";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListPictureArticle);
						});
		} 
	},
		
			 InsertPictureIntoLocal: function(PictureObject,synch,formReq,len,callbackViewModel) {
try
{
					    formReq.connexion.transaction(function(tx){ formReq.InsertIntoPicture(tx, formReq,PictureObject,synch) }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoPicture");
						
						var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "InsertIntoPicture";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(formReq.ListPictureArticle);
						});
						
						},function(){formReq.insertPictureIntoArray(PictureObject,synch,formReq,len,callbackViewModel);}); 
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertPictureIntoLocal in PictureRequest",'alert','e'); 
			
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "InsertPictureIntoLocal";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(formReq.ListPictureArticle);
						});
		} 				   
					
           },

insertPictureIntoArray : function(Picture,synch,form,len,callbackViewModel)
	{
		try
		{
			form.ListPictureArticle.push(Picture);
			
			if(form.ListPictureArticle.length == len)
			{
				
				callbackViewModel(form.ListPictureArticle);
			}
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertPictureIntoArray in PictureRequest",'alert','e'); 
			
			             var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "insertPictureIntoArray";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListPictureArticle);
						});
		} 
	},

	InsertIntoPicture : function(requete,form,PictureObject,synch) {
try
{   

			requete.executeSql('INSERT INTO Pictures (PictureID, Name,Byte,ArticleID,Synch) VALUES( '+PictureObject.PictureID+',"'+PictureObject.Name+'","'+PictureObject.Byte+'",'+PictureObject.ArticleID+',"'+synch+'")');
			
    DMS.Mobile.Common.Alert("Fin insertion Pictures"); 
	
	}
		catch(err)
		{
			
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "InsertIntoPicture";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoPicture in PictureRequest",'alert','e'); 
						});
		}       																																
    },
	//**********************************************************//
	/////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	
	///////////////////// SELECT PICTURE POINT VENTE /////////////////////
	SelectPictureByPV : function (callback,pointVente)
	{
		var form = this;
		try
		{	
		 
	 
				
			this.connexion.transaction(function(tx){ form.SelectFromPictureByPV(tx, form,pointVente,callback) ;}, function(err){ DMS.Mobile.Common.errors(err,"SelectFromPictureByPV");
			
			           var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "SelectFromPictureByPV";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(pointVente);
						});
			
			});
			
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectPictureByPV in PictureRequest",'alert','e'); 
				        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "SelectPictureByPV";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(pointVente);
						});
			}
				
	},
	
	SelectFromPictureByPV : function(requete, form,pointVente,callback)
	{
		 	try
			{
				//alert("pv id = "+pointVente.PointVenteID);
				requete.executeSql('SELECT * FROM Pictures WHERE PointVenteID = ?', [pointVente.PointVenteID], function(tx, results) {form.querySuccessPicturePV(tx,pointVente,results,form,callback);});
		   }
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromPictureByPV in PictureRequest",'alert','e'); 
				
				 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "SelectFromPictureByPV";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(pointVente);
						});
			}
	},
	
	querySuccessPicturePV : function(tx,pointVente,results,form,callback)
	{
			try
			{
				
			var len = results.rows.length;
		
			if(len>0)
			{
			//	alert("ici");
				var oPicture = new DMS.Mobile.Picture();
				
				oPicture.PictureID = results.rows.item(0).PictureID;
				oPicture.Name = results.rows.item(0).Name;
				//oPicture.ArticleID = results.rows.item(0).ArticleID;
				//oPicture.ClientID = results.rows.item(0).ClientID;
				oPicture.PointVenteID = results.rows.item(0).PointVenteID;
				oPicture.Byte = results.rows.item(0).Byte;
				
				pointVente.Picture = oPicture;
			
			}
		//	alert("callback");
			callback(pointVente);
			
			
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessPicturePV in PictureRequest",'alert','e'); 
				
				 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "querySuccessPicturePV";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(pointVente);
						});
			}
	},
	
	
	
	////////***************************************************************//
		///////////////////// SELECT PICTURE Client /////////////////////
	SelectPictureByClient : function (callback,client)
	{
		var form = this;	
		try
		{	
		 
	 
			
			this.connexion.transaction(function(tx){ form.SelectFromPictureByClient(tx, form,client,callback) ;}, function(err){ DMS.Mobile.Common.errors(err,"SelectFromPictureByClient");
			
			       var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "SelectFromPictureByClient";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(client);
						});
				   
			});
			
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectPictureByClient in PictureRequest",'alert','e'); 
				
				 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "SelectPictureByClient";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(client);
						});
			}
		
	},
	
	SelectFromPictureByClient : function(requete, form,client,callback)
	{
		 	try
			{
				
				requete.executeSql('SELECT * FROM Pictures WHERE ClientID = ?', [client.ClientID], function(tx, results) {form.querySuccessPictureClient(tx,client,results,form,callback);});
		   }
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromPictureByClient in PictureRequest",'alert','e'); 
				
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "SelectFromPictureByClient";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(client);
						});
			}
	},
	
	querySuccessPictureClient : function(tx,client,results,form,callback)
	{
			try
			{
				
			var len = results.rows.length;
			if(len>0)
			{
			
				var oPicture = new DMS.Mobile.Picture();
				
				oPicture.PictureID = results.rows.item(0).PictureID;
				oPicture.Name = results.rows.item(0).Name;
			    oPicture.ArticleID = results.rows.item(0).ArticleID;
				oPicture.ClientID = results.rows.item(0).ClientID;
				oPicture.PointVenteID = results.rows.item(0).PointVenteID;
				oPicture.Byte = results.rows.item(0).Byte;
				
				client.Picture = oPicture;
			
			}
			callback(client);
			
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessPictureClient in PictureRequest",'alert','e'); 
				
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "querySuccessPictureClient";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(client);
						});
			}
	},
	
	//------------------------------ -------------------//
			///////////////////// SELECT PICTURE Article /////////////////////
	SelectPictureByArticle : function (callback,article)
	{
		var form = this;
		try
		{	
		 
	 
				
			this.connexion.transaction(function(tx){ form.SelectFromPictureByArticle(tx, form,article,callback) ;}, function(err){ DMS.Mobile.Common.errors(err,"SelectFromPictureByArticle");
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "SelectFromPictureByArticle";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(article);
						});
			
			});
			
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectPictureByArticle in PictureRequest",'alert','e'); 
				
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "SelectPictureByArticle";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(article);
						});
			}
		
	},
	
	SelectFromPictureByArticle : function(requete, form,article,callback)
	{
		 	try
			{
				
				requete.executeSql('SELECT * FROM Article WHERE ArticleID = ?', [article.ArticleID], function(tx, results) {form.querySuccessPictureArticle(tx,article,results,form,callback);});
		   }
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromPictureByArticle in PictureRequest",'alert','e'); 
				
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "SelectFromPictureByArticle";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(article);
						});
			}
	},
	
	querySuccessPictureArticle : function(tx,article,results,form,callback)
	{
			try
			{
				
			var len = results.rows.length;
			if(len>0)
			{
			
				var oPicture = new DMS.Mobile.Picture();
				
				oPicture.PictureID = results.rows.item(0).PictureID;
				oPicture.Name = results.rows.item(0).Name;
			    oPicture.ArticleID = results.rows.item(0).ArticleID;
				oPicture.ClientID = results.rows.item(0).ClientID;
				oPicture.PointVenteID = results.rows.item(0).PointVenteID;
				oPicture.Byte = results.rows.item(0).Byte;
				
				article.Picture = oPicture;
			
			}
			callback(article);
			
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessPictureArticle in PictureRequest",'alert','e'); 
				
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "querySuccessPictureArticle";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(article);
						});
			}
	},
	
	
	
	
	///////////////////////////////////////////////////
	
	
	
	
	//////////////////////////////////// SELECT FORM LOCAL /////////////////////////////////
	
	
	selectAllFamillePicture : function (callback)
	{
			var form = this;	
		try
		{	
			this.connexion.transaction(function(tx){ form.SelectFamilleFromPicture(tx, form,callback); }, function(err){ DMS.Mobile.Common.errors(err,"SelectFamilleFromPicture");
			
			     var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "SelectFamilleFromPicture";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.ListPictureFamille);
						});
			
			});
			
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : selectAllFamillePicture in PictureRequest",'alert','e'); 
				
				
				 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "selectAllFamillePicture";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.ListPictureFamille);
						});
			}
	},
	
	SelectFamilleFromPicture : function(requete,form,callback) {
			try
			{
				
				requete.executeSql('SELECT * FROM Pictures WHERE FamilleID IS NOT NULL AND ArticleID IS NULL AND ClientID IS NULL AND PointVenteID IS NULL', [], function(tx, results) {form.querySuccessAllFamille(tx,results,form,callback);});
		   }
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFamilleFromPicture in PictureRequest",'alert','e'); 
				
				
				 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "SelectFamilleFromPicture";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.ListPictureFamille);
						});
			}
		},
		
		querySuccessAllFamille:function (requete, results,form,callback) {
			try
			{
				
			var len = results.rows.length;
			if(len>0){
			for (var i=0;i<len;i++){
				var oPicture = new DMS.Mobile.Picture();
				
				oPicture.PictureID = results.rows.item(i).PictureID;
				oPicture.Name = results.rows.item(i).Name;
				oPicture.FamilleID = results.rows.item(i).FamilleID;
				oPicture.Byte = results.rows.item(i).Byte;
				
				
						DMS.Mobile.FamilleRequest.connexion = form.connexion;
						DMS.Mobile.FamilleRequest.SelectFamilleByPicture(function(picture){form.insertPictureFamilleIntoListPicture(picture,form,len,callback);},oPicture);
		
				//form.insertPictureIntoListPicture(oPicture,form,len,callback);
			}
			}else
			{callback(form.ListPictureFamille);}
				}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessAllFamille in PictureRequest",'alert','e'); 
				
				 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "querySuccessAllFamille";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.ListPictureFamille);
						});
			}
		},
		
		insertPictureFamilleIntoListPicture : function(oPicture,form,len,callback)	
		{
			
			try
			{
		
			form.ListPictureFamille.push(oPicture);
			if(form.ListPictureFamille.length == len)
			{
			
				callback(form.ListPictureFamille);
							
			}
			
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : insertPictureFamilleIntoListPicture in PictureRequest",'alert','e'); 
				
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "insertPictureFamilleIntoListPicture";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.ListPictureFamille);
						});
			}
		},
	
	
	SelectAll: function (callback) {
				var form = this;
		try
		{	
		
			this.connexion.transaction(function(tx){ form.SelectFromPicture(tx, form,callback); }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromPicture");
			
			     var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "SelectFromPicture";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.ListPictureArticle);
						});
			
			});
			
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAll in PictureRequest",'alert','e'); 
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "SelectAll";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.ListPictureArticle);
						});
			}
		},
		
		
		SelectFromPicture : function(requete,form,callback) {
			try
			{
				
				requete.executeSql('SELECT * FROM Pictures WHERE ArticleID IS NOT NULL AND ClientID IS NULL AND PointVenteID IS NULL', [], function(tx, results) {form.querySuccess(tx,results,form,callback);});
		   }
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromPicture in PictureRequest",'alert','e'); 
				
				 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "SelectFromPicture";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.ListPictureArticle);
						});
			}
		},
		
		
		querySuccess:function (requete, results,form,callback) {
			try
			{
				
			var len = results.rows.length;
			if(len>0){
			for (var i=0;i<len;i++){
				var oPicture = new DMS.Mobile.Picture();
				
				oPicture.PictureID = results.rows.item(i).PictureID;
				oPicture.Name = results.rows.item(i).Name;
				oPicture.ArticleID = results.rows.item(i).ArticleID;
				oPicture.Byte = results.rows.item(i).Byte;
				
				
						DMS.Mobile.ArticleRequest.connexion = form.connexion;
						DMS.Mobile.ArticleRequest.SelectArticleByPicture(function(picture){form.insertPictureIntoListPicture(picture,form,len,callback);},oPicture);
		
				//form.insertPictureIntoListPicture(oPicture,form,len,callback);
			}
			}else
			{callback(form.ListPictureArticle);}
				}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccess in PictureRequest",'alert','e'); 
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "querySuccess";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.ListPictureArticle);
						});
			}
		},
		
		insertPictureIntoListPicture : function(oPicture,form,len,callback)	
		{
			
			try
			{
		
			form.ListPictureArticle.push(oPicture);
			if(form.ListPictureArticle.length == len)
			{
			
				callback(form.ListPictureArticle);
							
			}
			
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : insertPictureIntoListPicture in PictureRequest",'alert','e'); 
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "insertPictureIntoListPicture";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.ListPictureArticle);
						});
			}
		},
		
		
		//////////////////////////////////////// Delete All Pictures ////////////////////////
DeleteAllPicture : function(callback)
{
	var form = this;	
	try
	{
			
			this.connexion.transaction(function(tx){ form.DeletePicture(tx, form,callback);}, function(err){ DMS.Mobile.Common.errors(err,"DeletePicture");
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "DeletePicture";
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
			DMS.Mobile.Notification.ShowMessage(err.message+" : DeleteAllPicture in PictureRequest",'alert','e'); 
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "DeleteAllPicture";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
	 }	
}, 

DeletePicture : function(requete, form,callback)
{
	requete.executeSql("DELETE  FROM Pictures ", [],
              function(tx, result) {				
				form.querySuccessDELETEAll(form,callback);
				}, 
                function(err){DMS.Mobile.Common.errors(err,"DeletePicture");
				          
						  var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PictureRequest";
						exception.FonctionE = "DeletePicture";
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