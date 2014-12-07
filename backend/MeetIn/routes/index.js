/* jshint node:true */

/*
 * GET home page.
 */
//var express = require('express');
//var router = express();
module.exports = function(router,cloudinary){
  router.get('/helloworld', function(req, res) {
    //res.render('index', { title: 'Express' });
    res.json('Hello world');
  });

  router.get('/test', function(req, res){
    res.json('test');
  });

  router.get('/', function(req, res){
    res.render('index', { title: 'MeetIn' });
  });

  /* GET Userlist page. */
  router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    var meetins = db.get('meetincollection');
    collection.find({},{},function(e,docs){
      res.json(docs);
      });
  });

  router.get('/meetins', function(req, res) {
    var db = req.db;
    var meetins = db.get('meetincollection');
    meetins.find({},{},function(e,docs){
      res.json(docs);
      });
  });

  router.get('/beacons', function(req, res) {
    var db = req.db;
    var beacons = db.get('beaconcollection');
    beacons.find({},{},function(e,docs){
      res.json(docs);
      });
  });

  router.get('/listall', function(req, res) {
    var db = req.db;
    var beacons = db.get('beaconcollection');
    var meetins = db.get('meetincollection');
    var collection = db.get('usercollection');
    var beaconsJSON = {};
    var meetinsJSON = {};
    var usersJSON = {};
    var listAll = [];

    beacons.find({},{},function(e,docs){
      listAll[0] = docs;

      meetins.find({},{},function(e,docs){
        listAll[1] = docs;

        collection.find({},{},function(e,docs){
            listAll[2] = docs;
            res.json(listAll);
          });
        });
      });
  });

  router.get('/listall/:userid', function(req, res) {
    var db = req.db;
    var beacons = db.get('beaconcollection');
    var meetins = db.get('meetincollection');
    var collection = db.get('usercollection');
    var beaconsJSON = {};
    var meetinsJSON = {};
    var usersJSON = {};
    var listAll = [];
    var uid = req.param("userid");

    beacons.find({},{},function(e,docs){
      listAll[0] = docs;

      meetins.find({ requester: uid },{},function(e,docs){
        listAll[1] = docs;

        meetins.find({ receiver: uid},{},function(e,docs){
          listAll[2] = docs;

          meetins.find({ receiver2: uid},{},function(e,docs){
            listAll[3] = docs;

            collection.find({},{},function(e,docs){
                listAll[4] = docs;
                res.json(listAll);
            });
          });
        });
      });
    });
  });

  router.get('/bilde', function(req, res) {
    cloudinary.uploader.upload("http://folk.uio.no/stiako/images/jarl.jpg", function(result) { 
      console.log(result) 
    });
    res.redirect("userlist");
  });

  var userid;
  var beaconid;
  router.get('/updateposition/:userid/:beaconid', function(req, res) {
    var uid = req.param("userid");
    bid = req.param("beaconid");
    var collection = db.get('usercollection');
    collection.update(
      { _id : uid },
      { $set: {beaconid: bid} }
      , function (err, doc) {
        if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database.");
        } else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
      }
    );
  });

  /* UPDATE status */
  router.get('/updatestatus/:userid/:userstatus', function(req, res) {
    var uid = req.param("userid");
    userstatus = req.param("userstatus");
    var collection = db.get('usercollection');
    collection.update(
      { _id : uid },
      { $set: {userstatus: userstatus} }
      , function (err, doc) {
        if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database.");
        } else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
      }
    );
  });

  /* UPDATE username */
  var newusername;
  router.get('/changeusername/:userid/:newusername', function(req, res) {
    var uid = req.param("userid");
    var newUserName = req.param("newusername");
    var collection = db.get('usercollection');
    collection.update(
      { _id : uid },
      { $set: {username: newUserName} }
      , function (err, doc) {
        if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database.");
        } else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
      }
    );
  });

  router.get('/changeprofilepic/:userid/:filename', function(req, res) {
    var uid = req.param("userid");
    var fileName = req.param("filename");
    var collection = db.get('usercollection');
    collection.update(
      { _id : uid },
      { $set: {profilepic: fileName} }
      , function (err, doc) {
        if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database.");
        } else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
      }
    );
  });

  /* POST to Add User Service */
  router.get('/adduser/:username', function(req, res) {

      // Set our internal DB variable
      var db = req.db;
      var username = req.param("username");
      var beaconid = null;
      var userstatus = "incognito";
      var profilepic = "default";
      var taken = "no";
      // Set our collection
      var collection = db.get('usercollection');
      // Submit to the DB
      
      var update = function(uid){
        var userid = uid;
        collection.insert(
          { _id : userid  },{}, function (err, doc) {
            console.log(doc);
            collection.update(
              { _id : userid},
              { $set: {
                "username" : username,
                "beaconid" : beaconid,
                "userstatus" : userstatus,
                "profilepic" : profilepic,
                "taken" : taken
                      }
              },
              function(e,docs){
                //collection.find({ _id : userid},{},function(e,docs){
                  console.log(docs);
                  res.json(userid);
                //});
              });
          });
      };

      update(collection.id());
      /*
      collection.insert({
        "username" : username},{},function(e, docs){
          console.log(docs);
        });*/
  });

  /* POST to Add Beacon Service */
  router.get('/addbeacon/:beaconid/:roomname', function(req, res) {

      // Set our internal DB variable
      var db = req.db;
      var beaconid = req.param("beaconid");
      var roomname = req.param("roomname");

      // Set our collection
      var beaconcollection = db.get('beaconcollection');

      // Submit to the DB
      beaconcollection.insert({
        beaconid : beaconid,
        roomname : roomname
      }, function (err, doc) {
          if (err) {
              // If it failed, return error
              res.send("There was a problem adding the information to the database.");
          }
          else {
              // If it worked, set the header so the address bar doesn't still say /adduser
              res.location("beacons");
              // And forward to success page
              res.redirect("beacons");
          }
      });
  });

  /* POST to Request Meetin */
  router.get('/reqmeetin',
    function(req, res) {
    var groupName = req.param('groupName'),
      requester = req.param('requester'),
      receiver = req.param('receiver'),
      receiver2 = req.param('receiver2'),
      statusReq = 'Attending',
      statusRec = 'Pending',
      statusRec2 = 'Pending',
      beaconid = req.param('beaconid'),
      starttime = req.param('starttime'),
      endtime = req.param('endtime'),
      meetins = db.get('meetincollection');
      meetins.insert(
      { groupName : groupName,
        requester : requester,
        receiver : receiver,
        receiver2 : receiver2,
        statusReq : statusReq,
        statusRec : statusRec,
        statusRec2 : statusRec2,
        beaconid : beaconid,
        starttime : starttime,
        endtime : endtime,
        changedBy : requester
      }, function (err, doc) {
        if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database.");
        } else {
          res.json(doc);
        }
      }
    );
  });

  /* This is a horrifying way to update the status of a users meetin */
  router.get('/updatemeetin',
    function(req, res) {
    var meetid = req.param('meetid'),
      user = req.param('user'),
      newStatus = req.param('newStatus'),
      meetins = db.get('meetincollection');
        if(user == 'requester'){
          meetins.update(
          { _id : meetid },
          { $set: {
            statusReq : newStatus,
                  }
          }, function (err, doc) {
          res.json(doc);
        });
      } else if (user == 'receiver'){
          meetins.update(
          { _id : meetid },
          { $set: {
            statusRec : newStatus,
                  }
          }, function (err, doc) {
          res.json(doc);
        });
      } else if(user != 'receiver2'){
          meetins.update(
          { _id : meetid },
          { $set: {
            statusRec2 : newStatus,
                  }
          }, function (err, doc) {
          res.json(doc);
        });
      }
  });

  /* This is a horrifying way to delete yourself from a meetin */
  router.get('/deletemeetin',
    function(req, res) {
    var meetid = req.param('meetid'),
      user = req.param('user'),
      meetins = db.get('meetincollection');
        if(user == 'requester'){
          meetins.update(
          { _id : meetid },
          { $set: {
            requester : null,
                  }
          }, function (err, doc) {
          res.json(doc);
        });
      } else if (user == 'receiver'){
          meetins.update(
          { _id : meetid },
          { $set: {
            receiver : null,
                  }
          }, function (err, doc) {
          res.json(doc);
        });
      } else if(user == 'receiver2'){
          meetins.update(
          { _id : meetid },
          { $set: {
            receiver2 : null,
                  }
          }, function (err, doc) {
          res.json(doc);
        });
      }
  });

  router.get('/reqmeet',
      function(req, res) {
          var receiver = [];
          for(var i = 0; i < 10; i++){
              receiver[i] = req.param('uid'+i);
              if(receiver[i] != null){
                  console.log(receiver[i]);
              }
          }
          /*meetins.insert(
              { requester : requester,
                receiver : receiver,
                beaconid : beaconid,
                starttime : starttime,
                endtime : endtime,
                meetinStatus : meetinStatus,
                changedBy : requester
          }, function (err, doc) {
            if (err) {
              // If it failed, return error
              res.send("There was a problem adding the information to the database.");
            } else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("meetins");
                // And forward to success page
                res.redirect("meetins");
            }
          }

          );*/
      });

      var newMeetin = function(uid){};


}
