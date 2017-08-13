var Language = function (language) {
this.language= language.language;
this.About= language.About;
this.Settings= language.Settings;
this.Text= language.Text;
this.Mood= language.Mood;
this.Design= language.Design;
this.Share= language.Share;
this.Insert_text= language.Insert_text;
this.Upload_image= language.Upload_image;
this.Design_options = language.Design_options;
this.Swipe_left_to_change_the_design= language.Swipe_left_to_change_the_design;
this.Choose_language = language.Choose_language;
this.Random = language.Random;
this.Clear = language.Clear;
this.Auto_line_break = language.Auto_line_break;
this.Choose_mood_of_image = language.Choose_mood_of_image;
this.Lovely = language.Lovely;
this.Young = language.Young;
this.Sparkling = language.Sparkling;
this.Serious = language.Serious;
this.Cheerful = language.Cheerful;
this.Sad = language.Sad;
this.Anything_goes = language.Anything_goes;
this.Share_image_via_apps_from_your_phone = language.Share_image_via_apps_from_your_phone;
this.Other = language.Other;
this.Download_image = language.Download_image;
this.Small = language.Small;
this.Medium = language.Medium;
this.Large = language.Large;
this.X_Large = language.X_Large;
this.Print_image = language.Print_image;
this.Please_upgrade = language.Please_upgrade;
this.This_is_only_supported_in_the_full_version_of_inspirly_You_find_it_in_the_app_store_oh_and_it_comes_completely_adfree = language.This_is_only_supported_in_the_full_version_of_inspirly_You_find_it_in_the_app_store_oh_and_it_comes_completely_adfree;
this.OK = language.OK;
this.Error = language.Error;
this.You_can_only_share_if_you_have_the_according_app_installed = language.You_can_only_share_if_you_have_the_according_app_installed;
this.Which_aspect_of_the_image_do_you_like_Mark_what_should_not_be_changed = language.Which_aspect_of_the_image_do_you_like_Mark_what_should_not_be_changed;
this.Fontstyle = language.Fontstyle;
this.Fontsize_and_position = language.Fontsize_and_position;
this.Fontfilling = language.Fontfilling;
this.Frame = language.Frame;
this.Background = language.Background;
this.Texture = language.Texture;
this.Preview_quality = language.Preview_quality;
this.Please_connect_to_the_internet_and_try_again = language.Please_connect_to_the_internet_and_try_again;
this.Picture_has_beend_saved = language.Picture_has_beend_saved;
this.Created_with_inspirly = language.Created_with_inspirly;
this.Get_inspired = language.Get_inspired;
this.Pick_an_app = language.Pick_an_app;
this.terms_en = ko.observable(true);
this.terms_de = ko.observable(false);
};


var ViewModel = function (data) {
    var self = this;
    self.languages = ko.observableArray(
    ko.utils.arrayMap(data, function (i) {
        return new Language(i);
    }));
    self.selectedLanguage = ko.observable();
};

/*
var ViewModel = function (data) {
    var self = this;
//    self.languages = ko.observableArray(
//    ko.utils.arrayMap(data, function (i) {
//       return new Language(i);
//    }));
  //  self.selectedLanguage = ko.observable();
  self.languages = ko.observable();
};
*/
//ko.applyBindings(new ViewModel(languages));


var languages = [
    {
language: "Deutsch",
About: "&Uuml;ber inspirly",
Settings : "Einstellungen",
Text: "Text",
Mood: "Thema",
Design: "Gestalten",
Share: "Teilen",
Insert_text: "Text einf&uuml;gen",
Upload_image: "Bild hochladen",
Design_options : "Designoptionen",
Swipe_left_to_change_the_design: "Neues Design? Nach links wischen.",
Choose_language : "W&auml;hle eine Sprache",
Random : "Zuf&auml;llig",
Clear : "Leeren",
Auto_line_break : "Automatischer Zeilenumbruch",
Choose_mood_of_image : "W&auml;hle ein Styling",
Lovely : "H&uuml;bsch",
Young : "Jung",
Sparkling : "Funkelnd",
Serious : "Seri&ouml;s",
Cheerful : "Fr&ouml;hlich",
Sad : "Traurig",
Anything_goes : "Offen f&uuml;r alles",
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
OK : "Verstanden",
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
    }
];






//This is only supported in the full version of inspirly. You find it in the app store &ndash; oh, and it comes completely adfree.




