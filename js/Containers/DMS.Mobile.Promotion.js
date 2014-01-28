if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Promotion = {};
DMS.Mobile.Promotion = function () { };
$.extend(DMS.Mobile.Promotion.prototype,
{
	PromotionID : null,
	Remise : null,
	Synch : null,
	DateDebut : null,	
	HeureDebut : null,
	DateFin : null,	
	HeureFin : null,
	Quota : null,
	Designation	 : null,
	ClientID : null,
	DateTimeDebut : null,
	DateTimeFin : null,

	ListGamme : []
	
});