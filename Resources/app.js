Ti.UI.setBackgroundColor("#000");

var tabGroup = Ti.UI.createTabGroup();

var window1 = Ti.UI.createWindow({
	title:"Photos",
	barColor: "#000",
	url:'photo.js',
	backgroundImage:"images/background.png"
});

var tab1 = Ti.UI.createTab({
	title:"Photos",
	win: window1,
	icon:"images/photos.png"
});

var window2 = Ti.UI.createWindow({
	title:"Audio",
	barColor:"#000",
	url:'audio.js',
	backgroundColor:"images/background.png"
})

var tab2 = Ti.UI.createTab({
	title:"Audio",
	win:window2,
	icon:"images/audio.png"
});

tabGroup.addTab(tab1);
tabGroup.addTab(tab2);

tabGroup.open();
