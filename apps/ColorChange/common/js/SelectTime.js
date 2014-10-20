currentPage = {};
$('html, body').animate({ scrollTop: 0}, 0);
currentPage.init = function() {
	WL.Logger.debug("SelectTime :: init");
};

currentPage.back = function() {
	WL.Logger.debug("SelectTime :: back");
	$("#pagePort").load(pageHistory.pop());
};

currentPage.next = function() {
	WL.Logger.debug("SelectTime :: next");
	pageHistory = [];
	restoreHeader();
	$("#pagePort").load(path + "pages/Meet.html");
};