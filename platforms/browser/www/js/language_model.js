var resources = [];
var languageModel = [];

//German
var german_lang =
    {
language: "Deutsch",
About: "&Uuml;ber inspirly",
Settings : "Einstellungen",
Text: "Text",
Template: "Vorlage",
Image: "Bild",
Designer: "Designer",
Share: "Teilen",
Insert_text: "Text einf&uuml;gen",
Upload_image: "Bild hochladen",
Design_options : "Designoptionen",
Swipe_left_to_change_the_design: "Neues Design? Nach links wischen.",
Choose_language : "W&auml;hle eine Sprache",
Random : "Zuf&auml;llig",
Clear : "Leeren",
Auto_line_break : "Automatischer Zeilenumbruch",
Choose_mood_of_image : "W&auml;hle einen Style...",
Lovely : "H&uuml;bsch",
Young : "Jung",
Sparkling : "Funkelnd",
Serious : "Seri&ouml;s",
Cheerful : "Fr&ouml;hlich",
Sad : "Traurig",
Anything_goes : "Experimentell",
Share_image_via_apps_from_your_phone : "Teile das Bild per App",
Other : "Andere",
Download_image : "Bild herunterladen",
Small : "Klein",
Medium : "Mittel",
Large : "Gross",
X_Large : "Poster",
Print_image : "Bild drucken",
Please_upgrade : "Nicht verf&uuml;gbar",
This_is_only_supported_in_the_full_version_of_inspirly_You_find_it_in_the_app_store_oh_and_it_comes_completely_adfree : "F&uuml;r diese Option brauchst du die Vollversion von inspirly aus dem Appstore, welche zudem werbefrei ist.",
OK : "OK",
Error : "Fehler!",
You_can_only_share_if_you_have_the_according_app_installed : "Daf&uuml;r musst du erst die dazugeh&ouml;rige App installieren.",
Which_aspect_of_the_image_do_you_like_Mark_what_should_not_be_changed : "Welcher Aspekt des Designs gef&auml;llt dir? Markiere was sich nicht mehr &auml;ndern soll.",
Fontstyle : "Schriftart",
Fontsize_and_position : "Schriftgr&ouml;sse und Pos.",
Fontfilling : "Schriftf&uuml;llung",
Frame : "Rahmen",
Background : "Hintergrund",
Texture : "Struktur",
Preview_quality : "Qualit&auml;t der Vorschau",
Please_connect_to_the_internet_and_try_again : "Bitte mit dem Internet verbinden und nochmals versuchen.",
Picture_has_beend_saved : "Bild in deiner Gallerie gespeichert.",
Created_with_inspirly : "Erstellt mit inspir.ly",
Get_inspired : "Inspiration f&uuml;r dich",
Pick_an_app : "W&auml;hle eine App aus",
terms_en : ko.observable(false),
terms_de : ko.observable(true),
High_preview_quality_switch_off_if_images_load_slowly : "Hohe Qualit&auml;t der Vorschaubilder - Ausschalten falls Bilder nur langsam geladen werden",
Go_back : "Zur&uuml;ck",
Trainer_mode_help_our_inspirly_Designer_AI_to_become_better : "Trainingsmodus - Hilf unserer inspirly Designer KI besser zu werden",
How_do_you_like_it : "Wie gef&auml;llt es dir?",
Rate_app : "Bewerte %@",
Rate_msg : "Gef&auml;llt dir %@? Wir w&uuml;rden uns &uuml;ber deine Bewertung sehr freuen! Es geht ganz schnell. Vielen Dank!",
Rate_later: "Ein anderes Mal",
Rate_cancel : "Nein, Danke",
Rate_btn : "Jetzt bewerten",
Crop_image : "Bild zuschneiden",
Crop : "Zuschneiden",
Cancel : "Abbrechen",
no_pics_pixabay: "Leider keine Bilder gefunden.",
Choose_template: "... oder W&auml;hle eine gespeicherte Vorlage",
Favorite_has_beend_saved: "Zu deinen Vorlagen hinzugef&uuml;gt",
Confirm_Delete_Favorite: "Willst du diese Vorlagen l&ouml;schen?",
Confirm : "Best&auml;tige",
Optimize_to_share : "Bitte warte kurz. Das Bild wird f&uuml;rs teilen optimiert.",
Optimize_to_download : "Bitte warte kurz. Das Bild wird f&uuml;rs den Download optimiert.",
Optimize_to_print : "Bitte warte kurz. Das Bild wird f&uuml;rs den Druck optimiert.",
    };

$.each(german_lang, function(index, value) {
if(!resources[index]){resources[index] = [];}
resources[index]["de"] = value;
});


var english_lang =
    {
language: "English",
About: "About",
Settings : "Settings",
Text: "Text",
Template: "Template",
Image: "Image",
Designer: "Designer",
Share: "Share",
Insert_text: "Insert text",
Upload_image: "Upload image",
Design_options : "Design options",
Swipe_left_to_change_the_design: "Swipe left to change the design",
Choose_language : "Choose language",
Random : "Random",
Clear : "Clear",
Auto_line_break : "Auto line break",
Choose_mood_of_image : "Choose mood of image...",
Lovely : "Lovely",
Young : "Young",
Sparkling : "Sparkling",
Serious : "Serious",
Cheerful : "Cheerful",
Sad : "Sad",
Anything_goes : "Experimental",
Share_image_via_apps_from_your_phone : "Share image via apps from your phone",
Other : "Other",
Download_image : "Download image",
Small : "Small",
Medium : "Medium",
Large : "Large",
X_Large : "X-Large",
Print_image : "Print image",
Please_upgrade : "Please upgrade",
This_is_only_supported_in_the_full_version_of_inspirly_You_find_it_in_the_app_store_oh_and_it_comes_completely_adfree : "This is only supported in the full version of inspirly. You find it in the app store &ndash; oh, and it comes completely adfree.",
OK : "OK",
Error : "Error!",
You_can_only_share_if_you_have_the_according_app_installed : "You can only share if you have the according app installed!",
Which_aspect_of_the_image_do_you_like_Mark_what_should_not_be_changed : "Which aspect of the image do you like? Mark what should not be changed.",
Fontstyle : "Fontstyle",
Fontsize_and_position : "Fontsize and position",
Fontfilling : "Fontfilling",
Frame : "Frame",
Background : "Background",
Texture : "Texture",
Preview_quality : "Preview quality",
Please_connect_to_the_internet_and_try_again : "Please connect to the internet and try again",
Picture_has_beend_saved : "Picture has beend saved",
Created_with_inspirly : "Created with inspirly",
Get_inspired : "Get inspired",
Pick_an_app : "Pick an app",
terms_en : ko.observable(true),
terms_de : ko.observable(false),
High_preview_quality_switch_off_if_images_load_slowly : "High preview quality - switch off if images load slowly",
Go_back : "Go back",
Trainer_mode_help_our_inspirly_Designer_AI_to_become_better : "Trainer mode - help our inspirly Designer AI to become better",
How_do_you_like_it : "Do you like it? Please rate.",
Rate_app : "Rate %@",
Rate_msg : "If you enjoy using %@, would you mind taking a moment to rate it? It won’t take more than a minute. Thanks for your support!",
Rate_later: "No, Thanks",
Rate_cancel : "Remind Me Later",
Rate_btn : "Rate It Now",
Crop_image : "Crop image",
Crop : "Crop",
Cancel : "Cancel",
no_pics_pixabay: "Oops, couldn't find any images.",
Choose_template: "... or choose a saved template",
Favorite_has_beend_saved: "Added to your templates",
Confirm_Delete_Favorite: "Do you want to delete this template?",
Confirm : "Confirm",
Optimize_to_share : "Please wait. We optimize your image for sharing.",
Optimize_to_download : "Please wait. We optimize your image downloading.",
Optimize_to_print : "Please wait. We optimize your image for printing.",
    };

$.each(english_lang, function(index, value) {
if(!resources[index]){resources[index] = [];}
resources[index]["en"] = value;
});



$.each(german_lang, function(index, value) {
languageModel[index] = ko.observable();
});








