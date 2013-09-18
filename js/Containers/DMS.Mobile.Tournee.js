if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Tournee = {};
DMS.Mobile.Tournee = function () { };
$.extend(DMS.Mobile.Tournee.prototype,
{
    TourneeID : null,
	DateDebut : null,
	DateFin : null,
	DateCreation : null,
	EtatTournee : null,
	TerminalID : null,
	ImprimanteID : null,
	EquipementID : null,
	VehiculeID : null,
	PersonnelID : null,
	listMission : [],
	listPositions : []
		
	
});