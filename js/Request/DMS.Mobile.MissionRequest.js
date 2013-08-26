if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.MissionRequest = {};

DMS.Mobile.MissionRequest = 
{

	
	MissionList :[],
	connexion: null,
	
	
	
  Connect: function (callback,tourneeID) {
  
				var form = this;
				
			       	this.connexion.transaction(function(tx){ form.SelectFromMissionByTourneeID(tx, form,callback,tourneeID) }, this.errorselectFromMissionByTourneeID);
    },
    
    
     
     SelectFromMissionByTourneeID : function(requete,form,callback,tourneeID) {
   
   			requete.executeSql("SELECT * FROM Missions WHERE TourneeID = ?", [tourneeID], function(tx, results) {form.querySuccess(tx,results,form,callback);});
       
    },
    
    
    errorselectFromMissionByTourneeID : function (err) {
   		alert("errorselectFromMission : " + err.message);   
    },
    
    
    querySuccess:function (requete, results,form,callback) {
        //alert("tx = " + requete);
							var len = results.rows.length;
        
							//alert("Mission table: " + len + " rows found.");
						
							for (var i=0; i<len; i++){
								//alert("Row = " + i + " ID = " + results.rows.item(i).MissionID);
		   
								var oMission = new DMS.Mobile.Mission();
								oMission.MissionID = results.rows.item(i).MissionID ;
								oMission.EtatMission = results.rows.item(i).EtatMission;
								oMission.DateCreation = results.rows.item(i).DateCreation;
								oMission.DegreUrgence = results.rows.item(i).DegreUrgence; 
								oMission.DateCloture = results.rows.item(i).DateCloture; 
								oMission.Commentaires = results.rows.item(i).Commentaires;
								oMission.TypeMissionID = results.rows.item(i).TypeMissionID;
								oMission.Synch = results.rows.item(i).Synch;
								oMission.BCKPersonnelID = results.rows.item(i).BCKPersonnelID;
								oMission.PointVenteID = results.rows.item(i).PointVenteID;
								oMission.TourneeID = results.rows.item(i).TourneeID;
								
								form.MissionList.push(oMission);
        						
							}
					callback(form.MissionList)	;
					form.MissionList = [];	
//form.displayMission(form.MissionList,form);
        
          
    },
       
    displayMission : function(array,form){
    for(var i =0;i<array.length;i++){
    	var obj = form.objToString(array[i]);
    	alert(obj);
		} 
				
    	
    	
		}  ,
	       
       objToString :function(obj) {
	    var str = '';
	    for (var p in obj) {
	        if (obj.hasOwnProperty(p)) {
	            str += p + '::' + obj[p] + '\n';
	        }
	    }
	    return str;
		}     

    
}