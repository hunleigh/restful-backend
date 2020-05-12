var mongoose = require('mongoose');
var DeviceModel = mongoose.model('Device');
var DeviceDataModel = mongoose.model('DeviceData');

module.exports.fetchAll = fetchAllData;
module.exports.deleteData = deleteData;
module.exports.addData = addData;
module.exports.fetchData = fetchData;
module.exports.fetchDeviceData = fetchDeviceData;

function fetchAllData(req,res,next){
  DeviceModel.find({user: req.user.id}, function(err,data){
    if (err)
      res.sendStatus(500);
    res.json(data);
  });
}

function fetchData(req,res,next){
  DeviceModel.findById(req.params.id, function(err,data){
    if (err)
      res.sendStatus(500);
    if (!data)
      return res.sendStatus(404);
    res.json(data);
  });


}
function deleteData(req,res,next){
  DeviceModel.findByIdAndRemove(req.params.id, function(err,data){
    if (err)
      res.sendStatus(500);
    if(!data)
    return res.sendStatus(404);
    res.sendStatus(200);
  });
}

function addData(req,res,next){
  var newDeviceData = new DeviceModel({name: req.body.name, user: req.user.id});
  newDeviceData.save(function(err, data){
    if (err) {
      res.sendStatus(500);
    }
    res.sendStatus(201);
  });
}

function fetchDeviceData(req, res, next) {
  DeviceModel.findById(req.params.id, function(err,data){
    if (err)
      return res.sendStatus(500);
    if (!data) {
      console.log('Device not found', data);
      return res.sendStatus(404);
    }

    DeviceDataModel.find({
      device: req.params.id
    })
    .sort('-timestamp')
    .populate('device')
    .exec(function(err, data){
      if (err)
        return res.sendStatus(500);
      return res.json(data);
    });
  });
}
