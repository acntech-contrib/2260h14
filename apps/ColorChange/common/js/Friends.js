currentPage = {};
$('html, body').animate({ scrollTop: 0}, 0);
currentPage.init = function() {
	WL.Logger.debug("Friends :: init");
};

//Read jSON data from web
$.getJSON('http://meetin.mybluemix.net/userlist', function(data) {
	var n = 1;
	for(var i=0;i<data.length;i++) {
		if(data[i].username != user) {
			var contact = "#contact"+n;
			var contactName = contact.concat("Name");
			var contactLocation = contact.concat("Location");
			var contactStatus = contact.concat("Status");
			
			$(contactName).text(data[i].username);
			if(data[i].userstatus != "Incognito") {
				$(contactLocation).text(data[i].beaconid);
				$(contactStatus).text(data[i].userstatus);
			}
			else {
				$(contactLocation).text("");
				$(contactStatus).text("");
			}
			var contactPicture = contact.concat("Picture");
			var url = "url(https://s3-eu-west-1.amazonaws.com/meetin/";
			var profilepic = ""+data[i].profilepic;
			var urlUser = url.concat(profilepic);
			var urlString = urlUser.concat(".jpg)");
			
			$(contactPicture).css("background", urlString);
			$(contactPicture).css("background-size", "contain");
			
			$(contact).css("visibility", "visible");
			n++;
			if(n == data.length) {
				$(contact).css("border-bottom-style", "none");
				$(contact).css("border-bottom-color", "none");
				$(contact).css("border-bottom-width", "none");
			}
		}
		else {
			if(n == data.length) {
				var contact = "#contact"+(n-1);
				$(contact).css("border-bottom-style", "none");
				$(contact).css("border-bottom-color", "none");
				$(contact).css("border-bottom-width", "none");
			}
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

currentPage.add = function() {
	//add friend
	alert("Add friend!");
};