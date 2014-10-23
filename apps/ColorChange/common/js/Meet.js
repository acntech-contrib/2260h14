currentPage = {};
$('html, body').animate({ scrollTop: 0}, 0);
currentPage.init = function() {
	WL.Logger.debug("Meet :: init");
};

currentPage.add = function() {
	//add meetin
	WL.Logger.debug("addMeetIn :: pressed");
	pageHistory.push(path + "pages/Meet.html");
	$("#pagePort").load(path + "pages/SelectFriends.html");
};

var extensions = [];
for(var i=0;extensions.length;i++) {
	extensions[i] = false;
}
$(".attendBtn").css("background-image", "url(images/Gray-radio.png)");
$(".maybeBtn").css("background-image", "url(images/Gray-radio.png)");
$(".notAttendBtn").css("background-image", "url(images/Gray-radio.png)");
/*
$.getJSON('http://meetin.mybluemix.net/meetins', function(data) {
	for(var i=0;i<data.length;i++) {
		var n = i+1;
		var meeting = "#meetIn"+n;
		var meetIcon = "#meetIcon"+n;
		var title = "#meetTitle"+n;
		var time = "#meetTime"+n;
		var reply = "#meetReply"+n;
		var host = "#host"+n;
		var invite1 = "#invite1List"+n;
		
		var tid = data[i].starttime + " - " + data[i].endtime;
		$(time).text(tid);
		$(title).text(data[i].requester);
		
		/* Hantera val av meetIn-bild här:
		 * 
		 * $(loc).text(data[i].beaconid); 
		
		Hantera profilbilder till deltagare här:      */
		/*
		var url = "url(https://s3-eu-west-1.amazonaws.com/meetin/";
		
		var profilepicHost = ""+data[i].requester;
		var urlUser = url+profilepicHost;
		var urlString = urlUser.concat(".jpg)");
		
		$(host).text(data[i].requester);
		$(host).css("background", urlString);
		$(host).css("background-size", "contain");
		
		url = "url(https://s3-eu-west-1.amazonaws.com/meetin/";
		var profilepicInvite = ""+data[i].receiver;
		var urlUser1 = url+profilepicInvite;
		var urlString1 = urlUser1.concat(".jpg)");
		
		$(invite1).text(data[i].receiver);
		$(invite1).css("background", urlString1);
		$(invite1).css("background-size", "contain");
		
		//$(meeting).css("visibility", "visible");
	}
});
*/


var meetID = [];
$.getJSON('http://meetin.mybluemix.net/listall/'+user, function(data) {
	var n = 0;
	for(var i=1;i<4;i++) {
		//Read all meetIn's related to this user
		//alert(data[i].length);
		for(var j=0;j<data[i].length;j++) {
				meetID[n] = data[i][j]._id;
				n++;
				var title = "#meetTitle"+n;
				var host = "#host"+n;
				var invite1 = "#invite1List"+n;
				var invite2 = "#invite2List"+n;
				var meeting = "#meetIn"+n;
				var meetIcon = "#meetIcon"+n;
				var time = "#meetTime"+n;
				
				var room = data[i][j].beaconid;
				$(meetIcon).attr("src", "images/"+room+".png");
				
				var tid = data[i][j].starttime + " - " + data[i][j].endtime;
				$(time).text(tid);
				
				var name = data[i][j].groupName;
				$(title).text(name);
				
				var url = "url(https://s3-eu-west-1.amazonaws.com/meetin/";
				
				if(data[i][j].requester != null) {
					var hostName = data[i][j].requester;
					var hostStatus = data[i][j].statusReq;
					
					var profilepicHost = ""+data[i][j].requester;
					profilepicHost = profilepicHost.toLowerCase();
					var urlUser = url+profilepicHost;
					var urlString = urlUser.concat(".jpg)");
					var hostInfo = hostName+ " - " + hostStatus;
					$(host).text(hostInfo);
					$(host).css("background", urlString);
					$(host).css("background-size", "contain");
				}
				if(data[i][j].receiver != null) {
					var inviteName = data[i][j].receiver;
					var inviteStatus = data[i][j].statusRec;
					
					var profilepicInvite = ""+data[i][j].receiver;
					profilepicInvite = profilepicInvite.toLowerCase();
					var urlUser1 = url+profilepicInvite;
					var urlString1 = urlUser1.concat(".jpg)");
					
					$(invite1).text(inviteName/* + " - " + inviteStatus*/);
					$(invite1).css("background", urlString1);
					$(invite1).css("background-size", "contain");
				}
				if(data[i][j].receiver2 != null) {
					var inviteName = data[i][j].receiver2;
					var inviteStatus = data[i][j].statusRec2;
					
					var profilepicInvite = ""+data[i][j].receiver2;
					profilepicInvite = profilepicInvite.toLowerCase();
					var urlUser1 = url+profilepicInvite;
					var urlString1 = urlUser1.concat(".jpg)");
					
					$(invite2).text(inviteName/* + " - " + inviteStatus*/);
					$(invite2).css("background", urlString1);
					$(invite2).css("background-size", "contain");
				}
			// Visa bara det som behövs: $(meeting).css("visibility", "visible");
		}
	}
});

function expandBtnClick(n) {
	if(extensions[n-1]) {
		hide(n);
		extensions[n-1] = false;
	}
	else {
		expand(n);
		extensions[n-1] = true;
	}
}

function hide(n) {
	var meetIn = "#meetIn"+n;
	var attendBtn = "#attendBtn"+n;
	var maybeBtn = "#maybeBtn"+n;
	var notAttendBtn = "#notAttendBtn"+n;
	var replyMenu = "#reply-menu"+n;
	var arrow = "#expandArrow"+n;
	var inviteList = "#inviteList"+n;
	
	$(attendBtn).css("-webkit-transition", "0ms");
	$(attendBtn).css("visibility", "hidden");
	
	$(maybeBtn).css("visibility", "hidden");
	$(maybeBtn).css("-webkit-transition", "0ms");
	
	$(notAttendBtn).css("visibility", "hidden");
	$(notAttendBtn).css("-webkit-transition", "0ms");
	
	$(inviteList).css("visibility", "hidden");
	$(inviteList).css("-webkit-transition", "0ms");
	
	$(meetIn).css("height", "60");
	$(replyMenu).css("-webkit-transition", "400ms");
	
	$(replyMenu).css("visibility", "hidden");
	$(arrow).css("-webkit-transform", "rotate(-0deg)");
}

function expand(n) {
	var meetIn = "#meetIn"+n;
	var attendBtn = "#attendBtn"+n;
	var maybeBtn = "#maybeBtn"+n;
	var notAttendBtn = "#notAttendBtn"+n;
	var replyMenu = "#reply-menu"+n;
	var arrow = "#expandArrow"+n;
	var inviteList = "#inviteList"+n;
	
	$(meetIn).css("height", "370");
	$(replyMenu).css("visibility", "visible");
	$(arrow).css("-webkit-transform", "rotate(180deg)");

	$(attendBtn).css("-webkit-transition", "400ms");
	$(attendBtn).css("visibility", "visible");
	
	$(maybeBtn).css("-webkit-transition", "800ms");
	$(maybeBtn).css("visibility", "visible");
	
	$(notAttendBtn).css("-webkit-transition", "1200ms");
	$(notAttendBtn).css("visibility", "visible");
	
	$(inviteList).css("-webkit-transition", "1600ms");
	$(inviteList).css("visibility", "visible");
}

function deleteMeetIn(n) {
	alert("Delete meetIn?");
}


function setAttending(n) {
	$(".maybeBtn").css("background-image", "url(images/Gray-radio.png)");
	$(".notAttendBtn").css("background-image", "url(images/Gray-radio.png)");
	$(".attendBtn").css("background-image", "url(images/Gray-radio-selected.png)");
}

function setMaybe(n) {
	$(".attendBtn").css("background-image", "url(images/Gray-radio.png)");
	$(".notAttendBtn").css("background-image", "url(images/Gray-radio.png)");
	$(".maybeBtn").css("background-image", "url(images/Gray-radio-selected.png)");
}

function setNotAttending(n) {
	$(".attendBtn").css("background-image", "url(images/Gray-radio.png)");
	$(".maybeBtn").css("background-image", "url(images/Gray-radio.png)");
	$(".notAttendBtn").css("background-image", "url(images/Gray-radio-selected.png)");
}