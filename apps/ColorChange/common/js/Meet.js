currentPage = {};
$('html, body').animate({ scrollTop: 0}, 0);
currentPage.init = function() {
	WL.Logger.debug("Meet :: init");
};

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
		
		if(n == data.length) {
			$(meeting).css("border-bottom-style", "none");
			$(meeting).css("border-bottom-color", "none");
			$(meeting).css("border-bottom-width", "none");
		}
	}
});

function editMeeting(n) {
	
}
