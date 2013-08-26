if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.CommandeRequest = {};

DMS.Mobile.CommandeRequest = 
{

	
	CommandeList :[],
	connexion: null,

  Connect: function () {
				var form = this;	
					//alert("this.connexion = " + this.connexion);
                    //this.connexion = window.openDatabase("BaseDeDonnees", "1.0.0", "OpenGeophone", 100000);
			       	this.connexion.transaction(function(tx){ form.SelectFromCommande(tx, form) }, this.errorselectFromCommande);
    },
    
    
    
    
     SelectFromCommande : function(requete,form) {
   
   			requete.executeSql('SELECT * FROM Commandes', [], function(tx, results) {form.querySuccess(tx,results,form);});
       
    },
    
    
    errorselectFromCommande:function (err) {
   alert("errorselectFromCommande : " + err.message);   
    },
    
    
    querySuccess:function (requete, results,form) {
        //alert("tx = " + requete);
							var len = results.rows.length;
        
							//alert("Commande table: " + len + " rows found.");
						
							for (var i=0; i<len; i++){
								//alert("Row = " + i + " ID = " + results.rows.item(i).CommandeID);
		   
								var oCommande = new DMS.Mobile.Commande();
								oCommande.CommandeID = results.rows.item(i).CommandeID;
							    oCommande.CAB = results.rows.item(i).CAB;
							    oCommande.DateLivraisonPrevue = results.rows.item(i).DateLivraisonPrevue;
							    oCommande.PrixTotalTTC = results.rows.item(i).PrixTotalTTC;
							    oCommande.PrixTotalHT = results.rows.item(i).PrixTotalHT;
							    oCommande.TotalTVA = results.rows.item(i).TotalTVA;
							    oCommande.PointVenteID = results.rows.item(i).PointVenteID;
							    oCommande.CommercialID = results.rows.item(i).CommercialID;
        						form.CommandeList.push(oCommande);
        						
							}
							
form.displayCommande(form.CommandeList,form);
        
                    
    },
       
    displayCommande : function(array,form){
   	/*for(var i =0;i<array.length;i++){
    	var obj = form.objToString(array[i]);
    	alert(obj);
		} */
		
		//$("#example").append("<tbody></tbody>");
    	for(var i =0;i<array.length;i++){
    	
			$("#example tbody").append(""
					+"<tr id='tr'>"
					+"<td>"+ array[i].CAB+"<a href ='Article.html' data-transition='slide' data-direction='reverse'></a></td>"
					+"<td>"+ array[i].DateLivraisonPrevue+"</td>"
					+"<td>"+ array[i].PointVenteID+"</td>"
					+"<td>"+ array[i].PrixTotalHT+"</td>"
					+"<td>"+ array[i].PrixTotalTTC+"</td>"
					+"</tr>");
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