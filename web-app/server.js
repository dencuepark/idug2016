const express = require('express');
//var WebSocketServer = require('websocket').server;
var http = require('http');
var app = express();
const server = http.createServer(app);
var io = require('socket.io').listen(server);

//Set the port to serve on
//app.set('port', (process.env.PORT || 3000));

server.listen(3000, function () {
        console.log('Example app listening on port 3000!');
    });

var tempThreshold = 40;
var accThreshold = 100;
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

// const wsServer = new WebSocketServer({
//   httpServer: server, autoAcceptConnections: false
// });
//
// function originIsAllowed(origin) {
//   return true;
// }
//
// wsServer.on('request', function(request) {
//   if (!originIsAllowed(request.origin)) {
//       request.reject();
//       console.log((new Date()) + ' Connection fron origin ' + request.origin + ' rejected.');
//       return;
//   }
//   var connection = request.accept('sinedata', request.origin);
//   observableSineWave(this, 1000, 20);
//
//   connection.on('message', function(message) {
//       connection.sendUTF(message.utf8Data);
//   });
//   connection.on('close', function(reasonCode, description) {
//       console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnection. Reason: ' + reasonCode);
//   });
// });
// function deg2rad(val) {
//   return val * 0.0174533;
// }
//
// function observableSineWave(serverSocket, period) {
//   var waveVal = 0;
//   setInterval(function() {
//     waveVal = waveVal == 360 ? 0 : waveVal + 0.1;
//     serverSocket.broadcast(JSON.stringify({ value: Math.sin(deg2rad(waveVal)) }));
//   }, period);
// }

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
app.get('/app/test/:DeviceId', function(req, res){
  //console.log(req.headers);
  var search = req.params.DeviceId;
  var filtered = data.filter(
    function isMatch(value){
      var re = new RegExp(search);
      return re.test(value.DeviceId);
    });
  var devices = JSON.stringify({
    "data" : filtered
  });
  res.send(devices);
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
  var counts = {medical:0, chilled:0, fragile:0};
  for(element in data){
    if(data[element].Type === "medical") counts.medical++;
    else if(data[element].Type === "chilled") counts.chilled++;
    else if(data[element].Type === "fragile") counts.fragile++;
  }
  var types = JSON.stringify({
    "data" : counts
  });

  res.send(types);
});

app.get('/app/typecondition',function(req,res){
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
  //console.log(condition);
  res.send(condition);
});

//Log the port
// app.listen(app.get('port'), function() {
//     console.log('app running on port', app.get('port'));
// });
