if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.GaleryViewModel = {};

DMS.Mobile.GaleryViewModel = 
{
	connexion : null,
	ListePictures : [],
	currentIndex : null,
	lastIndex: null,
	
	Init :function (callback)
	{
		var form = this;
		DMS.Mobile.PictureRequest.connexion = this.connexion;
		DMS.Mobile.PictureRequest.selectAllFamillePicture(function (listPicture){
			
			form.lastIndex = (listPicture.length-1);
			form.InitializeGalery(listPicture,form,callback);
			form.initializeEvent(form);
		});
		
		
	
	
		
	},
	initializeEvent : function (form)
	{
		
		$(".menu_ListArticleRepture").click(function(){
    
	DMS.Mobile.Common.RedirectToArticleEnRepture();

});
$(".menu_Reclamation").click(function(){

DMS.Mobile.Common.RedirectToReclamation();

});


$(".menu_livraison").click(function(){

DMS.Mobile.Common.RedirectToLivraison();

});
$(".menu_calendrier").click(function(){

DMS.Mobile.Common.RedirectToCalendrier();

});



	
		
		$(".menu-ListCommande").click(function(){
			
			DMS.Mobile.Common.RedirectToListeCommandes();
			});
        $(".menu-SaisieCommande").click(function(){
			
			DMS.Mobile.Common.RedirectToCommande();
			});
		
		
		$("#btnSeDeconnecter").click(function(){
	 
					 sessionStorage.removeItem("missionToStart");
					 sessionStorage.removeItem("CommandeToModify");
					 sessionStorage.removeItem("indexClient");
					 sessionStorage.removeItem("indexPointVente");
					 
					
					 sessionStorage.removeItem("ListClient");
					 sessionStorage.removeItem("ListMission");
					 sessionStorage.removeItem("ListPointVente");
					 
					 sessionStorage.removeItem("ListTournee");
					 sessionStorage.removeItem("indexClient");
					 sessionStorage.removeItem("indexPointVente");
					 sessionStorage.removeItem("userID");
	 
					 DMS.Mobile.Common.RedirectToLogin();
			
			});
	},
	
	InitializeGalery : function(listPicture,form,callback)
	{
		var mediaPath = 'file:///mnt/sdcard/Images/famille/';
		for(var i = 0 ; i<listPicture.length;i++){
			
				var html = '<li><a href="javascript:void(0);" class="picture">'
				//html+='<img width="350px" height="150px" src="data:application/octet-stream;base64,' + listPicture[i].Byte+'" alt="'+listPicture[i].Name+'" /></a></li>';
				
				html+='<img width="350px" height="150px" src="'+mediaPath+ listPicture[i].Name + '" alt="'+listPicture[i].Name+'" /></a><input type="hidden" value="'+i+'"/></li>';
				
				/*var html = '<li><a href="file:///mnt/sdcard/Images/article/'+listPicture[i].Name+'" rel="external">'
				html+='<img src="data:application/octet-stream;base64,' + listPicture[i].Byte+'" alt="Image 001" /></a></li>';*/
				
				$(".gallery").append(html);
				
				form.addPageInBody(listPicture,i,form);
				}
		form.initializePictureEvents(listPicture,form);
		callback(listPicture);
		
	},
	
	addPageInBody : function(listPicture,index,form)
	{
		var mediaPath = 'file:///mnt/sdcard/Images/famille/';
		
		var html = '<div data-role="page" id="page'+index+'" >';
			html += '  <div data-role="content" style="height:100%;background-color:#000">';
			html += '	  <div class="ui-grid-a">';
			html += '		<div class="ui-block-a"><img width="100%" height="100%" src="'+mediaPath+ listPicture[index].Name + '" alt="'+listPicture[index].Name+'" /></div>';
			html += '		<div class="ui-block-b">';
			html += '			<table data-role="table" id="my-table" data-mode="reflow" style="background-color:#CCC">';
			html += '		  <thead>';
			
			
				html += '			<tr>';
				html += '			  <th>Code</th>';
				html += '			  <th>Designation</th>';
				html += '			  <th>Unité/Carton</th>';
				html += '			  <th>Poids/unité (gr)</th>';
				html += '			  <th>Dim. carton (mm)</th>';
				html += '			  <th>vol. carton (m3)</th>';
				html += '			</tr>';
			
			html += '		  </thead>';
			html += '		  <tbody>';
			for(var i = 0;i<listPicture[index].Famille.ListArticles.length;i++){
				var article = listPicture[index].Famille.ListArticles[i];
				html += '			<tr>';
				html += '			  <th>'+article.CodeArticle+'</th>';
				html += '			  <td>'+article.Designation+'</td>';
				html += '			  <td>'+article.UniteCarton+'</td>';
				html += '			  <td>'+article.PoidsUnite+'</td>';
				html += '			  <td>'+article.DimensionCarton+'</td>';
				html += '			  <td>'+article.VolumeCarton+'</td>';
				html += '			</tr>';
			}
			html += '			</tbody>';
			html += '		</table>';
			html += '		</div>';
			html += '	</div>';
					
			html += '	  </div>';
			html += '	</div>';
			
			$("body").append(html);
	},
	
	initializePictureEvents : function(listPicture,form)
	{
		$(".picture").click(function(){
			
			var index = $(this).next('input[type=hidden]:eq(0)').val();
			form.currentIndex = index;
			$.mobile.changePage('#page'+index);	
		});
		
		$(document).on('swipeleft', '[data-role="page"]', function(event){    
			if(event.handled !== true) // This will prevent event triggering more then once
			{
				var index =$(this).attr('id');
				var nextpage = $(this).next('[data-role="page"]');
				if (index=="page"+form.lastIndex)
				{
					nextpage="page0";
				}
				else if(index=="page")
				{
					nextpage="";
				}
				// swipe using id of next page if exists
				if (nextpage.length > 0) {
					$.mobile.changePage(nextpage, {transition: "slide", reverse: false}, true, true);
				}
				event.handled = true;
				
			}
			return false;         
		});

		$(document).on('swiperight', '[data-role="page"]', function(event){   
			if(event.handled !== true) // This will prevent event triggering more then once
			{
				var index =$(this).attr('id');
				var prevpage = $(this).prev('[data-role="page"]');
				if (index=="page0")
				{
					prevpage="page"+form.lastIndex;
				}
				else if(index=="page")
				{
					nextpage="";
				}
				if (prevpage.length > 0) {
					$.mobile.changePage(prevpage, {transition: "slide", reverse: true}, true, true);
				}
				event.handled = true;
				
			}
			return false;            
		});
	},
	
	
	showPopUpDetail : function(index,listPicture)
	{
		//alert("here");
		$("#contentPopup").html("");
		$("#contentPopup").append('<div data-role="popup"  id="detailArticle" >'
    +'<div data-role="content" data-theme="d" class="ui-corner-bottom ui-content" id="popupContenuLFacture">fdsfsdfdsfsdfsdfsdffd'
 +'</div></div>');
 		$("#detailArticle").popup();
		$("#detailArticle").popup("open");
 
	}
	
}