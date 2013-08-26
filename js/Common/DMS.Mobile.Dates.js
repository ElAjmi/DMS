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
		
DaysLettres : function(day) {		
		var date = day;
		var weekday = new Array("Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi")
		return weekday[date.getDay()];
	},
	
DaysList : function(d1,d2){
  var oneDay = 24*3600*1000;
  for (var d=[],ms=d1*1,last=d2*1;ms<=last;ms+=oneDay){
    d.push( new Date(ms) );
  }
  return d;	 
},


Diff : function(date1,date2){
	if(date2.getTime() - date1.getTime()>0){
		var timeDiff = Math.abs(date2.getTime() - date1.getTime());
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
		return diffDays;
		}
		else{
		diffDays = -1;
		return diffDays;
		}
		
	},
	
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
	
Dayformat : function(date){
	var d = date.getDate();
	var m = date.getMonth() + 1;
	var y = date.getFullYear();
	return ''+ (d <= 9 ? '0' + d : d) +'-'+ (m<=9 ? '0' + m : m) +'-'+ y ;// format mm-dd-yyy
	//return ''+(m<=9 ? '0' + m : m) +'-'+(d <= 9 ? '0' + d : d) '-'+ y ;
	},
SplitDate : function(date){
	var elem = date.split('-');
	jour = elem[0];
	mois = elem[1];
	annee = elem[2];
	return ''+annee+'-'+mois+'-'+jour;//format yyyy-mm-dd
	},
	
Conv : function(date){
	var elem = date.split('-');
	jour = elem[0];
	mois = elem[1];
	annee = elem[2];
	return ''+mois+'/'+jour+'/'+annee;
	}

}