if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Dates = {};

DMS.Mobile.Dates = 
{
	
// jour de la semaine suivante
 Nextweek : function(date){
	 try
	 {
		var firstDay = date;
		var nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);
		return nextWeek;
	}
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : Nexweek in Dates",'alert','e'); 
	}
	},
	
// jour de la semaine précédante
 Lastweek : function(date){
	 try
	 {
		var firstDay = date;
		var lastWeek = new Date(firstDay.getTime() - 7 * 24 * 60 * 60 * 1000);
		return lastWeek;
	}
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : Lastweek in Dates",'alert','e'); 
	}
	},
	
// afficher le jour en lettres		
Days : function(day) {		
try
{
		var date = new Date(day);
		var weekday = new Array("Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi")
		return weekday[date.getDay()];
	}
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : Days in Dates",'alert','e'); 
	}
	},
	
// comparer 2 dates	
Compar : function(date1,date2){
	try
	{
		
		d1=date1.split('-').reverse().join('')
		d2=date2.split('-').reverse().join('')
		 
		switch (true){
		case (d1==d2) :  return '1' ;
				break;	
		case (d1>d2) :  return '0' ;
				break;	
		 
		case (d1<d2) :  return '1' ;
				break;	
				}
	}
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : Compar in Dates",'alert','e'); 
	}
	
	
},

// formater une date
Dayformat : function(date){
	try
	{
		var d = date.getDate();
		var m = date.getMonth() + 1;
		var y = date.getFullYear();
		return ''+ (d <= 9 ? '0' + d : d) +'-'+ (m<=9 ? '0' + m : m) +'-'+ y ;// format mm-dd-yyy
		}
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : DayFormat in Dates",'alert','e'); 
	}
	},
	
SplitDate : function(date){
	try
	{
		//var elem = date.split('/');
		var elem = date.split(/[\/-]/);
		jour = elem[0];
		mois = elem[1];
		annee = elem[2];
		return ''+jour+'/'+mois+'/'+annee;//format yyyy-mm-dd
		}
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : SplitDate in Dates",'alert','e'); 
	}
	},

DateSpliting : function(date){
	try
	{
		//var elem = date.split('/');
		var elem = date.split('-');
		jour = elem[0];
		mois = elem[1];
		annee = elem[2];
		return ''+jour+'/'+mois+'/'+annee;//format yyyy-mm-dd
		}
	catch(err)
	{
		DMS.Mobile.Notification.ShowMessage(err.message+" : DateSpliting in Dates",'alert','e'); 
	}
  }	

}