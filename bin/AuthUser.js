var request = require('request');

// var baseUrl = 'http://ec2-54-213-165-111.us-west-2.compute.amazonaws.com';
var baseUrl = 'http://127.0.0.1:3000';
request.post({
  url: baseUrl + '/auth/login',
  method: 'POST',
  json: true,
  body: {
    username: 'test.user',
    password: 'u20B8bVs7x4e35n'
  }
}, function(error, response, body) {
    if(!error && response.statusCode == 200){
      console.log(body.token);
      createDevice(body.token, {name: 'Device1'}, function(err, data){
        listDevices(body.token, function(error, data) {
          if (!error){
            var deviceData = data;
            for(var i in deviceData) {
              var id = deviceData[i]._id;
              var name = deviceData[i].name;
              console.log(id + " " + name +" " + '\n');
            }
            var devId = deviceData[deviceData.length-1]._id;
            for (var j=0; j<=100; j++) {
              createDeviceData(body.token, {value: Math.random(), device: devId});
            }

            listDeviceData(body.token, {device: deviceData[deviceData.length-2]._id}, function (error, data){
              if(!error){
                for (var i in data){
                  var value = data[i].value;
                  var timestamp = data[i].timestamp;
                  console.log(value + " " + timestamp + "\n");
                }
              } else {
                console.log(error);
              }
            });
          // function(err, data){
                //   console.log("response");
                //   if (!err){
                //     for (var i in data){
                //       var value = deviceData[i].value;
                //       var timestamp = deviceData[i].timestamp;
                //       console.log(timestamp + ": " + value + " "+ "\n");
                //     }
                //   }
                // }
                // facut listare Date && facut refference user -> device + verificat controllerul la modificare device -> la listare sa vezi device-urile userului curent, la modificare sa verifici daca e al userului curent + cand faci post sa verifici ca device-ul care il ai ca referinta sa fie al aceluiasi user + cand listezi datele de pe un device sa verifici daca device-ul e al userului
          }
        });
      });
    }
  });

function createDevice(token, data, callback) {
  request.post({
    url: baseUrl + '/devices',
    method: 'POST',
    json: true,
    headers: {
      'Authorization': 'Bearer ' + token
    },
    body: {
      name: data.name,
    }
  }, function(error, response, body){
    console.log('Response code: ' + response.statusCode);
    if (!error && response.statusCode == 201) {
      console.log('Device created', body);
      if(callback) {
          return callback(null, true);
      }
    }
  });
}

function listDevices(token, callback) {
  request.get({
    url: baseUrl + '/devices',
    json: true,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }, function(error, response, body){
    if (!error && response.statusCode == 200){
      if(callback) {
          return callback(null, body);
      }
    }
  });
}

function createDeviceData (token, data, callback) {
  request.post({
    url: baseUrl + '/deviceData',
    method: 'POST',
    json: true,
    headers: {
      'Authorization': 'Bearer ' + token
    },
    body: {
      device: data.device,
      value: data.value,
    }
  }, function(error, response, body) {
    if (!error && response.statusCode == 201) {
      console.log('Data created', body);
      if(callback) {
          return callback(null, true);
      }
    } else {
      console.log(error);
    }
  });
}

function listDeviceData (token, data, callback) {
  console.log('List device data for dev ' + data.device);
  request.get({
    url: baseUrl + '/devices/' + data.device + '/data',
    json: true,
    headers: {
      'Authorization' : 'Bearer ' + token
    },
  }, function (error, response, body){
    if (!error && response.statusCode == 200){
      if(callback) {
        return callback(null, body);
      }
    } else {
      return callback(error, null);
    }
  });
}
