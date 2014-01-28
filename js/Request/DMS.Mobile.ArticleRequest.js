if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.ArticleRequest = {};

DMS.Mobile.ArticleRequest = 
{

	Article : null,
	ListArticle :[],
	connexion: null,


SelectArticleByPicture: function (callback,Opicture) {
	var form = this;	
	try
	  {
				
			       	this.connexion.transaction(function(tx){ form.SelectFromArticlebyPicture(tx, form,callback,Opicture) },  function(err){ DMS.Mobile.Common.errors(err,"SelectFromArticlebyPicture");
					
					   var exception = new DMS.Mobile.Exception();
				
						exception.FichierE = "ArticleRequest";
						exception.FonctionE = "SelectFromArticlebyPicture";
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
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectArticleByPicture in ArticleRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
				
						exception.FichierE = "ArticleRequest";
						exception.FonctionE = "SelectArticleByPicture";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callback(Opicture);
						});
		} 
    },
    
      SelectFromArticlebyPicture : function(requete,form,callback,Opicture) {
		  try
		  {
				requete.executeSql('SELECT  A.ArticleID '+
      ',A.Designation '+
      ',A.FamilleID '+
      ',A.PrixUnitaireHT '+
	  ',A.PrixUnitaireTTC '+
      ',A.CAB '+
      
      ',A.QteDispo '+
      ',A.CodeArticle '+
	  ',A.Synch '+
      ',P.PromotionID '+
      ',P.Remise '+
      ',P.DateDebut '+
      ',P.DateFin '+
      ',P.Designation as PromDesi '+
  		'FROM Article as A '+
  'LEFT JOIN PromotionArticleFamilleGamme as PA on '+
  'PA.ArticleID = A.ArticleID  '+
  'LEFT JOIN Promotion as P on PA.PromotionID = P.PromotionID and (date("now") between P.DateTimeDebut and P.DateTimeFin) '+
				'Where A.ArticleID =?', [Opicture.ArticleID], function(tx, results) {form.querySuccessbyPicture(tx,results,form,callback,Opicture);});
				
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromArticle in ArticleRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ArticleRequest";
						exception.FonctionE = "SelectFromArticle";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callback(Opicture);
						});
		}    
    },
    
    
querySuccessbyPicture:function (requete, results,form,callback,Opicture) {
 
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
								oArticle.CodeArticle = results.rows.item(i).CodeArticle;
								
								if (results.rows.item(i).PromotionID != null && results.rows.item(i).PromotionID=="NULL"){
								var oPromotion = DMS.Mobile.Promotion();
								oPromotion.PromotionID = results.rows.item(i).PromotionID;
								oPromotion.Remise = results.rows.item(i).Remise;
								oPromotion.DateDebut = results.rows.item(i).DateDebut;	
								oPromotion.DateFin = results.rows.item(i).DateFin;	
								oPromotion.Designation	= results.rows.item(i).PromDesi;
								oArticle.Promotion = oPromotion;
								}
								
								Opicture.Article= oArticle;
       							 
								}
								callback(Opicture);
        						
							
	}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessArticleByFamille in ArticleRequest",'alert','e'); 
			
		            	var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ArticleRequest";
						exception.FonctionE = "querySuccessbyPicture";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callback(Opicture);
						});
		} 			
               
    },

  SelectAll: function (callback,oLigneCommande) {
	var form = this;
	  try
	  {
					
			       	this.connexion.transaction(function(tx){ form.SelectFromArticle(tx, form,callback,oLigneCommande) },  function(err){ DMS.Mobile.Common.errors(err,"SelectFromArticle");
		
		      var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ArticleRequest";
						exception.FonctionE = "SelectFromArticle";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callback(oLigneCommande);
						});			
					
		});
						}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAll in ArticleRequest",'alert','e'); 
		
		       var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ArticleRequest";
						exception.FonctionE = "SelectAll";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callback(oLigneCommande);
						});	
		
		} 
    },
    
      SelectFromArticle : function(requete,form,callback,oLigneCommande) {
		  try
		  {
				requete.executeSql('SELECT  A.ArticleID '+
      ',A.Designation '+
      ',A.FamilleID '+
      ',A.PrixUnitaireHT '+
	  ',A.PrixUnitaireTTC '+
      ',A.CAB '+
      
      ',A.QteDispo '+
      ',A.CodeArticle '+
	  ',A.Synch '+
      ',P.PromotionID '+
      ',P.Remise '+
      ',P.DateDebut '+
      ',P.DateFin '+
      ',P.Designation as PromDesi '+
  		'FROM Article as A '+
  'LEFT JOIN PromotionArticleFamilleGamme as PA on '+
  'PA.ArticleID = A.ArticleID  '+
  'LEFT JOIN Promotion as P on PA.PromotionID = P.PromotionID and (date("now") between P.DateTimeDebut and P.DateTimeFin) '+
				'Where A.ArticleID =?', [oLigneCommande.ArticleID], function(tx, results) {form.querySuccess(tx,results,form,callback,oLigneCommande);});
				
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromArticle in ArticleRequest",'alert','e');
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ArticleRequest";
						exception.FonctionE = "SelectFromArticle";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callback(oLigneCommande);
						}); 
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
								oArticle.CodeArticle = results.rows.item(i).CodeArticle;
								
								if (results.rows.item(i).PromotionID != null && results.rows.item(i).PromotionID=="NULL"){
								var oPromotion = DMS.Mobile.Promotion();
								oPromotion.PromotionID = results.rows.item(i).PromotionID;
								oPromotion.Remise = results.rows.item(i).Remise;
								oPromotion.DateDebut = results.rows.item(i).DateDebut;	
								oPromotion.DateFin = results.rows.item(i).DateFin;	
								oPromotion.Designation	= results.rows.item(i).PromDesi;
								oArticle.Promotion = oPromotion;
								}
								
								
								oLigneCommande.ArticleObject= oArticle;
       							 
								}
								callback(oLigneCommande);
        						
							
	}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccess in ArticleRequest",'alert','e'); 
		
		     var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ArticleRequest";
						exception.FonctionE = "querySuccess";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callback(oLigneCommande);
						});
		
		} 			
               
    },
	

	//-------------------------------------------- select all articles
	
	SelectArticle: function (callback,oFamille) {
  var form = this;
	try
	{
		
	
	  this.connexion.transaction(function(tx){ form.SelectFromArticleByFamilleID(tx, form,callback,oFamille) ;}, function(err){ DMS.Mobile.Common.errors(err,"SelectFromArticleByFamilleID");
	  
	           var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ArticleRequest";
						exception.FonctionE = "SelectFromArticleByFamilleID";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callback(oFamille);
						});
	  });
	 		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectArticle in ArticleRequest",'alert','e'); 
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ArticleRequest";
						exception.FonctionE = "SelectArticle";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callback(oFamille);
						});
		}
	 
    },
    
     SelectFromArticleByFamilleID : function(requete,form,callback,oFamille) {
  try
  { 
 // alert("SelectFromArticleByFamilleID article request");
   			requete.executeSql('SELECT  A.ArticleID '+
      ',A.Designation '+
      ',A.FamilleID '+
      ',A.PrixUnitaireHT '+
	  ',A.PrixUnitaireTTC '+
      ',A.CAB '+
	  
	  ',A.DimensionCarton '+
      ',A.VolumeCarton '+
      ',A.PoidsUnite '+
      ',A.UniteCarton '+
	  ',A.Ordre '+
      ',A.Actif '+
      
      ',A.QteDispo '+
      ',A.CodeArticle '+
	  ',A.Synch '+
      ',P.PromotionID '+
      ',P.Remise '+
      ',P.DateDebut '+
      ',P.DateFin '+
      ',P.Designation as PromDesi '+
  		'FROM Article as A '+
  'LEFT JOIN PromotionArticleFamilleGamme as PA on '+
  'PA.ArticleID = A.ArticleID  '+
  'LEFT JOIN Promotion as P on PA.PromotionID = P.PromotionID and (date("now") between P.DateTimeDebut and P.DateTimeFin) '+
				'where A.FamilleID = ?', [oFamille.FamilleID], function(tx, results) {form.querySuccessArticleByFamille(tx,results,form,callback,oFamille);});
       		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromArticleByFamilleID in ArticleRequest",'alert','e'); 
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ArticleRequest";
						exception.FonctionE = "SelectFromArticleByFamilleID";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callback(oFamille);
						});
			
		}
    },
    
    
   
    
    querySuccessArticleByFamille:function (requete, results,form,callback,oFamille) {
	try
	{
		
		 
		var len = results.rows.length;
		
		if (len>0){
			for (var i=0; i<len; i++){
				
				var oArticle = new DMS.Mobile.Article();
				
				oArticle.ArticleID = results.rows.item(i).ArticleID;
				
				oArticle.DimensionCarton = results.rows.item(i).DimensionCarton;
				oArticle.VolumeCarton = results.rows.item(i).VolumeCarton;
				oArticle.PoidsUnite = results.rows.item(i).PoidsUnite;
				oArticle.UniteCarton = results.rows.item(i).UniteCarton;
				oArticle.Ordre = results.rows.item(i).Ordre;
				oArticle.Actif = results.rows.item(i).Actif;
				
				oArticle.Designation = results.rows.item(i).Designation;
				oArticle.PrixUnitaireHT = results.rows.item(i).PrixUnitaireHT;
				oArticle.PrixUnitaireTTC = results.rows.item(i).PrixUnitaireTTC;
				oArticle.CAB = results.rows.item(i).CAB;
				oArticle.QuantiteDisponible = results.rows.item(i).QteDispo;
				oArticle.FamilleID = results.rows.item(i).FamilleID;
				oArticle.Synch = results.rows.item(i).Synch;
				oArticle.CodeArticle = results.rows.item(i).CodeArticle;
				var a = results.rows.item(i).PromotionID;
				if (results.rows.item(i).PromotionID != null && results.rows.item(i).PromotionID!="NULL"){
								var oPromotion =new DMS.Mobile.Promotion();
								oPromotion.PromotionID = results.rows.item(i).PromotionID;
								oPromotion.Remise = results.rows.item(i).Remise;
								oPromotion.DateDebut = results.rows.item(i).DateDebut;	
								oPromotion.DateFin = results.rows.item(i).DateFin;	
								oPromotion.Designation	= results.rows.item(i).PromDesi;
								oArticle.Promotion = oPromotion;
								}
		
			
				form.InsertArticleIntoArticleList(oFamille,oArticle,form,len,callback);

		}
	}
	else{callback(oFamille);}
	}
	catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessArticleByFamille in ArticleRequest",'alert','e');
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ArticleRequest";
						exception.FonctionE = "querySuccessArticleByFamille";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callback(oFamille);
						});
			 
		}
        						
	},
	
	InsertArticleIntoArticleList : function(oFamille,oArticle,form,len,callback)	
	{
		try
		{
						oFamille.ListArticles.push(oArticle);
				
				
				if(oFamille.ListArticles.length == len)
				{
					//alert"callback famille");
					callback(oFamille);
				}
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertArticleIntoArticleList in ArticleRequest",'alert','e'); 
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ArticleRequest";
						exception.FonctionE = "InsertArticleIntoArticleList";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callback(oFamille);
						});
			
		}
	},
	
	
	///////////////////////// SELECT All Article avec Picture ////////(formulaire commande , list article en repture)   \\\\
	
	
	 SelectAllArticles: function (callback) {
		var form = this;
		 try
		 {
					
			       	this.connexion.transaction(function(tx){ form.SelectAllFromArticles(tx, form,callback) },  function(err){ DMS.Mobile.Common.errors(err,"SelectFromArticle");
					
					  var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ArticleRequest";
						exception.FonctionE = "SelectAllFromArticles";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callback(form.ListArticle);
						});
					
					});
				}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllArticles in ArticleRequest",'alert','e'); 
			
			  var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ArticleRequest";
						exception.FonctionE = "SelectAllArticles";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callback(form.ListArticle);
						});
		} 
    },
    
      SelectAllFromArticles : function(requete,form,callback) {
		  try
		  {
				requete.executeSql('SELECT  A.ArticleID '+
      ',A.Designation '+
      ',A.FamilleID '+
      ',A.PrixUnitaireHT '+
	  ',A.PrixUnitaireTTC '+
	  ',A.QuantiteRef '+
      ',A.CAB '+
      
      ',A.QteDispo '+
      ',A.CodeArticle '+
	  ',A.Synch '+
      ',P.PromotionID '+
      ',P.Remise '+
      ',P.DateDebut '+
      ',P.DateFin '+
      ',P.Designation as PromDesi '+
  		'FROM Article as A '+
  'LEFT JOIN PromotionArticleFamilleGamme as PA on '+
  'PA.ArticleID = A.ArticleID  '+
  'LEFT JOIN Promotion as P on PA.PromotionID = P.PromotionID and (date("now") between P.DateTimeDebut and P.DateTimeFin) ', [], function(tx, results) {form.querySuccessAllArticles(tx,results,form,callback);});
    
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllFromArticles in ArticleRequest",'alert','e'); 
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ArticleRequest";
						exception.FonctionE = "SelectAllFromArticles";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callback(form.ListArticle);
						});
			
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
									oArticle.CodeArticle = results.rows.item(i).CodeArticle;
							        oArticle.QuantiteRef = results.rows.item(i).QuantiteRef;
									
									if (results.rows.item(i).PromotionID != null && results.rows.item(i).PromotionID=="NULL"){
								var oPromotion = DMS.Mobile.Promotion();
								oPromotion.PromotionID = results.rows.item(i).PromotionID;
								oPromotion.Remise = results.rows.item(i).Remise;
								oPromotion.DateDebut = results.rows.item(i).DateDebut;	
								oPromotion.DateFin = results.rows.item(i).DateFin;	
								oPromotion.Designation	= results.rows.item(i).PromDesi;
								oArticle.Promotion = oPromotion;
								}
		
									
									DMS.Mobile.PictureRequest.connexion = form.connexion;
									DMS.Mobile.PictureRequest.SelectPictureByArticle(function(articlePicture){
										
									form.InsertArticleIntoArticleListPic(form,	len, articlePicture,callback);
										
									},oArticle);
											 
									}
								
								}
								else
								{
									callback(form.ListArticle);
								}
        						
							
				}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessAllArticles in ArticleRequest",'alert','e'); 
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ArticleRequest";
						exception.FonctionE = "querySuccessAllArticles";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callback(form.ListArticle);
						});
		} 				
               
    },
	
	InsertArticleIntoArticleListPic : function(form,	len, article,callback)
	{
		try
		{
				form.ListArticle.push(article);
				if(form.ListArticle.length == len)
				{
					callback(form.ListArticle);
				}
		}
		catch(err)
		{
			  var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ArticleRequest";
						exception.FonctionE = "InsertArticleIntoArticleListPic";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callback(form.ListArticle);
						});
		}
	},
	
//////////////////////////////////////////////////////////////////////////////////////
   
	
	GetListArticleFromServer : function(callbackViewModel)
	{
		var form = this;
		try
		{
			var Conf = JSON.parse(localStorage.getItem("Configuration"));
			 
			DMS.Mobile.Common.Alert("get list Article from server");
			 var methode = "GetListArticleDTO?";
			 var URL = Conf.URL+methode;
			 
			 
				DMS.Mobile.Common.CallService(function(Json,Form){form.CreateArticleDTO(Json,Form,callbackViewModel);},URL,form);
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : GetListArticleFromServer in ArticleRequest",'alert','e'); 
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ArticleRequest";
						exception.FonctionE = "GetListArticleFromServer";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callbackViewModel(form.ListArticle);
						});
		} 
		
	},
	
	CreateArticleDTO : function (json,form,callbackViewModel)
	{
		try
		{
			form.ListArticle = [];
			var len = json.length;
			if ( len>0)
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
				articleDTO.LignesCommande = json[i].LignesCommande;
				articleDTO.Livraisons = json[i].Livraisons;
				articleDTO.ListPromotions = json[i].Promotions;
				articleDTO.ListReleveLineaire = json[i].ReleveLineaire;
				articleDTO.ListRelevePresencePrixConcurrents = json[i].RelevePresencePrixConcurrents;
				articleDTO.ListRelevePrix = json[i].RelevePrix;
				articleDTO.ListReleveStock = json[i].ReleveStock;
				articleDTO.CodeTVA1 = json[i].CodeTVA1;
				
				articleDTO.UniteCarton = json[i].UniteCarton;
				articleDTO.PoidsUnite = json[i].PoidsUnite;
				articleDTO.DimensionCarton = json[i].DimCarton;
				articleDTO.VolumeCarton = json[i].VolCarton;
				articleDTO.Ordre = json[i].Ordre;
				articleDTO.Actif = json[i].Actif;
				
				
				
		
				
				
				
				  form.insertArticle(articleDTO,synch,form,len,callbackViewModel);
				}
			
			}
			else{insertArticle(form.ListArticle);}	
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : CreateArticleDTO in ArticleRequest",'alert','e'); 
			
			      var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ArticleRequest";
						exception.FonctionE = "CreateArticleDTO";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callbackViewModel(form.ListArticle);
						});
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
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ArticleRequest";
						exception.FonctionE = "insertArticleIntoArray";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callbackViewModel(form.ListArticle);
						}); 
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
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ArticleRequest";
						exception.FonctionE = "insertArticle";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callbackViewModel(form.ListArticle);
						}); 
		} 
	},
		
			 InsertArticleIntoLocal: function(ArticleObject,synch,formReq,len,callbackViewModel) {
try
{
					    formReq.connexion.transaction(function(tx){ formReq.InsertIntoArticle(tx, formReq,ArticleObject,synch) }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoArticle");
						 
						 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ArticleRequest";
						exception.FonctionE = "InsertIntoArticle";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callbackViewModel(form.ListArticle);
						}); 
						
						},function(){formReq.insertArticleIntoArray(ArticleObject,synch,formReq,len,callbackViewModel);}); 
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertArticleIntoLocal in ArticleRequest",'alert','e'); 
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ArticleRequest";
						exception.FonctionE = "InsertArticleIntoLocal";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callbackViewModel(form.ListArticle);
						}); 
			
		} 				   
					
           },

	InsertIntoArticle : function(requete,form,ArticleObject,synch) {
		requete.executeSql('INSERT INTO Article (ArticleID, Designation,PrixUnitaireHT,PrixUnitaireTTC, CAB, QteDispo, FamilleID, Synch,CodeArticle,DimensionCarton,VolumeCarton,PoidsUnite,UniteCarton,Ordre,Actif) VALUES( '+ArticleObject.ArticleID+',"'+ArticleObject.Designation+'",'+ArticleObject.PrixUnitaireHT+','+ArticleObject.PrixUnitaireTTC+',"'+ArticleObject.CAB+'",'+ArticleObject.QuantiteDisponible+','+ArticleObject.FamilleID+',"'+synch+'","'+ArticleObject.CodeArticle+'","'+ArticleObject.DimensionCarton+'",'+ArticleObject.VolumeCarton+','+ArticleObject.PoidsUnite+',"'+ArticleObject.UniteCarton+'",'+ArticleObject.Ordre+',"'+ArticleObject.Actif+'")');
			
    DMS.Mobile.Common.Alert("Fin insertion article"); 
	     																																
    },
	 
	 //////////////////////////////////////// Delete All Article ////////////////////////
DeleteAllArticle : function(callback)
{
	var form = this;	
	try
	{
			
			this.connexion.transaction(function(tx){ form.DeleteArticles(tx, form,callback);}, function(err){ DMS.Mobile.Common.errors(err,"DeleteArticles");
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ArticleRequest";
						exception.FonctionE = "DeleteArticles";
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
			DMS.Mobile.Notification.ShowMessage(err.message+" : DeleteAllArticle in ArticleRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ArticleRequest";
						exception.FonctionE = "DeleteAllArticle";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								   callback();
						});
	 }	
}, 

DeleteArticles : function(requete, form,callback)
{
	requete.executeSql("DELETE FROM Article ", [],
              function(tx, result) {				
				form.querySuccessDELETEAll(form,callback);
				}, 
                function(err){DMS.Mobile.Common.errors(err,"DeleteArticles");
				
				     var exception = new DMS.Mobile.Exception();
						exception.FichierE = "ArticleRequest";
						exception.FonctionE = "DeleteAllArticle";
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