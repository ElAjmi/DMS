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
    $CodeCommande: null,
	$Synch: null,
    $CommercialID: null,
    $PointVenteID: null,
	
	
	$SelectPointVente : null,
	$SelectClient : null,
    
	$tablecommande:null,
	
	
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
	
	ListLigneCommande :[],

    connexion: null,
	
	items: null,

    
	Init: function (form) {
    	//alert("in init");
		var form = this ;
		
		DMS.Mobile.ClientRequest.connexion = this.connexion;
		DMS.Mobile.ClientRequest.SelectAllClient(function(ListClient){form.initializeClient(ListClient,form)});
		
		DMS.Mobile.PointVenteRequest.connexion = this.connexion;
		DMS.Mobile.PointVenteRequest.SelectAllPointVente(function(ListPointVente){form.initializePointVente(ListPointVente,form)});
		
		DMS.Mobile.ArticleRequest.connexion = this.connexion;
		DMS.Mobile.ArticleRequest.SelectAll(function(ListArticle){form.Initialize(ListArticle,form)});
		
		DMS.Mobile.CommandeRequest.connexion = this.connexion;
			
		
		//----------------Hamza	
		form.getSessionStorage(form);
		form.FillIdPersonnelSession(form);
		},
	
	initializeCommande : function(ListCommande,form){
		
		form.CommandeArray = ListCommande;
		form.GetCommandeID(form.CommandeArray,form);
		
	
		},
	
	
	initializePointVente : function(ListPointVente,form){
		form.PointVenteArray = ListPointVente;
		//alert("table PV is"+form.PointVenteArray);
		
		},
	
	
	initializeClient : function(ListClient,form){

		form.ClientArray = ListClient;
		form.FillClient(form.ClientArray,form);
		// alert("table is"+form.ClientArray);
		
	
		},
	
	Initialize : function(ListArticle,form){
		form.ArticleArray = ListArticle;
		form.FamilleOcc = form.countFamilleID(form.ArticleArray,form);
		form.InsertArticle(form.ArticleArray,form);
		form.InitializeEvents(form.ArticleArray,form);
		
		alert("from Initialize is "+form);
	},
	
	InitializeEvents: function (ListArticle,Form) {
		var form = Form;
		alert("from InitializeEvents is "+form);
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
					alert("Client ID is "+form.Commande.ClientID);
					$(form.$SelectPointVente).empty();
					$(form.$PVInfos).empty();
					
		
					form.FillPointVente(form.PointVenteArray,form,selectClientID);
					
		});
		//----------------Hamza	
		 $(form.$SelectPointVente).change(function() {
					var selectPointVenteID = $('#selectPointVente :selected').val();
					form.Commande.PointVenteID =  $('#selectPointVente :selected').val();
					alert("PV is "+form.Commande.PointVenteID);
				//	alert("selected is"+$('#selectPointVente :selected').val());
				//	alert("FillPointVenteInfos");
					$(form.$PVInfos).empty();
							
					
					form.FillPointVenteInfos(form.PointVenteArray,form,selectPointVenteID);
		});
		
	//----------------Hamza	
		
        $(form.$EnvoyerCommande).click(function () {

        	
			alert("commande " + form.Commande);
			alert("lignescommandes " + form.ListLigneCommande);
			//-------
			form.Commande.CAB ="abc";
			form.Commande.DateCreation ="16/09/2013";
			form.Commande.EtatCommande = 1;
			form.Commande.CodeCommande = 5566;
			form.Commande.CommercialID = 9999;
			form.Commande.synch = "false";
			form.Commande.DateLivraisonPrevue = $(form.$DateLivraisonPrevue).val();
			//----------------

			DMS.Mobile.CommandeRequest.connexion = form.connexion;

			DMS.Mobile.CommandeRequest.InsertCommande(function(){
				for(var i=0;i<form.ListLigneCommande.length;i++){
				DMS.Mobile.LigneCommandeRequest.insertLigneCommande(form.ListLigneCommande[i]);
				}
				},form.Commande)
			
			

			     
		 });
				   	
	},
	
	
	getSessionStorage: function(form){
		var sessionSto = sessionStorage.getItem("Personnel");
		
		if (sessionSto != null) {
			    form.items = JSON.parse(sessionSto);
               // alert("items is : "+items.Login);
            }
		},
	
	compressArray : function (arr) {
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
},

	
	countFamilleID : function(ListArticle,form)
	{
		ArrayFamille = [];
		Result = [];
		
		for (var i=0; i < ListArticle.length; i++)
		{
			ArrayFamille.push(ListArticle[i].FamilleID);			
 		
		}
		
		Result = form.compressArray(ArrayFamille);
		return Result;
		
	},
	
	GetArticleByFamilleID : function (ListArticle,form,familleID)
	{
		var ArticleArray = [];
		for (var i=0; i < ListArticle.length; i++){
			if(ListArticle[i].FamilleID == familleID ){
				ArticleArray.push(ListArticle[i]);
			}
		}
		return ArticleArray;
	},
	
	UpdateCommandedArticle :function (element,form)
	{
		

		var articleID = $(element).attr("id").substr(5);
		//alert("UpdateCommandedArticle " + articleID);
		var quantite = $.trim($(element).val());
		//alert("quantite " + quantite);
		var PrixunitaireHT = parseFloat($(element).parent().parent().find("input:eq(1)").val());
		//alert("PrixunitaireHT " + PrixunitaireHT);
		if (quantite != "" && quantite != 0){
			quantite = parseInt(quantite);
		}
		else
		{
			quantite = 0;
		}
		
		//alert("articleID = " + articleID);
		var index = -1;
		
		for(var i = 0;i<form.ListLigneCommande.length;i++)
		{
			alert("Article ID 1 "+form.ListLigneCommande[i].ArticleID);
			alert("Article ID 2 "+articleID);

			
			if(form.ListLigneCommande[i].ArticleID == articleID)
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
				ligneCommande.PrixTotalArticleTTC = 0;
				ligneCommande.PrixTotalArticleHT = (PrixunitaireHT*quantite);
				//alert("PrixTotalArticleHT is "+ligneCommande.PrixTotalArticleHT);
				ligneCommande.ArticleID = articleID;
				form.ListLigneCommande.push(ligneCommande);
			}
		}
		else 
		{
			//alert("index 2 is "+index);
			if (quantite != 0)
			{
				var ligneCommande = new DMS.Mobile.LigneCommande();

				
				ligneCommande.Quantite = quantite;
				ligneCommande.PrixTotalArticleTTC = null;
				ligneCommande.PrixTotalArticleHT = (PrixunitaireHT*quantite);
				ligneCommande.ArticleID = articleID;
				form.ListLigneCommande[index]= ligneCommande;
			}
			else
			{
				form.ListLigneCommande.splice(index,1);
			}
			
		}
		form.Commande.ListLignesCommande = form.ListLigneCommande;
		//alert("Form.Commande.ListLignesCommande "+ form.Commande.ListLignesCommande);
	},
	
	
	CalculTotalCommande : function (form)
	{
		var totalHT = 0;
		var totalTTC = 0;
		var totalTVA = 0;
		
		for(var i = 0 ; i<form.ListLigneCommande.length ;i++)
		{
			totalHT += form.ListLigneCommande[i].PrixTotalArticleHT;
			totalTTC += form.ListLigneCommande[i].PrixTotalArticleTTC;
			
			

			//alert("totalTTC"+totalTTC);
		}
		 totalTVA = ((totalHT / totalTTC) * 100);
		 form.Commande.PrixTotalHT = totalHT;
		 form.Commande.PrixTotalTTC = totalTTC;
		 form.Commande.TotalTVA = 0;
		 form.$PrixTotalHT.text("Prix Total HT : "+totalHT);
		 form.$PrixTotalTTC.text("Prix Total TTC : "+totalTTC );
		 form.$TotalTVA.text("Total TVA : "+totalTVA+"%");

	},
	
	
	
	InsertDetailsArticle : function (ListArticle,form) {
		
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
		},
       
	   //----------------Hamza	
	
	FillIdPersonnelSession : function(form){
		//alert("into FillIdPersonnelSession");
		//alert("IdPersonnelSession form : "+$(form.$IdPersonnelSession));
		//alert("item is : "+items.Login);
		//$(form.$IdPersonnelSession).append("<label align='right' value='"+items.PersonnelID+"'>"+items.Login+"</label>").trigger('create');
		

		//$(form.$IdPersonnelSession).prepend("<a data-role='button' data-inline='true' data-iconpos='right'>"+form.items.Login+"</a>").trigger('create');

		
		},   
	   
	   
	   //----------------Hamza	
	FillClient : function (ListClient,form){
					
		for (var i=0; i<ListClient.length ; i++ ){

			//alert("SelectClient is "+$(form.$SelectClient));

			//alert("from Select is "+$(form.$SelectClient).html());
			$(form.$SelectClient).append("<option value='"+ListClient[i].ClientID+"'>"+ListClient[i].NomSociete+"</option>").trigger('create'); 
			}
			
	    
	  },
	  //----------------Hamza	
	  FillPointVente : function (ListPointVente,form,selectClientID){
		  for (var i=0; i<ListPointVente.length ; i++ ){
		  if (ListPointVente[i].ClientID == selectClientID){
								$(form.$SelectPointVente).append("<option value='"+ListPointVente[i].PointVenteID+"'>"+ListPointVente[i].Adresse+"</option>").trigger('create'); 
							}
						}
		  },  
	  
	  //----------------Hamza	
			 FillPointVenteInfos : function (ListPointVente,form,selectPointVenteID){
					
				  for (var i=0; i<ListPointVente.length ; i++ ){
					  if (ListPointVente[i].PointVenteID == selectPointVenteID){
											$(form.$PVInfos).append("<br><label value='1'>Responsable : </label><label value='"+ListPointVente[i].PointVenteID+"'>"+ListPointVente[i].Responsable+"</label><br><br><label value='1'>Numero de Telephone : </label><label value='"+ListPointVente[i].PointVenteID+"'>"+ListPointVente[i].Tel+"</label><br><br><label value='1'>Numero de Fax : </label><label value='"+ListPointVente[i].PointVenteID+"'>"+ListPointVente[i].Fax+"</label><br><br><label value='1'>Email : </label><label value='"+ListPointVente[i].PointVenteID+"'>"+ListPointVente[i].Email+"</label>").trigger('create'); 
										
																			
									}
				  }
				
				  },   
	  
	
	InsertArticle : function (ListArticle,form)
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
				  // alert("tmpPu"+tmpPu);
				
					$("#tbody"+familleID).append("<tr><th id='th"+tmpID+"'>"+""+"</th><td id='td"+tmpID+"'><input type='number' id='input"+tmpID+"' data-clear-btn='true' class='ui-input-text ui-body-c quantite'/><input id='pu"+tmpID+"'  type='hidden' value='"+tmpPu+"'/></td></tr>").trigger('create');
					}
			
				if(k%2==0){
					$("#tbody"+familleID).addClass('tbody');
					}
				
				
			}
		
	},    
    
   
}