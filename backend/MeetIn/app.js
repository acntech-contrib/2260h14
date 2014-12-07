/* jshint node:true */

/**
 * Module dependencies.
 */
var express = require('express'),
  cache = require('./routes/cache'),
  http = require('http'),
  path = require('path');
  mongo = require('mongodb');
  monk = require('monk');
  var cloudinary = require('cloudinary');
  //db = monk('localhost:27017/nodetest1');
  db = monk('mongodb://IbmCloud_f5l82v4d_8eqv0uvi_ab4meosq:SCTYiFA_Hkn_pkaCHQl9zAUBhiGqsirs@ds041190.mongolab.com:41190/IbmCloud_f5l82v4d_8eqv0uvi');


var app = express();

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

cloudinary.config({ 
  cloud_name: 'meetin', 
  api_key: '456255342667154', 
  api_secret: 'Zb4gBVo1kypdfMSvFroGAUsgsmg' 
});

var routes = require('./routes/index')(app,cloudinary);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/', routes);

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);
app.get("/cache/:key", cache.getCache);
app.put("/cache", cache.putCache);
app.delete("/cache/:key", cache.removeCache);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
