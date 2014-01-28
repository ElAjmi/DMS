if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Tournee = {};
DMS.Mobile.Tournee = function () { };
$.extend(DMS.Mobile.Tournee.prototype,
{
    TourneeID : null,
	DateDebut : null,
	HeureDebut : null,
	DateCloture : null,
	HeureCloture : null,
	Synch : null,
	DateCreation : null,
	HeureCreation : null,
	EtatTournee : null,	
	VehiculeID : null,
	PersonnelID : null,
	//Missions : [],
	ListPointVentes : [],
	listPositions : [],
	ListEquipement : []
		
	
});