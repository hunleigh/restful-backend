var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create a schema
var deviceDataSchema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  device: {
    type: Schema.Types.ObjectId,
    ref: 'Device'
  }
});

module.exports = mongoose.model('DeviceData', deviceDataSchema);
