
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var deviceSchema = new Schema ({
  name: {
    required: true,
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
    unique: true
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true
  }
});

module.exports = mongoose.model('Device', deviceSchema);
