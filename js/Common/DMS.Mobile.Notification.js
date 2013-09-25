if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Notification = {};

DMS.Mobile.Notification = 
{

	ShowMessage : function(text,type,theme)
	{
		navigator.notification.alert(
    text,  // message
    this.alertDismissed,         // callback
    'alert',            // title
    'Done'                  // buttonName
);
	},
	

alertDismissed : function () {
    // do something
},
	
	
	
	
	
	
	ShowMessage1 : function(text,type,theme)
	{
	var image = null ;
	var msg = null;
	
	switch(type)
	  {
	   case 'info': image = "<img src='css/images/info.png'>"; msg="Information"; break;
	   case 'success': image = "<img src='css/images/ok.png'>"; msg="Succ\351s";  break;
	   case 'fail': image = "<img src='css/images/cancel.png'>"; msg="Erreur";  break;
	   case 'alert': image = "<img src='css/images/alert.png'>"; msg="Alerte";  break;
	  }
	switch(theme)
	  {
	   case 'a': theme="ui-body-a"; break;
	   case 'b': theme="ui-body-b";  break;
	   case 'c': theme="ui-body-c";  break;
	   case 'd': theme="ui-body-d";  break;
	   case 'e': theme="ui-body-e";  break;
	  }
	
	var div = $("<div class='ui-loader "+theme+" ui-corner-all'>"
	+"<table width='100%' border='0'><tr>"
	+"<td width='30%'id='imgicon'>"+image+"</td>"
	+"<td width='70%' style='text-align:left;' ><h3>"+msg+"</h3><p>"+text+"<p></td></tr>"
	+"</table>"
	+"</div>");
	
	$(div).css({ display: "block",
	opacity: 0.90,
	position: "fixed",
	padding: "7px",
	"text-align": "center",
	width: "400px",
	left: ($(window).width() - 284)/2,
	top: $(window).height()/2 })
	.appendTo($.mobile.pageContainer).delay( 5000 )
	.fadeOut( 500, function(){
	$(this).remove();
	});

	}

}