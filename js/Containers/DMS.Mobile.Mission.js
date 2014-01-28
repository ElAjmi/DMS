if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Mission = {};
DMS.Mobile.Mission = function () { };
$.extend(DMS.Mobile.Mission.prototype,
{
     
    MissionID : null,
	EtatMission : null,
	DateCreation : null,
	HeureCreation : null,
	Synch : null,
	DegreUrgence : null,
	DateCloture : null,
	HeureCloture : null,
	Commentaires : null,
	TypeMissionID : null,
	Personnel : null,
	BCKPersonnelID : null,
	PointVenteID : null,
	//TourneeID : null,	
	PointVentes : null,
	Tournees : null,
	ListFacture : [],
	TypeMissions : null
						

	
	
});