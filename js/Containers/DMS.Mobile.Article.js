if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Article = {};
DMS.Mobile.Article = function () { };
$.extend(DMS.Mobile.Article.prototype,
{

          ArticleID : null,
          Designation : null, 
          FamilleID : null,
          PrixUnitaireHT : null,
          CAB : null, 
          UniteMesureID : null,
          QuantiteDisponible : null,
          Quota : null,
          CodeArticle : null, 
          CodeTVA : null, 
          Familles : null, 
          UniteMesure : null,
		  
		  UniteCarton : null,
		  PoidsUnite : null,
		  DimensionCarton : null,
		  VolumeCarton : null,
		  Ordre : null,
		  Actif : null,
		  
		  
          ListFacings : [],
          LignesCommande : [],
          Livraisons : [], 

          ListReleveLineaire : [],
          ListRelevePresencePrixConcurrents : [], 
          ListRelevePrix : [], 
          ListReleveStock : [],
          CodeTVA1 : null, 
		  PrixUnitaireTTC : null,
		  PromotionID : null,
		  Pictures : [],
		  Synch : null,
		  
		  Promotion : null,
		  Picture : null
});