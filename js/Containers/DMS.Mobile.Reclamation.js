if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Reclamation = {};
DMS.Mobile.Reclamation = function () { };
$.extend(DMS.Mobile.Reclamation.prototype,
{
     
    ReclamationID : null,
	TypeReclamationID : null,
	TexteReclamation : null,
	PointVenteID : null,
	PersonnelID : null,
	ParentID : null,
	Personnel : null,
	Synch : null,
	PointVentes : null,		
    EtatTraitement : null,
    DateCreation : null,
	DateCreationTrie : null,
	HeureCreation : null,
	ListReponse : [],
	EtatConsultation : null
	
	
});