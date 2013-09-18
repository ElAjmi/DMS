if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.LigneCommande = {};
DMS.Mobile.LigneCommande = function () { };
$.extend(DMS.Mobile.LigneCommande.prototype,
{

          LigneCommandeID : null,
          Quantite : null, 
          PrixTotalArticleTTC : null,
          PrixTotalArticleHT : null,
          CommandeID : null, 
          ArticleID : null,
          
});