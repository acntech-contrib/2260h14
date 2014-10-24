currentPage = {};
$('html, body').animate({ scrollTop: 0}, 0);

/*
$(document).ready(function(){
	$("#startField").load(function() {	
	    $("#startPicker").load(function() {
	    	$('#startPicker').focus().trigger("click");
		});
	});
});

$("#startPicker").load(function() {
	  startEdit();
});
*/
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
	createNewMeetIn();
	restoreHeader();
	meetInName = "Group";
	meetInTime = "";
	meetInRec1 = "";
	meetInRec2 = "";
	meetInRoom = "";
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

function createNewMeetIn() {
	meetInTime = $('#startPicker').val() + " - " + $('#endPicker').val();
	var startTimeMeetIn = $('#startPicker').val();
	var endTimeMeetIn = $('#endPicker').val();
	if(nameEdited) {
		meetInName = $("#nameBox").val();
	}
	
	$.getJSON("meetin.mybluemix.net/reqmeetin?"+user+"&"+meetInRec1+"&"+meetInRec2+"&"+meetInRoom+"&"+startTimeMeetIn+"&"+endTimeMeetIn+"&"+meetInName, function(data) {});
}