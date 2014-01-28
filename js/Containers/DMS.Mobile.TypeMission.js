if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.TypeMission = {};
DMS.Mobile.TypeMission = function () { };
$.extend(DMS.Mobile.TypeMission.prototype,
{
    TypeMissionID : null,
	Titre : null,
	Missions : [],
	Synch : null,		
	
});