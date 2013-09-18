if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Zone = {};
DMS.Mobile.Zone = function () { };
$.extend(DMS.Mobile.Zone.prototype,
{
	ZoneID : null,
	Designation : null,
	Personnel : null,
	listVilles : []
	
	
});