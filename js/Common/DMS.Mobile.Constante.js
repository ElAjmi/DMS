if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Constante = {};

DMS.Mobile.Constante = 
{	

   Proposition1 : {
	
	DerniereCommande : 0,
	MoyenneRefMvt : 1,
	MaxRefMvt : 2,   
	   
	},

   Proposition3 : {
    
	   MoyenneA : 0,
	   Referentiel : 1,
	},

   ModePayement : {
	   
	 Espece : 0,
	 Cheque : 1,  
	 Traite : 2,  
	   
	   }, 

   TypeReclamation : {
	 
	 RecInconnue : 0,
	 RecFacing : 1,  
	 RecCommande : 2,
	 RecEspacePromo : 3,
	 RecLivraison : 4,
	 RecParametragePV : 5,
	 RecRecouvrement : 6,
	 RecReleveInventaire : 7,
	 RecRelevePresencePrixConc : 8,
	 RecRelevePrix : 9,
	 ReclamationReleveVenteConc : 10,	   
   
   
   
   },

  EtatTraitement: {
	  NonTraitee : 0,
	  Traitee : 1,
	  Supprimee : 2,
	  
	  },

  EtatConsultation: {
	  NonConsulte : 0,
	  Consulte : 1,
	  
	  },

    EtatFacture : {
		NonReglee : 0,
		Reglee : 1,
		
		},

    Synchronize : {
		  All : 0,
		  Position : 1,
		  Commande : 2,
		  Tournee : 3,
		  Reclamation : 4,
		  Facture : 5,
		  ArticleCommercial : 6,
		  PropositionCommande : 7,
		
		},

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




