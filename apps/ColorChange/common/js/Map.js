currentPage = {};

currentPage.init = function() {
	WL.Logger.debug("Map :: init");
};

currentPage.add = function() {
	//add map?
	alert("Add map!");
};

currentPage.back = function() {
	restoreHeader();
	WL.Logger.debug("Friends :: pressed");
	$("#pagePort").load(path + "pages/Friends.html");
};

function displayUser(userShow) {
	$.getJSON('http://meetin.mybluemix.net/userlist', function(data) {
		for(var i=0;i<data.length;i++) {
			if(userShow == data[i].username) {
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
					scrollFactor = 0.65;
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