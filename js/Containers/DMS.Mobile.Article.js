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
          ListFacings : [],
          ListLignesCommande : [],
          ListLivraisons : [], 
          ListPromotions : [], 
          ListReleveLineaire : [],
          ListRelevePresencePrixConcurrents : [], 
          ListRelevePrix : [], 
          ListReleveStock : [],
          CodeTVA1 : null, 
		  PrixUnitaireTTC : null
});