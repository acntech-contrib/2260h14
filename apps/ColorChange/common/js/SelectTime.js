currentPage = {};
$('html, body').animate({ scrollTop: 0}, 0);
$(document).ready(function () {
	//Trigger click on #startPicker?????????
	var $sp = $('#startPicker').timepicker({});
	$sp.timepicker('show'); 
});
currentPage.init = function() {
	WL.Logger.debug("SelectTime :: init");
};

currentPage.back = function() {
	WL.Logger.debug("SelectTime :: back");
	restoreHeaderNotDone();
	$("#pagePort").load(pageHistory.pop());
};

currentPage.next = function() {
	WL.Logger.debug("SelectTime :: next");
	pageHistory = [];
	restoreHeader();
	$("#pagePort").load(path + "pages/Meet.html");
};

function startEdit() {
	
}

function endEdit() {
	
}

var nameEdited = false;

function nameEdit() {
	if(!nameEdited) {
		$("#nameBox").val("");
	}
	nameEdited = true;
}