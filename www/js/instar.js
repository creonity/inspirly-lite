
$(document).ready(function(){
//window.plugins.orientationLock.lock("portrait");

if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
    document.addEventListener('deviceready', initApp, false);
} else {initApp();}

$(document).on("show", function( event ) {
var page = event.target;
if (page.matches("#image")) {if (AdMob) {AdMob.removeBanner();create_bannerAd();}}
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



var error_connection_txt = "Please connect to the internet.";
var device_id = false;

var showDialog = function (id) {
  document
    .getElementById(id)
    .show();
};

var hideDialog = function (id) {
  document
    .getElementById(id)
    .hide();
};

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
create_bannerAd();
create_interstitial();
    }
device_id = device.uuid;
/*
AdMob.prepareRewardVideoAd( {
license: "lukas.nagel@gmx.ch/6af2fe6663be05e6b5e76d7afbb13ed8",
isTesting: true,
adId:admobid.reward,
autoShow:false
});
*/
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
$("#download_image").html("<img style='width: 100%; height:"+$(window).width()+"px;' src='"+image_url+"'>");
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
var datatosend = "code="+$("#code").html()+"&device_id="+device_id+"&template="+history+"&mood="+$("#mood_val").html()+"&preview_quality="+$("#preview_quality").children().is(':checked')+"&user_txt="+user_txt+"&user_img="+$("#user_img").html()+"&fontfilling="+$("#fontfilling:checked").val()+"&frame="+$("#frame:checked").val()+"&font="+$("#font:checked").val()+"&background="+$("#background:checked").val()+"&texture="+$("#texture:checked").val()+"&fontsize="+$("#fontsize:checked").val();

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
$("#preloaded_code").html(data.code);
$("#preloaded_image").html(data.image_url);
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
//AdMob.showRewardVideoAd();



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
        ons.notification.toast({message: "Picture has been saved.", timeout: 2000});
        var withoutPrefixPath = _getLocalImagePathWithoutPrefix(entry.toURL());
        cordova.exec(function(params){ console.log("done it"); }, function(error){ console.log("got an error "+error); }, "GalleryRefresh", "refresh", [withoutPrefixPath]);
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


var datatosend = "code="+$("#code").html()+"&size=1080";

$.ajax({
  url: "https://www.inspir.ly/user_img/download.php",
  type: "POST",
  global: false,
  data: datatosend,
  success: function(msg, error) {
  var data = JSON.parse(msg);

var share_options;
share_options = {
  message: 'Created with inspir.ly #inspirly', // not supported on some apps (Facebook, Instagram)
  subject: 'Get inspired', // fi. for email
  files: [data.image_url], // an array of filenames either locally or remotely
  url: 'https://www.inspir.ly',
  chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
}


if(platform == "facebook"){window.plugins.socialsharing.shareViaFacebook('Created with inspir.ly #inspirly',  data.image_url, 'http://www.inspir.ly', function() {console.log('share ok')}, function(errormsg){showDialog('dialog-2');})}
if(platform == "instagram"){window.plugins.socialsharing.shareViaInstagram('Created with inspir.ly #inspirly', data.image_url, function() {console.log('share ok')}, function(errormsg){showDialog('dialog-2');})}
if(platform == "whatsapp"){window.plugins.socialsharing.shareViaWhatsApp('Created with inspir.ly #inspirly', data.image_url, 'http://www.inspir.ly', function() {console.log('share ok')}, function(errormsg){showDialog('dialog-2');})}
if(platform == "twitter"){window.plugins.socialsharing.shareViaTwitter('Created with inspir.ly #inspirly', data.image_url, 'http://www.inspir.ly', function() {console.log('share ok')}, function(errormsg){showDialog('dialog-2');})}
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
ons.notification.alert(error_connection_txt);}
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
quote_array["Vivian Greene"] = ["Life isn't about waiting for the storm to pass... It's about learning to dance in the rain."];
quote_array["Lao Tzu"] = ["If you are depressed you are living in the past. If you are anxious you are living in the future. If you are at peace you are living in the present."];
quote_array["Soren Kierkegaard"] = ["Life is not a problem to be solved, but a reality to be experienced."];
quote_array["Jack London"] = ["Life is not always a matter of holding good cards, but sometimes, playing a poor hand well."];
quote_array["Marcus Aurelius"] = ["Dwell on the beauty of life. Watch the stars, and see yourself running with them."];
quote_array["Unknown"] = ["The best time to plant a tree is twenty-five years ago. The second best time is today."];
quote_array["Dr. Seuss"] = ["Don't cry because it's over, smile because it happened."];
quote_array["Oscar Wilde"] = ["Be yourself; everyone else is already taken."];
quote_array["Albert Einstein"] = ["Two things are infinite: the universe and human stupidity; and I'm not sure about the universe."];
quote_array["Frank Zappa"] = ["So many books, so little time."];
quote_array["William W. Purkey"] = ["You've gotta dance like there's nobody watching, Love like you'll never be hurt, Sing like there's nobody listening, And live like it's heaven on earth."];
quote_array["Marcus Tullius Cicero"] = ["A room without books is like a body without a soul."];
quote_array["Mae West"] = ["You only live once, but if you do it right, once is enough."];
quote_array["Mahatma Gandhi"] = ["Be the change that you wish to see in the world."];
quote_array["J.K. Rowling"] = ["If you want to know what a man's like, take a good look at how he treats his inferiors, not his equals."];
quote_array["Mark Twain"] = ["If you tell the truth, you don't have to remember anything."];
quote_array["Elbert Hubbard"] = ["A friend is someone who knows all about you and still loves you."];
quote_array["Mahatma Gandhi"] = ["Live as if you were to die tomorrow. Learn as if you were to live forever."];
quote_array["Oscar Wilde"] = ["To live is the rarest thing in the world. Most people exist, that is all."];
quote_array["Martin Luther King Jr."] = ["Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that."];
quote_array["Oscar Wilde"] = ["I am so clever that sometimes I don't understand a single word of what I am saying."];
quote_array["Anonymous"] = ["Insanity is doing the same thing, over and over again, but expecting different results."];
quote_array["J.K. Rowling"] = ["I do believe something magical can happen when you read a good book."];
quote_array["Winston Churchill"] = ["The Pessimist Sees Difficulty In Every Opportunity. The Optimist Sees The Opportunity In Every Difficulty."];
quote_array["Will Rogers"] = ["Don't Let Yesterday Take Up Too Much Of Today."];
quote_array["Steve Jobs"] = ["If You Are Working On Something That You Really Care About, You Don't Have To Be Pushed. The Vision Pulls You."];
quote_array["Rob Siltanen"] = ["People Who Are Crazy Enough To Think They Can Change The World, Are The Ones Who Do."];
quote_array["Ernest Hemingway"] = ["The world breaks everyone, and afterward, some are strong at the broken places."];
quote_array["Walt Disney"] = ["If you can dream it, you can do it."];
quote_array["Eleanor Roosevelt"] = ["The future belongs to those who believe in the beauty of their dreams."];
quote_array["W. Clement Stone"] = ["Aim for the moon. If you miss, you may hit a star."];
quote_array["Yoko Ono"] = ["Smile in the mirror. Do that every morning and you'll start to see a big difference in your life."];
quote_array["Mother Teresa"] = ["Peace begins with a smile."];
quote_array["Andy Rooney"] = ["If you smile when no one else is around, you really mean it."];
quote_array["Charlie Chaplin"] = ["You'll find that life is still worthwhile, if you just smile."];
quote_array["Unknown"] = ["I look at you and see the rest of my life in front of my eyes."];
quote_array["Leo Tolstoy"] = ["All, everything that I understand, I only understand because I love."];
quote_array["Unknown"] = ["I'm much more me when I'm with you."];
quote_array["Salvador Dali"] = ["I don't do drugs, I am drugs."];
quote_array["Jim Morrison"] = ["Actually I don't remember being born, it must have happened during one of my black outs."];
quote_array["Unknown"] = ["I didn't fall. The floor just needed a hug."];
quote_array["Unknown"] = ["Sleep all day. Party all night. Never grow old. Never die."];
quote_array["Unknown"] = ["Happiness is not having what you want. It is appreciating what you have."];
quote_array["Unknown"] = ["We fall in love by chance, we stay in love by choice."];
quote_array["Unknown"] = ["You can't change yesterday, but you can ruin today by worrying about tomorrow."];
quote_array["Unknown"] = ["Silence isn't empty. It's full of answers."];
quote_array["Unknown"] = ["The goal is to die with memories, not dreams."];
quote_array["Alyssa Knight"] = ["Count your rainbows, not your thunderstorms."];
quote_array["Robert A. Heinlein"] = ["Love is that condition in which the happiness of another person is essential to your own."];
quote_array["Mahatma Gandhi"] = ["Happiness is when what you think, what you say, and what you do are in harmony."];
quote_array["Winnie the Pooh"] = ["Nobody can be uncheered with a balloon."];
quote_array["Confucius"] = ["What you do not want done to yourself, do not do to others."];
quote_array["Aristotle"] = ["Happiness depends upon ourselves."];
quote_array[""] = ["Be the best version of YOU"];
quote_array[""] = ["If it is important, you'll find a way. If not you'll find an excuse."];
quote_array[""] = ["Your only limit is YOU"];
quote_array[""] = ["Hard work beats talent when talent doesn't work hard"];
quote_array[""] = ["Do more of what makes you happy"];
quote_array[""] = ["stop wishing. start doing."];
quote_array[""] = ["I'm not here to be average. I'm here to be awesome."];
quote_array[""] = ["Be fearless in the pursuit of what sets your soul on fire."];
quote_array["Oprah Winfrey"] = ["Think like a queen."];
quote_array[""] = ["A little progress each day adds up to big results"];
quote_array[""] = ["Hope is the only thing stronger than fear"];
quote_array[""] = ["Believe in yourself"];
quote_array[""] = ["Make your dreams happen"];
quote_array[""] = ["I'm going to make you so proud - not to self"];
quote_array[""] = ["Be stronger than your excuses"];
quote_array["Steve Martin"] = ["Be so good they can't ignore you"];
quote_array[""] = ["Sweat is your fat crying"];
quote_array[""] = ["If you're tired of starting over STOP giving up"];
quote_array[""] = ["Wake up. Kick ass. Repeat."];
quote_array[""] = ["Be happy. Be bright. Be you."];
quote_array[""] = ["I'm donig this for ME"];



function randomKey(obj) {
    var ret;
    var c = 0;
    for (var key in obj)
        if (Math.random() < 1/++c)
           ret = key;
    return ret;
}