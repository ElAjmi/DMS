if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Profils = {};
DMS.Mobile.Profils = function () { };
$.extend(DMS.Mobile.Profils.prototype,
{
     
    ProfilID : null,
	Designation : null,
	Description : null,
	ListPersonnels : []
	
	
});