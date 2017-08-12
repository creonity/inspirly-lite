//global variables
var activeObject = "";
var canvas =false;
var layers = [];
var layers_completed = [];
var ak_location = "";
var ak_exclusive = "";
var global_values =[];
var canvas_values =[];
var datatype = false;

var history_array = [];
var history_back_counter = 0;





/*
Layer dataset
id name subname type eval startvalue temporary
type 1= val(x)
type 2= html(x)
type 3= val(eval(x))
type 4= html(eval(x))
type 5= prop('checked',eval(x))
type 6= val(x) und subvals
layerObject = activeObject;
*/
var dataset = new Array();
dataset["layer"] = new Array();
dataset["layer"].push(new Array("layer_id",false,4,"get_layer_id(layerObject)",false,true));
dataset["layer"].push(new Array("layer_width",false,3,"Math.round(layerObject.getWidth())",100));
dataset["layer"].push(new Array("layer_height",false,3,"Math.round(layerObject.getHeight())",100));
dataset["layer"].push(new Array("layer_rotation_width",false,3,"Math.round(layerObject.getBoundingRectWidth())",100));
dataset["layer"].push(new Array("layer_rotation_height",false,3,"Math.round(layerObject.getBoundingRectHeight())",100));
dataset["layer"].push(new Array("layer_top",false,3,"Math.round(layerObject.getTop())",40));
dataset["layer"].push(new Array("layer_left",false,3,"Math.round(layerObject.getLeft())",40));
dataset["layer"].push(new Array("layer_rotation",false,3,"Math.round(layerObject.getAngle())",10));
dataset["layer"].push(new Array("selectable",false,5,"layerObject.get('selectable')",true));
dataset["layer"].push(new Array("guide",false,5,"layerObject.get('guide')",false));
//dataset["layer"].push(new Array("layer_type",false,1,false,false));
dataset["layer"].push(new Array("zindex",false,3,"canvas.getObjects().indexOf(layerObject)",false));
dataset["layer"].push(new Array("gamma",false,1,false,50));
dataset["layer"].push(new Array("opacity",false,3,"Math.round(layerObject.getOpacity()*100)",1));
dataset["layer"].push(new Array("hue",false,1,false,100));
dataset["layer"].push(new Array("saturation",false,1,false,100));
dataset["layer"].push(new Array("luminance",false,1,false,100));
dataset["layer"].push(new Array("colorize",false,1,false,""));
dataset["layer"].push(new Array("blur",false,1,false,0));
dataset["layer"].push(new Array("shadow",false,1,false,""));
dataset["layer"].push(new Array("reflection",false,1,false,""));
dataset["layer"].push(new Array("pola",false,1,false,""));
dataset["layer"].push(new Array("filling",new Array("value","option","folder","color"),6,false,new Array("1355344368dMVIPKuEOnhVVyR5IoHZ.jpg","image","background",new Array("","","",""))));
dataset["layer"].push(new Array("vignette",new Array("value","color"),6,false,new Array("","")));
dataset["layer"].push(new Array("radiance",new Array("value","color"),6,false,new Array(0,"rgba(0,0,0,0)")));
dataset["layer"].push(new Array("texture",new Array("value","option","folder"),6,false,new Array("","","")));
dataset["layer"].push(new Array("hald",new Array("value","option","folder"),6,false,new Array("","","")));
dataset["layer"].push(new Array("overlay",new Array("value","option","folder","color"),6,false,new Array("","","","")));
dataset["layer"].push(new Array("shape",new Array("value","option","folder","color"),6,false,new Array("","","","")));
dataset["layer"].push(new Array("displacement",new Array("value","option","folder"),6,false,new Array("","","")));
dataset["layer"].push(new Array("template",new Array("value","alignment","fields","legende","position"),6,false,new Array("","","","","")));
dataset["layer"].push(new Array("font",new Array("value","alignment","option","folder"),6,false,new Array("","","","")));
dataset["layer"].push(new Array("text_content",false,1,false,""));
//dataset["layer"].push(new Array("font_uppercase",false,5,"$('#font_uppercase').prop('checked')",false));
dataset["layer"].push(new Array("font_uppercase",false,5,"layerObject.get('font_uppercase')",false));
dataset["layer"].push(new Array("font_border",new Array("value","color"),6,false,new Array(0,"")));
dataset["layer"].push(new Array("font_psychedelic",new Array("value","color"),6,false,new Array(0,"")));
dataset["layer"].push(new Array("font_spacing_line",false,1,false,1));
dataset["layer"].push(new Array("font_spacing_word",false,1,false,1));
dataset["layer"].push(new Array("font_spacing_letter",false,1,false,1));
//map the indexes
var datasetmap = new Array();
datasetmap["layer"] = new Array();
dataset["layer"].forEach(function(entry) {datasetmap["layer"][entry[0]] = dataset["layer"].indexOf(entry);});

/*
Canvas dataset
*/
dataset["canvas"] = new Array();
dataset["canvas"].push(new Array("canvas_width",false,3,"Math.round(canvas.getWidth())",400));
dataset["canvas"].push(new Array("canvas_height",false,3,"Math.round(canvas.getHeight())",400));
dataset["canvas"].push(new Array("gamma",false,1,false,50));
dataset["canvas"].push(new Array("opacity",false,1,false,100));
dataset["canvas"].push(new Array("hue",false,1,false,100));
dataset["canvas"].push(new Array("saturation",false,1,false,100));
dataset["canvas"].push(new Array("luminance",false,1,false,100));
dataset["canvas"].push(new Array("colorize",false,1,false,""));
dataset["canvas"].push(new Array("hald",new Array("value","option","folder"),6,false,new Array("","","")));
dataset["canvas"].push(new Array("texture",new Array("value","option","folder"),6,false,new Array("","","")));
dataset["canvas"].push(new Array("overlay",new Array("value","option","folder","color"),6,false,new Array("","","","")));
//map the indexes
datasetmap["canvas"] = new Array();
dataset["canvas"].forEach(function(entry) {datasetmap["canvas"][entry[0]] = dataset["canvas"].indexOf(entry);});



function make_file_uploader(upload_btn_id,url,types_accepted,multiple,sendvar_array,callback2)
{
types_accepted = {acceptFiles: types_accepted,}
$('#'+upload_btn_id).fineUploader({
          request: {endpoint: url},
          validation: types_accepted,
          chunking: {enable: true,},
          text: {
            uploadButton: $('#'+upload_btn_id).attr("data-name"),
          },
          template: '<div class="qq-uploader">' +
                      '<pre class="qq-upload-drop-area span12"><span>{dragZoneText}</span></pre>' +
                      '<div class="qq-upload-button btn btn-small">{uploadButtonText}</div>' +
                      '<span class="qq-drop-processing"><span>{dropProcessingText}</span><span class="qq-drop-processing-spinner"></span></span>' +
                      '<ul class="qq-upload-list" style="margin-top: 10px; text-align: center;"></ul>' +
                    '</div>',
          classes: {
            success: 'alert alert-success',
            fail: 'alert alert-error'
          },
          debug: false,
          multiple: multiple,
        });     
$('#'+upload_btn_id).on('complete', function(event, id, fileName, response) {callback2(response);})
var sendvar=sendvar_array[0];
var sendvar_array =[];
sendvar_array[0] = $('#'+upload_btn_id).attr("data-"+sendvar);
$('#'+upload_btn_id).on('submit', function(event, id, name) {$(this).fineUploader('setParams', {sendvar_array});})

//$("#fine-uploader2").on('submitted', function(event, id, fileName, response) {$(".qq-upload-button .icon-upload").attr("class","icon-spinner icon-spin");});

 }
 
 
 
 
function show_layer_on_canvas(callback)
{
var layer_id = layers.length;
layers[layer_id] = [];
fabric.Image.fromURL('/img/logo.png', function(image) {
canvas.add(layers[layer_id]["canvasdata"] = image.set({
          left: 50,
          top: 50,
          width:100,
          height:100,
          angle:0,
          opacity: 1.0,
          padding: 0,
          cornersize:10,
          hasRotatingPoint:true,
          originX:'center',
          originY:'center',
    }));

//*canvas.setActiveObject(layers[layer_id]["canvasdata"]);

for(var i in dataset["layer"]){
var dataset_name = dataset["layer"][i][0];
var dataset_subname = dataset["layer"][i][1];
var dataset_type = dataset["layer"][i][2];
var dataset_eval = dataset["layer"][i][3];
var dataset_value = dataset["layer"][i][4];
if(dataset_type<=5){
layers[layer_id]["canvasdata"][dataset_name]=dataset_value;}
if(dataset_type==6){
layers[layer_id]["canvasdata"][dataset_name]=[];for(var i in dataset_subname){layers[layer_id]["canvasdata"][dataset_name][dataset_subname[i]]=dataset_value[i];
}}
}

//*set_data_to_input_from_fabric("layer");

if(issetvar(callback)){callback(layer_id);}
},{crossOrigin:'anonymous'});
}



function replace_image_on_canvas(image_url,layer_data_string,complete)
{
//console.log("replace_image_on_canvas("+image_url+" ,"+layer_data_string+")");
var layer_data = jQuery.parseJSON(layer_data_string);
var layer_id = layer_data["layer_id"];
var updatedImage = new Image();
updatedImage.src = image_url;

updatedImage.onload = function() {
var imgHeight = this.height;
var imgWidth = this.width;
var layer_data = jQuery.parseJSON(layer_data_string);
var opacity = layer_data["opacity"];
layer_data_string = get_layer_data_from_canvas(layers[layer_id]["canvasdata"]);
var layer_data = jQuery.parseJSON(layer_data_string);
var layer_width = layer_data["layer_width"];
var layer_height = layer_data["layer_height"];
//Correct if changed inbetween
imgHeight=imgHeight/(imgWidth/layer_width);
imgWidth=layer_width;
layer_data["layer_width"]=imgWidth;
layer_data["layer_height"]=imgHeight;
layer_data["opacity"]=opacity;
layer_data_string = JSON.stringify(layer_data, ";");
layers[layer_id]["canvasdata"].setSrc(image_url,function(){canvas.renderAll();if(complete){complete(layer_id);}},{
crossOrigin : 'anonymous',
width:imgWidth,
height:imgHeight,
});

//layers[layer_id]["canvasdata"].setElement(updatedImage);


layers[layer_id]["canvasdata"].set({
        scaleX: 1,
        scaleY: 1,
        opacity: parseInt(opacity)/100,
    });

//change_layer_on_canvas(layer_data_string);
layers[layer_id]["canvasdata"].setCoords();
};

}


function load_canvas(canvasfile_string,complete)
{
layers.length = 0;
canvas.clear();
var canvasfile = jQuery.parseJSON(canvasfile_string);
//Load Canvas
canvas_data_string = JSON.stringify(canvasfile["canvas"]);
set_data_to_input_from_datastring(canvas_data_string,"canvas");
change_canvas_size(canvas_data_string);

//Sort Layers by Zindex & add all layers to cue
var all_layers =[];for(var i in canvasfile["layers"]){all_layers[canvasfile["layers"][i]["zindex"]]=canvasfile["layers"][i];layers_completed[canvasfile["layers"][i]["layer_id"]]=0;}


//Add Layers
for(var i in all_layers)
{
layer_data_string = JSON.stringify(all_layers[i]);
load_layer(layer_data_string,complete);
}
}

function sleep(ms) {
    var unixtime_ms = new Date().getTime();
    while(new Date().getTime() < unixtime_ms + ms) {}
}


function load_layer(layer_data_string,complete)
{
//datatype ="layer";
show_layer_on_canvas(function(layer_id){



set_data_to_canvas(layer_id,layer_data_string,"layer");
//set_data_to_input_from_datastring(layer_data_string,"layer");
//change_layer_on_canvas(get_layer_data_from_canvas(activeObject,"layer"));

//replace layer_id in string with new layer_id
//layer_data_string = get_layer_data_from_canvas(layers[layer_id]["canvasdata"],"layer",true);
replace_layer_id(layer_id,layer_data_string);


change_layer_on_canvas(layer_data_string,layer_id);

calc_layer(get_layer_data_from_canvas(layers[layer_id]["canvasdata"],"layer"),complete);
}
);
}

function replace_layer_id(layer_id,layer_data_string)
{
var data_array = jQuery.parseJSON(layer_data_string);
data_array["layer_id"]=layer_id;
layer_data_string = JSON.stringify(data_array, ";");
return layer_data_string;
}


function calc_layer(layer_data_string,complete)
{
//console.log("calc_layer("+layer_data_string+")");
var layer_data = jQuery.parseJSON(layer_data_string);
var layer_id = layer_data["layer_id"];
if(datatype=="layer"){layers[layer_id]["canvasdata"].setOpacity(0.2);}


var dataToSend = "layer1="+layer_data_string+"&render_quality="+global_values["render_quality"];

$.ajax({
  url: "/create/get_image.php",
  type: "POST",
  global: false,
  data: dataToSend, 
  success: function(msg, error) {
//  console.log(msg.getElementsByTagName('debug')[0].firstChild.nodeValue);
var image_url	= msg.getElementsByTagName('final_img')[0].firstChild.nodeValue;
replace_image_on_canvas(image_url,layer_data_string,complete)
},
error: function (msg, textStatus, errorThrown) {
        alert(errorThrown+' POST failed. Please try again.');
    }
    });
}

function change_layer_on_canvas(layer_data_string,layer_id)
{



var layer_data = jQuery.parseJSON(layer_data_string);
if(!layer_id){layer_id = layer_data["layer_id"];}
//var layer_id = layer_data["layer_id"];


layers[layer_id]["canvasdata"].set({
        left: parseInt(layer_data["layer_left"]),
        top: parseInt(layer_data["layer_top"]),
        angle: parseInt(layer_data["layer_rotation"]),
        opacity: parseInt(layer_data["opacity"])/100,
        selectable: layer_data["selectable"],
        width: parseInt(layer_data["layer_width"]),
        height: parseInt(layer_data["layer_height"]),
    });
var layer_data = jQuery.parseJSON(layer_data_string);


//layer_zindex(layer_data_string);

layers[layer_id]["canvasdata"].setCoords();

}

function sort_by_zindex()
{
canvas.forEachObject(function(object){ 
canvas.moveTo(object, object["zindex"]);
})

}


function layer_zindex(layer_data_string)
{
var layer_data = jQuery.parseJSON(layer_data_string);
console.log("oku"+layer_data["layer_id"]+" "+layer_data["zindex"]);
canvas.moveTo(layers[layer_data["layer_id"]]["canvasdata"], layer_data["zindex"]);
}



function set_data(layerObject,name,value)
{
layers[get_layer_id(layerObject)]["canvasdata"][name]= value; 
}
function set_subdata(layerObject,name,subname,value)
{
console.log(name+" "+subname+" "+value);
layers[get_layer_id(layerObject)]["canvasdata"][name][subname]= value;
}

function delete_data(dataset_name)
{
add_history();
var dataset_name_array = dataset_name.split(",");
for(var x in dataset_name_array)
{
dataset_name=dataset_name_array[x];
var i = datasetmap[datatype][dataset_name];
var dataset_subname = dataset[datatype][i][1];
var dataset_type = dataset[datatype][i][2];
var dataset_value = dataset[datatype][i][4];

if(dataset_type<=5){layers[get_layer_id(layerObject)]["canvasdata"][dataset_name]=dataset_value;}
if(dataset_type==6){
layers[get_layer_id(layerObject)]["canvasdata"][dataset_name]=[];for(var i in dataset_subname){layers[get_layer_id(layerObject)]["canvasdata"][dataset_name][dataset_subname[i]]=dataset_value[i];
}}
}
set_data_to_input_from_fabric(); 
calc_image(get_data_from_input("layer"));
hide_sidemenu();
}

function set_global_value(id)
{
global_values[id]=$("#"+id).val();
}

/*
function make_backgorund_layer()
{
$("#layer_top").val($("#canvas_height").val()/2);
$("#layer_left").val($("#canvas_width").val()/2);
$("#layer_width").val($("#canvas_width").val());
$("#layer_height").val($("#canvas_height").val());
$("#layer_rotation").val(0);
$("#zindex").val(-1000);
$("#selectable").val([]);
layer_zindex(get_data_from_input());
var layer_data_string=get_data_from_input();
change_layer_on_canvas(layer_data_string);
canvas.deactivateAll().renderAll();
}
*/

function change_canvas_size(canvas_data_string)
{
var canvas_data = jQuery.parseJSON(canvas_data_string);
canvas.setWidth(canvas_data["canvas_width"]);
canvas.setHeight(canvas_data["canvas_height"]);
}

/*
function change_layer_opacity(layer_data_string)
{
var layer_data = jQuery.parseJSON(layer_data_string);
var layer_id = layer_data["layer_id"];
layers[layer_id]["canvasdata"].set({
        opacity: parseInt(layer_data["layer_opacity"])/100
    });
canvas.renderAll();
}
*/

/*
function change_layer_selectable(layer_data_string)
{
var layer_data = jQuery.parseJSON(layer_data_string);
var layer_id = layer_data["layer_id"];
layers[layer_id]["canvasdata"].set({
        selectable: layer_data["layer_selectable"]
    });
canvas.deactivateAll().renderAll();
}
*/

function make_all_selectable()
{
canvas.forEachObject(function(object){ object.selectable = true })
}

function check_all_completed(complete)
{
var all_completed = true;
for(var i in layers_completed){if(layers_completed[i]==0){all_completed=false;}}
if(all_completed){complete();return true;}else{return false;}
}

/*
function change_layer_size(layer_data_string)
{
var layer_data = jQuery.parseJSON(layer_data_string);
var layer_id = layer_data["layer_id"];
layers[layer_id]["canvasdata"].set({
        width: parseInt(layer_data["layer_width"]),
        height: parseInt(layer_data["layer_height"]),
    });
set_data_to_input_from_fabric(); 
layers[layer_id]["canvasdata"].setCoords();
canvas.renderAll();
}
*/






function remove_layer(layer_id)
{
canvas.remove(layers[layer_id]["canvasdata"]);
}


/*
function zindex_layers()
{
for(var i=0;i<canvas.getObjects().length;i++)
{
layer_id = get_layer_id(canvas.getObjects()[i]);
layers[layer_id]["canvasdata"]["zindex"]= canvas.getObjects().indexOf(layers[layer_id]["canvasdata"]);
set_data_to_input_from_fabric();
}
}

function sort_layers()
{
for(var i=0;i<canvas.getObjects().length;i++)
{
layer_zindex(layer_data_string)
}
}
*/




function calc_image(data_string)
{
if(datatype=="layer"){calc_layer(data_string);}
if(datatype=="canvas"){calc_canvas();}
}




function calc_canvas()
{
var canvasfile_string = save_canvas();
var dataToSend = "canvasfile_string="+canvasfile_string+"&render_quality="+global_values["render_quality"];;

$.ajax({
  url: "/create/get_image.php",
  type: "POST",
  global: false,
  data: dataToSend, 
  success: function(msg, error) {
//  console.log(msg.getElementsByTagName('debug')[0].firstChild.nodeValue);
var image_url	= msg.getElementsByTagName('final_img')[0].firstChild.nodeValue;
//canvas.setOverlayImage(image_url, canvas.renderAll.bind(canvas), {opacity: 1,width: canvas.width,height: canvas.height,});
canvas.setOverlayImage(image_url, function(){canvas.renderAll()}, {opacity: 1,width: canvas.width,height: canvas.height,});
},
error: function (msg, textStatus, errorThrown) {alert(errorThrown+' POST failed. Please try again.');}
    });
}



//datatype of dataset either layer or canvas
function set_data_to_input_from_fabric(given_datatype)
{

if(issetvar(given_datatype)){datatype=given_datatype;}
for(var i in dataset[datatype]){
var dataset_name = dataset[datatype][i][0];
var dataset_subname = dataset[datatype][i][1];
var dataset_type = dataset[datatype][i][2];
var dataset_eval = dataset[datatype][i][3];
var dataset_value = dataset["layer"][i][4];

layerObject = activeObject;
if(dataset_type==1){$("#"+dataset_name).val(layers[get_layer_id(layerObject)]["canvasdata"][dataset_name]);}
if(dataset_type==2){$("#"+dataset_name).html(layers[get_layer_id(layerObject)]["canvasdata"][dataset_name]);}
if(dataset_type==3){$("#"+dataset_name).val(eval(dataset_eval));}
if(dataset_type==4){$("#"+dataset_name).html(eval(dataset_eval));}
if(dataset_type==5){$("#"+dataset_name).prop('checked',eval(dataset_eval));}
if(dataset_type==6){
if(issetvar(layers[get_layer_id(layerObject)]["canvasdata"][dataset_name])){$("#"+dataset_name).val(layers[get_layer_id(layerObject)]["canvasdata"][dataset_name]["value"]);
for(var i in dataset_subname){if(i>0){
if($("#"+dataset_name+"_"+dataset_subname[i]).prop("tagName") == "INPUT"){
$("#"+dataset_name+"_"+dataset_subname[i]).val(layers[get_layer_id(layerObject)]["canvasdata"][dataset_name][dataset_subname[i]]);}
else{$("#"+dataset_name+"_"+dataset_subname[i]).html(layers[get_layer_id(layerObject)]["canvasdata"][dataset_name][dataset_subname[i]]);}
}}}}
}
}







function get_data_from_input(given_datatype)
{
console.log("get_data_from_input");
if(issetvar(given_datatype)){datatype=given_datatype;}
var data_array = {};
for(var i in dataset[datatype]){
var dataset_name = dataset[datatype][i][0];
var dataset_subname = dataset[datatype][i][1];
var dataset_type = dataset[datatype][i][2];
var dataset_eval = dataset[datatype][i][3];
if(dataset_type==1 || dataset_type==3){data_array[dataset_name]=$("#"+dataset_name).val();}
if(dataset_type==2 || dataset_type==4){data_array[dataset_name]=$("#"+dataset_name).html();}
if(dataset_type==5){data_array[dataset_name]=$('#'+dataset_name).prop('checked');}
if(dataset_type==6){
data_array[dataset_name]={};
data_array[dataset_name]["value"]=$("#"+dataset_name).val();
for(var i in dataset_subname){
if(i>0){data_array[dataset_name][dataset_subname[i]]=$("#"+dataset_name+"_"+dataset_subname[i]).html();}
}}
}
var data_string = JSON.stringify(data_array, ";");
return data_string;
}





function set_data_to_input_from_datastring(data_string,given_datatype)
{
if(issetvar(given_datatype)){datatype=given_datatype;}

var data_array = jQuery.parseJSON(data_string);

for(var i in dataset[datatype]){
var dataset_name = dataset[datatype][i][0];
var dataset_subname = dataset[datatype][i][1];
var dataset_type = dataset[datatype][i][2];
var dataset_eval = dataset[datatype][i][3];
var dataset_temp = dataset[datatype][i][5];
if(!dataset_temp)
{
if(dataset_type==1 || dataset_type==3){$("#"+dataset_name).val(data_array[dataset_name]);}
if(dataset_type==2 || dataset_type==4){$("#"+dataset_name).html(data_array[dataset_name]);}
if(dataset_type==5){$("#"+dataset_name).prop('checked',data_array[dataset_name]);}
if(dataset_type==6){
if(!issetvar(data_array[dataset_name])){data_array[dataset_name]=[];data_array[dataset_name]["value"]="";}
$("#"+dataset_name).val(data_array[dataset_name]["value"]);for(var i in dataset_subname){if(i>0){
if(!issetvar(data_array[dataset_name][dataset_subname[i]])){data_array[dataset_name][dataset_subname[i]]="";}
$("#"+dataset_name+"_"+dataset_subname[i]).html(data_array[dataset_name][dataset_subname[i]]);}}}
}
}
}






function set_data_to_canvas(layer_id,data_string,given_datatype)
{
if(issetvar(given_datatype)){datatype=given_datatype;}

if(issetvar(data_string)){var data_array = jQuery.parseJSON(data_string);}else{var data_array = new Object();}
for(var i in dataset[datatype]){
var dataset_name = dataset[datatype][i][0];
var dataset_subname = dataset[datatype][i][1];
var dataset_type = dataset[datatype][i][2];
var dataset_eval = dataset[datatype][i][3];
var dataset_temp = dataset[datatype][i][5];
if(!dataset_temp)
{
if(dataset_type<=5){layers[layer_id]["canvasdata"][dataset_name]= data_array[dataset_name];}
if(dataset_type==6){
layers[layer_id]["canvasdata"][dataset_name]=[];
if(!issetvar(data_array[dataset_name])){data_array[dataset_name]=[]}
for(var i in dataset_subname){
if(!issetvar(data_array[dataset_name][dataset_subname[i]])){data_array[dataset_name][dataset_subname[i]]="";}
layers[layer_id]["canvasdata"][dataset_name][dataset_subname[i]]=data_array[dataset_name][dataset_subname[i]];
}
}
}
}
}






function get_layer_data_from_canvas(layerObject,given_datatype,cleanup)
{
if(issetvar(given_datatype)){var datatype_old = datatype;datatype=given_datatype;}else{datatype_old = datatype;}
var layer_data = {};
var layer_id = get_layer_id(layerObject);

for(var i in dataset[datatype]){
var dataset_name = dataset[datatype][i][0];
var dataset_subname = dataset[datatype][i][1];
var dataset_type = dataset[datatype][i][2];
var dataset_eval = dataset[datatype][i][3];
if(dataset_type==1 || dataset_type==2){layer_data[dataset_name]=layers[layer_id]["canvasdata"][dataset_name];}
if(dataset_type==3|| dataset_type==4){layer_data[dataset_name]=eval(dataset_eval);}
if(dataset_type==5){layer_data[dataset_name]=eval(dataset_eval);}
if(dataset_type==6){
if(issetvar(layers[layer_id]["canvasdata"][dataset_name])){
layer_data[dataset_name]={};
for(var i in dataset_subname){
if(issetvar(layers[layer_id]["canvasdata"][dataset_name][dataset_subname[i]])){layer_data[dataset_name][dataset_subname[i]]=layers[layer_id]["canvasdata"][dataset_name][dataset_subname[i]];}
}
}
}

if(cleanup)
{
//delete empty vars
if(dataset_type<=5){if(!issetvar(layer_data[dataset_name])){delete layer_data[dataset_name];}}
if(dataset_type==6){
if(issetvar(layers[layer_id]["canvasdata"][dataset_name])){
for(var i in dataset_subname){
if(issetvar(layers[layer_id]["canvasdata"][dataset_name][dataset_subname[i]])){
if(!issetvar(layer_data[dataset_name][dataset_subname[i]])){delete layer_data[dataset_name][dataset_subname[i]];}
}
}
if(jQuery.isEmptyObject(layer_data[dataset_name])){delete layer_data[dataset_name];}
}
}
}

}
var layer_data_string = JSON.stringify(layer_data, ";");
datatype=datatype_old;
return layer_data_string;
}






function add_layer()
{
show_layer_on_canvas(false);
}


function save_canvas()
{
var canvasfile = new Object(); 
var layers = new Object(); 

//get Canvas data
var canvasdata_string=get_layer_data_from_canvas("canvas","canvas",true);
var canvas_data = jQuery.parseJSON(canvasdata_string);
canvasfile["canvas"]=canvas_data;


//get all layerdatas
var counter = 0;
canvas.forEachObject(function(layerObject){ 
var layer_data_string = get_layer_data_from_canvas(layerObject,"layer",true);
var layer_data = jQuery.parseJSON(layer_data_string);
layers[counter]=layer_data;
counter = counter+1;})
canvasfile["layers"]=layers;


//Save Canvasfile
var canvasfile_string = JSON.stringify(canvasfile);
$("#canvasfile").val(canvasfile_string);
return canvasfile_string;
}








function get_layer_id(layerObject)
{
if(layerObject=="canvas"){layer_id="canvas";}
else{var layer_id="";var counter = 0;while (layer_id == "" && counter <= 100) {if(issetvar(layers[counter])){if(layers[counter]["canvasdata"]===layerObject){layer_id = counter;}}counter++;}}
return layer_id;
}


function issetvar(checkvar)
{
if(typeof(checkvar) !== "undefined" && checkvar !== null && checkvar !== false && checkvar !== ""){return true;}else{return false;}
}