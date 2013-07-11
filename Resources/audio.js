var win = Ti.UI.currentWindow;

var file;
var timer;
var sound;
var duration = 0;

var label1 = Ti.UI.createLabel({
	text:"",
	top:100,
	color:"grey",
	textAlign:"center",
	width:"auto",
	height:"auto"
});

var lineType = Ti.UI.createLabel({
	text:"line type: "+lineTypeToStr(),
	bottom:20,
	color:"black",
	textAlign:"center",
	width:"auto",
	height:"auto"
});

var vol = Ti.UI.createlabel({
	text: "vol: "+Ti.Media.Volume,
	bottom: 55,
	color:"black",
	textAlign:"center",
	width:"auto",
	height:"auto"
});

var hiFi = Ti.UI.createLabel({
	text:"hi-fi",
	textAlign:"center",
	height:"auto",
	width:"auto",
	color:"black",
	bottom:120
});

var swtch = Ti.UI.createSwitch({
	value:false,
	bottom:80
});

var rec = Ti.UI.createButton({
	title:"Record",
	height:60,
	width:180,
	bottom:400
});

var play = Ti.UI.createButton({
	title:"Play",
	height:60,
	width:180,
	bottom:380
});

var recorder = Ti.UI.createAudioRecorder({
	compression:Ti.Media.AUDIO_FILE_FORMAT_LINEAR_PCM,
	format:Ti.Media.AUDIO_FILEFORMAT_CAF
});

Ti.Media.addEventListener("recordinginput", function(e){
	Ti.API.info("Input: " +e.available);
	if (!e.available && recorder.recording){
		rec.fireEvent("click", {});
	}
});

Ti.Media.addEventListener("linechange", function(e){
	lineType.text = "audio line type: "+lineTypeToStr();
});

Ti.Media.addEventListener("volume", function(e){
	vol.text = "vol: "e.volume;
});

function lineTypeToStr(){
	
	var type = Ti.Media.audioLineType;
	
	switch(type){
		case Ti.Media.AUDIO_HEADSET_INOUT:
			return "headset";
		case Ti.Media.AUDIO_RECEIVER_AND_MIC:
			return "receiver + mic";
		case Ti.Media.AUDIO_HEADPHONES_AND_MIC:
			return "headphones + mic";
		case Ti.Media.AUDIO_HEADPHONES:
			return "headphones";
		case Ti.Media.AUDIO_LINEOUT:
			return "lineout";
		case Ti.Media.AUDIO_SPEAKER:
			return "loud speaker";
		case Ti.Media.AUDIO_MICROPHONE:
			return "microphone";
		case Ti.Media.AUDIO_MUTED:
			return "mute";
		case Ti.Media.AUDIO_UNAVAILABLE:
			return "unavailable";
		case Ti.Media.AUDIO_UNKNOWN:
			return "media unknown";
	}
}

function showLevels(){
	var peakMeter = Ti.Media.peakMicrophonePower;
	var avgMeter = Ti.Media.averageMicrophonePower;
	duration++;
	
	label.text = "duration: "+duration+"seconds, peak power: "+peakMeter+"avg power: "+avgMeter;
}

rec.addEventListener("click", function(e){
	if (rec.title == "stop"){
		file = recorder.stop();
		rec.title = "Record";
		play.show();
		clearInterval(timer);
		Ti.Media.stopMicrophoneMonitor();
	}else{
		if (!Ti.Media.canRecord) {
			Ti.UI.createAlertDialog({
				title:"Error!",
				message:"Unable To Record"
			}).show();
			return;
		}rec.title = "Stop";
		recorder.start();
		play.hide();
		Ti.Media.startMicrophoneMonitor();
		duration = 0;
		timer = setInterval(showLevels, 1000);
	}
});

play.addEventListener("click", function(e){
	if (sound && sound.playing){
		sound.stop();
		sound.release();
		sound = null;
		play.title = "Playing";
	}else{
		Ti.API.info("file size: "+file.size);
		sound = Ti.Media.createSound({sound:file});
		sound.addEventListener("complete", function(e){
			play.title = "Start Playing";
		});
		sound.play();
		play.title = "Stop Playing";
	}
});

swtch.addEventListener("change", function(e){
	if(swtch.value==false){
		recorder.compression = Ti.Media.AUDIO_FORMAT_ULAW;
	}else{
		recorder.compression = Ti.Media.AUDIO_FORMAT_LINEAR_PCM;
	}
})

win.add(label1);
win.add(lineType);
win.add(vol);
win.add(hiFi);
win.add(swtch);
win.add(rec);
win.add(play);
