if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Picture = {};
DMS.Mobile.Picture = function () { };
$.extend(DMS.Mobile.Picture.prototype,
{
	PictureID : null,
	Name: null,
	ArticleID: null,
	PointVenteID: null,
    ClientID: null,
	FamilleID : null,
	Famille : null,
	Byte: null,
	Article : null,
	Synch: null
});