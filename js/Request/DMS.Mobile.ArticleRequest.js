if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.ArticleRequest = {};

DMS.Mobile.ArticleRequest = 
{

	Article : null,
	ListArticle :[],
	connexion: null,

  SelectAll: function (callback,oLigneCommande) {
	  try
	  {
				var form = this;	
			       	this.connexion.transaction(function(tx){ form.SelectFromArticle(tx, form,callback,oLigneCommande) },  function(err){ DMS.Mobile.Common.errors(err,"SelectFromArticle");});
						}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAll in ArticleRequest",'alert','e'); 
		} 
    },
    
      SelectFromArticle : function(requete,form,callback,oLigneCommande) {
		  try
		  {
				requete.executeSql('SELECT * FROM Article WHERE ArticleID =?', [oLigneCommande.ArticleID], function(tx, results) {form.querySuccess(tx,results,form,callback,oLigneCommande);});
				
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromArticle in ArticleRequest",'alert','e'); 
		}    
    },
    
    
    querySuccess:function (requete, results,form,callback,oLigneCommande) {
 
 try
 {
							var len = results.rows.length;
							var i =0;
							
		   						if(len>0){
									
								var oArticle = new DMS.Mobile.Article();
								oArticle.ArticleID = results.rows.item(i).ArticleID;
								oArticle.Designation = results.rows.item(i).Designation;
								oArticle.PrixUnitaireHT = results.rows.item(i).PrixUnitaireHT;
								oArticle.PrixUnitaireTTC = results.rows.item(i).PrixUnitaireTTC;
								oArticle.CAB = results.rows.item(i).CAB;
								oArticle.QuantiteDisponible = results.rows.item(i).QteDispo;
								oArticle.FamilleID = results.rows.item(i).FamilleID;
								oArticle.Synch = results.rows.item(i).Synch;
								
								oLigneCommande.ArticleObject= oArticle;
       							 
								}
								callback(oLigneCommande);
        						
							
	}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccess in ArticleRequest",'alert','e'); 
		} 			
               
    },
	//-------------------------------------------- select all articles
	
	 SelectAllArticles: function (callback) {
		 try
		 {
				var form = this;	
			       	this.connexion.transaction(function(tx){ form.SelectAllFromArticles(tx, form,callback) },  function(err){ DMS.Mobile.Common.errors(err,"SelectFromArticle");});
				}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllArticles in ArticleRequest",'alert','e'); 
		} 
    },
    
      SelectAllFromArticles : function(requete,form,callback) {
		  try
		  {
				requete.executeSql('SELECT * FROM Article', [], function(tx, results) {form.querySuccessAllArticles(tx,results,form,callback);});
    
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllFromArticles in ArticleRequest",'alert','e'); 
		} 
    },
    
    
    querySuccessAllArticles:function (requete, results,form,callback) {
 try
 {
							var len = results.rows.length;
							var i =0;
							
		   						if(len>0){
									
									for(var i=0;i<len;i++)
									{	
									var oArticle = new DMS.Mobile.Article();
									oArticle.ArticleID = results.rows.item(i).ArticleID;
									oArticle.Designation = results.rows.item(i).Designation;
									oArticle.PrixUnitaireHT = results.rows.item(i).PrixUnitaireHT;
									oArticle.PrixUnitaireTTC = results.rows.item(i).PrixUnitaireTTC;
									oArticle.CAB = results.rows.item(i).CAB;
									oArticle.QuantiteDisponible = results.rows.item(i).QteDispo;
									oArticle.FamilleID = results.rows.item(i).FamilleID;
									oArticle.Synch = results.rows.item(i).Synch;
									
									form.ListArticle.push(oArticle);
									 
									}
									callback(form.ListArticle);
								
								}
        						
							
				}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessAllArticles in ArticleRequest",'alert','e'); 
		} 				
               
    },
	
//////////////////////////////////////////////////////////////////////////////////////
   
	
	GetListArticleFromServer : function(callbackViewModel)
	{
		try
		{
			var Conf = JSON.parse(sessionStorage.getItem("Configuration"));
			 
			DMS.Mobile.Common.Alert("get list Article from server");
			 var methode = "GetListArticleDTO?";
			 var URL = Conf.URL+methode;
			 
			 var form = this;
				DMS.Mobile.Common.CallService(function(Json,Form){form.CreateArticleDTO(Json,Form,callbackViewModel);},URL,form);
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : GetListArticleFromServer in ArticleRequest",'alert','e'); 
		} 
		
	},
	
	CreateArticleDTO : function (json,form,callbackViewModel)
	{
		try
		{
			form.ListArticle = [];
			if ( json != null)
			{
				var len = json.length;
				var synch = "true";
	
				for (var i=0;i<json.length;i++)
				{
				var articleDTO = new DMS.Mobile.Article();
				
				articleDTO.ArticleID = json[i].ArticleID;
				articleDTO.Designation = json[i].Designation;
				articleDTO.FamilleID = json[i].FamilleID;
				articleDTO.PrixUnitaireHT = json[i].PrixUnitaireHT;
				articleDTO.PrixUnitaireTTC = json[i].PrixUnitaireTTC;
				articleDTO.CAB = json[i].CAB;
				articleDTO.UniteMesureID = json[i].UniteMesureID;
				articleDTO.QuantiteDisponible = json[i].QuantiteDisponible;
				articleDTO.Quota = json[i].Quota;
				articleDTO.CodeArticle = json[i].CodeArticle;
				articleDTO.CodeTVA = json[i].CodeTVA;
				articleDTO.Familles = json[i].Familles;
				articleDTO.UniteMesure = json[i].UniteMesure;
				articleDTO.ListFacings = json[i].Facing;
				articleDTO.ListLignesCommande = json[i].LignesCommande;
				articleDTO.ListLivraisons = json[i].Livraisons;
				articleDTO.ListPromotions = json[i].Promotions;
				articleDTO.ListReleveLineaire = json[i].ReleveLineaire;
				articleDTO.ListRelevePresencePrixConcurrents = json[i].RelevePresencePrixConcurrents;
				articleDTO.ListRelevePrix = json[i].RelevePrix;
				articleDTO.ListReleveStock = json[i].ReleveStock;
				articleDTO.CodeTVA1 = json[i].CodeTVA1;
				
				
				  form.insertArticle(articleDTO,synch,form,len,callbackViewModel);
				}
			
			}
			else{insertArticle(form.ListArticle);}	
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : CreateArticleDTO in ArticleRequest",'alert','e'); 
		} 
	},
	
	insertArticleIntoArray : function(Article,synch,form,len,callbackViewModel)
	{
		try
		{
			form.ListArticle.push(Article);
			if(form.ListArticle.length == len)
			{
				callbackViewModel(form.ListArticle);
			}
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertArticleInArray in ArticleRequest",'alert','e'); 
		} 
	},
	
	insertArticle : function(article,synch,form,len,callbackViewModel)
	{
		try
		{
            form.InsertArticleIntoLocal(article,synch,form,len,callbackViewModel);
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertArticle in ArticleRequest",'alert','e'); 
		} 
	},
		
			 InsertArticleIntoLocal: function(ArticleObject,synch,formReq,len,callbackViewModel) {
try
{
					    formReq.connexion.transaction(function(tx){ formReq.InsertIntoArticle(tx, formReq,ArticleObject,synch) }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoArticle");},function(){formReq.insertArticleIntoArray(ArticleObject,synch,formReq,len,callbackViewModel);}); 
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertArticleIntoLocal in ArticleRequest",'alert','e'); 
		} 				   
					
           },

	InsertIntoArticle : function(requete,form,ArticleObject,synch) {
try
{   
			requete.executeSql('INSERT INTO Article (ArticleID, Designation,PrixUnitaireHT,PrixUnitaireTTC, CAB, QteDispo, FamilleID, Synch) VALUES( '+ArticleObject.ArticleID+',"'+ArticleObject.Designation+'",'+ArticleObject.PrixUnitaireHT+','+ArticleObject.PrixUnitaireTTC+',"'+ArticleObject.CAB+'",'+ArticleObject.QuantiteDisponible+','+ArticleObject.FamilleID+',"'+synch+'")');
			
    DMS.Mobile.Common.Alert("Fin insertion article"); 
	
	}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoArticle in ArticleRequest",'alert','e'); 
		}       																																
    },
	 
	
		
}