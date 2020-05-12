var mongoose = require('mongoose');
var DeviceDataModel = mongoose.model('DeviceData');
var DeviceModel = mongoose.model('Device');
module.exports.fetchAll = fetchAllUserData;
module.exports.deleteData = deleteUserData;
module.exports.addData = addUserData;
module.exports.fetchUser = fetchUserData;
module.exports.ownsDevice = ownsDevice;

function fetchAllUserData(req,res,next){
  DeviceDataModel.find(function(err,data){
    if (err)
      res.sendStatus(500);
    res.json(data);
  }).populate('device').exec();
}

function fetchUserData(req,res,next){
  DeviceDataModel.findById(req.params.id, function(err,data){
    if (err)
      res.sendStatus(500);
    if (!data)
    return  res.sendStatus(404);
    res.json(data);
  });


}
function deleteUserData(req,res,next){
  DeviceDataModel.findByIdAndRemove(req.params.id, function(err,data){
    if (err)
      res.sendStatus(500);
    if(!data)
    return  res.sendStatus(404);
    res.sendStatus(200);
  });
}

function addUserData(req,res,next){
  DeviceModel.findById(req.body.device, function(err, data){
    if (!data)
      return res.sendStatus(404);
    if (req.user.id != data.user.id) {
      console.log(req.user.id, data, data.user.id);
      return res.sendStatus(401);
    };

  var newDeviceData = new DeviceDataModel ({device: req.body.device, value: req.body.value});

  newDeviceData.save(function(err, data){
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.sendStatus(201);
  });
}).populate('user');
}


function ownsDevice(req,res,next) {
  DeviceDataModel.findById(req.params.id, function(err,data){
    if(req.user.id != data.user.id)
      return  res.sendStatus(401);
    return res.sendStatus(200);
  });

}
