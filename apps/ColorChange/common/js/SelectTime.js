currentPage = {};
$('html, body').animate({ scrollTop: 0}, 0);

$(document).ready(function(){
    $('body').on('show', function() {
       //execute startEdit(); ??????????????
    });
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
	$("#endField").css("background-color", "rgb(255, 255, 255)");
	$("#endPicker").css("background-color", "rgb(255, 255, 255)");
	$("#startField").css("background-color", "rgb(230, 230, 230)");
	$("#startPicker").css("background-color", "rgb(230, 230, 230)");
	$('#startPicker').focus().trigger("click");
	$('#startPicker').blur();
}

function endEdit() {
	$("#startField").css("background-color", "rgb(255, 255, 255)");
	$("#startPicker").css("background-color", "rgb(255, 255, 255)");
	$("#endField").css("background-color", "rgb(230, 230, 230)");
	$("#endPicker").css("background-color", "rgb(230, 230, 230)");
	$('#endPicker').focus().trigger("click");
	$('#endPicker').blur();
}

var nameEdited = false;

function nameEdit() {
	if(!nameEdited) {
		$("#nameBox").val("");
	}
	$("#startField").css("background-color", "rgb(255, 255, 255)");
	$("#startPicker").css("background-color", "rgb(255, 255, 255)");
	$("#endField").css("background-color", "rgb(255, 255, 255)");
	$("#endPicker").css("background-color", "rgb(255, 255, 255)");
	nameEdited = true;
}