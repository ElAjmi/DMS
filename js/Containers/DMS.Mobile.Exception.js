if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Exception = {};
DMS.Mobile.Exception = function () { };
$.extend(DMS.Mobile.Exception.prototype,
{
	ExceptionID : null,
	FichierE : null,
	FonctionE : null,
	Synch : null,
	Exception : null,
	
	
});