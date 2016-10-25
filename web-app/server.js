const express = require('express');
//var WebSocketServer = require('websocket').server;
var http = require('http');
var app = express();
const server = http.createServer(app);
var couchbase = require('couchbase')
// var cluster = new couchbase.Cluster('couchbase://localhost/');
// var bucket = cluster.openBucket('default');
var cluster = new couchbase.Cluster(`couchbase://172.30.10.67:11210`)
var bucket = cluster.openBucket('shipment');
var N1qlQuery = couchbase.N1qlQuery;
var ViewQuery = couchbase.ViewQuery;

var FLAG_TEMPERATURE = 1; //0001
var FLAG_ACCELERATION = 2; //0010
var FLAG_MAGNET = 4; //0100
var FLAG_LIGHT = 8; //1000

var tempThreshold = 60;
var accThreshold = 70;
var magThreshold = 80;
var lightThreshold = 90;

server.listen(8080, function () {
        console.log('App listening on port 8080!');
    });

//Register any used directories so their contents will be recognized as '/'
app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/img'));

//Redirect pages used by the frontend to index.html
app.get('/stats', function(req, res) {
    res.sendFile(__dirname + "/dist/index.html");
});
app.get('/devices', function(req, res) {
    res.sendFile(__dirname + "/dist/index.html");
});
app.get('/search/*', function(req, res) {
    res.sendFile(__dirname + "/dist/index.html");
});
app.get('/detail/*', function(req, res) {
    res.sendFile(__dirname + "/dist/index.html");
});

// filter the data array for partial matches on the searched value DeviceId
// then send the result
app.get('/app/search/:DeviceId', function(req, res){
  var query = ViewQuery.from('csms', 'recentData').group_level('1');
  bucket.query(query, function(err,results){
    var keys = []
    for(i in results){
      keys.push(results[i].value[2]);
    }
      if(keys.length > 0){
        bucket.getMulti(keys, function (err, result) {
        var thisdata = Object.keys(result).map(function(k) { return result[k].value });
        var search = req.params.DeviceId;
        var thisdata = thisdata.filter(
          function isMatch(value){
            var re = new RegExp(search);
            return re.test(value.DeviceId);
          }
        );
        var devices = JSON.stringify({
          "data" : thisdata
        });
        res.send(devices);
      });
    }
  });
});


app.get('/app/device/:DeviceId', function(req, res){
  var query = ViewQuery.from('csms', 'recentData').group_level('1').range([""+req.params.DeviceId],[""+(+req.params.DeviceId+1)]);
  bucket.query(query, function(err,results){
    if(results[0]){
      bucket.get(results[0].value[2], function (err, result) {
        var devices = JSON.stringify({
          "data" : result.value
        })
        // console.log(devices);
        res.send(devices);
       });
    }
  });
});

app.get('/app/records/:DeviceId', function(req, res){
  var query = ViewQuery.from('csms','highestAll').group_level('1').key(""+req.params.DeviceId);
  bucket.query(query, function(err, results){
    if(results[0]){
      var records = JSON.stringify({
        "data": results[0].value
      });
      res.send(records);
    }
  });
});

app.get('/app/history/:DeviceId', function(req, res){
  var query = ViewQuery.from('csms', 'history')
                       .group_level('1')
                       .range([""+req.params.DeviceId],[""+(+req.params.DeviceId+1)]);
  bucket.query(query, function(err,results){
    if(results[0]){
      var history = JSON.stringify({
        "data": results[0].value
      })
    }
    res.send(history);
    //for(i in results) console.log("key:\t" + results[i].key + "\nvalue:\t" + results[i].value);
  });

});

app.get('/app/typecount', function(req, res) {
  var query = ViewQuery.from('csms', 'categoryCount').group_level('1').stale(ViewQuery.Update.NONE);
  bucket.query(query, function(err,results){
    var thisdata = {"Class0": 0, "Class1": 0, "Class2": 0, "Class3": 0,
                    "Class4": 0, "Class5": 0, "Class6": 0, "Class7": 0,
                    "Class8": 0, "Class9": 0, "Class10": 0, "Class11": 0,
                    "Class12": 0, "Class13": 0, "Class14": 0, "Class15": 0};
    for(i in results){
        thisdata[results[i].key] = results[i].value.length;
    }
    // console.log(thisdata);
    var types = JSON.stringify({
      "data" : thisdata
    });
    res.send(types);
    //for(i in results) console.log("key:\t" + results[i].key + "\nvalue:\t" + results[i].value);
  });
});

app.get('/app/typecondition',function(req,res){
  var query = ViewQuery.from('csms', 'highestAll').group_level('1').stale(ViewQuery.Update.NONE);
  bucket.query(query, function(err,results){
    var good = {"Class0": 0, "Class1": 0, "Class2": 0, "Class3": 0,
                "Class4": 0, "Class5": 0, "Class6": 0, "Class7": 0,
                "Class8": 0, "Class9": 0, "Class10": 0, "Class11": 0,
                "Class12": 0, "Class13": 0, "Class14": 0, "Class15": 0};
    var poor = {"Class0": 0, "Class1": 0, "Class2": 0, "Class3": 0,
                "Class4": 0, "Class5": 0, "Class6": 0, "Class7": 0,
                "Class8": 0, "Class9": 0, "Class10": 0, "Class11": 0,
                "Class12": 0, "Class13": 0, "Class14": 0, "Class15": 0};
    //console.log(results);
    for(i in results){
      if(results[i].value && results[i].value.ShipmentCategory){
        var flag = +(results[i].value.ShipmentCategory.substring(5))
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
      // if(+(results[i].value.ShipmentCategory.substring(5)) & FLAG_TEMPERATURE)
      //   console.log("key: "+results[i].key + " type: " + results[i].value.ShipmentCategory);
    }
    var condition = JSON.stringify({
      "data" : {
        "good" : good,
        "poor" : poor
      }
    });
    res.send(condition);
    //for(i in results) console.log("key:\t" + results[i].key + "\nvalue:\t" + results[i].value.ShipmentCategory);
  });
});
