if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Dates = {};

DMS.Mobile.Dates = 
{
	
// jour de la semaine suivante
 Nextweek : function(date){
		var firstDay = date;
		var nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);
		return nextWeek;
	},
	
// jour de la semaine précédante
 Lastweek : function(date){
		var firstDay = date;
		var lastWeek = new Date(firstDay.getTime() - 7 * 24 * 60 * 60 * 1000);
		return lastWeek;
	},
	
// afficher le jour en lettres		
Days : function(day) {		
		var date = new Date(day);
		var weekday = new Array("Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi")
		return weekday[date.getDay()];
	},
	
// comparer 2 dates	
Compar : function(date1,date2){
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
	
},

// formater une date
Dayformat : function(date){
	var d = date.getDate();
	var m = date.getMonth() + 1;
	var y = date.getFullYear();
	return ''+ (d <= 9 ? '0' + d : d) +'-'+ (m<=9 ? '0' + m : m) +'-'+ y ;// format mm-dd-yyy
	},
	
SplitDate : function(date){
	//var elem = date.split('/');
	var elem = date.split(/[\/-]/);
	jour = elem[0];
	mois = elem[1];
	annee = elem[2];
	return ''+mois+'/'+jour+'/'+annee;//format yyyy-mm-dd
	}
	

}