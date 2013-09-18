if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Mission = {};
DMS.Mobile.Mission = function () { };
$.extend(DMS.Mobile.Mission.prototype,
{
     
    MissionID : null,
	EtatMission : null,
	DateCreation : null,
	DegreUrgence : null,
	DateCloture : null,
	Commentaires : null,
	TypeMissionID : null,
	Personnel : null,
	BCKPersonnelID : null,
	PointVenteID : null,
	TourneeID : null,	
	PointVentes : null,
	Tournees : null,
	TypeMissions : null	
	
						

	
	
});