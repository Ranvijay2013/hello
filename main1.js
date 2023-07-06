prediction_1 = "";
  Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
  });

  camera = document.getElementById("camera");

Webcam.attach( '#camera' );

      
function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

  console.log('ml5 version:', ml5.version);
  
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/E7tdJfcN2/model.json',modelLoaded);

  function modelLoaded() {
    console.log('Model Loaded!');
  }
      
  function check()
  {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
  }

function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    
    document.getElementById("result_object_name").innerHTML = results[0].label;
    gesture = results[0].label;
    
    toSpeak = "";
    
    if(gesture == "face with medical mask")
    {
      toSpeak = "You are wearing a mask";
      document.getElementById("result_object_gesture_icon").innerHTML = "&#128567;";
    }
    else if(gesture == "no entry sign")
    {
      toSpeak = "You are not wearing a mask";
      document.getElementById("result_object_gesture_icon").innerHTML = "&#128683;";
    }

    speak();
  }
}


function speak(){
    var synth = window.speechSynthesis;

    speakdata = toSpeak;

    var utterThis = new SpeechSynthesisUtterance(speakdata);

    synth.speak(utterThis);

}