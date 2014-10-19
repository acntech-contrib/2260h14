currentPage = {};
$('html, body').animate({ scrollTop: 0}, 0);
currentPage.init = function() {
	WL.Logger.debug("Friends :: init");
};

//Read jSON data from web
$.getJSON('http://meetin.mybluemix.net/userlist', function(data) {
	for(var i=0;i<data.length;i++) {
		var n = i+1;
		var contact = "#contact"+n;
		var contactName = contact.concat("Name");
		var contactLocation = contact.concat("Location");
		var contactStatus = contact.concat("Status");
		
		$(contactName).text(data[i].username);
		$(contactLocation).text(data[i].beaconid);
		$(contactStatus).text(data[i].userstatus);
		
		var contactPicture = contact.concat("Picture");
		var url = "url(https://s3-eu-west-1.amazonaws.com/meetin/";
		var profilepic = ""+data[i].profilepic;
		var urlUser = url.concat(profilepic);
		var urlString = urlUser.concat(".jpg)");
		
		$(contactPicture).css("background", urlString);
		$(contactPicture).css("background-size", "contain");
		
		$(contact).css("visibility", "visible");
		
		if(n == data.length) {
			$(meeting).css("border-bottom-style", "none");
			$(meeting).css("border-bottom-color", "none");
			$(meeting).css("border-bottom-width", "none");
		}	
	}
});

function showOnMap(contactNumber) {
	WL.Logger.debug("Map :: pressed");
	$("#pagePort").load(path + "pages/Map.html", function(){
		$.getScript(path + "js/Map.js", function() {
			if (currentPage.init) {
				currentPage.init();
			}
		});
	});
	var userClicked = document.getElementById("contact"+contactNumber+"Name").innerHTML;
	displayUser(userClicked);
}