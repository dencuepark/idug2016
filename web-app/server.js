const express = require('express');
//var WebSocketServer = require('websocket').server;
var http = require('http');
var app = express();
const server = http.createServer(app);
var io = require('socket.io').listen(server);
var couchbase = require('couchbase')
// var cluster = new couchbase.Cluster('couchbase://localhost/');
var cluster = new couchbase.Cluster(`couchbase://172.30.10.67:11210`)
var bucket = cluster.openBucket('default');
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

//console.log(+("Class3".substring(5)) & 1);
//getLatestByDeviceId(1234);
function getLatestByDeviceId(id){
  var query = ViewQuery.from('dev_test', 'test').group_level('1')/*.key(['1234','3','d3'])*/;
  bucket.query(query, function(err,results){
    for(i in results) if(results[i].key==id){
      //console.log(results[i].value);
      bucket.get(results[i].value[2], function (err, result) {
        // console.log('Got result: %j', result.value.DeviceId);
        //console.log(result.value);
       });
    }
    //for(i in results) console.log("key:\t" + results[i].key + "\nvalue:\t" + results[i].value);
  });
}

/**
*just upserting a TON of docs
*/
// for(var i = 0; i < 1000; i++){
//   var messageId = ''+i;
//   var deviceId = ''+i;
//   var shipmentCategory = "Class"+ (Math.floor(Math.random()*(16)));
//   var shipmentId = "1Z345EBX";
//   var timestamp = ''+Math.floor(Math.random()*500);
//   var ambientTemperature = ''+Math.floor(Math.random()*100);
//   var ambeintTemperatureToF = ''+Math.floor(Math.random()*100);
//   var targetTemperature = ''+35;
//   var accx = ''+Math.floor(Math.random()*100);
//   var accy = ''+Math.floor(Math.random()*100);
//   var accz = ''+Math.floor(Math.random()*100);
//   var humidityTemperature = ''+Math.floor(Math.random()*100);
//   var humidityToF = ''+Math.floor(Math.random()*100);
//   var relativeHumidity = ''+Math.floor(Math.random()*100);
//   var magX = ''+Math.floor(Math.random()*100);
//   var magY = ''+Math.floor(Math.random()*100);
//   var magZ = ''+Math.floor(Math.random()*100);
//   var barometerData = ''+Math.floor(Math.random()*100);
//   var gyroX = ''+Math.floor(Math.random()*100);
//   var gyroY = ''+Math.floor(Math.random()*100);
//   var gyroZ = ''+Math.floor(Math.random()*100);
//   var luxometerData = ''+Math.floor(Math.random()*100);
//   var json = {
//       "MessageId": messageId,
//       "DeviceId": deviceId,
//       "ShipmentCategory":shipmentCategory,
//       "ShipmentId": shipmentId,
//       "Timestamp": timestamp,
//       "TemperatureData": {
//         "ambientTemperature": ambientTemperature,
//         "ambientTemperaturecelsiusToFahrenheit": ambeintTemperatureToF,
//         "targetTemperature": targetTemperature
//       },
//       "AccelerometerData": {
//         "x": accx,
//         "y": accy,
//         "z": accz
//       },
//       "HumidityData": {
//         "humidityTemperature": humidityTemperature,
//         "humidityTemperaturecelsiusToFahrenheit": humidityToF,
//         "relativeHumidity": relativeHumidity
//       },
//       "MagnetometerData": {
//         "x": magX,
//         "y": magY,
//         "z": magZ
//       },
//       "BarometerData": barometerData,
//       "GyroscopeData": {
//         "x": gyroX,
//         "y": gyroY,
//         "z": gyroZ
//       },
//       "LuxometerData": luxometerData
//     }
//     var docId = 'd'+(i+8)
//     bucket.upsert(docId,json, function (err, result) {
//       console.log(err);
//       // console.log(result);
//     });
// }

// bucket.upsert('d4',{
//     "MessageId": "3",
//     "DeviceId": "1235",
//     "Shipment Category":"dummy",
//     "ShipmentId": "1Z345EBX",
//     "Timestamp": "4",
//     "TemperatureData": {
//       "ambientTemperature": "40",
//       "ambientTemperaturecelsiusToFahrenheit": "33",
//       "targetTemperature": "35"
//     },
//     "AccelerometerData": {
//       "x": "value",
//       "y": "value",
//       "z": "value"
//     },
//     "HumidityData": {
//       "humidityTemperature": "value",
//       "humidityTemperaturecelsiusToFahrenheit": "value",
//       "relativeHumidity": "value"
//     },
//     "MagnetometerData": {
//       "x": "value",
//       "y": "value",
//       "z": "value"
//     },
//     "BarometerData": "value",
//     "GyroscopeData": {
//       "x": "value",
//       "y": "value",
//       "z": "value"
//     },
//     "LuxometerData": "value"
//   },
//   function (err, result) {
//     bucket.get('d0', function (err, result) {
//       console.log('Got result: %j', result.value);
//     });
//   });
// bucket.upsert('user:king_arthur', {
//         'email': 'kingarthur@couchbase.com', 'interests': ['Holy Grail', 'African Swallows']
//     },
//     function (err, result) {
//         bucket.get('user:king_arthur', function (err, result) {
//             console.log('Got result: %j', result.value);
//             bucket.query(
//                 N1qlQuery.fromString('SELECT * FROM default WHERE $1 in interests LIMIT 1'),
//                 ['African Swallows'],
//                 function (err, rows) {
//                     console.log("Got rows: %j", rows);
//                 });
//         });
//     });

//Set the port to serve on
//app.set('port', (process.env.PORT || 3000));

server.listen(8080, function () {
        console.log('Example app listening on port 8080!');
    });


var data = [{
  "MessageId": "3",
  "DeviceId": "1234",
  "Timestamp": "value",
  "Type": "medical",


  "TemperatureData": {
    "topTemp": "0",
    "ambientTemperature": "33",
    "ambientTemperature-celsiusToFahrenheit": "33",
    "targetTemperature": "35"
  },
  "AccelerometerData": {
    "topAcc": "0",
    "x": "value",
    "y": "value",
    "z": "value"
  },
  "HumidityData": {
    "humidityTemperature": "value",
    "humidityTemperature-celsiusToFahrenheit": "value",
    "relativeHumidity": "value"
  },
  "MagnetometerData": {
    "x": "value",
    "y": "value",
    "z": "value"
  },
  "BarometerData": "value",
  "GyroscopeData": {
    "x": "value",
    "y": "value",
    "z": "value"
  },
  "LuxometerData": "value"
},
{
  "MessageId": "3",
  "DeviceId": "2345",
  "Timestamp": "value",
  "Type": "chilled",
  "Condition" : "good",
  "TemperatureData": {
    "topTemp": "0",
    "ambientTemperature": "33",
    "ambientTemperature-celsiusToFahrenheit": "33",
    "targetTemperature": "35"
  },
  "AccelerometerData": {
    "topAcc": "0",
    "x": "value",
    "y": "value",
    "z": "value"
  },
  "HumidityData": {
    "humidityTemperature": "value",
    "humidityTemperature-celsiusToFahrenheit": "value",
    "relativeHumidity": "value"
  },
  "MagnetometerData": {
    "x": "value",
    "y": "value",
    "z": "value"
  },
  "BarometerData": "value",
  "GyroscopeData": {
    "x": "value",
    "y": "value",
    "z": "value"
  },
  "LuxometerData": "value"
},
{
  "MessageId": "3",
  "DeviceId": "3465",
  "Timestamp": "value",
  "Type": "fragile",
  "Condition" : "good",
  "TemperatureData": {
    "topTemp": "0",
    "ambientTemperature": "33",
    "ambientTemperature-celsiusToFahrenheit": "33",
    "targetTemperature": "35"
  },
  "AccelerometerData": {
    "topAcc": "0",
    "x": "value",
    "y": "value",
    "z": "value"
  },
  "HumidityData": {
    "humidityTemperature": "value",
    "humidityTemperature-celsiusToFahrenheit": "value",
    "relativeHumidity": "value"
  },
  "MagnetometerData": {
    "x": "value",
    "y": "value",
    "z": "value"
  },
  "BarometerData": "value",
  "GyroscopeData": {
    "x": "value",
    "y": "value",
    "z": "value"
  },
  "LuxometerData": "value"
},
{
  "MessageId": "3",
  "DeviceId": "4567",
  "Timestamp": "value",
  "Type": "fragile",
  "Condition" : "good",
  "TemperatureData": {
    "topTemp": "0",
    "ambientTemperature": "33",
    "ambientTemperature-celsiusToFahrenheit": "33",
    "targetTemperature": "35"
  },
  "AccelerometerData": {
    "topAcc": "0",
    "x": "value",
    "y": "value",
    "z": "value"
  },
  "HumidityData": {
    "humidityTemperature": "value",
    "humidityTemperature-celsiusToFahrenheit": "value",
    "relativeHumidity": "value"
  },
  "MagnetometerData": {
    "x": "value",
    "y": "value",
    "z": "value"
  },
  "BarometerData": "value",
  "GyroscopeData": {
    "x": "value",
    "y": "value",
    "z": "value"
  },
  "LuxometerData": "value"
},
{
  "MessageId": "3",
  "DeviceId": "5678",
  "Timestamp": "value",
  "Type": "chilled",
  "Condition" : "good",
  "TemperatureData": {
    "topTemp": "0",
    "ambientTemperature": "33",
    "ambientTemperature-celsiusToFahrenheit": "33",
    "targetTemperature": "35"
  },
  "AccelerometerData": {
    "topAcc": "0",
    "x": "value",
    "y": "value",
    "z": "value"
  },
  "HumidityData": {
    "humidityTemperature": "value",
    "humidityTemperature-celsiusToFahrenheit": "value",
    "relativeHumidity": "value"
  },
  "MagnetometerData": {
    "x": "value",
    "y": "value",
    "z": "value"
  },
  "BarometerData": "value",
  "GyroscopeData": {
    "x": "value",
    "y": "value",
    "z": "value"
  },
  "LuxometerData": "value"
}];

setInterval(function(){
  //console.log('test');
  data.forEach(simulateChange);
},1000);

io.on('connection', (socket) => {
  console.log(socket.request.headers.host + " connected");
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  subscribeChanges();
  // socket.on('add-message', (message) => {
  //   io.emit('message', {type:'new-message', text: message});
  // });
});

function subscribeChanges() {
  setInterval(function() {
    var good = {medical:0, chilled:0, fragile:0};
    var poor = {medical:0, chilled:0, fragile:0};
    for(element in data){
      if(data[element].Type === "medical"){
        if(data[element].Condition === "poor") poor.medical++;
        else good.medical++;
      }
      else if(data[element].Type === "chilled"){
        if(data[element].Condition === "poor") poor.chilled++;
        else good.chilled++;
      }
      else if(data[element].Type === "fragile"){
        if(data[element].Condition === "poor") poor.fragile++;
        else good.fragile++;
      }
    }
    var condition = JSON.stringify({
      "data" : {
        "good" : good,
        "poor" : poor
      }
    });
    io.emit('typecondition', condition);

    var counts = {medical:0, chilled:0, fragile:0};
    for(element in data){
      if(data[element].Type === "medical") counts.medical++;
      else if(data[element].Type === "chilled") counts.chilled++;
      else if(data[element].Type === "fragile") counts.fragile++;
    }
    var types = JSON.stringify({
      "data" : counts
    });
    io.emit('typecount',types);

  }, 1000);
}

function simulateChange(value, index){
  var chance = Math.random();
  var val = +value.TemperatureData.ambientTemperature;
  //console.log(chance);
  var change = 0;
  if(chance < val/100 - 0.1) change = -1;
  else if(chance > val/100 + 0.2) change = 1;
  value.TemperatureData.ambientTemperature = val + change;
  //console.log(value.TemperatureData.ambientTemperature);
  if(value.TemperatureData.ambientTemperature >
     value.TemperatureData.topTemp)
     value.TemperatureData.topTemp = value.TemperatureData.ambientTemperature;

  if(value.TemperatureData.topTemp > tempThreshold
    && (value.Type === "chilled" || value.Type === "medical"))
    value.Condition = "poor";

  if(chance < 0.1){
    value.AccelerometerData.x = 150;
    value.AccelerometerData.y = 150;
    value.AccelerometerData.z = 150;
  }
  else{
    value.AccelerometerData.x = 50;
    value.AccelerometerData.y = 50;
    value.AccelerometerData.z = 50;
  }

  if(Math.max(value.AccelerometerData.x,
              value.AccelerometerData.y,
              value.AccelerometerData.z) > value.AccelerometerData.topAcc)
    value.AccelerometerData.topAcc =
     Math.max(value.AccelerometerData.x,
              value.AccelerometerData.y,
              value.AccelerometerData.z);

  if(value.AccelerometerData.topAcc > accThreshold
     && (value.Type === "fragile" || value.Type === "medical"))
     value.Condition = "poor";
}

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
  var query = ViewQuery.from('dev_test', 'test').group_level('1')/*.key(['1234','3','d3'])*/;
  bucket.query(query, function(err,results){
    var keys = []
    for(i in results){
      keys.push(results[i].value[2]);
    }
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
  });
});

app.get('/app/records/:DeviceId', function(req, res){
  var query = ViewQuery.from('dev_csms','highestAll').group_level('1').key(req.params.DeviceId);
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
  var query = ViewQuery.from('dev_csms', 'history')
                       .group_level('1')
                       .range([req.params.DeviceId,'0'],[''+(+req.params.DeviceId+1),'0']);
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


app.get('/app/test/:DeviceId', function(req, res){
  var query = ViewQuery.from('dev_test', 'test').group_level('1')/*.key(['1234','3','d3'])*/;
  bucket.query(query, function(err,results){
    for(i in results) if(results[i].key==req.params.DeviceId){
      bucket.get(results[i].value[2], function (err, result) {
        var devices = JSON.stringify({
          "data" : result.value
        })
        //console.log(devices);
        res.send(devices);
       });
    }
  });
});

app.get('/app/maxtemp/:DeviceId', function(req, res){
  var query = ViewQuery.from('dev_test', 'test2').group_level('1').key(req.params.DeviceId);
  bucket.query(query, function(err,results){
    //for(i in results) console.log("key:\t" + results[i].key + "\nvalue:\t" + results[i].value);
    if(results[0]) {
      var temperature = JSON.stringify({
        "data" : results[0].value
      })
      res.send(temperature);
    }
  });
});

app.get('/app/maxacc/:DeviceId', function(req, res){
  var query = ViewQuery.from('dev_test', 'test3').group_level('1').key(req.params.DeviceId);
  bucket.query(query, function(err,results){
    //for(i in results) console.log("key:\t" + results[i].key + "\nvalue:\t" + results[i].value);
    if(results[0]){
      var acceleration = JSON.stringify({
        "data" : results[0].value
      })
      res.send(acceleration);
    }
  });
});

//send. EVERYTHING.
app.get('/app/test', function(req, res) {
  var devices = JSON.stringify({
    "data" : data
  });
  //res.contentType('application/json');
  res.send(devices);
});

app.get('/app/typecount', function(req, res) {
  var query = ViewQuery.from('dev_test', 'test4').group_level('1');
  bucket.query(query, function(err,results){
    var thisdata = {"Class0": 0, "Class1": 0, "Class2": 0, "Class3": 0,
                    "Class4": 0, "Class5": 0, "Class6": 0, "Class7": 0,
                    "Class8": 0, "Class9": 0, "Class10": 0, "Class11": 0,
                    "Class12": 0, "Class13": 0, "Class14": 0, "Class15": 0};
    for(i in results){
        thisdata[results[i].key] = results[i].value;
    }
    // console.log(thisdata);
    var types = JSON.stringify({
      "data" : thisdata
    });
    res.send(types);
    //for(i in results) console.log("key:\t" + results[i].key + "\nvalue:\t" + results[i].value);
  });

  // var counts = {medical:0, chilled:0, fragile:0};
  // for(element in data){
  //   if(data[element].Type === "medical") counts.medical++;
  //   else if(data[element].Type === "chilled") counts.chilled++;
  //   else if(data[element].Type === "fragile") counts.fragile++;
  // }
  // var types = JSON.stringify({
  //   "data" : counts
  // });
  //
  // res.send(types);
});

app.get('/app/typecondition',function(req,res){
  var query = ViewQuery.from('dev_csms', 'highestAll').group_level('1')/*.key(['1234','3','d3'])*/;
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
  //
  // var good = {medical:0, chilled:0, fragile:0};
  // var poor = {medical:0, chilled:0, fragile:0};
  // for(element in data){
  //   if(data[element].Type === "medical"){
  //     if(data[element].Condition === "poor") poor.medical++;
  //     else good.medical++;
  //   }
  //   else if(data[element].Type === "chilled"){
  //     if(data[element].Condition === "poor") poor.chilled++;
  //     else good.chilled++;
  //   }
  //   else if(data[element].Type === "fragile"){
  //     if(data[element].Condition === "poor") poor.fragile++;
  //     else good.fragile++;
  //   }
  // }
  // var condition = JSON.stringify({
  //   "data" : {
  //     "good" : good,
  //     "poor" : poor
  //   }
  // });
  // //console.log(condition);
  // res.send(condition);
});

//Log the port
// app.listen(app.get('port'), function() {
//     console.log('app running on port', app.get('port'));
// });
