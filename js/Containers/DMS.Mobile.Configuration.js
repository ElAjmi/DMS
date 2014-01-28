if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Configuration = {};
DMS.Mobile.Configuration = function () { };
$.extend(DMS.Mobile.Configuration.prototype,
{
	ConfigurationID : null,
	Frequence : null,
	Perimetre : null,
	Synch : null,
	URL: null,
	SeuilArticle : null,
	
	
})