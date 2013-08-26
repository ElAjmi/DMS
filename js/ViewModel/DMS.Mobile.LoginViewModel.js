if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Login = {};

DMS.Mobile.Login = 
{
	$ValidateButton: null,
    $login:null,
    $password:null,
	
    connexion: null,
	Personnel: null,

    Initialise: function () {
       
	   DMS.Mobile.PersonnelRequest.connexion = this.connexion;
       this.InitialiseEvents();
    },
	
	InitialiseEvents: function () {
		var form = this;
		   this.$ValidateButton.click(function(){
			
				form.ValidateLogin();
			
			});
       
    },
	
	
	ValidateLogin:function(){
	    var form = this;
		DMS.Mobile.PersonnelRequest.GetPersonnelFrmLocal($(this.$login).val(), $(this.$password).val(),function(personnel){form.fonction1(personnel,form)});
		
		//DMS.Mobile.PersonnelRequest.GetPersonnelFromServer($(this.$login).val(), $(this.$password).val(),                     function(personnel){form.fonction2(personnel,form)});
		
		
		
		},
		
		fonction1 : function(personnel,form)
		{
			if ( personnel == null)
			{
			//DMS.Mobile.Common.TestServer();
				if (DMS.Mobile.Common.AcceeServeur == true)
				{
					DMS.Mobile.PersonnelRequest.GetPersonnelFromServer($(this.$login).val(), $(this.$password).val(),                     function(personnel){form.fonction2(personnel,form)});
	
				}
				else
				{
					alert("Connexion serveur echouée");
				}
			
			}
			else
			{
				DMS.Mobile.Common.RedirectToCalendrier();
			}
		},
		
		fonction2 : function(personnel,form)
		{
			if ( personnel == null)
			{
				alert("login et/ou mot de passe incorrecte");
			}
			else
			{
				DMS.Mobile.Common.RedirectToCalendrier();
			}
		}
		
		
		
}