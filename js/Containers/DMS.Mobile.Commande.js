if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Commande = {};
DMS.Mobile.Commande = function () { };
$.extend(DMS.Mobile.Commande.prototype,
{
    
    CommandeID : null,
    CAB : null,
	DateCreation : null,
	HeureCreation : null,
    DateLivraisonPrevue: null,
	HeureLivraisonPrevue : null,
	EtatCommande : null,
    PrixTotalTTC: null,
    PrixTotalHT: null,
	CodeCommande : null,
    TotalTVA: null,
	Synch: null,
    PointVenteID : null,
    CommercialID : null,
    Personnel : null,
	PointVentes : null,
    ListLignesCommande: [],
    ListLivraisons : []


});