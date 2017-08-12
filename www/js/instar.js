
$(document).ready(function(){
//window.plugins.orientationLock.lock("portrait");

if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
    document.addEventListener('deviceready', initApp, false);
} else {initApp();}

$(document).on("show", function( event ) {
var page = event.target;
if (page.matches("#image")) {}
if (page.matches("#usr_text_input")) {AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);}
if (page.matches("#mood")) {AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
$(".mood-item").removeClass("active");$(".mood-item").each(function(index){if($(this).attr("value")==$("#mood_val").html()){$(this).addClass("active");}});}
if (page.matches("#share")) {create_banner();}
})



$(document).on("hide", function( event ) {
var page = event.target;
if (page.matches("#usr_text_input") || page.matches("#mood")) {console.log("hide");}
if (page.matches("#share")) {$("#print_products").hide();}
AdMob.hideBanner();
})

})


show_counter=0;
var admobid = {};
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
    if (AdMob) {
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
AdMob.prepareInterstitial( {
license: "lukas.nagel@gmx.ch/6af2fe6663be05e6b5e76d7afbb13ed8",
isTesting: true,
adId:admobid.interstitial,
autoShow:false
});

AdMob.prepareRewardVideoAd( {
license: "lukas.nagel@gmx.ch/6af2fe6663be05e6b5e76d7afbb13ed8",
isTesting: true,
adId:admobid.reward,
autoShow:false
});
}








var image_url;

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


$(document).on("init", function( event ) {
var page = event.target;
if (page.matches("#home")) {
$("#create_btn").on("click", function(){fn.load("create.html");});
$("#features_btn").on("click", function(){fn.load("features.html");});
$("#about_btn").on("click", function(){fn.load("about.html");});
}

if (page.matches("#mood")) {
$(".mood-item").on("click", function(){
console.log($(this).attr("value"));
$("#mood_val").html($(this).attr("value"));
document.getElementById("tabbar").setActiveTab("btn_image_menu", {});
});
}

if (page.matches("#image")) {
show_loader(true);show_image();
$("#detect-area").css("height", $(window).width());
$("#btn_create_random").on("click", function(){show_image();});
$("#btn_create_random_history").on("click", function(){show_image(true);});
//$("#btn_image_menu").on("click", function(){create_random($("#user_txt").val());});
$("#detect-area").on('swipeleft', function(event) {show_image();$(".tutorial").fadeOut();});
$("#detect-area").on('swiperight', function(event) {if($("#history_code").html()!=""){show_image(true);}});
$(".tutorial").on('click', function(){$(".tutorial").fadeOut();})
//show_image();
$("#autolinebreak").on('change',function(){refresh_preloaded(true)});
$("#preview_quality").on('change',function(){refresh_preloaded()});
}
});

function show_loader(loader)
{
if(loader){$("#download_image").fadeOut();$(".loader").fadeIn();}
else{$("#download_image").fadeIn();$(".loader").fadeOut();}
}


function show_image(history)
{
if(show_counter>=10){
AdMob.showInterstitial();
show_counter = 0;
}
if(history){
//Show image from history_code, swap current code with history_code
console.log("Load from history");
$("#btn_create_random_history").prop("disabled", true);

$("#preloaded_code").html($("#code").html());
$("#preloaded_image").html($("#current_image").html());

$("#code").html($("#history_code").html());
$("#current_image").html($("#history_image").html());

$("#history_code").html("");
$("#history_image").html("");
}else if($("#preloaded_code").html()!=""){
console.log("Load preloaded image");
//Show preloaded image
$("#btn_create_random_history").prop("disabled", false);

$("#history_code").html($("#code").html());
$("#history_image").html($("#current_image").html());

$("#code").html($("#preloaded_code").html());
$("#current_image").html($("#preloaded_image").html());

$("#preloaded_code").html("");
$("#preloaded_image").html("");
}
else
{
//generate new image and show
create_random();
}

if($("#current_image").html()!="")
{
image_url = $("#current_image").html();
$("#download_image").html("<img style='width: 100%; max-width: 400px; height:"+$(window).width()+"px; max-height:400px;' src='"+image_url+"'>");
$("#download_image").fadeIn();$(".loader").hide();
}

if($("#preloaded_image").html()=="")
{
//Preload next image
create_random(true);
}
}


function refresh_preloaded(all_new)
{
console.log("refrehed");
$("#preloaded_code").html("");
$("#preloaded_image").html("");
//Preload next image with new settings
if(all_new){
$("#code").html("");
$("#current_image").html("");
$("#download_image").hide();$(".loader").show();
show_image();
}
else{create_random(true);}
}

function delete_history()
{
$("#btn_create_random_history").prop("disabled", true);
$("#history_code").html("");
$("#history_image").html("");
$("#code").html("");
$("#current_image").html("");
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


user_txt = $("#user_txt").val();
if(user_txt.length==0){user_txt=$("#default_txt").val();}
var ori_user_txt = user_txt;
str_length = user_txt.length;

if($("#autolinebreak").children().is(':checked'))
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
var datatosend = "code="+$("#code").html()+"&template="+history+"&preview_quality="+$("#preview_quality").children().is(':checked')+"&user_txt="+user_txt+"&user_img="+$("#user_img").html()+"&fontfilling="+$("#fontfilling:checked").val()+"&frame="+$("#frame:checked").val()+"&font="+$("#font:checked").val()+"&background="+$("#background:checked").val()+"&texture="+$("#texture:checked").val()+"&fontsize="+$("#fontsize:checked").val();

$.ajax({
  url: "https://www.inspir.ly/user_img/create_random.php",
  type: "POST",
  global: false,
  data: datatosend,
  success: function(msg, error) {
   // console.log(msg.replace(/\\/g, ''));
   console.log(msg);
    var data = JSON.parse(msg);
    image_width = true;
  if(image_width){


$([data.image_url]).preload();
//$("#next_image").html(data.image_url);
$("#preloaded_code").html(data.code);
$("#preloaded_image").html(data.image_url);
if(!preload){show_image();}
  }else{
//vorlage_canvas(data.image_url,data.code);
}

},
error: function (msg, textStatus, errorThrown) {ons.notification.alert(errorThrown+' No internet available. Please connect and try again.');}
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
            $("#user_img").html(r.response.replace(/['"]+/g, ''));
            refresh_preloaded(true);
        }

        function fail(error) {
        console.log(error);
        show_loader(false);
            ons.notification.alert("An error has occurred: Code = "+error.code);
        }



function download_image(size)
{
showRewardVideoAd();


$("#download_progress").fadeIn();
$(".download_btn").prop("disabled", true);


//var datatosend = "user_txt="+encodeURI(user_txt);
var datatosend = "code="+$("#code").html()+"&size="+size;

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
ons.notification.alert(errorThrown+' No internet available. Please connect and try again.');}
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

function onErrorCreateDir(msg){alert("problemo creating directory "+msg.code);}
function onErrorRequestFs(msg){alert("problemo requesting file sysetm"+msg.code);}
function onErrorLoadFs(msg){alert("problemo loading directory"+msg.code);}

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
        console.log("Picture has been saved"+entry.toURL());
        ons.notification.toast({message: "Picture has been saved"+entry.toURL(), timeout: 2000});
        var withoutPrefixPath = _getLocalImagePathWithoutPrefix(entry.toURL());
        cordova.exec(function(params){ console.log("done it"); }, function(error){ console.log("got an error "+error); }, "GalleryRefresh", "refresh", [withoutPrefixPath]);
       // displayImageByFileURL(entry);
        },
        function (error) {
            ons.notification.alert("download error source " + error.source);
            ons.notification.alert("download error target " + error.target);
            ons.notification.alert("upload error code" + error.code);
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


var datatosend = "code="+$("#code").html()+"&size=1080";

$.ajax({
  url: "https://www.inspir.ly/user_img/download.php",
  type: "POST",
  global: false,
  data: datatosend,
  success: function(msg, error) {
  var data = JSON.parse(msg);

if(platform == "facebook"){window.plugins.socialsharing.shareViaFacebook('Created with inspir.ly #inspirly', null /* data.image_url */, null /* 'http://www.inspir.ly' */, function() {console.log('share ok')}, function(errormsg){ons.notification.alert(errormsg)});}
if(platform == "instagram"){window.plugins.socialsharing.shareViaInstagram('Created with inspir.ly #inspirly', data.image_url, function() {console.log('share ok')}, function(errormsg){'You need to install the instagram app'});}
if(platform == "whatsapp"){window.plugins.socialsharing.shareViaWhatsApp('Created with inspir.ly #inspirly', null /* data.image_url */, null /* 'http://www.inspir.ly' */, function() {console.log('share ok')}, function(errormsg){ons.notification.alert(errormsg)});}
if(platform == "twitter"){window.plugins.socialsharing.shareViaTwitter('Created with inspir.ly #inspirly', null /* data.image_url */, 'http://www.inspir.ly')}
if(platform == "snapchat"){window.plugins.socialsharing.shareWithOptions(share_options, share_onSuccess, share_onError);}
if(platform == "other"){window.plugins.socialsharing.shareWithOptions(share_options, share_onSuccess, share_onError);}


var share_options;

share_options = {
  message: 'Created with inspir.ly #inspirly', // not supported on some apps (Facebook, Instagram)
  subject: 'Get inspired', // fi. for email
  files: [data.image_url], // an array of filenames either locally or remotely
  url: 'https://www.inspir.ly',
  chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
}


var share_onSuccess = function(result) {
  console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
  console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
}

var share_onError = function(msg) {
  console.log("Sharing failed with message: " + msg);
}

  $("#share_progress").fadeOut(4000, function(){$(".share_btn").prop("disabled", false);});



},
error: function (msg, textStatus, errorThrown) {
 $("#share_progress").fadeOut();
 $(".share_btn").prop("disabled", false);
ons.notification.alert(errorThrown+' No internet available. Please connect and try again.');}
    });
}

function create_banner()
{
if($("#current_banner_image").html()!=$("#current_image").html())
{
//get the product image
$("#print_progress").fadeIn();

var datatosend = "image_src="+$("#current_image").html();

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
$("#current_banner_image").html($("#current_image").html());
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

var datatosend = "code="+$("#code").html()+"&size=2000";

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
ons.notification.alert(errorThrown+' No internet available. Please connect and try again.');}
    });

}


function _getLocalImagePathWithoutPrefix(url) {
    if (url.indexOf('file:///') === 0) {
        return url.substring(7);
    }
    return url;
}



function getQuote() {
var author = randomKey(quote_array);
var quote = quote_array[author];

//var string = $('textarea').val();
var encoded_quote = quote;

$("#user_txt").val(encoded_quote);

        refresh_preloaded(true);delete_history();
                }


var quote_array = [];
//quote_array[""] = [""];
quote_array["Vivian Greene"] = ["Life isn't about waiting for the storm to pass... It's about learning to dance in the rain."];
quote_array["Proverbs"] = ["Live today for tomorrow it will all be history."];
quote_array["Proverbs"] = ["Before you embark on a journey of revenge, dig two graves."];
quote_array["Proverbs"] = ["Live today for tomorrow it will all be history."];
quote_array["Vivian Greene"] = ["Life isn’t about waiting for the storm to pass… It’s about learning to dance in the rain."];
quote_array["Lao Tzu"] = ["If you are depressed you are living in the past. If you are anxious you are living in the future. If you are at peace you are living in the present."];
quote_array["Soren Kierkegaard"] = ["Life is not a problem to be solved, but a reality to be experienced."];
quote_array["Jack London"] = ["Life is not always a matter of holding good cards, but sometimes, playing a poor hand well."];
quote_array["Marcus Aurelius"] = ["Dwell on the beauty of life. Watch the stars, and see yourself running with them."];
quote_array["Unknown"] = ["The best time to plant a tree is twenty-five years ago. The second best time is today."];

function randomKey(obj) {
    var ret;
    var c = 0;
    for (var key in obj)
        if (Math.random() < 1/++c)
           ret = key;
    return ret;
}