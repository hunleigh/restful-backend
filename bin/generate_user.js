
var app = require('../app');
var mongoose = require('mongoose');
var UserModel = mongoose.model('Users');

var user = new UserModel({'username': 'test.user'});
user.setPassword('u20B8bVs7x4e35n', function (err, userModel) {
  userModel.save(function(err, update) {
    console.log(err);
    console.log(update);
  });
});
