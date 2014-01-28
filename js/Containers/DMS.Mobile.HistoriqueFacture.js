if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.HistoriqueFacture = {};
DMS.Mobile.HistoriqueFacture = function () { };
$.extend(DMS.Mobile.HistoriqueFacture.prototype,
{
	HistoriqueID : null,
	FactureID : null,
	MontantSaisie : null,
	Commentaires : null,
	ModePayement : null,
	DateHistorique : null,
	HeureHistorique : null
	
	
});