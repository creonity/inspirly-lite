//Positionierung von Camerabild ist falsch

//Set parameters
var version = "1.0L";
var default_lang = "en";
//window.localStorage.setItem("autolinebreak", "true");
//window.localStorage.setItem("mood", 0);
window.localStorage.setItem("sleeptime", 500);
window.localStorage.setItem("autolinebreak",true);
window.localStorage.setItem("user_data",'{"0":{},"1":{"text_content":"","zindex":"1","autolinebreak":true}}');
if(!window.localStorage.getItem("experimentalMode")){window.localStorage.setItem("experimentalMode","false");}
if(!window.localStorage.getItem("preview_quality")){window.localStorage.setItem("preview_quality","true");}
if(!window.localStorage.getItem("trainer_mode")){window.localStorage.setItem("trainer_mode","false");}
if(!window.localStorage.getItem("effect_mode")){window.localStorage.setItem("effect_mode","true");}
if(!window.localStorage.getItem("preload_mode")){window.localStorage.setItem("preload_mode","true");}
if(!window.localStorage.getItem("complexity")){window.localStorage.setItem("complexity",20);}
window.localStorage.setItem("frenzyPoints",0);
//DesigernMode 0 = All Favorites, 1 = AI, 2 = User Favorites
window.localStorage.setItem("designerMode",0);
window.localStorage.setItem("moodId","1");

var debug = 0;
var show_svg = false; //broken at ImageTracer.imageToSVG
var testing = 0;
set_user_data(1,"text_content","Loving it!");

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
var ak_image_nr_show = 0;
var image_url_old;
var canvas;
var text_img;
var from_setting;
var fabric_last_obj;
var ak_layer_id;
var $collectionGrid;
var collection_size =3;
var collectionItemsShown;
var next_image_nr;
var print_w = {};
var image_width = $(window).width();
var streak=1;
var startEff1;
var startEff2;
var startEff3;
var global_n=0;
var no_show_image_option = false;
var collectionTimeOut = false;
var collectionTimeOutTime = 5000;
var imageTimeOut = false;
var imageTimeOutTime = 2000;
var app = {};



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
if(typeof AdMob !== 'undefined') {
//create_bannerAd();
//create_interstitial();
}

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
    adSize: 'CUSTOM',
    width: $(window).width(),
    height: ($(window).height()-$(window).width()-$(".toolbar").height()-100),
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




if (page.matches("#language")) {if(window.localStorage.getItem("locale")){locale=window.localStorage.getItem("locale");

document.querySelector('#myNavigator').resetToPage('mood.html');

}}

//Language
//if (page.matches("#image")) {ko.cleanNode(document.getElementById("image"));ko.applyBindings(languageModel,document.getElementById("image"));}
if (page.matches("#about")) {ko.applyBindings(languageModel,document.getElementById("about"));}
if (page.matches("#settings")) {ko.applyBindings(languageModel,document.getElementById("settings"));}
if (page.matches("#language")) {ko.applyBindings(languageModel,document.getElementById("language"));}
if (page.matches("#share")) {ko.applyBindings(languageModel,document.getElementById("share"));}
if (page.matches("#mood")) {ko.applyBindings(languageModel,document.getElementById("mood"));}
if (page.matches("#mood2")) {ko.applyBindings(languageModel,document.getElementById("mood2"));}



if (page.matches("#image")) {
$("#quickStartGuide").hide();
app.showTextInput = document.getElementById("textInput").show.bind(document.getElementById("textInput"));
app.hideTextInput = document.getElementById("textInput").hide.bind(document.getElementById("textInput"));




//window.localStorage.setItem("user_data",'{"0":{},"1":{"zindex":"1","autolinebreak":true}}');


canvas = new fabric.Canvas('c', {stopContextMenu: true, selection: false, hoverCursor: 'pointer'});
canvas.setHeight($(window).width());
canvas.setWidth($(window).width());


if(testing==1)
{
getQuote();
console.log("init");
show_image(0);
}


$("#detect-area").css("height", $(window).width());



$(".modal").on("preshow",function(){$(".modal_con").height($(window).height()-100);});

$(".modal").on("postshow",function(){
$(".sketch").remove();swipe_effect = Sketch.create({container: document.getElementsByClassName( 'canvas-container' )[0],interval:3,fullscreen:false,width: $(window).width(), height: ($('.modal_con').prop('scrollHeight')*0.8),eventTarget:document.getElementsByClassName( 'upper-canvas' )[0]});
$(".sketch").insertAfter($(".modal__content"));
$(".sketch").wrap( "<div id='sketch_wrapper'></div>" );
$("#sketch_wrapper").height($(window).height());
add_effect();var x =$(window).width();var y =$('.modal_con').prop('scrollHeight')*0.8;
startEff1 = setInterval(function(){for(i=1;i<random(0,4);i++){swipe_effect.spawn(random(-20, x+20), random(-20, y+20), 2 );}}, 700);
startEff2 = setInterval(function(){for(i=1;i<random(0,4);i++){swipe_effect.spawn(random(-20, x+20), random(-20, y+20), 2 );}}, 1200);
startEff3 = setInterval(function(){for(i=1;i<random(0,4);i++){swipe_effect.spawn(random(-20, x+20), random(-20, y+20), 2 );}}, 1500);
});



document.querySelector('ons-modal').show();
document.querySelector('ons-modal').hide();

}



if (page.matches("#share")) {create_banner();hide_menus();}

//Settings
if (page.matches("#settings")) {
hide_text_img(ak_image_nr);

//update complexity slider
$("#complexitySlider").val(window.localStorage.getItem("complexity"));
$("#complexitySlider").off("change");
$("#complexitySlider").on("change",function(){window.localStorage.setItem("complexity",$(this).val())});

//add experimental switch
if(window.localStorage.getItem("experimentalMode")=="true"){$("#experimentalMode_switch").html("<ons-switch id='experimentalMode' checked disable-auto-styling style='margin-left:0px'></ons-switch>");}
else{$("#experimentalMode_switch").html("<ons-switch id='experimentalMode' disable-auto-styling style='margin-left:0px'></ons-switch>");}
$("#experimentalMode").on('change',function(){window.localStorage.setItem("experimentalMode", $("#experimentalMode").children().is(':checked'));});

//add autonlinebreak switch
if(window.localStorage.getItem("autolinebreak")=="true"){$("#autolinebreak_switch").html("<ons-switch id='autolinebreak' checked disable-auto-styling style='margin-left:0px'></ons-switch>");}
else{$("#autolinebreak_switch").html("<ons-switch id='autolinebreak' disable-auto-styling style='margin-left:0px'></ons-switch>");}
$("#autolinebreak").on('change',function(){window.localStorage.setItem("autolinebreak", $("#autolinebreak").children().is(':checked'));});


//add quality switch
if(window.localStorage.getItem("preview_quality")=="true"){$("#preview_quality_switch").html("<ons-switch id='preview_quality' checked disable-auto-styling style='margin-left:0px'></ons-switch>");}
else{$("#preview_quality_switch").html("<ons-switch id='preview_quality' disable-auto-styling style='margin-left:0px'></ons-switch>");}
$("#preview_quality").on('change',function(){window.localStorage.setItem("preview_quality", $("#preview_quality").children().is(':checked'));});

//add trainer switch
console.log(window.localStorage.getItem("trainer_mode"));
if(window.localStorage.getItem("trainer_mode")=="true"){$("#trainer_switch").html("<ons-switch id='trainer_mode' checked disable-auto-styling style='margin-left:0px'></ons-switch>");}
else{$("#trainer_switch").html("<ons-switch id='trainer_mode' disable-auto-styling style='margin-left:0px'></ons-switch>");}
$("#trainer_mode").on('change',function(){window.localStorage.setItem("trainer_mode", $("#trainer_mode").children().is(':checked'));});


//add effect switch
if(window.localStorage.getItem("effect_mode")=="true"){$("#effect_switch").html("<ons-switch id='effect_mode' checked disable-auto-styling style='margin-left:0px'></ons-switch>");}
else{$("#effect_switch").html("<ons-switch id='effect_mode' disable-auto-styling style='margin-left:0px'></ons-switch>");}
$("#effect_mode").on('change',function(){window.localStorage.setItem("effect_mode", $("#effect_mode").children().is(':checked'));});

//add preload switch
if(window.localStorage.getItem("preload_mode")=="true"){$("#preload_switch").html("<ons-switch id='preload_mode' checked disable-auto-styling style='margin-left:0px'></ons-switch>");}
else{$("#preload_switch").html("<ons-switch id='preload_mode' disable-auto-styling style='margin-left:0px'></ons-switch>");}
$("#preload_mode").on('change',function(){window.localStorage.setItem("preload_mode", $("#preload_mode").children().is(':checked'));});

}

});


$(document).on("show", function( event ) {
var page = event.target;


//Language
if (page.matches("#image")) {ko.cleanNode(document.getElementById("image"));ko.applyBindings(languageModel,document.getElementById("image"));error_connection_txt = $("#error_connection_txt").html();}

if (page.matches("#image")) {
//Handlers
$("#new_image").on('click', function(){document.querySelector('#myNavigator').pushPage('mood.html');});
$(".option_btn").on('click', function(){hide_sub_menus();});
$("#font_fixed").on('click', font_fixed_handler);

$("#search_pic").off("click");
$("#search_pic").on("click",function(){if(typeof cordova !== 'undefined'){cordova.plugins.Keyboard.show();}});
$("#search_pic").off("keyup");
$("#search_pic").on("keyup",function(event){if(event.keyCode == 13){if(typeof cordova !== 'undefined'){cordova.plugins.Keyboard.close();};search_pic($("#search_pic").val());}});



$("#font_text").on('click', text_option_handler);
$("#font_filling, #image_filling").on('click', filling_option_handler);
$("#add_font").on("click", add_font_handler);
$("#font_delete").on("click", font_delete_handler);
$("#image_fixed").on('click', image_fixed_handler);
$("#hide_modal_btn").on("click",function(){document.querySelector('ons-modal').hide();});
$(".modal").on("posthide",function(){clearInterval(startEff1);clearInterval(startEff2);clearInterval(startEff3);swipe_effect.destroy();$(".sketch").remove();$('#sketch_wrapper').remove();

//if(window.localStorage.getItem("effect_mode")=="true"){if (!$( ".sketch" ).length){swipe_effect = Sketch.create({container: document.getElementsByClassName( 'canvas-container' )[0],interval:2,eventTarget:document.getElementsByClassName( 'upper-canvas' )[0]});$(".sketch").attr("height",$(window).width()+"px");$(".sketch").prev().insertAfter($(".sketch"));add_effect();swipe_effect.start();}}
});
if($(".modal_con").length){$(".modal_con").off("scroll");$(".modal_con").on("scroll",function(){$('#sketch_wrapper').scrollTop($(this).scrollTop()*0.8);});}

/*
$(document).on("click",function(e){
console.log(global_n+". "+$(this).attr('class'));global_n++;
console.log(global_n+". "+$(this).attr('id'));global_n++;
});

window.console = {
  log: function(str){
    var node = document.createElement("div");

node.insertBefore(document.createTextNode(str),node.firstChild);
document.getElementById("myLog").insertBefore(node,document.getElementById("myLog").firstChild);
  }
}

*/



$(document).off("prehide");
$(document).on("prehide",function(){$("#font_text").removeClass("activeMenu");});


canvas.off('mouse:up');
canvas.on('mouse:up', canvas_up_handler);



canvas.off('selection:created');
canvas.on({'selection:created' : function() {console.log("created");}});


canvas.off('selection:updated');
canvas.on({'selection:updated' : function() {
console.log("update");
//hide_text_img(ak_image_nr);
//show_text_img(canvas.getActiveObject());

}});
canvas.off('selection:cleared');
canvas.on({'selection:cleared' : function(e) {
console.log("cleared");

//canvas.off('mouse:up');
//canvas.on('mouse:up', canvas_up_handler);
select_canvas_handler();no_show_image_option=true;hide_text_img(ak_image_nr);
}});

image_handler(true);

$("#btn_favorite").on('click',function(e){e.stopPropagation();faveImg();});
$("#btn_share").on('click',function(e){e.stopPropagation();shareImg();});
if($("#collection_wrapper").is(":visible")){collection_handler(true);}

$("#crop_image_area").css("height",$(".page__content").height());
$("#upload_loader").css("height",$(".page__content").height());
$container = $('#image_area').masonry({itemSelector: '.img_preview', columnWidth: 1});

if(window.localStorage.getItem("trainer_mode")=="true"){$(".trainer_mode_ui").show();}else{$(".trainer_mode_ui").hide();}
$("#myNavigator").trigger("imagePageLoaded");
//if(typeof AdMob !== 'undefined'){AdMob.removeBanner();
//create_bannerAd();
//}
//if(typeof AdMob !== 'undefined'){AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);}
}

if (page.matches("#mood")) {
$containerMood = $('#moodsets_area').masonry({itemSelector: '.mood_preview', columnWidth: 1});
show_mood_sets();


/*
quantity("inputAge",0,120);
quantity("inputDay",0,31);
quantity("inputMonth",0,12);
quantity("inputYear",2000,2030);

$(".mood_input").off();
$(".mood_input").on("input",function(){makeTextSelection();$("#moodText").fadeIn();})

$("#textSelection").off();
$("#textSelection").on("input click",function(){$("#designerOptions").fadeIn();})
*/


$("#mood").off("click");
$("#mood").on("click",".template_preview", function(){new_image($(this).attr("data-template"));})
$("#mood").on("click",".mood_preview", function(){
window.localStorage.setItem("moodId",$(this).attr("data-moodset"));
//chooseMood($(this).attr("data-moodset"));
$(".mood_preview").removeClass("saturate");$(this).addClass("saturate");
$(".mood_preview").addClass("bubble-pops");$(this).removeClass("bubble-pops");

collectionTimeOut = window.setTimeout(function(){document.querySelector('#myNavigator').pushPage('mood2.html');}, 800);


})
var user_data = JSON.parse(window.localStorage.getItem("user_data"));
$("#user_txtNew").val(user_data[1]["text_content"]);

}


if (page.matches("#mood2")) {
//show quotes
showMoodQuotes();
var user_data = JSON.parse(window.localStorage.getItem("user_data"));
if(user_data[1]["text_content"])
{
$('#moodTextInput').html(user_data[1]["text_content"]);
}
else
{
$('#moodTextInput').html($("#moodTextInput").attr('placeholder'));
}

$container = $('#templates_area').masonry({itemSelector: '.template_preview', columnWidth: 1});
if(typeof cordova !== 'undefined'){show_favorites_from_folder();}



$("#mood2").off();
$("#mood2").on("click",".template_preview", function(){new_image($(this).attr("data-template"));})
$("#mood2").on("touch","#moodsetWrapper",function(){$("#mood2Back, #moodTextInput").addClass("transition");if($('#moodTextInput').html()==$("#moodTextInput").attr('placeholder')){$('#moodTextInput').empty();}
$(".quotes").removeClass("bubble-pops");
$("#templates_area").css("visibility","hidden");
$("#quotes").fadeIn();
});
$("#mood2").on("touch","#moodsets_areaWrapper",function(event){event.stopPropagation();
$("#mood2Back, #moodTextInput").removeClass("transition");
if($('#moodTextInput').html()==""){$('#moodTextInput').html($("#moodTextInput").attr('placeholder'));}
});
$("#mood2").on("click","#btnCreate",function(){$("#textSelection").html($("#moodTextInput").html());$(".quotes").addClass("bubble-pops");new_collection();});
$("#mood2").on("click","#btnFavorite",function(){$("#textSelection").html($("#moodTextInput").html());$(".quotes").addClass("bubble-pops");
$("#quotes").fadeOut(100,function(){$("#templates_area").css("visibility","visible");$("#mood2Back, #moodTextInput").removeClass("transition");});
});


$(".quotes").off();
$(".quote_edit").off();
$("#quotesWrapper").on("click",".quote_edit",function(event){
$("#moodTextInput").html($(this).parents(".quotes").children(".quoteContent").html());$("#moodTextInput").trigger("touch");$("#moodTextInput").focus();
set_user_data(1,"text_content",$(this).parents(".quotes").children(".quoteContent").html());
event.stopPropagation();})
$("#quotesWrapper").on("click",".quotes",function(){$("#textSelection").html($(this).children(".quoteContent").html());
//document.querySelector('#myNavigator').once("ons-postpop", function(){createCollection(3)});
$(".quotes").addClass("bubble-pops");$(this).removeClass("bubble-pops");new_collection();
})


}



})

/*
function quantity(fieldId,from,to){
    var select = document.getElementById(fieldId);
    for (var i = from; i < to; i++){
    select.options[select.options.length] = new Option(i+1, i+1);
  }
}
function removeOptions(selectbox)
{
    var i;
    for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
    {
        selectbox.remove(i);
    }
}
*/

/*
function chooseMood(moodId)
{
window.localStorage.setItem("moodId",moodId);
$("#moodInputMenu").fadeOut(200,function(){
$("#moodInputs > span").hide();
$("#moodInputs > span >input").val("");
$("#moodText, #designerOptions").hide();
if(moodId == "1"){$("#moodMenuName, #moodMenuAge").fadeIn();$("#moodMenuName > .mood_input").attr("placeholder","Name of birthday child");}
if(moodId == "2"){$("#moodMenuName, #moodMenuDate").fadeIn();$("#moodMenuName > .mood_input").attr("placeholder","Name of baby");}
if(moodId == "3"){$("#moodMenuName, #moodMenuName2, #moodMenuDate").fadeIn();$("#moodMenuName > .mood_input").attr("placeholder","Name of bride");$("#moodMenuName2 > .mood_input").attr("placeholder","Name of groom");}
$("#moodInputMenu").fadeIn();
});



//makeTextSelection();
}
*/

/*
function makeTextSelection()
{

var select = document.getElementById("textSelection");
removeOptions(document.getElementById("textSelection"));


for(var i = 0; i < quote_array[locale][window.localStorage.getItem("moodId")].length; i++)
{
var quote = quote_array[locale][window.localStorage.getItem("moodId")][i];
quote = quote.replace("[AGE]", $("#inputAge").val());
quote = quote.replace("[NAME]", $("#inputName").val());
quote = quote.replace("[NAME2]", $("#inputName2").val());
quote = quote.replace("[DATE]", $("#inputDay").val()+"."+$("#inputMonth").val()+"."+$("#inputYear").val());
quote = quote.replace("[GENDER]", $("#inputGender").val());

select.options[select.options.length] = new Option(quote,quote);
}

}
*/



$(document).on("hide", function( event ) {
var page = event.target;
//if (page.matches("#image")) {if(typeof AdMob !== 'undefined'){AdMob.hideBanner();}}
if (page.matches("#share")) {$( "#myNavigator").off("loaded_prev");$( "#myNavigator").off("loaded_prev_medium");}
})





var canvas_up_handler = function(e) {
//check if text-image or background is selected
if(canvas.getActiveObject(e)){
//text-image is selected
show_text_img(canvas.getActiveObject());


}else if(no_show_image_option){no_show_image_option=false;}else{select_canvas_handler();}};



function cleanUp()
{
if($("#font_fixed").hasClass("active")){font_fixed_handler();}
if($("#image_fixed").hasClass("active")){image_fixed_handler();}
}



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
hide_text_img(ak_image_nr);
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
//hide_text_img(ak_image_nr_show);
hide_menus();
}


var text_option_handler = function(event) {show_text_input();}
var filling_option_handler = function(event) {show_filling_input();}
var add_font_handler = function(event) {add_font();}
var font_delete_handler = function(event) {font_delete();}


var select_canvas_handler = function(event) {
console.log("click_canvas");
$("#image_options").toggle();
if(!$("#image_options").is(":visible")){hide_menus();}else{$(".trainer_mode_ui").hide();}

//else{show_image_options();}
}




function new_image(templateId)
{
cleanUp();
window.localStorage.setItem("user_data",'{"0":{},"1":{"zindex":"1"}}');
//set_user_data(1,"text_content",get_text(true,"user_txtNew"));
set_user_data(1,"text_content",get_text("textSelection"));
//window.localStorage.setItem("mood",moodset);
//refresh_preloaded(true);
//hide_menus();
//document.querySelector('#myNavigator').popPage();

//window.setTimeout(function(){document.querySelector('#myNavigator').resetToPage('rand_img.html');}, 200);


$("#myNavigator").off("imagePageLoaded");
$("#myNavigator").on("imagePageLoaded",function(){
image_handler(false);collection_handler(false);
$("#detect-area").css("height", $(window).width());


image_chain = [];
ak_image_nr = 0;
ak_image_nr_collection = 0;
ak_image_nr_show = 0;
last_image_nr = false;

refresh_preloaded(true);
//if(next_image_nr>0){ak_image_nr_collection=next_image_nr;}
//createCollection();
})
if(templateId){choose_template(templateId);}
window.setTimeout(function(){document.querySelector('#myNavigator').resetToPage('rand_img.html',{"animation":"fade"});}, 200);

//else{refresh_preloaded(true);}
}

function new_collection()
{
cleanUp();
window.localStorage.setItem("user_data",'{"0":{},"1":{"zindex":"1"}}');
set_user_data(1,"text_content",get_text("textSelection"));



$("#myNavigator").off("imagePageLoaded");
$("#myNavigator").on("imagePageLoaded",function(){
image_handler(false);collection_handler(false);


image_chain = [];
ak_image_nr = 0;
ak_image_nr_collection = 0;
ak_image_nr_show = 0;

//refresh_preloaded(true);
//if(next_image_nr>0){ak_image_nr_collection=next_image_nr;}
createCollection();
})

window.setTimeout(function(){document.querySelector('#myNavigator').resetToPage('rand_img.html',{"animation":"fade"});}, 200);

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

/*
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
*/

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


function faveImg()
{
if(window.localStorage.getItem("current_banner_image")!=window.localStorage.getItem("current_image"))
{
addFavorite();
$("#btn_favorite").addClass("create_btn_active");
ons.notification.toast({message: "Image added to your personal favorites", timeout: 4000});
}
}

function shareImg()
{
document.querySelector('#myNavigator').pushPage('share.html');
download_cache();
}


function show_loader(loader,block)
{
if(loader){$(".loader").show();$("#download_image_holder").fadeOut(300);busy=block;}
else{$("#btn_favorite").removeClass("create_btn_active");busy=false;$("#download_image").removeClass("translateRight translateLeft");$("#download_image_holder").fadeIn(500,function(){$(".loader").hide();
if(!$(".modal").is(":visible")){$(".sketch").insertBefore($(".upper-canvas"));}
})}
}














//Collection Feature
async function createCollection(templateImageNr)
{
$("#quickStartGuide").fadeOut();
$("#myNavigator").off("imagePageLoaded");

canvas.clear();canvas.renderAll();
collectionItemsShown=0;

$collectionGrid = $('#collection_area').masonry({itemSelector: '.collection_img',});
$collectionGrid.on( 'removeComplete',function( event, removedItems ) {console.log( 'Removed ' + removedItems.length + ' items' );});

$("#collection_wrapper").show();
console.log("createCollection");
$("#collection_area_wrapper").height($(window).width());
collection_handler(false);
var counter=0;
var total_elements = collection_size*collection_size;
var item_width = $(window).width()/collection_size-($(window).width()*0.01);
$('.collection_img').animate({height:item_width+"px",width:item_width+"px"},50,function(){$collectionGrid.masonry('layout')})

if(templateImageNr >=0 ){
window.localStorage.setItem("frenzyPoints",6);
image_chain.push(image_chain[templateImageNr]);
}
else
{
window.localStorage.setItem("frenzyPoints",0);
}

while(counter <total_elements){if(!image_chain[ak_image_nr_collection+counter]){await sleep(50);}
create_collection_item(ak_image_nr_collection+counter,item_width);
counter=counter+1;}

//back up, if images are for any reason not loaded
collectionTimeOut = window.setTimeout(function(){collection_handler(true);next_image_nr=ak_image_nr_collection+(collection_size*collection_size);}, collectionTimeOutTime);
}

function create_collection_item(image_nr,item_width)
{
//window.localStorage.setItem("frenzyPoints",window.localStorage.getItem("frenzyPoints")-1);
//window.localStorage.setItem("frenzyPoints",0);
if($("#collection_img_"+image_nr).length == 0)
{
var $content = $("<div class='collection_img' attr_image_nr='"+image_nr+"' style='height:"+item_width+"px;  width:"+item_width+"px' id='collection_img_"+image_nr+"'>");
$collectionGrid.append( $content ).masonry( 'appended', $content);
$collectionGrid.masonry();
//$collectionGrid.append( $content ).masonry( 'addItems', $content);
//$collectionGrid.masonry();
//$("collection_img_"+image_nr).addClass("flickr_img");
}
if(typeof image_chain[image_nr] === 'undefined'){image_chain[image_nr] = [];}
if(typeof image_chain[image_nr]["src"] === 'undefined'){$("#collection_img_"+image_nr).addClass("flickr_img");create_image(image_nr,image_chain[ak_image_nr]["code"],showCollectionItem,image_nr);}

//if(!image_chain[image_nr]){$("#collection_img_"+image_nr).addClass("flickr_img");create_image(image_nr,image_chain[ak_image_nr]["code"],showCollectionItem,image_nr);}
//else if(!image_chain[image_nr]["src"]){$("#collection_img_"+image_nr).addClass("flickr_img");create_image(image_nr,image_chain[ak_image_nr]["code"],showCollectionItem,image_nr);}
else{showCollectionItem(image_nr);}

}



async function showCollectionItem(image_nr)
{
//var item_width = $("#collection_img_"+image_nr).width();
//var item_top = $("#collection_img_"+image_nr).position().top;
//var item_left= $("#collection_img_"+image_nr).position().left;



$("#collection_img_"+image_nr).removeClass("flickr_img");
//$("#collection_img_"+image_nr).removeAttr("style").width(item_width).height(item_width).css({ top: item_top+'px', left: item_left+'px' });
$("#collection_img_"+image_nr).css({"background-image": "url("+image_chain[image_nr]["src"]+")"}).addClass('animation-target');
collectionItemsShown = collectionItemsShown+1;

//attach pinch handler, when all items shown
if(collectionItemsShown == collection_size*collection_size)
{
next_image_nr=ak_image_nr_collection+collectionItemsShown;
await sleep(500);
collection_handler(true);
}
}

function clickCollectionItem(image_nr)
{
fullsize_image(image_nr);
//$collectionGrid.masonry( 'remove', $(".collection_img") );
$collectionGrid.masonry('destroy');
$("#collection_area").html("");
$("#collection_wrapper").hide();
//$("#quickStartGuide").fadeIn();
//collection_size=collection_size-1;
}









function search_pic(key)
{
console.log("search");
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
var local_images = ["1355344363e5rbCRhbQRkQTRcqGavc.jpg","1355344372Aa2PFr4Fo7uK3uEts3Rx.jpg","1355344374opSFogbDspStKtEWLw5o.jpg","1355344377XgCUgoT8uXBx1rUpChpS.jpg","1355344379RRSAPz5REmRPBycQXy2c.jpg","1355344380JLj24A6WtnUZZaPzydLB.jpg","1355344381cOO6e3iHXKKzhIWog2lM.jpg","1355344385XXXopbAuVgPleR2ydwyq.jpg","1355344389r2jnDKdHqVc2DYiHjeE6.jpg","1355344391wI9rKbMKpgKPxagQagOx.jpg","1355344394I9AKfWp27CEHHWviYHfj.jpg","1355344412Em23mkiNxYJFGFRXvjsD.png","13553443872FwXjXhfFqDYB6PSIGMx.jpg","1355344395917FnCQbxBc5UNkZUdB1.jpg","vintage_bg.jpg"];
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


function showMoodQuotes()
{
$("#quotes").empty();
var $grid = $('#quotes').masonry({itemSelector: '.quotes',columnWidth: '.quotes'});

var moodQuotes = quote_array[locale][window.localStorage.getItem("moodId")];


var timeoutTime = 0;
moodQuotes.forEach(function(element) {
window.setTimeout(function(){
var $items = $("<div class='quotes'><span class='quoteContent'>"+element+"</span><span class='quote_edit'><i class='fa fa-edit'></i></span></div>").css({"margin-left":3+(Math.floor(Math.random() * 11))+"vw"});
$grid.prepend( $items ).masonry( 'prepended', $items );
},timeoutTime);


timeoutTime = timeoutTime+100+Math.floor(Math.random() * 201);
});




}


function show_mood_sets()
{


var mood_images = ["1","2","3","4"];
 $containerMood.masonry( 'remove',$(".mood_preview")).masonry('layout');
var timeoutTime = 0;
mood_images.forEach(function(element) {
window.setTimeout(function(){
$( function() {var $items = getMoodsLocal([element]);
$containerMood.masonryImagesReveal( $items );
var randAnimate = Math.floor(Math.random() * 3);

$(".mood_preview").removeClass("animation-target").addClass("mood_preview_animate"+randAnimate);
});},timeoutTime);
timeoutTime = timeoutTime+201;
});


/*
window.setTimeout(function(){
var mood_images = ["3","4"];
$( function() {var $items = getMoodsLocal(mood_images);
$containerMood.masonryImagesReveal( $items );
$(".mood_preview").removeClass("animation-target").addClass("mood_preview_animate");
});
}, 2000);
*/



}

function getMoodsLocal(mood_images) {
var items = '';
$.each(mood_images, function(index, value) {

var item = "<div data-moodset='"+value+"' class='mood_preview img_preview animation-target' style='background-image: url(img/moods/"+value+".jpg); height:"+$(window).width()/3+"px;'></div>";
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
$container.masonry( 'remove',$(".template_preview")).masonry('layout');
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
//var item = "<div id='"+index+"' onclick='choose_template(\""+value+"\")' class='img_preview' style='background-image: url("+value+"); height:"+$(window).width()/3+"px;'><button class='button button--light delete_btn' style='position:absolute; top:5px; left:5px; z-index:4;' onclick='deleteFav(event,\""+value+"\",\""+index+"\");'><i class='fa fa-close'></i></button></div>";
var item = "<div id='fav_"+index+"' data-template='"+value+"' class='template_preview img_preview' style='background-image: url("+value+"); height:"+$(window).width()/3+"px;'><button class='button button--light delete_btn' style='position:absolute; top:5px; left:5px; z-index:4;' onclick='deleteFav(event,\""+value+"\",\"fav_"+index+"\");'><i class='fa fa-close'></i></button></div>";

items += item;
});
return $( items );
}

function deleteFav(event,fav_url,fav_id)
{
console.log("delete");
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
window.localStorage.setItem("frenzyPoints",10);
uncheck_options();
//refresh_preloaded(true);
//window.localStorage.setItem("autolinebreak",false);
//document.getElementById("tabbar").setActiveTab("btn_image_menu", {});
//show_loader(true);
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

if(busy && image_change==1){console.log("busy");return;}

canvas.clear();
canvas.renderAll();

ak_image_nr = parseInt(ak_image_nr) + parseInt(image_change);
if(ak_image_nr>1){$("#quickStartGuide").fadeOut();}
//if(ak_image_nr<0){ak_image_nr=0}
if(ak_image_nr_show != ak_image_nr){

if(last_image_nr>=0 && image_chain[last_image_nr] != undefined){image_chain[last_image_nr]["time_hidden"] = Date.now();focus_array[image_chain[last_image_nr]["image_id"]] = image_chain[last_image_nr]["time_hidden"]-image_chain[last_image_nr]["time_shown"]; }


show_loader(true,true);
console.log("showLoader");
//collection_size=1;
ak_image_nr_collection = ak_image_nr;
image_handler(false);
//backup if image for any reasons doesn't load
imageTimeOut = window.setTimeout(function(){image_handler(true);ak_image_nr_show=ak_image_nr_show+1;
//if(image_chain[ak_image_nr]){if(!image_chain[ak_image_nr]["code"]){image_chain[ak_image_nr]["code"]=false;}}
}, imageTimeOutTime);



await sleep(window.localStorage.getItem("sleeptime"));
}


if(ak_image_nr==last_image_nr){return;}
//create new image and show
//collection_size=1;
if(!image_chain[ak_image_nr]){
var code = "{}";if(image_chain[ak_image_nr-1]){if(image_chain[ak_image_nr-1]["code"]){code = image_chain[ak_image_nr-1]["code"];}}
create_image(ak_image_nr,code,fullsize_image,ak_image_nr);return;
}

//wait to load and show
if(!image_chain[ak_image_nr]["src"]){
$( "#myNavigator").off("loaded_img_src");
$( "#myNavigator").on("loaded_img_src",function(e,image_nr){
if(image_nr==ak_image_nr && $("#c").is(":visible")){fullsize_image(ak_image_nr);}});
return;}

//show old image
fullsize_image(ak_image_nr);
}

function fullsize_image(image_nr)
{
canvas.off('mouse:up');
canvas.on('mouse:up', canvas_up_handler);

collection_handler(false);image_handler(true);
ak_image_nr = parseInt(image_nr);
$('<img>').attr('src', image_chain[ak_image_nr]["src"]).imagesLoaded( {"image_nr":ak_image_nr}, function() {
 image_chain[this.options.image_nr]["loaded"]=true;
 if(this.options.image_nr == ak_image_nr){
 $("#download_image").html("<img style='width: 100%; height:"+$(window).width()+"px;' src='"+image_chain[ak_image_nr]["src"]+"'>");
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

//render and preload image
//if(!image_chain[ak_image_nr+1]){create_image(ak_image_nr+1,image_chain[ak_image_nr]["code"],false,false);}
}



function rate_image(image_nr, rating)
{
if(rating==5){if(streak<9){streak=streak + 2;}}
if(rating==1){streak=1;}
$(".sketch").insertBefore($("#download_image_holder"));
var center = $(window).width()/2;
var max_bubbles = rating *2*streak;
var direction = 1;
var change = -5;
if(rating == 1){direction = 0; max_bubbles=10; change=5;}
for(i=1;i<max_bubbles;i++){swipe_effect.spawn( center, center+(change*i), 3 );}
if(image_chain[image_nr])
{
image_chain[image_nr]["rating"]=rating;    
rating_array[image_chain[image_nr]["image_id"]] = rating; 
}
}


          


var collectionHandler = function(templateImageNr = NaN,history=false)
{
canvas.off('mouse:up');
//$("#download_image").addClass("translateLeft");
//$("#download_image").addClass("translateRight");
canvas.discardActiveObject();
if ($collectionGrid != undefined) {if($collectionGrid.data('masonry')){$collectionGrid.masonry('destroy');}}
$("#collection_area").html("");
if(!history){ak_image_nr_collection=image_chain.length;}
else if(history == 1){ak_image_nr_collection=max(0,ak_image_nr_collection-(collection_size*collection_size));}//go back in history
else if(history == 2){ak_image_nr_collection = ak_image_nr_collection+(collection_size*collection_size);}//go forward in history
else if(history == 3){ak_image_nr_collection = ak_image_nr_collection;}//stay
//$collectionGrid.masonry('destroy');$("#collection_area").html("");ak_image_nr_collection=Math.max(0,ak_image_nr_collection-(collection_size*collection_size));createCollection(collection_size)}else{ons.notification.toast({message: "End of history", timeout: 2000});}}

image_handler(false);collection_handler(false);
console.log("collectionHandler");
createCollection(templateImageNr);
}




//var pinchinhandler = function(event) {
//window.localStorage.setItem("frenzyPoints",9);
//if(collection_size>=3){ons.notification.toast({message: "Maxium reached", timeout: 500});return;}
//image_handler(false);collection_handler(false);collection_size=collection_size+2;createCollection(collection_size);}
/*
var pinchouthandler = function(event) {
console.log("pinched out"+collection_size);
if(collection_size>2)
{
image_handler(false);collection_handler(false);collection_size=collection_size-2;createCollection(collection_size);}
else if(collection_size<=2){clickCollectionItem(ak_image_nr_collection);}
}
*/
//var swipelefthandler = function(event) {canvas.discardActiveObject();show_image(1);rate_image(ak_image_nr_show,3);delete_future()}
//var swiperighthandler = function(event) {if(image_chain[ak_image_nr-1]){canvas.discardActiveObject();show_image(-1);}else{ons.notification.toast({message: "End of history", timeout: 2000});}}
//var swipeuphandler = function(event) {canvas.discardActiveObject();rate_image(ak_image_nr_show,5);show_image(1);}
//var swipedownhandler = function(event) {canvas.discardActiveObject();rate_image(ak_image_nr_show,1);show_image(1);}
//var holdhandler = function(event) {event = $.Event('touchmove');$(".sketch").trigger(event);}

//var swipelefthandler = function(event) {canvas.off('mouse:up');window.localStorage.setItem("frenzyPoints",window.localStorage.getItem("frenzyPoints")-2);$("#download_image").addClass("translateLeft");canvas.discardActiveObject();show_image(1);rate_image(ak_image_nr_show,1);delete_future()}
//var swiperighthandler = function(event) {canvas.off('mouse:up');window.localStorage.setItem("frenzyPoints",8);$("#download_image").addClass("translateRight");canvas.discardActiveObject();show_image(1);rate_image(ak_image_nr_show,5);delete_future()}
//var swipeuphandler = function(event) {image_handler(false);collection_handler(true);collection_size=collection_size+1;createCollection(collection_size);}
//var swipedownhandler = function(event) {image_handler(false);collection_handler(true);collection_size=collection_size-1;createCollection(collection_size);}




function image_handler(attach)
{
//if(attach && !busy)
if(attach)
{
clearTimeout(imageTimeOut);
//$(".sketch").on('touchmove',function(event){event.stopPropagation();console.log("mousemove");})
//$("#detect-area").off('click');
//$("#detect-area").on('click', select_canvas_handler);
//$("#detect-area").off('pinchin');
//$("#detect-area").on('pinchin', pinchinhandler);
$("#detect-area").off('swipeleft');
$("#detect-area").on('swipeleft', function(){collectionHandler(NaN,false);});
$("#detect-area").off('swiperight');
$("#detect-area").on('swiperight', function(){collectionHandler(ak_image_nr_show,false);});
$("#detect-area").off('swipeup');
$("#detect-area").on('swipeup', function(){collectionHandler(NaN,3);});
$("#detect-area").off('swipedown');
$("#detect-area").on('swipedown', function(){collectionHandler(NaN,3);});
$("#pinchin_btn").off('click');
$("#pinchin_btn").on('click', function(){collectionHandler(NaN,false);});
$("#history_btn").off('click');
$("#history_btn").on('click', function(){collectionHandler(NaN,true);});
//$("#star1_btn").off('click');
//$("#star1_btn").on('click', function(){collectionHandler(false,false);});
//$("#star2_btn").off('click');
//$("#star2_btn").on('click', false);
//$("#star3_btn").off('click');
//$("#star3_btn").on('click', swiperighthandler);
$(".fullsize_btn").prop("disabled", false);
if(!image_chain[ak_image_nr-1]){$("#history_btn").prop("disabled", true);}


if(window.localStorage.getItem("effect_mode")=="true")
{
if (!$( ".sketch" ).length){
swipe_effect = Sketch.create({container: document.getElementsByClassName( 'canvas-container' )[0],interval:2,eventTarget:document.getElementsByClassName( 'upper-canvas' )[0]});

$(".sketch").attr("height",$(window).width()+"px");
$(".sketch").prev().insertAfter($(".sketch"));
add_effect();
}
else{swipe_effect.start();}
}
else
{
if ($(".sketch").length){swipe_effect.destroy();$(".sketch").remove();}
}
}
else
{
$("#detect-area").off('pinchin');
$("#detect-area").off('click');
$("#detect-area").off('swipeleft');
$("#detect-area").off('swiperight');
$("#detect-area").off('swipedown');
$("#detect-area").off('swipeup');
$("#pinchin_btn").off('click');
$("#history_btn").off('click');
$("#star1_btn").off('click');
$("#star2_btn").off('click');
$("#star3_btn").off('click');
$(".fullsize_btn").prop("disabled", true);
//if($(".sketch").length){swipe_effect.stop();swipe_effect.clear();}
}
}






function collection_handler(attach)
{

if(attach)
{
clearTimeout(collectionTimeOut);
image_handler(false);

//$("#collection_wrapper").off('pinchin');
$("#collection_wrapper").off('swipeleft');
$("#collection_wrapper").off('swiperight');
$("#collection_wrapper").on('swipeup', function(){collectionHandler(NaN,true);});
$("#collection_wrapper").on('swipedown',  function(){collectionHandler(NaN,2);});
//$("#collection_wrapper").on('swipeleft', pinchinhandler);
$("#collection_wrapper").on('swipeleft', function(){collectionHandler(NaN,false);});
$("#collection_wrapper").on('swiperight', function(){collectionHandler(ak_image_nr_show,false);});
$(".collection_img").off("click");
$(".collection_img").on("click",function(){clickCollectionItem($(this).attr("attr_image_nr"));});
//$("#pinchin_collection_btn").off('click');
//$("#pinchin_collection_btn").on('click', pinchinhandler);
$("#history_collection_btn").off('click');
$("#history_collection_btn").on('click', function(){collectionHandler(NaN,true);});
$("#forward_collection_btn").off('click');
$("#forward_collection_btn").on('click', function(){collectionHandler(NaN,false);});
$(".collection_btn").prop("disabled", false);
if(!image_chain[ak_image_nr_collection-1]){$("#history_collection_btn").prop("disabled", true);}

}
else
{
//$("#collection_wrapper").off('pinchin');
$("#collection_wrapper").off('swipeup');
$("#collection_wrapper").off('swipedown');
$("#collection_wrapper").off('swipeleft');
$("#collection_wrapper").off('swiperight');
$(".collection_img").off("click");
$("#pinchin_collection_btn").off('click');
$("#history_collection_btn").off('click');
$("#forward_collection_btn").off('click');
$(".collection_btn").prop("disabled", true);
}
}

//var swipeleftcollectionhandler = function(event) {$collectionGrid.masonry('destroy');$("#collection_area").html("");ak_image_nr_collection=next_image_nr;createCollection(collection_size)}
//var swiperightcollectionhandler = function(event) {if(image_chain[ak_image_nr_collection-1]){$collectionGrid.masonry('destroy');$("#collection_area").html("");ak_image_nr_collection=Math.max(0,ak_image_nr_collection-(collection_size*collection_size));createCollection(collection_size)}else{ons.notification.toast({message: "End of history", timeout: 2000});}}



function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms));}


function refresh_preloaded(all_new)
{
//Preload next image with new settings

for (var key in image_chain) {
if(key>ak_image_nr_show){delete image_chain[key];}
}


if(all_new){
//window.localStorage.removeItem("code");
//window.localStorage.removeItem("current_image");
console.log("preload");
show_image(1);
}
else{
if(!image_chain[ak_image_nr_show]){image_chain[ak_image_nr_show]=[];image_chain[ak_image_nr_show]["code"]=false;}
create_image(ak_image_nr_show+1,image_chain[ak_image_nr_show]["code"],false,false);}
}




function delete_future()
{
refresh_preloaded();
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
var datatosend = "template_id="+window.localStorage.getItem("template_id")+"&experimentalMode="+window.localStorage.getItem("experimentalMode")+"&frenzyPoints="+window.localStorage.getItem("frenzyPoints")+"&complexity="+window.localStorage.getItem("complexity")+"&user_data="+window.localStorage.getItem("user_data")+"&code="+code+"&performance_calculated="+duration_calculated_str+"&performance_loaded="+duration_loaded_str+"&focus="+focus_str+"&rating="+rating_str+"&version="+version+"&language="+language+"&device_id="+device_id+"&template="+history+"&moodId="+window.localStorage.getItem("moodId")+"&preview_quality="+window.localStorage.getItem("preview_quality")+"&user_img="+window.localStorage.getItem("user_img")+"&textimagechange="+window.localStorage.getItem("textimagechange")+"&fontfilling="+window.localStorage.getItem("fontfilling")+"&frame="+window.localStorage.getItem("frame")+"&font="+window.localStorage.getItem("font")+"&background="+window.localStorage.getItem("background")+"&texture="+window.localStorage.getItem("texture")+"&fontsize="+window.localStorage.getItem("fontsize");
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

if(debug == 1){console.log(data.debug_script);}
image_chain[image_nr]["text_image"]=[];
data.text_img = JSON.parse(data.text_img);
for (var key in data.text_img) {if(data.text_img[key]["text_src"]==null){continue;}

image_chain[image_nr]["text_image"][key]=[];
image_chain[image_nr]["text_image"][key]["src"]=data.text_img[key]["text_src"];
if(show_svg){ImageTracer.imageToSVG( image_chain[image_nr]["text_image"][key]["src"], function(svg){image_chain[image_nr]["text_image"][key]["svg"]=svg;}, 'Artistic3');}
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


function get_text(textField="user_txt")
{
var patt2 = new RegExp("<div>","g");
var patt3= new RegExp("</div>","g");
var patt4= new RegExp("<br>","g");
var patt5= new RegExp("llllinebreak","g");
var patt6= new RegExp("&amp;","g");
var patt7= new RegExp("%20","g");
var patt8= new RegExp("%0A","g");

user_txt=encodeURIComponent($("#"+textField).html().replace(patt2,"llllinebreak").replace(patt3,"").replace(patt4,"").replace(patt6,"&"));

user_txt = user_txt.replace(patt5,"\n").replace(patt7," ").replace(patt8,"\n");

//user_txt = encodeURIComponent($("#"+textField).html());

if(user_txt.length==0){user_txt = encodeURI(getQuote(false,textField));}
str_length = user_txt.length;

if(window.localStorage.getItem("autolinebreak")=="true")
{
console.log("oki");
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
if(counter>avg_line_length){
user_txt_structured = user_txt_structured+"\n";counter=0;}else{
user_txt_structured = user_txt_structured+" ";}
});
if(text_items.length==2){user_txt_structured=text_items[0]+"\n"+text_items[1];}
user_txt = user_txt_structured;
}
user_txt = user_txt.trim();

return user_txt;  
}




String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g, "");
};






//Image from camera
function takeImage() {
navigator.camera.getPicture(uploadPhoto, function(message) {console.log('take picture failed');}, { quality: 90, allowEdit: false, cameraDirection: 1, 
    correctOrientation: true, 
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
			quality: 90,
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
$( "#myNavigator").on( "loaded_prev_medium", function(platform){
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
//check if url or id is sent, send back only id
console.log(url);
var url_array = url.split(".");
if(url_array.length>1){
var url_array_new = url_array[url_array.length-2].split("-");
return url_array_new[url_array_new.length - 2];
}else
{
return url;
}
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
//        console.log("Favorite has been saved."+entry.toURL());
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
$("#print_products").html("<img id='print_prev' onload='console.log(\"ok\");$(this).fadeIn();' class='hidden' style='width:100%' src='"+data.image_url+"'>");
$("#print_prev").off("click");
$("#print_prev").on("click",function(){print_product();});
//$("#print_prev").fadeIn();
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
//print_w[ak_image_nr].location.href = "
//window.open("http://www.zazzle.com/api/create/at-238761569768290129?rf=238761569768290129&ax=DesignBlast&cg=196340684027374117&sr=250134954166200634&image0="+encodeURI(image_chain[ak_image_nr]["prev_url"]);
window.open("http://www.zazzle.com/api/create/at-238761569768290129?rf=238761569768290129&ax=DesignBlast&cg=196340684027374117&sr=250134954166200634&t__useQpc=false&ed=false&t__smart=false&continueUrl="+encodeURI("https://www.zazzle.com/inspirly")+"&tc=inspirly_app&ic="+image_chain[ak_image_nr]["image_id"]+"&t_image0_iid=inspirly&image0="+encodeURI("http://www.inspir.ly/user_img/serve_image.php?image_url="+image_chain[ak_image_nr]["prev_url"]));
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
//window.open("http://www.zazzle.com/api/create/at-238761569768290129?rf=238761569768290129&ax=DesignBlast&cg=196340684027374117&sr=250134954166200634&image0="+encodeURI(image_chain[ak_image_nr]["prev_url"]));
window.open("http://www.zazzle.com/api/create/at-238761569768290129?rf=238761569768290129&ax=DesignBlast&cg=196340684027374117&sr=250134954166200634&t__useQpc=false&ed=false&t__smart=false&continueUrl="+encodeURI("https://www.zazzle.com/inspirly")+"&tc=inspirly_app&ic="+image_chain[ak_image_nr]["image_id"]+"&t_image0_iid=inspirly&image0="+encodeURI("http://www.inspir.ly/user_img/serve_image.php?image_url="+image_chain[ak_image_nr]["prev_url"]));

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
//first remove old text images and then add new
canvas.clear().renderAll();

for (var key in text_image) {
if(text_image[key]["src"]!=null)
{
var scale_factor = $(window).width()/400;


if(show_svg)
{
//select text
swipe_effect.stop;



//if(!text_image[key]["svg"]){ImageTracer.imageToSVG( text_image[key]["src"], function(svg){image_chain[ak_image_nr]["text_image"][key]["svg"]=svg;}, 'Sharp');}

//console.log(image_chain[ak_image_nr]["text_image"][key]["svg"]);

fabric.loadSVGFromString(text_image[key]["svg"], function(objects, options) {
  var obj = fabric.util.groupSVGElements(objects, options);
  obj.scale(scale_factor);
  obj.crossOrigin = "Anonymous";
  obj.set({
"left": text_image[key]["left"]/400*$(window).width(),"new_key":key,"layer_id":text_image[key]["layer_id"],"originY":"center","originX":"center","hasRotatingPoint":false,"opacity":"0.03","padding":0,"cornersize":10, "width":text_image[key]["width"], "height":text_image[key]["height"], "angle":text_image[key]["rotation"],"top": text_image[key]["top"]/400*$(window).width()
  });
obj.perPixelTargetFind = true;
obj.selectionBackgroundColor="rgba(0,0,0,0.1)";
obj.targetFindTolerance = 10;
obj.hasControls = obj.hasBorders = false;
obj.lockMovementX = obj.lockMovementY = true;


canvas.add(obj);
},false,{crossOrigin : "Anonymous"});
}
else
{
swipe_effect.stop;


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
var new_id = 0;

fabric.Image.fromURL(text_image[key]["src"], function (img) {
    img.crossOrigin = "Anonymous";
    img.scale(scale_factor);
    img.set({
    "left": text_image[img.new_key]["left"]/400*$(window).width(),"new_key":key,"layer_id":text_image[img.new_key]["layer_id"],"originY":"center","originX":"center","hasBorders":false,"hasControls":false,"hasRotatingPoint":false,"opacity":"0.03","padding":0,"cornersize":10, "width":text_image[img.new_key]["width"], "height":text_image[img.new_key]["height"], "angle":text_image[img.new_key]["rotation"],"top": text_image[img.new_key]["top"]/400*$(window).width()
    });
    img.perPixelTargetFind = true;
    img.selectionBackgroundColor="rgba(0,0,0,0.1)";
   img.targetFindTolerance = 10;
    img.hasControls = img.hasBorders = false;
    img.lockMovementX = img.lockMovementY = true;
    canvas.add(img);
    },{crossOrigin : "Anonymous",new_key:key});


}
}
}
}

function set_canvas_back()
{
if(!canvas){return;}
canvas.getObjects().forEach(function (targ) {

targ.set({"left": image_chain[ak_image_nr]["text_image"][targ.new_key]["left"]/400*$(window).width(),
"width":image_chain[ak_image_nr]["text_image"][targ.new_key]["width"]/1,
"height":image_chain[ak_image_nr]["text_image"][targ.new_key]["height"]/1,
"angle":image_chain[ak_image_nr]["text_image"][targ.new_key]["rotation"],
"top": image_chain[ak_image_nr]["text_image"][targ.new_key]["top"]/400*$(window).width(),
"opacity":0.03,
"selectionBackgroundColor":"rgba(0,0,0,0)",
"lockMovementX":true,
"lockMovementY":true});




targ.scale(1/400*$(window).width());
targ.setCoords();
canvas.renderAll();
});




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

var code_array = JSON.parse(image_chain[ak_image_nr_show]["code"]);
var text_img = canvas.getActiveObject();
app.hideTextInput();


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
user_data[ak_layer_id]["text_content"]=get_text();
window.localStorage.setItem("user_data",JSON.stringify(user_data));

hide_text_img();
window.localStorage.setItem("frenzyPoints",10);
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
//document.getElementById('popover').show("#font_text");
ko.cleanNode(document.getElementById("textInput"));ko.applyBindings(languageModel,document.getElementById("textInput"));
app.showTextInput();




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
$(".trainer_mode_ui").hide();
hide_sub_menus();
swipe_effect.stop();
var ak_layer_id = canvas.getActiveObject()["layer_id"];
$("#detect-area").off('click');
$("#image_options").hide();
$("#font_options").show();
//hide_image_options();
//show_text_input();


$("#user_txt").val(image_chain[ak_image_nr]["text_image"][ak_layer_id]["text_content"]);

fabric_last_obj =fabric_obj;
fabric_obj.set({opacity: 0.7,perPixelTargetFind:false,lockMovementX:false,lockMovementY:false,selectionBackgroundColor:"rgba(0,0,0,0.1)"});
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
if(window.localStorage.getItem("trainer_mode")=="true"){$(".trainer_mode_ui").show();}
}

function hide_sub_menus()
{
$("#text_input, #filling_input").hide();
$("#font_text, #font_filling, #image_filling").removeClass("activeMenu")
}

function hide_text_img(old_image_nr)
{
console.log("hide_text");
hide_menus();
//fabric_last_obj.set({opacity: 0});
//
if(fabric_last_obj){fabric_last_obj.set({opacity: 0.03,perPixelTargetFind:true,lockMovementX:true,lockMovement:true});}




//$("#fabric_area").css({"height":0,"width":0});
$("#btn_favorite").show();
$("#btn_apply").hide();
$("#btn_apply").off("click");

//await sleep(200);
image_handler(true);
//set_canvas_back();

if(ak_image_nr == old_image_nr){
set_canvas_back();
//add_text_image(image_chain[ak_image_nr]["text_image"]);
}else{
canvas.clear();canvas.renderAll();
}
}




function change_lang(new_locale)
{
locale = new_locale;
window.localStorage.setItem('locale', locale);
document.querySelector('#myNavigator').popPage();
}

function getQuote(user,field) {
var author = randomKey(quote_array[locale][window.localStorage.getItem("moodId")]);
var quote = quote_array[locale][window.localStorage.getItem("moodId")][author];
if(user){$("#"+field).val(quote);}
return quote;
}








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
