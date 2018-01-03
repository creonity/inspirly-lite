//Positionierung von Camerabild ist falsch

//Set parameters
var version = "1.0L";
var default_lang = "en";
//window.localStorage.setItem("autolinebreak", "true");
window.localStorage.setItem("mood", 0);
window.localStorage.setItem("sleeptime", 500);
window.localStorage.setItem("autolinebreak",true);
window.localStorage.setItem("user_data",'{"0":{},"1":{"text_content":"lorem","zindex":"1","autolinebreak":true}}');
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
var ak_image_nr_collection = 0;
var last_image_nr = -1;
var ak_image_nr_show;
var image_url_old;
var canvas;
var text_img;
var from_setting;
var tutorial_shown;
var fabric_last_obj;
var ak_layer_id;
var $collectionGrid;
var collection_size =1;
var collectionItemsShown;
var next_image_nr;
var print_w = {};
var image_width = $(window).width();
var streak=1;

//effects
var particles = [];
var pool = [];
var MAX_PARTICLES = 280;
var COLOURS = [ '#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423' ];
var swipe_effect;




ons.disableAutoStyling();
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


function check_option(button_id,canvas_object)
{

$("#"+button_id).toggleClass("active");
if($("#"+button_id).hasClass("active")){window.localStorage.setItem(button_id, 1);}
else{window.localStorage.setItem(button_id, 0);}
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











//Init Script
$(document).on("init", function( event ) {
var page = event.target;

if (page.matches("#language")) {if(window.localStorage.getItem("locale")){locale=window.localStorage.getItem("locale");document.querySelector('#myNavigator').pushPage('rand_img.html')}}

//Language
//if (page.matches("#image")) {ko.cleanNode(document.getElementById("image"));ko.applyBindings(languageModel,document.getElementById("image"));}
if (page.matches("#about")) {ko.applyBindings(languageModel,document.getElementById("about"));}
if (page.matches("#settings")) {ko.applyBindings(languageModel,document.getElementById("settings"));}
if (page.matches("#language")) {ko.applyBindings(languageModel,document.getElementById("language"));}
if (page.matches("#share")) {ko.applyBindings(languageModel,document.getElementById("share"));}
if (page.matches("#mood")) {ko.applyBindings(languageModel,document.getElementById("mood"));}


if (page.matches("#image")) {
window.localStorage.setItem("user_data",'{"0":{},"1":{"zindex":"1","autolinebreak":true}}');
set_user_data(1,"text_content",get_text(true));

//$(".option_buttons").on("click",function(){console.log("click");check_option(this.id, canvas.getActiveObject());});



canvas = new fabric.Canvas('c', {stopContextMenu: true, selection: false, hoverCursor: 'pointer'});
canvas.setHeight($(window).width());
canvas.setWidth($(window).width());
if(!tutorial_shown){$(".tutorial").show();}tutorial_shown = 1;
getQuote();show_image(0);

$("#detect-area").css("height", $(window).width());
//$("#btn_create_random").on("click", function(){show_image();});
//$("#btn_create_random_history").on("click", function(){show_image(true);});
//$("#btn_image_menu").on("click", function(){create_random($("#user_txt").val());});

//$("#download_image").on('tap', change_textimage_handler);
//$(".page__background").on('tap', change_textimage_handler_off);



$("#search_pic").on("click",function(){if(typeof cordova !== 'undefined'){cordova.plugins.Keyboard.show();}});
$("#search_pic").keyup(function(event){if(event.keyCode == 13){if(typeof cordova !== 'undefined'){cordova.plugins.Keyboard.close();};search_pic($("#search_pic").val());}});
}



if (page.matches("#share")) {create_banner();hide_menus();}
//Add text

//if (page.matches("#language")) {getQuote(true);show_image();}






//hide_text_img();

/*
if (page.matches("#usr_text_input")) {
//add switch
$("#autolinebreak_switch").on('change','#autolinebreak',function(){
window.localStorage.setItem("autolinebreak", $("#autolinebreak").children().is(':checked'));
//refresh_preloaded(true);
});
}
*/




//Settings
if (page.matches("#settings")) {
//add quality switch
if(window.localStorage.getItem("preview_quality")=="true"){$("#preview_quality_switch").html("<ons-switch id='preview_quality' checked disable-auto-styling style='margin-left:0px'></ons-switch>");}
else{$("#preview_quality_switch").html("<ons-switch id='preview_quality' disable-auto-styling style='margin-left:0px'></ons-switch>");}
$("#preview_quality").on('change',function(){window.localStorage.setItem("preview_quality", $("#preview_quality").children().is(':checked'));refresh_preloaded();});

//add trainer switch
if(window.localStorage.getItem("trainer_mode")=="true"){$("#trainer_switch").html("<ons-switch id='trainer_mode' checked disable-auto-styling style='margin-left:0px'></ons-switch>");}
else{$("#trainer_switch").html("<ons-switch id='trainer_mode' disable-auto-styling style='margin-left:0px'></ons-switch>");}
$("#trainer_mode").on('change',function(){window.localStorage.setItem("trainer_mode", $("#trainer_mode").children().is(':checked'));});
}

});


$(document).on("show", function( event ) {
busy = false;
var page = event.target;


//Language
if (page.matches("#image")) {ko.cleanNode(document.getElementById("image"));ko.applyBindings(languageModel,document.getElementById("image"));}
//if (page.matches("#about")) {ko.cleanNode(document.getElementById("about"));ko.applyBindings(languageModel,document.getElementById("about"));}
//if (page.matches("#settings")) {ko.cleanNode(document.getElementById("settings"));ko.applyBindings(languageModel,document.getElementById("settings"));}
//if (page.matches("#language")) {ko.cleanNode(document.getElementById("language"));ko.applyBindings(languageModel,document.getElementById("language"));}
//if (page.matches("#share")) {ko.cleanNode(document.getElementById("share"));ko.applyBindings(languageModel,document.getElementById("share"));}

//if (page.matches("#mySplitter") && init_once == 0) {ko.applyBindings(languageModel,document.getElementById("mySplitter"));init_once=1;}
//if (page.matches("#create")) {ko.applyBindings(languageModel,document.getElementById("create"));error_connection_txt = $("#error_connection_txt").html();$("#create").on("prehide", function(){$("#btn_options").removeClass("create_btn_active");});}
//if (page.matches("#mood")) {ko.applyBindings(languageModel,document.getElementById("mood"));}
//if (page.matches("#usr_text_input")) {ko.applyBindings(languageModel,document.getElementById("usr_text_input"));$("#user_txt").val(window.localStorage.getItem("current_text"));}


if (page.matches("#image")) {

//Handlers
$("#new_image").on('click', function(){document.querySelector('#myNavigator').pushPage('mood.html');});
$(".option_btn").on('click', function(){hide_sub_menus();});
$("#font_fixed").on('click', font_fixed_handler);
$("#font_text").on('click', text_option_handler);
$("#font_filling, #image_filling").on('click', filling_option_handler);
$("#add_font").on("click", add_font_handler);
$("#font_delete").on("click", font_delete_handler);
$("#image_fixed").on('click', image_fixed_handler);
$(".tutorial").on('click', function(e){
console.log("click_tutorial");
//e.stopPropagation();
$(".tutorial").fadeOut();});

canvas.off('mouse:up');
canvas.on({'mouse:up' : function(e) {if(canvas.getActiveObject()){show_text_img(canvas.getActiveObject());};}});
canvas.off('selection:updated');
canvas.on({'selection:updated' : function() {hide_text_img(ak_image_nr);}});
canvas.off('selection:cleared');
canvas.on({'selection:cleared' : function() {hide_text_img(ak_image_nr);}});



$("#btn_favorite").on('click',function(e){e.stopPropagation();shareImg();});


//$(".sketch").on("click",function(e){$(".tutorial").trigger("click",[e]);$("#c").trigger("click",[e]);})

if($("#collection_wrapper").is(":visible"))
{
$("#collection_wrapper").off('pinchin');
$("#collection_wrapper").off('swipeleft');
$("#collection_wrapper").off('swiperight');
$("#collection_wrapper").on('pinchin', pinchinhandler);
$("#collection_wrapper").on('swipeleft', swipeleftcollectionhandler);
$("#collection_wrapper").on('swiperight', swiperightcollectionhandler);
}

//if(from_setting==1){show_image(1);from_setting=0;}

if(window.localStorage.getItem("trainer_mode")=="true"){$("#trainer_mode_ui").show();}else{$("#trainer_mode_ui").hide();}
if(typeof AdMob !== 'undefined'){AdMob.removeBanner();create_bannerAd();}
//show_image(0);
//update_checkboxes();

}
/*
if (page.matches("#usr_text_input")) {
if(window.localStorage.getItem("autolinebreak")=="true"){$("#autolinebreak_switch").html("<ons-switch id='autolinebreak' checked disable-auto-styling style='margin-left:0px'></ons-switch>");}
else{$("#autolinebreak_switch").html("<ons-switch id='autolinebreak' disable-auto-styling style='margin-left:0px'></ons-switch>");}


$("#user_txt").on("click",function(){if(typeof cordova !== 'undefined'){cordova.plugins.Keyboard.show();}});
$("#user_txt").on("blur",function(){window.localStorage.setItem('current_text', this.value);delete_history();if(typeof cordova !== 'undefined'){cordova.plugins.Keyboard.close();}});
if(typeof AdMob !== 'undefined'){AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);}}
*/

if (page.matches("#mood")) {
$container = $('#templates_area').masonry({itemSelector: '.img_preview', columnWidth: 1});
if(typeof cordova !== 'undefined'){show_favorites_from_folder();}
$container = $('#moddsets_area').masonry({itemSelector: '.mood_preview', columnWidth: 1});
show_mood_sets();

$("#mood").on("click",".mood_preview", function(){new_image($(this).attr("data-moodset"));})
}





//$(".mood-item").removeClass("active");
//$(".mood-item").each(function(index){if($(this).attr("value")==window.localStorage.getItem("mood")){$(this).addClass("active");}});
//if(typeof AdMob !== 'undefined'){AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
//}



if (page.matches("#image")) {
$("#crop_image_area").css("height",$(".page__content").height());
$("#upload_loader").css("height",$(".page__content").height());
$container = $('#image_area').masonry({itemSelector: '.img_preview', columnWidth: 1});
//show_images_from_folder();
}

//if (page.matches("#settings")){from_setting=1;}
//if (page.matches("#image")){from_setting=1;}
})


$(document).on("hide", function( event ) {
var page = event.target;

//if (page.matches("#image")) {
//show_loader(true);
//$("#user_txt").val(window.localStorage.getItem('current_text'));}

//if (page.matches("#usr_text_input") || page.matches("#mood")) {refresh_preloaded(true);}
//if (page.matches("#usr_text_input")) {refresh_preloaded(true);}

if (page.matches("#share")) {$("#print_products").hide();}
if(typeof AdMob !== 'undefined'){AdMob.hideBanner();}
//if (page.matches("#own_image")) {$('#image_area').masonry('destroy');}
})



var font_fixed_handler = function(event) {
ak_image_nr_collection = ak_image_nr;
var user_data = JSON.parse(window.localStorage.getItem("user_data"));
var ak_layer_id = canvas.getActiveObject()["layer_id"];
$("#font_fixed").toggleClass("active");
if($("#font_fixed").hasClass("active"))
{
user_data[ak_layer_id]["fixed"]=1;
ons.notification.toast({message: "Font style fixed", timeout: 500});
}
else
{
user_data[ak_layer_id]["fixed"]=0;
ons.notification.toast({message: "Font style unfixed", timeout: 500});
}
delete image_chain[ak_image_nr_show+1];
window.localStorage.setItem("user_data",JSON.stringify(user_data));
hide_text_img();
}


var image_fixed_handler = function(event) {
ak_image_nr_collection = ak_image_nr;
var user_data = JSON.parse(window.localStorage.getItem("user_data"));
$("#image_fixed").toggleClass("active");
if($("#image_fixed").hasClass("active"))
{
user_data[0]["fixed"]=1;
ons.notification.toast({message: "Image style fixed", timeout: 500});
}
else
{
user_data[0]["fixed"]=0;
ons.notification.toast({message: "Image style unfixed", timeout: 500});
}
delete image_chain[ak_image_nr_show+1];
window.localStorage.setItem("user_data",JSON.stringify(user_data));
hide_text_img(ak_image_nr_show);
}


var text_option_handler = function(event) {show_text_input();}
var filling_option_handler = function(event) {show_filling_input();}
var add_font_handler = function(event) {add_font();}
var font_delete_handler = function(event) {font_delete();}


var select_canvas_handler = function(event) {
console.log("click_canvas");
$("#image_options").toggle();
if(!$("#image_options").is(":visible")){hide_menus();}else{$("#trainer_mode_ui").hide();}

//else{show_image_options();}
}




function new_image(moodset)
{
window.localStorage.setItem("user_data",'{"0":{},"1":{"zindex":"1"}}');
set_user_data(1,"text_content",get_text(true));
window.localStorage.setItem("mood",moodset);
refresh_preloaded(true);
hide_menus();
document.querySelector('#myNavigator').popPage();
}


function set_user_data(layer_id,user_data_key,user_data_value)
{
var user_data = JSON.parse(window.localStorage.getItem("user_data"));
if(!user_data[layer_id]){user_data[layer_id] = {};}
user_data[layer_id][user_data_key]=user_data_value;
window.localStorage.setItem("user_data",JSON.stringify(user_data));
}

function get_user_data(layer_id,user_data_key)
{
var user_data = JSON.parse(window.localStorage.getItem("user_data"));
if(!user_data[layer_id]){return false;}
return user_data[layer_id][user_data_key];
}

function add_font()
{

var code_array = JSON.parse(image_chain[ak_image_nr_show]["code"]);
highest_layer_id = 0;
for (var key in code_array["layers"]) {if(code_array["layers"][key]["layer_id"]>highest_layer_id){highest_layer_id=code_array["layers"][key]["layer_id"];}}
new_layer_id = highest_layer_id+1;
set_user_data(new_layer_id,"text_content",get_text(true));
set_user_data(new_layer_id,"zindex",canvas.getObjects().length+1);
update_zindex();
window.localStorage.setItem("textimagechange",1);
hide_text_img();
refresh_preloaded(true);
}

function font_delete()
{
var user_data = JSON.parse(window.localStorage.getItem("user_data"));
var ak_layer_id = canvas.getActiveObject()["layer_id"];
var code_array = JSON.parse(image_chain[ak_image_nr_show]["code"]);
delete user_data[ak_layer_id];
//delete code_array["layers"].splice(ak_layer_id,1);
//window.localStorage.setItem(image_chain[ak_image_nr_show]["code"],JSON.stringify(code_array));
image_chain[ak_image_nr_show]["code"] = JSON.stringify(code_array);
if(Object.keys(user_data).length<=1){
getQuote(true);
user_data[1] = {};
user_data[1]["text_content"]=get_text(true);
user_data[1]["zindex"]=1;
}


window.localStorage.setItem("user_data",JSON.stringify(user_data));
window.localStorage.setItem("textimagechange",1);

hide_text_img();
refresh_preloaded(true);
}

function update_zindex()
{
var user_data = JSON.parse(window.localStorage.getItem("user_data"));
var all_layers = canvas.getObjects();
for(var key in all_layers)
{
user_data[all_layers[key]["layer_id"]]["zindex"]= all_layers.indexOf(all_layers[key])+1;
}
window.localStorage.setItem("user_data",JSON.stringify(user_data));
}


function resetImage()
{
var user_data = JSON.parse(window.localStorage.getItem("user_data"));
if(canvas.getActiveObject()){var ak_layer_id = canvas.getActiveObject()["layer_id"];}else{var ak_layer_id = 0;}
delete user_data[ak_layer_id]["cropdata"];
delete user_data[ak_layer_id]["image"];
window.localStorage.setItem("user_data",JSON.stringify(user_data));
ons.notification.toast({message: "Image removed", timeout: 500});
refresh_preloaded(true);hide_text_img();
}

function shareImg()
{
document.querySelector('#myNavigator').pushPage('share.html');
download_cache();

if(window.localStorage.getItem("current_banner_image")!=window.localStorage.getItem("current_image"))
{
addFavorite();
ons.notification.toast({message: "Image added to your personal favorites", timeout: 4000});
}
}


function show_loader(loader,block)
{
if(loader){$(".loader").show();$("#download_image_holder").fadeOut(200);busy=block;
//if(canvas._objects){if(canvas._objects.length>0){canvas.dispose();}}
}
else{$("#btn_favorite").removeClass("create_btn_active");$("#download_image_holder").fadeIn(500,function(){$(".loader").hide();busy=false;})}
}














//Collection Feature
async function createCollection(size)
{
canvas.clear();
collectionItemsShown=0;

//if(!$collectionGrid)
//{
$collectionGrid = $('#collection_area').masonry({
  itemSelector: '.collection_img',
});

$collectionGrid.on( 'removeComplete',
  function( event, removedItems ) {
    console.log( 'Removed ' + removedItems.length + ' items' );
  }
);
//}
$("#collection_wrapper").show();
$("#collection_wrapper").off('swipeleft');
$("#collection_wrapper").off('swiperight');
var counter=0;
var total_elements = size*size;
var item_width = $(window).width()/size-($(window).width()*0.01);


$('.collection_img').animate({height:item_width+"px",width:item_width+"px"},50,function(){$collectionGrid.masonry('layout')})


while(counter <total_elements)
{
if(!image_chain[ak_image_nr_collection+counter])
{
await sleep(50);
}
create_collection_item(ak_image_nr_collection+counter,item_width);
counter=counter+1;
}
}

function create_collection_item(image_nr,item_width)
{
if($("#collection_img_"+image_nr).length == 0)
{
var $content = $("<div class='collection_img' style='height:"+item_width+"px; width:"+item_width+"px' id='collection_img_"+image_nr+"'>");
$collectionGrid.append( $content ).masonry( 'appended', $content);
$collectionGrid.masonry();
//$collectionGrid.append( $content ).masonry( 'addItems', $content);
//$collectionGrid.masonry();
//$("collection_img_"+image_nr).addClass("flickr_img");
}
if(!image_chain[image_nr]){create_image(image_nr,image_chain[ak_image_nr]["code"],showCollectionItem,image_nr);}
else if(!image_chain[image_nr]["src"]){$("collection_img_"+image_nr).addClass("flickr_img");create_image(image_nr,image_chain[ak_image_nr]["code"],showCollectionItem,image_nr);}
else{
showCollectionItem(image_nr);}

}



function showCollectionItem(image_nr)
{
//var item_width = $("#collection_img_"+image_nr).width();
//var item_top = $("#collection_img_"+image_nr).position().top;
//var item_left= $("#collection_img_"+image_nr).position().left;
//$("#collection_img_"+image_nr).removeClass("flickr_img");
//$("#collection_img_"+image_nr).removeAttr("style").width(item_width).height(item_width).css({ top: item_top+'px', left: item_left+'px' });
$("#collection_img_"+image_nr).css("background-image", "url("+image_chain[image_nr]["src"]+")");
$("#collection_img_"+image_nr).off("click");
$("#collection_img_"+image_nr).on("click",function(){clickCollectionItem(image_nr);});


collectionItemsShown = collectionItemsShown+1;

//attach pinch handler, when all items shown
if(collectionItemsShown == collection_size*collection_size)
{
next_image_nr=ak_image_nr_collection+collectionItemsShown;
$("#collection_wrapper").off('pinchin');
$("#collection_wrapper").off('swipeleft');
$("#collection_wrapper").off('swiperight');
$("#collection_wrapper").on('pinchin', pinchinhandler);
$("#collection_wrapper").on('swipeleft', swipeleftcollectionhandler);
$("#collection_wrapper").on('swiperight', swiperightcollectionhandler);
}
}

function clickCollectionItem(image_nr)
{
fullsize_image(image_nr);
$("#collection_wrapper").off('pinchin');
$("#collection_wrapper").off('swipeleft');
$("#collection_wrapper").off('swiperight');
//$collectionGrid.masonry( 'remove', $(".collection_img") );
$collectionGrid.masonry('destroy');
$("#collection_area").html("");
$("#collection_wrapper").hide();
collection_size=collection_size-1;
}

var swipeleftcollectionhandler = function(event) {
$collectionGrid.masonry('destroy');
$("#collection_area").html("");
ak_image_nr_collection=next_image_nr;
console.log(ak_image_nr_collection);
createCollection(collection_size)}

var swiperightcollectionhandler = function(event) {
$collectionGrid.masonry('destroy');
$("#collection_area").html("");
ak_image_nr_collection=ak_image_nr_collection-(collection_size*collection_size);
console.log(ak_image_nr_collection);
createCollection(collection_size)}







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


function show_mood_sets()
{
var mood_images = ["0","1","2","3"];
$container.masonry( 'remove',$(".img_preview")).masonry('layout');
$( function() {var $items = getMoodsLocal(mood_images);
$container.masonryImagesReveal( $items );});
}

function getMoodsLocal(mood_images) {
var items = '';
$.each(mood_images, function(index, value) {

var item = "<div data-moodset='"+value+"' class='mood_preview img_preview' style='background-image: url(img/moods/"+value+".jpg); height:"+$(window).width()/3+"px;'></div>";
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
   // var height = $(window).height()-$("#toparea").height()-$(".toolbar").height()-$(".ons-tabbar__footer").height()-10;
   // $('#image_area').css("height", height);
  });
  return this;
};



function show_crop()
{
console.log("show crop");
$(".pixabay").remove();


$("#image_to_crop").attr("src",window.localStorage.getItem("user_img_local"));
$('#image_to_crop').imagesLoaded( function() {
$("#upload_loader_wrapper").fadeOut();
})
$("#crop_canvas_wrapper").css("height", $(window).width());
$("#crop_wrapper").show();


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
var new_left = Math.round((new_width/2)-(crop_data.x*stretch_factor_width));
var new_top = Math.round((new_height/2)-(crop_data.y*stretch_factor_height));
window.localStorage.setItem("crop_image", JSON.stringify({"width":new_width,"height":new_height,"left":new_left,"top":new_top}));
//refresh_preloaded(true);


var user_data = JSON.parse(window.localStorage.getItem("user_data"));
if(canvas.getActiveObject()){var ak_layer_id = canvas.getActiveObject()["layer_id"];}else{var ak_layer_id = 0;}
user_data[ak_layer_id]["cropdata"]={"width":new_width,"height":new_height,"left":new_left,"top":new_top};
user_data[ak_layer_id]["image"] = window.localStorage.getItem("user_img");
window.localStorage.setItem("user_data",JSON.stringify(user_data));

if(ak_layer_id>0){applyChanges(ak_layer_id);}
else
{
window.localStorage.setItem("textimagechange",1);
refresh_preloaded(true);hide_menus();
}

$('#crop_wrapper').hide();$('#image_to_crop').cropper('destroy');
$('image_to_crop').attr('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABA‌​AACAUwAOw==');
//document.getElementById("tabbar").setActiveTab("btn_image_menu", {});
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

//window.localStorage.setItem('current_text', $("#user_txt").val());
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
console.log("show_image");
if(busy && image_change==1){console.log("busy");return;}
ak_image_nr = ak_image_nr + image_change;
//if(ak_image_nr<0){ak_image_nr=0}
if(ak_image_nr_show != ak_image_nr){
if(last_image_nr>=0){image_chain[last_image_nr]["time_hidden"] = Date.now();
//if(canvas._objects){if(canvas._objects.length>0){
//console.log("show it");hide_text_img();
//canvas.deactivateAll();
//var disposed = canvas.dispose();console.log("dispose"+disposed);
//}}
focus_array[image_chain[last_image_nr]["image_id"]] = image_chain[last_image_nr]["time_hidden"]-image_chain[last_image_nr]["time_shown"]; }

show_loader(true,true);
await sleep(window.localStorage.getItem("sleeptime"));
}
if(!image_chain[ak_image_nr]){
var code = "{}";
if(image_chain[ak_image_nr-1]){if(image_chain[ak_image_nr-1]["code"]){code = image_chain[ak_image_nr-1]["code"];}}
create_image(ak_image_nr,code,show_image,0);return;}
if(!image_chain[ak_image_nr]["src"]){
$( "#myNavigator").off("loaded_img_src");
$( "#myNavigator").on("loaded_img_src",function(e,image_nr){
if(image_nr==ak_image_nr && $("#c").is(":visible")){collection_size=1;ak_image_nr_collection = ak_image_nr;fullsize_image(ak_image_nr);}});
return;}
if(ak_image_nr==last_image_nr){return;}
collection_size=1;
ak_image_nr_collection = ak_image_nr;
fullsize_image(ak_image_nr)
}

function fullsize_image(image_nr)
{
ak_image_nr = image_nr;
$('<img>').attr('src', image_chain[ak_image_nr]["src"]).imagesLoaded( {"image_nr":ak_image_nr}, function() {
 image_chain[this.options.image_nr]["loaded"]=true;
 if(this.options.image_nr == ak_image_nr){$("#download_image").html("<img style='width: 100%; height:"+$(window).width()+"px;' src='"+image_chain[ak_image_nr]["src"]+"'>");
 add_text_image(image_chain[ak_image_nr]["text_image"]);
 image_chain[ak_image_nr]["time_shown"] = Date.now();
 last_image_nr= ak_image_nr;
 }
show_loader(false);
$("#best_guess").html(image_chain[ak_image_nr]["best_guess"]+"%");
$("#time_calculated").html("("+Math.round(image_chain[ak_image_nr]["performance_calculation"]/100)/10+"s)");
$("#time_loaded").html("("+Math.round(image_chain[ak_image_nr]["performance_loaded"]/100)/10+"s)");
$("#image_id").html(image_chain[image_nr]["image_id"]+" : ");
ak_image_nr_show = ak_image_nr;
window.localStorage.setItem("current_image",image_chain[ak_image_nr]["src"]);
window.localStorage.setItem("current_image_id",image_chain[ak_image_nr]["image_id"]);

console.log("fullsize");
image_handler(true);
});

//render preview
if(!image_chain[ak_image_nr+1]){create_image(ak_image_nr+1,image_chain[ak_image_nr]["code"],false,false);}
}



function rate_image(image_nr, rating)
{
if(image_chain[image_nr-1])
{
if(image_chain[image_nr-1]["rating"]==5 && rating==5){if(streak<9){streak=streak + 2;}}
else{streak=1;}
}
image_chain[image_nr]["rating"]=rating;    
rating_array[image_chain[image_nr]["image_id"]] = rating; 
}


          



var pinchinhandler = function(event) {$("#detect-area").off('pinchin');$("#collection_wrapper").off('pinchin');collection_size=collection_size+1;createCollection(collection_size);$(".tutorial").fadeOut();}
var swipelefthandler = function(event) {canvas.discardActiveObject();show_image(1);$(".tutorial").fadeOut();}
var swiperighthandler = function(event) {canvas.discardActiveObject();rate_image(ak_image_nr_show,3);show_image(-1);$(".tutorial").fadeOut();}
var swipeuphandler = function(event) {canvas.discardActiveObject();rate_image(ak_image_nr_show,5);show_image(1);}
var swipedownhandler = function(event) {canvas.discardActiveObject();rate_image(ak_image_nr_show,1);show_image(1);}
//var holdhandler = function(event) {event = $.Event('touchmove');$(".sketch").trigger(event);}

function image_handler(attach)
{
if(attach)
{
//$(".sketch").on('touchmove',function(event){event.stopPropagation();console.log("mousemove");})
$("#detect-area").off('click');
$("#detect-area").on('click', select_canvas_handler);
$("#detect-area").off('pinchin');
$("#detect-area").on('pinchin', pinchinhandler);
$("#detect-area").off('swipeleft');
$("#detect-area").on('swipeleft', swipelefthandler);
$("#detect-area").off('swiperight');
$("#detect-area").on('swiperight', swiperighthandler);
$("#detect-area").off('swipeup');
$("#detect-area").on('swipeup', swipeuphandler);
$("#detect-area").off('swipedown');
$("#detect-area").on('swipedown', swipedownhandler);
//$("#detect-area").off('drag');
//$("#detect-area").on('drag', holdhandler);

if (!$( ".sketch" ).length){
console.log("sketch attached");
swipe_effect = Sketch.create({container: document.getElementsByClassName( 'canvas-container' )[0],interval:1,eventTarget:document.getElementsByClassName( 'upper-canvas' )[0]});
$(".sketch").attr("height",$(window).width()+"px");
$(".sketch").prev().insertAfter($(".sketch"));
add_effect();
}
else
{
swipe_effect.start();
}
}
else
{
swipe_effect.stop();
$("#detect-area").off('click');
$("#detect-area").off('swipeleft');
$("#detect-area").off('pinchin');
$("#detect-area").off('swiperight');
$("#detect-area").off('swipedown');
$("#detect-area").off('swipeup');
}
}


//var change_textimage_handler = function(event) {console.log("on");event.stopPropagation();
//add_text_image(image_chain[ak_image_nr]["text_image"]);
//}
//var change_textimage_handler_off = function(event) {console.log("off");remove_text_image();}


function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms));}


function refresh_preloaded(all_new)
{
//window.localStorage.removeItem("preloaded_code");
//window.localStorage.removeItem("preloaded_image");
//Preload next image with new settings


for (var key in image_chain) {
if(key>ak_image_nr_show){delete image_chain[key];}
}


if(all_new){
//window.localStorage.removeItem("code");
//window.localStorage.removeItem("current_image");
show_image(1);
}
else{create_image(ak_image_nr_show+1,image_chain[ak_image_nr_show]["code"],false,false);}
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
function create_image(image_nr,code,callback,callbackvar)
{
hide_menus();
if(image_chain[image_nr]){if(image_chain[image_nr]["src"]){if(callback){callback(callbackvar);}return;}}

//analytics
//if(typeof ga !== 'undefined'){window.ga.trackEvent('Image', 'Create Image');}
//Textinput
//user_txt = get_text();
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

//if(image_chain[ak_image_nr_show]){var code = image_chain[ak_image_nr_show]["code"];}else{var code = "{}";}
//var code = false;
//if(image_chain[image_nr-1]){if(image_chain[image_nr-1]["code"]){var code = image_chain[image_nr-1]["code"];}}
//if(!code && image_chain[ak_image_nr]){if(image_chain[ak_image_nr]["code"]){var code = image_chain[ak_image_nr]["code"];}}else{var code = "{}";}


//Render new image
//var datatosend = "template_id="+window.localStorage.getItem("template_id")+"&user_data="+window.localStorage.getItem("user_data")+"&code="+code+"&crop_image="+window.localStorage.getItem("crop_image")+"&performance_calculated="+duration_calculated_str+"&performance_loaded="+duration_loaded_str+"&focus="+focus_str+"&rating="+rating_str+"&version="+version+"&language="+language+"&device_id="+device_id+"&template="+history+"&mood="+window.localStorage.getItem("mood")+"&preview_quality="+window.localStorage.getItem("preview_quality")+"&user_img="+window.localStorage.getItem("user_img")+"&textimagechange="+window.localStorage.getItem("textimagechange")+"&fontfilling="+window.localStorage.getItem("fontfilling")+"&frame="+window.localStorage.getItem("frame")+"&font="+window.localStorage.getItem("font")+"&background="+window.localStorage.getItem("background")+"&texture="+window.localStorage.getItem("texture")+"&fontsize="+window.localStorage.getItem("fontsize");
var datatosend = "template_id="+window.localStorage.getItem("template_id")+"&user_data="+window.localStorage.getItem("user_data")+"&code="+code+"&performance_calculated="+duration_calculated_str+"&performance_loaded="+duration_loaded_str+"&focus="+focus_str+"&rating="+rating_str+"&version="+version+"&language="+language+"&device_id="+device_id+"&template="+history+"&mood="+window.localStorage.getItem("mood")+"&preview_quality="+window.localStorage.getItem("preview_quality")+"&user_img="+window.localStorage.getItem("user_img")+"&textimagechange="+window.localStorage.getItem("textimagechange")+"&fontfilling="+window.localStorage.getItem("fontfilling")+"&frame="+window.localStorage.getItem("frame")+"&font="+window.localStorage.getItem("font")+"&background="+window.localStorage.getItem("background")+"&texture="+window.localStorage.getItem("texture")+"&fontsize="+window.localStorage.getItem("fontsize");
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
        var code = [];code["layers"] = [];code["layers"][1]=[];
        //code.layers[1].text_content =window.localStorage.getItem('current_text');
    }



 //add information to chain
if(data.error){busy=false;
    //ons.notification.alert(data.error);
    image_chain[image_nr]["src"]= "http://placehold.it/476x288/eb356c/ffffff?text="+encodeURI(data.error);}
else{
image_chain[image_nr]["src"]=data.image_url;
$( "#myNavigator").trigger( "loaded_img_src",[image_nr] );

console.log(data.debug_script);
image_chain[image_nr]["text_image"]=[];

data.text_img = JSON.parse(data.text_img);
for (var key in data.text_img) {
if(data.text_img[key]["text_src"]==null){continue;}
image_chain[image_nr]["text_image"][key]=[];
image_chain[image_nr]["text_image"][key]["src"]=data.text_img[key]["text_src"];
ImageTracer.imageToSVG( image_chain[image_nr]["text_image"][key]["src"], function(svg){image_chain[image_nr]["text_image"][key]["svg"]=svg;}, 'Artistic3');
image_chain[image_nr]["text_image"][key]["left"]=data.text_img[key]["offset_left"];
image_chain[image_nr]["text_image"][key]["top"]=data.text_img[key]["offset_top"];
image_chain[image_nr]["text_image"][key]["width"]=data.text_img[key]["text_width"];
image_chain[image_nr]["text_image"][key]["height"]=data.text_img[key]["text_height"];
image_chain[image_nr]["text_image"][key]["rotation"]=data.text_img[key]["text_rotation"];
image_chain[image_nr]["text_image"][key]["layer_id"]=data.text_img[key]["layer_id"];
image_chain[image_nr]["text_image"][key]["text_content"]=data.text_img[key]["text_content"];

var user_data = JSON.parse(window.localStorage.getItem("user_data"));
if(!user_data[data.text_img[key]["layer_id"]]){user_data[data.text_img[key]["layer_id"]]={};}
if(data.text_img[key]["layer_id"]>0){user_data[data.text_img[key]["layer_id"]]["text_content"]=data.text_img[key]["text_content"];}
window.localStorage.setItem("user_data",JSON.stringify(user_data));
update_zindex();
}

//window.localStorage.setItem('current_text', code.layers[1].text_content);
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
//show_image(0);
$('<img>').attr('src', image_chain[image_nr]["src"]).imagesLoaded( {"image_nr":image_nr}, function() {
   image_chain[this.options.image_nr]["loaded"]=true;
   image_chain[this.options.image_nr]["performance_loaded"] = Date.now() - image_chain[this.options.image_nr]["time_sent"];
duration_loaded[data.image_id]=image_chain[image_nr]["performance_loaded"];
if(callback){callback(callbackvar);}
});
},
error: function (msg, textStatus, errorThrown) {ons.notification.alert(error_connection_txt);}
    });
}

function max_history()
{
    
}


function get_text(autolinebreak)
{
user_txt = $("#user_txt").val();
if(user_txt.length==0){user_txt = getQuote();}
str_length = user_txt.length;
if(autolinebreak==true)
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
console.log(data.debug_script);
  $("#download_progress").fadeOut(1000, function(){


  $("#download_prev").html("<img src='"+data.image_url+"'>");
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
if(typeof cordova !== 'undefined'){
//window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function (dirEntry) {
window.resolveLocalFileSystemURL('cdvfile://localhost/sdcard/Pictures/', function (dirEntry) {
//alert('cdvfile URI: ' + dirEntry.toInternalURL());
//The folder is created if doesn't exist
dirEntry.getDirectory( "inspirly",{create:true, exclusive: false},function(directory) {createFile(directory, File_Name, URL);},onErrorCreateDir);
//createFile(dirEntry, File_Name, URL);
}, onErrorLoadFs);
}else
{
$("#download_prev").show();
}
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

/*
function displayImageByFileURL(fileEntry) {
//make Preview
    var elem = document.getElementById('imageElement');
    elem.src = fileEntry.toURL();
}
*/

function share_by_platform(platform)
{
var share_options;
share_options = {
  message: $("#Created_with_inspirly ").html()+'#inspirly', // not supported on some apps (Facebook, Instagram)
  subject: $("#Get_inspired").html(), // fi. for email
  files: [image_chain[ak_image_nr]["prev_url_medium"]], // an array of filenames either locally or remotely
  url: 'https://www.inspir.ly',
  chooserTitle: $("#Pick_an_app").html() // Android only, you can override the default share sheet title
}

if(platform == "facebook"){window.plugins.socialsharing.shareViaFacebook($("#Created_with_inspirly").html()+' #inspirly',  image_chain[ak_image_nr]["prev_url_medium"], 'http://www.inspir.ly', function() {console.log('share ok')}, function(errormsg){showDialog('dialog-2');})}
if(platform == "instagram"){window.plugins.socialsharing.shareViaInstagram($("#Created_with_inspirly").html()+' #inspirly', image_chain[ak_image_nr]["prev_url_medium"], function() {console.log('share ok')}, function(errormsg){showDialog('dialog-2');})}
if(platform == "whatsapp"){window.plugins.socialsharing.shareViaWhatsApp($("#Created_with_inspirly").html()+' #inspirly', image_chain[ak_image_nr]["prev_url_medium"], 'http://www.inspir.ly', function() {console.log('share ok')}, function(errormsg){showDialog('dialog-2');})}
if(platform == "twitter"){window.plugins.socialsharing.shareViaTwitter($("#Created_with_inspirly").html()+' #inspirly', image_chain[ak_image_nr]["prev_url_medium"], 'http://www.inspir.ly', function() {console.log('share ok')}, function(errormsg){showDialog('dialog-2');})}
if(platform == "snapchat"){window.plugins.socialsharing.shareWithOptions(share_options, share_onSuccess, share_onError);}
if(platform == "other"){window.plugins.socialsharing.shareWithOptions(share_options, share_onSuccess, share_onError);}

var share_onSuccess = function(result) {
  console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
  console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
}
var share_onError = function(msg) {
ons.notification.alert("Sharing failed with message: " + msg);
}
}

function share(platform)
{
$( "#myNavigator").off("loaded_prev_medium");
if(image_chain[ak_image_nr]["prev_url_medium"])
{
$("#share_progress").fadeOut();
share_by_platform(platform);
}
else
{
$("#share_progress").fadeIn();
$(".share_btn").prop("disabled", true);
$( "#myNavigator").off("loaded_prev_medium");
$( "#myNavigator").on( "loaded_prev_medium", function(){
$("#share_progress").fadeOut();
$(".share_btn").prop("disabled", false);
share_by_platform(platform);
});
}
}

/*
function share(platform)
{
$("#share_progress").fadeIn();
$(".share_btn").prop("disabled", true);

var template_id = getTemplateId(window.localStorage.getItem("current_image"));
var datatosend = "code="+image_chain[ak_image_nr]["code"]+"&size=1600&template_id="+template_id+"&device_id="+device_id+"&share="+platform;

$.ajax({
  url: "https://www.inspir.ly/user_img/download.php",
  type: "POST",
  global: false,
  data: datatosend,
  success: function(msg, error) {
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
*/







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
if(typeof cordova !== 'undefined'){
window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dirEntry) {
//The folder is created if doesn't exist
dirEntry.getDirectory( "templates",{create:true, exclusive: false},function(directory) {addTemplate(directory, File_Name, URL);},onErrorCreateDir);
}, onErrorLoadFs);}
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
$("#print_products").html("<img id='print_prev' style='width:100%' src='"+data.image_url+"'>");
$("#print_prev").off("click");
$("#print_prev").on("click",function(){print_product();});
$("#print_products").fadeIn();
//});
window.localStorage.setItem("current_banner_image", window.localStorage.getItem("current_image"));
window.localStorage.setItem("current_banner_image_src", data.image_url);

//$("#current_banner_image").html($("#current_image").html());
},
error: function (msg, textStatus, errorThrown) {console.log("error: "+errorThrown);}
    });
}else{
$("#print_products").html("<img onclick='print_product()' style='width:100%' src='"+window.localStorage.getItem("current_banner_image_src")+"'>");
$("#print_products").show();}
}




function download_cache()
{
$("#print_progress").fadeIn();
//disable to click again on image
var eles = document.getElementsByTagName('img');
for (var i=0; i < eles.length; i++)
   eles[i].onclick = null;


var template_id = getTemplateId(window.localStorage.getItem("current_image"));
var datatosend = "code="+image_chain[ak_image_nr]["code"]+"&size=1600&template_id="+template_id+"&device_id="+device_id;
$.ajax({
  url: "https://www.inspir.ly/user_img/download.php",
  type: "POST",
  global: false,
  data: datatosend,
  success: function(msg, error) {
  var data = JSON.parse(msg);
console.log(data.debug_script);
image_chain[ak_image_nr]["prev_url_medium"] = data.image_url;
$( "#myNavigator").trigger( "loaded_prev_medium" );
},
error: function (msg, textStatus, errorThrown) {}
    });

var datatosend = "code="+image_chain[ak_image_nr]["code"]+"&size=3200&template_id="+template_id+"&device_id="+device_id;
$.ajax({
  url: "https://www.inspir.ly/user_img/download.php",
  type: "POST",
  global: false,
  data: datatosend,
  success: function(msg, error) {
  var data = JSON.parse(msg);
console.log(data.debug_script);
image_chain[ak_image_nr]["prev_url"] = data.image_url;
$( "#myNavigator").trigger( "loaded_prev" );
},
error: function (msg, textStatus, errorThrown) {}
    });

}

function print_product()
{
$( "#myNavigator").off("loaded_prev");
if(image_chain[ak_image_nr]["prev_url"])
{
//print_w[ak_image_nr] = window.open('', '_blank');
//print_w[ak_image_nr].document.write('Please be patient, while we render your image so you can print it in larger size. It shouldn\'t take longer than 20 seconds.');
//print_w[ak_image_nr].location.href = "http://www.zazzle.com/api/create/at-238761569768290129?rf=238761569768290129&ax=DesignBlast&cg=196340684027374117&sr=250134954166200634&image0="+encodeURI(image_chain[ak_image_nr]["prev_url"]);
window.open("http://www.zazzle.com/api/create/at-238761569768290129?rf=238761569768290129&ax=DesignBlast&cg=196340684027374117&sr=250134954166200634&image0="+encodeURI(image_chain[ak_image_nr]["prev_url"]));
}
else
{
//print_w[ak_image_nr] = window.open('', '_blank');
//print_w[ak_image_nr].document.write('Please be patient, while we render your image so you can print it in larger size. It shouldn\'t take longer than 20 seconds.');
$("#print_progress").fadeIn();
$("#print_prev").off("click");
$( "#myNavigator").off("loaded_prev");
$( "#myNavigator").on( "loaded_prev", function(){
$("#print_progress").fadeOut();
console.log("open");
//print_w[ak_image_nr].location.href = "http://www.zazzle.com/api/create/at-238761569768290129?rf=238761569768290129&ax=DesignBlast&cg=196340684027374117&sr=250134954166200634&image0="+encodeURI(image_chain[ak_image_nr]["prev_url"]);
window.open("http://www.zazzle.com/api/create/at-238761569768290129?rf=238761569768290129&ax=DesignBlast&cg=196340684027374117&sr=250134954166200634&image0="+encodeURI(image_chain[ak_image_nr]["prev_url"]));
$("#print_prev").off("click");
$("#print_prev").on("click",function(){print_product();});
});
}

}
/*
function print_product()
{
$("#print_progress").fadeIn();
//disable to click again on image
var eles = document.getElementsByTagName('img');
for (var i=0; i < eles.length; i++)
   eles[i].onclick = null;


var template_id = getTemplateId(window.localStorage.getItem("current_image"));
var datatosend = "code="+image_chain[ak_image_nr]["code"]+"&size=1600&template_id="+template_id+"&device_id="+device_id+"&print=1";

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
*/

function _getLocalImagePathWithoutPrefix(url) {
    if (url.indexOf('file:///') === 0) {
        return url.substring(7);
    }
    return url;
}



function add_text_image(text_image)
{

for (var key in text_image) {
if(text_image[key]["src"]!=null)
{
var scale_factor = $(window).width()/400;

if(!text_image[key]["svg"]){ImageTracer.imageToSVG( image_chain[image_nr]["text_image"][key]["src"], function(svg){image_chain[image_nr]["text_image"][key]["svg"]=svg;}, 'Sharp');}


fabric.loadSVGFromString(text_image[key]["svg"], function(objects, options) {
  var obj = fabric.util.groupSVGElements(objects, options);
  obj.scale(scale_factor);
  obj.crossOrigin = "Anonymous";
  obj.set({
"left": text_image[key]["left"]/400*$(window).width(),"layer_id":text_image[key]["layer_id"],"originY":"center","originX":"center","hasBorders":false,"hasControls":false,"hasRotatingPoint":false,"opacity":"0.01","padding":0,"cornersize":10, "width":text_image[key]["width"], "height":text_image[key]["height"], "angle":text_image[key]["rotation"],"top": text_image[key]["top"]/400*$(window).width()
  });
obj.perPixelTargetFind = true;
obj.targetFindTolerance = 20;
obj.hasControls = obj.hasBorders = false;
canvas.add(obj);
},false,{crossOrigin : "Anonymous"});




/*
   fabric.Image.fromURL(text_image[key]["src"], function(img) {
img.crossOrigin = "Anonymous";
      img.set({
        left: fabric.util.getRandomInt(0, 600),
        top: fabric.util.getRandomInt(0, 500),
        angle: fabric.util.getRandomInt(0, 90)
      });

      img.perPixelTargetFind = true;
      img.targetFindTolerance = 4;
      img.hasControls = img.hasBorders = false;

      img.scale(fabric.util.getRandomInt(50, 100) / 100);

      canvas.add(img);
    }, {crossOrigin : "Anonymous"});

*/
/*
fabric.Image.fromURL(text_image[key]["src"], function (img) {
    img.crossOrigin = "Anonymous";
    img.scale(scale_factor);
    img.perPixelTargetFind = true;
    img.targetFindTolerance = 4;
    canvas.add(img);
    canvas.renderAll();
  }, {"left": text_image[key]["left"]/400*$(window).width(),"layer_id":text_image[key]["layer_id"],"originY":"center","originX":"center","hasBorders":false,"hasControls":false,"hasRotatingPoint":false,"opacity":0,"padding":0,"cornersize":10, "width":text_image[key]["width"], "height":text_image[key]["height"], "angle":text_image[key]["rotation"],"top": text_image[key]["top"]/400*$(window).width()});

*/


}
}
}




/*
function remove_text_image(text_image)
{
console.log("remove");
hide_text_img();
}
*/

function applyChanges(ak_layer_id)
{
console.log("apply");
var code_array = JSON.parse(image_chain[ak_image_nr_show]["code"]);
var text_img = canvas.getActiveObject();



code_array["layers"][ak_layer_id]["layer_height"]=Math.round(text_img.getScaledHeight()/$(window).width()*400);
//code_array["layers"][ak_layer_id]["layer_height_user"]=code_array["layers"][1]["layer_height"];
code_array["layers"][ak_layer_id]["layer_width"]=Math.round(text_img.getScaledWidth()/$(window).width()*400);
//code_array["layers"][ak_layer_id]["layer_width_user"]=code_array["layers"][1]["layer_width"];
code_array["layers"][ak_layer_id]["layer_left"]=Math.round((text_img.getBoundingRect().left+(text_img.getBoundingRect().width/2))/$(window).width()*400);
//code_array["layers"][ak_layer_id]["layer_left_user"]=code_array["layers"][1]["layer_left"];
code_array["layers"][ak_layer_id]["layer_top"]=Math.round((text_img.getBoundingRect().top+(text_img.getBoundingRect().height/2))/$(window).width()*400);
//code_array["layers"][ak_layer_id]["layer_top_user"]=code_array["layers"][1]["layer_top"];
code_array["layers"][ak_layer_id]["layer_rotation"]=Math.round(text_img.angle);
//code_array["layers"][ak_layer_id]["layer_rotation_user"]=code_array["layers"][1]["layer_rotation"];
code_array["layers"][ak_layer_id]["layer_rotation_width"]=Math.round(text_img.getBoundingRect().width/$(window).width()*400);
//code_array["layers"][ak_layer_id]["layer_rotation_width_user"]=code_array["layers"][1]["layer_rotation_width"];
code_array["layers"][ak_layer_id]["layer_rotation_height"]=Math.round(text_img.getBoundingRect().height/$(window).width()*400);
//code_array["layers"][ak_layer_id]["layer_rotation_height_user"]=code_array["layers"][1]["layer_rotation_height"];
//code_array["layers"][ak_layer_id]["text_content"] = $("#user_txt").val();
//code_array["layers"][ak_layer_id]["filling_user"] = window.localStorage.getItem("user_img");
image_chain[ak_image_nr_show]["code"] = JSON.stringify(code_array);
window.localStorage.setItem("textimagechange",1);

var user_data = JSON.parse(window.localStorage.getItem("user_data"));
if(!user_data[ak_layer_id]){user_data[ak_layer_id]={};}
user_data[ak_layer_id]["text_content"]=get_text(user_data[ak_layer_id]["autolinebreak"]);
window.localStorage.setItem("user_data",JSON.stringify(user_data));

hide_text_img();
refresh_preloaded(true);
//$("#detect-area").on('swipeleft', swiepelefthandler);
//$("#detect-area").on('swiperight', swieperighthandler);


//canvas.dispose();
}


/*
function show_image_options()
{
$(".image_btn_options").show();
}

function hide_image_options()
{
$(".image_btn_options").hide();
}
*/

function show_text_input()
{
if(get_user_data(canvas.getActiveObject()["layer_id"],"autolinebreak")==true){$("#autolinebreak_switch").html("<ons-switch id='autolinebreak' checked disable-auto-styling style='margin-left:0px'></ons-switch>");}
else{$("#autolinebreak_switch").html("<ons-switch id='autolinebreak' disable-auto-styling style='margin-left:0px'></ons-switch>");}
$("#autolinebreak").on('change',function(){set_user_data(canvas.getActiveObject()["layer_id"],"autolinebreak",$("#autolinebreak").children().is(':checked'));});


$("#user_txt").on("click",function(){if(typeof cordova !== 'undefined'){cordova.plugins.Keyboard.show();}});
//$("#user_txt").on("blur",function(){window.localStorage.setItem('current_text', this.value);delete_history();if(typeof cordova !== 'undefined'){cordova.plugins.Keyboard.close();}});
$("#text_input").show();
$("#font_text").addClass("activeMenu");
}


function show_filling_input()
{
$("#crop_image_area").css("height",$(".page__content").height());
$("#upload_loader").css("height",$(".page__content").height());
$container = $('#image_area').masonry({itemSelector: '.img_preview', columnWidth: 1});
$("#filling_input").show();

var user_data = JSON.parse(window.localStorage.getItem("user_data"));
if(canvas.getActiveObject()){var ak_layer_id = canvas.getActiveObject()["layer_id"];}else{var ak_layer_id = 0;}
if(user_data[ak_layer_id]["image"]){$("#resetImage_btn").show();}else{$("#resetImage_btn").hide();}


show_images_from_folder();
    //var height = $(window).height()-$("#toparea").height()-$(".toolbar").height()-$(".ons-tabbar__footer").height()-10;
    //console.log(height);
  //  $('#image_area').css("height", 1000);

$("#image_area").show();
$("#font_filling, #image_filling").addClass("activeMenu");
}


function show_text_img(fabric_obj)
{
$("#trainer_mode_ui").hide();
hide_sub_menus();
var ak_layer_id = canvas.getActiveObject()["layer_id"];
$("#detect-area").off('click');
$("#image_options").hide();
$("#font_options").show();
//hide_image_options();
//show_text_input();


$("#user_txt").val(image_chain[ak_image_nr]["text_image"][ak_layer_id]["text_content"]);

fabric_last_obj =fabric_obj;
fabric_obj.set({opacity: 0.7});
canvas.renderAll();

$("#text_options").toggle();
$("#fabric_area").css({"height":$(window).width(),"width":$(window).width()});
$("#btn_favorite, #btn_options").hide();
$("#btn_apply").show();
$("#btn_apply").off("click");
$("#btn_apply").on("click",function(event){console.log("clicked");event.stopPropagation();applyChanges(canvas.getActiveObject()["layer_id"]);});
image_handler(false);
}

function hide_menus()
{
$("#font_options, #image_options").hide();
hide_sub_menus();
if(window.localStorage.getItem("trainer_mode")=="true"){$("#trainer_mode_ui").show();}
}

function hide_sub_menus()
{
$("#text_input, #filling_input").hide();
$("#font_text, #font_filling, #image_filling").removeClass("activeMenu")
}

async function hide_text_img(old_image_nr)
{
console.log("hide_text"+ak_image_nr+" "+old_image_nr);
hide_menus();
//fabric_last_obj.set({opacity: 0});
canvas.clear();

//$("#fabric_area").css({"height":0,"width":0});
$("#btn_favorite").show();
$("#btn_apply").hide();
$("#btn_apply").off("click");

await sleep(200);
image_handler(true);
if(ak_image_nr == old_image_nr){add_text_image(image_chain[ak_image_nr]["text_image"]);}
}


function change_lang(new_locale)
{
locale = new_locale;
window.localStorage.setItem('locale', locale);
document.querySelector('#myNavigator').popPage();
}
function getQuote(user) {
var author = randomKey(quote_array[locale]);
var quote = quote_array[locale][author];
if(user){$("#user_txt").val(quote);}
return quote;
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
