if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};
		
	
DMS.Mobile.FamilleRequest = {};
	
DMS.Mobile.FamilleRequest = 
{
		connexion : null,
		ListFamille : [],
		

	
GetListFamilleFromServer : function(callbackViewModel)
{
	var form = this;
	try
	{
	    var Conf = JSON.parse(localStorage.getItem("Configuration"));
		
		DMS.Mobile.Common.Alert("get list famille from server");
		 var methode = "GetListFamilleDTO";
		 var URL = Conf.URL+methode;
		 
		 
		    DMS.Mobile.Common.CallService(function(Json,Form){form.CreateFamilleDTO(Json,Form,callbackViewModel);},URL,form);
		
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : GetListFamilleFromServer in FamilleRequest",'alert','e'); 
			
			     var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FamilleRequest";
						exception.FonctionE = "GetListFamilleFromServer";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.ListFamille);
						});
			
		}
},

CreateFamilleDTO : function (json,form,callbackViewModel)
	{
		try
		{
			form.ListFamille = [];
			var len = json.length;
		if (len>0)
		{
			var synch = "true";
            

			for (var i=0;i<json.length;i++)
			{
			var familleDTO = new DMS.Mobile.Famille();
			familleDTO.FamilleID = json[i].FamilleID;
			familleDTO.Designation = json[i].Designation;
			familleDTO.GammeID = json[i].GammeID;
			familleDTO.ListArticles = json[i].Articles;
			familleDTO.Gammes = json[i].Gammes;
			familleDTO.ListPromotions = json[i].Promotions;
			familleDTO.ListRelevePresencePrixConcurrents = json[i].RelevePresencePrixConcurrents;
			familleDTO.ListRelevePrix = json[i].RelevePrix;
			
			
			
		        form.insertFamille(familleDTO,synch,form,len,callbackViewModel);
			}
			
		}
		else{callbackViewModel(form.ListFamille);}	
		
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : CreateFamilleDTO in FamilleRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FamilleRequest";
						exception.FonctionE = "CreateFamilleDTO";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.ListFamille);
						});
		}
},
	
	
	insertFamilleIntoArray : function(FamilleObject,form,len,callbackViewModel)
	{
		try
		{
		form.ListFamille.push(FamilleObject);
		if (form.ListFamille.length == len)
		{
			callbackViewModel(form.ListFamille);
		}
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertFamilleIntoArray in FamilleRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FamilleRequest";
						exception.FonctionE = "insertFamilleIntoArray";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.ListFamille);
						});
		}
	},
	
insertFamille : function(famille,synch,form,len,callbackViewModel)
{
	try
	{
     form.InsertFamilleIntoLOCAL(famille,synch,form,len,callbackViewModel);
	 	}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertFamille in FamilleRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FamilleRequest";
						exception.FonctionE = "insertFamille";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.ListFamille);
						});
		}
},


InsertFamilleIntoLOCAL: function(FamilleObject,synch,formReq,len,callbackViewModel) 
{
	try
	{
   formReq.connexion.transaction(function(tx){ formReq.InsertIntoFamille(tx, formReq,FamilleObject,synch); }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoFamille");
   
           var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FamilleRequest";
						exception.FonctionE = "InsertIntoFamille";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.ListFamille);
						});
	   
   },function(){formReq.insertFamilleIntoArray(FamilleObject,formReq,len,callbackViewModel);}); 
					   
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertFamilleIntoLocal in FamilleRequest",'alert','e'); 
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FamilleRequest";
						exception.FonctionE = "InsertFamilleIntoLocal";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callbackViewModel(form.ListFamille);
						});
			
		}
},

InsertIntoFamille : function(requete,form,FamilleObject,synch) {
   try
   {
			requete.executeSql('INSERT INTO Familles (FamilleID, Designation,GammeID, Synch) VALUES('+FamilleObject.FamilleID+',"'+FamilleObject.Designation+'",'+FamilleObject.GammeID+',"'+synch+'")');
			
    DMS.Mobile.Common.Alert("Fin insertion Famille");   
		}
			catch(err)
		{
			 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FamilleRequest";
						exception.FonctionE = "InsertIntoFamille";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoFamille in FamilleRequest",'alert','e');
						});
		}    																																
},

////////////////////////////////////////////////////////////////////////////////////////////

SelectAll: function (callback) {
		var form = this;
		try
		{	 //alert"SelectAll famille request");
				
			this.connexion.transaction(function(tx){ form.SelectFromFamille(tx, form,callback); }, function(err){ DMS.Mobile.Common.errors(err,"SelectFromFamille");
			 
			    var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FamilleRequest";
						exception.FonctionE = "SelectFromFamille";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(form.ListFamille);
						});
			
			});
			
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAll in FamilleRequest",'alert','e');
				
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FamilleRequest";
						exception.FonctionE = "SelectAll";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(form.ListFamille);
						}); 
			}
		},
		
		
		SelectFromFamille : function(requete,form,callback) {
			try
			{
				//alert"SelectFromFamille famille request");
				requete.executeSql('SELECT * FROM Familles', [], function(tx, results) {form.querySuccess(tx,results,form,callback);});
		   }
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromFamille in FamilleRequest",'alert','e');                 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FamilleRequest";
						exception.FonctionE = "SelectFromFamille";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(form.ListFamille);
						});
			}
		},
		
		
		querySuccess:function (requete, results,form,callback) {
			try
			{
				//alert"querySuccess famille request");
			var len = results.rows.length;
			//alert"len = "+len);
			for (var i=0;i<len;i++){
				var oFamille = new DMS.Mobile.Famille();
					
				oFamille.FamilleID = results.rows.item(i).FamilleID;
				oFamille.Designation = results.rows.item(i).Designation;
				oFamille.GammeID = results.rows.item(i).GammeID;
				
				
				oFamille.ListArticles = [];
				
				
				
				
		DMS.Mobile.ArticleRequest.connexion = form.connexion;
		DMS.Mobile.ArticleRequest.SelectArticle(function(famille){form.insertfamilleIntoFamilleList(famille,form,len,callback);},oFamille);							
				
				}
				
				}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccess in FamilleRequest",'alert','e'); 
				
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FamilleRequest";
						exception.FonctionE = "querySuccess";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(form.ListFamille);
						});
			}
		},
		
		insertfamilleIntoFamilleList : function(famille,form,len,callback)	
		{
			try
			{
				//alert"insertfamilleIntoFamilleList");
			
			form.ListFamille.push(famille);
			//alert"iform.ListFamille.length == len "+ form.ListFamille.length +"=="+ len);
			if(form.ListFamille.length == len)
			{
				//alert"callback listfamille");
				callback(form.ListFamille);
							
			}
			
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : insertfamilleIntoFamilleList in FamilleRequest",'alert','e'); 
				
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FamilleRequest";
						exception.FonctionE = "insertfamilleIntoFamilleList";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(form.ListFamille);
						});
			}
		},


		
/////////////////////////////////////////////////// Select Famille By Gamme ID /////////////////


SelectFamilleByPicture : function(callback,picture)
{
	 var form = this;
	    try
    {
		   	
			this.connexion.transaction(function(tx){ form.SelectFromFamilleByFamilleID(tx, form,picture,callback) ;}, function(err){ DMS.Mobile.Common.errors(err,"SelectFromFamilleByFamilleID");
			
			      var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FamilleRequest";
						exception.FonctionE = "SelectFromFamilleByFamilleID";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(gamme);
						});
			
			});
    }
	catch (err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromFamilleByFamilleID in FamilleRequest",'alert','e');
		
		var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FamilleRequest";
						exception.FonctionE = "SelectFromFamilleByFamilleID";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(gamme);
						}); 
	}
},

SelectFromFamilleByFamilleID : function(requete, form,picture,callback)
{
	try
			{
					requete.executeSql("SELECT * FROM Familles WHERE FamilleID =?", [picture.FamilleID], function(tx, results) {form.querySuccessFamilleByFamilleID(tx,results,picture,form,callback);});
		   }
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromFamilleByFamilleID in FamilleRequest",'alert','e'); 
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FamilleRequest";
						exception.FonctionE = "SelectFromFamilleByFamilleID";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(gamme);
						}); 
			}
},

querySuccessFamilleByFamilleID : function(tx,results,picture,form,callback)
{
	try
	{
		var len = results.rows.length;
			if(len>0){
			
				
			var oFamille = new DMS.Mobile.Famille();
			
			
				
				oFamille.ListArticles = [];	
				oFamille.FamilleID = results.rows.item(0).FamilleID;
				oFamille.Designation = results.rows.item(0).Designation;
				oFamille.GammeID = results.rows.item(0).GammeID;
				
				
								
		DMS.Mobile.ArticleRequest.connexion = form.connexion;
		DMS.Mobile.ArticleRequest.SelectArticle(function(FamilleArticle){
			picture.Famille = FamilleArticle;
			callback(picture);
			
			},oFamille);							
				
			
			}else
			{callback(picture);}
				}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessFamilleByFamilleID in FamilleRequest",'alert','e'); 
				
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FamilleRequest";
						exception.FonctionE = "querySuccessFamilleByFamilleID";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(gamme);
						});
			}
},



SelectFamilleByGammeID : function(callback,gamme)
{
	 var form = this;
	    try
    {
		   	
			this.connexion.transaction(function(tx){ form.SelectFromFamilleByGammeID(tx, form,gamme,callback) ;}, function(err){ DMS.Mobile.Common.errors(err,"SelectFromFamilleByGammeID");
			
			      var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FamilleRequest";
						exception.FonctionE = "SelectFromFamilleByGammeID";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(gamme);
						});
			
			});
    }
	catch (err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFamilleByGammeID in FamilleRequest",'alert','e');
		
		var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FamilleRequest";
						exception.FonctionE = "SelectFamilleByGammeID";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(gamme);
						}); 
	}
},

SelectFromFamilleByGammeID : function(requete, form,gamme,callback)
{
	try
			{
					requete.executeSql("SELECT * FROM Familles WHERE GammeID =?", [gamme.GammeID], function(tx, results) {form.querySuccessFamilleByGammeID(tx,results,gamme,form,callback);});
		   }
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromFamilleByGammeID in FamilleRequest",'alert','e'); 
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FamilleRequest";
						exception.FonctionE = "SelectFromFamilleByGammeID";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(gamme);
						}); 
			}
},

querySuccessFamilleByGammeID : function(tx,results,gamme,form,callback)
{
	try
	{
		var len = results.rows.length;
			if(len>0){
			for (var i=0;i<len;i++){
				
			var oFamille = new DMS.Mobile.Famille();
			
			
				
				oFamille.ListArticles = [];	
				oFamille.FamilleID = results.rows.item(i).GammeID;
				oFamille.Designation = results.rows.item(i).Designation;
				oFamille.GammeID = results.rows.item(i).GammeID;
				
				
								
		DMS.Mobile.ArticleRequest.connexion = form.connexion;
		DMS.Mobile.ArticleRequest.SelectArticle(function(FamilleArticle){
			form.insertFamilleIntoGamme(gamme,len,FamilleArticle,callback);
			},oFamille);							
				
			}
			}else
			{callback(gamme);}
				}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessFamilleByGammeID in FamilleRequest",'alert','e'); 
				
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FamilleRequest";
						exception.FonctionE = "querySuccessFamilleByGammeID";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(gamme);
						});
			}
},

insertFamilleIntoGamme : function(gamme,len,oFamille,callback)
{
	try
	{
		gamme.ListFamilles.push(oFamille);
		if (gamme.ListFamilles.length == len)
		{
			callback(gamme);
		}
	}
	catch(err)
	{
		var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FamilleRequest";
						exception.FonctionE = "insertFamilleIntoGamme";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = this.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(gamme);
						});
	}
},

////////////////////////////////////////////////////////////////////////////////////////////////
	 
			 //////////////////////////////////////// Delete All Famille ////////////////////////
DeleteAllFamille : function(callback)
{
	var form = this;
	try
	{
				
			this.connexion.transaction(function(tx){ form.DeleteFamilles(tx, form,callback);}, function(err){ DMS.Mobile.Common.errors(err,"DeleteFamilles");
			
			      var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FamilleRequest";
						exception.FonctionE = "DeleteFamilles";
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
			DMS.Mobile.Notification.ShowMessage(err.message+" : DeleteAllFamille in FamilleRequest",'alert','e'); 
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FamilleRequest";
						exception.FonctionE = "DeleteAllFamille";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback();
						});
	 }	
}, 

DeleteFamilles : function(requete, form,callback)
{
	requete.executeSql("DELETE  FROM Familles ", [],
              function(tx, result) {				
				form.querySuccessDELETEAll(form,callback);
				}, 
                function(err){DMS.Mobile.Common.errors(err,"DeleteFamilles");
				
				        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "FamilleRequest";
						exception.FonctionE = "DeleteFamilles";
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