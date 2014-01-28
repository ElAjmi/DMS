if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.PromotionArticleRequest = {};

DMS.Mobile.PromotionArticleRequest = 
{
	connexion : null,
	ListPromotionArticle : [],
	
	////////////////////////////////////// Serveur ////////////////////////////
	
	SelectAllPromotionArticleFromServer : function(callbackViewModel)
	{
		try
		{
			var Conf = JSON.parse(localStorage.getItem("Configuration"));
			
			var form = this;
		  
			var methode= "getAllPromotionArticle?";
	
			var URL = Conf.URL+methode;
	
			 DMS.Mobile.Common.CallService(function(JsonObject,Form){form.createPromotionArticleDTO(JsonObject,Form,callbackViewModel);},URL,form);
			 
			
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllPromotionArticleFromServer in PromotionArticleRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionArticleRequest";
						exception.FonctionE = "SelectAllPromotionArticleFromServer";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListPromotionArticle);
						});
		}
	},
	
	SelectAllFidelisationArticleFromServer : function(callbackViewModel, PersonnelID)
	{
		try
		{
			var Conf = JSON.parse(localStorage.getItem("Configuration"));
			
			var form = this;
		     var Data = "PersonnelID="+PersonnelID; 
			var methode= "getAllFidelisationArticle?";
	
			var URL = Conf.URL+methode+Data;
	
			 DMS.Mobile.Common.CallService(function(JsonObject,Form){form.createPromotionArticleDTO(JsonObject,Form,callbackViewModel);},URL,form);
			 
			
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllFidelisationArticleFromServer in PromotionArticleRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionArticleRequest";
						exception.FonctionE = "SelectAllFidelisationArticleFromServer";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListPromotionArticle);
						});
		}
	},
		createPromotionArticleDTO : function(json,form,callbackViewModel)
	{
		try
		{
			form.ListPromotionArticle = [];
			var len = json.length;
		if ( len>0)
		{
			var synch = "true";
			
			for (var i=0;i<json.length;i++)
			{
				var promotionArticleDTO = new DMS.Mobile.PromotionArticle();
			

	            promotionArticleDTO.PromotionID = json[i].PromotionID;
				 promotionArticleDTO.ListArticleFamilleGamme = [];
				
				for (var j = 0;j<json[i].ListArticleFamilleGamme.length;j++)
				{
					var articleFamilleGamme = new DMS.Mobile.ArticleFamilleGamme();
					
					articleFamilleGamme.ArticleID = json[i].ListArticleFamilleGamme[j].ArticleID;
					articleFamilleGamme.FamilleID = json[i].ListArticleFamilleGamme[j].FamilleID;
					articleFamilleGamme.GammeID = json[i].ListArticleFamilleGamme[j].GammeID;
					articleFamilleGamme.Quota = json[i].ListArticleFamilleGamme[j].Quota;
					articleFamilleGamme.Remise = json[i].ListArticleFamilleGamme[j].Remise;
					
					promotionArticleDTO.ListArticleFamilleGamme.push(articleFamilleGamme);
				}
			
				form.insertPromotionArticle(promotionArticleDTO,synch,form,len,callbackViewModel);
			}
			
		}
		else{callbackViewModel(form.ListPromotionArticle);}	
	
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : createPromotionArticleDTO in PromotionArticleRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionArticleRequest";
						exception.FonctionE = "createPromotionArticleDTO";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListPromotionArticle);
						});
		}
	},
	
		
	insertPromotionArticle : function(promotionArticle,synch,form,len,callbackViewModel)
	{
		 try
		 {
			form.InsertPromotionArticleIntoLOCAL(promotionArticle,synch,form,len,callbackViewModel);
		 }
		 catch(err)
		 {
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertPromotionArticle in PromotionArticleRequest",'alert','e'); 
			
			           var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionArticleRequest";
						exception.FonctionE = "insertPromotionArticle";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListPromotionArticle);
						});
		 }
	},
	
		InsertPromotionArticleIntoLOCAL : function(promotionArticleObject,synch,formReq,len,callbackViewModel)
	{
		try
		{

				formReq.connexion.transaction(function(tx){ formReq.InsertIntoPromotionArticle(tx, formReq,promotionArticleObject,synch); }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoPromotionArticle");
				
				   var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionArticleRequest";
						exception.FonctionE = "InsertIntoPromotionArticle";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(formReq.ListPromotionArticle);
						});
				
				},function(){
							
						formReq.insertPromotionArticleIntoArray(promotionArticleObject,formReq,len,callbackViewModel);		
						
							}); 
						
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertPromotionArticleIntoLOCAL in PromotionArticleRequest",'alert','e'); 
			
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionArticleRequest";
						exception.FonctionE = "InsertPromotionArticleIntoLOCAL";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(formReq.ListPromotionArticle);
						});
		}
	},
	
		InsertIntoPromotionArticle : function(requete, form,promotionArticleObject,synch)
	{
	   try
       {
		   for(var i = 0; i<promotionArticleObject.ListArticleFamilleGamme.length;i++)
		   {
			   var articleID = promotionArticleObject.ListArticleFamilleGamme[i].ArticleID;
			requete.executeSql('INSERT INTO PromotionArticleFamilleGamme(PromotionID,ArticleID,FamilleID,Quota,Remise,GammeID) VALUES( '+promotionArticleObject.PromotionID+','+articleID+','+promotionArticleObject.ListArticleFamilleGamme[i].FamilleID+','+promotionArticleObject.ListArticleFamilleGamme[i].Quota+','+promotionArticleObject.ListArticleFamilleGamme[i].Remise+','+promotionArticleObject.ListArticleFamilleGamme[i].GammeID+')');
		   }
		}
		 catch(err)
		{
			 
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionArticleRequest";
						exception.FonctionE = "InsertIntoPromotionArticle";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoPromotionArticle in PromotionArticleRequest",'alert','e');
						});
		}	
	},
	
		insertPromotionArticleIntoArray : function(promotionArticleObject,form,len,callbackViewModel)
	{
		
		try
		{
			form.ListPromotionArticle.push(promotionArticleObject);
			if(form.ListPromotionArticle.length == len)
			{
				callbackViewModel(form.ListPromotionArticle);
			}
		}
		catch(err)
		{
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionArticleRequest";
						exception.FonctionE = "insertPromotionArticleIntoArray";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListPromotionArticle);
						});
		}
	},

//////////////////////////////// DELETE ALL LIVRAISON FORM DATA BASE /////////////////
	
DeleteAllPromotionArticle : function(callback)
{
	try
	{
		var form = this;	
		this.connexion.transaction(function(tx){ form.DeletePromotionArticles(tx, form,callback);}, function(err){ DMS.Mobile.Common.errors(err,"DeletePromotionArticles");
		
		    var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionArticleRequest";
						exception.FonctionE = "DeletePromotionArticles";
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
			DMS.Mobile.Notification.ShowMessage(err.message+" : DeleteAllPromostionArticle in PromotionArticleRequest",'alert','e'); 
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionArticleRequest";
						exception.FonctionE = "DeleteAllPromostionArticle";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
	 }	
},

DeletePromotionArticles : function(requete, form,callback)
{
	requete.executeSql("DELETE  FROM PromotionArticleFamilleGamme ", [],
              function(tx, result) {				
				form.querySuccessDELETEAll(form,callback);
				}, 
                function(err){DMS.Mobile.Common.errors(err,"DeletePromotionArticles");
				
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionArticleRequest";
						exception.FonctionE = "DeletePromotionArticles";
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
	
	
	
	
}
	