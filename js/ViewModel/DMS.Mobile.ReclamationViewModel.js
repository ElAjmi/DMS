if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.ReclamationViewModel = {};

DMS.Mobile.ReclamationViewModel = 
{
	connexion: null,

	indexClient : null,
	indexPointVente : null,
    
	$envoyer : null,
    $annuler : null,
	
	
	$btnSeDeconnecter : null,
	$Bloc1 : null,

	$popupBasic : null,
	
	$selectClient : null,

	$client : null,
	$pointVente : null,
	$dtailsClient : null,
	$detailPointVente : null,
	$SelectPointVente : null,
	$ButtonDetail : null,
	


	Init : function()
	{
		this.GetFromSession();
	
			this.InitNewPage();
		
	},
	
	GetFromSession : function(){
		
			this.indexClient = sessionStorage.getItem("indexClient");
			this.indexPointVente = sessionStorage.getItem("indexPointVente");
	
	},
	


	
	
	InitNewPage : function()
	{
		var form = this;
		this.InitializeEvents(form);

		
	DMS.Mobile.ClientRequest.connexion = form.connexion;
		    DMS.Mobile.ClientRequest.SelectAllClient(function(ListClient){
				
			
					form.InitializeClient(ListClient,form);
				
				
				});
			
		
		
		
	},
	
		InitializeEvents : function(form)
		{

            $(form.$btnSeDeconnecter).click(function(){

					 sessionStorage.removeItem("indexClient");
					 sessionStorage.removeItem("indexPointVente");
					 sessionStorage.removeItem("userID");
					 
					 DMS.Mobile.Common.RedirectToLogin();
				
			});

		    $(form.$annuler).click(function(){

					sessionStorage.removeItem("userID");
					 sessionStorage.removeItem("indexClient");
					 sessionStorage.removeItem("indexPointVente");
			        parent.history.back();
			        return false;
		    });

			
			
			
			$(form.$envoyer).click(function() {
				
				// form.InitializeReclamation(form);
				
				
				 });
				 
				 $(window).bind('beforeunload', function(){
					 
					sessionStorage.removeItem("userID");
					 sessionStorage.removeItem("indexClient");
					 sessionStorage.removeItem("indexPointVente");
					 
					
			});
		},
		

	
	
	InitializeClient:function(ListClient,form)
	{ 
	
		try
		{
		var html = "";

		for (var i = 0; i<ListClient.length;i++)
		{
			html += "<li> <label> "+ListClient[i].NomSociete+" </label><input type='hidden' value='"+ i +"' /> </li>";
		}
		
		$(form.$selectClient).html(html).listview("refresh");
		$("#formReclamation").trigger('pagecreate');
		
		form.addEventToSelectClient(form,ListClient);
		
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : InitializeClient in ListCommandeViewModel",'alert','e'); 
			}
	},
	
	addEventToSelectClient : function (form,ListClient)
	{
		//alert("addEventToSelectClient");
		$(form.$selectClient).children("li").each(function(index, element) {
            $(element).click(function(){
				var ClientIndex = $(this).children("input:eq(0)").val();
				$(form.$client).find(".ui-btn-text:eq(0)").text(ListClient[ClientIndex].NomSociete);
				$(form.$client).trigger("click");
				$(form.$pointVente).find(".ui-btn-text:eq(0)").text("Point de vente");
				$(form.$SelectPointVente).removeClass("ui-disabled");
				
				form.InitializeDetailsClient(form,ListClient[ClientIndex]);
				form.InitializePointVente(form,ListClient[ClientIndex].listPointVentes);
			});
			
			if(index == form.indexClient)
			{
				//alert("click list client");
				$(element).trigger("click");
				$(form.$client).trigger("click");
		      	form.indexClient = null;
			}
    });
	
	},
	
	InitializeDetailsClient : function(form,oClient)
	{
		var html = "<h4> Details client : </h4>";
		    html += "<div data-role='fieldcontain'>";
            html += "<label for='name'><strong>Nom du societé : </strong></label>";
            html += "<label for='name'>"+oClient.NomSociete+"</label>";
			html += "</div>";
			html += "<div data-role='fieldcontain'>";
			html += "<label for='name'><strong>Nom du résponsable : </strong></label>";
            html += "<label for='name'>"+oClient.NomResponsable+"</label>";
			html += "</div>";
			html += "<div data-role='fieldcontain'>";
			html += "<label for='name'><strong>Téléphone : </strong></label>";
            html += "<label for='name'>"+oClient.Tel+"</label>";
			html += "</div>";

      $(form.$dtailsClient).html(html);
	   $(form.$detailPointVente).html("");
	},
	
	InitializePointVente : function (form,listPointVente)
	{
		try
		{
				var html = "";
		
				for (var i = 0; i<listPointVente.length;i++)
				{
					html += "<li> <label> "+listPointVente[i].Adresse+" </label><input type='hidden' value='"+ i +"' /> </li>";
				}
				
				$(form.$selectPointVente).html(html).listview("refresh");
				
				
				form.addEventToSelectPointVente(form,listPointVente);
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InitializeClient in ListCommandeViewModel",'alert','e'); 
		}
	},
	
	addEventToSelectPointVente : function (form,listPointVente)
	{
		$(form.$selectPointVente).children("li").each(function(index, element) {
            $(element).click(function(){
				
				var PointVenteIndex = $(this).children("input:eq(0)").val();
				$(form.$pointVente).find(".ui-btn-text:eq(0)").text(listPointVente[PointVenteIndex].Adresse);
				$(form.$pointVente).trigger("click");
				form.InitializeDetailsPointVente(form,listPointVente[PointVenteIndex]);
			});
			
			if(index == form.indexPointVente)
			{
				$(element).trigger("click");
				$(form.$pointVente).trigger("click");
		      	form.indexPointVente = null;
			}
    	});
	},
	
	
	InitializeDetailsPointVente : function (form,oPointVente)
	{
		var html = "<h4> Details point vente : </h4>";
		    html += "<div data-role='fieldcontain'>";
            html += "<label for='name'><strong>Adresse : </strong></label>";
            html += "<label for='name'>"+oPointVente.Adresse+"</label>";
			html += "</div>";
			html += "<div data-role='fieldcontain'>";
			html += "<label for='name'><strong>Nom du résponsable : </strong></label>";
            html += "<label for='name'>"+oPointVente.Responsable+"</label>";
			html += "</div>";
			html += "<div data-role='fieldcontain'>";
			html += "<label for='name'><strong>Téléphone : </strong></label>";
            html += "<label for='name'>"+oPointVente.Tel+"</label>";
			html += "</div>";

      $(form.$detailPointVente).html(html);
	},
	

	
}