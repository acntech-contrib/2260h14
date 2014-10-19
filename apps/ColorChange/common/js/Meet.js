currentPage = {};
$('html, body').animate({ scrollTop: 0}, 0);
currentPage.init = function() {
	WL.Logger.debug("Meet :: init");
};

var visibleExtension = "";

//Read jSON data from web
$.getJSON('http://meetin.mybluemix.net/meetins', function(data) {
	for(var i=0;i<data.length;i++) {
		var n = i+1;
		var meeting = "#meeting"+n;
		var picture = meeting + "Picture";
		var req = meeting + "Name";
		var loc = meeting + "Location";
		var time = meeting + "Time";
		
		$(req).text(data[i].requester);
		var tid = data[i].starttime + " - " + data[i].endtime
		$(time).text(tid);
		$(loc).text(data[i].beaconid);
		
		var url = "url(https://s3-eu-west-1.amazonaws.com/meetin/";
		var profilepic = ""+data[i].requester;
		var urlUser = url.concat(profilepic);
		var urlString = urlUser.concat(".jpg)");
		
		$(picture).css("background", urlString);
		$(picture).css("background-repeat", "no-repeat");
		$(picture).css("background-size", "contain");
		$(meeting).css("visibility", "visible");
		
		/*if(n == data.length) {
			$(meeting).css("border-bottom-style", "none");
			$(meeting).css("border-bottom-color", "none");
			$(meeting).css("border-bottom-width", "none");
		}*/
	}
});

$(".roomPicker").append("<option value=Ada>Ada</option>");
$(".roomPicker").append("<option value=C>C</option>");
$(".roomPicker").append("<option value=Euler>Euler</option>");

$(".timePicker").append("<option value=00:00>00:00</option>");
$(".timePicker").append("<option value=01:00>01:00</option>");
$(".timePicker").append("<option value=02:00>02:00</option>");
$(".timePicker").append("<option value=03:00>03:00</option>");
$(".timePicker").append("<option value=04:00>04:00</option>");
$(".timePicker").append("<option value=05:00>05:00</option>");
$(".timePicker").append("<option value=06:00>06:00</option>");
$(".timePicker").append("<option value=07:00>07:00</option>");
$(".timePicker").append("<option value=08:00>08:00</option>");
$(".timePicker").append("<option value=09:00>09:00</option>");
$(".timePicker").append("<option value=10:00>10:00</option>");
$(".timePicker").append("<option value=11:00>11:00</option>");
$(".timePicker").append("<option value=12:00>12:00</option>");
$(".timePicker").append("<option value=13:00>13:00</option>");
$(".timePicker").append("<option value=14:00>14:00</option>");
$(".timePicker").append("<option value=15:00>15:00</option>");
$(".timePicker").append("<option value=16:00>16:00</option>");
$(".timePicker").append("<option value=17:00>17:00</option>");
$(".timePicker").append("<option value=18:00>18:00</option>");
$(".timePicker").append("<option value=19:00>19:00</option>");
$(".timePicker").append("<option value=20:00>20:00</option>");
$(".timePicker").append("<option value=21:00>21:00</option>");
$(".timePicker").append("<option value=22:00>22:00</option>");
$(".timePicker").append("<option value=23:00>23:00</option>");


function editMeeting(n) {
	var extension = "#meetExtension"+n;
	
	if(visibleExtension == "") {
		$(extension).css("height", "110px");
		$(extension).css("line-height", "20px");
		$(extension).css("display", "block");
		visibleExtension = extension;
	}
	else if(visibleExtension == extension) {
		$(visibleExtension).css("display", "none");
		$(visibleExtension).css("height", "0");
		$(extension).css("line-height", "0");
		visibleExtension = "";
	}
	else {
		$(visibleExtension).css("display", "none");
		$(visibleExtension).css("height", "0px");
		$(extension).css("height", "120px");
		$(extension).css("display", "block");
		visibleExtension = extension;
	}
}

currentPage.add = function() {
	//add meetin
	WL.Logger.debug("addMeetIn :: pressed");
	$("#pagePort").load(path + "pages/SelectFriends.html");
};

function changeRoom(n) {
	
}

function changeTime(n) {
	
}
