if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Client = {};
DMS.Mobile.Client = function () { };
$.extend(DMS.Mobile.Client.prototype,
{
    ClientID : null,
	NomResponsable : null,
	NomSociete : null,
	RaisonSocial : null,
	Tel : null,
	Fax : null,
	UrlWeb : null,
	Email : null,
	ActiviteID : null,
	ImageIDClient : null,
	EtatClient : null,
	Activites : null,
	listObjectifs : [],
	listPointVentes : [],
	listPromotions : [],
	

			
});