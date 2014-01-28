if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.ArticleCommercialRequest = {};

DMS.Mobile.ArticleCommercialRequest = 
{
    connexion: null,
	ListArticleCommercial : [],
	listQArticleCommercial : [],
	
	
	//////////////////////// Select list articleCommercial by commercial form server //////////
	
	
	// il faut appeler cette fonction aprés l'insertion de tous les articles //
	SelectArticleCommercialByPersonnelFromServer : function (callbackViewModel,PersonnelID)
	{
		var form =this;
		try
		{
		var Conf = JSON.parse(localStorage.getItem("Configuration"));
		 
		 
		 form.ListArticleCommercial = [];
		  var Data = "PersonnelID="+PersonnelID; 
		  
		  var methode= "ArticleCommercialByPersonnelID?";

		  var URL =  Conf.URL+methode+Data;

		     DMS.Mobile.Common.CallService(function(JsonObject,Form){form.createArticleCommercialDTO(JsonObject,Form,callbackViewModel);},URL,form);
			 	}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectArticleCommercialByPersonnelFromServer in ArticleCommercialRequest",'alert','e'); 
				
				 var exception = new DMS.Mobile.Exception();
				
						exception.FichierE = "ArticleCommercialRequest";
						exception.FonctionE = "SelectArticleCommercialByPersonnelFromServer";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callbackViewModel(form.ListArticleCommercial);
						});
			}
	},
	
	createArticleCommercialDTO : function(json,form,callbackViewModel)
	{
		try
		{
			 var len = json.length;
		 if ( len>0)
		 {
			var synch = "true";
          
		    for (var i=0;i<json.length;i++)
			{
				
			var articleCommercialDTO = new DMS.Mobile.ArticleCommercial();
			
			    articleCommercialDTO.ArticleID = json[i].ArticleID;
				articleCommercialDTO.CommercialID = json[i].PersonnelID;
				articleCommercialDTO.QuantiteRef = json[i].Quantite
				
				form.updateArticleCommercial(articleCommercialDTO,synch,len,callbackViewModel);
			}
		 }
		 else
		 {
			 callbackViewModel(form.ListArticleCommercial);
		 }
		}
		catch(err)
		{
		  DMS.Mobile.Notification.ShowMessage(err.message+" : createArticleCommercialDTO in ArticleCommercialRequest",'alert','e');
		  
		                var exception = new DMS.Mobile.Exception();
				
						exception.FichierE = "ArticleCommercialRequest";
						exception.FonctionE = "createArticleCommercialDTO";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callbackViewModel(form.ListArticleCommercial);
						});
		  
		}
	},
	
/////////////////////////////// update de côté serveur & locale //////////////////

updateArticleCommercial : function(oArticleCommercial,synch,len,callbackViewModel)
{
	var form = this;
	try
	{	
			this.connexion.transaction(function(tx){ form.UpdateQuantiteArticle(tx, form,len,synch,oArticleCommercial,callbackViewModel); }, function(err){ 
			
			  DMS.Mobile.Common.errors(err,"updateArticleCommercial");
			     
				        var exception = new DMS.Mobile.Exception();
				
						exception.FichierE = "ArticleCommercialRequest";
						exception.FonctionE = "updateArticleCommercial";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callbackViewModel(form.ListArticleCommercial);
						});
			  }
			  
			  );
	}
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : updateArticleCommercial in ArticleCommercialRequest",'alert','e'); 
		
		                var exception = new DMS.Mobile.Exception();
				
						exception.FichierE = "ArticleCommercialRequest";
						exception.FonctionE = "createArticleCommercialDTO";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callbackViewModel(form.ListArticleCommercial);
						});
	}
},


UpdateQuantiteArticle : function(requete, form,len,synch,oArticleCommercial,callbackViewModel)
{
		if(synch == "true")
		{
		requete.executeSql(' UPDATE Article SET QuantiteRef= ? WHERE ArticleID = ?', [oArticleCommercial.QuantiteRef,oArticleCommercial.ArticleID], function(tx, results) {form.querySuccessUpdateServeur(tx,results,form,len,oArticleCommercial,callbackViewModel);});
		}
		else if(synch == "false")
		{
			requete.executeSql(' UPDATE Article SET Synch= ? WHERE ArticleID = ?', ["false",oArticleCommercial.ArticleID]);
			
			requete.executeSql(' UPDATE Article SET QuantiteRef= ? WHERE ArticleID = ?', [oArticleCommercial.QuantiteRef,oArticleCommercial.ArticleID], function(tx, results) {form.querySuccessUpdateServeur(tx,results,form,len,oArticleCommercial,callbackViewModel);});
		}
	
},

querySuccessUpdateServeur : function(tx,results,form,len,oArticleCommercial,callbackViewModel)
{
	try
	{
		form.ListArticleCommercial.push(oArticleCommercial);
		if(form.ListArticleCommercial.length == len)
		{
			callbackViewModel(form.ListArticleCommercial);
		}
	}
	catch(err)
	{
		  var exception = new DMS.Mobile.Exception();
				
						exception.FichierE = "ArticleCommercialRequest";
						exception.FonctionE = "querySuccessUpdateServeur";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callbackViewModel(form.ListArticleCommercial);
						});
	}
},

//////////////////////////////////  select all quantite referentiel article non synchroniser /////////

SelectAllQuantiteArticleNotSynchronize : function(callback)
{
	var form = this;
	  try
	    {
		this.connexion.transaction(function(tx){ form.SelectAllQunatiteArticleNotSynch(tx, form,callback); }, 
		   function(err){ 
		   DMS.Mobile.Common.errors(err,"SelectAllQunatiteArticleNotSynch");
		   
		                var exception = new DMS.Mobile.Exception();
				
						exception.FichierE = "ArticleCommercialRequest";
						exception.FonctionE = "SelectAllQunatiteArticleNotSynch";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callbackViewModel(form.listQArticleCommercial);
						});
					 
		   });
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllQuantiteArticleNotSynchronize in ArticleCommercialRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
				
						exception.FichierE = "ArticleCommercialRequest";
						exception.FonctionE = "SelectAllQuantiteArticleNotSynchronize";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callbackViewModel(form.listQArticleCommercial);
						});
			
		}
},

SelectAllQunatiteArticleNotSynch : function(requete, form,callback)
{
		requete.executeSql("SELECT * FROM Article WHERE Synch =?", ["false"], function(tx, results) {form.querySuccessQunatiteFactureNotSynch(tx,results,form,callback);});
},

querySuccessQunatiteFactureNotSynch : function(requete,results,form,callback)
{
	 try
	{
		  var userID = sessionStorage.getItem("userID");
		var len = results.rows.length;
		if (len>0)
		{
			for (var i=0; i<len; i++)
			{
			    var articleCommercialDTO = new DMS.Mobile.ArticleCommercial();
			    
				articleCommercialDTO.ArticleID = results.rows.item(i).ArticleID ;
				articleCommercialDTO.CommercialID = userID ;
				articleCommercialDTO.QuantiteRef = results.rows.item(i).QuantiteRef ;
			
			    form.insertQArticleIntoList(articleCommercialDTO, form,len,callback);
			
			}
	   }
	   else
	   {callback(form.listQArticleCommercial);}
	}
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessQunatiteFactureNotSynch in ArticleCommercialRequest",'alert','e'); 
		
		                var exception = new DMS.Mobile.Exception();
				
						exception.FichierE = "ArticleCommercialRequest";
						exception.FonctionE = "querySuccessQunatiteFactureNotSynch";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callbackViewModel(form.listQArticleCommercial);
						});
	}
},

insertQArticleIntoList : function(articleCommercial, form,len,callback)
{
	try
	{
		form.listQArticleCommercial.push(articleCommercial);
		if(form.listQArticleCommercial.length == len)
		{
			callback(form.listQArticleCommercial);
		}
	}
	catch(err)
	{
		                var exception = new DMS.Mobile.Exception();
				
						exception.FichierE = "ArticleCommercialRequest";
						exception.FonctionE = "insertQArticleIntoList";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callbackViewModel(form.listQArticleCommercial);
						});
	}
},


/////////////////////////////// update synchr apres la synchronisation serveur des données ////

UpdateSynchArticleCommercial : function(callback)
{
	var form = this;
	try
	{
			
			this.connexion.transaction(function(tx){ form.UpdateSynchArticleComm(tx, form,callback); }, function(err){ DMS.Mobile.Common.errors(err,"UpdateSynchArticleComm");
			
			    var exception = new DMS.Mobile.Exception();
				
						exception.FichierE = "ArticleCommercialRequest";
						exception.FonctionE = "UpdateSynchArticleComm";
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
		DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateSynchArticleCommercial in ArticleCommercialRequest",'alert','e'); 
		
		               var exception = new DMS.Mobile.Exception();
				
						exception.FichierE = "ArticleCommercialRequest";
						exception.FonctionE = "UpdateSynchArticleCommercial";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callback();
						});
	}
},

UpdateSynchArticleComm : function(requete, form,callback)
{
	try
	{
	    requete.executeSql('UPDATE Article SET Synch= ? WHERE Synch = ?', ["true","false"], function(tx, results) {form.querySuccessUpdateSynch(tx,results,form, callback);});
	}
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateSynchArticleCommercial in ArticleCommercialRequest",'alert','e'); 
		
		 var exception = new DMS.Mobile.Exception();
				
						exception.FichierE = "ArticleCommercialRequest";
						exception.FonctionE = "UpdateSynchArticleComm";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callback();
						});
	}
},

querySuccessUpdateSynch : function(tx,results,form, callback)
{
	callback();
}





}