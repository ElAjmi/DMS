 if (typeof (DMS) == 'undefined') DMS = {};
	if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};
	
	
	
	DMS.Mobile.PositionRequest = {};
	
	DMS.Mobile.PositionRequest = 
	{
		connexion: null,
		Perimetre : null,
		PositionDelay : null,
		
		InitializeGetPosition : function ()
		{
			try
			{
			var Conf = JSON.parse(sessionStorage.getItem("Configuration"));
		    Perimetre = Conf.Perimetre;
		    PositionDelay = Conf.Frequence;
		 
			alert("appel Initisalise get postion");
			var form = this;
			DMS.Mobile.PositionRequest.connexion = this.connexion;
			
			setInterval(DMS.Mobile.PositionRequest.GetPositionFromGPS(function(position){form.Initialize(position,form);},form), PositionDelay);
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InitializeGetPosition in PoistionRequest",'alert','e'); 
		}
		},
	
	
	
		Initialize : function(position,form)
		{
			try
			{
			alert("initialise");
			var listPointVente = [];
			var listMission = [];
			var listClient = [];
			var listTournee = [];
		
				 listPointVente = JSON.parse(sessionStorage.getItem("ListPointVente"));
			     listMission = JSON.parse(sessionStorage.getItem("ListMission"));
				 listClient = JSON.parse(sessionStorage.getItem("ListClient"));
				 listTournee = JSON.parse(sessionStorage.getItem("ListTournee"));
				 
				  
				form.currentDay(position,form,listPointVente,listMission,listClient,listTournee);
				
						}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : intialize in PoistionRequest",'alert','e'); 
		}
		},
		
		
	
		currentDay : function(position,form,listPointVente,listMission,listClient,listTournee)
		//VerifyIntoPointVente : function()
		{
			try
			{
			alert("current day");
			//var form = this;
			
			var currentListPointVente = [];
			var currentListMission = [];
			var currentDate = DMS.Mobile.Dates.Dayformat(new Date());
			alert("currentDate : "+currentDate);
			var currentDateSplit = currentDate.split('-').reverse().join('');
			alert("currentDateSplit : "+currentDateSplit);
						
			// test sur la list des tournees 
			// test sur la list des missions de la tournee courante
			
			if (listTournee.length >0)
			{
					alert("nbr tournee : "+listTournee.length);
					for ( var x = 0;x<listTournee.length;x++)
					{
						var dateDebutTournee = listTournee[x].DateDebut;
						alert("dateDebutTournee de la tournee "+x+" est : "+dateDebutTournee);
						var dateDebutTourneeSplit = dateDebutTournee.split('/').reverse().join('');
						alert("dateDebutTourneeSplit de la tournee "+x+" est : "+dateDebutTourneeSplit);
						if (currentDateSplit == dateDebutTourneeSplit)
						{
							if ((listTournee[x].EtatTournee == DMS.Mobile.Constante.EtatTournee.NonDemaree) ||(listTournee[x].EtatTournee == DMS.Mobile.Constante.EtatTournee.EnCours))
							alert("tournee courante");
							var tourneeID = listTournee[x].TourneeID;
							break;
						}
						
					}
				
				///////////////
					if (listMission.length >0)
					{
						for (var y = 0; y<listMission.length;y++)
						{
							if (listMission[y].TourneeID == tourneeID)
							{
								currentListMission.push(listMission[y]);
							}
						}
					}
				///////////
					if (currentListMission.length>0)
					{
						
							 for ( var k = 0; k<currentListMission.length;k++)
								{
									alert("list pv = " +listPointVente.length);
									if (listPointVente.length>0)
									{
										for(var n = 0;n<listPointVente.length;n++)
										{
											if ((currentListMission[k].PointVenteID == listPointVente[n].PointVenteID)&&(currentListMission[k].EtatMission == DMS.Mobile.Constante.EtatMission.NonDemaree)) 
											{
												alert("list point de vente courant");
												currentListPointVente.push(listPointVente[n]);
											}
										}
									}
								}
					 
					           form.VerifyIntoPointVente(position,form,currentListPointVente,currentListMission,listClient);				 
					 }  
			   }		
		
		
				}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : currentDay in PoistionRequest",'alert','e'); 
		}
		},
		
		
		
		VerifyIntoPointVente : function(position,form,currentListPointVente,currentListMission,listClient)
		{
			try
			{
			alert("verify into pointvente");
			alert("current listpv = " +currentListPointVente.length);
			alert("list mission = "+currentListMission.length)

			 if (currentListPointVente.length > 0)
			 {
						var DistanceMin = Perimetre;
						var pointVenteID ;
						var lat2 = position.Latitude;
						var long2 = position.Longitude;
						alert ("latitute gps = "+lat2+" longitude gps = "+long2);
						//var lat2 = 36.837866465399735;
						//var long2 = 10.166752338409424;
						for (var i = 0;i<currentListPointVente.length;i++)
						{
							
							var lat1 = currentListPointVente[i].Latitude;
							var long1 = currentListPointVente[i].Longitude;
							
							
							
							if(DMS.Mobile.Common.calculDistanceKM(lat1,long1,lat2,long2)<DMS.Mobile.Common.Perimetre )
							{
								if (DMS.Mobile.Common.calculDistanceKM(lat1,long1,lat2,long2) < DistanceMin) 
								{
									
												 pointVenteID = currentListPointVente[i].PointVenteID;
												 DistanceMin = DMS.Mobile.Common.calculDistanceKM(lat1,long1,lat2,long2);	
												 alert("pv iD = "+pointVenteID);
												 alert("dis = "+DistanceMin);
								}
							}
						} 
						
						if (DistanceMin <DMS.Mobile.Common.Perimetre)
							// && (pointVenteID !=0))
						{
							alert("distance min = "+DistanceMin); 
						  form.InitNotificationMission(currentListPointVente,currentListMission,listClient,pointVenteID,form);
						}
			 }
			 
			 		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : VerifyIntoPointVente in PoistionRequest",'alert','e'); 
		}
		},
		
		
		InitNotificationMission : function(listPointVente,listMission,listClient,pointVenteID,form)
		{
			try
			{
			alert("appel initnotificationMission");
			var listMissionNonDemarrer = listMission;
			var oPointVente;
			var oClient;
			
			for (var i = 0; i<listPointVente.length;i++)
			{
				if(listPointVente[i].PointVenteID == pointVenteID)
				{
					oPointVente = listPointVente[i];
					break;
				}
			}
			
			for (var j = 0; j<listClient.length; j++)
			{
				if(listClient[j].ClientID == oPointVente.ClientID)
				{
					oClient = listClient[j];
					break;
				}
			}
			
			form.NotificationMission(listMissionNonDemarrer,oClient,oPointVente,form);
					}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InitNotificationMission in PoistionRequest",'alert','e'); 
		}
			
		},
		
		
		
		NotificationMission : function(listMissionNonDemarrer,oClient,oPointVente,form)
		{
			try
			{
			alert("appel notification mission");
			var listMissionNormal = [];
			var listMissionMoyen = [];
			var listMissionEleve = [];
			for (var i = 0 ; i<listMissionNonDemarrer.length;i++)
			{
				if (listMissionNonDemarrer[i].DegreUrgence == DMS.Mobile.Constante.DegreUrgence.Normal)
				{					
					listMissionNormal.push(listMissionNonDemarrer[i]);
				}
				if (listMissionNonDemarrer[i].DegreUrgence == DMS.Mobile.Constante.DegreUrgence.Moyen)
				{		
					listMissionMoyen.push(listMissionNonDemarrer[i]);
				}
				if (listMissionNonDemarrer[i].DegreUrgence == DMS.Mobile.Constante.DegreUrgence.Eleve)
				{			
					listMissionEleve.push(listMissionNonDemarrer[i]);
				}
			}		
			
			form.NotifyMission(listMissionEleve,listMissionMoyen,listMissionNormal,oClient,oPointVente,form);
					}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : NotificationMission in PoistionRequest",'alert','e'); 
		}
		},
		
		NotifyMission : function(listMissionEleve,listMissionMoyen,listMissionNormal,oClient,oPointVente,form)
		{
			try
			{
			
			var MissionFacing = [];
			var MissionCommande = [];
			var MissionEspacePromo = [];
			var MissionLivraison = [];
			var MissionParametragePV = [];
			var MissionRecouvrement = [];
			var MissionReleveInventaire = [];
			var MissionRelevePresencePrixConc = [];
			var MissionRelevePrix = [];
			var MissionReleveVenteConcu = [];
		
			//dans ce cas il faut différencier les missions par sont ordre (ordre mission n'existe pas)
			if (listMissionEleve.length > 0)
			{
				alert("Notify mission list eleve");
				for(var i = 0; i<listMissionEleve.length;i++)
				{
					if(listMissionEleve[i].TypeMissionID == DMS.Mobile.Constante.TypeMission.Facing)
					{
						MissionFacing.push(listMissionEleve[i]);
					}
				   if (listMissionEleve[i].TypeMissionID == DMS.Mobile.Constante.TypeMission.Commande)
					{
						MissionCommande.push(listMissionEleve[i]);
					}
					else if (listMissionEleve[i].TypeMissionID == DMS.Mobile.Constante.TypeMission.EspacePromo)
					{
						MissionEspacePromo.push(listMissionEleve[i]);
					}
					else if (listMissionEleve[i].TypeMissionID == DMS.Mobile.Constante.TypeMission.Livraison)
					{
						MissionLivraison.push(listMissionEleve[i]);
					}
					else if (listMissionEleve[i].TypeMissionID == DMS.Mobile.Constante.TypeMission.ParametragePV)
					{
						MissionParametragePV.push(listMissionEleve[i]);
					}
					else if (listMissionEleve[i].TypeMissionID == DMS.Mobile.Constante.TypeMission.Recouvrement)
					{
						MissionRecouvrement.push(listMissionEleve[i]);
					}
					else if (listMissionEleve[i].TypeMissionID == DMS.Mobile.Constante.TypeMission.ReleveInventaire)
					{
						MissionReleveInventaire.push(listMissionEleve[i]);
					}
					else if (listMissionEleve[i].TypeMissionID == DMS.Mobile.Constante.TypeMission.RelevePresencePrixConc)
					{
						MissionRelevePresencePrixConc.push(listMissionEleve[i]);
					}
					else if (listMissionEleve[i].TypeMissionID == DMS.Mobile.Constante.TypeMission.RelevePrix)
					{
						MissionRelevePrix.push(listMissionEleve[i]);
					}
					else if (listMissionEleve[i].TypeMissionID == DMS.Mobile.Constante.TypeMission.ReleveVenteConcu)
					{
						MissionReleveVenteConcu.push(listMissionEleve[i]);
					}
				}
				if ( MissionCommande.length > 0)
				{
					alert("affichage notification");
                 var text = "Vous avez "+MissionCommande.length+" mission de degré urgent(s) chez la société "+oClient.NomSociete+" dans la point de vente qui situé a l'adresse suivante : "+oPointVente.Adresse;
				 DMS.Mobile.Notification.ShowMessage(text,'info','e');
				}

			}
			
			else if (listMissionMoyen.length > 0)
			{
				alert("Notify mission list moyen");
				for(var i = 0; i<listMissionMoyen.length;i++)
				{
					
				   if (listMissionMoyen[i].TypeMissionID == DMS.Mobile.Constante.TypeMission.Commande)
					{
						MissionCommande.push(listMissionMoyen[i]);
					}	
				}
				if ( MissionCommande.length > 0)
				{
					alert("affichage notification");
                 var text = "Vous avez "+MissionCommande.length+" mission de degré moyene(s) chez la société "+oClient.NomSociete+" dans la point de vente qui situé a l'adresse suivante : "+oPointVente.Adresse;
				 DMS.Mobile.Notification.ShowMessage(text,info,e);
				}
			}
			
			else if (listMissionNormal.length > 0)
			{
				alert("Notify mission list normal");
				for(var i = 0; i<listMissionNormal.length;i++)
				{
					
				   if (listMissionNormal[i].TypeMissionID == DMS.Mobile.Constante.TypeMission.Commande)
					{
						MissionCommande.push(listMissionNormal[i]);
					}
					
				}
				if ( MissionCommande.length > 0)
				{
					alert("affichage notification");
                 var text = "Vous avez "+MissionCommande.length+" mission de degré normal(s) chez la société "+oClient.NomSociete+" dans la point de vente qui situé a l'adresse suivante : "+oPointVente.Adresse;
				 DMS.Mobile.Notification.ShowMessage(text,info,e);
				}
			}
			
					}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : NotifyMission in PoistionRequest",'alert','e'); 
		}
		},
		
		
		 getCurrentPosition : function (successCallback,errorCallback) {
        try
		{    
			var geolocation = navigator.geolocation;
			
        	if (geolocation) {
					try 
					{
						 function handleSuccess(position) {
								successCallback(position);
						  }
						
						//geolocation.watchPosition(handleSuccess, errorCallback,{
						geolocation.getCurrentPosition(handleSuccess, errorCallback,{
						  //The Android 2.x simulators will not return a geolocation result 
						  //unless the enableHighAccuracy option is set to true
							enableHighAccuracy: true,
							maximumAge: 5000 // 5 sec.
						  });  
					}
					catch (err)
					{
						errorCallback(err,err.code);
					}
			}
			else {
				errorCallback("probléme de géolocation","geolocalisation");
			}       
				}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : getCurrentPosition in PoistionRequest",'alert','e'); 
		}
        },
		
		
	 GetPositionFromGPS : function (ReturnPosition,form)
		{
			try
			{
			alert("get position from gps");
            var synch = "true";

form.getCurrentPosition(function(position){
	
		alert("latitude = "+position.coords.latitude+" longitude = "+position.coords.longitude+"Altitude : "+	position.coords.altitude +"Accuracy : "+position.coords.accuracy+"Altitude Accuracy : "+position.coords.altitudeAccuracy+"Heading : "+ position.coords.heading+"Speed : "+position.coords.speed+"Timestamp : "+new Date(position.timestamp));
		
		var IMEI = device.uuid;
		alert(" imei = "+IMEI);
		form.InsertPosition(ReturnPosition,form,position,synch,IMEI);
		
		
	},
	function(err)
	{
		DMS.Mobile.Common.errors(err,"gélocalisation");
	}
	);
		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : GetPositionFromGPS in PoistionRequest",'alert','e'); 
		}
	
	},
		
		
		InsertPosition : function(ReturnPosition,form,position,synch,_IMEI)
		{
			try
			{
			var IMEI = _IMEI;
			alert("insert position");
			form.connexion.transaction(function(tx){ form.InsertPositionIntoLocal(tx, form,position,synch,IMEI) ;},function(err){ DMS.Mobile.Common.errors(err,"InsertPositionIntoLocal");},function(){form.SucessInsert(ReturnPosition,form,position);});
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertPosition in PoistionRequest",'alert','e'); 
		}
		},
		
	    InsertPositionIntoLocal : function (requete, form,position,synch,IMEI)
		{
			try
			{
			alert("insert position into local");
			requete.executeSql('INSERT INTO Position (PersonnelID,Latitude,Longitude,Date,Heure,Synch,IMEI) VALUES('+sessionStorage.getItem("userID")+',"'+position.coords.latitude+'","'+position.coords.longitude+'","'+DMS.Mobile.Common.currentDate()+'","'+DMS.Mobile.Common.currentHours()+'","'+synch+'","'+IMEI+'")');

			alert("fin insertion position");
				}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertPositionIntoLocal in PoistionRequest",'alert','e'); 
		}
		},
		
		SucessInsert : function(ReturnPosition,form,position)
		{
			try
			{
			alert("secess insert position");
			var oPosition = new DMS.Mobile.Position();
			oPosition.PersonnelID = sessionStorage.getItem("userID");
			oPosition.Latitude = position.coords.latitude;
			oPosition.Longitude = position.coords.longitude;
			oPosition.Dates = DMS.Mobile.Dates.Dayformat(new Date());
			oPosition.IMEI = device.uuid;;
			ReturnPosition(oPosition);
			}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SuccessInsert in PoistionRequest",'alert','e'); 
		}
		}
		
		
	}