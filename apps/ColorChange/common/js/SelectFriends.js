transformHeader();

currentPage = {};
$('html, body').animate({ scrollTop: 0}, 0);
currentPage.init = function() {
	WL.Logger.debug("SelectFriends :: init");
};

currentPage.back = function() {
	WL.Logger.debug("SelectFriends :: back");
	restoreHeader();
	$("#pagePort").load(pageHistory.pop());
};

currentPage.next = function() {
	WL.Logger.debug("SelectFriends :: next");
	pageHistory.push(path + "pages/SelectFriends.html");
	$("#pagePort").load(path + "pages/SelectRoom.html");
};

var checkboxValues = [];

for(var i=0;i<10;i++) {
	checkboxValues[i] = false;
}

//Read jSON data from web
$.getJSON('http://meetin.mybluemix.net/userlist', function(data) {
	var n = 1;
	for(var i=0;i<data.length;i++) {
		if(data[i].username != user) {
			var contact = "#contact"+n;
			var contactName = contact.concat("Name");
			/*var contactLocation = contact.concat("Location");
			var contactStatus = contact.concat("Status");*/
			
			$(contactName).text(data[i].username);
			/*$(contactLocation).text(data[i].beaconid);
			$(contactStatus).text(data[i].userstatus);*/
			
			var contactPicture = contact.concat("Picture");
			var url = "url(http://folk.uio.no/stiako/images/";
			var profilepic = ""+data[i].profilepic;
			var urlUser = url.concat(profilepic);
			var urlString = urlUser.concat(".jpg)");
			
			$(contactPicture).css("background", urlString);
			$(contactPicture).css("background-size", "contain");
			
			$(contact).css("visibility", "visible");
			n++;
			if(n == data.length) {
				$(meeting).css("border-bottom-style", "none");
				$(meeting).css("border-bottom-color", "none");
				$(meeting).css("border-bottom-width", "none");
			}	
		}
	}
});
var inviteCount = 0;

function select(n) {
	var checkbox = "#checkbox"+n;
	var contactName = "#contact"+n+"Name";
	if(checkboxValues[n-1]) {
		$(checkbox).attr("src", "images/Box.png");
		inviteCount++;
	}
	else {
		$(checkbox).attr("src", "images/BoxCheck.png");
		inviteCount++;
	}
	if(inviteCount == 1) {
		meetInRec1 = $(contactName).text();
	}
	else {
		meetInRec2 = $(contactName).text();
	}
	checkboxValues[n-1] = !checkboxValues[n-1];
}