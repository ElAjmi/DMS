if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.PointVente = {};
DMS.Mobile.PointVente = function () { };
$.extend(DMS.Mobile.PointVente.prototype,
{
    
    PointVenteID : null,
    ClientID : null,
    Latitude: null,
    Longitude: null,
	EtatPointVente : null,
    VilleID : null,
    Responsable: null,
    Adresse: null,
	Tel : null,
    Fax : null,
	Synch : null,
    Email: null,
    Client: null,
	Ville : null,
	
	Picture : null,
	
	ListEspacesPromos : [],
    ListLineaires : [],
    ListMissions : [],
	ListReclamations : [],
	ListRelevePresencePrixConcurrents : [],
    ListRelevePrix : [],
    ListReleveStock : [],
	ListCommandes : [],
	ListTournees : []
	


});