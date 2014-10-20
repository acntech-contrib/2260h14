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
	$("#pagePort").load(path + "pages/SelectTime.html");
};

function selectAda() {
	alert("Ada!");
}

function selectC() {
	alert("C!");
}

function selectEuclid() {
	alert("Euclid!");
}