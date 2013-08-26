  if (typeof (DMS) == 'undefined') DMS = {};
	if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};
	
	
	
	DMS.Mobile.TourneeRequest = {};
	
	DMS.Mobile.TourneeRequest = 
	{
	
		
		TourneeList :[],
		connexion: null,
	
	  Connect: function (callback) {
					var form = this;	
						this.connexion.transaction(function(tx){ form.SelectFromTournee(tx, form,callback) }, this.errorselectFromTournee);
		},
		
		
		
		
		 SelectFromTournee : function(requete,form,callback) {
	   
				requete.executeSql('SELECT * FROM Tournees', [], function(tx, results) {form.querySuccess(tx,results,form,callback);});
		   
		},
		
		   
	   errorselectFromTournee:function (err) {
	   alert("errorselectFromTournee : " + err.message);   
		},
		
		
		querySuccess:function (requete, results,form,callback) {
			//alert("tx = " + requete);
								var len = results.rows.length;
			
								//alert("Tournee table: " + len + " rows found.");
								
								
									for (var i=0;i<len;i++){
										var oTournee = new DMS.Mobile.Tournee();
										oTournee.TourneeID = results.rows.item(i).TourneeID;
										oTournee.DateDebut = results.rows.item(i).DateDebut;
										oTournee.DateFin = results.rows.item(i).DateFin;
										oTournee.DateCreation = results.rows.item(i).DateCreation;
										oTournee.EtatTournee = results.rows.item(i).EtatTournee;
										oTournee.Synch = results.rows.item(i).Synch;
										oTournee.TerminalID = results.rows.item(i).TerminalID;
										oTournee.ImpimanteID = results.rows.item(i).ImpimanteID;
										oTournee.EquipementID = results.rows.item(i).EquipementID;
										oTournee.VehiculeID = results.rows.item(i).VehiculeID;
										oTournee.PersonnelID = results.rows.item(i).PersonnelID;								
										form.TourneeList.push(oTournee);}
									
								
	//form.displayTournee(form.TourneeList,form);
			callback(form.TourneeList);
			//form.TourneeList = [];
						
		},
	
		displayTournee : function(array,form){
		
		for(var i =0;i<array.length;i++){
			var obj1 = form.objToString(array[i]);
			//var obj2 = form.objToString(array[i].listMission);
			alert(array[i].listMission);  
			
					
	   /* $("#tablemissions").append(""
		+"<tr>"
		+"<td  width='10%' class='ui-bar-c td'>"+array[i].DateDebut+"</div></td>"
		+"<td class='ui-bar-f td' style='padding-right:5px;padding-left:5px;'>"
		
		+"<div data-role='collapsible' data-theme='c' data-content-theme='d' data-collapsed-icon='arrow-d' data-expanded-icon='arrow-u' data-iconpos='right'>"
		+"<h4><table id ='table' border='0' width='100%'><tr><td><img src='css/images/task2.png' id='img'></td><td width='95%'> Missions</td></tr></table></h4>"
		+"<div id='divmissions"+i+"'></div>"
		+"<br/></div></td></tr>").trigger('create');
		
		$("#divmissions"+i).append("<ul  data-role='listview' data-inset='false' id='ulmission'>"
			+"<li class='redprio'><h3>Mission "+ i +" : </h3>"
			+"<p class='parag'> Etat Mission : " + array[i].Mission.EtatMission + " | Date Cloture : " + array[i].Mission.DateCloture + " | Commentaires : " + array[i].Mission.Commentaires + " | Type Mission : <a href='#' style='color: blue ; text-decoration: none;'>" + array[i].Mission.TypeMissionID + "</a> | Point Vente : <a href='#' style='color: blue ; text-decoration: none;'>" + array[i].Mission.PointVenteID +"</a></p>"
			+"</li>"
			+"</ul>").trigger('create');
		  
		*/
		}
			
			}  ,
			   
		   objToString :function(obj) {
			var str = '';
			for (var p in obj) {
				if (obj.hasOwnProperty(p)) {
					str += p + ':' + obj[p] + '\n';
				}
			}
			return str;
			}     
	
		
	}