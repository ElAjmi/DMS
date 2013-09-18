if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Gamme = {};
DMS.Mobile.Gamme = function () { };
$.extend(DMS.Mobile.Gamme.prototype,
{
    
    GammeID : null,
    Designation : null,
    ListFamilles: [],
    ListObjectifs : [],
    ListPromotions: [],
    ListRelevePresencePrixConcurrents : [],
    ListRelevePrix : []
    

});