var menuExtended = false;

var pageHistory = [];
var currentPage = {};
var path = "";
var user;
var picPrefix = "url(https://s3-eu-west-1.amazonaws.com/meetin/";

//Data for new meetIn
var meetInName = "Group";
var meetInTime = "";
var meetInRec1 = "";
var meetInRec2 = "";
var meetInRoom = "";

function wlCommonInit(){
	/*
	 * Use of WL.Client.connect() API before any connectivity to a Worklight Server is required. 
	 * This API should be called only once, before any other WL.Client methods that communicate with the Worklight Server.
	 * Don't forget to specify and implement onSuccess and onFailure callback functions for WL.Client.connect(), e.g:
	 *    
	 *    WL.Client.connect({
	 *    		onSuccess: onConnectSuccess,
	 *    		onFailure: onConnectFailure
	 *    });
	 *     
	 */
	
	// Common initialization code goes here
	
	//page init
	$("#pagePort").load(path + "pages/Settings.html", function(){
		$.getScript(path + "js/Settings.js", function() {
			if (currentPage.init) {
				currentPage.init();
			}
		});
	});
	
	//Header init
	
	
	//Radio-buttons init
	$("#greenRadio").css("background-image", "url(images/Green-radio-selected.png)");
	$("#redRadio").css("background-image", "url(images/Red-radio.png)");
	$("#grayRadio").css("background-image", "url(images/Blue-radio.png)");
	
	//Test text-variabel "Location"
	$("#myLocation").text("Location");
	$("#myStatus").text("Available");
}

//Init iBeacon
Beacon = function() {
    return {
        rangeForBeacons: function(uuid, range_result_callback, range_failure_callback) {
            var dfd = WLJQ.Deferred();
            cordova.exec(dfd.resolve, dfd.reject, "BeaconPlugin","range", [uuid]);
            return dfd.promise();
        }
    };
}();

//Executes the method findBeacons every second
var beaconCaller = setInterval(function(){findBeacons();}, 200);

//Scans the enviroment for iBeacons
function findBeacons() {
	var room = "";
	/*[] values;
	for(var i=0;i>10;i++) {*/
		Beacon.rangeForBeacons("B9407F30-F5F8-466E-AFF9-25556B57FE6D")
		.then(function(beacons_found) {
		 //  $("#beacon-list").empty();
		   var maxRSSI = 100;
		   for(beaconIndex in beacons_found) {
		      var beacon = beacons_found[beaconIndex];              
		   /*   var beaconDiv = $("<div />").html("Major: " + beacon.major + 
		                                         "; Minor: " + beacon.minor + 
		                                         "; RSSI: " + (beacon.rssi*-1));
		
		      $("#beacon-list").append(beaconDiv);*/
		      if(beacon.rssi*-1 < maxRSSI) {
		    	  room = getRoomName(beacon.minor);
		    	  maxRSSI = beacon.rssi*-1;
		      }
		    }
		   $("#myLocation").text(/*"Ole Johan Dahls Hus" + */room);
		   newLocation(room);
		})
		.fail(function() {
		    alert("failed!");
		});
	//}
}

function getRoomName(minor) {
	//Blueberry pie
	if(minor == 2) {
		return "Ada"; //Ada
	}
	//Mint coctail
	else if(minor == 5) {
		return "C"; //C
	}
	//Icy marchmallow 
	else if(minor == 6) {
		return "Euclid"; //Euclid
	}
}

function changeColor() {
	$("#header").css("-webkit-transition", "400ms");
	if(!menuExtended) {
		showMenu();
	}
	else {
		hideMenu();
	}
	menuExtended = !menuExtended;
}

function hideMenu() {
	$("#greenRadio").css("-webkit-transition", "0ms");
	$("#greenRadio").css("visibility", "hidden");
	
	$("#redRadio").css("visibility", "hidden");
	$("#redRadio").css("-webkit-transition", "0ms");
	
	$("#grayRadio").css("visibility", "hidden");
	$("#grayRadio").css("-webkit-transition", "0ms");
	
	$("#header").css("height", "60");
	$("#option-menu").css("-webkit-transition", "400ms");
	
	$("#option-menu").css("visibility", "hidden");
	$("#arrow").css("-webkit-transform", "rotate(-0deg)");
}

function showMenu() {
	$("#header").css("height", "188");
	$("#option-menu").css("visibility", "visible");
	$("#arrow").css("-webkit-transform", "rotate(180deg)");

	$("#greenRadio").css("-webkit-transition", "400ms");
	$("#greenRadio").css("visibility", "visible");
	
	$("#redRadio").css("-webkit-transition", "800ms");
	$("#redRadio").css("visibility", "visible");
	
	$("#grayRadio").css("-webkit-transition", "1200ms");
	$("#grayRadio").css("visibility", "visible");
}

function setAvailable() {
	$("#header").css("-webkit-transition", "100ms");
	$("#header").css("background-color", "rgb(102, 193, 170)");
	
	$("#greenRadio").css("background-image", "url(images/Green-radio-selected.png)");
	$("#redRadio").css("background-image", "url(images/Red-radio.png)");
	$("#grayRadio").css("background-image", "url(images/Blue-radio.png)");
	$("#myStatus").text("Available");
	newStatus("Available");
}

function setBusy() {
	$("#header").css("-webkit-transition", "100ms");
	$("#header").css("background-color", "rgb(240, 128, 128)"/*"rgb(240, 118, 118)"*/);
	
	$("#greenRadio").css("background-image", "url(images/Green-radio.png)");
	$("#redRadio").css("background-image", "url(images/Red-radio-selected.png)");
	$("#grayRadio").css("background-image", "url(images/Blue-radio.png)");
	$("#myStatus").text("Busy");
	newStatus("Busy");
}

function setIncognito() {
	$("#header").css("-webkit-transition", "100ms");
	$("#header").css("background-color", "rgb(106, 160, 207)");
	
	$("#greenRadio").css("background-image", "url(images/Green-radio.png)");
	$("#redRadio").css("background-image", "url(images/Red-radio.png)");
	$("#grayRadio").css("background-image", "url(images/Blue-radio-selected.png)");
	$("#myStatus").text("Incognito");
	newStatus("Incognito");
}

function newStatus(status) {
	$.getJSON('http://meetin.mybluemix.net/userlist', function(data) {
		for(var i=0;i<data.length;i++) {
			if(user == data[i].username) {
				$.getJSON("http://meetin.mybluemix.net/updatestatus/"+data[i]._id+"/"+status, function(data) {});
			}
		}
	});
}

function newLocation(location) {
	$.getJSON('http://meetin.mybluemix.net/userlist', function(data) {
		for(var i=0;i<data.length;i++) {
			if(user == data[i].username) {
				$.getJSON("http://meetin.mybluemix.net/updateposition/"+data[i]._id+"/"+location, function(data) {});
			}
		}
	});
}

function add() {
	hideMenu();
	currentPage.add();
}

function transformHeader() {
	$("#plus").css("display", "none");
	$("#arrow").css("display", "none");
	$("#myPicture").css("display", "none");
	$("#myLocation").css("display", "none");
	$("#myStatus").css("display", "none");
	
	$("#back").css("display", "block");
	$("#ok").css("display", "block");
}

function transformHeaderOnLocate() {
	$("#plus").css("display", "none");
	$("#arrow").css("display", "none");
	$("#myPicture").css("display", "none");
	$("#myLocation").css("display", "none");
	$("#myStatus").css("display", "none");
	

	$("#ok").text("meet");
	$("#back").css("display", "block");
	$("#ok").css("display", "block");
}

function transformHeaderOnDone() {
	$("#ok").text("done");
}

function restoreHeaderNotDone() {
	$("#ok").text("ok");
}

function restoreHeader() {
	$("#back").css("display", "none");
	$("#ok").css("display", "none");
	$("#ok").text("ok");
	
	$("#plus").css("display", "block");
	$("#arrow").css("display", "block");
	$("#myPicture").css("display", "block");
	$("#myLocation").css("display", "block");
	$("#myStatus").css("display", "block");
}

function hidePlus() {
	$("#plus").css("display", "none");
}

function back() {
	currentPage.back();
}

function next() {
	currentPage.next();
}