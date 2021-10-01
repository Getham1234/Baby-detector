status = "";
objects = [];
song = "";

function prelaod(){
    song = loadSound("alarm_alarm_alarm.mp3")
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);

    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(video, 0, 0, 380, 380);
    if (status!=""){
        objectDetector.detect(video, gotResults);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML = "Objects Detected";
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label=="person"){
                document.getElementById("number_of_objects").innerHTML = "Baby Found";
            }
        }
    }
}