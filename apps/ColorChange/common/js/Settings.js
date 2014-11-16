currentPage = {};
$('html, body').animate({ scrollTop: 0}, 0);
currentPage.init = function() {
	WL.Logger.debug("Settings :: init");
};
//Read jSON data from web
$.getJSON('http://meetin.mybluemix.net/userlist', function(data) {
	for(var i=0;i<data.length;i++) {
		if(data[i].taken == "no") {
			$("#profilePicker").append("<option value="+data[i].username+">"+data[i].username+"</option>");
			//Set taken to yes
			if(data[i].username == user) {
				$("#profilePicker").val(data[i].username);
			}
		}
	}
});

function changeProfile() {
	var thisUser = "" + $("#profilePicker option:selected").text();
	
	$.getJSON('http://meetin.mybluemix.net/userlist', function(data) {
		for(var i=0;i<data.length;i++) {
			if(data[i].username == thisUser) {
				var url = "url(http://folk.uio.no/stiako/images/";
				var profilepic = ""+data[i].profilepic;
				var urlUser = url.concat(profilepic);
				var urlString = urlUser.concat(".jpg)");
				$("#myPicture").css("background", urlString);
				$("#myPicture").css("background-size", "contain");
				break;
			}
		}
	});
	user = thisUser;
}

currentPage.add = function() {
	//Do nothing
	alert("Setting add!");
};