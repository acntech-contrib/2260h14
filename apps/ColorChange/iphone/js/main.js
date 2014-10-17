// This method is invoked after loading the main HTML and successful initialization of the Worklight runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
    tabBarInit();
}

function tabBarInit() {
	 WL.TabBar.init();
	    
	//Add item "Home" to tabBar
	    WL.TabBar.addItem("Meet",
	    	function () {
	    		WL.Logger.debug("Meet :: pressed");
	    		$("#pagePort").load(path + "pages/Meet.html");
	    	}
	    , "MeetIn's", {/*image: "tabButton:Favorites",*/ image: "images/date_to-25.png"});
	    
	  //Add item "Friends" to tabBar
	    WL.TabBar.addItem("Friends",
	    	function () {
	    		WL.Logger.debug("Friends :: pressed");
	    		$("#pagePort").load(path + "pages/Friends.html");
	    	}
	    , "Friends", {/*image: "tabButton:Contacts",*/ image: "images/group-25.png",});
	    
	  //Add item "Map" to tabBar
	    WL.TabBar.addItem("Map",
	    	function () {
	    		WL.Logger.debug("Map :: pressed");
	    		$("#pagePort").load(path + "pages/Map.html");
	    	}
	    , "Map", {/*image: "tabButton:Bookmarks",*/ image: "images/map_marker-25.png",});
	    
	  //Add item "Other" to tabBar
	    WL.TabBar.addItem("Settings",
	    	function () {
	    		WL.Logger.debug("Settings :: pressed");
	    		$("#pagePort").load(path + "pages/Settings.html");
	    	}
	    , "Settings", {/*image: "tabButton:Search",*/ image: "images/settings-25.png",});
	    
	    WL.TabBar.setVisible(true);
}
/*
Beacon = function() {
    return {
        rangeForBeacons: function(uuid, range_result_callback, range_failure_callback) {
            var dfd = WLJQ.Deferred();
            cordova.exec(dfd.resolve, dfd.reject, "BeaconPlugin","range", [uuid]);
            return dfd.promise();
        }
    };
}();

//This example uses the Estimote UUID. Change as needed
Beacon.rangeForBeacons("B9407F30-F5F8-466E-AFF9-25556B57FE6D")
      .then(function(beacons_found) {
         $("#beacon-list").empty();
         for(beaconIndex in beacons_found) {
            var beacon = beacons_found[beaconIndex];              
            var beaconDiv = $("<div />").html("Major: " + beacon.major + 
                                               "; Minor: " + beacon.minor + 
                                               "; RSSI: " + beacon.rssi);

            $("#beacon-list").append(beaconDiv);
          }
    })
    .fail(function() {
          alert("failed!");
    });*/