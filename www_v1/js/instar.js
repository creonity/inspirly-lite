//Positionierung von Camerabild ist falsch

//Set parameters
var version = "1.0L";
var default_lang = "en";
//window.localStorage.setItem("autolinebreak", "true");
window.localStorage.setItem("mood", 0);
window.localStorage.setItem("sleeptime", 500);
window.localStorage.setItem("autolinebreak",true);
if(!window.localStorage.getItem){window.localStorage.getItem("preview_quality",true);}
if(!window.localStorage.getItem){window.localStorage.getItem("trainer_mode",false);}

//helpers
show_counter=0;
var device_id = false;
var error_connection_txt = "";
var admobid = {};
var image_url;
var locale = window.localStorage.getItem("locale");
var language = locale;
var init_once = 0;
var performance = {};
var duration_loaded = {};
var duration_calculated = {};
var rating_array = {};
var focus_array = {};
var duration = 0;
var duration_calculated_current_image = 0;
var $container;
var busy = false;
var image_nr = -1;
var image_chain = [];
var ak_image_nr = 0;
var last_image_nr = -1;
var ak_image_nr_show;
var image_url_old;
var canvas;
var text_img;
var from_setting;
var tutorial_shown;

//Clear local storage
window.localStorage.removeItem("user_img");
//window.localStorage.removeItem("preloaded_image");
//window.localStorage.removeItem("preloaded_guess");
//window.localStorage.removeItem("preloaded_image_id");
//window.localStorage.removeItem("preloaded_time_calculated");
//window.localStorage.removeItem("preloaded_time_loaded");
window.localStorage.removeItem("current_image");
window.localStorage.removeItem("current_image_id");
//window.localStorage.removeItem("current_guess");
//window.localStorage.removeItem("current_time_calculated");
//window.localStorage.removeItem("current_time_loaded");
window.localStorage.removeItem("current_banner_image");
window.localStorage.removeItem("history_image");
window.localStorage.removeItem("preloaded_code");
window.localStorage.removeItem("code");
window.localStorage.removeItem("current_text");
window.localStorage.removeItem("font");
window.localStorage.removeItem("fontfilling");
window.localStorage.removeItem("frame");
window.localStorage.removeItem("background");
window.localStorage.removeItem("texture");
window.localStorage.removeItem("fontsize");
window.localStorage.removeItem("crop_image");
window.localStorage.setItem("template_id","");



$(document).ready(function(){
if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
    document.addEventListener('deviceready', initApp, false);
} else {initApp();}
})




if( /(android)/i.test(navigator.userAgent) ) {
	admobid = { // for Android
					banner: 'ca-app-pub-3176168089117396/9768598254',
					interstitial: 'ca-app-pub-3176168089117396/4266001898',
          reward: 'ca-app-pub-3176168089117396/2030467207'
	};
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
	admobid = { // for iOS
    banner: 'ca-app-pub-3176168089117396/1348673444',
    interstitial: 'ca-app-pub-3176168089117396/6668750058',
    reward: 'ca-app-pub-3176168089117396/6609674767'
	};
}

function initApp() {
busy = false;
screen.orientation.lock('portrait');
//Prepare adds
if(typeof AdMob !== 'undefined') {create_bannerAd();create_interstitial();}

device_id = device.uuid;


//In your 'deviceready' handler, set up your Analytics tracker:
//window.ga.startTrackerWithId('UA-104693442-1', 30)


AppRate.preferences = {
  openStoreInApp: true,
  displayAppName: 'inspir.ly LITE',
  usesUntilPrompt: 5,
  promptAgainForEachNewVersion: false,
  storeAppURL: {
    ios: '<my_app_id>',
    android: 'market://details?id=<package_name>'
  },
  customLocale: {
    title: $("#rate_title").html(),
    message: $("#rate_message").html(),
    cancelButtonLabel: $("#rate_later").html(),
    laterButtonLabel: $("#rate_cancel").html(),
    rateButtonLabel: $("#rate_btn").html(),
  }
};

AppRate.promptForRating(false);
}

function create_bannerAd()
{
if(typeof AdMob !== 'undefined') {
  AdMob.createBanner( {
    license: "lukas.nagel@gmx.ch/6af2fe6663be05e6b5e76d7afbb13ed8",
    adId: admobid.banner,
    position: AdMob.AD_POSITION.BOTTOM_CENTER,
    isTesting: true, // TODO: remove this line when release
    overlap: false,
    offsetTopBar: false,
    bgColor: 'black',
    autoShow : false
  } );
  }
}

function create_interstitial()
{
if(typeof AdMob !== 'undefined') {
AdMob.prepareInterstitial( {
license: "lukas.nagel@gmx.ch/6af2fe6663be05e6b5e76d7afbb13ed8",
isTesting: true,
adId:admobid.interstitial,
autoShow:false
});
}
}






var showPopover = function(target,id) {document.getElementById(id).show(target);
$("#btn_options").addClass("create_btn_active");
};
//var hidePopover = function(target,id) {document.getElementById(id).show(target);};

window.fn = {};

window.fn.open = function() {
  var menu = document.getElementById('menu');
  menu.open();
};

window.fn.load = function(page) {
  var content = document.getElementById('content');
  var menu = document.getElementById('menu');
  content.load(page)
    .then(menu.close.bind(menu));
};


//window.localStorage.removeItem("locale");




$(document).on("show", function( event ) {
busy = false;
var page = event.target;
if (page.matches("#image")) {
if(from_setting==1){show_image(1);from_setting=0;}
if(window.localStorage.getItem("trainer_mode")=="true"){$("#trainer_mode_ui").show();}else{$("#trainer_mode_ui").hide();}
if(typeof AdMob !== 'undefined'){AdMob.removeBanner();create_bannerAd();}
show_image(0);
update_checkboxes();
}
if (page.matches("#usr_text_input")) {
if(window.localStorage.getItem("autolinebreak")=="true"){$("#autolinebreak_switch").html("<ons-switch id='autolinebreak' checked disable-auto-styling style='margin-left:0px'></ons-switch>");}
else{$("#autolinebreak_switch").html("<ons-switch id='autolinebreak' disable-auto-styling style='margin-left:0px'></ons-switch>");}


$("#user_txt").on("click",function(){if(typeof cordova !== 'undefined'){cordova.plugins.Keyboard.show();}});
$("#user_txt").on("blur",function(){window.localStorage.setItem('current_text', this.value);delete_history();if(typeof cordova !== 'undefined'){cordova.plugins.Keyboard.close();}});
if(typeof AdMob !== 'undefined'){AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);}}
if (page.matches("#mood")) {
$container = $('#templates_area').masonry({itemSelector: '.img_preview', columnWidth: 1});
show_favorites_from_folder();
$(".mood-item").removeClass("active");$(".mood-item").each(function(index){if($(this).attr("value")==window.localStorage.getItem("mood")){$(this).addClass("active");}});if(typeof AdMob !== 'undefined'){AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);}
}
if (page.matches("#share")) {create_banner();}
if (page.matches("#own_image")) {
$("#crop_image_area").css("height",$(".ons-tabbar__content").height());
$("#upload_loader").css("height",$(".ons-tabbar__content").height());
$container = $('#image_area').masonry({itemSelector: '.img_preview', columnWidth: 1});
show_images_from_folder();
}

if (page.matches("#settings")){from_setting=1;}
if (page.matches("#image")){from_setting=1;}
})

$(document).on("hide", function( event ) {
var page = event.target;

if (page.matches("#image")) {
//show_loader(true);
$("#user_txt").val(window.localStorage.getItem('current_text'));}

//if (page.matches("#usr_text_input") || page.matches("#mood")) {refresh_preloaded(true);}
if (page.matches("#usr_text_input")) {refresh_preloaded(true);}

if (page.matches("#share")) {$("#print_products").hide();}
if(typeof AdMob !== 'undefined'){AdMob.hideBanner();}
if (page.matches("#own_image")) {$('#image_area').masonry('destroy');}
})




$(document).on("init", function( event ) {
var page = event.target;

if (page.matches("#language")) {if(window.localStorage.getItem("locale")){locale=window.localStorage.getItem("locale");document.querySelector('#myNavigator').pushPage('mySplitter.html')}}

if (page.matches("#mySplitter") && init_once == 0) {ko.applyBindings(languageModel,document.getElementById("mySplitter"));init_once=1;}
if (page.matches("#create")) {ko.applyBindings(languageModel,document.getElementById("create"));
error_connection_txt = $("#error_connection_txt").html();
$("#create").on("prehide", function(){$("#btn_options").removeClass("create_btn_active");});
}
if (page.matches("#image")) {ko.applyBindings(languageModel,document.getElementById("image"));}
if (page.matches("#share")) {ko.applyBindings(languageModel,document.getElementById("share"));}
if (page.matches("#mood")) {ko.applyBindings(languageModel,document.getElementById("mood"));}
if (page.matches("#usr_text_input")) {ko.applyBindings(languageModel,document.getElementById("usr_text_input"));$("#user_txt").val(window.localStorage.getItem("current_text"));}
if (page.matches("#about")) {ko.applyBindings(languageModel,document.getElementById("about"));}
if (page.matches("#settings")) {ko.applyBindings(languageModel,document.getElementById("settings"));}
if (page.matches("#language")) {ko.applyBindings(languageModel,document.getElementById("language"));}
if (page.matches("#own_image")) {ko.applyBindings(languageModel,document.getElementById("own_image"));
$("#search_pic").on("click",function(){if(typeof cordova !== 'undefined'){cordova.plugins.Keyboard.show();}});
$("#search_pic").keyup(function(event){if(event.keyCode == 13){if(typeof cordova !== 'undefined'){cordova.plugins.Keyboard.close();};search_pic($("#search_pic").val());}});

}

//Add text

//if (page.matches("#language")) {getQuote(true);show_image();}



if (page.matches("#mood")) {
$("#select_mood").on("change", function(){window.localStorage.setItem("mood",$(this).val());uncheck_options();refresh_preloaded(true);document.getElementById("tabbar").setActiveTab("btn_image_menu", {});});
}

if (page.matches("#image")) {
if(!tutorial_shown){$(".tutorial").show();}tutorial_shown = 1;
//if(!window.localStorage.getItem("current_text")){
getQuote();show_image(0);
//}
$("#detect-area").css("height", $(window).width());
//$("#btn_create_random").on("click", function(){show_image();});
//$("#btn_create_random_history").on("click", function(){show_image(true);});
//$("#btn_image_menu").on("click", function(){create_random($("#user_txt").val());});
$("#detect-area").on('swipeleft', swiepelefthandler);
$("#detect-area").on('swiperight', swieperighthandler);
$("#download_image").on('tap', change_textimage_handler);
$(".page__background").on('tap', change_textimage_handler_off);



$(".tutorial").on('click', function(){$(".tutorial").fadeOut();})
canvas = new fabric.Canvas('c', {stopContextMenu: true, });
canvas.setHeight($(window).width());
canvas.setWidth($(window).width());
hide_text_img();
}

if (page.matches("#usr_text_input")) {
//add switch
$("#autolinebreak_switch").on('change','#autolinebreak',function(){
window.localStorage.setItem("autolinebreak", $("#autolinebreak").children().is(':checked'));
//refresh_preloaded(true);
});
}

if (page.matches("#settings")) {
//add quality switch
if(window.localStorage.getItem("preview_quality")=="true"){
$("#preview_quality_switch").html("<ons-switch id='preview_quality' checked disable-auto-styling style='margin-left:0px'></ons-switch>");
}
else{$("#preview_quality_switch").html("<ons-switch id='preview_quality' disable-auto-styling style='margin-left:0px'></ons-switch>");}
$("#preview_quality").on('change',function(){
window.localStorage.setItem("preview_quality", $("#preview_quality").children().is(':checked'));
refresh_preloaded();});

//add trainer switch
if(window.localStorage.getItem("trainer_mode")=="true"){$("#trainer_switch").html("<ons-switch id='trainer_mode' checked disable-auto-styling style='margin-left:0px'></ons-switch>");}
else{$("#trainer_switch").html("<ons-switch id='trainer_mode' disable-auto-styling style='margin-left:0px'></ons-switch>");}
$("#trainer_mode").on('change',function(){window.localStorage.setItem("trainer_mode", $("#trainer_mode").children().is(':checked'));});
}
});




function show_loader(loader,block)
{
if(loader){$(".loader").show();$("#download_image_holder").fadeOut(200);busy=block;
//if(canvas._objects){if(canvas._objects.length>0){canvas.dispose();}}
}
else{$("#btn_favorite").removeClass("create_btn_active");$("#download_image_holder").fadeIn(500,function(){$(".loader").hide();busy=false;})}
}


function search_pic(key)
{
if(key == ""){
show_images_from_folder();}
else
{
//localStorage.removeItem(key);
if(localStorage[key]){
pix_data = JSON.parse(localStorage[key]);
hours24 = Math.floor(Date.now() / 1000)-86400;
if(pix_data.timestamp>hours24){load_image_from_pixabay(pix_data);}else{search_pixabay(key);}
}
else{search_pixabay(key)}
}
}

function search_pixabay(key)
{
console.log("search_pixabay"+key+"no");

//$("#image_area").html("");
$.ajax({
  url: "https://pixabay.com/api/?key=6189766-fbdbc18f705acb44bca36ab6b&q="+encodeURI(key)+"&response_group=high_resolution&editors_choice=true&image_type=photo&per_page=100&lang="+locale,
  type: "POST",
  global: false,
  success: function(msg, error) {
msg["timestamp"]= Math.floor(Date.now() / 1000);
localStorage[key] = JSON.stringify(msg);
load_image_from_pixabay(msg)
},
error: function (msg, textStatus, errorThrown) {ons.notification.alert(error_connection_txt);}
    });
}


function load_image_from_pixabay(json)
{
var data = json.hits;
if(json.totalHits==0){showDialog('dialog-3');show_images_from_folder();}
else
{
$container.masonry( 'remove',$(".img_preview")).masonry('layout');
$("#tabbar").append("<div class='pixabay'><img style='width:100px; display: block;' src='img/pixabay.png'></img></div>");
$( function() {
var $items = getItems(data);
$container.masonryImagesReveal( $items );
});
}



function getItems(data) {
var items = '';
$.each(data, function(index, value) {
var item = "<div onclick='saveFromUrl(\""+value.imageURL+"\",\""+value.webformatURL+"\")' class='img_preview' style='background-image: url("+value.previewURL+"); height:"+$(window).width()/3+"px;'></div>";
items += item;
});
  return $( items );
}
}

function show_images_from_folder()
{
var local_images = ["13553443228vDLFBsmmsWVgO6edwhu.jpg","1355344363e5rbCRhbQRkQTRcqGavc.jpg","1355344364flUg9SBs1L5fkvKO84v9.jpg","1355344366gQWnjVMq2FNQ95A7V8j3.jpg","1355344368dMVIPKuEOnhVVyR5IoHZ.jpg","1355344370eQX2FMOFRz81FQbMKoSG.jpg","1355344371f7nZl1yxmnBnm3TqUJjE.jpg","1355344372Aa2PFr4Fo7uK3uEts3Rx.jpg","1355344404bvAXybnLLbC2SCGjij7T.jpg","1355344374opSFogbDspStKtEWLw5o.jpg","1355344376WqXbXLYtylBvjkz96vT1.jpg","1355344377XgCUgoT8uXBx1rUpChpS.jpg","1355344379RRSAPz5REmRPBycQXy2c.jpg","1355344380JLj24A6WtnUZZaPzydLB.jpg","1355344381cOO6e3iHXKKzhIWog2lM.jpg","1355344382vI8OvaGMhxTd9QJOFm7V.jpg","1355344385XXXopbAuVgPleR2ydwyq.jpg","13553443872FwXjXhfFqDYB6PSIGMx.jpg","1355344389r2jnDKdHqVc2DYiHjeE6.jpg","1355344390wfNNarTmUyhepOAyOXyk.jpg","1355344391wI9rKbMKpgKPxagQagOx.jpg","1355344392X24tTFKxv2p5pfmz1hS5.jpg","1355344394I9AKfWp27CEHHWviYHfj.jpg","1355344395917FnCQbxBc5UNkZUdB1.jpg","1355344396EM9WExJE6QlWA84xD8vS.jpg","1355344397IfjiapI6ppzLAfBuZDxs.jpg","13553443984ujp9trfNo7CNQpZ63qY.jpg","1355344398Gal68ymZG5A8XIAFWGm3.jpg","1355344399I89VwcxfpDM3i2OsWcGV.jpg","13553444006C3VJj87mL4CmuhN92mJ.png","1355344402igaAcIt1bGyvtrKV3ZOK.jpg","1355344408qK7KFLXnwDQXZhcWF6Nx.jpg","1355344410IX6Pu4eIuPXr2UVh7njp.png","1355344412Em23mkiNxYJFGFRXvjsD.png","1355344414ASZ1WU58VWHWyFGQItX9.png","checkers_bg.jpg","vintage_bg.jpg"];
$container.masonry( 'remove',$(".img_preview")).masonry('layout');
$( function() {var $items = getItemsLocal(local_images);
$container.masonryImagesReveal( $items );});
}

function getItemsLocal(local_images) {
var items = '';
$.each(local_images, function(index, value) {
var item = "<div onclick='window.localStorage.setItem(\"user_img_local\",\"img/background_preview/"+value+"\");window.localStorage.setItem(\"user_img\",\"inspirly/"+value+"\");show_crop()' class='img_preview' style='background-image: url(img/background_preview/"+value+"); height:"+$(window).width()/3+"px;'></div>";
items += item;
});
return $( items );
}


$.fn.masonryImagesReveal = function( $items ) {
  var msnry = this.data('masonry');

  var itemSelector = msnry.options.itemSelector;
  // hide by default
  $items.hide();
  // append to container
  this.append( $items );


  $items.imagesLoaded({ background: true }).progress( function( imgLoad, image ) {
    // get item
    // image is imagesLoaded class, not <img>, <img> is image.img
    var $item = $( image.element );
    // un-hide item
    $item.show();
    // masonry does its thing
    msnry.appended( $item );
    var height = $(window).height()-$("#toparea").height()-$(".toolbar").height()-$(".ons-tabbar__footer").height()-10;
    $('#image_area').css("height", height);
  });
  return this;
};



function show_crop()
{
console.log("show crop");

$(".pixabay").remove();

$("#image_to_crop").attr("src",window.localStorage.getItem("user_img_local"));
$('#image_to_crop').imagesLoaded( function() {
console.log("loaded");
$("#upload_loader_wrapper").fadeOut();
})
$("#crop_canvas_wrapper").css("height", $(window).width());
$("#crop_wrapper").fadeIn();


$('#image_to_crop').cropper({
viewMode: 3,
autoCropArea:1,
  aspectRatio: 1 / 1,
  minContainerWidth: $(window).width(),
minContainerHeight: $(window).width(),
minCanvasWidth: $(window).width(),
minCanvasHeight: $(window).width(),
minCropBoxWidth: $(window).width(),
minCropBoxHeight: $(window).width(),
        restore: false,
        modal: false,
        guides: false,
        highlight: false,
        cropBoxMovable: false,
        cropBoxResizable: false,
  dragMode: 'move',
  ready: function() {
//var imageData = $('#image_to_crop').cropper('getImageData');

//$('#image_to_crop').cropper('setCanvasData', 10, 10,200,200);
//$('#image_to_crop').cropper('crop');

  },
});
}

function crop_image()
{
var crop_data = $('#image_to_crop').cropper('getData',false);
var image_data = $('#image_to_crop').cropper('getImageData');
//console.log(crop_data.x+" "+image_data.width);
//console.log("width="+crop_data.width/image_data.naturalWidth*100+"%;left="+crop_data.x/image_data.naturalWidth*100+"%");
//console.log("height="+crop_data.height/image_data.naturalHeight*100+"%;top="+crop_data.y/image_data.naturalHeight*100+"%");
var no_stretch = image_data.naturalWidth;if(image_data.naturalHeight<no_stretch){no_stretch=image_data.naturalHeight;}

var stretch_factor_width = (no_stretch/crop_data.width);
var stretch_factor_height = (no_stretch/crop_data.height);
var new_width =Math.round(image_data.naturalWidth*stretch_factor_width);
var new_height =Math.round(image_data.naturalHeight*stretch_factor_height);
var new_left = (new_width/2)-(crop_data.x*stretch_factor_width);
var new_top = (new_height/2)-(crop_data.y*stretch_factor_height);
window.localStorage.setItem("crop_image", JSON.stringify({"width":new_width,"height":new_height,"left":new_left,"top":new_top}));
refresh_preloaded(true);
$('#crop_wrapper').hide();$('#image_to_crop').cropper('destroy');
$('image_to_crop').attr('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABA‌​AACAUwAOw==');
document.getElementById("tabbar").setActiveTab("btn_image_menu", {});
}








function show_favorites_from_folder()
{
var local_templates = [];
$container.masonry( 'remove',$(".img_preview")).masonry('layout');
var path = cordova.file.dataDirectory + "templates/";
  window.resolveLocalFileSystemURL(path,
    function (fileSystem) {
      var reader = fileSystem.createReader();
      reader.readEntries(
        function (entries) {
//console.log(JSON.stringify(entries));
$.each(entries, function(index, value) {local_templates.push(value.nativeURL);})
$( function() {var $items = getFavoritesLocal(local_templates);$container.masonryImagesReveal( $items );});
        },
        function (err) {
          console.log(err);
        }
      );
    }, function (err) {
      console.log(err);
    }
  );
}




function getFavoritesLocal(local_templates) {
var items = '';
$.each(local_templates, function(index, value) {
var item = "<div id='"+index+"' onclick='choose_template(\""+value+"\")' class='img_preview' style='background-image: url("+value+"); height:"+$(window).width()/3+"px;'><button class='button button--light delete_btn' style='position:absolute; top:5px; left:5px; z-index:4;' onclick='deleteFav(event,\""+value+"\",\""+index+"\");'><i class='fa fa-close'></i></button></div>";
items += item;
});
return $( items );
}

function deleteFav(event,fav_url,fav_id)
{
event.stopPropagation();
ons.notification.confirm({callback: function(answer){deleteFavTrue(answer,fav_url,fav_id);}, message: $("#Confirm_Delete_Favorite").html(), title: $("#Confirm").html(), buttonLabels:[$("#Cancel_lbl").html(), $("#OK_lbl").html()]});
}

function deleteFavTrue(answer,fav_url,fav_id)
{
if(answer==1)
{
//delete vorlage
var fav_url_array = fav_url.split("/");
var filename = decodeURIComponent(fav_url_array.pop());
var path = fav_url_array.join("/");
window.resolveLocalFileSystemURL(path, function(dir) {

      var reader = dir.createReader();
      reader.readEntries(
        function (entries) {
console.log(JSON.stringify(entries));
        },
        function (err) {
          console.log(err);
        }
      );

//console.log("dir"+decodeURIComponent(filename));
/*
//delete all
dir.removeRecursively(function() {
                    console.log("Remove Recursively Succeeded");
                }, fail);
*/

	dir.getFile(filename, {create:false}, function(fileEntry) {

              fileEntry.remove(function(){
              console.log("removed");
              $container.masonry( 'remove',$("#"+fav_id)).masonry('layout');
              },function(error){
              console.log("Error deleting the file"+JSON.stringify(error));
              },function(error){
              console.log("The file doesnt exist"+JSON.stringify(error));
              });
	},function(error){
              console.log("Error getting the file"+JSON.stringify(error));
              });

});

}
}

function choose_template(url)
{

window.localStorage.setItem('current_text', $("#user_txt").val());
var template_id = getTemplateId(url);
window.localStorage.setItem("template_id",template_id);
uncheck_options();
refresh_preloaded(true);
window.localStorage.setItem("autolinebreak",false);
document.getElementById("tabbar").setActiveTab("btn_image_menu", {});
show_loader(true);
}




function uncheck_options()
{
window.localStorage.setItem('fontfilling', 0);$("#fontfilling").prop( "checked", false );
window.localStorage.setItem('font', 0);$("#font").prop( "checked", false );
window.localStorage.setItem('fontsize', 0);$("#fontsize").prop( "checked", false );
window.localStorage.setItem('frame', 0);$("#frame").prop( "checked", false );
window.localStorage.setItem('background', 0);$("#background").prop( "checked", false );
window.localStorage.setItem('texture', 0);$("#texture").prop( "checked", false );
}

function update_checkboxes()
{
if(window.localStorage.getItem('fontfilling')=="true"){$("#fontfilling").prop( "checked", true );}
if(window.localStorage.getItem('font')=="true"){$("#font").prop( "checked", true );}
if(window.localStorage.getItem('fontsize')=="true"){$("#fontsize").prop( "checked", true );}
if(window.localStorage.getItem('frame')=="true"){$("#frame").prop( "checked", true );}
if(window.localStorage.getItem('background')=="true"){$("#background").prop( "checked", true );}
if(window.localStorage.getItem('texture')=="true"){$("#texture").prop( "checked", true );}
}


async function show_image(image_change)
{
if(busy && image_change==1){return;}
ak_image_nr = ak_image_nr + image_change;console.log(ak_image_nr);
if(ak_image_nr<0){ak_image_nr=0}
if(ak_image_nr_show != ak_image_nr){
if(last_image_nr>=0){image_chain[last_image_nr]["time_hidden"] = Date.now();
//if(canvas._objects){if(canvas._objects.length>0){
hide_text_img();
//canvas.deactivateAll();
//var disposed = canvas.dispose();console.log("dispose"+disposed);
//}}
focus_array[image_chain[last_image_nr]["image_id"]] = image_chain[last_image_nr]["time_hidden"]-image_chain[last_image_nr]["time_shown"]; }

show_loader(true,true);
await sleep(window.localStorage.getItem("sleeptime"));
}
if(!image_chain[ak_image_nr]){create_image(ak_image_nr);return;}
if(!image_chain[ak_image_nr]["src"]){return;}
if(ak_image_nr==last_image_nr){return;}

$('<img>').attr('src', image_chain[ak_image_nr]["src"]).imagesLoaded( {"image_nr":ak_image_nr}, function() {
 image_chain[this.options.image_nr]["loaded"]=true;
 if(this.options.image_nr == ak_image_nr){$("#download_image").html("<img style='width: 100%; height:"+$(window).width()+"px;' src='"+image_chain[ak_image_nr]["src"]+"'>");
 image_chain[ak_image_nr]["time_shown"] = Date.now();
 last_image_nr= ak_image_nr;
 }
show_loader(false);
$("#best_guess").html("("+image_chain[ak_image_nr]["best_guess"]+"%)");
$("#time_calculated").html("("+Math.round(image_chain[ak_image_nr]["performance_calculation"]/100)/10+"s)");
$("#time_loaded").html("("+Math.round(image_chain[ak_image_nr]["performance_loaded"]/100)/10+"s)");
ak_image_nr_show = ak_image_nr;
window.localStorage.setItem("current_image",image_chain[ak_image_nr]["src"]);
window.localStorage.setItem("current_image_id",image_chain[ak_image_nr]["image_id"]);

$("#detect-area").off('swipeleft');
$("#detect-area").off('swiperight');
$("#detect-area").on('swipeleft', swiepelefthandler);
$("#detect-area").on('swiperight', swieperighthandler);
});

//render preview
if(!image_chain[ak_image_nr+1]){create_image(ak_image_nr+1);}
}



function rate_image(image_nr, rating)
{
image_chain[image_nr]["rating"]=rating;    
rating_array[image_chain[image_nr]["image_id"]] = rating; 
}


          




var swiepelefthandler = function(event) {show_image(1);$(".tutorial").fadeOut();}
var swieperighthandler = function(event) {show_image(-1);$(".tutorial").fadeOut();}
var change_textimage_handler = function(event) {console.log("on");event.stopPropagation();add_text_image(image_chain[ak_image_nr]["text_image"]);}
var change_textimage_handler_off = function(event) {console.log("off");remove_text_image();}


function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms));}


function refresh_preloaded(all_new)
{
//window.localStorage.removeItem("preloaded_code");
//window.localStorage.removeItem("preloaded_image");
//Preload next image with new settings
delete image_chain[ak_image_nr_show+1];

if(all_new){
//window.localStorage.removeItem("code");
//window.localStorage.removeItem("current_image");
show_image(1);
}
else{
     create_image(ak_image_nr_show+1);}
}




function delete_history()
{
$("#btn_create_random_history").prop("disabled", true);
window.localStorage.removeItem("history_code");
window.localStorage.removeItem("history_image");
window.localStorage.removeItem("code");
window.localStorage.removeItem("current_image");
}



//function create_random(preload,rating)
function create_image(image_nr)
{
console.log("imagenr "+image_nr);
//analytics
if(typeof ga !== 'undefined'){window.ga.trackEvent('Image', 'Create Image');}
//Textinput
user_txt = get_text();    
//Performance data
var duration_calculated_str = JSON.stringify(duration_calculated);
$.each(duration_calculated, function(index, value) {if(value){delete duration_calculated[index];}});
var duration_loaded_str = JSON.stringify(duration_loaded);
$.each(duration_loaded, function(index, value) {if(value){delete duration_loaded[index];}});
var rating_str = JSON.stringify(rating_array);
$.each(rating_array, function(index, value) {if(value){delete rating_array[index];}});
var focus_str = JSON.stringify(focus_array);
$.each(focus_array, function(index, value) {if(value){delete focus_array[index];}});


        
//add to chain
image_chain[image_nr] = []; 
image_chain[image_nr]["time_sent"] = Date.now();

if(image_chain[ak_image_nr_show]){
    console.log(ak_image_nr_show+" "+image_nr);
    var code = image_chain[ak_image_nr_show]["code"];}else{var code = "{}";}


//Render new image
var datatosend = "template_id="+window.localStorage.getItem("template_id")+"&code="+code+"&crop_image="+window.localStorage.getItem("crop_image")+"&performance_calculated="+duration_calculated_str+"&performance_loaded="+duration_loaded_str+"&focus="+focus_str+"&rating="+rating_str+"&version="+version+"&language="+language+"&device_id="+device_id+"&template="+history+"&mood="+window.localStorage.getItem("mood")+"&preview_quality="+window.localStorage.getItem("preview_quality")+"&user_txt="+user_txt+"&user_img="+window.localStorage.getItem("user_img")+"&textimagechange="+window.localStorage.getItem("textimagechange")+"&fontfilling="+window.localStorage.getItem("fontfilling")+"&frame="+window.localStorage.getItem("frame")+"&font="+window.localStorage.getItem("font")+"&background="+window.localStorage.getItem("background")+"&texture="+window.localStorage.getItem("texture")+"&fontsize="+window.localStorage.getItem("fontsize");
window.localStorage.setItem("template_id","");
window.localStorage.setItem("textimagechange",0);
$.ajax({
  url: "https://www.inspir.ly/user_img/create_random.php",
  type: "POST",
  global: false,
  data: datatosend,
  success: function(msg, error) {
//    console.log(msg.replace(/\\/g, ''));
var data = JSON.parse(msg);

try {
        var code = JSON.parse(data.code);
    } catch(e) {
        data.error = "Error. Please try again.";
        data.image_id = "error";
        data.best_guess = 0;
        if(image_chain[image_nr-1]){data.code = image_chain[image_nr-1]["code"];}else{data.code = "{}";}
        var code = [];code["layers"] = [];code["layers"][1]=[];code.layers[1].text_content =window.localStorage.getItem('current_text');
    }



 //add information to chain
if(data.error){busy=false;
    //ons.notification.alert(data.error);
    image_chain[image_nr]["src"]= "http://placehold.it/476x288/eb356c/ffffff?text="+encodeURI(data.error);}
else{image_chain[image_nr]["src"]=data.image_url;
image_chain[image_nr]["text_image"]=[];
image_chain[image_nr]["text_image"]["src"]=data.image_texturl;
image_chain[image_nr]["text_image"]["left"]=data.offset_left;
image_chain[image_nr]["text_image"]["top"]=data.offset_top;
image_chain[image_nr]["text_image"]["width"]=data.text_width;
image_chain[image_nr]["text_image"]["height"]=data.text_height;
image_chain[image_nr]["text_image"]["rotation"]=data.text_rotation;


window.localStorage.setItem('current_text', code.layers[1].text_content);
window.localStorage.setItem("sleeptime",data.sleeptime);
}    
    image_chain[image_nr]["image_id"]=data.image_id;
    image_chain[image_nr]["loaded"]=false;
    image_chain[image_nr]["code"]=data.code;
    image_chain[image_nr]["best_guess"]=data.best_guess;
    
//Performance
image_chain[image_nr]["performance_calculation"] = Date.now() - image_chain[image_nr]["time_sent"];
duration_calculated[data.image_id]=image_chain[image_nr]["performance_calculation"];
max_history();
show_image(0);
$('<img>').attr('src', image_chain[image_nr]["src"]).imagesLoaded( {"image_nr":image_nr}, function() {
   image_chain[this.options.image_nr]["loaded"]=true;
   image_chain[this.options.image_nr]["performance_loaded"] = Date.now() - image_chain[this.options.image_nr]["time_sent"];
duration_loaded[data.image_id]=image_chain[image_nr]["performance_loaded"];
});
/*
$('<img>').attr('src', data.image_url).imagesLoaded( {"image_nr":image_nr}, function() {
    image_chain[this.options.image_nr]["loaded"]=true;
    console.log("loaded "+this.options.image_nr+" "+ak_image_nr);
    if(this.options.image_nr == ak_image_nr){
        console.log("show it");
        show_it(ak_image_nr);}
    
    duration_loaded[data.image_id] = Date.now() - performance[time_sent];delete performance[time_sent];
if(window.localStorage.getItem("current_image_id")==data.image_id){
window.localStorage.setItem("current_time_loaded", duration_loaded[data.image_id]);
$("#time_loaded").html("("+Math.round(duration_loaded[data.image_id]/100)/10+"s)");}else{window.localStorage.setItem("preloaded_time_loaded", duration_loaded[data.image_id]);}
});
*/
//Set results
//window.localStorage.setItem("preloaded_code", data.code);
//window.localStorage.setItem("preloaded_image", data.image_url);
//window.localStorage.setItem("preloaded_guess", data.best_guess);
//window.localStorage.setItem("preloaded_image_id", data.image_id);
//if(!preload){show_it(ak_image_nr);}
},
error: function (msg, textStatus, errorThrown) {ons.notification.alert(error_connection_txt);}
    });
}

function max_history()
{
    
}


function get_text()
{
user_txt = window.localStorage.getItem("current_text");
if(user_txt.length==0 && !window.localStorage.getItem("template_id")){getQuote();user_txt = window.localStorage.getItem("current_text");}
str_length = user_txt.length;
if(window.localStorage.getItem("autolinebreak")=="true")
{
var text_items = user_txt.split(/[\n ]+/);
letter_length = str_length - text_items.length;
var line_number = 1;
line_number = Math.ceil(letter_length/(Math.ceil(letter_length/100)*10));
var avg_line_length = letter_length/line_number;
var user_txt_structured = "";
counter = 0;
$(text_items).each(function(index){
user_txt_structured = user_txt_structured+text_items[index];
counter = counter + text_items[index].length;
if(counter>avg_line_length){user_txt_structured = user_txt_structured+"\n";counter=0;}else{user_txt_structured = user_txt_structured+" ";}
});
if(text_items.length==2){user_txt_structured=text_items[0]+"\n"+text_items[1];}
user_txt = user_txt_structured;
}
return user_txt;  
}











//Image from camera
function takeImage() {
navigator.camera.getPicture(uploadPhoto, function(message) {console.log('take picture failed');}, { quality: 100,
    destinationType: Camera.DestinationType.FILE_URI });


function onFail(message) {
    alert('Taking Picture failed because: ' + message);
}
}


//Image from fotolibrary
     function getImage() {
            // Retrieve image file location from specified source
            console.log("upload_initiated");
            show_loader(true);
            navigator.camera.getPicture(uploadPhoto, function(message) {console.log('get picture failed');},{
			quality: 100,
			destinationType: navigator.camera.DestinationType.FILE_URI,
			sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
		}
            );

        }





/*
function movePic(file){
$("#upload_loader_wrapper").show();
window.resolveLocalFileSystemURL(file, resolveOnSuccess, resOnError);}
function resolveOnSuccess(entry){
    var newFileName = "own.jpg";
    var myFolderApp = "temp";
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {
    fileSys.root.getDirectory( myFolderApp,{create:true, exclusive: false},
    function(directory) {entry.moveTo(directory, newFileName,  successMove, resOnError);},resOnError);},resOnError);}
function successMove(entry) {
window.localStorage.setItem("user_img_local", entry.toURL());
uploadPhoto(entry.toURL());
}
function resOnError(error) {ons.notification.alert("Error, couldn't move file "+error.code);$("#upload_loader_wrapper").hide();}
*/



function saveFromUrl(url,urlSmall)
{
$("#upload_loader_wrapper").show();
var datatosend = "url="+encodeURI(url);
$.ajax({
  url: "https://www.inspir.ly/user_img/download_pixabay.php",
  type: "POST",
  global: false,
  data: datatosend,
  success: function(msg, error) {

 var data = JSON.parse(msg);
window.localStorage.setItem("user_img","own/"+data.uploadName);
console.log(data);

var filePath = cordova.file.dataDirectory + '/own.jpg';
var fileTransfer = new FileTransfer();
var uri = encodeURI(urlSmall);
fileTransfer.download(
    uri,
    filePath,
    function(entry) {
        window.localStorage.setItem("user_img_local", entry.toURL());
        console.log("download complete: " + entry.fullPath);
        show_crop();
    },
    function(error) {
        console.log("download error source " + error.source);
        console.log("download error target " + error.target);
        console.log("upload error code" + error.code);
        $("#upload_loader_wrapper").hide();
    },false,{headers: {}}
);
},
error: function (msg, textStatus, errorThrown) {ons.notification.alert("error pixabayupload");show_images_from_folder();$("#upload_loader_wrapper").hide();}
});
}















        function uploadPhoto(imageURI) {
$("#upload_loader_wrapper").show();
console.log("go_upload");
            var options = new FileUploadOptions();
            options.fileKey="file";
           // options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.fileName="user_img.jpg";
            options.mimeType="image/jpeg";

      //      var params = new Object();
      //      params.value1 = "test";
      //      params.value2 = "param";
          //  options.params = params;
            options.chunkedMode = false;
            options.headers = {Connection: "close"};

            var ft = new FileTransfer();
            ft.upload(imageURI, "https://www.inspir.ly/user_img/user_img_upload.php", win, fail, options);
        }

        function win(r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
            console.log(r);
            var data = JSON.parse(r.response);
            console.log(data);
          //  window.localStorage.setItem("user_img", "own/"+r.response.replace(/['"]+/g, ''));
          window.localStorage.setItem("user_img", "own/"+data.uploadName);
          window.localStorage.setItem("user_img_local", data.uploadSmall);
      //      $("#user_img").html(r.response.replace(/['"]+/g, ''));
          //  refresh_preloaded(true);
          show_crop();
          
        }

        function fail(error) {
        $("#upload_loader_wrapper").hide();
        window.localStorage.removeItem("user_img_local");
        console.log(error);
        show_loader(false);
        ons.notification.alert("An error has occurred: Code = "+error.code);
        }



function download_image(size)
{
//AdMob.showRewardVideoAd();



$("#download_progress").fadeIn();
$(".download_btn").prop("disabled", true);


//var datatosend = "user_txt="+encodeURI(user_txt);
var template_id = getTemplateId(window.localStorage.getItem("current_image"));
var datatosend = "code="+image_chain[ak_image_nr]["code"]+"&size="+size+"&template_id="+template_id+"&device_id="+device_id;

$.ajax({
  url: "https://www.inspir.ly/user_img/download.php",
  type: "POST",
  global: false,
  data: datatosend,
  success: function(msg, error) {
  var data = JSON.parse(msg);

  $("#download_progress").fadeOut(1000, function(){


  //$("#download_prev").html("<img src='"+data.image_url+"'>");
  $(".download_btn").prop("disabled", false);});

//var fileTransfer = new FileTransfer();
//download(data.image_url, "inspirly", data.image_name);
console.log(data.image_url+" "+data.image_name);
download(data.image_url,data.image_name);

},
error: function (msg, textStatus, errorThrown) {
 $("#download_progress").fadeOut();
 $(".download_btn").prop("disabled", false);
ons.notification.alert(error_connection_txt);}
    });
}













function download(URL, File_Name) {
//window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function (dirEntry) {
window.resolveLocalFileSystemURL('cdvfile://localhost/sdcard/Pictures/', function (dirEntry) {
//alert('cdvfile URI: ' + dirEntry.toInternalURL());
//The folder is created if doesn't exist
dirEntry.getDirectory( "inspirly",{create:true, exclusive: false},function(directory) {createFile(directory, File_Name, URL);},onErrorCreateDir);
//createFile(dirEntry, File_Name, URL);
}, onErrorLoadFs);
}

function onErrorCreateDir(msg){alert("Error while creating directory.");}
function onErrorRequestFs(msg){alert("Error while requesting file system.");}
function onErrorLoadFs(msg){alert("Error while loading directory.");}

function createFile(dirEntry, File_Name, URL) {
// Creates a new file or returns the file if it already exists.
dirEntry.getFile(File_Name, {create: true, exclusive: false}, function(fileEntry) {
var uri = encodeURI(URL);
file_transfer(fileEntry, uri);
}, onErrorCreateFile);

}

function onErrorCreateFile(msg){alert(msg);}

function file_transfer(fileEntry, uri) {
    var fileTransfer = new FileTransfer();
    var fileURL = fileEntry.toURL();
    console.log(fileURL);
     console.log(uri);
    fileTransfer.download(
        uri,
        fileURL,
        function (entry) {
        console.log("Picture has been saved."+entry.toURL());
        ons.notification.toast({message: $("#Picture_has_beend_saved").html(), timeout: 2000});

console.log(entry.toURL());
 window.galleryRefresh.refresh(entry.toURL(),function(success){ console.log(success); },function(error){ console.log(error); });

     //   var withoutPrefixPath = _getLocalImagePathWithoutPrefix(entry.toURL());
    //    cordova.exec(function(params){ console.log("done it"); }, function(error){ console.log("got an error "+error); }, "GalleryRefresh", "refresh", [withoutPrefixPath]);
       // displayImageByFileURL(entry);
        },
        function (error) {
            ons.notification.alert("Error while downloading source.");
        },
        null, // or, pass false
        {
            //headers: {
            //    "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
            //}
        }
    );
}

function displayImageByFileURL(fileEntry) {
//make Preview
    var elem = document.getElementById('imageElement');
    elem.src = fileEntry.toURL();
}


function share(platform)
{
$("#share_progress").fadeIn();
$(".share_btn").prop("disabled", true);

var template_id = getTemplateId(window.localStorage.getItem("current_image"));
var datatosend = "code="+image_chain[ak_image_nr]["code"]+"&size=1080&template_id="+template_id+"&device_id="+device_id+"&share="+platform;

$.ajax({
  url: "https://www.inspir.ly/user_img/download.php",
  type: "POST",
  global: false,
  data: datatosend,
  success: function(msg, error) {
  console.log("ok share");
  var data = JSON.parse(msg);

var share_options;
share_options = {
  message: $("#Created_with_inspirly ").html()+'#inspirly', // not supported on some apps (Facebook, Instagram)
  subject: $("#Get_inspired").html(), // fi. for email
  files: [data.image_url], // an array of filenames either locally or remotely
  url: 'https://www.inspir.ly',
  chooserTitle: $("#Pick_an_app").html() // Android only, you can override the default share sheet title
}


if(platform == "facebook"){window.plugins.socialsharing.shareViaFacebook($("#Created_with_inspirly").html()+' #inspirly',  data.image_url, 'http://www.inspir.ly', function() {console.log('share ok')}, function(errormsg){showDialog('dialog-2');})}
if(platform == "instagram"){window.plugins.socialsharing.shareViaInstagram($("#Created_with_inspirly").html()+' #inspirly', data.image_url, function() {console.log('share ok')}, function(errormsg){showDialog('dialog-2');})}
if(platform == "whatsapp"){window.plugins.socialsharing.shareViaWhatsApp($("#Created_with_inspirly").html()+' #inspirly', data.image_url, 'http://www.inspir.ly', function() {console.log('share ok')}, function(errormsg){showDialog('dialog-2');})}
if(platform == "twitter"){window.plugins.socialsharing.shareViaTwitter($("#Created_with_inspirly").html()+' #inspirly', data.image_url, 'http://www.inspir.ly', function() {console.log('share ok')}, function(errormsg){showDialog('dialog-2');})}
if(platform == "snapchat"){window.plugins.socialsharing.shareWithOptions(share_options, share_onSuccess, share_onError);}
if(platform == "other"){window.plugins.socialsharing.shareWithOptions(share_options, share_onSuccess, share_onError);}




var share_onSuccess = function(result) {
  console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
  console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
}

var share_onError = function(msg) {
ons.notification.alert("Sharing failed with message: " + msg);
}

  $("#share_progress").fadeOut(4000, function(){$(".share_btn").prop("disabled", false);});



},
error: function (msg, textStatus, errorThrown) {
 $("#share_progress").fadeOut();
 $(".share_btn").prop("disabled", false);
ons.notification.alert(error_connection_txt);}
    });
}








function getTemplateId(url)
{
var url_array = url.split(".");
var url_array_new = url_array[url_array.length-2].split("-");
return url_array_new[url_array_new.length - 2];
}






function addFavorite()
{
//send infromation to server
var template_id = getTemplateId(window.localStorage.getItem("current_image"));
var datatosend = "template_id="+template_id;
console.log(window.localStorage.getItem("current_image"));
$.ajax({
  url: "https://www.inspir.ly/user_img/addFavorite.php",
  type: "POST",
  global: false,
  data: datatosend,
  success: function(msg, error) {
  var data = JSON.parse(msg);
  console.log("ok"+data.debug);
},
error: function (msg, textStatus, errorThrown) {console.log("error: "+errorThrown);}
    });


//save to local library
var URL = window.localStorage.getItem("current_image");
var File_Name = URL.substring(URL.lastIndexOf('/')+1);
console.log(File_Name);
var filename_array = File_Name.split("?");
File_Name = filename_array[0];
console.log(File_Name);
window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dirEntry) {
//The folder is created if doesn't exist
dirEntry.getDirectory( "templates",{create:true, exclusive: false},function(directory) {addTemplate(directory, File_Name, URL);},onErrorCreateDir);
}, onErrorLoadFs);
}

function addTemplate(dirEntry, File_Name, URL) {
// Creates a new file or returns the file if it already exists.
//File_Name = "any.jpg";
dirEntry.getFile(File_Name, {create: true, exclusive: false}, function(fileEntry) {
var uri = encodeURI(URL);
favorite_transfer(fileEntry, uri);
}, onErrorCreateFile);
}

function favorite_transfer(fileEntry, uri) {
    var fileTransfer = new FileTransfer();
    var fileURL = fileEntry.toURL();
    console.log(fileURL);
    fileTransfer.download(
        uri,
        fileURL,
        function (entry) {
        console.log("Favorite has been saved."+entry.toURL());
        $("#btn_favorite").addClass("create_btn_active");
        ons.notification.toast({message: $("#Favorite_has_beend_saved").html(), timeout: 2000});
        },
        function (error) {
            ons.notification.alert("Error while downloading source.");
        },null,{}
    );
}













function create_banner()
{
console.log("create_banner");
if(window.localStorage.getItem("current_banner_image")!=window.localStorage.getItem("current_image"))
{
console.log("current_banner_image");
//get the product image
//$("#print_progress").fadeIn();

var datatosend = "image_src="+window.localStorage.getItem("current_image");

$.ajax({
  url: "https://www.inspir.ly/user_img/product_banner.php",
  type: "POST",
  global: false,
  data: datatosend,
  success: function(msg, error) {
  var data = JSON.parse(msg);


//$("#print_progress").fadeOut(1000,function(){
$("#print_products").html("<img onclick='print_product()' style='width:100%' src='"+data.image_url+"'>");
$("#print_products").fadeIn();
//});
window.localStorage.setItem("current_banner_image", window.localStorage.getItem("current_image"));
//$("#current_banner_image").html($("#current_image").html());
},
error: function (msg, textStatus, errorThrown) {console.log("error: "+errorThrown);}
    });
}else{$("#print_products").fadeIn();}
}




function print_product()
{
$("#print_progress").fadeIn();
//disable to click again on image
var eles = document.getElementsByTagName('img');
for (var i=0; i < eles.length; i++)
   eles[i].onclick = null;


var template_id = getTemplateId(window.localStorage.getItem("current_image"));
var datatosend = "code="+image_chain[ak_image_nr]["code"]+"&size=2000&template_id="+template_id+"&device_id="+device_id+"&print=1";

$.ajax({
  url: "https://www.inspir.ly/user_img/download.php",
  type: "POST",
  global: false,
  data: datatosend,
  success: function(msg, error) {
  var data = JSON.parse(msg);
console.log(msg);
  $("#print_progress").fadeOut(1000, function(){
  //enable to click on image again
var eles = document.getElementsByTagName('img');
for (var i=0; i < eles.length; i++)
   eles[i].onclick = print_product;

window.open("http://www.zazzle.com/api/create/at-238761569768290129?rf=238761569768290129&ax=DesignBlast&cg=196340684027374117&sr=250134954166200634&image0="+encodeURI(data.image_url));

  //$("#download_prev").html("<img src='"+data.image_url+"'>");
});

},
error: function (msg, textStatus, errorThrown) {
 $("#print_progress").fadeOut();
  //enable to click on image again
var eles = document.getElementsByTagName('img');
for (var i=0; i < eles.length; i++)
   eles[i].onclick = print_product;
ons.notification.alert(error_connection_txt);}
    });

}


function _getLocalImagePathWithoutPrefix(url) {
    if (url.indexOf('file:///') === 0) {
        return url.substring(7);
    }
    return url;
}


function add_text_image(text_image)
{
console.log("add_text");
fabric.Image.fromURL(text_image["src"], function(img) {
    //img.left = 50;
    //img.top = 50;
    //canvas.add(img);

console.log("oben "+text_image["top"]/400*$(window).width()+" links "+text_image["left"]/400*$(window).width());

var scale_factor = $(window).width()/400;
img.crossOrigin = "Anonymous";
img.scale(scale_factor);
img.originX= "center";
img.originY= "center";
canvas.add(text_img = img.set({
          left: text_image["left"]/400*$(window).width(),
          top: text_image["top"]/400*$(window).width(),
          opacity: 0.7,
          padding: 0,
          cornersize:10,
          width:text_image["width"],
          height:text_image["height"],
          angle:text_image["rotation"],
          hasRotatingPoint:false,
          //lockRotation: true,
    }));
    text_img.hasControls = text_img.hasBorders = false;
  //  text_img.rotate(text_image["rotation"]);

show_text_img();
    canvas.renderAll();
});
}

function remove_text_image(text_image)
{
hide_text_img();
}

function applyChanges()
{
console.log("apply");
var code_array = JSON.parse(image_chain[ak_image_nr_show]["code"]);


code_array["layers"][1]["layer_height"]=Math.round(text_img.getScaledHeight()/$(window).width()*400);
code_array["layers"][1]["layer_height_user"]=code_array["layers"][1]["layer_height"];
code_array["layers"][1]["layer_width"]=Math.round(text_img.getScaledWidth()/$(window).width()*400);
code_array["layers"][1]["layer_width_user"]=code_array["layers"][1]["layer_width"];
code_array["layers"][1]["layer_left"]=Math.round((text_img.getBoundingRect().left+(text_img.getBoundingRect().width/2))/$(window).width()*400);
code_array["layers"][1]["layer_left_user"]=code_array["layers"][1]["layer_left"];
code_array["layers"][1]["layer_top"]=Math.round((text_img.getBoundingRect().top+(text_img.getBoundingRect().height/2))/$(window).width()*400);
code_array["layers"][1]["layer_top_user"]=code_array["layers"][1]["layer_top"];
code_array["layers"][1]["layer_rotation"]=Math.round(text_img.angle);
code_array["layers"][1]["layer_rotation_user"]=code_array["layers"][1]["layer_rotation"];
code_array["layers"][1]["layer_rotation_width"]=Math.round(text_img.getBoundingRect().width/$(window).width()*400);
code_array["layers"][1]["layer_rotation_width_user"]=code_array["layers"][1]["layer_rotation_width"];
code_array["layers"][1]["layer_rotation_height"]=Math.round(text_img.getBoundingRect().height/$(window).width()*400);
code_array["layers"][1]["layer_rotation_height_user"]=code_array["layers"][1]["layer_rotation_height"];

console.log("top "+code_array["layers"][1]["layer_top"]);

image_chain[ak_image_nr_show]["code"] = JSON.stringify(code_array);
window.localStorage.setItem("textimagechange",1);
//console.log(text_img.getHeight()+" "+text_img.getWidth()+" "+text_img.top+" "+text_img.left);

hide_text_img();

refresh_preloaded(true);
//$("#detect-area").on('swipeleft', swiepelefthandler);
//$("#detect-area").on('swiperight', swieperighthandler);


//canvas.dispose();
}


function show_text_img()
{
console.log("show_text");
$("#fabric_area").css({"height":$(window).width(),"width":$(window).width()});
$("#btn_favorite, #btn_options").hide();
$("#btn_apply").show();
$("#btn_apply").on("click",function(event){console.log("clicked");event.stopPropagation();applyChanges();});
$("#detect-area").off('swipeleft');
$("#detect-area").off('swiperight');
}

function hide_text_img()
{
console.log("hide_text");
canvas.clear();
$("#fabric_area").css({"height":0,"width":0});
$("#btn_favorite, #btn_options").show();
$("#btn_apply").hide();
$("#btn_apply").off("click");
$("#detect-area").on('swipeleft', swiepelefthandler);
$("#detect-area").on('swiperight', swieperighthandler);
}


function getQuote(user) {
//console.log("getquote");
var author = randomKey(quote_array[locale]);
var quote = quote_array[locale][author];
if(user){$("#user_txt").val(quote);}
window.localStorage.setItem('current_text', quote);
}


var quote_array = [];
quote_array["en"] = [];
quote_array["de"] = [];
//quote_array[""] = [""];

quote_array["en"].push("LOVE LIFE");
quote_array["en"].push("Life is good");
quote_array["en"].push("Welcome to happiness");
quote_array["en"].push("Thank you!");
quote_array["en"].push("be happy.");
quote_array["en"].push("choose happy");
quote_array["en"].push("feeling happy");
quote_array["en"].push("Smile, happiness looks gorgeous on you.");
quote_array["en"].push("Happiness depends on ourselves.");
quote_array["en"].push("I choose to be happy.");
quote_array["en"].push("hello HAPPINESS");
quote_array["en"].push("Peace Love Happiness");
quote_array["en"].push("Do more of what makes you happy");
quote_array["en"].push("Happiness is a decision.");
quote_array["en"].push("You make me Happy");

quote_array["de"].push("Ich bin dann mal glücklich.");
quote_array["de"].push("glücklich");
quote_array["de"].push("Du bist am schönsten, wenn du glücklich bist.");
quote_array["de"].push("Glückfinder");
quote_array["de"].push("Du machst mich glücklich!");
quote_array["de"].push("Hauptsache glücklich!");

/*
quote_array["en"]["Vivian Greene"] = ["Life isn't about waiting for the storm to pass... It's about learning to dance in the rain."];
quote_array["en"]["Proverbs"] = ["Live today for tomorrow it will all be history."];
quote_array["en"]["Proverbs"] = ["Before you embark on a journey of revenge, dig two graves."];
quote_array["en"]["Proverbs"] = ["Live today for tomorrow it will all be history."];
quote_array["en"]["Vivian Greene"] = ["Life isn't about waiting for the storm to pass... It's about learning to dance in the rain."];
quote_array["en"]["Lao Tzu"] = ["If you are depressed you are living in the past. If you are anxious you are living in the future. If you are at peace you are living in the present."];
quote_array["en"]["Soren Kierkegaard"] = ["Life is not a problem to be solved, but a reality to be experienced."];
quote_array["en"]["Jack London"] = ["Life is not always a matter of holding good cards, but sometimes, playing a poor hand well."];
quote_array["en"]["Marcus Aurelius"] = ["Dwell on the beauty of life. Watch the stars, and see yourself running with them."];
quote_array["en"]["Unknown"] = ["The best time to plant a tree is twenty-five years ago. The second best time is today."];
quote_array["en"]["Dr. Seuss"] = ["Don't cry because it's over, smile because it happened."];
quote_array["en"]["Oscar Wilde"] = ["Be yourself; everyone else is already taken."];
quote_array["en"]["Albert Einstein"] = ["Two things are infinite: the universe and human stupidity; and I'm not sure about the universe."];
quote_array["en"]["Frank Zappa"] = ["So many books, so little time."];
quote_array["en"]["William W. Purkey"] = ["You've gotta dance like there's nobody watching, Love like you'll never be hurt, Sing like there's nobody listening, And live like it's heaven on earth."];
quote_array["en"]["Marcus Tullius Cicero"] = ["A room without books is like a body without a soul."];
quote_array["en"]["Mae West"] = ["You only live once, but if you do it right, once is enough."];
quote_array["en"]["Mahatma Gandhi"] = ["Be the change that you wish to see in the world."];
quote_array["en"]["J.K. Rowling"] = ["If you want to know what a man's like, take a good look at how he treats his inferiors, not his equals."];
quote_array["en"]["Mark Twain"] = ["If you tell the truth, you don't have to remember anything."];
quote_array["en"]["Elbert Hubbard"] = ["A friend is someone who knows all about you and still loves you."];
quote_array["en"]["Mahatma Gandhi"] = ["Live as if you were to die tomorrow. Learn as if you were to live forever."];
quote_array["en"]["Oscar Wilde"] = ["To live is the rarest thing in the world. Most people exist, that is all."];
quote_array["en"]["Martin Luther King Jr."] = ["Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that."];
quote_array["en"]["Oscar Wilde"] = ["I am so clever that sometimes I don't understand a single word of what I am saying."];
quote_array["en"]["Anonymous"] = ["Insanity is doing the same thing, over and over again, but expecting different results."];
quote_array["en"]["J.K. Rowling"] = ["I do believe something magical can happen when you read a good book."];
quote_array["en"]["Winston Churchill"] = ["The Pessimist Sees Difficulty In Every Opportunity. The Optimist Sees The Opportunity In Every Difficulty."];
quote_array["en"]["Will Rogers"] = ["Don't Let Yesterday Take Up Too Much Of Today."];
quote_array["en"]["Steve Jobs"] = ["If You Are Working On Something That You Really Care About, You Don't Have To Be Pushed. The Vision Pulls You."];
quote_array["en"]["Rob Siltanen"] = ["People Who Are Crazy Enough To Think They Can Change The World, Are The Ones Who Do."];
quote_array["en"]["Ernest Hemingway"] = ["The world breaks everyone, and afterward, some are strong at the broken places."];
quote_array["en"]["Walt Disney"] = ["If you can dream it, you can do it."];
quote_array["en"]["Eleanor Roosevelt"] = ["The future belongs to those who believe in the beauty of their dreams."];
quote_array["en"]["W. Clement Stone"] = ["Aim for the moon. If you miss, you may hit a star."];
quote_array["en"]["Yoko Ono"] = ["Smile in the mirror. Do that every morning and you'll start to see a big difference in your life."];
quote_array["en"]["Mother Teresa"] = ["Peace begins with a smile."];
quote_array["en"]["Andy Rooney"] = ["If you smile when no one else is around, you really mean it."];
quote_array["en"]["Charlie Chaplin"] = ["You'll find that life is still worthwhile, if you just smile."];
quote_array["en"]["Unknown"] = ["I look at you and see the rest of my life in front of my eyes."];
quote_array["en"]["Leo Tolstoy"] = ["All, everything that I understand, I only understand because I love."];
quote_array["en"]["Unknown"] = ["I'm much more me when I'm with you."];
quote_array["en"]["Salvador Dali"] = ["I don't do drugs, I am drugs."];
quote_array["en"]["Jim Morrison"] = ["Actually I don't remember being born, it must have happened during one of my black outs."];
quote_array["en"]["Unknown"] = ["I didn't fall. The floor just needed a hug."];
quote_array["en"]["Unknown"] = ["Sleep all day. Party all night. Never grow old. Never die."];
quote_array["en"]["Unknown"] = ["Happiness is not having what you want. It is appreciating what you have."];
quote_array["en"]["Unknown"] = ["We fall in love by chance, we stay in love by choice."];
quote_array["en"]["Unknown"] = ["You can't change yesterday, but you can ruin today by worrying about tomorrow."];
quote_array["en"]["Unknown"] = ["Silence isn't empty. It's full of answers."];
quote_array["en"]["Unknown"] = ["The goal is to die with memories, not dreams."];
quote_array["en"]["Alyssa Knight"] = ["Count your rainbows, not your thunderstorms."];
quote_array["en"]["Robert A. Heinlein"] = ["Love is that condition in which the happiness of another person is essential to your own."];
quote_array["en"]["Mahatma Gandhi"] = ["Happiness is when what you think, what you say, and what you do are in harmony."];
quote_array["en"]["Winnie the Pooh"] = ["Nobody can be uncheered with a balloon."];
quote_array["en"]["Confucius"] = ["What you do not want done to yourself, do not do to others."];
quote_array["en"]["Aristotle"] = ["Happiness depends upon ourselves."];
quote_array["en"][""] = ["Be the best version of YOU"];
quote_array["en"][""] = ["If it is important, you'll find a way. If not you'll find an excuse."];
quote_array["en"][""] = ["Your only limit is YOU"];
quote_array["en"][""] = ["Hard work beats talent when talent doesn't work hard"];
quote_array["en"][""] = ["Do more of what makes you happy"];
quote_array["en"][""] = ["Love the life you live, live the life you love!"];
quote_array["en"][""] = ["Fuck this world... I'm going to Wonderland..."];
quote_array["en"][""] = ["stop wishing. start doing."];
quote_array["en"][""] = ["I'm not here to be average. I'm here to be awesome."];
quote_array["en"][""] = ["Be fearless in the pursuit of what sets your soul on fire."];
quote_array["en"]["Oprah Winfrey"] = ["Think like a queen."];
quote_array["en"][""] = ["A little progress each day adds up to big results"];
quote_array["en"][""] = ["Hope is the only thing stronger than fear"];
quote_array["en"][""] = ["Believe in yourself"];
quote_array["en"][""] = ["Make your dreams happen"];
quote_array["en"][""] = ["I'm going to make you so proud - not to self"];
quote_array["en"][""] = ["Be stronger than your excuses"];
quote_array["en"]["Steve Martin"] = ["Be so good they can't ignore you"];
quote_array["en"][""] = ["Sweat is your fat crying"];
quote_array["en"][""] = ["If you're tired of starting over STOP giving up"];
quote_array["en"][""] = ["Wake up. Kick ass. Repeat."];
quote_array["en"][""] = ["Be happy. Be bright. Be you."];
quote_array["en"][""] = ["I'm doing this for ME"];
quote_array["de"][""] = ["Ein Ziel ist ein Traum mit Termin."];
quote_array["de"][""] = ["Der Wille ist der Schlüssel, der Weg nur das Schloss, und der Mut die Klinke."];
quote_array["de"]["Antoine de Saint-Exupery"] = ["Man sieht nur mit dem Herzen gut. Das Wesentliche ist für die Augen unsichtbar."];
quote_array["de"]["Antoine de Saint-Exupery"] = ["Wenn du ein Schiff bauen willst, so trommle nicht Männer zusammen um Holz zu beschaffen, Werkzeuge vorzubereiten, Aufgaben zu vergeben und die Arbeit einzuteilen, sondern lehre die Männer die Sehnsucht nach dem weiten endlosen Meer."];
quote_array["de"]["Winston Churchill"] = ["Erfolg ist die Fähigkeit, von einem Misserfolg zum anderen zu gehen, ohne seine Begeisterung zu verlieren."];
quote_array["de"]["Theodor Heuss"] = ["Der einzige Mist, auf dem nichts wächst, ist der Pessimist."];
quote_array["de"]["Zarko Petan"] = ["Mit leerem Kopf nickt es sich leichter."];
quote_array["de"]["Unbekannt"] = ["Wenn der Mensch kein Ziel hat, ist ihm jeder Weg zu weit."];
quote_array["de"]["George Bernard Shaw"] = ["Man ist nur unglücklich, weil man Zeit hat, zu überlegen, ob man unglücklich ist oder nicht."];
quote_array["de"]["Henry Ford"] = ["Wenn alles gegen dich zu laufen scheint, erinnere dich daran, dass das Flugzeug gegen den Wind abhebt, nicht mit ihm."];
quote_array["de"]["Henry Ford"] = ["Wer immer tut, was er schon kann, bleibt immer das, was er schon ist."];
quote_array["de"]["Mark Twain"] = ["Gib jedem Tag die Chance, der schönste deines Lebens zu werden."];
quote_array["de"]["Euripides"] = ["Man soll sich nicht über Dinge ärgern. Denn das ist ihnen völlig egal."];
quote_array["de"]["Franz Kafka"] = ["Wege entstehen dadurch, dass wir sie gehen."];
quote_array["de"]["Augustinus"] = ["Nur wer selbst brennt, kann Feuer in anderen entfachen."];
quote_array["de"][""] = ["Die Zukunft gehört denen, die sie verändern."];
quote_array["de"]["Albert Schweitzer"] = ["Das Glück ist das einzige, was sich verdoppelt, wenn man es teilt."];
quote_array["de"][""] = ["Gib jedem Tag die Chance, der Schönste deines Lebens zu werden."];
quote_array["de"][""] = ["Schliesse die Augen. Klettere mit mir auf den Regenbogen. Auf einen Sonnenstrahl. Hinauf zu den Sternen. In die Unendlichkeit."];
quote_array["de"][""] = ["Die Augen sind der Spiegel der Seele."];
quote_array["de"]["Carolyn Wells"] = ["Glück ist die Fähigkeit, es zu erkennen."];
quote_array["de"][""] = ["glücklich steht dir gut"];
quote_array["de"][""] = ["Glück ist nicht das Ziel der Reise, sondern die Art wie man reist."];
quote_array["de"]["Goethe"] = ["Erfolg hat drei Buchstaben: TUN!"];
quote_array["de"][""] = ["Erfolg ist eine Treppe, keine Tür."];
quote_array["de"][""] = ["Irgendwann hört man auf zu warten und beginnt zu vergessen..."];
quote_array["de"][""] = ["Perfekt ist das Leben nie. Aber es gibt Menschen, die es perfekt machen."];
quote_array["de"][""] = ["Hat das Blümchen einen knick, war der Schmetterling zu dick."];
quote_array["de"][""] = ["Für bestimmte Menschen gehe ich bis ans Ende der Wel! Für andere, nicht mal ans Telefon..."];
quote_array["de"][""] = ["Das ist aber ganz schön viel Meinung für so wenig Ahnung."];
quote_array["de"][""] = ["habe keinen Bock mehr. bin zaubern."];
quote_array["de"][""] = ["Alle verrückt hier. Komm Einhorn, wir gehen."];
quote_array["de"][""] = ["Wahre Prinzen töten für dich keinen Drachen, sondern lieben dich, wenn du mal einer bist."];
quote_array["de"][""] = ["Ich schnarche nicht Ich schnure"];
quote_array["de"][""] = ["Ich könnte jetzt wirklich dringend einen Zauberstab gebrauchen."];
quote_array["de"][""] = ["Falls jemand zu dir sagt, das geht nicht, denk daran, es sind seine Grenzen, nicht deine."];
quote_array["de"][""] = ["Eine Hütte, in der man lacht, ist besser als ein Palast, in dem man weint."];
quote_array["de"]["Einstein"] = ["Die besten Dinge im Leben sind nicht die, für die man Geld bekommt."];
quote_array["de"][""] = ["Wenn eine Schraube locker ist, hat das Leben etwas Speil."];
quote_array["de"][""] = ["Die schönsten Erinnerungen sammelt man immer zu zweit."];
quote_array["de"][""] = ["Das sind keine Stirnfalten. Das ist ein Sixpack vom Denken."];
quote_array["de"][""] = ["Auf dem Boder der Tatsachen liegt eindeutig zu wenig Glitzer."];
quote_array["de"][""] = ["Heute ist mein Lieblingstag"];
quote_array["de"][""] = ["Läuft bei mir. Zwar rückwärts. Und bergab. Aber läuft."];
quote_array["de"][""] = ["Der Strand hat angerufen und gefragt wor ihr bleibt!?"];
quote_array["de"][""] = ["vielleicht wird alles vielleichter"];
quote_array["de"][""] = ["Falls ihr mich sucht, ich bin etwas zu weit gegangen."];
quote_array["de"][""] = ["Ein Leben ohne Kekse ist zwar möglich aber sinnlos."];
quote_array["de"][""] = ["Schön, dass es dich gibt"];
quote_array["de"][""] = ["Ich würde dich auch umarmen, wenn du ein Kaktus wärst und ich ein Luftballon."];
quote_array["de"][""] = ["Schuhe sind Rudeltiere"];
quote_array["de"][""] = ["Lachen ist die schönste Sprache der Welt"];
quote_array["de"][""] = ["Träume nicht dein Leben. Lebe deinen Traum!"];
quote_array["de"][""] = ["Hinfallen, aufstehen, Krone richten, weitergehen"];
quote_array["de"][""] = ["Die Pflicht ruft! Sag ihr ich rufe sie zurück."];
quote_array["de"][""] = ["Lesen gefährdet die Dummheit"];
quote_array["de"][""] = ["Not Your Ernst."];
quote_array["de"][""] = ["Ich bin gerade wie ich bin, weil ich mich genau jetzt so brauche."];
quote_array["de"][""] = ["Mein Wunsch ist es nicht, perfekt zu sein, sondern gut genug für dich."];
quote_array["de"][""] = ["Du willst wissen, in wen ich mich verliebt habe? Dann lies das erste Wort nochmals..."];
quote_array["de"][""] = ["Deine Ecken passen gut zu meinen Kanten."];
quote_array["de"][""] = ["Glück findest du nicht, wenn du es suchst, sondern wenn du zulässt dass es DICH findet..."];
quote_array["de"][""] = ["Du bist nicht alles, aber ohne dich ist alles nichts."];
*/

function randomKey(obj) {
    var ret;
    var c = 0;
    for (var key in obj)
        if (Math.random() < 1/++c)
           ret = key;
    return ret;
}

function is_empty(check_var)
{
if(check_var == "null" || check_var == null || check_var == "" || check_var == false || check_var == "false"){return true;}
else{return false;}
}




var showDialog = function (id) {document.getElementById(id).show();};
var hideDialog = function (id) {document.getElementById(id).hide();};