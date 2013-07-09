var win = Ti.UI.currentWindow;

var scrollView = Ti.UI.createScrollableView({
	left:17,
	top:15,
	width:win.width - 14,
	height:win.width - 20,
	views:[],
	currentPage:0,
	zIndex:1
});

scrollView.addEventListener('scroll', function(e){
	Ti.API.info("Scrolling Page= " +e.source.currentPage);
});

win.add(scrollView);


var optDialog = Ti.UI.createOptionDialog({
	title: "Select from the options below please",
	options: ["Camera", "Photo Gallery", "Cancel"],
	cancel:2
});

optDialog.addEventListener("click", function(e){
	Ti.API.info("Your Selection:" + e.index);
	if(e.index == 0) {
		//Camera
		Ti.Media.showCamera({
			success: function(e){
				var image = e.media;
				if(e.mediaType == Ti.Media.MEDIA_TYPE_PHOTO){
					var imgVw = Ti.UI.createImageView({
						top:20,
						left:20,
						height:300,
						width:280
					});
					imgVw.image = image;
					win.add(imgVw);
				}
			},
			cancel:function(){
				//Cancelled
			},
			error:function(e){
				
				var alert = Ti.UI.createAlertDialog({
					title:"Camera"
				});
				if (error.code == Ti.Media.NO_CAMERA){
					alert.message("This Device Has No Camera");
				}else{
					alert.message("Error: " + error.code);
				}
				alert.show();
			},
			allowImageEditing:true,
			saveToPhotoGallery:false
		});
	} else{
		// cancelled
	}
	
	if(e.index == 1){
	Ti.Media.openPhotoGallery({
		success:function(e){
			var image = e.media;
			
			Ti.API.debug("Type: "+e.mediaType);
			
			if(e.mediaType = Ti.Media.MEDIA_TYPE_PHOTO){
				var imgVw = Ti.UI.createImageView({
					top: 0,
					left: 0,
					width: 288,
					height:330,
					image:image
				});
				
				scrollView.add(imgVw);
			}
		},
		cancel:function(){
			//cancelled
		}
	});
	}else{
		//cancelled
	}
});

var butn = Ti.UI.createButton({
	title:"Select"
});

butn.addEventListener("click", function(e){
	optDialog.show();
});

var butnSavePhoto = Ti.UI.createButton({
	title:"Save",
	zIndex:2
});

butnSavePhoto.addEventListener("click", function(e){
	var media = scrollView.toImage();
	
	var newDir = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, "photos");
	if (!newDir.exists()){
		newDir.createDiectory();
	}
	
	var fileName = "Photo-" + scrollView.currentPage.toString() + ".png";
	
	writeFile = Ti.Filesystem.getFile(newDir.nativePath, fileName);
	wrietFile.write(media);
	alert("You have saved " +fileName+ " to " + newDir.nativePath);
	
	var imgFile = Ti.Filesystem.getFile(newDir.nativePath, fileName);
	
	if(!imgFile.exists()) {
		Ti.API.info("Error: "+ fileName+ " in"+ newDir.nativePath + " doesn't exist!")
	}else{
		Ti.API.info(fileName + " is saved in " + newDir.nativePath);
	}
});

if(Ti.Platform.osname == "iphone") {
	win.leftNavButton = butnSavePhoto;
	win.rightNavButton = butn;
} /*else{
	butn.right = 20;
	butn.top = 20;
	win.add(butn);
}*/


