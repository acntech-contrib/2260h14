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