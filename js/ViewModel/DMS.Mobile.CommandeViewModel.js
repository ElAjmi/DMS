if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.CommandeViewModel = {};

DMS.Mobile.CommandeViewModel = 
{
    $CAB: null,
    $DateCreation: null,
    $DateLivraisonPrevue: null,
    $EtatCommande: null,
	$PrixTotalTTC: null,
    $PrixTotalHT: null,
    $TotalTVA: null,

	$Synch: null,
    $CommercialID: null,
    $PointVenteID: null,
	
	
	$SelectPointVente : null,
	$SelectClient : null,
    
	$tablecommande:null,
	
	LastCommande : null,
	
	$EnvoyerCommande : null,
	$PVInfos : null,
	
	
	$IdPersonnelSession : null,
	
	
	ArticleArray : [],
	ClientArray : [],
	PointVenteArray : [],
	FamilleOcc :[],
	DetailsArray : [],
	TotalArticleHTArray : [],
	QuantiteArticleArray : [],
	
	Commande : new DMS.Mobile.Commande(),
	
	LignesCommande :[],

    connexion: null,
	
	items: null,
	
	PointVenteStorage : null,
    
	Init: function () {
    
	try
	{	//alert("in init");
		var form = this ;
		
		
		DMS.Mobile.CommandeRequest.connexion = form.connexion;
DMS.Mobile.CommandeRequest.SelectLastCommande(function(oCommande){form.initializeLastCommande(oCommande,form);//alert("last commande id 1 -> "+oCommande.CommandeID);
});
		
		DMS.Mobile.ArticleRequest.connexion = this.connexion;
		DMS.Mobile.ArticleRequest.SelectAllArticles(function(ListArticle){form.Initialize(ListArticle,form);});
		
		DMS.Mobile.ClientRequest.connexion = this.connexion;
		DMS.Mobile.ClientRequest.SelectAllClient(function(ListClient){form.initializeClient(ListClient,form)});
		
		DMS.Mobile.PointVenteRequest.connexion = this.connexion;
DMS.Mobile.PointVenteRequest.SelectAllPointVente(function(ListPointVente){form.initializePointVente(ListPointVente,form);});
		
		
		
		DMS.Mobile.CommandeRequest.connexion = this.connexion;
		
		
       
		
		//----------------Hamza	
		form.getSessionStorage(form);
		form.getSessionStoragePointVente(form);
		//form.FillIdPersonnelSession(form);
				}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : init in CommandeViewModel",'alert','e'); 
			}
		},
	
	initializeCommande : function(ListCommande,form){
		try
		{
		form.CommandeArray = ListCommande;
		form.GetCommandeID(form.CommandeArray,form);
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : initializeCommande in CommandeViewModel",'alert','e'); 
			}
		},
		
	initializeLastCommande : function(oCommande,form){
		form.LastCommande = oCommande; 
		//alert("last commande id 2 -> "+oCommande.CommandeID);
		//alert("last commande id 3 -> "+form.LastCommande.CommandeID);
	},
	
	initializePointVente : function(ListPointVente,form){
	try
	{
		form.PointVenteArray = ListPointVente;
		//alert("table PV is"+form.PointVenteArray);
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : initializePointVente in CommandeViewModel",'alert','e'); 
			}
		},
	
	
	initializeClient : function(ListClient,form){
try
{
		form.ClientArray = ListClient;
		
		// alert("table is"+form.ClientArray);
		if(form.PointVenteStorage != null)
		{
			$("#panel").empty();
			var details =$(""
			
			+"<div align='center'><h4>D\351tails Point Vente</h4>"
			+"<br/>Ville : "+form.PointVenteStorage.Ville.Designation
			+"<br/>Responsable : "+form.PointVenteStorage.Responsable
			+"<br/>Adresse : "+form.PointVenteStorage.Adresse
			+"<br/>T\351l : "+form.PointVenteStorage.Tel
			+"<br/>Fax : "+form.PointVenteStorage.Fax
			+"<br/>Email : "+form.PointVenteStorage.Email
			
	
		   +"<h4>D\351tails Client</h4>"
			+"<br/>Nom Responsable : "+form.PointVenteStorage.Client.NomResponsable
			+"<br/>Nom Soci\351te : "+form.PointVenteStorage.Client.NomSociete
			+"<br/>Raison Sociale : "+form.PointVenteStorage.Client.RaisonSocial
			+"<br/>T\351l : "+form.PointVenteStorage.Client.Tel
			+"<br/>Fax : "+form.PointVenteStorage.Fax
			+"<br/>Site Web : <a>"+form.PointVenteStorage.Client.UrlWeb+"</a>"
			+"<br/>Email : <a>"+form.PointVenteStorage.Email+"</a>"
			+"<br/>Activit\351 : "+form.PointVenteStorage.Client.Activite.Designation
			+"</div>");
			
			$("#panel").append($(details)).trigger('create');
			$("#panel").trigger( "updatelayout" );
		}
		else{form.FillClient(form.ClientArray,form);}
		
}
catch(err)
{
	DMS.Mobile.Notification.ShowMessage(err.message+" : initializeClient in CommandeViewModel",'alert','e');
}
		},
	
	
	
	Initialize : function(ListArticle,form){
	try
	{
		form.ArticleArray = ListArticle;
		form.FamilleOcc = form.countFamilleID(form.ArticleArray,form);
		form.InsertArticle(form.ArticleArray,form);
		form.InitializeEvents(form.ArticleArray,form);
		$("#CommandeForm").trigger('create');
		
		//alert("from Initialize is "+form);
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : initialize in CommandeViewModel",'alert','e'); 
			}
	},
	
	InitializeEvents: function (ListArticle,Form) {
	try
	{
		var form = Form;
		form.Commande.CommandeID = (form.LastCommande.CommandeID)+1 ;//------------------------------------>
		$("#CommandeForm").trigger('create');//-------------------------------->
		//alert("from InitializeEvents is "+form);
		form.InsertDetailsArticle(ListArticle,form);
		
		$('#tablecommande .quantite').change(function() {

			//alert("from InitializeEvents change");
			form.UpdateCommandedArticle(this,form);
			form.CalculTotalCommande(form);

		});
		//----------------Hamza	
		  $(form.$SelectClient).change(function() {
			 
					var selectClientID = $('#selectClient :selected').val();
					form.Commande.ClientID =  $('#selectClient :selected').val();
					//alert("Client ID is "+form.Commande.ClientID);
					$(form.$SelectPointVente).empty();
					$(form.$PVInfos).empty();
					
		
					form.FillPointVente(form.PointVenteArray,form,selectClientID);
					
		});
		//----------------Hamza	
		 /*$(form.$SelectPointVente).change(function() {
					var selectPointVenteID = $('#selectPointVente :selected').val();
					form.Commande.PointVenteID =  $('#selectPointVente :selected').val();
					//alert("PV is "+form.Commande.PointVenteID);
				//	alert("selected is"+$('#selectPointVente :selected').val());
				//	alert("FillPointVenteInfos");
					$(form.$PVInfos).empty();
							
					
					form.FillPointVenteInfos(form.PointVenteArray,form,selectPointVenteID);
		});*/
		
		$(document).on('change','input[type=radio]',function(e) { 
			//alert("change");
			var radioValue = ($(this).val());
		
			var selectPointVenteID = radioValue;
			form.Commande.PointVenteID = radioValue;
			$(form.$PVInfos).empty();
			form.FillPointVenteInfos(form.PointVenteArray,form,selectPointVenteID);
		});
		
	//----------------Hamza	
	
		
		
		$(".menu").click(function() {
			PointVenteStorage = null;
			sessionStorage.removeItem("PointVente");
			
		});
		
		
        $(form.$EnvoyerCommande).click(function () {
		
			//alert("commande " + form.Commande);
			//alert("lignescommandes " + form.LignesCommande);
			//------------------------------------------------------------------------>
			var curr = new Date();
			var DateCreation = DMS.Mobile.Dates.Dayformat(curr);
			DateCreation = DMS.Mobile.Dates.DateSpliting(DateCreation.toString());
			
			var DateLivraisonPrevue = DMS.Mobile.Dates.DateSpliting($(form.$DateLivraisonPrevue).val());
			
			form.Commande.CAB = null ;
			form.Commande.DateCreation = DateCreation;
			form.Commande.EtatCommande = DMS.Mobile.Constante.EtatCommande.NonValidee;
	
			form.Commande.CommercialID = 9999;
			form.Commande.synch = "false";
			
			form.Commande.DateLivraisonPrevue = DateLivraisonPrevue;
			//----------------
			
			for(var i=0;i<form.LignesCommande.length;i++){
				form.LignesCommande[i].CommandeID = form.Commande.CommandeID ;
			}
			
			DMS.Mobile.CommandeRequest.connexion = form.connexion;
			DMS.Mobile.LigneCommandeRequest.connexion = form.connexion;

			DMS.Mobile.CommandeRequest.InsertCommande(function(){
				
				for(var i=0;i<form.LignesCommande.length;i++)
				{
				DMS.Mobile.LigneCommandeRequest.insertLigneCommande(form.LignesCommande[i]);
				}
				
				},form.Commande);
			
			

			     
		 });
					}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : InitializeEvents in CommandeViewModel",'alert','e'); 
			}   	
	},
	
	
	getSessionStorage: function(form){
	try
	{
		var sessionSto = sessionStorage.getItem("Personnel");
		
		if (sessionSto != null) {
			    form.items = JSON.parse(sessionSto);
               // alert("items is : "+items.Login);
            }
	}
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : getSessionStorage in CommandeViewModel",'alert','e'); 
		}
	},
	
	getSessionStoragePointVente: function(form){
		var sessionSto = sessionStorage.getItem("PointVente");
		form.PointVenteStorage = null;
		if (sessionSto != null) {
			    form.PointVenteStorage = JSON.parse(sessionSto);
                //alert("PointVenteStorage : "+form.PointVenteStorage.PointVenteID);
            }
	},
	
	compressArray : function (arr) {
 	try
	{
	var a = [], b = [], prev;
    var ArrayOcc = [];
    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }
	for ( var i = 0; i < a.length; i++ ) {
    if (a.length > 0) {
		var obj = new Object();
		obj.value = a[i];
		obj.count = b[i];
		ArrayOcc.push(obj);
		}
	}
    return ArrayOcc;
		}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : compresseArray in CommandeViewModel",'alert','e'); 
			}
},

	
	countFamilleID : function(ListArticle,form)
	{
		try
		{
		ArrayFamille = [];
		Result = [];
		
		for (var i=0; i < ListArticle.length; i++)
		{
			ArrayFamille.push(ListArticle[i].FamilleID);			
 		
		}
		
		Result = form.compressArray(ArrayFamille);
		return Result;
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : countFamilleID in CommandeViewModel",'alert','e'); 
			}
	},
	
	GetArticleByFamilleID : function (ListArticle,form,familleID)
	{
		try
		{
		var ArticleArray = [];
		for (var i=0; i < ListArticle.length; i++){
			if(ListArticle[i].FamilleID == familleID ){
				ArticleArray.push(ListArticle[i]);
			}
		}
		return ArticleArray;
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : GetArticleByFamilleID in CommandeViewModel",'alert','e'); 
			}
	},
	
	UpdateCommandedArticle :function (element,form)
	{
		try
		{
		
		
		
		var articleID = $(element).attr("id").substr(5);
		//alert("UpdateCommandedArticle " + articleID);
		var quantite = $.trim($(element).val());
		//alert("quantite " + quantite);
		var PrixunitaireHT = parseFloat($(element).parent().parent().find("input:eq(1)").val());
		var PrixunitaireTTC = parseFloat($(element).parent().parent().find("input:eq(2)").val());
		//alert("PrixunitaireHT " + PrixunitaireHT);
		//alert("PrixunitaireTTC " + PrixunitaireTTC);
		if (quantite != "" && quantite != 0){
			quantite = parseInt(quantite);
		}
		else
		{
			quantite = 0;
		}
		
		//alert("articleID = " + articleID);
		var index = -1;
		
		for(var i = 0;i<form.LignesCommande.length;i++)
		{
			//alert("Article ID 1 "+form.LignesCommande[i].ArticleID);
			//alert("Article ID 2 "+articleID);

			
			if(form.LignesCommande[i].ArticleID == articleID)
			{
				
				index = i;
				//alert("index in if"+index);
				break;
			}
			
		}
		
		if (index==-1)
		
		{
			//alert("index 1 is "+index);
			if (quantite != 0)
			{
				var ligneCommande = new DMS.Mobile.LigneCommande();
				

				ligneCommande.Quantite = quantite;
				ligneCommande.PrixTotalArticleTTC = (PrixunitaireTTC * quantite).toFixed(3)
				ligneCommande.PrixTotalArticleHT = (PrixunitaireHT * quantite).toFixed(3)
				ligneCommande.PrixTotalArticleTTC  = parseFloat(ligneCommande.PrixTotalArticleTTC);
				ligneCommande.PrixTotalArticleHT  = parseFloat(ligneCommande.PrixTotalArticleHT);
				ligneCommande.ArticleID = articleID;
				form.LignesCommande.push(ligneCommande);
			}
		}
		else 
		{
			//alert("index 2 is "+index);
			if (quantite != 0)
			{
				var ligneCommande = new DMS.Mobile.LigneCommande();

				
				ligneCommande.Quantite = quantite;
				ligneCommande.PrixTotalArticleTTC = (PrixunitaireTTC * quantite).toFixed(3);
				ligneCommande.PrixTotalArticleHT = (PrixunitaireHT * quantite).toFixed(3);
				ligneCommande.PrixTotalArticleTTC  = parseFloat(ligneCommande.PrixTotalArticleTTC);
				ligneCommande.PrixTotalArticleHT  = parseFloat(ligneCommande.PrixTotalArticleHT);
				ligneCommande.ArticleID = articleID;
				form.LignesCommande[index]= ligneCommande;
			}
			else
			{
				form.LignesCommande.splice(index,1);
			}
			
		}
		form.Commande.ListLignesCommande = form.LignesCommande;
		//alert("Form.Commande.ListLignesCommande "+ form.Commande.ListLignesCommande);
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateCommandeArticle in CommandeViewModel",'alert','e'); 
			}
	},
	
	
	CalculTotalCommande : function (form)
	{
		try
		{
		var totalHT = 0;
		var totalTTC = 0;
		var totalTVA = 0;
		
		for(var i = 0 ; i<form.LignesCommande.length ;i++)
		{
			totalHT += form.LignesCommande[i].PrixTotalArticleHT;
			totalTTC += form.LignesCommande[i].PrixTotalArticleTTC;
			
			

			//alert("totalTTC"+totalTTC);
		}
		
		 
		 totalHT = totalHT.toFixed(3);
		 totalTTC = totalTTC.toFixed(3);
		 totalTVA =  totalTTC - totalHT ;
		 totalTVA  = totalTVA.toFixed(3);
		 form.Commande.PrixTotalHT = totalHT;
		 form.Commande.PrixTotalTTC = totalTTC;
		 form.Commande.TotalTVA = totalTVA;
		 
		
		 
		 form.$PrixTotalHT.text("Prix Total HT : "+totalHT+" DT");
		 form.$PrixTotalTTC.text("Prix Total TTC : "+totalTTC+" DT");
		 form.$TotalTVA.text("Total TVA : "+totalTVA+" DT");
	}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : calculTotalCommande in CommandeViewModel",'alert','e'); 
			}
	},
	
	
	InsertDetailsArticle : function (ListArticle,form) {
	try
	{	
  		var Images = [
		'css/images/Produits/gaucho.png',
		'css/images/Produits/gaufrettes.png',
		'css/images/Produits/sablito.png',
		'css/images/Produits/major.jpg',
		'css/images/Produits/croustina.jpg',
		'css/images/Produits/gaucho.png',
		'css/images/Produits/gaufrettes.png',
		'css/images/Produits/sablito.png',
		'css/images/Produits/major.jpg',
		'css/images/Produits/croustina.jpg',
		'css/images/Produits/gaucho.png',
		'css/images/Produits/gaufrettes.png',
		'css/images/Produits/sablito.png',
		'css/images/Produits/major.jpg',
		'css/images/Produits/croustina.jpg'
		];
		//form.DetailsArray = form.SetImgUrl(ListArticle,form,array);
		
		
		var len = ListArticle.length;
		
		for (i = 0; i <len ; i++) {
		var popup = Images[i];
		var design = ListArticle[i].Designation;
		$("#th"+ListArticle[i].ArticleID).append('<a href="#popup' + i + '" data-rel="popup" data-position-to="origin" data-transition="fade" class="shadow">' + design + '</a> ');
			$("#th"+ListArticle[i].ArticleID).append('<div data-role="popup" id="popup' + i + '" data-overlay-theme="a" data-theme="c" data-corners="true"><a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Fermer</a><br/><center><img class="popphoto" src="' + popup + '" style="width:100%;"></center><b>&nbsp;&nbsp;D&eacute;tails article :</b><ul><li><b>D&eacute;signation :</b>'+ListArticle[i].Designation+'</li><li><b>Quantit&eacute; disponible :</b>'+ ListArticle[i].QteDispo+'</li><li><b>Prix unitaire :</b>'+ ListArticle[i].PrixUnitaire+' DT</li></ul></div>').trigger('create');

		}
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : insertDetailsArticle in CommandeViewModel",'alert','e'); 
			}
		},
       
	   //----------------Hamza	
	
	FillIdPersonnelSession : function(form){
	
	},   
	   
	   
	   //----------------Hamza	
	FillClient : function (ListClient,form){
		try
		{
			for (var i=0; i<ListClient.length ; i++ ){
				$(form.$SelectClient).append("<option value='"+ListClient[i].ClientID+"'>"+ListClient[i].NomSociete+"</option>").trigger('create'); 
				}
		
				}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : FillClient in CommandeViewModel",'alert','e'); 
			}
	    
	  },
	  //----------------Hamza	
	  FillPointVente : function (ListPointVente,form,selectClientID){
	try{
		  $(form.$SelectPointVente).append('<h3>Choisir un Point de Vente</h3>');
		  for (var i=0; i<ListPointVente.length ; i++ ){
		  if (ListPointVente[i].ClientID == selectClientID){
			//$(form.$SelectPointVente).append("<option value='"+ListPointVente[i].PointVenteID+"'>"+ListPointVente[i].Adresse+"</option>").trigger('create'); 
			$("input[type='radio']").checkboxradio().checkboxradio("refresh");
			$(form.$SelectPointVente).append('<label for="'+ListPointVente[i].PointVenteID+'">'+ListPointVente[i].Adresse+'</label><input name="radio" id="'+ListPointVente[i].PointVenteID+'" class="custom" type="radio" value="'+ListPointVente[i].PointVenteID+'">').trigger('create');
			
				
			}
		}
							}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : FillPointVente in CommandeViewModel",'alert','e'); 
			}
		  },  
	  
	  //----------------Hamza	
			 FillPointVenteInfos : function (ListPointVente,form,selectPointVenteID){
		try
		{			
				  for (var i=0; i<ListPointVente.length ; i++ ){
					  if (ListPointVente[i].PointVenteID == selectPointVenteID){
											$(form.$PVInfos).append("<br><label value='1'>Responsable : </label><label value='"+ListPointVente[i].PointVenteID+"'>"+ListPointVente[i].Responsable+"</label><br><br><label value='1'>Numero de Telephone : </label><label value='"+ListPointVente[i].PointVenteID+"'>"+ListPointVente[i].Tel+"</label><br><br><label value='1'>Numero de Fax : </label><label value='"+ListPointVente[i].PointVenteID+"'>"+ListPointVente[i].Fax+"</label><br><br><label value='1'>Email : </label><label value='"+ListPointVente[i].PointVenteID+"'>"+ListPointVente[i].Email+"</label>").trigger('create'); 
										
																			
									}
				  }
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : FillPointVenteInfos in CommandeViewModel",'alert','e'); 
			}		
				  },   
	  
	
	InsertArticle : function (ListArticle,form)
	{
		try
		{
		//$(this.$tablecommande).append("<tbody></tbody>");
		
		
		$(this.$tablecommande).append("<tr>"
			+"<td width='33%' >"
			+"<table border='0' data-role='table' data-mode='reflow' class='ui-responsive table-stroke' id='tablecmd0'>"
			+"<thead>"
			+"<tr>"
			+"<th data-priority='1'>D&eacute;signation</th>"
			+"<th data-priority='persist'>Quantit&eacute;</th>"
			+"</tr>"
			+"</thead>"
		
			+"</table>"
			+"</td>"
			+"<td width='33%' >"
			+"<table border='0' data-role='table' data-mode='reflow' class='ui-responsive table-stroke' id='tablecmd1'>"
			+"<thead>"
			+"<tr>"
			+"<th data-priority='1'>D&eacute;signation</th>"
			+"<th data-priority='persist'>Quantit&eacute;</th>"
			+"</tr>"
			+"</thead>"
			
			+"</table>"
			+"</td>"
			+"<td width='33%' >"
			+"<table border='0' data-role='table' data-mode='reflow' class='ui-responsive table-stroke' id='tablecmd2'>"
			+"<thead>"
			+"<tr>"
			+"<th data-priority='1'>D&eacute;signation</th>"
			+"<th data-priority='persist'>Quantit&eacute;</th>"
			+"</tr>"
			+"</thead>"
			
			+"</table>"
			+"</td>"
			+"</tr>").trigger('create');
			
			for(var k=0; k<form.FamilleOcc.length; k++){
				familleID = form.FamilleOcc[k].value;
				var tmpArray = [];
				tmpArray = form.GetArticleByFamilleID(ListArticle,form,familleID);
				var cmp = k%3;
				$("#tablecmd"+cmp).append("<tbody id='tbody"+familleID+"'></tbody>").trigger('create');
				for(var j=0;j<tmpArray.length;j++){
					var tmpID = tmpArray[j].ArticleID;
					var tmpPu = tmpArray[j].PrixUnitaireHT;
					var tmpPuttc = tmpArray[j].PrixUnitaireTTC;
				  // alert("tmpPu"+tmpPu);
				
					$("#tbody"+familleID).append("<tr><th id='th"+tmpID+"'>"+""+"</th><td id='td"+tmpID+"'><input type='number' id='input"+tmpID+"' data-clear-btn='true' class='ui-input-text ui-body-c quantite'/><input id='pu"+tmpID+"'  type='hidden' value='"+tmpPu+"'/><input id='puttc"+tmpID+"'  type='hidden' value='"+tmpPuttc+"'/></td></tr>").trigger('create');
					}
			
				if(k%2==0){
					$("#tbody"+familleID).addClass('tbody');
					}
				
				
			}
			}
			catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : InsertArticle in CommandeViewModel",'alert','e'); 
			}
	},    
    
   
}