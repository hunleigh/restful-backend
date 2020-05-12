var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
});
var options = ({missingPasswordError: "Wrong password", "hashField": "password"});
userSchema.plugin(passportLocalMongoose, options);

module.exports = mongoose.model('Users', userSchema);
