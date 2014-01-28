if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Facture = {};
DMS.Mobile.Facture = function () { };
$.extend(DMS.Mobile.Facture.prototype,
{
	    FactureID : null,
        CAB : null, 
        EtatFacture : null,
        ResteAPayer : null,
        CommentairesID : null,
        DateFacture : null,
         MissionID : null,
         MontantNet : null,
         TauxEscompte : null,
       //  Commentaires : null,
		 InternalCodeFacture : null,
        // MissionRecouvrement : null,
         ListLivraisons : [],
	
});