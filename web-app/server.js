const express = require('express');
var http = require('http');
var app = express();
app.use(function(req, res, next){res.setTimeout(240000, function(){
  console.log('Request has timed out.');res.send(408);});next();
});
const server = http.createServer(app);
var couchbase = require('couchbase')
// var cluster = new couchbase.Cluster('couchbase://localhost/');
// var bucket = cluster.openBucket('default');
var cluster = new couchbase.Cluster(`couchbase://172.30.10.67:11210`)
var bucket = cluster.openBucket('shipment');
var N1qlQuery = couchbase.N1qlQuery;
var ViewQuery = couchbase.ViewQuery;

/**
* Set flags to represent different sensitivities
*/
var FLAG_TEMPERATURE = 1; //0001
var FLAG_ACCELERATION = 2; //0010
var FLAG_MAGNET = 4; //0100
var FLAG_LIGHT = 8; //1000

/**
* Set thresholds for each sensor
* TODO: either make this configurable per device, or have a config file
*/
var tempThreshold = 60;
var accThreshold = 70;
var magThreshold = 80;
var lightThreshold = 90;

/**
* Listen on port 8080
*/
server.listen(8080, function () {
  console.log('App listening on port 8080!');
});

/**
* Register any used directories so their contents will be recognized as '/'
*/
app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/img'));

/**
* Routing
* Redirect pages used by the frontend to index.html
*/
app.get('/stats', function(req, res) {
    res.sendFile(__dirname + "/dist/index.html");
});
app.get('/shipments', function(req, res) {
    res.sendFile(__dirname + "/dist/index.html");
});
app.get('/search/*', function(req, res) {
    res.sendFile(__dirname + "/dist/index.html");
});
app.get('/detail/*', function(req, res) {
    res.sendFile(__dirname + "/dist/index.html");
});

/*********************************
***********ENDPOINTS**************
*********************************/

/**
* Endpoint for search results
* Use a N1ql query to get partially matching Shipment Ids
*/
app.get('/app/search/:DeviceId', function(req, res){
  var query = N1qlQuery.fromString(`
    SELECT DISTINCT DeviceId
    FROM shipment
    WHERE
    CONTAINS(DeviceId, '${req.params.DeviceId}')`);
  bucket.query(query, function(err, rows, meta) {
    if(err)console.log(err);
    var devices = JSON.stringify({
      "data" : rows
    });
    res.send(devices);
  });
});

/**
* Endpoint for device detail current readings
* Query the recentData view to get the document ID for the latest info about
* a shipment. Then use that ID to get the full document to return its info
*/
app.get('/app/device/:DeviceId', function(req, res){
  var query = ViewQuery.from('csms', 'recentData').group_level('1')
      .range([""+req.params.DeviceId],[""+(+req.params.DeviceId+1)]);
  bucket.query(query, function(err,results){
    if(err)console.log(err);
    if(results && results[0]){
      bucket.get(results[0].value[2], function (err, result) {
        var devices = JSON.stringify({
          "data" : result.value
        })
        res.send(devices);
       });
    }
  });
});

/**
* Endpoint for device detail highest values
* Use the highestAll view to get the largest sensory data for a device's history
*/
app.get('/app/records/:DeviceId', function(req, res){
  var query = ViewQuery.from('csms','highestAll').group_level('1')
      .key(""+req.params.DeviceId);
  bucket.query(query, function(err, results){
    if(err)console.log(err);
    if(results && results[0]){
      var records = JSON.stringify({
        "data": results[0].value
      });
      res.send(records);
    }
  });
});

/**
* Endpoint for device detail history
* Given a DeviceId, get the full history of all of its sensors from the history
* view
*/
app.get('/app/history/:DeviceId', function(req, res){
  var query = ViewQuery.from('csms', 'history')
                       .group_level('1')
                       .range([""+req.params.DeviceId],
                       [""+(+req.params.DeviceId+1)]);
  bucket.query(query, function(err,results){
    if(err)console.log(err);
    if(results && results[0]){
      var history = JSON.stringify({
        "data": results[0].value
      })
    }
    res.send(history);
  });

});

/**
* Endpoint for stats page doughnut chart
* Statistics for full dataset. Uses the categoryCount view to return a count
* of how many active shipments there are for each Shipment Category
*/
app.get('/app/typecount', function(req, res) {
  var query = ViewQuery.from('csms', 'categoryCount').group_level('1')
      .stale(ViewQuery.Update.NONE);
  bucket.viewTimeout = 1000*60;
  bucket.query(query, function(err,results){
    if(err)console.log(err);
    var thisdata = {"Class0": 0, "Class1": 0, "Class2": 0, "Class3": 0,
                    "Class4": 0, "Class5": 0, "Class6": 0, "Class7": 0,
                    "Class8": 0, "Class9": 0, "Class10": 0, "Class11": 0,
                    "Class12": 0, "Class13": 0, "Class14": 0, "Class15": 0};
    for(i in results){
        thisdata[results[i].key] = results[i].value;
    }
    var types = JSON.stringify({
      "data" : thisdata
    });
    res.send(types);
  });
});

/**
* Endpoint for stats page bar chart
* Statistics for full dataset. Uses the highestAll view to return info about
* how many shipments are in good or poor condition per Shipment Category
*/
app.get('/app/typecondition',function(req,res){
  var query = ViewQuery.from('csms', 'highestAll').group_level('1')
      .stale(ViewQuery.Update.NONE);
  bucket.viewTimeout = 1000*60*5;
  bucket.query(query, function(err,results){
    if(err)console.log(err);
    var good = {"Class0": 0, "Class1": 0, "Class2": 0, "Class3": 0,
                "Class4": 0, "Class5": 0, "Class6": 0, "Class7": 0,
                "Class8": 0, "Class9": 0, "Class10": 0, "Class11": 0,
                "Class12": 0, "Class13": 0, "Class14": 0, "Class15": 0};
    var poor = {"Class0": 0, "Class1": 0, "Class2": 0, "Class3": 0,
                "Class4": 0, "Class5": 0, "Class6": 0, "Class7": 0,
                "Class8": 0, "Class9": 0, "Class10": 0, "Class11": 0,
                "Class12": 0, "Class13": 0, "Class14": 0, "Class15": 0};
    for(i in results){
      if(results[i].value && results[i].value.ShipmentCategory){
        //Take the # at the end of the shipments Class# and treat it as a mask
        var flag = +(results[i].value.ShipmentCategory.substring(5))
        //Using bitwise AND operations, compare the mask with each of the flags
        //to see if the shipment uses those thresholds.
        if(((flag & FLAG_TEMPERATURE)
            && (results[i].value.temperature > tempThreshold)) ||
          ((flag & FLAG_ACCELERATION)
            && (results[i].value.acceleration > accThreshold)) ||
          ((flag & FLAG_MAGNET)
            && (results[i].value.magnet > magThreshold)) ||
          ((flag & FLAG_LIGHT)
            && (results[i].value.light > lightThreshold))) {
              poor[results[i].value.ShipmentCategory]++;
            }
            else {
              good[results[i].value.ShipmentCategory]++;
            }
          }
    }
    var condition = JSON.stringify({
      "data" : {
        "good" : good,
        "poor" : poor
      }
    });
    res.send(condition);
  });
});
