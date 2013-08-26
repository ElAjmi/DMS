if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Personnel = {};
DMS.Mobile.Personnel = function () {};

$.extend(DMS.Mobile.Personnel.prototype,
{

    PersonnelID : null,
    Login:null,
	Password : null,
	Nom : null,
	Prenom : null,
	Tel : null,
	Email : null,
	Adresse : null,
    Matricule : null,
   // Synch : null,
    ProfilID : null,
    ListCommandes : [],
    ListMissions : [],
    ListObjectifs : [],
    Profils : null,
    ListReclamations : []
	
});