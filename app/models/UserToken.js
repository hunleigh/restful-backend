var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');



var userTokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  } ,
 token: {
   type: String,
 },
  createdTs:{
    type: Date,
    default: Date.now,
    required: true  },
  expireTs: {
    type: Date,
    required: true
  }
});

userTokenSchema.plugin(require('mongoose-token'), {
  expiresPath: 'expireTs',
  tokenLength: 20,
  expire: 24* 60* 60* 1000
});

module.exports = mongoose.model('UserToken', userTokenSchema);
