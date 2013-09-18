if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Activite = {};
DMS.Mobile.Activite = function () { };
$.extend(DMS.Mobile.Activite.prototype,
{
	ActiviteID : null,
	Designation : null,
	listClient : []			
	
});