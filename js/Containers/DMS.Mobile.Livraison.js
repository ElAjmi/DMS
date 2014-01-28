if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Livraison = {};
DMS.Mobile.Livraison = function () { };
$.extend(DMS.Mobile.Livraison.prototype,
{
	CommandeID : null,
	CodeLivraison : null,
	DatePlanification : null,
	Etat : null,
	ClientID: null,
	PointVenteID: null,
	DateCreationTrie : null,
	PointVentes : null,
	
	
});