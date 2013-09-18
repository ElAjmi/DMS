 if (typeof (DMS) == 'undefined') DMS = {};
	if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};
	
	
	
	DMS.Mobile.PositionRequest = {};
	
	DMS.Mobile.PositionRequest = 
	{
		connexion: null,
		
		
		InitializeGetPosition : function ()
		{
			alert("apperl Initisalise get postion");
			var form = this;
			DMS.Mobile.PositionRequest.connexion = this.connexion;
			
			setInterval(DMS.Mobile.PositionRequest.GetPositionFromGPS(function(position){form.VerifyIntoPointVente(position,form);}), DMS.Mobile.Common.PositionDelay);
		},
	
	
	
		VerifyIntoPointVente : function(position,form)
		//VerifyIntoPointVente : function()
		{
				alert("verify into pv");
			//var form = this;
			
			var listPointVente = JSON.parse(sessionStorage.getItem("ListPointVente"));
			var listMission = JSON.parse(sessionStorage.getItem("ListMission"));
			var listClient = JSON.parse(sessionStorage.getItem("ListClient"));
			 if (listPointVente != null)
			 {
				 var DistanceMin = DMS.Mobile.Common.Perimetre;
				var pointVenteID = 0;
				var lat2 = position.Latitude;
				var long2 = position.Longitude;
				alert ("latitute gps = "+lat2+" longitude gps = "+long2);
				//var lat2 = 36.837866465399735;
				//var long2 = 10.166752338409424;
				for (var i = 0;i<listPointVente.length;i++)
				{
					
					var lat1 = listPointVente[i].Latitude;
					var long1 = listPointVente[i].Longitude;
					
					
					
					if(DMS.Mobile.Common.calculDistanceKM(lat1,long1,lat2,long2)<DMS.Mobile.Common.Perimetre )
					{
						if (DMS.Mobile.Common.calculDistanceKM(lat1,long1,lat2,long2) < DistanceMin)
						{
							for ( var k = 0; k<listMission.length;k++)
							{
								if ((listMission[k].PointVenteID == listPointVente[i].PointVenteID) &&
								 (listMission[k].EtatMission == DMS.Mobile.Constante.EtatMission.NonDemaree))
								{
										 pointVenteID = listPointVente[i].PointVenteID;
										 DistanceMin = DMS.Mobile.Common.calculDistanceKM(lat1,long1,lat2,long2);	
								}  
							}
						}
					}
				} 
			 }
			if (DistanceMin <DMS.Mobile.Common.Perimetre)// && (pointVenteID !=0))
			{
				alert("distance min = "+DistanceMin); 
			  form.InitNotificationMission(listPointVente,listMission,listClient,pointVenteID,form);
			}
		},
		
		InitNotificationMission : function(listPointVente,listMission,listClient,pointVenteID,form)
		{
			alert("appel initnotificationMission");
			var listMissionNonDemarrer = [];
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
			
			for (var k = 0; k<listMission.length;k++)
			{
				if((listMission[k].PointVenteID == oPointVente.PointVenteID)&&(listMission[k].EtatMission == DMS.Mobile.Constante.EtatMission.NonDemaree))
				{
					var oMission = listMission[k];
					
					listMissionNonDemarrer.push(oMission);
					
				}
			}
			if(listMissionNonDemarrer.length > 0)
			{
			form.NotificationMission(listMissionNonDemarrer,oClient,oPointVente,form);
			}
			
		},
		
		
		
		NotificationMission : function(listMissionNonDemarrer,oClient,oPointVente,form)
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
		},
		
		NotifyMission : function(listMissionEleve,listMissionMoyen,listMissionNormal,oClient,oPointVente,form)
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
		},
		
		
		
		GetPositionFromGPS : function (ReturnPosition,form)
		{
			alert("get position from gps");
			 navigator.geolocation.getCurrentPosition(function(position){form.InsertPosition(ReturnPosition,form,position);}, form.errors);
		},
		
		
		InsertPosition : function(ReturnPosition,form,position)
		{
			alert("insert position");
			form.connexion.transaction(function(tx){ form.InsertPositionIntoLocal(tx, form,position) ;}, form.errors,function(){form.SucessInsert(ReturnPosition,form,position);});
		},
		
		InsertPositionIntoLocal : function (requete, form,position)
		{
			alert("insert position into local");
			requete.executeSql('INSERT INTO Positions (PersonnelID,Latitude,Longitude,Date,IMEI) VALUES('+sessionStorage.getItem("userID")+',"'+position.coords.latitude+'","'+position.coords.longitude+'","'+DMS.Mobile.Dates.Dayformat(new Date())+'","")');
		},
		
		SucessInsert : function(ReturnPosition,form,position)
		{
			alert("secess insert position");
			var oPosition = new DMS.Mobile.Position();
			oPosition.PersonnelID = sessionStorage.getItem("userID");
			oPosition.Latitude = position.coords.latitude;
			oPosition.Longitude = position.coords.longitude;
			oPosition.Dates = DMS.Mobile.Dates.Dayformat(new Date());
			oPosition.IMEI = null;
			ReturnPosition(oPosition);
		}
	}