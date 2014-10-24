currentPage = {};
$('html, body').animate({ scrollTop: 0}, 0);
currentPage.init = function() {
	WL.Logger.debug("SelectRoom :: init");
};

currentPage.back = function() {
	WL.Logger.debug("SelectRoom :: back");
	$("#pagePort").load(pageHistory.pop());
};

currentPage.next = function() {
	WL.Logger.debug("SelectRoom :: next");
	pageHistory.push(path + "pages/SelectRoom.html");
	transformHeaderOnDone();
	$("#pagePort").load(path + "pages/SelectTime.html");
};

selectedRoom = "";

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