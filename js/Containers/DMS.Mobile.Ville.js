if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Ville = {};
DMS.Mobile.Ville = function () { };
$.extend(DMS.Mobile.Ville.prototype,
{
	VilleID : null,
	Designation : null,
	Latitude : null,
	Longitude : null,
	ZoneID : null,
	Zones : null,
	listPointVentes : []
	
	

	
});