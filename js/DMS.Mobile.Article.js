if (typeof (DMS) == 'undefined') DMS = {};
if (typeof (DMS.Mobile) == 'undefined') DMS.Mobile = {};



DMS.Mobile.Article = {};
DMS.Mobile.Article = function () { };
$.extend(DMS.Mobile.Article.prototype,
{

    ArticleID: null,
    Designation: null,
    PrixUnitaire: null,
    CAB: null,
    QteDispo: null,
    FamilleID: null,
    Synch: null,
       
    
    

    $ArticleID: null,
    $Designation: null,
    $PrixUnitaire: null,
    $CAB: null,
    $QteDispo: null,
    $DisplayProducts: null,
    
    aticleID:null,
   

    Initialise: function () {
       this.InitialiseEvents();
    },

    InitialiseEvents: function () {

        var form = this;       
        this.$DisplayProducts.click(function () {
        	
            form.DisplayProducts();
        });
    },
    
     Connect: function () {

                    DB = window.openDatabase("BaseDeDonnées", "1.0.0", "OpenGeophone", 100000);
			        DB.transaction(SelectFromArticle, errorselectFromArticle);
    },
    
    
     SelectFromArticle:function (requete) {
        alert("BeginrequestSelect");
        requete.executeSql('SELECT * FROM Article', [], querySuccess, errorselectFromArticle);
        alert("EndrequestSelect");
        
    },
    
    
    errorselectFromArticle:function (err) {
   alert("errorselectFromArticle : " + err.message);   
    },
    
    
    querySuccess:function (requete, results) {
        var len = results.rows.length;
        var id;
        alert("Article table: " + len + " rows found.");
        for (var i=0; i<len; i++){
        alert("Row = " + i + " ID = " + results.rows.item(i).ArticleID + " Data =  " + results.rows.item(i).Designation);
       
       var oArticle = new Article();
        oArticle.ArticleID = results.rows.item(i).ArticleID;
        oArticle.Designation = results.rows.item(i).Designation;
        alert(oArticle.ArticleID.toString());
        }
       
    }
});