if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.ArticleRequest = {};

DMS.Mobile.ArticleRequest = 
{

	Article : null,
	ListArticle :[],
	connexion: null,

  SelectAll: function (callback) {
				var form = this;	
			       	this.connexion.transaction(function(tx){ form.SelectFromArticle(tx, form,callback) },  function(err){ DMS.Mobile.Common.errors(err,"SelectFromArticle");});
    },
    
      SelectFromArticle : function(requete,form,callback) {
				requete.executeSql('SELECT * FROM Article', [], function(tx, results) {form.querySuccess(tx,results,form,callback);});
    
    },
    
    
    querySuccess:function (requete, results,form,callback) {
 
							var len = results.rows.length;
							var id;
							var myproducts = new Array();
							for (var i=0; i<len; i++){
		   
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
    },
	
	

   
	
	GetListArticleFromServer : function()
	{
		DMS.Mobile.Common.Alert("get list Article from server");
		 var methode = "GetListArticleDTO?";
		 var URL = DMS.Mobile.Common.ServeurUrl+methode;
		 
		 var form = this;
		    DMS.Mobile.Common.CallService(this.CreateArticleDTO,URL,form);
		
	},
	
	CreateArticleDTO : function (json,form)
	{
		if ( json != null)
		{
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
			
			
			form.ListArticle.push(articleDTO);
			}
			form.SaveListArticleInLocal(form.ListArticle,synch,form);
		}
		else{return null;}	
	},
	
	    	SaveListArticleInLocal : function(ListArticle,synch,form)
	{
	DMS.Mobile.Common.Alert("length : " +ListArticle.length);
		for (var i=0; i<ListArticle.length;i++)
		{
		form.InsertArticle(ListArticle[i],synch,form);
		DMS.Mobile.Common.Alert("Fin insertion de Article : "+i); 
		}
	},
		
			 InsertArticle: function(ArticleObject,synch,formReq) {

					    formReq.connexion.transaction(function(tx){ formReq.InsertIntoArticle(tx, formReq,ArticleObject,synch) }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoArticle");}); 
					   
					
           },

	InsertIntoArticle : function(requete,form,ArticleObject,synch) {
   
			requete.executeSql('INSERT INTO Article (ArticleID, Designation,PrixUnitaireHT,PrixUnitaireTTC, CAB, QteDispo, FamilleID, Synch) VALUES( '+ArticleObject.ArticleID+',"'+ArticleObject.Designation+'",'+ArticleObject.PrixUnitaireHT+','+ArticleObject.PrixUnitaireTTC+',"'+ArticleObject.CAB+'",'+ArticleObject.QuantiteDisponible+','+ArticleObject.FamilleID+',"'+synch+'")');
			
    DMS.Mobile.Common.Alert("Fin insertion article");       																																
    },
	 
	
		
}