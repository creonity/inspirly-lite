
//Set parameters
var version = "1.0L";
var default_lang = "en";

//helpers
show_counter=0;
var device_id = false;
var error_connection_txt = $("#error_connection_txt").html();
var admobid = {};
var image_url;
var locale = window.localStorage.getItem("locale");
var language = locale;
var init_once = 0;

//Clear local storage
window.localStorage.removeItem("user_img");
window.localStorage.removeItem("preloaded_image");
window.localStorage.removeItem("current_image");
window.localStorage.removeItem("current_banner_image");
window.localStorage.removeItem("history_image");
window.localStorage.removeItem("preloaded_code");
window.localStorage.removeItem("code");
window.localStorage.removeItem("current_text");
window.localStorage.setItem("autolinebreak", "true");
window.localStorage.setItem("mood", 0);
window.localStorage.removeItem("font");
window.localStorage.removeItem("fontfilling");
window.localStorage.removeItem("frame");
window.localStorage.removeItem("background");
window.localStorage.removeItem("texture");
window.localStorage.removeItem("fontsize");




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
screen.orientation.lock('portrait');
//Prepare adds
if (AdMob) {create_bannerAd();create_interstitial();}

$(document).on("show", function( event ) {
var page = event.target;
if (page.matches("#image")) {if (AdMob) {AdMob.removeBanner();create_bannerAd();}}
if (page.matches("#usr_text_input")) {AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);}
if (page.matches("#mood")) {$(".mood-item").removeClass("active");$(".mood-item").each(function(index){if($(this).attr("value")==window.localStorage.getItem("mood")){$(this).addClass("active");}});AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);}
if (page.matches("#share")) {create_banner();}
})

$(document).on("hide", function( event ) {
var page = event.target;
if (page.matches("#usr_text_input") || page.matches("#mood")) {console.log("hide");}
if (page.matches("#share")) {$("#print_products").hide();}
AdMob.hideBanner();
})

device_id = device.uuid;
}

function create_bannerAd()
{
console.log("hallo "+admobid.banner);
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

function create_interstitial()
{
AdMob.prepareInterstitial( {
license: "lukas.nagel@gmx.ch/6af2fe6663be05e6b5e76d7afbb13ed8",
isTesting: true,
adId:admobid.interstitial,
autoShow:false
});
}






var showPopover = function(target,id) {document.getElementById(id).show(target);};
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



$(document).on("init", function( event ) {
console.log("init");
var page = event.target;

if (page.matches("#mySplitter")) {if(window.localStorage.getItem("locale")){locale=window.localStorage.getItem("locale")}else{locale = default_lang;document.querySelector('#myNavigator').pushPage('language.html')}}

if (page.matches("#mySplitter") && init_once == 0) {ko.applyBindings(languageModel,document.getElementById("mySplitter"));init_once=1;}
if (page.matches("#create")) {ko.applyBindings(languageModel,document.getElementById("create"));}
if (page.matches("#image")) {ko.applyBindings(languageModel,document.getElementById("image"));}
if (page.matches("#share")) {ko.applyBindings(languageModel,document.getElementById("share"));}
if (page.matches("#mood")) {ko.applyBindings(languageModel,document.getElementById("mood"));}
if (page.matches("#usr_text_input")) {ko.applyBindings(languageModel,document.getElementById("usr_text_input"));$("#user_txt").val(window.localStorage.getItem("current_text"));}
if (page.matches("#about")) {ko.applyBindings(languageModel,document.getElementById("about"));}
if (page.matches("#settings")) {ko.applyBindings(languageModel,document.getElementById("settings"));}
if (page.matches("#language")) {ko.applyBindings(languageModel,document.getElementById("language"));}


//Add text

//if (page.matches("#language")) {getQuote(true);show_image();}



if (page.matches("#mood")) {
$(".mood-item").on("click", function(){
window.localStorage.setItem("mood",$(this).attr("value"));
document.getElementById("tabbar").setActiveTab("btn_image_menu", {});
});
}

if (page.matches("#image")) {
console.log("init image");
if(!window.localStorage.getItem("current_text")){getQuote();}else{show_image(false,true)}
$("#detect-area").css("height", $(window).width());
//$("#btn_create_random").on("click", function(){show_image();});
//$("#btn_create_random_history").on("click", function(){show_image(true);});
//$("#btn_image_menu").on("click", function(){create_random($("#user_txt").val());});
$("#detect-area").on('swipeleft', function(event) {show_image();$(".tutorial").fadeOut();});
$("#detect-area").on('swiperight', function(event) {if(window.localStorage.getItem("history_code")!=""){show_image(true);}});
$(".tutorial").on('click', function(){$(".tutorial").fadeOut();})
//show_image();
}

if (page.matches("#usr_text_input")) {

//add switch
if(window.localStorage.getItem("autolinebreak")=="false"){
$("#autolinebreak_switch").html("<ons-switch id='autolinebreak' disable-auto-styling style='margin-left:0px'></ons-switch>");}
else{$("#autolinebreak_switch").html("<ons-switch id='autolinebreak' checked disable-auto-styling style='margin-left:0px'></ons-switch>");}
$("#autolinebreak").on('change',function(){
window.localStorage.setItem("autolinebreak", $("#autolinebreak").children().is(':checked'));
refresh_preloaded(true);
});
}

if (page.matches("#settings")) {
//add switch
if(window.localStorage.getItem("preview_quality")=="false"){
$("#preview_quality_switch").html("<ons-switch id='preview_quality' disable-auto-styling style='margin-left:0px'></ons-switch>");}
else{$("#preview_quality_switch").html("<ons-switch id='preview_quality' checked disable-auto-styling style='margin-left:0px'></ons-switch>");}
$("#preview_quality").on('change',function(){
window.localStorage.setItem("preview_quality", $("#preview_quality").children().is(':checked'));
refresh_preloaded();});
}

});

function show_loader(loader)
{
if(loader){$("#download_image").fadeOut();$(".loader").fadeIn();}
else{$("#download_image").fadeIn();$(".loader").fadeOut();}
}


function show_image(history,current)
{
console.log(show_counter);
if(show_counter>=20){
AdMob.showInterstitial();
console.log("show add");
create_interstitial();
show_counter = 0;
}
if(history){
//Show image from history_code, swap current code with history_code
console.log("Load from history");
$("#btn_create_random_history").prop("disabled", true);

window.localStorage.setItem("preloaded_code", window.localStorage.getItem("code"));
//$("#preloaded_code").html($("#code").html());
window.localStorage.setItem("preloaded_image", window.localStorage.getItem("current_image"));
//$("#preloaded_image").html($("#current_image").html());
window.localStorage.setItem("code", window.localStorage.getItem("history_code"));
//$("#code").html($("#history_code").html());
window.localStorage.setItem("current_image", window.localStorage.getItem("history_image"));
//$("#current_image").html($("#history_image").html());

window.localStorage.removeItem("history_code");
//$("#history_code").html("");
window.localStorage.removeItem("history_image");
//$("#history_image").html("");
}
else if(current){
//load current
}
else if(window.localStorage.getItem("preloaded_code")){
//}else if($("#preloaded_code").html()){
console.log("Load preloaded image");
//Show preloaded image
$("#btn_create_random_history").prop("disabled", false);

window.localStorage.setItem("history_code", window.localStorage.getItem("code"));
//$("#history_code").html($("#code").html());
window.localStorage.setItem("history_image", window.localStorage.getItem("current_image"));
//$("#history_image").html($("#current_image").html());
window.localStorage.setItem("code", window.localStorage.getItem("preloaded_code"));
//$("#code").html($("#preloaded_code").html());
window.localStorage.setItem("current_image", window.localStorage.getItem("preloaded_image"));
//$("#current_image").html($("#preloaded_image").html());

window.localStorage.removeItem("preloaded_code");
//$("#preloaded_code").html("");
window.localStorage.removeItem("preloaded_image");
//$("#preloaded_image").html("");
//Preload next image
console.log("create preoloaded image");
create_random(true);
}
else
{
//generate new image and show
console.log("create new");
create_random();
}



if(window.localStorage.getItem("current_image"))
{
image_url = window.localStorage.getItem("current_image");
$("#download_image").html("<img style='width: 100%; height:"+$(window).width()+"px;' src='"+image_url+"'>");
$("#download_image").fadeIn();$(".loader").hide();
}


}


function refresh_preloaded(all_new)
{
console.log("refreshed");
window.localStorage.removeItem("preloaded_code");
//$("#preloaded_code").html("");
window.localStorage.removeItem("preloaded_image");
//$("#preloaded_image").html("");
//Preload next image with new settings
if(all_new){
window.localStorage.removeItem("code");
//$("#code").html("");
window.localStorage.removeItem("current_image");
//$("#current_image").html("");

$("#download_image").hide();$(".loader").show();
show_image();
}
else{create_random(true);}
}

function delete_history()
{
$("#btn_create_random_history").prop("disabled", true);
window.localStorage.removeItem("history_code");
//$("#history_code").html("");
window.localStorage.removeItem("history_image");
//$("#history_image").html("");
window.localStorage.removeItem("code");
//$("#code").html("");
window.localStorage.removeItem("current_image");
//$("#current_image").html("");
}


function create_random(preload)
{
show_counter = show_counter +1;
/*
if(!user_txt)
{
user_txt = $("#user_txt").val();
str_length = user_txt.length;
var text_items = user_txt.split(' ');
letter_length = str_length - text_items.length;

var line_number = 1;
if(letter_length>10){line_number = 2;}
if(letter_length>20){line_number = 3;}
if(letter_length>30){line_number = 4;}
if(letter_length>40){line_number = 5;}
var avg_line_length = letter_length/line_number;

var user_txt_structured = "";
counter = 0;
$(text_items).each(function(index){
user_txt_structured = user_txt_structured+text_items[index];
counter = counter + text_items[index].length;
if(counter>20){user_txt_structured = user_txt_structured+"\n";counter=0;}else{user_txt_structured = user_txt_structured+" ";}
})
if(text_items.length==2){user_txt=text_items[0]+"\n"+text_items[1];}



}
*/


user_txt = window.localStorage.getItem("current_text");
if(user_txt.length==0){getQuote(true);user_txt = $("#user_txt").val();}
//var ori_user_txt = user_txt;
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






//var datatosend = "user_txt="+encodeURI(user_txt);
var datatosend = "code="+window.localStorage.getItem("code")+"&version="+version+"&language="+language+"&device_id="+device_id+"&template="+history+"&mood="+window.localStorage.getItem("mood")+"&preview_quality="+window.localStorage.getItem("preview_quality")+"&user_txt="+user_txt+"&user_img="+window.localStorage.getItem("user_img")+"&fontfilling="+window.localStorage.getItem("fontfilling")+"&frame="+window.localStorage.getItem("frame")+"&font="+window.localStorage.getItem("font")+"&background="+window.localStorage.getItem("background")+"&texture="+window.localStorage.getItem("texture")+"&fontsize="+window.localStorage.getItem("fontsize");

$.ajax({
  url: "https://www.inspir.ly/user_img/create_random.php",
  type: "POST",
  global: false,
  data: datatosend,
  success: function(msg, error) {
   // console.log(msg.replace(/\\/g, ''));
   console.log(msg);
    var data = JSON.parse(msg);
    if(data.error){ons.notification.alert(data.error);}
else{
$([data.image_url]).preload();
//$("#next_image").html(data.image_url);
window.localStorage.setItem("preloaded_code", data.code);
//$("#preloaded_code").html(data.code);
window.localStorage.setItem("preloaded_image", data.image_url);
//$("#preloaded_image").html(data.image_url);
if(!preload){show_image();}
}
},
error: function (msg, textStatus, errorThrown) {ons.notification.alert(error_connection_txt);}
    });
}


$.fn.preload = function() {
    this.each(function(){
        $('<img/>')[0].src = this;
    });
}

/*
  function getImage() {
navigator.camera.getPicture(uploadPhoto, function(message) {
 alert('get picture failed');
 }, {
 quality: 100,
 destinationType: navigator.camera.DestinationType.FILE_URI,
 sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
 });
}


function uploadPhoto(imageURI) {
 var options = new FileUploadOptions();
 options.fileKey = "file";
 options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
 options.mimeType = "image/jpeg";
 console.log(options.fileName);
 var params = new Object();
 params.value1 = "test";
 params.value2 = "param";
 options.params = params;
 options.chunkedMode = false;

var ft = new FileTransfer();
 ft.upload(imageURI, "https://www.inspir.ly/user_img/user_img_upload.php", function(result){
 console.log("success");
 }, function(error){
 console.log("error:"+error);
 }, options);
 }
*/

     function getImage() {
            // Retrieve image file location from specified source
            console.log("upload_initiated");
            show_loader(true);
            navigator.camera.getPicture(uploadPhoto, function(message) {
			console.log('get picture failed');
		},{
			quality: 100,
			destinationType: navigator.camera.DestinationType.FILE_URI,
			sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
		}
            );

        }

        function uploadPhoto(imageURI) {



            var options = new FileUploadOptions();
            options.fileKey="file";
           // options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.fileName="user_img.jpg";
            options.mimeType="image/jpeg";

            var params = new Object();
            params.value1 = "test";
            params.value2 = "param";

            options.params = params;
            options.chunkedMode = false;

            var ft = new FileTransfer();
            ft.upload(imageURI, "https://www.inspir.ly/user_img/user_img_upload.php", win, fail, options);


        }

        function win(r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
            window.localStorage.setItem("user_img", r.response.replace(/['"]+/g, ''));
      //      $("#user_img").html(r.response.replace(/['"]+/g, ''));
            refresh_preloaded(true);
        }

        function fail(error) {
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
var datatosend = "code="+window.localStorage.getItem("code")+"&size="+size;

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
    fileTransfer.download(
        uri,
        fileURL,
        function (entry) {
        console.log("Picture has been saved."+entry.toURL());
        ons.notification.toast({message: $("#Picture_has_beend_saved").html(), timeout: 2000});


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


var datatosend = "code="+window.localStorage.getItem("code")+"&size=1080";

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


if(platform == "facebook"){window.plugins.socialsharing.shareViaFacebook($("#Created_with_inspirly. ").html()+' #inspirly',  data.image_url, 'http://www.inspir.ly', function() {console.log('share ok')}, function(errormsg){showDialog('dialog-2');})}
if(platform == "instagram"){window.plugins.socialsharing.shareViaInstagram($("#Created_with_inspirly. ").html()+'#inspirly', data.image_url, function() {console.log('share ok')}, function(errormsg){showDialog('dialog-2');})}
if(platform == "whatsapp"){window.plugins.socialsharing.shareViaWhatsApp($("#Created_with_inspirly ").html()+'#inspirly', data.image_url, 'http://www.inspir.ly', function() {console.log('share ok')}, function(errormsg){showDialog('dialog-2');})}
if(platform == "twitter"){window.plugins.socialsharing.shareViaTwitter($("#Created_with_inspirly ").html()+'#inspirly', data.image_url, 'http://www.inspir.ly', function() {console.log('share ok')}, function(errormsg){showDialog('dialog-2');})}
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

function create_banner()
{
console.log("create_banner");
if(window.localStorage.getItem("current_banner_image")!=window.localStorage.getItem("current_image"))
{
console.log("current_banner_image");
//get the product image
$("#print_progress").fadeIn();

var datatosend = "image_src="+window.localStorage.getItem("current_image");

$.ajax({
  url: "https://www.inspir.ly/user_img/product_banner.php",
  type: "POST",
  global: false,
  data: datatosend,
  success: function(msg, error) {
  var data = JSON.parse(msg);


$("#print_progress").fadeOut(1000,function(){
$("#print_products").html("<img onclick='print_product()' style='width:100%' src='"+data.image_url+"'>");
$("#print_products").fadeIn();});
window.localStorage.setItem(current_banner_image, window.localStorage.getItem("current_image"));
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

var datatosend = "code="+window.localStorage.getItem("key")+"&size=2000";

$.ajax({
  url: "https://www.inspir.ly/user_img/download.php",
  type: "POST",
  global: false,
  data: datatosend,
  success: function(msg, error) {
  var data = JSON.parse(msg);

  $("#print_progress").fadeOut(1000, function(){
  //enable to click on image again
var eles = document.getElementsByTagName('img');
for (var i=0; i < eles.length; i++)
   eles[i].onclick = print_product;

window.open("http://www.zazzle.com/api/create/at-238761569768290129?rf=238761569768290129&ax=DesignBlast&cg=196340684027374117&sr=250134954166200634&image0="+encodeURI(data.image_url));

  $("#download_prev").html("<img src='"+data.image_url+"'>");
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



function getQuote(default_txt) {
var author = randomKey(quote_array[locale]);
var quote = quote_array[locale][author];
$("#user_txt").val(quote);
window.localStorage.setItem('current_text', quote);
if(!default_txt){refresh_preloaded(true);delete_history();}
}


var quote_array = [];
quote_array["en"] = [];
quote_array["de"] = [];
//quote_array[""] = [""];
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
quote_array["en"]["Mae West"] = ["You only live once, but if you do it right, onceis enough."];
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
quote_array["en"][""] = ["I'm donig this for ME"];
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


function randomKey(obj) {
    var ret;
    var c = 0;
    for (var key in obj)
        if (Math.random() < 1/++c)
           ret = key;
    return ret;
}

var showDialog = function (id) {document.getElementById(id).show();};
var hideDialog = function (id) {document.getElementById(id).hide();};
