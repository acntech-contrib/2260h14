currentPage = {};
$('html, body').animate({ scrollTop: 0}, 0);
currentPage.init = function() {
	WL.Logger.debug("SelectRoom :: init");
};

currentPage.back = function() {
	WL.Logger.debug("SelectRoom :: back");
	var backToMap = path + "pages/SelectMap.html";
	var history = pageHistory.pop();
	if(history == backToMap) {
		transformHeaderOnLocate();
		$("#pagePort").load(path + "pages/Map.html", function(){
			$.getScript(path + "js/Map.js", function() {
				if (currentPage.init) {
					currentPage.init();
				}
			});
		});
		displayUser(meetInRec1);
	}
	else {
		$("#pagePort").load(history);
	}
	
};

currentPage.next = function() {
	WL.Logger.debug("SelectRoom :: next");
	pageHistory.push(path + "pages/SelectRoom.html");
	transformHeaderOnDone();
	$("#pagePort").load(path + "pages/SelectTime.html");
};


selectedRoom = "";

if(meetInRoom == "Ada") {
	select(1);
}
else if(meetInRoom == "C") {
	select(2);
}
else if(meetInRoom == "Euclid") {
	select(3);
}

function select(n) {
	var radioBtn = "#radioBtnRoom"+n;
	if(selectedRoom == "") {
		$(radioBtn).attr("src", "images/RadioBoxCheck.png");
	}
	else {
		$(selectedRoom).attr("src", "images/Box.png");
		$(radioBtn).attr("src", "images/RadioBoxCheck.png");
	}
	selectedRoom = radioBtn;
	
	if(n == 1) {
		meetInRoom = "Ada";
	}
	else if(n == 2) {
		meetInRoom = "C";
	}
	else {
		meetInRoom = "Euclid";
	}
}

function selectAda() {
	transformHeaderOnLocate();
	pageHistory.push(path + "pages/SelectRoom.html");
	$("#pagePort").load(path + "pages/Map.html");
	displayRoom(0);
}

function selectC() {
	transformHeaderOnLocate();
	pageHistory.push(path + "pages/SelectRoom.html");
	$("#pagePort").load(path + "pages/Map.html");
	displayRoom(0.3);
}

function selectEuclid() {
	transformHeaderOnLocate();
	pageHistory.push(path + "pages/SelectRoom.html");
	$("#pagePort").load(path + "pages/Map.html");
	displayRoom(0.65);
}