var mongoose = require('mongoose');
var User = mongoose.model('Users');
var userToken = mongoose.model('UserToken');

exports.login = function (req, res, next) {

  var newUserToken = new userToken ({
    userId:  req.user.id
  });

  newUserToken.setToken()
    .then(function(data){
      res.status(200);
      res.json({'token': data.token});
    }).catch(function(err){
      console.log(err);
      res.sendStatus(500);
    });
};
