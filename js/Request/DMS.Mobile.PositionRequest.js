 if (typeof (DMS) == 'undefined') DMS = {};
	if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};
	
	
	
	DMS.Mobile.PositionRequest = {};
	
	DMS.Mobile.PositionRequest = 
	{
		connexion: null,
		Perimetre : null,
		PositionDelay : null,
		PositionList : [],
		service:null,
		
		InitializeGetPosition : function ()
		{
			
			try
			{
			var Conf = JSON.parse(localStorage.getItem("Configuration"));
			var form= this;
			this.service  = cordova.require('cordova/plugin/myService');
		    this.Perimetre = Conf.Perimetre;
		    this.PositionDelay = Conf.Frequence;
			
			DMS.Mobile.TourneeRequest.connexion = this.connexion;
			DMS.Mobile.TourneeRequest.SelectAll(function(listTournee){
				//alert("listTournee length = "+listTournee.length);
				var tournee= null;
				var currentDate = DMS.Mobile.Common.currentDate();
				for(var j = 0 ;j<listTournee.length;j++)
				{
					if (listTournee[j].DateDebut == currentDate)
					{
						//alert("tounrée " + day);
						tournee = listTournee[j];
						break;
					}
				}
				
				setInterval (this.service.getStatus(	function(r){form.VerifyPositionWithPointVente(tournee,r,form);},
 										function(e){alert(e)}),form.PositionDelay);
			});
			}
			catch(err)
			{
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PositionRequest";
						exception.FonctionE = "InitializeGetPosition";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							
						});
			}
		
		},
		
		VerifyPositionWithPointVente: function(tournee,r,form)
		{
			
			try
			{
			var DistanceMin = form.Perimetre;
						var pointVenteID ;
						var lat2 = r.LatestResult.Message.Latitude;
						var long2 = r.LatestResult.Message.Longitude;
						//alert(lat2 + "/////////////" + long2);
						for (var i = 0;i<tournee.ListPointVentes.length;i++)
						{
							
							var lat1 = tournee.ListPointVentes[i].Latitude;
							var long1 = tournee.ListPointVentes[i].Longitude;
							
							
							
							if(DMS.Mobile.Common.calculDistanceKM(lat1,long1,lat2,long2)<form.Perimetre )
							{
								if (DMS.Mobile.Common.calculDistanceKM(lat1,long1,lat2,long2) < DistanceMin) 
								{
									
												 pointVenteID = tournee.ListPointVentes[i].PointVenteID;
												 DistanceMin = DMS.Mobile.Common.calculDistanceKM(lat1,long1,lat2,long2);	
									
								}
							}
						} 
						
						if (DistanceMin <form.Perimetre)
							// && (pointVenteID !=0))
						{
							alert("point vente a proximité"); 
						  
						}
						
			}
			catch(err)
			{
				
			    var exception = new DMS.Mobile.Exception();
						exception.FichierE = "PositionRequest";
						exception.FonctionE = "VerifyPositionWithPointVente";
						exception.Exception = err.message;
						exception.Synch = "false";
			
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
							
						});	
			}
			 
}
	
			
			
		
///////////////////////////////////////////////////////////////////////////////////////////////////
	
	
	
}