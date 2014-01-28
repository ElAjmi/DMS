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
	DateModification : null,
	HeureModification : null,
    DateLivraisonPrevue: null,
	EtatCommande : null,
    PrixTotalTTC: null,
    PrixTotalHT: null,
    DateCreationTrie : null,
    TotalTVA: null,
    PointVenteID : null,
    CommercialID : null,
	
    Personnel : null,
	PointVentes : null,
    LignesCommande: [],
	Synch : null,
    Livraisons : []


});