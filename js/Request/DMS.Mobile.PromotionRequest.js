if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};
	
	
	
DMS.Mobile.PromotionRequest = {};	
DMS.Mobile.PromotionRequest = 
{

		connexion : null,
		ListPromotion : [],
		ListClient : [],
		ListFidelisation : [],
		
//////////////////////////////////////////////////// Fidélisation From Server /////////////////////////////////		
GetListFidelisationFromServer : function(callbackViewModel, PersonnelID)
	{
		try
		{
			
		var Conf = JSON.parse(localStorage.getItem("Configuration"));
		
	//	DMS.Mobile.Common.Alert("get list gamme from server");
        var Data = "PersonnelID="+PersonnelID;
		var methode = "GetListFidelisationDTOByPersonnelID?";		
		var URL = Conf.URL+methode+Data;
		
		    var form = this;
		   
			DMS.Mobile.Common.CallService(function(json,Form){form.CreateFidelisationDTO(JsonObject,Form,callbackViewModel);},URL,form);
			
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : GetListFidelisationFromServer in PromotionRequest",'alert','e'); 
			
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionRequest";
						exception.FonctionE = "GetListFidelisationFromServer";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListFidelisation);
						});
		}
		
	},		
	
	CreateFidelisationDTO : function (json,form,callbackViewModel)
	{
		try
		{
			
			var len =json.length;
		if ( len>0)
		{
			var synch = "true";

			for (var i=0;i<json.length;i++)
			{
			var FidelisationDTO = new DMS.Mobile.Fidelisation();
			    FidelisationDTO.ClientID = json[i].ClientID;
				FidelisationDTO.ListPromotion = [];
			
			for (var j = 0;j<json[i].ListPromotion.length;j++)
				{
			
			var promotionDTO = new DMS.Mobile.Promotion();
			promotionDTO.PromotionID = json[i].ListPromotion[j].PromotionID;
			promotionDTO.Remise = json[i].ListPromotion[j].Remise;
			
			var dDebut = DMS.Mobile.Common.ParseDateJson(json[i].ListPromotion[j].DateDebut);			
			promotionDTO.DateDebut = dDebut;
			var hDebut = DMS.Mobile.Common.ParseHeureJson(json[i].ListPromotion[j].DateDebut);	
			promotionDTO.HeureDebut = hDebut;
			
			var dFin = DMS.Mobile.Common.ParseDateJson(json[i].ListPromotion[j].DateFin);			
			promotionDTO.DateFin = dFin;
			var hFin = DMS.Mobile.Common.ParseHeureJson(json[i].ListPromotion[j].DateFin);	
			promotionDTO.HeureFin = hFin;

			promotionDTO.Designation = json[i].ListPromotion[j].Designation;
	
	        FidelisationDTO.ListPromotion.push(promotionDTO);
				}
			
			form.insertFidelisation(FidelisationDTO,synch,form,len,callbackViewModel);
			}

		}
		else{callbackViewModel(form.ListFidelisation);}	
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : CreateFidelisationDTO in PromotionRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionRequest";
						exception.FonctionE = "CreateFidelisationDTO";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListFidelisation);
						});
		}
	},
	
	insertFidelisation : function(fidelisation,synch,form,len,callbackViewModel)
	{
		try
		{
	      form.InsertFidelisationIntoLOCAL(fidelisation,synch,form,len,callbackViewModel);
		 		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertFidelisation in PromotionRequest",'alert','e'); 
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionRequest";
						exception.FonctionE = "insertFidelisation";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListFidelisation);
						});
		}
	},
	
	InsertFidelisationIntoLOCAL: function(FidelisationObject,synch,formReq,len,callbackViewModel) {
  try
  {     
	     formReq.connexion.transaction(function(tx){ formReq.InsertIntoFidelisation(tx, formReq,FidelisationObject,synch) }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoFidelisation");
		 
		        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionRequest";
						exception.FonctionE = "InsertIntoFidelisation";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(formReq.ListFidelisation);
						});
		 
		 },function(){formReq.insertFidelisationIntoArray(FidelisationObject,formReq,len,callbackViewModel);}); 
	}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertFidelisationIntoLOCAL in PromotionRequest",'alert','e'); 
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionRequest";
						exception.FonctionE = "InsertFidelisationIntoLOCAL";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(formReq.ListFidelisation);
						});
		}	   		
},


InsertIntoFidelisation : function(requete,form,FidelisationObject,synch) {
   try
   {
	   for ( var i = 0 ; i< FidelisationObject.ListPromotion.length; i++)
		{
			requete.executeSql('INSERT INTO Fidelisation (PromotionID, Remise, Synch, DateDebut, HeureDebut,DateFin,HeureFin, Designation, ClientID) VALUES('+FidelisationObject.ListPromotion[i].PromotionID+','+FidelisationObject.ListPromotion[i].Remise+',"'+synch+'","'+FidelisationObject.ListPromotion[i].DateDebut+'","'+FidelisationObject.ListPromotion[i].HeureDebut+'","'+FidelisationObject.ListPromotion[i].DateFin+'","'+FidelisationObject.ListPromotion[i].HeureFin+'","'+FidelisationObject.ListPromotion[i].Designation+'",'+FidelisationObject.ClientID+')');
        }
   // DMS.Mobile.Common.Alert("Fin insertion Gamme dans la BD");         
		}
			catch(err)
		{
			 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionRequest";
						exception.FonctionE = "InsertIntoFidelisation";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoFidelisation in PromotionRequest",'alert','e');
						});
		}  																																
},

	insertFidelisationIntoArray : function(Fidelisation,form,len,callbackViewModel)
	{
		try
		{
		form.ListFidelisation.push(Fidelisation)
		if(form.ListFidelisation.length == len)
		{
			callbackViewModel(form.ListFidelisation);
		}
				}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertFidelisationIntoArray in PromotionRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionRequest";
						exception.FonctionE = "insertFidelisationIntoArray";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListFidelisation);
						});
		}
	},
	
		
		
///////////////////////////////////////////////////////////////////////////////////////////////////////////////		

//////////////////////////////////////////////////// Promotion From Server ////////////////////////////////////

GetListPromotionFromServer : function(callbackViewModel)
	{
		try
		{
		var Conf = JSON.parse(localStorage.getItem("Configuration"));
		
	//	DMS.Mobile.Common.Alert("get list gamme from server");
		var methode = "GetListPromotionsDTO?";
		var URL = Conf.URL+methode;
		 
		 var form = this;
		    DMS.Mobile.Common.CallService(function(json,Form){form.CreatePromotionDTO(JsonObject,Form,callbackViewModel);},URL,form);
			
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : GetListPromotionFromServer in PromotionRequest",'alert','e'); 
			
			            var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionRequest";
						exception.FonctionE = "GetListPromotionFromServer";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListPromotion);
						});
		}
		
	},
	
CreatePromotionDTO : function (json,form,callbackViewModel)
	{
		try
		{
			
			var len =json.length;
		if ( len>0)
		{
			var synch = "true";

			for (var i=0;i<json.length;i++)
			{
			var promotionDTO = new DMS.Mobile.Promotion();
			promotionDTO.PromotionID = json[i].PromotionID;
			promotionDTO.Remise = json[i].Remise;
			
			var dDebut = DMS.Mobile.Common.ParseDateJson(json[i].DateDebut);			
			promotionDTO.DateDebut = dDebut;
			var hDebut = DMS.Mobile.Common.ParseHeureJson(json[i].DateDebut);	
			promotionDTO.HeureDebut = hDebut;
			
			var dFin = DMS.Mobile.Common.ParseDateJson(json[i].DateFin);			
			promotionDTO.DateFin = dFin;
			var hFin = DMS.Mobile.Common.ParseHeureJson(json[i].DateFin);	
			promotionDTO.HeureFin = hFin;
			
			
			    var dateTimeDebut = DMS.Mobile.Common.ParseDateTimeJson(json[i].DateDebut);				
				promotionDTO.DateTimeDebut = dateTimeDebut;
				
			    var dateTimeFin = DMS.Mobile.Common.ParseDateTimeJson(json[i].DateFin);				
				promotionDTO.DateTimeFin = dateTimeFin;
			
			promotionDTO.Designation = json[i].Designation;
	
			
			
			form.insertPromotion(promotionDTO,synch,form,len,callbackViewModel);
			}

		}
		else{callbackViewModel(form.ListPromotion);}	
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : CreatePromotionDTO in PromotionRequest",'alert','e'); 
			
			  var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionRequest";
						exception.FonctionE = "CreatePromotionDTO";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListPromotion);
						});
		}
	},
	
insertPromotion : function(promotion,synch,form,len,callbackViewModel)
	{
		try
		{
	      form.InsertPromotionIntoLOCAL(promotion,synch,form,len,callbackViewModel);
		 		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertPromotion in PromotionRequest",'alert','e'); 
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionRequest";
						exception.FonctionE = "insertPromotion";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListPromotion);
						});
		}
	},
	
InsertPromotionIntoLOCAL: function(PromotionObject,synch,formReq,len,callbackViewModel) {
  try
  {     
	     formReq.connexion.transaction(function(tx){ formReq.InsertIntoPromotion(tx, formReq,PromotionObject,synch); }, function(err){ DMS.Mobile.Common.errors(err,"InsertIntoPromotion");
		 
		          var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionRequest";
						exception.FonctionE = "InsertIntoPromotion";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(formReq.ListPromotion);
						});
		 
		 },
		 function(){formReq.insertPromotionIntoArray(PromotionObject,formReq,len,callbackViewModel);
		 }); 
	}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertPromotionIntoLOCAL in PromotionRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionRequest";
						exception.FonctionE = "InsertPromotionIntoLOCAL";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(formReq.ListPromotion);
						});
		}	   		
},

InsertIntoPromotion : function(requete,form,PromotionObject,synch) {
   try
   {
			requete.executeSql('INSERT INTO Promotion (PromotionID, Remise, Synch, DateDebut, HeureDebut,DateFin,HeureFin, Designation, DateTimeDebut, DateTimeFin) VALUES('+PromotionObject.PromotionID+','+PromotionObject.Remise+',"'+synch+'","'+PromotionObject.DateDebut+'","'+PromotionObject.HeureDebut+'","'+PromotionObject.DateFin+'","'+PromotionObject.HeureFin+'","'+PromotionObject.Designation+'","'+PromotionObject.DateTimeDebut+'","'+PromotionObject.DateTimeFin+'")');
			
   // DMS.Mobile.Common.Alert("Fin insertion Gamme dans la BD");     
		}
			catch(err)
		{
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionRequest";
						exception.FonctionE = "InsertIntoPromotion";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoPromotion in PromotionRequest",'alert','e'); 
						});
		}  																																
},


	insertPromotionIntoArray : function(Promotion,form,len,callbackViewModel)
	{
		try
		{
		form.ListPromotion.push(Promotion)
		if(form.ListPromotion.length == len)
		{
			callbackViewModel(form.ListPromotion);
		}
				}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : insertPromotionIntoArray in PromotionRequest",'alert','e'); 
			
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionRequest";
						exception.FonctionE = "insertPromotionIntoArray";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callbackViewModel(form.ListPromotion); 
						});
		}
	},
	
	
	/////////////////////////////////////// Select All Promotion ///////////////////
	
	SelectAllPromotion : function(callback)
	{
	    try
		{	
			var form = this;	
			this.connexion.transaction(function(tx){ form.SelectFromPromotion(tx, form,callback) ;}, function(err){ DMS.Mobile.Common.errors(err,"SelectFromPromotion");
			
			        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionRequest";
						exception.FonctionE = "SelectFromPromotion";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.ListPromotion); 
						});
			
			});
			
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllPromotion in PromotionRequest",'alert','e'); 
				 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionRequest";
						exception.FonctionE = "SelectAllPromotion";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.ListPromotion); 
						});
			}
	},
	
	SelectFromPromotion : function(requete, form,callback)
	{
				try
			{
				
				requete.executeSql('  SELECT B.ArticleID'
									  +',B.CAB'
									  +',B.CodeArticle'
									  +',B.Designation'
									  +',B.FamilleID'
									  +',B.PrixUnitaireHT'
									  +',B.QteDispo'					
									  +',B.PrixUnitaireTTC'
									  
									  +',P.DateDebut'
									  +',P.DateFin'
									  +',P.Designation as PromDesig'
									  +',P.PromotionID'
									  +',P.Remise'
									  
									  +',F.Designation as famDesi'
									  +',F.GammeID'
									  
									  +',G.Designation as gamDesi'
      
      
  +' FROM PromotionArticleFamilleGamme as A, Article as B, Promotion as P,Familles as F,Gammes as G'
  +' where A.ArticleID = B.ArticleID and A.PromotionID = P.PromotionID and B.FamilleID = F.FamilleID and F.GammeID = G.GammeID'
	

				, [], function(tx, results) {form.querySuccessByPromotion(tx,results,form,callback);});
		   
		   
		   }
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromPromotion in PromotionRequest",'alert','e'); 
				 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionRequest";
						exception.FonctionE = "SelectFromPromotion";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.ListPromotion); 
						});
			}
	},
	
	querySuccessByPromotion : function(tx,results,form,callback)
	{
		try
			{
			form.ListPromotion = [];
			var len = results.rows.length;
			if(len>0){
			for (var i=0;i<len;i++){
				var oPromotionArticleFamilleGamme = null;
				 oPromotionArticleFamilleGamme = new DMS.Mobile.PromotionArticleFamilleGamme();
				
				var oPromotion =null;
				  oPromotion = new DMS.Mobile.Promotion();
				oPromotion.PromotionID = results.rows.item(i).PromotionID;
				oPromotion.Remise = results.rows.item(i).Remise;
				oPromotion.DateDebut = results.rows.item(i).DateDebut;
				
				oPromotion.DateFin = results.rows.item(i).DateFin;
				
				oPromotion.Designation = results.rows.item(i).PromDesig;
				oPromotion.ListGamme = [];
				oPromotionArticleFamilleGamme.Promotion = oPromotion;
				
				var oGamme = null;
				  oGamme = new DMS.Mobile.Gamme();
				oGamme.Designation = results.rows.item(i).gamDesi;
				oGamme.GammeID = results.rows.item(i).GammeID;
				oGamme.ListFamilles = [];
				oPromotionArticleFamilleGamme.Gamme = oGamme;
				
				var oFamille = null;
				  oFamille = new DMS.Mobile.Famille();
				oFamille.FamilleID = results.rows.item(i).FamilleID;
				oFamille.Designation = results.rows.item(i).famDesi;
				oFamille.GammeID = results.rows.item(i).GammeID;
				oFamille.ListArticles = [];
				oPromotionArticleFamilleGamme.Famille = oFamille;
				
				var oArticle = null;
				  oArticle = new DMS.Mobile.Article();
				oArticle.ArticleID = results.rows.item(i).ArticleID;
				oArticle.Designation = results.rows.item(i).Designation;
				oArticle.PrixUnitaireHT = results.rows.item(i).PrixUnitaireHT;
				oArticle.PrixUnitaireTTC = results.rows.item(i).PrixUnitaireTTC;
				oArticle.CAB = results.rows.item(i).CAB;
				oArticle.QuantiteDisponible = results.rows.item(i).QteDispo;
				oArticle.FamilleID = results.rows.item(i).FamilleID;
				oArticle.CodeArticle = results.rows.item(i).CodeArticle;
				oPromotionArticleFamilleGamme.Article = oArticle;
				
				
				form.PrepareListPromotion(oPromotionArticleFamilleGamme,form);				
				
				}
				callback(form.ListPromotion);
			}else
			{callback(form.ListPromotion);}
				}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessByPromotion in PromotionRequest",'alert','e'); 
				        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionRequest";
						exception.FonctionE = "querySuccessByPromotion";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.ListPromotion); 
						});
			}
	},
	
	PrepareListPromotion :function(oPromotionArticleFamilleGamme,form)
	{
		try
		{
		var oPromotionAFG = oPromotionArticleFamilleGamme;
		var indexPromotion = -1;
		for (var i = 0 ;i<form.ListPromotion.length;i++)
		{
			if(form.ListPromotion[i].PromotionID == oPromotionAFG.Promotion.PromotionID)
			{
				indexPromotion = i;
				break;
			}
		}
		if(indexPromotion == -1)
		{
			oPromotionAFG.Famille.ListArticles.push(oPromotionAFG.Article);
			oPromotionAFG.Gamme.ListFamilles.push(oPromotionAFG.Famille);
			oPromotionAFG.Promotion.ListGamme.push(oPromotionAFG.Gamme);
			form.ListPromotion.push(oPromotionAFG.Promotion);
		}
		else
		{
			var indexGamme = -1;
			for(var j=0;j<form.ListPromotion[indexPromotion].ListGamme.length;j++)
			{
				if(form.ListPromotion[indexPromotion].ListGamme[j].GammeID == oPromotionAFG.Gamme.GammeID)
				{
					indexGamme = j;
					break;
				}
			}
			if(indexGamme = -1)
			{
				oPromotionAFG.Famille.ListArticles.push(oPromotionAFG.Article);
				oPromotionAFG.Gamme.ListFamilles.push(oPromotionAFG.Famille);
				form.ListPromotion[indexPromotion].ListGamme.push(oPromotionAFG.Gamme);
			}
			else
			{
				var indexFamille = -1;
				for(var h=0;h<form.ListPromotion[indexPromotion].ListGamme[IndexGamme].ListFamilles.length;h++)
				{
					if(form.ListPromotion[indexPromotion].ListGamme[IndexGamme].ListFamilles[h].FamilleID == oPromotionAFG.Famille.FamilleID)
					{
						indexFamille = h;
						break;
					}
				}
				if(indexFamille = -1)
				{
					oPromotionAFG.Famille.ListArticles.push(oPromotionAFG.Article);
					form.ListPromotion[indexPromotion].ListGamme[indexGamme].push(oPromotionAFG.Famille);
				}
				else
				{
					var indexArticle = -1;
					for(var e=0;e<form.ListPromotion[indexPromotion].ListGamme[IndexGamme].ListFamilles[indexFamille].ListArticles.length;h++)
					{
						if(form.ListPromotion[indexPromotion].ListGamme[IndexGamme].ListFamilles[indexFamille].ListArticles[e].ArticleID == oPromotionAFG.Article.ArticleID)
						{
							indexArticle = e;
							break;
						}
					}
					if(indexArticle = -1)
					{
						form.ListPromotion[indexPromotion].ListGamme[indexGamme].ListFamilles[indexFamille].ListArticles.push(oPromotionAFG.Article);
					}
				}
			}
		}
		}
		catch(err)
		{
			  var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionRequest";
						exception.FonctionE = "PrepareListPromotion";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							
						});
		}
	},
	
/*	insertPromotionIntoArray : function(Promotion,form,len,callback)
	{
		form.ListPromotion.push(Promotion);
		if(form.ListPromotion.length == len)
		{
			 callback(form.ListPromotion);
		}
	},*/
	///////////////////////////////////////////////////////////////////////////////
	
	
	/////////////////////////////////////// Select All Fidelisation ///////////////////
	
	SelectAllClientFidelisation : function(callback)
	{
	    try
		{	
			var form = this;	
			this.connexion.transaction(function(tx){ form.SelectFromFidelisation(tx, form,callback) ;}, function(err){ DMS.Mobile.Common.errors(err,"SelectFromFidelisation");
			      
				  var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionRequest";
						exception.FonctionE = "SelectFromFidelisation";
						exception.Exception = err.code;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.ListClient);
						});
			
			});
			
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllFidelisation in PromotionRequest",'alert','e'); 
				
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionRequest";
						exception.FonctionE = "SelectAllFidelisation";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.ListClient);
						});
			}
	},
	
	SelectFromFidelisation : function(requete, form,callback)
	{
				try
			{
				
				requete.executeSql('  SELECT B.ArticleID'
									  +',B.CAB'
									  +',B.CodeArticle'
									  +',B.Designation'
									  +',B.FamilleID'
									  +',B.PrixUnitaireHT'
									  +',B.QteDispo'					
									  +',B.PrixUnitaireTTC'
									  
									  +',Fi.DateDebut'
									  +',Fi.DateFin'
									  +',Fi.Designation as PromDesig'
									  +',Fi.PromotionID'
									  +',Fi.Remise'
									  +',Fi.ClientID'
									  
									  +',C.NomResponsable'
									  +',C.NomSociete'
									  +',C.RaisonSocial'
									  +',C.Tel'
									  +',C.Fax'
									  +',C.CodeClient'
									  +',C.UrlWeb'
									  +',C.Email'
									  +',C.ImageIDClient'
									  +',C.EtatClient'
									  +',C.ActiviteID'
									  
									  +',F.Designation as famDesi'
									  +',F.GammeID'
									  
									  +',G.Designation as gamDesi'
      
      
  +' FROM PromotionArticleFamilleGamme as A, Article as B, Client as C, Fidelisation as Fi,Familles as F,Gammes as G'
  +' where A.ArticleID = B.ArticleID and A.PromotionID = Fi.PromotionID and B.FamilleID = F.FamilleID and F.GammeID = G.GammeID and C.ClientID = Fi.ClientID'
	

				, [], function(tx, results) {form.querySuccessByFidelisation(tx,results,form,callback);});
		   
		   
		   }
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : SelectFromFidelisation in PromotionRequest",'alert','e'); 
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionRequest";
						exception.FonctionE = "SelectFromFidelisation";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.ListClient);
						});
			}
	},
	
	querySuccessByFidelisation : function(tx,results,form,callback)
	{
		try
			{
			form.ListFidelisation = [];
			var len = results.rows.length;
			if(len>0){
			for (var i=0;i<len;i++){
				var oClientPromotionArticleFamilleGamme = null;
				 oClientPromotionArticleFamilleGamme = new DMS.Mobile.ClientPromotionArticleFamilleGamme();
				
				var oClient =null;
				  oClient = new DMS.Mobile.Client();

				oClient.ClientID = results.rows.item(i).ClientID;
				oClient.NomResponsable = results.rows.item(i).NomResponsable;
				oClient.NomSociete = results.rows.item(i).NomSociete;
				oClient.RaisonSocial = results.rows.item(i).RaisonSocial;
				oClient.Tel = results.rows.item(i).Tel;
				oClient.Fax = results.rows.item(i).Fax;
				oClient.UrlWeb = results.rows.item(i).UrlWeb;
				oClient.Email = results.rows.item(i).Email;
				oClient.ImageIDClient = results.rows.item(i).ImageIDClient;
				oClient.EtatClient = results.rows.item(i).EtatClient;
				oClient.ActiviteID = results.rows.item(i).ActiviteID;
				oClient.listPromotions = [];
				oClientPromotionArticleFamilleGamme.Client = oClient;
				
				
				var oFidelisation =null;
				  oFidelisation = new DMS.Mobile.Promotion();
				oFidelisation.PromotionID = results.rows.item(i).PromotionID;
				oFidelisation.Remise = results.rows.item(i).Remise;
				oFidelisation.ClientID = results.rows.item(i).ClientID;
				oFidelisation.DateDebut = results.rows.item(i).DateDebut;
				oFidelisation.DateFin = results.rows.item(i).DateFin;
				oFidelisation.Designation = results.rows.item(i).PromDesig;
				oFidelisation.ListGamme = [];
				oClientPromotionArticleFamilleGamme.Promotion = oFidelisation;
				
				var oGamme = null;
				  oGamme = new DMS.Mobile.Gamme();
				oGamme.Designation = results.rows.item(i).gamDesi;
				oGamme.GammeID = results.rows.item(i).GammeID;
				oGamme.ListFamilles = [];
				oClientPromotionArticleFamilleGamme.Gamme = oGamme;
				
				var oFamille = null;
				  oFamille = new DMS.Mobile.Famille();
				oFamille.FamilleID = results.rows.item(i).FamilleID;
				oFamille.Designation = results.rows.item(i).famDesi;
				oFamille.GammeID = results.rows.item(i).GammeID;
				oFamille.ListArticles = [];
				oClientPromotionArticleFamilleGamme.Famille = oFamille;
				
				var oArticle = null;
				  oArticle = new DMS.Mobile.Article();
				oArticle.ArticleID = results.rows.item(i).ArticleID;
				oArticle.Designation = results.rows.item(i).Designation;
				oArticle.PrixUnitaireHT = results.rows.item(i).PrixUnitaireHT;
				oArticle.PrixUnitaireTTC = results.rows.item(i).PrixUnitaireTTC;
				oArticle.CAB = results.rows.item(i).CAB;
				oArticle.QuantiteDisponible = results.rows.item(i).QteDispo;
				oArticle.FamilleID = results.rows.item(i).FamilleID;
				oArticle.CodeArticle = results.rows.item(i).CodeArticle;
				oClientPromotionArticleFamilleGamme.Article = oArticle;
				
				
				form.PrepareListClientFidelisation(oClientPromotionArticleFamilleGamme,form);				
				
				}
				callback(form.ListClient);
			}else
			{callback(form.ListClient);}
				}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessByFidelisation in PromotionRequest",'alert','e'); 
				
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionRequest";
						exception.FonctionE = "querySuccessByFidelisation";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback(form.ListClient);
						});
			}
	},
	
	PrepareListClientFidelisation :function(oClientPromotionArticleFamilleGamme,form)
	{
		try
		{
		var oFidelisationPromotionAFG = oClientPromotionArticleFamilleGamme;
		
		var indexClient = -1;
		for(var k = 0 ; k<form.ListClient.length;k++)
		{
			if(form.ListClient[k].ClientID == oFidelisationPromotionAFG.Client.ClientID)
			{
				indexClient = k;
				break;
			}
		}
		if(indexClient == -1)
		{
			oFidelisationPromotionAFG.Famille.ListArticles.push(oFidelisationPromotionAFG.Article);
			oFidelisationPromotionAFG.Gamme.ListFamilles.push(oFidelisationPromotionAFG.Famille);
			oFidelisationPromotionAFG.Promotion.ListGamme.push(oFidelisationPromotionAFG.Gamme);
			oFidelisationPromotionAFG.Client.listPromotions.push(oFidelisationPromotionAFG.Promotion);
			form.ListClient.push(oFidelisationPromotionAFG.Client);
		}
		else
		{
		
		var indexPromotion = -1;
		for (var i = 0 ;i<form.ListClient[indexClient].listPromotions.length;i++)
		{
			if(form.ListClient[indexClient].listPromotions[i].PromotionID == oFidelisationPromotionAFG.Promotion.PromotionID)
			{
				indexPromotion = i;
				break;
			}
		}
		if(indexPromotion == -1)
		{
			oFidelisationPromotionAFG.Famille.ListArticles.push(oFidelisationPromotionAFG.Article);
			oFidelisationPromotionAFG.Gamme.ListFamilles.push(oFidelisationPromotionAFG.Famille);
			oFidelisationPromotionAFG.Promotion.ListGamme.push(oFidelisationPromotionAFG.Gamme);
			form.ListClient[indexClient].listPromotions.push(oFidelisationPromotionAFG.Promotion);
		}
		else
		{
			var indexGamme = -1;
			for(var j=0;j<form.ListClient[indexClient].listPromotions[indexPromotion].ListGamme.length;j++)
			{
				if(form.ListClient[indexClient].listPromotions[indexPromotion].ListGamme[j].GammeID == oFidelisationPromotionAFG.Gamme.GammeID)
				{
					indexGamme = j;
					break;
				}
			}
			if(indexGamme = -1)
			{
				oFidelisationPromotionAFG.Famille.ListArticles.push(oFidelisationPromotionAFG.Article);
				oFidelisationPromotionAFG.Gamme.ListFamilles.push(oFidelisationPromotionAFG.Famille);
				form.ListClient[indexClient].listPromotions[indexPromotion].ListGamme.push(oFidelisationPromotionAFG.Gamme);
			}
			else
			{
				var indexFamille = -1;
				for(var h=0;h<form.ListClient[indexClient].listPromotion[indexPromotion].ListGamme[IndexGamme].ListFamilles.length;h++)
				{
					if(form.ListClient[indexClient].listPromotions[indexPromotion].ListGamme[IndexGamme].ListFamilles[h].FamilleID == oFidelisationPromotionAFG.Famille.FamilleID)
					{
						indexFamille = h;
						break;
					}
				}
				if(indexFamille = -1)
				{
					oFidelisationPromotionAFG.Famille.ListArticles.push(oFidelisationPromotionAFG.Article);
					form.ListClient[indexClient].listPromotions[indexPromotion].ListGamme[IndexGamme].push(oFidelisationPromotionAFG.Famille);
				}
				else
				{
					var indexArticle = -1;
					for(var e=0;e<form.ListClient[indexClient].listPromotions[indexPromotion].ListGamme[IndexGamme].ListFamilles[indexFamille].ListArticles.length;h++)
					{
						if(form.ListClient[indexClient].listPromotions[indexPromotion].ListGamme[IndexGamme].ListFamilles[indexFamille].ListArticles[e].ArticleID == oFidelisationPromotionAFG.Article.ArticleID)
						{
							indexArticle = e;
							break;
						}
					}
					if(indexArticle = -1)
					{
						form.ListClient[indexClient].listPromotions[indexPromotion].ListGamme[IndexGamme].ListFamilles[indexFamille].ListArticles.push(oFidelisationPromotionAFG.Article);
					}
				}
			}
		}
		}
		
		}
		catch(err)
		{
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionRequest";
						exception.FonctionE = "PrepareListClientFidelisation";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							
						});
		}
	},
	
/*	insertPromotionIntoArray : function(Promotion,form,len,callback)
	{
		form.ListFidelisation.push(Promotion);
		if(form.ListFidelisation.length == len)
		{
			 callback(form.ListFidelisation);
		}
	}*/
	///////////////////////////////////////////////////////////////////////////////
	
/////////////////////////////// Delete all fidelisation ///////////////////////

DeleteAllFidelisation : function(callback)
{
	try
	{
		var form = this;	
		this.connexion.transaction(function(tx){ form.DeleteFidelisations(tx, form,callback);}, function(err){ DMS.Mobile.Common.errors(err,"DeleteFidelisations");
		
		        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionRequest";
						exception.FonctionE = "DeleteFidelisations";
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
			DMS.Mobile.Notification.ShowMessage(err.message+" : DeleteAllFidelisation in PromotionRequest",'alert','e'); 
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionRequest";
						exception.FonctionE = "DeleteAllFidelisation";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
	 }	
},

DeleteFidelisations : function(requete, form,callback)
{
	requete.executeSql("DELETE  FROM Fidelisation ", [],
              function(tx, result) {				
				form.querySuccessDELETEAll(form,callback);
				}, 
                function(err){DMS.Mobile.Common.errors(err,"DeleteFidelisation");
				
				 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionRequest";
						exception.FonctionE = "DeleteFidelisations";
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
	
////////////////////////////////////////// Delete All Promotion /////////////////////

DeleteAllPromotion : function(callback)
{
	try
	{
		var form = this;	
		this.connexion.transaction(function(tx){ form.DeletePromotions(tx, form,callback);}, function(err){ DMS.Mobile.Common.errors(err,"DeletePromotions");
		
		     var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionRequest";
						exception.FonctionE = "DeletePromotions";
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
			DMS.Mobile.Notification.ShowMessage(err.message+" : DeleteAllPromotion in PromotionRequest",'alert','e'); 
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionRequest";
						exception.FonctionE = "DeleteAllPromotion";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
	 }	
},

DeletePromotions : function(requete, form,callback)
{
	requete.executeSql("DELETE  FROM Promotion ", [],
              function(tx, result) {				
				form.querySuccessDELETEAll(form,callback);
				}, 
                function(err){DMS.Mobile.Common.errors(err,"DeletePromotions");
			      
			      var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PromotionRequest";
						exception.FonctionE = "DeletePromotions";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							callback();
						});
			
			});
},

	
}