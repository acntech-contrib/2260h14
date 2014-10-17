currentPage = {};
$('html, body').animate({ scrollTop: 0}, 0);
currentPage.init = function() {
	WL.Logger.debug("Meet :: init");
};

//Read jSON data from web
$("#meetings").empty();
$.getJSON('http://meetin.mybluemix.net/meetins', function(data) {
	for(var i=0;i<data.length;i++) {
		var n = i+1;
		
		var picture = $("<div id='pic"+n+"'/>");
		
		
		var url = "url(https://s3-eu-west-1.amazonaws.com/meetin/";
		var profilepic = ""+data[i].requester;
		var urlUser = url.concat(profilepic);
		var urlString = urlUser.concat(".jpg)");
		
		$("#pic"+n).css("height", "50px");
		$("#pic"+n).css("width", "50px");
		$("#pic"+n).css("border-radius", "25px");
		$("#pic"+n).css("-webkit-border-radius", "25px");
		
		$("#pic"+n).css("background", urlString);
		$("#pic"+n).css("background-size", "contain");
		
		var meeting = $("<ul id='meeting"+n+"'/>");
		
		$("<li />").html(data[i].requester).appendTo(meeting);
		$("<li />").html(data[i].starttime + " - " + data[i].endtime).appendTo(meeting);
		$("<li />").html(data[i].beaconid).appendTo(meeting);
		
		$("#pic"+n).append(meeting);
		$("#meetings").append(picture);
		$("#meeting"+n).css("border-bottom-style", "solid");
		$("#meeting"+n).css("border-bottom-color", "rgb(210, 210, 210)");
		$("#meeting"+n).css("border-bottom-width", "2px");
		$("#meeting"+n).css("height", "60px");
		$("#meeting"+n).css("padding-top", "10px");
		$("#meeting"+n).css("line-height", "20px");
		$("#meeting"+n).css("padding", "0");
	}
});
