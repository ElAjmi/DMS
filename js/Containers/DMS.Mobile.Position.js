if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Position = {};
DMS.Mobile.Position = function () { };
$.extend(DMS.Mobile.Position.prototype,
{
	PositionID : null,
	PersonnelID : null,
	Latitude : null,
	Longitude : null,
	Dates : null,
	Heure : null,
	IMEI : null,
	Synch : null,
});