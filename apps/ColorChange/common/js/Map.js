currentPage = {};
currentPage.init = function() {
	WL.Logger.debug("Map :: init");
};

var userToMeet;
var roomToMeetIn;
currentPage.add = function() {
	//add map?
	alert("Add map!");
};

currentPage.next = function() {
	meetInRec1 = userToMeet;
	meetInRoom = roomToMeetIn;
	WL.Logger.debug("MapNext :: next");
	pageHistory.push(path + "pages/Map.html");
	transformHeader();
	$("#pagePort").load(path + "pages/SelectRoom.html");
};

currentPage.back = function() {
	var backToRoom = path + "pages/SelectRoom.html";
	var history = pageHistory.pop();
	if(backToRoom == history) {
		transformHeader();
	}
	else {
		restoreHeader();
	}
	WL.Logger.debug("BackFromMap :: pressed");
	$("#pagePort").load(history);
};

function displayUser(userShow) {
	$.getJSON('http://meetin.mybluemix.net/userlist', function(data) {
		for(var i=0;i<data.length;i++) {
			if(userShow == data[i].username) {
				userToMeet = userShow;
				roomToMeetIn = data[i].beaconid;
				var room = "#"+data[i].beaconid;
				var userPic = data[i].profilepic;
				var url = picPrefix+userPic+".jpg)";
				$(room).css("background", url);
				$(room).css("background-size", "contain");
				
				var scrollFactor;
				if(data[i].beaconid == "Ada") {
					scrollFactor = 0;
				}
				else if(data[i].beaconid == "C") {
					scrollFactor = 0.3;
				}
				else if(data[i].beaconid == "Euclid") {
					scrollFactor = 0.75;
				}
				else {
					scrollFactor = 0;
				}
				var scrollHeight = $(document).height() * scrollFactor;
			    $('html, body').animate({ scrollTop: scrollHeight }, 200);
			}
		}
	});
}

function displayRoom(scroll) {
	var scrollHeight = $(document).height() * scroll;
	$('html, body').animate({ scrollTop: scrollHeight }, 200);
}