if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Famille = {};
DMS.Mobile.Famille = function () { };
$.extend(DMS.Mobile.Famille.prototype,
{
    
    FamilleID : null,
    Designation : null,
    GammeID: null,
    ListArticles : [],
    Gammes: null,


	Synch : null,
    ListRelevePresencePrixConcurrents : [],
	ListRelevePrix : []


});