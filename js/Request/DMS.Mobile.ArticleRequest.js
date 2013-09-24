if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.ArticleRequest = {};

DMS.Mobile.ArticleRequest = 
{

	Article : null,
	ListArticle :[],
	connexion: null,

  SelectAll: function (callback,oLigneCommande) {
				var form = this;	
			       	this.connexion.transaction(function(tx){ form.SelectFromArticle(tx, form,callback,oLigneCommande) },  function(err){ DMS.Mobile.Common.errors(err,"SelectFromArticle");});
    },
    
      SelectFromArticle : function(requete,form,callback,oLigneCommande) {
				requete.executeSql('SELECT * FROM Article WHERE ArticleID =?', [oLigneCommande.ArticleID], function(tx, results) {form.querySuccess(tx,results,form,callback,oLigneCommande);});
    
    },
    
    
    querySuccess:function (requete, results,form,callback,oLigneCommande) {
 
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
        						
							
							
               
    },
	//-------------------------------------------- select all articles
	
	 SelectAllArticles: function (callback) {
				var form = this;	
			       	this.connexion.transaction(function(tx){ form.SelectAllFromArticles(tx, form,callback) },  function(err){ DMS.Mobile.Common.errors(err,"SelectFromArticle");});
    },
    
      SelectAllFromArticles : function(requete,form,callback) {
				requete.executeSql('SELECT * FROM Article', [], function(tx, results) {form.querySuccessAllArticles(tx,results,form,callback);});
    
    },
    
    
    querySuccessAllArticles:function (requete, results,form,callback) {
 
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
        						
							
							
               
    },
	
//////////////////////////////////////////////////////////////////////////////////////
   
	
	GetListArticleFromServer : function(callbackViewModel)
	{
		var Conf = JSON.parse(sessionStorage.getItem("Configuration"));
		 var ServeurURL	= Conf.URL;
		DMS.Mobile.Common.Alert("get list Article from server");
		 var methode = "GetListArticleDTO?";
		 var URL = ServeurUrl+methode;
		 
		 var form = this;
		    DMS.Mobile.Common.CallService(function(Json,Form){form.CreateArticleDTO(Json,Form,callbackViewModel);},URL,form);
		
	},
	
	CreateArticleDTO : function (json,form,callbackViewModel)
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
	},
	
	insertArticleIntoArray : function(Article,synch,form,len,callbackViewModel)
	{
		form.ListArticle.push(Article);
		if(form.ListArticle.length == len)
		{
			callbackViewModel(form.ListArticle);
		}
	},
	
	insertArticle : function(article,synch,form,len,callbackViewModel)
	{
            form.InsertArticleIntoLocal(article,synch,form,len,callbackViewModel);
	},
		
			 InsertArticleIntoLocal: function(ArticleObject,synch,formReq,len,callbackViewModel) {

					    formReq.connexion.transaction(function(tx){ formReq.InsertIntoArticle(tx, formReq,ArticleObject,synch) }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoArticle");},function(){formReq.insertArticleIntoArray(ArticleObject,synch,formReq,len,callbackViewModel);}); 
					   
					
           },

	InsertIntoArticle : function(requete,form,ArticleObject,synch) {
   
			requete.executeSql('INSERT INTO Article (ArticleID, Designation,PrixUnitaireHT,PrixUnitaireTTC, CAB, QteDispo, FamilleID, Synch) VALUES( '+ArticleObject.ArticleID+',"'+ArticleObject.Designation+'",'+ArticleObject.PrixUnitaireHT+','+ArticleObject.PrixUnitaireTTC+',"'+ArticleObject.CAB+'",'+ArticleObject.QuantiteDisponible+','+ArticleObject.FamilleID+',"'+synch+'")');
			
    DMS.Mobile.Common.Alert("Fin insertion article");       																																
    },
	 
	
		
}