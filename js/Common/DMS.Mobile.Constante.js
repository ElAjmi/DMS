if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Constante = {};

DMS.Mobile.Constante = 
{	
	EtatTournee : {
		NonDemaree : 0,
		EnCours  : 1,
		Cloturee : 2,
		Annulee : 3,
	},
	
	EtatMission : {
		NonDemaree : 0,
		EnCours  : 1,
		Cloturee : 2,
		Annulee : 3,
	},
	
	DegreUrgence : {
		Normal : 0,
		Moyen : 1,
		Eleve : 2,
	},
	
	EtatPointVente : {
		NonActive : 0,
		Active : 1,
		Desactive : 2,
	},
	
	EtatClient : {
		Active : 0,
		Desactive : 1,
		Bloque : 2,
	},
	
	EtatCommande : {
		NonValidee : 0,
		Validee :1,
		Annulee : 2,
		EnCoursDeTraitement  : 3,
		Refusee : 4,
		Envoyee : 5,
		
	},
	
	TypeMission : {
		Facing : 1,
		Commande : 2,
		EspacePromo : 3,
		Livraison : 4,
		ParametragePV : 5,
		Recouvrement : 6,
		ReleveInventaire : 7,
		RelevePresencePrixConc : 8,
		RelevePrix : 9,
		ReleveVenteConcu : 10,
	}
	
}




