if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.HistoriqueFactureRequest = {};

DMS.Mobile.HistoriqueFactureRequest = 
{
	connexion: null,
	ListHistoriqueFacture : null,


   InsertNewHistoric : function(historicFactureDTO,callback)
   {
	   try
		{
			var form = this;	
			var synch = "false";
			this.InsertHistoricFactureIntoLOCAL(historicFactureDTO,synch,form,callback);
  		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertNewHistoric in HistoricFactureRequest",'alert','e'); 
			
			    var exception = new DMS.Mobile.Exception();
						exception.FichierE = "HistoricFactureRequest";
						exception.FonctionE = "InsertNewHistoric";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback();
						});
			
		}
   },
   
   InsertHistoricFactureIntoLOCAL : function(historicFactureDTO,synch,formReq,callback)
   {
	   try
		{
				formReq.connexion.transaction(function(tx){ formReq.InsertIntoHistoricFacture(tx, formReq,historicFactureDTO,synch); }, function(err){ DMS.Mobile.Common.errors(err,"HistoricFactureRequest");
				
				         var exception = new DMS.Mobile.Exception();
						exception.FichierE = "HistoricFactureRequest";
						exception.FonctionE = "InsertIntoHistoricFacture";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback();
						});
				
				},function(){
							
						callback();		
							}); 
		 }
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : InsertHistoricFactureIntoLOCAL in HistoricFactureRequest",'alert','e'); 
			
			  var exception = new DMS.Mobile.Exception();
						exception.FichierE = "HistoricFactureRequest";
						exception.FonctionE = "InsertHistoricFactureIntoLOCAL";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = formReq.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback();
						});
			
		}
   },
   
   InsertIntoHistoricFacture : function(requete, form,historicFactureDTO,synch)
   {
	      try
   {
			requete.executeSql('INSERT INTO HistoriqueFacture(MontantSaisie,Commentaires,DateHistorique,HeureHistorique,FactureID,ModePayement,Synch) VALUES( '+historicFactureDTO.MontantSaisie+',"'+historicFactureDTO.Commentaires+'","'+historicFactureDTO.DateHistorique+'","'+historicFactureDTO.HeureHistorique+'",'+historicFactureDTO.FactureID+','+historicFactureDTO.ModePayement+',"'+synch+'")');

			}
			catch(err)
		{
			var exception = new DMS.Mobile.Exception();
						exception.FichierE = "HistoricFactureRequest";
						exception.FonctionE = "InsertIntoHistoricFacture";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								DMS.Mobile.Notification.ShowMessage(err.message+" : InsertIntoHistoricFacture in HistoricFactureRequest",'alert','e'); 
						});
			
		}	
   },
   
   
   //*********************** select all historic not synchronize ********************//
   
   SelectAllHistoricFactureNotSynch : function(callback)
   {
	   var form = this;
	   try
	    {
		
		this.connexion.transaction(function(tx){ form.SelectHistoricNotSynch(tx, form,callback); }, 
		   function(err){ DMS.Mobile.Common.errors(err,"SelectHistoricNotSynch");
		   
		         var exception = new DMS.Mobile.Exception();
						exception.FichierE = "HistoricFactureRequest";
						exception.FonctionE = "SelectHistoricNotSynch";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(form.ListHistoriqueFacture);
						});
		   
		   });
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectAllHistoricFactureNotSynch in HistoricFactureRequest",'alert','e'); 
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "HistoricFactureRequest";
						exception.FonctionE = "SelectAllHistoricFactureNotSynch";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(form.ListHistoriqueFacture);
						});
		}
   },
   
   SelectHistoricNotSynch : function(requete, form,callback)
   {
	   try
		{
					requete.executeSql("SELECT * FROM HistoriqueFacture WHERE Synch =?", ["false"], function(tx, results) {form.querySuccessHistoriqueNotSynch(tx,results,form,callback);});
		}
		catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : SelectHistoricNotSynch in HistoricFactureRequest",'alert','e'); 
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "HistoricFactureRequest";
						exception.FonctionE = "SelectHistoricNotSynch";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(form.ListHistoriqueFacture);
						});
		}
   },
   
   querySuccessHistoriqueNotSynch : function(tx,results,form,callback)
   {
          try
	{
		form.ListHistoriqueFacture = [];
		var len = results.rows.length;
		if (len>0){
			for (var i=0; i<len; i++){
				
				var historicFactureDTO = new DMS.Mobile.HistoriqueFacture();
				
				historicFactureDTO.HistoriqueID = results.rows.item(i).HistoriqueID ;
				historicFactureDTO.FactureID = results.rows.item(i).FactureID ;
				historicFactureDTO.MontantSaisie = results.rows.item(i).MontantSaisie ;
				historicFactureDTO.Commentaires = results.rows.item(i).Commentaires ;
				historicFactureDTO.ModePayement = results.rows.item(i).ModePayement ;
				historicFactureDTO.DateHistorique = results.rows.item(i).DateHistorique ;
				historicFactureDTO.HeureHistorique = results.rows.item(i).HeureHistorique ;
								
				form.insertHistoricIntoHistoricList(historicFactureDTO, form,len,callback);
			}
		  }
		  else
		  {
			  //alert"callback all tourne : ligne cmd vide");
			  callback(form.ListHistoriqueFacture);
		  }
		  	
	}
	catch(err)
			{
				DMS.Mobile.Notification.ShowMessage(err.message+" : querySuccessHistoriqueNotSynch in HistoricFactureRequest",'alert','e'); 
				
				 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "HistoricFactureRequest";
						exception.FonctionE = "querySuccessHistoriqueNotSynch";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(form.ListHistoriqueFacture);
						});
			}   
   },

insertHistoricIntoHistoricList : function(historicFactureDTO, form,len,callback)
{
   try
   {
			form.ListHistoriqueFacture.push(historicFactureDTO);
			if(form.ListHistoriqueFacture.length == len)
			{
				callback(form.ListHistoriqueFacture);
			}
   }
   catch(err)
   {
	    var exception = new DMS.Mobile.Exception();
						exception.FichierE = "HistoricFactureRequest";
						exception.FonctionE = "insertHistoricIntoHistoricList";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback(form.ListHistoriqueFacture);
						});
   }
},



	
	////****************************** UpdateSynch historique Facture **************************///
	
	UpdateSynchHistoFacture : function(callback)
	{
		var form = this;
		try
		{	 
				
			this.connexion.transaction(function(tx){ form.UpdateHistFactNotSynch(tx, form,callback) }, function(err){ DMS.Mobile.Common.errors(err,"UpdateHistFactNotSynch");
			
			        var exception = new DMS.Mobile.Exception();
						exception.FichierE = "HistoricFactureRequest";
						exception.FonctionE = "UpdateHistFactNotSynch";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback();
						});
			
			});
				}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateSynchHistoFacture in HistoricFactureRequest",'alert','e'); 
			
			   var exception = new DMS.Mobile.Exception();
						exception.FichierE = "HistoricFactureRequest";
						exception.FonctionE = "UpdateSynchHistoFacture";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback();
						});
		}
	},
	
	UpdateHistFactNotSynch : function(requete, form,callback) {
		try
		{
				requete.executeSql(' UPDATE HistoriqueFacture SET Synch= ? WHERE Synch = ?', ["true","false"], function(tx, results) {form.querySuccessUpdateSynch(tx,results,form,callback);});
		 		}
			catch(err)
		{
			DMS.Mobile.Notification.ShowMessage(err.message+" : UpdateHistFactNotSynch in HistoricFactureRequest",'alert','e'); 
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "HistoricFactureRequest";
						exception.FonctionE = "UpdateHistFactNotSynch";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback();
						});
		}  
		},
		
querySuccessUpdateSynch : function(requete,results,form,callback)
{
	callback();
},

/////////////////////////////// Delete all fidelisation ///////////////////////

DeleteAllHistoriqueFacture : function(callback)
{
	var form = this;
	try
	{
			
		this.connexion.transaction(function(tx){ form.DeleteHistoriqueFacture(tx, form,callback);}, function(err){ DMS.Mobile.Common.errors(err,"DeleteHistoriqueFacture");
		
		       var exception = new DMS.Mobile.Exception();
						exception.FichierE = "HistoricFactureRequest";
						exception.FonctionE = "DeleteHistoriqueFacture";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback();
						});
		
		});
	 }
	 catch(err)
	 {
			DMS.Mobile.Notification.ShowMessage(err.message+" : DeleteAllHistoriqueFacture in HistoriqueFactureRequest",'alert','e'); 
			
			 var exception = new DMS.Mobile.Exception();
						exception.FichierE = "HistoricFactureRequest";
						exception.FonctionE = "DeleteAllHistoriqueFacture";
						exception.Exception = err.message;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback();
						});
	 }	
},

DeleteHistoriqueFacture : function(requete, form,callback)
{
	requete.executeSql("DELETE  FROM HistoriqueFacture ", [],
              function(tx, result) {				
				form.querySuccessDELETEAll(form,callback);
				}, 
                function(err){DMS.Mobile.Common.errors(err,"DeleteHistoriqueFacture");
				
				var exception = new DMS.Mobile.Exception();
						exception.FichierE = "HistoricFactureRequest";
						exception.FonctionE = "DeleteHistoriqueFacture";
						exception.Exception = err.code;
						exception.Synch = "false";
						
						DMS.Mobile.Common.connexion = form.connexion;
						DMS.Mobile.Common.InsertException(exception,function(){
								callback();
						});
				
				});
},

querySuccessDELETEAll : function(form,callback)
{
	callback();
},	

}